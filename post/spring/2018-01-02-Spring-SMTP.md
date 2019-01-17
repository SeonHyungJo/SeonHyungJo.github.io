---
path: "/post/spring/smtp"
author: "sseon"
date: "2018-01-02"
title: "스프링 이메일 보내기(smtp)"
tags: ["spring", "smtp"]
category: "post"
---

메일 보내기를 해보자!! 웹에서 메일 가져오기를 쓸일이 있을까? 라는 생각을 하지만 필요한 곳도 있겠지... 사내 웹페이지 같은? 그래도 나는 메일 보내기를 먼저 해보려고 합니다..
<br/>

크게 주제는 3개입니다.

- 단순 메시지 보내기(텍스트)
- 파일첨부해서 보내기
- 이미지 추가해서 보내기
- 추후 추가 가능성 있습니다.(가령 난수생성해서 보내기_임시비밀번호 보내기)

<br/>

## 단순 메시지 보내기(텍스트)

단순한 텍스트를 보내는 것은 쉬울 것이라는 생각에 금방 끝내자 했는데 찾는데 마다 말이 다르고 파일구조가 다르니까 따라하기가 힘듭니다.....
<br/>
이 역시 제 방식으로 합니다. 간단하게 수정해야 할 파일은 3군데 입니다.
<br/>

- pom.xml(Java Mail API추가_javax.mail)
- dispatcher-servlet.xml(bean추가)
- controller 추가

<br/>

### 1. pom.xml

메일과 관련된 API가 2~3개가 보였는데, 이게 가장 심플해 보여서 javax로 진행하였습니다.

```xml
  <!-- Java Mail API -->
  <dependency>
    <groupId>javax.mail</groupId>
    <artifactId>mail</artifactId>
    <version>1.4.3</version>
  </dependency>
```

<br/>

### 2. dispatcher-servlet.xml(bean추가)

대표적인 메일 3개를 가지고 모두 해보았습니다.

- Gmail (TSL)
- Naver (SSL)
- Daum (SSL)

<br/>

#### 2.1. Gmail(제일 간단하게 해결)

역시 구글이었습니다. 제일 심플하고 쉽게 되어있습니다.

```xml
  <!-- Gmail -->
  <bean id="mailSender" class="org.springframework.mail.javamail.JavaMailSenderImpl">
    <property name="host" value="smtp.gmail.com" />
    <property name="port" value="587" />
    <property name="username" value="{{사용자 아이디}}@gmail.com" />
    <property name="password" value="{{비밀번호}}" />
    <property name="javaMailProperties">
    <props>
      <prop key="mail.smtp.auth">true</prop>
      <prop key="mail.smtp.starttls.enable">true</prop>
    </props>
    </property>
  </bean>
```

- 대략적으로 보시면 이해가 되실거라 생각됩니다.

<br/>

#### 2.2. Naver(네이버)

네이버에서는 SSL을 추가하지 않을 경우 전송이 안되더라고요. 이거 때문에 30분 삽질했습니다....

```xml
  <!-- naver mail -->
  <bean class="org.springframework.mail.javamail.JavaMailSenderImpl"
    p:host="smtp.naver.com"
    p:port="465"
    p:username="{{아이디만}}"
    p:password="{{비밀번호}}">
    <property name="javaMailProperties">
    <props>
      <prop key="mail.smtp.starttls.enable">true</prop>
      <prop key="mail.smtp.auth">true</prop>
      <prop key="mail.smtps.ssl.checkserveridentity">true</prop>
      <prop key="mail.smtps.ssl.trust">*</prop>
      <prop key="mail.debug">true</prop>
      <prop key="mail.smtp.socketFactory.class">javax.net.ssl.SSLSocketFactory</prop>
    </props>
    </property>
  </bean>
```

- 여기서 주의사항은 username에는 아이디만 적으면 됩니다.
- 포트 번호도 확인해주세요
- 추가적으로 `<prop key="mail.smtp.socketFactory.class"> javax.net.ssl.SSLSocketFactory </prop>` 를 적어주지 않으면 전송이 안되네요

<br/>

#### 2.3. Daum(다음카카오)

네이버와 비슷하다고 생각했는데 역시나 입니다.

```xml
  <!-- Daum mail -->
  <bean class="org.springframework.mail.javamail.JavaMailSenderImpl"
    p:host="smtp.daum.net"
    p:port="465"
    p:username="{{아이디명}}@hanmail.net"
    p:password="{{비밀번호}}">
    <property name="javaMailProperties">
    <props>
      <prop key="mail.smtp.starttls.enable">true</prop>
      <prop key="mail.smtp.auth">true</prop>
      <prop key="mail.smtps.ssl.checkserveridentity">true</prop>
      <prop key="mail.smtps.ssl.trust">*</prop>
      <prop key="mail.debug">true</prop>
      <prop key="mail.smtp.socketFactory.class">javax.net.ssl.SSLSocketFactory</prop>
      </props>
    </property>
  </bean>
```

