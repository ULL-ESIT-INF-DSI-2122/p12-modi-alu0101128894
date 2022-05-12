import * as express from 'express';
import {join} from 'path';

const app = express();

app.use(express.static(join(__dirname, '../public')));

app.get('', (_, res) => {
  res.send('<h1>My application</h1>');
});

app.get('/notes', (_, res) => {
  res.send({
    notes: [
      {
        title: 'Blue note',
        body: 'This is a blue note',
        color: 'blue',
      },
      {
        title: 'Yellow note',
        body: 'This is a yellow note',
        color: 'yellow',
      },
    ],
  });
});

app.get('/info', (_, res) => {
  res.send('Information');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});