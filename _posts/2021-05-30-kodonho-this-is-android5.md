---
layout: post
title:  "[IT] - [BOOK] 5강 - 이것이 안드로이드다 with 코틀린 "
description: 권한
date:   2021-06-03 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android5/
width: large
---

* some text
{: toc}

# 권한과 권한의 유형

## 1.1 권한 명세와 기능 명세

설정 파일에 작성하는 명세에는 권한 명세와 기능 명세 두 가지가 있습니다. 

권한 명세는 해당 데이터나 기능의 사용 여부를 설정하고, 기능 명세는 해당 기능이 있는 안드로이드폰에서만 내려 받을 수 있도록 플레이 스토어에서 내려받는 것을 방지합니다.

### 권한 명세

권한 명세를 설정하는 AndroidManifest.xml 파일은 [app] - [manifests] 디렉토리 밑에 있습니다. 

프로젝트를 처음 생성한 상태에서 권한 태그는 아무 것도 없습니다.

파일을 열어 ``<uses-permission />`` 태그를 포함하여 필요한 권한을 명세합니다. 

다음 코드는 안드로이드의 인터넷 접근 권한과 와이파일 정보 접근 권한을 부여하는 내용입니다.

```xml
<uses-permission android:name="android.permission.INTERNET" /> <!-- 인터넷 접근 권한 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" /> <!-- 와이파이 접근 권한 -->
```

### 기능 명세

권한 이외에도 기능에 대한 명세가 필요할 때 기능 명세는 AndroidManifest.xml 파일4에 따로 추가하지 않아도 해당 기능을 사용할 때 시스템이 자동으로 부여합니다. 이때 사용하는 태그는 ``<uses-feature />``태그 입니다.

또 ``<uses-feature />``태그를 사용해 직접 사용하려는 기능을 명세할 수도 있습니다. 이렇게 기능 명세를 AndroidManifest.xml 파일에 작성하면 기능 사용 여부로 플레이 스토어 검색 조건이 결정됩니다.

예를 들어 앱에 카메라 기능을 추가하는 순간 자동으로 AndroidManifest.xml 파일에 ``<uses-feature android:name="android.hardware.camera" android:required="true">``가 명세됩니다.

카메라 기능을 사용하는 이 앱을 플레이 스토어에 올려두고 만일 카메라 기능이 없는 스마트폰으로 플레이 스토어에 접근하면 이 앱은 보이지 않습니다.

그렇다면 카메라 기능이 없는 스마트폰에서 이 앱을 내려받을 수 있는 방법은 없을까요?

있습니다.

기능 명세에서 required 옵션을 false로 작성하면 카메라가 없는 스마트폰에서도 검색하고 설치할 수 있습니다.

하지만 앱을 내려받아 사용하면 카메라를 사용하는 코드에서 오류가 발생할 수 있으므로 이 때는 꼭 예외처리를 해줘야 합니다.


## 1.2 권한의 보호 수준

권한은 일반 권한<sup>Normal Permission</sup>, 위험 권한<sup>Dangerous Permission</sup>, 서명 권한<sup>Signature Permission</sup>세 가지의 보호 수준으로 나뉩니다.

보호 수준에 따라 앱을 실행할 때 해당 권한에 대해 사용자에게 확인 요청이 필요한지 여부를 결정합니다.


### 일반 권한

일반 권한<sup>Normal Permission</sup>으로 설정 파일인 AndroidManifest.xml에 명세하면 설치 시 사용자에게 권한 승인을 묻는 팝업창을 보여줍니다.

인터넷 사용, 알람 설정 등이 일반 권한에 포함됩니다.

| 권한 | 설명 |
| :--- | :--- |
| ACCESS_NETWORK_STATE | 네트워크 연결 상태 확인 |
| ACCESS_WIFI_STATE | 와이파이 상태 확인 |
| BLUETOOTH | 블루투스 상태 확인 |
| INTERNET | 네트워크 및 인터넷 사용 |
| NFC | 기기 간 근거리 통신 사용 |
| SET_ALARM | 알람 설정 |
| VIBRATE | 진동 설정 |
{: .table .table-striped .table-hover}

