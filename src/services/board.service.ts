import BoardSql from "../../models/board.Model";
import moment from "moment";

class Boardclass {
  body: any;
  // constructor는 객체를 생성하고 초기화 해주는 메서드임
  constructor(url: any) {
    this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
  }

  //공유 데이터 저장
  async save_board() {
    const client = this.body;
    try {
      const check: any = await BoardSql.Check_board(client);
      if (check.length != 0) {
        return { success: false, msg: "이미 공유된 데이터입니다." };
      }
      const response = await BoardSql.Save_board(client);
      return { response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  //공유 데이터 불러오기
  async get_board() {
    const client = this.body;
    try {
      const response: any = await BoardSql.Get_board(client);
      return { board: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  //공유 데이터 불러오기
  async get_one_board() {
    const client = this.body;
    try {
      const response: any = await BoardSql.get_post_from_noti(client);
      return { board: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  async set_read_noti() {
    const client = this.body;
    try {
      const response: any = await BoardSql.Set_read_noti(client);
      return { board: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  // 해당 게시글 정보 불러오기
  async get_one_share() {
    const client = this.body;
    try {
      const response: any = await BoardSql.get_record_from_share(client);
      return { board: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  // 해당 게시글 정보 불러오기
  async get_avg() {
    const client = this.body;
    try {
      const week: any = await BoardSql.get_avg_week(client);
      const month: any = await BoardSql.get_avg_month(client);
      if (week.sum === null) {
        week.st = 0;
        week.et = 0;
        week.avg = 0;
        week.sum = 0;
      }
      if (month.sum === null) {
        month.st = 0;
        month.et = 0;
        month.avg = 0;
        month.sum = 0;
      }
      return { week, month, success: true };
      // return {week,success:true};
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  //댓글 데이터 저장
  async save_reply() {
    const client = this.body;
    try {
      const response: any = await BoardSql.Save_reply(client);
      const response_noti: any = await BoardSql.Save_noti(client);

      return { reply: response, noti: response_noti, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  //댓글 데이터 저장
  async get_reply() {
    const client = this.body;
    try {
      const response: any = await BoardSql.Get_reply(client);
      return { reply: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  //댓글 데이터 저장
  async get_noti() {
    const client = this.body;
    try {
      const response: any = await BoardSql.Get_noti(client);
      return { reply: response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

export default Boardclass;
