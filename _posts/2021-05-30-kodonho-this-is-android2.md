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


# 2. 조건문

## 3.1 조건문 if

### if ~ else 문 사용하기
```java
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
```java
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
```java
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
```java
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
```java
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
```java
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

# 배열과 컬렉션
![1]({{site.baseurl}}/images/this-is-android/this-is-android-52.png){: style="box-shadow: 0 0 5px #777"}

## 4.1 배열
여러 개의 값을 담을 수 있는 대표적인 자료현인 배열<sup>Array</sup>은 값을 담기 전에 먼저 배열 공간의 개수를 할당하거나 초기화 시에 데이터를 저장해두면 데이터의 개수만큼 배열의 크기가 결정됩니다.
```java
var students = IntArray(10)
var longArray = LongArray(10)
var charArray = CharArray(10)
var floatArray = FloatArray(10)
var doubleArray = DoubleeArray(10)
```

### 문자 배열에 빈 공간 할당하기
String은 기본 타입이 아니기 때문에 StringArray는 없지만 다음과 같이 사용할 수 있습니다.
괄호 안의 ``첫 번째 숫자인 10만 변경해서 사용하면 그 숫자만큼 빈 문자열로 된 배열 공간을 할당``합니다.
```java
var stringArray = Array(10, {item->""})
```

### 값으로 배열 공간 할당하기
arrayOf함수를 사용해서 String값을 직접 할당할 수도 있습니다.
```java
var dayArray = arrayOf("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN")
```

### 배열에 값 입력하기
1. 배열을 선언한 변수명 옆에 대괄호 ([])를 사용하고, 대괄호 안에 값을 저장할 위치의 인덱스 번호를 작성합니다.
```java
students[9] = 99
```
1. set함수를 사용할 수 있습니다
```java
students.set(8, 98)
```

### 배열에 있는 값 꺼내기
값을 입력할 때 같은 방식으로 인덱스로 값을 가져올 수 있습니다. 저장할 때와 마찬가지로 대괄호 안에 인덱스를 입력해서 가져올 수 있으며 꺼너낸 배열의 함수는 get() 입니다.
```java
var student = students[9]
var student = students.get(8)
```

```java
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
```java
var mutableList = mutableListOf("MON", "TUE", "WED")
```

#### ‘List’에 값 추가히기: add
```java
mutableList.add("TUE")
```
add 함수를 사용하면 입력될 위치인 인덱스를 따로 지정해주지 않아도 입력되는 순서대로 인덱스가 저장됩니다.

#### ‘List’에 입력된 값 사용하기: get
```java
var variable = mutableList.get(1)
```

#### ‘List’값 수정하기: set
```java
mutableList.set(1, "수정할 값")
```

#### ‘List’에 입력된 값 제거하기: removeAt
```java
mutableList.removeAt(1)
```

#### ‘Empty List’ 사용하기
아무것도 없는 빈 리스트를 생성하면 앞으로 입력되는 값의 데이터 타입을 알 수 없기 때문에 값의 타입을 추론할 수 없습니다.
그래서 빈 컬렉션의 경우 앞에서처럼 ``‘데이터 타입Of’``만으로는 생성되지 않고 데이터 타입을 직접적으로 알려주는 방법을 사용해야 합니다.
```java
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
```java
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
```java
var set = mutableSetOf<String>()
```

#### ‘Empty Set’ 으로 초기화하고 값 입력하기
```java
var set = mutableSetOf<String>()
set.add("JAN")
set.add("FEB")
set.add("MAR")
```

#### ‘Set’ 사용하기
``Set``은 인덱스로 조회하는 함수가 없기 때문에 특정 위치의 값을 직접 사용할 수 없습니다.
```java
Log.d("Collection", "Set 전체 출력 = ${set}")
```

#### ‘Set’ 삭제하기
``Set``은 값이 중복되지 않기 때문에 값으로 직접 조회해서 삭제할 수 있습니다.
```java
set.remove("FEB")
```

```java
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
```java
var mpa = mutableMapOf<String, String>()
```

#### ‘Empty Map’ 으로 생성하고 값 추가히기
값을 추가하기 위해 제공되는 ``map``에서 제공되는 ``put``함수에 키와 값을 입력하면 됩니다.
```java
var map = mutableMapOf<String, String>()
map.put("key1", "value1")
map.put("key2", "value2")
map.put("key3", "value3")
```

