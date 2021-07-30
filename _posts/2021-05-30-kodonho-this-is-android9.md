---
layout: post
title:  "[IT] - [BOOK] 9강 - 이것이 안드로이드다 with 코틀린 "
description: 스레드와 코루틴
date:   2021-06-07 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android9/
width: large
---

* some text
{: toc}


# 1. 스레드와 루퍼

<u>안드로이드의 스레드</u> 는 크게 ``1개만 존재하는 메인 스레드``와 ``여러 개가 존재할 수 있는 백그라운드 스레드``로 나눌 수 있습니다.


## 1.1 메인 스레드 (UI 스레드)

안드로이드 시스템은 새로운 앱을 실행하면 새로운 리눅스 프로세스를 시작합니다.

기본적으로 메인 액티비티를 비롯한 모든 컴포넌트는 단일 프로세스 및 메인 스레드에서 실행됩니다.

안드로이드의 메인 스레드는 다음과 같은 특징과 제약사항이 있습니다.

- ``화면의 UI를 그리는 처리를 담당합니다.``

- ``안드로이드 UI 툴킷의 구성 요소 (android.widget, android.view...)와 상호작용하고, UI 이벤트를 사용자에게 응답하는 스레드입니다.``

- ``UI 이벤트 및 작업에 대해 수 초 내에 응답하지 않으면 안드로이드 시스템은 ANR (Application Not Responding, 응용 프로그램이 응답하지 않음) 팝업창을 표시합니다. 따라서 시간이 오래 걸리는 코드는 새로운 스레드를 생성해서 처리햐야 합니다.``


## 1.2 백그라운드 스레드

네크워크 작업, 파일 업로드와 다운로드, 이미지 처리, 데이터 로딩 등은 짧은 시간 안에 끝난다고 하더라도 처리 시간을 미리 계산할 수는 없습니다.

큰 파일은 다운로드 시간이 오래 걸리고, 작은 파일은 빨리 끝날 테니까요.

그래서 안드로이드 시스템은 메모리 이외의 다른 곳에서 데이터를 가져오는 작업을 백그라운드 스레드에서 처리하는 것을 권장합니다.

백그라운드 스레드를 생성하는 방법은 다음과 같습니다.

### Thread 객체

Thread 클래스를 상속받아 스레드를 생성할 수 있습니다.

1. Thread 클래스를 상속받는 WorkerThread 클래스를 정의합니다. 그리고 스레드가 처리할 로직을 정의하는 run() 메서드를 오버라이드 합니다.
    ```kotlin
    class WorkerThread: Thread() {
        override fun run() {
            
        }
    }
    ```

1. run() 메서드에서 변수 i를 선언합니다. 그리고 변수 i의 값이 10이 될 때까지 반복하며 로그캣 창에 출력하는 코드를 작성합니다. run() 메서드의 실행이 끝나면 스레드는 종료됩니다.
    ```kotlin
    override fun run() {
        var i = 0
        while (i < 10) {
            i += 1
            Log.i("WorkerThread", "$i")
        }
    }
    ```

1. WorkerThread 객체를 생성해 별도의 스레드를 생성하고 start() 메서드를 호출하면 run() 메서드에 저으이된 로직을 생성된 스레드가 처리합니다.
    ```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        var thread = WorkerThread()
        thread.start()
    }
    ```

### Runnable 인터페이스

Runnable 인터페이스를 구현해 스레드를 생성할 수 있습니다. Runnable 인터페이스는 다중 상속을 허용하지 않는 코틀린 언어의 특성상 상속 관계에 있는 클래스도 구현할 수 있도록 지원하는 모델입니다.

1. Runnable 인터페이스를 구현하는 WorkerRunnable 클래스를 정의합니다. 그리고 스레드가 처리할 로직을 정의하는 run() 메서드를 구현합니다.
    ```kotlin
    class WorkerRunnable: Runnable {
        override fun run() {
            var i = 0
            while (i < 10) {
                i += 1
                Log.i("WorkerRunnable", "$i")
            }
        }
    }
    ```

