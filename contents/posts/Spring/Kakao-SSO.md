---
path: "/content/kakao-login"
author: "snyung"
date: "2018-01-11"
title: "[Spring] 카카오톡 로그인 구현"
tags: ["Spring", "login"]
category: "post"
---

# **Spring_KakaoTalk_SSO**

이 카카오톡을 마지막으로 우리나라에서 사용하는 대부분의 SSO는 다했다고 생각합니다. 이제 처음 로그인을 하게 되면 디비에 넣고 다음에 로그인을 할경우 id를 비교해서 권한을 부여하면될거 같습니다. REST Api로 진행합니다.
<br/>

[참고 사이트](http://gongcha.tistory.com/20?category=737124)를 보고하였습니다. 블로그를 너무나도 잘 적어주셔서 따라하기 쉬웠습니다.
<br/>

## 1. 먼저 해야 할일

1. [카카오톡 개발자 사이트](https://developers.kakao.com/)사이트에 들어가서 앱를 생성합니다.
2. 앱이 만들어지면 설정>일반에 들어가게 되면 REST Api 키가 있습니다.
3. 아래에 플랫폼에서 추가 버튼을 눌러서 내 사이트 주소와 아래의 리다이렉트 주소를 입력해줍니다.
4. 설정>사용자 관리에 들어가서 내가 받아오고 싶은 프로필정보는 선택해주며 사유도 적어줍니다.

<br/>

## 2. pom.xml 추가하기(없음)

카카오톡을 REST Api로 받아오는 것이라 따로 추가가 없습니다.
<br/>

## 3. KakaoController 추가하기

- 버튼 클릭시 이동하는 주소 만드는 메소드 생성
- 로그인 성공시 가져오는 code를 통해서 accessToken 가져오기
- accessToken을 가지고 프로필 정보가져오기

```java
  @Controller
  public class KakaoController {

    private final static String K_CLIENT_ID = "나의 앱 키 입력";
    private final static String K_REDIRECT_URI = "리다이렉트 주소입력";

    public String getAuthorizationUrl(HttpSession session) {

      String kakaoUrl = "https://kauth.kakao.com/oauth/authorize?"
          + "client_id=" + K_CLIENT_ID + "&redirect_uri="
          + K_REDIRECT_URI + "&response_type=code";
      return kakaoUrl;
    }

    public String getAccessToken(String autorize_code) {

      final String RequestUrl = "https://kauth.kakao.com/oauth/token";
      final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
      postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
      postParams.add(new BasicNameValuePair("client_id", K_CLIENT_ID)); // REST API KEY
      postParams.add(new BasicNameValuePair("redirect_uri", K_REDIRECT_URI)); // 리다이렉트 URI
      postParams.add(new BasicNameValuePair("code", autorize_code)); // 로그인 과정 중 얻은 code 값

      final HttpClient client = HttpClientBuilder.create().build();
      final HttpPost post = new HttpPost(RequestUrl);
      JsonNode returnNode = null;

      try {

        post.setEntity(new UrlEncodedFormEntity(postParams));
        final HttpResponse response = client.execute(post);
        final int responseCode = response.getStatusLine().getStatusCode();

        // JSON 형태 반환값 처리

        ObjectMapper mapper = new ObjectMapper();
        returnNode = mapper.readTree(response.getEntity().getContent());

      } catch (UnsupportedEncodingException e) {

        e.printStackTrace();

      } catch (ClientProtocolException e) {

        e.printStackTrace();

      } catch (IOException e) {

        e.printStackTrace();

      } finally {
        // clear resources
      }
      return returnNode.get("access_token").toString();
    }

    public JsonNode getKakaoUserInfo(String autorize_code) {

      final String RequestUrl = "https://kapi.kakao.com/v1/user/me";
      //String CLIENT_ID = K_CLIENT_ID; // REST API KEY
      //String REDIRECT_URI = K_REDIRECT_URI; // 리다이렉트 URI
      //String code = autorize_code; // 로그인 과정중 얻은 토큰 값
      final HttpClient client = HttpClientBuilder.create().build();
      final HttpPost post = new HttpPost(RequestUrl);
      String accessToken = getAccessToken(autorize_code);
      // add header
      post.addHeader("Authorization", "Bearer " + accessToken);

      JsonNode returnNode = null;

      try {

        final HttpResponse response = client.execute(post);
        final int responseCode = response.getStatusLine().getStatusCode();
        System.out.println("\nSending 'POST' request to URL : " + RequestUrl);
        System.out.println("Response Code : " + responseCode);

        // JSON 형태 반환값 처리
        ObjectMapper mapper = new ObjectMapper();
        returnNode = mapper.readTree(response.getEntity().getContent());
      } catch (UnsupportedEncodingException e) {

        e.printStackTrace();
      } catch (ClientProtocolException e) {

        e.printStackTrace();
      } catch (IOException e) {

        e.printStackTrace();
      } finally {

        // clear resources
      }
      return returnNode;
    }
  }
```

<br/>

## 4. LoginController 수정하기(리다이렉트 추가)

처음 로그인 화면을 들어갈때 버튼 클릭시 이동할 주소를 만들어서 보내준다.

```java
  String kakaoUrl = kakaoLogin.getAuthorizationUrl(session);

  /* 생성한 인증 URL을 View로 전달 */
  model.addAttribute("kakao_url", kakaoUrl);
```

이제 리다이렉트를 만들어 줍니다.

```java
/**
  * 카카오 로그인 콜백
  *
  * @return String
  * @throws Exception
  */
@RequestMapping(value = "/kakaoOauth.do")
public String getKakaoSignIn(ModelMap model,@RequestParam("code") String code, HttpSession session) throws Exception {

  JsonNode userInfo = kakaoLogin.getKakaoUserInfo(code);

  System.out.println(userInfo);

  String id = userInfo.get("id").toString();
  String email = userInfo.get("kaccount_email").toString();
  String image = userInfo.get("properties").get("profile_image").toString();
  String nickname = userInfo.get("properties").get("nickname").toString();

  System.out.println(id + email);


  model.addAttribute("k_userInfo", userInfo);
  model.addAttribute("id", id);
  model.addAttribute("email", email);
  model.addAttribute("nickname", nickname);
  model.addAttribute("image", image);

  return "main/main.tiles";
}
```

저는 유저 정보가 다 담겨있는 k_userInfo와 아이디, 이메일, 닉네임, 이미지를 가져왔습니다.
<br/>

## 화면에 뿌리기

```jsp
  <h6>카카오톡 로그인 성공 화면</h6>
  <hr />
  <div id="k_image" style="text-align:center"><img></img</div>
  <div id="k_id" style="text-align:center"></div>
  <div id="k_email" style="text-align:center"></div>
  <div id="k_nickname" style="text-align:center"></div>

  <script>			
  if ('${k_userInfo}') {

    $("#k_id").text("아이디 : " + '${id}');
    $("#k_email").text("이메일 : " + '${email}');
    $("#k_nickname").text("이름 : " + '${nickname}');

    imageURL = ${image};

    $("#k_image").children("img").attr("src", imageURL);
  }
  </script>
```

<br/>

---

#### Reference

- [개발자라면 블로그](http://gongcha.tistory.com/18)
