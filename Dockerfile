FROM wordpress:latest

RUN docker-php-ext-install mysqli

COPY . /var/www/html

EXPOSE 80
