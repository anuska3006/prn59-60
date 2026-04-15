# Deployment Guide

This repository now includes a production-ready **single-domain deployment** setup:

- Frontend static files served by Nginx
- Backend API proxied at `/api/*`
- MongoDB as database

## 1) Prerequisites

- Docker + Docker Compose installed
- A domain (for production HTTPS)
- MongoDB Atlas (recommended for cloud production) or containerized MongoDB

## 2) Local/Server Deployment with Docker Compose

From repository root:

```bash
docker compose up -d --build
```

Services:

- `web` (Nginx): serves frontend and proxies API
- `backend` (Node/Express): API
- `mongo` (MongoDB): database

Access:

- Frontend: `http://localhost`
- API health: `http://localhost/api/health`

## 3) Environment Variables (Backend)

Set these in production (do not use placeholder defaults):

- `MONGODB_URI`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `PORT`
- `NODE_ENV=production`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX_REQUESTS`
- `LOG_LEVEL`

If using MongoDB Atlas, replace `MONGODB_URI` with Atlas connection string.

## 4) Frontend API URL Behavior

`frontend/public/api-config.js` resolves API base URL in this order:

1. `window.__API_BASE_URL`
2. `<meta name="api-base-url" content="...">`
3. `http://localhost:5000` for local split-host development
4. `window.location.origin` (single-domain reverse-proxy production)

This supports both:

- Single-domain production (`https://your-domain.com` + `/api`)
- Separate frontend/backend hosting

## 5) Domain + HTTPS

Use a load balancer or reverse proxy in front of `web` service:

- Attach your custom domain
- Enable TLS certificates
- Redirect HTTP to HTTPS

## 6) Production Validation Checklist

- [ ] `GET /api/health` returns 200
- [ ] Survey submission works end-to-end
- [ ] Results page fetches real API data
- [ ] Auth routes work
- [ ] Institutional CSV upload works (and storage strategy is verified)

## 7) Important Current Gap

The repository README references an `ml_service`, but that service is not present in this repository.  
Current backend behavior is mostly placeholder for institutional ML aggregation.  
Decide whether to:

- Deploy without ML service for now, or
- Add/deploy ML service separately and wire backend integration.
