const Ejemplos = require('../../models/ejemplo').ejemplo;
const sequelize = Ejemplos.sequelize;

module.exports = {
    list(req, res) {//console.log(req);
        return Ejemplos
            .findAll({})
            .then((item) => res.status(200).send(item))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return Ejemplos
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