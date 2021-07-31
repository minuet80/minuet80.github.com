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

1. [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나느 메뉴에서 [New] - [Service] - [Service]를 선택합니다. Class Name은 ‘MyService’로 입력되어 있습니다. 하단의 [Finish]를 클릭하여 MyService 서비스를 생성하면 MyService.kt파일이 열립니다.

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

1. activity_main.xml 파일을 열고 다음과 같이 버튼을 구성합니다. 버튼에서 직접 앞에서 작성한 메서드를 호출할 것이기 때문에 id속성에는 따로 작성하지 않아도 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-268.png){: style="box-shadow: 0 0 5px #777"}


1. 먼저 서비스 START 버튼을 클릭한 상태에서 속성 창을 보면 onClick 이라는 속성이 있습니다. 클릭하면 다음 그림과 같이 MainActivity에 (view: View) 파라미터가 적용된 메서드 목록이 나타납니다. ‘serviceStart’를 선택합니다.

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

1. activity_main.xml 파일을 열고 서비스 BIND 와 서비스 UNBIND 버튼을 다음 그림처럼 배치합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-270.png){: style="box-shadow: 0 0 5px #777"}

1. 서비스 BIND 버튼의 onClick 속성에는 ‘serviceBind’를 연결하고, 서비스 UNBIND 버튼에는 ‘serviceUnbind’를 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-271.png){: style="box-shadow: 0 0 5px #777"}

1. 앱을 실행하고 버큰을 클릭해서 테스트합니다.

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

1. activity_main.xml 파일을 열고 서비스 함수 호출 버튼을 다음 그림과 같이 추가합니다.

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

1. 서비스 시작과 서비스 종료 버튼을 배치합니다. 그리고 다음 그림과 같이 각 버튼의 id와 text속성을 변경하고 컨스트레인트를 연결합니다.

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

1. 에뮬레이터에서 실행한 후 서비스 시작 버튼을 클릭합니다. 하얀색 동그란 모양의 아이콘이 안드로이드 상태 바에서 나타납니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-275.png){: style="box-shadow: 0 0 5px #777"}

1. 상단을 아래로 스와이프해서 끌어내리면 알림창도 나타납니다. 포어그라운드 서비스는 사용자에게 현재 서비스가 실행 중임을 항상 알려줘야 합니다. 실행한 액티비티를 강제 종료해도 서비스가 실행되기 때문에 알림이 사라지지 않습니다.

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

콘텐트 리졸버는 다른 앱에서 콘텐트 프로바이더를 통해 제공하는 데이터를 사용하기 위한 도구입니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-277.png){: style="box-shadow: 0 0 5px #777"}

만약 내가 만든 앱의 데이터를 다른 앱에서도 사용할 수 있게 제공하려면 콘텐트 프로바이더를 구현해야 합니다.

하지만 보통 앱을 개발하면서 콘텐트 프로바이더를 사용하는 일은 거의 없습니다.

대부분 다른 앱 또는 안드로이드 OS에 이미 구현되어 있는 콘텐트 프로바이더로부터 데이터를 제공받아 사용합니다.

실제 안드로이드에 있는 연락처, 갤러리, 음악 파일과 같은 기본 데이터를 이용하는 용도로 가장 많이 사용하는데 이렇게 미리 만들어져 있는 콘텐트 프로바이더로부터 데이터를 가져오는 도구가 콘텐트 리졸버<sup> (Content Resolver) </sup>

## 2.1 콘텐츠  리졸버 사용하기

콘텐트 리졸버로 사진, 음악 파일 등을 읽어오려면 미디어 정보가 저장된 구조를 이해해야 합니다.

안드로이드는 미디어 정보를 저장하는 저장소 용도로 MediaStore를 사용합니다.

MediaStore안에 각각의 미디어가 종류별로 DB의 테이블처럼 있고, 각 테이블당 주소가 하나씩 제공됩니다. (물론 실제 구조는 그렇지 않지만 이해를 돕기 위한 설명입니다.)

미디어의 종류마다 1개의 주소를 가진 콘텐트 프로바이더가 구현되어 있다고 생각하면 됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-278.png){: style="box-shadow: 0 0 5px #777"}

그리고 미디어를 읽어오기 위해서 콘텐트 리졸버를 사용합니다.

콘텐트 리졸버로 미디어 정보를 읽어오는 과정은 다음과 같습니다.

