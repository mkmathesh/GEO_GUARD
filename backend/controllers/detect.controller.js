const axios = require("axios");
const FormData = require("form-data");

const CheckDetection = async (req, res) => {
  try {
    if (!req.files || !req.files.img1 || !req.files.img2) {
      return res.status(400).json({ error: "Upload both images" });
    }

    const formData = new FormData();

    formData.append("img1", req.files.img1.data, req.files.img1.name);
    formData.append("img2", req.files.img2.data, req.files.img2.name);

    const response = await axios.post(
      "https://geo-guard-3.onrender.com/api/detect/check",
      formData,
      { headers: formData.getHeaders(),
         timeout: 120000 
       }
    );

    console.log("FLASK RESPONSE:", response.data); 

    return res.json(response.data);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Detection Failed" });
  }
};

module.exports = { CheckDetection };