---
layout: post
title:  "[IT] - [BOOK] 11강 - 이것이 안드로이드다 with 코틀린 "
description: 구글 지도, 네트워크, Open API
date:   2021-06-09 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android11/
width: large
---

* some text
{: toc}


# 1. 구글 지도

## 1.1 구글 지도 시작하기

안드로이드 스튜디오는 구글 지도를 쉽게 사용할 수 있도록 프로젝트 생성 시 프로젝트의 종류를 선택하는 메뉴에서 Google Maps Activity를 제공합니다.

### 구글 플레이 서비스 SDK 설치하기

Google Maps API를 사용하면 구글 플레이 서비스 SDK 를 설치해야 합니다.

구글 플레이 서비스는 구글 로그인, 지도, 파이어베이스 등의 서비스와 구글 앱 업데이트 기능이 포함됩니다.

1. Welcome to Android Studio 화면에서 하단의 [Configure] - [SDK Manager]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-285.png){: style="box-shadow: 0 0 5px #777"}

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-286.png){: style="box-shadow: 0 0 5px #777"}


1. 다음의 그림처럼 Android SDK 설정 화면에서 [SDK Tools] 탭을 클릭하면 안드로이드 개발에 필요한 SDK를 설치할 수 있습니다. Google Play Services가 [Not installed]상태이면 체크박스에 체크한 후 [OK]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-287.png){: style="box-shadow: 0 0 5px #777"}

### Google Maps Activity 시작하기

지금까지는 모든 프로젝트에 Empty Activity를 사용했지만 이번 예제에서는 Google Maps Activity를 사용합니다.

1. GoogleMaps 라는 이름으로 신규 프로젝트를 하나 생성하겠습니다.  프로젝트 설정 화면에서 [Google Maps Activity]를 선택하고 [Next]를 클릭합니다 [Google Maps Activity]는 목록 하단에 있으니 스크롤해서 내려줍니다.

1. Name에 ‘GoogleMaps’라고 입력하고 [Finish]를 클릭해서 프로젝트를 생성합니다.

### Google Maps API 키 받기

구글 지도를 포함한 구글 플레이 서비스에 엑세스하려면 구글 플레이 서비스의 API키가 필요합니다.

[Google Maps Activity]로 프로젝트를 생성하면 API키가 있는 google_maps_api.xml파일이 자동으로 생성됩니다.

*안드로이드 스튜디오 4.2 이상 버전은 Google Maps Activity 사용시 자동으로 viewBinding 설정이 되기 때문에 별도로 설정하지 않아도 됩니다.*{: style="text-decoration: underline"}

1. [app] - [res] - [value] 디렉토리에 있는 google_maps_api.xml 파일에서 “https://”로 시작하는 첫 번째 URL를 복사해 웹 브라우저의 주소창에 붙여넣은 다음 이동합니다. 또는 키보드의 ``Ctrl``  키를 누른 상태에서 마우스로 URL을 클릭하면 새로 웹 브라우저가 열리면서 해당 주소로 이동합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-288.png){: style="box-shadow: 0 0 5px #777"}


1. 구글 계정이 있으면 해당 계정으로 로그인하고 계정이 없으면 가입 후 로그인 합니다. 

1. 웹 브라우저에 다음과 같이 Google Cloud Platform 콘솔 페이지가 열렸을 겁니다. 애플리케이션 등록 화면에서 [프로젝트 만들기]를 선택하고 [계속]을 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-289.png){: style="box-shadow: 0 0 5px #777"}


1. 잠시 기다리면 프로젝트가 자동으로 생성되고 API 사용 설정 화면으로 이동합니다. API를 호출하기 위해서 [API 키 만들기]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-290.png){: style="box-shadow: 0 0 5px #777"}


1. 정상적으로 진행되었다면 사용자 인증 정보 화면의 API키 목록에 생성된 API키가 보입니다. 목록 우측 끝에 보이는 연필 모양을 클릭해 수정 화면으로 들어갑니다. 테스트를 애뮬레이터에서 해야 하므로 [애플리케이션 제한사항]을 [없음]으로 변경한 다음 [저장] 버튼을 누릅니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-291.png){: style="box-shadow: 0 0 5px #777"}

1. 자동으로 생성된 API키의 우측에 있는 복사 버튼으로 API키를 복사합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-292.png){: style="box-shadow: 0 0 5px #777"}


1. google_maps_api.xml 파일의 \<string nam"gooogle_maps_key"\> 요소 ‘YOUR_KEY_HERE’이라고 적힌 부분에 복사한 API키를 붙여넣습니다.

1. 안드로이드 스튜디오에서 앱을 빌드하고 시작하면 우측에 보이는 그림처럼 시드니에 마커가 표시된 지도를 표시합니다.

    ```xml
    <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">AIzaSyAuCzJrTYfawgSyO2OCAU5yVgXl8l_h-YI</string>
    ```

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-293.png){: style="box-shadow: 0 0 5px #777"}



