---
layout: post
title:  "헝가리안 표기법"
date:   2018-01-04
excerpt: "헝가리안 표기법이란 변수 선언시 접두어를 붙여 변수의 의미를 명확하게 하기 위한 규칙이다."
tag:
- javascript
- Hungarian
- Notation

comments: true
---
**헝가리안 표기법**
===
헝가리안 표기법이란 변수 선언시 접두어를 붙여 **변수의 의미를 명확하게** 하기 위한 규칙이다.<br>
마이크로소프트의 프로그래머 **Charles Sim onyi** 가 코딩할 때 습관적으로 즐겨쓰던 접두사 변수 명명 방식이 빌게이트에 눈에 띄어 표준화가 되었다고 한다. 또한 헝가리안 표기법이라 불린이유는 Charles Sim onyi가 헝가리에서 이민 온 사람이었기 때문이다.

## 헝가리안 표기법

|DataType|Prefix|Example|
|--------|------|-------|
|Boolean|b|bContinue|
|Int|n|nIndex|
|Short|n|nIndex|
|Character|c|cFirstInital|
|Float|f|fDistance|
|Double|d|dMetres|
|Long|l|lCarCount|
|String|s|sCustomerName|
|Null terminated String|sz|szCustomerName|
|Unsigned Integer(Word)|w|wCount|
|Unsigned long integer|dw|dwAtomCount|
|Pointer|p|pNext|
|Handle|h|hWnd|
|Function|fn|fnReport|
|Class|C|CParser|
|Class member variable|m_|m_|
|Array|a|aYears|
|Global|g_|g_szDirectory|
|Windows message|Msg|msgCut|

---

## Windows Resources

|ResourceType|Prefix|Example|
|------------|------|-------|
|Menu Item Resource|ID_|ID_EDIT_CUT|
|String|IDS_|IDS_STRING1|
|Dialog Control|IDC_|IDS_EDITBOX|
|ICON|IDI_|IDI_MAINCON|
|Cursor|IDC_CURSOR_|IDS_CURDOR_ARROW|
|Dialog Box|IDD_|IDD_ABOUTBOX|
|Accelerator|IDR_|IDR_ACCELERATOR|
|Bitmap|IDB_|IDC_ARROW|