1. 데이터 주소를 정의합니다. MediaStore는 데이블 주소들을 상수로 제공하며 데이터베이스에서 테이블명과 같은 역활을 합니다. 데이터를 가져올 주소를 변수에 미리 저장합니다.
```kotlin
val listUrl = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
```

1. 가져올 컬럼명을 정의합니다. 미디어 정보의 상세 데이터 중 원하는 데이터만 선택해서 읽어올 수 있습니다. 테이블 주소와 마찬가지로 컬럼명도 상수로 제공됩니다. 가졍ㄹ 컬럼명을 배열에 저장해서 사용합니다.
```kotlin
val proj = arrayOf(
    MediaStore.Audio.Media._ID,
    MediaStore.Audio.Media.TITLE
)
```

1. 데이터 클래스를 정의합니다. 앞에서 정의한 컬럼명에 맞춰서 클래스를 만들면 되고, 클래스를 미리 만들어두면 일거온 미디어 정보를 다루기가 쉬워집니다. 꼭 데이터 클래스를 사용해야 하는 것은 아닙니다.
    ```kotlin
    data class Music(val id: String, val title: String)
    ```

1. 쿼리를 실행합니다. 콘텐트 리졸버가 제공하는 query() 메서드에 앞에서 정의한 주소와 컬럼명을 담아서 호출하면 쿼리를 실행한 결과를 커서라는 형태로 반환합니다. 세 번째, 다섯 번째 파라미터는 쿼리에 조건을 설정하는 옵션용입니다. ‘null’을 입력하면 전체 데이터를 읽어옵니다.
    ```kotlin
    val cursor = contentResolver.query(listUrl, proj, null, null, null)
    ```

    ``query()의 파라미터 5개``

    | 파라미터 | 설명 |
    | :--- | :--- |
    | uri: Uri | 테이블의 주소 Uri |
    | projection: String[] | 테이블 컬럼명 배열 |
    | selection: String | 데이터 검색조건, 어떤 컬럼을 검색할 것인지 컬럼명 지정 (name = ?, title = ? 의 형태로 물음표와 함께 검색 컬럼을 지정합니다.)
    | selectionArgs: String[] | 조건의 값, 세번째 컬럼명에 입력할 값 (selection에서 지정한 물음표(?)를 앞에서부터 순서대로 대체하는데 물음표가 2개면 2개의 배열이 필요합니다.) |
    | sortOrder: String | 정렬 순서, 정렬할 컬럼이 오름차순인지 내림차순인지를 설정 (ORDER BY title ASC) |
    {: .table .table-striped .table-hover}

1. 전달받은 커서 객체를 반복문으로 반복하여 레코드 (컬럼으로 구성된 데이터 한 줄)를 한 줄씩 읽어서 데이터 클래스에 저장합니다. getColumnIndex() 메서드는 접근할 컬럼이 현재 테이블의 몇 번째 컬럼인지 확인한 다음 인덱스를 반환합니다.
    ```kotlin
    val musicList = mutableListOf<Music>()
    while (cursor.moveToNext()) {
        var index = cursor.getColumnIndex(proj[0])
        val id = cursor.getString(index)
        
        index = cursor.getColumnIndex(proj[1])
        val title = cursor.getString(index)

        val music = Music(id, title)
        musicList.add(music)
    }
    ```

## 2.2 음원 목록 앱 만들기

앞에서 사용해본 콘텐트 리졸버 사용법을 응용해서 MediaStore에서 실제 음원 목록을 가져와 화면에 출력하는 방법을 예제를 통해 알아보겠습니다.

새로운 프로젝트 ContentResolver를 생성하고 build.gradle 파일에 viewBinding 설정을 추가합니다.


### 매니페스트에 명세하고 권한 요청하기

1. 저장소의 음원에 접근하기 위해 AndroidManifest.xml 파일에 권한을 선언합니다. MediaStore는 안드로이드의 외부 저장소에 있기 때문에 외부 저장소를 읽는 권한이 필요합니다.
    ```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    ```

1. 6장에서 만들었던 Base 프로젝트를 열어서 BaseActivity를 복사해서 붙여넣기 한 다음 MainActivity.kt를 열고 BaseActivity를 상속하도록 class 코드를 수정합니다. 
    ```kotlin
    class MainActivity: BaseActivity {
        
    }
    ```

