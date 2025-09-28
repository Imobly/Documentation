# 🚀 Getting Started - Imobly Backend

## 🎯 Bem-vindo ao Imobly!

O Imobly é uma plataforma completa de gestão imobiliária que simplifica o gerenciamento de propriedades, inquilinos, contratos e pagamentos. Este guia irá ajudá-lo a configurar e executar o projeto em seu ambiente de desenvolvimento.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

### **Essenciais**
- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Docker & Docker Compose** - [Download](https://www.docker.com/products/docker-desktop/)

### **Opcionais (Recomendados)**
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Postman** - Para testar a API
- **MySQL Workbench** - Para gerenciar o banco de dados

## 📥 Clonando o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/imobly-backend.git

# Entre no diretório
cd imobly-backend

# Verifique se está na branch principal
git branch
```

## 🔧 Configuração do Ambiente

### **1. Crie o arquivo de ambiente**

Copie o arquivo de exemplo e configure suas variáveis:

```bash
# No Linux/Mac
cp .env.example .env

# No Windows
copy .env.example .env
```

### **2. Configure as variáveis do .env**

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

# Email Settings (opcional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
```

## 🐳 Executando com Docker (Recomendado)

### **Opção 1: Ambiente de Desenvolvimento**

```bash
# Construir e iniciar os containers
docker-compose -f docker-compose.dev.yml up --build

# Para executar em segundo plano
docker-compose -f docker-compose.dev.yml up -d --build
```

### **Opção 2: Ambiente de Produção**

```bash
# Construir e iniciar os containers
docker-compose up --build -d

# Verificar se está funcionando
docker-compose ps
```

### **Comandos Úteis do Docker**

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

## 🖥️ Executando Localmente (Sem Docker)

### **1. Instalar Python e dependências**

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

### **2. Configurar MySQL local**

```sql
-- Conecte no MySQL e execute:
CREATE DATABASE imobly_db;
CREATE USER 'imobly'@'localhost' IDENTIFIED BY 'senha123';
GRANT ALL PRIVILEGES ON imobly_db.* TO 'imobly'@'localhost';
FLUSH PRIVILEGES;
```

### **3. Executar migrações**

```bash
# Executar migrações do banco
alembic upgrade head

# Ou se não tiver alembic configurado ainda
python -c "from app.db.base import Base; from app.db.session import engine; Base.metadata.create_all(bind=engine)"
```

### **4. Iniciar a aplicação**

```bash
# Executar servidor de desenvolvimento
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Ou usando o script Python
python main.py
```

## 🧪 Verificando a Instalação

### **1. Teste a API**

Abra seu navegador e acesse:

- **Documentação interativa:** http://localhost:8000/docs
- **Documentação alternativa:** http://localhost:8000/redoc
- **Health check:** http://localhost:8000/health

### **2. Teste os endpoints principais**

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

## 📊 Populando Dados de Exemplo

### **Script de dados iniciais**

Crie um arquivo `seed_data.py`:

```python
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.property import Property
from app.models.tenant import Tenant

def create_sample_data():
    db = SessionLocal()
    
    # Criar propriedade de exemplo
    sample_property = Property(
        name="Edifício São Paulo",
        address="Rua Augusta, 123 - Centro",
        type="apartment",
        total_units=20,
        owner_name="João Silva",
        owner_contact="joao@email.com"
    )
    
    db.add(sample_property)
    db.commit()
    
    print("Dados de exemplo criados com sucesso!")
    db.close()

if __name__ == "__main__":
    create_sample_data()
```

Execute o script:
```bash
python seed_data.py
```

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

## 🛠️ Desenvolvimento

### **Comandos úteis para desenvolvimento**

```bash
# Instalar dependências de desenvolvimento
pip install -r requirements-dev.txt

# Executar testes
pytest

# Executar testes com coverage
pytest --cov=app

# Formatação de código
black app/
isort app/

# Linting
flake8 app/
```

### **Workflow de desenvolvimento**

1. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Faça suas alterações** e commit
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

3. **Execute os testes**
   ```bash
   pytest
   ```

4. **Push e crie Pull Request**
   ```bash
   git push origin feature/nova-funcionalidade
   ```

## 🐛 Troubleshooting

### **Problemas Comuns**

#### **Erro de conexão com MySQL**
```bash
# Verificar se MySQL está rodando
docker-compose ps mysql

# Ver logs do MySQL
docker-compose logs mysql

# Reiniciar apenas o MySQL
docker-compose restart mysql
```

#### **Porta já em uso**
```bash
# Verificar qual processo está usando a porta 8000
lsof -i :8000

# Alterar a porta no docker-compose.yml ou usar outra porta
uvicorn app.main:app --port 8001
```

#### **Permissões de arquivo**
```bash
# Ajustar permissões da pasta uploads
chmod -R 755 uploads/
```

#### **Problemas com dependências**
```bash
# Atualizar pip
pip install --upgrade pip

# Limpar cache do pip
pip cache purge

# Reinstalar dependências
pip install -r requirements.txt --force-reinstall
```

## 📚 Próximos Passos

Agora que você tem o projeto funcionando, explore:

1. **[API Documentation](API_DOCS.md)** - Documentação completa da API
2. **[Architecture Guide](ARCHITECTURE.md)** - Entenda a arquitetura do sistema
3. **[Testing Guide](TESTING.md)** - Como executar e criar testes
4. **[Deployment Guide](DEPLOYMENT.md)** - Deploy em produção

## 🆘 Precisa de Ajuda?

- 📧 **Email:** suporte@imobly.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/seu-usuario/imobly-backend/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/seu-usuario/imobly-backend/discussions)

---

**🎉 Parabéns! Você está pronto para desenvolver com o Imobly!**

Explore os endpoints na documentação interativa em http://localhost:8000/docs e comece a construir funcionalidades incríveis!