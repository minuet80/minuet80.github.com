---
layout: post
title:  "[IT] - [BOOK] 10강 - 이것이 안드로이드다 with 코틀린 "
description: 서비스와 콘텐트 리졸버
date:   2021-06-08 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android10/
width: large
---

* some text
{: toc}


# 1. 서비스

서비스는 화면이 없는 액티비티입니다.


``서비스``가 백그라운드에서 동작하는 컴포넌트로 알려져 있는데 실제로 서비스만으로는 백그라운드에서 동작하지 않습니다.

그리고 *화면이 없는 액티비티라고 표현한 이유는 서비스가 메인 스레드를 사용하기 때문입니다*{: style="text-decoration: underline"}.

액티비티와 서비스 양쪽에 10초 동안, 1초마다 컴포넌트의 이름을 출력하는 코드를 작성합니다.

서비스는 ‘Service’를 출력하고, 액티비티는 ‘Activity’를 출력하도록 작성되어야 합니다.

그리고 액티비티에서 startService를 실행함과 동시에 반복문으로 ‘Activity’를 출력하는 코드를 실행하면, 어느 한쪽의 코드가 끝나야만 다른 쪽 코드가 실행됩니다.

보통 동일한 코드를 백그라운드 스레드로 작성하면 2개가 뒤섞여서 출력됩니다.

| 서비스로 동작할 때 로그캣 | 백그라운드 스레드로 동작할 때 로그캣 |
| :--- | :--- |
| Activity | Activity |
| Activity | Service |
| Activity | Service |
| ..10번 완료후 | Activity |
| Service | Service |
| Service | ... |
| ... |  |
{: .table .table-striped .table-hover}

그래서 서비스는 기존의 백그라운드 처리와는 다른 개념으로 접근해야 합니다.

## 1.1 서비스의 실행 방식

서비스는 ``Started Service`` 와 ``Bound Service`` 두가지 형태로 실행됩니다.

그리고 최종적으로 앱이 꺼져도 실행되는 서비스는 포어그라운드 서비스<sup> (Foreground Service) </sup>형태로 만들어야 합니다.


### Started Service

``Started Service``는 startServivce() 메서드로 호출하며 액티비티와 상관없이 독립적으로 동작할 때 사용합니다.

액티비티의 종료와 무관하게 동작하므로 일반적으로 많이 사용하는 서비스 입니다.

``Started Service``가 이미 동작 중인 상태에서 재시작을 요청할 경우 새로 만들지 않고, 생성되어 있는 서비스의 메서드를 호출합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-265.png){: style="box-shadow: 0 0 5px #777"}


### Bound Service

``Bound Service``는 bindService() 메서드로 호출하며 액티비티와 값을 주고받을 필요가 있을 때 사용합니다.

여러 개의 액티비티가 같은 서비스를 사용할 수 있어서 기존에 생성되어 있는 서비스를 바인딩해서 재사용할 수 있습니다.

액티비티와 값을 주고받을 필요가 있을 때 사용하고 값을 주고받기 위한 인터페이스를 제공합니다.

하지만 인터페이스의 사용이 복잡하고 연결된 액티비티가 종료되면 서비스도 같이 종료되는 터라 특별한 경우를 제외하고는 잘 사용되지 않습니다.

단, 액티비티 화면이 떠 있는 상태에서 백그라운드 처리도 함께 할 경우에는 ``Started Service``보다 효율적일 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-266.png){: style="box-shadow: 0 0 5px #777"}


## 1.2 서비스 만들기

서비스를 만드는 방법은 액티비티와 동일합니다. ServiceText 프로젝트를 새로 하나 생성합니다.

### Started Service 만들기

1. [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나느 메뉴에서 [New] - [Service] - [Service]를 선택합니다. Class Name은 ‘MyService’로 입력되어 있습니다. 하단의 [Finish]를 클릭하여 MyService 서비스를 생성하면 MyService.kt파일이 열립니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-267.png){: style="box-shadow: 0 0 5px #777"}

    처음 생성하면 바운드 서비스를 할 수 있는 onBind() 메서드가 오버라이드되어 있습니다.

    *onBind() 메서드는 스파티드 서비스에서는 사용하지 않습니다.*{: style="text-decoration: underline"}.

    ```kotlin
    override fun onBind(intent: Intent): IBinder {
        TODO("Return the communication channel to the service.")
    }
    ```

    새로운 서비스를 생성하면 AndroidManifest.xml 파일에 \<service\> 태그로 등록됩니다.
    
    ```xml
    <service
        android:name=".MyService"
        android:enabled="true"
        android:exported="true">
    </service>
    ```

1. MyService.kt의 서비스 클래스 안에 onStartCommand() 메서드를 오버라이드하고 다음과 같이 작성합니다. 호출할 때 onStartCommand로 명령어를 전달할 수 있습니다.
    ```kotlin
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        Log.d("StartedService", "action=$action")
        return super.onStartCommand(intent, flags, startId)
    }
    ```