1. onCreate() 메서드 바로 아래에서 ``Ctrl`` + ``I`` 키를 누르면 나타나는 팝업창에서 BaseActivity에 선언되어 있는 2개의 추상 메서드를 선택하고 [OK]버튼을 클릭해서 오버라이드 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-279.png){: style="box-shadow: 0 0 5px #777"}
    
    생성된 코드에서 TODO() 행만 삭제하고 일단 빈 채로 두겠습니다.

    ```kotlin
    override fun permissionGranted(requestCode: Int) {
    }

    override fun permissionDenied(requestCode: Int) {
    }
    ```

1. 바인딩을 생성해서 binding 프로퍼티에 저장하고, setContentView() 에 binding.root를 전달합니다. 
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

1. setContentView 아랫줄에 외부 저장소 권한을 요청하는 코드를 작성합니다. 권한이 하나일 때는 requestCode에 임의의 숫자 값을 전달하면 됩니다.
    ```kotlin
    requirePermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 999)
    ```

1. 아무것도 없는 startProcess() 메서드를 만들고 permissionGranted() 메서드 안에서 호출합니다. 음원 목록을 불러오는 코드를 여기서 작성할 것입니다. 그리고 permissionDenied() 에는 권한 승인이 필요하다는 메시지를 띄운 후에 앱을 종료하는 코드를 작성합니다.
    ```kotlin
    override fun permissionGranted(requestCode: Int) {
        // 이어서 구현할 예정입니다.
        startProcess()
    }

    override fun permissionDenied(requestCode: Int) {
        Toast.makeText(this, "외부 저장소 권한 승인이 필요합니다. 앱을 종료합니다.", Toast.LENGTH_LONG).show()
        finish()
    }

    fun startProcess() {
        
    }
    ```

### 음원 클래스 정의하기

음원과 관련된 클래스를 정의하기 전에 프로퍼티 (속성)를 먼저 정의하겟습니다.

| 프로퍼티 | 설명 |
| :--- | :--- |
| id | MediaStore가 음원을 구분하는 유니크 ID |
| title | 음원의 제목 |
| artist | 음원의 아티스트 |
| albumId | 앨범을 구분하는 ID |
| duration | 음원이 길이 |
{: .table .table-striped .table-hover}


1. [app] - [java] 디렉토리 밑의 패키지에 Music 클래스를 생성하고 음원 데이터에 대한 클래스를 다음과 같이 정의합니다
    ```kotlin
    package kr.co.hanbit.music

    class Music(id: String, title: String?, artist: String?, albumId: String?, duration: Long?) {

        var id: String = ""
        var title: String?
        var artist: String?
        var albumId: String?
        var duration: Long?

        init {
            this.id = id
            this.title = title
            this.artist = artist
            this.albumId = albumId
            this.duration = duration
        }

        // 02를 여기에 작성합니다.
    }
    ```

1. 음원의 URI를 생성하는 getMusicUri() 메서드를 정의합니다. 음원 URI는 기본 MediaStore의 주소와 음원 ID를 조합해서 만들기 때문에 메서드로 만들어 놓고 사용하는 것이 편리합니다.
    ```kotlin
    fun getMusicUri(): Uri {
        return Uri.withAppendedPath(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, id)
    }
    ```

1. 이어서 음원 파일별로 썸네일을 지정할 수 있습니다. 보통 앨범 이미지를 사용하며 이것을 앨범아트라고 하는데, 앨범 아트 URI를 생성하는 getAlbumUri() 메서드를 정의합니다. 앨범 아트의 URI 문자열을 Uri.parse() 메서드로 해석해서 URI를 생성합니다.
    ```kotlin
    fun getAlbumUri(): Uri {
        return Uri.parse("content://media/external/audio/albumart/" + albumId)
    }
    ```

    ``다음은 지금까지 입력한 Music.kt 파일의 코드입니다.``

    ```kotlin
    package kr.co.hanbit.music

    import android.net.Uri
    import android.provider.MediaStore

    class Music(id: String, title: String?, artist: String?, albumId: String?, duration: Long?) {

        var id: String = ""
        var title: String?
        var artist: String?
        var albumId: String?
        var duration: Long?

        init {
            this.id = id
            this.title = title
            this.artist = artist
            this.albumId = albumId
            this.duration = duration
        }

        fun getMusicUri(): Uri {
            return Uri.withAppendedPath(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, id)
        }

        fun getAlbumUri(): Uri {
            return Uri.parse("content://media/external/audio/albumart/" + albumId)
        }
    }
    ```

