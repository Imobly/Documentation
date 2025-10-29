---
layout: default
title: Getting Started
parent: Guias
nav_order: 1
---

# 🚀 Getting Started - Imobly

Bem-vindo ao Imobly! Este guia irá ajudá-lo a configurar e executar o projeto em seu ambiente de desenvolvimento.
{: .fs-6 .fw-300 }

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

### Essenciais
- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Docker & Docker Compose** - [Download](https://www.docker.com/products/docker-desktop/)

### Opcionais (Recomendados)
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Postman** - Para testar a API
- **MySQL Workbench** - Para gerenciar o banco de dados

---

## 📥 Clonando o Projeto

```bash
# Clone o repositório
git clone https://github.com/Imobly/imobly-backend.git

# Entre no diretório
cd imobly-backend

# Verifique se está na branch principal
git branch
```

---

## 🔧 Configuração do Ambiente

### 1. Crie o arquivo de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
# No Linux/Mac
cp .env.example .env

# No Windows
copy .env.example .env
```

### 2. Configure as variáveis do .env

```env
# Database Configuration
DATABASE_URL=mysql+pymysql://imobly:senha123@localhost:3306/imobly_db
MYSQL_ROOT_PASSWORD=root123
MYSQL_DATABASE=imobly_db
MYSQL_USER=imobly
MYSQL_PASSWORD=senha123

# Application Settings
SECRET_KEY=sua-chave-super-secreta-aqui
DEBUG=True
ENVIRONMENT=development

# JWT Configuration
JWT_SECRET_KEY=jwt-chave-secreta-aqui
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Upload Settings
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB
```

---

## 🐳 Executando com Docker (Recomendado)

### Opção 1: Ambiente de Desenvolvimento

```bash
# Construir e iniciar os containers
docker-compose -f docker-compose.dev.yml up --build

# Para executar em segundo plano
docker-compose -f docker-compose.dev.yml up -d --build
```

### Opção 2: Ambiente de Produção

```bash
# Construir e iniciar os containers
docker-compose up --build -d

# Verificar se está funcionando
docker-compose ps
```

### Comandos Úteis do Docker

```bash
# Ver logs da aplicação
docker-compose logs -f app

# Ver logs do banco de dados
docker-compose logs -f mysql

# Parar os containers
docker-compose down

# Remover volumes (cuidado - apaga dados!)
docker-compose down -v

# Reconstruir apenas um serviço
docker-compose up --build app
```

---

## 🖥️ Executando Localmente (Sem Docker)

### 1. Instalar Python e dependências

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# No Linux/Mac
source venv/bin/activate

# No Windows
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### 2. Configurar MySQL local

```sql
-- Conecte no MySQL e execute:
CREATE DATABASE imobly_db;
CREATE USER 'imobly'@'localhost' IDENTIFIED BY 'senha123';
GRANT ALL PRIVILEGES ON imobly_db.* TO 'imobly'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Executar migrações

```bash
# Executar migrações do banco
alembic upgrade head

# Ou se não tiver alembic configurado ainda
python -c "from app.db.base import Base; from app.db.session import engine; Base.metadata.create_all(bind=engine)"
```

### 4. Iniciar a aplicação

```bash
# Executar servidor de desenvolvimento
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Ou usando o script Python
python main.py
```

---

## 🧪 Verificando a Instalação

### 1. Teste a API

Abra seu navegador e acesse:

- **Documentação interativa:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Documentação alternativa:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health check:** [http://localhost:8000/health](http://localhost:8000/health)

### 2. Teste os endpoints principais

```bash
# Health check
curl http://localhost:8000/health

# Listar propriedades (vai retornar vazio inicialmente)
curl http://localhost:8000/api/v1/properties/

# Criar usuário admin (se implementado)
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@imobly.com","password":"admin123","name":"Admin"}'
```

---

## 🔍 Estrutura do Projeto

```
imobly-backend/
├── app/
│   ├── api/v1/endpoints/     # Endpoints da API
│   ├── controllers/          # Lógica de negócio
│   ├── models/              # Modelos do banco de dados
│   ├── repositories/        # Acesso aos dados
│   ├── schemas/             # Schemas Pydantic
│   ├── services/            # Serviços auxiliares
│   └── core/                # Configurações
├── tests/                   # Testes automatizados
├── uploads/                 # Arquivos enviados
├── docker-compose.yml       # Docker para produção
├── docker-compose.dev.yml   # Docker para desenvolvimento
├── requirements.txt         # Dependências Python
└── README.md               # Documentação principal
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Erro de conexão com MySQL

```bash
# Verificar se MySQL está rodando
docker-compose ps mysql

# Ver logs do MySQL
docker-compose logs mysql

# Reiniciar apenas o MySQL
docker-compose restart mysql
```

#### Porta já em uso

```bash
# Verificar qual processo está usando a porta 8000
lsof -i :8000

# Alterar a porta no docker-compose.yml ou usar outra porta
uvicorn app.main:app --port 8001
```

#### Permissões de arquivo

```bash
# Ajustar permissões da pasta uploads
chmod -R 755 uploads/
```

#### Problemas com dependências

```bash
# Atualizar pip
pip install --upgrade pip

# Limpar cache do pip
pip cache purge

# Reinstalar dependências
pip install -r requirements.txt --force-reinstall
```

---

## 📚 Próximos Passos

Agora que você tem o projeto funcionando, explore:

1. **[API Reference](../api/overview)** - Documentação completa da API
2. **[Arquitetura](./architecture)** - Entenda a arquitetura do sistema
3. **[Testing](./testing)** - Como executar e criar testes
4. **[Deploy](./deployment)** - Deploy em produção

---

## 🆘 Precisa de Ajuda?

- 📧 **Email:** devcostta@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/Imobly/Documentation/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Imobly/Documentation/discussions)

---

**🎉 Parabéns! Você está pronto para desenvolver com o Imobly!**

Explore os endpoints na documentação interativa em [http://localhost:8000/docs](http://localhost:8000/docs) e comece a construir funcionalidades incríveis!