- 다른점이 있다면 아이디를 적는 공간이 다릅니다.

<br/>

#### 보안 설정하기

모든 SMTP를 사용하기 위해서는 보안을 풀어주어야 합니다.

- [구글 보안 설정하기](https://myaccount.google.com/lesssecureapps)
- [네이버 보안 설정하기](https://mail.naver.com/option/imap)
- [다음 보안 설정하기](https://mail.daum.net/?nil_profile=mini&nil_src=mail#setting/POP3IMAP)

<br/>

### 3. 컨트롤러 생성하기

이제는 진짜 메일을 보내기 위한 컨트롤러 입니다. DAO나 VO로 따로 빼서 관리를 할 수 있지만 이번에는 한곳에 두겠습니다.

```java
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MailController {

	@Autowired
	private JavaMailSender mailSender;

	// mailSending 코드
	@RequestMapping(value = "mailSending.do")
	public String mailSending(HttpServletRequest request) {

		String setfrom = "{{아이디명하고 똑같아야합니다.}}";
		String tomail = request.getParameter("tomail"); // 받는 사람 이메일
		String title = request.getParameter("title"); // 제목
		String content = request.getParameter("content"); // 내용

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,
					true, "UTF-8");

			messageHelper.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
			messageHelper.setTo(tomail); // 받는사람 이메일
			messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
			messageHelper.setText(content); // 메일 내용

			mailSender.send(message);
		} catch (Exception e) {
			System.out.println(e);
		}

		return "main/main.tiles";
	}
}
```

- 크게는 4개의 정보가 들어갑니다.(보내는사람, 받는사람, 제목, 내용)
- 이렇게 3개의 파일을 수정하면 완료가 됩니다. 이제 보내는 페이지에서 클릭시 전송을 해주면됩니다.

<br/>

### 4. 메일 보내기 페이지

단순히 보내는사람, 제목, 내용만 적어주고 버튼을 눌러주면 보내지는 페이지입니다.

```jsp
  <h4>메일 보내기</h4>
    <form action="mailSending.do" method="post">
      <div>
        <input type="text" name="tomail" size="120"
        style="width: 100%" placeholder="상대의 이메일"
        class="form-control">
      </div>
      <div align="center">
        <!-- 제목 -->
        <input type="text" name="title" size="120"
        style="width: 100%" placeholder="제목을 입력해주세요"
        class="form-control">
      </div>
        <p>
          <div align="center">
          <!-- 내용 -->
            <textarea name="content" cols="120" rows="12"
            style="width: 100%; resize: none" placeholder="내용#"
            class="form-control"></textarea>
          </div>
        <p>
      <div align="center">
        <input type="submit" value="메일 보내기" class="btn btn-warning">
      </div>
    </form>
```

<br/>

## 2. 파일첨부해서 보내기

너무 나도 간단하게 첨부는 가능하지만 다른 문제가 있는 파일 첨부

```java
  @Controller
  public class MailController {

	@Autowired
	private JavaMailSender mailSender;

	// mailSending 코드
	@RequestMapping(value = "mailSending.do")
	public String mailSending(HttpServletRequest request, MultipartHttpServletRequest multi) {


		String setfrom = "{{메일주소}}";
		String tomail = request.getParameter("tomail"); // 받는 사람 이메일
		String title = request.getParameter("title"); // 제목
		String content = request.getParameter("content"); // 내용
        // 여기가 추가
		String filename =  request.getParameter("submitFile");

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,
					true, "UTF-8");

			messageHelper.setFrom(setfrom); // 보내는사람 생략하거나 하면 정상작동을 안함
			messageHelper.setTo(tomail); // 받는사람 이메일
			messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
			messageHelper.setText(content); // 메일 내용


			// 여기가 추가
			FileSystemResource fsr = new FileSystemResource({{파일경로}});
		    messageHelper.addAttachment(filename, fsr);

			mailSender.send(message);
		} catch (Exception e) {
			System.out.println(e);
		}

		return "redirect:/main.do";
	}
}

```

- 제일 중요한건 저 파일 경로다....
- 자바스크립트로는 보안상 경로자체를 가져올수 없다.
- 파일업로드하듯이 가져와야 할 것 같다.

<br/>

## 3. 이미지 추가해서 보내기

진짜 단순히 img 태그를 추가하는 방법이다. 결국 이미지는 이미지 태그를 추가해서 이미지 경로를 써주는 되는거였다....
<br/>

```java
  String contents = content + "<img src=\"https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/1590/3428.jpg\">";
  messageHelper.setText(contents, true);
```

- 스프링과는 맞지 않는 앵귤러 사진입니다.