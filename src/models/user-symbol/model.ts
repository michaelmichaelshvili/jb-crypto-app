import DTO from "./dto";

export default interface Model {
    // getAll(): Promise<DTO[]>;
    // getOne(id: number): Promise<DTO>;
    add(userSymbol: DTO): Promise<DTO>;
    // update(product: DTO): Promise<DTO>;
    // delete(id: number): Promise<boolean>;
}
