---
layout: post
title:  "[IT] - [BOOK] 2강 - 이것이 안드로이드다 with 코틀린 "
description: 코틀린 사용을 위한 기본 문법
date:   2021-05-31 10:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet
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
1. [File] - [New] - [New Project]를 클릭하고, 프로젝트 형태는 [Empty Activity]를 선택한 후 [Next]를 클릭합니다.

1. Name에 ‘BasicSyntax’를 입력합니다. Package name은 프로젝트명(Name)에 따라 자동 생성됩니다. Minimum SDK도 기본값인 API 16을 그대로 사용합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-47.png){: style="box-shadow: 0 0 5px #777"}

## 1.2 로그의 활용

```kotlin
Log.d("태그", "출력 메시지")
```
Log.d에서 d는 debug를 의미하며 첫 번째 인자에는 검색 용도로 사용되는 ‘태그’를 입력하고, 두번째 인자에는 ‘실제 출력할 메시지’를 입력합니다.

1. MainActivity.kt 파일을 열고 다음 코드를 setContentView... 밑에 입력합니다.

    ```kotlin
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

    ```kotlin
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    ```

1. 이제 앱을 에뮬레이터에서 실행하기 위해 안드로이드 스튜디오 상단 툴바의 [Run ‘App’ 아이콘]을 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-49.png){: style="box-shadow: 0 0 5px #777"}

1. 에뮬레이터를 통해 앱 화면을 보면 ‘Hello World!’라고만 적혀 있고 아무런 동작을 하지 않습니다.

1. 안드로이드 스튜디어 하단 [Logcat] 탭을 클릭해서 창을 열어봅니다. 로그 내용이 많은데, 소스 코드의 Log.d 함수에 입력했던 태그 ``‘BasicSyntax’``를 로그 영역 상단에 있는 돋보기 표시의 검색창에 입력하면 해당 로그만 볼 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-50.png){: style="box-shadow: 0 0 5px #777"}
    
    ``로그캣(Logcat)`` : 출력되는 로그를 모아서 보는 도구입니다.


# 2. 변수

## 2.1 변수 var
### 첫째. 변수 선언과 동시에 값 넣기
```kotlin
var myName = "홍길동"
```
### 둘째. 값으로 초기화하지 않고 선언만 하기 사용하기
```kotlin
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
```kotlin
var doubleValue: Double
doubleValue = 3.141592
```

### Float
Double과 동일한 용도이지만 더 작은 밤위의 숫자를 저장할 때 사용합니다. 안드로이드 스튜디오는 Double과 구분하기 위해 Float의 경우 숫자 끝에 ‘F’를 붙여줍니다.
```kotlin
var floatValue: Float
floatValue = 3.141592F
```

### Int
소수점이 없는 정숫값을 저장할 때 사용합니다.
다음 처럼 가독성을 높이기 위해 언더바(_)로 자릿수를 구분해 줄 수 있습니다.
```kotlin
var intValue: Int
intValue = 2_147_483_647
```

### Long
Int보다 큰 범위의 정수를 저장할 수 있습니다. Int와 구분하기 위해 숫자의 끝에 ‘L’를 붙여줍니다.
```kotlin
var longValue: Long
longValue = 2147483647L
```

### Short와 Byte
역시 정숫값을 저장할 때 사용하는데 입력할 수 있는 값의 크기가 Int보다 작습니다.
```kotlin
var shortValue: Short = 32_767
var byteValue: Byte = 127
```

### String
여러 개의 문자를 저장할 수 있습니다.
```kotlin
var stringValue: String = "ABCDEF"
```

### Boolean
```kotlin
var boolValue = true
```

BasicSyntax 프로젝트 수정 타입 출력해보기
```kotlin
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
```kotlin
const val PI = 3.141592
```
val과 같이 읽기 전용인 것은 동일하지만, 컴파일 시에 값이 결정되고 때문에 ``Int``, ``Long``과 같은 기본형과 문자열인 ``String``만 입력할 수 있습니다.


# 3. 조건문

## 3.1 조건문 if

### if ~ else 문 사용하기
```kotlin
package kr.co.hanbit.controlflow1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var ball = 4
        if (ball > 3) {
            // ball이 3보다 크면 여기 블록의 코드가 실행됩니다.
            Log.d("ControlFlow", "4볼로 출루합니다")
        } else {
            // 그렇지 않으면 else 다음에 있는 블록의 코드가 실행됩니다.
            Log.d("ControlFlow", "타석에서 다음 타구를 기다립니다.")
        }
    }
}
```

### if ~ else if ~ else 문 사용하기
```kotlin
package kr.co.hanbit.controlflow2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var a = 1
        var b = 2
        var c = 3

        // 1. if 문 두번 사용하기
        if (a < b) {
            Log.d("ControlFlow", "1: a는 b보다 작습니다.")
        }
        if (a < c) {
            Log.d("ControlFlow", "1: a는 c보다 작습니다.")
        }

        // 2. else if 문 사용하기
        if (a < b) {
            Log.d("ControlFlow", "2: a는 b보다 작습니다.")
        } else if (a < c) {
            Log.d("ControlFlow", "2: a는 c보다 작습니다.")
        }
    }
}
```

## 3.2 조건문 When
### 일반적인 형태의 when 사용하기
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var now = 10
        when (now) {
            8 -> {
                Log.d("when", "현재 시간은 ${now}시 입니다.")
            }
            9 -> {
                Log.d("when", "현재 시간은 ${now}입니다.")
            }
            else -> {
                // 위의 모든 조건에 맞지 않으면 else 다음 코드가 실행됩니다.
                Log.d("when", "현재시간은 9시가 아닙니다.");
            }
        }
    }
}
```

### 콤마로 구분해서 사용하기
특정 값을 비교하는데 결과 처리가 동일하다면 콤마(,)로 구분해서 한 번에 비교할 수 있습니다.
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var now = 9
        when (now) {
            8, 9 -> {
                Log.d("when", "현재 시간은 ${now}시 입니다.")
            }
            else -> {
                // 위의 모든 조건에 맞지 않으면 else 다음 코드가 실행됩니다.
                Log.d("when", "현재시간은 9시가 아닙니다.");
            }
        }
    }
}
```

### 범위 값을 비교하기
in을 사용해서 범위 값을 비교할 수도 있습니다. if문의 비교 연산자 중 ``<=``, ``>=``과 같은 기능을 구현할 수 있습니다.
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var ageOfMichael = 19
        when (ageOfMichael) {
            in 10..19 -> {
                Log.d("when", "마이클은 10대입니다.")
            }
            !in 10..19 -> {
                Log.d("when", "마이클은 10대가 아닙니다.")
            }
            else -> {
                Log.d("when", "마이클은 나이를 알 수 없습니다.")
            }
        }
    }
}
```

