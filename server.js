
const express = require('express');
const admin = require('firebase-admin');
const shortid = require('shortid'); // Import shortid library 



const app = express();
app.use(express.json());

const serviceAccount = require('./url-shortener-api');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-url.firebaseio.com" // Replace with your Firebase database URL
});
app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  const shortId = shortid.generate(); // Generate a unique shortId

  try {
      await db.collection('urls').doc(shortId).set({ url });
      res.json({ shortUrl: `https://yourdomain.com/${shortId}` }); // Replace 'yourdomain.com' with your actual domain
  } catch (error) {
      console.error("Failed to shorten URL:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


const db = admin.firestore();

// Server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  // Generate a shortId here (you might use a library like shortid or similar)
  const shortId = generateShortId();
  try {
      await db.collection('urls').doc(shortId).set({ url });
      res.json({ shortUrl: `https://yourdomain.com/${shortId}` });
  } catch (error) {
      console.error("Failed to shorten URL:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const doc = await db.collection('urls').doc(shortId).get();
    if (doc.exists) {
      res.redirect(doc.data().url);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/api/url/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const doc = await db.collection('urls').doc(shortId).get();
    if (doc.exists) {
      res.json({ originalUrl: doc.data().url });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/url/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    await db.collection('urls').doc(shortId).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete URL' });
  }
});

app.put('/api/url/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const { newUrl } = req.body;
  try {
    await db.collection('urls').doc(shortId).update({ url: newUrl });
    res.json({ updated: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update URL' });
  }
});
