# Deployment Guide

Este guia aborda como fazer o deploy do **Imobly** em diferentes ambientes, desde desenvolvimento até produção.

## Ambientes

### Development
- **Propósito:** Desenvolvimento local
- **Recursos:** Docker Compose local
- **URL:** http://localhost:8000

### Staging
- **Propósito:** Testes e homologação
- **Recursos:** Servidor de teste
- **URL:** https://staging.imobly.com

### Production
- **Propósito:** Ambiente de produção
- **Recursos:** Infraestrutura escalável
- **URL:** https://api.imobly.com

## Docker Deployment

### Desenvolvimento Local

Requisitos:
- Docker 20.10+
- Docker Compose 2.0+

```bash
# Clone o repositório
git clone https://github.com/Imobly/imobly-backend.git
cd imobly-backend

# Configure o ambiente
cp .env.example .env

# Execute o projeto
docker-compose up --build -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f api
```

### Configuração do .env

```env
# Database
DATABASE_URL=mysql+pymysql://imobly_user:imobly_pass@mysql:3306/imobly
DATABASE_URL_TEST=mysql+pymysql://imobly_user:imobly_pass@mysql:3306/imobly_test

# Redis
REDIS_URL=redis://redis:6379

# Security
SECRET_KEY=your-super-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@imobly.com

# File Storage
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10485760  # 10MB

# External Services
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
S3_BUCKET=imobly-uploads

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=INFO
```

## Cloud Deployment

### AWS Deployment

#### Usando AWS ECS (Recomendado)

1. **Criar cluster ECS:**

```bash
aws ecs create-cluster --cluster-name imobly-production
```

2. **Configurar RDS (MySQL):**

```bash
aws rds create-db-instance \
    --db-instance-identifier imobly-db \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --engine-version 8.0 \
    --master-username admin \
    --master-user-password SecurePassword123 \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-xxxxxxxxx
```

3. **Task Definition (task-definition.json):**

```json
{
  "family": "imobly-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "imobly-api",
      "image": "your-account.dkr.ecr.region.amazonaws.com/imobly-api:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DATABASE_URL",
          "value": "mysql+pymysql://admin:password@rds-endpoint:3306/imobly"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/imobly-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

4. **Deploy com ECS Service:**

```bash
aws ecs create-service \
    --cluster imobly-production \
    --service-name imobly-api-service \
    --task-definition imobly-api:1 \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-zzz],assignPublicIp=ENABLED}"
```

#### Usando EC2 com Docker

1. **Configurar instância EC2:**

```bash
# Instalar Docker
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Deploy da aplicação:**

```bash
# Clonar projeto
git clone https://github.com/Imobly/imobly-backend.git
cd imobly-backend

# Configurar ambiente de produção
cp .env.production .env

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Digital Ocean Deployment

#### App Platform (Recomendado)

1. **Criar app.yaml:**

```yaml
name: imobly-api
services:
- name: api
  source_dir: /
  github:
    repo: Imobly/imobly-backend
    branch: main
  run_command: uvicorn app.main:app --host 0.0.0.0 --port 8080
  environment_slug: python
  instance_count: 2
  instance_size_slug: basic-xxs
  envs:
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
  - key: REDIS_URL  
    value: ${redis.DATABASE_URL}
  http_port: 8080

databases:
- name: db
  engine: MYSQL
  version: "8"
  size: db-s-1vcpu-1gb
  
- name: redis
  engine: REDIS
  version: "7"
  size: db-s-1vcpu-1gb
```

2. **Deploy via CLI:**

```bash
# Instalar doctl
curl -sL https://github.com/digitalocean/doctl/releases/download/v1.98.0/doctl-1.98.0-linux-amd64.tar.gz | tar -xzv
sudo mv doctl /usr/local/bin

# Autenticar
doctl auth init

# Criar app
doctl apps create --spec app.yaml
```

### Google Cloud Platform

#### Cloud Run (Serverless)

1. **Configurar gcloud:**

```bash
gcloud auth login
gcloud config set project your-project-id
```

2. **Deploy:**

```bash
# Build e push da imagem
gcloud builds submit --tag gcr.io/your-project-id/imobly-api

# Deploy no Cloud Run
gcloud run deploy imobly-api \
    --image gcr.io/your-project-id/imobly-api \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars DATABASE_URL="mysql+pymysql://user:pass@/db?unix_socket=/cloudsql/project:region:instance"
```

## CI/CD Pipeline

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: pytest --cov=app tests/
    
    - name: Check code quality
      run: |
        black --check app/
        isort --check-only app/

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Login to Amazon ECR
      uses: aws-actions/amazon-ecr-login@v1
    
    - name: Build and push Docker image
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: imobly-api

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to ECS
      run: |
        aws ecs update-service \
            --cluster imobly-production \
            --service imobly-api-service \
            --force-new-deployment
```

### Deployment com Ansible

1. **Inventory (hosts.yml):**

