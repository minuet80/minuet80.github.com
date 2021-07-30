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

그리고 *화면이 없는 액티비티라고 표현한 이유는 서비스가 메인 스레드를 사용하기 때문입니다*{: style="text-decoration: underline"}

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


### 스타티드 서비스

``Started Service``는 startServivce() 메서드로 호출하며 액티비티와 상관없이 독립적으로 동작할 때 사용합니다.

액티비티의 종료와 무관하게 동작하므로 일반적으로 많이 사용하는 서비스 입니다.

``Started Service``가 이미 동작 중인 상태에서 재시작을 요청할 경우 새로 만들지 않고, 생성되어 있는 서비스의 메서드를 호출합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-265.png){: style="box-shadow: 0 0 5px #777"}


### 바운드 서비스

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

1. MyService.kt 파일을 열고 서비스 클래스 안에 바인더 클래스를 하나 만들고 변수에 담아둡니다. 액티비티와 서비스가 연결되면 바인더의 getService() 메서드를 통해 서비스에 접근할 수 있습니다.
    ```kotlin
    inner class MyBinder: Binder() {
        fun getService(): MyService {
            return this@MyService
        }
    }
    val binder = MyBinder()
    ```

1. 앞서 Started Service에서는 사용하지 않았던 onBind() 메서드를 사용할 차례입니다. TODO() 행은 삭제하고 다음과 같이 onBind() 메서드에서 binder 변수를 반환하도록 수정합니다.
    ```kotlin
    override fun onBind(intent: Intent): IBinder {
        return binder
    }
    ```

1. MainActivity.kt 파일을 열고 서비스와 연결할 수 있는 서비스 커넥션을 만듭니다. 만든 서비스 커넥션을 bindService() 메서드를 통해 시스템에 전달하면 서비스와 연결할 수 있습니다.  onServiceConnected() 는 서비스가 연결되면 호출되는 데 반해, (이름과 달리) onServiceDisconnected() 는 서비스가 정상적으로 연결 해제되었을 때는 호출되지 않습니다. 이 말은 unbindService() 로 연결을 끊어도 호출되지 않는다는 것입니다. *비정상적으로 서비스가 종료되었을 때만 onServiceConnected() 가 호출됩니다.*{: style="text-decoration: underline"} 이런 구조 때문에 서비스가 연결되면 isService 변수에 ‘true’를 입력해두고 현재 서비스가 연결되어 있는지를 확인하는 로직이 필요합니다.
    ```kotlin
    var myService: MyService? = null
    var isService = false
    val connection = object: ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as MyService.MyBinder
            myService = binder.getService()
            isService = true
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            isService = false
        }
    }
    ```

1. bindService 로 서비스를 호출하면서 앞에서 생성한 커넥션을 같이 넘겨줍니다. 세 번째 옵션인 Context.BIND_AUTO_CREATE를 설정하면 서비스가 생성되어 있지 않으면 생성 후 바인딩을 하고 이미 생성되어 있으면 바로 바인딩을 합니다.
    ```kotlin
    fun serviceBind(view: View) {
        val intent = Intent(this, MyService::class.java)
        bindService(intent, connection, Context.BIND_AUTO_CREATE)
    }
    ```

1. 연결을 해제하기 위해서는 unbindService에 커넥션을 담아 실행하면 되는데 서비스가 실행되지 않고 있을 때 unbindService를 실행하면 오류가 발생합니다. 그렇기 때문에 isService가 true인지를 먼저 체크하고 바인드를 해제한 후에 isService를 false로 변경해야 합니다.
    ```kotlin
    fun serviceUnbind(view: View) {
        if (isService) {
            unbindService(connection)
            isService = false
        }
    }
    ```

1. activity_main.xml 파일을 열고 서비스 BIND 와 서비스 UNBIND 버튼을 다음 그림처럼 배치합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-270.png){: style="box-shadow: 0 0 5px #777"}

1. 서비스 BIND 버튼의 onClick 속성에는 ‘serviceBind’를 연결하고, 서비스 UNBIND 버튼에는 ‘serviceUnbind’를 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-271.png){: style="box-shadow: 0 0 5px #777"}

1. 앱을 실행하고 버큰을 클릭해서 테스트합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-272.png){: style="box-shadow: 0 0 5px #777"}