### 파라미터 없는 when 사용하기
when 다음에 오는 괄호를 생략하고 마치 if문 처럼 사용할 수도 있습니다.
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var currentTime = 6
        when {
            currentTime == 5 -> {
                Log.d("when", "현재 시간은 5시 입니다.")
            }
            currentTime > 5 -> {
                Log.d("when", "현재 시간은 5시가 넘었습니다.")
            }
            else -> {
                Log.d("when", "현재 시간은 5시 이전입니다.")
            }
        }
    }
}
```

# 4. 배열과 컬렉션

![1]({{site.baseurl}}/images/this-is-android/this-is-android-52.png){: style="box-shadow: 0 0 5px #777"}

## 4.1 배열
여러 개의 값을 담을 수 있는 대표적인 자료현인 배열<sup>Array</sup>은 값을 담기 전에 먼저 배열 공간의 개수를 할당하거나 초기화 시에 데이터를 저장해두면 데이터의 개수만큼 배열의 크기가 결정됩니다.
```kotlin
var students = IntArray(10)
var longArray = LongArray(10)
var charArray = CharArray(10)
var floatArray = FloatArray(10)
var doubleArray = DoubleeArray(10)
```

### 문자 배열에 빈 공간 할당하기
String은 기본 타입이 아니기 때문에 StringArray는 없지만 다음과 같이 사용할 수 있습니다.
괄호 안의 ``첫 번째 숫자인 10만 변경해서 사용하면 그 숫자만큼 빈 문자열로 된 배열 공간을 할당``합니다.

```kotlin
var stringArray = Array(10, {item->""})
```

### 값으로 배열 공간 할당하기
arrayOf함수를 사용해서 String값을 직접 할당할 수도 있습니다.

```kotlin
var dayArray = arrayOf("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN")
```

### 배열에 값 입력하기
1. 배열을 선언한 변수명 옆에 대괄호 ([])를 사용하고, 대괄호 안에 값을 저장할 위치의 인덱스 번호를 작성합니다.

    ```kotlin
    students[9] = 99
    ```

1. set함수를 사용할 수 있습니다

    ```kotlin
    students.set(8, 98)
    ```

### 배열에 있는 값 꺼내기
값을 입력할 때 같은 방식으로 인덱스로 값을 가져올 수 있습니다. 저장할 때와 마찬가지로 대괄호 안에 인덱스를 입력해서 가져올 수 있으며 꺼너낸 배열의 함수는 get() 입니다.

```kotlin
var student = students[9]
var student = students.get(8)
```

```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 기본 타입 배열 선언하기 - 각 기본 타입별로 10개의 빈 공간이 할당됩니다.
        var students = IntArray(10)
        var longArray = LongArray(10)
        var charArray = CharArray(10)
        var floatArray = FloatArray(10)
        var doubleArray = DoubleArray(10)
        // arrayOf 함수를 사용하면 선언과 동시에 값을 입력할 수 있습니다.
        var intArray = intArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        // intArray 변수에는 1부터 10까지의 값이 각각의 배열 공간에 저장되어 있습니다.

        // 2. 문자열 타입 배열 선언하기
        var stringArray = Array(10, {item -> ""})
        // arrayOf 함수로 값을 직접 입력해서 배열을 생성할 수 있습니다.
        var dayArray = arrayOf("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN")

        // 3. 앞에서 선언한 students 변수에 값 넣기
        // 가. 대괄호를 사용하는 방법
        students[0] = 90
        students[1] = 91
        students[2] = 92
        students[3] = 93
        students[4] = 94
        // 나. set함수를 사용하는 방법
        students.set(5, 95)
        students.set(6, 96)
        students.set(7, 97)
        students.set(8, 93)
        students.set(9, 99)

        // 4. 값 변경해보기
        intArray[6] = 137 // 6번 인덱스인 일곱 번째 값 7이 137로 변경됩니다.
        intArray.set(9, 200) // 9번 인덱스인 열 번째 값 99가 200으로 변경됩니다.

        // 5. 배열 값 사용하기
        var seventhValue = intArray[6]
        Log.d("Array", "일곱 번째 intArray의 값은 ${seventhValue}입니다.")
        var tenthValue = intArray.get(9)
        Log.d("Array", "열 번째 intArray의 값은 ${tenthValue}입니다.")
        // 6. 변수에 담지 않고 직접 사용해도 된다.
        Log.d("Array", "첫 번째 dayArray의 값은 ${dayArray[0]}입니다.")
        Log.d("Array", "여섯 번째 dayArray의 값은 ${dayArray.get(5)}입니다.")
    }
}
```

```text
일곱 번째 intArray의 값은 137입니다.
열 번째 intArray의 값은 200입니다.
첫 번째 dayArray의 값은 MON입니다.
여섯 번째 dayArray의 값은 SAT입니다.
```

## 4.2 Collection

여러 개의 값을 넣을 수 있는 자료형에는 배열 외에도 컬렉션<sup>Collection</sup>이 있습니다. 컬렉션은 다른 이름으로 ``동적 배열``이라고 하는데, 이는 배열과는 다르게 공간의 크기를 처음 크기로 고정하지 않고 임의의 개수를 담을 수 있기 때문입니다.

컬렉션은 크게 세 가지로 ``List``, ``Map``, ``Set`` 이 있으며 각각은 다음과 같은 용도로 사용합니다.

### ‘List’


#### ‘List’ 생성하기

리스트 자료형 앞에 뮤터블<sup>Mutable</sup>이라는 접두어가 붙습니다.

```kotlin
var mutableList = mutableListOf("MON", "TUE", "WED")
```

#### ‘List’에 값 추가히기: add

```kotlin
mutableList.add("TUE")
```

add 함수를 사용하면 입력될 위치인 인덱스를 따로 지정해주지 않아도 입력되는 순서대로 인덱스가 저장됩니다.

#### ‘List’에 입력된 값 사용하기: get

```kotlin
var variable = mutableList.get(1)
```

#### ‘List’값 수정하기: set

```kotlin
mutableList.set(1, "수정할 값")
```

#### ‘List’에 입력된 값 제거하기: removeAt

```kotlin
mutableList.removeAt(1)
```

#### ‘Empty List’ 사용하기
아무것도 없는 빈 리스트를 생성하면 앞으로 입력되는 값의 데이터 타입을 알 수 없기 때문에 값의 타입을 추론할 수 없습니다.
그래서 빈 컬렉션의 경우 앞에서처럼 ``‘데이터 타입Of’``만으로는 생성되지 않고 데이터 타입을 직접적으로 알려주는 방법을 사용해야 합니다.
```kotlin
// 생성
var stringList = mutableListOf<String>() // 문자열로 된 빈 컬렉션을 생성합니다.

// 입력
stringList.add("월");
stringList.add("화");

// 사용
Log.d("Collection", "stringList에 입력된 두 번째 값은 ${stringList.get(1)}입니다.")

// 수정
stringList.set(1, "수정된 값")

// 삭제
stringList.removeat(1) // 두 번째 값이 삭제됩니다.
```

#### 컬렉션 개수 가져오기: size
size 프로퍼티를 사용하면 컬렉션의 개수를 가져올 수 있습니다.
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 값으로 컬렉션 생성하기
        var mutableList = mutableListOf("MON", "TUE", "WED")
        // 값을 추가합니다.
        mutableList.add("THU")
        // 값을 꺼냅니다.
        Log.d("Collection", "mutableList의 첫 번째 값은 ${mutableList.get(0)} 입니다.")
        Log.d("Collection", "mutableList의 두 번째 값은 ${mutableList.get(1)} 입니다.")

        // 2. 빈 컬렉션 생성하기
        var stringList = mutableListOf<String>() // 문자열로 된 빈 컬렉션을 생성합니다.
        // 값을 추가합니다.
        stringList.add("월")
        stringList.add("화")
        stringList.add("수")
        // 값을 변경합니다.
        stringList.set(1, "요일 변경");
        // 사용
        Log.d("Collection", "stringList 에 입력된 두 번째 값은 ${stringList.get(1)} 입니다.")
        // 삭제
        stringList.removeAt(1) // 두 번째 값이 삭제됩니다.
        Log.d("Collection", "stringList에 입력된 두 번째 값은 $${stringList.get(1)}입니다.")
        // 개수를 출력합니다.
        Log.d("Collection", "stringList에는 ${stringList.size}개의 값이 있습니다.")
    }
}
```
```text
mutableList의 첫 번째 값은 MON 입니다.
mutableList의 두 번째 값은 TUE 입니다.
stringList 에 입력된 두 번째 값은 요일 변경 입니다.
stringList에 입력된 두 번째 값은 $수입니다.
stringList에는 2개의 값이 있습니다.
```

### ‘Set’
``Set``은 중복을 허용하지 않는 ``List``라고 할 수 있습니다.
List와 유사한 구조이지만 인덱스로 조회할 수 없고, get함수도 지원하지 않습니다.
```kotlin
var set = mutableSetOf<String>()
```

