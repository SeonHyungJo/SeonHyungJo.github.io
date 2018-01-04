---
layout: post
title:  "자바스크립트 정리 2"
date:   2018-01-02
excerpt: "JavaScript_Array 메소드 살펴보기(map, filter, reduce)"
tag:
- javascript
- Map
- Filter
- Reduce
comments: true
---

# **JavaScript_Array 메소드 살펴보기(map, filter, reduce)**

## 자바스크립트를 하면서

자바스크립트는 쉬운 언어인거 같으면서도 그렇지 않다는게 함정이다. 단순한 문법들은 사람들이 이미 알고 사용하고 있지만 그게 전부가 아닌 것 같다는 생각을 요즘에 많이 하고 있다. 그중에도 오늘은 Array의 메소드들 중에서 Map, Filter, Reduce에 대해서 제대로 공부를 하고 정리를 하는 시간을 가지려고 한다. 다만 나를 위해서...하는 겁니다.

---
### 전역객체
#### 추후 추가예정


### 1. map()
 - MDN : map() 메소드는 배열 내의 모든 요소 각각에 대하여  제공된 함수(callback)를 호출하고, 그 결과를 모아서, 새로운 배열을 반환합니다.
    ```
    //기본적인 형태
    arr.map(callback[, thisArg])
    ```

- 사용예제
  ```
  //배열을 하나 만들어줍니다
  var array = [1,2,3,4,5];

  //이제 여기에 .map()을 이용하여 간단한 콜백함수를 만듭니다.

  array.map(function(n){return n*2;});
  array.map(n => n*2);
  ```
  - 현재 위아래 메소드사용을 결과값이 똑같습니다.
  - 아래의 문법은 축약형입니다. (인자값 => 결과값);
   - es6에 적용된 문법으로 Arrow Function이라고 부릅니다.
   - [설명이 잘되어있는 블로그](http://webframeworks.kr/tutorials/translate/arrow-function/)
    - [MDN : 화살표함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)
  - But **여기서 사용한 map()메소드의 결과값은 출력이되지만 array변수에는 담기지 않습니다.**
    - 임시객체에 의한 메모리소멸로 인해 담기는 것이 아닌 보여주고 사라진다.
---
 - 이번에는 다르게 사용해보고 싶다.
 - 함수를 미리선언을 하고 map()를 사용해서 결과값을 가져오도록하고싶다.
   ```
   //전체 배열에 +1을 하는 함수 생성
   var add = function(n){
      return n+1;
   }
   //전체 배열에 -1을 하는 함수 생성
   var min = function(n){
      return n-1;
   }

   //기존에 가지고 있던 배열을 가지고 실행
   array.map(n => add(n));
   array.map(add);//위의 문법과 같음
   array.map(n => min(n));
   array.map(min);//위의 문법과 같음

   **실행결과**
   (5) [2, 3, 4, 5, 6]
   (5) [0, 1, 2, 3, 4]
   ```
  - 이렇게 축약형으로 진행을 하여 선언해놓은 함수를 가져와서 재사용을 할 수 있다.


### 2. reduce()
 - MDN : reduce() 메서드는 왼쪽에서 오른쪽으로 이동하며 배열의 각 요소마다 누적 계산값과 함께 함수를 적용해 하나의 값으로 줄입니다.
 - 위의 설명대로 왼쪽에서 오른쪽으로 이동하면서 요소 하나하나를 계산을 하면서 나가 결과값으로 1개가 나온다.
   ```
   //기본적인 형태
   arr.reduce(callback[, initialValue])
   ```

 - 사용예제
   ```
   //기존에 사용했던 배열을 가지고
   var array = [1,2,3,4,5];
   //축약형으로 진행
   array.reduce((acc, cur) => acc + cur);

   //실행결과
   15
   ```
   - reduce() 메소드로 2개의 인자명을 정해서 => 이후에 콜백함수를 만들어주고 있다.
   - 차례대로 계산을 하게 되면...
      1. 1+2 => 3
      2. 3+3 => 6
      3. 6+4 => 10
      4. 10+5 => 15
   - 결국 최종값으로 15가 나오게 되는 것이다.

#### 받을 수 있는 인자값
  1. accumulator - 위의 경우, 1번째->결과값->결과값...
  2. currentValue - 위의 경우, 2번째부터 시작
  3. currentIndex - 현재 인덱스가 출력된다.
  4. array - 현재 배열값들이 출력

  - 예외
    ```
    array.reduce((acc, cur) => acc + cur, 10);
    ```
    - 여기서 추가된 것이 있다면... 10이 추가 되었다.
    - 10은 초기값으로 지정을 해주는것으로
    - 처음 acc에 **10**이 들어가게 되고 cur에는 **첫번째 인자** 가 들어가게 되는것이다.

 - 다른예제
    ```
      //array의 인덱스 출력하기
      array.reduce((acc, cur, index) => console.log(index));

      //결과 출력
      1
      2
      3
      4
      5

      //array의 배열 출력하기
      array.reduce((acc, cur, index, curArr) => console.log(curArr));

      //결과 출력
      (5) [1, 2, 3, 4, 5]
      (5) [1, 2, 3, 4, 5]
      (5) [1, 2, 3, 4, 5]
      (5) [1, 2, 3, 4, 5]
    ```
     - 다양한 활용이 가능할 것으로 생각이 된다.
     - map().reduce()로 사용하여 map메소드 진행 후 reduce메소드 진행 가능
     - 사용예제
     ```
      var array = [1,2,3,4,5];
      array.map(n => n+5).reduce((acc, cur) => acc+cur) ;

      //실행결과
      40
     ```
### 3. filter()
 - 말그래도 필터
 - MDN : filter() 메소드는 제공된 함수로 구현된 테스트를 통과하는 모든 요소가 있는 새로운 배열을 만듭니다.
 - if 같은 역할을 한다.
 - 반환값은 요소값으로 진행(if는 boolean으로 진행)
   ```
    //기본적인 형태
    arr.filter(callback[, thisArg])
   ```
  - 사용예제
    ```
      var array = [1,2,3,4,5]
      array.filter(n => n>3);

      //결과 출력
      (2) [4, 5]
    ```
  - 객체를 넘기는 사용예제
    ```
      //id가 숫자인 경우만 출력
      //배열 선언
      var arr = [
        { id: 15 },
        { id: -1 },
        { id: 0 },
        { id: 3 },
        { id: 12.2 },
        { },
        { id: null },
        { id: NaN },
        { id: 'undefined' }
      ];


      var invalidEntries = 0;
      //함수 선언
      function filterByID(obj) {
        if ('id' in obj && typeof(obj.id) === 'number' &&  !isNaN(obj.id)) {
            return true;
          } else {
            invalidEntries++;
            return false;
        }
      }

      //filter진행
      var arrByID = arr.filter(filterByID);

      console.log('Filtered Array\n', arrByID);
      // Filtered Array
      // [{ id: 15 }, { id: -1 }, { id: 0 }, { id: 3 }, { id: 12.2 }]

      console.log('Number of Invalid Entries = ', invalidEntries);
    ```
# 끝.

## 참고 자료
 - [MDN: 자바스크립트](https://developer.mozilla.org/ko/docs/Web/JavaScript)
 - [한큐에 자바 : 일일코딩](http://cafe.naver.com/javahanq)
