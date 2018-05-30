---
layout: post
title:  "Java Call by Value와 Call by Reference"
date:   2018-05-30
excerpt: "Java Call by Value와 Call by Reference의 차이"
tag:
- spring
- java
- extends
- Call by Value
- Call by Reference
comments: false

---

**Call by Value와 Call by Reference의 차이**
===

## <b>Call by Value (값에 의한 호출)</b>

- Call by Value는 <b>가장 일반적인 함수 호출형태로 값을 복사하는 것</b> 이다.

```

void swap(int a, int b) { 
    int temp = a;
    a = b;
    b = temp;
}

int a1 = 10; 
int a2 = 20;
swap(a1, a2); 
cout << "a1: " << a1 << " a2: " << a2 << endl;

```

---

## <b>Call by Reference (참조의 의한 호출)</b>

- 간단하게 한줄로 요약하자면 <b>변수의 주소를 전달하는 것</b> 이다. 

```

void swap(int *a, int *b) { 
    int temp = *a;
    *a = *b;
    *b = temp;
} 

int a1 = 10; 
int a2 = 20;
swap(&a1, &a2); //주소값을 넘김
cout << "a1: " << a1 << " a2: " << a2 << endl;

```

---

## java는 call by reference가 아니다.

- 결론부터 말하자면 java는 항상 call by value이다. 흔히 java의 오해를 살 수 있는 부분을 살펴보자.

```

public class CallByValue { 
    public static void main(String[] args) {
        Person p = new Person("wonwoo");
        System.out.println("p.name: " + p.name);
        callByValue(p);
        System.out.println("p.name: " + p.name);
    } 
    public static void callByValue(Person p) {
        p.name = "kevin";
    }
} 

class Person {
    String name; 
    public Person(String name) { 
        this.name = name;
    }
}

```

> 위의 내용을 call by value로

```

public class CallByValue { 
    public static void main(String[] args) {
        Person p = new Person("wonwoo");
        System.out.println("p.name: " + p.name);
        callByValue(p);
        System.out.println("p.name: " + p.name);
    }
    public static void callByValue(Person p) {
        p = new Person("kevin");
    }
} 

class Person {
    String name; 
    public Person(String name) { 
        this.name = name;
    }
}

```

> 위에서 내용이 call by reference에 의한 변경이다 이게 되야 call by reference라는 것이다.