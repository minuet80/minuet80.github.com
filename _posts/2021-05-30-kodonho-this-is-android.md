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
![1]({{site.baseurl}}/images/this-is-android/this-is-android-3.png){: style="box-shadow: 0 0 5px #777"}

1. 설치 시작 화면이 나오면 [Next]를 클릭하고 [Android Studio]와 [Android Virtual Device]에 모두 체크한 다음 [Next]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-4.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-5.png){: style="box-shadow: 0 0 5px #777"}

1. 설치 경로를 선택하고 [Next]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-6.png){: style="box-shadow: 0 0 5px #777"}

1. ‘Android Stduio 바로가기’를 추가하는 창입니다. 그대로 두고 [Install]을 클릭합니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-7.png){: style="box-shadow: 0 0 5px #777"}

1. 설치가 진행됩니다. 설치가 완료되면 [Next]를 클릭합니다.

1. [Start Android Studio]의 체크 표시를 해제하고 [Finish]를 클릭합니다.


## 1.2 안드로이드 스튜디오 시작하기
1. 안드로이드 스튜디오를 시작합니다.

1. 안드로이드 스튜디오 및 관련 도구의 데이터 수집을 동의하는지 물어봅니다. 동의하면 [Send usage statistics to Google] 를, 동의하지 않으면 [Don't send]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-8.png){: style="box-shadow: 0 0 5px #777"}

1. Welcom 화면에서 [Next]를 클릭하면 Install Type화면이 나타납니다. Install Type화면에서 [Standard]를 선택하고 [Next]를 클릭합니다. Standard를 선택하면 대부분의 컴포넌트를 모두 설치합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-9.png){: style="box-shadow: 0 0 5px #777"}

1. 화면의 테마를 선택하고 [Next]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-10.png){: style="box-shadow: 0 0 5px #777"}
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
![1]({{site.baseurl}}/images/this-is-android/this-is-android-12.png){: style="box-shadow: 0 0 5px #777"}

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
이번에는 에뮬레이터<sup>Emulator</sup>를 생성하고 연결하는 방법과 스마트폰을 연결하는 방법을 알아봅니다.
에뮬레이터에 나타난 버튼을 누르면 문자열 "Hello World!"가 "Hello Kotlin!!!"으로 바뀝니다.

## 2.1 에뮬레이터 생성 및 실행하기

1. 안드로이드 스튜디오 상단 툴바에서 [AVD Manager]를 클릭해 실행합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-16.png){: style="box-shadow: 0 0 5px #777"}

1. [Create Virtual Device]를 클릭해서 에뮬레이터 생성을 시작합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-17.png){: style="box-shadow: 0 0 5px #777"}

1. 에뮬레이터를 설정하는 팝업창 좌측의 Cetegory에서 [Phone]을 선택한 다음 가운데 목록에 [Nexus 4]를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-18.png){: style="box-shadow: 0 0 5px #777"}
- ``왜 Nexus 4``인가요? 디바이스 선택 시 유의할 점
  - ``되도록 낮은 사양의 에뮬레이터``에서 테스트하는 것이 안드로이드 스튜디오의 성능에 영향을 덜 미치기 때문에 Nexus 4와 같은 낮은 사양의 디바이스를 선택하는 것이 좋습니다. 

1. 실행 환경이 압축된 파일을 선택하는 System Image 화면입니다. Select a system image 아래에 보이는 3개의 탭 메뉴 중 가운데 있는 [x86 Images]탭을 클릭하면 ABI가 [x86_64]인 이미지가 있습니다. 64비트 컴퓨터에서 32비트 프로그램을 실행하면 처리 속도가 느리기 때문에 다음 화면과 같이 맨 상단의 [x86_64]를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-19.png){: style="box-shadow: 0 0 5px #777"}

1. [android-sdk-license] 동의를 확인하는 팝업창이 나오면 [Accept]를 선택하고 [Next]를 클릭합니다.<br>

1. 설치가 완료되면 Q옆의 파란색 Download 글자가 없어지고 이제 에뮬레이터를 생성할 수 있습니다. 다운로드한 [Q]를 선택하고 [Next]를 클릭합니다.<br>

