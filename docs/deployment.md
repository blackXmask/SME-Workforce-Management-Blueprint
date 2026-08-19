# Deployment Guide

## Prerequisites

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10 Pro or Ubuntu 22.04 | Windows 11 Pro or Ubuntu 24.04 |
| RAM | 4 GB | 8 GB |
| Disk | 20 GB free | 50 GB SSD |
| Docker | Docker Desktop 4.20+ | Latest |
| Node.js | 20 LTS (mobile build only) | 20 LTS |
| Network | Static IP or domain | Domain + TLS |

## Step 1: Install Docker

### Windows
1. Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Install with WSL 2 backend
3. Verify: `docker --version` and `docker compose version`

### Linux (Ubuntu)
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and back in for group change to take effect
```

## Step 2: Clone the Repository

```bash
git clone https://github.com/your-org/workforce-pro.git
cd workforce-pro
```

## Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL=postgresql://wfp:wfp_password@db:5432/workforce_pro

# Redis
REDIS_URL=redis://redis:6379

# Auth — GENERATE NEW SECRETS (use: openssl rand -hex 32)
JWT_SECRET=your-256-bit-secret-here
JWT_REFRESH_SECRET=your-different-256-bit-secret

# SMS Gateway (optional — for phone-based auth)
SMS_API_KEY=your-sms-gateway-key
SMS_SENDER_ID=WorkForce

# App
APP_URL=https://wfp.yourcompany.com
PORT=3000
NODE_ENV=production
```

## Step 4: Run Database Migrations

```bash
# Apply schema to PostgreSQL
docker compose run --rm api npx prisma migrate deploy

# Seed initial data (creates default admin)
docker compose run --rm api npx prisma db seed
```

## Step 5: Start All Services

```bash
docker compose up -d
```

Verify all containers are healthy:

```bash
docker compose ps
```

Expected output:
```
NAME                STATUS              PORTS
workforce-pro-api   Up (healthy)        0.0.0.0:3000->3000/tcp
workforce-pro-db    Up (healthy)        0.0.0.0:5432->5432/tcp
workforce-pro-redis Up (healthy)        0.0.0.0:6379->6379/tcp
workforce-pro-web   Up (healthy)        0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

## Step 6: Configure TLS (HTTPS)

### Using Let's Encrypt (recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d wfp.yourcompany.com

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

### Using a self-signed certificate (testing only)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/CN=wfp.yourcompany.com"
```

## Step 7: Build Mobile Apps (Optional)

### Prerequisites
- Expo account (free at expo.dev)
- Apple Developer account (for iOS App Store) or MDM
- Google Play Console account (for Android Play Store) or MDM

### Build

```bash
# Install Expo CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build profiles (first time only)
eas build:configure

# Build for both platforms
eas build --platform all --profile production

# Outputs:
#   iOS:   .ipa file (downloadable from Expo dashboard)
#   Android: .apk file (downloadable from Expo dashboard)
```

### Distribute
- **App Store / Play Store**: Submit via `eas submit`
- **MDM**: Distribute .ipa/.apk directly via your MDM solution
- **Direct install**: Share download link with employees

## Step 8: First Admin Login

1. Open `https://wfp.yourcompany.com` in Chrome or Edge
2. Log in with default credentials:

```
Email:    admin@company.local
Password: ChangeMe123!
```

3. **Immediately change the password** (Settings → Change Password)
4. Generate new JWT secrets in `.env` and restart:
   ```bash
   # Generate new secrets
   openssl rand -hex 32  # → copy to JWT_SECRET
   openssl rand -hex 32  # → copy to JWT_REFRESH_SECRET

   # Restart API
   docker compose restart api
   ```

## Docker Compose File

```yaml
version: '3.8'

services:
  api:
    build: ./server
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  web:
    build: ./client-web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: workforce_pro
      POSTGRES_USER: wfp
      POSTGRES_PASSWORD: wfp_password
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U wfp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  pgdata:
```

## Post-Deployment Checklist

- [ ] Change admin password
- [ ] Generate new JWT secrets in `.env`
- [ ] Configure SMS gateway (if using phone auth)
- [ ] Set up TLS certificate
- [ ] Configure firewall (allow ports 80 and 443 only)
- [ ] Set up database backups (pg_dump cron job)
- [ ] Create employee accounts
- [ ] Assign managers & set up org chart
- [ ] Configure shift types & roster rules
- [ ] Test clock-in/out on a mobile device
- [ ] Test leave request workflow
- [ ] Schedule Docker log rotation
- [ ] Set up monitoring (optional: Uptime Kuma)

## Backup Strategy

### Database Backup (daily)

```bash
# Add to crontab (runs at 2 AM daily)
0 2 * * * docker exec workforce-pro-db pg_dump -U wfp workforce_pro | gzip > /backups/wfp-$(date +\%Y\%m\%d).sql.gz

# Retain 30 days of backups
0 3 * * * find /backups -name "wfp-*.sql.gz" -mtime +30 -delete
```

### Restore

```bash
gunzip < /backups/wfp-20260820.sql.gz | docker exec -i workforce-pro-db psql -U wfp workforce_pro
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Containers won't start | `docker compose logs api` — check for missing env vars |
| Database connection refused | Ensure `db` container is healthy: `docker compose ps` |
| TLS certificate error | Verify DNS points to server, rerun `certbot --nginx` |
| Mobile app can't connect | Check `APP_URL` in `.env` matches your domain |
| Clock-in fails offline | Ensure SQLite is enabled in mobile app config |
| Push notifications not received | Verify Expo push token is registered for each device |

## Hand-Over Package Contents

```
workforce-pro/
├── server/                # Node.js API source code
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Auth, roles, rate limiting
│   │   ├── services/      # Business logic
│   │   └── utils/        # Helpers (JWT, bcrypt, OTP)
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   ├── migrations/    # Migration files
│   │   └── seed.ts        # Initial data
│   ├── Dockerfile
│   └── package.json
├── client-web/            # React web build
│   ├── src/
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── client-mobile/         # Expo React Native app
│   ├── src/
│   ├── app.json
│   ├── eas.json
│   └── package.json
├── docker-compose.yml
├── .env.example
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   ├── backlog.md
│   └── deployment.md      # This file
├── README.md
└── API.md                 # OpenAPI/Swagger documentation
```
