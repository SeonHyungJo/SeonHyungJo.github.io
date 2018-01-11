---
layout: post
title:  "스프링 - 페이스북 로그인 구현"
date:   2018-01-09
excerpt: "소셜 로그인 3번째 페이스북 로그인입니다. 네이버와 구글보다는 생각보다 자료가 없어서 오래걸렸습니다. 다음은 될지는 모르지만 카카오 로그인 도전입니다."
tag:
- spring
- maven
- jsp
- js
- web
- social
- login
- facebook
comments: true
---

**Spring_Facebook_SSO**
===
드디어 소셜 로그인 3번째인 페이스북 로그인입니다. 이 역시 단순 로그인이지 디비에 저장하고 관리하고 그런거 없습니다. 필요하면 만드시면 됩니다.
[참고 사이트](http://osozaki.tistory.com/13)를 보고하는데 처음에 이해가 안되서 2일이나 걸렸습니다. 또 메서드 위치와 파일의 위치를 변경하느라 생각을 좀 했습니다.

## 1. 먼저 해야 할일
  1. [페이스북 API](https://developers.facebook.com)사이트에 들어가서 앱를 생성합니다.
  2. 이전에 만들었던 앱, 프로젝트와 같이 리다이렉트 주소를 입력합니다.
  3. 사용자 인증 정보를 다시 가게되면 아이디와 보안비밀이 생성됩니다.

## 2. pom.xml 추가하기
소셜 로그인 라이브러리 추가(페이스북편)

```
  <!-- facebook -->
  <dependency>
      <groupId>org.springframework.social</groupId>
      <artifactId>spring-social-facebook</artifactId>
      <version>1.1.0.RELEASE</version>
  </dependency>
  <!-- https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient -->
  <dependency>
      <groupId>org.apache.httpcomponents</groupId>
      <artifactId>httpclient</artifactId>
      <version>4.5.2</version>
  </dependency>
  <!-- https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple -->
  <dependency>
      <groupId>com.googlecode.json-simple</groupId>
      <artifactId>json-simple</artifactId>
      <version>1.1.1</version>
  </dependency>
```
 - 참고 사이트와 똑같이 진행을 하다보니 메이븐추가가 3개가 되었습니다.

## 3. FacebookController 추가하기

```
  @Controller
  public class FacebookController {

  	private final static String F_CLIENT_ID= "{자신의 아이디}";
  	private final static String F_CLIENT_SECRET= "자신의 시크릿 키";
  	private final static String F_REDIRECT_URI= "자신이 입력한 리다이렉트 주소";

  	public String getAuthorizationUrl(HttpSession session){

      //로그인 버튼연결 주소 생성
  		String facebookUrl = "https://www.facebook.com/v2.8/dialog/oauth?"+
  				"client_id="+F_CLIENT_ID+
  				"&redirect_uri="+F_REDIRECT_URI+
  				"&scope=public_profile,email";

  		return facebookUrl;
  	}

  	public String requesFaceBooktAccesToken(HttpSession session, String code) throws Exception {

  		String facebookUrl = "https://graph.facebook.com/v2.8/oauth/access_token?"+
  						 	"client_id=" + F_CLIENT_ID +
  						 	"&redirect_uri=" + F_REDIRECT_URI +
  						 	"&client_secret=" + F_CLIENT_SECRET +
  						 	"&code="+code;

  		HttpClient client = HttpClientBuilder.create().build();
  		HttpGet getRequest = new HttpGet(facebookUrl);
  		String rawJsonString = client.execute(getRequest, new BasicResponseHandler());
  		//logger.debug("facebookAccessToken / raw json : "+rawJsonString);

  		JSONParser jsonParser = new JSONParser();
  		JSONObject jsonObject = (JSONObject) jsonParser.parse(rawJsonString);
  		String faceBookAccessToken = (String) jsonObject.get("access_token");
  		//logger.debug("facebookAccessToken / accessToken : "+faceBookAccessToken);

  		session.setAttribute("faceBookAccessToken", faceBookAccessToken);

  		return faceBookAccessToken;
  	}

  	public String facebookUserDataLoadAndSave(String accessToken, HttpSession session) throws Exception {
  	    String facebookUrl = "https://graph.facebook.com/me?"+
  	            "access_token="+accessToken+
  	            "&fields=id,name,email,picture";

  	    HttpClient client = HttpClientBuilder.create().build();
  	    HttpGet getRequest = new HttpGet(facebookUrl);
  	    String rawJsonString = client.execute(getRequest, new BasicResponseHandler());
  	    //logger.debug("facebookAccessToken / rawJson!  : "+rawJsonString);

  	    JSONParser jsonParser = new JSONParser();
  	    JSONObject jsonObject = (JSONObject) jsonParser.parse(rawJsonString);
  	    //logger.debug("facebookUserDataLoadAndSave / raw json : "+jsonObject);

  		/* 가져온 데이터를 서비스에 맞춰 가공하는 로직*/
  	    return jsonObject.toString();
  	}
  }
```

## 4. LoginController 수정하기(리다이렉트 추가)

```
  @RequestMapping(value = "/facebookAccessToken.do")
  public String getFacebookSignIn(ModelMap model, String code, HttpSession session, String state) throws Exception {
    //logger.debug("facebookAccessToken / code : "+code);

    String accessToken = facebookLogin.requesFaceBooktAccesToken(session, code);
    String facebookResult = facebookLogin.facebookUserDataLoadAndSave(accessToken, session);

    //가져온정부 보내기
    model.addAttribute("fResult", facebookResult);

    return "main/main.tiles";
  }
```

## 5. 프로필 정보 가져와서 뿌리기

```
  <h6>페이스북 로그인 성공 화면</h6>
  <hr />
  <div id="f_image" style="text-align:center"><img src=""></img</div>
  <div id="f_id" style="text-align:center"></div>
  <div id="f_name" style="text-align:center"></div>

  <a href="naverLogout.do">네이버로그아웃</a>
  <a href="main.do">메인</a>

  <script>
  if ('${fResult}') {
    var obj = JSON.parse('${fResult}');

    $("#f_id").text("아이디 : " + obj.id);
    $("#f_name").text("이름 : " + obj.name);
    $("#f_image").children("img").attr("src", obj.picture.data.url);
  }
  </script>
```

# 끝

## 참고 자료
 - [Spring MVC에서 페이스북 소셜로그인 구현](http://osozaki.tistory.com/13)