1. AVD Name을 입력하고 [Finish]를 클릭해서 에뮬레이터를 생성합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-20.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 에뮬레이터가 목록에 나타납니다. 목록 우측의 [실행 아이콘]을 클릭해서 에뮬레이터를 실행합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-21.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-22.png){: style="box-shadow: 0 0 5px #777"}


## 2.2 스마트폰 설정 및 연결하기
스마트폰에 연결하기 위해서는 설정 화면에 있는 빌드 번호가 적흰 메뉴를 클릭하여 스마트폰의 개발자 옵션<sup>Developer Options</sup>를 활성화해야 합니다.

- 안드로이드 스마트폰의 빌드 번호 메뉴 위치
  - [설정] - [에뮬레이트된 기기 정보] - [빌드 번호]

1. 스마트폰을 켜고 [설정(Settings)] 아이콘을 눌러 이동합니다.
1. [설정]화면에서 [휴대전화 정보]를 눌러 이동합니다.
1. [휴대전화 정보]에서 [소프트웨어 정보]를 눌러 이동합니다.
1. [빌드 번호(Build number)]를 찾을 수 있습니다. 이 빌드 번호를 5회 이상 연속해서 누르면 개발자 모드가 활성화되었다는 메시지가 나옵니다. [설정]화면에서 [시스템] - [고급] - [개발자 옵션(Developer Options)]를 클릭해 화면으로 이동합니다.
1. 그런 다음 [USB 디버깅]옆에 스위치 버튼을 눌러 활성화해줍니다.
1. USB 케이블을 이용해 스마트폰을 컴퓨터에 연결합니다.
1. 안드로이드 스튜디오 창의 상단 툴바에서 [Available devices]목록 버튼을 클릭한 후 [Run on multiple devices]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-23.png){: style="box-shadow: 0 0 5px #777"}

1. [Available devices]목록에 나타난 스마트폰 이름을 선택하고 [Run]버튼을 클릭하면 스마크톤에 앱이 설치된 후 실행됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-24.png){: style="box-shadow: 0 0 5px #777"}


## 2.3 개발을 도와주는 유용한 기능

### 자동 저장
안드로이드 스튜디오에는 자동 저장<sup>Auto Save</sup>이 기본적으로 적용되어 있습니다.
자동 저장 옵션은 메인 메뉴의 [File] - [Settings]를 선택하면 나타나는 세팅 창의 [System Settings]에서 선택 또는 헤제할 수 있습니다.
가급적 자동 저장 옵션은 체크된 상태로 사용합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-25.png){: style="box-shadow: 0 0 5px #777"}

### 코드 완성
### 디버깅
### 성능 모니터

앱을 실행하면 하단에 [Profiler]라는 탭이 나타나고 클릭하면 현재 앱이 사용하는 CPU 및 메모리 사용량 등의 성능을 모니터링할 수 있습니다.


## 2.4 앱 만들어 실행하기 : Say! Hello~

앱을 만들어 실행하는 과정은 크게 4단계로 진행됩니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-26.png){: style="box-shadow: 0 0 5px #777"}


### 1단계 : 프로젝트 생성하기
1. Welcome 화면에서 [Create New Project]를 클릭해서 새로운 프로젝트를 생성합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-27.png){: style="box-shadow: 0 0 5px #777"}

1. 프로젝트 형태를 선택합니다. [Empty Activity]를 선택하고 [Next]를 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-28.png){: style="box-shadow: 0 0 5px #777"}

1. Language를 꼭 [Kotlin]으로 선택해야 합니다. 그 다음 Minimum API Level이 [API 16]이상에 맞춰져 있는지 확인한 다음 [Finish] 버튼을 클릭합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-29.png){: style="box-shadow: 0 0 5px #777"}

1. 프로젝트가 생성됩니다. 

### 2단계 : 레이아웃 편집하기
레이아웃은 텍스트나 이미지 등을 화면에 배치할 수 있는 도구입니다.

