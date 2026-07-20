import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { schemas } from '../../shared/schemas/index.js';
import authRoutes from './routes/auth.routes.js';
import assetRoutes from './routes/asset.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import userRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
import searchRoutes from './routes/search.routes.js';
import tagRoutes from './routes/tag.routes.js';


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/profile', userRoutes);
app.use('/api/v1/sessions', sessionRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/tags', tagRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', schemasLoaded: Object.keys(schemas).length });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
