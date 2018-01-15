---
layout: post
title:  "ES6 - Template Literals"
date:   2018-01-05
excerpt: ""
tag:
- es6
- ECMAScipt6
- Template
- Literals
comments: true
---

Template Literals
===

ES6는 **템플릿 리터럴(template Literals)이라고 불리는 새로운 문자열 표기법** 을 도입하였다. 템플릿 리터럴은 일반 문자열과 비슷해 보이지만, ‘ 또는 “ 같은 통상적인 따옴표 문자 대신 백틱(backtick) 문자 <code>\`</code>를 사용한다.

```
  const first = 'test1';
  const last = 'test';
  console.log(`myname is ${first}, ${last}.`);
  // result : myname is test1, test.
```

---

  - 일반적인 문자열에서 줄바꿈은 허용되지 않으며 공백(white-space)를 표현하기 위해서는 백슬래시(\)로 시작하는 이스케이프 시퀀스(Escape Sequence)를 사용하여야 한다. ES6 템플릿 리터럴은 일반적인 문자열과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 white-space는 있는 그대로 적용된다.

```
  const template = `<ul class="nav-items">
    <li><a href="#home">Home</a></li>
    <li><a href="#news">News</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#about">About</a></li>
  </ul>`;

  console.log(template);
```

---

 - `${expression}`을 템플릿 대입문(template substitution)이라 한다. 템플릿 대입문에는 문자열뿐만 아니라 JavaScript 표현식을 사용할 수 있다.

```
  // 템플릿 대입문에는 문자열뿐만 아니라 표현식도 사용할 수 있다.
  console.log(`1 + 1 = ${1 + 1}`); // 1 + 1 = 2

  const name = 'ungmo';

  console.log(`Hello ${name.toUpperCase()}`); // Hello UNGMO
```
