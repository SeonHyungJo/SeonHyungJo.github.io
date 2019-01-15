---
path: "/post/spring/Wrapper"
author: "sseon"
date: "2018-05-28"
title: "Java int와 Integer의 차이"
tags: ["spring", "wrapper"]
category: "post"
---

# **int와 Integer의 차이**

## **int (Primitive 자료형-객체가 아니닷)**

- '자료형' 을 의미한다. (int, float, long, double 와 같은 하나의 primitive 자료형을 의미합니다.)
- '산술 연산'이 가능합니다.
- null 로 초기화 불가능합니다. (0으로 초기화 가능합니다.) 
이러한 점 때문에 자바는 C/C++과 조금의 차이를 보입니다.

<br>
<br>

## **Integer (Wrapper 클래스-객체닷)**

- Wrapper 클래스입니다.
- Unboxing 을 하지 않으면(int로 변경하는 것) 산술 연산이 불가능하지만, null값은 처리할 수 있습니다.(그런데 실행하면 산술이 된다!!! 이건 자바에서 Auto unBoxing을 해서 그런다)
- null값 처리가 용이해서 SQL 과 연동할 경우 처리가 용이.
- 직접적인 산술연산은 불가능합니다.
- int를 클래스로 감싼 형태이다.

<br>
<br>

## **Wrapper 클래스란?**

Java는 데이터를 클래스와 객체 외에 기초 타입을 가집니다.
<br>

그렇기 때문에 Java는 기본형 타입(위에서 말한 primitive 자료형)과 객체 참조(클래스) 같은 두 가지 타입의 관리 데이터를 가집니다.
<br>

경우에 따라서 기본형 타입을 객체로 사용하는 경우가 있으며, 이러한 경우 기본형 타입 값을 객체로 표현해야합니다.
<br>

이때 Wrapper 클래스를 사용하는데, 특정 기본형 타입으로 나타냅니다. 
<br>

예를 들어 Integer 클래스는 간단한 정수 값을 나타내며 객체는 하나의 int값을 저장할 수 있습니다.

<br>

| | |
|-|-|
|Boxing   |Primitive 자료형 -> Wrapper 클래스|
|Unboxing |Wrapper 클래스 -> Primitive 자료형|

<br>

![사진](https://github.com/SeonHyungJo/SeonHyungJo.github.io/blob/java/assets/img/int_Integer.png?raw=true)

<br>
<br>

## 예제 소스(이걸 보면 Integer는 참조형이라는걸 알수 있다.)

<br>

```java
Integer integerA = new Integer(1);
Integer integerB = new Integer(2);
Integer integerC= new Integer(1);

if (integerA == 1) {
    System.out.println("if (integerA == 1) 의 결과는? 여기는 true");
} else {
    System.out.println("if (integerA == 1) 의 결과는? 여기는 false");
}
if (integerA.equals(1)) {
    System.out.println("if (integerA.equals(1)) 의 결과는? 여기는 true");
} else {
    System.out.println("if (integerA.equals(1)) 의 결과는? 여기는 false");
}


//여기가 문제이다. 레퍼런스를 참조하고 있다.
if (integerA == integerC) {
    System.out.println("if (integerA == integerC) 의 결과는? 여기는 true");
} else {
    System.out.println("if (integerA == integerC) 의 결과는? 여기는 false");
}
```