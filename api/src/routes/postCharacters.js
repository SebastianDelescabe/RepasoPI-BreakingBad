const { Router } = require('express')
const { Ocupation, Character } = require('../db')

const router = Router()


router.post("/characters", async function (req, res) {
    const {name,nickname,birthday,status,img,createdInDb,ocupation,} = req.body

    if(name && nickname && birthday && ocupation){
        let characterCreated = await Character.create({
            name,
            nickname,
            birthday,
            img,
            status,
            createdInDb,
        })

        let ocupationDb = await Ocupation.findAll({
            where: {
                name: ocupation  //Busco en la tabla de ocupaciones la ocupacion que me pasan por body , EL RESTO CREO EN OCUPACION BUSCO!
            }
        })
        characterCreated.addOcupation(ocupationDb) //al personaje creado le paso como ocupacion los que encontre que sean la que me paron por body

        res.status(200).send("Personaje creado correctamente!! revisar BD")

    }else{
        res.status(404).send("Formulario incompleto")
    }
})

module.exports = router;