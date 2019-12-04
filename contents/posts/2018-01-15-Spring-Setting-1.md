---
path: "/content/setting-1"
author: "snyung"
date: "2018-01-15"
title: "스프링 혼자서 셋팅 해보기 1탄"
tags: ["spring", "setting"]
category: "post"
---

일단 기본적인 환경설정은 건너뛰고 시작을 하려고 한다. 즉, 스프링 프로젝트를 만들고 시작이다. 기본적인 Eclipse IDE, Java, Tomcat7, Maven을 사용하여 진행을 한다.
<br/>

## 프로젝트 생성(기본 파일 살펴보기)

이클립스에서 오른쪽 마우스를 누르고 new -> others에 들어가서 spring을 검색을 하게되면 나오는 Spring Project를 만들었다.
<br/>

처음 만들어진 프로젝트는 생각보다 뭔가가 많이 들어있었다. 내가 생각하는 스프링 프로젝트는 아무 설정도 안되어있는 것이라 생각을 했지만, 여러가지 설정이 되어있었다.
<br/>

### pom.xml

기본적으로 maven을 사용하게 되면 보게 되면 파일이다. 우리가 필요로하는 **라이브러리** 들이 적혀있다. 이렇게 적으면서 라이브러리를 관리하는 것이다.
<br/>

### web.xml

web.xml을 위에서 서블릿 배포 기술자라고 했다(블로거 분이). 영어로는 DD (Deploment Descriptor)라고 한다. web.xml은 WAS(Web Application Server)가 최초 구동될 때, WEB-INF 디렉토리에 존재하는 web.xml을 읽고, 그에 해당하는 웹 애플리케이션 설정을 구성한다. 다시 말해, **각종 설정을 위한 설정파일** 이라고 이야기 할 수 있다.
<br/>

나도 WAS에 대한 정확한 지식이 없기에 찾아보았다. 쉽게 웹서버와 WAS를 비교 해놓은 곳이 많았다.
<br/>

흔히 알고 있는 웹서버는 HTML문서와 같은 **정적 컨텐츠를 처리하는 것** 이고, WAS 서버는 **asp, php, jsp와 같은 개발언어를 읽고 처리하여 동적 컨텐츠, 웹 응용 프로그램 서비스를 처리하는 것** 이다. (tomcat은 WAS이다.)
<br/>

> Web 서버
> 소프트웨어와 하드웨어로 구분되며, 하드웨어는 말 그대로 Web 서버가 설치되어 있는 컴퓨터를 말한다.
> 그리고 소프트웨어 Web 서버란 브라우저 클라이언트로 부터 HTTP 요청을 받아들이고 HTML 등의 웹 페이지 문서에 반응하는 컴퓨터 프로그램이다.
> HTTP 프로토콜을 기반으로 하여 브라우저의 요청을 서비스 하는 기능을 담당한다.

<br/>

> WAS 서버(Web Application Server, 컨테이너)
> HTTP를 통해 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어(소프트웨어 엔진)이다. 동적 서버 콘텐츠를 수행한다는 것으로 일반 WEB 서버와 구별되며, 주로 데이터베이스 서버와 같이 수행된다. 한국에서는 WAS 서버로 통칭하지만 영어권에서는 Application Server로 불린다. WEB 서버의 기능들을 구조적으로 분리하여 처리하고자하는 목적으로 제시된것, 크게 WEB 서버의 기능과 컨테이너의 기능으로 구성한다.

<br/>

### servlet-context.xml

#### 기본 소스

```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans:beans xmlns="http://www.springframework.org/schema/mvc"
  	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  	xmlns:beans="http://www.springframework.org/schema/beans"
  	xmlns:context="http://www.springframework.org/schema/context"
  	xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
  		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
  		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

  	<!-- DispatcherServlet Context: defines this servlet's request-processing infrastructure -->

  	<!-- Enables the Spring MVC @Controller programming model -->
  	<annotation-driven />

  	<!-- Handles HTTP GET requests for /resources/** by efficiently serving up static resources in the ${webappRoot}/resources directory -->
  	<resources mapping="/resources/**" location="/resources/" />

  	<!-- Resolves views selected for rendering by @Controllers to .jsp resources in the /WEB-INF/views directory -->
  	<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
  		<beans:property name="prefix" value="/WEB-INF/jsp/" />
  		<beans:property name="suffix" value=".jsp" />
  	</beans:bean>

  	<context:component-scan base-package="sseon.sample.app" />

  </beans:beans>
```

