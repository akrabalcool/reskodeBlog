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
        return response
    },

    ajouterCommentaire: async (request,response)=>{
        let {idArticle} = request.params
        let {nomOuEmail,contenu} = request.body
        if(idArticle){
            let commentaire = await prisma.commentaire.create({
                data: {
                    contenu: contenu,
                    idArticle: idArticle,
                    nomOuEmail: nomOuEmail
                }
            })  
            return  response.render()
        }
        return response.redirect()
    }
}