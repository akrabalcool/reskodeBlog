import bcrypt from "bcrypt"
import pkg from"@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient();


async function ajouterTypeArticle (nom){

    await prisma.typeArticle.create({
        data:{
            libelleTypeAticle: nom
        }
    })

}

async function addArticle(){
    ajouterTypeArticle("juridique")
    ajouterTypeArticle("economique")
    ajouterTypeArticle("scientifique")
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
addArticle()

