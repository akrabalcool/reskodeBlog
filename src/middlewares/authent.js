import pkg from '@prisma/client'
let { PrismaClient } = pkg
let prisma = new PrismaClient()

export default {

    loginVerification: (request, response, next) => {
        if(!request.session.user) {
            request.errors('Login to continue', '/info')
        } else {
            next()
        }
    },

    sessionRegistry: (request, response, next) => {
        if(request.session.user) {
            response.locals.user = request.session.user
        }
        request.userLogin = (data, redirect) => {
            if(request.session.user === 'undefined') {
                request.session.user = {}
            }  
            request.session.user = data
            response.redirect(redirect)
        }
        next()
    },

    superAdminRole: (request, response, next) => {
        let user = request.session.user
        if(user.role == "superAdmin") {
           next()
        } else {
            request.errors('Utilisateur non autorisé')
        }
    },

    adminAndSuperAdminRole: (request, response, next) => {
        let user = request.session.user
        if(user.role == "superAdmin" || user.role == "admin") {
           next()
        } else {
            request.errors('Utilisateur non autorisé')
        }
    }
}