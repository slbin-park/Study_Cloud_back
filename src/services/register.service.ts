import RegisterSql from "../models/register.Model";
import RegisterDto from "src/dto/RegisterRequestDto";

class RegisterClass {
  body: any;
  // constructor는 객체를 생성하고 초기화 해주는 메서드임
  constructor(url: any) {
    this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
  }
  static async register(userData: RegisterDto) {
    try {
      const response = await RegisterSql.Register(userData);
      return { response, success: true };
    } catch (err) {
      return { success: false };
    }
  }
}

export default RegisterClass;
