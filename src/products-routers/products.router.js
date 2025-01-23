import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'

import pM from './productManager.js'

const router = Router()

router.get('/products', async (req, res) => {
    const jsonProducts = await pM.getProducts() //👈  PRODUCTOS DEL JSON
    if (jsonProducts) {
        JSON.parse(jsonProducts)
        res.status(200).send(`PRODUCTS <br><br> ${jsonProducts}`)
    }
    else {
        res.status(404).json({ message: 'You have to add products' })
    }
})

router.get('/products/query', async (req, res) => {
    const jsonProducts = await pM.getProducts() //👈  PRODUCTOS DEL JSON 
    const parseObjects = await JSON.parse(jsonProducts)// 👈 TRAIGO LOS PRODUCTOS Y LOS PARSEO PARA UTILIZAR MÉTODOS DE ARRAY
    const { limit } = req.query // 👈 TOMO LA CONSULTA DE LA URL 👇
    //http://localhost:8080/query?limit=5
    const quantityLimited = parseObjects.filter(products => products.id <= parseInt(limit))
    limit ? res.status(200).json(quantityLimited) : res.status(200).json(parseObjects)
})

router.get('/products/:prodID', async (req, res) => {
    const jsonProducts = await pM.getProducts() //👈  PRODUCTOS DEL JSON 
    const parseObjects = await JSON.parse(jsonProducts) // 👈 TRAIGO LOS PRODUCTOS Y LOS PARSEO PARA UTILIZAR MÉTODOS DE ARRAY
    const { prodID } = req.params // 👈 TOMO EL PARAMÉTRO DE LA URL 👇
    //http://localhost:8080/productsID/2
    const productFound = parseObjects.find(prod => prod.id == prodID)
    productFound ? res.status(200).json(productFound) : res.status(400).json({ response: 'product ID not found' })

})
router.put('/products/:prodID', async (req, res) => {
    const { prodID } = req.params
    const { body } = req
    const jsonProducts = await pM.getProducts() //👈  PRODUCTOS DEL JSON 
    const parseObjects = await JSON.parse(jsonProducts)
    const productFound = parseObjects.find(obj => obj.id == prodID)
    // 📢 {"stock": 12} 👈 VALOR A MODIFICAR CON "PUT"
    if (productFound) {
        const updateProduct = {
            ...productFound,
            stock: body.stock
        }
        await pM.updateProduct(updateProduct)// 👈 ENVÍO LA MODIFICACIÓN AL ARCHIVO JSON
        res.status(201).json(updateProduct)
    }
    else {
        res.status(404).json({ message: 'Product ID not found' })
    }
})

router.post('/products', async (req, res) => {
    const { body } = req
    const newUser = {
        id: uuidv4(),
        ...body
    }
    await pM.addProduct(newUser)//👈 ENVÍO EL NUEVO OBJETO AL ARCHIVO JSON
    console.log(newUser)
    res.status(201).json(newUser)
    // {
    //     "title": "Venum",
    //     "description": "calza-corta",
    //     "code": 1000,
    //     "price": 8500,
    //     "status": true,
    //     "stock": 7,
    //     "category": "calzas",
    //     "thumbnail": "imgCalza"
    // }
    // 📢 👆 OBJETO PARA POSTMAN PARA UTILIZAR CON "POST"
})

router.delete('/products/:prodID', async (req, res) => {
    const { prodID } = req.params
    const jsonProducts = await pM.getProducts()//👈  PRODUCTOS DEL JSON 
    const parseObjects = await JSON.parse(jsonProducts)
    const productFound = parseObjects.find(obj => obj.id == prodID)
    if (productFound) {
        pM.deleteProduct(productFound) // 👈 OBJETO A BORRAR
        res.status(200).json({ message: 'Product deleted' })
    }
    else { res.status(404).json({ message: 'Product not found' }) }

})

export default router