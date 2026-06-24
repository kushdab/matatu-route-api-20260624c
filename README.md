# Nairobi Matatu Route API

REST API providing data on Nairobi matatu routes, stages, and fare estimates.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/routes`: List all matatu routes.
- `GET /api/routes/:id`: Get specific route details.
- `GET /api/stages`: Get all common stages.
- `GET /api/fare-estimate?from=StageA&to=StageB`: Get dynamic fare estimate based on distance/time.