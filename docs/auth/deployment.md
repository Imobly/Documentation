# Deployment

Quickstart (local using Docker Compose):

1. Clone the `Auth-api` repository.
2. Create a `.env` file from `.env.example` and set SECRET_KEY and DATABASE_URL.
3. Run:

```
docker-compose up -d --build
```

The Auth API will be available at `http://localhost:8001` by default.