설정 파일에 명세하는 방법은 다음의 블루투스 상태 확인 권한처럼 ``<uses-permission />`` 태그를 사용하여 권한을 입력하고 쌍따옴표 ("")  안의 permission, 다음에 필요한 권한을 적으면 됩니다.

```xml
<users-permission android:name="android.permission.BLUETOOTH" />
```

### 위험 권한

위험 권한<sup>Dangerous Permission</sup> 은 앱이 사용자의 개인정보와 관련된 데이터나 기능을 액세스하거나 다른 앱 및 기기의 작동에 영향을 줄 우려가 있는 권한입니다.

``위험 권한은 Gradle Scripts 디렉토리에 있는 build.gradle 파일의 targetSdkVersion 이 23이상으로 설정돼야 정상으로 동작``합니다.

이는 앞서 설명한 API 레벨과 같은 의미입니다.

다음 파일은 targetSdkVersion이 29입니다. 

지금까지 프로젝트를 생성하면서 최신 버전으로 설정했던 터라 크게 신경 쓰지 않아도 됩니다.

지금까지 생성했던 프로젝트를 모두 확인해보면 23이상일 겁니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-224.png){: style="box-shadow: 0 0 5px #777"}

안드로이드 6.0 (API Level 23) 부터는 위험 권한을 사용하려면 설정 파일인 AndroidManifest.xml 에 권한을 명세하고, 부가적으로 소스 코드에 권한 요청 및 처리 로직을 작성해야 합니다.

설정 파일에 명세하는 방법은 일반 권한과 같습니다.

다음은 위치 정보를 사용하는 위험 권한 명세 입니다.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

다음 표의 권한 그룹은 이어서 설명하겠습니다.

소스 코드에 위험 권한을 작성하는 방법은 이 장의 ``‘2. 위험한 권한 처리하기’`` 에서 살펴보겠습니다.

<table class="table table-striped table-hover">
    <thead>
        <tr>
            <th style="text-align: left">권한그룹</th>
            <th style="text-align: left">권한</th>
            <th style="text-align: left">설명</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2" style="text-align: left">CALENDAR</td>
            <td style="text-align: left">READ_CALENDAR</td>
            <td style="text-align: left">캘린더 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_CALENDAR</td>
            <td style="text-align: left">캘린더 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">CAMERA</td>
            <td style="text-align: left">CAMERA</td>
            <td style="text-align: left">카메라</td>
        </tr>
        <tr>
            <td rowspan="3" style="text-align: left">CONTACTS</td>
            <td style="text-align: left">READ_CONTACTS</td>
            <td style="text-align: left">주소록 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_CONTACTS</td>
            <td style="text-align: left">주소록 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">GET_ACCOUNTS</td>
            <td style="text-align: left">계정 정보 가져오기</td>
        </tr>
        <tr>
            <td style="text-align: left">MICROPHONE</td>
            <td style="text-align: left">RECORD_AUDIO</td>
            <td style="text-align: left">마이크 녹음</td>
        </tr>
        <tr>
            <td rowspan="9" style="text-align: left">PHONE</td>
            <td style="text-align: left">READ_PHONE_STATE</td>
            <td style="text-align: left">폰 상태 정보</td>
        </tr>
        <tr>
            <td style="text-align: left">READ_PHONE_NUMBERS</td>
            <td style="text-align: left">전화번호 가져오기</td>
        </tr>
        <tr>
            <td style="text-align: left">CALL PHONE</td>
            <td style="text-align: left">발신하기</td>
        </tr>
        <tr>
            <td style="text-align: left">ANSWER_PHONE_CALLS</td>
            <td style="text-align: left">응답하기</td>
        </tr>
        <tr>
            <td style="text-align: left">READ_CALL_LOG</td>
            <td style="text-align: left">전화 로그 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_CALL_LOG</td>
            <td style="text-align: left">전화 로그 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">ADD_VOICEMAIL</td>
            <td style="text-align: left">음성메일 추가</td>
        </tr>
        <tr>
            <td style="text-align: left">USE SIP</td>
            <td style="text-align: left">SIP 사용</td>
        </tr>
        <tr>
            <td style="text-align: left">PROCESS_OUTGOING_CALLS</td>
            <td style="text-align: left">통화 관련 Broadcast 수신</td>
        </tr>
        <tr>
            <td style="text-align: left">SENSORS</td>
            <td style="text-align: left">BODY_SENSORS</td>
            <td style="text-align: left">바디센서</td>
        </tr>
        <tr>
            <td rowspan="5" style="text-align: left">SMS</td>
            <td style="text-align: left">SEND_SMS</td>
            <td style="text-align: left">SMS 보내기</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_SMS</td>
            <td style="text-align: left">SMS </td>
        </tr>
        <tr>
            <td style="text-align: left">READ_SMS</td>
            <td style="text-align: left">SMS 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_WAP_PUSH</td>
            <td style="text-align: left">WAP 수신</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_MMS</td>
            <td style="text-align: left">MMS 받기</td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align: left">STORAGE</td>
            <td style="text-align: left">READ_EXTERNAL_STORAGE</td>
            <td style="text-align: left">안드로이드 공용 저장소 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_EXTERNAL_STORAGE</td>
            <td style="text-align: left">안드로이드 공용 저장소 쓰기</td>
        </tr>
    </tbody>
