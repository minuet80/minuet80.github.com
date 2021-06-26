---
layout: post
title:  "[IT] - [BOOK] 4강 - 이것이 안드로이드다 with 코틀린 "
description: 화면 구성하기
date:   2021-05-30 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android4/
width: large
---

* some text
{: toc}

# 1. 액티비티
액티비티는 사용자가 직접 보고 입력하는 화면을 담당하는 컴포넌트입니다.
메이저 컴포넌트 중 하나인 액티비티를 다루기 위해서는 먼저 컴포넌트를 구성하고 있는 핵심 요소인 ``컨텍스트``에 대한 이해가 선행되어야 합니다.

## 1.1 컨텍스트란?
앞으로 사용할 액티비티, 서비스 등의 컴포넌트와 스피너, 리사이클러뷰와 같은 화면 요소를 사용하기 위해서는 컨텍스트가 필요합니다.

컨텍스트<sup>Context</sup>는 시스템을 사용하기 위한 정보(프로퍼티)와 도구(메서드)가 담겨 있는 클래스입니다.
대부분의 컨텍스트는 컴포넌트 실행<sup>Runtime</sup>시 함께 생성되고, 생성된 컴포넌트가 가지고 있는 메서드를 호출해서 각각의 도구들을 사용할 수 있습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-126.png){: style="box-shadow: 0 0 5px #777"}

안드로이드에서의 컨텍스트는 앱을 실행하기 위해 잘 짜여진 설계도의 개념으로 앱에서는 사용하는 기본 기능이 담겨 있는 기본 클래스<sup>Base Class</sup>입니다.
액티비티는 컨텍스트를 상속받아 구현합니다.

액티비티 처럼 컨텍스트를 상속받은 컴포넌트들은 코드상에서 baseContext를 호출하는 것만으로 안드로이드의 기본 기능을 사용할 수 있습니다.
예로 액티비티 안에서 startActivity() 메서드를 통해 다른 액티비티를 호출할 수 있는 것도 모든 액티비티가 startActivity()가 설계되어 있는 컨텍스트를 상속바당서 구현되어 있기 때문입니다.

### 컨텍스트의 종류

1. Application Context : 앱을 통틀어 하나의 인스턴스만 생성됩니다. ``액티비티``나 ``서비스`` 같은 컴포넌트에서 applicationContext를 직접 호출해서 사용할 수 있는데 호출하는 지점과 관계없이 모두 동일한 컨텍스트가 호출됩니다.

1. Base Context : 안드로이드 4대 메이저 컴포넌트인 ``액티비티``, ``서비스``, ``컨텐트 프로바이더``, ``브로드캐스트리시버``의 기반 클래스입니다. 각각의 컴포넌트에서 baseContext 또는 this로 컨텍스트를 사용할 수 있고 컴포넌트의 개수만큼 컨텍스트도 함께 생성되기 때문에 호출되는 지점에 따라 서로 다른 컨텍스트가 호출됩니다.


### 컴포넌트별 컨텍스트의 기능
![1]({{site.baseurl}}/images/this-is-android/this-is-android-127.png){: style="box-shadow: 0 0 5px #777"}


## 1.2 인텐트
액티비티를 실행하기 위해서는 단순히 컨텍스트가 제공하는 메서드를 호출하면 되는데, 이때 실행할 액티비티가 명시된 인텐트<sup>Intent</sup>를 해당 메서드에 전달해야 합니다.
액티비티를 실행하려면 기본적으로 인텐트가 필요하지만, 프로젝트를 생성할 때 함께 만들어지는 MainActivity는 특별한 설정을 하지 않아도 안드로이드에 자동으로 등록되고 실행됩니다.
하지만 MainActivity외에 다른 액티비티를 사용할 때는 인텐트에 새 액티비티의 이름을 담아서 시스템에 전달합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-128.png){: style="box-shadow: 0 0 5px #777"}

1. 실행할 대상의 액티비티 이름과 전달할 데이터를 담아서 인텐트를 생성합니다.
1. 생성한 인텐트를 startActivity() 메서드에 담아서 호출하면 액티비티 매니저가 전달합니다.
1. 액티비티 매니저는 인텐트를 분석해서 액티비티를 실행시킵니다.
1. 전달된 인텐트는 최종 목적지인 타깃 액티비티까지 전달됩니다.
1. 타깃 액티비티에서는 전달받은 인텐트에 데이터가 있다면 이를 꺼내서 사용할 수 있습니다.


