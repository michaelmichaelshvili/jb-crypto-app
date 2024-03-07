import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import Model from "./model";

class User implements Model {
    async signup(user: DTO): Promise<DTO> {
        const result: OkPacketParams = await query(`
            INSERT INTO users(github_id) 
            VALUES(?) 
        `, [user.githubId]);
        return { ...user, id: result.insertId }
    }

    async get(githubId: string): Promise<DTO> {
        return (await query(`
        SELECT * FROM users WHERE github_id=?`, [githubId]))[0]
    }

}

const user = new User();
export default user;