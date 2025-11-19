import express from "express";
import { ajouterNouvelleSerie, recupererLesSeries, recupererUneSerie } from "../services/serie.service.js";

const serieRouter = express.Router()

// ajouter une premiere route pour voir TOUTES les series
serieRouter.get('/', recupererLesSeries)  

serieRouter.get('/:id', recupererUneSerie)

serieRouter.post('/', ajouterNouvelleSerie)

export default serieRouter