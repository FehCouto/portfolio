# =============================================
# Dockerfile do Backend Java
# =============================================
# Um Dockerfile é uma receita para criar uma imagem Docker.
# Cada linha é uma instrução que o Docker executa em ordem.

# ETAPA 1: Build (compilar o projeto)
# Usamos uma imagem com Maven + JDK 17 para compilar
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o pom.xml primeiro (para o Docker cachear as dependências)
# Se só o código mudar, o Maven não precisa baixar tudo de novo
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código fonte
COPY src ./src

# Compila e empacota em um .jar (o -DskipTests pula os testes no build)
RUN mvn package -DskipTests

# =============================================
# ETAPA 2: Runtime (rodar a aplicação)
# Usamos uma imagem menor, só com o JRE (sem Maven)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia apenas o .jar gerado na etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta 8080 para fora do container
EXPOSE 8080

# Comando que roda quando o container inicia
ENTRYPOINT ["java", "-jar", "app.jar"]
