import bcrypt from "bcrypt"
import pkg from"@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient();


async function ajouterTypeArticle (){

    await prisma.typeArticle.create({
        data:{
            libelleTypeAticle: ""
        }
    })

}

async function ajouterUtilisateur (){
    await prisma.utilisateur.create({
        data:{
            loginUtilisateur:"akra",
            passwordUtilisateur: await bcrypt.hash("boncool",12)
        }
    })
}

        

//ajouterUtilisateur()

ajouterTypeArticle()