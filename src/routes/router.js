// NodeJs imported
import express from "express"
import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()
// imported from files
import utilisateur from '../models/utilisateur.js'
import authent from "../middlewares/authent.js"
import admin from "../admin/admin.js"
import article from "../models/article.js"
import commentaire from "../models/commentaire.js"

// Routers
export default (() => {
    // Configuration des routes
    let blog = express.Router()

    // Routes / (root principal)
    
    blog.route('/').get( async (request,response)=>{
        let article = await prisma.article.findMany({
            orderBy:{
                datePublication:'desc'
            },
            include:{
                typeArticle:true 
            }
        })
        article.forEach(element =>{ element.desc = element.descriptionArticle.slice(1,30) })
        response.locals.article =  article
        let arti= []
        if (article.length>5) {
            for (let i = 0; i < 4; i++) { 
                 arti.push(article[i])   
            }
            response.locals.article =  arti
        }
         
        return  response.render('visiteurs/index.ejs')
    }) 
    // L'ajout du middleware homeOff permet de desactiver le fonctionnment de la page

    blog.route('/article/lire/:idArticle').get(article.chercherParid)

    blog.route('/article/ajoutCommentaire/:idArticle').post(commentaire.ajouterCommentaire)

    //:typeArticle peuvent prenf=dre trois forme economique , juridique et scientifique
    blog.route('/article/:typeArticle').get(article.chercherParType)


    blog.route('/login').get(utilisateur.connexionGet)

    blog.route('/login').post(utilisateur.connexion)

    blog.route('/admin').get(authent.loginVerification,admin.index)
    
    blog.route('/admin/article/create').get(authent.loginVerification,admin.getAjouterArticle)

    blog.route('/admin/article/create').post(authent.loginVerification, admin.ajouterArticle)

    blog.route('/admin/article/supprimer/:idArticle').get(article.supprimer)

    blog.route('/admin/article/delete/:idArticle').post(authent.loginVerification, admin.retirerArticle)
    
    blog.route('/admin/article/modifier/:idArticle').post(authent.loginVerification, admin.modifierArticle)
    
    blog.route('/admin/supprimerCommentaire/:idArticle').get(authent.loginVerification, admin.supprimerCommentaire)

    return blog
})()