Pasos a seguir

npm install --save-dev sequelize-cli


npx sequelize-cli init

npx sequelize-cli model:generate --name ejemplo --attributes id:integer,nombre:string,detalle:string

npx sequelize-cli seed:generate --name ejemplo







npx sequelize-cli db:create

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
