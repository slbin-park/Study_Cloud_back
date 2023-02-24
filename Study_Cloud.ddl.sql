create table User
(
    id            varchar(45) not null comment '아이디'
        primary key,
    password      text        not null comment '비밀번호',
    name          varchar(45) not null comment '이름',
    school        varchar(45) not null comment '학교이름',
    major         varchar(45) not null comment '전공',
    refresh_token text        null comment '리프레시 토큰'
)
    comment '유저 데이터';

create table Board
(
    board_num int auto_increment comment '게시글번호'
        primary key,
    id        varchar(45) not null comment '아이디',
    title     varchar(45) not null comment '제목',
    content   text        not null comment '내용',
    constraint FK_Board_id_User_id
        foreign key (id) references User (id)
)
    comment '게시판';

create table Board_reply
(
    board_num int          not null comment '게시글번호',
    id        varchar(45)  null comment '작성자 아이디',
    reply     varchar(100) null comment '댓글',
    constraint FK_Board_reply_board_num_Board_board_num
        foreign key (board_num) references Board (board_num),
    constraint FK_Board_reply_id_User_id
        foreign key (id) references User (id)
)
    comment '게시판 댓글';

create table Study_record
(
    post_num   int auto_increment comment '기록번호'
        primary key,
    id         varchar(45) null comment '아이디',
    date       datetime    null comment '날짜',
    start_time time        null comment '시작시간',
    end_time   time        null comment '끝난시간',
    title      text        null comment '제목',
    memo       text        null comment '메모',
    constraint FK_Study_record_id_User_id
        foreign key (id) references User (id)
)
    comment '공부 기록 데이터';

create table Study_share
(
    post_num   int         not null comment '기록번호',
    id         varchar(45) null comment '아이디',
    board_num  int auto_increment comment '게시글 번호'
        primary key,
    share_date datetime    null comment '등록날짜',
    constraint FK_Study_share_post_num_Study_record_post_num
        foreign key (post_num) references Study_record (post_num),
    constraint post_num_share
        foreign key (post_num) references Study_record (post_num)
)
    comment '공부기록 공유';

create table Study_share_reply
(
    reply_board_num int         not null comment '게시글 번호',
    id              varchar(45) null comment '아이디',
    reply           varchar(45) null comment '댓글',
    reply_date      datetime    null comment '작성시간',
    constraint share_reply
        foreign key (reply_board_num) references Study_share (board_num)
)
    comment '공부기록 공유 댓글';

create table reply_notifi
(
    reply_id   int auto_increment
        primary key,
    userid     varchar(45) null,
    replyid    varchar(45) not null,
    created_at datetime    null,
    read_at    datetime    null,
    reply      text        null,
    noti_num   int         null,
    constraint reply_notifi_ibfk_1
        foreign key (noti_num) references Study_share (board_num)
);

create index noti_num
    on reply_notifi (noti_num);