</table>

### 서명 권한

서명 권한<sup>Signature Permission</sup>은 권한을 사용하려는 앱이 권한을 정의하는 앱과 동일한 인증서로 서명된 경우 시스템은 권한을 자동으로 부여합니다.

풀어서 설명하면 구글이 만든 앱은 권한이 자동으로 부여되는 것과 같다고 생각하세요


## 1.3 권한 그룹

각각의 권한은 그룹 단위로 구성됩니다.

파일에 대해 읽기/쓰기 권한이 있으면 이 2개의 권한은 하나의 그룹에 속합니다.

권한에 대한 요청은 그룹 단위로 처리되며 동일한 권한 그룹 내에서 다른 권한이 이미 부여된 경우 시스템은 즉시 권한을 부여합니다.

예를 들어 앞쪽의 표를 보세요.

앱에서 동일한 권한 그룹 CONTACTS에 있는 READ_CONTACTS와 WRTIE_CONTACTS를 사용한다고 가정합시다.

앱에서 READ_CONTACTS 요청에 대한 승인이 있었다면, 시스템은 사용자에게 다시 물어보지 않고 WRITE_CONTACTS 권한에 대한 사용을 허가합니다.


# 2. 위험한 권한 처리하기

위험한 권한에 대해서는 AndroidManifest.xml 파일을 수정한 다음 소스 코드에도 추가로 처리해야 한다고 했습니다.

카메라 권한을 사용하는 앱을 하나 만들면서 설명하겠습니다.


## 2.1 권한 요청 처리 흐름도 

![1]({{site.baseurl}}/images/this-is-android/this-is-android-225.png){: style="box-shadow: 0 0 5px #777"}



## 2.2 설정 파일 AndriodManifest.xml에 명세하기

Permission 프로젝트를 새로 생성하고, build.gradle 파일에 viewBinding 설정을 합니다.

그리고 AndriodManifest.xml 파일을 열어서 사용할 권한을 먼저 작성합니다.

1. [app] - [manifests] 디렉토리 밑에 있는 AndroidManifest.xml 파일을 엽니다.

