---
path: "/content/validation"
author: "snyung"
date: "2018-01-02"
title: "[Spring] 폼태그와 벨리데이션 체크"
tags: ["Spring", "Validation"]
category: "post"
---

스프링 폼태그와 벨리데이션을 한번에 처리해서 회원가입 유효성검사를 한 후 저장을 하는 부분까지 하려고 했으나 생각보다 폼태그가 많아서 정리를 하고 넘어가려고 합니다.
<br/>

- 참고사이트 [anyframe](http://dev.anyframejava.org/anyframe/doc/web/3.0.1/webfw/springmvc/basic/tag.html#configuration)
- 그래도 내방식으로 조금은 바꿔서 진행
- 태그는 왜케 많은거야....

<br/>

## 태그추가

먼저 사용하려면 jsp파일 상단에 taglib를 추가해주어야한다.
<br/>

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
```

<br/>

## form태그

`form`태그는 데이터 바인딩을 위해 태그 안에 바인딩 **path** 를 지정해 줄 수 있다. path에 해당되는 값은 **도메인 모델의 Bean 객체** 를 의미한다.

```jsp
  <form:form commandName="user">
    userId : <form:input path="userId" />
  </form:form>
```

<br/>

이 페이지를 가져오는 컨트롤러에 VO를 추가해봅시다.

<br/>

```java
  //UserVO를 선언해줍니다.
  UserVO vo=new UserVO();

  //저는 아래의 부분을  request가 아닌 ModelMap으로 보내겠습니다.
  //request.setAttribute("user",vo);
  model.addAttribute("user",vo);

  //나는 타일즈를 적용했으니까
  return "main/main.tiles";
```

여기까지는 누구나 적습니다. 그런데 여러 블로그를 보면 VO작성에 대한 설명이 없어요... 그래서 난 추가 통으로

```java
  public class UserVO {

    private String userId;
    private String name;
    private String password;

    public UserVO() {

      this.userId = "sseon";
    }
    public String getName() {
      return name;
    }
    public void setName(String name) {
      this.name = name;
    }
    public String getPassword() {
      return password;
    }
    public void setPassword(String password) {
      this.password = password;
    }
    public String getUserId() {
      return userId;
    }
    public void setUserId(String userId) {
      this.userId = userId;
    }
  }
```

<br/>

## input 태그

- `path`를 지정해줍니다.(이게 user라고 설정한 VO의 내부의 변수와 매핑이 됩니다.)
- 그래서 위의 VO를 그대로 사용했다면 input창 안에 `sseon`이른 글자가 나옵니다.

<br/>

```jsp
  //심플하게 이런식입니다.
  userId : <form:input path="userId" />
```

<br/>

## checkbox 태그

- 체크박스는 하나인 경우와 다수인 경우로 된다.
- 먼저 하나인 경우

<br/>

```jsp
  //개인적으로 동의함 같은 경우가 하나라고 생각함
  <form:checkbox path="hobby" value="" label="동의함"/>
```

<br/>

- `label`에 종류를 적어준다.
- `value`에는 우리가 흔히 사용하듯이 한다.
- `path`에는 우리가 사용하는 `name`과 같다

<br/>

- 다수의 경우
- 여러개는 한번에 뿌려줄 수 있다.

```java
  //controller에 추가해주면 됨
  Map<String, String> interest =new HashMap<String, String>();

  //3개의 항목을 추가 ("value값","label값")
  interest.put("reading", "독서");
  interest.put("listeningMusic", "음악감상");
  interest.put("study", "공부");

  model.addAttribute("interest",interest);

  //userVO에 추가할 것들(하나일 경우에도 해야함)
  private String hobby;

  public String getHobby() {
    return hobby;
  }

  public void setHobby(String hobby) {
    this.hobby = hobby;
  }
```

<br/>

- 다수의 경우에는 `Map`으로 받아서 바로 jsp파일로 보내버린다.

```jsp
  <form:checkboxes path="hobby" items="${interest}" />
```

<br/>

- 한 개씩하는 경우와 비교를 하자면 `checkboxes`이다
- 또한 `items="${interest}"`이다. 안에 interest는 항상 바뀔 수 있다.

<br/>

## radiobutton 태그

- 이건 위에 체크박스와 비슷합니다.
- `path`만 같다면 됩니다.
  
```jsp
  <form:radiobutton path="sex" value="M" label="남자" />
  <form:radiobutton path="sex" value="F" label="여자"/>

  //VO추가
  private String sex;

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }
```

<br/>

## password 태그

- 비밀번호를 위한 태그가 따로 존재합니다.
- **input 태그가 아닙니다.**

<br/>

```jsp
  <form:password class="form-control" path="password" />

  //VO추가
  private String password;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
```

<br/>

## select 태그

- 이건 체크박스와 같은 방식으로 진행

```jsp
<form:select path="address" items="${address}" />
```

<br/>

```java
  //컨트롤러 추가
  Map<String, String> address =new HashMap<String, String>();
  address.put("seoul","서울");
  address.put("daegu","대구");
  address.put("busan","부산");

  model.addAttribute("address",address);
```

<br/>

```java
  //VO추가
  private String address;

  public String getAddress() {
    return comment;
  }
  public void setAddress(String comment) {
    this.comment = comment;
  }
```

<br/>

### select + options

```jsp
  <form:select path="address">
    <form:options items="${address}" />
  </form:select>
```

<br/>

## textarea 태그

```jsp
  <form:textarea path="comment" rows="3" cols="20"></form:textarea>
