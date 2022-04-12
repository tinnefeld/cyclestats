import { promises as fsPromises } from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8090;

app.use(cors({
  origin: "http://localhost:8080",
}));

app.get('/activities', async (req, res) => {
  let activities = [{name: "a1"}, {name: "a2"}, {name: "a3"}];
  try {
    const activitiesFile = await fsPromises.readFile("./test/data/activities.json");
    activities = JSON.parse(activitiesFile.toString());
  } catch (e) {
    console.log(e);
  }
  res.json(activities);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});