#### ‘Empty Set’ 으로 초기화하고 값 입력하기
```kotlin
var set = mutableSetOf<String>()
set.add("JAN")
set.add("FEB")
set.add("MAR")
```

#### ‘Set’ 사용하기
``Set``은 인덱스로 조회하는 함수가 없기 때문에 특정 위치의 값을 직접 사용할 수 없습니다.
```kotlin
Log.d("Collection", "Set 전체 출력 = ${set}")
```

#### ‘Set’ 삭제하기
``Set``은 값이 중복되지 않기 때문에 값으로 직접 조회해서 삭제할 수 있습니다.
```kotlin
set.remove("FEB")
```

```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 셋 생성하기 값 추가하기
        var set = mutableSetOf<String>()
        set.add("JAN")
        set.add("FEB")
        set.add("MAR")

        // 2. 전체 데이터 출력해보기
        Log.d("Collection", "Set 전체 출력 = ${set}")

        // 3. 특정 값 삭제하기
        set.remove("FEB")
        Log.d("Collection", "Set 전체 출력 = ${set}")
    }
}
```

```text
Set 전체 출력 = [JAN, FEB, MAR]
Set 전체 출력 = [JAN, MAR]
```

### ‘Map’

#### ‘Map’ 생성하기
``Map``은 ``Key``와 ``value`` 형태의 컬렉션입니다.
```kotlin
var mpa = mutableMapOf<String, String>()
```

#### ‘Empty Map’ 으로 생성하고 값 추가히기
값을 추가하기 위해 제공되는 ``map``에서 제공되는 ``put``함수에 키와 값을 입력하면 됩니다.
```kotlin
var map = mutableMapOf<String, String>()
map.put("key1", "value1")
map.put("key2", "value2")
map.put("key3", "value3")
```

#### ‘Map’ 사용하기
``get`` 함수에 ``key``를 직접 입력해서 값을 꺼낼 수 있습니다.
```kotlin
Log.d("CollectionMap", "map에 입력된 key1의 값은 ${map.get("key1")}입니다.")
```

#### ‘Map’ 수정하기
``put``함수를 사용할 때 동일한 키를 가진 값이 있으면 키는 유지된 채로 그 값만 수정됩니다.
```kotlin
map.put("key2", "수정")
```
#### ‘Map’ 삭제하기
``remove``함수에 key를 입력해서 value을 삭제할 수 있습니다. 리스트와는 다르게 인덱스에 해당하는 key의 값이 변경되지 않고 그대로 유지됩니다.
```kotlin
map.remove("key2")
```

```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 맵 생성하기
        var map = mutableMapOf<String, String>()
        // 2. 값 넣기
        map.put("키1", "값1")
        map.put("키2", "값2")
        map.put("키3", "값3")
        // 3. 값 사용하기
        var variable = map.get("키2")
        Log.d("Collection", "키2의 값은 ${variable}입니다.")
        // 4. 값 수정하기
        map.put("키2", "두 번째 값 수정")
        Log.d("Collection", "키2의 값은 ${map.get("키2")}입니다")
        // 5. 값 삭제하기
        map.remove("키2")
        // 5.1 없는 값을 불러오면 null 값이 출력된다.
        Log.d("Collection", "키2의 값은 ${map.get("키")}입니다.")
    }
}
```
```text
키2의 값은 값2입니다.
키2의 값은 두 번째 값 수정입니다
키2의 값은 null입니다.
```

## 4.3 Imutable Collection
코틀린은 일반 배열처럼 크기를 변경할 수 없으면서 값 또한 변경할 수 없는 Immutable Collection을 지원합니다.
```kotlin
val IMMUTABLE_LIST = listOf("JAN", "FEB", "MAR") // 생성
Log.d("Collection", "리스트의 두 번째 값은 ${IMMUTABLE_LIST.get(1)}입니다.") // 사용
```
```kotlin
val DAT_LIST = listOf("월", "화", "수", "목", "금", "토", "일")
```

# 5. 반복문

## 5.1 for 반복문
### for in .. : 일반적인 형태의 for 반복문
```kotlin
for (index in 1..10) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

### until: 마지막 숫자 제외하기
```kotlin
var array = arrayOf("JAN", "FEB", "MAR", "APR", "MAY" "JUN")
for (index in 0 until array.size) {
    Log.d("For", "현재 월은 ${array.get(index)}입니다.")
}
```

### step: 건너뛰기
```kotlin
for (index in 0..100 step 3) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

### downTo: 감소시키기
```kotlin
for (index in 10 downTo 0) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

### 배열, 컬렉션에 들어 있는 엘리먼트 반복하기
배열이나 컬렉션을 엘리먼트 개수만큼 반복하면서 사용할 수 있습니다.
```kotlin
var arrayMonth = arrayOf("JAN", "FEB", "MAR", "APR", "MAY", "JUN")
for (month in arrayMonth) {
    Log.d("for", "현재 월은 ${month}입니다.")
}
```
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 일반적인 반복문 사용으로 열 번 반복하기
        for (index in 1..10) {
            Log.d("For", "현재 숫자는 ${index}")
        }
        // 2. 마지막 숫자 제외하기
        var array = arrayOf("JAN", "FEB", "MAR", "APR", "MAY", "JUN")
        for (index in 0 until array.size) {
            Log.d("For", "현재 월은 ${array.get(index)}")
        }
        // 3. 건너뛰기
        for (index in 10 downTo 0) {
            Log.d("For", "감소시키기: ${index}")
        }
        // 4. 감소시키기
        for (index in 10 downTo 0) {
            Log.d("for", "감소시키기: ${index}")
        }
        // 4.1 건너뛰면서 감소시키기
        for (index in 10 downTo 0 step 3) {
            Log.d("For", "건너뛰면서 감소시키기: ${index}")
        }
        // 5.1 배열, 컬렉션 사용하기
        for (month in array) {
            Log.d("For", "현재 월은 ${month}입니다.")
        }
    }
}
```
```text
현재 숫자는 1
현재 숫자는 2
현재 숫자는 3
현재 숫자는 4
현재 숫자는 5
현재 숫자는 6
현재 숫자는 7
현재 숫자는 8
현재 숫자는 9
현재 숫자는 10
현재 월은 JAN
현재 월은 FEB
현재 월은 MAR
현재 월은 APR
현재 월은 MAY
현재 월은 JUN
감소시키기: 10
감소시키기: 9
감소시키기: 8
감소시키기: 7
감소시키기: 6
감소시키기: 5
감소시키기: 4
감소시키기: 3
감소시키기: 2
감소시키기: 1
감소시키기: 0
건너뛰면서 감소시키기: 10
건너뛰면서 감소시키기: 7
건너뛰면서 감소시키기: 4
건너뛰면서 감소시키기: 1
현재 월은 JAN입니다.
현재 월은 FEB입니다.
현재 월은 MAR입니다.
현재 월은 APR입니다.
현재 월은 MAY입니다.
현재 월은 JUN입니다.
```

## 5.2 while 반복문
### 일반적인 while 반복문
```kotlin
var current = 1
val until = 12
while (current < until) {
    Log.d("while", "현재 값은 ${current}입니다.")
    current = current + 1
}
```
### do와 함께 사용하기
do와 함께 사용하면 while 문의 조건식과 관계없이 do 블록 안의 코드를 한 번 실행합니다.
```kotlin
var game = 1
val match = 6
do {
    Log.d("while", "${game}게임 이겼습니다. 우승까지 ${match - game}게임 남았습니다.")
    game += 1
} while (game < match)
```

## 5.3 반복문 제어하기
### break: 반복문 탈출하기
```kotlin
for (index in 1..10) {
    Log.d("break", "현재 index는 ${index}입니다.")
    if (index > 5) {
        break
    }
}
```

