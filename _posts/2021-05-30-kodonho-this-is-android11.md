---
layout: post
title:  "[IT] - [BOOK] 11강 - 이것이 안드로이드다 with 코틀린 "
description: 구글 지도, 네트워크, Open API
date:   2021-06-09 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Hanbit
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

앞에서 설명한 옵션을 이용해서 CameraPosition 객체를 생성하고 moveCamera() 메서드로 카메라의 위치를 이동시켜 지도를 변경할 수 있습니다.

MapActivity.kt파일의 onMapReady() 메서드 안에 작성합니다.

1. CemeraPosotion.Builder 객체로 카메라 포지션을 설정합니다. 그리고 build() 메서드를 호출해서 CameraPosition 객체를 생성합니다.

    ```kotlin
    val seoulCityHall = LatLng(37.566, 126.9784)
    val cameraPosition = CameraPosition.builder().target(seoulCityHall).zoom(15.0f).zoom(15.0f).build()
    ```

1. CameraUpdateFactory.newCameraPosition() 메서드에 CameraPosition 객체를 전달하면 카메라 포지션에 지도에서 사용할 수 있는 카메라 정보가 생성됩니다.

    ```kotlin
    val cameraUpdate = CameraUpdateFactory.newCameraPosition(cameraPosition)
    ```

1. 변경된 카메라 정보를 GoogleMap의 moveCamera() 메서드에 전달하면 카메라 포지션을 기준을 ㅗ지도의 위치, 배율, 기울기 등이 변경돼서 표시됩니다.

    ```kotlin
    mMap.moveCamera(cameraUpdate)
    ```

## 1.5 마커

마커<sup> (Marker) </sup>는 지도에 위치를 표시합니다. 마커는 아이콘의 색상, 이미지, 위치를 변경할 수 있으며 대화식으로 설계되었기 때문에 마커를 클릭하면 정보 창을 띄우거나 클릭리스너처럼 클릭에 대한 코드 처리를 할 수 있습니다.


### 마커 표시하기

특정 지역의 좌표에 마커를 다음과 같은 순서로 추가하고 사용할 수 있습니다. (좌표에 사용되는 위도와 경도는 서울시청의 위치를 기준으로 적용하였습니다.)

1. mMap = GoogleMap 코드 아래에 서울시청의 위도와 경도 좌푯값으로 LatLng 객체를 생성합니다.

    ```kotlin
    val LATLNG = LatLng(37.566418, 126.977943)
    ```

1. 마커를 추가합니다. 마커를 추가하려면 마커의 옵션을 정의한 MarkerOptions 객체가 필요합니다. MarkerOptions 객체를 생성하고 마커의 좌표와 제목을 설정합니다. 

    ```kotlin
    var markerOptions = MarkerOptions()
        .position(LATLNG)
        .title("Marker in Seoul City Hall")
    ```

1. GoogleMap 객체의 addMarket() 메서드에 MarkerOptions를 전달하면 구글 지도에 마커가 추가됩니다.

    ```kotlin
    mMap.addMarker(markerOptions)
    ```

1. 카메라를 마커의 좌표로 이동하고 줌을 거리 레벨로 확대합니다.

```kotlin
val cameraPosition = CameraPosition.Builder()
    .target(LATLNG)
    .zoom(15.0f)
    .build()

val cameraUpdate = CameraUpdateFactory.newCameraPosition(cameraPosition)
mMap.moveCamera(cameraUpdate)
```

``MapsActivity의 전체 코드``

```kotlin
package kr.co.hanbit.googlemaps

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kr.co.hanbit.googlemaps.databinding.ActivityMapsBinding

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        val LATLNG = LatLng(37.566418, 126.977943)

        val cameraPosition = CameraPosition.Builder()
            .target(LATLNG)
            .zoom(15.0f)
            .build()

        val cameraUpdate = CameraUpdateFactory.newCameraPosition(cameraPosition)
        mMap.moveCamera(cameraUpdate)

        var markerOptions = MarkerOptions()
            .position(LATLNG)
            .title("Marker in Seoul City Hall")
        mMap.addMarker(markerOptions)
    }
}
```

### 마커 아이콘 변경하기

마커 아이콘은 기본으로 제공되는 아이콘뿐만 아니라 비트맵 이미지로 변경할 수 있습니다.

PNG 이미지 파일을 프로젝ㅌ에 축하고 비트맵으로 변환해서 아이콘을 변경하는 방법은 다음과 같습니다.

1. drawable 디렉토리에 마커 아이콘으로 적용할 PNG 이미지 파일을 추가합니다. ‘3장의 2.4 이미지 버튼’의 ‘새로운 이미지 사용하기’를 참고해서 추가합니다.

    PNG 이미지의 BitmapDrawable 객체를 생성해야 합니다. 

    롤리팝 버전 이전과 버전 이후에서 동작하는 코드가 다르므로 버전 처리 코드를 추가합니다.

1. onMapReady() 안에 아래의 코드를 추가합니다. 

    ```kotlin
    var bitmapDrawable: BitmapDrawable

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        bitmapDrawable = getDrawable(R.drawable.kindle) as BitmapDrawable
    } else {
        bitmapDrawable = resources.getDrawable(R.drawable.kindle) as BitmapDrawable
    }
    ```

1. BitmapDescriptorFactory.fromBitmap() 메서드에 BitmapDrawable의 비트맵 객체를 전달하는 마커 아이콘을 위한 BitmapDescriptor 객체를 생성하고 import 해줍니다.

    ```kotlin
    var discriptor = BitmapDescriptorFactory.fromBitmap(bitmapDrawable.bitmap)
    ```

1. MarkerOptions 객체의 icon() 메서드를 호출해서 BitmapDescriptor 객체의 아이콘을 마커에 적용하도록 다음과 같이 수정합니다.

    ```kotlin
    var markerOptions = MarkerOptions()
        .position(LATLNG)
        .title("Marker in Seoul City Hall")
        .icon(discriptor)

    mMap.addMarker(markerOptions)
    ```

``아이콘 크기``

아이콘의 크기가 클 경우 Bitmap.createSacledBitmap() 메서드를 호출해서 크기를 줄인 비트맵 객체를 반환받아야 합니다.

```kotlin
var scaledBitmap = Bitmap.createScaledBitmap(originBitmap, 50, 50, false)
```

Bitmap.createScaledBitmap() 메서드의 파라미터는 다음과 같습니다.

| 파라미터 | 설명 |
| :---: | :---: |
| src | 원본 Bitmap 객체입니다. |
| dstWidth | 새로운 Bitmap의 가로입니다. |
| dsHeight | 새로운 Bitmap의 세로입니다. |
| filter | 원본 이미지의 pixel 형태를 조정해서 이미지가 선명해지도록 합니다. |
{: .table .table-striped .table-hover}


## 1.6 현재 위치 검색하기

스마트폰 처럼 모바일 환경에서는 사용자가 위치를 이동하고 그 위치를 기반으로 하는 서비스를 제공할 수 있습니다.

앱에서 스마트폰의 현재 위치를 검색하려면 위치 권한이 필요합니다.

안드로이드 플랫폼은 현재 위치를 검색하는 FusedLocationProviderClient API를 제공합니다.

FusedLocationProviderClient API는 GPS<sup> (Global Positioning System) </sup>신호 및 와이파이와 통신사 네트워크 위치를 결합해서 최소한의 배터리 사용량으로 빠르고 정확하게 위치를 검색합니다.

mapsMyLocation 이라는 이름의 새로운 Google Maps Activity 프로젝트를 생성하고 이 장의 ‘1.1 구글 지도 시작하기’의 ‘Google Maps API카 받기’를 참고해서 새로운 API키를 발급 받아 google_maps_api.xml 파일에 추가합니다.


### Google Play Service 의존성 추가하기

FusedLocationProviderClient API를 사용하기 위해서 build.gradle 파일에 구글 플레이 서비스 Location 라이브러리 의존성을 추가합니다. 

Location 라이브러리는 Maps 라이브러리와 버전이 같아야 합니다. 

```gradle
implementation 'com.google.android.gms:play-services-location:17.0.0'
implementation 'com.google.android.gms:play-services-maps:17.0.0'
```

### 권한을 명세하고 요청/처리하기

1. 스마트폰의 위치 기능에 접근하기 위해 manifests 디렉토리 밑에 있는 AndroidManifest.xml 파일에 위치 권한을 선언합니다. 위치 권한은 두 가지가 있으며 기능은 다음과 같습니다. 

    ```xml
    <!-- 도시 블록 내에서의 정확한 위치 (네트워크 위치) -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <!-- 정확한 위치 확보 (네트워크 위치 + GPS 위치) -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    ```

1. 6장에서 만들었던 Base 프로젝트를 열어서 BaseActivity를 복사하여 붙여넣기 한 다음 MapsActivity.kt를 열고 BaseActivity를 상속하도록 class 코드를 수정합니다.

    ```kotlin
    class MapsActivity: BaseActivity(), OnMapReadyCallback {}
    ```

1. onCreate() 메서드 바로 아래에서 ``Ctrl`` + ``I``키를 누르면 나타나는 팝업창에서 BaseActivity에 선언되어 있는 2개의 추상 메서드를 선택하고 [OK]버튼을 클릭해서 오버라이드합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-294.png){: style="box-shadow: 0 0 5px #777"}

    생성된 코드에서 TODO() 행만 삭제하고 빈 채로 둡니다.

