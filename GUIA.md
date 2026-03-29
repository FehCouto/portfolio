# Guia do Portfólio

## Estrutura de Arquivos

```
PORTIFÓLIO/
├── backend/
│   ├── src/main/java/com/portfolio/
│   │   ├── PortfolioApplication.java   ← Ponto de entrada do Java
│   │   ├── controller/
│   │   │   └── PortfolioController.java ← Endpoints da API (GET /api/...)
│   │   └── model/
│   │       ├── Project.java             ← Estrutura de um projeto
│   │       ├── Skill.java               ← Estrutura de uma skill
│   │       └── About.java               ← Estrutura do perfil
│   ├── src/main/resources/
│   │   └── application.properties       ← Config do Spring Boot
│   ├── pom.xml                          ← Dependências Maven (como package.json)
│   └── Dockerfile                       ← Receita para build do container Java
├── frontend/
│   ├── index.html                       ← Estrutura da página
│   ├── css/style.css                    ← Visual tema Spotify
│   ├── js/app.js                        ← Lógica e chamadas à API
│   ├── nginx.conf                       ← Config do servidor web
│   └── Dockerfile                       ← Receita para o container frontend
├── docker-compose.yml                   ← Une tudo em um comando
└── .gitignore
```

---

## Como Rodar Localmente

### Opção 1: Com Docker (Recomendado)

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

```bash
# Na raiz do projeto (onde está o docker-compose.yml):
docker compose up --build

# Acesse: http://localhost:3000
```

Para parar:
```bash
docker compose down
```

### Opção 2: Sem Docker (Desenvolvimento)

Pré-requisitos: Java 17+ e Maven instalados.

```bash
# 1. Rodar o backend
cd backend
mvn spring-boot:run

# API disponível em: http://localhost:8080/api/projects

# 2. Abrir o frontend
# Abra o arquivo frontend/index.html no navegador
# OU use a extensão "Live Server" do VS Code
# Mude a linha do API_BASE no js/app.js para:
# const API_BASE = 'http://localhost:8080/api';
```

---

## Personalizando o Portfólio

Edite o arquivo `backend/src/main/java/com/portfolio/controller/PortfolioController.java`:

### 1. Seus dados pessoais
```java
// No método getAbout(), altere:
return new About(
    "Seu Nome",          // <- SEU NOME
    "Seu Cargo",         // <- SEU CARGO
    "Sua bio...",        // <- SUA BIO
    "Sua Cidade",        // <- SUA CIDADE
    "email@email.com",   // <- SEU EMAIL
    "https://github.com/seu-usuario",
    "https://linkedin.com/in/seu-perfil",
    Arrays.asList("Java", "Spring Boot")  // <- O QUE ESTÁ APRENDENDO
);
```

### 2. Seus projetos
```java
// No método getProjects(), adicione/edite:
new Project(
    "1",
    "Nome do Projeto",
    "Descrição do projeto",
    "Java, Spring Boot",             // tecnologias
    "https://github.com/...",        // link GitHub
    "https://url-da-imagem.com/...", // imagem de capa
    "Backend"                        // categoria
),
```

### 3. Suas skills
```java
// No método getSkills(), edite o nível (0-100):
new Skill("Java", 70, "Backend", "java"),
//                ↑ altere o número para o seu nível
```

---

## Deploy Gratuito no Railway

1. Crie uma conta em [railway.app](https://railway.app)
2. Conecte com seu GitHub
3. Crie um novo projeto > "Deploy from GitHub repo"
4. Railway detecta o `docker-compose.yml` automaticamente
5. Configure as variáveis de ambiente se necessário
6. Railway gera uma URL pública automaticamente!

---

## Endpoints da API

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/projects` | Lista todos os projetos |
| GET | `/api/skills` | Lista todas as skills |
| GET | `/api/about` | Dados do perfil |

Teste no navegador: http://localhost:8080/api/projects

---

## Próximos Passos

- [ ] Personalizar dados no `PortfolioController.java`
- [ ] Trocar as imagens placeholder por imagens reais
- [ ] Adicionar banco de dados (PostgreSQL) para persistir os dados
- [ ] Criar endpoint `POST /api/contact` para receber mensagens
- [ ] Adicionar mais animações no frontend
- [ ] Deploy no Railway
