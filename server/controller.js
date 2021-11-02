

const houses = require('./db.json')
let globalId = 4 


module.exports = { 
    getHouses: (req, res) => res.status(200).send(houses),
    deleteHouses: (req, res) => { 
        let index = houses.findIndex(elem => elem.id === +req.params.id) 
        houses.splice(index, 1)
        res.status(200).send(houses) 
    },
    createHouses: (req, res) => { 
        let{address, price, imageURL} = req.body 
        let newHouse = { 
            id: globalId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse) 
        res.status(200).send(houses) 
        globalId++ 
    },
    updateHouse: (req, res) => { 
        let { id } = req.params 
        let { type } = req.body   
        let index = houses.findIndex(elem => +elem.id === +id) 

        if (houses[index].price === 10000 && type === 'plus') {
            res.status(400).send('cannot go above $10,000')
        } else if (houses[index].price === 0 && type === 'minus'){
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            houses[index].price++
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price--
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}