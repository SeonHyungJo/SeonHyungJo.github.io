---
comments: true
path: "/content/log"
author: "snyung"
date: "2018-01-02"
title: "[Spring] 로그설정하기"
tags: ["Spring"]
category: "post"
---

오늘은 모바일체크만 하니까 너무 심플하게 끝나버려서 평소 해보고 싶었던 로그설정을 해볼려고 합니다.

- 블로그 하나가 깔끔하게 잘 되어있어서 가져왔습니다.
- [Log4j2에 대해 알아보기](http://blog.naver.com/PostView.nhn?blogId=mk1126sj&logNo=220970218433)

<br/>

## Log4j2

아파치에서 만든 로깅을 위한 자바 기반의 오픈소스 라이브러리로 디버그용 도구로 주로 사용합니다.
기본적으로 전자정부프레임워크는 프로젝트 생성시 기본적으로 설정이 되고 있습니다.
<br/>

**Log4j는 Log for java라는 뜻** 으로 Java를 위한 프로젝트중 하나로 처음부터 Java 예외를 위해 설계되었다고 합니다.
<br/>

나 조차도 sysout으로 출력을 하면서 로그를 찍어본다. 그러나 이것은 중대한 실수이다. sysout이 쌓이게 되면 엄청난 **시스템의 성능 저하** 를 초래할 수 있습니다.
<br/>

## Log4j2 설정 정보 알아보기

### 로그레벨

Log4j2는 FATAL, ERROR, WARN, INFO, DEBUG, TRACE의 Log Level을 제공합니다.(Log4j도 동일)
<br/>

- FATAL > ERROR > WARN > INFO > DEBUG > TRACE

<br/>

|로그 레벨|설명|
|:-:|:-:|
|FATAL|아주 심각한 에러가 발생한 상태를 나타냄|
|ERROR|요청을 처리하는 중 문제가 발생한 상태를 나타냄|
|WARN|처리 가능한 문제이지만, 향후 시스템에러의 원인이 될 수 있는 경고성 메시지|
|INFO|로그인, 상태변경과 같은 정보성 메시지를 나타냄|
|DEBUG|개발시 디버그 용도로 사용한 메시지를 나타냄|
|TRACE|디버그 레벨이 너무 광범위한 것을 해결하기 위해서 좀 더 상세한 상태를 나타냄|

<br/>

### Appender의 종류

- Appender는 로그를 출력해주는 출력자.
- 출력 위치에 따라 Appender의 종류가 달라짐.

<br/>

|Appender|태그명|출력 위치|
|:-:|:-:|:-:|
|ConsoleAppender|`<Console>`|콘솔에 출력|
|FileAppender|`<File>`|파일에 출력|
|RollingFileAppender|`<RollingFile>`|조건에 따라 파일에 출력|
|JDBCAppender|`<JDBC>`|RDB Table에 출력|

<br/>

### PatternLayout의 pattern

- `%`로 시작하고 `%`뒤에는 format modifiers와 conversion character로 정의.

<br/>

|패턴|설명|
|:-:|:-:|
|c, logger|로깅 이벤트를 발생시키기 위해 선택한 로거의 이름을 출력|
|C, class|로깅 이벤트가 발생한 클래스의 풀네임명을 출력|
|M, method|로깅 이벤트가 발생한 메서드명을 출력|
|F, file|로깅 이벤트가 발생한 클래스의 파일명을 출력|
|l, location|로깅 이벤트가 발생한 클래스의 풀네임명, 메서드명(파일명:라인번호)를 출력|
|d, date|로깅이벤트의 일자와 시간을 출력 |
|L, line|로깅 이벤트가 발생한 라인 번호를 출력|
|m, msg, message|로그문에서 전달된 메시지를 출력|
|n|줄바꿈|
|p, level|로깅 이벤트의 레벨을 출력|
|r, relative|로그 처리시간|
|t, thread|로깅 이벤트가 발생한 스레드명을 출력|
|%%|%를 출력하기 위해 사용하는 패|

<br/>

### Log4j2.xml 파일

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d %5p [%c] %m%n" />
        </Console>
    </Appenders>
    <Loggers>
        <Logger name="java.sql" level="INFO" additivity="false">
            <AppenderRef ref="console" />
        </Logger>
        <Logger name="egovframework" level="DEBUG" additivity="false">
            <AppenderRef ref="console" />
        </Logger>
          <!-- log SQL with timing information, post execution -->
        <Logger name="jdbc.sqltiming" level="INFO" additivity="false">
            <AppenderRef ref="console" />
        </Logger>
        <Logger name="org.springframework" level="INFO" additivity="false">
            <AppenderRef ref="console" />
        </Logger>
        <Root level="INFO">
            <AppenderRef ref="console" />
        </Root>
    </Loggers>
</Configuration>
```
