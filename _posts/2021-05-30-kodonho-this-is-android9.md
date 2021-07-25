---
layout: post
title:  "[IT] - [BOOK] 9강 - 이것이 안드로이드다 with 코틀린 "
description: 스레드와 코루틴
date:   2021-05-30 11:22:30 +0900
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





<style>
.page-container {max-width: 1200px}582‘’“”
</style>