### continue: 다음 반복문으로
반복문 내에서 continue를 만나면 continue다음 코드는 실행하지 않고 반복문이 처음으로 돌아갑니다.
다음의 예시 코드를 보면 except가 3보다 크고 8보다 작으면 continue명령으로 로그를 찍지 않고 for문의 처음으로 돌아가기 때문에 4, 5, 6, 7은 출력되지 않습니다.
```kotlin
for (except in 1..10) {
    if (except > 3 && except < 8) {
        continue
    }
    Lod.d("continue", "현재 index는 ${except}입니다.")
}
```

```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 일반적인 while 사용하기
        var current = 1
        val until = 12
        while (current < until) { Log.d("while", "현재 값은 ${current}입니다.")
            // current를 1씩 증가시켜서 열한 번 반복한 후 while 문을 빠져나갑니다.
            current = current + 1
        }
        // 2. do ~ while 사용하기
        var game = 1
        val match = 6
        do {
            Log.d("while", "${game}게임 이겼습니다. 우승까지 ${match - game}게임 남았습니다.")
            game += 1
        } while (game < match)
        // 3. while vs do ~ while
        // while 테스트
        game = 6
        while (game < match) {
            Log.d("while", "*** while 테스트입니다. ***")
            game += 1
        }
        // do ~ while 테스트
        game = 6
        do {
            Log.d("while", "*** do ~ while 테스트입니다. ***")
            game += 1
        } while (game < match)
        // 4. break 반복문 탈출하기
        for (index in 1..10) {
            Log.d("while", "break > 현재 index는 ${index} 입니다.")
            if (index > 5) {
                // index가 5보다 크면 break 명령어로 현재 반복문을 벗어납니다.
                break // 따라서 Log는 6까지만 출력됩니다.
            }
        }
        // 5. continue 다음 반복문으로
        for (except in 1..10) {
            // except가 3보다 크고 8보다 작으면 continue 명령으로 로그를 찍지 않고 for문의 처음으로 jump합니다.
            if (except > 3 && except < 8) {
                continue
            }
            // 따라서 4, 5, 6, 7은 출력되지 않습니다.
            Log.d("while", "continue > 현재 index는 ${except}입니다.")
        }
    }
}
```
```text
현재 값은 1입니다.
현재 값은 2입니다.
현재 값은 3입니다.
현재 값은 4입니다.
현재 값은 5입니다.
현재 값은 6입니다.
현재 값은 7입니다.
현재 값은 8입니다.
현재 값은 9입니다.
현재 값은 10입니다.
현재 값은 11입니다.
1게임 이겼습니다. 우승까지 5게임 남았습니다.
2게임 이겼습니다. 우승까지 4게임 남았습니다.
3게임 이겼습니다. 우승까지 3게임 남았습니다.
4게임 이겼습니다. 우승까지 2게임 남았습니다.
5게임 이겼습니다. 우승까지 1게임 남았습니다.
*** do ~ while 테스트입니다. ***
break > 현재 index는 1 입니다.
break > 현재 index는 2 입니다.
break > 현재 index는 3 입니다.
break > 현재 index는 4 입니다.
break > 현재 index는 5 입니다.
break > 현재 index는 6 입니다.
continue > 현재 index는 1입니다.
continue > 현재 index는 2입니다.
continue > 현재 index는 3입니다.
continue > 현재 index는 8입니다.
continue > 현재 index는 9입니다.
continue > 현재 index는 10입니다.
```

# 6. 함수
``함수``는 fun으로 정의하고 반환값이 있는 함수는 내부에서 return으로 값을 반환합니다.
함수를 저으이할 때 입력값을 기술한 것을 ``파라미터``라고 하는데, 이 파라미터를 전달하고 결괏값을 돌려받는 다양한 방법에 대해 알아보겠습니다.

## 6.1 함수의 정의

### 반환값과 입력값이 있는 함수의 정의
```kotlin
fun square(x: Int): Int {
    return x * x;
}
```
square 함수가 호출되면 입력값을 제곱해서 호출한 측으로 반환하고 실행이 종료됩니다.

### 반환값이 없는 함수의 정의
다음은 반환값 없이 입력값을 받아서 Log로 출력하는 함수 printSum()을 정의했습니다.
```kotlin
fun printSum(x: Int, y: Int) {
    Log.d("fun", "x + y = ${x + y}")
}
```

### 입력값 없이 반환값만 있는 함수의 정의
getPi 함수는 호출한 측으로 3.14 를 반환하고 실행이 종료됩니다.
```kotlin
fun getPi(): Double {
    return 3.14
}
```

## 6.2 함수의 사용

### 반환값과 입력값이 있는 함수의 호출
```kotlin
var squareResult = square(30)
Log.d("fun", "30의 제곱은 ${squareResult}입니다.")
```

### 반환값이 없는 함수의 호출
```kotlin
printSum(3, 5)
```

### 입력값이 없는 함수의 호출
```kotlin
val PI = getPi()
Log.d("fun", "지름이 10인 원의 둘레는 ${10 * PI}입니다.")
```

## 6.3 함수 파라미터 정의
``코틀린에서 함수 파라미터는 모두 읽기 전용 키워드 val이 생략된 형태입니다.``

### 파라미터의 기본값 정의와 호출
```kotlin
fun newFunction(name: String, age: Int = 20, weight: Double = 65.5) {
    Log.d("fun", "name의 값은 ${name}입니다.")
    Log.d("fun", "age의 값은 ${age}입니다.")
    Log.d("fun", "weight의 값은 ${weight}입니다.")
}
```

### 파라미터 이름으로 값을 입력하기
```kotlin
newFunction("Michael", weight = 67.5)
```
```text
name의 값은 Michael입니다.
age의 값은 29입니다.
weight의 값은 67.5입니다.
```

```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 반환값이 있는 함수 square 사용하기
        var squareResult = square(30)
        Log.d("fun", "30의 제곱은 ${squareResult}입니다.")

        // 2. 반환값이 없는 함수는 그냥 실행한다.
        printSum(3, 5)

        // 3. 입력값이 없는 함수 사용하기
        val PI = getPi()
        Log.d("fun", "지름이 10인 원의 둘레는 ${10 * PI}입니다.")

        // 4. 기본값이 있는 함수 사용하기
        newFunction("Hello")

        // 4-1. 파라미터 이름을 직접 지정하기
        newFunction("michael", weight = 67.5)
    }
    // 1. 반환값이 있는 함수
    fun square(x: Int): Int {
        return x * x // <- square함수는 입력받은 값에 제곱하여 반환합니다.
    }
    // 2. 반환값이 없는 함수
    fun printSum(x: Int, y: Int) {
        Log.d("fun", "x + y = ${x + y}")
    }
    // 3. 입력값 없이 반환값만 있는 함수
    fun getPi(): Double {
        return 3.14
    }
    // 4. 기본값을 갖는 함수
    fun newFunction(name: String, age: Int = 29, weight: Double = 65.5) {
        Log.d("fun", "name의 값은 ${name}입니다.")
        Log.d("fun", "age의 값은 ${age}입니다.")
        Log.d("fun", "weight의 값은 ${weight}입니다.")
    }
}
```
```text
30의 제곱은 900입니다.
x + y = 8
지름이 10인 원의 둘레는 31.400000000000002입니다.
name의 값은 Hello입니다.
age의 값은 29입니다.
weight의 값은 65.5입니다.
name의 값은 michael입니다.
age의 값은 29입니다.
weight의 값은 67.5입니다.
```

# 7. 클래스와 설계
클래스는 단지 ``변수``와 ``함수``의 모음입니다.
## 7.1 클래스의 기본 구조
```kotlin
class String {
    var length: Int
    fun plus(other: Any) {
        ... // 코드
    }
    fun compareTo(other: String) {
        ... // 코드
    }
}
```