1. onCreate() 메서드의 mapFragment... 로 시작하는 줄 아래에 앱에서 사용할 권한을 변수에 저장하고, 권한을 요청하는 코드를 작성합니다. requestCode에는 임의의 숫자 값을 전달합니다.

    ```kotlin
    val permissions = arrayOf(
        Manifest.permission.ACCESS_COARSE_LOCATION,
        Manifest.permission.ACCESS_FINE_LOCATION
    )

    requirePermissions(permissions, 999)
    ```

1. 아무것도 없는 startProcess() 메서드를 만들고 permissionGranted() 메서드 안에서 호출합니다. permissionDenied() 에는 권한 승인이 필요하다는 메시지를 띄우지만 앱을 종료하지는 않습니다. 

    ```kotlin
    override fun permissionGranted(requestCode: Int) {
        startProcess()
    }

    override fun permissionDenied(requestCode: Int) {
        
        Toast.makeText(this, "권한 승인이 필요합니다.", Toast.LENGTH_LONG).show()
    }

    fun startProcess() {
        
    }
    ```

1. 위치 권한이 승인되면 startProcess() 메서드에서 구글 지도를 준비하는 작업을 진행하도록 코드를 조금 수정합니다. onCreate() 에 작성되어 있는 val mapFragment.. 로 시작하는 세 줄을 잘라내기 한 후 startProcess() 메서드 안에 붙여넣기 하면 됩니다. 

    ```kotlin
    fun startProcess() {
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }
    ```

이제 권한이 모두 승인되고 맵이 준비되면 onMapReady() 메서드가 정상적으로 호출됩니다.

### 현재 위치 검색하기

현재 위치를 검색하기 위해서 FusedLocationProviderClient를 생성하고 사용합니다.

1. onCreate() 위에 OnMapReady() 위치를 처리하기 위한 변수 2개를 선언해둡니다. FusedLocationClient는 위칫값을 사용하기 위해서 필요하고, LocationCallback은 위칫값 요청에 대한 갱신 정보를 받는데 필요합니다.

    ```kotlin
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    ```

1. OnMapReady() 안의 시드니 좌표 코드를 삭제한 다음 위치 검색 클라이언트를 생성하는 코드를 추가하고 updateLocation() 메서드를 호출합니다. (updateLocatin()은 03에서 작성합니다.)

    ```kotlin
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        updateLocation()
    }

    // 03은 여기에 입력합니다.
    ```

1. updateLocation() 메서드를 작성합니다. 위치 정보를 요청할 정확도와 주기를 설정할 locationRequest를 먼저 생성하고, 해당 주기마다 반환받을 locationCallback을 생성합니다. 마지막으로 onMapReady 에서 생성한 위치 검색 클라이언트의 requestLocationUpdates() 에 앞에서 생성한 2개와 함께 루퍼 정보를 넘겨줍니다. 이제 1초 (1,000 밀리초) 에 한 번씩 변화된 위치 정보가 LocationCallback의 onLocationResult() 로 전달됩니다. onLocationResult()는 반환받은 정보에서 위치 정보를 setLastLocation()으로 전달합니다. ``fusedLocationClient.requestLocationUpdates 코드는 권한 처리가 필요한데 현재 코드에서는 확인할 수 없습니다.``{: style="background-color: #ffcccc"} ``따라서 메서드 상단에 해당 코드를 체크하지 않아도 된다는 의미로 @SuppressLint("MissingPermission") 애너테이션을 달아줍니다.``{: style="background-color: #ffcccc"}

    ```kotlin
    @SuppressLint("MissingPermission")
    fun updateLocation() {
        val locationRequest = LocationRequest.create()
        locationRequest.run {
            priority = LocationRequest.PRIORITY_HIGH_ACCURACY
            interval = 1000
        }
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult?) {
                locationResult?.let {
                    for ((i, location) in it.locations.withIndex()) {
                        Log.d("Location", "$i ${location.latitude}, ${location.longitude}")
                        setLastLocation(location)
                    }
                }
            }
        }
        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.myLooper()
        )
    }

    // 04는 여기에 작성합니다.
    ```

1. 위치 정보를 받아서 마커를 그리고 화면을 이동하는 setLastLocation()을 작성합니다.

    ```kotlin
    fun setLastLocation(lastLocation: Location) {
        // 05은 여기에 작성합니다.
    }
    ```

1. 전달받은 위치 정보로 좌표를 생성하고 해당 좌표로 마커를 생성합니다.

    ```kotlin
    val LATLNG = LatLng(lastLocation.latitude, lastLocation.longitude)
    val markerOptions = MarkerOptions().position(LATLNG).title("Here!")

    // 06은 여기에 작성합니다.
    ```

1. 카메라 위치를 현재 위치로 세팅하고 마커와 함께 지도에 반영합니다. 마커를 지도에 반영하기 전에 mMap.clear()를 호출해서 이전에 그려진 마커가 있으면 지웁니다.

    ```kotlin
    val cameraPosition = CameraPosition.Builder().target(LATLNG).zoom(15.0f).build()
    mMap.clear()
    mMap.addMarker(markerOptions)
    mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
    ```

1. 안드로이드 애뮬레이터에서 실행한 후 다음 순서대로 위치를 변경해봅니다. 다른 위치를 클릭하면서 [SET LOCATION]을 클릭하면 마커가 이동하는 것을 확인할 수 있습니다. 

    1. 애뮬레이터 좌측 메뉴 중 가장 아래에 있는 [...] 클릭
    1. Location 선택 (가장 위에 있음)
    1. 지도에서 아무 곳이나 클릭
    1. 우측 하단의 [SET LOCATION] 버튼 클릭

``MapsActivity.kt의 전체 코드``

```kotlin
package kr.co.hanbit.mapsmylocation

import android.Manifest
import android.annotation.SuppressLint
import android.location.Location
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Looper
import android.util.Log
import android.widget.Toast
import com.google.android.gms.location.*
import com.google.android.gms.maps.*

import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kr.co.hanbit.mapsmylocation.databinding.ActivityMapsBinding

class MapsActivity : BaseActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val permissions = arrayOf(
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION
        )

        requirePermissions(permissions, 999)
    }

    override fun permissionGranted(requestCode: Int) {
        startProcess()
    }

    override fun permissionDenied(requestCode: Int) {

        Toast.makeText(this, "권한 승인이 필요합니다.", Toast.LENGTH_LONG).show()
    }

    fun startProcess() {
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        updateLocation()
    }

    @SuppressLint("MissingPermission")
    fun updateLocation() {
        val locationRequest = LocationRequest.create()
        locationRequest.run {
            priority = LocationRequest.PRIORITY_HIGH_ACCURACY
            interval = 1000
        }
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult?) {
                locationResult?.let {
                    for ((i, location) in it.locations.withIndex()) {
                        Log.d("Location", "$i ${location.latitude}, ${location.longitude}")
                        setLastLocation(location)
                    }
                }
            }
        }
        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.myLooper()
        )
    }

    fun setLastLocation(lastLocation: Location) {
        val LATLNG = LatLng(lastLocation.latitude, lastLocation.longitude)
        val markerOptions = MarkerOptions().position(LATLNG).title("Here!")

        val cameraPosition = CameraPosition.Builder().target(LATLNG).zoom(15.0f).build()
        mMap.clear()
        mMap.addMarker(markerOptions)
        mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
    }

}
```

# 2. 네트워크

네트워크는 ‘2대 이상의 컴퓨터가 연결되어 데이터를 주고받는 통신 체계’라고 정의할 수 있습니다.

인터넷은 전송할 데이터를 HTTP라는 프로토콜로 만들어진 패킷에 담은 후에 전송 프로토콜인 TCP/IP를 사용하여 수신 측에 전달하는 구조로 만들어져 있습니다.

여기서는 스마트폰에서 인터넷을 통해 원격지 (google.com, naver.com 등의 서버)에 있는 데이터를 가져와 사용하는 방법을 코드를 통해 알아보겠습니다.

## 2.1 HTTP

1. ``프로토콜``{: style="background-color: #FFFFCC"}

    컴퓨터 간의 데이터를 전송하는 방식이 서로 다르면 데이터를 주고받을 때마다 각 컴퓨터의 전송 방식에 맞게 코드를 수정해야 합니다.

    프로토콜은 이런 전송 방식을 표준화하여 어떤 컴퓨터와도 동일한 방식으로 데이터를 주고받을 수 있게 만들어진 통신 규약입니다.

    인터넷은 TCP/IP로 동작하는데 이 TCP/IP가 프로토콜입니다.

    우리가 가장 익숙하게 사용하는 웹은 HTTP라는 프로토콜을 사용하며, 웹 서버와 웹 브라우저가 이 규약에 따라 데이터를 주고 받습니다.

1. ``패킷``{: style="background-color: #FFFFCC"}

    패킷은 데이터가 전송되는 실제 단위입니다.

    예를 들어 책 한 권의 분량의 문자열을 네트워크를 통해 전송할 때, 전체 데이터가 한 번에 전송되는 것이 아니라 책 한쪽 정도의 문자열만을 담을 수 있는 패킷이라는 바구니에 담은 후에 한 바구니씩 전송합니다.

    패킷으로 만들어진 데이터는 앞에서부터 1,2,3,4,5... 순서대로 전송되지만 네트워크를 지나면서 수신 측에는 순서대로 도착하지 않습니다.

    컴퓨터 프로그램은 데이터를 주고받기 위해 HTTP 말고도 서로 다른 네트워크 계층 (네트워크 카드, 컴퓨터 OS, 프로그램 등의 계층을 나눠서 사용하는 프로토콜이 다릅니다.)에서 여러 종류의 프로토콜이 동시에 사용됩니다.




