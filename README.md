## API para Servicio de Reporte Logs

### Pasos a seguir
Para tener el backend correctamente funcionando se debe seguir los siguientes pasos:
Clonar el repositorio
```
git clone https://github.com/marchelero/backend.git
```
acceder a la carpeta con el mismo nombre
```
mkdir backend
```
instalar todas las dependencias
```
npm install
```

y antes de ejecutar el comando para correr el proyecto asegurese de contar con la base de datos del mismo, para este se cuenta con dos formas de obtener dicha BD.

****La primera opcion es a traves de sequelize ejecutando los siguientes comandos:****

*Creara una base de datos con el nombre que se encuentra en la carpeta config/config.js*

```
npx sequelize-cli db:create
```
*Creara las tablas dentro de la BD con la estructura tal cual este en la carpeta migrations*
```
npx sequelize-cli db:migrate
```
*Por ultimo, (solo si se requiere) llenara la BD con datos que se encuentren configurados en la semilla*

```
npx sequelize-cli db:seed:all
```
de esta manera se habra creado y llenado la BD correctamente y se puede proceder a iniciar 


****La segunda opcion ejecutando el archivo ***database.sql*** ubicado enla carpeta db.****

En caso de no utilizar sequelize se cuenta con un archivo sql que se debe ejecutar este mismo creara la BD y tabla correspondiente con contenido de ejemplo para su uso.

****MUY IMPORTANTE**** 
En caso de utilizar este segundo metodo se debe ir al path models/ejemplo/ y reemplazar el contenido del archivo ejemplo2.js por el que tiene por nombre ejemplo.js, ya que el archivo de ejemplo.js que viene por defecto en el repositorio fue creado por sequelize.

Ahora el paso final para correr el proyecto es ejecutar el siguiente comando

```
npm run dev
```
de esta manera tendra el proyecto corriendo en http://localhost:3000/ejemplo

### Acerca del repositorio
API, estructurado para propositos generales, es decir, servir datos a diferentes sistemas o subsistemas.

### Documentación
- [Expressjs](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)