## 7.2 클래스 코드 작성하기
클래스를 만들기 위해서는 먼저 클래스의 이름을 정하고 이름 앞에 class 키워드를 붙여서 만들 수 있습니다.
클래스 이름 다음에는 클래스의 범위를 지정하는 중괄호 ({})가 있어야 합니다. 
이 중괄호를 스코프<sup>Scope</sup>라고 하는데, 클래스에서 사용했기 때문에 클래스 스코프라고 합니다.
```kotlin
class 클래스 이름 {
    // 클래스 스코프 (class scope)
}
```
몇몇 예외는 있지만 대부분의 코드는 클래스 스코프 안에 작성됩니다.
작성된 클래스를 사용하기 위해서는 생성자라고 불리는 함수가 호출되어야 하는데, 코틀린은 ``Primary``와 ``Secondary`` 2개의 생성자를 제공합니다.

### 프라이머리 생성자
클래스도 마찬가지로 클래스를 사용한다는 것은 곧 클래스라는 이름으로 묶여 있는 코드를 실행하는 것이기 때문에 함수 형태로 제공되는 생성자를 호출해야지만 클래스가 실행됩니다.
constructor키워드를 사용해서 정의하는데 조건에 따라 생략할 수 있습니다.
```kotlin
class Person constructor(value: String) {
    // 코드
}
```

생성자에 접근 제한자나 다른 옵션이 없다면 constructor 키워드를 생략할 수 있습니다.
```kotlin
class Person(value: String) {
    // 코드
}
```

프라이머리 생성자는 마치 헤더처럼 class 키워드와 같은 위치에 작성됩니다.
클래스의 생성자가 호출되면 init 블록의 코드가 실행되고, init 블록에서는 생성자를 통해 넘어온 파라미터에 접근할 수 있습니다.
```kotlin
class Person(value: String) {
    init {
        Log.d("class", "생성자로부터 전달받은 값은 ${value}입니다.")
    }
}
```
하지만 init 초기화 작업이 필요하지 않다면 init 블록을 작성하지 않아도 됩니다. 
대신 파라미터로 전달된 값을 사용하기 위해서는 파라미터 앞에 변수 키워드인 val을 붙여주면 클래스 스코프 전체에서 해당 파라미터를 사용할 수 있습니다.
```kotlin
class Person(val value: String) {
    fun process() {
        print(value)
    }
}
```
``생성자 파라미터 앞에 var도 사용할 수 있지만, 읽기 전용인 val을 사용하는 것을 권장합니다.``

### 세컨더리 생성자
세컨더리<sup>Secondary</sup> 생성자는 constructor키워드를 마치 함수처럼 클래스 스코프 안에 직접 작성할 수 있습니다.
```kotlin
class Person {
    constructor (value: String) {
        Log.d("class", "생성자로부터 전달받은 값은 ${value}입니다.")
    }
}
```

세컨더리 생성자는 파라미터의 개수, 또는 파라미터의 타입이 다르다면 여러 개를 중복해서 만들 수 있습니다.
```kotlin
class Kotlin {
    constructor (value: String) {
        Log.d("class", "생성자로부터 전달받은 값은 ${value}입니다.)
    }
    constructor (value: Int) {
        Log.d("class", "생성자로부터 전달받은 값은 ${value}입니다.)
    }
    constructor (value1: Int, value2: String) {
        Log.d("class", "생성자로부터 전달받은 값은 ${value1}, ${value2}입니다.)
    }
}
```
### Default 생성자
생성자는 작성하지 않을 경우 파라미터가 없는 프라이머리 생성자가 하나 있는 것과 동일합니다.
```kotlin
class Student { // 생성자를 작성하지 않아도 기본 생성자가 동작합니다.
    init {
        // 기본 생성자가 없더라도 초기화가 필요하면 여기에 코드를 작성합니다.
    }
}
```

## 7.3 클래스의 사용
아무런 파리머터 없이 클래스명에 괄호를 붙여주면 생성자가 호출되면서 ``init``블록 안의 코드가 자동으로 실행됩니다.
세컨더리 생성자의 경우 ``init``블록이 먼저 실행되고, constructor 블록 안의 코드가 실행됩니다.
```kotlin
var kotlin = Kotlin()
var one = Person("value")
var two = Person(1004)
```

1. 프로퍼티와 메서드를 사용하기 위해서 먼저 다음과 같이 프로퍼티 1개와 메서드 1개를 갖는 클래스를 만듭니다.
    ```kotlin
    class Pig {
        var name: String = "Pinky"
        fun printName() {
            Log.d("class", "Pig 의 이름은 ${name}입니다.")
        }
    }
    ```

1. 위에서 정의한 클래스를 생성자로 인스턴스화해서 변수에 담습니다.
    ```kotlin
    var pig = Pig()
    ```

1. 인스턴스가 담긴 변수명 다음에 (.)를 붙여서 프로퍼티와 메서드를 사용합니다.
    ```kotlin
    pig.name = "Pooh"
    pig.printName()
    ```

1. 실행결과
    ```text
    Pig의 이름은 Pooh입니다.
    ```

## 7.4 오브젝트
오브젝트(Object)를 사용하면 클래스를 생성자로 인스턴스화 하지 않아도 블록 안의 프로퍼티와 메서드를 호출해서 사용할 수 있습니다.
자바를 알고 있다면 static과 같은 역할입니다.
```kotlin
object Pig {
    var name: String = "Pinky"
    fun printName() {
        Log.d("class", "Pig의 이름은 ${name}입니다.")
    }
}
```
object코드 블록 안의 프로퍼티와 메서드는 클래스명에 도트 연산자를 붙여서 생성자 없이 직접 호출할 수 있습니다.
```kotlin
Pig.name = "Mikey"
Pig.printName()
```

### 컴패니언 오브젝트 (companion object)
companion object는 일반 클래스에 object 기능을 추가하기 위해서 사용합니다.
```kotlin
class Pig {
    companion object {
        var name: String = "None"
        fun printName() {
            Log.d("class", "Pig의 이름은 ${name}입니다.")
        }
    }
    fun walk() {
        Log.d("class", "Pig가 걸어갑니다.")
    }
}
```
그리고 class로 선언했기 때문에 일반 함수인 walk()는 생성자인 Pig()를 호출한 다음 변수에 저장한 후에 사용할 수 있습니다.
```kotlin
// companion object 안의 코드 사용하기
Pig.name = "Linda"
Pig.printName()
```
```kotlin
// companion object 밖의 코드 사용하기
val cutePig = Pig()
cutePig.walk()
```

## 7.5 데이터 클래스
코틀린은 간단한 값의 저장 용도로 데이터 클래스<sup>data class</sup>를 제공합니다.
```kotlin
// 정의 - 주로 코드 블록 (클래스 스코프)를 사용하지 않고 간단하게 사용합니다.
data class UserData(val name: String , val age: Int)
// 생성 - 일반 class의 생성자 함수를 호출하는 것과 동일합니다.
var userData = UserData("Michael", 21)

// name은 val로 선언되었기 때문에 변경 불가능합니다.
userData.name = "Sindy" (☓)
userData.age = 18 (◯)
```
### toString() 메서드와 copy() 메서드
일반 클래스에서 toString() 메서드를 호출하면 인스턴스의 주소 값을 반환하지만, 데이터 클래스는 값을 반환하기 때문에 실제 값을 모니터링할 때 좋습니다.
```kotlin
Log.d("DataClass", "DataUser는 ${dataUser.toString()}")
```

copy() 메서드로 간단하게 값을 복사할 수 있습니다.
```kotlin
var newData = datUser.copy()
```

이처럼 클래스와 사용법이 동일하지만 주로 네트워크를 통해 데이터를 주고받거나, 혹은 로컬 앱의 데이터베이스에서 데이터를 다루기 위한 용도로 사용하는 것이 데이터 클래스입니다.