이렇게 사용하는 프로토콜의 종류는 다양하지만 프로그래머가 직접적으로 코드에서 사용하는 프로토콜은 HTTP입니다.

프로그래머가 아니더라도 많이 접하는 프로토콜이기도 한데, 웹 브라우저의 주소창에 주소를 입력할 때 주소 앞에 ‘http://’ 라고 접두어를 붙이는 이유가 요청하는 주소의 데이터를 HTTP프로토콜로 처리하기 때문입니다.

HTTP는 웹상의 서버와 클라이언트인 웹 브라우저와의 데이터 통신이 가능하도록 설계된 표준 규약입니다.

클라이언트가 서버에 데이터를 요청하는 요청<sup> (Request) </sup>메시지와 클라이언트가 요청한 데이터를 응답하는 응답<sup> (Response) </sup>메시지로 구성됩니다.

HTTP를 알아보기 전에 간단하게 URL의 구조를 살펴보겠습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-295.png){: style="box-shadow: 0 0 5px #777"}


### HTTP의 구조

HTTP는 명령줄에 해당하는 헤더와 실제 데이터가 들어 있는 바디로 구성되어 있습니다.

예를 들기 위해서 헤더에 한 줄만 작성했지만 실제로는 여러 줄에 걸쳐 정보들이 기술되어 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-296.png){: style="box-shadow: 0 0 5px #777"}


### HTTP 요청 방식

HTTP 요청 방식은 첫 줄에 첫 번째 단어로 작성되는 일종의 명령어 (HTTP 메서드)로 이뤄집니다.

HTTP 메서드는 클라이언트의 요청 방식을 정의하고 서버의 리소스에 대한 행위를 지정합니다.

주로 사용되는 HTTP 메서드는 다음과 같습니다.

| HTTP 메서드 | 설명 |
| :--- | :--- |
| GET | 지정한 URI의 리소스를 요청합니다. |
| POST | 요청과 데이터를 담아 전송하면 해당 URI에 리소스를 생성합니다. |
| PUT | 지정한 URI의 리소스를 수정합니다. |
| DELETE | 지정한 URI의 리소스를 삭제합니다. |
{: .table .table-striped .table-hover}


### HTTP 응답 코드

| HTTP 응답 코드 | 설명 |
| :--- | :--- |
| 1xx | 조건부 응답 |
| 2xx | 성공 |
| 3xx | 리다이렉션 완료 |
| 4xx | 클라이언트 요청 에러 |
| 5xx | 서버 에러 |
{: .table .table-striped .table-hover}

1부터 5까지의 숫자로 시작하는 세 자릿수로 만들어져 있으며, HTTP 버전에 따라 차이는 있지만 1.1 버전을 기준으로 약 40개 정도의 응답 코드가 정의되어 있습니다. 

더 자세한 코드는 다음 URL를 참고하세요

[http-status-codes](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)


## 2.2 HttpURLConnection

안드로이드는 HTTP로 데이터 통신을 하기 위해서 HttpUrlConnection 클래스와 HTTPS 사양으로 확장한 HttpsURLConnection 클래스를 지원합니다.

HTTPS는 HTTP에서 보안이 강화된 버전의 프로토콜입니다.

간단하게 웹 페이지 주소를 입력하여 서버로부터 응답받는 웹 페이지의 코드를 화면에 출력하는 앱을 만들어보겠습니다.

NetworkHttpUrlConnection 이라는 이름으로 새로운 Empty Activity 프로젝트를 새로 생성하고 build.gradle 파일에 viewBinding 설정을 합니다.

백그라운드 처리도 필요하기 때문에 dependencies에 코루틴 의존성도 추가합니다

```gradle
dependencies {
    ...
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
}
```

### 권한 선언하고 화면 만들기

1. [app] - [manifests] 에 있는 AndroidManifest.xml 파일을 열고 인터넷 접근 권한을 입력합니다.

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

1. activity_main.xml 파일을 열고 [Design] 모드에서 화면의 기본 텍스트뷰는 삭제합니다. 그리고 웹페이지 주소를 입력받을 플레인텍스트와 요청 버튼을 화면 상단에 배치합니다. 플레인텍스트의 hint 와 id 속성에는 ‘주소를 입력하세요’와 ‘editUrl’을, 버튼의 text와 id속성에는 ‘요청’, ‘buttonRequest’로 입력하고, 컨스트레인트는 아래 그림과 같이 연결해줍니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-297.png){: style="box-shadow: 0 0 5px #777"}

1. 응답받은 웹 페이지의 코드를 출력할 텍스트뷰를 화면 화단에 배치합니다. id는 ‘textContent’로 합니다.


### MainActivity에 코드 작성하기

