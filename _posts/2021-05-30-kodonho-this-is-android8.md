---
layout: post
title:  "[IT] - [BOOK] 8강 - 이것이 안드로이드다 with 코틀린 "
description: 카메라와 갤러리
date:   2021-05-30 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android8/
width: large
---

* some text
{: toc}


# 1. 카메라 사용하기

6장에서 언급했듯이 안드로이드 6.0 (API level23, targetSdkVersion23)버전 이후부터 카메라 관련 작업도 위험 권한으로 분류되어 부가적인 코드 처리가 필요합니다.

예제를 따라 하면서 카메라 권한 처리를 이해하고, 촬영한 이미지를 다루는 방법을 알아보겠습니다.

## 1.1 UI 화면 만들고 권한 요청하기

새 프로젝트 CameraAndGallery 를 생성하고 build.gradle 파일에 viewBinding 설정을 합니다.

1. activity_main.xml 파일을 열고 화면 가운데 있는 텍스트뷰를 삭제합니다.

1. 카메라 앱을 호출하는 버튼을 드래그해서 화면 하단에 배치합니다. 그리고 text속성에는 ‘카메라’, id속성에는 ‘buttonCamera’를 입력하고, 컨스트레인트는 다음 그림과 같이 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-250.png){: style="box-shadow: 0 0 5px #777"}


1. 카메라 앱으로 촬영한 사진을 미리보기 할 이미지뷰(ImageView)를 버튼 상단에 배치합니다. 이미지뷰를 드래그했을 때 나타나는 팝업창에서 [avatars]를 선택한 다음 [OK]버튼을 클릭합니다.

1. 이미지뷰의 layout_width와 layout_height 의 속성에 ‘0dp’를 입력한 다음 컨스트레인트를 우측 그림과 같이 연결합니다. 그리고 id속성에는 ‘imagePreview’를 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-251.png){: style="box-shadow: 0 0 5px #777"}

1. [app] - [manifests]의 AndroidManifest.xml 파일을 열고 다음의 코드를 입력하여 카메라 권한과 카메라로 촬영한 사진에 대한 접근 권한을 선언합니다.  위치는 \<application\>태그 시작 전에 입력합니다. (WRITE 권한이 있으면 같은 그룹의 READ권한은 없어도 되지만, 이렇게 모두 작성하고 사용해도 괜찮습니다.) 카메라를 사용하기 위해서는 \<uses-feature /\>도 같이 설정해야 합니다.
    ```xml
    <!-- 카메라 권한 -->
    <uses-permission android:name="android.permission.CAMERA" />
    <!-- 저장소 읽기 권한 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <!-- 저장소 쓰기 권한 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <!-- 카메라 사용 -->
    <uses-feature android:name="android.hardware.camera" />
    ```

## 1.2 권한 처리를 위한 코드 작성하기

카메라 및 활영한 사진을 저장할 외부 저장소의 권한을 요청하는 코드를 작성합니다.

1. 먼저 6장 3절에서 작성했던 Base 프로젝트를 불러온 후 BaseActivity를 복사해서 현재 프로젝트에 붙여넣기 합니다.

1. MainActivity.kt 를 열고 BaseActivity를 상속하도록 class 코드를 수정합니다.
    ```java
    class MainActivity: BaseActivity() {

    }
    ```


<style>
.page-container {max-width: 1200px}‘’“”
</style>