---
layout: post
title:  "스프링 혼자서 셋팅 해보기 3탄"
date:   2018-01-15
excerpt: "이제는 전자정부프레임워크에서 기본으로 제공하는 세팅을 보고 내가 커스터마이즈를 해보고 싶다."
tag:
- spring
- maven
- web
- setting
comments: true

---

**Spring_Project_Setting_3**
===

이번에는 로그를 찍는 방법과 인터셉터에 대해서 한다고 한다.

## Log4j 설정

생각보다 많은 개발자들이 테스트를 해볼때, sysout을 많이 사용한다. 그러나 이것은 프로그램에 매우 안좋다고 한다. 그래서 로그를 찍는 법을 배워야한다.

---

  1. **운영시에 불필요한 로그가 계속 출력된다.** - 시스템을 개발하고 운영할 때, System.out.println()을 모두 찾아서 지워준다면 몰라도, 거의 대부분은 그냥 한다. 그러면 쓸모없는 로그로 아까운 리소스가 낭비된다.

  2. **모든 로그를 지워버리면, 에러가 났을경우, 그 에러 원인을 찾기가 어려울 수도 있다.** - 예를 들어, 시스템에 중대한 에러가 날 경우, 로그를 출력해놓도록 해놨는데, 위에서 System.out.println을 모두 지워버렸다면, 로그가 안남을 수도 있다.

  3. **성능에 큰 영향을 미친다.** - 사실 가장 중요한 문제다. 우리가 프로그램을 실행하다가 System.out.println()을 굉장히 많이 호출하면 프로그램의 전체적인 성능이 떨어지는것을 확인할 수 있다. 예를 들어 1부터 100까지를 모두 더하는 프로그램을 만들었을때, 로그를 하나도 안찍으면 정말 0.01초도 안걸려서 끝나지만, 그 계산과정을 모두 System.out.println()으로 화면에 찍어보면 한참 걸린다. 특히 다중사용자를 처리해야 하는 웹에서 System.out.println()은 정말 큰 문제를 만들어버린다.

---

Log4j는 위에서 간단히 이야기 한 문제점을들 손쉽게 해결할 수 있다. Logj4는 시스템의 성능에 큰 영향을 미치지 않으면서도, 옵션 설정을 통해서 다양한 로깅 방법을 제공한다. 환경설정을 통해서 선택적인 로그를 남긴다거나, 특정 파일등에 로그를 생성하는 등 다양한 이점을 가지고 있다.

---

#### Log4j의 구조

|요소|설명|
|----|----|
|Logger|출력할 메시지를 Appender에 전달한다.|
|Appender|전달된 로그를 어디에 출력할 지 결정한다. (콘솔 출력, 파일 기록, DB 저장 등)|
|Layout|로그를 어떤 형식으로 출력할 지 결정한다.|

---

#### Log4j의 구조

|로그 레벨|설명|
|----|----|
|FATAL|아주 심각한 에러가 발새한 상태를 나타낸다.|
|ERROR|어떤한 요청을 처리하는 중 문제가 발생한 상태를 나타낸다.|
|WARN|프로그램의 실행에는 문제가 없지만, 향후 시스템 에러의 원이 될 수 있는 경고성 메시지를 나타낸다.|
|INFO|어떠한 상태변경과 같은 정보성 메시지를 나타낸다.|
|DEBUG|개발시 디버그 용도로 사용하는 메시지를 나타낸다.|
|TRACE|디버그 레벨이 너무 광범위한 것을 해결하기 위해서 좀 더 상세한 이벤트를 나타낸다.|

---

**Log4j에 .properties를 사용하는 건 최악이다. 절대로 하지말자.**

---

## 인터셉터 (Interceptor) 설정

인터셉터는 **중간에 무엇인가를 가로챈다는 의미이다.** 스프링에서도 말 그대로 중간에 요청을 가로채서 어떠한 일을 하는것을 의미한다. 서블릿(Servlet)을 사용해본 사람이라면 필터(Filter)를 들어봤을텐데, 비슷한 의미로 사용된다. 그럼 어느 중간에서 요청을 가로채서 무엇을 하는지를 간단히 살펴보자.

---

![mvc패턴 그림](https://raw.githubusercontent.com/SeonHyungJo/SeonHyungJo.github.io/2ef6a726552cbc76d913466def8fe6bdbcbc07f9/assets/img/spring/MVCPattern.JPG)

---

위의 사진에서 클라이언트와 컨트롤러 사이, 클라이언트와 jsp사이에서 동작한다.<br>
  - 인터셉터의 정확한 명칭은 핸들러 인터셉터 (Handler Interceptor)이다. 인터셉터는 DispatcherServlet이 컨트롤러를 호출하기 전,후에 요청과 응답을 가로채서 가공할 수 있도록 해준다.
  - 예를 들어, 로그인 기능을 구현한다고 했을때, 어떠한 페이지를 접속하려고 할때, 로그인된 사용자만 보여주고, 로그인이 되어있지 않다면 메인화면으로 이동시킬 수 있게 됩니다.

---

### 간단한 예제
  - src/main/java/sseon 패키지 내에 common 패키지를 생성
  - 그 밑에 logger 패키지를 생성 logger 패키지 밑에 **LoggerInterceptor.java를 생성** 한다.
  - 전처리기와 후처리기가 바로 그것인데, 위에서 client -> controller 로 요청할 때, 그 요청을 처리할 메서드 하나(전처리기)와 controller -> client 로 응답할 때

```
  public class LoggerInterceptor extends HandlerInterceptorAdapter {
    protected Log log = LogFactory.getLog(LoggerInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (log.isDebugEnabled()) {
            log.debug("======================================          START         ======================================");
            log.debug(" Request URI \t:  " + request.getRequestURI());
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (log.isDebugEnabled()) {
            log.debug("======================================           END          ======================================\n");
        }
    }
  }
```


# 참고
 - [흔한 개발자의  개발 노트](http://addio3305.tistory.com/43?category=772645)
