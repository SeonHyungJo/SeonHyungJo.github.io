---
path: "/content/setting-4"
author: "sseon"
date: "2018-01-15"
title: "스프링 혼자서 셋팅 해보기 4탄"
tags: ["spring", "setting"]
category: "post"
---

이번에는 실무에서 많이 사용하고 있는 마이바티스 설정이다. 기본적으로 전자정부프레임워크에서는 지원을 하고 있으니 나도 해야되지 않겠나?
<br/>

## 1. pom.xml(마이바티스 라이브러리 추가)

```xml
  <!-- Mybatis -->
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.2.2</version>
  </dependency>

  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.2.0</version>
  </dependency>

  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>${org.springframework-version}</version>
  </dependency>

  <dependency>
    <groupId>commons-dbcp</groupId>
    <artifactId>commons-dbcp</artifactId>
    <version>1.4</version>
  </dependency>
  <!-- Mybatis -->
```

- 저는 MySQL사용하겠습니다.

```xml
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.31</version>
  </dependency>
```

<br/>

## 2. MyBatis와 DB(데이터베이스) 연결 설정

- src/java/resource 폴더 밑에 config > spring 폴더를 만들다.
- spring 폴더 안에 context-datasource.xml 파일을 만든다.

### web.xml 설정으로 파일 읽기

```xml
  <context-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath*:config/spring/context-*.xml</param-value>
  </context-param>
```

<br/>

### MyBatis 연결 설정

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                      http://www.springframework.org/schema/jdbc  http://www.springframework.org/schema/jdbc/spring-jdbc-3.0.xsd">

  <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://주소/스키마"/>
        <property name="username" value="아이디"/>
        <property name="password" value="비밀번호"/>
    </bean>
  </beans>
```

- 여기서 주소는 로컬일 경우 127.0.0.1 또는 localhost 입니다.

<br/>

### context-mapper.xml 생성

```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:context="http://www.springframework.org/schema/context"
      xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

      <bean id="sqlSession" class="org.mybatis.spring.SqlSessionFactoryBean">
          <property name="dataSource" ref="dataSource" />
          <property name="mapperLocations" value="classpath*:/mapper/**/*_SQL.xml" />
      </bean>

      <bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
          <constructor-arg index="0" ref="sqlSession"/>
      </bean>
  </beans>
```

- property의 name과 ref가 dataSource로 정의되어있다. 이 두가지는 같은것을 의미하지 않는다. name은 위에서 등록한 sqlSession 빈(bean)에서 사용할 이름이 dataSource이고, ref의 dataSource는 우리가 context-datasource.xml에서 정의한 빈(bean)을 참조하는 것을 의미한다.
- mapperLocations는 앞으로 우리가 작성할 SQL문이 위치할 장소이다. 여기서 classpath:/mapper/\*\*/\*\_SQL.xml 이라는 정의를 살펴보자.
- sqlSessionTemplate은 마이바티스 스프링 연동모듈의 핵심이다. SQLSessionTemplate은 SqlSession을 구현하고, 코드에서 SqlSessoin을 대체하는 역할을 한다.

<br/>

## 3. DAO(Data Access Object) 작성

```java
  public class AbstractDAO {
      protected Log log = LogFactory.getLog(AbstractDAO.class);

      @Autowired
      private SqlSessionTemplate sqlSession;

      protected void printQueryId(String queryId) {
          if(log.isDebugEnabled()){
              log.debug("\t QueryId  \t:  " + queryId);
          }
      }

      public Object insert(String queryId, Object params){
          printQueryId(queryId);
          return sqlSession.insert(queryId, params);
      }

      public Object update(String queryId, Object params){
          printQueryId(queryId);
          return sqlSession.update(queryId, params);
      }

      public Object delete(String queryId, Object params){
          printQueryId(queryId);
          return sqlSession.delete(queryId, params);
      }

      public Object selectOne(String queryId){
          printQueryId(queryId);
          return sqlSession.selectOne(queryId);
      }

      public Object selectOne(String queryId, Object params){
          printQueryId(queryId);
          return sqlSession.selectOne(queryId, params);
      }

      @SuppressWarnings("rawtypes")
      public List selectList(String queryId){
          printQueryId(queryId);
          return sqlSession.selectList(queryId);
      }

      @SuppressWarnings("rawtypes")
      public List selectList(String queryId, Object params){
          printQueryId(queryId);
          return sqlSession.selectList(queryId,params);
      }
  }
```

- SqlSessionTemplate을 선언하고 여기에 Autowired 어노테이션(Annotation)을 통해서 xml에 선언했던 의존관계를 자동으로 주입하도록 하였다.

<br/>

---

#### Reference

- [흔한 개발자의  개발 노트](http://addio3305.tistory.com/43?category=772645)
