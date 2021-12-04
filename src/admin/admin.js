import Article from "../models/article.js"
import commentaire from "../models/commentaire.js"
import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()


export default {
    index: (request, response) => {
        response.render('include/side')
    },

    ajouterArticle:Article.ajouter,
    
    getAjouterArticle: async (request,response)=>{
        //je recupère tout les articles
        let typeArticle = await prisma.typeArticle.findMany()
        response.locals.TypeArticle = typeArticle
        response.render('Admin/article/ajout')
    },

    modifierArticle:Article.modifier,

    retirerArticle:Article.supprimer,

    supprimerCommentaire: commentaire.supprimer,

    ajouterPublicite: (request, response) => {

    },

    modifierPublicite: (request, response) => {

    },

    retirerPublicite: (request, response) => {

    }
}