- 화면을 그려주는 함수 setContentView
  - 코드 편집기 창을 보면 setContentView(R.layout.activity_main)라는 코드가 보입니다. 이는 ‘콘텐츠를 화면에 표시하기 위해서 res/layout 디렉토리 아래에 있는 activity_main.xml 파일을 사용한다’라는 의미입니다. 이 책에서는 View Binding을 사용하기 때문에 실제 코드에서는 레이아웃 파일이 아닌 안드로이드가 생성한 바인딩을 전달합니다.
```java
super.onCreate(savedInstanceState)
setContentView(R.layout.activity_main)
```

1. [activity_main.xml] 탭을 클릭해서 화면을 설정할 수 있는 파일을 엽니다. 편집기 창이 레이아웃을 편집할 수 있는 형태로 바뀝니다. 우측 상단에 있는 모드 버튼을 클릭하면 [Code], [Split], [Design] 모드로 변경되면서 각각의 모드에서 편집이 가능합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-30.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-31.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-32.png){: style="box-shadow: 0 0 5px #777"}

1. 디자인 모드를 선택하는 아이콘을 클릭하여 [Design]모드로 변경합니다.
좌측 상단의 팔레트 (Palette) 영역에 있는 커먼 (Common) 카테고리를 클릭합니다.
그리고 우측에 보이는 버튼을 드래그에서 화면 중앙의 "Hello World!"라는 글자 아래에 가져다 놓습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-33.png){: style="box-shadow: 0 0 5px #777"}

1. 버튼이 클릭 된 상태라면 다음 그림과 같이 다른 요소들과 연결할 수 있는 Contraint 편집기가 화면 우측에 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-34.png){: style="box-shadow: 0 0 5px #777"}

1. Contraint 편집기 위쪽에 있는 [+] 를 더블클릭하면 "Hello World!"가 쓰여 있는 테긋트 뷰에 버튼이 레이아웃에 연결되고, 편집 화면이 다음의 좌측 그림과 같이 바뀝니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-35.png){: style="box-shadow: 0 0 5px #777"}<br>
- Constraint 편집기 숫자의 의미
  - 편집기에서 클릭한 [+] 위의 숫자는 현재 연결된 요소와의 거리를 나타냅니다. 예를 들어 우측 위의 그림은 텍스트뷰로부터 44dp (Device independence Pixel) 떨어져 있다는 의미입니다.

1. Contraint 편집기에서 양쪽에 있는 [+]를 클릭합니다. 편집기 화면이 다음의 좌측 그림과 같이 연결된 형태로 바뀌고, 디자인 화면에서도 버튼의 양쪽으로 화살표가 화면 끝까지 이어집니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-36.png){: style="box-shadow: 0 0 5px #777"}<br>

1. 이번에는 모드가 가로세로로 변경될 때 텍스트뷰와 버튼이 어떻게 적용되는지 확인하기 위해서 편집 화면을 회전해 보겠습니다.  폊집기 상단의 [회전 아이콘]을 클릭하면 나타나는 바로 가기 메뉴에서 [Landscape]를 선택해 화면을 가로로 전환합니다.

1. 연결이 잘 되었으면 화면이 가로 모드로 변해도 버튼이 화면의 중앙에 위치합니다. 

1. Constraint 편집기의 좌우 숫자를 클릭해서 값을 ‘0’으로 변경합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-37.png){: style="box-shadow: 0 0 5px #777"}

1. 그리고 사각현 안쪽에 있는 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-38.png){: style="box-shadow: 0 0 5px #777"}를 클릭합니다.  연속해서 클릭하면 세 가지 모드로 변경할 수 있습니다. 계속 클릭해서 주름 모양 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-40.png){: style="box-shadow: 0 0 5px #777"}으로 변경하면 다음 우측 그럼과 같이 버튼이 좌우로 화면에 꽉 찬 형태로 변경됩니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-41.png){: style="box-shadow: 0 0 5px #777"}
- Constraint 3가지 모드
  - Wrap Content(![1]({{site.baseurl}}/images/this-is-android/this-is-android-38.png){: style="box-shadow: 0 0 5px #777"}) : 위젯 안쪽의 내용물(주로 텍스트)에 크기를 맞춥니다.
  - Fixed(![1]({{site.baseurl}}/images/this-is-android/this-is-android-39.png){: style="box-shadow: 0 0 5px #777"}) : 가로세로 속성 필드에 입력된 크기에 맞게 가로세로를 고정합니다.
  - Match Constraint(![1]({{site.baseurl}}/images/this-is-android/this-is-android-40.png){: style="box-shadow: 0 0 5px #777"}) : 크기를 제약 조건인 Constraint 연결부에 맞춥니다.

