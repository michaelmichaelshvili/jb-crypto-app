import { Router } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";
import validate from "../middlewares/input-validation";
import { addSymbolValidator } from "../controllers/users/validator";

const router = Router();
router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)


export default router;