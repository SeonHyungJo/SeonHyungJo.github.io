---
path: '/content/2020-06-24--네트워크-기초-IP'
author: 'snyung'
date: '2020-06-24'
title: 네트워크 기초 - IP
tags: [Network]
category: 'post'
---

[네트워크 기초 - IP](https://snyung.com/content/2020-06-24--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-IP)

[네트워크 기초 - SubnetMask](https://snyung.com/content/2020-07-11--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC)

[네트워크 기초 - Types of IP](https://snyung.com/content/2020-07-25--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-Types-Of-IP)

[네트워크 기초 - OSI 7 계층과 TCP/IP 계층](https://snyung.com/content/2020-08-31--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-OSI-7-%EA%B3%84%EC%B8%B5%EA%B3%BC-TCP-IP-%EA%B3%84%EC%B8%B5)

[네트워크 기초 - TCP와 UDP](https://snyung.com/content/2020-09-01--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EC%B4%88-TCP&UDP)

[네트워크 기초 - DHCP & DNS](https://snyung.com/content/2020-11-07--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B8%B0%EC%B4%88%20-%20DHCP&DNS)

[네트워크 기초 - HTTP3](https://snyung.com/content/2020-11-07--%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EA%B8%B0%EC%B4%88%20-%20HTTP3)

## 네트워크란

두 대 이상의 컴퓨터가 논리적 또는 물리적으로 연결되어 통신이 가능한 상태를 말한다.
일반적으로 규모에 따른 네트워크 종류는 아래와 같다.

1. PAN (Personal Area, Network) : 가장 작은 규모의 네트워크.
2. LAN (Local Area Network) : 근거리 영역 네트워크, 근거리 통신망을 의미하며 지역적 좁은 범위 내에서 고속 통신이 가능한 통신망.
3. MAN (Metropolitan Area Network) : 대도시 영역 네트워크.
4. WAN (Wide Area Network) : 광대역 네트워크, Wide Area Network 광대역 통신망으로 LAN보다 넓은 지역을 나타내며 지역과 지역, 지방과 지방, 나라와 나라 또는 대륙과 대륙을 연결하는 통신망.

![WAN, LAN](https://user-images.githubusercontent.com/24274424/83945517-17481b00-a846-11ea-8848-d351a8b0dbed.png)

> [출처 : Computer Science Bea](https://sites.google.com/site/computersciencebea/networks/types-of-networks/network-cabling-speeds/networks-protocols/mac-addresses/network-topologies/the-internet/the-www/wan-lan-pan)

## IP(Internet Protocol)주소란?

먼저 IP 주소라는 말에서 IP를 먼저 알아보자. 위키의 내용을 살펴보면, 아래와 같다.

> 인터넷 프로토콜(IP, Internet Protocol)은 송신 호스트와 수신 호스트가 **패킷 교환 네트워크**(패킷 스위칭 네트워크, Packet Switching Network)에서 정보를 주고받는 데 사용하는 정보 위주의 **규약**(프로토콜, Protocol)이며, OSI 네트워크 계층에서 호스트의 주소지정과 패킷 분할 및 조립 기능을 담당한다.

이에 IP 주소는 네트워킹이 가능한 장비를 식별하는 주소이다. 네트워크상에서 통신을 하기 위해서는 몇 가지 통신규약(Protocol)을 따라야 하는데, 그런 조약 중에는 "네트워킹을 하는 장비들에 숫자 12개의 고유한 주소를 주어 그 주소를 통해 서로를 인식하고 통신하도록 하자"라는 의미의 규약이 존재한다.

**하나의 네트워크 안에서 IP들은 네트워크 영역은 같아야 하고, 호스트 IP는 서로 달라야 통신이 가능하다.**

### IPv4 주소

IP version 4의 줄임말이다. IPv4 주소는 오늘날 일반적으로 사용하는 IP 주소이다. 이 주소의 범위는 32bit로 보통 0~255 사이의 10진수 4개를 사용하며 `.`으로 구분하여 나타낸다. 0.0.0.0부터 255.255.255.255까지가 된다. 이론적으로 42억 9,496만7,296개의 IP가 존재한다. 중간의 일부 번호들은 특별한 용도를 위해 예약되어 있다. 예를 들어 127.0.0.1은 localhost(로컬 호스트)로 자기 자신을 가리킨다.

### 예약된 IP 주소

많은 IP 중 특수한 용도로 사용하기 위해서 따로 지정이 되어있는 IP 주소를 예약된 IP 주소라 한다. 이에 해당하는 주소들은 아래와 같다.

- 127.0.0.1 - 루프백(Loopback) 주소, 자기 자신을 가리키는 주소이다.
- 192.168.0.0 - 사설 네트워크
- 224.0.0.0 - 멀티캐스트
- 240.0.0.0 - 미래의 사용될 것을 생각하여 예약된 주소이다.

#### One more thing...

![IPv4](https://user-images.githubusercontent.com/24274424/83947941-24203b00-a855-11ea-9941-f8ba30808376.png)

> [출처 : IT 동아](http://it.donga.com/21854/)

IPv4에서 점으로 각각의 숫자를 구분하고 있는데 각각의 마디를 **옥텟**이다고 한다.

### IPv6 주소

IP address가 처음 생겼을 당시에는 지금처럼 네트워킹이 가능한 장비의 종류가 다양하지 않았으나, 기술이 발전하고 한 사람이 가지는 네트워킹이 가능한 단말기의 수가 1개 이상이 되어버리자 IPv4 주소의 수가 부족해졌다. 그래서 등장한 것이 IPv6이다. 이러한 주소 방법은 약 43억x43억x43억x43억개... 를 만들어 낼 수 있으며, IPv6 주소는 보통 두 자리 16진수 여덟 개를 쓰고 각각을 `:` 기호로 구분한다.

## IP 주소의 클래스(A, B, C class)란?

IP 주소에는 클래스라는 개념이 있다. 클래스의 개념을 알아야 어디까지가 네트워크 영역이고 호스트 영역인지 알 수 있다. 즉, 클래스는 하나의 IP주소에서 네트워크 영역과 호스트 영역을 나누는 방법이자, 약속이다. IP 주소를 3개의 클래스로 나누는 기준은 **네트워크 크기에 따른 구분**이라 생각하면 된다.

> **하나의 네트워크 안에서 IP들은 네트워크 영역은 같아야 하고, 호스트 IP는 서로 달라야 통신이 가능하다.**

하나의 네트워크에서 몇 개의 호스트 IP까지 가질 수 있는가에 따라서 클래스를 나눌 수 있다. 즉, 네트워크 범위가 커질수록 호스트 주소 범위는 작아지는 반비례 관계이다.

IP 주소 클래스는 총 5개가 있다(A, B, C, D, E). 하지만 보통 A, B, C 3개 정도만 알고 있으면 충분하다. (나머지 D, E 클래스는 멀티캐스트용, 연구용으로 사용한다)

예를 들어 `203.240.100.1`에서 `203.240.100`은 네트워크 영역이고 `1`은 호스트 영역이다.

![IP 클래스](https://user-images.githubusercontent.com/24274424/83946405-93912d00-a84b-11ea-89c3-584763a6ff7a.png)

> 출처 한국인터넷정보센터

D Class 네트워크는 멀티캐스트를 위해서 존재하는 네트워크라고 했는데, 여기서 멀티캐스트라는 것은 한 번의 메시지 송신으로 특정 네트워크 안에 있는 두 개 이상의 컴퓨터에 전송할 수 있도록 하는 기술이다.

### A 클래스

먼저 A 클래스는 하나의 네트워크가 가질 수 있는 호스트 주소가 제일 많은 클래스이다. IP 주소를 32자리 2진수로 표현했을 때, 맨 앞자리 수가 항상 0인 경우 바로 A 클래스이다. 즉 `0xxx xxxx. xxxx xxxx. xxxx xxxx. xxxx xxxx`와 같이 되어있다. `x`는 0 또는 1이다. 이 범위를 10진수로 표현하면 `0.0.0.0` ~ `127.255.255.255` 이다.

그런데 A 클래스에서 네트워트 주소는 `1.0.0.0` ~ `126.0.0.0` 까지로 규정되어 있다. 그래서 IP주소 중 맨 앞자리 수가 1부터 126으로 시작하는 네트워크는 A 클래스라고 생각하면 된다.

그리고 호스트 주소가 가질 수 있는 갯수는 `(2^24) - 2`개 이다.

**-2 이유는 모두가 1인경우 브로드캐스트 주소로 사용하고 모두 0인 경우엔 네트워크 주소로 사용하기 때문이다.**

> 브로드캐스트 주소 : 네트워크 망에서 할당할 수 있는 IP 주소 중 가장 큰 값

예를 들어 A클래스로 `15.0.0.0` 네트워크 주소를 할당 받았을 때, 가능한 호스트 IP를 10진수로 나타내면 `15.0.0.0` ~ `15.255.255.255` 이다. 하지만 여기서 `15.0.0.0`은 네트워크 주소를 표현하기 위해서 호스트 주소로 사용하면 안된다. 또, `15.255.255.255` 역시 브로드캐스트 주소로 사용하기 때문에 호스트 IP로 사용하면 안된다. 따라서 `(2^24) - 2`를 해준다.

### B 클래스

B 클래스의 IP주소를 32자리 2진수로 표현했을때, 맨 앞자리 수는 항상 `10`이여야 한다. 즉 `10xx xxxx. xxxx xxxx. xxxx xxxx. xxxx xxxx` 이 범위를 10진수로 표현하면 `128.0.0.0` ~ `191.255.255.255` 이다.

네트워크 주소 범위는 `10xx xxxx. xxxx xxxx` 에서 x들이 가질 수 있는 경우의 수, `2^14` 개 이고, 호스트 주소 범위는 `xxxx xxxx. xxxx xxxx`에서 x들의 경우의 수인 `(2^16) - 2`개 이다.

### C 클래스

C 클래스의 IP주소는 2진수로 표현했을 때 반드시 `110`으로 시작한다. 즉 `110x xxxx. xxxx xxxx. xxxx xxxx. xxxx xxxx`이다. 이 범위를 10진수로 표현하면 `192.0.0.0` ~ `223.255.255.255`

네트워크 범위는 `110x xxxx. xxxx xxxx. xxxx xxxx`에서 x들이 가질 수 있는 경우의 수, `2^21`개 이고, 호스트 주소 범위는 `xxxx xxxx`에서 x들이 가질 수 있는 경우의 수, `(2^8) - 2` 개 이다.

### 간단한 문제로 확인하기

각각의 클래스, 네트워크 부분, 호스트 부분은?

#### 문제. 10.3.4.3

<details>  
<summary> 정답 </summary>

- 클래스 : A
- 네트워크 부분 : 10.0.0.0
- 호스트 부분 : 3.4.3

</details>

#### 문제2. 132.12.11.4

<details>
  
<summary> 정답 </summary>

- 클래스 : B
- 네트워크 부분 : 132.12.0.0
- 호스트 부분 : 11.4

</details>

#### 문제3. 203.10.1.1

<details>
  
<summary> 정답 </summary>

- 클래스 : C
- 네트워크 부분 : 203.10.1.0
- 호스트 부분 : 1

</details>

#### 문제4. 192.12.100.2

<details>
  
<summary> 정답 </summary>

- 클래스 : C
- 네트워크 부분 : 192.12.100.0
- 호스트 부분 : 2

</details>

#### 문제5. 130.11.4.1

<details>
  
<summary> 정답 </summary>

- 클래스 : B
- 네트워크 부분 : 130.11.0.0
- 호스트 부분 : 4.1

</details>

#### 문제6. 261.12.4.1

<details>
  
<summary> 정답 </summary>

이런 IP 주소는 없음

</details>

---

#### Reference

- [IP address 란?](https://velog.io/@hidaehyunlee/IP-address%EB%9E%80)
- [[Network]네트워크 클래스(Network Class)](https://hyoje420.tistory.com/31)
- [[Network] IP주소 클래스(A,B,C class)란?](https://limkydev.tistory.com/168)
- [IP - 나무위키](https://namu.wiki/w/IP)