1. 이제 버튼과 텍스트뷰 위젯의 아이드를 변경하고 코드와 연결할 준비를 합니다. 먼저 버튼을 클릭하고 속성(Attributes) 영역 가장 위에 있는 id입력 필드에 ‘btnSay’라고 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-42.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-43.png){: style="box-shadow: 0 0 5px #777"}
- Rename 팝업이 뜹니다.
  - Scope는 [Current File]를 선택한후 [Refactor]를 클릭해서 반영합니다.

1. ‘Hello World!’라고 쓰여 있는 텍스트뷰를 클릭하고 id속성에 ‘textSay’라고 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-44.png){: style="box-shadow: 0 0 5px #777"}


## 2.5 코틀린 코드와 레이아웃 연결하기
뷰에서 버튼 같은 요소를 동작시키기 위해서는 먼저 뷰와 소스 코드를 연결해야 하는데, 안드로이드는 ``findViewById``라는 함수를 제공하고 있으며 이를 조금 효율적으로사용하기 위해서 코틀린에서는 익스텐션<sup>Kotlin Extension</sup>이라는 부가 기능을 제공해 왔습니다. 코틀린은 다음과 같은 이유로 최신 버전의 안드로이드 스튜디오에서는 사용을 권장하지 않습니다.
1. 코틀린에서만 제공하므로 자바에서는 사용할 수 없습니다.
1. 일부 상황에서 뷰를 찾을 수 없는 오류가 발생합니다.
1. 어디서나 뷰를 호출할 수 있기 때문에 잘못된 참조로 인해 앱이 강제 종료될 수 있습니다. 예를 들어 activity_main.xml와 fragment_sub.xml에서 동일하게 button 아이디를 사용하면 실수로 다른 XML의 아이디를 참조하여 앱이 강제로 종료될 수 도 있습니다.
1. 모듈화를 추천하고 있는데 코틀린 익스텐션을 사용할 경우 다른 모듈에서 뷰에 대한 접근이 불가능합니다.

``★ 뷰 바인딩``으로 뷰와 코드를 연결하는 방법
1. build.gradle파일에 viewBinding 설정을 추가합니다.
```gradle
viewBinding true
```
1. 안드로이드 스튜디오 상단에 나타나는 [Sync Now]를 클릭해서 설정을 적용합니다.

3. activity_main.xml 레이아웃 파일을 작성합니다.
4. viewBinding이 설정되어 있기 때문에 안드로이드가 레이아웃 파일을 바인딩으로 생성합니다.
  - 자동변환 공식 : 레이아웃 파일명 (첫 글자와 언더바 다음 영문을 대문자로 변환) + Binding
  - 예) activity_main.xml = ActivityMainBinding
4. MainActivity.kt파일에 있는 코틀린 코드에서 클래스로 변환된 바인딩의 inflate함수로 초기화하고 변수에 저장합니다.
```gradle
val 변수 = ActivityMainBinding.inflate(layoutInflater)
```
5. 이어서 변수에 저장된 바인딩의 root뷰를 setContentView에 전달합니다.
```gradle
setContentView(변수.root)
```
1. 바인딩 도트 연성자(.)로 뷰의 id에 접근 후 사용합니다.
```gradle
변수.textView = "Hello"
```

