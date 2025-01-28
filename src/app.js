import express from "express"
import router from "./products-routers/products.router.js"
import cartRouter from "./cart-router/cart.router.js"

import path from 'path'
import { fileURLToPath } from "url"

const app =express()
const PORT= 8080

const fileName=fileURLToPath(import.meta.url)
const dirName= path.dirname(fileName)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(path.join(dirName,'../public')))

// 👇 DOS MANEJADORES DE RUTAS CON SUS RESPECTIVAS CLASES Y ARCHIVOS JSON.
app.use('/api', router)
app.use('/api', cartRouter)


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})