import DTO from "./dto";

export default interface Model {
    signup(user: DTO): Promise<DTO>;
    get(githubId: string): Promise<DTO>
}