1. MainActivity.kt를 열고 바인딩을 생성한 후 binding 프로퍼티에 저장하고 setContentView()에 binding.root를 입력합니다.

    ```kotiln
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

1. setContentView() 밑으로 요청 버튼에 클릭리스너를 달아주는 코드를 작성합니다.

    ```kotlin
    binding.buttonRequest.setOnClickListener {
        // 03은 여기에 입력합니다.
    }
    ```

1. 버튼을 클릭하면 네트워크 작업을 요청하고 이를 백그라운드에서 처리하기 위해 디스패처 IO를 사용하여 CoroutineScope를 생성합니다.

    ```kotlin
    binding.buttonRequest.setOnClickListener {
        CoroutineScope(Dispatchers.IO).launch {
            // 04는 여기에 입력합니다.
        }
    }
    ```

1. 주소 입력 필드에 입력된 주소를 가져와 https로 시작하지 않으면 앞에 https://를 붙여줍니다.  http는 보안 문제가 있어서 http를 사용하려면 AndroidManifest.xml 파일에 부가적인 설정이 필요합니다.

    ```kotlin
    var urlText = binding.editUrl.text.toString()
    if (!urlText.startsWith("https")) {
        urlText = "https://${urlText}"
    }
    // 05~08은 여기에 입력합니다.
    ```

1. 이어서 주소를 URL 객체로 변환하고 변수에 저장합니다.

    ```kotlin
    var url = URL(urlText)
    ```

1. URL 객체에서 openConnection() 메서드를 사용하여 서버와의 연결을 생성합니다. 그리고 HttpURLConnection으로 형 변환해줍니다. openConnection() 메서드에서 반환되는 값은 URLConnection이라는 추상(설계) 클래스입니다. 추상 클래스를 사용하기 위해서는 실제 구현 클래스인 HttpURLConnection으로 변환하는 과정이 필요합니다.

    ```kotiln
    var urlConnection = url.openConnection() as HttpURLConnection
    ```

1. 연결된 커넥션에 요청 방식을 설정합니다. 대문자로 입력해야 하며 없는 방식을 입력하면 오류가 발생합니다.

    ```kotlin
    urlConnection.requestMethod = "GET"
    ```

1. 응답이 정상이면 응답 데이터를 처리합니다.

    ```kotlin
    if (urlConnection.responseCode == HttpURLConnection.HTTP_OK) {
        // 09~13은 여기에 입력합니다.
    }
    ```

1. 입력 스트림을 연결하고 버퍼에 담아서 데이터를 읽을 준비를 합니다.

    ```kotlin
    val streamReader = InputStreamReader(urlConnection.inputStream)
    val buffered = BufferedReader(streamReader)
    ```

1. 반복문을 돌면서 한 줄씩 읽은 데이터를 content 변수에 저장합니다.

    ```kotlin
    val content = StringBuffer()
    while (true) {
        val line = buffered.readLine()?: break;
        content.append(line)
    }
    ```

1. 사용한 스트림과 커넥션을 모두 해제합니다.

    ```kotlin
    buffered.close()
    urlConnection.disconnect()
    ```

1. 화면의 텍스트뷰에 content 변수에 저장된 값을 입력합니다. UI에 값을 세팅하는 것은 Main 디스패처에서 해야 합니다.

    ```kotlin
    launch(Dispatchers.Main) {
        binding.textContent.text = content.toString()
    }
    ```

1. CoroutineScope(Dispatchers.IO).launch {} 코드 블록 안의 모든 코드 (04 ~ 12까지) 를 try 문으로 감싸서 예외 처리를 합니다. 네트워크 관련 코드는 예외로 치명적인 오류(앱 다운)가 발생할 수 있습니다. e.printStackTrace() 메서드는 예외 발생 시 로그를 출력하는 역할을 합니다.

    ```kotlin
    CoroutineScope(Dispatchers.IO).launch {
        try {
            // 04~12는 여기에 입력합니다.
        } catch ( e: Exception) {
            e.printStackTrace()
        }
    }
    ```

1. 애뮬레이터에서 실행해봅니다. 입력 필드에 주소를 입력하고 요청을 하면 웹 페이지를 구성하고 있는 HTML 태그가 화면에 나타납니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-298.png){: style="box-shadow: 0 0 5px #777"}


``MainActivity.kt의 전체 코드``

```kotlin
package kr.co.hanbit.networkhttpurlconnection

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kr.co.hanbit.networkhttpurlconnection.databinding.ActivityMainBinding
import java.io.BufferedReader
import java.io.InputStreamReader
import java.lang.Exception
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        binding.buttonRequest.setOnClickListener {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    var urlText = binding.editUrl.text.toString()
                    if (!urlText.startsWith("https")) {
                        urlText = "https://${urlText}"
                    }
                    var url = URL(urlText)
                    var urlConnection = url.openConnection() as HttpURLConnection
                    urlConnection.requestMethod = "GET"

                    if (urlConnection.responseCode == HttpURLConnection.HTTP_OK) {
                        val streamReader = InputStreamReader(urlConnection.inputStream)
                        val buffered = BufferedReader(streamReader)
                        val content = StringBuffer()
                        while (true) {
                            val line = buffered.readLine() ?: break;
                            content.append(line)
                        }
                        buffered.close()
                        urlConnection.disconnect()

                        launch(Dispatchers.Main) {
                            binding.textContent.text = content.toString()
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}
```

## 2.3 레트로핏 데이터 통신 라이브러리

앞에서 사용한 HttpURLConnection은 데이터 통신의 기본 원리를 설명하기 위한 용도였습니다.

이번에는 조금 편하게 적은 양의 코드로 데이터 통신을 할 수 있게 도와주는 레트로핏<sup> (Retrofit) </sup>라이브러리를 사용하겠습니다.

레트로핏의 공식 사이트는 다음과 같습니다.

[레트로핏](https://square.github.io/retrofit)


### 레트로핏을 위한 준비사항

레트로핏을 사용하기 전에 두 가지 준비사항이 필요합니다.

1. 데이터를 가져올 곳 (웹 사이트 또는 API 서버) 결정

1. 어떤 (표준 프로토콜) 데이터를 사용할 것인지 데이터의 형식을 결정


어디서 가져올 지는 웹 사이트의 주소만 알면 되기 때문에 별다른 공부가 필요하지 않지만, 어떤 데이터 형식을 사용할 것인지는 프로토콜이 정해지면 해당 프로토콜에 대한 공부가 선행되어야 합니다. 

1. 사용자 정보 API를 무료로 제공하는 Github API

    깃허브<sup> (Github) </sup>에서 공개한 Github API를 사용하겠습니다. 

    깃허브는 개발자를 위해서 가입 없이 무료로 사용할 수 있는 API를 제공합니다.

    - Github API: https://developer.github.com/v3

    예젱서는 Github API 중에서 사용자 정보를 검색하고 사용자 정보의 저장소를 보여주는 API를 사용할 것입니다.

1. 간단한 데이터 구조를 가진 JSON

    앞의 예제에서는 HTML로 만들어진 데이터를 그대로 텍스트뷰에 보여주기만 했습니다. HTML 은 구조가 복잡해서 짧은 시간에 분석하고 처리하기에는 거의 불가능한 수준의 프로토콜입니다. 

    그런 이유로 현재 데이터 통신용으로 가장 많이 사용되고 있는 구조 또한 간단한 JSON<sup> (Javascript Object Notation) </sup>을 사용하겠습니다.

    네트워크 관점에서 JSON은 HTTP와 같은 데이터 프로토콜에서 바디 영역에 정의된 데이터 통신을 위한 개발형 규격입니다.


### JSON 구조

간단한 구조로 되어있지만, 각각의 형식이 의미하는 바를 알고 있어야 합니다.

JSON은 크게 세 가지 형태의 조합으로 구성되어 있습니다.

1. JSON 오브젝트
1. JSON 데이터
1. JSON 배열

#### JSON 오브젝트

JSON 객체는 여는 중괄호 ({)로 시작해 닫는 중괄호 (})로 끝납니다.

``{중괄호 사이에 JSON 데이터가 표현됩니다}``{: style="background-color: #ffcccc"}


#### JSON 데이터

JSON 오브젝트인 중괄호 ({}) 사이에 “데이터 이름”: 값의 형식으로 표현되며 이름은 항상 쌍따옴표 (“”)로 감싸야 하고 이름과 값의 사이는 콜론 (:)으로 구분합니다. 

데이터가 여러 개일 경우는 쉼표 (,)로 구분합니다.

``{"데이터 이름": "값", "데이터2 이름": "값2"}``{: style="background-color: #ffcccc"}

데이터의 값은 문자, 숫자, 불린, null, JSON 객체, JSON 배열이 될 수 있는데 표현식은 조금씩 다릅니다.

| 데이터 형식 | 데이터 이름: 값 표현 | 비고 |
| :--- | :--- | :--- |
| 문자 | "데이터 이름": "값" | 값을 쌍따옴표로 감싸야 합니다. |
| 숫자 | "데이터 이름": 123 | 값에 쌍다옴표를 사용하지 않습니다. |
| 불린 | "데이터 이름": true | true, false를 값으로 사용하되 쌍따옴표를 사용하지 않습니다. |
| null | "데이터 이름": null | null값을 사용할 수 있습니다. |
| JSON객체 | "데이터 이름": {} | 데이터의 값으로 JSON 오브젝트를 사용할 수 있습니다. |
| JSON배열 | "데이터 이름": [] | 데이터의 값으로 JSON 배열을 사용할 수 있습니다. |
{: .table .table-striped .table-hover}

#### JSON 배열

JSON 배열은 JSON 오브젝트의 컬렉션으로 여는 대괄호 ([) 로 시작해 닫는 대괄호 (])로 끝납니다.

배열에 입력되는 JSON 오브젝트가 복수 개일 경우는 쉼표 (,)로 구분합니다.

``[ {"데이터1 이름", "값"}, {"데이터1 이름", "두번째 값"}, {"데이터2 이름", 123} ]``{: style="background-color: #ffcccc"}


## 2.4 깃허브 사용자 정보를 가져오는 앱 개발하기

코드를 본격적으로 수정하기 전에 라이브러리 하나만 더 설명하겠습니다.

깃허브에서 가져온 목록 데이터에는 이미지 정보인 아바타 주소가 포함되어 있습니다. 

HttpURLConnection을 직접 구현해서 서버에 있는 아바타 이미지를 화면에 보여줄 수도 있지만, 구현 난이도는 높은 반면 효율성은 떨어지므로 라이브러리를 사용하겠습니다.

이미지를 화면에 보여주기 위해서는 이미지 로딩 라이브러리를 사용할 수 있는데 이미지가 URL 주소만 알라주면 해당 이미지가 있는 서버에 접속하여 이미지를 다운로드해서 이미지뷰에 보내는 편리한 도구 입니다.

현재 로딩 라이브러리 중에 많이 사용되고 있는 것으로는 Glide와 피카소가 있으며 여기서는 조금 더 많은 사용자층을 가지고 있는 Glide를 사용하겠습니다.

Glide 홈페이지는 다음과 같습니다.

[Glide](https://github.com/bumptech/glide)

NetworkRetrofit이라는 이름으로 새로운 Empty Activity 프로젝트를 하나 생성합니다.


#### Retrofit과 Glide 설정하기

1. build.gradle 파일을 열고 viewBinding 설정을 해줍니다.

1. 그리고 dependencies에 레트로핏과 converter-gson 의존성을 추가합니다. converter-gson은 레트로핏에서 JSON 데이터를 사용하기 위해서 사용하는 부가적인 라이브러리 입니다.

    ```gradle
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    ```

1. 이어서 dependencies에 Glide 의존성을 추가하는데 Glide 공식 페이지에 나와 았는 Glide를 사용하면 성능 관련 warning이 발생합니다. 이를 피하기 위해서는 GlideApp을 사용해야 하는데 다음과 같은 부가적인 설명이 필요합니다. 먼저 build.gradle 파일의 상단에 있는 plugins에 kotlin-kapt를 추가합니다.

    ```gradle
    plugins {
        ...
        id 'kotlin-kapt'
    }
    ```

1. dependencies 블록의 아래쪽에 의존성과 함께 kapt 설정을 추가합니다. 공식 페이지에는 annotationProcessor를 사용하라고 되어 있지만 안드로이드 스튜디오 버전에 따라 정상 동작 하지 않을 수 있습니다. [Sync Now]를 클릭해서 변경 사항을 반영합니다.

    ```gradle
    implementation 'com.github.bumptech.glide:glide:4.11.0'
    // 정상동작하지 않습니다.
    // annotationProcessor 'com.github.bumptech.glide:compiler:4.11.0
    kapt 'com.github.bumptech.glide:compiler:4.11.0'
    ```

1. 이렇게 하면 동작하지 않습니다. 가상의 클래스를 하나 만들고 @GlideModule 애너테이션을 사용하는 코드를 추가해야 합니다. [app] - [java] 밑에 있는 패키지명을 마우스 우클릭해서 MyGlideApp 클래스를 하나 생성하고 다음처럼 AppGlideModlue을 상속받고 GlideModule 애너테이션도 추가합니다.

    ```kotlin
    package kr.co.hanbit.networkretrofit

    import com.bumptech.glide.annotation.GlideModule
    import com.bumptech.glide.module.AppGlideModule

    @GlideModule
    class MyGlideApp: AppGlideModule() {
    }
    ```

1. 마지막으로 상단 메뉴에서 [Build] - [Rebuild Project]를 선택해서 프로젝트를 다시 빌드합니다.


### 권한 설정하고 데이터 클래스 정의하기

1. 인터넷에 접근하기 위해 [app] - [manifests] 디렉토리 밑의 AndroidManifest.xml 파일에 권한을 선언합니다. 다음 코드를 \<application\> 태그 위에 입력합니다. 인터넷 권한은 별도의 권한 요청이 필요하지 않습니다. 

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

1. 안드로이드 스튜디오는 앱 개발에 도움을 주는 다양한 플러그인을 지원합니다. 그중에 JSON To Kotiln Class 플러그인은 JSON 형식으로 된 텍스트 데이터를 코틀린 클래스로 간단하게 변환해줍니다. 안드로이드 스튜디오의 상단 메뉴에서 [File] - [Settings]를 클릭한 후 나오는 세팅 창에서 [Plugins]를 선택한 다음 JSON To Kotlin Class 플러그인을 검색하고 설치합니다. 검색이 안되면 검색 결과 중간에 Search in marketplace라는 파란색 텍스트 링크가 나타납니다. 텍스트를 클릭하면 다시 검색됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-299.png){: style="box-shadow: 0 0 5px #777"}


1. 설치하고 나면 [Install]버튼이 [installed]버튼으로 변경됩니다. [OK]버튼을 클릭해서 반영합니다.

1. 웹 브라우저에서 https://api.github.com/users/Kotlin/repos 웹 페이지를 엽니다. 이 웹 페이지의 JSON 데이터를 전체 선택하고 복사합니다.

1. 다시 안드로이드 스튜디오에서 기본 패키지를 마우스 우클릭하고 [New] - [Kotlin data class File from JSON]을 클릭한 다음 새 창이 뜨면 복사한 JSON 데이터를 붙여넣습니다. Class Name에 ‘Repository’를 입력하고 [Generate] 버튼을 클릭하면 변환된 데이터 클래스를 자동으로 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-300.png){: style="box-shadow: 0 0 5px #777"}

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-301.png){: style="box-shadow: 0 0 5px #777"}

1. License, Owner, Repository 클래스가 생성되었습니다. License, Owner 클래스는 JSON 데이터가 JSON 오브젝트를 값으로 사용하는 경우, 해당 데이터의 이름으로 클래스를 생성하고 사용합니다.  05의 그림에서 데이터의 중간쯤을 보면 ‘Owner’를 이름으로 사용하고 값이 JSON 오브젝트인 부분이 있습니다. 이 오브젝트의 클래스 이름이 ‘Owner’가 되는 것입니다. 이렇게 클래스를 준비했습니다. 

### 화면 만들기

이제 데이터를 출력할 화면을 만들어보겠습니다.

1. 먼저 activity_main.xml 파일을 편집하겠습니다.  [Design] 모드에서 화면의 기본 텍스트뷰는 삭제하고 깃허브의 데이터 API 주소를 요청할 버튼을 2의 그림과 같이 화면 상단에 배치합니다. id속성은 ‘buttonRequest’, text 속성은 ‘GITHUB 사용자 가져오기’로 입력합니다.

1. 가져온 데이터의 목록을 보여줄 리사이클러뷰를 버튼 아래쪽 공간에 배치합니다. 리사이클러뷰를 드래그해서 좌측 컴포넌트 트리 영역의 버튼 아래로 가져다 놓고, id속성창에는 ‘recyclerView’라고 입력합니다. 버튼과 리사이클러뷰의 컨스트레인트는 아래 그림과 같이 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-302.png){: style="box-shadow: 0 0 5px #777"}

1. 리사이클러뷰 안에 넣을 아이템을 위한 새 파일을 생성할 겁니다. [app] - [res] - [layout] 디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Layout Resource File]을 클릭합니다. File name은 ‘item_recycler.xml’로 생성합니다. 최상위 레이아웃인 Root element 에는 androidx로 시작하는 패키지에 있는 컨스트레인트 레이아웃을 설정합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-303.png){: style="box-shadow: 0 0 5px #777"}

1. 레이아웃의 layout_height 속성은 ‘100dp’정도로 설정합니다. 그리고 다음과 같이 이미지뷰 1개와 텍스트뷰 2개를 배치하고 id속성을 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-304.png){: style="box-shadow: 0 0 5px #777"}


### 리사이클러뷰어댑터 만들기

이제 사용자 정보를 목록으로 보여주기 위해 리사이클러뷰어댑터를 생성하고 사용하겠습니다.

1. [app] - [java] 디렉토리 밑에 있는 기본 패키지에 CustomAdapter 클래스를 하나 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-305.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 클래스 파일을 열고 CustomAdapter 클래스 밑에 Holder 클래스를 추가합니다.

    ```kotlin
    package kr.co.hanbit.networkretrofit

    class CustomAdapter {
        // 04에서 이 부분을 수정합니다
    }

    class Holder {
        // 03에서 이 부분을 수정합니다
    }
    ```

1. 홀더의 생성자에서 바인딩을 전달받고 상속받은 ViewHolder에는 binding.root를 전달합니다.

    ```kotlin
    class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {
        // 10은 이 부분을 수정합니다
    }
    ```

1. CustomAdapter에 RecyclerView.Adapter를상속받고 제네릭으로 Holder를 지정합니다.

    ```kotlin
    class CustomAdapter: RecyclerView.Adapter<Holder>() {
        // 05에서 이 부분을 수정합니다
    }
    ```

1. class CustomAdapter 블록을 클릭한 채로 ``Ctrl`` + ``I`` 키를 눌러서 3개의 필수 메서드를 자동 생성합니다. 함께 생성된 TODO()행은 모두 삭제합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-306.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    // 06은 여기에 입력합니다.
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        // 08은 여기에 입력합니다.
    }

    override fun getItemCount(): Int {
        // 07은 여기에 입력합니다.
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        // 09은 여기에 입력합니다.
    }
    ```

1. 자동 생성된 코드는 그대로 두고 어댑터 코드 블록 가장 위에 어댑터에서 사용할 데이터 컬렉션을 변수로 만들어 놓았습니다. 우리가 사용할 데이터셋은 앞에서 자동으로 생성해두었던 repository입니다. nullable로 선언합니다.

    ```kotlin
    var userList: Repository? = null
    ```

1. 목록에 출력되는 총 아이템 개수를 정하는 getItemCount()를 구현합니다.

    ```kotlin
    return userList?.size?: 0
    ```

1. 홀더를 생성하는 onCreateViewHolder()를 구현합니다. 레이아웃을 인플레이트한 후 바인딩에 담아서 반환합니다.

    ```kotlin
    val binding =
        ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
    return Holder(binding)
    ```

1. 실제 목록에 뿌려지는 아이템을 그려주는 onBindViewHolder()를 구현합니다. 현 위치의 사용자 데이터를 userList에서 가져오고 아직 만들어지지 않은 홀더의 setUser() 메서드에 넘겨줍니다.

    ```kotlin
    val user = userList?.get(position)
    holder.setUser(user)
    ```

1. 다시 03에서 작성했던 Holder 클래스로 돌아가서 setUser() 메서드를 구현합니다. setUser() 메서드는 1개의 RepositoryItem을 파라미터로 사용합니다. 클래스 가장 윗줄에서 userList가 nullable이기 때문에 user파라미터도 nullable로 설정되어야 합니다.

    ```kotlin
    fun setUser(user: RepositoryItem?) {
        // 12는 여기에 입력합니다.
    }
    ```

1. 이제 홀더가 가지고 있는 아이템 레이아웃에 데이터를 하나씩 세팅해주면 되는데 우리가 사용하는 데이터는 세가지 입니다. 변수 user: RepositoryItem에 있는 각각의 데이터 이름은 다음과 같습니다.

    - ``아바타 주소``: user.owner.avatar_url
    - ``사용자 이름``: user.name
    - ``사용자ID``: user.node_id

1. 먼저 사용자 이름과 아이디를 세팅합니다. 아바타는 Glide를 사용해서 이미지뷰에 세팅합니다.

    ```kotlin
    user?.let {
        binding.textName.setText(it.name)
        binding.textId.setText(it.node_id)
        Glide.with(binding.imageAvatar).load(it.owner.avatar_url).into(binding.imageAvatar)
    }
    ```

``CustomAdapter.kt의 전체 코드``

```kotlin
package kr.co.hanbit.networkretrofit

import android.text.Editable
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

import kr.co.hanbit.networkretrofit.databinding.ItemRecyclerBinding

class CustomAdapter : RecyclerView.Adapter<Holder>() {

    var userList: Repository? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding =
            ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }

    override fun getItemCount(): Int {
        return userList?.size ?: 0
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val user = userList?.get(position)
        holder.setUser(user)
    }
}

class Holder(val binding: ItemRecyclerBinding) : RecyclerView.ViewHolder(binding.root) {

    fun setUser(user: RepositoryItem?) {

        user?.let {
            binding.textName.setText(it.name)
            binding.textId.setText(it.node_id)
            Glide.with(binding.imageAvatar).load(it.owner.avatar_url).into(binding.imageAvatar)
        }
    }
}
```

### 레트로핏 사용하기

이제 레트로핏을 사용해서 데이터를 조회해서 가져오고 어댑터를 통해 목록에 출력하면 됩니다.

레트로핏을 사용하기 위해서는 인터페이스가 정의되어 있어야 합니다.


1. MainActivity.kt 를 열고 onCreate() 메서드 위에 바인딩을 생성한 후 binding 프로퍼티에 저장하고 setContentView()에 binding.root를 입력합니다.

    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

1. 클래스 아래 탑레벨에 GithubService 인터페이스를 만듭니다. 레트로핏 인터페이스는 호출 방식, 주소, 데이터 등을 지정합니다.  Retrofit 라이브러리는 인터페이스를 해석해 HTTP 통신을 처리합니다.

    ```kotlin
    class MainActivity...

        //..
    }

    interface GithubService {
        // 03은 여기에 입력합니다.
    }
    ```

1. 인터페이스 안에 Github API를 호출할 users 메서드를 만들고 @GET 애노테이션을 사용해 요청 주소를 설정합니다. (요청 주소에는 Github의 도메인은 제외하고 작성합니다.). 반환값은 call<List<데이터 클래스>> 형태로 작성합니다. Call 클래스를 import 하면 여러 개가 선택되는데 retrofit2 패키지에 있는 것을 선택해야 합니다. 레트로핏은 이렇게 만들어진 인터페이스에 지정된 방식으로 서버와 통신하고 데이터를 가져옵니다.

    ```kotlin
    @GET("users/Kotlin/repos")
    fun users(): Call<Repository>
    ```

1. 이제 레트로핏을 사용할 준비가 되었으니 데이터를 요청할 차례입니다. onCreate() 블록 안에서 recyclerView의 adapter에 앞에서 만들었던 CustomAdapter를 생성하고 recyclerView에 연결합니다.

    ```kotlin
    val adapter = CustomAdapter()
    binding.recyclerView.adapter = adapter
    ```

1. 이어서 리니어 레이아웃 매니저도 연결합니다.

    ```kotlin
    binding.recyclerView.layoutManager = LinearLayoutManager(this)
    ```

1. Retrofit.Builder()를 사용해서 레트로핏을 생성하고 retrofit 변수에 담습니다. baseUrl이 되는 Github의 도메인 주소와 JSON 데이터를 앞에서 생성한 Repository 클래스의 컬렉션으로 변환해주는 컨버터를 입력하고 build() 메서드를 호출해서 생성합니다.

    ```kotlin
    val retrofit = Retrofit.Builder()
        .baseUrl("https://api.github.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    ```

1. 레트로핏의 create() 메서드에 앞에서 정의한 인터페이스를 파라미터로 넘겨주면 실행 가능한 서비스 객체를 생성해서 반환해줍니다.

    ```kotlin
    val githubService = retrofit.create(GithubService::class.java)
    ```

1. githubService에는 GitHubService 인터페이스를 이용해서 객체를 생성했기 때문에 실행 (호출 )가능한 상태의 users() 메서드를 가지고 있습니다. 레트로핏의 create() 메서드는 인터페이스를 실행 가능한 서비스 객체로 만들면서 users() 메서드 안에 비동기 통신으로 데이터를 가져오는 enqueue() 메서드를 추가해 놓았습니다. enqueue() 가 호출되면 통신이 시작됩니다.

    ```kotlin
    binding.buttonRequest.setOnClickListener {
        val githubService = retrofit.create(GithubService::class.java)
        // 10에서 이 부분을 수정합니다.
        githubService.users().enqueue()
    }
    ```

1. enqueue() 메서드를 호출한 후 Github API 서버로부터 응답받으면 enqueue() 안에 작성하는 콜백 인터페이스가 작동하게 됩니다. enqueue() 의 파라미터로 콜백 인터페이스를 구현합니다.

    ```kotlin
    githubService.users().enqueue(object: Callback<Repository> {
        // 11은 여기에 입력합니다.
    })
    ```

1. 콜백 인터페이스의 필수 메서드도 구현합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-307.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    override fun onResponse(call: Call<Repository>, response: Response<Repository>) {
        // 12는 여기에 입력합니다.
    }

    override fun onFailure(call: Call<Repository>, t: Throwable) {
    }
    ```

1. onResponse() 메서드의 두 번째 파라미터인 response의 body() 메서드를 호출하면 서버로부터 전송된 데이터를 꺼낼 수 있습니다. 꺼낸 데이터를 List<Repository>로 형변환한 후에 어댑터의 userList에 담습니다. 마지막으로 어댑터의 notifyDataSetChanged를 호출하면 리사이클러뷰에 변경된 사항이 반영됩니다.

    ```kotlin
    adapter.userList = response.body() as Repository
    adapter.notifyDataSetChanged()
    ```

``MainActivity.kt의 전체 코드``

```kotlin
package kr.co.hanbit.networkretrofit

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kr.co.hanbit.networkretrofit.databinding.ActivityMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val adapter = CustomAdapter()
        binding.recyclerView.adapter = adapter
        binding.recyclerView.layoutManager = LinearLayoutManager(this)

        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.github.com")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        binding.buttonRequest.setOnClickListener {
            val githubService = retrofit.create(GithubService::class.java)
            // 10에서 이 부분을 수정합니다.
            githubService.users().enqueue(object: Callback<Repository> {
                override fun onResponse(call: Call<Repository>, response: Response<Repository>) {
                    adapter.userList = response.body() as Repository
                    adapter.notifyDataSetChanged()
                }

                override fun onFailure(call: Call<Repository>, t: Throwable) {
                }
            })
        }
    }
}