### 음원 목록 화면 만들기

이제 화면을 만들어 보겠습니다. 

1. activity_main.xml 파일을 열고 기본 텍스트뷰는 삭제합니다.  그 다음 팔레트의 커먼 카테고리에 있는 리사이클러뷰를 드래그해서 화면 전체에 배치합니다. id속성은 ‘recyclerView’로 하고 컨스트레인트는 상하좌우를 모두 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-280.png){: style="box-shadow: 0 0 5px #777"}

1. 리사이클러뷰에 사용할 item_recycler.xml 파일을 [app] - [res] - [layout] 디렉토리에 생성합니다. 입력은 다음 그림과 같이 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-281.png){: style="box-shadow: 0 0 5px #777"}

1. 최상위 레이아웃인 컨스트레인트 레이아웃의 layout_height 속성을 ‘100dp’로 설정합니다. 1개의 음원 파일 정보가 표시될 크기입니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-282.png){: style="box-shadow: 0 0 5px #777"}

    - 이미지의 id는 ‘imageAlbum’
    - Artist의 id는 ‘textArtist’
    - Title의 id는 ‘textTitle’
    - Duration의 id는 ‘textDuration’

### 어댑터 만들기

리사이클러뷰에 사용할 어댑터를 생성하고 코드를 작성하겠습니다.

1. [app] - [java] 디렉토리 밑의 패키지 아래에 MusicRecyclerAdapter 클래스를 생성합니다.

1. Holder클래스를 어댑터 클래스 아래에 작성합니다. Holder 클래스는 항상 바인딩 1개를 파라미터로 가지고 상속받는 ViewHolder에 binding.root를 넘겨주는 구조입니다.
    ```kotlin
    package kr.co.hanbit.music

    import androidx.recyclerview.widget.RecyclerView
    import kr.co.hanbit.music.databinding.ItemRecyclerBinding

    class MusicRecyclerAdapter {
    }

    class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {
        // 09에서 구현합니다.
    }
    ```

1. MusicRecyclerAdapter에 Adapter클래스를 상속받습니다. 그리고 제네릭으로 위에서 만들어둔 Holder를 지정합니다.
    ```kotlin
    class MusicRecyclerAdapter: RecyclerView.Adapter<Holder>() {
        // 04를 여기에 작성합니다.
    }
    ```

1. 어댑터 필수 메서드 3개를 자동 생성합니다. 클래스 안쪽을 클릭한 상태에서 ``Ctrl`` + ``I`` 키를 눌러 나타나는 팝업창에서 3개 모두 선택합니다. 자동 생성된 코드에서 TODO()행은 모두 삭제합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-283.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    class MusicRecyclerAdapter: RecyclerView.Adapter<Holder>() {
        // 05는 여기에 작성합니다.
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            // 07은 여기에 작성합니다.
        }

       override fun getItemCount(): Int {
            // 06은 여기에 작성합니다.
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            // 08은 여기에 작성합니다.
        }

 
    }
    ```

1. MusicRecyclerAdapter 클래스 가장 윗줄에 음악 목록을 저장해둘 변수 1개 만듭니다. 제네릭으로 Music을 사용하는 컬렉션입니다.
    ```kotlin
    var musicList = mutableListOf<Music>()
    ```

1. 목록의 개수를 알려주는 getItemCount()를 구현합니다.
    ```kotlin
    return musicList.size
    ```

1. 화면에 보이는 아이템 레이아웃의 바인딩을 생성하는 onCreateViewHolder()를 구현합니다.
    ```kotlin
    val binding = ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
    return Holder(binding)
    ```

1. 아이템 레이아웃에 데이터를 출력하는 onBindViewHolder()를 구현합니다. setMusic메서드는 아직 만들지 않았기 때문에 빨간색으로 나타납니다.
    ```kotlin
    val music = musicList.get(position)
    holder.setMusic(music)
    ```

1. Holder 클래스 안에 setMusic() 메서드를 구현합니다. setMusic() 메서드의 파라미터로 넘어온 music은 메서드가 실행되는 순간만 사용할 수 있기 때문에 클릭 시 음원이 플레이하는 것을 대비해서 musicUri변수를 하나 만들고 현재 Music 클래스가 가지고 있는 Uri를 저장해두는 것이 좋습니다. 먼저 앨범 이미지가 보일 이미지뷰에 setImageURI를 사용해서 이미지를 세팅하고, 각각의 텍스트뷰, 즉 Artist, Title, Duration의 text 속성에도 값을 입력합니다. 음악 재생 시간은 SimpleDataFormat을 사용해서 ‘분:초’ 형태로 변환해서 사용하면 됩니다.
    ```kotlin
    var musicUri: Uri? = null

    fun setMusic(music: Music) {
        // run 함수를 사용하면 매번 binding.을 입력하지 않아도 됩니다.
        binding.run {
            imageAlbum.setImageURI(music.getAlbumUri())
            textArtist.text = music.artist
            textTitle.text = music.title

            val duration = SimpleDateFormat("mm:ss").format(music.duration)
            textDuration.text = duration
        }
        this.musicUri = music.getMusicUri()
    }
    ```


지금 까지 입력한 MusicRecyclerAdapter.kt의 전체 코드는 다음과 같습니다.

```kotlin
package kr.co.hanbit.music

