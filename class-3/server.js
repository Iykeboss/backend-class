import express from 'express';
import loadenv from './utils/loadenv.js';
import { router } from './routes/test.js';

import morgan from 'morgan';
import blogRoute from './routes/blog.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// custom logger middleware

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// setting morgan logger midleware

// app.use(morgan('dev'));
// app.use(morgan('tiny'));

app.use(morgan('combined'));

//loads env file and starts server
const startServer = async () => {
  // loads environmental vriable to os.
  await loadenv();

  const port = process.env.PORT || 8081;

  // sets  app port to - port
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};


// check server status
app.get('/', (req, res) => {
  res.send('alive');
});

// Routes

app.use('/custom', router)

app.use('/blog', blogRoute)

// run the code that starts the server
startServer();
