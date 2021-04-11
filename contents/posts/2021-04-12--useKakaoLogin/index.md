---
path: "/content/2021-04-12--useKakaoLogin"
author: "snyung"
date: "2021-04-12"
title: React Custom Hooks - 카카오 로그인 구현하기
tags: [react, hooks]
category: "post"
---

![useKakaoLogin - Custom Hooks](../../assets/hooks/useKakaoLogin.png)

구글, 네이버, 카카오톡 등 많은 간편 로그인들이 있다. 개인적으로는 구글 간편 로그인을 많이 사용하지만, 서비스마다 연령층이 다르게 되어 사용되는 간편 로그인도 그것에 맞게 사용해야 한다.

현재 서비스에서는 카카오톡 간편 로그인이 맞다고 생각하여 카카오 로그인을 React의 Hooks로 구현한 방법을 간단하게 설명하려고 한다.

이후 추가 요건으로 인해 삽질했던 내용도 추가해보았다.

> [사용자 추적을 위한 utm tag를 카카오 로그인 이후에도 유지하기](#utm-태그-가져오기)

## useKakaoLogin hooks

거두절미하고 결과가 중요할 수 있는 분들을 위해 코드를 우선 올렸다. 모든 내용은 Typescript로 작성되었으나 Kakao 쪽 스크립트를 사용하게 되면 window 하위에 Kakao가 추가되어 Typescript 에러가 날 수 있다.

```ts
import { useCallback, useEffect } from 'react';

const KAKAO_SDK = 'https://developers.kakao.com/sdk/js/kakao.js';
const KAKAO_TOKEN = '' // 카카오 로그인 토큰;
const KAKAO_REDIRECT = '' // 카카오 로그인에 추가한 Redirect URI;

const useKakaoLogin = () => {

  useEffect(() => {
    const script = document.createElement('script');

    script.src = KAKAO_SDK;
    script.onload = () => handleSuccess();

    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  const handleSuccess = useCallback(() => {
    Kakao.init(KAKAO_TOKEN);
  }, []);

  return useCallback(() => {
    const path = location.href.split('?');

    if (path[1]) {
      sessionStorage.setItem(LOGIN_UTM, path[1]);
    }
    Kakao.Auth.authorize({
      redirectUri: KAKAO_REDIRECT
    });
  }, []);
};

export default useKakaoLogin;
```

카카오 로그인을 하나의 서비스에서 사용된다는 전제하에 props로 받지 않고 Hooks 내부적으로 상수를 선언해서 사용했다.

- `KAKAO_SDK` : 카카오 리소스를 받아오는 주소.
- `KAKAO_TOKEN` : 카카오 디벨로퍼 사이트에서 생성한 토큰 값
- `KAKAO_REDIRECT` : 카카오 디벨로퍼에서 설정하는 Redirect URI로 로그인이 성공/실패할 경우 이동하는 페이지

코드를 간단하게 살펴보면 `useEffect`를 사용하여 `KAKAO_SDK`의 리소스를 해당 hooks를 사용하는 경우 호출하도록 하였다.

script가 에러가 날 경우 `script.error`로 에러 처리를 해줄 수 있지만, 위의 경우는 성공의 경우 `script.onload`로 카카오 로그인 init을 해주고 있다.

마지막으로 return 값으로 `useCallback`을 하여 사용하는 곳에서는 아래와 같이 사용하면 된다.

```ts
const requestLogin = useKakaoLogin();

return (
  <button onClick={requestLogin}>
)
```

## Redirect URI 세팅하기

카카오 로그인이 실행되고 성공/실패하고 기존 브라우저로 돌아오게 되면 우리가 설정한 Redirect URI로 이동한다.

이동한 페이지를 보면 총 4개의 query string을 넘겨받게 되고 해당 정보들은 아래와 같다.

![react custom hooks / kakao developer5 - snyung.com](https://user-images.githubusercontent.com/24274424/114301157-7594f880-9afe-11eb-8893-6076c2008dcf.png)

> [자세한 정보 살펴보기](https://developers.kakao.com/docs/latest/ko/kakaologin/js)

아래의 코드는 [wouter](https://www.npmjs.com/package/wouter)를 기준으로 작성되었으며, 자신의 라이브러리에 맞게 작성하면 된다.

```ts
<Route path={'/kakao/signUp'}>
  {
  async () => {
    const { code = '', error = 'error' } = useUrlParams({ code: '', error: '' });

    if (error !== 'error' && code !== '') {
      const [res, error] = await of(signUpKakao({ code }));

      if (error) {
        window.location.replace('/');
      } else {
        const queryString = sessionStorage.getItem(LOGIN_UTM) ?? '';

        window.location.replace(`/deeplink?next=${res?.data.next}`);
      }
    } else {
      window.location.replace('/');
    }
  }
}
</Route>
```

위의 코드는 에러가 발생하면 기존 로그인 페이지로 이동시키며, 성공 시 회원가입을 시키고 response 값의 next로 이동시키고 있다.

## 카카오 디벨로퍼 설정하기

이제 카카로 로그인을 하기 위해서 [카카오 디벨로퍼](https://developers.kakao.com/) 사이트에서 설정해야 한다.

### **1. 애플리케이션 추가하기**

[Kakao developers](https://developers.kakao.com/console/app) 사이트에 접속해서 애플리케이션을 추가해준다.

![react custom hooks / kakao developer1 - snyung.com](https://user-images.githubusercontent.com/24274424/114300952-8133ef80-9afd-11eb-99a0-51e8a8e6820d.png)

<br/>

### **2. Javascript 앱키 저장하기**

`KAKAO_TOKEN` 이라고 말했던 상수에 넣을 Javascript 키 값을 저장한다.

### **3. 플랫폼 등록**

`앱 설정 > 플랫폼` 에서 Web 플랫폼 등록을 해준다.

![react custom hooks / kakao developer2 - snyung.com](https://user-images.githubusercontent.com/24274424/114301044-e12a9600-9afd-11eb-808c-5e1efb7e6cf9.png)

현재 테스트 주소와 운영중인 사이트의 주소를 넣어준다.

<br/>

### **4. 카카오 로그인 활성화**

아래의 사진과 같이 카카오 로그인을 활성화해준다.

![react custom hooks / kakao developer3 - snyung.com](https://user-images.githubusercontent.com/24274424/114301081-0f0fda80-9afe-11eb-8adf-bef261f24311.png)

<br/>

### **5. Redirect URI 등록**

`제품 설정 > 카카오 로그인 > Redirect URI`에서 등록해준다.

![react custom hooks / kakao developer4 - snyung.com](https://user-images.githubusercontent.com/24274424/114301118-42eb0000-9afe-11eb-9d22-d778c35aee64.png)

위와 같이 Redirect URI를 설정해주는 이유는 카카오 로그인 이후에 성공할 경우 자동으로 보내주는 주소를 말한다. 해당 주소의 query string으로 아래 사진과 같은 값이 넘어오게 된다.

![react custom hooks / kakao developer5 - snyung.com](https://user-images.githubusercontent.com/24274424/114301157-7594f880-9afe-11eb-8893-6076c2008dcf.png)

## UTM 태그 가져오기

B2C를 하게 되면 사용자가 어떤 경로로 들어왔는지 추적해야 한다. 그래야 특정 광고를 공략할 수 있고 어떤 경로가 효율적인지 트랙킹이 가능해진다.

그런데 정보는 로그인이 이루어지고 나서 담아야 한다. 어떤 사용자가 어떤 경로로 왔는지 알아내는 것이 중요하다.

그렇다면 카카오 로그인이 되고 나서 회원가입이 이루어지고 담아야 하는데 카카오 로그인 Redirect URI에는 query string을 담을 수 없는 것이 걸림돌이 되었다. 그렇다면 다른 페이지로 이동시키는 건 카카오인데 내가 어떻게 할 수 있을까? 였고,

이를 해결하기 위해서 **Session Storage**를 사용했다. 카카오 로그인을 요청하는 시점부터 Redirect가 이루어지고 난 후까지 utm tags를 Session Storage에 저장하고, 회원가입 이후 utm tags를 꺼내와서 DB에 저장하도록 하였다.

이를 사용한 부분이 아래의 코드이다.

```ts
// useKakaoLogin.ts
const path = location.href.split('?');

if (path[1]) {
  sessionStorage.setItem(LOGIN_UTM, path[1]);
}

// Route
const queryString = sessionStorage.getItem(LOGIN_UTM) ?? '';
```

## 마무리

React 개발을 하다 보면 많은 Hooks를 사용하지만, 서비스 개발을 하면서 마주하는 많은 기능을 Hooks로 빼서 관리하는 것은 정말 좋았다.

오늘은 그중 카카오 로그인 hooks를 보았다.

Custom Hooks를 어렵다고 생각하시는 분들이 많을 것으로 생각된다. 그리고 지금 구현된 코드가 완벽하다고 할 수 없다. 그래도 나만의 좋았던 점과 방법으로 공유한 것에 즐거움을 느끼고 있다.

#### Reference

- [Github - SeonHyung.Jo](https://github.com/SeonHyungJo)