1. Thread를 상속받은 객체와 달리 Runnable 인터페이스를 구현한 객체는 Thread 클래스의 생성자로 전달되고 Thread 클래스의 start() 메서드를 호출해야 스레드가 생성됩니다.
    ```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        var thread = Thread(WorkerRunnable())
        thread.start()
    }
    ```

### 람다식으로 Runnable 익명객체 구현

인터페이스 내부에 메서드가 하나만 있는 경우는 람다식으로 변환이 가능합니다.

Runnable 인터페이스를 이용한 스레드는 람다식으로 변환이 가능합니다.

```kotlin
Thread {
    var i = 0
    while (i < 10) {
        i += 1
        Log.i("LambdaThread", "$1")
    }
}
```

### 코틀린에서 제공하는 thread() 구현

코틀린에서는 다음과 같이 백그라운드를 사용할 수 있습니다. thread() 안에 파라미터로 start=true를 전달하면 thread() 안의 코드 블록이 실행됩니다.

thread 글자색이 빨간색이면 ``Alt`` + ``Enter``키로 import 해줍니다.
    ```kotlin
    thread(start = true) {
        var i = 0
        while ( i < 10) {
            i += 1
            Log.i("KotilnThread", "$1")
        }
    }
    ```

## 1.3 메인 스레드와 백그라운드 스레드

앞에서 백그라운드 스레드를 생성하고 처리하는 방법을 알아보았습니다.

이렇게 백그라운드 스레드로 메인 스레드에 집중될 수 있는 코드를 분산함으로써 더 효율적인 앱을 만들 수 있습니다.

하지만 주의할 점이 있는데, *``안드로이드에는 ‘백그라운드 스레드는 UI 구성 요소에 접근하면 안된다’``*{: style="background-color: #FFCCCC"}는 중요한 규칙이 있습니다.

