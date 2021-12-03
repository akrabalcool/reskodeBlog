import Article from "../models/article.js"
import commentaire from "../models/commentaire.js"


export default {
    index: (request, response) => {
        response.send('Index')
    },

    ajouterArticle:Article.ajouter,

    modifierArticle:Article.modifier,

    retirerArticle:Article.supprimer,

    supprimerCommentaire: commentaire.supprimer,

    ajouterPublicite: (request, response) => {

    },

    modifierPublicite: (request, response) => {

    },

    retirerPublicite: (request, response) => {

    }
}