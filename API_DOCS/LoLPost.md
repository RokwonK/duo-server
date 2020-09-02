# LolPost 사용 설명서

모든 LoLPost(롤게시글에 관한) 요청들을 처리하려면 인가된 사용자인지를 확인합니다.  

고로,  
**항상 부여받은 id, nickname을 각각 userId, userNickname로 parameters 안에 넣어주시기 바랍니다.**   
(밑의 prameters에서는 userId,userNickname을 생략하여 쓰겠슴)

- 잘못된 사용자로 접근 시 오류 => { 'msg': 'bad user', 'code': -412 }

<br>

## **`post`** /post/lol/uploadpost
- 롤게시글 올리기  
    - pramters  
        ```json
        {   
            // "soloRank" || "freeRank" || "normal" || "knifeWind" || "custom"
            "gameMode" : "soloRank",

            // String 30자 이내
            "title" : ,

            // i( 10-(1~4) ), b( 20-(1~4) ), s( 30-(1~4) )
            // g( 40-(1~4) ), p( 50-(1~4) ), d( 60-(1~4) )
            // m(70), gm(80), c(90)
            "startTier" : 0, 
            "endTier" : 100,

            // String
            "startTime" : "17:00", 

            // String 100자 이내
            "content" : "급구합니당",

            // 구하는 인원 수 Integer 1~9
            "headCount" : 3,

            // 1: 가능, 2: 불가능, 3:상관없음
            "top" : 3,
            "bottom" : 3,
            "mid" : 3,
            "jungle" : 3,
            "support" : 3,
            "talkon" : 3,
        }
        ```
            
    - 성공
        - 롤게시글 올리기 성공 => {'msg' : 'create success'}
    - 실패
        - 잘못된 parameters => {'msg' : 'bad prameters', 'code' : -412}
        - parameters에 잘못된 값이 들어감 => {'msg' : 'post create error', 'code' : -412}
        - 서버오류 => {'msg' : 'server error', 'code' : -500}


<br>
<br>

## **`post`** /post/lol/getpost
- 게시글 다 가져오기
    - parameters => userId,userNickname말고는 필요없음
    - 성공
        - 게시글에 대한 정보 배열로 제공
    - 실패
        - 서버오류 => {'msg' : 'server error', 'code' : -500}

<br>
<br>

## **`post`** /post/lol/getpost/filter
- filter 사용해 원하는 정보만 가져오기 ( 사용은 가능(베타 테스트) )
    - pramters  
        ```json
        {
            // "soloRank" || "freeRank" || "normal" || "knifeWind" || "custom" || "all"상관없음
            "gameMode" : "soloRank",

            // 내 티어
            // i( 10-(1~4) ), b( 20-(1~4) ), s( 30-(1~4) )
            // g( 40-(1~4) ), p( 50-(1~4) ), d( 60-(1~4) )
            // m(70), gm(80), c(90)
            "wantTier" : 17,

            // String
            "startTime" : "17:00", // String

            // 인원 수 Integer 1~9 이하
            "headCount" : 3,

            // 1: 가능, 2: 불가능, 3:상관없음
            "top" : 3,
            "bottom" : 3,
            "mid" : 3,
            "jungle" : 3,
            "support" : 3,
            "talkon" : 3,
        }
        ```
    - 성공
        - 필터링 된 데이터 보냄
    - 실패
        - 필터에 맞는 게시글이 없거나 파라미터 잘못보냄 => { 'msg': 'no data', 'code': -412 }
        - 파라미터 잘못보냄 =>  { 'msg': 'bad access', 'code': -412 }
        - 서버 오류 => { 'msg': 'server error', 'code': -500 }

<br>
<br>

## **`post`** /post/lol/updatepost
- 올린 게시글 수정
    - pramters  
        ```json
        {   
            // 수정할 post의 postid
            "postId" : 3,

            // "soloRank" || "freeRank" || "normal" || "knifeWind" || "custom"
            "gameMode" : "soloRank",

            // String 30자 이내
            "title" : ,

            // i( 10-(1~4) ), b( 20-(1~4) ), s( 30-(1~4) )
            // g( 40-(1~4) ), p( 50-(1~4) ), d( 60-(1~4) )
            // m(70), gm(80), c(90)
            "startTier" : 0, 
            "endTier" : 100,

            // String
            "startTime" : "17:00", 

            // String 100자 이내
            "content" : "급구합니당",

            // 구하는 인원 수 Integer 1~9
            "headCount" : 3,

            // 1: 가능, 2: 불가능, 3:상관없음
            "top" : 3,
            "bottom" : 3,
            "mid" : 3,
            "jungle" : 3,
            "support" : 3,
            "talkon" : 3,
        }
        ```
    - 성공
        - {'msg' : 'update success'}
    - 실패
        - 잘못된 prameters => {'msg' : 'post create error', 'code' : -412} || {'msg' : 'bad prameters', 'code' : -412}
        - 서버 오류 => {'msg' : 'server error', 'code' : -500}


<br>
<br>

## **`post`** /post/lol/deletepost
- 올린 게시글 삭제
    - parameters => { postId : Integer }
    - 성공
        - {'msg' : 'delete success'}
    - 실패
        - 잘못된 parameters => { 'msg': 'bad access', 'code': -412 } || { 'msg': 'bad delete', 'code': -412 }
        - 서버 오류 =>  {'msg' : 'server error', 'code' : -500}