# =============================================
# Dockerfile do Frontend
# =============================================
# Aqui usamos o Nginx para servir os arquivos HTML/CSS/JS

# Imagem base: Nginx em versão Alpine (super leve, só ~5MB)
FROM nginx:alpine

# Remove a configuração padrão do Nginx e coloca a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos do frontend para onde o Nginx serve
COPY . /usr/share/nginx/html/

# Expõe a porta 80 (porta padrão HTTP)
EXPOSE 80

# Nginx já inicia automaticamente com a imagem base