4장에서 한 번 살펴보았듯이 activity_main.xml 에 텍스트뷰를 하나 만든 후 백그라운드 스레드에서 이 텍스트뷰에 1초마다 한 번씩 값을 입력하는 코드를 실행하면 FATAL EXCEPTION 예외를 발생시키고 앱이 종료됩니다.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(binding.root)

    Thread {
        var i = 0
        while (i < 10) {
            binding.textView.text = "$i"
            i += 1
            Thread.sleep(1000)
        }
    }
}
```

*``Only the original thread that created a view hierarchy can touch its views``*{: style="background-color: #FFCCCC"}

메인 스레드 이외의 스레드는 UI를 업데이트할 수 없습니다.

이 제약사항은 윈도우 프로그램이나 iOS앱과 같은 다른 애플리케이션에도 공통으로 적용되는 사항입니다.


## 1.4 핸들러와 루퍼

안드로이드는 메인 스레드와 백그라운드 스레드 및 스레드 간의 통신을 위해 핸들러<sup> (Handler) </sup>와 루퍼<sup> (Looper) </sup>를 제공합니다.

핸들러와 루퍼의 작동 원리는 다음과 같습니다.

1. 메인 스레드는 내부적으로 루퍼를 가지며 루퍼는 Message Queue를 포함합니다.

1. Message Queue는 다른 스레드 혹은 스레드 자기 자신으로부터 전달받은 메시지를 보관하는 Queue 입니다.

1. 루퍼는 Message Queue 에서 메시지, Runnable 객체를 차례로 꺼내서 핸들러가 처리하도록 전달합니다.

1. 핸들러는 루퍼로 받은 메시지, Runnable 객체를 처리하거나 메시지를 받아서 Message Queue에 넣는 스레드 간의 통신 장치입니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-258.png){: style="box-shadow: 0 0 5px #777"}


### 루퍼

루퍼<sup> (Looper) </sup>는 MainActivity가 실행됨과 동시에 for문 하나가 무한루프를 돌고 있는 서브 스레드라고 생각하면 됩니다.

이 무한루프는 대기하고 있다가 자신의 큐에 쌓인 메시지를 핸들러에 전달합니다.

여러 개의 백그라은드에서 큐에 메시지를 입력하면, 입력된 순서대로 하나씩 꺼내서 핸들러에 전달합니다.


### 핸들러

핸들러<sup> (Handler) </sup>는 루퍼가 있는 메인 스레드 (MainActivity)에서 주로 사용되며 새로 생성된 스레드들과 메인 스레드와의 통신을 담당합니다.

핸들러는 루퍼를 통해 전달되는 메시지를 받아서 처리하는 일종의 명령어 처리기로 사용됩니다.

루퍼는 앱이 실행되면 자동으로 하나 생성되어 무한루프를 돌지만, 핸들러는 개발자가 직접 생성해서 사용해야 합니다.

### 메시지

메시지<sup> (Message) </sup>는 루퍼의 큐에 값을 전달하기 위해서 사용되는 클래스입니다. 메시지 객체에 미리 정의해둔 코드를 입력하고 큐에 담아두면 루퍼가 꺼내서 핸들러에 전달합니다.


## 1.5 타이머 앱 만들기

Timer 프로젝트를 새로 생성하고 코드를 하나씩 따라해 보겠습니다.

먼저 build.gradle 파일을 열고 viewBinding 설정을 미리 추가해둡니다.

### 화면 만들기

1. activity_main.xml 파일을 열고 타이머를 컨트롤하기 위한 시작과 종료 버튼을 배치합니다. 각각의 id속성은 ‘btnStart’와 ‘btnStop’으로, text속성은 ‘시작’, ‘종료’, textSize 속성을 수정해서 알맞은 크기로 글자 크기를 키웁니다.

1. 시간을 표시할 텍스트뷰를 화면 중간에 배치하고, text 속성에는 ‘00:00’, id속성은 ‘textTimer’로 입력하고, textSize 속성으로 글자 크기를 키웁니다. gravity 속성에는 center_horizontal 과 center_vertical을 체크해 ‘true’로 수정해야 텍스트뷰 안의 텍스트가 가운데에 위치합니다. 버튼 2개와 텍스트뷰의 컨스트레인트는 우측 그림을 참고해서 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-259.png){: style="box-shadow: 0 0 5px #777"}

### 핸들러 다루기

1. MainActivity.kt 파일을 열고 바인딩을 생성한 후 binding 변수에 담고, setContentView에 binding.root를 전달합니다.
    ```kotlin
    package kr.co.hanbit.timer

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.timer.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {
        
        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. 이어서 전체시간을 저장하는 total과 시작됨을 체크할 수 있는 started를 선언합니다. 그리고 total 에는 처음 시작값으로 ‘0’초를, started는 시작되지 않았으므로 ‘false’를 입력합니다.
    ```kotlin
    var total = 0
    var started = false
    ```

1. 이제 total과 started를 이용해서 화면에 시간값을 출력하는 Handler를 구현하고 handler변수를 저장해둡니다. 이제 핸들러로 메시지가 전달되면 total에 입력되어 있는 시간(초)을 60으로 나눈 값은 분 단위로, 60으로 나눈 나머지 값은 초 단위로 사용해서 textTimer에 입력합니다.
    ```kotlin
    val handler = object: Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            val minute = String.format("%02d", total / 60)
            val second = String.format("%02d", total % 60)
            binding.textTimer.text = "$minute:$second"
        }
    }
    ```

1. onCreate() 메서드 안에서 btnStart에 클릭리스너를 달고 시작 코드를 구현합니다. 버튼이 클릭되면 먼저 started 를 true로 변경하고 새로운 스레드를 실행합니다. 스래드는 while 문의 started가 true인 동안 while문을 반복하면서 1초에 한 번씩 total의 값을 1씩 증가시키고 핸들러에 메시지를 전송합니다. 핸들러를 호출하는 곳이 하나밖에 없으므로 메시지에 0을 담아서 호출합니다.
    ```kotlin
    binding.btnStart.setOnClickListener {
        started = true
        thread(start = true) {
            while (started) {
                Thread.sleep(1000)
                if (started) {
                    total = total + 1
                    handler?.sendEmptyMessage(0)
                }
            }
        }
    }
    ```

1. btnStop에 클릭리스너를 달고 종료 코드를 구현합니다. 종료 코드에서는 started에 ‘false’, total에 ‘0’, 시간을 표시하는 텍스트뷰에는 ‘00:00’을 입력해서 초기화합니다.
    ```kotlin
    binding.btnStop.setOnClickListener {
        if (started) {
            started = false
            total = 0
            binding.textTimer.text = "00:00"
        }
    }
    ```

1. 에뮬레이터에서 실행하고 테스트합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-260.png){: style="box-shadow: 0 0 5px #777"}

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.timer

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.os.Handler
    import android.os.Looper
    import android.os.Message
    import kr.co.hanbit.timer.databinding.ActivityMainBinding
    import kotlin.concurrent.thread

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        var total = 0
        var started = false

        val handler = object: Handler(Looper.getMainLooper()) {
            override fun handleMessage(msg: Message) {
                val minute = String.format("%02d", total / 60)
                val second = String.format("%02d", total % 60)
                binding.textTimer.text = "$minute:$second"
            }
        }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)


            binding.btnStart.setOnClickListener {
                started = true
                thread(start = true) {
                    while (started) {
                        Thread.sleep(1000)
                        if (started) {
                            total = total + 1
                            handler?.sendEmptyMessage(0)
                        }
                    }
                }
            }

            binding.btnStop.setOnClickListener {
                if (started) {
                    started = false
                    total = 0
                    binding.textTimer.text = "00:00"
                }
            }
        }
    }
    ```


# 2. 코루틴

안드로이드는 앞에서 살펴본 스레드를 정량화한 코루틴<sup> (Coroutine) </sup>이라는 새로운 도구를 제공합니다.

다른 언어에서 이미 사용되고 있는 동시성 프로그래밍 개념을 코틀린에 도입한 것이 코루틴입니다.

코루틴에서 스레드는 단지 코루틴이 실행되는 공간을 제공하는 역할을 하는데, 실행 중인 스레드를 중단시키지 않기 때문에 하나의 스레드에 여러 개의 코루틴이 존재할 수 있습니다.

예를 들어 다음 그림에서 처럼 코루틴 1이 작업을 하는 도중에 코루틴 2로 코드를 넘겨도 코루틴 1만 잠시 멈출 뿐 공간을 제공하는 스레드는 계속 움직이게 됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-261.png){: style="box-shadow: 0 0 5px #777"}

이 구조를 스레드를 이용해서 처리한다면 1번에 해당하는 스레드가 잠시 멈추고 2번 스레드가 처리하도록 우선순위를 넘겨야만 가능합니다.

이런 스레드 간의 전환을 컨텍스트 스위칭 <sup> (Context Sitching) </sup>이라고 하는데 스위칭이 자주 일어나면 성능 저하가 발생합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-262.png){: style="box-shadow: 0 0 5px #777"}

코루틴은 이런 컨텍스트 스위칭을 하나의 스레드에서 처리하므로 성능 저하가 적고, 동일한 구조에서는 스레드보다 헐씬 적은 자원을 소모합니다.


## 2.1 버전에 따른 코루틴 설정

이 글을 작성하는 시점 (2020년 12월)에 안드로이드 스튜디오 4.1 버전에는 코루틴이 내장되어 있습니다.

하지만 안드로이드 스튜디오 4.2 Beta에서는 build.gradle 파일의 dependencies에 의존성을 추가해야만 사용할 수 있습니다.

버전에 따른 차이가 발생할 수 있으니 현재 사용하는 안드로이드 스튜디오에서 코루틴을 지원하는지 확인할 필요가 있습니다.

MainActivity.kt를 열고 onCreate() 메서드 안에서 CoroutineScope를 입력했을 때 자동 완성된다면 추가 설정을 하지 않아도 됩니다.

자동 완성되지 않는다면 다음과 같이 build.gradle 파일에 의존성을 추가합니다.


```kotlin
dependencies {
    ...
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
}
```

## 2.2 코루틴 스코프

코루틴은 정해진 스코프안에서 실행되는데 이것을 코루틴<sup> (Coroutine Scope) </sup>라고 합니다.

마치 앞절에서 살펴본 코틀린의 ‘thread(start = true) { /* 실행코드 */ } ’와 비슷하게 정해진 스코프안의 코드들이 코루틴에서 동작합니다.

다음은 GlobalScope.launch를 사용해서 코루틴을 실행하는 간단한 코드입니다.

```kotlin
GlobalScope.launch {
    // 여기 작성된 코드가 코루틴으로 실행됩니다.
}
```

코루틴을 실행하는 스코프에는 글로벌 스코프<sup> (GlobalScope) </sup>와 코루틴 스코프<sup> (CoroutineScpe) </sup>가 있는데 다음과 같은 사용상의 차이점이 있습니다.

- ``글로벌 스코프``: 앱의 생명 주기와 함께 동작하기 때문에 앱이 실행되는 동안은 별도의 생명주기 관리가 필요하지 않습니다. 만약 앱의 시작부터 종료될 때까지 혹은 장시간 실행되어야 하는 코루틴이 있다면 GlobalScope를 사용하면 됩니다.

- ``코루틴 스코프``: 버튼을 클릭해서 서버의 정보를 가져오거나 파일을 여는 용도라면 필요할 때 만 열고 완료되면 닫는 CoroutineScope를 사용해야 합니다.

```kotlin
binding.btnDownload.setOnClickListener {
    CoroutineScope(Dispatchers.IO).launch {
        // 여기서 이미지를 불러오는 등의 코드를 처리합니다.
    }
}
```

글로벌 스코프와는 다르게 코루틴 스코프는 괄호 안에 Dispatchers.IO라는 상숫값이 입력되어 있습니다.

이것을 디스패처라고 하는데 코루틴이 실행될 스레드를 지정하는 것이라고 생각하면 됩니다.

### 디스패처의 종류

코루틴이 실행될 스레드를 정하는 디스패처<sup> (Dispatcher) </sup>는 IO, Main, Default, Unconfined 등이 있는데, 모두 사용할 필요는 없고 우선은 IO와 Main을 잘 조합해서 사용하면 됩니다.

| 종류 | 역활 |
| :--- | :--- |
| Dispatchers.Default | CPU를 많이 사용하는 작업을 백그라운드 스레드에서 실행하도록 최적화되어 있는 디스패처입니다. 안드로이드의 기본 스레드풀 (Thread Pool)을 사용합니다.
| Dispatchers.IO | 이미지 다운로드, 파일 입출력 등의 입출력에 최적화되어 있는 디스패처입니다. |
| Dispatchers.Main |안드로이드의 기본 스레드에서 코루틴을 실행하고 UI와 상호작용에 최적화되어 있는 디스패처입니다. 택스트뷰에 글자를 입력해야 할 경우 Main 컨텍스트를 사용해야 합니다. |
| Dispatchers.Unconfined | 자신을 호출한 컨텍스트를 기본으로 사용하는데, 중단 후 다시 실행하는 시점에 컨텍스트가 바뀌면 자신의 컨텍스트도 다시 실행하는 컨텍스트를 따라갑니다. |
{: .table .table-striped .table-hover}

## 2.3 launch와 상태 관리

코루틴은 launch와 async로 시작할 수 있습니다.

launch는 상태를 관리할 수 있고 async는 상태를 관리하고 연산 결과까지 반환받을 수 있습니다.

launch는 호출하는 것만으로 코루틴을 생성할 수 있고, 반환되는 잡<sup> (Job) </sup>을 변수에 저장해두고 상태 관리용으로 사용할 수 있습니다.

생성된 코루틴에서 상태 관리 메서드를 호출하면 코루틴의 실행을 멈추거나 동작을 지연시킬 수 있습니다.

### cancel

코루틴의 동작을 멈추는 상태 관리 메서드입니다.

하나의 스코프 안에 여러 개의 코루틴이 있다면 하위의 코루틴도 모두 동작을 멈춥니다.

다음 코드의 마지막 버튼 클릭리스너에서 job의 cancel메서드가 호출되면 job 뿐만 아니라 같은 스코프에 있는 job1의 코드도 모두 동작을 중단합니다. 

```kotlin
val job = CoroutineScope(Dispatchers.Default).launch {
    var job1 = launch {
        for (i in 0..10) {
            delay(500)
            Log.d("코루틴", "결과 = $i")
        }
    }
}

