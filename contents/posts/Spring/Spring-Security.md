---
path: "/content/security"
author: "snyung"
date: "2018-01-02"
title: "[Spring] 시큐리티"
tags: ["Spring"]
category: "post"
---

이제는 그냥 기본이 되어버린 스프링시큐리티...
나만 모르면 안되니까 기록하면서 하자 까먹겠다...

- **모든 기준은 제 스프링 시큐리티 파일을 기본으로 합니다.**

<br/>

## 목록

1.  기본 시큐리티 설정
2.  DB연동해서 사용자 인증하기(회원가입 포함)
3.  비밀번호 암호화해서 사용하기
4.  자동 로그인 기능 **(추가)**
5.  Https 기능 **(추가)**

<br/>

## 활동순서

1. 기본 환경설정  (POM.XML /  WEB.XML / context-Security.XML )
2. 로그인페이지 로그아웃 구현
3. (예정)로그인 인증 시스템  (로그인페이지등 제작)

<br/>

## 1. 기본 환경설정

### POM.xml설정_의존성 등록

- 먼저 스프링시큐리티 적용을 해주기 위해서 라이브러리를 추가한다.
- 즉 Maven으로 의존성 관리를 하기 위해 라이브러리를 주입한다.
- 적어주면 자동으로 라이브러리를 설치하지만 안된다면, update Maven을 해주면 된다.

```xml
  <!-- Spring Security -->
  <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-core</artifactId>
      <version>4.2.1.RELEASE</version>
  </dependency>

  <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-web</artifactId>
      <version>4.2.1.RELEASE</version>
  </dependency>

  <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-config</artifactId>
      <version>4.2.1.RELEASE</version>
  </dependency>
  <!-- Spring Security -->
```

<br/>

### web.xml 설정_필터 등록

- 기존에 있는 contextConfigLocation에 시큐리티 관련 context를 추가 해주려고 한다.

```xml
<context-param>

<param-name>contextConfigLocation</param-name>

<param-value>
  classpath*:egovframework/spring/context-*.xml
  //새로 추가하는 부분      
  /WEB-INF/spring/root-context.xml
</param-value>
</context-param>
```

- 기존의 경로를 사용해서 파일을 추가해주는 방향으로 갔습니다.

```xml
<context-param>

<param-name>contextConfigLocation</param-name>

<param-value>
  //기존의 경로를 사용하는 방향으로
  classpath*:egovframework/spring/context-*.xml
</param-value>
</context-param>
```

<br/>

- classpath*: => 프로젝트를 클릭한 상태에서 **alt+enter** 를 누르고 검색창에서 **Deployment Assebly** 를 검색하면 설정된 경로가 보입니다.

<br/>

#### 필터추가

- 같은 파일에서 필터를 추가해준다.

<br/>

```xml
<!-- Spring Security -->
<filter>
    <filter-name>springSecurityFilterChain</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>

<filter-mapping>
    <filter-name>springSecurityFilterChain</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

<br/>

- 다음과 같이 추가를 해주면 애플리케이견의 모든 요청을 스프링 시큐리티가 감싸서 처리할 수 있게 된다.
- 이 필터와 관련된 설명이 잘되어있는 곳이 있어 링크로 설정해 두겠습니다.
- [스프링시큐리티_2필터](http://www.nextree.co.kr/p1886/)

<br/>

### context-security.XML 파일 추가

- 기존의 위에서 경로를 context-\*.xml으로 설정하여서 이름을 context-security로 설정하여 자동으로 들어가도록 설정하였다.
- 실질적으로 시큐리티에 관련 설정을 하는 공간이다.
- 시큐리티는 기본설정은 모든 경로를 막고 자신이 열고 싶은 부분만 여는 구조이다.

<br/>

```xml
 <?xml version="1.0" encoding="UTF-8"?>