interface GithubService {

    @GET("users/Kotlin/repos")
    fun users(): Call<Repository>
}
```

# 3. Open API 사용하기

Open API란 데이터 또는 서비스를 공개해 일반 개발자들이 사용할 수 있도록 제공하는 인터페이스입니다.

주로 인터넷 주소 형태로 제공됩니다.

이제 정부에서 제공하는 Open API를 이용해서 데이터를 가져오고, 가져온 데이터를 지도에 출력하는 앱을 만들어보겠습니다.

기상청의 날씨 API를 비롯해 주요 포털에서 제공하는 다양한 Open API가 있지만 이 책에서는 서울시에서 제공하는 Open API인 ‘서울 열린데이터광장’을 사용하겠습니다.

[https://data.seoul.go.kr](https://data.seoul.go.kr)

서울 열린 데이터광장을 사용하려면 먼저 회원가입을 해야 하며, 추가로 내가 사용하려는 API에 대한 간단한 승인 과정이 필요할 수도 있습니다.

또한 API의 종류에 따라 사업자 등록을 해야 하거나, 특정 사업자 권한이 필요하기 때문에 이 책에서는 권한 없이 사용할 수 있는 API를 사용하겠습니다.

먼저 일반회원으로 회원가입을 한 후 다음 내용을 따라해야 합니다.


## 3.1 도서관 위치 정보 API

간단한 승인 요청으로 사용할 수 있는 도서관 위치 정보 API를 사용하겠습니다.

1. https://data.seoul.go.kr에 접속 후 검색창에 ‘도서관 위치 정보’를 입력하면 ‘서울특별시 공공도서관 현황정보’ API가 검색됩니다. 클릭해서 상세 화면으로 이동합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-308.png){: style="box-shadow: 0 0 5px #777"}

1. 화면 중간 미리보기에 있는 [Open API]를 클릭하면 하단의 내용이 바뀝니다.  우측 상단에 보이는 [인증키 신청] 버튼을 클릭합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-309.png){: style="box-shadow: 0 0 5px #777"}

1. 서비스 이용 약관에 동의하고 내용을 입력한 후 [인증키 신청]을 클릭해서 발급을 요청합니다.

1. 신청이 완료되면 다음과 같이 발급현황에 인증키가 나타납니다. [인증키 복사]를 눌러 인증키 값을 복사한 다음 메모장 등에 따로 붙여둡니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-310.png){: style="box-shadow: 0 0 5px #777"}

1. 다시 ‘도서관 위치 정보’를 검색해서 01과 같은 데이터를 선택합니다. [Open API] 탭 바로 다음에 샘플 URL이 표시되어 있습니다. 여기서 [서울시 공공도서관 현황]을 클릭하면 새 창이 뜹니다.

1. 주소창의 주소는 openapi.seoul.go.kr:8088/sample/xml/SeoulPublicLibraryInfo/1/5/로 뜰 텐데 이 주소의 sample 위치에 아까 04에서 복사해둔 인증키를 붙여 넣고 ``Enter``키를 입력합니다. 그러면 웹 브라우저의 데이터가 XML 형식으로 보입니다. 각자의 주소는 ‘openapi.seoul.go.kr:8088/인증키/xml/SeoulPublicLibraryInfo/1/5’ 입니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-311.png){: style="box-shadow: 0 0 5px #777"}

1. 이번에는 주소의 경로 중간의 XML을 JSON 으로 바꿔서 다시 요청하면 JSON 으로 바뀐 형식으로 데이터가 나타납니다. 이번 예제에서는 JSON 형식을 사용해서 데이터를 처리할 것이기 때문에 꼭 경로의 XML을 JSON으로 변경해야 합니다.  웹 브라우저의 URL은 ‘http://openapi.seoul.go.kr:8088/인증키/json/MgisLibrary/1/5/’입니다.

### Open API의 구조

Open API를 사용하려면 구조를 알아야 합니다.

서울 열린데이터광장에서 제공하는 Open API는 다음과 같은 구조로 제공되고 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-312.png){: style="box-shadow: 0 0 5px #777"}


### 요청 결과와 데이터 설명

다음은 웹 브라우저에서 URL을 입력해서 나오는 데이터입니다.

데이터를 보면 내용이 다양한데 이 내용은 https://data.seoul.go.kr/dataList/OA-15480/S/1/datasetView.do 의 미리보기 하단에 있는 [출력값]에 자세히 나와 있습니다. 우리는 이 중 일부 데이터만을 사용하려 합니다.

- list_total_count: 총 데이터 건수 (정상조회 시 출력됨)

- ADRES: 주소

- LBRRY_NAME: 도서관 이름

- HMPG_URL: 홈페이지 주소

- YDNTS: 경도

- XCNTS: 위도

## 3.2 서울 공공도서관 앱 개발하기


### 프로젝트를 생성하고 의존성 추가하기

서울 공공도서관 앱은 지도 정보가 필요하므로 앞에서 공부한 Google Maps Activity를 사용합니다.

이 앱으로 구글 플레이 스토어 등록까지 진행할 예정입니다.

모든 내용을 실습하려면 패키지명을 ‘com.example’로 입력할 수 없습니다.

따라서 패키지명을 각자 드르게 입력해야 합니다. 

저는 다음과 같이 입력했습니다.

이 내용은 각자 다른 이름으로 입력하길 권합니다.

- kr.co.hanbit

1. 프로젝트 종류를 [Google Maps Activity]로 선택해서 프로젝트를 생성합니다.

1. Name을 ‘SeoulPublicLibraries’로 입력하고, Package name에는 ‘example’을 삭제하고 앞에서 설명한 형태로 수정합니다. 패키지명 마지막에 프로젝트명은 지우면 안 됩니다. 필자의 프로젝트 패키지명은 ‘kr.co.hanbit.seoulpubliclibraries’입니다. 

1. google_maps_api.xml 파일에 구글 API 키를 추가합니다. 패키지명이 바뀌면 API키도 다시 생성해야 합니다. 이 장의 ‘1.1 구글 지도 시작하기’의 ‘Google Maps API키 받기’를 참고해서 API 키를 생성하고 ‘YOUR_KEY_HERE’에 넣습니다.

    ```xml
    <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">AIzaSyBMoEo8zVHmeSgrdhq2icODYoXARZainSk</string>
    ```

1. [app] - [manifests]이 AndroidManifest.xml 파일을 열고 위치 권한 아래에 인터넷 권한을 추가합니다.

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

1. 도서관 정보 API가 보안 프로토콜인 HTTPS가 아니라 HTTP를 사용하기 때문에 AndroidManifest.xml 의 \<application\> 태그 제일 마지막에 userCleartextTraffic="true" 를 추가합니다.

    ```xml
    <application
        // 중간 내용은 생략했습니다.
        android:requiredForAllUsers="true">
    ```

1. [app] - [Gradle Scripts]의 build.gradle 파일을 열고 dependencies 블록 안에 Retrofit과 JSON 컨버터 의존성을 추가합니다.

    ```gradle
    dependencies {
        implementation 'com.squareup.retrofit2:retrofit:2.7.1'
        implementation 'com.squareup.retrofit2:converter-gson:2.7.1'
    }
    ```

### 데이터 클래스 Library 생성

앞에서 웹 브라우저에 주소를 요청해서 받은 JSON 샘플 데이터로 Kotlin 데이터 클래스를 생성합니다.

1. JSON 데이터를 코틀린 클래스로 컨버팅하면 구조에 따라 클래스의 개수가 여러 개가 될 수 있습니다. 관리를 하기 위해서 [app] - [java] 밑에 있는 기본 패키지 아래에 data 패키지를 하나 생성합니다. 패키지를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Package]를 선택하고 data 패키지를 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-313.png){: style="box-shadow: 0 0 5px #777"}

1. data 패키지를 마우스 우클릭한 다음 [New] - [Kotlin data class File from JSON]을 클릭합니다. 빈 여백에 샘플 데이터를 붙여넣은 후 Class Name에는 ‘Library’를 입력하고 [Generate]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-314.png){: style="box-shadow: 0 0 5px #777"}

1. 아래처럼 새로운 데이터가 생성된 것을 확인할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-315.png){: style="box-shadow: 0 0 5px #777"}


#### 권한 처리 코드 사용 안 함

이 예제에서는 위험 권한을 사용하지 않기 때문에 권한 처리 코드를 사용하지 않습니다.

### 기본 정보 클래스와 레트로핏 인터페이스 만들기

Open API를 사용하기 위한 기본 정보를 담아두는 클래스와 레트로핏에서 사용할 인터페이스를 같은 클래스에 만들겠습니다.

1. 기본 패키지에 SeoulOpenApi 클래스를 만들겠습니다.  기본 패키지에 SeoulOpenApi 클래스를 하나 생성하고, 클래스 안에 companion object를 만들어 그 안에 도메인 주소와 API키를 저장해 놓는 변수를 2개 만듭니다. 그리고 각각의 변수에 주소와 미리 부여받은 Open API 키를 입력해둡니다. 이렇게 companion object 블록 안에 변수를 선언해두면 SeoulOpenApi.DOMAIN 처럼 클래스 이름으로 바로 사용할 수 있습니다.

    ```kotlin
    class SeoulOpenApi {

        companion object {
            val DOMAIN = "http://openapi.seoul.go.kr:8088"
            val API_KEY = "68597671566d696B3131376747746352"
        }
    }
    ```

1. SeoulOpenApi 클래스 바깥에 레트로핏에서 사용할 SeoulOpenService 인터페이스를 생성합니다.

    ```kotlin
    interface SeoulOpenService {
    }
  
    ```

1. 인터페이스 안에 도서관 데이터를 가져오는 getLibrary() 메서드를 정의하고, @GET 애노테이션을 사용해서 호출할 주소를 지정합니다. 레트로핏에서 사용할 때 @GET에 입력된 주소와 SeoulOpenApi에 미리 정의한 DOMAIN을 조합해서 사용할 것 입니다. 도서관 수가 120개 정도이므로 모두 불러오기 위해 주소 끝 부분에 페이지 ‘1’과 가져올 개수 ‘200’을 입력합니다. getLibrary() 메서드의 파라미터로 사용된 key는 SeoulOpenApi클래스에 정의한 API_KEY를 레트로핏을 실행하는 코드에서 넘겨받은 후 주소와 결합합니다. 반환값은 Call<JSON 변환된 클래스> 입니다.

    ```kotlin
    interface SeoulOpenService {
        
        @GET("/json/SeoulPublicLibraryInfo/1/200")
        fun getLibrary(key: String): Call<Library>
    }
    ```

1. @Path 애노테이션을 사용하면 메서드의 파라미터로 넘어온 값을 @GET에 정의된 주소에 동적으로 삽입할 수 있습니다. 03에서 입력한 코드를 다음과 같이 수정합니다.

    ```kotlin
    interface SeoulOpenService {
        
        @GET("{api_key}/json/SeoulPublicLibraryInfo/1/200")
        fun getLibrary(@Path("api_key") key: String): Call<Library>
    }
    ```

``SeoulOpenApi.kt의 전체 코드``

```kotlin
package kr.co.hanbit.seoulpubliclibraries