```yaml
all:
  children:
    production:
      hosts:
        web1:
          ansible_host: 1.2.3.4
          ansible_user: ubuntu
        web2:
          ansible_host: 1.2.3.5
          ansible_user: ubuntu
```

2. **Playbook (deploy.yml):**

```yaml
---
- name: Deploy Imobly API
  hosts: production
  become: yes
  vars:
    app_name: imobly-api
    app_version: "{{ github_sha | default('latest') }}"
    
  tasks:
    - name: Pull latest Docker image
      docker_image:
        name: "registry.example.com/{{ app_name }}:{{ app_version }}"
        source: pull
        
    - name: Stop existing container
      docker_container:
        name: "{{ app_name }}"
        state: stopped
      ignore_errors: yes
      
    - name: Remove existing container
      docker_container:
        name: "{{ app_name }}"
        state: absent
      ignore_errors: yes
      
    - name: Start new container
      docker_container:
        name: "{{ app_name }}"
        image: "registry.example.com/{{ app_name }}:{{ app_version }}"
        state: started
        restart_policy: always
        ports:
          - "8000:8000"
        env_file: /opt/imobly/.env
        
    - name: Verify deployment
      uri:
        url: "http://localhost:8000/health"
        method: GET
        status_code: 200
      retries: 5
      delay: 10
```

## Database Migrations

### Desenvolvimento

```bash
# Criar nova migração
alembic revision --autogenerate -m "add new table"

# Aplicar migrações
alembic upgrade head

# Reverter migração
alembic downgrade -1
```

### Produção

```bash
# Backup antes de migrar
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql

# Aplicar migrações com verificação
alembic upgrade head --sql > migration_preview.sql
# Revisar o SQL gerado
alembic upgrade head
```

## Monitoramento e Logs

### Configuração do Sentry

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration

sentry_sdk.init(
    dsn="https://your-sentry-dsn@sentry.io/project-id",
    integrations=[
        FastApiIntegration(auto_enabling_integrations=False),
        SqlalchemyIntegration(),
    ],
    traces_sample_rate=0.1,
    environment="production"
)
```

### Configuração de Logs

```python
import logging
import sys
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(f'logs/imobly_{datetime.now().strftime("%Y%m%d")}.log')
    ]
)
```

### Health Checks

```python
@app.get("/health")
async def health_check():
    checks = {
        "database": await check_database_connection(),
        "redis": await check_redis_connection(),
        "storage": await check_storage_connection()
    }
    
    healthy = all(checks.values())
    
    return {
        "status": "healthy" if healthy else "unhealthy",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": checks
    }
```

## SSL/TLS Configuration

### Nginx com Let's Encrypt

```nginx
server {
    listen 80;
    server_name api.imobly.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.imobly.com;
    
    ssl_certificate /etc/letsencrypt/live/api.imobly.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.imobly.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Renovação automática do certificado

```bash
# Adicionar ao crontab
0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx
```

## Backup Strategy

### Backup automatizado

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="imobly"

# Database backup
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Files backup
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /app/uploads

# Upload to S3
aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://imobly-backups/
aws s3 cp $BACKUP_DIR/files_backup_$DATE.tar.gz s3://imobly-backups/

# Clean old backups (keep 7 days)
find $BACKUP_DIR -name "*backup*" -mtime +7 -delete
```

## Troubleshooting

### Problemas Comuns

#### 1. **Container não inicia**

```bash
# Verificar logs
docker-compose logs api

# Verificar configurações
docker-compose config

# Reconstruir imagem
docker-compose build --no-cache api
```

#### 2. **Erro de conexão com banco**

```bash
# Testar conexão
mysql -h localhost -u imobly_user -p -e "SELECT 1"

# Verificar variáveis de ambiente
docker-compose exec api env | grep DATABASE
```

#### 3. **Problemas de performance**

```bash
# Monitorar recursos
docker stats

# Verificar logs de erro
docker-compose logs --tail=100 api

# Analisar queries lentas
mysql -e "SHOW PROCESSLIST;"
```

### Scripts de Manutenção

```bash
# restart.sh - Reiniciar aplicação
#!/bin/bash
docker-compose down
docker-compose up -d
docker-compose logs -f

# update.sh - Atualizar aplicação
#!/bin/bash
git pull origin main
docker-compose build --no-cache
docker-compose down
docker-compose up -d
```

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.scale.yml
version: '3.8'

services:
  api:
    deploy:
      replicas: 3
    depends_on:
      - mysql
      - redis

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - api
    volumes:
      - ./nginx-loadbalancer.conf:/etc/nginx/nginx.conf
```

### Load Balancer Configuration

```nginx
upstream api_servers {
    least_conn;
    server api_1:8000;
    server api_2:8000;
    server api_3:8000;
}

server {
    listen 80;
    location / {
        proxy_pass http://api_servers;
    }
}
```

Este guia fornece uma base sólida para fazer o deploy do Imobly em diferentes ambientes, mantendo as melhores práticas de segurança e performance.