<beans:beans xmlns="http://www.springframework.org/schema/security"
    xmlns:beans="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation=
	"http://www.springframework.org/schema/security
	http://www.springframework.org/schema/security/spring-security.xsd
	http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">


  <http auto-config="true" use-expressions="true">

    <!-- 모든 사용자가 접근할 수 있는 경로 설정 -->
    <intercept-url pattern="/main.do" access="permitAll" />
    <intercept-url pattern="/login.do" access="permitAll" />
    <!-- js,css,font,img 역시 막힘으로 열어준다.-->
    <intercept-url pattern="/css/**" access="permitAll" />
    <intercept-url pattern="/js/**" access="permitAll" />
    <intercept-url pattern="/fonts/**" access="permitAll" />
    <intercept-url pattern="/img/**" access="permitAll" />

  <!-- 권한부여가 이루어지면 ROLE_USER라는 권한을 가진사람은 모든 곳에 접속할 수 있다. -->
  <intercept-url pattern="/**" access="hasRole('ROLE_USER')" />

  <form-login
                <!-- 커스터마이즈된 login페이지경로 설정 -->
    login-page="/login.do"
                <!-- 로그인이 성공하면 이동하는 페이지 경로 -->
    default-target-url="/main.do"
                <!-- username 커스터마이즈 -->
    username-parameter="username"
                <!-- password 커스터마이즈 -->
    password-parameter="password"
                <!-- 인증에 실패할 경우 경로 -->
    authentication-failure-url="/login.do?fail=true"
  />
      <!-- 커스터마이즈된 로그인페이지가 없을 경우 spring기본페이지 셋팅 -->
      <!--<form-login/> -->

      <!-- 간단하게 csrf보안설정 -->
      <csrf/>

      <logout invalidate-session="true" logout-url="/logout" logout-success-url="/login.do" />
  </http>

  <!--  provider  -->
  <authentication-manager>
        <!-- 디비와 비교할경우 사용 -->
    <authentication-provider user-service-ref="memberService"/>

      <!-- 임의로 데이터 -->
      <authentication-provider>
          <user-service>
              <user name="admin" password="admin" authorities="ROLE_USER" />
          </user-service>
      </authentication-provider>
      <!-- 임의로 데이터 -->

    </authentication-manager>

    <!-- bean설정 -->
    <beans:bean id="memberService" class="egovframework.example.member.MemberService">
    </beans:bean>
</beans:beans>
```

<br/>

- 현재는 임의의 사용자 아이디와 패스워드로 접속을 할 수 있도록 해놓은 상태이다 추후에 디비를 사용해서 사용자 인증하는 파일을 만들예정이다.
- 또한 패스워드가 현재 암호화가 되어 있지 않은 상태이다. 이 부분도 수정 예정
- **csrf보안** 에 대한 간략한 설정
- [위키백과 : csrf_사이트 간 요청 위조](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%9A%94%EC%B2%AD_%EC%9C%84%EC%A1%B0)

<br/>

### 로그인, 로그아웃 구현

#### 1. 로그인 페이지

- 아이디, 패스워드 입력란

```jsp
//form 설정
<form id="loginFrm" name="frm" class="test" action="/sample/login" method="post">

//아이디 입력란
<input type="text" id="inputId" placeholder="ID" name="username">

//패스워드 입력란
<input type="password" id="inputPassword" placeholder="Password" name="password">

//로그인 버튼
<button type="submit" onclick="doLogin()">로그인</button>

//보안토큰
<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

//아이디 패스워트 유효성 검사
<script type="text/javascript">

  function doLogin() {

    if(frm.inputId.value == "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if(frm.inputPassword.value == "") {
      alert("패스워드를 입력해주세요.");
      return;
    }

    frm.submit();
  }
</script>
```

<br/>

#### 2. 로그아웃 버튼

- 로그아웃 역시 토큰을 같이 던져주어야 한다.

```jsp
  //로그아웃시 토큰
  <form action="./logout" method="post" id="logoutForm">
    <input type="hidden"
    name="${_csrf.parameterName}"
    value="${_csrf.token}" />
  </form>

  //로그아웃 버튼
  <li onclick="formSubmit()">
  <a href="#"><i class="fa fa-power-off"></i>Logout</a></li>

  //버튼 구현
  <script>
  function formSubmit() {
    document.getElementById("logoutForm").submit();
  }
