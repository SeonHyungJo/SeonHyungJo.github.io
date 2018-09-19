---
layout: post
title:  "타입스크립트 심볼타입(SymbolType)"
date:   2018-01-02
excerpt: "앵귤러 첫걸음_조우진"
tag:
- angular
comments: true
---

# **Symbol Type**

타입스크립트의 타입중에서 ES6에 새로 추가된 타입으로 누구든 궁금해하고 저도 궁금해서 정리해서 익힐려고 합니다.
<br>

심볼 타입 시작...

## Symbol Type이란

심볼(symbol)은 **고유하고 수정 불가능한 데이터 타입** 이며 주로 객체 속성(object property)들의 식별자로 사용된다. 
<br>
심볼 객체(symbol object) 는 심볼 기본형 변수(primitive data type) 의 암묵적(implicit) **객체 래퍼(wrapper)** 이다.
<br>

> 래퍼객체에 대해서는 추후 추가 예정

<br>
<br>

### 1. 문법

```

  Symbol([description])

```

<br>
<br>

### 2. 선언

- 기본형 변수에 대해 명시적 래퍼 객체를 만드는 것은 ES6부터 더 이상 지원되지 않는다.

```

  //이게 안됨
  var a = new Symbol(); // TypeError

```
<br>

- 그러나 기존의 이미 존재하고 있는 기본형 래퍼객체는 **레거시요인으로** 인해 아직 생성가능하다.

```

  //기존에 있던 래퍼객체()
  var num = new Number();
  var str = new String();
  var bool = new Boolean();

```

<br>
<br>

### Symbol끼리 비교를 하면

```

  let a = Symbol("test");
  let b = Symbol("test");

  a === b

  //실행결과
  false

```

## 그렇다면 어디에 사용할까

### 추후에 추가하자 프로젝트하면서
