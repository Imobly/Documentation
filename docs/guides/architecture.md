# Arquitetura do Sistema

Este documento descreve a arquitetura completa do **Imobly**, incluindo decisões técnicas, padrões arquiteturais e estrutura do sistema.

## Visão Geral da Arquitetura

O Imobly segue uma arquitetura **modular e escalável** baseada em microserviços e padrões modernos de desenvolvimento.

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web App<br/>Next.js]
        B[Mobile PWA]
        C[Admin Dashboard]
    end
    
    subgraph "API Layer"
        D[API Gateway<br/>FastAPI]
        E[Authentication Service]
        F[Business Logic]
    end
    
    subgraph "Data Layer"
        G[MySQL Database]
        H[Redis Cache]
        I[File Storage<br/>S3/MinIO]
    end
    
    subgraph "External Services"
        J[Email Service]
        K[SMS Service]
        L[Payment Gateway]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    E --> G
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
    F --> L
    
    style A fill:#e1f5fe
    style B fill:#e1f5fe
    style C fill:#e1f5fe
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#e8f5e8
    style H fill:#e8f5e8
    style I fill:#e8f5e8
```

## Arquitetura de Software

### Padrões Arquiteturais

#### 1. **Model-View-Controller (MVC)**
Separação clara entre:
- **Model**: Entidades e lógica de dados
- **View**: Interface do usuário (API responses)
- **Controller**: Lógica de controle e endpoints

#### 2. **Repository Pattern**
Abstração da camada de dados:

```python
class PropertyRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self, filters: PropertyFilters) -> List[Property]:
        query = self.db.query(Property)
        if filters.status:
            query = query.filter(Property.status == filters.status)
        return query.all()
    
    def get_by_id(self, property_id: int) -> Property:
        return self.db.query(Property).filter(Property.id == property_id).first()
```

#### 3. **Dependency Injection**
Gerenciamento de dependências com FastAPI:

```python
def get_property_service(
    db: Session = Depends(get_db),
    cache: Redis = Depends(get_redis)
) -> PropertyService:
    repository = PropertyRepository(db)
    return PropertyService(repository, cache)

@router.get("/properties")
async def list_properties(
    service: PropertyService = Depends(get_property_service)
):
    return await service.list_properties()
