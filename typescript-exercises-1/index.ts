import express from 'express';
import { calculateBmi } from './bmiCalculator';

import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  console.log("posted to exercises", req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, trainingData } = req.body;

  if(!target || !trainingData)
   return res.status(400).send({error: 'parameters missing'});

  if (isNaN(Number(target)) || !Array.isArray(trainingData) || !trainingData.every(num => typeof num === 'number')) {
    return res.status(400).send({ error: 'Malformatted parameters.' });
  }

  const td = trainingData as number[];

  const result = calculateExercise(td, Number(target));
  return res.send({ result });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});