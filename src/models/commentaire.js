import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()


export default {
    supprimer: async (request,response)=>{
        let {idCommentaire,idArticle}=request.params
        if(idCommentaire)
        {
            let comentaire  = await prisma.commentaire.delete({
                where:{
                    idCommentaire:idCommentaire
                }
            })
            return request.errors('commentaire supprimer ','/article/lire/'+idArticle+"#comment" )
        }
        return response.redirect('/article/lire/'+idArticle+"#comment")
    },

    ajouterCommentaire: async (request,response)=>{
        let {idArticle} = request.params
        let {nomOuEmail,contenu} = request.body
        if(idArticle){
            if ((contenu !="")&&(nomOuEmail!="")){
                let commentaire = await prisma.commentaire.create({
                    data: {
                        contenuCommentaire: contenu,
                        idArticle: idArticle,
                        nomOuEmail: nomOuEmail
                    }
                })  
                return  response.redirect('/article/lire/'+idArticle+"#comment")
            }
                console.log(contenu,nomOuEmail);
                return  response.redirect('/article/lire/'+idArticle)
        }
        return request.error('erreur pas d\'article preciser', '/')
    },

    articleCommentaire: async (id)=>{
        let comt = await prisma.commentaire.findMany({
            where:{
                idArticle: id
            }
        })
        return comt 
    }
}