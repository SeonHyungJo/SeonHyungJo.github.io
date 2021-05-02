---
path: "/content/2021-04-25--SWR-useMutation"
author: "snyung"
date: "2021-04-24"
title: SWR | react-query useMutation처럼 사용하기
tags: [SWR, Hook]
category: "post"
---

![SWR_useMutation](../../assets/swr/SWR_react_query_useMutation.png)

이전 [SWR](/content/2021-01-09--SWR) 관련된 글을 작성하고 지켜본 결과 최근 **SWR**, **react-query**와 같은 라이브러리의 관심이 커지고 있다는 것을 알게 되었다.

오늘은 SWR을 사용하면서 겪은 Trouble Shooting과 어떻게 해결했는지에 살펴보자. 

항상 정답은 존재하지 않는다고 생각한다. 지금은 이 방식이 정답이라고 생각하더라도 시간이 지나면 아닌 경우가 많다. **현재 정답이라고 생각하는 방식을 살펴보자.**

> **SWR에 대한 전반적인 설명** => [Redux 말고 SWR](/content/2021-01-09--SWR)

## 아쉬운 점

확실히 Redux를 사용하지 않고 SWR을 사용하면서 컴포넌트 단위의 개발에 집중할 수 있게 되었다. 그러나 아직 아쉬움이 남는 부분들이 있다.

[이전 글]((/content/2021-01-09--SWR)) 마지막에 `한 가지 아쉬운 것은 Fetching 이외의 수정, 삭제는 따로 개발해서 사용해야한다.` 라고 하였다. 이후에도 SWR에서는 별도의 생성, 수정, 삭제와 관련된 function이 생기지 않았다.

이 부분이 useMutation을 지원하는 react-query 라이브러리와 비교하여 가장 아쉬운 부분이다. 먼저 SWR 공식 사이트의 `useSWR()`과 `mutate()`를 사용한 예제를 살펴보면 알 수 있다.

```js
// SWR 공식 사이트 예제
import useSWR, { mutate } from 'swr'

function Profile () {
  const { data } = useSWR('/api/user', fetcher)

  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button onClick={async () => {
        // highlight-start
        const newName = data.name.toUpperCase()
        // 우선적으로 UI 데이터를 업데이트 한다.
        mutate('/api/user', { ...data, name: newName }, false)
        // API를 요청해서 데이터를 업데이트 한다.
        await requestUpdateUsername(newName)
        // revalidation (refetch) 요청을 하여 UI 데이터가 올바른지 확인한다.
        mutate('/api/user')
        // highlight-end
      }}>Uppercase my name!</button>
    </div>
  )
}
```

또는 `useCallback()`을 사용해서 onClick 부분을 따로 구성할 수 있다.

```js
import useSWR, { mutate } from 'swr'

function Profile() {
  const { data } = useSWR('/api/user', fetcher)

  // highlight-start
  const updateName = useCallback(async () => {
    const newName = data.name.toUpperCase()

    // 우선적으로 UI 데이터를 업데이트 한다.
    mutate('/api/user', { ...data, name: newName }, false)

    // API를 요청해서 데이터를 업데이트 한다.
    await requestUpdateUsername(newName)

    // revalidation (refetch) 요청을 하여 UI 데이터가 올바른지 확인한다.
    mutate('/api/user')
  }, [data])
  // highlight-end

  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button onClick={updateName}>Uppercase my name!</button>
    </div>
  )
}
```

이는 컴포넌트마다 `mutate()`를 만들어 주어야한다는 불편함이 생기게 되며, 코드가 길어져 가독성이 떨어지게 된다.

예제는 **Optimistic Update**라고 하여 UI 데이터를 업데이트하고, 서버에 Update API를 요청한 후 다시 revalidation을 하는 과정으로 UI 데이터를 최신의 데이터로 업데이트한다. 

> **Optimistic Update** : 낙관적 업데이트로 업데이트시 UI에서도 업데이트할 것이라는 가정으로 먼저 UI를 업데이트 시켜주고 서버를 통해 검증받고 업데이트 또는 롤백하는 방식.

