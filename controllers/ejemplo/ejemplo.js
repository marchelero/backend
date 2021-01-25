const Ejemplo = require('../../models/ejemplo').ejemplo;
const sequelize = Ejemplo.sequelize;

module.exports = {
    list(req, res) {//console.log(req);
        return Ejemplo
            .findAll({})
            .then((item) => res.status(200).send(item))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return Ejemplo
            .findByPk(req.params.id)
            .then((item) => {
                console.log(item);
                if (!item) {
                    return res.status(404).send({
                        message: 'Ejemplos no encontrados',
                    });
                }
                return res.status(200).send(item);
            })
            .catch((error) => res.status(400).send(error));
    },
    async getByQuery(req,res){
        try {
            const ejemplo_query = `select * from dbEjemplo.ejemplo`;
            let ejemplo = await sequelize.query(ejemplo_query, {
                type: sequelize.QueryTypes.SELECT
            }, {
                raw: true
            });
            
            res.status(200).send({
                ejemplo
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ 'msg': 'error', 'error': error.message });
        }
        
    },
    /*
    add(req, res) {
        return Reportes
          .create({
            nombre: req.body.nombre,  
            descripcion: req.body.descripcion
          })
          .then((item) => res.status(201).send(item))
          .catch((error) => res.status(400).send(error));
      },*/

};