이제 ``뷰 바인딩``을 사용해서 뷰와 코드를 연결하는 실습을 해보겠습니다.
1. 먼저 스튜디오 좌측 프로젝트 영역에서 ``Gradle Scripts``아래에 있는 ``build.gradle (Module: 프로젝트명.app)``파일을 더블클릭해서 열고, android{}코드 영역 바로 아래에 다음 그림과 같이 ``viewBinding true`` 설정을 추가합니다. 설정을 추가하고 나면 스튜디오 우측 상단에 [Sync Now]가 나타나는데 클릭해서 설정을 완료합니다.
```gradle
plugins {
  id 'com.android.application'
  id 'kotlin-android'
}
android {
  buildFeatures {
      viewBinding true
  }
  ...생략
}
```
1. [MainActivity.kt]탭을 클릭해서 파일을 열고 소스 코드를 편집합니다. onCreate()함수 코드 블록({})안에서 setContentview 줄 위에 레이아웃 파일명인 activity_main의 단어 첫 글자를 대문자로 바꿔서 ActivityMain이라고 입력하면 다음과 같은 코드 자동 오나성이 나타납니다. ActivityMainBinding을 클릭해서 선택하거나 ``Enter``키를 입력하면 코드가 자동으로 완성됩니다.
```java
package kr.co.hanbit.sayHello
　
import ...생략
　
class MainActivity : AppCompatActivity() {
　
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        　
        ActivityMain
        　
        setContentView(R.layout.activity_main)
    }
}
```
  - ActivityMainBinding이 자동 완성으로 사용할 수 있는 이유는 앞에서 build.gradle 파일에서 viewBinding true를 설정했기 때문이다.

1. ActivityMainBinding을 추가한 뒤 소스 코드의 class 선언부 위쪽을 보면 다음과 같이 import가 자동적으로 추가되어 있습니다.
```java
package kr.co.hanbit.sayHello
　
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kr.co.hanbit.sayhello.databinding.ActivityMainBinding
　
class MainActivity : AppCompatActivity() {
　
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        　
        ActivityMainBinding
        　
        setContentView(R.layout.activity_main)
    }
}
```

1. ActivityMainBinding을 다음과 같이 수정해서 뷰 바인딩을 사용할 준비를 합니다. ActivityMainBinding이 가지고 있는 inflate 함수에 layoutInflater를 입력한 후 binding변수에 저장합니다. layoutInflater는 모든 Activity에서 호출해서 사용할 수 있습니다.
```java
package kr.co.hanbit.sayHello
　
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kr.co.hanbit.sayhello.databinding.ActivityMainBinding
　
class MainActivity : AppCompatActivity() {
　
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        　
        val binding = ActivityMainBinding.inflate(layoutInflater)
        　
        setContentView(binding.root)
    }
}
```
  - setContentView에 R.layout.activity_main을 사용해도 화면에는 동일하게 나타나지만, 뷰 바인딩을 사용하기 위해서는 이런 과정이 필요합니다.

1. Binding 변수를 통해 뷰에 미리 작성해두었던 버튼의 id에 접근할 수 있습니다. 다음과 같이 버튼에 id에 Listener를 설정합니다.
```java
package kr.co.hanbit.sayHello
　
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kr.co.hanbit.sayhello.databinding.ActivityMainBinding
　
class MainActivity : AppCompatActivity() {
　
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        　
        val binding = ActivityMainBinding.inflate(layoutInflater)
        　
        setContentView(binding.root)
        binding.btnSay.setOnClickListener {
            binding.textSay = "Hello Kotlin!!"  
        }
    }
}
```

## 2.6 앱 실행하기

1. 이제 소스 코드를 에뮬레이터에서 실행해보겠습니다. 상단 툴바에서 [실행 아이콘]을 클릭해서 프로그램을 에뮬레이터에 설치하고 실행합니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-45.png){: style="box-shadow: 0 0 5px #777"}

1. 에뮬레이터가 실행되면 다음과 같은 애 화면이 나옵니다. 화면에서 보이는 [Button]을 클릭해보세요. 문자열 "Hello World!"가 "Hello Kotlin!!!"으로 바뀌는 것을 확인할 수 있습니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-46.png){: style="box-shadow: 0 0 5px #777"}