import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface Stage {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
}

interface MatatuRoute {
  id: string;
  number: string;
  origin: string;
  destination: string;
  stages: string[];
  baseFare: number;
}

const stages: Stage[] = [
  { id: '1', name: 'Nairobi CBD', coordinates: { lat: -1.2833, lng: 36.8219 } },
  { id: '2', name: 'Westlands', coordinates: { lat: -1.2633, lng: 36.8021 } },
  { id: '3', name: 'Kawangware', coordinates: { lat: -1.2863, lng: 36.7454 } },
  { id: '4', name: 'Uthiru', coordinates: { lat: -1.2625, lng: 36.7212 } },
  { id: '5', name: 'Ngong', coordinates: { lat: -1.3608, lng: 36.6565 } },
];

const routes: MatatuRoute[] = [
  { id: 'r1', number: '23', origin: 'CBD', destination: 'Outering', stages: ['CBD', 'Dandora', 'Kayole'], baseFare: 50 },
  { id: 'r2', number: '46', origin: 'CBD', destination: 'Kawangware', stages: ['CBD', 'Hurlingham', 'Lavington', 'Kawangware'], baseFare: 40 },
  { id: 'r3', number: '102', origin: 'CBD', destination: 'Ngong', stages: ['CBD', 'Karen', 'Ngong'], baseFare: 80 },
];

// Get all routes
app.get('/api/routes', (req: Request, res: Response) => {
  res.json(routes);
});

// Get route by ID
app.get('/api/routes/:id', (req: Request, res: Response) => {
  const route = routes.find(r => r.id === req.params.id || r.number === req.params.id);
  if (!route) return res.status(404).json({ message: 'Route not found' });
  res.json(route);
});

// Get all stages
app.get('/api/stages', (req: Request, res: Response) => {
  res.json(stages);
});

// Fare estimate endpoint
app.get('/api/fare-estimate', (req: Request, res: Response) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Please provide from and to query parameters' });
  }

  // Mock logic: calculate fare based on distance proxy
  const hour = new Date().getHours();
  const isPeak = (hour >= 6 && hour <= 9) || (hour >= 16 && hour <= 19);
  const multiplier = isPeak ? 1.5 : 1.0;
  
  const baseEstimate = 50;
  const estimatedFare = Math.ceil((baseEstimate + (Math.random() * 30)) * multiplier);

  res.json({
    from,
    to,
    estimatedFare: Math.round(estimatedFare / 10) * 10,
    currency: 'KES',
    peakTime: isPeak,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    message: 'Nairobi Matatu Route API v1',
    endpoints: ['/api/routes', '/api/stages', '/api/fare-estimate']
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});