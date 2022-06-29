# OpenClassRooms P7: Groupomania

7ème et dernier projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

- Front:
React (+ react-hook-form, dayjs, react-router-dom v6, react-toastisfy, axios, mui)

- Back:
Node.js
Express
MySQL
wamp

## Installation du back-end

Rendez-vous dans /backend et installez node et toutes les dépendances:

```
cd /backend
npm i
```

J'ai utilisé wamp pour ma base de données en SQL qui tourne sur 127.0.0.1:3306 mais vous pouvez paramétrer vos propres variables d'environnement:

```
DB_HOST=''
DB_PORT=''
DB_USER=''
DB_PASS=''

PORT="5500" /!\ GARDER CETTE VALEUR
TOKEN="" -> Il s'agit du Token pour la génération du JsonWebToken
```

(à insérer dans le fichier se trouvant au chemin suivant: './backend/.env')

Une fois tout installé lancez:

```
nodemon server
```

(à partir du dossier backend)

## Installation du front-end

Rendez-vous dans /frontend et installez node et toutes les dépendances:

```
cd /frontend
npm i
```

Enfin, lancez React:

```
npm start
```