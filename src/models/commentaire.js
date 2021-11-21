import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()


export default {
    supprimer:(request,response)=>{
        let {idCommentaire}=request.params
        if(idCommentaire)
        {
            let comentaire  = prisma.commentaire.delete({
                where:{
                    idCommentaire:idCommentaire
                }
            })
            return response
        }
        return response
    }
}