from flask import Flask, request, jsonify
import torch
import torchvision.transforms as T
from PIL import Image
import numpy as np
import cv2
import os
import base64
from flask_cors import CORS
from model import LightIOCNN, extract_features

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# ✅ LOAD MODEL SAFELY
# =========================
model = LightIOCNN(num_classes=7)
model_path = os.path.join(BASE_DIR, "iocnn_best.pth")

print("📦 Model path:", model_path)

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found at {model_path}")

model.load_state_dict(torch.load(model_path, map_location="cpu"), strict=False)
model.eval()

# =========================
# ✅ IMAGE TRANSFORM
# =========================
transform = T.Compose([
    T.Resize((64, 64)),
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406],
                [0.229, 0.224, 0.225])
])

# =========================
# ✅ FEATURE EXTRACTION
# =========================
def get_feature(img_patch):
    try:
        t = transform(Image.fromarray(img_patch)).unsqueeze(0)
        with torch.no_grad():   # ✅ IMPORTANT FIX
            return extract_features(model, t)
    except Exception as e:
        print("❌ Feature extraction error:", str(e))
        return None


# =========================
# ✅ BUILDING MASK
# =========================
def get_building_mask(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)

    lower = np.array([0, 0, 120])
    upper = np.array([180, 60, 255])

    mask = cv2.inRange(hsv, lower, upper)
    mask = cv2.medianBlur(mask, 5)
    return mask


# =========================
# ✅ CHANGE DETECTION
# =========================
def detect_changes(img1, img2):
    img1 = np.array(img1.resize((256, 256)))
    img2 = np.array(img2.resize((256, 256)))

    img1 = cv2.GaussianBlur(img1, (5, 5), 0)
    img2 = cv2.GaussianBlur(img2, (5, 5), 0)

    building_mask = get_building_mask(img2)

    h, w, _ = img1.shape
    change_map = np.zeros((h, w), dtype=np.uint8)

    # 🔥 Slight optimization (reduce load)
    for y in range(0, h, 32):
        for x in range(0, w, 32):

            p1 = img1[y:y+32, x:x+32]
            p2 = img2[y:y+32, x:x+32]

            if p1.shape[0] != 32 or p1.shape[1] != 32:
                continue

            try:
                pixel_diff = np.mean((p1.astype("float") - p2.astype("float"))**2) / 255.0

                f1 = get_feature(p1)
                f2 = get_feature(p2)

                if f1 is None or f2 is None:
                    continue

                feature_diff = torch.mean((f1 - f2) ** 2).item()

                score = (pixel_diff * 0.5) + (feature_diff * 0.5)

                if score > 0.18:
                    patch_mask = building_mask[y:y+32, x:x+32]

                    if np.mean(patch_mask) > 20:
                        change_map[y:y+32, x:x+32] = 255

            except Exception as e:
                print(f"⚠️ Patch error at ({x},{y}):", str(e))
                continue

    change_map = cv2.medianBlur(change_map, 5)
    return change_map


# =========================
# ✅ OVERLAY RESULT
# =========================
def overlay_buildings(img, change_map):
    img = np.array(img.resize((256, 256)))

    color_mask = np.zeros_like(img)
    color_mask[change_map == 255] = [255, 0, 0]

    result = cv2.addWeighted(img, 0.6, color_mask, 0.4, 0)
    return result


# =========================
# ✅ API ROUTE
# =========================
@app.route('/api/detect/check', methods=['POST'])
def detect():
    try:
        print("🚀 API HIT")

        # ✅ Validate files
        if 'img1' not in request.files or 'img2' not in request.files:
            return jsonify({"error": "Upload both images"}), 400

        img1_file = request.files['img1']
        img2_file = request.files['img2']

        print("📂 Files received:", img1_file.filename, img2_file.filename)

        if img1_file.filename == "" or img2_file.filename == "":
            return jsonify({"error": "Empty file uploaded"}), 400

        # ✅ Load images
        img1 = Image.open(img1_file).convert("RGB")
        img2 = Image.open(img2_file).convert("RGB")

        print("🖼️ Images loaded")

        # ✅ Run detection
        change_map = detect_changes(img1, img2)
        print("✅ Change detection complete")

        result_img = overlay_buildings(img2, change_map)

        # ✅ Calculate percentage
        total = change_map.size
        changed = np.sum(change_map == 255)
        percent = round((changed / total) * 100, 2)

        status = "Building Detected" if percent > 1 else "No Building Change"

        print("📊 Percent:", percent)

        # ✅ Encode image safely
        success, buffer = cv2.imencode(".png", result_img)
        if not success:
            raise Exception("Image encoding failed")

        image_base64 = base64.b64encode(buffer).decode("utf-8")

        return jsonify({
            "percent": percent,
            "status": status,
            "image": image_base64
        })

    except Exception as e:
        print("🔥 ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# =========================
# ✅ RUN SERVER (RENDER)
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)