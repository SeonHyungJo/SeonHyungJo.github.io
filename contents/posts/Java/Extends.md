---
path: "/content/extends"
author: "snyung"
date: "2018-05-23"
title: "[Java] 상속에 관하여"
tags: ["Java"]
category: "post"
---

1. **public** : 모든 접근을 허용한다.
2. **protected** : 같은 패키지(폴더)에 있는 객체와 상속관계의 객체들만 허용한다. 
3. **default** : 같은 패키지(폴더)에 있는 객체들만 허용한다.
4. **private** : 현재 객체 내에서만 허용한다.

> 부모보다는 넓게 사용하는 것은 가능하나 좁게는 사용할 수 없다.

위의 조건이 갖추어 진다면 범위를 넓혀서 사용하는 것은 가능하다.

### 최상위 부모 Animal 생성
  
```java
public class Animal {
  String name;
  public void setName(String name) {
    this.name = name;
  }
}
```

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
    dog.sleep();   
  }
}
```

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

- 여기서 Dog는 Animal을 상속 받아서 사용하고 있다.  
- 거기에 `sleep`이라는 메소드를 추가해서 사용한다. 
- `Dog.main`을 살펴보면 따로 메소드를 만들지 않더라도 `setName`을 사용할 수 있는 것을 볼 수있다.
- 이것이 상속을 받아서 사용한다고 한다.

> **public > protected > default > private**

HouseDog를 보게되면 HouseDog는 Animal을 상속받은 Dog를 상속받은 것으로 상위 부모의 것을 모두 사용할 수 있다.

오버라이드를 할때는 부모의 메소드명과 같게 하면 덮어씌운다. Dog와 HouseDog만 비교를 한다면 Dog에서는 default를 주고 있지만 HouseDog에서는 Protected를 주고 있다. 

이처럼 상위의 메소드를 범위를 넓혀서 사용할 수 있다. **좁게는 사용이 불가하다**.

생성자 객체를 생성할 때 항상 실행되는 것으로, 객체를 초기화해주기 위해 맨 처음 실행되는 메소드이다.

우리가 기본적으로 인스턴스를 생성할 때 사용하는 것이 (new 클래스명) 생성자이다. 이렇게 인스턴스를 만들 때 생성과 동시에 실행되는 메소드가 바로 생성자이다.

즉, 생성자가 없다면 실행을 안한다는 거지. 생성자 역시 오버로드를 할 수 있다. 그러나 기본적으로 매개변수가 없는 것부터 만들어 주어야한다.

## 자식에서 부모의 생성자를 사용할 때

```java
`super()`; // 이런식으로 사용이 가능하다. 또한 매개변수가 있는 생성자를 사용한다면
`super("puppy")` // 이런식으로도 사용이 가능하다는 것이다.
```

당연히 부모의 생성자가 없다면 사용이 불가능한다. 또한 `super()`를 사용하지 않더라도 자동으로 생성자라고 인식을 해서 부모의 상위 생성자를 실행한다.

자식에서는 생성자를 사용하고 싶으면 부모에 생성자가 있어야 한다.(오버라이드는 가능하지만 생성하는건 안됨 그러나 에러는 안남)