const express = require('express');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch'); // version 2

const app = express();
const port = 5000;

// Setup multer for multipart/form-data parsing
const upload = multer();

app.use(cors());

// Route to forward file to ngrok API
app.post('/process', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Prepare FormData with the uploaded file
    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Forward the request to the ngrok endpoint
    const response = await fetch('https://61a8-88-156-139-231.ngrok-free.app/process', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(), // critical for multipart/form-data
    });

    // If the response is not OK, throw
    if (!response.ok) {
      const errorText = await response.json();
      console.error('Remote error:', errorText);
      return res.status(500).json({ error: 'Failed to forward to external API' });
    }

    const result = await response.json(); // or .json() based on your API
    res.send(result);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});

