import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/check-human', async (req, res) => {
  const { features } = req.body;

  try {
    const response = await axios.post('http://localhost:5002/predict', { features });
    res.json({ result: response.data.prediction });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Prediction server error' });
  }
});

app.listen(5001, () => console.log(' Express server running on port 5001'));
