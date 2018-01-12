---
layout: post
title:  "카카오링크 Api 사용하기 - DefaultButton"
date:   2018-01-11
excerpt: "카카오링크 카드형으로 카카오톡으로 공유하기 / 리스트 타입추가(01-12)"
tag:
- javascript
- jsp
- js
- web
- kakaotalk
- link
comments: true
---

**Spring_KakaoLink**
===
웹을 사용하다 보면 친구들에게 공유하고 싶은 페이지가 존재하게 된다. 그럴때는 브라우저의 공유하기를 이용하는 것보다는 카카오톡에서 Api로 지원을 하는 카드형 공유하기를 이용하면 좀 더 이쁘게 공유하기를 할 수 있게 된다. 여러가지가 존재 하기에 하나씩 보기로 맘먹었다. **모든 테스트는 모바일에서 진행을 하여야 합니다. && 카톡이 깔려있어야 합니다.**

## Kakao.Link.createDefaultButton(기본적인 버튼)

### 전체소스

```
<a id="kakao-link-btn">
  <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
</a>
<script type='text/javascript'>

  Kakao.init('나의 앱 키');

	//기본 버튼 공유하기
	Kakao.Link.createDefaultButton({

    /* 버튼을 먹일 곳*/
		container : '#kakao-link-btn',

    /* 여기서 타입은 feed로 고정 */
		objectType: 'feed',

    /* 카드형 안에 들어갈 내용들 */
    content: {

      /* 당연히 제목 */
      title: '바나나!!!~~~~~',

      /* 당연히 설명 */
      description: '#내가 #테스트 #하는 #거야',

      /* 사진 주소 */
      imageUrl: 'https://images2.alphacoders.com/507/thumb-1920-507980.png',

      /* 사진을 눌렀을 때 이동 페이지(다르게 줄 수 있음) */
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://seonhyungjo.github.io/'
      }
    },
    /* 각종(좋아요, 댓글수, 공유수, 열어본수, 구독수) */
    social: {
      likeCount: 1,
      commentCount: 2,
      sharedCount: 3,
      viewCount : 10000,
      subscriberCount : 1231241,
    },

    /* 버튼 생성 */
    buttons: [
      {
        /* 버튼 이름 */
        title: '웹으로 보기',

        /* 버튼 링크 */
        link: {
          mobileWebUrl: 'https://seonhyungjo.github.io/',
          webUrl: 'https://seonhyungjo.github.io/'
        }
      },
    ]
	});
	//]]>
</script>
```

### 결과 사진

![링크결과](https://github.com/SeonHyungJo/SeonHyungJo.github.io/blob/master/assets/img/kakaoLink/KakaoTalk_Link_feed.jpg?raw=true)

---

## Kakao.Link 레퍼런스(FeedType)

---

|Arguments|Arguments|Object|Default|설명|
|:-:|:-:|:-:|:-:|-|
|container|-|String or DOMElement (required)|-|DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 카카오링크가 전송됩니다.|
|objectType|-| String (required)|feed|feed타입이니까 feed라고 적어주면 됩니다.|
|content|-|Object (required)|-|메인 콘텐츠|
|content|title|String (required)|-|콘텐츠 타이틀|
|content|imageUrl|String (required)|-|이미지 경로, [앱 설정]에 등록된 도메인만 허용|
||
|link|webUrl|String|-|(constraint: webUrl, mobileWebUrl, androidExecParams, iosExecParams 중 하나는 필수)<br>카카오톡 PC버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|mobileWebUrl |String|-|카카오톡 Mobile버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|androidExecParams|String|-|카카오톡 Android버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|link|iosExecParams |String|-|카카오톡 IOS버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|content|description|String|-|콘텐츠의 상세 내용|
|content|imageWidth|Number|-|이미지 넓이|
|content|imageHeight|Number|-|이미지 높이|
|social|-|Object|-|소셜 정보|
|social|likeCount|Number|-|좋아요 수|
|social|commentCount|Number|-|댓글 수|
|social|sharedCount|Number|-|공유 수|
|social|viewCount|Number|-|조회 수|
|social|subscriberCount|Number|-|구독 수|
|buttonTitle||String|-|버튼명, [앱 설정]에 따른 기본 링크 사용, buttonTitle과 buttons 함께 있을 경우 buttons가 적용됨|
|buttons||Array[Object]|-|버튼, 링크 설정 가능, buttonTitle과 buttons 함께 있을 경우 buttons가 적용됨|
|buttons|title|String (required)|-|버튼 타이틀|
|buttons|link|Object (required)|-|버튼의 링크들|
|link|webUrl|String|-|constraint: webUrl, mobileWebUrl, androidExecParams, iosExecParams 중 하나는 필수)
카카오톡 PC버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|mobileWebUrl|String|-|카카오톡 Mobile버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|androidExecParams|String|-|카카오톡 Android버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|link|iosExecParams|String|-|카카오톡 IOS버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|installTalk|-|Boolean|false|카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동합니다.|
|fail|-|function|-|카카오 링크를 지원하지 않는 플랫폼(iOS/Android 외의 플랫폼)에서 함수를 호출했을 경우 불리는 콜백 함수|
|success|-|Function(messageObj)|-|카카오 링크 요청에 대한 응답을 확인하기 위한 콜백 함수(warning message 포함)|
|success|messageObj|Object|-|warning message|
|messageObj|template_msg|Object|-|링크 메시지 (Link JSON 참고용)|
|messageObj|warning_msg|Object|-|링크 메시지를 검증한 결과|
|messageObj|argument_msg|Object|-|argument를 검증한 결과|

---
---
---

## Kakao.Link.createDefaultButton(List Type)

