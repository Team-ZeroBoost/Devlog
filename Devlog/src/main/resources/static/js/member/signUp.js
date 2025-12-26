console.log('signUp.js loaded ...')



/* 정규 표현식(Regular Expression)
    https://regexper.com/
    https://regexr.com/
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D

    - 특정한 규칙을 가진 문자열 집합을 표현하는데 사용하는 형식 언어
    - 문자열에 대한 검색, 일치 여부, 치환 등을 수행할 수 있음


    *** JS 정규표현식 객체 생성 방법 ***

    1.  const regEx = new RegExp("정규표현식");
    2.  const regEx = /정규표현식/;


    *** 정규표현식 객체가 제공하는 메서드(함수) ***
    1.  regEx.test(문자열)
        -> 문자열이 정규표현식 패턴에 부합하면 true, 아니면 false

    2.  regEx.exec(문자열)
        -> 문자열이 정규표현식 패턴에 부합하면
            첫 번째 매칭되는 문자열을 반환,
            없으면 null 반환


     *** 정규 표현식의 메타 문자***
        
    문자열의 패턴을 나타내는 문자.
    문자마다 지정된 특별한 뜻이 담겨있다.
    
    a (일반문자열) : 문자열 내에 a라는 문자열이 존재하는 검색 
    [abcd] : 문자열 내에 a,b,c,d 중 하나라도 일치하는 문자가 있는지 검색
    ^(캐럿) : 문자열의 시작을 의미
    $(달러) : 문자열의 끝을 의미

    \w (word, 단어) : 아무 글자(단, 띄어쓰기, 특수문자, 한글 X)
    \d (digit, 숫자) : 아무 숫자(0~9 중 하나)
    \s (space, 공간) : 아무 공백 문자(띄어쓰기, 엔터, 탭 등)

    [0-9]  : 0부터 9까지 모든 숫자
    [ㄱ-힣] : ㄱ부터 힣까지  모든 한글

    [가-힣] : 가부터 힣까지  모든 한글(자음만, 모음만 있는 경우 제외)

    [a-z] : 모든 영어 소문자
    [A-Z] : 모든 영어 대문자

    * 특수문자의 경우 각각을 입력하는 방법밖엔 없음
    단, 메타문자와 중복되는 특수문자는 
    앞에 \(백슬래시)를 추가하여 탈출 문자(Escape)로 만들어 사용

    * 수량 관련 메타 문자
    a{5} : a문자가 5개 존재 == aaaaa
    a{2,5} : a가 2개 이상 5개 이하 ==  aa, aaa, aaaa, aaaaa
    a{2,} : a가 2개 이상
    a{,5} : a가 5개 이하


    * : 0개 이상 == 0번 이상 반복 == 있어도되고, 없어도 되고

    + : 1개 이상 == 1번 이상 반복

    ? : 0개 또는 1개

    . : 1칸 (개행문자를 제외한 문자 하나)
*/

// JS 객체 : { K : V } (Java의 Map 형식)
//
// 1) 원하는 value 얻어오기
// - 객체명.key
// - 객체명[key] (향상된 for문에서 하나씩 얻어올때 이런 형식으로)
//
// 2) 객체에 특정 key가 존재하지 않으면 추가 기능
// ex) const obj = {a:1, b:2}
//     obj.c = 3; // -> {a:1, b:2, c:3}
//
// 3) 객체에 특정 key 삭제 가능(delete 연산자)
// ex) const obj = {a:1, b:2}
//     delete obj.a; // -> {b:2}  // {'b':2} 도 같다



// 유효성 검사 진행 여부 확인 객체
const checkObj = {
    'memberEmail' : false,
    'memberPw' : false,
    'memberPwConfirm' : false,
    'memberName' : false,    
    'memberNickname' : false,
    'memberTel' : false,
    'memberCareer' : false,
    'memberSubscribe': false, // 필수아님
    'memberAdmin': false, // 필수아님 (관리자 계정 승인 코드 처리와 연관)
    'authKey' : false  // 이메일 인증에서 사용
    //'authKey' : true // 유효성 검사위해 temporary사용
}

// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.getElementById("emailMessage")

memberEmail.addEventListener("input", function(){

    // 입력된 이메일이 없을 경우 : "메일을 받을 수 있는 이메일을 입력해주세요." 까만글씨
    // 1) 이메일 미작성시
    if(memberEmail.value == ""){
        emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
        //emailMessage.style.color = "black";
        emailMessage.classList.remove("confirm", "error");

        checkObj.memberEmail = false;

        return;
    }
    
    // 입력된 이메일이 있는 경우 정규식 일치 여부 판별
    // 영어, 숫자, -, _ 4글자 이상 @ 영어.영어.영어 || 영어.영어
    //const regExp = /^[\w\_]{4,}@\w+(\.\w+){1,2}$/; //"id는 4글자 이상"
    //const regExp = /^\w-{4,}@[a-z]+(.[a-z]+){1,2}$/; //"id는 4글자 이상" //  ???
    //const regExp = /^\w{4,}@[a-z]+(\.[a-z]+){1,2}$/; //"id는 4글자 이상"
    const regExp = /^[\w\_\.]{4,}@[a-z]+(\.[a-z]+){1,2}$/; //"id는 4글자 이상" // yypark.rok@gmail.com사용위함



    // 

    // 유효한 경우 : 유효한 이메일 형식 입니다. 초록글씨
    if (regExp.test(memberEmail.value)) { // input 창에서 입력받은 이메일
        // 유효한 경우
        console.log(memberEmail.value);
        
        // ***********************************
        // fetch() API를 이용한 ajax

        // Get 방식 ajax 요청(쿼리스트링으로 파라미터 전다 : ?키=값&키=값)
        fetch("/dupCheck/email?email=" + memberEmail.value) // 띄어쓰기 없어야함
        .then(resp => resp.text()) // 조회된 회원수 count이므로 단순 text
        .then(count => {
            console.log("public int dupCheckEmail(String email) 리턴값:") // public int dupCheckEmail(String email) 
            console.log(count);
            // count : 중복이면 1, 아니면 0
            if (count==1){
                // 유효한 경우, 중북이메일 인 경우
                emailMessage.innerText = "이미 사용중인 이메일 입니다.";
                emailMessage.classList.remove("confirm");
                emailMessage.classList.add("error");

                checkObj.memberEmail = false;
            } else {
                // 유효한 경우, 중북이메일이 아닌 경우
                emailMessage.innerText = "사용 가능한 이메일입니다.";
                emailMessage.classList.remove("error");
                emailMessage.classList.add("confirm");
        
                checkObj.memberEmail = true;
                
            }
        })
        .catch(err => console.log(err))  // 예외처리

        // 유효한 경우
        emailMessage.innerText = "유효한 이메일 형식 입니다.";
        emailMessage.classList.add("confirm");
        emailMessage.classList.remove("error");

        checkObj.memberEmail = true;

    } else {
        // 유효하지 않은 경우 : 이메일 형식이 유효하지 않습니다. 빨간 글씨
        emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");

        checkObj.memberEmail = false;
                        
    }

})


//---------------------------------------------------------------------------
// 이메일 인증
//
// 인증번호 발송
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;


// 인증번호를 발송한 이메일 저장
let tempEmail = "";


