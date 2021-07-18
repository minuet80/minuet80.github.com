---
layout: post
title:  "[IT] - [BOOK] 5강 - 이것이 안드로이드다 with 코틀린 "
description: 권한
date:   2021-05-30 11:22:30 +0900
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
            <td style="text-align: left">READ_<br>CALENDAR</td>
            <td style="text-align: left">캘린더 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_<br>CALENDAR</td>
            <td style="text-align: left">캘린더 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">CAMERA</td>
            <td style="text-align: left">CAMERA</td>
            <td style="text-align: left">카메라</td>
        </tr>
        <tr>
            <td rowspan="3" style="text-align: left">CONTACTS</td>
            <td style="text-align: left">READ_<br>CONTACTS</td>
            <td style="text-align: left">주소록 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_<br>CONTACTS</td>
            <td style="text-align: left">주소록 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">GET_<br>ACCOUNTS</td>
            <td style="text-align: left">계정 정보 가져오기</td>
        </tr>
        <tr>
            <td style="text-align: left">MICROPHONE</td>
            <td style="text-align: left">RECORD_<br>AUDIO</td>
            <td style="text-align: left">마이크 녹음</td>
        </tr>
        <tr>
            <td rowspan="9" style="text-align: left">PHONE</td>
            <td style="text-align: left">READ_<br>PHONE_<br>STATE</td>
            <td style="text-align: left">폰 상태 정보</td>
        </tr>
        <tr>
            <td style="text-align: left">READ_<br>PHONE_<br>NUMBERS</td>
            <td style="text-align: left">전화번호 가져오기</td>
        </tr>
        <tr>
            <td style="text-align: left">CALL PHONE</td>
            <td style="text-align: left">발신하기</td>
        </tr>
        <tr>
            <td style="text-align: left">ANSWER_<br>PHONE_<br>CALLS</td>
            <td style="text-align: left">응답하기</td>
        </tr>
        <tr>
            <td style="text-align: left">READ_<br>CALL_<br>LOG</td>
            <td style="text-align: left">전화 로그 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_<br>CALL_<br>LOG</td>
            <td style="text-align: left">전화 로그 쓰기</td>
        </tr>
        <tr>
            <td style="text-align: left">ADD_<br>VOICEMAIL</td>
            <td style="text-align: left">음성메일 추가</td>
        </tr>
        <tr>
            <td style="text-align: left">USE SIP</td>
            <td style="text-align: left">SIP 사용</td>
        </tr>
        <tr>
            <td style="text-align: left">PROCESS_<br>OUTGOING_<br>CALLS</td>
            <td style="text-align: left">통화 관련 Broadcast 수신</td>
        </tr>
        <tr>
            <td style="text-align: left">SENSORS</td>
            <td style="text-align: left">BODY_<br>SENSORS</td>
            <td style="text-align: left">바디센서</td>
        </tr>
        <tr>
            <td rowspan="5" style="text-align: left">SMS</td>
            <td style="text-align: left">SEND_<br>SMS</td>
            <td style="text-align: left">SMS 보내기</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_<br>SMS</td>
            <td style="text-align: left">SMS </td>
        </tr>
        <tr>
            <td style="text-align: left">READ_<br>SMS</td>
            <td style="text-align: left">SMS 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_<br>WAP_<br>PUSH</td>
            <td style="text-align: left">WAP 수신</td>
        </tr>
        <tr>
            <td style="text-align: left">RECEIVE_<br>MMS</td>
            <td style="text-align: left">MMS 받기</td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align: left">STORAGE</td>
            <td style="text-align: left">READ_<br>EXTERNAL_<br>STORAGE</td>
            <td style="text-align: left">안드로이드 공용 저장소 읽기</td>
        </tr>
        <tr>
            <td style="text-align: left">WRITE_<br>EXTERNAL_<br>STORAGE</td>
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

1. 텍스트뷰 아래에 버튼을 하나 가져다 놓고 text 속성에는 ‘카메라’를, id속성에는 ‘btnCamera’를 입력합니다.  컨스트레인트는 다음 그림과 같이 좌우는 화면 가장자리에 연결하고, 위쪽은 텍스트뷰에 연결하며 거리를 ‘24’로 설정합니다.<br>
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

1. 









<style>
.page-container {max-width: 1200px}‘’
</style>