## 7.6 클래스의 상속과 확장
코틀린은 클래스의 재사용을 위해 상속을 지원합니다.
상속을 사용하면 부모 클래스의 메서드와 프로퍼티를 마치 내 클래스의 일부처럼 사용할 수 있습니다.
그러면 왜 상속을 사용할까요?
안드로이드에는 Activity라는 클래스가 미리 만들어져 있으며, 이 Activity ``클래스 내부``에는 ``글자를 쓰는 기능``,  ``화면에 새로운 창을 보여주는 기능``이 미리 정의되어 있습니다.
상속이 있기에 이런 기능을 직접 구현하지 않고 Activity 클래스를 상속받아 약간의 코드만 추가하면 앱에 필요한 기능을 추가할 수 있습니다.

```kotlin
class Activity {
    fun drawText()
    fun draw()
    fun showWindow()
}
```
```kotlin
class MainActivity: Activity {
    fun onCreate() {
        draw("새 그림")
    }
}
```

### 클래스 상속
상속 대상이 되는 부모 클래스는 open 키워드로 만들어야만 자식 클래스에서 사용할 수 있습니다.

### 생성자 파라미터가 있는 클래스의 상속
상속될 부모 클래스의 생성자에 파라미터가 있다면 자식 클래스의 생성자를 통해 값을 전달할 수 있습니다.
```kotlin
class CustomView: View {
    constructor(ctx: Context): super(ctx)
    constructor(ctx: Context, attrs: AttributeSet): super(ctx, attrs)
}
```

### 부모 클래스의 프로퍼티와 메서드 사용하기
부모 클래스에서 정의된 프로퍼티와 메서드를 내 것처럼 사용할 수 있습니다.
```kotlin
open class Parent {
    var hello: String = "안녕하세요"
    fun sayHello() {
        Log.d("inheritance", "${hello}")
    }
}
```

### 프로퍼티와 메서드의 재정의: 오버라이드
상속받은 부모 클래스의 프로퍼티와 메서드 중에 자식 클래스에서는 다른 용도로 사용해야 하는 경우도 있습니다.
오버라이드로 Child클래스의 메서드도 sayHello라고 하는 것이 의미상 더 적합합니다.
동일한 이름의 메서드나 프로퍼티를 사용할 필요가 있을 경우에 override 키워드를 사용해서 재정의할 수 있습니다.
오버라이드할 때는 프로퍼티나 메서드도 클래스처럼 앞에 open을 붙여서 상속할 준비가 되어 있어야 합니다.

### 메서드 오버라이드
상속할 메서드 앞에 open 키워드를 붙이면 오버라이드할 수 있지만, open 키워드가 없는 메서드는 오버라이드할 수 없습니다.
```kotlin
open class BaseClass {
    open fun opened() {

    }
    fun notOpen() {

    }
}
```
```kotlin
class ChildClass: BaseClass() {
    override fun opened() {

    }
}
```

### 프로퍼티 오버라이드
메서드 오버라이드처럼 프로퍼티 역시 open으로 열려 있어야만 오버라이드를 할 수 있습니다.
```kotlin
open class BaseClass2 {
    open var opened: String = "I am"
}
class ChildClass2: BaseClass2() {
    override var opened: String = "You are"
}
```

