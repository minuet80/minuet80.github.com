---
layout: post
title:  "[IT] - [BOOK] 2강 - 이것이 안드로이드다 with 코틀린 "
description: 코틀린 사용을 위한 기본 문법
date:   2021-05-30 10:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android2/
width: large
---

* some text
{: toc}

# 1. 코딩 준비하기

이번장의 핵심 키워드는 로그<sup>Log</sup>와 로그켓<sup>Logcat</sup>입니다.

Log클래스에서 주로 사용하는 다섯가지 함수
  - v(verbos)
  - i(information)
  - d(debug)
  - w(warning)
  - e(error)

## 1.1 새 프로젝트 생성하기
1. [File] - [New] - [New Project]를 클릭하고, 프로젝트 형태는 [Empty Activity]를 선택한 후 [Next]를 클릭합니다.<br>
1. Name에 ‘BasicSyntax’를 입력합니다. Package name은 프로젝트명(Name)에 따라 자동 생성됩니다. Minimum SDK도 기본값인 API 16을 그대로 사용합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-47.png){: style="box-shadow: 0 0 5px #777"}

## 1.2 로그의 활용
```kotlin
Log.d("태그", "출력 메시지")
```
Log.d에서 d는 debug를 의미하며 첫 번째 인자에는 검색 용도로 사용되는 ‘태그’를 입력하고, 두번째 인자에는 ‘실제 출력할 메시지’를 입력합니다.

1. MainActivity.kt 파일을 열고 다음 코드를 setContentView... 밑에 입력합니다.<br>
```java
package kr.co.hanbit.basicsyntax
　
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
　
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
　
        Log.d("BasicSyntax", "로그를 출력합니다. method = Log.d")
    }
}
```

1. 코르를 추가하면 ‘Log’라는 글자가 빨간색으로 나타나는데 Log 글자를 클릭하면 다음과 같은 메시지가 나타납니다. 안드로이드에서 기본으로 제공하는 클래스나 함수를 사용하기 위해서는 import라는 과정을 거쳐야 하는데, 아직 Log클래스를 import하지 않았기 때문에 나타나는 메시지입니다.
``Alt`` + ``Enter``키를 누르면 상단에 필요한 import문구가 자동으로 생성됩니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-48.png){: style="box-shadow: 0 0 5px #777"}

1. 소스 코드 상단에 import android.util.Log가 추가됩니다.
```java
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
```

1. 이제 앱을 에뮬레이터에서 실행하기 위해 안드로이드 스튜디오 상단 툴바의 [Run ‘App’ 아이콘]을 클릭합니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-49.png){: style="box-shadow: 0 0 5px #777"}

1. 에뮬레이터를 통해 앱 화면을 보면 ‘Hello World!’라고만 적혀 있고 아무런 동작을 하지 않습니다.

1. 안드로이드 스튜디어 하단 [Logcat] 탭을 클릭해서 창을 열어봅니다. 로그 내용이 많은데, 소스 코드의 Log.d 함수에 입력했던 태그 ‘BasicSyntax’를 로그 영역 상단에 있는 돋보기 표시의 검색창에 입력하면 해당 로그만 볼 수 있습니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-50.png){: style="box-shadow: 0 0 5px #777"}
- ``로그캣(Logcat)`` : 출력되는 로그를 모아서 보는 도구입니다.


# 2. 변수

## 2.1 변수 var
### 첫째. 변수 선언과 동시에 값 넣기
```java
var myName = "홍길동"
```
### 둘째. 값으로 초기화하지 않고 선언만 하기 사용하기
```java
var myAge: Int
myAge = 27
```

## 2.2 데이터 타입
코틀린에서 제공되는 기본 데이터 타입은 다음과 같습니다.

| 데이터 타입 | 설명 | 값의 범위 및 예 |
| :---: | :---: | :---: |
| Double | 64비트 실수 | -1.7E+308근삿값 ~ 1.7E+308의 근삿값 |
| Float | 32비트 실수 | -3.4E+38의 근갓값 ~ 3.4E+38 근삿값 |
| Long | 64비트 정수 | -2E63 ~ 2E63-1 |
| Int | 32비트 정수 | -2.147,483,648 ~ 2,147,483,647 |
| Short | 16비트 정수 | -32,768 ~ 32,767 |
| Byte | 8비트 정수 | -128 ~ 127 |
| Char | 1개의 문자 | ‘글’ (외따음표) |
| String | 여러 개의 문자 | "여러 개의 글자입니다." (쌍따음표) |
| Boolean | true, false 두가지 값 | true또는 false |
{: .table .table-striped .table-hover}

### Double
소수점이 있는 값을 저장할 때 사용합니다.
```java
var doubleValue: Double
doubleValue = 3.141592
```

### Float
Double과 동일한 용도이지만 더 작은 밤위의 숫자를 저장할 때 사용합니다. 안드로이드 스튜디오는 Double과 구분하기 위해 Float의 경우 숫자 끝에 ‘F’를 붙여줍니다.
```java
var floatValue: Float
floatValue = 3.141592F
```

### Int
소수점이 없는 정숫값을 저장할 때 사용합니다.
다음 처럼 가독성을 높이기 위해 언더바(_)로 자릿수를 구분해 줄 수 있습니다.
```java
var intValue: Int
intValue = 2_147_483_647
```

### Long
Int보다 큰 범위의 정수를 저장할 수 있습니다. Int와 구분하기 위해 숫자의 끝에 ‘L’를 붙여줍니다.
```java
var longValue: Long
longValue = 2147483647L
```

### Short와 Byte
역시 정숫값을 저장할 때 사용하는데 입력할 수 있는 값의 크기가 Int보다 작습니다.
```java
var shortValue: Short = 32_767
var byteValue: Byte = 127
```

### String
여러 개의 문자를 저장할 수 있습니다.
```java
var stringValue: String = "ABCDEF"
```

### Boolean
```java
var boolValue = true
```

BasicSyntax 프로젝트 수정 타입 출력해보기
```java
package kr.co.hanbit.basicsyntax
　
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
　
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
　
        var myName = "홍길동"
        var myAge: Int
        myAge = 27
        myAge = myAge + 1
        Log.d("BasicSyntax", "myName = $myName, myAge = $myAge")
    }
}
```
![1]({{site.baseurl}}/images/this-is-android/this-is-android-51.png){: style="box-shadow: 0 0 5px #777"}

## 2.3 읽기 전용 변수 val
var와는 다르게 한 번 입력된 값은 변경할 수 없습니다.
val로 정의된 변수는 값을 변경할 수 없습니다.

## 2.4 상수 const
상수는 주로 기준이 되는 변하지 않는 값을 입력해 둘 때 사용하며, 읽기 전용 변수인 val앞에 const키워드를 붙여 만듭니다.
```java
const val PI = 3.141592
```
val과 같이 읽기 전용인 것은 동일하지만, 컴파일 시에 값이 결정되고 때문에 ``Int``, ``Long``과 같은 기본형과 문자열인 ``String``만 입력할 수 있습니다.



<style>
.page-container {max-width: 1000px}
</style>