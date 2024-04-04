# test-backend
this server configed for nourse project.

# install dependencies
npm install<br />
Or<br />
yarn<br />

# configuration Database
database has location cordination so it's need postgis extention.<br />
for install it on ubuntu use following command:<br />
sudo apt install postgis postgresql-14-postgis-3<br />
after installing extention you can create database via following command in postgerss command line<br />
CREATE DATABASE "test-db";<br />
\connect "test-db";<br />
CREATE EXTENSION postgis;<br />
# migration command
to migrate the database use following command<br />
cd server<br />
npx sequelize-cli db:migrate<br />
# developmet command for run project
npm run dev<br />
Or<br />
yarn dev<br />

# production command for run project
npm run start
Or
yarn start