1. ``<uses-permission />`` 태그를 사용해서 카메라 권한을 추가합니다. 카메라 권한을 추가하는 태그는 ``<manifest>`` 태그 안에 있으며 ``<application>`` 태그 위에 작성합니다.
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="kr.co.hanbit.permission">

        <uses-permission android:name="android.permission.CAMERA" />
        //...
    </manifest>
    ```

## 2.3 권한을 요청하는 버튼 만들기

1. activity_main.xml 파일을 열고 [Design]모드에서 기본으로 생성되어 있는 텍스트뷰의 text 속성에 ‘위험 권한’이라고 입력합니다.

1. 텍스트뷰 아래에 버튼을 하나 가져다 놓고 text 속성에는 ‘카메라’를, id속성에는 ‘btnCamera’를 입력합니다.  컨스트레인트는 다음 그림과 같이 좌우는 화면 가장자리에 연결하고, 위쪽은 텍스트뷰에 연결하며 거리를 ‘24’로 설정합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-226.png){: style="box-shadow: 0 0 5px #777"}


## 2.4 소스 코드에서 위험 권한 처리하기

- 1단계: 권한에 대한 사용자 승인 확인 (이전에 승인했는지)
- 2단계: 사용자에게 승인 요청
- 3단계: 사용자 승인 후 처리

1. MainActivity.kt 파일을 열고 바인딩을 생성합니다.  그리고 binding 프로퍼티를 저장한 후 setContentView에 binding.root 를 전달합니다.
    ```kotlin
    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. onCreate() 메서드 아래에 권한을 확인하는 checkPermission() 메서드를 하나 만듭니다.
    ```kotlin
    fun checkPermission() {
        
    }
    ```

1. checkPermission() 메서드 안에 카메라 권한의 승인 상태를 먼저 확인한 다음 결괏값을 cameraPermission 변수에 저장하는 코드를 작성합니다. 권한은 모두 Manifest(andriod) 클래스에 문자열 상수로 정의되어 있습니다. 
    ```kotlin
    // 카메라 권한의 승인 상태 가져오기
    val cameraPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
    // import 할 때 2개가 나타납니다. 꼭 android로 선택하세요
    ```

1. 이어서 바로 아래에 cameraPermission 에 저장된 값이 승인되었는지 아닌지에 따라 분기하는 코드를 작성합니다.
    ```kotlin
    if (cameraPermission == PackageManager.PERMISSION_GRANTED) {
        // 1. 승인이면 프로그램 진행s
    } else {
        // 2. 미승인이면 권한 요청
    }
    ```

1. 카메라 권한이 승인이라면 startProcess() 메서드를 호춣해서 카메라를 실행하고 승인되지 않았다면 requestPermission() 메서드를 호출합니다. requestPermission() 메서드는 권한 승인을 요청하는 메서드로 다음 단계에서 새로 만들 것입니다.
    ```kotlin
    if (cameraPermission == PackageManager.PERMISSION_GRANTED) {
        startProcess() // 1. 승인이면 프로그램 진행
    } else {
        requestPermission() // 2. 미승인이면 권한 요청
    }
    ```

1. startProcess() 메서드를 checkPermission() 메서드 아래에 만들고 startProcess() 메서드 안에 카메라를 실행한다는 메시지를 토스트로 알려주는 코드를 작성합니다.
    ```kotlin
    fun startProcess() {
        // 1 승인이면 프로그램을 진행하는 메서드
        Toast.makeText(this, "카메라를 실행합니다.", Toast.LENGTH_LONG).show()
    }
    ```

### 2단계: 사용자에게 승인 요청

ActivityCompat.requestPermissions()를 호출하면 사용자에게 권한을 요청하는 팝업창이 뜨고 팝업을 눌러 승인 처리하면 마치 액티비티에서 안드로이드가 activityResult() 메서드를 호출했던 것처럼 onRequestPermissionResult() 메서드를 호출합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-227.png){: style="box-shadow: 0 0 5px #777"}