그러나 위 API에서 에러가 발생하면 UI 데이터를 요청하기 전 상태로 돌려주어야 한다. 그러나 위의 예제에서는 `Update API 호출 + revalidation`이라는 과정이 지나야 이전값으로 돌아오게 된다. 

### 결론적으로 

- 컴포넌트마다 mutate가 생기게 된다.
- 코드가 길어질 경우 가독성이 떨어진다.
- Optimistic Update + Rollback을 신경 써야 한다.

## Hooks를 만들어서 사용하기

`mutate()` 로직을 React Custom Hooks로 만들어 사용하면 다른 컴포넌트에서 재사용이 가능하며, 컴포넌트 파일 코드가 줄어 화면 코드에 집중할 수 있게 된다.

```js
import { mutate } from 'swr'

const useUpdateUserName = (data) => {
  return useCallback(async () => {
    const newName = data.name.toUpperCase()

    // 우선적으로 UI 데이터를 업데이트 한다.
    mutate('/api/user', { ...data, name: newName }, false)

    // API를 요청해서 데이터를 업데이트 한다.
    await requestUpdateUsername(newName)

    // revalidation (refetch) 요청을 하여 UI 데이터가 올바른지 확인한다.
    mutate('/api/user')
  }, [data])
}
```

`mutate()` 부분을 Hooks로 만들어서 다른 컴포넌트에서도 사용 가능하게 만들었으며, 아래와 같이 사용할 수 있다.

```js
import useSWR from 'swr'

function Profile() {
  const { data } = useSWR('/api/user', fetcher)
  const updateName = useUpdateUserName(data)

  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <button onClick={updateName}>Uppercase my name!</button>
    </div>
  )
}
```

### Optimistic Update + Rollback

이제 API에서 호출이 발생하면 Rollback 해주자.

```js
import { mutate } from 'swr'

const useUpdateUserName = (data) => {
  return useCallback(async () => {
    const prevName = data.name // highlight-line
    const newName = data.name.toUpperCase()

    try { // highlight-line
      // 우선적으로 UI 데이터를 업데이트 한다.
      mutate('/api/user', { ...data, name: newName }, false)
  
      // API를 요청해서 데이터를 업데이트 한다.
      await requestUpdateUsername(newName)
  
      // revalidation (refetch) 요청을 하여 UI 데이터가 올바른지 확인한다.
      mutate('/api/user')
    // highlight-start
    } catch {
      // Rollback 처리
      mutate('/api/user', { ...data, name: prevName }, false)

      // send report
    }
    // highlight-end
    
  }, [data])
}
```

Custom Hooks에서 API 호출 전 원본 데이터를 보관하며 `try...catch`로 감싸 API에서 에러가 발생할 경우 원본 데이터로 `mutate()` 한다.

`try...catch` 는 에러를 잡는 기본적인 방법이지만 가독성 면에서 좋지 않다고 생각한다. 이를 더욱더 좋은 방법으로 개선하기 위해 찾아다녔다.

## SWR에서 useMutation Hooks 사용하기

SWR는 `useMutaton()`을 제공하지 않는다. 이 때문에 react-query보다 좋지 않다고 생각하시는 분들도 계신 것 같다. 

SWR에서도 `useMutaton()`와 비슷한 기능을 하는 라이브러리를 찾아보던 중 SWR에서 사용할 수 있는 `useMutation()`을 구현한 Repo를 찾았다.