## 1.2 구글 지도 코드 살펴보기

구글 지도를 간단하게 사용하려면 먼저 SupportMapFragment에 대해 알고 있어야 합니다.

### activity_maps.xml 의 SupportMapFragment

프로젝트를 생성하면 activity_maps.xml 파일이 자동 생성됩니다.

보통은 파일이 열려있는데 현재는 보이지 않을 겁니다.

[app] - [res] - [layout] 에 있는 activity_maps.xml 파일을 더블클릭하고 [Code] 모드로 변경합니다.

android:name에 “com.google.android.gms.maps.SupportMapFragment”가 설정되어 있습니다.

Google Maps API는 SupportMapFragment에 구글 지도를 표시합니다.


```xml
<?xml version="1.0" encoding="utf-8"?>
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:map="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/map"
    android:name="com.google.android.gms.maps.SupportMapFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MapsActivity" />
```

### MapsActivity.kt의 SupportMapFragment.getMapAsync

MapsActivity.kt 파일을 열면 onCreate() 메서드 블록 안에서는 SupportFragmentManager의 findFragmentById() 메서드로 id가 map인 SupportMapFragment를 찾은 후 getMapAsync()를 호출해서 안드로이드에 구글 지도를 그려달라는 요청을 합니다.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    binding = ActivityMapsBinding.inflate(layoutInflater)
    setContentView(binding.root)

    // Obtain the SupportMapFragment and get notified when the map is ready to be used.
    val mapFragment = supportFragmentManager
        .findFragmentById(R.id.map) as SupportMapFragment
    mapFragment.getMapAsync(this)
}
```

### MapsActivity.kt의 OnMapReadyCallback

안드로이드는 구글 지도가 준비되면 OnMapReadyCallback 인터페이스의 onMapReady() 메서드를 호출하면서 파라미터로 준비된 GoogleMap을 전달해줍니다.

메서드 안에서 미리 선언된 mMap 프로퍼티에 GoogleMap을 저장해두면 액티비티 전체에서 맵을 사용할 수 있습니다.

```kotlin
package kr.co.hanbit.googlemaps

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kr.co.hanbit.googlemaps.databinding.ActivityMapsBinding

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap

    ...

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-34.0, 151.0)
        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
    }
}
```

## 1.3 카메라와 지도 뷰

구글 지도에서는 카메라를 통해 현재 화면의 지도 뷰를 변경할 수 있습니다.

지도 뷰는 평면에서 아래를 내려다보면서 모델링 되며 카메라의 포지션은 위도/경도, 방위, 기울기 및 확대/축소 속성으로 지정됩니다.

카메라의 위치는 CameraPosition 클래스에 각종 옵션을 사용해서 조절할 수 있습니다.

``CameraPosition.Builder().옵션1.옵션2.build()``{: style="background-color: #ffcccc"}

옵션 종류를 살펴보겠습니다.

### Target

카메라의 목표 지점은 지도 중심의 위치이며 취도 및 경도 좌료로 지정됩니다.

``CameraPosition.Builder().target(LatLng(-34, 0, 151.0))``

### Zoom

카메라의 줌 (확대/축소) 레벨에 따라 지도의 배율이 결정됩니다.

줌 레벨이 높을 수록 더 자세한 지도를 볼 수 있는 반면, 줌 레벨이 작을수록 더 넒은 지도를 볼 수 있습니다.

``CameraPosition.Builder().zoom(15,5f)``

줌 레벨이 0인 지도의 배율은 전 세계의 너비가 약 256dp가 되며 레벨 범위는 다음과 같습니다.

| 레벨 | 설명 |
| :---: | :---: |
| 1.0 | 세계 |
| 5.0 | 대륙 |
| 10.0 | 도시 |
| 15.0 | 거리 |
| 20.0 | 건물 |

### Bearing

카메라의 베어링은 지도의 수직선이 북쪽을 기준으로 시계 방향 단위로 측정되는 방향입니다.

자동자를 운전하는 사름은 지도를 돌려가며 여행 방향에 맞추고 지도와 나침판을 사용하는 등산객은 지도의 수직선이 북쪽을 향하도록 지도의 방향을 정합니다.

```kotlin
CameraPosition.Builder().bearing(300f)
```


### Tilt

카메라 기울기는 지도의 중앙 위치와 지구 표면 사이의 원호에서 카메라 위치를 지정합니다.

기울기로 시야각을 변경하면 멀리 떨어진 지형이 더 작게 나타나고 주변 지형이 더 커져 맵이 원근으로 나타납니다.

```kotlin
CameraPosition.Builder().tilt(50f)
```

## 1.4 소스 코드에서 카메라 이동하기
















<style>
.page-container {max-width: 1200px}620‘’“”
</style>