
import db from "../utils/prisma.js"

export const ajouterNouvelleSerie = async (req, res) => {
    // recolter les données envoyés depuis la methode POST
    const { title, description, director, season } = req.body

    // une condition pour verifier s'il y a bien les 4 champs obligatoire
    if (!title || !description || !director || !season){
        return res.status(400).json({ error: "Veuillez completer tout les champs" })
    }

    // ajouter la nouvelle série à la base
    const newSerie = await db.serie.create({
        data: { title, description, director, season }
    })

    // renvoyer une réponse
    res.status(201).json(newSerie)
}

export const recupererLesSeries = async (req, res) => {
    const series = await db.serie.findMany({
        include: { 
            episodes: true 
        }
    })
    res.json(series)
}


export const recupererUneSerie = async (req, res) => {
    // recuperer l'id
    const id = parseInt(req.params.id)

    // on cherche dans tout les films celui qui a l'id
    const serie = await db.serie.findUnique({
        where: { id },
        include: { 
            episodes: true
        }
    })

    // verifier si la série n'a pas été trouvé
    if (!serie) {
        res.status(404).json({ error: "Serie non trouvé" })
    }

    // renvoyer cette serie
    res.json(serie)
}
