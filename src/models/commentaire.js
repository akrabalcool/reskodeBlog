import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()


export default {
    supprimer: async (request,response)=>{
        let {idCommentaire}=request.params
        if(idCommentaire)
        {
            let comentaire  = await prisma.commentaire.delete({
                where:{
                    idCommentaire:idCommentaire
                }
            })
            return response
        }
        return request
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
                return  response.redirect('/info/article/lire/'+idArticle+"#comment")
            }
                console.log(contenu,nomOuEmail);
                return  response.redirect('/info/article/lire/'+idArticle)
        }
        return request.error('erreur pas d\'article preciser', '/info')
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