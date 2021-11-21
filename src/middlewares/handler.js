
export default {
    userErrors: (request, response, next) => {
        if(request.session.errors) {
            response.locals.errors = request.session.errors
            request.session.errors = undefined
        }
        request.errors = (content, redirect) => {
            if(request.session.errors == 'undefined') {
                request.session.errors = {}
            }
            request.session.errors = content
            response.redirect(redirect)
        }
        next()
    },

    systemErrorHandler: (request, response, next) => {
        let err = new Error("Cette page est introuvable")
        err.status = 404
        next(err)
    },

    notFoundHandler: (err, request, response, next) => {
        response.status(err.status || 5000)
        response.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        })
    }
}