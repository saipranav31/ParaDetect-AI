# Deployment Guide

## Production Deployment

### Backend Deployment

#### Option 1: Docker (Recommended)

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t paradetect-backend .
docker run -p 8000:8000 paradetect-backend
```

#### Option 2: Gunicorn + Uvicorn

Install:
```bash
pip install gunicorn
```

Run:
```bash
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Deployment

Build for production:
```bash
cd frontend
npm run build
```

Deploy `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx

### Environment Variables

Backend:
- `MODEL_PATH`: Path to trained model
- `CORS_ORIGINS`: Allowed frontend origins
- `API_HOST`: Server host
- `API_PORT`: Server port

Frontend:
- `VITE_API_URL`: Backend API URL

### Security Checklist

- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Add rate limiting
- [ ] Implement authentication (if needed)
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable API key authentication

### Monitoring

Recommended tools:
- Sentry for error tracking
- Prometheus + Grafana for metrics
- CloudWatch/DataDog for logs
- Uptime monitoring (UptimeRobot, Pingdom)

### Scaling

- Use load balancer for multiple backend instances
- Implement caching (Redis)
- Use CDN for frontend assets
- Consider serverless deployment (AWS Lambda, Google Cloud Functions)
