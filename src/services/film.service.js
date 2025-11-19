
import db from "../utils/prisma.js"

export const recupererTousLesFilms = async (req, res) => {
    const films = await db.film.findMany()
    res.json(films)
}


export const supprimerUnFilm = async (req, res) => {
    // recuperer l'id du film a supprimer
    const id = parseInt(req.params.id)

    // Verifier s'il le film existe pas
    const film = await db.film.findUnique({ where: {id}  })
    if (!film) {
        return res.status(204).json({ error: "Le film n'existe pas"})
    }

    // supprimer le film de la base
    await db.film.delete({
        where: { id }
    })

    // enfin on lui renvoi un message
    res.status(200).json({ message: "Film supprimé avec succès" })
}

export const ajouterFilm = async (req, res) => {
    // récuperer les données qui ont été envoyées
    const { title, description, director } = req.body

    // inserer ce nouveau film dans la base
    const newFilm = await db.film.create({
        data: {
            title, 
            description,
            director
        }
    })

    res.status(201).json(newFilm)
}

export const recupererUnFilm = async (req, res) => {
    // recuperer l'id
    const id = parseInt(req.params.id)

    // on cherche dans tout les films celui qui a l'id
    const film = await db.film.findUnique({
        where: { id }
    })

    // verifier si le film n'a pas été trouvé
    if (!film) {
        res.status(404).json({ error: "Film non trouvé" })
    }

    // renvoyer ce film
    res.json(film)
}

export const modifierUnFilm = async (req, res) => {
    // recuperer l'id du film a modifier
    const id = parseInt(req.params.id)

    // verifier si le film existant
    const film = await db.film.findUnique({ where: { id } })
    if (!film){
        return res.status(404).json({ error: 'Film inexistant' })
    }

    // Mise à jour le film
    const filmModif = await db.film.update({
        where: { id }, // uniquement le film avec ce numero
        data: req.body
    })

    res.json({ 
        message: 'Film modifié',
        filmModif
    })

}