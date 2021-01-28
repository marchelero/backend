const express = require('express');
const router = express.Router();

const ejemploController = require('../controllers').ejemplo;

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ejemplo' });
});


//Rutas para Simof
router.get('/datos', ejemploController.list);
router.get('/datos/:id', ejemploController.getById);
router.get('/query', ejemploController.getByQuery);
router.post('/datos', ejemploController.add);
router.put('/datos/:id', ejemploController.update);
router.delete('/datos/:id', ejemploController.delete);
module.exports = router;
