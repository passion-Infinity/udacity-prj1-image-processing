import express from 'express';
import cors from 'cors';
import routes from './routes';
import File from './utils/file';

const app = express();
const port = 3000;

// cors
app.use(cors());
app.options('*', cors());

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  File.createThumbPath();
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:3000`);
});

export default app;
