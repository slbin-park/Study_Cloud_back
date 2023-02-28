export interface ISaveRecordRequestDto {
  id: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  title: string;
  content: string;
}

export interface IUpdateRecordRequestDto {
  start_time: Date;
  end_time: Date;
  title: String;
  memo: String;
  post_num: Number;
}