</script>
```

<br/>

## DB연동으로 사용자 인증(했다....) 17-12-15

왜 이렇게 디비를 연동을 했다는 사람들의 내용을 보면서 하는데 안되고 이해가 안된다. 그래서 내가 직접 밥로 뛰면서 6시간 투자해서 디비연동하고 암호화까지 겨우겨우 완료했다. 잊어버리지 말자.
<br/>

### mysql에 연동하기 순서

- pom.xml 설정하기(의존성 주입)
- context-datasource.xml 설정하기(DB테이블 연결)
- DB 테이블 만들기(기본 테이블 모양과 데이터 넣기)
- context-security.xml 설정하기(시큐리티 로그인 진행시 DB에서 가져와서 권한 부여)

<br/>

#### 1. pom.xml\_mysql 추가하기

- 이것도 내 위주 입니다.
- 남을 보여주려는게 아니라 제 공부입니다.

- mysql 의존성 주입 시작

```xml
<dependency>
  <groupId>com.googlecode.log4jdbc</groupId>
  <artifactId>log4jdbc</artifactId>
  <version>1.2</version>
  <exclusions>
      <exclusion>
          <artifactId>slf4j-api</artifactId>
          <groupId>org.slf4j</groupId>
      </exclusion>
  </exclusions>
</dependency>

<dependency>
  <groupId>commons-dbcp</groupId>
  <artifactId>commons-dbcp</artifactId>
  <version>1.4</version>
</dependency>

<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>5.1.31</version>
</dependency>
```

- 제 기준으로 3개 추가 완료

<br/>

#### 2. context-datasource.xml 설정하기

- 저는 로컬에 workbench가 깔려있다는 조건으로 실행하고 있습니다.

```
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
  <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
  <property name="url" value="jdbc:mysql://127.0.0.1:3306/{스키마 이름}" />
  <property name="username" value="{유저이름}}"/>
  <property name="password" value="{비밀번호}}"/>
</bean>