### 익스텐션
코틀린은 클래스, 메서드, 프로퍼티에 대해 익스텐션<sup>Extensions</sup>를 지원합니다.
이미 만들어져 있는 클래스에 다음과 같은 형태로 메서드를 추가할 수 있습니다.
상속이 미리 만들어져 있는 클래스를 가져다 쓰는 개념이라면 익스텐션은 미리 만들어져 있는 클래스에 메서드를 넣는 개념입니다. 
```kotlin
class MyClass {
    fun say()
    fun walk()
    fun eat()
}
MyClass.sleep() {
    // 실행코드
}
```
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        testStringExtension()
    }

    // String 익스텐션 테스트 하기
    fun testStringExtension() {
        var original = "Hello"
        var added = "Guys~"
        // plus 메서드를 사용해서 문자열을 더할 수 없습니다.
        Log.d("Extension", "added를 더한 값은 ${original.plus(added)}입니다.")
    }
}
fun String.plus(word: String): String {
    return this + word;
}
```
```text
added를 더한 값은 Hello Guys~입니다.
```

이어서 클래스의 상속과 확장을 코드 하나로 살펴보겠습니다.
```kotlin
package kr.co.hanbit.controlflow4

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. 부모 클래스 직접 호출하기
        var parent = Parent()
        parent.sayHello()
        // 2. 자식 클래스 호출해서 사용하기
        var child = Child()
        child.myHello()

        testStringExtension()
    }
    // String 익스텐션을테스트 합니다.
    fun testStringExtension() {
        var original = "Hello"
        var added = " Guys~"
        // plus메서드를 사용해서 문자열을 더할 수 있습니다.
        Log.d("Extension", "added를 더한 값은 ${original.plus(added)}입니다.")
    }
}
// 상속 연습
open class Parent {
    var hello: String = "안녕하세요"
    fun sayHello() {
        Log.d("Extension", "${hello}")
    }
}
class Child: Parent() {
    fun myHello() {
        hello = "Hello"
        sayHello();
    }
}
// 메서드 오버라이드 연습
open class BaseClass {
    open fun opened() {

    }
    fun notOpened() {

    }
}
class ChildClass: BaseClass() {
    override fun opened() {

    }
    //override fun notOpened() {}
}
// 프로퍼티 오버라이드 연습
open class BaseClass2 {
    open var opened: String = "I am"
}
class ChildClass2: BaseClass2() {
    override var opened: String = "You are"
}
fun String.plus(word: String): String {
    return this + word
}
```
```text
안녕하세요
Hello
added를 더한 값은 Hello Guys~입니다.
```

## 7.7 설계 도구

### 추상화
프로그래밍을 하기 전 개념 설계를 하는 단계에서 클래스의 이름과 클래스 안에 있음 직한 기능을 유추해서 메서들 이름을 먼저 나열합니다.
이때 명확한 코드는 설계 단계에서 메서드 블록 안에 직접 코드를 작성하는데, 그렇지 않은 경우에는 구현 단계에서 코드를 작성하도록 메서드의 이름만 작성합니다.
이것을 추상화<sup>Abstract</sup>라고 합니다.
```kotlin
abstract class Animal {
    fun walk() {
        Log.d("abstract", "걷습니다")
    }
}
```
walk 는 명확하게 걸어가는 행위지만 move는 어떤 동물이냐에 따라서 달라질 수 있습니다.
```kotlin
class Bird: Animal() {
    override fun move() {
        Log.d("abstract", "날아서 이동합니다.")
    }
}
```

### 인터페이스
인터페이스<sup>Interface</sup>는 실행 코드 없이 메서드 이름만 가진 추상 클래스입니다.
인터페이스는 상속 관계의 설계보다는 외부 모듈에서 내가 만든 모듈을 사용할 수 있도록 메서드의 이름을 나열해둔 일종의 명세서로 제공됩니다.

### 인터페이스 만들기
```kotlin
interface InterfaceKotlin {
    var variable: String
    fun get()
    fun set()
}
```

### 클래스에서 구현하기
인터페이스를 클래스에서 구현할 때는 상속과는 다르게 생성자를 호출하지 않고 인터페이스 이름만 지정해주면 됩니다.
```kotlin
class KotlinImpl: InterfaceKotlin {
    override var variable: String = "init value"
    override fun get() {
        // 코드 구현
    
    }
    override fun set() {
        // 코드 구현
    }
}
```
인터페이스를 클래스의 상속 형태가 아닌 소드 코드에서 직접 구현할 때도 있는데, object 키워드를 사용해서 구현해야 합니다.
```kotlin
var kotlinImpl = object: InterfaceKotlin {
    override var variable: String = "init"
    override fun get() {
        // 코드
    }
    override fun set() {
        // 코드
    }
}
```

### 접근 제한자
코틀린에서 정의되는 클래스, 인터페이스, 메서드, 프로퍼티는 모두 접근 제한자<sup>Visibility Modifiers</sup>를 가질 수 있습니다.
internal 접근 제한자로 모듈 간에 접근을 제한할 수 있습니다.

#### 접근 제한자의 종류
| 접근 제한자 | 제한 범위 |
| --- | --- |
| private | 다른 파일에서 접근할 수 없습니다. |
| internal | 같은 모듈에 있는 파일만 접근할 수 있습니다. |
| protected | private 와 같으나 상속 관계에서 자식 클래스가 접근할 수 있습니다. |
| public | 제한 없이 모든 파일에서 접근할 수 있습니다. |

#### 접근 제한자의 적용
접근 제한자를 붙이면 해당 클래스, 맴버 프로퍼티 또는 메서드에 대한 사용이 제한됩니다.
```kotlin
open class Parent {
    private val privateVal = 1
    protected open val protectedVal = 2
    internal val internalVal = 3
    val detaultVal = 4
}
```
자식 클래스에서 부모 클래스를 상속받고 테스트 합니다.
```kotlin
class Child: Parent() {
    fun callVariables() {
        // privateVal은 호출이 안됩니다.
        // protected 맴버 protectedVal은 상속 관계이므로 접근할 수 있습니다.
        Log.d("Modifier", "protected 변수의 값은 ${protectedVal}")
        // internal 맴버 internalVal은 동일한 모듈이므로 접근할 수 있습니다.
        Log.d("Modifier", "internal 변수의 값은 ${internalVal}")
        // 접근 제한자가 없는 맴버 defaultVal에는 public이 적용되어 접근할 수 있습니다.
        Log.d("Modifier", "기본 제한자 변수 defaultVal의 값은 ${defaultVal}")
    }
}
```
상속 관계가 아닌 외부 클래스에서 Parent 클래스를 생성하고 사용해봅니다. 
상속 관계가 아니기 때문에 public 과 internal에만 접근할 수 있습니다.
```kotlin
class Stranger {
    fun callVariables() {
        val parent = Parent()
        Log.d("Modifier", "internal 변수의 값은 ${parent.internalVal}입니다.");
    }
}
```

### 제네릭
제네릭<sup>Generics</sup>은 입력되는 값의 타입을 자유롭게 사용하기 위한 설계 도구입니다.
다음은 자주 사용되는 MutableList클래스의 원본 코드를이해하기 쉽게 변형한 코드입니다.
```kotlin
public interface MutableList<E> {
    var list = Array<E>
    ...
}
```

클래스명 옆에 ``<E>``라고 되어 있는 부분에 String과 같은 특정 타입이 지정되면 클래스 내부에 선언된 모든 ``E``는 ``String`` 타입으로 지정됩니다.
결과적으로 ``var list: Array<E>``가 ``var list: Array<String>``으로 변형되는 것입니다.

```kotlin
var list: MutableList<제네릭> = mutableListOf("월", "화", "수")
```
```kotlin
fun testGenerics() {
    // String을 제네릭으로 사용했기 때문에 list 변수에는 문자열만 담을 수 있습니다.
    var list: MutableList<String> = mutableListOf()
    list.add("월")
    list.add("화")
    list.add("수")
    // list.add(35) // <- 입력오류가 발생함
    // String 타입의 item 변수로 꺼내서 사용할 수 있음
    for (item in list) {
        Log.d("Generic", "list에 입력된 값은 ${item}입니다.")
    }

}
```
지금까지 배운 내용을 코드로 살펴보겠습니다.
```kotlin
package kr.co.hanbit.designtool

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 접근 제한자 테스트
        var child = Child()
        child.callVariables()

        // 부모 클래스 직접 호출해보기
        var parent = Parent()
        Log.d("Visibility", "Parent : 기본 제한자 defaultVal 의 값은 ${parent.defaultVal}")
        Log.d("Visibility", "Parent : internalVal의 값은 ${parent.internalVal}")
    }
}
// 추상 클래스 설계
abstract class Animal {
    fun walk() {
        Log.d("abstract", "걷습니다.")
    }
    abstract fun move()
}
// 구현
class Bird: Animal() {
    override fun move() {
        Log.d("abstract", "날아서 이동합니다.")
    }
}
// 인터페이스 설계
interface InterfaceKotlin {
    var variable: String
    fun get()
    fun set()
}
// 구현
class KotlinImpl: InterfaceKotlin {
    override var variable: String = "init value"
    override fun get() {
        // 코드 구현
    }
    override fun set() {
        // 코드 구현
    }
}
// 접근제한자 테스크를 위한 부모 클래스
open class Parent() {
    private val privateVal = 1
    protected open val protectedVal = 2
    internal val internalVal = 3
    val defaultVal = 4
}
// 자식 클래스
class Child: Parent() {
    fun callVariables() {
        // private은 호출이 안 됩니다.
        Log.d("Visibility", "Child: protectedVal의 값은 ${protectedVal}")
        Log.d("Visibility", "Child: internalVal의 값은 ${internalVal}")
        Log.d("Visibility", "Child: 기본 제한자 defaultVal의 값은 ${defaultVal}")
    }
}
```
```text
Child: protectedVal의 값은 2
Child: internalVal의 값은 3
Child: 기본 제한자 defaultVal의 값은 4
Parent : 기본 제한자 defaultVal 의 값은 4
Parent : internalVal의 값은 3
```

# 8. null값에 대한 안정적인 처리: Null Safety
코틀린은 null값의 처리에 많은 공을 들인 언어입니다.

## 8.1 null 값 허용하기: ?
코틀린에서 지정하는 기본 변수는 모두 null이 입력되지 않습니다.
null값을 입력하기 위해서는 변수를 선언할 때 타입 뒤에 ? (Nullable, 물음표)를 입력합니다.

### 변수에 null 허용 설정하기
```kotlin
var nullable: String? // 타입 다음에 물음표를 붙여서 null 값을 입력할 수 있습니다.
nullable = null

