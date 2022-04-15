import express from 'express';
import session from 'express-sessions';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

app.use(express.static(__dirname + '/public'))



//inicializar el motor de las plantillas
app.engine('handlebars', handlebars.engine());
// ubicacion de las vistas 
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
// leer json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configurar sesion
app.use(cookieParser());
app.use(session({
    //firmar  session
    secret: "ultrasecreto",
    resave: true,
    saveUnitialized: true,
    cookie: {
        maxAge: 300
    }
}))



//
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/signup', (req, res) => {
    res.render('sign');
})
app.get('/login', (req, res) => {
    res.render('login')
})



//ingresar o comprobar user
let users = [];
app.post('/signup', (req, res) => {
    const { username } = req.body;
    const userFound = users.find(el => el.username === username);
    if (userFound) {
        console.log("el usuario ya existe")
    } else {
        users.push(req.body);
        res.redirect('/perfil')
    }
})


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = user.find(el => el.username === username);
    if (user) {
        if (user.password === password) {
            res.redirect('/perfil')
        } else {
            console.log('contraseña invalida');
        }
    } else {
        console.log('El usuario no esta registrado')
    }
})


















const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})