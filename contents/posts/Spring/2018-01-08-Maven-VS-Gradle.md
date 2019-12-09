---
path: "/content/maven-gradle"
author: "snyung"
date: "2018-01-08"
title: "Maven과 Gradle의 차이점"
tags: ["spring", "maven", "gradle"]
category: "post"
---

어느 순간 Gradle을 써야한다고 생각을 했다. Spring Boot에서도 Gradle을 쓰고 있는 시점에서 어느 정도는 익숙해야한다고 생각한다. 그러나 왜 Gradle인가? 과연 2개가 무엇이 다르기에 그런 것일까?
<br/>

## Maven

- Apache의 이름 아래 2004년 출시되었다.
- Ant를 사용하던 개발자들의 불편함을 해소 + 부가기능 추가

<br/>

### Maven은 무엇인가? 

- 빌드를 쉽게 할 수 있도록 해준다.
- pom.xml을 이용한 정형화된 빌드 시스템
- 뛰어난 프로젝트 정보 제공
  - Change log document created directly from source control
  - Cross referenced sources
  - Mailing lists
  - Dependency list
  - Unit test reports including coverage
- 개발 가이드 라인 제공
- 테스트 소스 코드를 별도의 병렬 소스 트리에 보관
- 테스트 케이스 명명 규칙을 사용하여 테스트 위치 및 실행
- 테스트 케이스에 환경을 설정하고 테스트 준비를 위해 빌드를 사용자 정의하지 않아도 된다.
- 새로운 기능을 쉽게 설치할 수 있고 업데이트할 수 있음

<br/>

## [Gradle](https://gradle.org/)

- Ant와 Maven의 장점을 모아모아 2012년 출시
- Android OS의 빌드 도구로 채택 됨

1. 빌드 스크립트가 '프로그래밍 언어'의 모습을 하고 있다. 자바와 같이 JVM위에서 동작하는 groovy 라는 언어로 작성하게 됩니다.
2. 빌드 스크립트가 일률적이지 않다. - DSL(도메인언어)라는 모습으로 server side의 그레이들 스크립트와 안드로이드를 위한 gradle을 잘 안다고 해도 서버 사이드의 그레이들 스크립트는 잘 다루지 못합니다.
3. 다수의 빌드 지원 파일로 구성되어 있다.

<br/>

### [Gradle](https://gradle.org/)이란 무엇인가?

- Ant처럼 유연한 범용 빌드 도구
- Maven을 사용할 수 있는 변환 가능 컨벤션 프레임 워크
- 멀티 프로젝트에 사용하기 좋음
- Apache Ivy에 기반한 강력한 의존성 관리
- Maven과 Ivy 레파지토리 완전 지원
- 원격 저장소나, pom, ivy 파일 없이 연결되는 의존성 관리 지원
- 빌드를 설명하는 풍부한 도메인 모델

<br/>

## Maven VS Gradle

- Gradle에는 비교문서가 존재합니다.
- Gradle이 시기적으로 늦게 나온만큼 사용성, 성능 등 비교적 뛰어난 스펙을 가지고있다.

<br/>

### Gradle이 Maven보다 좋은점

- Build라는 동적인 요소를 XML로 정의하기에는 어려운 부분이 많다.
- Maven은 설정 내용이 길어지고 가독성 떨어진다.
- 의존관계가 복잡한 프로젝트 설정하기에 부적절하다
- 상속구조를 이용한 멀티 모듈 구현이 가능하다.
- 특정 설정을 소수의 모듈에서 공유하기 위해서는 부모 프로젝트를 생성하여 상속하게 해야 함 (상속의 단점 생김)
- Gradle은 Groovy를 사용하기 때문에, 동적인 빌드는 Groovy 스크립트로 플러그인을 호출하거나 직접 코드를 짜면 된다.
- Configuration Injection 방식을 사용해서 공통 모듈을 상속해서 사용하는 단점을 커버했다.
설정 주입 시 프로젝트의 조건을 체크할 수 있어서 프로젝트별로 주입되는 설정을 다르게 할 수 있다.

<br/>

---

#### Reference

 - [어쩌다, 블로그](http://bkim.tistory.com/13)
