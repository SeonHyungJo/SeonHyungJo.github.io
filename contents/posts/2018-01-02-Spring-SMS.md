---
path: "/content/sms"
author: "sseon"
date: "2018-01-02"
title: "스프링 문자보내기"
tags: ["spring", "sms"]
category: "post"
---

이게 뭔가 거창하게 스프링을 적용한 SMS서비스라고 하기에는 생각보다 API가 잘되어 있는 세상이기에 그냥 적절한 API를 가져와서 내 방식대로 살짝만 바꿔서 사용하는 정도?
<br/>

## 제가 사용한 문자전송 서비스 사이트는

제가 사용한 문자전송 서비스를 제공하고 잇는 사이트는 **coolsms** 라는 사이트 입니다. 자신이 원하는 만큼의 금액을 충전하여 사용할 수 있는 사이트로 SMS, MMS, MMS포토를 지원하고 있습니다. 각각의 단가는 다릅니다.
<br/>

**5000원 충전 기준입니다.**

|종류|단가|부가세포함|
|:-:|:-:|:-:|
|SMS|18.18원|20원|
|MMS|45.46원|50원|
|MMS포토|181.84원|200원|
암튼!! 제가 사용한 서비스는 coolsms입니다. (중요한건 가입하면 300원을 기본 제공함으로 15번의 문자를 그냥 테스트할 수 있습니다.)
<br/>

총 3개로 문자서비스를 구현할 수 있습니다.
  
- REST API
- SDK
- ClassicAPI

<br/>

## SDK for Java

저는 역시나 스프링에 적용을 해야함으로 Java를 사용해서 적용 해보겠습니다. 그전에 사이트에 들어가서 API키를 만들어 줍니다.
[API키 만들기](https://www.coolsms.co.kr/index.php?mid=service_setup&act=dispSmsconfigCredentials)

<br/>

### 1. jsp 만들기

저는 화면을 일단 심플하게 보내는사람 번호와 본문만 적을 수 있도록 했습니다. 이외는 커스터마이즈 가능합니다.

```jsp
  <form method="post" id="smsForm">
    <ul>
      <li>보낼사람 : <input type="text" name="from"/></li>
      <li>내용 : <textarea name="text"></textarea></li>
      <li><input type="button" onclick="sendSMS('sendSms')" value="전송하기" /></li>
    </ul>
  </form>

  <script>
    function sendSMS(pageName){

    	console.log("문자를 전송합니다.");
    	$("#smsForm").attr("action", pageName + ".do");
    	$("#smsForm").submit();
    }
  </script>
```

<br/>

단순히 이렇게함으로써 앞부분이 끝났습니다.
<br/>

### 2. Java파일 추가하기

기본으로 제공하는 SDK를 다운받습니다.
<br/>

- [SDK v2.1 다운받기](https://github.com/coolsms/java-sdk/archive/v2.1.zip)

<br/>

다운을 받은 파일안에 경로 `java-sdk-2.1.zip\java-sdk-2.1\src`안에 있는 2개의 파일을 넣어줍니다. 또한 `lib`안에 있는 `.jar`파일도 넣어줍니다.
<br/>

#### (maven 추가)POM.xml

json 사용을 위한 추가라고 하는데 없으면 작동이 안됨...

```xml
  <dependency>
    <groupId>net.nurigo</groupId>
    <artifactId>javaSDK</artifactId>
    <version>2.2</version>
  </dependency>
```

<br/>

### 3. 마지막 컨트롤러 만들어주기

생각보다 간단합니다. 아래의 코드를 적용하고 api키와 보내는사람을 설정해주면 **끝**

```java
  @RequestMapping(value = "/sendSms.do")
  public String sendSms(HttpServletRequest request) throws Exception {

    String api_key = "<너의키>";
    String api_secret = "<너의키>";
    Coolsms coolsms = new Coolsms(api_key, api_secret);

    HashMap<String, String> set = new HashMap<String, String>();
    set.put("to", "너의번호"); // 수신번호

    set.put("from", (String)request.getParameter("from")); // 발신번호
    set.put("text", (String)request.getParameter("text")); // 문자내용
    set.put("type", "sms"); // 문자 타입

    System.out.println(set);

    JSONObject result = coolsms.send(set); // 보내기&전송결과받기

    if ((boolean)result.get("status") == true) {
      // 메시지 보내기 성공 및 전송결과 출력
      System.out.println("성공");
      System.out.println(result.get("group_id")); // 그룹아이디
      System.out.println(result.get("result_code")); // 결과코드
      System.out.println(result.get("result_message")); // 결과 메시지
      System.out.println(result.get("success_count")); // 메시지아이디
      System.out.println(result.get("error_count")); // 여러개 보낼시 오류난 메시지 수
    } else {
      // 메시지 보내기 실패
      System.out.println("실패");
      System.out.println(result.get("code")); // REST API 에러코드
      System.out.println(result.get("message")); // 에러메시지
    }

    return "redirect:main.do";
  }
```

<br/>

## 끝

위와 같이 적용을 하여 실행을 하고 전송하기 버튼을 누르고 기다리면 잠시후 문자가 도착합니다.(다음엔...인증번호 보내기를 해볼까...)
