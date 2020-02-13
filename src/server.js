import express from 'express';
import cors from 'cors';
import apollo from './graphql';
import config from './config';
import auth from './authentication/auth';
import parser from 'body-parser';

const app = express();

function setPort(port = 5000) {
  app.set('port', parseInt(port, 10));
}

function listen() {
  const port = app.get('port') || config.port;
  app.listen(port, () => {
    console.log(
      `The server is running and listening at http://localhost:${port}`
    );
  });
}

app.use(
  parser.urlencoded({
    extended: true,
  })
);

app.use(parser.json());
app.use(
  cors({
    origin: '*', // Be sure to switch to your production domain
    optionsSuccessStatus: 200,
  })
);

// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
  res.send({ status: 'ok' });
});

auth(app);
apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen,
};