import kr.co.hanbit.seoulpubliclibraries.data.Library
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface SeoulOpenService {

    @GET("{api_key}/json/SeoulPublicLibraryInfo/1/200")
    fun getLibrary(@Path("api_key") key: String): Call<Library>
}
```

### 레트로핏으로 데이터 불러오기

앞에서 정의한 인터페이스를 적용하고 데이터를 불러오는 코드를 작성하겠습니다.

1. MapsActivity.kt를 열고 onMapReady() 아래에 loadLibraries() 메서드를 하나 만듭니다.

    ```kotlin
    fun loadLibraries() {
        // 02~05는 여기에 입력합니다.
    }
    ```

1. loadLibraries() 메서드 안에 도메인 주소와 JSON 컨버터를 설정해서 레트로핏을 생성합니다.

    ```kotlin
    val retrofit = Retrofit.Builder()
        .baseUrl(SeoulOpenApi.DOMAIN)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    ```

1. 이어서 앞에서 정의한 인터페이스를 실행 가능한 서비스 객체로 변환합니다.

    ```kotlin
    val seoulOpenService = retrofit.create(SeoulOpenService::class.java)
    ```

1. 인터페이스에 정의된 getLibrary() 메서드에 ‘API_KEY’를 입력하고, enqueue() 메서드를 호출해서 서버에 요청합니다.

    ```kotlin
    seoulOpenService.getLibrary(SeoulOpenApi.API_KEY).enqueue(object : Callback<Library> {
        // 05는 여기에서 Ctrl + I 키를 입력합니다.
    })
    ```

1. ``Ctrl`` + ``I`` 키를 눌러서 인터페이스 코드를 2개 자동 생성합니다.  TODO() 행은 모두 지우고 06과 07의 코드 입력은 다음을 참조합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-316.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    override fun onResponse(call: Call<Library>, response: Response<Library>) {
        // 07은 여기에 입력합니다.
    }

    override fun onFailure(call: Call<Library>, t: Throwable) {
        // 06은 여기에 입력합니다.
    }
    ```

