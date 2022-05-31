import RecordSql from 'db_sql/record.Sql'


class Recordclass {
    body: any;
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url: any) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }

    //데이터 저장
    async save() {
        const client = this.body;
        try {
            const response = await RecordSql.Save(client);
            return {response,success:true};
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }

    // 데이터만 내보내줌
    async get() {
        const client = this.body;
        try {
            const response = await RecordSql.Get(client);
            return {response,success:true};
        } catch (err) {
            console.log(err)
            return { success: false };
        }
    }
    
    // 데이터 수정
    async update() {
        const client = this.body;
        try{
            const response = await RecordSql.Update(client);
            return {response,success:true};
        } catch(err){
            console.log(err)
            return {success : false};
        }
    }
    
    // 데이터 삭제
    async delete() {
        const client = this.body;
        try{
            const response = await RecordSql.Delete(client);
            return {response,success:true};
        } catch(err){
            console.log(err)
            return {success : false};
        }
    }
}

export default Recordclass;
