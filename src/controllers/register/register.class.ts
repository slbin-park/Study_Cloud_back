// import Registersql from 'db_sql/register.Sql'
import Registersql from '../../models/register.Sql'


class RegisterClass {
    body: any;
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url: any) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    async register() {
        const client = this.body;
        try {
            const response = await Registersql.gettest(client);
            return response;
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }
}

export default RegisterClass;
