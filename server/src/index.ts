import express from 'express';
import cors from 'cors';
import { collectionRouter } from './routes/collection';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/collection', collectionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 