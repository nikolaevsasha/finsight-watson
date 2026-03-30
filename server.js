const express = require('express');
const cors    = require('cors');
const multer  = require('multer');
const pdf     = require('pdf-parse');
const fetch   = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app    = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const IAM_URL = 'https://iam.cloud.ibm.com/identity/token';
const WX_URL  = 'https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29';

app.post('/api/token', async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey) return res.status(400).json({ error: 'apiKey required' });
  try {
    const r = await fetch(IAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${encodeURIComponent(apiKey)}`
    });
    const data = await r.json();
    if (!data.access_token) return res.status(401).json({ error: 'Invalid API key', detail: data });
    res.json({ access_token: data.access_token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/chat', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Authorization header required' });
  try {
    const r = await fetch(WX_URL, {
      method: 'POST',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const mime = req.file.mimetype;
  const name = req.file.originalname;
  try {
    let text = '';
    if (mime === 'application/pdf' || name.endsWith('.pdf')) {
      const parsed = await pdf(req.file.buffer);
      text = parsed.text.replace(/\s+/g, ' ').trim().slice(0, 12000);
    } else {
      text = req.file.buffer.toString('utf8').slice(0, 12000);
    }
    if (!text || text.length < 20) {
      return res.status(422).json({ error: 'Could not extract text. Try a text-based PDF.' });
    }
    res.json({ text, name });
  } catch (e) {
    res.status(500).json({ error: 'PDF parse failed: ' + e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`FinSight proxy running → http://localhost:${PORT}`));
