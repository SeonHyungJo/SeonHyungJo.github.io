---
path: "/content/naver-login-1"
author: "snyung"
date: "2018-01-05"
title: "스프링 - 네이버 로그인 구현"
tags: ["spring", "login"]
category: "post"
---

오늘은 소셜 로그인 2번째로 네이버를 진행했습니다. 구글님?에께 아는 내용과 네이버 개발자 사이트를 참고해서 만들어 보았습니다.
<br/>

## 먼저 해야 할일

네이버 역시 구글의 프로젝트 처럼 API애플리케이션을 만들어야 합니다. 저는 네이버로그인을 할 것임으로 [애플리케이션 등록](https://developers.naver.com/apps/#/register) 사이트에 들어가서 이름을 정하고 아래의 선택은 `네아로(네이버 아이디로 로그인)`를 선택하면된다.

- 네아로를선택하게 되면 자신의 사이트에 필요한 내용을 선택을 합니다.
- 환경추가로는 **웹** 을 추가합니다.
- 하단의 서비스 URL에는 구글과 같이 자신의 사이트 URL을 위에 적어줍니다.
- Callback은 역시 로그인이 성공하면 이동한 주소를 적어줍니다.
- 이제 내애플리케이션에 들어가면 **ClientID와 ClientSecret** 이 생겼습니다.

<br/>

## pom.xml 추가하기

소셜 로그인 라이브러리 추가(네이버편)
<br/>

네이버 로그인 구현은 깃허브에 올라와 있습니다.

```xml
  <!-- naver -->
  <dependency>
    <groupId>com.github.scribejava</groupId>
    <artifactId>scribejava-core</artifactId>
    <version>2.8.1</version>
  </dependency>
```

<br/>

## Scribe library용 Naver Login 구현체 만들기

```java
  public class NaverLoginApi extends DefaultApi20 {

    protected NaverLoginApi() {
    }

    private static class InstanceHolder {
      private static final NaverLoginApi INSTANCE = new NaverLoginApi();
    }

    public static NaverLoginApi instance() {
      return InstanceHolder.INSTANCE;
    }

    @Override
    public String getAccessTokenEndpoint() {
      return "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";
    }

    @Override
    protected String getAuthorizationBaseUrl() {
      return "https://nid.naver.com/oauth2.0/authorize";
    }

  }
```

<br/>

## Scribe Library를 이용하여 네아로 인증 버튼을 위한 url생성

위에서 만든 구현체를 이용해서 네이버 로그인을 위한 url을 만들어 줍니다.

```java
  public class NaverLoginBO {

    private final static String CLIENT_ID = "자신의 CLIENT_ID";
    private final static String CLIENT_SECRET = "자신의 CLIENT_SECRET";
    private final static String REDIRECT_URI = "자신이 작성한 로그인 성공시 url";

    public String generateState()
	{
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
  }           
```

<br/>

## Controller Class에서 BO Class를 이용할 수 있도록 Bean등록(dispatcher-servlet.xml에 추가)

```xml
  <bean id="naverLoginBO" class="com.naver.naverlogintutorial.oauth.bo.NaverLoginBO" />
```

<br/>

## Controller 생성

저의 경우 구글 로그인과 섞여 있습니다.

```java
  @RequestMapping(value = "login.do")
  public String initLogin(Model model, HttpSession session) throws Exception {

    /* 구글code 발행 */
    OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
    String googleAuthurl = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);
    String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);

    /* 생성한 인증 URL을 View로 전달 */
    model.addAttribute("naver_url", naverAuthUrl);
    model.addAttribute("google_url", googleAuthurl);

    /* 생성한 인증 URL을 Model에 담아서 전달 */
    return "page1/login.all";
  }
```

<br/>

## 네이버 로그인 버튼 생성

저의 경우 간단한 이미지를 가져와서 연결만 했습니다.

```
  <a href="${naver_url}"><img height="30" src="http://static.nid.naver.com/oauth/small_g_in.PNG"/></a>
```  

<br/>

## 추가편

## 콜백페이지 생성(컨트롤러 추가)

까먹고 콜백페이지 연결을 안했습니다.

```java
  // 네이버 Callback호출 메소드
  @RequestMapping(value = "naverLoginCallback.do")
  public String naverCallback() throws IOException {

    System.out.println("naver login success");

  return "main/main.tiles";
  }
```

저의 경우 성공을 하면 메인 페이지로 이동하도록 했습니다.
<br/>

로그인은 이걸로 끝이 났습니다. 너무나도... 간단하게 끝이 납니다. 하지만 저는 헤매면서 했습니다. 내용이 좀 길어질거 같아 네이버 로그인 2편에서 개발자 페이지에서 선택한 프로필정보를 가져와서 뿌려보겠습니다.

<br/>

---

#### Reference

- [네이버아이디로 로그인 적용하기](https://github.com/Blackseed/NaverLoginTutorial/wiki/Spring-MVC-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%84%A4%EC%9D%B4%EB%B2%84%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
- [네이버 개발자 사이트](https://developers.naver.com/main/)