### 리스트 템플릿 보내기
  1. 헤더 영역
  2. 아이템 리스트 영역: **최대 3개 표시** (3개를 넘어가니까 고장이 난다.)
  3. 제목/설명 영역: 최대 3줄 표시 (제목 2줄, 설명 1줄 표시)
  4. 이미지 영역: 400px * 400px (권장사항)
  5. 버튼 영역: 최대 2개 표시, 버튼명 8자 이하 권장

---

### 전체소스

```
  <div class="widget-content">
    <a id="kakao-link-btn2">
      <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
    </a>
  </div>
  <script>
  Kakao.Link.createDefaultButton({
    container: '#kakao-link-btn2',
    objectType: 'list',
    headerTitle: '리스트형 타이틀',

    /* 헤더 글씨를 클릭시 넘어가는 링크 */
    headerLink: {
      mobileWebUrl: 'https://seonhyungjo.github.io/',
      webUrl: 'https://seonhyungjo.github.io/'
    },

    /* 리스트 형에서 콘텐츠는 다수 가능(일단 타입이 리스트형이네) */
    contents: [{
      title: '첫번째 타이틀',
      description: '첫번째',
      imageUrl: 'https://images4.alphacoders.com/241/thumb-1920-241398.jpg',
      link: {
        mobileWebUrl: 'https://seonhyungjo.github.io/',
        webUrl: 'https://seonhyungjo.github.io/'
      }
    }, {
      title: '두번째 타이틀',
      description: '두번째',
      imageUrl: 'https://images5.alphacoders.com/409/thumb-1920-409764.jpg',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com'
      }
    }, {
      title: '세번째 타이틀',
      description: '세번째',
      imageUrl: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-157286.png',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com'
      },
    }],
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      }/* ,
      {
        title: '앱으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      } */
    ]
  });
  </script>
```

---

### 결과화면
![리스트 타입 결과 화면](https://github.com/SeonHyungJo/SeonHyungJo.github.io/blob/master/assets/img/kakaoLink/KakaoTalk_Link_list.jpg?raw=true)

---

## Kakao.Link 레퍼런스(FeedType)

---

|Arguments|Arguments|Object|Default|설명|
|:-:|:-:|:-:|:-:|-|
|container|-|String or DOMElement (required)|-|DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 카카오링크가 전송됩니다.|
|objectType|-| String (required)|feed|feed타입이니까 feed라고 적어주면 됩니다.|
|headerTitle|-| String (required)|-|전체 리스트에 헤더 타이틀|
|headerLink|-| Object (required)|-|헤더에 대한 링크|
|headerLink|webUrl|String|-|(constraint: webUrl, mobileWebUrl, androidExecParams, iosExecParams 중 하나는 필수)<br>카카오톡 PC버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|headerLink|mobileWebUrl |String|-|카카오톡 Mobile버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|headerLink|androidExecParams|String|-|카카오톡 Android버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|headerLink|iosExecParams |String|-|카카오톡 IOS버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|content|-| Array[Object] (required)|-|최대 3개의 콘텐츠 가능|
|content|title|String (required)|-|콘텐츠 타이틀|
|content|imageUrl|String (required)|-|이미지 경로, [앱 설정]에 등록된 도메인만 허용|
||
|link|webUrl|String|-|(constraint: webUrl, mobileWebUrl, androidExecParams, iosExecParams 중 하나는 필수)<br>카카오톡 PC버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|mobileWebUrl |String|-|카카오톡 Mobile버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|androidExecParams|String|-|카카오톡 Android버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|link|iosExecParams |String|-|카카오톡 IOS버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|content|description|String|-|콘텐츠의 상세 내용|
|content|imageWidth|Number|-|이미지 넓이|
|content|imageHeight|Number|-|이미지 높이|
|buttonTitle||String|-|버튼명, [앱 설정]에 따른 기본 링크 사용, buttonTitle과 buttons 함께 있을 경우 buttons가 적용됨|
|buttons||Array[Object]|-|버튼, 링크 설정 가능, buttonTitle과 buttons 함께 있을 경우 buttons가 적용됨|
|buttons|title|String (required)|-|버튼 타이틀|
|buttons|link|Object (required)|-|버튼의 링크들|
|link|webUrl|String|-|constraint: webUrl, mobileWebUrl, androidExecParams, iosExecParams 중 하나는 필수)<br>카카오톡 PC버전에서 이용, [앱 설정]에 등록된 도메인만 허용
|link|mobileWebUrl|String|-|카카오톡 Mobile버전에서 이용, [앱 설정]에 등록된 도메인만 허용|
|link|androidExecParams|String|-|카카오톡 Android버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|link|iosExecParams|String|-|카카오톡 IOS버전에서 이용, 해당 값이 없을 경우 mobileWebUrl로 적용|
|installTalk|-|Boolean|false|카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동합니다.|
|fail|-|function|-|카카오 링크를 지원하지 않는 플랫폼(iOS/Android 외의 플랫폼)에서 함수를 호출했을 경우 불리는 콜백 함수|
|success|-|Function(messageObj)|-|카카오 링크 요청에 대한 응답을 확인하기 위한 콜백 함수(warning message 포함)|
|success|messageObj|Object|-|warning message|
|messageObj|template_msg|Object|-|링크 메시지 (Link JSON 참고용)|
|messageObj|warning_msg|Object|-|링크 메시지를 검증한 결과|
|messageObj|argument_msg|Object|-|argument를 검증한 결과|

---

타입만 다르고 콘텐츠의 갯수가 다르다는 거지 특별한건 없었다.(결과적으로 헤더 타이틀, 헤더 링크, 콘텐트갯수 이렇게가 다르다.)

---

# 쉬는시간

# 참고 사이트
 - [카카오톡 개발자 사이트](https://developers.kakao.com/docs/js-reference#kakao_link_createdefaultbutton)
