interface IRegisterDto {
  id: string;
  password: string;
  name: string;
  school: string;
  major: string;
}

class RegisterDto implements IRegisterDto {
  id: string;
  password: string;
  name: string;
  school: string;
  major: string;
  constructor(body: IRegisterDto) {
    this.id = body.id;
    this.password = body.password;
    this.name = body.name;
    this.school = body.school;
    this.major = body.major;
  }
}

export default RegisterDto;
