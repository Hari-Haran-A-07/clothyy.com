FROM php:8.3-cli-alpine
WORKDIR /app
COPY . .
EXPOSE 8087
CMD ["php", "-S", "0.0.0.0:8087", "-t", "public"]
