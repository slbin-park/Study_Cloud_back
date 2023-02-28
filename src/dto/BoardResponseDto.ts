export interface IGetReplyResponseDto {
  id: string;
  reply: string;
  reply_date: Date;
  name: String;
}

export interface IGetAvgResponseDto {
  st: Date;
  et: Date;
  avg: Number;
  sum: Number;
  week: Number;
}