```

<br/>

```java
  //VO추가
  private String comment;

  public String getComment() {
    return comment;
  }
  public void setComment(String comment) {
    this.comment = comment;
  }
```

<br/>

## hidden 태그

```jsp
  <form:hidden path="userId" />
```

<br/>

## 번외편(Lombok 적용하기)

- 롬복이란....
- 어노테이션 기반으로 Getter, Setter 작업을 손쉽게 도와주는 라이브러리 입니다.
- 한 번쯤 테스트하고 싶었는데 VO를 사용하는 이 시점에서 사용해 보겠습니다.

<br/>

### pom.xml 추가 수정

먼저 Lombok은 maven에 추가를 해줘야 사용이 가능합니다. 그래서 pom.xml에 추가를 해줍니다. 그러나 좀 이상합니다.

```xml
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.8</version>
    <scope>provided</scope>
  </dependency>
```

<br/>

이렇게 추가를 하고 `.jar` 파일까지 설치가 완료된 것을 확인 했으나... 아무리 `@Data`를 선언부에 적어도 먹지를 않아요.
찾아보니 안먹는 사람이 많습니다. 이럴 경우 jar파일에 직접 접근을 하여 ini설정을 해주면 됩니다.

<br/>

```
  //저의 경우
  C:\Users\{{사용자 이름}}\.m2\repository\org\projectlombok\lombok\1.16.8
```

- 위의 경로로 들어간다.
- jar파일을 클릭 해서 `specify location`을 클릭한다.
- 해당 이클립스가 설치되어있는 곳을 들어가서 `eclipse.exe`를 클릭하여 등록한다.
- 이클립스 재시작

<br/>

위에 처럼하게 되면 이제는 `@Data` 어노테이션이 아주 잘 먹습니다.
<br/>

lombok의 경우 여러 어노테이션이 있지만 `@Data`를 적용하게 되면 전부 적용이 됨으로 쉽게 사용할 수 있습니다. 그리고 뭔가 실무에서 쓴다면 저것만 쓸거 같습니다.

```java
  @Data
  public class UserVO {

  private String userId;
  private String name;
  private String password;
  private String hobby;
  private String sex;
  private String address;
  private String comment;
```

너무나도 심플...
<br/>

## Validation

하도 여러개를 찾아봤는데 마땅히 해봐야 할 것을 나도 잘모르겠다. 그래서 내가 맞춤으로 한 번 해보는 것에 의의를 두기로 했다.
<br/>

빠르게 진행합니다.
<br/>

### VO 만들기

```java
  public class Person {

  	private String name;
  	private int age;


  	public String getName() {
  		return name;
  	}
  	public void setName(String name) {
  		this.name = name;
  	}
  	public int getAge() {
  		return age;
  	}
  	public void setAge(int age) {
  		this.age = age;
  	}
  }
```

<br/>

### Validation 만들기

```java
  public class PersonValidator implements Validator{

    @Override
    public boolean supports(Class clazz) {
      return Person.class.equals(clazz);
    }

    @Override
    public void validate(Object obj, Errors e) {

      ValidationUtils.rejectIfEmptyOrWhitespace(e, "name", "empty");

      Person p = (Person) obj;
      if (p.getAge() <= 0) {
        e.rejectValue("age", "negativevalue");
      } else if (p.getAge() > 110) {
        e.rejectValue("age", "too.darn.old");
      }
    }
  }
```

<br/>

- `implements Validator`을 사용합니다.
- 주로 사용하게 될 코드는 `ValidationUtils.rejectIfEmptyOrWhitespace`와 `rejectValue`입니다.
- 이제는 오류에 대한 문구를 적어줍니다.

<br/>

### 문구 넣어주기

- `message-common_ko.properties` 파일에 들어갑니다.
- 아래와 같이 자신이 원하는 문구를 적어줍니다.
- 단 message가 맵핑이 되어있어야 사용할 수 있겠죠?

<br/>

```java
  negativevalue = 입력해주세요
  too.darn.old = 너무늙음
  empty = 값이 없습니다.
```

<br/>

```xml
  //messageSource bean추가
  <bean id="messageSource" class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
    <property name="basenames">
      <list>
        <value>classpath:/egovframework/message/message-common</value>
        <value>classpath:/egovframework/rte/fdl/idgnr/messages/idgnr</value>
        <value>classpath:/egovframework/rte/fdl/property/messages/properties</value>
      </list>
    </property>
    <property name="cacheSeconds">
      <value>60</value>
    </property>
  </bean>
```

<br/>

### Controller 수정하기

간단하게 바로 VO로 request를 받은 다음, 벨리테이터를 선언해서 `.validate`를 작동시켜 오류를 만들어주고 오류가 있다면 다시 이전페이지로 돌려주면서 가져왔던값을 다시 가져가고 있습니다.

```java
  @RequestMapping(value = "mainInput.do")
  public String mainInput(ModelMap model,@ModelAttribute Person person, BindingResult result) throws Exception {

    PersonValidator val = new PersonValidator();

    val.validate(person, result);

    if (result.hasErrors()) {
      System.out.println(person);
      model.addAttribute("person", person);
      return "main/main.tiles";
    }

    return "main/main.tiles";
  }
```

<br/>

다음에는 @Valid를 찾아보겠습니다
끝(VO를 쓰는 이유를 알겠다....)

---

## Reference

- [anyframe](http://dev.anyframejava.org/anyframe/doc/web/3.0.1/webfw/springmvc/basic/tag.html#configuration)
- [스프링 - @Valid Annotation을 이용한 유효성 체크](http://appsnuri.tistory.com/115)
