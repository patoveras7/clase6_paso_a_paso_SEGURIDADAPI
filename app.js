const express = require('express');
const app = express();
const port = 3000;
const libro = require('./models/moldel1');
const router = require('./routes/router');
const {auth} = require('express-oauth2-jwt-bearer');
const errorHandler = require('./middlewares/errorHandler');


const jwtCheck = auth({
    audience: 'https://localhost:3000/libros',
    issuerBaseURL: 'https://dev-trum667yet6t20x2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

app.use(express.json());
app.use('/libros', jwtCheck, router);
app.use(libro);
app.use(errorHandler);//VA LUEGO DE DEFINIR LAS RUTAS SINO SE CLAVA




app.listen(port, () => { 
console.log(`Servidor Express.js en funcionamiento con puerto en ${port}`)
}); 
