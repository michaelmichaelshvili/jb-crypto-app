import { NextFunction, Request, Response } from "express";
import getUserSymbolModel from "../../models/user-symbol/factory";
import getSymbolValueModel from "../../models/symbol-value/factory";
import config from 'config'

export async function dashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbols = await getUserSymbolModel().getByUser(1)
        const symbolsValues = await Promise.all(userSymbols.map(userSymbol =>
            getSymbolValueModel().getLatest(userSymbol.symbol)
        ))

        res.render('users/dashboard', {
            userSymbols,
            symbolsValues,
            io: config.get('app.io')
        })
    } catch (err) {
        next(err)
    }
}

export async function addSymbol(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbolModel = getUserSymbolModel()
        const newUserSymbol = await userSymbolModel.add({ ...req.body, userId: 1 })
        console.log(`new user-symbol added with id ${newUserSymbol.id}`);

        res.redirect('/users/dashboard')
    } catch (err) {
        next(err)
    }
}