1. startProcess() 메서드 아래에 requestPermission() 메서드를 만들고 미승인된 권한을 사용자에게 요청하는 ActivityCompat.requestPermissions() 메서드를 호출합니다. 파라미터는 배열입니다. 이는 권한이 복수일 때를 대비해서 배열로 입력합니다. 세 번째 파라미터는 리퀘스트 코드로 startActivityForResult에서 사용했던 것처럼 권한을 요청한 주체가 어떤 것인지 구분하기 위해서 코드를 숫자로 입력해서 사용합니다.
    ```kotlin
    fun requestPermission() {
        ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 99)
    }
    ```

1. onCreate() 메서드 안에서 checkPermission()을 호출한 후 앱을 실행하면 에뮬레이터에 권한 승인을 묻는 팝업창이 나타납니다.

### 3단계: 사용자 승인 후 처리

권한 승인을 묻는 팝업창에 사용자가 DENY(거절) 또는 ALLOW(수락)을 클릭하면 앱티비티의 onRequestPermissionResult() 메서드가 호출됩니다.

1. onRequestPermissionResult() 메서드를 오버라이드합니다.
    ```kotlin
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }
    ```

    ``onRequestPermissionsResult() 파라미터 설명``
    - ``requestCode``: 요청한 주체를 확인하는 코드, requestPermissions() 메서드의 세 번째 파라미터로 전달됩니다.
    - ``permissions``: 요청한 권한 목록. requestPermissions() 메서드의 두 번째 파라미터로 전달됩니다.
    - ``grantResults``: 권한 목록에 대한 승인/미승인 값. 권한 목록의 개수와 같은 수의 결괏값이 전달됩니다.

1. super.onRequest... 로 시작하는 줄을 지우고 requestCode가 요청 시에 입력했던 99인지를 확인하는 코드를 작성합니다.
    ```kotlin
    when (requestCode) {
        99 -> {
            // 권한 결괏값을 확인 후 실행 내용을 결정합니다.
        }
    }
    ```

1. 권한 결괏값을 체크해서 승인 여부를 체크하고, 승인이면 startProcess() 메서드를 실행하고 미승인이면 앱을 종료합니다.
    ```kotlin
    when (requestCode) {
        99 -> {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startProcess()
            } else {
                finish()
            }
        }
    }
    ```

1. 마지막으로 onCreate() 메서드 안에 작성해둔 checkPermission() 코드를 다음과 같이 btnCamera를 클릭하면 호출하는 형태로 수정합니다.
    ```kotlin
    binding.btnCamera.setOnClickListener {
        checkPermission()
    }
    ```

1. 앱을 실행하고 테스트합니다.
    ``일회성 권한 (One-time permission)``
    
    안드로이드 버전 11(R)부터 실행 시 승인을 요청하는 위험 권한은 종류에 따라 3개의 옵션이 보여지는 것과 2개의 옵션이 보여지는 것으로 나눕니다.

    10(Q) 버전까지는 허용(Allow)과 거부(Deny) 두 가지로 나타나던 옵션이, 11로 넘어오면서 카메라, 위치, 마이크에 대한 권한 요청일 경우 앱 사용 중에만 허용 (While using the app), 이번만 허용(Only this time), 거부(Deny) 세 가지로 세분화되었습니다. 

    이중 이번만 허용(Only this time)을 선택하면 임시로 일회성 권한이 부여되고, 앱을 껏다 켜면 다시 한번 승인 요청 팝업창이 나타납니다.

