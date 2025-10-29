# Modelagem e Diagramas

Esta seção contém todos os diagramas e modelagens do sistema Imobly.

## Diagrama de Classes UML

O diagrama de classes mostra a estrutura principal do sistema:

![Diagrama de Classes](../image.png)

## Modelagem do Banco de Dados

### Modelo Conceitual

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

## Diagrama de Arquitetura

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

## Próximos Diagramas

Esta seção será expandida com:

- **Modelo Físico do Banco** - Estrutura detalhada das tabelas
- **Diagrama de Sequência** - Fluxos de autenticação e operações
- **Diagrama de Casos de Uso** - Funcionalidades do sistema
- **Arquitetura de Deploy** - Infraestrutura de produção

## Arquivo PlantUML

O arquivo `diagramaDeClasses.wsd` contém a definição completa do diagrama de classes em formato PlantUML, que pode ser editado e regenerado conforme necessário.