---
title: "[책] 이것이 안드로이드다 (with 코틀린)"
categories:
  - Me
tags:
  - Asset
toc: true
toc_label: "목차"
toc_sticky: true
---

### ✔ 1. 개발 도구 설치와 앱 실행하기
{: .wood-text}

[[안드로이드 스튜디오 홈페이지]](https://developer.android.com/studio/)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-1.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-2.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-3.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-4.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-5.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-6.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-7.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-8.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-9.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-10.png)
 - 안드로이드 스튜디오 및 관련 도구의 데이터 수집을 동의하는지를 물어봅니다. 동의하면 [Send usage statistics to Google] 을, 동의하지 않으면 [Don't send] 를 클릭합니다.

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-11.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-12.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-13.png)
  - 눈의 피로도를 낮추가 위해 [Darcula] 테마를 선택합니다.

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-14.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-15.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-16.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-17.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-18.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-19.png)
  - [Help me choose] 를 클릭하면 안드로이드 버전별 점유율을 확인할 수 있습니다.
  - [Use legacy android support libraries] 3.6 이상 버전부터 옵션이 추가되었는데 체크하면 이전 버전의 라이브러리를 사용할 수 있습니다.


#### 1-1. Android SDK 기본 설정 확인하기

- 안드로이드 스튜디오는 편집을 편하게 해주는 도구일 뿐, 실제 컴파일러와 같은 개발 환경은 모두 SDK에 있습니다. 안드로이드 스튜디오는 이 SDK를 사용해서 최종 설치 파일을 만들어 줍니다.
- ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-20.png)
- ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-21.png)
  - [Settings] 창의 좌측 메뉴에서 [Appearance & Behavior] - [System Settings] - [Android SDK]를 클릭하면 Android SDK Location에서 설치 경로를 확인할 수 있습니다.

- SDK Platforms
  - [SDK Platforms] 탭을 클릭하면 소스 코드를 빌드할 때 사용하는 플랫폼이 버전별로 표시된 것을 확인할 수 있습니다. 컴퓨터에 설치된 플랫폼은 Status 부분이 ‘Installed’로 표시되어 있습니다.

- SDK Tools
  - 안드로이드에서 사용할 수 있는 도구 (에뮬레이터, 디버거 등)의 목록을 확인할 수 있습니다.
  - <font color="blue">Android SDK Build-Tools</font>
    - 리소스 아이디를 가지고 있는 R 파일을 생성하고 설치 파일인 APK 파일을 최적화하는 도구 입니다. Java Bytecode를 Dalvik Bytecode로 변환하는 도구도 포함하고 있습니다.
  - <font color="blue">Android Emulator</font>
    - 가상의 스마트폰 환경으로 앱을 설치하고 테스트할 수 있습니다.
  - <font color="blue">Android SDK Platform-Tools</font>
    - 에뮬레이터와 스마트폰에 연결하기 위한 ADB (Anroid Debug Bridge)라는 도구와 성능 분석 도구인 Systrace가 제공됩니다.
  - <font color="blue">Intel x86 Emulator Acceleator (HAXM installer)</font>
    - 에률레이터의 처리 속도를 빠르게 해주는 하드웨어 가속기입니다.
- SDK Update sites
  - 필요한 도구를 다운로드할 수 있는 웹 사이트 주소가 등록되어 있습니다.

#### 1-2. 프로젝트 구조 이해하기
- 안드로이 스튜디오의 좌측 상단에는 파일 탐색기 모양이 프로젝트 관리 영역이 있습니다. 주로 Project와 Android를 사용합니다.
- ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-22.png)
- Android 뷰의 구조
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-23.png)
  - manifests : 설치관련 정보 디렉토리
  - java : 소스 코드 디렉토리
  - res : 이미지, 레이아웃, MP3 등의 리소스 디렉토리
  - Gradle Scripts : 빌드 관련 설정 정보 디렉토리
- Project 뷰의 구조
  - Project 뷰는 실제 디렉토리 구조를 그대로 보여줍니다. 이미지를 추가하거나 다양한 화면 크기를 처리하는 작업 등의 리소스를 변경할 때 Project 뷰로 전환해서 작업하는 것이 좋습니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-24.png)

#### 1-3. 에뮬레이터 생성 및 실행하기
1. 안드로이드 스튜디오의 상단 툴바에서 [AVD manager]를 클릭해 실행합니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-25.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-26.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-27.png)
    - {% capture a %} **왜 Nexus 4인가요?** <br>되도록 낮은 사양의 에뮬레이터에서 테스트하는 것이 안드로이드 스튜디오의 성능에 영향을 덜 미치기 때문에 Nexus 4와 같은 낮은 사양의 다비이스를 선택하는 것이 좋습니다.{% endcapture %} 
      <div class="notice--danger">
        {{ a | markdownify | remove: "<p>" | remove: "</p>"}}
      </div>

  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-28.png)
    - 실행 환경이 압출된 파일을 선택하는 System Image 화면입니다. 64비트 컴퓨터에서 32비트 프로그램을 선택하면 처리 속도가 느려지기 때문에 다음 화면과 같이 맨 상단의 [x86_64]를 선택합니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-29.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-30.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-31.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-32.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-33.png)

#### 1-4. 스마트폰 설정 및 연결하기
- 스마트폰에 연결하기 위해서는 설정 화면에 있는 빌드 번호가 적힌 메뉴를 클릭하여 스마트폰의 개발자 옵션을 활성화해야 합니다.
- {% capture a %} **안드로이드 스마트폰의 빌드 번호 메뉴 위치** <br>[설정]-[에뮬레이트된 기기 정보]-[빌드 번호]{% endcapture %} 
  <div class="notice--danger">
    {{ a | markdownify | remove: "<p>" | remove: "</p>"}}
  </div>

1. 스마트폰을 켜고 [설정] 아이콘을 눌러 이동합니다.
1. 