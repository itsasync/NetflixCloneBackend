import express from "express"
import { ajouterFilm, modifierUnFilm, recupererTousLesFilms, recupererUnFilm, supprimerUnFilm } from "../services/film.service.js"

// Création du router
const filmRouter = express.Router()

// Créer un chemin/route pour voir tout les films
filmRouter.get('/', recupererTousLesFilms)


// Créer un chemin pour supprimer un film
filmRouter.delete('/:id', supprimerUnFilm)

// Créer un chemin pour inserer un nouveau film
filmRouter.post('/', ajouterFilm)

// Créer un chemin pour voir 1 seul film à partir son numero
filmRouter.get('/:id',  recupererUnFilm)

// nouveau chemin pour modifier un film existant
// PUT : ecrase entierement le film avec des nouvelles données (tout remettre)
// PATCH : remplacer certaines informations
filmRouter.patch('/:id', modifierUnFilm)

export default filmRouter