binding.btnStop.setOnClickListener {
    job.cancel()
}
```

### join

상태를 관리하는 메서드로는 cancel 이외에도 join이 있는데 코루틴 스코프 안에 선언된 여러 개의 launch 블록은 모두 새로운 코루틴으로 분기되면서 동시에 처리되기 때문에 순서를 정할 수 없습니다.

이럴 때 launch 블록 끝에 join() 메서드를 사용하면 각각의 코루틴이 순차적으로 실행됩니다.

다음 코드는 코루틴 스코프 안에 2개의 코루틴이 launcher로 사용되었는데, join() 메서드로 인해 앞의 코루틴 실행이 완료된 후에 두 번째 코루틴이 실행됩니다.

```kotlin
CroutineScope(Dispatchers.default).launch() {
    launch {
        for (i in 0..5) {
            delay(500)
            Log.d("코루틴", "결과1 = $i")
        }
    }.join()

    launch {
        for (i in 0..5) {
            delay(500)
            Log.d("코루틴", "결과2 = $i")
        }
    }
}
```

이것은 다음에 나올 suspend 함수처럼 동작하는 것입니다.

## 2.4 async와 반환값 처리

async는 코루틴 스코프의 연산 결과를 받아서 사용할 수 있습니다.

예를 들어 시간이 오래 걸리는 2개의 코루틴을 async로 선언하고, 결괏값을 처리하는 곳에서 await 함수를 사용하면 결과 처리가 완료된 후에 await를 호출한 줄의 코드가 실행됩니다.

```kotlin
CoroutineScope(Dispatchers.Default).async {
    val deferred1 = async {
        delay(500)
        350
    }
    val deferred2 = async {
        delay(1000)
        200
    }
    Log.d("코루틴", "연산 결과 = ${deferred1.await() + deferred2.await()}")
}
```

## 2.5 suspend

코루틴을 스레드와 비교했을 때 가장 눈에 띄는 차이점이자 코루틴을 가장 잘 설명할 수 있는 것이 suspend 키워드 입니다.

코루틴 안에서 suspend 키워드로 선언된 함수가 호출되면 이전까지의 코드 실행이 멈추고, suspend 함수가 처리가 완료된 후에 멈춰 있던 원래 스코프의 다음 코드가 실행됩니다.

코드로 보면 다음과 같습니다.

먼저 subRoutine() 함수를 suspend 키워드로 선언합니다.

CoroutineScope가 실행되면 ‘(코드 1)’이라고 작성된 부분이 실행된 후 subRoune() 함수가 호출됩니다.

그리고 suspend 키워드를 사용했기 때문에 subRoutine() 안의 코드가 모두 실행된 후에 ‘(코드 2)’가 실행됩니다.

```kotlin
suspend fun subRoutine() {
    for (i in 0..10) {
        Log.d("subRoutine", "$i")
    }
}

