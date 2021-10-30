Aquest fitxer indica com executar l'applicació. Les instruccions són les següents:
1) Executem les següents comandes per instalar els moduls necesaris per l'applicació(desde dintre del directori estudiant_mysql_server):
$ npm install --save express body-parser morgan
$ npm install -g sequelize-cli
$ npm install --save sequelize
$ npm install --save mysql2

2)Configurem el fitxer config/config.json amb les dades del nostre servidor mysql
Exemple:
{
  "development": {
    "username": "root",
    "password": "1234",
    "database": "estudiant_mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "1234",
    "database": "estudiant_mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "1234",
    "database": "estudiant_mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

3)Creem la base de dades al nostre servidor mysql i exportem la base de dades de l'aplicació anomenda "base-dades.sql"
Creem la base de dades:
mysql> CREATE DATABASE new_database;
Exportem la base de dades base-dades.sql amb el nom estudiant_mysql:
mysql -u username -p new_database < base-dades.sql

4) L'aplicació s'executarà correctament amb el port 8000. Ara necessitem una manera de reiniciar el servidor cada vegada que canviem alguna cosa en el nostre codi.
Per això executem la següent comanda:
$ npm i -D nodemon

5) Executem el servidor amb la següent comanda:
$ npm start

6) Ara obrim el fitxer views/index.html al nostre navegador preferit i ja tindrem l'applicació funcionant

