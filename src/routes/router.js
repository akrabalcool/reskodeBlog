// NodeJs imported
import express from "express"

// imported from files
import utilisateur from '../models/utilisateur.js'
import authent from "../middlewares/authent.js"
import admin from "../admin/admin.js"
import article from "../models/article.js"

// Routers
export default (() => {
    // Configuration des routes
    let blog = express.Router()

    // Routes / (root principal)
    blog.route('/').get((request,response)=>{
        console.log('///////////////////////////////////////////////////////')
        console.log(request.session)
        console.log(response.locals)
        response.send({
            session: request.session,
            locals: response.locals,
            url: request.originalUrl
        })
    }) // L'ajout du middleware homeOff permet de desactiver le fonctionnment de la page

    blog.route('/juridique')

    blog.route('/economique')

    blog.route('/scientifique')

    blog.route('/login').post(utilisateur.connexion)

    blog.route('/admin').get(authent.loginVerification, admin.index)

    blog.route('/admin/article/create').post(authent.loginVerification, admin.ajouterArticle)

    return blog
})()