## 1.3 새 액티비티 만들고 실행하기

1. [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하여 나타나는 메뉴에서 [New] - [Activity] - [Empty Activity] 를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-129.png){: style="box-shadow: 0 0 5px #777"}

1. 액티비티 생성 창의 Activity Name에 ‘SubActivity’라고 입력하면 Layout name은 자동적으로 ‘activity_sub’라고 입력됩니다. 액티비티명은 ``낙타표기법<sup>Camel-Case</sup>``을 사용합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-130.png){: style="box-shadow: 0 0 5px #777"}
  - Launcher Activity : ``Launcher Activity 를 체크``하면 안드로이드 설정 파일인 AndroidManifest.xml 에 런처로 등록되어 프로그램 실행 시 가장 먼저 호출되도록 설정됩니다.

1. 생성된 activity_sub.xml 파일을 열고 화면 상단에 텍스트뷰를 하나 가져다 놓고 속성 영역의 text 속성에 ‘서브 액티비티’라고 입력합니다.


### 메인 액티비티 화면 구성하기

1. ‘Hello World!’가 적힌 텍스트뷰의 text속성에 ‘메인 액티비티’라고 입력합니다. 컨스트레인트는 세방향을 연결하고 아래쪽은 해제한 다음 ‘서브 액티비티’와 같은 위치에 배치합니다. 속성 영역의 Layout 에서 상단 숫자를 같게 입력하면 같은 위치가 됩니다.

1. 버튼을 텍스트뷰 아래에 가져다 놓고 위쪽 컨스트레인트를 텍스트뷰에 연결하고 좌우는 화면의 가장자리에 연결합니다. 버튼의 id속성에는 ‘btnStart’, text속성에는 ‘서브 액티비티 실행’이라고 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-131.png){: style="box-shadow: 0 0 5px #777"}


### 메인 액티비티에서 서브 액티비티 실행하기

1. build.gradle 파일에 viewBinding을 설정하고 [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다.  그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.
    ```kotlin
    package kr.co.hanbit.activity

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.activity.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            
        }
    }
    ```

1. setContentView(binding.root) 아래에 다음 코드를 추가해 인텐트를 생성합니다. 인텐트를 생성할 때 호출할 클래스 뒤에 ``‘::class.java’``라고 정확하게 입력해야 합니다.
```kotlin
val intent = Intent(this, SubActivity::class.java)
```

1. Intent 부분이 또 빨간색으로 보일 겁니다. 이때는 ``Alt + Enter`` 키를 눌러 [Import]를 선택합니다.

1. 이어서 버튼이 id인 ‘btnStart’를 입력하고 import한 후에 클릭리스너를 달아줍니다.
```kotlin
binding.btnStart.setOnClickListener { }
```

1. 클릭리스너 코드 블록 안에서 startActivity() 메서드를 호출하면서, 01에서 미리 만들어둔 인텐트를 값으로 넘겨줍니다
```kotlin
binding.btnStart.setOnClickListener { startActivity(intent) }
```

1. 에뮬레이터에서 실행하면 메인 액티비티 화면에 실행 버튼이 보입니다. 버튼을 클릭하면 서비 액티비티가 실행됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-132.png){: style="box-shadow: 0 0 5px #777"}

## 1.4 액티비티 사이에 값 주고받기
액티비티와 같은 컴포넌트는 인텐트에 실행 메시지도 전달하지만 인텐트를 통해 데이터도 주고받을 수 있습니다.
인텐트 내부에는 번들<sup>Bundle</sup>이라는 데이터 저장 공간이 있는데, 이 번들에 데이터를 담아서 주고받을 수 있습니다.

1. 인텐트를 생성하는 ``val intent = ...`` 와 ``binding.btnStart...`` 코드 사이에 ``putExtra()`` 메서드를 사용해서 인텐트에 값을 전달하는 코드를 추가합니다.
    ```kotlin
    val intent = Intent(this, SubActivity::class.java)
    intent.putExtra("from1", "Hello Bundle")
    intent.putExtra("from2", 2021)
    ```