CoroutineScope(Dispatchers.Main).launch {
    // (코드 1)
    subRoutine()
    // (코드 2)
}
```

여기서 subRoutine()은 suspend 키워드를 붙였기 때문에 CoroutineScope안에서 자동으로 백그라운드 스레드처럼 동작합니다.

suspend가 코루틴을 가장 잘 나타내는 이유는 subRoutine()이 실행되면서 호출한 측의 코드를 잠시 멈췄지만 스레드의 중단이 없기 때문입니다.

이 코드를 스레드로 작성했다면 부모에 해당하는 ‘(코드 1)’이 동작하는 스레드를 멈춰야만 가능한데, 코루틴에서는 부모 루틴의 상태 값을 저장한 후 subRoutine()을 실행하고, 다시 subRoutine()이 종류된 후 부모 루틴의 상태 값을 복원하는 형태로 동작하므로 스레드에는 영향을 주지 않습니다.

이런 구조가 스레드의 동시성에서 발생할 수 있는 성능 저하도 막아줍니다.

## 2.6 withContext로 디스패처 분리

suspend 함수를 코루틴 스코프에서 호출할 때 호출한 스코프와 다른 디스패처를 사용할 때가 있습니다.

예를 들어 호출 측 코루틴은 main 디스패처에서 UI를 제어하는데, 호출되는 suspend함수는 디스크에서 파일을 일거와야 하는 경우가 있습니다.

이럴 때 withCotext를 사용해서 호출되는 suspend 함수의 디스패처를 IO로 변경할 수 있습니다.

호출되는 suspend 함수에 반환 값이 있다면 변숭 저장하고 사용할 수도 있습니다.

```kotlin
suspend fun readFile(): String {
    return "파일 내용"
}

