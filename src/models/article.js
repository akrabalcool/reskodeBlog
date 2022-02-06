import pkg from '@prisma/client'
const {PrismaClient} = pkg
const prisma = new PrismaClient()
import commentaire from './commentaire.js'

async function verifeIfTypeArticleExist (libelle){
    let state = false ;
    let typeArticle = await prisma.typeArticle.findMany()
    typeArticle.forEach(element => { if(element == libelle){ state= true }})
    return state
}
export default {

    ajouter: async (request,response) => {
        let {imageArticle} = request.files ? request.files : ""
        let {titreArticle, descriptionArticle, liensArticle, typeArticle} = request.body
        let data = [imageArticle, titreArticle, descriptionArticle/*, liensArticle*/, typeArticle]
        if(data.every(element => {return element != ""})){
            let article = await prisma.article.create({
                data: {
                    imageArticle: Buffer.from(imageArticle.data).toString('base64') ,
                    titreArticle: titreArticle,
                    descriptionArticle: descriptionArticle ,
                    /*liensArticle: liensArticle,*/
                    idTypeArticle: typeArticle,
                    idUtilisateur: request.session.user.idUtilisateur
                } 
            })
                    response.redirect('/info/admin')
        } else {
            request.errors('Veuillez reseigner tous les chmaps', '/info')
        } 
    },

    chercherParString:async (request,response)=>{
        let { chercher } = request.body
        let article = await prisma.article.findMany({
            where:{
                titreArticle: {
                    contains: chercher,
                }
            }
        })
        response.locals.article = article
        response.render('visiteurs/article/sortieChercher')
    },

    chercherParType: async (request,response) =>{
        let {typeArticle} = request.params
        
        if(verifeIfTypeArticleExist(typeArticle)){
            
            let article = await prisma.article.findMany({
                where:{
                    typeArticle:{
                        libelleTypeAticle: typeArticle
                    }
                },
                orderBy:{
                    
                },
                include:{
                    typeArticle:true 
                }
            })
            
            //article.descriptionArticle.slice(1,100)
            
            article.forEach(element =>{ element.desc = element.descriptionArticle.slice(1,200) })
            response.locals.article = article
            response.locals.typeArticle = typeArticle
            return response.render('visiteurs/article/listeArticleCareaux')
        }else{
            return response.errors('type d\' article non trouver','/info')
        }
    }, 

    chercherParid: async (request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.findUnique({
                where:{
                    idArticle:idArticle
                }
            })

            response.locals.article = article
            response.locals.commentaire = await commentaire.articleCommentaire(idArticle)
            return response.render('visiteurs/article/voirArticle')
        }else{
            return request.errors('l\'article n\'exit plus ','/info')
        }
        
    },

    supprimer: async (request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.delete({
                where:{
                    idArticle:idArticle
                }
            })
            return request.errors('l\'article '+article.titreArticle+'a ete supprimer','/info/admin')
        }
    },
    
    modifierGet: async (request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.findUnique({
                where:{
                    idArticle:idArticle
                }
            })
            response.locals.article = article
            let typeArticle = await prisma.typeArticle.findMany()
            response.locals.TypeArticle = typeArticle
            return response.render('Admin/article/modifier')
        }else{
            return request.errors('l\'article n\'exit plus ','/info')
        }

    },
    
    modifier: async (request,response)=>{
        let {idArticle} = request.params
        let {descriptionArticle,imageArticle,titreArticle,typeArticle} = request.body
        if(idArticle !="" && descriptionArticle !=""){
            let article = await prisma.article.update({
                where:{
                    idArticle:idArticle
                },
                data:{
                    descriptionArticle: descriptionArticle ,
                    imageArticle : imageArticle,
                    titreArticle: titreArticle,
                    idTypeArticle: typeArticle
                }
            })
            return request.errors("l'article "+ article.titreArticle+" "+"a ete modifier",'/info/admin')
        }
        
    }



    



}