---
layout: post
title:  "스프링 혼자서 셋팅 해보기 2탄"
date:   2018-01-15
excerpt: "이제는 전자정부프레임워크에서 기본으로 제공하는 세팅을 보고 내가 커스터마이즈를 해보고 싶다."
tag:
- spring
- maven
- web
- setting
comments: true

---

# **Spring_Project_Setting_2**

기본적인 파일구조 중에서 서블릿 설정과 web.xml 설정을 간단하게 맛만 보았다. 이제는 MVC패턴이라고 하는 것을 간단히 볼려고 한다.

<br>
<br>

## MVC패턴이란?

![mvc패턴 그림](https://raw.githubusercontent.com/SeonHyungJo/SeonHyungJo.github.io/2ef6a726552cbc76d913466def8fe6bdbcbc07f9/assets/img/spring/MVCPattern.JPG)

<br>

- MVC란 Model-View-Controller의 약자로, **사용자 인터페이스와 비지니스 로직을 분리하여 웹 개발을 하는 것** 을 가장 큰 장점으로 한다.
- MVC 패턴도 MVC 모델 1과 MVC 모델 2로 나뉘어져 있는데, 요즘에는 MVC라고 하면 당연히 MVC 모델 2를 의미한다. 따라서 여기서는 **MVC 모델 2 (이하 MVC)를 기준** 으로 진행한다.

<br>

1. Model : 모델은 애플리케이션의 정보, 즉 **데이터를 나타낸다.**
2. View : 뷰는 **사용자에게 보여주는 인터페이스,** 즉 화면을 이야기한다. 자바 웹 애플리케이션에서는 JSP를 의미한다.
3. Controller : 컨트롤러는 **비지니스 로직과 모델의 상호동작의 조정 역할** 을 한다. MVC2에서는 서블릿이 흐름을 제어하는 컨트롤러 역할을 수행한다.

<br>
<br>

## pom.xml

우리가 이전편에서도 나왔던 pom.xml이다. 이곳은 프로젝트에서 필요한 모든 라이브러리들을 관리할 수 있독록 구성되어 있는 곳이다.

<br>

1. `<properties></properties>` 태그는 변수의 개념으로 생각하면 된다. 우리가 프로그래밍을 하면서 어떠한 값은 상수 (java에서 final static 으로 선언)로 선언하는 경우가 많은데, 이는 **그 변수는 여기저기서 많이 사용되는 변수이기 때문이다.** 이러한 변수를 직접 소스 여기저기에 일반적인 값으로 써놓으면, 그 값을 변경해야 할 경우, 모든 소스에서 일일이 변경해야하는 경우가 발생한다. 이럴때, 상수로 선언해놓고, 그 하나만 변경하면 쉽게 값을 변경하면서도 다른 소스는 수정할 필요가 없다.

```xml
  <properties>
    <java-version>1.6</java-version>
    <org.springframework-version>3.1.1.RELEASE</org.springframework-version>
    <org.aspectj-version>1.6.10</org.aspectj-version>
    <org.slf4j-version>1.6.6</org.slf4j-version>
  </properties>
```

<br>

- 잠시 살펴보면 `<org.springframework-version>3.1.1.RELEASE</org.springframework-version>`라는것을 볼 수 있는데, 이 글을 시작할때 Spring 3.1.1 버전을 사용하기 때문에, 이 값을 이렇게 선언하였다. 만약 스프링 버전을 변경하고 싶으면 이 변수만 바꿔주면 된다.
<br>

2. `<repositories></repositories>` 태그다. 이는 **실제 라이브러리를 다운받을 저장소** 를 의미한다. 보통은 따로 설정할 필요가 없다. 하지만 프로젝트를 진행하다보면 인터넷에 연결할 수 없는 프로젝트도 상당히 많은데, 이럴때 내부 저장소를 만들어놓고, 개발자들은 내부저장소에서 라이브러리를 다운받도록 되어있다.
<br>

3. 그 다음으로 `<dependencies><dependencies>` 태그는 **실제 라이브러리를 지정** 한다.

```xml
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>${org.springframework-version}</version>
  </dependency>
```

<br>
<br>

## 설정파일 변경 (web.xml, action-servlet.xml 등등)

### 1. web.xml 설정(UTF-8설정)

```xml
  <filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>
            org.springframework.web.filter.CharacterEncodingFilter
    </filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
  </filter>

  <filter-mapping>
      <filter-name>encodingFilter</filter-name>
    <url-pattern>*.do</url-pattern>
  </filter-mapping>
```

<br>
<br>

### 2. web.xml 설정(servlet 경로 설정)

```xml
  <servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>
        org.springframework.web.servlet.DispatcherServlet
    </servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>
            /WEB-INF/config/*-servlet.xml
        </param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
```

<br>
<br>

### 3. web.xml 설정(스프링 설정 파일 경로 설정)

```xml
  <!-- 스프링 설정 파일 추가 -->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <!-- root-context 제거 -->
    <param-value>classpath*:config/spring/context-*.xml</param-value>
  </context-param>
```

# 참고

- [흔한 개발자의  개발 노트](http://addio3305.tistory.com/41?category=772645)
