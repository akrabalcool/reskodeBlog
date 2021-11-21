import pkg from '@prisma/client'
import { request, response } from 'express'
const {PrismaClient} = pkg
const prisma = new PrismaClient()


export default {

    ajouter:(request,response) =>{
        let {imageArticle} = request.files
        let {titre ,descriptionArticle,liensArticle,typeArticle} = request.body
        if(imageArticle&&titreArticle&&descriptionArticle&&liensArticle&&typeArticle){
            let article = await prisma.article.create({
                data :{
                    imageArticle: Buffer.from(imageArticle.data).toString('base64') ,
                    titre: titre,
                    descriptionArticle: descriptionArticle ,
                    liensArticle: liensArticle ,
                    idTypeArticle: typeArticle
                }
            })
            return response.render()
        }else{
            return response.redirect()
        }
           
    },

    chercherParType:(request,response) =>{
        let {typeArticle} = request.params
        if(typeArticle){
            let article = await prisma.article.findMany({
                where:{
                    idTypeArticle: typeArticle
                }
            })
            return response.render()
        }else{
            return response.redirect()
        }
    },

    chercherParid:(request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.findUnique({
                where:{
                    idArticle:idArticle
                }
            })
        }
    },

    supprimer:(request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.delete({
                where:{
                    idArticle:idArticle
                }
            })
        }
    },

    ajouterCommentaire: (request,response)=>{
        let {idArticle} = request.params
        let {nomOuEmail,contenu} = request.body
        if(idArticle){
            let article = await prisma.article.update({
                where:{
                    idArticle: idArticle
                },
                data:{
                    commentaires:{
                        create:{
                            nomOuEmail: nomOuEmail,
                            contenu: contenu
                        }
                    }
                }
            })       
            return  response.render()
        }

        return response.redirect()
    }



}