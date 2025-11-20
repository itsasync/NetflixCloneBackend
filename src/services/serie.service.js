
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

    // Convert episodes array to a comma-separated string of titles for each serie
    const seriesWithEpisodesString = series.map((s) => {
        const episodesInfos = Array.isArray(s.episodes) ? s.episodes : []
        const episodes = episodesInfos.length
            ? episodesInfos.map(e => e.title).join(', ')
            : ''

        // keep full infos under episodesInfos, and episodes remains the comma-separated titles
        return { ...s, episodes, episodesInfos }
    })

    res.json(seriesWithEpisodesString)
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
        return res.status(404).json({ error: "Serie non trouvé" })
    }

    // Convert episodes array to a comma-separated string of titles for this serie
    const episodesInfos = Array.isArray(serie.episodes) ? serie.episodes : []
    const episodes = episodesInfos.length
        ? episodesInfos.map(e => e.title).join(', ')
        : ''

    const serieWithEpisodesString = { ...serie, episodes, episodesInfos }

    // renvoyer cette serie
    res.json(serieWithEpisodesString)
}