if (authTimer == undefined){
    console.log("tempEmail = " + tempEmail);
    console.log("authTimer = " + authTimer);
    sendAuthKeyBtn.disabled = false;

    sendAuthKeyBtn.addEventListener("click", function(){
        authMin = 4;
        authSec = 59;
    
    
        checkObj.authKey = false;
    
    
        if(checkObj.memberEmail){ // 유효하고, 중복이 아닌 이메일인 경우
    
            /* fetch() API 방식 ajax */
            fetch("/sendEmail/signUp?email="+memberEmail.value) // GET방식, key값은 email
            .then(resp => resp.text()) // text로 parsing
            .then(result => {  // result변수로 text값 받아온다.
                if(result > 0){
                    console.log("인증 번호가 발송되었습니다.")
                    tempEmail = memberEmail.value;
                }else{
                    console.log("인증번호 발송 실패")
                }
            })
            .catch(err => {
                console.log("이메일 발송 중 에러 발생");
                console.log(err);
            });
    
            alert("인증번호가 발송 되었습니다."); // 비동기 통신처리중 띄워주는 메시지
    
            authKeyMessage.innerText = "05:00"; // timer시작 (5분)
            authKeyMessage.classList.remove("confirm");
            clearInterval(authTimer); // 기존 것 지우고 다시시작 해라!
    
            //if (authTimer == 2){
                authTimer = window.setInterval(()=>{
                console.log("authTimer gen = " + authTimer); 
                                                //                                    04  또는       14
                    authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
                    
                    // 남은 시간이 0분 0초인 경우
                    if(authMin == 0 && authSec == 0){
                        checkObj.authKey = false; // 인증 번호 유효성 검사만 무효화한것, 
                        // 5분후에도 여전히 인증번호는 DB인증번호와 같음
                        // 따라서, DB에서 5분 지난 인증번호를 무효화(삭제)하는 작업을 해주거나
                        // 인증번호 check시 인증번호 생성시간을 같이 체크해 주면, 인증번호 자체를 무효화 할 수 있다.
                        clearInterval(authTimer);
                        return;
                    }
        
                    // 0초인 경우
                    if(authSec == 0){
                        authSec = 60;
                        authMin--;
                    }
        
                    authSec--; // 1초 감소
        
                }, 1000)
            //}
    
    
        } else{
            alert("중복되지 않은 이메일을 작성해주세요.");
            memberEmail.focus();
        }
    
    
    });

} else { //authTimer != undefined 인 경우
    console.log("tempEmail = " + tempEmail);
    console.log("authTimer = " + authTimer);
    sendAuthKeyBtn.disabled = true;
}




// 인증 확인
const authKey = document.getElementById("authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");


checkAuthKeyBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        //const obj = {"authKey":authKey.value, "email":tempEmail}
        const obj = {"inputKey":authKey.value, "email":tempEmail}
        const query = new URLSearchParams(obj).toString()
        // ?inputKey=123456&email=user01@og.or.kr 로 바뀐다 by URLSearchParams(obj).toString()
        
        fetch("/sendEmail/checkAuthKey?" + query) // 비동기 통신 보낸다
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                authKeyMessage.innerText = "인증되었습니다.";
                authKeyMessage.classList.add("confirm");
                checkObj.authKey = true;


            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkObj.authKey = false;
            }
        })
        .catch(err => console.log(err));

    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }


});





// --------------------------------------------------------------------------




// 비밀번호/비밀번호 확인 유효성 검사
// checkPw() 함수로 만들어 해봐라(숙제)

const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

memberPw.addEventListener("input", function(){
    // 비밀번호를 입력할 때 마다 검사 진행
    
    // 비밉번호 미 작성 시
    // 영어, 숫자, 특수문자(!, @, #, -, _) 6~20글자 사이로 입력해 주세요. 까만 글씨
    if (memberPw.value.trim().length == 0) {
        memberPw.innerText = "영어, 숫자, 특수문자(!, @, #, -, _) 6~20글자 사이로 입력해 주세요.";
        //emailMessage.style.color = "black";
        memberPw.classList.remove("confirm", "error");
        checkObj.memberPw = false;
        return;
    }
    
    // 비밀번호 입력시
    
    // 비밀번호 유효성 검사: 영어 대/소문자, 숫자, !, @, #, -, _ 포함한 6~20 글자 사이 (\w에 _ 포함되어있다)
    const regExp = /^[\w!@#\-_]{6,20}$/;

    if (regExp.test(memberPw.value)) {
        // 유효한 경우 : 사용 가능한 비밀번호 입니다. 초록 글씨
        checkObj.memberPw = true;

        // 비밀번호가 유효한 상태에서 비밀번호 확인이 입력되지 않은 경우
        if ( memberPwConfirm.value == "") {
            pwMessage.innerText = "사용가능한 비밀번호 입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

        } else { // 비밀번호 확인이 입력되어 있는 경우

            // 비밀번호와 비밀번호 확인이 같을 경우
            if (memberPw.value == memberPwConfirm.value) {
                pwMessage.innerText = "비밀번호가 일치합니다.";
                pwMessage.classList.add("confirm");
                pwMessage.classList.remove('error');
                checkObj.memberPwConfirm = true;
            } else {
                // 다를 경우
                pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove('confirm');
                checkObj.memberPwConfirm = false;                
            }

        }


    } else {
        // 유효하지 않은 경우 : 사용 불가능한 비밀번호 입니다. 빨간 글씨
        pwMessage.innerText = "사용 불가능한 비밀번호 입니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");
        checkObj.memberPw = false;        
    }

})


