import Article from "../models/article.js"
import commentaire from "../models/commentaire.js"
import pkg from "@prisma/client"
import moment from "moment"
const {PrismaClient} = pkg
const prisma = new PrismaClient()

async function verifeIfTypeArticleExist (libelle){
    let state = false ;
    let typeArticle = await prisma.typeArticle.findMany()
    typeArticle.forEach(element => { if(element == libelle){ state= true }})
    return state
}

export default {
   

    index: (request, response) => {
        response.locals.moment = moment
        response.render('Admin/article/index')
    },

    ajouterArticle:Article.ajouter,

    
    
    getAjouterArticle: async (request,response)=>{
        //je recupère tout les articles
        let typeArticle = await prisma.typeArticle.findMany()
        response.locals.TypeArticle = typeArticle
        response.locals.moment = moment
        response.render('Admin/article/ajout')
    },
    modifierArticleGet: Article.modifierGet,

    modifierArticle:Article.modifier,

    listeAModifier: async (request,response) =>{
        let {typeArticle} = request.params
        
        if(verifeIfTypeArticleExist(typeArticle)){
            
            let article = await prisma.article.findMany({
                where:{
                    typeArticle:{
                        libelleTypeAticle: typeArticle
                    }
                },
                orderBy:{
                    datePublication:'desc'
                },
                include:{
                    typeArticle:true 
                }
            })
            
            //article.descriptionArticle.slice(1,100)
            
            
            response.locals.article = article
            response.locals.moment = moment
            response.locals.typeArticle = typeArticle
            return response.render('Admin/article/liste')
        }else{
            return response.errors('type d\' article non trouver','/')
        }
    },

    deconnect:async (request,response)=>{
        request.session.user = undefined
        return request.errors('utilisateur  deconnecter','/')
    },

    retirerArticle:Article.supprimer,

    supprimerCommentaire: commentaire.supprimer,

    ajouterPublicite: (request, response) => {

    },

    modifierPublicite: (request, response) => {

    },

    retirerPublicite: (request, response) => {

    }
}