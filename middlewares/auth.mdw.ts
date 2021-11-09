const expressJwt = require('express-jwt');
const util = require('util');

const KEY = process.env.JWT_SECRET_KEY;

export const  jwtMiddleware = (req, res) => {
    const middleware = expressJwt({ secret: KEY, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/register',
            '/api/auth/login',
            '/api/post/*',
            '/api/page/*',
            '/api/category/*',
            '/api/category',
        ]
    });

    return util.promisify(middleware)(req, res);
}
