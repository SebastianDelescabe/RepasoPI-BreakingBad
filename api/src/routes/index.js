const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const characterRoute = require ('./Characters')
const ocupationRoute = require ('./Ocupation')
const characterPostRoute = require ('./postCharacters')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/",characterRoute)
router.use("/",ocupationRoute)
router.use("/",characterPostRoute)


module.exports = router;
