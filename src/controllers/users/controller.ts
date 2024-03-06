import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory";

export async function dashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbols = await getModel().getByUser(1)
        res.render('users/dashboard', {
            userSymbols
        })
    } catch (err) {
        next(err)
    }
}

export async function addSymbol(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbolModel = getModel()
        const newUserSymbol = await userSymbolModel.add({ ...req.body, userId: 1 })
        console.log(`new user-symbol added with id ${newUserSymbol.id}`);

        res.redirect('/users/dashboard')
    } catch (err) {
        next(err)
    }
}