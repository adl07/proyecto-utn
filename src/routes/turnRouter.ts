import { Router } from "express";
import TurnController from "../controllers/turnsControllers";


const turnsRouter = Router()

//http://localhost/1234/api/turns


turnsRouter.get("/", TurnController.getAllTurns)
turnsRouter.get("/:id", TurnController.getTurn)
turnsRouter.post("/", TurnController.createNewTurn)
turnsRouter.patch("/:id", TurnController.updateTurn)
turnsRouter.delete("/:id", TurnController.deleteTurn)


export {turnsRouter}