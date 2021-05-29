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
    - {% capture a %} **왜 Nexus 4인가요?** <br>되도록 낮은 사양의 에뮬레이터에서 테스트하는 것이 안드로이드 스튜디오의 성능에 영향을 덜 미치기 때문에 Nexus 4와 같은 낮은 사양의 디바이스를 선택하는 것이 좋습니다.{% endcapture %} 
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
- {% capture b %} **안드로이드 스마트폰의 빌드 번호 메뉴 위치** <br>[설정]-[에뮬레이트된 기기 정보]-[빌드 번호]{% endcapture %} 
  <div class="notice--danger">
    {{ b | markdownify | remove: "<p>" | remove: "</p>"}}
  </div>

1. 스마트폰을 켜고 [설정] 아이콘을 눌러 이동합니다.
1. [설정] 화면에서 [휴대전화 정보]를 눌러 이동합니다.
1. [휴대전화 정보] 에서 [소프트에어 정보]를 눌러 이동합니다.
1. [빌드 번호 (Build Number) ] 를 찾을 수 있습니다. 이 빌드 번호를 5회 이상 연속해서 누르면 개발자 모드가 활성화되었다는 메시지가 나옵니다. [설정] 화면에서 [시스템] - [고급] - [개발자 옵션] 를 클릭해 화면으로 이동합니다.
1. [USB 디버깅] 옆의 스위치 버튼을 눌러 활성화해줍니다.
1. USB케이블을 이용해 스마트폰을 컴퓨터에 연결합니다.
1. 안드로이드 스튜디오 창 상단 툴바에서 [Available devices] 목록 버튼을 클릭한 후 [Run on multiple devices]를 클릭합니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-34.png)
1. [Available devices] 목록에 나타난 스마트폰 이름을 선택하고 [Run] 버튼을 클릭하면 스마트폰에 앱이 설치된 후 실행됩니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-35.png)

#### 1-5. 개발을 도와주는 유용한 기능
- 자동저장
  - 작성한 코드는 실시간으로 저장되기에 따로 저장할 필요가 없습니다. 자동 저장 옵션은 메인 메뉴의 [File] - [Settings] 를 선택하면 나타나는 세팅 창의 [System Settings] 에서 선택 또는 해제할 수 있습니다. 가급적 자동 저장 옵션은 체크된 상태로 사용합니다.
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-36.png)

#### 1-6. 앱 만들어 실행하기 : Say! Hello~

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-37.png)

- 1단계 : 프로젝트 생성하기
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-38.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-39.png)
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-40.png)

