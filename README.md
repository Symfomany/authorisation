![enter image description here](https://cdn.scotch.io/scotchy-uploads/2014/11/nodejs-token-based-authentication.png)

![enter image description here](https://i2.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422,360&ssl=1)

![enter image description here](https://www.sigsac.org/wisec/WiSec2011/header3_bcrypt.jpg)


### Etape 0 Lecture

**Doc Nodemailer:** https://nodemailer.com/usage/
**Doc 2 Nodemailer**: https://nodemailer.com/message/
**Pourquoi Bcrypt?** https://www.bcrypt.fr/questions
**BCrypt Algorithme de hashage/crypto**: https://fr.wikipedia.org/wiki/Bcrypt
**Tuto BCrypt:** http://codetheory.in/using-the-node-js-bcrypt-module-to-hash-and-safely-store-passwords/
**Tuto Bcrypt:** https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
**JWT:** l'authentification avec token (plutôt qu'avec cookie) http://www.meanjs.fr/jwt-lauthentification-avec-token-plutot-quavec-cookie/
**Module Express JWT utilisé** https://github.com/auth0/express-jwt
**Sécuriser des routes avec JSON Web Tokens (JWT)** http://blog.inovia-conseil.fr/?p=236


### Etape 1 - Base de donné et table FAQ

Créer une table "FAQ" qui comportera des questions et leurs réponses. On créera  5 question/réponses à l'interieur de la table FAQ

*Champs de l'objet*

+ id:... (généré par RethinkDB)
+ question:... Quel est le nom et prénom du nain de la série GOT?
+ reponse:... Tyrion Lannister

### Etape 2 - Application CRUD

+ Afficher la liste des questions dans une application VueJS trié par ordre alphabétique des questions
+ Pouvoir créer une question et sa réponse avec un formulaire (2 champs).
Attention la réponse sera secrete et donc encrypté avec le module BCrypt (https://www.npmjs.com/package/bcrypt)
+ Pouvoir supprimer une question par son ID
+ A chaque fois qu'une question est crée, envoyer un mail de confirmation avec Nodemailer et le réceptionner dans la boite email Mailtrap.

*Bonus: Avec Vee-Validate d'installer, vérifier que la question fasse au moins 8 caractères et maximum 300 caractères et que sa réponse soit minimum de 4 caractères*

[http://vee-validate.logaretm.com/](http://vee-validate.logaretm.com/)

### [BONUS] Etape 3 -  Authentification et Sécurisation

**Ennoncé**

Créer un bouton "*Je suis Julien*", au click me permettant de m'authentifier automatiquement en tant que Julien Boyer via un jeton signé avec le module jwt et express-jwt. Le jeton signé sera généré coté serveur et stocker en localstorage  coté VueJS.

Votre jeton sera signé  coté node tel que:


     // création d'un jetton (token) avec données encryptés
     // elles seront disponible sous req.user (ex: req.user.nom)
        
        let token = jwt.sign({
                nom: 'Boyer',
                prenom: 'Julien'
                // L'objet passé en premier paramètre à sign() va être encodé.
            }, secret, { expiresIn: 18000 }); // // 60*5 minutes



*Coté VueJS: Voici la préparation de l'entête **HTTP Authorisation** afin qu'a  chaque requete HTTP (GET ou POST) de notre application, on lui envoi le jeton signé via l'entete HTTP Authorisation*

*src/main.js*

    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    ...new Vue({...
    ...

+ Le nom et prénom sera stocker dans le Store ainsi que dans le LocalStorage lors de la connection de l'utilisateur. 

+ Le nom et prénom sera afficher tout en haut de l'application si il est connecté.


+ La route en Node pour créer une question sera sécurisée si l'utilisateur est connecté.

*Aide: Coté Node, pour restreindre l'accès à un utilisateur connecté, il faut utuilisé le middleware expressJwt() tel que:*

    app.get('/answers', expressJwt({ secret: secret }), (req, res) => {});



+ Le formulaire de création de question ainsi que la liste des questions-réponses ne sera pas afficher(v-if)  si l'utilisateur n'est pas connecté.








