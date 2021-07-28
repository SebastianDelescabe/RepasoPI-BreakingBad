const { Router } = require('express')
const { Character, Ocupation } = require('../db')
const axios = require('axios')

const router = Router()

const dataApi = async function () {    //traigo datos de la API 
    const apiData = await axios.get("https://breakingbadapi.com/api/characters")
    const apiInfo = await apiData.data.map(e => { //Mapeo para traer  solo los datos que me interesannnn !!! 
        return {
            name: e.name,
            img: e.img,
            nickname: e.nickname,
            status: e.status,
            id: e.char_id,
            occupation: e.occupation.map(e => e),
            birthday: e.birthday,
            appearence: e.appearance.map(e => e)
        }
    })
    return apiInfo
}

const dataBd = async function () { //Guardo los datos de la BASE DE DATOS
    return await Character.findAll({
        include: {
            model: Ocupation,  //Incluyo el modelo ocupation para que me traiga la info del character que esta en la tabla ocupation si no, nunca van a tener ese campo lleno
            attributes: ['name'],
            through: { //comprobacion para traer atributos
                attributes: []
            }
        }
    })
}


const allData = async function () {  //FUNCION PARA TRAER TODA LA INFORMACION DENTRO DE LAS RUTAS!! 
    const infoApi = await dataApi()  //traigo data de api
    const infoDb = await dataBd() //traigo data de info db
    const allInfo = await infoApi.concat(infoDb)  //concateno toda la info y busco si existe query
    return allInfo;
}

router.get("/characters", async function (req, res) {
    const name = req.query.name

    const allInfo = await allData()

    if (name) {
        const encontrado = allInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).splice(0, 6) //filtro el nombre por query con includes para que incluya todos los parecidos
        if (encontrado.length > 0) {  //si encontrado tiene length es que encontro
            res.status(200).send(encontrado) //envio el encontrado
        } else {
            res.status(404).send("No se encontro nombre") //si no tiene lenght no encontro nada.
        }
    } else {  //SI NO existe query ! envio toda la info que tengo para el paginado
        res.status(200).send(allInfo)
    }
})

router.get("/characters/:id", async function (req, res) {
    // const {id} = req.params destructuring
    const id = req.params.id //sin destructuring

    const allCharacters = await allData()

    if (id) {
        const character = allCharacters.filter(e => e.id == id)
        if (character.length > 0 ) {
            res.status(200).send(character)
        } else {
            res.status(400).send("No se encotro personaje con ese ID")
        }

    }
})

module.exports = router;