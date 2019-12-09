---
comments: true
path: "/content/mobile"
author: "snyung"
date: "2018-01-02"
title: "[Spring] 모바일 체크"
tags: ["Spring"]
category: "post"
---

웹을 만들다보면 모바일기기를 구분해야 할 경우가 생긴다. 이것을 쉽게 도와주는 것이 바로 **Spring_Mobile** 이다.
<br/>

Spring.io의 스프링 프로젝트를 보면 스프링 모바일이라는 프로젝트가 있다. 스프링 모바일은 Spring MVC에서 **모바일 기기를 식별** 하기 위한 extension 이다.
<br/>

- Pom.xml 라이브러리 추가하기
- dispatcher-servlet.xml 빈추가하기
- web.xml 필터링 추가하기
- Controller 추가 하기

<br/>

## 1. Pom.xml 라이브러리 추가하기

- Device구분을 위한 라이브러리 추가

<br/>

```xml
  <!-- 스프링 모바일 추가 -->
  <dependency>
    <groupId>org.springframework.mobile</groupId>
    <artifactId>spring-mobile-device</artifactId>
    <version>1.1.3.RELEASE</version>
  </dependency>
```

<br/>

## 2. dispatcher-servlet.xml 빈추가하기

- 여기서도 인터셉터를 추가 해주네

<br/>

```xml
  <bean class="org.springframework.mobile.device.DeviceResolverHandlerInterceptor" />
```

<br/>

## 3. web.xml 필터링 추가하기

- Device 필터를 추가합니다.

<br/>

```xml
  <!-- device fitter -->
  <filter>
    <filter-name>deviceResolverRequestFilter</filter-name>
    <filter-class>org.springframework.mobile.device.DeviceResolverRequestFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>deviceResolverRequestFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

<br/>

## 4. Controller 추가 하기

```java
@RequestMapping(value = "main.do")
public String initMain(HttpServletRequest request) throws Exception {

  Device device = DeviceUtils.getCurrentDevice(request);

  if (device.isMobile()) {
  System.out.println("Hello mobile user!");
  } else if (device.isTablet()) {
  System.out.println("Hello tablet user!");
  } else {
  System.out.println("Hello desktop user!");
  }

  return "main/main.tiles";
}
```

<br/>

## 결과

신기하게도 크롬에서 개발자도구로 다르게 들어가게되면 다르게 표시가 된다. 이걸로 모바일로 들어올 경우 다른 페이지로 유도할 수 있을 것 같다.
<br/>

---

#### Reference

- [와이케이의 마구잡이](http://yookeun.github.io/java/2014/09/26/spring-device/)