1. 앱을 지웠다가 재설치한 후 DENY(거절)를 클릭하면 앱이 종료됩니다.  앱을 삭제하지 않으면 기존 승인 상태를 저장하고 있어 제대로 테스트할 수 없으므로 삭제한 다음 재설치하고 테스트 하길 바랍니다.

    ``MainActivity.kt의 전체코드``

    ```kotlin
    package kr.co.hanbit.permission

    import android.Manifest
    import android.content.pm.PackageManager
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.widget.Toast
    import androidx.core.app.ActivityCompat
    import androidx.core.content.ContextCompat
    import kr.co.hanbit.permission.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.btnCamera.setOnClickListener {
                checkPermission()
            }
        }
        fun checkPermission() {
            val cameraPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)

            if (cameraPermission == PackageManager.PERMISSION_GRANTED) {
                startProcess() // 1. 승인이면 프로그램 진행
            } else {
                requestPermission() // 2. 미승인이면 권한 요청
            }
        }
        fun startProcess() {
            Toast.makeText(this, "카메라를 실행합니다.", Toast.LENGTH_LONG).show()
        }
        fun requestPermission() {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 99)
        }

        override fun onRequestPermissionsResult(
            requestCode: Int,
            permissions: Array<out String>,
            grantResults: IntArray
        ) {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults)

            when (requestCode) {
                99 -> {
                    if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                        startProcess()
                    } else {
                        finish()
                    }
                }
            }
        }
    }
    ```

# 3. BaseActivity 설계하기

권한 처리와 같은 반복적인 코드들은 BaseActivity를 하나 만들어두고, 각각의 액티비티에서 상속 받아서 사용하면 훨씬 효율적입니다.

Base 프로젝트를 하나 새로 생성하고, build.gradle 파일에 viewBinding을 설정합니다.


## 3.1 BaseActivity 만들기

베이스 액티비티는 다른 액티비티에서 상속받아서 사용되기 때문에, 직접 실행되는 것을 방지하고 상속받은 액티비티 (구현체)에서만 사용할 수 있게 만들어야 합니다.

그래서 일반적으로 추상 클래스로 설계합니다. 

액티비티이지만 추상 클래스이기 때문에 Activity 메뉴가 아닌 Class 메뉴를 통해 생성합니다.

1. 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Kotlin Class/File]을 선택합니다.  클래스 이름에 ‘BaseActivity’를 입력하고 아래 목록에서 Class 를 선택하여 코틀린 클래스를 생성합니다.

1. 권한 처리를 하기 위해서는 액티비티의 기본 기능이 필요하기 때문에 AppCompatActivity를 상속받아서 기본 기능을 사용할 수 있도록 작성합니다.
    ```kotlin
    package kr.co.hanbit.permission

    import androidx.appcompat.app.AppCompatActivity

    abstract class BaseActivity: AppCompatActivity() {
    }
    ```

1. 2개의 추상 메서드 permissionGranted와 permissionDenyed를 만들겠습니다. abstract로 메서드를 선언하면 BaseActivity를 상속받은 측에 구현을 강제하므로 반드시 두 멧드가 존재합니다. 이렇게 상속받은 메서드가 있으면 사용자가 권한을 허용하거나 거부했을 때 이 메서드를 통해서 부가적인 처리를 할 수 있습니다. 파라미터로 requestCode를 전달하므로 권한 요청이 어디에서 일어났는지에 따른 처리도 함께 할 수 있습니다.
    ```kotlin
    abstract fun permissionGranted(requestCode: Int)
    abstract fun permissionDenied(requestCode: Int)

    // requiredPermissions 메서드를 여기에 작성합니다.
    // onRequestPermissionsResult 메서드를 여기에 작성합니다.
    ```

1. 이제 자식 액티비티에서 권한 요청 시 직접 호출하는 requirePermissions 메서드를 작성합니다. 메서드의 파라미터로 권한 배열과 함께 requestCode를 전달받을 겁니다.
```kotlin
fun requirePermissions(permissions: Array<String>, requestCode: Int) {
}
```

1. 메서드 안에 안드로이드의 버전을 체크하는 코드르 작성합니다. 안드로이드 6.0 (마시멜로우) 미만이면 permissionGranted() 메서드를 호출하면서 전달받은 requestCode를 함께 전달합니다.
    ```kotlin
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
        permissionGranted(requestCode)
    } else {
        // 6번을 여기에 작성합니다.
        // 7번을 여기에 작성합니다.
    }
    ```