1. onFailure() 메서드에서 서버 요청이 실패했을 경우 간단한 토스트 메시지로 알려줍니다.

    ```kotlin
    Toast.makeText(baseContext, "서버에서 데이터를 가져올 수 없습니다.", Toast.LENGTH_LONG).show()
    ```
1. 서버에서 데이터를 정상적으로 받았다면 지도에 마커를 표시하는 메서드를 호출합니다. 호출하도록 onResponse() 메서드에 다음 코드를 추가합니다.

    ```kotlin
    showLibraries(response.body() as Library)
    ```

    다은은 loadLibraries() 메서드의 전체 코드입니다.

    ```kotlin
    fun loadLibraries() {
        val retrofit = Retrofit.Builder()
            .baseUrl(SeoulOpenApi.DOMAIN)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val seoulOpenService = retrofit.create(SeoulOpenService::class.java)

        seoulOpenService.getLibrary(SeoulOpenApi.API_KEY).enqueue(object : Callback<Library> {
            override fun onResponse(call: Call<Library>, response: Response<Library>) {
                showLibraries(response.body() as Library)
            }

            override fun onFailure(call: Call<Library>, t: Throwable) {
                Toast.makeText(baseContext, "서버에서 데이터를 가져올 수 없습니다.", Toast.LENGTH_LONG).show()
            }
            // 05는 여기에서 Ctrl + I 키를 입력합니다.
        })
    }
    ```

