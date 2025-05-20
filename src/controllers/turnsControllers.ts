import { json, Request, Response } from "express";
import { Turn } from "../models/turnModel";
import { ITurn } from "../interfaces/ITurn";


class TurnController{
    static async getAllTurns(req: Request, res: Response){
    try {
        const turns = await Turn.find()
        res.json({
            success: true,
            data: turns
        })
    } catch (error) {
        const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
    }
}


static async getTurn(req: Request, res: Response){
    const id = req.params.id
    try {
        
        const foundTurn = await Turn.findById(id)
        if(!foundTurn) res.status(400).json({ success: false, message: "turn not found"})
        res.json({success: true, data: foundTurn})

    } catch (error) {
        const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
    }
}

static async createNewTurn(req: Request, res: Response){

    
        try {
            const body = req.body
            const {document, medical, duration, specialty} = body
            if(!document || !medical || !duration || !specialty) res.status(400).json({
                success: false, message: "Bad request"
            })

            const newTurn = new Turn({document, medical, duration, specialty})
            newTurn.save()
            res.status(201).json({success: true, data: newTurn})
        } catch (error) {
            const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
        }
}

static async updateTurn(req: Request, res: Response){

    const id = req.params.id
    const body = req.body

        try {
            const updateTurn = await Turn.findByIdAndUpdate(id, body, {new: true})
            if(!updateTurn) res.status(404).json({success: false, message: "turn not found"})
                res.json({success: true, data: updateTurn})
        } catch (error) {
            const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
        }
}


static async deleteTurn(req: Request, res: Response){ 

        const id = req.params.id

        try {
            const deleteTurn = await Turn.findByIdAndDelete(id)
            if(!deleteTurn) res.status(400).json({ success: false, message: "turn not found"})
            res.json({success: true, data: deleteTurn})
            
        } catch (error) {
            const err = error as Error
        res.json({
            success: false,
            message: err.message
        })
        }
}
}



export default TurnController