### 서비스의 메서드 호출하기

바운드 서비스는 Started Service와는 다르게 액티비티에서 서비스의 메서드를 직접 호출해서 사용할 수 있습니다.

1. MyService.kt 를 열고 문자열 하나를 반환하는 serviceMessage() 메서드를 추가합니다.
    ```kotlin
    fun serviceMessage(): String {
        return "Hello Activity! I am Service!"
    }
    ```

1. MainActivity.kt 파일을 열고 01에서 만든 serviceMessage{}를 호출하는 callService Function() 메서드를 추가합니다.  화면에서 직접 사용할 것이기 때문에 파라미터 (view: View)를 작성합니다. 이제 서비스가 연결된 상태에서 호출되면 serviceMessage() 에서 반환된 문자열을 화면에 출력합니다.
    ```kotlin
    fun callServiceFunction(view: View) {
        if (isService) {
            val message = myService?.serviceMessage()
            Toast.makeText(this, "message= ${message}", Toast.LENGTH_LONG).show()
        } else {
            Toast.makeText(this, "서비스가 연결되지 않았습니다.", Toast.LENGTH_SHORT).show()
        }
    }
    ```

1. 서비스가 연결되었는지 확인하기 위해 onServiceConnected() 안에 ‘연결되었습니다.’라는 메시지를 출력하는 코드를 추가합니다.
    ```kotlin
    var myService: MyService? = null
    var isService = false
    val connection = object: ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as MyService.MyBinder
            myService = binder.getService()
            isService = true
            Log.d("BoundService", "연결되었습니다.")
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            isService = false
        }
    }
    ```

1. activity_main.xml 파일을 열고 서비스 함수 호출 버튼을 다음 그림과 같이 추가합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-273.png){: style="box-shadow: 0 0 5px #777"}

1. 서비스 함수 호출 버튼을 클릭한 상태에서 onClick 속성에 ‘callServiceFunction’을 적용한 후 앱을 실행하여 서비스 BIND를 클릭합니다.