<br/>

```xml
  <beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <beans:property name="prefix" value="/WEB-INF/jsp/" />
    <beans:property name="suffix" value=".jsp" />
  </beans:bean>
```

- 서블릿 설정이 **자동으로 prefix와 suffix를 붙여준다.** 즉, 우리가 하나하나 전체경로와 .jsp를 붙이지 않아도 되도록 도와준다.

```xml
  <context:component-scan base-package="sseon.sample.app" />
```

<br/>

- 이 부분은 스프링에서 사용하는 bean을 일일이 xml에 선언하지 않고도 필요한 것을 **어노테이션(Annotation)을 자동으로 인식하게 하는 역할** 을 한다.

<br/>

### 그외 컨트롤러, Resource폴더

여기는 아는 부분이라 넘어갑니다.
간단하게 하자면 컨트롤러에는 앞으로 만들 java 파일은 전부 이 디렉토리에 구성된다. Resource폴더에는 추후 스프링 설정 파일이나 쿼리가 저장될 디렉토리이다.
<br/>

## 파일 구조 수정하기

내가 들어가서 보고 있는 블로그에서는 파일구조가 전장정부프레임워크에서 지원하는 기본적인 Web 프로젝트와 비슷하게 가고있다. 이것이 바로 내가 원하던 자료이다.
<br/>

### 1. index.jsp 추가

- webapp폴더 안에 index.jsp파일 추가
- web.xml에 처음 동작을 하면 index.jsp파일을 바라보게 설정하기

```xml
<welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

<br/>

### 2. 서블릿 설정 변경하기

서블릿(Servlet)이란 간단히 말해서 자바에서 **동적 웹 프로젝트를 개발할 때, 사용자의 요청과 응답을 처리해 주는 역할** 을 한다. 서블릿에 대한 설명은 많은곳에서 찾을 수 있다.
<br/>

보통은 servlet 설정이 .do로 되어있는데, 현재 기본 프로젝트에서는 .do로 되어있지 않다. 따라서, 서블릿 설정을 간단히 바꿔주려고 한다.

<br/>

```xml
  <servlet-mapping>
    <servlet-name>action</servlet-name>
    <url-pattern>*.do</url-pattern>
  </servlet-mapping>
```

- `<url-pattern>*.do</url-pattern>` 부분
- 이는 앞으로 서블릿에 어떠한 요청을 할 때, .do를 통해서만 요청을 전달하고, 다른 방식의 요청, 예를 들어 .html의 직접적인 호출등은 이제 허락되지 않는다.

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

- `contextConfigLocation`의 설정
- 기존에는 dispatcher 의 설정인 contextConfigLocation이 /WEB-INF/spring/appServlet/servlet-context.xml에 존재하였는데, 이를 /WEB-INF/config/action-servlet.xml로 변경하고, 인터셉터(Intercepter)도 추가하려는 목적이다.

```xml
  <!-- The definition of the Root Spring Container shared by all Servlets and Filters -->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <!-- root-context 제거 -->
    <param-value></param-value>
  </context-param>
```

- `<context-param>` 수정
- `<context-param>`에서 설정되어있던 root-context.xml은 **모든 서블릿과 필터에서 사용되는 루트 스프링 컨테이너에 대한 설정** 이다(The definition of the Root Spring Container shared by all Servlets and Filters).
- 이 root-context.xml은 추후 다른곳에서 설정될 예정이므로 `<param-value></param-value>`안에 있던 /WEB-INF/spring/root-context.xml 부분은 다음과 같이 지운다.

<br/>

## 2편에서 계속

---

#### Reference

- [흔한 개발자의  개발 노트](http://addio3305.tistory.com/37?category=772645)
