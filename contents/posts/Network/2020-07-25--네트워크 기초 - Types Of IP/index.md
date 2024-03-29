---
path: '/content/2020-07-25--네트워크-기초-Types-Of-IP'
author: 'snyung'
date: '2020-07-25'
title: 네트워크 기초 - Types Of IP
tags: [Network]
category: 'post'
---

### 이전 글 복습하기

[네트워크 기초 - IP](https://snyung.com/content/2020-06-24--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-IP)

[네트워크 기초 - SubnetMask](https://snyung.com/content/2020-07-11--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC)

[네트워크 기초 - OSI 7 계층과 TCP/IP 계층](https://snyung.com/content/2020-08-31--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-OSI-7-%EA%B3%84%EC%B8%B5%EA%B3%BC-TCP-IP-%EA%B3%84%EC%B8%B5)

[네트워크 기초 - TCP와 UDP](https://snyung.com/content/2020-09-01--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-TCP&UDP)

[네트워크 기초 - DHCP & DNS](https://snyung.com/content/2020-11-07--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B8%B0%EC%B4%88%20-%20DHCP&DNS)

[네트워크 기초 - HTTP3](https://snyung.com/content/2020-11-07--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B8%B0%EC%B4%88%20-%20HTTP3)

- 네트워크 : 두 대 이상의 컴퓨터가 논리적 또는 물리적으로 연결되어 통신이 가능한 상태(PAN, LAN, MAN, WAN).
- IP 주소 : 네트워킹이 가능한 장비를 식별하는 주소.
- IPv4, IPv6
- A, B, C 클래스 : 네트워크 영역과 호스트 영역을 구분한 기준
  - A : `0.0.0.0` ~ `127.255.255.255`
  - B : `128.0.0.0` ~ `191.255.255.255`
  - C : `192.0.0.0` ~ `223.255.255.255`
- 네트워크 주소 : 호스트 부분이 모두 0인 경우
- 브로드캐스트 주소 : 호스트 부분이 모두 1인 경우
- 서브넷마스크 : 네트워크와 호스트 영역을 구분하기 위한 값
- 서브네팅 : 네트워크 관리자가 네트워크 성능을 향상하기 위해, 자원을 효율적으로 분배하는 것

---

## 어디선가 들어본 IP 종류

1. 공인 IP (Public IP)
2. 사설 IP (Private IP)
3. 고정 IP (Static IP)
4. 동적 IP (Dynamic IP)

위 4개의 IP 종류를 봤을 수도 있고, 누구는 처음 봤을 수도 있다. 4개를 하나의 기준으로 구분하지 않는다. 대개 1번과 2번을 묶어서 설명하며, 3번과 4번을 묶어서 설명한다.

그렇다면 각각의 IP는 무엇이며 왜 사람들은 1, 2를 하나로 묶고 3, 4를 하나로 묶어서 구분하는지 알아보자.

## 공인 IP (Public IP)

인터넷 사용자의 로컬 네트워크를 식별하기 위해서 ISP(Internet Service Provieder, 인터넷 서비스 공급자)에서 제공하는 IP 주소이다. 공용 IP 주소라고도 불리며 **외부에 공개된 IP 주소**이다.

> ISP(인터넷 서비스 공급자) : 개인이나 기업체들에 인터넷 접속 서비스, 웹사이트 구축 및 웹호스팅 서비스 등을 제공하는 회사이다. 대표적으로 한국에서는 KT 인터넷, SK브로드밴드, LG U+ 등이 있다. - 출처 : 위키

공인 IP는 전 세계에서 유일한 IP 주소를 갖는다.

공인 IP 주소는 외부에 공개되어 있기에 인터넷이 연결된 다른 PC로부터 접근이 가능하다. 따라서 공인 IP 주소를 사용하는 경우에는 방화벽 등의 보안 프로그램을 설치할 필요가 있다.

IPv4 주소는 임의로 우리가 부여하는 것이 아니다. 전 세계적으로 [ICANN](https://ko.wikipedia.org/wiki/ICANN) 이라는 기관이 국가별로 사용할 IP 대역을 관리하고 우리나라의 경우 인터넷 진흥원(KISA)에서 우리나라에서 사용하는 주소를 관리하고 있다. 임의로 아무 IP 주소나 내 컴퓨터에 지정한다고 인터넷이 되는 것이 아니라 할당받은 주소를 부여해야만 인터넷에 접속할 수 있다.

### IP 부족 사태

IP 부족 사태는 인터넷 발전 초기에 IP 주소를 무계획적으로 배분했기 때문에 발생하는 문제다. 대표적으로 미국의 일반 기업인 IBM이나 모토롤라 등은 초기에 인터넷 주소를 부여받으면서 A 클래스를 부여받았고, 우리나라에서도 KAIST나 서울대 등은 B 클래스를 보유하여 학교 내의 PC들에게도 마구 공인 IP를 부여하고 있다.

반면 최근에 IP를 신청하는 기업은 큰 비용을 지불하고도 C 클래스 대역조차 얻기가 쉽지 않은 현실이다.

## 사설 IP (Private IP)

전체 IP 대역 중에서 특수한 목적으로 사용하기 위해서 몇 개의 대역을 제외하고 공인 IP 대역으로 할당하고 있는데, 제외된 대역 중에서 사설 IP로 사용되는 대역은 사용자가 임의로 부여하고 사용할 수 있지만 인터넷상에서 서로 연결되지 않게 되어 있다. 전체 IP 대역 중에서 다음의 대역이 사설 IP 대역이다

### 사설 IP 주소 대역

사설 IP 주소는 다음 3가지 주소 대역으로 고정된다.

- Class A : `10.0.0.0` ~ `10.255.255.255`
- Class B : `172.16.0.0` ~ `172.31.255.255`
- Class C : `192.168.0.0` ~ `192.168.255.255`

사설 IP 주소만으로는 인터넷에 직접 연결할 수 없다. 라우터를 통해 1개의 공인(Public) IP만 할당하고, 라우터에 연결된 개인 PC는 사설(Private) IP를 각각 할당받아 인터넷에 접속할 수 있다.

## 고정 IP (Static IP)

고정 IP는 컴퓨터에 고정적으로 부여된 IP로 한번 부여되면 IP를 반납하기 전까지는 다른 장비에 부여할 수 없는 IP 주소를 말한다.

개인적으로 하나의 서버를 운영해야 한다면 고정 IP를 사용해야 한다. 그렇지 않으면 우리가 할당받는 IP는 유동 IP로 일정 시간 사용하지 않게 되면 IP가 바뀌게 된다. 그렇게 될 경우 서버로 사용하는 사용자에게 문제가 발생하게 된다.

이에 서버로 사용하는 경우 고정 IP를 사용한다.

## 동적 IP (Dynamic IP)

동적 IP는 장비에 고정적으로 IP를 부여하지 않고 컴퓨터를 사용할 때 남아 있는 IP 중에서 돌아가면서 부여하는 IP를 뜻한다. 유동 IP라고도 불린다.

부여받은 IP가 10개이고 접속해야 할 컴퓨터가 20대라면 10대는 고정 IP를 부여할 경우 IP가 모자라므로 유동 IP로 10개를 20대가 돌아가면서 사용하여 자원을 조금 더 효율적으로 사용하는 것이다.

## 결국

우리가 집에서 사용하는 인터넷 서비스 업체는 가정마다 공인 IP를 동적 IP로 부여하고, 공유기 내부에서는 사설 IP를 동적 IP로 부여하는 것이 일반적이라고 보면 될 것이다.

## One more thing...

### NAT (Network Address Translation)

NAT는 네트워크 주소를 변환시켜주는 기술을 말하며, NAT의 장점은 하나의 공인 IP를 여러 사람이 공유해서 쓸 수 있게 해주며, 외부 공공망으로 부터 고유한 사설망으로의 침입을 어느 정도 방지해줄 수 있는 특징이 있다. NAT의 예를 보면 공유기를 통해 여러 디바이스를 하나의 아이피로 연결해서 사용할 수 있게 해주는 기술이다.

- SNAT(Source NAT) : 내부 사설 IP에서 외부 공인 IP로 변환
- DNAT(Destination NAT) : 외부 공인 IP에서 내부 사설 IP로 변환

#### Reference

- [공인(Public) && 사설(Private) IP의 차이점](https://velog.io/@hidaehyunlee/%EA%B3%B5%EC%9D%B8Public-%EC%82%AC%EC%84%A4Private-IP%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- [공인 IP, 사설 IP, 고정 IP, 유동 IP](http://gotocloud.co.kr/?p=320)
- [공인아이피 사설아이피 정의 및 이해 : 네이버 블로그](https://m.blog.naver.com/mogni/70183970559)
