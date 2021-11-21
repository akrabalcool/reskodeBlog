import pkg from '@prisma/client'
const {PrismaClient} = pkg
const prisma = new PrismaClient()

export default {

    ajouter: async (request,response) => {
        let {imageArticle} = request.files ? request.files : ""
        let {titreArticle, descriptionArticle, liensArticle, typeArticle} = request.body
        let data = [imageArticle, titreArticle, descriptionArticle, liensArticle, typeArticle]
        if(data.every(element => {return element != ""})){
            let article = await prisma.article.create({
                data: {
                    imageArticle: Buffer.from(imageArticle.data).toString('base64') ,
                    titreArticle: titreArticle,
                    descriptionArticle: descriptionArticle ,
                    liensArticle: liensArticle,
                    idTypeArticle: typeArticle,
                    idUtilisateur: request.session.user.idUtilisateur
                }
            })
        } else {
            request.errors('Veuillez reseigner tous les chmaps', '/info')
        } 
    },

    chercherParType: (request,response) =>{
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

    chercherParid: (request,response)=>{
        let {idArticle} = request.params
        if(idArticle){
            let article = await prisma.article.findUnique({
                where:{
                    idArticle:idArticle
                }
            })
        }
    },

    supprimer: (request,response)=>{
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