1. 권한 체크를 해야 되는 버전이면 else 블록 안에서 권한이 모두 승인된 것을 확인합니다. 파라미터로 전달받은 permissions에는 권한 배열이 들어 있는데, all 메서드를 사용하면 배열 속에 들어 있는 모든 값을 체크할 수 있습니다. 권한이 모두 승인되었는지 여부를 다음과 같이 변수에 저장합니다.
    ```kotlin
    val isAllPermissionsGranted = permissions.all {
        checkSelfPermission(it) == PackageManager.PERMISSION_GRANTED
    }
    ```

1. 계속해서 조건문에서 isAllPermissionsGranted가 true면 그냥 permissionGranted() 메서드를 호출하고, false면 사용자에 권한 승인을 요청합니다.
    ```kotlin
    if (isAllPermissionsGranted) {
        permissionGranted(requestCode)
    } else {
        ActivityCompat.requestPermissions(this, permissions, requestCode)
    }
    ```


1. 이어서 사용자가 권한을 승인하거나 거부한 다음에 호출되는 onRequestPermissionsResult메서드를 오버라이드합니다.  super.onRequest...로 시작하는 코드 줄은 삭제합니다.
    ```kotlin
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        //super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        // 9번을 여기에 작성합니다.
    }
    ```

1. 메서드 안에서 먼저 grantResults에 all 메서드를 이용하여 결괏값이 모두 승인된 것인지를 확인합니다. true면 permissionGranted() 메서드를, false 면 permissionDenied() 메서드를 호출합니다.
    ```kotlin
    if (grantResults.all { it == PackageManager.PERMISSION_GRANTED}) {
        permissionGranted(requestCode)
    } else {
        permissionDenied(requestCode)
    }
    ```

    이제 BaseActivity가 준비되었습니다. 
    
    상속받은 자식 액티비티에서는 requirePermissions() 메서드를 호출하면서 권한 처리를 할 권한 목록과 결과 처리를 할 리스너만 던져주면 어떤 권한이라도 처리할 수 있습니다.

    ``BaseActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.base

    import android.annotation.SuppressLint
    import android.content.pm.PackageManager
    import android.os.Build
    import androidx.appcompat.app.AppCompatActivity
    import androidx.core.app.ActivityCompat

    abstract class BaseActivity: AppCompatActivity() {

        abstract fun permissionGranted(requestCode: Int)
        abstract fun permissionDenied(requestCode: Int)

        fun requirePermissions(permissions: Array<String>, requestCode: Int) {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
                permissionGranted(requestCode)
            } else {
                val isAllPermissionsGranted = permissions.all {
                    checkSelfPermission(it) == PackageManager.PERMISSION_GRANTED
                }
                if (isAllPermissionsGranted) {
                    permissionGranted(requestCode)
                } else {
                    ActivityCompat.requestPermissions(this, permissions, requestCode)
                }
            }
        }

        @SuppressLint("MissingSuperCall")
        override fun onRequestPermissionsResult(
            requestCode: Int,
            permissions: Array<out String>,
            grantResults: IntArray
        ) {
            //super.onRequestPermissionsResult(requestCode, permissions, grantResults)
            if (grantResults.all { it == PackageManager.PERMISSION_GRANTED}) {
                permissionGranted(requestCode)
            } else {
                permissionDenied(requestCode)
            }
        }
    }
    ```

## 3.2 MainActivity에서 BaseActivity를 상속받고 사용하기

1. 먼저 AndroidManifest.xml 에 카메라 권한을 하나 추가합니다.
    ```kotlin
    <uses-permission android:name="android.permission.CAMERA" />
    ```

1. activity_main.xml 파일을 열고 팔레트의 버튼 카테고리에서 버튼을 하나 드래그해서 UI편집기에 가져다 놓은 후 text속성에는 ‘CAMERA’를, id속성에는 ‘btnCamera’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-228.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity를 열고 클래스 이름 옆의 AppCompatActivity를 BaseActivity로 변경합니다.
    ```kotlin
    class MainActivity: BaseActivity {
        
    }
    ```
1. onCreate() 메서드 블록 아랫줄에서 ``Ctrl`` + ``I`` 키를 입력해서 BaseActivity에 설꼐해둔 2개의 추상 메서드를 구현합니다. permissionGranted() 메서드에는 카메라를 호출하는 코드를 작성하고, permissionDenied() 메서드에는 권한이 거부되었다는 토스트 메시지를 보여주는 코드를 작성합니다. 두 번째 파라미터에는 ‘99’를 입력한 후 onActivityResult에서 받아서 처리합니다.
    ```kotlin
    override fun permissionGranted(requestCode: Int) {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, 99)
    }

    override fun permissionDenied(requestCode: Int) {
        Toast.makeText(baseContext, "권한 거부됨", Toast.LENGTH_LONG).show()
    }
    ```

1. onCreate() 메서드는 바로 윗줄에 바인딩을 생성한 후 binding 프로퍼티에 저장하고, setContentView에 binding.root를 전달합니다.
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // 6을 여기에 작성합니다.
    }
    ```