1. 값을 받는 측의 코드를 작성하기 전에, 전달받은 값을 출력할 텍스트뷰 2개를 화면에 배치하겠습니다. activity_sub.xml 을 열고 텍스트뷰 2개를 화면에 배치합니다. 다음 그림처럼 첫 번째 텍스트뷰는 화면 좌측에 위치시키고 id와 text속성에 모두 ‘to1’이라고 입력합니다. 두번째 텍스트뷰는 화면 우측에 위치시키고 id와 text속성에 모두 ‘to2’라고 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-133.png){: style="box-shadow: 0 0 5px #777"}

1. SubActivity.kt 파일을 열고 binding 을 생성한 후 setContentView 에 binding.root를 전달합니다. SubActivityt에서 사용하는 레이아웃 파일의 이름이 activity_sub.xml이기 때문에 바인딩도 ActivitySubBinding이 됩니다.
    ```kotlin
    package kr.co.hanbit.activity

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.activity.databinding.ActivitySubBinding

    class SubActivity : AppCompatActivity() {

        val binding by lazy { ActivitySubBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
            
        }
    }
    ```

1. setContentView 아래에 다음 코드를 추가합니다. 먼저 텍스트뷰와 연결하기 위해 ‘to1’을 입력하고 ``Enter`` 키를 눌러 [Import]를 선택합니다. 상단에 새로운 Import가 추가됩ㄴ다ㅣ 다음으로 to1의 text에 인텐트에 담겨온 값을 from1키로 꺼내서 입력합니다.인텐트에 담겨온 값이 문자열이기 때문에 문자열을 꺼내는 getStringExtra() 메서드를 사용해야 합니다.
    ```kotlin
    binding.to1.text = intent.getStringExtra("from1")
    ```  

    - ``intent는 액티비티의 기본 프로퍼티``
      - intent가 액티비티의 기본 프로퍼티이기 때문에 전달된 인텐트는 intent로 바로 호출해서 사용할 수 있습니다.

1. 전달받은 인텐트에서 from2도 같은 방법으로 꺼내서 to2의 text에 입력합니다. from2에 전달 값의 타입이 숫자이기 때문에 getIntExtra() 메서드를 사용합니다. getIntExtra() 메서드는 파라미터를 2개 가지고 있는데, 두 번째 파라미터는 일단 ‘0’이라고 입력해둡니다.
    ```kotlin
    binding.to2.text = intent.getIntExtra("from2", 0)
    ```
    그런데 입력해 보면 intent.getInt... 로 시작하는 코드에 빨간색 밑줄이 생깁니다. 텍스트뷰의 text속성은 문자열만 받을 수 있는데 숫자 값이 입력되었기 때문입니다. 쌍따옴표("") 로 감싸고 문자열 템플릿 (${}) 을 사용해서 문자열로 변환해줍니다.
    ```kotlin
    binding.to2.text = "${intent.getIntExtra("from2", 0)}"
    ```

    - ``getIntExtra() 메서드의 두 번째 파라미터는 기본값``
      - getIntExtra() 메서드에 입력되는 두 번째 값은 from2 키로 값을 꺼냈는데 아무런 값도 전달되지 않았을 경우 디폴트로 사용할 기본값을 설정하는 파라미터입니다.

1. 에뮬레이터에서 실행한 다음 결과를 확인합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-134.png){: style="box-shadow: 0 0 5px #777"}<br><br>
    여기까지 MainActivity.kt 코드
    ```kotlin
    package kr.co.hanbit.activity

    import android.content.Intent
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.activity.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val intent = Intent(this, SubActivity::class.java)
            intent.putExtra("from1", "Hello Bundle")
            intent.putExtra("from2", 2021)

            binding.btnStart.setOnClickListener{ startActivity(intent) }
        }
    }
    ```
    여기까지 SubActivity.kt 코드
    ```kotlin
    package kr.co.hanbit.activity

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.activity.databinding.ActivitySubBinding

    class SubActivity : AppCompatActivity() {

        val binding by lazy { ActivitySubBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.to1.text = intent.getStringExtra("from1")
            binding.to2.text = "${intent.getIntExtra("from2", 0)}"
        }
    }
    ```



### 메인 엑티비티에서 값 돌려받기







<style>
.page-container {max-width: 1200px}‘’
</style>
