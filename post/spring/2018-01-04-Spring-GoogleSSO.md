---
path: "/post/spring/google-login"
author: "sseon"
date: "2018-01-04"
title: "스프링 - 구글 로그인 구현"
tags: ["spring", "login"]
category: "post"
---

이것도 나에게 맞는 자료를 찾느라 너무나도 힘들었다. 그래도 겨우겨우 찾아서 나한테 맞추는 것에 성공을 하였고, 이후에는 페이스북, 네이버, 카카오톡까지 해보려고 한다.
<br/>

## 먼저 해야 할일

1. [구글 API](https://console.developers.google.com/)사이트에 들어가서 프로젝트를 생성합니다.
2. 사용자 인증정보에 들어가서 OAuth 동의 화면에 가서 제품 이름을 만들어서 저장을 합니다.
3. 사용자 인증 정보를 다시 가게되면 아이디와 보안비밀이 생성됩니다.
4. 하단 승인된 자바스크립트 원본에 자신의 사이트 주소 (ex. http://localhost) 를 적어줍니다.
5. 승인된 리디렉션 URI에는 승인된 후 이동할 url를 적어줍니다.

<br/>

## pom.xml 추가하기

소셜 로그인 라이브러리 추가(구글편)

```xml
  <!-- 구글 소셜 로그인 구현 -->
  <dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-google</artifactId>
    <version>1.0.0.RELEASE</version>
  </dependency>
  <!-- 구글 소셜 로그인 구현 -->
```

<br/>

## dispatcher-servlet 수정

여기서 아이디와 보안비밀번호를 적어줍니다.

```xml
  <!-- google Class Bean설정 추가 -->
  <!-- 클라이언트ID와 보안비밀 세팅 -->
  <bean id="googleConnectionFactory"
  class="org.springframework.social.google.connect.GoogleConnectionFactory">
    <constructor-arg value="***************************" />
    <constructor-arg value="***********************" />
  </bean>

  <!-- 승인된 자바스크립트 원본과 승인된 리디렉션 URI -->
  <bean id="googleOAuth2Parameters" class="org.springframework.social.oauth2.OAuth2Parameters">
    <property name="scope" value="https://www.googleapis.com/auth/plus.login" />
    <property name="redirectUri" value="내가 프로젝트에 적은 url" />
  </bean>
  <!-- google Class Bean설정 추가 -->
```

- 하단 `redirectUri`에는 자신이 구글 프로젝트에 적었던 **승인된 후 주소와 똑같이** 적어줍니다.
- 안그러면 에러 뜹니다.

<br/>

## controller 구현

- 로그인 페이지를 불러오는 컨트롤러를

```java
  @Autowired
  private GoogleConnectionFactory googleConnectionFactory;

  @Autowired
  private OAuth2Parameters googleOAuth2Parameters;

  //로그인 페이지로 이동하는 컨트롤러
  @RequestMapping(value = "login.do")
  public String initLogin(Model model, HttpSession session) throws Exception {

  	/* 구글code 발행 */
  	OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();

    /* 로그인페이지 이동 url생성 */
  	String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);

  	model.addAttribute("google_url", url);

  	/* 생성한 인증 URL을 Model에 담아서 전달 */
  	return "page1/login.all";
  }
```

<br/>

- 로그인이 성공하면 불러오는 컨트롤러

<br/>

```java
  // 구글 Callback호출 메소드
  @RequestMapping(value = "oauth2callback.do", method = { RequestMethod.GET, RequestMethod.POST })
  public String googleCallback(Model model, @RequestParam String code) throws IOException {

    System.out.println("Google login success");

    //저는 성공하면 메인페이지로 리다이렉트합니다.
    return "redirect:main.do";
  }
```

<br/>

## 로그인 버튼 구현

간단하게 로그인 버튼을 구현합니다.

```
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <div id="google_id_login" style="text-align: center">
    <a href="${google_url}">
      구글 로그인
    </a>
  </div>
```

<br/>

---

#### Referece

- [Spring MVC기반 소셜 로그인 구현(2)](http://blog.naver.com/PostView.nhn?blogId=sam_sist&logNo=220969414214&parentCategoryNo=&categoryNo=30&viewDate=&isShowPopularPosts=false&from=postView)
