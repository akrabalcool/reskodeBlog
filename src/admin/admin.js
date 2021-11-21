import article from "../models/article.js"

export default {
    index: (request, response) => {
        response.send('Index')
    },

    ajouterArticle: article.ajouter,

    modifierArticle: (request, response) => {

    },

    retirerArticle: (request, response) => {

    },

    ajouterPublicite: (request, response) => {

    },

    modifierPublicite: (request, response) => {

    },

    retirerPublicite: (request, response) => {

    }
}