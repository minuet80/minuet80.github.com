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

1. updateLocation() 메서드를 작성합니다. 위치 정보를 요청할 정확도와 주기를 설정할 locationRequest를 먼저 생성하고, 해당 주기마다 반환받을 locationCallback을 생성합니다. 마지막으로 onMapReady 에서 생성한 위치 검색 클라이언트의 requestLocationUpdates() 에 앞에서 생성한 2개와 함께 루퍼 정보를 넘겨줍니다. 이제 1초 (1,000 밀리초) 에 한 번씩 변화된 위치 정보가 LocationCallback의 onLocationResult() 로 전달됩니다. onLocationResult()는 반환받은 정보에서 위치 정보를 setLastLocation()으로 전달합니다. fusedLocationClient.requestLocationUpdates 코드는 권한 처리가 필요한데 현재 코드에서는 확인할 수 없습니다. 따라서 메서드 상단에 해당 코드를 체크하지 않아도 된다는 의미로 @SuppressLint("MissingPermission") 애너테이션을 달아줍니다.


<style>
.page-container {max-width: 1200px}657‘’“”
</style>