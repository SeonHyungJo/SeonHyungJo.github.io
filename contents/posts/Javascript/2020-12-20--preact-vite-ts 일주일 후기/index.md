---
path: "/content/2020-12-20--Preact Vite를 아시나요"
author: "snyung"
date: "2020-12-20"
title: Preact, Vite를 아시나요?
tags: [preact,vite]
category: "post"
---

## 도입

항상 새로운 프로젝트에서는 새로운 Spec으로 만들고 싶은게 개발자들(?) 마음이다.

평소 회사에서는 Vue만 사용해서 프로젝트를 진행하였으나, 개인 프로젝트로는 React로만 했던 경험을 살려 새로운 프로젝트는 React와 관련된 기술로 진행하고 싶었다.

회사를 오가며 보던 글 중에서 Preact에 대해서 설명한 글을 봤던 것을 기억하여 이번에는 Preact로 진행하자는 생각이 들었다.

## 사전 조사

Preact는 React와 동일한 최신 API로 사용 가능하며 3KB밖에 안된다고 한다.

Preact가 React와 동일한 문법을 가지고 사용할 수 있다고 하지만 모든 라이브러리나 Spec은 지원할 수 없을 거라는 생각을 하고 있었다.

먼저 조사를 했을 때 React 관련 문법은 `preact/compat`에서 지원해주고 있었고, Hooks는 `preact/hooks`를 가지고 모두 가능했다.

간단한 사전 조사를 마치고 나머지 외적인 것을 확인할 필요가 있었다.

내가 사용할 react-router, redux에 대해 고민했다.

### react-router

preact-router 라이브러리는 react-router와 동일한 기능을 제공한다고 되어있지만, 마지막 커밋이 오래되어 테스트 해보고 결정하기로 했다. 

테스트 결과 제대로 작동하지 않아 여러 가지를 찾던 중 새로운 라이브러리인 **wouter**를 찾게 되었다.

wouter는 react-router와 동일한 형태를 제공하며 추가로 **React, Preact에서 지원**이 가능했다.

이는 Preact로 진행하다가 React로 전환해도 문제가 없는 것과 동일하다(물론 추가 작업은 있을 것이다).

wouter를 이용해서 쉽게 페이지를 구현할 수 있었다.

### Redux

React를 사용하시는 분은 Redux 또는 MobX를 많이 사용하실 것으로 생각된다.

물론 Preact에서도 Redux와 MobX를 사용할 수 있는 라이브러리도 있다.

그러나 이번에는 다른 방법으로 사용하고 싶었다.

> Recoil도 대상이었으나 지원이 불가하여 포기하였다.

최근 Redux의 필요성을 고민하던 중 React의 Context와 Reducer로 가능하다는 생각하고 있었다. 정말 많은 블로그를 읽었지만 하나씩 아쉬운 부분이 있었으나 최근 발견한 하나의 블로그에서 영감을 받았다.

해당 블로그에 대해서는 아래에 추가하였다.

## 기술 스펙

사전 조사를 통해 메인 기술은 정했다. Preact다.

Preact를 빌드하기 위한 빌드 툴이 필요했다. 물론 Webpack, Rollup등과 같은 많은 번들러, 빌드도구에서도 가능하지만 생각나는 한 가지가 있었다.

평소 Vue로 개발하다 보니 작년부터 Vue3가 나오기를 기다리고 있었다. 

그러나 Evan You가 바쁜지 실제로 나오는 데 시간이 걸리게 되었다. 기다리는 도중 새로운 Repo를 알게 되었다. **Vite** 였다.

### Vite

Vite는 Vue3에 적용되기 위해서 만들어진 Build Tool이다.

번들하는 과정을 없애면서 개발서버를 띄우는 시간을 단축했다고 한다. 또한 React, Preact, Vue를 지원하며, TS와 SASS 같은 기본 라이브러리도 설치만으로 적용 가능하다.

위에서 언급했듯이 Vite는 번들과정이 없다고 말하는데 이는 Modern 브라우저에서 사용할 수 있는 Script Tag의 `type=module`을 사용함으로써 가능하다고 한다. 그러나 **이는 IE와 같은 브라우저에서는 사용하지 못하여 추가적인 작업이 필요하게 된다.**

Vite는 CLI를 제공하고 다양한 template이 있는데 그 중 `preact-ts` 템플릿으로 preact와 Typescript를 사용하고 싶은 분들은 쉽게 구성이 가능하다.

```cmd
npx create-vite-app <project-name> --template preact-ts
```

위와 같은 Spec을 쓰게되면 구글에서 나오는 자료도 없고 빠른 개발이 안 될 것이라고 생각하시는 분들이 계실 것으로 생각된다. 

그러나 우리가 개발한다는 것은 새로운 것을 적용해보고 제품을 만들어서 사람들이 사용하는 것을 보았을 때 즐거움을 느끼는 것을 1차 기쁨이라고 생각하며, 개발자로서는 새로운 기술을 경험해보고 알아가는 것을 2차 기쁨이라고 생각한다. 

언제까지 인기 있는 기술, 많이 사용하는 기술만 사용할 수 없다. 시대는 변하고 언젠가는 오래된 기술이 된다. 그렇다면 새로운 기술을 사용해보며 기존의 기술과 동일한 능력을 낼 수 있는 방법을 찾고 새로운 길을 만들어 나만의 능력을 쌓아가는 것이 어떤 기술을 새로 맞이하더라도 대응할 수 있는 좋은 방법이라고 생각한다.

같이 새로운 기술, 새로운 방법을 익히도록 노력하자.

