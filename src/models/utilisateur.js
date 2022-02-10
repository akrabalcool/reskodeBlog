import bcrypt from 'bcrypt'
import pkg from '@prisma/client'
let { PrismaClient } = pkg
let prisma = new PrismaClient()

export default {
    connexionGet: async (request,response)=>{
        response.render('Admin/auth/connexion')
    },
    connexion: async (request, response) => {
        let {loginUtilisateur, passwordUtilisateur} = request.body
        let data = [loginUtilisateur, passwordUtilisateur]
        if(data.every(element => {return element != ""})) {
            let utilisateur = await prisma.utilisateur.findFirst({
                where: {
                    loginUtilisateur: loginUtilisateur
                }
            })
            if(utilisateur && (await bcrypt.compare(passwordUtilisateur, utilisateur.passwordUtilisateur))) {
                request.userLogin(utilisateur, 'admin')
            } else {
                request.errors('Invalid credentials', '/')
            }
        } else {
            request.errors('Veuillez renseigner tous les champs', '/')
        }
    } 
}