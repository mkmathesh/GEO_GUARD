from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as T
from PIL import Image
import numpy as np
import cv2
import os
import base64
import time
from model import LightIOCNN, extract_features

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# ✅ LOAD MODEL
# =========================
model = LightIOCNN(num_classes=7)
model_path = os.path.join(BASE_DIR, "iocnn_best.pth")

print("📦 Loading model from:", model_path)

checkpoint = torch.load(model_path, map_location="cpu")

if "model_state" in checkpoint:
    model.load_state_dict(checkpoint["model_state"], strict=False)
else:
    model.load_state_dict(checkpoint, strict=False)

model.eval()
print("✅ Model loaded")

# =========================
# ✅ HEALTH ROUTE
# =========================
@app.route("/")
def home():
    return "ML server running"

# =========================
# ✅ TRANSFORM
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
    t = transform(Image.fromarray(img_patch)).unsqueeze(0)
    with torch.no_grad():
        return extract_features(model, t)

# =========================
# ✅ CHANGE DETECTION (OPTIMIZED)
# =========================
def detect_changes(img1, img2):
    img1 = np.array(img1.resize((128, 128)))   # 🔥 reduced size
    img2 = np.array(img2.resize((128, 128)))

    h, w, _ = img1.shape
    change_map = np.zeros((h, w), dtype=np.uint8)

    for y in range(0, h, 64):   # 🔥 fewer loops
        for x in range(0, w, 64):

            p1 = img1[y:y+64, x:x+64]
            p2 = img2[y:y+64, x:x+64]

            if p1.shape[0] != 64 or p1.shape[1] != 64:
                continue

            pixel_diff = np.mean((p1.astype("float") - p2.astype("float"))**2)

            f1 = get_feature(p1)
            f2 = get_feature(p2)

            feature_diff = torch.mean((f1 - f2) ** 2).item()
            score = (pixel_diff * 0.5) + (feature_diff * 0.5)

            if score > 0.2:
                change_map[y:y+64, x:x+64] = 255

    return change_map

# =========================
# ✅ OVERLAY
# =========================
def overlay(img, change_map):
    img = np.array(img.resize((128, 128)))
    mask = np.zeros_like(img)
    mask[change_map == 255] = [255, 0, 0]
    return cv2.addWeighted(img, 0.7, mask, 0.3, 0)

# =========================
# ✅ API
# =========================
@app.route('/api/detect/check', methods=['POST'])
def detect():
    try:
        start = time.time()

        img1 = Image.open(request.files['img1']).convert("RGB")
        img2 = Image.open(request.files['img2']).convert("RGB")

        change_map = detect_changes(img1, img2)
        result = overlay(img2, change_map)

        percent = round((np.sum(change_map == 255) / change_map.size) * 100, 2)
        status = "Building Detected" if percent > 1 else "No Change"

        _, buffer = cv2.imencode(".png", result)
        image_base64 = base64.b64encode(buffer).decode("utf-8")

        print("⏱ Time:", time.time() - start)

        return jsonify({
            "percent": percent,
            "status": status,
            "image": image_base64
        })

    except Exception as e:
        print("🔥 ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# =========================
# ✅ RUN
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)