### Requerimientos
Para trabajar de forma local
- [Nodejs y Npm, ultima versión en lo posible](https://nodejs.org/en/)

### Instalar dependencias
```
npm install
```
en su versión corta
```
npm i
```

#### Iniciar API con npm
```
npm start
```

#### Iniciar API con yarn
```
yarn start
```

### Sequelize
Instalar sequelize-cli
```
npm install -g sequelize-cli
```
o
```
npm install --save-dev sequelize-cli
```

Iniciar el proyecto con sequelize

```
npx sequelize-cli init
```

### Configurar .sequelizerc
Se debe configurar lo siguiente: ***'./models/ejemplo'*** el **ejemplo** es la carpeta personaliza para cada proyecto.
```
"models-path": path.resolve('./models/ejemplo'),
"seeders-path": path.resolve('./seeders/ejemplo'),
"migrations-path": path.resolve('./migrations/ejemplo')
```

Generar modelos y migraciones
- **name**, nombre del modelo en singular (***ejemplo***, reflejo en trabla ***ejemplos*** plural). // esta se puede modificar manualmente a singular
- **attributes**, nombre de las columnas de la tabla ***ejemplo*** sin separacion entre las mismas.

Instrucción, en caso de no tener instalado el sequelize-cli de forma global.
```
npx sequelize-cli model:generate --name ejemplo --attributes nombre:string,detalle:string
```
Si se tiene instalado proceder de la siguiente manera.
```
sequelize model:generate --name ejemplo --attributes nombre:string,detalle:string
```

Ejecutar las migraciones
```
sequelize db:migrate
```
Deshacer la migración
```
sequelize db:migrate:undo
```

Generar los seeders
- **name**, se recomienda que el nombre sea el mismo nombre de la tabla.

```
sequelize seed:generate --name ejemplo
```

Ejecutar los seeders
```
sequelize db:seed:all
```

Deshacer los seeders
```
sequelize db:seed:undo:all
```

Para más información, vease [sequelize-migrations](http://docs.sequelizejs.com/manual/migrations.html)

### Ejemplo de asociaciones
Tablas
- **items**, el modelo será singular ***item***.
- **personas**, el modelo será singular ***persona***.

Generando modelos
```
sequelize model:create --name persona --attributes nombre:string,apellidos:string,edad:integer
sequelize model:create --name item --attributes itemId:integer,nombre:string,descripcion:string,capacidad:integer
```

Para más información, vease [sequelize-associations](http://docs.sequelizejs.com/manual/associations.html)

##### Otros ejemplos
Cuando se agrega el **usuario_id** en el modelo **rol**
```
Rol.hasOne(Usuario);	//Rol con un Usuario
Usuario.belongsTo(Rol);	//Usuario con un Rol

Rol.belongsToMany(Usuario);	//Rol con varios Usuarios
Usuario.hasMany(Rol);	//Usuario con varios Roles

```

### Consultas sin usar el modelo
```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;

getRoles(req, res) {
  return sequelize.query("SELECT * FROM roles WHERE(estado=:mi_estado)",
    {
      replacements: {
        mi_estado: true,	//Parametros de where
      }
    },
    { type: sequelize.QueryTypes.SELECT }, {
      raw: true
    })
    .then((roles) => res.status(200).send(roles))
    .catch((error) => res.status(400).send(error));
}
```

### Incluir logs en CRUD
```
const Rol = require('../models').rol;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

add(req, res) {
  return Rol
    .create({
      descripcion: req.body.descripcion,
      estado: req.body.estado,
    })
    .then((rol) => res.status(200).send(rol))
    .catch((error) => { logger.log('error', error); res.status(400).send(error) });
},

```

### Incluir transacciones en CRUD
Registro de **roles**. También se puede utilizar funciones o procedimientos almacenados.
```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

addRol(req, res) {
  return sequelize.transaction(t => {
    return Rol
	  .create({
	    descripcion: req.body.descripcion,
		estado: req.body.estado
	  }, {transaction : t})
	  .then(rol => {
		t.commit();
		res.status(200).send(rol)
	  })
	  .catch(error => { 
	    t.rollback();
	    logger.log('error', error);
	    res.status(400).send(error)
	  });
    });
  }
```

```
const Rol = require('../models').rol;
const sequelize = Rol.sequelize;
const logger = require('winston');
logger.configure({ transports: [new logger.transports.File({ filename: 'logs/log.log' })] });

addRol(req, res) {
  var sql = "INSERT INTO roles('descripcion', 'estado', 'createdAt', 'updatedAt') VALUES('Administrador',true,"+new Date()+","+new Date()+")";
  return sequelize.transaction(t => {
    return sequelize.query(sql, {transaction : t})
      .then(rol => {
        t.commit();
        res.status(200).send(rol);
      })
      .catch(error => { 
        t.rollback();
        logger.log('error', error);
        res.status(400).send(error)
      });
    });
  }
```

### Uso de async y await
Permite trabajar de manera sincrona, aplicando el **async** en la función y **await** en los proocesos.
```
async function tasks() {
  let result1 = await resolveTask1();
  let result2 = await resolveTask2();
  return (result1, result2);
}
```

### Uso de Promesas
Con el uso de **promises** los métodos asíncronos devuelvan valores como si fueran síncronos, en vez de inmediatamente retornar el valor final.
```
return new Promise(function(resolve, reject) {
  request.get('http://localhost:3000/api/prueba', function(err, resp, body) {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(body));
    }
  })
})
```

### Subir o cargar archivos 
Para subir archivos se recomienda el **multer** habiendo alternativas a disposición.
```
npm install multer --save
```

Configuración necesaria para el uso de **multer**. La ruta base es el **public** del proyecto **backend**, solo se debe indicar la carpeta o la ruta donde se subiran los archivos.
```
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
```

El **upload** debe ser usado en la ruta indicando si es solo para subir uno o multiples archivos.

```
router.post('/api/usuarios', upload.single('foto'), usuariosController.add);
```

En el controller recibir el nombre del archivo con la siguiente instrucción.
```
const file = req.file
```

```
router.post('/api/usuarios', upload.array('fotos', 5), usuariosController.add);
```

En el controller se reciben en un array los nombres de los archivos con la siguiente instrucción.
```
const files = req.files
```

