---
path: "/content/memo-1"
author: "snyung"
date: "2018-08-10"
title: "[JS] Callstack"
tags: ["JavaScript"]
category: "post"
---

# **자바스크립트 정리 1**

> 모든 내용은 [자바스크립트는 어떻게 작동하는가](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%97%94%EC%A7%84-%EB%9F%B0%ED%83%80%EC%9E%84-%EC%BD%9C%EC%8A%A4%ED%83%9D-%EA%B0%9C%EA%B4%80-ea47917c8442)에 기반하여 저만의 방식으로 정리하였습니다.

글이 많은 블로그여서 저는 재밌게 읽었지만 정리를 해보고 싶었습니다.
<br>
최근 자바스크립트의 인기를 하늘을 치솟고 있습니다. 언어랭킹을 볼 수있는 [Github](http://githut.info)에 따르면 Total 1위에 빛나고 있습니다. 또한 현재 앵귤러를 익히고 있는 저에게 있어서도 최고의 관심사 입니다.

<br>
<br>

## 자바스크립트는

### 단일쓰레드(single-threaded)

단일쓰레드(싱글쓰레드)는 **콜스택이 하나** 라는 것을 뜻합니다.
<br>

**이 싱글쓰레드에 대한 질문 많이함. 꼭 기억하기**

<br>

- 콜스택은 우리가 프로그램의 어디에 있는지를 기록하는 자료 구조입니다.
- 콜스택이 하나임으로 **한 번에 하나의 일만** 을 할 수 있다는 것을 말합니다.
- 콜스택의 각각은 **스택프레임(Stack Frame)** 이라고 부릅니다.

![싱글쓰레드](https://cdn-images-1.medium.com/max/800/1*1FL2WcODqRrK40rrzA5QQA.png)
#### 스택트레이스
스택 트레이스란 기본적으로 예외가 발생했을 때 콜스택의 상태

![스택트레이스](https://cdn-images-1.medium.com/max/800/1*56aKrxQhgm7hJtUw_EmVbA.png)

<br>
<br>

#### 스택날림(Blowing the stack)

콜스택의 최대 크기에 다다랐을 때 나타납니다.

![img](https://cdn-images-1.medium.com/max/800/1*AycFMDy9tlDmNoc5LXd9-g.png)

<br>

**데드락(deadlocks)이라는 것은 무엇일까??**
<br>

우리말로 하면 교착상채라고 하여 멀티쓰레드 기반환경에서 나타는 현상입니다.(이것도 물어보는데 많습니다....)
<br>

> 두 개 이상의 작업이 서로 상대방의 작업이 끝나기 만을 기다리고 있는 상태

<br>
<br>

## 자바스크립트 엔진은

현재 우리나라 브라우저 순위로 본다면 구글의 크롬이라고 생각됩니다. 이 크롬에는 **V8** 이라는 엔진이 적용되어있습니다. **V8** 이라는 것이 바로 자바스크립은 엔진의 하나입니다. 또한 V8은 NodeJS에서도 사용되고 있습니다.

- V8은 크게 **메모리 힙과 콜스텍** 으로 구성됩니다.
  1. 메모리 힙 : 메모리 할당이 이루어지는 곳
  2. 콜스택 : 코드가 실행되면서 스택프레임이 쌓이는 곳

![V8엔진](https://cdn-images-1.medium.com/max/800/1*X21ybPxqBtfRV5v9rD9J1A.png)

<br>
<br>

## 런타임

![img](https://cdn-images-1.medium.com/max/800/1*i9nTlOSPH3q-sCd5-WHg-g.png)
자바스크립트에 있어서 엔진도 중요하지만 엔진이외의 웹에서 제공하는 API(DOM, AJAX, `setTimeout`)들와 **이벤트 루프와 콜백큐** 가 있습니다.

<br>
<br>

## 콜스택내에 수행시간이 긴 함수가 있다면??

위에서 말했듯이 자바스크립트는 싱글쓰레드입니다. 그래서 한 번에 하나의 일 밖에 하지 못합니다. 그러한 상황에서 하나의 일이 길어진다면 어떨까요?

<br>
<br>

### 코드 블로킹(blocking)

이 현상이 바로 **블로킹** 입니다. 브라우저는 더이상 렌더링을 할 수도 없고 다른 코드를 수행할 수도 없는 상태가 되어버립니다. 또한 브라우저는 콜스택 내의 많은 작업을 수행하면서 긴 시간 동안 응답이 없으면 대부분의 브라우저에서 에러를 일으키고 사용자에게 해당 페이지를 닫을지 물어보기도 합니다.

<br>
<br>

### 비동기 콜백(asynchronous callbacks)과 동시성

이에 해결방안이 비동기 콜백입니다. 흔히 웹에서는 Ajax라고 해서 사용이 되고 있습니다.
<br>
자바스크립트는 콜백큐를 이용한다는 말이 맞다는 것을 알 수 있는 부분입니다. 자세한건 아래의 링크 영상에 있습니다.
<br>

**정말 좋은 영상입니다.**

<br>
<br>

## 참고

- [자바스크립트 작동 원리 영상](https://vimeo.com/96425312)
- [자바스크립트는 어떻게 작동하는가](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%97%94%EC%A7%84-%EB%9F%B0%ED%83%80%EC%9E%84-%EC%BD%9C%EC%8A%A4%ED%83%9D-%EA%B0%9C%EA%B4%80-ea47917c8442)
