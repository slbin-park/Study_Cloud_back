import RegisterSql from 'db_sql/register.Sql'


class RegisterClass {
    body: any;
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url: any) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    async register() {
        const client = this.body;
        try {
            const response = await RegisterSql.Register(client);
            return {response,success:true};
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }
    async login(){
        const client = this.body;
        try{
            const response = await RegisterSql.Login(client);
            return {response,success:true};
        } catch (err){
            console.log(err)
            return { success:false }
        }
    }
}

export default RegisterClass;
