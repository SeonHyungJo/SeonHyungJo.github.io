---
path: "/content/naver-login-2"
author: "snyung"
date: "2018-01-05"
title: "스프링 - 네이버 로그인 구현_두번째"
tags: ["spring", "login"]
category: "post"
---

이번에는 저번 포스트에 이어서 로그인을 하고 나서 토큰을 생성한후 그 토큰으로 프로필 정보를 가져와 보겠습니다.

> [네이버 로그인 구현하기](https://seonhyungjo.github.io/Spring-NaverSSO_1/)

## 컨트롤러 수정

1편에서 적었던 콜백 구간에 추가를 해주겠습니다.

```java
  // 네이버 Callback호출 메소드
  @RequestMapping(value = "naverLoginCallback.do")
  public String naverCallback(ModelMap model,@RequestParam String code, @RequestParam String state, HttpSession session) throws IOException {

    /* 네아로 인증이 성공적으로 완료되면 code 파라미터가 전달되며 이를 통해 access token을 발급 */
    OAuth2AccessToken oauthToken = naverLoginBO.getAccessToken(session, code, state);
    String apiResult = naverLoginBO.getUserProfile(oauthToken);

    System.out.println("Naver login success");
    model.addAttribute("result", apiResult);

    return "main/main.tiles";
  }

```

- `oauthToken`이라는 토큰 생성

<br/>

## NaverLoginBO 수정

```java
  public class NaverLoginBO {

    private final static String CLIENT_ID = "자신의 CLIENT_ID";
    private final static String CLIENT_SECRET = "자신의 CLIENT_SECRET";
    private final static String REDIRECT_URI = "자신이 작성한 로그인 성공시 url";

    /* 프로필 조회 API URL */
    private final static String PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";

    public String generateState()
    {
        //난수 생성
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    /* 네아로 인증  URL 생성  Method */
    public String getAuthorizationUrl(HttpSession session) {

      String state = generateState();
      session.setAttribute("state", state);

      /* Scribe에서 제공하는 인증 URL 생성 기능을 이용하여 네아로 인증 URL 생성 */
      OAuth20Service oauthService = new ServiceBuilder()
          .apiKey(CLIENT_ID)
          .apiSecret(CLIENT_SECRET)
          .callback(REDIRECT_URI)
          .state(state)
          .build(NaverLoginApi.instance());

      return oauthService.getAuthorizationUrl();
    }


    /* 네아로 Callback 처리 및  AccessToken 획득 Method */
    public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws IOException{

      /* Callback으로 전달받은 세선검증용 난수값과 세션에 저장되어있는 값이 일치하는지 확인 */
      String sessionState = (String)session.getAttribute("state");
      if(StringUtils.equals(sessionState, state)){

        OAuth20Service oauthService = new ServiceBuilder()
            .apiKey(CLIENT_ID)
            .apiSecret(CLIENT_SECRET)
            .callback(REDIRECT_URI)
            .state(state)
            .build(NaverLoginApi.instance());

        /* Scribe에서 제공하는 AccessToken 획득 기능으로 네아로 Access Token을 획득 */
        OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
        return accessToken;
      }
      return null;
    }

    /* Access Token을 이용하여 네이버 사용자 프로필 API를 호출 */
    public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException{

      OAuth20Service oauthService =new ServiceBuilder()
            .apiKey(CLIENT_ID)
            .apiSecret(CLIENT_SECRET)
            .callback(REDIRECT_URI).build(NaverLoginApi.instance());

        OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
      oauthService.signRequest(oauthToken, request);
      Response response = request.send();
      return response.getBody();
    }

  }

```

<br/>

## 페이지에서 뿌리기

먼저 토큰을 토대로 프로필 정보를 가져오게 되면 JSON형식으로 오게 된다. 먼저 변환을 해준 후 사용해야하지만 저는 보여주는 것에 의의를 두고 진행했습니다.

```html
  <div class="padd">
    <h6>네이버 로그인 성공 화면</h6>
    <hr />
    <div id="resultCode" style="text-align:center"></div>
    <div id="message" style="text-align:center"></div>
    <div id="nickname" style="text-align:center"></div>
    <div id="image" style="text-align:center"><img src=""></img</div>
    <div id="age" style="text-align:center"></div>
    <div id="gender" style="text-align:center"></div>
    <div id="id" style="text-align:center"></div>
    <div id="name" style="text-align:center"></div>
    <div id="birthday" style="text-align:center"></div>
    <a href="https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${id}&client_secret=${pw}&access_token=${token}&service_provider=NAVER">로그아웃</a>
  </div>

  <script>
    $(document).ready(function(){
      var obj = JSON.parse('${result}');

      $("#resultCode").text("결과코드 : " + obj.resultcode);
      $("#message").text("결과메시지 : " + obj.message);
      $("#age").text("나이 : " + obj.response.age);
      $("#name").text("이름 : " + obj.response.name);
      $("#birthday").text("생일 : " + obj.response.birthday);
      $("#enc_id").text("무슨 아이디 : " + obj.response.enc_id);
      $("#gender").text("성별 : " + obj.response.gender);
      $("#id").text("아이디 : " + obj.response.id);
      $("#name").text("이름 : " + obj.response.name);
      $("#nickname").text("닉네임 : " + obj.response.nickname);
      $("#image").children("img").attr("src", obj.response.profile_image);
    });
  </script>
```

<br/>

추가적으로 로그아웃을 하는 블로그는 찾아도 안나와서 제가 해보려고합니다.

---

#### Reference

- [네이버아이디로 로그인 적용하기](https://github.com/Blackseed/NaverLoginTutorial/wiki/Spring-MVC-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%84%A4%EC%9D%B4%EB%B2%84%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
- [네이버 개발자 사이트](https://developers.naver.com/main/)
