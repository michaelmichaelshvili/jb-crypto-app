import DTO from "./dto";

export default interface Model {
    add(userSymbol: DTO): Promise<DTO>;
    getByUser(userId: number): Promise<DTO[]>
}
