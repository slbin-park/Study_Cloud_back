import BoardSql from 'db_sql/Board.Sql';
import moment from 'moment';

class Boardclass {
    body: any;
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url: any) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    //공유 데이터 저장
    async save() {
        const client = this.body;
        try {
            const response = await BoardSql.Save_board(client);
            return {response,success:true};
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }

    //공유 데이터 불러오기
    async get() {
        const client = this.body;
        try {
            const response : any = await BoardSql.Get_board(client);
            return {board : response,success:true};
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }
}

export default Boardclass;