import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kr.co.hanbit.music.databinding.ItemRecyclerBinding
import java.text.SimpleDateFormat

class MusicRecyclerAdapter : RecyclerView.Adapter<Holder>() {

    var musicList = mutableListOf<Music>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding =
            ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }

    override fun getItemCount(): Int {
        return musicList.size
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val music = musicList.get(position)
        holder.setMusic(music)
    }


}

class Holder(val binding: ItemRecyclerBinding) : RecyclerView.ViewHolder(binding.root) {
    var musicUri: Uri? = null

    fun setMusic(music: Music) {
        // run 함수를 사용하면 매번 binding.을 입력하지 않아도 됩니다.
        binding.run {
            imageAlbum.setImageURI(music.getAlbumUri())
            textArtist.text = music.artist
            textTitle.text = music.title

            val duration = SimpleDateFormat("mm:ss").format(music.duration)
            textDuration.text = duration
        }
        this.musicUri = music.getMusicUri()
    }
}
```

### MainActivity에서 음원 목록 보여주기

MainActivity.kt에 음원 정보를 읽어오고 리사이클러뷰에 음원 목록을 보여주는 코드를 작성하겠습니다.

1. MainActivity.kt를 열고 음원을 읽어오는 getMusicList() 메서드를 하나 만듭니다.
    ```kotlin
    fun getMusicList(): List<Music> {
        // 02~07을 여기에 작성합니다.
    }
    ```

1. 메서드 안에 음원을 읽어오는 코드를 하나씩 작성니다. 먼저 음원 정보의 주소를 listUrl 변수에 저장합니다.
    ```kotlin
    val listUrl = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
    ```

1. 앞의 변수 선언에 이어서 음원 정보 테이블에서 읽어올 컬럼명을 배열로 정의합니다. MediaStore에 상수로 이미 정의되어 있습니다.
    ```kotlin
    val proj = arrayOf(
        MediaStore.Audio.Media._ID,
        MediaStore.Audio.Media.TITLE,
        MediaStore.Audio.Media.ARTIST,
        MediaStore.Audio.Media.ALBUM_ID,
        MediaStore.Audio.Media.DURATION
    )
    ```

1. 콘텐트 리졸버의 query() 메서드에 앞에서 설정한 주소와 컬럼명을 담아서 호출하면 실행결과를 커서로 반환해줍니다.
    ```kotlin
    var cursor = contentResolver.query(listUrl, proj, null, null, null)
    ```

1. 커서로 전달받은 데이터를 꺼내서 저장할 목록 변수를 하나 만듭니다.
    ```kotlin
    val musicList = mutableListOf<Music>()
    ```

1. 반복문으로 커서를 이동하면서 데이터를 한 줄씩 읽습니다. 읽은 데이터를 Music 클래스에 옮긴 후 앞에서 만들어둔 musicList에 하나씩 담습니다. 커서에서 데이터를 꺼낼 때 사용하는 getString()은 컬럼 타입이 문자일 때, getLong() 은 컬럼 타입이 숫자일 때 사용할 수 있습니다. *getString()과 getLong() 에 입력되는 숫자는 커서에 있는 컬럼 데이터의 순서인데 앞에서 proj 변수에 저장해두었던 컬럼의 순서와 같습니다.*{: style="text-decoration: underline"}
    ```kotlin
    while (cursor?.moveToNext() == true) {
        val id = cursor.getString(0)
        val title = cursor.getString(1)
        val artist = cursor.getString(2)
        val albumId = cursor.getString(3)
        val duration = cursor.getLong(4)

        val music = Music(id, title, artist, albumId, duration)
        musicList.add(music)
    }
    ```

1. 데이터가 다 담긴 musicList를 호출한 측에 반환합니다.
    ```kotlin
    return musicList
    ```

1. 이제 startProcess() 메서드 안에서 지금까지 생성한어댑터와 화면 그리고 데이터를 가져오는 메서드를 연결하는 코드를 작성하겠습니다. 먼저 adapter를 생성하고 저으이해둔 musicList에 음원 데이터를 adapter에 넘겨줍니다.
    ```kotlin
    val adapter = MusicRecyclerAdapter()
    adapter.musicList.addAll(getMusicList())
    ```

1. 이어서 데이터가 담긴 adapter를 리사이클러뷰에 연결하고 레이아웃 매니저를 설정합니다.
    ```kotlin
    binding.recyclerView.adapter = adapter
    binding.recyclerView.layoutManager = LinearLayoutManager(this)
    ```

1. 애뮬레이터에서 실행하고 테스트해 봅니다. 애뮬레이터에는 음원 파일이 없기 때문에 목록에 아무것도 나오지 않습니다. 이메일로 MP3파일을 전송한 후에 에뮬레이터에서 다운로드해서 사용할 수 있고, 아니면 스마트폰에서 실행해서 확인해야 합니다. 그림과 같이 이미지와 제목이 표시됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-284.png){: style="box-shadow: 0 0 5px #777"}

MainActivity.kt의 전체 코드

```kotlin
package kr.co.hanbit.music