1. 서비스가 연결되면 이제 서비스 함수 호출 버튼을 클릭해서 정상 동작하는지 테스트합니다. 테스트해보면 바운드 서비스에서는 메서드가 호출되지만 스타티드 서비스에서는 호출되지 않는 것을 확인할 수 이씃ㅂ니다.

    ``MyService.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.servicetest

    import android.content.ComponentName
    import android.content.Context
    import android.content.Intent
    import android.content.ServiceConnection
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.os.IBinder
    import android.util.Log
    import android.view.View
    import android.widget.Toast

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

        fun serviceBind(view: View) {
            val intent = Intent(this, MyService::class.java)
            bindService(intent, connection, Context.BIND_AUTO_CREATE)
        }

        fun serviceUnbind(view: View) {
            if (isService) {
                unbindService(connection)
                isService = false
            }
        }

        var myService: MyService? = null
        var isService = false
        val connection = object: ServiceConnection {
            override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
                val binder = service as MyService.MyBinder
                myService = binder.getService()
                isService = true
                Log.d("BoundService", "연결되었습니다.")
            }

            override fun onServiceDisconnected(name: ComponentName?) {
                isService = false
            }
        }

        fun callServiceFunction(view: View) {
            if (isService) {
                val message = myService?.serviceMessage()
                Toast.makeText(this, "message= ${message}", Toast.LENGTH_LONG).show()
            } else {
                Toast.makeText(this, "서비스가 연결되지 않았습니다.", Toast.LENGTH_SHORT).show()
            }
        }
    }
    ```

    ``MyService.kt의 전체 코드``

    ```kotiln
    package kr.co.hanbit.servicetest

    import android.app.Service
    import android.content.Intent
    import android.os.Binder
    import android.os.IBinder
    import android.util.Log

    class MyService : Service() {

        override fun onBind(intent: Intent?): IBinder? {
            return binder
        }

        override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
            val action = intent?.action
            Log.d("StartedService", "action=$action")
            return super.onStartCommand(intent, flags, startId)
        }

        companion object {
            val ACTION_START = "kr.co.hanbit.servicetest.START"
            val ACTION_RUN = "kr.co.hanbit.servicetest.RUN"
            val ACTION_STOP = "kr.co.hanbit.servicetest.STOP"
        }

        override fun onDestroy() {
            Log.d("Service", "서비스가 종료되었습니다.")
            super.onDestroy()
        }
        
        inner class MyBinder: Binder() {
            fun getService(): MyService {
                return this@MyService
            }
        }
        val binder = MyBinder()
        
        fun serviceMessage(): String {
            return "Hello Activity! I am Service!"
        }
    }
    ```

## 1.3 포어그라운드 서비스

스타티드 서비스와 바운드 서비스는 안드로이드 서비스의 시작 방식을 기준으로 분류하였고, 실행 구조를 기준으로는 포어그라운드와 백그라운드 서비스로 분류할 수 있습니다.

기본적으로는 서비스는 모두 백그라운드 서비스입니다.

포어그라운드 서비스는 사용자에게 알림을 통해 현재 작업이 진행 중이라는 것을 알려줘야 합니다.

백그라운드 서비스는 안드로이드 앱이 꺼지거나 안드로이드의 가용 자원이 부족하면 시스템에 의해 제거될 수 있지만, 포어그라운드 서비스는 사용자가 알림을 통해 서비스가 동작하고 있다는 것을 인지하고 있기 때문에 가용 자원 부족과 같은 이유로는 종료되지 않습니다.

포어그라운드 서비스를 사용하기 위해서는 서비스를 먼저 생성한 후에 시스템에 포어그라운드로 사용된다는 것을 알려줘야 합니다.

### 포어그라운드 서비스의 구성

포어그라운드 서비스를 사용하려면 먼저 몇 가지 단계를 거쳐야 합니다.

1. AndroidManifest.xml 파일에 포어그라운드 서비스 권한을 명세해야 합니다.
    ```xml
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    ```
1. 서비스가 먼저 실행되어야 합니다.
1. 서비스 안에서 startForeground() 메서드를 호출해서 서비스가 포어그라운드로 실행되고 있다는 것을 안드로이드에 알려줘야 합니다.

### 포어그라운드 서비스 코드 작성하기

ForegroundService 프로젝트를 생성하고 build.gradle 파일에 viewBinding 설정을 추가합니다.

1. [app] - [manifests] 디렉토리에 있는 AndroidManifest.xml 파일을 열고 포어그라운드 권한을 추가합니다.
    ```xml
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    ```

1. 안드로이드의 패키지명을 마우스 우클릭해 나타나는 메뉴에서 [New] - [Service] - [Service] 를 선택하고 Foreground라는 이름의 서비스를 하나 생성합니다. 앞에서 스타티드 서비스를 생성했던 방법과 동일합니다. Class Name 에 ‘Foreground’를 입력하고 생성하면 자동으로 파일이 열립니다. onBind() 메서드 블록 안에 보이는 TODO()행은 삭제하고 오류를 막기 위해서 비어 있는 Binder()를 리턴해 놓습니다.
    ```kotlin
    package kr.co.hanbit.foregroundservice

    import android.app.Service
    import android.content.Intent
    import android.os.Binder
    import android.os.IBinder

    class Foreground : Service() {

        override fun onBind(intent: Intent): IBinder {
            return Binder()
        }
    }
    ```

1. 서비스가 사용할 CHANNEL_ID를 상수로 정의해둡니다. 포어그라운드 서비스를 사용하기 위해서는 안드로이드 화면 상단에 나타나는 상태 바를 알림을 함께 띄어야 하는데, 이 알림이 사용할 채널을 설정할 때 사용됩니다. 
    ```kotlin
    val CHANNEL_ID = "ForegroundChannel"
    ```

1. 포어그라운드 서비스에 사용할 알림을 실행하기 전에 알림 채널을 생성하는 메서드를 먼저 만들어 놓습니다. 안드로이드 오레오 버전부터 모든 알림은 채널 단위로 동작하도록 설계되어 있습니다.
    ```kotlin
    fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Foreground Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }
    ```

1. onStartCommand() 메서드를 오버라이드합니다.
    ```kotlin
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // 06~08은 여기에 입력합니다.
        return super.onStartCommand(intent, flags, startId)
    }
    ```
    
1. onStartCommand() 메서드 블록 안에 알림을 생성하는 코드를 작성합니다. 앞에서 만들어둔 메서드를 호출해서 알림 채널을 생성합니다.
    ```kotlin
    createNotificationChannel()
    ```

1. 알림을 생성합니다. 알림 제목으로 “Foreground Service”를 아림에 ㅅ용할 아이콘으로는 프로젝트를 생성하면 기본으로 포함되어 있는 sym_def_app_icon을 사용합니다.
    ```kotlin
    val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
        .setContentTitle("Foreground Service")
        .setSmallIcon(R.mipmap.ic_launcher_round)
        .build()
    ```

1. startForeground() 메서드로 생성한 알림을 실행합니다.
    ```kotlin
    startForeground(1, notification)
    ```

### 화면에 서비스를 실행할 버튼 배치하기

1. activity_main.xml 파일을 열어 [Design] 모드에서 기본 텍스트뷰는 삭제합니다.

1. 서비스 시작과 서비스 종료 버튼을 배치합니다. 그리고 다음 그림과 같이 각 버튼의 id와 text속성을 변경하고 컨스트레인트를 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-274.png){: style="box-shadow: 0 0 5px #777"}


### 액티비티에서 서비스 호출하기

1. MainActivity.kt 를 열고 바인딩을 생성해서 binding 프로퍼티에 저장한 후 setContentView 에 binding.root를 전달합니다.
    ```kotlin
    package kr.co.hanbit.foregroundservice

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.foregroundservice.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {
        
        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. setContentView 아랫줄에 다음과 같이 시작 버튼에 클릭리스너를 연결하는 코드를 작성합니다. 그리고 리스너 블록 안에 서비스를 시작하는 코드를 추가합니다. 포어그라운드 서비스 startService()가 아닌 ContextCompat.startForegroundService()를 사용해서 실행해야 합니다.
    ```kotlin
    binding.buttonStart.setOnClickListener { 
        val intent = Intent(this, Foreground::class.java)
        ContextCompat.startForegroundService(this, intent)
    }
    ```

1. 종료 버튼에 클릭리스너를 연결하고 서비스를 종료하는 코드를 추가합니다.
    ```kotlin
    binding.buttonStop.setOnClickListener { 
        val intent = Intent(this, Foreground::class.java)
        stopService(intent)
    }
    ```

1. 에뮬레이터에서 실행한 후 서비스 시작 버튼을 클릭합니다. 하얀색 동그란 모양의 아이콘이 안드로이드 상태 바에서 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-275.png){: style="box-shadow: 0 0 5px #777"}

