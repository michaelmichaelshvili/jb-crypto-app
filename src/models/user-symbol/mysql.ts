import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import Model from "./model";

class UserSymbol implements Model {
    async add(userSymbol: DTO): Promise<DTO> {
        const result: OkPacketParams = await query(`
            INSERT INTO users_symbols(user_id, symbol) 
            VALUES(?,?) 
        `, [userSymbol.userId, userSymbol.symbol]);
        if (!result.insertId) throw new Error('error inserting')
        return { ...userSymbol, id: result.insertId }
    }

    async getByUser(userId: number): Promise<DTO[]> {
        return await query(`
        SELECT * FROM users_symbols WHERE user_id=?`, [userId])
    }

}

const userSymbol = new UserSymbol();
export default userSymbol;