const express = require('express');
const router = express.Router();

const ejemploController = require('../controllers').ejemplo;

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ejemplo' });
});


//Rutas para Simof
router.get('/datos', ejemploController.list);
router.get('/datos/:id', ejemploController.getById);

module.exports = router;
