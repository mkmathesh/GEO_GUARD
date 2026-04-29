import torch
import torch.nn as nn
import torchvision.models as tv_models

class LightIOCNN(nn.Module):
    def __init__(self, num_classes=7):
        super().__init__()

        self.mob = tv_models.mobilenet_v2(weights=None)

        self.backbone = self.mob.features
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Linear(1280, num_classes)

    def forward(self, x):
        feat = self.backbone(x)
        pooled = self.pool(feat)
        pooled = pooled.view(pooled.size(0), -1)
        out = self.fc(pooled)

        return feat, out


def extract_features(model, x):
    with torch.no_grad():
        feat, _ = model(x)
        feat = model.pool(feat)
        feat = feat.view(feat.size(0), -1)
    return feat