- 2단계 : 레이아웃 편집하기
  - ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-41.png)
  - {% capture b %} **화면을 그려주는 함수 setContentView** <br>코드 편집기 창을 보면 setContentView(R.layout.activity_main)라는 코드가 보입니다. 이는 ‘콘텐츠를 화면에 표시하기 위해 res/layout 디렉토리 아래에 있는 activity_main.xml 파일을 사용한다.’라는 의미  {% endcapture %} 
    <div class="notice--danger">
      {{ b | markdownify | remove: "<p>" | remove: "</p>"}}
    </div>
    <br>
    ```kotlin
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    ```
  1. 디자인 모드를 선택하는 아이콘을 클릭하여 [Design] 모드로 변경합니다. 좌측 상단의 팔레트 (Palette) 영역에 있는 커먼 (Common) 카테고리를 클릭합니다. 그리고 우측에 보이는 버튼 (Button)을 드래드하여 화면의 중앙 ‘Hello World!’ 라는 글자 아래에 가져다 놓습니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-42.png)

  1. 버튼이 클릭 된 상태라면 다음 그림과 같이 다른 요소들과 연결할 수 있는 컨스트레인트 (Constraint) 편집기가 화면 우측에 나타납니다.

  1. Constraint editor 위쪽에 있는 [＋]를 더블클릭하면 ‘Hello World!’ 가 쓰여 있는 텍스트뷰 (TextView) 에 버튼의 레이아웃이 연결되고, 편집화면이 다음의 우측 그림과 같이 바뀝니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-43.png)
  
  1. 이번에는 모드가 가로세로로 변경될 때 테스트뷰와 버튼이 어떻게 적용되는지 확인하기 위해서 편집 화면을 회전해 보겠습니다. 편집기 상단의 [회전 아이콘]을 클릭하면 나타나는 바로가기 메뉴에서 [Landscape] 를 선택해 화면을 가로로 전환합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-44.png)

  1. 연결이 잘 되었다면 화면이 가로 모드로 변해도 버튼이 화면의 중앙에 위치합니다. 다시 [회전] 아이콘을 클릭해 바로 가기 메뉴에서 [Portrait]를 서택해 화면을 세로로 돌려 놓습니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-45.png)

  1. Constraint editor의 좌우 숫자를 클릭해서 값을 ‘0’으로 변경합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-46.png)

  1. 그리고 사각형 안쪽에 있는 ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-47.png) 를 클릭합니다. 연속으로 클릭하면 세 가지 모드로 변경할 수 있습니다. 계속 클릭해서 주름 모양 ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-48.png) 으로 변경하면 다음 우측 그림과 같이 버튼이 좌우로 화면에 꽉 찬 형태로 변경됩니다.
  {% capture c %}**컨스트레인트의 세가지 모드**<br><br>* Wrap Content(![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-47.png)) : 위젯의 안쪽의 내용물 (주로 텍스트)에 크기를 맞춥니다<br>* Fixed(![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-49.png)) : 가로세로 속성 필드에 입력된 크기에 맞게 가로세로를 고정합니다.<br>* Match Constraint(![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-48.png)) : 크기를 제약 조건인 Constraint 연결부에 맞춥니다.
  {% endcapture %} 
  <div class="notice--danger">
      {{ c | markdownify | remove: "<p>" | remove: "</p>"}}
  </div>  
  <br>
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-50.png)

  1. 이제 버튼과 텍스트뷰 위젯의 아이디를 변경하고 코드와 연결할 준비를 합니다. 먼저 버튼을 클릭하고 속성(Attributes) 영역 가장 위에 있는 id 입력 필드에 ‘btnSay’라고 입력합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-51.png)

  1. ‘Hello World!’라고 쓰여 있는 텍스트뷰를 클릭하고 id 속성에 ‘textSay’라고 입력합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-52.png)


#### 1-6. 코틀린 코드와 레이아웃 연결하기

뷰에서 버튼같은 요소를 동작시키기 위해서는 먼저 뷰와 소스 코드를 연결해야 하는데, 안드로이드는 findViewById라는 함수를 제공하고 있으며 이를 조금 효율적으로 사용하기 위해서 코틀린에서는 코틀린 익스텐션 (Kotlin extension) 이라는 부가 기능을 제공해 왔습니다. 하지만 코틀린 익스텐션은 다음과 같은 이유로 최신 버전의 안드로이드 스튜디오에서는 사용을 권장하지 않습니다.
  - 코틀린에서만 제공하므로 자바에서는 사용할 수 없습니다.
  - 일부 상황에서 뷰를 찾을 수 없는 오류가 발생합니다.
  - 어디서나 뷰를 호출할 수 있기 때문에 잘못된 참조로 인해 앱이 강제 종료될 수 있습니다. 예를 들어 activity_main.xml와 fragment_sub.xml 에서 동일하게 button 아이디를 사용하면 실수로 다른 XML 의 아이디를 참조하여 앱이 강제로 종료될 수 도 있습니다.
  - 모듈화를 추천하고 있는데 코틀린 익스텐션을 사용할 경우 다른 모듈에서 뷰에 대한 접근이 불가능합니다.