var notNullable: String
notNullable = null // 일반 변수에는 null을 입력할 수 없습니다.
```

### 함수 파라미터에 null 허용 설정하기
안드로이드의 onCreate() 메서드의 Bundle 파라미터처럼 함수의 파라미터에도 null 허용 여부를 설정할 수 있습니다.
```kotlin
fun nullParameters(str: String?) {
    if (str != null) {
        var length2 = str.lengths
    }
}
```
이 코드에서처럼 str파라미터를 조건문 if에서 null인지 아닌지 체크해야지만 사용할 수 있습니다.

### 함수의 리턴 타입에 null 허용 설정하기
함수의 리턴 타입에도 물음표를 붙여서 null 허용 여부를 설정할 수 있습니다.
```kotlin
fun nullReturn(): String? {
    return null
}
```
함수의 리턴 타입에 Nullable이 지정되어 있지 않으면 null값을 리턴할 수 없습니다.

## 8.2 안전한 호출: ?.
변수를 Nullable로 만들기 위해서 물음표를 사용했습니다. 이제는 ```?.```(Safe Call, 물음표와 온점)을 사용해서 null체크를 좀 더 간결하게 하겠습니다.
Nullable인 변수 다음에 ``?.``을 사용하면 해당 변수가 null일 경우 ``?.`` 다음의 메서드나 프로퍼티를 호출하지 않습니다.
다음 코드에서처럼 문자열의 길이를 반환하는 length 프로퍼티를 호출했는데 str변수 자체가 null일 경우 length프로퍼티를 호출하지 않고 바로 null을 반환합니다.
```
fun testSafeCall(str: String?): Int? {
    // str이 null이면 length를 체크하지 않고 null을 반환합니다.
    var resultNull: int? = str?.length
    return resultNull
}
```

### 8.3 Null 값 대체하기: ?:
``?:``(Elvis Operator, 물음표와 콜론) 을 사용해서 원본 변수와 null일 때 넘겨줄 기본값을 설정해보겠습니다.
다음 코드에서 Safe Call다음에 호출되는 프로퍼티 뒤에 다시 ``?:`` 을 붙였습니다.
그리고 0이라는 값을 표시했습니다.
이렇게 호출하면 str변수가 null일 경우 가장 뒤에 표시한 0을 반환합니다.
```kotlin
fun testElvis(str: String?): Int {
    // length 오른쪽에 ?:을 사용하면 null일 경우 ?:오른쪽 값이 반환됩니다.
    var resultNotNull: Int = str?.length?:0
    return resultNotNull
}
```


# 9. 지연 초기화
코틀린은 지연 초기화를 사용하는데 이는 클래스의 코드에 Nullable(?)처리가 남용되는 것을 방지해줍니다.

## 9.1 lateinit
개발을 하다 보면 클래스 안에서 변수(프로퍼티)만 Nullable로 미리 선언하고 초기화(생성자 호출)를 나중에 해야할 경우가 있는데, 이럴 경우 lateinit키워드를 사용할 수 있습니다.

### Nullable로 선언하는 일반적인 방법
일반적인 선언 방식으로 처음에 null값을 입력해두고, 클래스의 다른 메서드 영역에서 값을 입력합니다.
```kotlin
class Person {
    var name: String? = null
    init {
        name = "Lione1"
    }
    fun process() {
        name?.plus(" Messi")
        print("이름의 길이 = ${name?.length}")
        print("이름의 첫 글자 = ${name?.substring(0, 1)}")
    }
}
```

### lateinit을 사용하는 방법
lateinit을 사용하면 Safe Call을 쓰지 않을 수 있기 때문에 코드에서 발생할 수 있는 수많은 ``?``를 방지할 수 있습니다.
```kotlin
class Person {
    lateinit var name: String
    init {
        name = "Lione1"
    }
    fun process() {
        name.plus(" Messi")
        print("이름의 길이 = ${name.length}")
        print("이름의 첫 글자 = ${name.substring(0, 1)}")
    }
}
```

lateinit의 특징은 다음 세 가지를 들 수 있습니다.
- var 로 선언된 클래스의 프로퍼티에만 사용할 수 있습니다.
- null은 허용되지 않습니다.
- 기본 자료형 Int, Long, Double, Float등은 사용할 수 없습니다.


## 9.2 lazy
lazy는 읽기 전용 변수인 val을 사용하는 지연 초기화입니다.
lateinit이 입력된 값을 변경할 수 있는 반면, lazy는 입력값을 변경할 수 없습니다.
```kotlin
class Company {
    val person: Person by lazy { Person() }
    init {
        // lazy는 선언 시에 초기화를 하기 때문에 초기화 과정이 필요없습니다.
    }
    fun process() {
        print("person의 이름은 ${person.name}") // 최초 호출하는 시점에 초기화됩니다.
    }
}
```
lazy는 주의해서 사용해야 합니다.
지연 초기화는 말 그대로 최초 호출되는 시점에 초기화 작업이 일어나기 때문에 초기화하는 데 사용하는 리소스가 너무 크면 (메모리를 많이 쓰거나 코드가 복잡한 경우) 전체 처리 속도에 나쁜 영향을 미칠수 있습니다.


# 10. 스코프 함수
스코프 함수<sup>Scope functions</sup>는 코들르 축약해서 표현할 수 있도록 도와주는 함수이며 영역 함수라고도 합니다.
사용법은 함수처럼 쓰지 않고 ``run``, ``let``처럼 괄호 없이 일종의 키워드같이 사용할 수 있습니다.

## 10.1 run과 let으로 보는 스코프 함수
``run``과 ``let``은 자신의 함수 스코프(코드 블록) 안에서 호출한 대상을 this와 it로 대체해서 사용할 수 있습니다.

### run
다음 예제에서는 MutableList를 run함수를 이용해서 스코프를 지정한 후 내부에서 size 프로퍼티를 직접 호출하였습니다.
```kotlin
var list = mutableListOf("Scope", "Function")
list.run {
    var listSize = size
    println("리스트의 길이 run = $listSize")
}
```

### let
함수 영역 안에서 호출한 대상을 it으로 사용할 수 있습니다.
it을 생략할 수는 없지만 target등 다른 이름으로 바꿀 수 있습니다.
```kotlin
var list = mutableListOf("Scope", "Function")
list.let {
    // it -> 생략된 형태. it -> 대신에 target -> 등으로 변경 가능합니다.
    val listSize = it.size // 모든 속성과 함수를 it 맴버로 사용할 수 있습니다.
    println("리스트의 길이 let = $listSize")
}
```

## 10.2 this와 it으로 구분하기

### this로 사용되는 스코프 함수: run, apply, with
다음은 apply와 with의 사용 예제입니다. 스코프 함수 안에서 this로 사용되기 때문에 메서드나 프로퍼티를 직접 호출합니다.
```kotlin
var list = mutableListOf("Scope", "Function")
list.apply {
    val listSize = size
    println("리스트의 길이 apply = $listSize")
}

with (list) {
    val listSize = size
    println("리스트의 길이 with = $listSize)
}
```

### it으로 사용되는 스코프 함수: let, also
```kotlin
var list = mutableListOf("Scope", "Function")
list.let {
    target ->  // it을 target등과 같이 다른 이름으로 변경 가능합니다.
    val listSize = target.size // target으로 변경했기 때문에 맴버 접근은 target.속성입니다.
    println("리스트의 길이 let = $listSize")
}

list.also {
    val listSize = it.size
    println("리스트의 길이 also = $listSize")
}
```

## 10.3 반환값으로 구분하기

### 호출 대상인 this 자체를 반환하는 스코프 함수: apply, also
``apply``를 사용하면 스코프 함수 안에서 코드가 모두 완료된 후 자기 자신을 되돌려줍니다.
예제에서 apply 스코프의 마지막 줄에서 count()를 호출했지만 마지막 코드와 상관없이 그냥 MutableList자신을 돌려주기 때문에 Cope, Function에 Apply가 추가된 값이 출력됩니다.
```kotlin
var list = mutableListOf("Scope", "Function")

var afterApply = list.apply {
    add("Apply")
    count()
}
println("반환값 apply = $afterApply")

val afterAlso = list.also {
    it.add("Also")
    it.count()
}
println("반환값 also = $afterAlso")
```
```text
반환값 apply = [Scope, Function, Apply]
반환값 also = [Scope, Function, Apply, Also]
```

### 마지막 실행 코드를 반환하는 스코프 함수: let, run, with
let, run, with 의 결괏값을 반환하는 경우에는 앞의 2개와는 완전히 다른 결과가 나올 수 있으므로 주의해야 합니다.
자기 자신이 아닌 스코프의 마지막 코드를 반환하기 때문입니다.

``let``에서 스코프 마지막 코드가 ``it.count()``로 종료되었습니다.
``apply``나 ``also``라면 마지막 코드에 상관없이 ``Scope, Function, Run``이 출력되지만 ``let``은 마지막 코드가 반환되기 때문에 출력값으로 리스트의 개수인 ``3``이 출력됩니다.
``run``과 ``with``역시 마지막 코드가 반환됩니다.

```kotlin
var list = mutableListOf("Scope", "Function")

var lastCount = list.let {
    it.add("Run")
    it.count()
}
println("반환값 let = $lastCount")

val lastItem = list.run {
    add("Run")
    get(size - 1)
}
println("반환값 run = $lastItem")

val lastItemWith = with (list) {
    add("With")
    get(size - 1)
}
println("반환값 with = $lastItemWith")
```
```text
반환값 let = 3
반환값 run = Run
반환값 with = With
```

<style>
.page-container {max-width: 1200px}
</style>