```

### Clean Architecture

```
┌─────────────────────────────────────┐
│            Frameworks & Drivers     │
│  FastAPI │ SQLAlchemy │ Redis │ S3  │
├─────────────────────────────────────┤
│         Interface Adapters          │
│  Controllers │ Repositories │ APIs  │
├─────────────────────────────────────┤
│            Application              │
│   Use Cases │ Services │ DTOs       │
├─────────────────────────────────────┤
│              Enterprise             │
│   Entities │ Domain Logic │ Rules   │
└─────────────────────────────────────┘
```

## Estrutura do Projeto

### Backend (FastAPI)

```
app/
├── core/                   # Configurações centrais
│   ├── config.py          # Configurações da aplicação
│   ├── database.py        # Configuração do banco
│   ├── security.py        # Autenticação e autorização
│   └── exceptions.py      # Exceções customizadas
├── models/                # Modelos SQLAlchemy
│   ├── __init__.py
│   ├── property.py
│   ├── tenant.py
│   ├── contract.py
│   └── payment.py
├── schemas/               # Schemas Pydantic
│   ├── __init__.py
│   ├── property.py
│   ├── tenant.py
│   └── responses.py
├── repositories/          # Camada de dados
│   ├── __init__.py
│   ├── base.py
│   ├── property.py
│   └── tenant.py
├── services/              # Lógica de negócio
│   ├── __init__.py
│   ├── property.py
│   ├── tenant.py
│   └── notification.py
├── api/                   # Endpoints da API
│   ├── __init__.py
│   ├── deps.py           # Dependências
│   └── v1/
│       ├── __init__.py
│       ├── router.py
│       └── endpoints/
│           ├── __init__.py
│           ├── auth.py
│           ├── properties.py
│           └── tenants.py
├── utils/                 # Utilitários
│   ├── __init__.py
│   ├── helpers.py
│   └── validators.py
└── main.py               # Aplicação principal
```

### Frontend (Next.js)

```
src/
├── app/                   # App Router (Next.js 14)
│   ├── (auth)/           # Grupo de rotas de auth
│   ├── dashboard/        # Dashboard principal
│   ├── properties/       # Gestão de propriedades
│   ├── tenants/         # Gestão de inquilinos
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── forms/           # Formulários
│   ├── charts/          # Gráficos e visualizações
│   └── layout/          # Componentes de layout
├── lib/                 # Utilitários e configurações
│   ├── api.ts          # Cliente HTTP
│   ├── auth.ts         # Configuração de autenticação
│   ├── utils.ts        # Funções utilitárias
│   └── validations.ts  # Esquemas de validação
├── hooks/              # Custom React Hooks
│   ├── useAuth.ts
│   ├── useProperties.ts
│   └── useNotifications.ts
├── types/              # Definições TypeScript
│   ├── property.ts
│   ├── tenant.ts
│   └── api.ts
└── styles/             # Estilos adicionais
```

## Base de Dados

### Modelo Relacional

```mermaid
erDiagram
    Property ||--o{ Unit : has
    Property ||--o{ Contract : contains
    Property ||--o{ Expense : incurs
    
    Tenant ||--o{ Contract : signs
    Tenant ||--o{ Payment : makes
    
    Contract ||--o{ Payment : generates
    
    Unit ||--o{ Contract : rented_by
    
    Property {
        int id PK
        string name
        string address
        string city
        string state
        string zip_code
        enum type
        float area
        int bedrooms
        int bathrooms
        decimal rent_value
        enum status
        datetime created_at
        datetime updated_at
    }
    
    Unit {
        int id PK
        int property_id FK
        string identifier
        float area
        int bedrooms
        int bathrooms
        decimal rent_value
        enum status
    }
    
    Tenant {
        int id PK
        string name
        string email
        string phone
        string cpf_cnpj
        date birth_date
        string profession
        decimal income
        text address
        json emergency_contact
        enum status
        datetime created_at
        datetime updated_at
    }
    
    Contract {
        int id PK
        int property_id FK
        int unit_id FK
        int tenant_id FK
        string title
        date start_date
        date end_date
        decimal rent_value
        decimal deposit
        float interest_rate
        float fine_rate
        enum status
        text terms
        string document_url
        datetime created_at
        datetime updated_at
    }
    
    Payment {
        int id PK
        int contract_id FK
        int tenant_id FK
        date due_date
        date payment_date
        decimal amount
        decimal fine_amount
        decimal total_amount
        enum status
        enum payment_method
        text description
        datetime created_at
        datetime updated_at
    }
    
    Expense {
        int id PK
        int property_id FK
        string category
        string type
        text description
        decimal amount
        date expense_date
        enum status
        enum priority
        string vendor
        string receipt_url
        text notes
        datetime created_at
        datetime updated_at
    }
```

### Índices e Performance

```sql
-- Índices principais para performance
CREATE INDEX idx_property_status ON properties(status);
CREATE INDEX idx_property_city ON properties(city);
CREATE INDEX idx_tenant_status ON tenants(status);
CREATE INDEX idx_contract_dates ON contracts(start_date, end_date);
CREATE INDEX idx_payment_due_date ON payments(due_date);
CREATE INDEX idx_payment_status ON payments(status);
CREATE INDEX idx_expense_date ON expenses(expense_date);

-- Índices compostos
CREATE INDEX idx_contract_property_tenant ON contracts(property_id, tenant_id);
CREATE INDEX idx_payment_tenant_date ON payments(tenant_id, due_date);
```

## Segurança

### Autenticação JWT

```python
# Estrutura do JWT Token
{
    "sub": "user_email@example.com",
    "user_id": 123,
    "role": "manager",
    "permissions": ["properties:read", "properties:write"],
    "exp": 1699123456,
    "iat": 1699119856
}
```

### Autorização (RBAC)

```python
class RolePermissions:
    ADMIN = [
        "users:*",
        "properties:*",
        "tenants:*",
        "contracts:*",
        "payments:*",
        "reports:*"
    ]
    
    MANAGER = [
        "properties:read", "properties:write",
        "tenants:read", "tenants:write",
        "contracts:read", "contracts:write",
        "payments:read", "payments:write",
        "reports:read"
    ]
    
    AGENT = [
        "properties:read",
        "tenants:read",
        "contracts:read",
        "payments:read"
    ]
```

### Validação de Dados

```python
class PropertyCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    address: str = Field(..., min_length=10, max_length=200)
    city: str = Field(..., min_length=2, max_length=50)
    state: str = Field(..., regex=r'^[A-Z]{2}$')
    zip_code: str = Field(..., regex=r'^\d{5}-?\d{3}$')
    rent_value: Decimal = Field(..., gt=0, decimal_places=2)
    
    @validator('email')
    def validate_email(cls, v):
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', v):
            raise ValueError('Email inválido')
        return v
```

## Performance e Escalabilidade

### Caching Strategy

```python
# Redis para cache de dados frequentes
@cached(ttl=300)  # 5 minutos
async def get_dashboard_stats(user_id: int) -> DashboardStats:
    # Cálculos pesados de estatísticas
    return stats

# Cache de queries pesadas
@cached(key="properties:list:{filters_hash}", ttl=600)
async def list_properties(filters: PropertyFilters):
    return await repository.get_filtered_properties(filters)
```

### Database Optimization

```sql
-- Particionamento por data (payments table)
CREATE TABLE payments (
    id INT PRIMARY KEY,
    due_date DATE,
    amount DECIMAL(10,2),
    -- outros campos
) PARTITION BY RANGE (YEAR(due_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);

-- Índices parciais para dados ativos
CREATE INDEX idx_active_contracts 
ON contracts(property_id, tenant_id) 
WHERE status = 'active';
```

### Load Balancing

```nginx
upstream imobly_backend {
    least_conn;
    server backend1:8000 weight=3;
    server backend2:8000 weight=3;
    server backend3:8000 weight=2;
}

server {
    listen 80;
    server_name api.imobly.com;
    
    location / {
        proxy_pass http://imobly_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Monitoramento e Observabilidade

### Logs Estruturados

```python
import structlog

logger = structlog.get_logger()

# Log estruturado para auditoria
logger.info(
    "property_created",
    user_id=current_user.id,
    property_id=property.id,
    property_name=property.name,
    ip_address=request.client.host
)
```

### Métricas

```python
from prometheus_client import Counter, Histogram, Gauge

# Contadores de requests
requests_total = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
request_duration = Histogram('http_request_duration_seconds', 'Request duration')
active_connections = Gauge('active_connections', 'Active database connections')
```

### Health Checks

```python
@router.get("/health")
async def health_check():
    checks = {
        "database": await check_database(),
        "redis": await check_redis(),
        "storage": await check_storage()
    }
    
    healthy = all(checks.values())
    status_code = 200 if healthy else 503
    
    return JSONResponse(
        content={"status": "healthy" if healthy else "unhealthy", "checks": checks},
        status_code=status_code
    )
```

## Deploy e DevOps

### Containerização

```dockerfile
# Dockerfile para produção
FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Usuário não-root para segurança
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Comando de inicialização
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=mysql+pymysql://user:pass@mysql:3306/imobly
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mysql
      - redis
    
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=imobly
      - MYSQL_USER=user
      - MYSQL_PASSWORD=pass
    volumes:
      - mysql_data:/var/lib/mysql
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api

volumes:
  mysql_data:
```

## Testes

### Estratégia de Testes

```python
# Testes unitários
class TestPropertyService:
    @pytest.fixture
    def property_service(self, mock_repository):
        return PropertyService(mock_repository)
    
    def test_create_property_success(self, property_service):
        # Arrange
        property_data = PropertyCreate(name="Test Property", ...)
        
        # Act
        result = property_service.create_property(property_data)
        
        # Assert
        assert result.name == "Test Property"
        mock_repository.save.assert_called_once()

# Testes de integração
class TestPropertyAPI:
    def test_create_property_endpoint(self, test_client, auth_headers):
        response = test_client.post(
            "/api/v1/properties",
            json={"name": "Test Property", ...},
            headers=auth_headers
        )
        assert response.status_code == 201
        assert response.json()["data"]["name"] == "Test Property"
```

### Coverage e Qualidade

```bash
# Executar testes com coverage
pytest --cov=app --cov-report=html --cov-report=term

# Quality gates
coverage: >= 80%
complexity: <= 10
duplication: <= 3%
```

Esta arquitetura garante **escalabilidade**, **manutenibilidade** e **performance** para o crescimento do Imobly, seguindo as melhores práticas da indústria.