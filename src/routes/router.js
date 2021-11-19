import express, { response } from "express"
export default (() => {
    // Configuration des routes
    let blog = express.Router()

    // Routes / (root principal)
    blog.route('/').get((request,response)=>{
        response.send("cool")
    }) // L'ajout du middleware homeOff permet de desactiver le fonctionnment de la page
        
    return blog
})()