CoroutineScope(Dispatchers.Main).launch {
    // 화면 처리
    val result = withContext(Dispatchers.IO) {
        readFile()
    }
    Log.d("코루틴", "파일 결과 = $result")
}
```

## 2.7 이미지 다운로드 앱 만들기

웹상에서 이미지 주소를 입력한 다은 백그라운드에서 이미지를 다운로드하고 완료되면 이미지를 화면에 보여주는 앱을 만들어보겠습니다.

Coroutine 프로젝트를 새로 생성하고, build.gradle 파일에 viewBinding 설정을 추가합니다.

코루틴을 사용할 수 있는지 확인하기 위해 MainActivity.kt를 열고 CoroutineScope를 입력해서 자동 완성되는지 확인합니다.

자동 완성되지 않는다면 build.gradle 파일에 코루틴 의존성을 추가합니다.

```gradle
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
```

### 매니페스트에 권한 설정하고 화면 만들기

1. 인터넷에서 이미지를 다운로드 하기 위해 [app] - [manifests] 디렉토리의 AndroidManifest.xml 파일을 열고 다음의 코드를 입력하여 인터넷 권한을 선언합니다.
    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```
1. activity_main.xml 파일을 열고 [Design] 모드에서 기본 텍스트뷰를 삭제합니다.  그리고 이미지 주소를 입력할 텍스트 카테고리의 플레인텍스트와 버튼 카테고리의 다운로드 버튼을 화면 하단에 배치합니다. id와 hint속성, 컨스트레인트는 다음 그림을 참고해서 수정합니다. 