1. btnCamera에 클릭리스너를 달고, BaseActivity에 구현된 requirePermission() 메서드르르 호출합니다. 첫 번째 파라미터에는 요청할 권한 배열을, 두 번째 파라미터에는 임의의 숫자 1개를 전달합니다. 이 액티비티 전체에는 하나의 권한 처리밖에 없기 때문에 의미 없는 값을 넣어도 됩니다. 이제 권한 요청이 있는 후 사용자의 승인 여부에 따라 액티비티에 구현한 permissionGranted() 메서드와 permissionDenied() 메서드가 호출됩니다.
    ```kotlin
    binding.btnCamera.setOnClickListener {
        requirePermissions(arrayOf(Manifest.permission.CAMERA), 10)
    }
    ```

1. onActivityResult() 메서드를 오버라이드하고 카메라 촬영을 처리하는 코드를 작성합니다.
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 10) {
            if (resultCode == Activity.RESULT_OK) {
                Log.d("카메라", "촬영 성공")
            } else {
                Log.d("카메라", "촬영 실패")
            }
        }
    }
    ```

1. 앱을 실행하고 버튼을 클릭해서 권한 코드가 정상적으로 동작하는지 확인해봅니다. 앞으로 작성하는 프로젝트에서 이 BaseActivity를 권한이 필요한 액티비티에서 상속받아 사용하면 반복되는 권한 처리 코드를 보다 효율적으로 사용할 수 있습니다.
    ```kotlin
    package kr.co.hanbit.base

    import android.Manifest
    import android.app.Activity
    import android.content.Intent
    import android.os.Bundle
    import android.provider.MediaStore
    import android.util.Log
    import android.widget.Toast
    import kr.co.hanbit.base.databinding.ActivityMainBinding

    @Suppress("DEPRECATION")
    class MainActivity : BaseActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.btnCamera.setOnClickListener {
                requirePermissions(arrayOf(Manifest.permission.CAMERA), 10)
            }
        }

        override fun permissionGranted(requestCode: Int) {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            startActivityForResult(intent, 99)
        }

        override fun permissionDenied(requestCode: Int) {
            Toast.makeText(baseContext, "권한 거부됨", Toast.LENGTH_LONG).show()
        }

        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)
            if (requestCode == 10) {
                if (resultCode == Activity.RESULT_OK) {
                    Log.d("카메라", "촬영 성공")
                } else {
                    Log.d("카메라", "촬영 실패")
                }
            }
        }
    }
    ```

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-229.png){: style="box-shadow: 0 0 5px #777"}

*deprecated 된 소스가 너무 많다 ㅜ.ㅜ*
{: style="color: #ff0000"}

<style>
.page-container {max-width: 1200px}
</style>