// 비밀번호 확인 유효성 검사
// 비밀번호부터 먼저 입력하게 강제로 막기
memberPwConfirm.addEventListener("input", () => {
    
    // 비밀번호가 입력되지 않은 경우
    // 비밀번호를 입력해주세요. 알림창
    // 비밀번호 요소에 포커스
    if (memberPw.value == ""){
         alert("비밀번호를 입력해주세요.");
         memberPwConfirm.value = ""; // 남아있는값 지우기
         memberPw.focus();
         return;
    }
    
    // 비밀번호가 유효한 경우
    if (checkObj.memberPw) {
        if (memberPw.value == memberPwConfirm.value){
            // 비밃번호와 비밀번호 확인이 같을 경우
            pwMessage.innerText = "비밀번호가 일치합니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

            checkObj.memberPwConfirm = true;

        } else {
            // 다를 경우
            pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");

            checkObj.memberPwConfirm = false;

        }



    } else {
        // 비밀번호가 유효하지 않은 경우, 자동으로 memberPwConfirm false
        checkObj.memberPwConfirm = false;    
    }

})


// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname"); // memberNickname은 signUp.jsp의 input-tag name="memberNickname"로부터 옴
const nickMessage = document.getElementById("nickMessage");

memberNickname.addEventListener("input", ()=> {

    // 입력된 닉네임이 없을 경우
    if (memberNickname == ""){
        nickMessage.innerText = "한글,영어,숫자로만 2~10글자로 입력해 주세요"
        nickMessage.classList.remove("confirm", "error");
        checkObj.memberNickname = false;
        return;
    }

    // 입력된 닉네임이 있을 경우
    // 닉네임 작성시, 유효성 검사: 한글,영어,숫자로만 2~10글자
    //const regEx = /^[a-힣]{2,10}$/;
    //const regEx = /^[가-힣\w\d]{2,10}$/; //"영어/숫자/한글2~10글자 사이"
    const regEx = /^[가-힣a-zA-Z0-9]{2,10}$/; //"영어/숫자/한글2~10글자 사이"

    if (regEx.test(memberNickname.value)) {
        // 유효한 경우

        //******************************************* */
        // fetch() API를 이용한 ajax
        // console.log("test : " + memberNickname.value)
        //console.log(memberNickname.value);

        // 요청주소 : /dupCheck/nickname
        // 중복인 경우 : "이미 사용 중인 닉네임입니다." 빨간 글씨
        // 중복이 아닌 경우 : "사용 가능한 닉네임입니다." 초록글씨
        fetch("/dupCheck/nickname?nickname=" + memberNickname.value) // memberNickname은 signUp.jsp의 input-tag name="memberNickname"로부터 옴
                // 여기서 memberNickname.value값을 nickname에 넘겨주므로, Ajax처리 controller(이하 DB서비스)에서 입력파라미터명은 "nickname"이 된다
        .then(resp => resp.text()) // 0 or 1이므로 text로: 응답객체 -> 파싱(parsing, 데이터 형태 변환)
        .then(count => {
            // count : 중복1, 아니면 0
            console.log(count);

            //if (count == 1){
            if (count != 0) {
                nickMessage.innerText = "이미 사용 중인 닉네임입니다."
                nickMessage.classList.add("error");
                nickMessage.classList.remove("confirm");
                checkObj.memberNickname = false; 
            } else {
                nickMessage.innerText = "사용 가능한 닉네임입니다."
                nickMessage.classList.add("confirm");
                nickMessage.classList.remove("error");
                checkObj.memberNickname = true;
            }
        })
        .catch(err => console.log(err)) // 예외처리

        // nickMessage.innerText = "유효한 닉네임입니다."
        // nickMessage.classList.add("confirm");
        // nickMessage.classList.remove("error");
        // checkObj.memberNickname = true;
    } else {
        // 유효하지 않은 경우 
        nickMessage.innerText = "유효하지 않은 닉네임입니다.  한글,영어,숫자로만 2~10글자를 넣어주세요."
        nickMessage.classList.add("error");
        nickMessage.classList.remove("confirm");
        checkObj.memberNickname = false;        
    }

})



// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input", ()=>{

    // 전화번호 미 입력시
    if(memberTel.value == ""){
        telMessage.innerText = "전화번호를 입력해 주세요.";
        telMessage.classList.remove("confirm", "error");
        checkObj.memberTel = false;
        return;
    }

    // 전화번호 입력시, 유효성 검사: 전화번호를 입력해주세요.(- 제외)
    //const regEx = "/^0(1[01]|2|[3-6][1-5]|70)\d{7,8}$/"; //" 하이픈제외", ""있으면 않됨
    const regEx = /^0(1[01]|2|[3-6][1-5]|70)\d{7,8}$/; //" 하이픈제외"

    if (regEx.test(memberTel.value)) {
        telMessage.innerText = "유효한 전화번호입니다.";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true;
    } else {
        telMessage.innerText = "존재하지 않은 전화 번호입니다.";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false;        
    }

})

// 회원 가입 form태그가 제출되었을 때
// 표준이벤트 모델로..
// document.getElementById("signUpFrm").addEventListener("click", ()=>{
//     // checkObj에 모든 value가 true인지 검사
//     const keys = Object.keys(checkObj);
//     console.log("keys:" + keys);
    
//     //let result = "";
//     // for (let i = 0; i< checkObj.length; i++){   
//     //     if (!checkObj[i]){
//     //         result += 
//     //     }
//     // }

//     for (let key of keys) {
//         if (!checkObj[key]) {
//             //result += checkObj[key] + " ";
//             // 유효하지 않은 경우 000이 유효하지 않습니다. 알림창, 포커스
//             alert(key + "이(가) 유효하지 않습니다.")
//             key.focus()
//             return;
//         }
//     }

//     // 유효한 경우 제출
//     return true;

// })

document.getElementById("signUpFrm").addEventListener("submit", e => {

    // checkObj에 모든 value가 true인지 검사

    // 객체용 향상된 for문 (for ... in)
    // -> "JS 객체"가 가지고 있는 key를 순서대로 하나씩 꺼내는 반복문

    // 배열용 향상된 for문 (for ... of)
    // -> iterator(반복자) 속성을 지닌 "배열", "유사 배열" 사용 가능

    //for (let key of checkObj) {
    for (let key in checkObj) {
        console.log(key);

        //console.log(checkObj.key); // Error: undefined
        console.log(checkObj[key]); 

        if(!checkObj[key]){ // 유효하지 않은 경우

            switch(key) {

                case 'memberEmail': alert("이메일이 유효하지 않습니다."); break;
                case 'memberPw': alert("비밀번호가 유효하지 않습니다."); break;
                case 'memberPwConfirm': alert("비밀번호확인이 유효하지 않습니다."); break;
                case 'memberNickname': alert("닉네임이 유효하지 않습니다."); break;
                case 'memberTel': alert("전화번호가 유효하지 않습니다."); break;
                case 'authKey': alert("authKey가 유효하지 않습니다."); break;
            }

            // 유효하지 않은 input 태그 포커스
            // -> key와 input의 id가 똑같음
            document.getElementById(key).focus();
            
            // form태그 기본 이벤트 제거
            e.preventDefault(); // 기본이벤트 제거(form submit 방지)
            return; // 유효하지 않은것 확인했으므로 종료하고 더이상 진행않함
        }

    }

})
