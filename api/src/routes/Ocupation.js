const { Router } = require('express')
const { Ocupation } = require('../db')
const axios = require('axios')

const router = Router()


const ocupationApi = async function () {    //traigo datos de la API solo los que me interesannnn !!!
    const apiData = await axios.get("https://breakingbadapi.com/api/characters")
    return apiData.data.map((e, index) => e.occupation).flat()
}


router.get("/ocupation", async function (req, res) {
    const dataApi = await ocupationApi()
    const noRepeated = [...new Set(dataApi)].map(e => e.toLowerCase()) //Quito los duplicados y los mapeo para que sean todos minusculas
    noRepeated.forEach(e => {
        Ocupation.findOrCreate({
            where: { name: e }
        })
    })
    const allOcupations = await Ocupation.findAll()
    res.status(200).send(allOcupations)
})

module.exports = router;