// On importe le module express (serveur backend)
import express from "express"
// on importe le composant filmRouter
import filmRouter from "./routes/film.route.js"
import serieRouter from "./routes/serie.route.js"

// Créer une nouvelle app avec ce module
const app = express()

// Définir sur quel port notre app/serveur va tourner
const port = 3000

// App peut lire le json
app.use(express.json())

// Enregistrer le router 
app.use('/films', filmRouter)
app.use('/series', serieRouter)

// Créer un premier chemin
app.get('/', (req, res) => {
    res.send("Hello world")
})

// Lancer le serveur sur le port 3000 et met un message si ça a fonctionné
app.listen(port, () => {
    console.log("Le serveur NetflixClone est lancé !")
})