---
path: "/content/image-zoomer"
author: "snyung"
date: "2018-01-23"
title: "Jquery(제이쿼리) 플러그인 - 이미지 확대"
tags: ["jquery"]
category: "post"
---

제이쿼리는 다양한 플러그인을 제공하고 있습니다. 저 역시 많은 것을 사용해보고 싶으나 그 종류가 너무나도 많아서 몰랐던 것을 알게 되면 연습해보는 식으로 해보고 있습니다.
<br/>

이번 이미지 확대는 [한큐에 자바](http://cafe.naver.com/javahanq/4748) 라는 카페에 올라온 내용 토대로 진행하였다고 말씀드리고 싶네요.
<br/>

[여러가지 제이쿼리 플러그인](https://www.jqueryscript.net/zoom/) 가 있습니다. 이 중 자신이 원하는 맘에드는 플러그인을 선택해서 데모를 체험해보고 다운받을 것을 추천합니다. 

[제가 사용한 플러그인](https://www.jqueryscript.net/zoom/jQuery-Plugin-For-Image-Zoom-On-Hover-picZoomer.html) 은 클릭해서 들어가면 됩니다.
<br/>

## 기본 파일

기본 파일은 3가지만 있으면 됩니다. 하지만 다운을 받으면 데모 페이지가 제공이 되고 있어서 참고 하시면 도움이 되실거라 생각합니다.
<br/>

- **jquery-picZoomer.css**
- **jquery.picZoomer.js**
- 이미지들(확대용, 돋보기)

<br/>

## 스프링에 적용하기

당연히 CSS는 CSS폴더에 JS는 JS폴더에 넣고 이미지는 알아서 하셔도 될 것 같습니다.

[제 소스](https://github.com/SeonHyungJo/My_Study/tree/master/Jquery/Practise_jquery_imageZoomer)
<br/>

## 자바스크립트 작성해보기

기본적으로 자신이 원하는 자리에 원하는 클래스명을 넣어주고, `document.ready` 로 스크립트를 실행해줍니다.

```js
  $(document).ready(function(){
    $('.picZoomer').picZoomer();
  });
```

<br/>

### 커스터마이즈

`jquery.picZoomer.js` 파일을 열어보면, 기본 `default` 설정이 되어있습니다.

<br/>

```js
  $.fn.picZoomer.defaults = {
    picWidth: 320,
    picHeight: 320,
    scale: 2.5,
    zoomerPosition: {top: '0', left: '350px'}
    /*,
    zoomWidth: 320,
    zoomHeight: 320
    */
  };
```

이것을 이용하면 자신만의 설정을 만들수 있습니다.

```js
  $(document).ready(function(){

$('.picZoomer').picZoomer({
      picWidth: 500,
      picHeight: 500,
      scale: 7,
      zoomerPosition: {
      top: '0',
      left: '500px',
      },
    });
  });
```

<br/>

## jsp 파일

소스파일 공개합니다. (트둥이 사진들입니다.)

```html
<div class="picZoomer">
  <img alt="" src="https://images7.alphacoders.com/848/thumb-1920-848920.png">
</div>
<ul class="piclist">
  <li><img alt="" src="https://images7.alphacoders.com/848/thumb-1920-848920.png"></li>
  <li><img alt="" src="https://images6.alphacoders.com/858/thumb-1920-858060.jpg"></li>
  <li><img alt="" src="https://images2.alphacoders.com/858/thumb-1920-858066.jpg"></li>
  <li><img alt="" src="https://images2.alphacoders.com/858/thumb-1920-858067.jpg"></li>
  <li><img alt="" src="https://images8.alphacoders.com/858/thumb-1920-858065.jpg"></li>
  <li><img alt="" src="https://images6.alphacoders.com/858/thumb-1920-858060.jpg"></li>
</ul>
```

유용하셨다면 [GitHub](https://github.com/SeonHyungJo/SeonHyungJo.github.io) 에 :star:를 살짝 눌러주시면 감사하겠습니다.
