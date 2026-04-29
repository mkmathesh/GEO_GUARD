from flask import Flask, request, jsonify
import torch
import torchvision.transforms as T
from PIL import Image
import numpy as np
import cv2
import os
import base64

from model import LightIOCNN, extract_features

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


model = LightIOCNN(num_classes=7)
model.load_state_dict(
    torch.load(os.path.join(BASE_DIR, "iocnn_best.pth"), map_location="cpu"),
    strict=False
)
model.eval()


transform = T.Compose([
    T.Resize((64, 64)),
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],
                [0.229,0.224,0.225])
])

def get_feature(img_patch):
    t = transform(Image.fromarray(img_patch)).unsqueeze(0)
    return extract_features(model, t)

def get_building_mask(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)

    lower = np.array([0, 0, 120])
    upper = np.array([180, 60, 255])

    mask = cv2.inRange(hsv, lower, upper)

    mask = cv2.medianBlur(mask, 5)
    return mask


def detect_changes(img1, img2):
    img1 = np.array(img1.resize((256, 256)))
    img2 = np.array(img2.resize((256, 256)))

    img1 = cv2.GaussianBlur(img1, (5,5), 0)
    img2 = cv2.GaussianBlur(img2, (5,5), 0)

    building_mask = get_building_mask(img2)

    h, w, _ = img1.shape
    change_map = np.zeros((h, w), dtype=np.uint8)

    for y in range(0, h, 32):
        for x in range(0, w, 32):

            p1 = img1[y:y+32, x:x+32]
            p2 = img2[y:y+32, x:x+32]

            if p1.shape[0] != 32 or p1.shape[1] != 32:
                continue

            pixel_diff = np.mean((p1.astype("float") - p2.astype("float"))**2) / 255.0

            f1 = get_feature(p1)
            f2 = get_feature(p2)
            feature_diff = torch.mean((f1 - f2) ** 2).item()

            score = (pixel_diff * 0.5) + (feature_diff * 0.5)

            if score > 0.18:
                patch_mask = building_mask[y:y+32, x:x+32]

                if np.mean(patch_mask) > 20:
                    change_map[y:y+32, x:x+32] = 255

    change_map = cv2.medianBlur(change_map, 5)
    return change_map


def overlay_buildings(img, change_map):
    img = np.array(img.resize((256, 256)))

    color_mask = np.zeros_like(img)

    color_mask[change_map == 255] = [255, 0, 0]

    result = cv2.addWeighted(img, 0.6, color_mask, 0.4, 0)
    return result


@app.route('/api/detect/check', methods=['POST'])
def detect():
    try:
        if 'img1' not in request.files or 'img2' not in request.files:
            return jsonify({"error": "Upload both images"}), 400

        img1 = Image.open(request.files['img1']).convert("RGB")
        img2 = Image.open(request.files['img2']).convert("RGB")

        change_map = detect_changes(img1, img2)
        result_img = overlay_buildings(img2, change_map)

        total = change_map.size
        changed = np.sum(change_map == 255)
        percent = round((changed / total) * 100, 2)

        status = "Building Detected" if percent > 1 else "No Building Change"

        _, buffer = cv2.imencode(".png", result_img)
        image_base64 = base64.b64encode(buffer).decode("utf-8")

        return jsonify({
            "percent": percent,
            "status": status,
            "image": image_base64
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": "Detection Failed"}), 500


if __name__ == "__main__":
    app.run(debug=True)