1. 상단을 아래로 스와이프해서 끌어내리면 알림창도 나타납니다. 포어그라운드 서비스는 사용자에게 현재 서비스가 실행 중임을 항상 알려줘야 합니다. 실행한 액티비티를 강제 종료해도 서비스가 실행되기 때문에 알림이 사라지지 않습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-276.png){: style="box-shadow: 0 0 5px #777"}

    ``Foreground.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.foregroundservice

    import android.app.Notification
    import android.app.NotificationChannel
    import android.app.NotificationManager
    import android.app.Service
    import android.content.Intent
    import android.os.Binder
    import android.os.Build
    import android.os.IBinder
    import androidx.core.app.NotificationCompat

    class Foreground : Service() {

        val CHANNEL_ID = "ForegroundChannel"

        override fun onBind(intent: Intent): IBinder {
            return Binder()
        }

        fun createNotificationChannel() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val serviceChannel = NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
                )
                val manager = getSystemService(NotificationManager::class.java)
                manager.createNotificationChannel(serviceChannel)
            }
        }

        override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
            createNotificationChannel()
            val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Foreground Service")
                .setSmallIcon(R.mipmap.ic_launcher_round)
                .build()
            startForeground(1, notification)
            return super.onStartCommand(intent, flags, startId)
        }
    }
    ```

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.foregroundservice

    import android.content.Intent
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import androidx.core.content.ContextCompat
    import kr.co.hanbit.foregroundservice.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.buttonStart.setOnClickListener {
                val intent = Intent(this, Foreground::class.java)
                ContextCompat.startForegroundService(this, intent)
            }

            binding.buttonStop.setOnClickListener {
                val intent = Intent(this, Foreground::class.java)
                stopService(intent)
            }
        }
    }
    ```

# 2. 콘텐트 리졸버



<style>
.page-container {max-width: 1200px}609‘’“”
</style>