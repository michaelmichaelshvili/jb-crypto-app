import DTO from "./dto";

export default interface Model {
    add(symbolValue: DTO): Promise<DTO>
    getLatest(symbol: string): Promise<DTO>
}   