import android.Manifest
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import kr.co.hanbit.music.databinding.ActivityMainBinding

class MainActivity : BaseActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        requirePermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 999)
    }

    override fun permissionGranted(requestCode: Int) {
        startProcess()
    }

    override fun permissionDenied(requestCode: Int) {
        Toast.makeText(this, "외부 저장소 권한 승인이 필요합니다. 앱을 종료합니다.", Toast.LENGTH_LONG).show()
        finish()
    }

    fun startProcess() {
        val adapter = MusicRecyclerAdapter()
        adapter.musicList.addAll(getMusicList())
        binding.recyclerView.adapter = adapter
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
    }

    fun getMusicList(): List<Music> {
        val listUrl = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
        val proj = arrayOf(
            MediaStore.Audio.Media._ID,
            MediaStore.Audio.Media.TITLE,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM_ID,
            MediaStore.Audio.Media.DURATION
        )
        var cursor = contentResolver.query(listUrl, proj, null, null, null)
        val musicList = mutableListOf<Music>()
        while (cursor?.moveToNext() == true) {
            val id = cursor.getString(0)
            val title = cursor.getString(1)
            val artist = cursor.getString(2)
            val albumId = cursor.getString(3)
            val duration = cursor.getLong(4)

            val music = Music(id, title, artist, albumId, duration)
            musicList.add(music)
        }
        return musicList
    }
}
```

### 목록을 클릭해서 음원 실행하기

마지막으로 목록을 클릭하면 음원을 실행하는 코드를 작성해보겠습니다.

클릭 이벤트를 어댑터의 홀더에서 받아야 하기 때문에 모든 코드를 MusicRecyclerAdapter.kt에서 작성하겠습니다.

1. 음원을 실행하기 위해서는 MediaPlayer 클래스를 사용해야 하는데 Holder 클래스 안에 생성하면 Holder 개수만큼 생성되기 때문에 스마트폰의 자원이 낭비됩니다. MediaPlayer를 어댑터에 생성하고 사용하기 위해서 먼저 Holder 클래스 전체를 어댑터 클래스 블록 안으로 이동합니다.

    ``Holder클래스를 MusicRecyclerAdapter 내부로 옮겨 inner 클래스로 만듭니다.``
    ``class MusicRecyclerAdapter : RecyclerView.Adapter<Holder>`` 를 ``class MusicRecyclerAdapter : RecyclerView.Adapter<MusicRecyclerAdapter.Holder>``로 수정합니다.

    ```kotlin
    package kr.co.hanbit.music

    import android.net.Uri
    import android.view.LayoutInflater
    import android.view.ViewGroup
    import androidx.recyclerview.widget.RecyclerView
    import kr.co.hanbit.music.databinding.ItemRecyclerBinding
    import java.text.SimpleDateFormat

    class MusicRecyclerAdapter : RecyclerView.Adapter<MusicRecyclerAdapter.Holder>() {

        var musicList = mutableListOf<Music>()

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            val binding =
                ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            return Holder(binding)
        }

        override fun getItemCount(): Int {
            return musicList.size
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            val music = musicList.get(position)
            holder.setMusic(music)
        }

        inner class Holder(val binding: ItemRecyclerBinding) : RecyclerView.ViewHolder(binding.root) {
            var musicUri: Uri? = null

            fun setMusic(music: Music) {
                // run 함수를 사용하면 매번 binding.을 입력하지 않아도 됩니다.
                binding.run {
                    imageAlbum.setImageURI(music.getAlbumUri())
                    textArtist.text = music.artist
                    textTitle.text = music.title

                    val duration = SimpleDateFormat("mm:ss").format(music.duration)
                    textDuration.text = duration
                }
                this.musicUri = music.getMusicUri()
            }
        }

    }
    ```

1. 앞 단계에서 Holder를 클릭한 후 ``Alt`` + ``Enter`` 키를 눌러 import했다면 다음처럼 제네릭에 선언된 Holder 클래스 모양이 바뀌었을 겁니다. 이는 Holder 클래스 이동으로 인한 수정이었습니다. 다음처럼 MediaPlayer를 담아두는 mediaPlayer 변수를 선언합니다.
    ```kotlin
    class MusicRecyclerAdapter : RecyclerView.Adapter<MusicRecyclerAdapter.Holder>() {

        var musicList = mutableListOf<Music>()
        var mediaPlayer: MediaPlayer? = null
    ```

1. 이제 Holder 클래스 안의 musicUri 선언 부분 아래에 init 블록을 하나 만들고 생성자로 넘어온 itemView에 클릭리스너를 연결해줍니다.
    ```kotlin
    init {
        binding.root.setOnClickListener {
            // 04는 여기에 작성합니다.
        }
    }
    ``` 

1. 클릭리스너 블록 안에서 MediaPlayer에 사용할 음원의 Uri를 설정하고 시작 메서드를호출합니다. 이제 목록이 클릭되면 음원이 플레이됩니다.
    ```kotlin
    mediaPlayer = MediaPlayer.create(binding.root.context, musicUri)
    mediaPlayer?.start()
    ```

1. 그럴듯해 보이지만, 실은 이대로 실행하면 목록의 아이템을 클릭할 때마다 음악이 중복해서 실행되는 문제점이 있습니다. 이를 해결하기 위해서 음원 Uri를 설정하기 전에 현재 mediaPlayer에 설정된 값이 있으면 해제한 후 실행하도록 04의 코드 위에 다음의 코드를 추가합니다.
    ```kotlin
    if (mediaPlayer != null) {
        mediaPlayer?.release()
        mediaPlayer = null
    }
    ```

1. 앱을 실행하고 테스트합니다.


``MusicRecyclerAdapter.kt의 전체 코드``

```kotlin
package kr.co.hanbit.music

import android.media.MediaPlayer
import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kr.co.hanbit.music.databinding.ItemRecyclerBinding
import java.text.SimpleDateFormat

class MusicRecyclerAdapter : RecyclerView.Adapter<MusicRecyclerAdapter.Holder>() {

    var musicList = mutableListOf<Music>()
    var mediaPlayer: MediaPlayer? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding =
            ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }

    override fun getItemCount(): Int {
        return musicList.size
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val music = musicList.get(position)
        holder.setMusic(music)
    }

    inner class Holder(val binding: ItemRecyclerBinding) : RecyclerView.ViewHolder(binding.root) {
        var musicUri: Uri? = null

        init {
            binding.root.setOnClickListener {
                if (mediaPlayer != null) {
                    mediaPlayer?.release()
                    mediaPlayer = null
                }
                mediaPlayer = MediaPlayer.create(binding.root.context, musicUri)
                mediaPlayer?.start()
            }
        }

        fun setMusic(music: Music) {
            // run 함수를 사용하면 매번 binding.을 입력하지 않아도 됩니다.
            binding.run {
                imageAlbum.setImageURI(music.getAlbumUri())
                textArtist.text = music.artist
                textTitle.text = music.title

                val duration = SimpleDateFormat("mm:ss").format(music.duration)
                textDuration.text = duration
            }
            this.musicUri = music.getMusicUri()
        }
    }
}
```


<style>
.page-container {max-width: 1200px}
</style>