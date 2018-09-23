---
layout: post
title:  "CSS - Transition"
date:   2018-08-10
excerpt: ""
tag:
- jquery
- css
comments: false
---

# CSS_Transition :tada:

우리가 흔히 생각하는 애니메이션:question: 이라고 생각하는 것들이 생각해보면 간단하다.
<br>

왼쪽에서 오른쪽으로 넓어진다든지, `Header`에 메뉴에 `:hover`를 했더니 아래로 내려온다는 정도의 Smooth한 변화가 이루어진다.
<br>

그러한 것들이 Javascript단이 아닌 CSS단에서 간단하게 이루어질 수 있다.
<br>

Transition의 하위 속성으로는 4가지가 있다. 간단하게 **변화가 이루어지는 속성, 지속시간, 변화 방법, 지연시간** 이 있다.

<br>
<br>

## :scissors: Transition-property

Transition을 적용해야 하는 CSS Property의 name 혹은 names를 명시합니다.
<br>

여기에 나열한 속성만 트랜지션하는 동안 움직입니다. 또한, 다른 모든 속성에 대한 **변화는 기본값으로 즉시 일어납니다.**
<br>

```

    transition-property: width; //단일 변화
    transition-property: height width; // 다중변화
    transition-property: font-size;
    transition-property: background-color;

```

<br>
<br>

## :scissors: Transition-duration

Transition이 일어나는 **지속 시간**을 명시합니다.
<br>

Transition동안 모든 속성에 적용하는 단일 지속 시간을 명시하거나, 다른 주기로 각 속성이 트랜지션하게 하는 여러 지속 시간을 명시할 수 있습니다.

```

transition-duration: 0.5s;
transition-duration: 1s;
transition-duration: 2s;
transition-duration: 4s;

```

초가 작을 수록 빠르게 진행이 이루어진다.

<br>
<br>

## :scissors: Transition-timing-function

Timing functions은 **트랜지션의 중간값을 계산하는 방법**을 결정합니다.
<br>

대부분의 타이밍 함수는 큐빅 베이지어(cubic bezier)를 정의하는 네개의 값에 의해 정의되므로 상응하는 함수의 그래프로 제공해서 명시할 수 있습니다.
<br>

Easing Functions Cheat Sheet에서 이징(easing, 역자주: 시간에 따른 파라미터 값의 변화율을 명시하는 함수)을 선택할 수도 있습니다.
<br>

```

    /* 기본 속성들 */
    transition-timing-function: ease;
    transition-timing-function: ease-in;
    transition-timing-function: ease-out;
    transition-timing-function: ease-in-out;
    transition-timing-function: linear;
    transition-timing-function: step-start;
    transition-timing-function: step-end;

    /* 함수 값들 */
    transition-timing-function: steps(4, end); // end에 맞추어 4단계로 뚝뚝나누어 진행
    transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
    transition-timing-function: frames(10);

    /* Multiple timing functions */
    /* 이게 좀 신기하게 줄었다 늘었다를 적용할 수 있다. */
    transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

    /* Global values_개인적으로 잘 사용하지 않는다. */
    transition-timing-function: inherit;
    transition-timing-function: initial;
    transition-timing-function: unset;

```

<br>
<br>

## :scissors: Transition-delay

속성이 **변한 시점과 트랜지션이 실제로 시작하는 사이에 기다리는 시간** 을 정의합니다.
<br>

```

    transition-delay: 0.5s
    transition-delay: 1s
    transition-delay: 2s
    transition-delay: 4s

```

초가 길어질수록 반응하는데 기다리는 시간이 길어진다.

<br>
<br>

## :scissors: Transition shorthand

```

    transition-delay: 0s
    transition-duration: 0s
    transition-property: all
    transition-timing-function: ease

    /* property name | duration | timing function | delay */
    transition: margin-left 4s ease-in-out 1s;

```

위에 처럼 한줄로 표현이 가능하다.
<br>

순서는 지켜주셔야합니다. :bomb:

<br>
<br>

## 참고

- [MDN-Trasition](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)