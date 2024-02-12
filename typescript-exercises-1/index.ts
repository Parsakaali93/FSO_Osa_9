import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        return res.status(400).send('Height and weight are required.');
    }

    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    if (isNaN(numericHeight) || isNaN(numericWeight)) {
        return res.status(400).send('Height and weight must be numeric values.');
    }

    const bmiResult = calculateBmi(numericHeight, numericWeight);
    return res.send(bmiResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});