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
                    response.redirect('/info/admin')
        } else {
            request.errors('Veuillez reseigner tous les chmaps', '/info')
        } 
    },

    chercherParType: async (request,response) =>{
        let {typeArticle} = request.params
        if(typeArticle){
            
            let article = await prisma.article.findMany({
                where:{
                    typeArticle:{
                        libelleTypeAticle: typeArticle
                    }
                }
            })
            
            //article.descriptionArticle.slice(1,100)
            
            article.forEach(element =>{ element.desc = element.descriptionArticle.slice(1,200) })
            response.locals.article = article
            return response.render('visiteurs/article/listeArticle')
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
            
            return response.render('visiteurs/article/voirArticle')
        }else{
            return response.errors('l\'article n\'exit plus ','/info')
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
        }
    },

    modifier: async (request,response)=>{
        let {idArticle} = request.params
        let {descriptionArticle} = request.body
        if(idArticle !="" && descriptionArticle !=""){
            let article = await prisma.article.update({
                where:{
                    idArticle:idArticle
                },
                data:{
                    descriptionArticle: descriptionArticle
                }
            })
        }
    }

    



}