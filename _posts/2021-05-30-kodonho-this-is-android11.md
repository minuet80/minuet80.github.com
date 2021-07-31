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



<style>
.page-container {max-width: 1200px}620‘’“”
</style>