#### ‘Map’ 사용하기
``get`` 함수에 ``key``를 직접 입력해서 값을 꺼낼 수 있습니다.
```java
Log.d("CollectionMap", "map에 입력된 key1의 값은 ${map.get("key1")}입니다.")
```

#### ‘Map’ 수정하기
``put``함수를 사용할 때 동일한 키를 가진 값이 있으면 키는 유지된 채로 그 값만 수정됩니다.
```java
map.put("key2", "수정")
```
#### ‘Map’ 삭제하기
``remove``함수에 key를 입력해서 value을 삭제할 수 있습니다. 리스트와는 다르게 인덱스에 해당하는 key의 값이 변경되지 않고 그대로 유지됩니다.
```java
map.remove("key2")
```

```java
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
```java
val IMMUTABLE_LIST = listOf("JAN", "FEB", "MAR") // 생성
Log.d("Collection", "리스트의 두 번째 값은 ${IMMUTABLE_LIST.get(1)}입니다.") // 사용
```
```java
val DAT_LIST = listOf("월", "화", "수", "목", "금", "토", "일")
```

## 5. 반복문

### 5.1 for 반복문
#### for in .. ㅣ 일반적인 형태의 for 반복문
```java
for (index in 1..10) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

#### until: 마지막 숫자 제외하기
```java
var array = arrayOf("JAN", "FEB", "MAR", "APR", "MAY" "JUN")
for (index in 0 until array.size) {
    Log.d("For", "현재 월은 ${array.get(index)}입니다.")
}
```

#### step: 건너뛰기
```java
for (index in 0..100 step 3) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

#### downTo: 감소시키기
```java
for (index in 10 downTo 0) {
    Log.d("For", "현재 숫자는 ${index}")
}
```

#### 배열, 컬렉션에 들어 있는 엘리먼트 반복하기
배열이나 컬렉션을 엘리먼트 개수만큼 반복하면서 사용할 수 있습니다.
```java
var arrayMonth = arrayOf("JAN", "FEB", "MAR", "APR", "MAY", "JUN")
for (month in arrayMonth) {
    Log.d("for", "현재 월은 ${month}입니다.")
}
```
```java
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
```java
var current = 1
val until = 12
while (current < until) {
    Log.d("while", "현재 값은 ${current}입니다.")
    current = current + 1
}
```
### do와 함께 사용하기
do와 함께 사용하면 while 문의 조건식과 관계없이 do 블록 안의 코드를 한 번 실행합니다.
```java
var game = 1
val match = 6
do {
    Log.d("while", "${game}게임 이겼습니다. 우승까지 ${match - game}게임 남았습니다.")
    game += 1
} while (game < match)
```

## 5.3 반복문 제어하기
### break: 반복문 탈출하기
```java
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
```java
for (except in 1..10) {
    if (except > 3 && except < 8) {
        continue
    }
    Lod.d("continue", "현재 index는 ${except}입니다.")
}
```

```java
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
```java
fun square(x: Int): Int {
    return x * x;
}
```
square 함수가 호출되면 입력값을 제곱해서 호출한 측으로 반환하고 실행이 종료됩니다.

### 반환값이 없는 함수의 정의
다음은 반환값 없이 입력값을 받아서 Log로 출력하는 함수 printSum()을 정의했습니다.
```java
fun printSum(x: Int, y: Int) {
    Log.d("fun", "x + y = ${x + y}")
}
```

### 입력값 없이 반환값만 있는 함수의 정의
getPi 함수는 호출한 측으로 3.14 를 반환하고 실행이 종료됩니다.
```java
fun getPi(): Double {
    return 3.14
}
```

## 6.2 함수의 사용

### 반환값과 입력값이 있는 함수의 호출
```java
var squareResult = square(30)
Log.d("fun", "30의 제곱은 ${squareResult}입니다.")
```

### 반환값이 없는 함수의 호출
```java
printSum(3, 5)
```

### 입력값이 없는 함수의 호출
```java
val PI = getPi()
Log.d("fun", "지름이 10인 원의 둘레는 ${10 * PI}입니다.")
```


<style>
.page-container {max-width: 100%}‘’
</style>
