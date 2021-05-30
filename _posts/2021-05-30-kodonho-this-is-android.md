---
layout: post
title:  "[IT] - [BOOK] 1강 - 이것이 안드로이드다 with 코틀린 "
description: 개발 도구 설치와 앱 실행하기
date:   2021-05-30 10:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android/
width: large
---

* some text
{: toc}

# 1. 안드로이드 스튜디오 설치/시작

## 1.1 파일 다운로드 및 설치하기
1. 안드로이드 스튜디오 홈페이지 [(https://developer.android.com/studio)][a]에 접속해 설치 파일을 다운로드 합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-2.png){: style="box-shadow: 0 0 5px #777"}

1. 사용 약관에 동의하는 체크박스에 체크하고 [다운로드 : ANDRIOD STUDIO] 를 클릭하여 파일을 다운로드 합니다.<br>
![2]({{site.baseurl}}/images/this-is-android/this-is-android-3.png){: style="box-shadow: 0 0 5px #777"}

1. 설치 시작 화면이 나오면 [Next]를 클릭하고 [Android Studio]와 [Android Virtual Device]에 모두 체크한 다음 [Next]를 클릭합니다.<br>
![3]({{site.baseurl}}/images/this-is-android/this-is-android-4.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![4]({{site.baseurl}}/images/this-is-android/this-is-android-5.png){: style="box-shadow: 0 0 5px #777"}

1. 설치 경로를 선택하고 [Next]를 클릭합니다.<br>
![5]({{site.baseurl}}/images/this-is-android/this-is-android-6.png){: style="box-shadow: 0 0 5px #777"}

1. ‘Android Stduio 바로가기’를 추가하는 창입니다. 그대로 두고 [Install]을 클릭합니다.
![6]({{site.baseurl}}/images/this-is-android/this-is-android-7.png){: style="box-shadow: 0 0 5px #777"}

1. 설치가 진행됩니다. 설치가 완료되면 [Next]를 클릭합니다.

1. [Start Android Studio]의 체크 표시를 해제하고 [Finish]를 클릭합니다.


## 1.2 안드로이드 스튜디오 시작하기
1. 안드로이드 스튜디오를 시작합니다.

1. 안드로이드 스튜디오 및 관련 도구의 데이터 수집을 동의하는지 물어봅니다. 동의하면 [Send usage statistics to Google] 를, 동의하지 않으면 [Don't send]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-8.png){: style="box-shadow: 0 0 5px #777"}

1. Welcom 화면에서 [Next]를 클릭하면 Install Type화면이 나타납니다. Install Type화면에서 [Standard]를 선택하고 [Next]를 클릭합니다. Standard를 선택하면 대부분의 컴포넌트를 모두 설치합니다.<br>
![2]({{site.baseurl}}/images/this-is-android/this-is-android-9.png){: style="box-shadow: 0 0 5px #777"}

1. 화면의 테마를 선택하고 [Next]를 클릭합니다.<br>
![3]({{site.baseurl}}/images/this-is-android/this-is-android-10.png){: style="box-shadow: 0 0 5px #777"}
  - 흰색바탕의 [Light]를 선택하면 장기간 프로그래밍할 때 눈의 피로도가 높아집니다. 보통 검은색 바탕의 ``[Darcula]``를 사용합니다.

1. 설치할 목록을 확인합니다. [Finish]를 클릭하면 목록에 있는 컴포넌트를 다운로드하고 설치합니다.<br>

1. 중간에 에뮬레이터의 하드웨어 가속기 사용을 위한 Intel HAXM 설치 메시지가 나타나는 경우가 있는데 [확인]을 클릭합니다.<br>

1. 설치가 완료되면 다음 그림과 같은 시작 화면이 나타납니다. [Create New Project]를 클릭합니다. 이어서 [Empty Activity]를 선택하고 [Next]를 클릭합니다.<br>

1. 프로젝트를 설정하는 화면입니다. 화면 정보 그대로 수정하지 않고 [Finish]를 클릭해 프로젝트를 생성합니다.<br>


## 1.3 Android SDK 기본 설정 확인하기
안드로이드 스튜디오는 편집을 편하게 해주는 도구일 뿐, 실제 컴파일러와 같은 개발 환경은 모두 SDK 에 있습니다.
안드로이드 스튜디오는 이 SDK를 사용해서 최종 설치 파일을 만들어줍니다.

1. 메인 메뉴에서 [File] - [Setting]를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-11.png){: style="box-shadow: 0 0 5px #777"}

1. [Settings]창 좌측 메뉴에서 [Appearance & Behavior] - [System Settings] - [Android SDK]를 클릭하면 Android SDK Location에서 설치 경로를 확인할 수 있습니다.<br>
![2]({{site.baseurl}}/images/this-is-android/this-is-android-12.png){: style="box-shadow: 0 0 5px #777"}

### SDK Platforms
현재 설치된 안드로이드 스튜디오의 기본 설정을 확인해보겠습니다. [SDK Platforms]탭을 클릭하면 소스 코드를 빌드할 때 사용하는 플랫폼이 버전별로 표시된 것을 확인할 수 있습니다. 컴퓨터에 설치된 플랫폼은 Status 부분이 ‘Installed’로 표시되어 있습니다.

### SDK Tool
안드로이드에서 사용할 수 있는 도구 (에뮬레이터, 디버거 등)의 목록을 확인할 수 있습니다.

1. ``Android SDK Build-Tools`` : 리소스 아이디를 가지고 있는 R파일을 생성하고 설치 파일인 APK 파일을 최적화하는 도구입니다. 자바 바이트코드<sup>Java Bytecode</sup>를 달빅 바이트코드<sup>Dalvik Bytecode</sup>로 변환하는 도구도 포함하고 있습니다.

1. ``Android Emulator`` : 가상의 스마트폰 환경으로 앱을 설치하고 테스트할 수 있습니다.

1. ``Android SDK Platform-Tools`` : 에뮬레이터와 스마트폰에 연결하기 위한 ADB<sup>Android Debug Bridge</sup>라는 도구와 성능 분석 도구인 Systrace가 제공됩니다.

1. ``Intel x86 Emulator Accelerator (HAXM installer)`` : 에뮬레이터의 처리 속도를 빠르게 해주는 하드웨어 가속기입니다. 설치되어 있지 않으면 에뮬레이터를 사용할 수 없을 정도로 느려질 수 있습니다.

### SDK Update Sites
``SDK Update Sites``탭에는 필요한 도구를 다운로드할 수 있는 웹 사이트 주소가 등록되어 있습니다.


## 1.4 프로젝트 구조 이해하기
안드로이드 스튜디오에서 실제 디렉토리 뷰를 보기 위해서는 ``Project``를 선택합니다.
안드로이드 스튜디오의 촤측 상단에는 파일 탐색기 모양의 프로젝트 관리 영영이 있습니다.
기본적으로 ``Android``가 선택되어 있고 클릭하면 선택할 수 있는 뷰의 목록이 펼쳐집니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-13.png){: style="box-shadow: 0 0 5px #777"}

### Android 뷰의 구조
Android 뷰는 안드로이드 개발을 편하게 하기 위해 재배치한 가상의 디렉토리 구조를 보여줍니다. 
크게 `app`과 `Gradle Scripts`로 구성되는데 app에는 코딩하면서 생성한 모든 파일이 저장되고 Gradle Scripts에는 빌드에 필요한 설정 정보들이 저장됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-14.png){: style="box-shadow: 0 0 5px #777"}

### Project 뷰의 구조
Project뷰는 실제 디렉토리의 구조를 그대로 보여줍니다.
이미지를 추가하거나 다양한 화면 크기를 처리하는 작업 등의 리소스를 변경할 때 Project뷰로 전환해서 작업하는 것이 좋습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-15.png){: style="box-shadow: 0 0 5px #777"}
  - Project뷰로 보는 실제 디렉토리의 구조는 Andriod뷰로 보는 것보다 헐씬 복잡한 구조로 되어 있습니다. 그래서 꼭 필요할 때를 제외하고, 보통 작업할 때는 Android뷰로 보는 것이 더 효율적입니다.



# 2. 앱을 만들어 실행하기
































[a]: https://developer.android.com/studio
