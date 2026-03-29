# =============================================
# Dockerfile do Frontend
# =============================================
# Aqui usamos o Nginx para servir os arquivos HTML/CSS/JS

# Imagem base: Nginx em versão Alpine (super leve, só ~5MB)
FROM nginx:alpine

# A imagem oficial do nginx processa automaticamente qualquer arquivo
# em /etc/nginx/templates/*.template, substituindo variáveis de ambiente
# (ex: ${BACKEND_URL}) antes de iniciar — sem precisar de scripts extras.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copia os arquivos do frontend para onde o Nginx serve
COPY . /usr/share/nginx/html/

EXPOSE 80