1. onStartCommand() 메서드 아래에 테스트로 사용할 명령어 몇 개를 companion object로 감싸서 임의로 생성해둡니다. 일반적으로 명령어는 ‘패키지명 + 명령어’조합으로 만들어집니다. 이제 이 명령어들을 액티비티에서 서비스를 호출할 때 사용하겠습니다.
    ```kotlin
    companion object {
        val ACTION_START = "kr.co.hanbit.servicetest.START"
        val ACTION_RUN = "kr.co.hanbit.servicetest.RUN"
        val ACTION_STOP = "kr.co.hanbit.servicetest.STOP"
    }
    ```

1. MainActivity.kt 파일을 열고 서비스를 호출하는 코드를 작성합니다. 먼저 안드로이드에 전달할 Intent를 만들고, My Service에 미리 정의해둔 명령을 action에 담아서 같이 전달합니다.  새로운 메서드를 만들 때 파라미터로 (view: View)를 사용하면 클릭리스너 연결이 없어도 레이아웃 파일에서 메서드에 직접 접근할 수 있습니다.
    ```kotlin
    fun serviceStart(view: View) {
        val intent = Intent(this, MyService::class.java)
        intent.action = MyService.ACTION_START
        startService(intent)
    }
    ```

1. 액티비티에서 동일한 인텐트를 하나 더 생성하고 startService()를 해도 서비스는 더 이상 생성되지 않고 onStartCommand() 만 호출되기 때문에 일방적인 명령어 전달 구조에서 사용하기에 간편하고 좋습니다. 04의 코드 하단에 intent를 intent2로 수정해서 입력하면 됩니다.

1. 서비스를 중단하기 위해서는 stopService()로 인텐트를 전달합니다.
    ```kotlin
    fun serviceStop(view: View) {
        val intent = Intent(this, MyService::class.java)
        stopService(intent)
    }
    ```

1. 서비스 중지 상태를 확인하기 위해서 MyService.kt 파일에서 서비스 종료 시 호출되는 onDestroy()를 override합니다. onDestroy() 안에 ‘서비스가 종료되었습니다.’라는 메시지를 출력하는 코드를 추가합니다.
    ```kotlin
    override fun onDestroy() {
        Log.d("Service", "서비스가 종료되었습니다.")
        super.onDestroy()
    }
    ```

1. activity_main.xml 파일을 열고 다음과 같이 버튼을 구성합니다. 버튼에서 직접 앞에서 작성한 메서드를 호출할 것이기 때문에 id속성에는 따로 작성하지 않아도 됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-268.png){: style="box-shadow: 0 0 5px #777"}


1. 먼저 서비스 START 버튼을 클릭한 상태에서 속성 창을 보면 onClick 이라는 속성이 있습니다. 클릭하면 다음 그림과 같이 MainActivity에 (view: View) 파라미터가 적용된 메서드 목록이 나타납니다. ‘serviceStart’를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-269.png){: style="box-shadow: 0 0 5px #777"}

1. 마찬가지로 서비스 STOP 버튼을 클릭한 상태에서 onClick 속성에 ‘serviceStop’을 적용합니다.

1. 이제 앱을 실행한 상태에서 버튼을 클릭하고 로그캣에서 로그를 확인합니다.

    ``MainActivity.kt의 전체 코드``

    ```kotin
    package kr.co.hanbit.servicetest

    import android.content.Intent
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.view.View

    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)
        }

        fun serviceStart(view: View) {
            val intent = Intent(this, MyService::class.java)
            intent.action = MyService.ACTION_START
            startService(intent)
        }

        fun serviceStop(view: View) {
            val intent = Intent(this, MyService::class.java)
            stopService(intent)
        }
    }
    ```

    ``MyService.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.servicetest

    import android.app.Service
    import android.content.Intent
    import android.os.IBinder
    import android.util.Log

    class MyService : Service() {

        override fun onBind(intent: Intent?): IBinder? {
            TODO("Not yet implemented")
        }
        
        override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
            val action = intent?.action
            Log.d("StartedService", "action=$action")
            return super.onStartCommand(intent, flags, startId)
        }

        override fun onDestroy() {
            Log.d("Service", "서비스가 종료되었습니다.")
            super.onDestroy()
        }
        
        companion object {
            val ACTION_START = "kr.co.hanbit.servicetest.START"
            val ACTION_RUN = "kr.co.hanbit.servicetest.RUN"
            val ACTION_STOP = "kr.co.hanbit.servicetest.STOP"
        }
    }
    ```    

### Bound Service 만들기

바운드 서비스를 만들려면 먼저 서비스와 액티비티를 연결하기 위한 ServiceConnection을 생성해야 합니다.



<style>
.page-container {max-width: 1200px}‘’“”
</style>