> [Github repo | use-mutaton](https://github.com/sergiodxa/use-mutation)

설치 방법은 아래와 같다.

```cmd
npm i use-mutation
```

> 개인적으로는 await-of 라이브러리를 사용하고 있어 커스텀 작업해서 사용하고 있다. 별도의 커스텀 작업을 해야하는 경우가 아니라면 그대로 사용해도 무방하다.

### API Reference

`use-muation` 라이브러리는 react-query의 `useMutation()`과 같은 형태다.

```js
const [mutate, { status, data, error, reset }] = useMutation<
  Input,
  Data,
  Error
>(mutationFn, {
  onMutate,
  onSuccess,
  onFailure,
  onSettled,
  throwOnFailure,
  useErrorBoundary,
});

const promise = mutate(input, {
  onSuccess,
  onSettled,
  onError,
  throwOnFailure,
});
```

> [react-query useMutation 확인하기](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)

> [us-mutation 확인하기](https://github.com/sergiodxa/use-mutation#api-reference)

이제 `try...catch`를 사용하지 않고 처리할 수 있게 되었다.

```js
import { mutate } from 'swr'

const useUpdateUserName = (data) => {
  // API를 요청해서 데이터를 업데이트 한다.
  return useMutation(requestUpdateUsername, {
    onMutate() {
      const oldData = cache.get('/api/user'); // 원본 데이터를 가져온다.

      // 우선적으로 UI 데이터를 업데이트 한다.
      mutate('/api/user', (current) => ({ ...current, name: newName }), false)

      // 실패할 경우 Rollback function을 반환한다.
      return () =>  mutate('/api/user', (current) => ({ ...current, name: oldData.name }), false); 
    },

    onSuccess() {
      // revalidation (refetch) 요청을 하여 UI 데이터가 올바른지 확인한다.
      mutate('/api/user')
    },

    onFailure({ status, rollback }) {
      if (status === 'failure' && rollback) rollback(); 
    },
  });
}
```

`onMutate()`에서 API 호출 전 UI 데이터를 업데이트하며, 실패할 경우 사용할 Rollback function을 return 하고 있다. 

`onSuccess()`에서 API가 정상적으로 작동할 경우 mutate를 사용해서 revalidation을 실행한다. 

`onFailure()`에서는 현재 상태를 확인해서 실패했으면, `onMutate()`에서 선언한 rollback function을 실행하여 이전 값으로 Rollback 된다.

위외 같이 3개의 함수로 간단하게 Side-Effet를 처리할 수 있게 되었다. 모든 과정이 훨씬 직관적으로 변경되었다.

이외에도 성공과 실패의 경우 다른 작업 과정을 추가할 수 있다. 가령 실패시 Report를 하거나 사용자에게 알림을 띄우는 작업 추가, 성공시 다른 페이지로 이동 또는 다른 API를 호출하는 등의 작업이 가능해진다.

***개인적으로 Custom Hooks을 만들어서 Hooks에서만 사용하는 작업도 return문 위에 작성해서 사용하고 있다.***

```js
import { mutate } from 'swr'

const useUpdateUserName = (data) => {
  const createAtivityLog = useCreateActivityLog(); // highlight-line

  // API를 요청해서 데이터를 업데이트 한다.
  return useMutation(requestUpdateUsername, {
    onMutate() {
      ...
    },

    onSuccess() {
      // revalidation (refetch) 요청을 이후 User ActivityLog을 호출하고 있다.
      mutate('/api/user')
      createAtivityLog() // highlight-line
    },

    onFailure({ status, rollback }) {
      ...
    },
  });
}
```

추가적으로 알고 싶다면 Docs를 읽어보는 것을 추천한다.

## 마무리

역시 SWR는 컴포넌트 단위로 개발하는 데 도움주는 좋은 라이브러리라고 생각한다. 사용 중 느끼는 불편함은 항상 고민하고 개선하려고 한다. 

이번에는 `use-mutation`을 통해 더 좋은 방법을 찾았다고 생각했고, 이후에도 어떻게 해야 더 좋은 구조를 가져갈 수 있을까 고민한다. 항상 현재 사용하고 있는 구조가 완벽한 구조라 생각하지 않는다. 

이번 글을 적은 후에 다시 보니 오히려 이 글이 react-query를 부추기는 글이라고 생각될까 걱정된다. 😂

| | |
|:--:|--|
| **SWR이란** | [Redux 말고 SWR](/content/2021-01-09--SWR) |
| **SWR 더 나아가기** | [SWR / react-query useMutation처럼 사용하기](/content/2021-04-25--SWR-useMutation) |

<br/>

#### Reference

- [Redux 말고 SWR](/content/2021-01-09--SWR)
- [use-mutation](https://github.com/sergiodxa/use-mutation)
- [swr - mutation](https://swr.vercel.app/docs/mutation#returned-data-from-mutate)
- [Build an Optimistic UI in React using SWR with useMutation](https://sergiodxa.com/articles/swr/use-mutation)