1. 다운로드한 사진을 보여주는 이미지뷰를 플레인텍스트 상단에 배치합니다. id 속성과 컨스트레인트는 마찬가지로 다음 그림을 참고해서 수정합니다.

1. 그리고 이미지뷰 위에 겹치도록 (화면 한가운데에) 위젯 카테고리에 있는 프로그래스바를 가져다 놓고 상하좌우 컨스트레인트를 연결합니다. id 속성에 ‘progress’를 입력한 뒤 visibility속성을 ‘gone’으로 바꿔서 앱을 실행해도 처음에는 화면에 보이지 않게 만들어줍니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-263.png){: style="box-shadow: 0 0 5px #777"}

    ``프로그래스바 속성을 gone으로 설정하면 이미지가 끝으로 사라져 보이지 않습니다.``


### 코드 작성하기

1. MainActivity.kt를 열고 바인딩을 생성해서 binding 프러퍼티에 저장하고, setContentView에 binding.root를 전달합니다.
    ```kotlin
    package kr.co.hanbit.coroutine

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.coroutine.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. class 코드 밖에 loadImage() 함수를 작성하고 suspend 키워드를 사용해서 코루틴으로 만들어줍니다. URL 객체를 만들고 URL이 가지고 있는 openStream을 Bitmap 이미지로 저장한 후 반환하는 간단한 함수입니다.
    ```kotlin
    suspend fun loadImage(imageUrl: String): Bitmap {
        val url = URL(imageUrl)
        val stream = url.openStream()
        return BitmapFactory.decodeStream(stream)
    }
    ```

1. onCreate()안에 있는 setContentView... 아래에서 buttonDownload에 클릭리스너를 달아줍니다.
    ```kotlin
    binding.buttonDownload.setOnClickListener {
        
    }
    ```

1. 클릭리스너 안에 CoroutineScope를 추가합니다. 컨텍스트는 Main으로 입력해서 UI관련 요소들을 다룰 수 있도록 구성합니다.
    ```kotlin
    binding.buttonDownload.setOnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            // 05를 입력합니다.
            // 06를 입력합니다.
            // 07를 입력합니다.
        }
    }
    ```

1. 코루틴 안에서 먼저 progress의 visibility를 VISIBLE로 바꿔서 프로그래스바가 동작하도록 합니다. 그리고 화면의 플레인텍스트에 입력된 값을 가져와서 url 변수에 저장합니다.
    ```kotlin
    binding.progress.visibility = View.VISIBLE
    val url = binding.editUrl.text.toString()
    ```

1. loadImage() 함수를 호출하면서 url을 함께 전달하는데, 이 부분은 백그라운드 처리를 담당하는 IO 컨텍스트에서 진행되야 하기 때문에 withContext() 문을 사용해서 컨텍스트를 IO로 전환합니다. 그리고 결괏값을 bitmap 변수에 저장합니다.
    ```kotlin
    val bitmap = withContext(Dispatchers.IO) {
        loadImage(url)
    }
    ```
    
    loadImage() 함수에서 비트맵이 생성되고 bitmap 변수에 저장되기 전까지는 다음 줄이 실행되지 않고 멈춰 있습니다.

1. 이미지뷰에 bitmap을 입력하고 VISIBLE 상태의 프로그래스바는 다시 GONE으로 바꿔서 화면에서 보이지 않게 합니다.
    ```kotlin
    binding.imageView.setImageBitmap(bitmap)
    binding.progress.visibliity = View.GONE
    ```

1. 다음처럼 클릭리스너부터 시작하는 binding 처리를 run 스코프로 감싸면 다음과 같이 반복되는 binding.을 제거할 수 있습니다.
    ```kotlin
    binding.run {
        binding.buttonDownload.setOnClickListener {
            CoroutineScope(Dispatchers.Main).launch {
                progress.visibility = View.VISIBLE
                val url = editUrl.text.toString()
                val bitmap = withContext(Dispatchers.IO) {
                    loadImage(url)
                }
                imageView.setImageBitmap(bitmap)
                progress.visibility = View.GONE
            }
        }
    }
    ```

1. 앱을 실행합니다. 플레인텍스트에 이미지 주소를 입력하고, 다운로드 버튼을 클릭하면 이미지가 화면에 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-264.png){: style="box-shadow: 0 0 5px #777"}

    *``이미지 주소가 http로 시작되면 AndroidManifest.xml 파일의 <application 태그에 android:uses CleartextTraffic="true" 속성을 추가해야 합니다.``*{: style="background-color: #FFCCCC"}

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.coroutine

    import android.graphics.Bitmap
    import android.graphics.BitmapFactory
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.view.View
    import kotlinx.coroutines.CoroutineScope
    import kotlinx.coroutines.Dispatchers
    import kotlinx.coroutines.launch
    import kotlinx.coroutines.withContext
    import kr.co.hanbit.coroutine.databinding.ActivityMainBinding
    import java.net.URL


    suspend fun loadImage(imageUrl: String): Bitmap {
        val url = URL(imageUrl)
        val stream = url.openStream()
        return BitmapFactory.decodeStream(stream)
    }
    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.run {
                binding.buttonDownload.setOnClickListener {
                    CoroutineScope(Dispatchers.Main).launch {
                        progress.visibility = View.VISIBLE
                        val url = editUrl.text.toString()
                        val bitmap = withContext(Dispatchers.IO) {
                            loadImage(url)
                        }
                        imageView.setImageBitmap(bitmap)
                        progress.visibility = View.GONE
                    }
                }
            }

        }
    }
    ```

<style>
.page-container {max-width: 1200px}
</style>