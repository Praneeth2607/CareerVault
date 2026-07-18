import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { schemas } from '../../shared/schemas/index.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', schemasLoaded: Object.keys(schemas).length });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
