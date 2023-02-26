import { ISaveRecordRequestDto } from "src/dto/RecordRequestDto";
import { IGetRecordResponseDto } from "src/dto/RecordResponseDto";
import RecordSql from "../models/record.Model";

class Recordclass {
  body: any;
  // constructor는 객체를 생성하고 초기화 해주는 메서드임
  constructor(url: any) {
    this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
  }

  //데이터 저장
  static async save(SaveRequestDto: ISaveRecordRequestDto) {
    try {
      const response = await RecordSql.Save(SaveRequestDto);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  // 데이터만 내보내줌
  static async get(id: string): Promise<IGetRecordResponseDto> {
    try {
      const response: IGetRecordResponseDto = await RecordSql.Get(id);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  // 데이터 수정
  async update() {
    const client = this.body;
    try {
      const response = await RecordSql.Update(client);
      return { response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  // 데이터 삭제
  async delete() {
    const client = this.body;
    try {
      const response = await RecordSql.Delete(client);
      return { response, success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

export default Recordclass;
