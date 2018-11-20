
FROM mysql:5.6

ENV MYSQL_DATABASE quiz

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/