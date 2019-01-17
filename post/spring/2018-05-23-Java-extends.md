---
path: "/post/spring/extends"
author: "sseon"
date: "2018-05-23"
title: "Java 상속에 관하여"
tags: ["spring", "extends"]
category: "post"
---

1. public      : 모든 접근을 허용
2. protected : 같은 패키지(폴더)에 있는 객체와 상속관계의 객체들만 허용iii) 
3. default    : 같은 패키지(폴더)에 있는 객체들만 허용iv) 
4. private    : 현재 객체 내에서만 허용

<br/>

> 부모보다는 넓게 사용하는 것은 가능하나 좁게는 사용할 수 없다.

<br/>

## 위의 조건이 갖추어 진다면
  
- 범위를 넓혀서 사용하는 것은 가능하다.

<br/>

### 3 최상위 부모 Animal생성
  
```java
public class Animal {
  String name;
  public void setName(String name) {
    this.name = name;
  }
}
```

<br/>

### 상위 부모 Dog생성

``` java
  public class Dog extends Animal {    
    void sleep() {        
      System.out.println(this.name + " zzz");    
    }    

    public static void main(String[] args) {         
      Dog dog = new Dog();            
      dog.setName("poppy");            
      System.out.println(dog.name);            
      dog.sleep();    }}
```

<br/>

### 자식 HouseDog생성

```java
  public class HouseDog extends Dog {        
    protected void sleep() {        
      System.out.println(this.name+" zzz in house");    
    }    
    
    public static void main(String[] args) {        
      HouseDog houseDog = new HouseDog();        houseDog.setName("happy");        
      houseDog.sleep();    
      }
    }
```    

<br/>

- 여기서 Dog는 Animal을 상속 받아서 사용하고 있다.  
- 거기에 sleep이라는 메소드를 추가해서 사용한다. 
- Dog.main을 살펴보면 따로 메소드를 만들지 않더라도 setName을 사용할 수 있는 것을 볼 수있다.
- 이것이 상속을 받아서 사용한다고 한다.

<br/>

> ****public > protected > default > private

<br/>

이번에는 HouseDog를 보자 하우스 도그를 엄연히 따지자면 Animal을 상속받은 Dog를 상속받은 것으로 상위 부모의 것을 모두 사용할 수 있다.
<br/>

오버라이드를 할때는 부모의 메소드의 명과 같게 하면 덮어 씌울수 있다.도그와 하우스도그만 비교를 한다면 도그에서는 default를 주고 있지만 HouseDog에서는 Protected를 주고 있다. 
<br/>

이처럼 상위의 메소드를 범위를 넓혀서 사용할 수 있다. 그러나 좁게는 사용이 불가하다.
<br/>

생성자(이게 생각보다 재밌는 아이였네)객체를 생성할 때 항상 실행되는 것으로, 객체를 초기화해주기 위해 맨 처음 실행되는 메소드이다.
<br/>

우리가 기본적으로 인스턴스를 생성할 때 사용하는 것이 바로 (new 클래스명) 이런식으로 사용하는 것이다.이렇게 인스턴스를 만들때 생성과 동시에 실행되는 메소드가 바로 생성자이다.
<br/>

즉, 생성자가 없다면 실행을 안한다는 거지
생성자 역시 오버로드를 할 수있다. 그러나 기본적으로 매개변수가 없는 것 부터 만들어 주어야한다.
<br/>

## 자식에서 부모의 생성자를 사용할 때

- super(); //요런식으로 사용이 가능 또한 매개변수가 있는 생성자를 사용한다 치면
- super("puppy") //요런식으로도 사용이 가능하다는 것!!!

<br/>

그러나 당연한 이야기 이지만 부모의 생성자가 없다면 사용이 불가능한다.
<br/>

또한 super()를 사용하지 않더라도 자동으로 생성자라고 인식을 해서 부모의 상위 생성자를 실행함
<br/>

자식에서는 생성자를 사용하고 싶으면 부모에 생성자가 있어야 한다.
<br/>

(오버라이드는 가능하지만 생성하는건 안됨 그러나 에러는 안남)