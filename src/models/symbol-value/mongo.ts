import mongoose from "../../db/mongo";
import DTO from "./dto";
import Model from "./model";

const schema = new mongoose.Schema<DTO>({
    symbol: String,
    value: Number,
    when: Date
})

const symbolValueModel = mongoose.model<DTO>('SymbolValue', schema)

class SymbolValue implements Model {
    async add(symbolValue: DTO): Promise<DTO> {
        const newSymbolValue = new symbolValueModel(symbolValue)
        await newSymbolValue.save()
        return newSymbolValue
    }
}
const symbolValue = new SymbolValue()
export default symbolValue
