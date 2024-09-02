const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const compareImages = require('./compare_images.py');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/compare-images', async (req, res) => {
  try {
    const { base64str1, base64str2 } = req.body;
    const ssim = compareImages(base64str1, base64str2);
    res.json({ ssim });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to compare images' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