### 지도에 도서관 마커 표시하기

1. 지도에 마커를 표시하는 showLibraries() 메서드를 loadLibraries() 메서드 아래 만듭니다.

    ```kotlin
    fun showLibraries(libraries: Library) {
        // 02는 여기에 입력합니다.
    }
    ```

1. 파라미터로 전달된 libraries의 SeoulPublicLibraryInfo.row에 도서관 목록이 담겨 있습니다. 반복문으로 하나씩 꺼냅니다. 

    ```kotlin
    for (lib in libraries.SeoulPublicLibraryInfo.row) {
        // 03~10 은 여기에 입력합니다.
    }
    ```

1. 마커의 좌표를 생성합니다.

    ```kotlin
    val position = LatLng(lib.XCNTS.toDouble(), lib.YDNTS.toDouble())
    ```

1. 좌표와 도서관 이름으로 마커를 생성합니다. LBRRY_NAME에 도서관 이름이 저장되어 있습니다.

    ```kotlin
    val marker = MarkerOptions().position(position).title(lib.LBRRY_NAME)
    ```

1. 마커를 지도에 추가합니다.

    ```kotlin
    mMap.addMarker(marker)
    ```

1. 이렇게 하면 마커가 지도에 표시되지만, 지도를 보여주는 카메라가 시드니를 가르키므로 카메라 위치 조정이 필요합니다. 수동으로 카메라의 좌표를 직접 입력해주는 방법도 있지만 마커 전체의 영역을 먼저 구하고, 마커의 영역만큼 보여주는 코드로 작성하겠습니다. 02에서 작성한 for문 위에 마커의 영역을 저장하는 LatLngBounds.Builder를 생성합니다.

    ```kotlin
    val latLngBounds = LatLngBounds.Builder()
    ```

1. for문 안에서 지도에 마커를 추가한 후 latLngBounds에도 마커를 추가합니다. 05에서 입력한 코드 다음에 다음 코드를 입력합니다.

    ```kotlin
    latLngBounds.include(marker.position)
    ```

1. for 문이 끝난 후에 앞에서 저장해둔 마커의 영역을 구합니다. padding 변수는 마커의 영역에 얼마만큼의 여백을 줄 것인지 정합니다.

    ```kotlin
    val bounds = latLngBounds.build()
    val padding = 0
    ```

1. bounds와 padding으로 카메라를 업데이트합니다.

    ```kotlin
    val updated = CameraUpdateFactory.newLatLngBounds(bounds, padding)
    ```

1. 업데이트된 카메라의 지도에 반영합니다.

    ```kotlin
    mMap.moveCamera(updated)
    ```

    다음은 지금까지 작성한 showLibraries() 메서드의 전체 코드입니다.

    ```kotlin
    fun showLibraries(libraries: Library) {

        val latLngBounds = LatLngBounds.Builder()

        for (lib in libraries.SeoulPublicLibraryInfo.row) {
            val position = LatLng(lib.XCNTS.toDouble(), lib.YDNTS.toDouble())
            val marker = MarkerOptions().position(position).title(lib.LBRRY_NAME)
            mMap.addMarker(marker)

            latLngBounds.include(marker.position)
        }

        val bounds = latLngBounds.build()
        val padding = 0
        val updated = CameraUpdateFactory.newLatLngBounds(bounds, padding)
        mMap.moveCamera(updated)
    }
    ```

### onMapReady에서 loadLibraries() 메서드 호출하기

1. onMapReady()에 기본으로 작성되어 있는 코드를 삭제하고 loadLibraries() 메서드를 호출합니다.

    앞에서도 설명했지만, 코드에 val sydney로 시작하는 선언부터 총 세줄을 보통 삭제합니다.

    ```kotlin
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        loadLibraries()
    }
    ```

1. 여기까지 잘 따라 했다면 에뮬레이터에서 실행했을 때 지도에 마커가 생성되고 모두 마커가 보이도록 설정됩니다. 에뮬레이터에서 실행하고 테스트해봅니다.


    여기까지 MapsActivity.kt의 전체 코드입니다.

    ```kotlin
    package kr.co.hanbit.seoulpubliclibraries

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.widget.Toast

    import com.google.android.gms.maps.CameraUpdateFactory
    import com.google.android.gms.maps.GoogleMap
    import com.google.android.gms.maps.OnMapReadyCallback
    import com.google.android.gms.maps.SupportMapFragment
    import com.google.android.gms.maps.model.LatLng
    import com.google.android.gms.maps.model.LatLngBounds
    import com.google.android.gms.maps.model.MarkerOptions
    import kr.co.hanbit.seoulpubliclibraries.data.Library
    import kr.co.hanbit.seoulpubliclibraries.databinding.ActivityMapsBinding
    import retrofit2.Call
    import retrofit2.Callback
    import retrofit2.Response
    import retrofit2.Retrofit
    import retrofit2.converter.gson.GsonConverterFactory

    class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

        private lateinit var mMap: GoogleMap
        private lateinit var binding: ActivityMapsBinding

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            binding = ActivityMapsBinding.inflate(layoutInflater)
            setContentView(binding.root)

            val mapFragment = supportFragmentManager
                .findFragmentById(R.id.map) as SupportMapFragment
            mapFragment.getMapAsync(this)
        }

        override fun onMapReady(googleMap: GoogleMap) {
            mMap = googleMap

            loadLibraries()
        }

        fun loadLibraries() {
            val retrofit = Retrofit.Builder()
                .baseUrl(SeoulOpenApi.DOMAIN)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            val seoulOpenService = retrofit.create(SeoulOpenService::class.java)

            seoulOpenService.getLibrary(SeoulOpenApi.API_KEY).enqueue(object : Callback<Library> {
                override fun onResponse(call: Call<Library>, response: Response<Library>) {
                    showLibraries(response.body() as Library)
                }

                override fun onFailure(call: Call<Library>, t: Throwable) {
                    Toast.makeText(baseContext, "서버에서 데이터를 가져올 수 없습니다.", Toast.LENGTH_LONG).show()
                }
            })
        }

        fun showLibraries(libraries: Library) {

            val latLngBounds = LatLngBounds.Builder()

            for (lib in libraries.SeoulPublicLibraryInfo.row) {
                val position = LatLng(lib.XCNTS.toDouble(), lib.YDNTS.toDouble())
                val marker = MarkerOptions().position(position).title(lib.LBRRY_NAME)
                mMap.addMarker(marker)

                latLngBounds.include(marker.position)
            }

            val bounds = latLngBounds.build()
            val padding = 0
            val updated = CameraUpdateFactory.newLatLngBounds(bounds, padding)
            mMap.moveCamera(updated)
        }
    }
    ```

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-317.png){: style="box-shadow: 0 0 5px #777"}


### 도서관 이름 클릭 시 홈페이지로 이동하기

클릭리스너로 새 창을 띄우거나 추가적인 처리를 할 수 있습니다.

여기서는 도서관 홈페이지의 URL이 있는지 검사하고, 있으면 홈페이지를 웹 브라우저에 띄우는 코드를 작성하겠습니다.

1. 마커에 tag 정보를 추가하겠습니다. 마커를 클릭하면 id와 같은 구분 값을 tag에 저장해두고 사용할 수 있습니다. 지도에 마커를 추가하는 코드로 수정하고 tag값에 홈페이지 주소를 저장합니다. MapsActivity.kt 파일에서 showLibraries() 메서드의 다음 부분을 수정합니다.

    ```kotlin
    // 수정 전
    mMap.addMarker(marker)

    // 수정 후
    var obj = mMap.addMarker(marker)
    obj.tag = lib.HMPG_URL
    ```

1. 이제 클릭리스너를 달고 tag의 홈페이지 주소를 웹 브라우저에 띄우겠습니다. onMapReady() 안에서 추가로 코드를 작성합니다. 지도에 마커클릭리스너를 달고 리스너를 통해 전달되는 마커의 tag를 검사해서 값이 있으면 인텐트로 홈페이지를 띄웁니다. 마커클릭리스너를 사용하면 리스너 블럭으로 마커가 전달되는데, it이라는 예약어로 사용할 수 있습니다.

    ```kotlin
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        loadLibraries()

        mMap.setOnMarkerClickListener {
            if (it.tag != null) {
                var url = it.tag as String
                if (!url.startsWith("http")) {
                    url = "http://${url}"
                }
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
            }
            true
        }
    }
    ```

1. 에뮬레이터를 실행하고 테스트합니다

<style>
.page-container {max-width: 1200px}
</style>