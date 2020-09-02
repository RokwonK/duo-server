# 로그인 관련 API

## **`post`** /login/naver
-  네이버 로그인
    - parameters => { accesstoken : ' ' }
    - 성공
        - redirect => [/login/user_confirm/:sns_id/naver](#**`get`**/login/user_confirm/:sns_id/:sns)
    - 실패 응답
        - 서버 에러 => {'msg' : 'server error', 'code' : -500}
        - 토큰 에러 => {'msg' : err, 'code' : -412}

<br>
<br>

## **`post`** /login/kakao
-  카카오 로그인
    - parameters => { accesstoken : ' ' }
    - 성공
        - redirect => `/login/user_confirm/:id/kakao`
    - 실패 응답
        - 서버 에러 => {'msg' : 'server error', 'code' : -500}
        - 토큰 에러 => {'msg' : err, 'code' : -412}


<br>
<br>

## **`post`** /login/google
-  구글 로그인
    - parameters => { accesstoken : ' ' }
    - 성공
        - redirect => `/login/user_confirm/:id/google`
    - 실패 응답
        - 서버 에러 => {'msg' : 'server error', 'code' : -500}
        - 토큰 에러 => {'msg' : err, 'code' : -412}

<br>
<br>

## **`get`**/login/user_confirm/:sns_id/:sns
- 사용자 확인 (직접 접근x)
    - 성공
        - 존재하는 사용자 => {'nickname' : user_nickname, 'id' : user_id} 
        - 존재 x 사용자 => {'nickname':'needNickname', 'id': -1}
    - 실패
        - 서버 에러 => {'msg' : 'server error', 'code' : -500}
        - 토큰 에러 => {'msg' : 'bad token', 'code' : -412}

<br>
<br>

## **`post`** /login/set_nickname
- 사용자 생성
    - parameters => {accesstoken : ' ', sns : ' ', nickname : ' '} 
    - 성공
        - 닉네임 생성 성공 => {'nickname' : user_nickname, 'id' :user_id}
    - 실패
        - 토큰 에러 => {'msg' : 'bad token', 'code' : -412}
        - sns 에러 => {'msg' : 'non-existent sns', 'code' : -412}
        - 사용자 이미 존재 => {'msg' : 'exist id in database', 'code' : -412}