> [preact-vite__discussions](https://github.com/SeonHyungJo/preact-vite__discussions)

위의 레포는 preact나 vite에 대한 궁금한 내용을 같이 찾으면서 해결하고 싶어서 만든 레포다. 질문을 공유하고 해결했으면 좋겠다.

## 일주일간의 노력

> 마지막으로 일주일간 사용해보면서 마주한 문제를 해결한 내용을 적어보았다.

모든 개발은 React와 동일하게 할 수 있다. React에서 사용하는 Hooks는 `preact/hooks`로 이외의 기본 기능들은 `preact/compat`으로 가능하다.

이외의 많은 라이브러리은 Preact의 Maintainer 분들이 만들어 주신 라이브러리도 대부분 대체가 가능하다. 

그중에서 일주일간 마주한 3가지 고비를 살펴보자.

이는 Preact가 많이 불편하다를 보고 싶은 것이 아니라 이런 식으로 해결이 가능하다. 라는 걸 같이 공유하고 싶었다.

### 1. react-router

SPA로 개발을 하더라도 다양한 페이지로 구분하여 개발하고 이동이 가능해야 한다. 그 기능을 해주는 것이 React에서는 `react-router`다.

Preact에서도 `preact-router`라는 라이브러리가 있으나 제대로 작동하지 않았다.

이에 다른 라이브러리를 찾아보거나 직접 구현하는 방법밖에 없었다.

#### Wouter

여러가지를 서칭하던 중 찾은 라이브러리가 **[wouter](https://github.com/molefrog/wouter) 다.**

wouter는 **react-router와 동일한 이름의 API를 사용할 수 있으며 Hooks를 지원**했다. 또한 Preact뿐만 아니라 React도 지원했다.

또한 wouter에서 내세우고 있는 장점으로 최대 1.3KB밖에 안 되는 용량을 가진다고 한다.

이를 사용하여 react-router와 동일한 문법으로 구현할 수 있었다.

### 2. IE 11 지원

Vite에서는 IE를 지원하도록 빌드해주지 않는다.

Vite를 지원하는 Vue3에서도 마참가지다. 이건 개발자 입장에서 언제든 환영이지만, 기업입장에서는 거의 불가하다 특히 우리나라에서는.

이에 Vite **[Issue#779](https://github.com/vitejs/vite/issues/779)**에서는 IE11 지원 관련해서 많은 이야기가 오고 갔다.

결국 **[vite-plugin-legacy](https://github.com/alloc/vite-plugin-legacy)** 를 사용하는 것이 해결방안으로, 한 개발자분이 해당 플러그인을 업데이트 해주시면서 끝이나는 듯했다.

그러나 실제로 `vite.config.js`에 추가하여 빌드하게 되면, `*.legacy.js`파일이 추가로 만들어지고 `index.html`에는 추가되지 않는 것으로 보인다.

이에 postbuild 시점에 index.html에 추가하는 로직을 추가함으로써 해결하였다(자세한 내용이 궁금하면 질문 남겨주세요.).

Modern 브라우저에서는 script tag type으로 module을 지원한다. 그러나 IE와 같은 이전 브라우저들은 지원을 하지않아 Modern 브라우저들에 nomodule이라는 attribute를 추가하였다. 

script tag에 nomodule을 추가해주면 module type을 지원하지 않는 브라우저에서는 해당 script가 작동하게 되는 것이다.

이를 사용하여 legacy파일을 추가해주면 된다.

```html
<script nomodule src="/_asset/index.xxx.legacy.js">
```

이로써 IE에서는 `type=module`이 있는 태그를 보는 것이 아닌 `nomodule`의 주소를 보게 되는 것이다.

### 3. Store 관리

현재 React 진영에서 가장 많이 사용되는 store 관리 라이브러리는 Redux 또는 MobX라고 생각된다.

위와 같은 도구를 사용하면 개발자에겐 명확하게 좋다고 생각이 들지만, 이전부터 들었던 생각은 Context + Reducer를 사용해서 직접 만들어보고 싶었다. 

비록 React의 문법을 사용하게 되어 종속적이라고 할 수 있지만, 새로운 방법으로 스스로 만들어서 관리하고 싶은 측면도 있었다.

관련 기술에 대해 많은 고민하면서 설계를 어떻게 해야 하나 고민하던 중 아래의 글이 영감을 주었다.

> [Hooks + Context, not React + Redux
 읽어보기](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/)

위의 블로그에서 나오는 방법을 살짝 변형하여 Multi Store로 구성하였으며, 필요한 페이지별로 Reducer들을 Combine(합쳐서) 하여 사용하게 되면 관리에 용이할 것으로 생각되었다.

또한, Reducer로 만들어진 state와 dispath를 별도의 Context로 관리하여 필요한 컴포넌트에서만 사용할 수 있도록 분리작업도 해주었다.

해당 관련된 내용이 궁금하시면 아래의 Repository에 질문남겨주세요. 같이 공부하면서 배우는 걸 좋아합니다.

> [질문 남겨주세요.](https://github.com/SeonHyungJo/preact-vite__discussions/discussions)


#### Reference

- [Preact 공식사이트](https://preactjs.com/)
- [Vite Github](https://github.com/vitejs/vite)
- [create-vite-app](https://github.com/vitejs/create-vite-app)
- [Use Hooks + Context, not React + Redux
](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/)
- [질문 남겨주세요.](https://github.com/SeonHyungJo/preact-vite__discussions/discussions)
- [wouter](https://github.com/molefrog/wouter)
