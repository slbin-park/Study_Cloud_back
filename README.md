# Study_Cloud_back

# 디렉토리 구조
## src 
### config
```
환경설정을 위한 폴더
```
### database
```
DB 연결을 위한 폴더
```

### models
```
데이터베이싀 각 테이블(모델)에 해당하는 파일
```

### routes
```
라우터들의 모음 controller와 연결을 위한 폴더
```

# REST API - URI 디자인 가이드

## 1. URI 마지막에 / 를 표시하지않는다.
```
O http://api.com/api
X http://api.com/api/
```

## 2. / 를 사용해서 계층적 관계를 나타내줌
```
http://api.com/api/user/table
```

## 3. 긴 영어를 사용할 경우 -(하이픈)을 사용한다

## 4. _은 URI에 사용하지 않는다.

## 5. URI에 대문자는 사용하지 않는다.

## 6. URI에 파일 확장자를 넣지 않는다.


# 디자인 패턴
## MVC 패턴
controller 로 기능을 실행
db 값이 필요하다면 model 을 통해서 값을 가져옴

https://wooooooak.github.io/node.js/2018/12/18/express%EC%99%80-Typescript-%EC%82%AC%EC%9A%A9-%EC%A4%91-req%EC%97%90-%EC%9E%84%EC%9D%98%EC%9D%98-%EA%B0%92-%EB%84%A3%EA%B8%B0/


express nodemon 사용할떄 절대경로
https://medium.com/@jsh901220/typescript-node-absolute-path-5782b584e368