여기에서는 코틀린 익스텐션 대시에 뷰 바인딩 방식을 사용해서 뷰와 코드를 연결하는 방법을 공부합니다.
  1. build.gradle 파일에 viewBinding 설정을 추가합니다.\
      ```kotlin
      viewBinding true
      ```
  1. 안드로이드 스튜디오 상단에 나타나는 [Sync Now] 버튼을 클릭해서 설정을 적용합니다.
  1. activity_main.xml 레이아웃 파일을 작성합니다.
  1. viewBinding이 설정되어 있기 때문에 안드로이드 레이아웃 파일을 바인등으로 생성합니다.
    - 자동변환 공식 : 레이아웃파일명 (첫 글자와 언더바 다음 영문을 대문자로 변환 ) + Binding
    - 예) activity_main.xml = ActivityMainBinding 
  1. MainActivity.kt 파일에 있는 코틀린 코드에서 클래스로 변환된 바인딩의 inflate 함수로 초기화하고 변수에 저장합니다.<br>
    ```kotlin
    val 변수 = ActivityMainBinding.inflate(layoutInflater)
    ```
  1. 이어서 변수에 저장된 바인딩의 root 뷰를 setContentView에 전달합니다.<br>
    ```kotlin
    setContentView(변수.root)
    ```
  1. 바인딩을 도트 연산자(.)로 뷰의 id에 접근 후 사용합니다.<br>
    ```kotlin
    변수.textView = "Hello"
    ```

실습)
  1. 먼저 스튜디오 좌측 프로젝트 영역에서 Gradle Scripts 아래에 있는 build.gradle (Module : 프로젝트명.app) 파일을 더블클릭해서 열고, android{} 코드 영역 바로 아래에 다음 그림과 같이 viewBinding true설정을 추가합니다. 설정을 추가하고 나면 스튜디오 우칙 상단에 [Sync Now]가 나타나는데 클릭해서 설정을 완료합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-53.png)

  1. [MainActivity.kt] 탭을 클릭해서 파일을 열고 소스 코드를 편집합니다. onCreate() 함수 코드 블럭({}) 안에서 setContentView 줄 위에 레이아웃 파일명인 activity_main의 단어 첫 글자를 대문자로 바꿔서 ActivityMain이라고 입력하면 다음과 같은 모드 자동완성이 나타납니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-54.png)

  1. ActivityMainBinding을 추가한 뒤 소스 코드의 class 선언부 위쪽을 보면 다음과 같이 import가 자동으로 추가되어 있습니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-55.png)

  1. ActivityMainBinding을 다음과 같이 수정해서 뷰 바인딩을 사용할 준비를 합니다. ActivityMainBinding이 가지고 있는 inflate 함수에 layoutInflater를 입력한 후 binding변수에 저장합니다. layoutInflater는 모든 Activity에서 호출해서 사용할 수 있습니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-56.png)

  1. 바로 다음 줄에 있는 setContentView에 입력되어 있는 R.layout.activity_main을 삭제하고 binding.root를 대신 입력하면 화면 안의 버튼을 사용할 수 있습니다.<br>
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-57.png)

  1. binding 변수를 통해 뷰에 미리 작성해 두었던 버튼의 id에 접근할 수 있습니다. 다음과 같이 버튼의 id에 리스너(Listener)를 설정합니다.

  ```kotlin
  package kr.co.hanbit.sayhello

  import androidx.appcompat.app.AppCompatActivity
  import android.os.Bundle
  import kr.co.hanbit.sayhello.databinding.ActivityMainBinding

  class MainActivity : AppCompatActivity() {
      override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)

          var binding = ActivityMainBinding.inflate(layoutInflater);

          setContentView(binding.root);
          binding.btnSay.setOnClickListener {
              binding.textSay.text = "Hello Kotlin!!!";
          }
      }
  }
  ```

#### 1-7. 앱 실행하기

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-58.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-59.png)





### ✔ 2. 코틀린 사용을 위한 기본 문법
{: .wood-text}

‘코딩 준비하기’의 핵심 키워드는 로그 (Log)와 로그캣 (Logcat) 입니다.
Log 클래스에서 주로 사용하는 다섯 가지 함수 v (verbose), i (information), d (debug), w (warning), e (error) 의 사용방법을 알아보겠습니다.

