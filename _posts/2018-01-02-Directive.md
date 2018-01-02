---
layout: post
title:  "앵귤러 지시자"
date:   2018-01-02
excerpt: "앵귤러를 익히기 - 지시자란?"
tag:
- angular
- install
- nodejs
- npm
- typescript
- google
- directive
comments: true
---
지시자
===
## **컴포넌트는 사실 지시자다**
`export interface Component extends Directive`
컴포넌트는 지시자를 상속받은 **인터페이스** 입니다.

 - 지시자 : DOM을 다루기 위한 모든 것
 - Component 인터페이스는 Directive 인터페이스를 상속받아 지시자의 기본 속성 + 템플릿, 스타일 정보 등 뷰를 그리는 데 필요한 메타데이터를 추가 하고 있다.

> Directive인터페이스 기본속성....
> selector, inputs, outputs, host, providers, exportAs, queries
> 나머지는 Component 인터페이스 속성(11개)

  - 좁은 의미로 지시자는 뷰를 가지지 않지만 DOM의 표현과 동작을 풍성하게 만드는 요소로 활용됩니다.
  - 지시자는 **구조지시자** 와  **속성지시자** 가 있습니다.

## 구조 지시자
DOM 요소를 추가하거나 삭제하는 등 DOM 트리를 동적으로 조작하여 화면의 구조를 변경할 때 사용하는 지시자입니다.
 - 현재 API List에는 크게 common, forms, router로 나뉘어있다.
 - 예시 : ngForOf, ngIf, ngSwitch...
 - [지시자 보러가기](https://angular.io/api?type=directive)

## 속성 지시자
지시자가 선언된 DOM의 모습이나 동작을 조작하는 데 사용하는 지시자입니다.
  - 현재 API List에는 크게 common, forms, router로 나뉘어있다.
  - 예시 : ngClass, ngStyle...
  - [지시자 보러가기](https://angular.io/api?type=directive)
