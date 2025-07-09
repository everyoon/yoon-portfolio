# 워드프레스 공식 이미지 기반
FROM wordpress:latest

# PHP 확장 추가가 필요하면 아래처럼 RUN 명령어 추가 가능
# RUN docker-php-ext-install mysqli gd

# 웹서버 기본 포트 열기
EXPOSE 80