#### 2-1. 새 프로젝트 생성하기

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-60.png)

![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-61.png)

#### 2-2. 로그의 활용

```kotlin
Log.d("태그", "출력 메시지")
```

  1. 먼저 소스 코드를 작성해서 로그를 안드로이드 스튜디오 내에 있는 로그캣 창에 출력해보겠습니다. MainActivity.kt 파일을 열고 다음 코드를 setContentView... 밑에 입력합니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-62.png)

  1. 코드를 추가하면 ‘Log’라는 글자가 빨간색으로 나타나는데 Log 글자를 클릭하면 다음과 같은 메시지가 나타납니다. 아직 Log 클래스를 import 하지 않았기 때문에 나타나는 메시지 입니다. ‘Alt + Enter’ 키를 누르면 상단에 필요한 import 문구가 자동으로 생성됩니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-63.png)

  1. 소스 코드 상단에 import android.util.Log가 추가됩니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-64.png)

  1. 에뮬레이터를 실행

  1. 안드로이드 스튜디오 하단의 [Logcat] 탭을 클릭해서 창을 열어봅니다. 로그 내용이 많은데, 소스 코드의 Log.d 함수에 입력했던 태크 ‘BasicSyntax’ 를 로그 영역 상단에 있는 돋보기 표시의 검색창에 입력하면 해당 로그만 볼 수 있습니다.
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-65.png)
 
- 로그 (Log) : 코딩을 할 때 코드의 흐름을 파악하기 위해 앱 외부에 출력하는 정보입니다. 디버거를 사용할 수도 있지만 매법 디버깅할 포인트를 지정해야 하는 불편함이 있는 반면, 로그를 사용하면 한 번 설정으로 항상 해당 코드의 흐름을 확인할 수 있습니다.
- 로그캣 (LogCat) : 출력되는 로그를 모아서 보는 도구입니다. 내가 작성한 앱의 로그만 볼 수도 있고, 태그를 잘 황용하면 해당 태그를 필터로 사용해서 특정 로그만 확인할 수도 있습니다.

| 함수 | 의미 | 내용 |
| --- | --- | --- |
| Log.v() | verbose | 상세한 로그 내용을 출력하기 위해 사용 |
| Log.d() | debug | 개발에 필요한 내용을 출력하기 위해 사용 |
| Log.i() | information | 정보성 일반적인 메시지 전달을 위해 사용 |
| Log.w() | warning | 에러는 아니지만 경고성 메시지 전달을 위해 사용 |
| Log.e() | error | 에러 메시지를 출력하기 위해 사용 |

#### 2-3. 변수

변수란 값을 임시로 메모리에 저장하고 그 저장 공간에 이름을 부여한 것

- 첫째, 변수 선언과 동시에 값 넣기
  - var myName = "홍길동"

- 둘째, 값으로 추기화하지 않고 선언만 하고 사용하기
  - var myAge: Int
  - myAge = 27

- 데이터 타입
  - 코틀린에서 제공되는 기본 데이터 타입은 다음과 같다
  - | 데이터 타입 | 설명 | 값의 범위 및 예 |
    | --- | --- | --- |
    | Double | 64비트 실수 | -1.7E+308의 근삿값 ~ 1.7E+308의 근삿값 |
    | Float | 32비트 실수 | -3.4E+38의 근삿값 ~ 3.4E+38의 근삿값 |
    | Long | 64비트 정수 | -2E63 ~ 2E63-1 |
    | Int | 32비트 정수 | -2,147,483,648 ~ 2,147,483,647 |
    | Short | 16비트 정수 | -32,768 ~ 32,767 |
    | Byte | 8비트 정수 | -128 ~ 127 |
    | Char | 1개 문자 | ‘글’ (외따음표) |
    | Strig | 복수문자 | "여러글자입니다." |
    | Boolean | true, false | true 또는 false |

- Basic Syntax 프로젝트 수정 타입 출력해보기
  ![](/assets/images/me/2021-05-29-me-book-thisIsAnroid-66.png)