```

<br/>

#### 3. DB 테이블 만들기

- 테이블은 SQL문으로 만들었습니다.
- SQL문은 []()를 참고해서 가져와서 사용하였습니다.

```sql
CREATE TABLE `user` (
  `EMAIL` varchar(255) NOT NULL,
  `PASSWD` varchar(255) NOT NULL,
  `ENABLED` int(1) NOT NULL DEFAULT '1',
  `AUTHORITY` varchar(20) NOT NULL DEFAULT 'ROLE_USER',
  PRIMARY KEY (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES ('guest','guest',1,'ROLE_USER'),('niee','zzzz',1,'ROLE_ADMIN'),('test','test',1,'ROLE_USER');
```

- INSERT INTO `user` VALUES 이 부분은 회원들을 더 추가해서 시험해도 됩니다.
- 어짜피 아래에서 회원가입도 구현예정입니다.

<br/>

#### 4. context-security.xml 설정하

- provider교체

<br/>

```xml
  <authentication-manager>
    <authentication-provider user-service-ref="userService">
    </authentication-provider>
  </authentication-manager>
```

<br/>

- 마지막으로 이걸 추가 시켜주시면 됩니다.

<br/>

```xml
  <jdbc-user-service data-source-ref="dataSource" id="userService"
  <!-- 아래는 아이디와 비밀번호를 가져와서 확인하는 부분 -->
  users-by-username-query="SELECT EMAIL as username, PASSWD as password,ENABLED as enabled​ FROM user WHERE EMAIL=?"
  <!-- 보기 좋게 띄웠습니다.(아래는 권한을 설정하는 부분) -->
  authorities-by-username-query="SELECT EMAIL as username, AUTHORITY AS authority
  FROM user u
  WHERE EMAIL=?"/>
```

<br/>

- 여기서 중요한 부분은 EMAIL as username, PASSWD as password 이 부분을 아래의 이름과 같도록 해야 된다.

<br/>

```java
  username-parameter="username"
  password-parameter="password"
```

<br/>

- 이렇게 진행을 하면 신기하게 디비에 있는 사용자를 확인해서 권한까지 주게 됩니다.
- 추가적으로 성공적으로 로그인이 될 경우 초기 페이지 이동으로 이동까지 합니다.

<br/>

## 암호화하기(완료 17_12_15)\_반복해야함

- 회원가입 jsp만들기
- controller 생성
- 암호화 파일 생성(ShaPasswordEncoder)
- DAO파일 생성
- mybatis 연결
- SQL_xml파일 생성

<br/>

## Spring_Security 암호화 모듈

### 스프링에서 제공하는 기본 암호화 모듈(8가지)

1. BaseDigestPasswordEncoder
2. BasePasswordEncoder
3. LdapShaPasswordEncoder
4. Md4PasswordEncoder
5. Md5PasswordEncoder
6. MessageDigestPasswordEncoder
7. PlaintextPasswordEncoder
8. ShaPasswordEncoder

<br/>

### 1.context-security.xml 설정하기

- 로그인시 암호화를 해서 비교를 위해 의존성 주입을 해줍니다.
- 먼저 사용할 암호화 bean을 주입해줍니다.

```xml
  <beans:bean id="passwordEncoder" class="org.springframework.security.authentication.encoding.ShaPasswordEncoder">
    <beans:constructor-arg name="strength" value="256"></beans:constructor-arg>
  </beans:bean>
```

- password를 암호화 provider에 추가해줍니다.

```xml
  <!--  provider  -->
  <authentication-manager>
    <authentication-provider user-service-ref="userService">
      <password-encoder ref="passwordEncoder"/>
    </authentication-provider>
  </authentication-manager>
```

<br/>

### 2. UserDaoService.java 파일 생성하기

- 회원가입하는 유저 정보를 넣을 DAO서비스를 생성한다.

```java
  package egovframework.example.user;

  import java.util.Map;

  public interface UserDaoService {
    public int insertUser(Map<String, String> paramMap);
  }
```

<br/>

- UserDaoServiceImpl.java파일 생성
- 서비스 임플을 해준다.

<br/>

```java
  package egovframework.example.user;

  import java.util.Map;

  import org.mybatis.spring.support.SqlSessionDaoSupport;
  import org.springframework.stereotype.Service;
  import org.springframework.transaction.annotation.Transactional;

  @Service("userDaoService")
  public class UserDaoServiceImpl extends SqlSessionDaoSupport implements
  UserDaoService {

    @Override
    @Transactional
    public int insertUser(Map<String, String> paramMap) {

      return getSqlSession().insert("user.insertUser", paramMap);
    }
  }
```

<br/>

- InputUser_SQL.xml 파일 생성 및 디비 쿼리 작성
- 당연히 디비의 이름과 맞게 해주며 #{이름}은 paramMap의 키와 같도록 맞춰주어야한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="user">
 <insert id="insertUser">
  INSERT INTO USER
  VALUES(#{email},#{password},1,#{authority})
 </insert>
</mapper>
```

<br/>

- **암호화 서비스 생성(ShaEncoder.java)**

```java
  package egovframework.example.user;

  import javax.annotation.Resource;
  import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
  import org.springframework.stereotype.Service;

  @Service("shaEncoder")
  public class ShaEncoder {

  @Resource(name = "passwordEncoder")
  private ShaPasswordEncoder encoder;

  public String encoding(String str) {
  return encoder.encodePassword(str, null);
  }
}
```

<br/>

### 3. Controller 생성

- 컨트롤러에 서비스를 연결합니다.
- 패스워드는 암호화를 해서 넘깁니다.

```java
//리소스 추가
@Resource(name="shaEncoder")
private ShaEncoder encoder;

@Resource(name="userDaoService")
private UserDaoServiceImpl dao;

//비밀번호 암호화 및 서비스연결
@RequestMapping(value = "registerInput.do")
public String Input(@RequestParam("email")String email, @RequestParam("password")String password, @RequestParam("authority")String authority) throws Exception {

  String dbpw = encoder.encoding(password);
  Map<String, String> paramMap = new HashMap<String, String>();
  paramMap.put("email", email);
  paramMap.put("password", dbpw);
  paramMap.put("authority", authority);
  int result = dao.insertUser(paramMap);
  //logger.info("result ===> {}", result);

  return "redirect:/login.do";
}
```

<br/>

### 4. 마지막으로 회원가입 페이지를 만들면 됩니다.

- 아이디 : email
- 비밀번호 : password
- 권한 이름 : 자유롭게 추가하시면 됩니다.(기본 : ROLE_USER)

<br/>

## 새로운 추가!!!

## 자동 로그인

시큐리티를 하다보니 욕심이 생겨서 요즘 자주 들어가는 사이트는 자동로그인을 걸어놓고 로그인을 따로 하지 않아도 들어갈 수 있도록 한다.(개인 컴퓨터에 한정해서) 그에 맞에 나도 자동로그인을 구현하고자한다.
<br/>

[참고 사이트 : 스프링 시큐리티 기초 따라가기 (2) - Remember Me](http://hamait.tistory.com/327?category=128263)

- Remember Me 는 2가지 방법으로 구현가능한데 , 이 게시물에서는 **심플 해쉬 기반 쿠키** 로 만들었다.
- 하다 보니까 이게 필요할까라는 생각을 하는 중.....
- 기본적으로 웹에서 크롬에서 지원을 함으로....

<br/>

### 일단 적용(context-security.xml 추가)

- `<http>` 태그 안에 추가 합니다.

```XML
<logout invalidate-session="true" delete-cookies="JSESSIONID,SPRING_SECURITY_REMEMBER_ME_COOKIE" logout-url="/logout" logout-success-url="/login.do" />

<remember-me key="wmoskey" token-validity-seconds="2419200"/> <!-- 4 주 -->
```

<br/>

### 로그인 페이지 자동로그임 버튼 추가

```jsp
<input type="text" class="form-control" id="inputId" placeholder="ID" name="username">
```

<br/>

## Https 적용

쉽게 말해서 http의 보안이 강화된 버전이다. HTTPS는 통신의 인증과 암호화를 위해 넷스케이프 커뮤니케이션즈 코퍼레이션이 개발했으며, 전자 상거래에서 널리 쓰인다.
<br/>

- Http + SSL

### 그냥 맛만 보자

#### 1. context-security.xml 수정

- 기존의 intercept-url을 수정한다.
- 처음 접속시 채널을 정해주는 것이다.
- 아래를 보게 되면 채널로 https가 추가되었다.

```xml
  <intercept-url pattern="/**" access="hasRole('ROLE_USER')"  requires-channel="https" />  
```

<br/>

#### 인증서 만들기

- 간단하게 맛만 보는 것이다.
- 실제 인증서를 만들고 사용하려면 돈이 들고 시간이 든다.

##### 1. 먼저 cmd를 켜고 java/bin으로 이동한다

##### 2. keystore를 만들어준다

```cmd
  keytool -genkey -alias {{키 ID}} -keyalg RSA -keystore {{/Users/Administrator/Desktop/sseon.keystore}}
```

- RSA는 키를 만들어주기 위한 알고리즘이라고 한다.
- DSA, RSA, DES가 있다.
- {{/Users/Administrator/Desktop/sseon.keystore}}는 저장위치로 개인 설정해도된다.

<br/>

##### 3. 각각의 질문에 작성을 해준다

```cmd
  Roger$ keytool -genkey -alias MyKeyAlias -keyalg RSA -keystore /Users/Roger/tmp/roger.keystore
  <!-- 비밀번호 설정 -->
  Enter keystore password:
  <!-- 비밀번호 재입력 -->
  Re-enter new password:
  <!-- 로컬에서 사용할거면 localhost로 적는다. -->
  What is your first and last name?
    [Unknown]:  localhost
  <!-- 조직 단위명 -->
  What is the name of your organizational unit?
    [Unknown]:  MyDepartment
  <!-- 조직 명 -->
  What is the name of your organization?
    [Unknown]:  MyCompany
  <!-- 도시명 -->
  What is the name of your City or Locality?
    [Unknown]:  suwon
  <!-- 도명 -->
  What is the name of your State or Province?
    [Unknown]:  gyunggi
  <!-- 나라 코드 -->
  What is the two-letter country code for this unit?
    [Unknown]:  KR
  <!-- 맞는지 확인하고 Yes -->
  Is CN=localhost, OU=MyDepartment, O=MyCompany, L=suwon, ST=gyunggi, C=KR correct?
    [no]:  Y

  <!-- 한번더 비밀번호를 입력해준다. -->
  Enter key password for
  (RETURN if same as keystore password):
```

<br/>

##### 4. 키가 생성된 것을 확인한다.

##### 5. 서버 설정을 한다.

- 나는 아파치니까(server.xml를 수정한다.)

```xml
<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true" maxThreads="150" scheme="https" secure="true" clientAuth="false" sslProtocol="TLS" />

<Connector SSLEnabled="true" keystoreFile="/Users/Administrator/Desktop/sseon.keystore" keystorePass="{{비밀번호}}" port="8443" scheme="https" secure="true" sslProtocol="TLS"/>
```

<br/>

- `{/Users/Administrator/Desktop/sseon.keystore}`는 조금전 저장한 위치와 파일명을 적는다.
- 비밀번호를 추가한다.

##### 6. 다시 서버를 올려서 확인한다.

- 주소창 왼쪽에 안전하지 않음이라고 하며, https로 접속되는 걸 확인할 수 있다. 제대로 된 것이다.

## 끝

---

#### Reference 

- [HAMA 블로그](http://hamait.tistory.com/325 )