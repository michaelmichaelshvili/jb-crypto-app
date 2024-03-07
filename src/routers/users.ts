import { Router } from "express";
import { addSymbol, dashboard, logout } from "../controllers/users/controller";
import validate from "../middlewares/input-validation";
import { addSymbolValidator } from "../controllers/users/validator";
import enforceAuth from "../middlewares/enforce-auth";

const router = Router();
router.use(enforceAuth)
router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)
router.get('/logout', logout)

export default router;