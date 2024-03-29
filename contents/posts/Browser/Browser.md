---
path: "/content/웹 브라우저 작동 원리"
author: "snyung"
date: "2018-09-25"
title: "[Browser] 웹 브라우저 작동 원리"
tags: ["Frontend"]
category: "post"
---

## Rendering Engine

> Webkit Engine : Chrome, Safari

![Webkit](../../assets/Webkit.png?raw=true)


> Gecko Engine : Firefox

![Gecko](../../assets/Gecko.jpg?raw=true)

## Critical Rendering Path

웹 브라우저가 화면을 그리는데(Rendering) 지나야하는 주요한 과정이다.

1. HTML 데이터를 파싱하고 **DOM Tree**를 빌드.
2. 파싱 중 CSS 링크를 만나면, **CSSOM**(CSS Object Model) Tree  빌드.
3. DOM Tree 와 CSSOM Tree를 이용해 **Render Tree**생성.
4. Render Tree의 노드들의 위치를 계산(**Layout**)
5. 화면에 웹 페이지를 그린다(**Paint**).

### 1. HTML 데이터 파싱 / DOM Tree 빌드

브라우저는 HTML 데이터를 파싱해 DOM Tree를 만든다.

모든 HTML 태그에는 노드가 있고 각각의 노드는 Tree 형태로 구현된다.

이를 DOM Tree라 한다.

```html
<html>
    <head>
        <title>snyung</title>
    </head>
    <body>
        <div>
            <button> Up </button>
            <button> Down </button>
        </div>
    </body>
</html>
```

### 2. CSSOM Tree 빌드

HTML 파싱 중 CSS 링크를 만나게 되면 Resource를 받아와 파일은 파싱되고 CSSOM Tree를 구성한다.

CSSOM이 구성되어야 다음 과정이 진행될 수 있다.

### 3. Render Tree 생성

DOM Tree와 CSSOM Tree를 결합하여, Render Tree를 구성한다.
Render Tree는 DOM Tree에 있는 것들 중에 실제 보이는 것들로만 구성된다. **눈에서 보이지 않는 것은 Dom Tree에 없다**.

> **ex) style='display : none;'은 Render Tree에서 제외된다는 것이다. 메타태그 역시 제외된다.**

Render Tree에는 Render Object Tree, Render Layer Tree, Render Style Tree, InlineBox Tree 등이 포함되는데.

Render Object 의 필요에 따라 **Render Layer**가 만들어지고 GPU 처리 여부에 따라 **Graphic Layer** 생성한다.

![Graphic Layer에 대해서 읽어보기](../../assets/graphicLayer.png?raw=true)

기본적으로 Layer는 하나이며 CPU가 렌더링에 주요한 역할을 한다.

아래와 같은 경우에 있어 GPU처리를 한다.

- CSS 3D Transform(translate3d, preserve-3d 등)이나 perspective 속성이 적용된 경우
- CSS 애니메이션함수나 필터 함수를 사용하는 경우
- video나 canvas 요소를 사용하는 경우
- 자식 요소가 레이어로 구성된 경우
- z-index가 낮은 형제 요소가 레이어로 구성된 경우
- will-change를 사용하는 경우

### 4. Layout

Render Tree가 만들어지고, 각각의 노드들의 위치를 계산하는 과정으로, 위치 관련된 속성 계산(position, width, height 등)을 한다.

**ex) width:100%인 상태에서 브라우저를 리사이즈하면, Render Tree는 변경되지 않고 Layout 이후 과정만 다시 거치게 된다.**

### 5. Paint

실제 웹페이지를 화면에 그린다.

**색이 바뀐다거나 노드의 스타일이 바뀌는 걸로는 Layout 과정을 거치지 않고 Paint만 일어난다.**

## CSS와 JavaScript의 작성 위치 (성능 최적화)

브라우저의 렌더링 과정에서 DOM Tree 를 빌드한 후, 스타일 규칙이 없으면 Rendering 이 불가.

인터프리터은 HTML 을 위에서 아래로 읽기 때문에 CSS를 `<head></head>`태그 사이에 두면 CSS 리소스를 최대한 빨리 받을 수 있다.

반면, JavaScript는 DOM객체를 컨트롤하기 때문에 CSS처럼 위에 두게 되면 파싱을 멈추고 스크립트 파일을 읽기 때문에 성능이 저하된다. 따라서, JavaScript 소스는 주로 `</body>`태그 위에 모아두는게 좋다.

단, 이런 경우 JS애니메이션이 나중에 적용되어 사용자 입장에서 깜빡임 현상이 생길 수 있기 때문에 애니메이션 부분만 `<head></head>`사이에 두는 것도 방법이다.

---

#### Reference

- [Naver D2 - 브라우저의 작동 원리](http://d2.naver.com/helloworld/59361)
- [브라우저가 웹페이지를 그리는 법](https://isme2n.github.io/devlog/2017/07/06/browser-rendering/)
- [웹브라우저에서 HTML문서 렌더링 과정](http://jeong-pro.tistory.com/90)
