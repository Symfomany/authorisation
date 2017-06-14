/**
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
let jwt = require('jsonwebtoken'); // permet de créer un jeton pour l'utilisateur 
let expressJwt = require('express-jwt');
/**
 * http://www.meanjs.fr/jwt-lauthentification-avec-token-plutot-quavec-cookie/
 * express-jwt va intercepter toutes les requêtes entrantes, desquelles il va récupérer dans le header 'Authorization: Bearer ...', puis va décoder le token avec le secret. 
 */
let bcrypt = require('bcrypt'); // module pour crypter le mot de passe
let nodemailer = require('nodemailer'); // module pour envoi d'email

app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());


/**
 * Bonus: Nodemailer configuration
 */
var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "eccfcf64a912f3",
        pass: "7bef7b105b4c7b"
    }
});

/**
 * Module RethinkDb
 */
let r = require('rethinkdb');


let Upload = require('upload-file');


/**
 * Erreur 500 sortie en JSON
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

/**
 *
Un JWT est un objet JSON encodé qu'un serveur (Node par exemple) encode en utilisant une clé privée. 

L'objet JSON encodé est un token que vous enverrez à un client qui s'est authentifié avec succès.

 Le client l'enverra ensuite au serveur à chaque requête faite à ce même serveur. 
Si en utilisant sa clé privée le serveur parvient à décoder le token, le serveur sait que le client qui a joint ce token est bien celui qu'il est censé être.
 Le serveur pourra alors authoriser le client à accéder aux resources demandées par le client.
 
 */

// clef secrete du serveur permettant de maniere unique d'encrypter 
// le jetton avec les données clients
let secret = 'q5f6ds465sdfg4v6466f15sdf56sd1f56s165f1sd65f156s16sfdfdf4d6f4s6$5ndjwk';


let connection = r.connect({
    db: "test" //your database
}).then((connection) => { // une fois qu'il a effectuer une connexion

    app.get('/', (req, res) => {
        res.json('Server is running...')
    });


    /**
     * La création et l'envoi d'un token au client lorsqu'il se connecte.
     */
    app.post('/signin', (req, res) => {

        // création d'un jetton (token) avec la clef secret + clef publique
        let token = jwt.sign({
            nom: 'Boyer',
            prenom: 'Julien'
            // L'objet passé en premier paramètre à sign() va être encodé.
        }, secret, { expiresIn: 18000 }); // // 60*5 minutes

        // Charge à vous, côté client, d' ajouter le token au header de chaque requête
        res.json({
            id_token: token,
            user: {
                nom: 'Boyer',
                prenom: 'Julien'
            },
        });
    });



    /**
     * Toutes ces actions qui suivent sont sécurisées par le middleware expressJwt() 
     * qui vérifie la présence de jetton coté client (dans la requete HTTP) avec sa clef secrete coté serveur
     */

    app.get('/remove/:id', expressJwt({ secret: secret }), (req, res) => {
        let id = req.params.id;

        r.table('answers').get(id).delete().run(connection, (err, cursor) => {
            if (err) throw err;

            r.table('answers').orderBy('question').run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray().then(function (results) {
                    res.json(results);
                }).error(console.log);
            });
        });

    });

    app.get('/answers', expressJwt({ secret: secret }), (req, res) => {
        r.table('answers').orderBy('question').run(connection, (err, cursor) => {
            if (err) throw err;
            cursor.toArray().then(function (results) {
                res.json(results);
            }).error(console.log);
        });

    });

    app.post('/add', expressJwt({ secret: secret }), (req, res) => {

        let newAnser = req.body;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newAnser.reponse, salt, function (err, hash) {

                // j'écraser la réponse par le hash généré
                newAnser.reponse = hash;

                r.table('answers').insert(newAnser).run(connection, (err, cursor) => {
                    if (err) throw err;

                    r.table('answers').orderBy('question').run(connection, (err, cursor) => {
                        if (err) throw err;
                        cursor.toArray().then(function (results) {
                            res.json(results);
                        }).error(console.log);
                    });


                });
            });
        });


    });



});




app.listen(3000, function () {
    console.log('Listened on port 3000!')
})