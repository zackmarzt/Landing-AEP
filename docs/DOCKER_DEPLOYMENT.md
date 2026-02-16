# Docker Deployment Guide

Este guia explica como fazer o build e deploy da aplicação AEP usando Docker.

## 📋 Pré-requisitos

- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)

## 🚀 Quick Start

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.docker.example .env.docker
```

Edite `.env.docker` e preencha com seus valores reais:
- `AUTH_SECRET`: Gere com `openssl rand -base64 32`
- `POSTGRES_PASSWORD`: Senha segura para o banco de dados
- `SMTP_*`: Configurações do seu servidor de email
- `GOOGLE_GENAI_API_KEY`: Sua chave da API do Google AI

### 2. Build e Iniciar os Containers

```bash
# Build e iniciar em modo detached
docker-compose --env-file .env.docker up -d --build

# Ou apenas iniciar (se já fez build antes)
docker-compose --env-file .env.docker up -d
```

### 3. Executar Migrations do Banco de Dados

Após os containers estarem rodando, execute as migrations:

```bash
# Aplicar migrations
docker-compose exec app bun db:push

# Seed do banco (opcional)
docker-compose exec app bun db:seed
```

### 4. Acessar a Aplicação

A aplicação estará disponível em:
- **Frontend**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

## 🔧 Comandos Úteis

### Ver Logs

```bash
# Logs de todos os serviços
docker-compose logs -f

# Logs apenas da aplicação
docker-compose logs -f app

# Logs apenas do banco de dados
docker-compose logs -f db
```

### Parar os Containers

```bash
# Parar sem remover
docker-compose stop

# Parar e remover containers
docker-compose down

# Parar, remover containers e volumes (CUIDADO: apaga o banco!)
docker-compose down -v
```

### Rebuild da Aplicação

```bash
# Rebuild apenas da aplicação
docker-compose build app

# Rebuild e reiniciar
docker-compose up -d --build app
```

### Executar Comandos no Container

```bash
# Abrir shell no container da aplicação
docker-compose exec app sh

# Executar comandos específicos
docker-compose exec app bun lint
docker-compose exec app bun typecheck
```

## 🏗️ Build para Produção

### Build da Imagem Docker

```bash
# Build da imagem
docker build -t aep-landing:latest .

# Build com tag específica
docker build -t aep-landing:1.0.0 .
```

### Executar Container Individual

```bash
# Executar apenas a aplicação (sem banco de dados)
docker run -p 3000:3000 \
  --env-file .env.docker \
  aep-landing:latest
```

## 🌐 Deploy em Produção

### Opção 1: Docker Compose (Servidor VPS)

1. Copie os arquivos para o servidor:
   - `Dockerfile`
   - `docker-compose.yml`
   - `.env.docker` (com valores de produção)

2. No servidor, execute:
   ```bash
   docker-compose --env-file .env.docker up -d --build
   ```

3. Configure um reverse proxy (Nginx/Caddy) para HTTPS

### Opção 2: Container Registry (AWS ECR, Google GCR, Docker Hub)

1. **Login no registry**:
   ```bash
   # Docker Hub
   docker login
   
   # AWS ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   
   # Google GCR
   gcloud auth configure-docker
   ```

2. **Tag e Push**:
   ```bash
   # Docker Hub
   docker tag aep-landing:latest username/aep-landing:latest
   docker push username/aep-landing:latest
   
   # AWS ECR
   docker tag aep-landing:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/aep-landing:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/aep-landing:latest
   ```

3. **Deploy no servidor**:
   ```bash
   docker pull username/aep-landing:latest
   docker run -d -p 3000:3000 --env-file .env.docker username/aep-landing:latest
   ```

### Opção 3: Kubernetes

Exemplo de deployment básico:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aep-landing
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aep-landing
  template:
    metadata:
      labels:
        app: aep-landing
    spec:
      containers:
      - name: aep-landing
        image: username/aep-landing:latest
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: aep-secrets
```

## 🔍 Health Checks

A aplicação possui um endpoint de health check:

```bash
curl http://localhost:3000/api/health
```

Resposta esperada:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-16T16:56:00.000Z"
}
```

## 📊 Monitoramento

### Verificar Status dos Containers

```bash
docker-compose ps
```

### Verificar Uso de Recursos

```bash
docker stats
```

### Verificar Health do Banco de Dados

```bash
docker-compose exec db pg_isready -U aep_user
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs app

# Verificar se as portas estão em uso
lsof -i :3000
lsof -i :5432
```

### Erro de conexão com banco de dados

1. Verifique se o container do banco está rodando:
   ```bash
   docker-compose ps db
   ```

2. Verifique a `DATABASE_URL` no `.env.docker`

3. Teste a conexão:
   ```bash
   docker-compose exec db psql -U aep_user -d aep_db
   ```

### Rebuild completo

Se tiver problemas, faça um rebuild completo:

```bash
# Parar tudo e limpar
docker-compose down -v
docker system prune -a

# Rebuild do zero
docker-compose --env-file .env.docker up -d --build
```

## 🔒 Segurança

### Checklist de Segurança para Produção

- [ ] Alterar todas as senhas padrão
- [ ] Usar `AUTH_SECRET` forte e único
- [ ] Configurar HTTPS (usar Caddy ou Nginx com Let's Encrypt)
- [ ] Não expor porta do PostgreSQL (5432) publicamente
- [ ] Usar secrets management (AWS Secrets Manager, HashiCorp Vault)
- [ ] Configurar firewall para limitar acesso
- [ ] Habilitar logs de auditoria
- [ ] Fazer backup regular do volume do banco de dados

## 📦 Volumes e Persistência

O Docker Compose cria um volume para persistir os dados do PostgreSQL:

```bash
# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect landing-aep_postgres_data

# Backup do volume
docker run --rm -v landing-aep_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data

# Restore do volume
docker run --rm -v landing-aep_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /
```

## 🎯 Próximos Passos

1. Configure CI/CD para build automático (GitHub Actions, GitLab CI)
2. Implemente monitoramento (Prometheus, Grafana)
3. Configure backup automático do banco de dados
4. Adicione rate limiting e proteção DDoS
5. Configure CDN para assets estáticos
