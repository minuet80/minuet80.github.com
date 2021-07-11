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

1. activity_sub.xml 파일을 열고 to1 텍스트뷰 아래에 플레인텍스트 (EditText)를 하나 추가하고 컨스트레인트를 연결합니다. id 속성에는 ‘editMessage’, hint 속성에는 ‘전달할 메시지를 입력하세요’라고 입력하고, text 속성값은 지웁니다.

1. 플레인텍스트 하단에 버튼을 하나 추가하고 오른쪽 그림을 참고해서 컨스트레인트를 연결합니다. 버튼의 id속성에는 ‘btnClose’, text속성에는 ‘액티비티 닫기’를 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-135.png){: style="box-shadow: 0 0 5px #777"}

1. 서브 액티비티가 종료될 때 자신을 호출했던 액티비티로 값을 돌려주는 코드를 추가하겠습니다. SubActivity.kt 파일을 열고 onCreate() 메서드 안에 ‘btnClose’를 입력한 후에 클릭리스너를 달아줍니다.<br>
    ```kotlin
    binding.btnClose.setOnClickListener {
        
    }
    ```

1. 리스너 블록 안에 호출한 메인 액티비티에 돌려줄 인텐트를 하나 생성하고 변수에 저장합니다. 돌려줄 때는 대상을 지정하지 않아도 되므로 Intent 안에는 아무것도 담지 않습니다. 앞서 비워둔 행에 다음 코드를 입력합니다. Intent 에 다시 빨간색 밑줄이 생길 겁니다. ``Alt`` + ``Enter``키를 눌러 import 합니다. 
    ```kotlin
    val returnIntent = Intent()
    ```

1. 앞에서 생성한 returnIntent에 editMessage의 값을 담는 코드를 다음 줄에 입력합니다.
    ```kotlin
    val returnIntent = Intent()
    returnIntent.putExtra("returnValue", binding.editMessage.text.toString())
    ```

1. returnIntent와 상태 값을 setResult() 메서드에 담아서 실행하면 호출한 측으로 전달됩니다. 상태 값은 RESULT_OK와 RESULT_CANCELED로 안드로이드에 이미 상수로 정의되어 있습니다. 처리한 결괏값에 따라 성공이면 OK를, 실패하거나 취소되었으면 CANCELED을 사용하면 됩니다. setResult() 메서드의 첫 번째 파라미터가 상태 값, 두 번째가 전달하려는 인텐트입니다.
    ```kotlin
    setResult(RESULT_OK, returnIntent)
    ```

1. 이어서 finish() 메서드를 호출하면 서브 액티비티가 종료되면서 메인 액티비티에 값이 전달됩니다.
    ```kotlin
    finish()
    ```
    다음은 지금까지 작성한 SubActivity.kt코드입니다.
    ```kotlin
    package kr.co.hanbit.activity

    import android.content.Intent
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

            binding.btnClose.setOnClickListener {
                val returnIntent = Intent()
                returnIntent.putExtra("returnValue", binding.editMessage.text.toString())
                setResult(RESULT_OK, returnIntent)
                finish()
            }
        }
    }
    ```

1. MainActivity.kt 안에 SubActivity에서 돌려준 값을 받는 코드를 추가합니다. onCreate() 메서드의 블록 밖을 클릭한 후 ``Ctrl`` + ``O``키를 누릅니다. 메서드 목록 중에서 onActivityResult를 선택하고 [OK]버튼을 클릭하면 코드가 자동으로 생성됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-136.png){: style="box-shadow: 0 0 5px #777"}<br>
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
    }
    ```
    - onActivityResult() 메서드 구조
      - ``requestCode`` : 호출 시에 메인 액티비티에서 입력하는 코드 ``startActivityForResult`` 메서드에 인텐트와 함께 입력해서 호출한 코드를 구분합니다.
      - ``resultCode`` : 결과 처리 후 서브 액티비티에서 입력하는 코드, 앞에서 RESULT_OK를 담아서 보냈습니다.
      - ``data`` : 결과 처리 후 서브 액티비티가 넘겨주는 인텐트가 담겨 있습니다.

1. onActivityResult() 메서드 안에 서브 액티비티에서 돌려받은 resultCode가 정상인지 체크하는 코드를 추가합니다.
    ```kotlin
    if (resultCode == RESULT_OK) {

    }
    ```

1. 정상이라면 돌려받은 인텐트에서 메시지를 꺼내 변수에 저장해둡니다.
    ```kotlin
    val message = data?.getStringExtra("returnValue")
    ```

1. 해당 메시지를 토스트(Toast)로 화면에 보여주는 코드를 작성합니다. 토스트는 화면에 잠깐 나타났다 사라지는 메시지 출력 도구입니다. 메서드의 닫는 괄호()) 다음에 반드시 .show() 를 호출해야지만 화면에 나타납니다. <br>
    ```kotlin
    Toast.makeText(this, messsage, Toast.LENGTH_LONG).show()
    ```
    - Toast.makeText의 파라미터
      - ``첫번째 파라미터`` : 화면을 위한 기본 도구인 컨텍스트가 필요한데, 액티비티가 이미 가지고 있습니다. this라고 입력하면 됩니다.
      - ``두번째 파라미터`` : 출력될 메시지를 문자열로 전달합니다.
      - ``세번째 파라미터`` : 메시지가 얼마동안 출력될지를 결정합니다. LENGTH_LONG과 LENGTH_SHORT가 있습니다.

    지금까지 추가한 MainActivity.kt의 onActivityResult() 메서드 코드입니다.
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (resultCode == RESULT_OK)
        {
            val message = data?.getStringExtra("returnValue")
            Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        }
    }
    ```

1. 여기까지 작성하고 에뮬레이터에서 실행한 후 액티비티 닫기 버튼을 클릭해보세요. 그런데 서브 액티비티는 닫히지만 받는 메인 액티비티에는 아무런 변화가 없습니다. startActivity() 메서드로 실행된 액티비티에서는 값을 돌려받을 수 없기 때문입니다. 메인 액티비티에서 서브 액티비티를 호출한 후 값을 돌려받고 싶을 때는 startActivityForResult() 메서드를 사용해야만 합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-137.png){: style="box-shadow: 0 0 5px #777"}


### startActivityForResult() 메서드 사용하기

1. 이어서 MainActivity.kt의 onCreate() 메서드 코드 블록 안에 있는 클릭리스너에서 호출하는 startActivity() 메서드를 startActivityForResult() 로 변경하고 첫 번째 인텐트와 함께 두번째 파라미터는 임시로 ‘99’라는 값을 입력합니다. 두 번째 파라미터는 메인 액티비티에서 서브 액티비티를 호출하는 버튼이 여러 개 있을 때 어떤 버튼에서 호출된 것인지를 구분하는 용도입니다.<br>

    **변경전**
    ```kotlin
    binding.btnStart.setOnClickListener { startActivity(intent) }
    ```
    **변경후**
    ```kotlin
    binding.btnStart.setOnClickListener { startActivityForResult(intent, 99) }
    ```

1. onActivityResult() 메서드 안에 작성한 코드에 when 문을 추가해서 requestCode가 요청코드와 같은 99인지 체크합니다. if 문을 사용해도 되지만 케이스가 다양할 수 있기 때문에 when문을 사용하는게 좋습니다.
```kotlin
if (resultCode == RESULT_OK) {
    when (requestCode) {
        99 -> {
            val message = data?.getStringExtra("returnValue")
            Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        }
    }
}
```

1. 전체 코드<br>
    **MainActivity.kt**
    ```kotlin
    package kr.co.hanbit.activity

    import android.content.Intent
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.widget.Toast
    import kr.co.hanbit.activity.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val intent = Intent(this, SubActivity::class.java)
            intent.putExtra("from1", "Hello Bundle")
            intent.putExtra("from2", 2021)

            binding.btnStart.setOnClickListener{ startActivityForResult(intent, 99) }
        }

        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)

            if (resultCode == RESULT_OK) {
                when (requestCode) {
                    99 -> {
                        val message = data?.getStringExtra("returnValue")
                        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }
    ```
    **SubActivity.kt**
    ```kotlin
    package kr.co.hanbit.activity

    import android.content.Intent
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

            binding.btnClose.setOnClickListener {
                val returnIntent = Intent()
                returnIntent.putExtra("returnValue", binding.editMessage.text.toString())
                setResult(RESULT_OK, returnIntent)
                finish()
            }
        }
    }
    ```

## 1.5 액티비티 생명 주기
안드로이드 앱이 실행된 후 다른 액티비티 화면으로 전환되거나, 스마트폰 화면이 꺼지거나, 혹은 앱이 종료될 때와 같이 상태 변화가 있을 때마다 화면에 보여지는 액티비티의 생명 주기 메서드를 호출하여 상태 변화를 알려줍니다.

### 액티비티 생명 주기 메서드

| 호출된 메서드 | 액티비티 상태 | 설명 |
| --- | --- | --- |
| onCreate() | 만들어짐 | 액티비티가 생성 |
| onStart() | 화면에 나타남 | 화면에 보이기 시작 |
| onResume() | 화면에 나타남<br>현재 실행중 | 실제 액티비티가 실행되고 있음 |
| onPause() | 화면이 가려짐 | 액티비티 화면의 일부가 다른 액티비티에 가려짐 |
| onStop() | 화면이 없어짐 | 다른 액티비티가 실행되어서 화면이 완전히 가려짐 |
| onDestroy() | 종료됨 | 종료됨 |
{: .table .table-striped .table-hover}

이 메서드들은 다음처럼 override를 통해서 사용합니다. 편의상 01번 부터 행 번호를 붙여서 설명합니다.
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
}

override fun onStart() {
    super.onStart()
}

override fun onResume() {
    super.onResume()
}

override fun onPause() {
    super.onPause()
}

override fun onStop() {
    super.onStop()
}

override fun onDestroy() {
    super.onDestory()
}
```

생명 주기 메서드 안에서 상태 변화에 대응할 수 있을데, 이런 생명 주기 메서드를 사용하는 대표적인 예로는 동영상 플레이어가 있습니다.

메인 액티비티에서 동영상을 실행하고 있을 때 서브 액티비티로 화면이 전환된다면 메인 액티비티의 onPause() 또는 onStop() 메서드 안에 동영상을 정지시키는 코드를 작성해둬야 합니다.

그렇지 않으면 그만큼의 자원(배터리, 네트워크 트래픽 등이) 낭비되기 때문입니다.

```kotlin
override fun onPause() {
    super.onPause()
    videoView.stopPlayBack()
}
```

### 생명 주기 콜백의 이해
액티비티는 인스턴스 생성과 동시에 관련된 생명 주기 메서드가 순차적으로 호출됩니다.

그리고 finish() 메서드나 뒤로가기 액티비티를 종료하면 소멸과 관련된 생명 주기 메서드가 순차적으로 호출됩니다. 

1. 먼저 액티비티를 생성해서 화면에 나타내는 생명 주기를 살펴봅니다. 액티비티는 onCreate() 메서드로 생성된 다음 화면 구성 요소를 메모리에 로드하고, onStart() 와 onResume() 에서 화면의 구성요소를 나타내고 사용자와의 상호작용을 시작합니다. onResume() 메서드 다음의 상태 표시인 Resumed(실행 중) 는 액티비티가 화면에서 실행되고 있음을 나타냅니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-138.png){: style="box-shadow: 0 0 5px #777"}

1. 다음으로 액티비티를 화면에서 제거하는 생명 주기를 살펴봅니다. 액티비티를 벗어나게 되면 소멸과 관련된 생명주기가 시작되는데 뒤로가기를 하거나 finish() 메서드로 액티비티를 종료하면 onPause() 와 onStop() 이 동시에 실행되고, 최종적으로 onDestroy() 가 호출되면서 액티비티가 메모리에서 제거됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-139.png){: style="box-shadow: 0 0 5px #777"}

1. 새로운 액티비티가 생성될 때 현재 액티비티의 생명 주기를 살펴봅니다. 액티비티를 종료하지 않고 현재 액티비티에서 새로운 액티비티를 실행하면 현재 액티비티의 생명주기가 onPause()를 거쳐서 onStop()까지만 호출되고 종료되지는 않습니다. 그리고 새로 생성된 액티비티는 onStart()와 onResume()을 연속적으로 호출한 후 실행 상태가 됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-140.png){: style="box-shadow: 0 0 5px #777"}

1. 새로운 액티비티가 현재 액티비티를 모두 가리지 않고 생성될 때 현재 액티비티의 생명 주기를 살펴봅니다. 현재 액티비티에서 실행되는 새로운 액티비티가 반투명하거나 전체 화면이 아니라서 현재 액티비티의 영역이 1dp라도 화면에 표시되면 onPause()까지만 진행된 후 Paused상태에서 대기하고, 새로 생성됐던 액티비티가 종료되면 onStart()를 거치지 않고 바로 onResume() 이 호출됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-141.png){: style="box-shadow: 0 0 5px #777"}


### 액티비티 백스택
백스택<sup>Back Stack</sup>은 액티비티 또는 화면 컴포넌트를 담는 안드로이드의 저장 공간입니다. 액티비티 A에서 액티비티 B를 실행하고, 다시 액티비티 B에서 액티비티 C를 실행하면 다음 그림과 같이 마치 종이가 쌓이듯이 액티비티가 화면 (백스택)에 쌓이게 되고, 사용자는 가장 위에 있는 액티비티를 보게 됩니다.

### 태스크와 프로세스
태스크<sup>Task</sup>는 애플리케이션에서 실행되는 프로세스<sup>Process</sup>를 관리하는 작업 단위입니다. 안드로이드는 애플리케이션의 실행 단위로 프로세스를 사용하는데 먼저 애플리케이션의 실행 단위인 프로세스를 살펴보겠습니다. 다음 그림과 같이 하나의 앱을 만들고 실행하면 앱당 하나의 프로세스가 생성되고 액티비티를 처리합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-142.png){: style="box-shadow: 0 0 5px #777"}

안드로이드에서 태스크는 다른 프로세스의 액티비티를 함께 담을 수 있습니다. 안드로이드는 서로 다른 애플리케이션의 액티비티를 공유할 수 있는데 카메라와 갤러리 액티비티를 예로 들 수 있습니다.

카메라 기능을 간단히 코드로 호출해서 사용하면 실제로는 카메라 액의 독자적인 프로세스가 실행되고 카메라 액티비티 또한 카메라 앱의 프로세스에 의해 처리됩니다.

다음은 특정 앱의 액티비티에서 카메라를 사용할 때 인텐트를 시스템을 통해 카메라 앱에 전달하는 예제 코드입니다. 
```kotlin
class Activity_B: AppCompatActivity() {
    val REQ_CAMERA = 100
    // 중략...
    fun openCamera() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, REQ_CAMERA)
    }
}
```
- ``카메라 기능도 하나의 앱``
  - 짧은 코드로 호출해서 사용하는 카메라도 하나의 앱으로 안드로이드에 미리 만들어져 있습니다. 카메라를 호출한다는 것은 카메라의 액티비티 이름을 담은 인텐트를 안드로이드에 전달하는 것입니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-143.png){: style="box-shadow: 0 0 5px #777"}

카메라를 사용하기 위한 인텐트를 시스템으로 전달하면 카메라 액티비티가 다른 앱 (카메라도 하나의 독립적인 앱)이 있기 때문에 프로세스를 새로 생성합니다. 호출된 카메라 액티비티가 새로운 프로세스를 통해 동작하지만 하나의 작업 단위인 태스크로 묶입니다. 또한 마치 하나의 앱처럼 동일한 태스크로 묶이고 백스택에 쌓이게 됩니다.

같은 태스크의 백스택에 쌓이기 때문에 뒤로가기 버튼을 누르면 같은 앱의 액티비티처럼 백스택에서 제거되고, 홈 버튼을 누르면 마치 하나의 앱 처럼 전체가 백그라운드로 이동합니다.


### 액티비티 태스크 관리하기

액티비티 태스크는 두가지 방법으로 관리할 수 있습니다.

먼저 매니페스트의 설정으로 관리하는 방법을 살펴보겠습니다. 

태스크와 백스택으로 관리되는 액티비티는 설정 파일인 ``AndroidManifest.xml에 작성되는 <activity>태그 안에`` 다음 코드 처럼 속성으로 사용할 수 있습니다.
```xml
<activity android:name=".MainActivity" android:launchMode="singleInstance"></activity>
```

| 속성 | 설명 |
| --- | --- |
| launchMode | 호출할 엑티비티를 새로 생성할 것인지 재사용할 것인지를 결정합니다. 기본값은 항상 새로 생성하게 되어 있습니다.<br> 네 가지 모드: ``standard``, ``singleTop``, ``singleTask``, ``singleInstance`` |
| taskAffinity | affinity가 동일한 액티비티들은 같은 task에 들어갑니다. 기본값은 manifest에 정의된 패키지명이므로 기본적으로 한 앱의 모든 앱티비티들은 동일한 affinity를 가집니다. affinity를 사용하여 액티비티를 서로 다르게 그룹화하거나, 서로 다른 앱(프로세스)에 정의된 액티비티를 같은 태스크에 둘 수도 있습니다. |
| allowTaskReparenting | 기본값은 false이며, true일 경우 호출한 액티비티를 동일한 affinity를 가진 태스크에 쌓이도록 합니다. |
| clearTaskOnLaunch | true이면 액티비티가 재실행될 때 실행한 액티비티의 수와 관계없이 메인 액티비티를 제외하고 모두 제거합니다. 기본값은 false 입니다. |
| alwaysRetainTaskState | 기본값은 false이며 사용자가 특정 시간 동안 앱을 사용하지 않을 경우 시스템 루트 액티비티(태스크에서 가장 먼저 실행된 액티비티)를 제외한 액티비티들을 제거합니다. true일 경우 시스템이 관여하지 않습니다. |
| finishOnTaskLaunch | 앱을 다시 사용할 때 태스크에 이 옵션이 true인 액티비티가 있다면 해당 태스크를 종료시킵니다. |
{: .table .table-striped .table-hover}

액티비티 태스크를 관리하는 또 다른 방법으로는 소스 코드에서 startActivity() 메서드에 전달하는 intent의 플래그 값으로 태스크를 관리하는 방법입니다.
```kotlin
val intent = Intent(this, SubActivity::class.java)
intent.addFlag(Intent.FLAG_ACTIVITY_NEW_TASK)
```

일반적으로 많이 사용하는 플래그는 다음과 같습니다.

| 플래그 | 설명 |
| --- | --- |
| FLAG_ACTIVITY<br>_CLEAR_TOP | 호출하는 액티비티가 스택에 있으면 해당 액티비티를 Top으로 만들기 위해 그 위에 존재하던 액티비티를 모두 삭제합니다. 예를 들어 액티비티 A/B/C/D/E가 스택에 있을 때 C를 호출하면 D/E를 삭제해서 C를 화면에 나타냅니다. |
| FLAG_ACTIVITY<br>_NEW_TASK | 새로운 태스크를 생성하여 안에 액티비티를 추가할 때 사용합니다. 단, 기존에 존재하는 태스크 중에 생성하려는 액티비티와 동일한 AFFINITY를 가지고 있는 태스크가 있으면 해당 태스크로 액티비티가 들어갑니다. |
| FLAG_ACTIVITY<br>_MULTIPLE_TASK | 호출되는 액티비티를 메인으로 하는 새로운 태스크를 생성합니다. 이렇게 하면 동일한 액티비티를 하나 이상의 태스크에서 열 수 있습니다. FLAG_ACTIVITY<br>_NEW_TASK와 함께 사용하지 않는다면 아무 효과 없는 플래그입니다. |
| FLAG_ACTIVITY<br>_SINGLE_TOP | 호출되는 액티비티가 Top에 있으면 해당 액티비티를 다시 생성하지 않고, 존재하던 액티비티를 다시 사용합니다. 액티비티 A/B/C가 있을 때 C를 호출하면 기존과 동리하게 A/B/C가 나옵니다. |
{: .table .table-striped .table-hover}


# 2. 컨테이너: 목록 만들기
위젯의 위치를 다룰 때에 레이아웃을 사용했다면 위젯이나 다른 레이아웃에 데이터를 동적으로 표현해줄 때에는 컨테이너를 사용합니다.

컨테이너는 데이터를 반복적으로 표시하는 용도로 사용하며 대표적인 컨테이너로는 목록<sup>List</sup>을 화면에 출력할 때 사용하는 리사이클러뷰<sup>RecyclerView</sup>가 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-144.png){: style="box-shadow: 0 0 5px #777"}

## 2.1 스피너
스피너<sup>Spinner</sup>는 여러 개의 목록 중에서 하나를 선택할 수 있는 선택 도구입니다.

스피너는 어댑터<sup>Adapter</sup>라는 연결 도구를 사용해 화면에 나타낼 데이터와 화면에 보여주는 스피너를 연결합니다.

여러 개의 데이터가 어댑터에 입력되면 1개의 데이터당 1개의 아이템 레이아웃이 생성되어 화면에 목록 형태로 나타납니다. 

목록에서 한 줄은 1개의 아이템 레이아웃입니다.

### 스피너로 보는 어댑터의 동작 구조

이제부터 안드로이드 프로젝트를 만들어서 실제 스피너에 값을 입력하고 동작시켜 보겠습니다.

ContainerSpinner 프로젝트를 생성합니다.

1. activity_main.xml의 [Degisn] 모드에서 ‘Hello World!’ 텍스트뷰의 id속성을 ‘result’로 변경합니다. 그리고 text속성에는 ‘선택 결과’라고 입력합니다.

1. 팔레트의 컨테이너 (Containers) 카테고리에서 스피너 (Spinner) 를 드래그해서 텍스트뷰 아래에 가져다 놓습니다. 스피너의 id속성에 ‘spinner’라고 입력되어 있는 것을 확인합니다.

1. 스피너의 컨스트레인트를 좌우는 끝까지 연결하고 위는 텍스트뷰와 연결합니다. 마진은 좌우는 ‘50’, 위는 ‘25’로 합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-145.png){: style="box-shadow: 0 0 5px #777"}

1. 혹시 그림과 같이 마진값이 적용되지 않는다면 사각형 중앙의 가로 측 사이즈 조절바를 클릭해서 매치 컨스트레인트(![1]({{site.baseurl}}/images/this-is-android/this-is-android-40.png){: style="box-shadow: 0 0 5px #777"}) 로 만들어줍니다. 또는 layout_width 속성에 ‘0dp’라고 입력해도 됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-146.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle파일에 viewBinding설정을 하고 [MainActivity.kt] 탭을 클릭해서 소스코드로 이동합니다. 그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.<br>
    ```kotlin
    package kr.co.hanbit.containerspinner

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.containerspinner.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. 위 코드에 이어서 다음 행에 스피너에 입력될 가상의 데이터를 작성합니다. data변수를 만들고 listOf 를 사용해서 여러 개의 데이터를 입력합니다. 첫번째 데이터는 아직 데이터가 선택하지 않았기 때문에 기본으로 보여주는 ‘- 선택하세요 `’로 입력합니다.
```kotlin
var data = listOf("- 선택하세요 -", "1월", "2월", "3월", "4월", "5월", "6월")
```

1. 앞에서 만든 데이터와 스피너를 연결해줄 ArrayAdapter 클래스를 만들어 adapter 변수에 저장합니다. ArrayAdapter클래스는 adapter에서 사용할 데이터 타입을 제네릭으로 지정해야 합니다. 앞에서 문자열로 데이터를 구성했기 때문에 ``<String>``으로 지정합니다. ArrayAdapter의 파라미터는 총 3개이며 (스피너를 화면에 그리기 위한 컨텍스트, 스피너에 보여줄 목록 하나하나가 그려질 레이아웃, 어댑터에서 사용할 데이터) 순으로 입력합니다. 컨텍스트는 this를 사용하고, 레이아웃은 기본으로 제공하는 simple_list_item1을 사용합니다. 마지막 값으로 미리 만들어둔 data변수를 입력합니다.<br>
    ```kotlin
    var dapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, data)
    ```

1. 다음 코드를 입력해 어댑터를 스피너 위젯에 연결합니다. 스피너의 adapter속성에 담아주는 것만으로 간단하게 연결됩니다. <br>
    ```kotlin
    binding.spinner.adapter = adapter
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-147.png){: style="box-shadow: 0 0 5px #777"}

1. 이번에는 사용자가 스피너를 선택하면 선택한 값을 선택 결과에 보여주는 코드를 작성하겠습니다. 스피너를 선택하는 동작을 인식하기 위해서 onItemSelectedListener를 사용하는데, 이름 그대로 스피너에 있는 아이템이 선택되면 동작하는 리스너입니다.

1. 이어서 ‘=object: OnItem’까지만 입력하면 나타나는 자동 완성 코드에서 OnItemSelectedListener를 선택하고 중괄호 ({})를 붙여서 코드를 작성합니다.
    ```kotlin
    binding.spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener {
        
    }
    ```

1. 코드 블럭 사이를 클릭한 다음 마우스 오른쪽 버튼을 클릭해서 [Generate] - [Implements Methods]를 선택합니다. 나오는 메서드 목록 2개를 모두 선택하면 코드가 자동 완서오디는데 TODO()행은 모두 삭제합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-148.png){: style="box-shadow: 0 0 5px #777"}
    ```kotlin
    override fun onItemSelected(
        parent: AdapterView<*>?,
        view: View?,
        position: Int,
        id: Long
    ) {

    }

    override fun onNothingSelected(parent: AdapterView<*>?) {
        
    }
    ```

1. 자동 완성된 코드 중에서 onItemSelected() 메서드만 사용할 예정입니다. 이 메서드에 파라미터가 4개 있는데 OnItemSelectedListener를 사용할 때는 대부분 세 번째 position만 사용합니다. 사용자가 스피너에서 선택을 하면 몇 번째 아이템인지를 알려주는 파라미터입니다. 혹시 파라미터 이름이 다르면 책과 동일하게 수정한 다음 진행합니다. 두 번째 메서드 안에 다음 코드를 추가합니다. 리스너에서 넘겨주는 position값으로 data의 해당 위치에 있는 문자 값을 선택 결과 텍스트뷰에 입력하는 코드입니다.
```kotlin
binding.result.text = data.get(position)
```

1. 이제 스피너를 선택하면 해당 값이 선택 결과의 위치에 표시됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-149.png){: style="box-shadow: 0 0 5px #777"}<br>
    ```kotlin
    package kr.co.hanbit.containerspinner

    import android.R
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.view.View
    import android.widget.AdapterView
    import android.widget.ArrayAdapter
    import kr.co.hanbit.containerspinner.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            var data = listOf("- 선택하세요 -", "1월", "2월", "3월", "4월", "5월", "6월");
            var adapter = ArrayAdapter<String>(this, R.layout.simple_list_item_1, data);
            binding.spinner.adapter = adapter
            binding.spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    binding.result.text = data.get(position)
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {

                }
            }

        }
    }
    ```

## 2.2 리사이클러뷰
리사이클러뷰<sup>RecyclerView</sup>는 스피너가 조금 더 확장된 형태입니다. 리사이클러뷰도 스피너처럼 목록을 화면에 출력하는데, 레이아웃 매니저를 이용하면 간단한 코드만으로 리스트를 그리도로 바꿀 수도 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-150.png){: style="box-shadow: 0 0 5px #777"}<br>

리사이클러뷰처럼 목록을 표시하는 컨테이너들은 표시될 데이터와 아이템 레이아웃을 어댑터에서 연결해주므로 어댑터에서 어떤 아이템 레이아웃을 사용하느냐에 따라 표시되는 모양을 다르게 만들 수 있습니다.


### 화면 구성하기

ContainerRecyclerView 프로젝트를 생성합니다.

1. activity_main.xml 파일을 열고 기본 텍스트뷰는 삭제합니다. 리사이클러뷰 (RecyclerView)를 처음 사용한다면 팔레트의 컨테이너를 클릭했을 때 리사이클러뷰 오른쪽에 [다운로드 아이콘]이 보일 것입니다. 이 상태에서 리사이클러뷰를 드래그해서 UI편집기에 가져다 놓습니다.

1. 다운로드가 완료되면 Item0, Item1... 이라는 글자가 여러 줄 쓰여 있는 리사이클러뷰가 화면에 그려집니다. id 속성에 ‘recyclerView’라고 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-151.png){: style="box-shadow: 0 0 5px #777"}

1. 컨스트레이트는 상하좌우를 모두 연결합니다. 네 방향을 모두 연결해야 할 때는 아이콘을 하나씩 클릭하는 대신 UI 편집기 상단 [Infer Constraints 아이콘 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-152.png){: style="box-shadow: 0 0 5px #777"}]을 클릭하면 컨스트레인트를 가장 가까운 곳에 모두 연결해줍니다.

1. 여러 개의 정보를 하나의 아이템에 보여줘야 하니 아이템 레이아웃을 레이아웃 파일로 직접 생성하여 사용합니다. [app] - [res] - [layout] 디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Layout Resource File]를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-153.png){: style="box-shadow: 0 0 5px #777"}<br>

1. File name 에 ‘item_recycler’를, Root element에 ‘LinearLayout’을 입력하고 [OK]를 클릭해서 파일을 생성합니다. 다른 값은 건드리지 않습니다. activity_main.xml 아래에 item_recycler.xml이 생성된 걸 확인할 수 있습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-154.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-155.png){: style="box-shadow: 0 0 5px #777"}<br>

1. 리니어 레이아웃의 속성 영역에서 layout_height를 ‘50dp’로 변경합니다. 대부분 match_parent일 텐데 ‘50dp’을 입력하면 바로 수정됩니다. 반드시 뒤에 ‘dp’를 같이 입력해야 합니다. 숫자만 입력하면 오류가 발생할 수 있습니다. 이어서 orientation속성을 ‘horizontal’로 변경하고, gravity 속성에 ‘center_vertical’을 적용합니다. <br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-156.png){: style="box-shadow: 0 0 5px #777"}<br>

1. 레이아웃 안에 텍스트뷰를 3개 배치합니다. 각각 번호, 제목, 날짜 데이터를 표시할 텍스트뷰입니다. 이어서 layout-weight 속성을 각각 ‘1, 5, 3’으로 수정하면 다음과 같이 보입니다. 가로 비율이 맞지 않으면 각 텍스트뷰의 layout_width 속성을 ‘0dp’로 설정합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-157.png){: style="box-shadow: 0 0 5px #777"}<br>

1. 첫 번째 텍스튜브의 text속성은 ‘01’, id속성은 ‘textNo’로 입력합니다. 두 번째 텍스뷰의 text속성은 ‘Title’, id속성은 ‘textTitle’로 입력하고, 세 번째 텍스트뷰의 text속성은 ‘2021-01-01’, id속성은 ‘textDate’로 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-158.png){: style="box-shadow: 0 0 5px #777"}<br>


### 데이터를 정의하고 가상 데이터 만들기
이제 아이템 레이아웃에 맞춰서 화면에 뿌려질 데이터 클래스를 하나 생성하겠습니다.

번호, 타이틀, 날짜 세 종류의 값을 담을 데이터 클래스를하나 만들겠습니다.

1. java 디렉토리 아래에 있는 기본 패키지명을 마우스 우클릭하여 나타나는 메뉴에서 [New] - [Kotlin File/Class]를 선택합니다. <br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-159.png){: style="box-shadow: 0 0 5px #777"}

1. 입력 필드에 ‘Memo’를 입력하고, 바로 아래 목록 중에 Data Class를 더블클릭하면 파일이 생성됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-160.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 Memo 클래스를 열어보면 기본 코드가 있는데 class 코드를 약간 수정하여 파라미터 3개 가지는 데이터 클래스로 만듭니다. 마지막 날짜 파라미터의 이름을 timestamp로 만들고 Long 타입을 선언하였습니다. 날짜는 실제 개발할 때에도 타임스탬프라고 불리는 숫자형을 저장해 놓고 변환해서 많이 사용하기 때문에 여기서도 그렇게 사용하겠습니다.
    ```kotlin
    package kr.co.hanbit.containerrecyclerview

    data class Memo(var no: Int, var title: String, var timestamp: Long)
    ```
1. 이어서 MainActivity.kt 안에 100개의 가상 데이터를 만드는 코드를 작성해보겠습니다. MainActivity.kt를 열고 MutableList<Memo>를 반환하는 loadData() 메서드를 onCreate() 메서드 아래에 만듭니다.
    ```kotlin
    fun loadData(): MutableList<Memo> {

    }
    ```
1. 메서드 안에 리턴할 MutableList 컬렉션을 선언합니다.
    ```kotlin
    val data: MutableList<Memo> = mutableListOf()
    ```

1. 100개의 가상 데이터를 만들어야 하니 for문을 사용해서 백 번 반복합니다. for문에 사용한 no 변수는 그래도 Memo 클래스의  번호로 사용할 것입니다.
    ```kotlin
    for (no in 1..100) {
        
    }
    ```

1. for문 안에 타이틀과 날짜로 사용할 데이터를 가상으로 생성해서 변수에 담아둡니다. title 변수에는 ‘이것이 안드로이드다 1’, ‘이것이 안드로이드다 2’ ... 의 형태의 제목이 백 번 반복하여 저장되고, date 변수에는 안드로이드 스마트폰의 현재 시간이 숫자 값으로 저장됩니다.
    ```kotlin
    var title = "이것이 안드로이드다 ${no}"
    var date = System.currenttimeMillis()
    ```

1. 변수에 저장된 값과 번호로 Memo클래스를 생성하고, 위에서 선언해둔 data변수에 추가합니다.
    ```kotlin
    var memo = Memo(no, title, date)
    data.add(memo)
    ```

1. 마지막으로 반복문이 끝나면 100개의 Memo 클래스가 담겨 있는 data변수를 리턴해서 호출한 측에 전달합니다.
    ```kotlin
    return data
    ```

여기까지 입력한 MainActivity.kt의 추가 코드를 살펴보면 다음과 같습니다.

```kotlin
    fun loadData(): MutableList<Memo> {
        val data: MutableList<Memo> = mutableListOf()
        for (no in 1..1000) {
            val title = "이것이 안드로이드다 ${no}"
            var date = System.currentTimeMillis()
            var memo = Memo(no, title, date)
            data.add(memo)
        }
        return data
    }
```

### 어댑터 정의하기
리사이클리뷰는 리사이클러뷰어댑터라는 메서드 어댑터를 사용해서 데이터를 연결합니다.

스피너보다는 헐씬 복잡한 구조이며 상속이 필요합니다.

상속을 하면 어댑터와 관련된 대부분의 기능을 사용할 수 있고 추가로 필요한 몇 개의 요소만 개발자가 직접 구현합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-161.png){: style="box-shadow: 0 0 5px #777"}

리사이클러뷰어댑터는 개별 데이터에 대응하는 뷰홀더 클래스를 사용합니다. 상속하는 리사이클러뷰어댑터에 뷰홀더 클래스를 제네릭으로 지정해야 하므로 뷰홀더 클래스를 먼저 만들고 나서 어댑터 클래스를 생성하는 것이 더 편합니다.

```kotlin
class 커스텀어댑터: RecyclerView.Adapter<여기에 사용할 뷰홀더 지정> {

}
```

상속받는 Adapter 클래스에 제네릭으로 뷰홀더를 지정해두면, Implement Methods로 코드를 자동 완성할 때에 자동 완성된 메서드 중 하나가 파라미터 타입에 제네릭으로 지정해둔 뷰홀더를 사용합니다

```kotlin
class 커스텀어댑터: RecyclerView.Adapter<뷰홀더> {
    ...
    override fun onBindViewHolder(뷰홀더, 아이템 위치) {

    }
}
```

뷰홀더 클래스도 기본 기능이 이미 만들어져 있는 ViewHolder 클래스를 상속받아서 만듭니다. 뷰홀더 클래스는 아이템 레이아웃을 포함하고 있는데 1,000개의 데이터가 있다고 가정했을 때 이것들을 모두 화면에 그리기 위해서 1,000개의 아이템 레이아웃을 생성하면 시스템 자원이 낭비되고, 심각할 경우 앱이 종료될 수 도 있습니다.

``뷰홀더는 현재 화면에 보여지는 개수만큼만 생성되고 목록이 위쪽으로 스크롤 될 경우 가장 위의 뷰홀더를 아래에서 재사용한  후 데이터만 바꿔주기 때문에 앱의 효율이 향상됩니다.``

ViewHolder 클래스의 생성자에는 다음에 만들 어댑터의 아이템 레이아웃을 넘겨줘야 하므로 Holder 클래스를 생성할 때 생성자에게서 레이아웃의 바인딩을 넘겨받아야 합니다.

```kotlin
class 홀더(바인딩): RecyclerView.ViewHolder(바인딩.root)
```

앞서 작성한 ConstrainerRecyclerView 프로젝트에서 이어서 코드를 작성하겠습니다.

1. build.gradle 파일에 viewBinding 설정을 하고 [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. 그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

1. java 디렉토리 밑에 있는 패키지에 CustomAdapter 클래스를 하나 생성하고 같은 파일 안에 Holder 클래스를 작성하겠습니다.  패키지명을 마우스 우클릭하여 [New] - [Kotlin File/Class]를 선택한 후 나타나는 팝업의 입력란에 ‘CustomAdapter’를 입력하고 그 아래 목록에서 Class를 더블클릭해서 파일을 생성합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-162.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-163.png){: style="box-shadow: 0 0 5px #777"}<br>

1. 소스 코드가 생성되면 class CustomAdapter 아래에 ㅇclass Holder를 추가로 작성합니다.
    ```kotlin
    package kr.co.hanbit.containerrecyclerview

    class CustomAdapter {
    }

    class Holder {
        
    }
    ```

1. Holder 클래스에 RecyclerView의 ViewHolder를 상속받습니다.
    ```kotlin
    class Holder: RecyclerView.ViewHolder {
        
    }
    ```

1. ViewHolder에 빨간색 밑줄이 생기는데 생성자에 1개의 값이 필수로 입력되야 하기 때문에 그렇습니다.  아이템 레이아웃은 ViewHolder 자체에서 만들지 않고 어댑터가 만들어서 넘겨주므로 코드를 다음과 같이 수정해야 합니다. 어댑터에서 넘겨주는 바인딩을 Holder 클래스의 생성자에게서 받아 ViewHolder의 생성자에게로 넘겨주는 구조입니다. ViewHolder의 생성자는 바인딩이 아닌 View를 필요로 하기 때문에 binding.root를 전달합니다. 그리고 binding은 Holder 클래스안에서 전역변수 (프로퍼티)로 사용돼야 하기 때문에 val 키워드를 앞에 붙여줍니다.
    ```kotlin
    class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {
        
    }
    ```
    - ``바인딩 생성은 어댑터에서``
      - 뷰홀더가 사용하는 바인딩은 어댑터에서 생성한 후에 넘겨줍니아. 이 어댑터에서 사용할 레이아웃의 이름이 item_recycler이기 때문에 안드로이드에서 생성해주는 바인딩의 이름은 ItemRecyclerBinding이 됩니다.

1. Holder 내부의 코드가 실행되기 전에 어댑터 클래스 코드가 먼저 선행되어야 하므로 어댑터 클래스를 먼저 수정하겠습니다. 다음과 같이 CustomAdapter 코드는 RecyclerView의 Adapter를 상속받고 앞에서 생성한 Holder를 제네릭으로 지정합니다.
    ```kotlin
    class CustomAdapter: RecyclerView.Adapter<Holder>() {
        
    }
    ```
    - ``어댑터 클래스의 기본 구성``
      - 어댑터가 정상적으로 동작하려면 미리 정의된 Holder 클래스를 제네릭으로 지정한 후 어댑터에 설계되어 있는 3개의 인터페이스를 반드시 구현해야 합니다.

    ```kotlin
    class 어댑터: RecyclerView.Adapter<Holder> {
        onCreateViewHolder()
        getItemCount()
        onBindViewHolder()
    }
    ```

1. class CustomAdapter... 코드 블록 ({}) 의 중간에서 ``Ctrl`` + ``I``키를 눌러 팝업창에서 3개의 인터페이스를 모두 선택해서 import하면 코드가 자동으로 추가됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-164.png){: style="box-shadow: 0 0 5px #777"}<br>
    ```kotlin
    class CustomAdapter: RecyclerView.Adapter<Holder>() {
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
        }

        override fun getItemCount(): Int {
        }
    }
    ```

1. 추가된 코드의 맨 윗줄에 이 어댑터에서 사용할 데이터 목록 변수를 하나 선언합니다. 목록형 컬렉션은 listOf() 계열의 메서드로 초기화할 수 있습니다. 앞에서 미리 작성해둔 loadData() 메서드에서 리턴해주는 값을 사용할 것이기 때문에 ``mutableListOf<Memo>()``를 사용합니다.
    ```kotlin
    var listData = mutableListOf<Memo>()
    ```

1. 리사이클러뷰에서 사용할 데이터의 총 개수를 리턴하는 getItemCount() 메서드부터 구현합니다.
    ```kotlin
    override fun getItemCount(): Int {
        return listData.size
    }
    ```

1. 이어서 아이템 레이아웃을 생성하는 onCreateViewHolder() 메서드를 구현합니다. ``스마트폰의 한 화면에 보이는 개수만큼 안드로이드가 이 메서드를 호출합니다. 한 화면에 여덟 줄이 보이면 여덟 번 호출합니다.``
액티비티와는 다르게 어댑터에서 사용하는 바인딩인 ItemRecyclerBinding의 inflate 메서드는 3개의 파라미터가 사용됩니다.
첫 번째 파라미터로 전달되는 인플리이터는 LayoutInflater.from으로 생성해서 입력합니다. from에는 파라미터로 context가 전달돼야 하는데, 이는 안드로이드가 넘겨주는 parent에서 꺼낼 수 있습니다. 두 번째는 parent를 그대로 사용하고, 세 번째는 항상 false를 사용하면 됩니다. 그리고 다음 줄에서 생성된 바인딩을 Holder 클래스에 담아서 반환합니다.
안드로이드는 이런 과정을 거쳐 전달된 Holder 클래스를 메모리에 저장했다가 요청이 있을 때마다 꺼내서 사용합니다.
    ```kotlin
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }
    ```
    - inflate(inflater, parent, attachToRoot) 파라미터의 의미
      - ``inflater`` : 바인딩을 생성할 때 사용하는 인프레이터입니다. 액티비티에서와는 다르게 LayoutInflater.from 을 사용해서 생성해야 합니다.
      - ``parent`` : 생성되는 바인딩이 속하는 부모 뷰(레이아웃)입니다.
      - ``attachToRoot`` : true일 경우 attach 해야 하는 대상으로 root를 지정하고 아래에 붙입니다. false일 경우 뷰의 최상위 레이아웃의 속성을 기본으로 레이아웃이 적용됩니다.

1. 생성된 뷰홀더를 화면에 보여주는 onBindViewHolder() 메서드를 구현합니다. 먼저 listData에서 현재 위치에 해당하는 메모를 하나 꺼내 memo 변수에 저장한 후 홀더에 전달합니다. 임의로 홀더에 setMemo() 라는 메서드가 있다고 가정하고 다음과 같이 작성합니다.
    ```kotlin
    override fun onBindViewHolder(holder: Holder, position: Int) {
        val memo = listData.get(position)
        holder.setMemo(memo)
    }
    ```

1. 이제 마지막으로 Holder 클래스에서 화면에 데이터를 세팅하는 setMemo() 메서드를 구현합니다.
    ```kotlin
    class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {
        fun setMemo(memo: Memo) {
            
        }
    }
    ```

1. setMemo() 메서드 안의 다음 코드를 추가합니다. texTNo 웨젯에는 memo의 no값을 입력합니다.
    ```kotlin
    binding.textNo.text = "${memo.no}"
    ```

1. 마찬가지로 나머지 2개의 위젯도 메모 데이터와 연결합니다. 날짜에 해당하는 timestamp값은 SimpleDataFormat을 사용해서 날짜 형식으로 먼저 변환합니다.
SimpledateFormat을 import하면 선택지가 2개 나타나는데 java.text의 SimpleDateFormat을 선택합니다.
SimpleDateFormat을 생성하면서 생성자에 날짜가 보여질 형식을 ‘yyyy/MM/dd’로 정의합니다.

다음은 CustomAdapter.kt의 전체 코드입니다.
```kotlin
package kr.co.hanbit.containerrecyclerview

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kr.co.hanbit.containerrecyclerview.databinding.ItemRecyclerBinding
import java.text.SimpleDateFormat

class CustomAdapter: RecyclerView.Adapter<Holder>() {

    var listData = mutableListOf<Memo>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemRecyclerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val memo = listData.get(position)
        holder.setMemo(memo)
    }

    override fun getItemCount(): Int {
        return listData.size
    }
}

class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {
    fun setMemo(memo: Memo) {
        binding.textNo.text = "${memo.no}"
        binding.textTitle.text = memo.title
        var sdf = SimpleDateFormat("yyyyMMdd")
        var formattedDate = sdf.format(memo.timestamp)
        binding.textDate.text = formattedDate
    }
}
```

### MainActivity.kt에서 어댑터 사용하기

지금까지 생성한 레이아웃과 소스 코드를 MainActivity.kt에서 모두 연결합니다.

1. setContentView 메서드 아래에 먼저 사용할 데이터를 생성하는 코드를 추가합니다.
    ```kotlin
    val data: MutableList<Memo> = loadData()
    ```

1. 어댑터를 생성하고 어댑터의 listData 변수에 위에서 생성한 데이터 목록을 저장합니다.
    ```kotlin
    var adapter = CustomAdapter()
    adapter.listData =data
    ```

1. recyclerView 위젯의 adapter 속성에 생성할 어댑터를 연결합니다.
    ```kotlin
    binding.recyclerView.adapter = adapter
    ```

1. 마지막으로 리사이클러뷰에서 확인해봅니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-165.png){: style="box-shadow: 0 0 5px #777"}<br>

다음은 MainActivity.kt의 전체 코드입니다.
```kotlin
package kr.co.hanbit.containerrecyclerview

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kr.co.hanbit.containerrecyclerview.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val data: MutableList<Memo> = loadData()
        var adapter = CustomAdapter()
        adapter.listData = data
        binding.recyclerView.adapter = adapter

        binding.recyclerView.layoutManager = LinearLayoutManager(this)

    }

    fun loadData(): MutableList<Memo> {
        val data: MutableList<Memo> = mutableListOf()
        for (no in 1..1000) {
            val title = "이것이 안드로이드다 ${no}"
            var date = System.currentTimeMillis()
            var memo = Memo(no, title, date)
            data.add(memo)
        }
        return data
    }
}
```

### 레이아웃 매니저의 종류

리사이클러뷰에서 사용할 수 있는 레이아웃 매니저<sup>Layout Manager</sup>의 종류는 세 가지 입니다. 이중에서 세 번째 StaggeredGridLayoutManager는 핀터레스트 같은 사진 앱에서 자주 사용되는 형태입니다. 

1. ``LinearLayoutManager``
  - ``세로 스크롤`` : 기본으로 세로 스크롤을 하며 일반 리스트처럼 한 줄로 목록을 생성합니다. 추가로 설정하면 가로 스크롤도 할 수 있습니다. 
    ```kotlin
    LinearLayoutManager(this)
    ```
  - ``가로 스크롤`` : 컬럼 개수를 지정해서 개수만큼 그리드 형태로 목록을 생성합니다. 리니어 레이아웃 매니저의 두 번째 파라미터에 가로 스크롤 옵션을 설정합니다.
    ```kotlin
    LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
    ```

1. ``GridLayoutManager``
  - 데이터의 사이즈에 따라 그리드의 크기가 결정됩니다. 두 번째 파라미터에 한 줄에 몇 개의 아이템을 표시할 건지 개수를 설정합니다.
    ```kotlin
    GridLayoutManager(this, 3)
    ```

1. ``StaggeredGridLayoutManager``<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-166.png){: style="box-shadow: 0 0 5px #777"}<br>
  - ``세로 스크롤`` : 컨텍스트를 사용하지 않으므로 this를 넘기지 않아도 됩니다. 첫 번째 파라미터에는 한 줄에 표시되는 아이템의 개수, 두 번째 파라미터에는 세로 방향을 설정합니다.
    ```kotlin
    StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL)
    ```
  - ``가로 스크롤`` : 두 번째 파라미터에 가로 방향을 설정합니다.
    ```kotlin
    StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.HORIZONTAL)
    ```

### 목록 클릭 이벤트 처리

이번에는 목록에서 아이템 1개가 클릭 되었을 때 처리하는 방법을 알아보겠습니다.

간단하게 홀더가 가지고 있는 아이템뷰에 클릭리스너를 달고, 리스너 블록에 실행할 코드만 추가하면 목록이 클릭 될 때마다 해당 코드가 실행됩니다.

1. CustomAdapter.kt 파일을 열어 Holder 클래스가 생성되는 시점에 클릭리스너를 추가하려면 먼저 Holder 클래스에 init를 추가해야 합니다. init에서 아이템뷰에 클릭 리스너를 달고 리스너 블록 안에 토스트로 간단한 메시지를 보여주는 코드를 setMemo() 메서드 위에 작성합니다.
    ```kotin
    init {
        binding.root.setOnClickListener {
            Toast.makeText(binding.root.context, "클릭된 아이템 = ${binding.textTitle.text}", Toast.LENGTH_LONG).show()
        }
    }
    ```
    Toast.makeText 메서드가 사용하는 첫 번째 파라미터인 context는 binding.root에서 꺼낼 수 있습니다.

1. 에뮬레이터를 실행하고 목록을 클릭해보면 토스트 메시지가 나타납니다. 목록에서 클릭 처리는 이렇게 뷰홀더 안에서 간단하게 만들 수 있습니다. 목록에서 상세화면으로 이동이 일어날 경우는 클릭리스너 안에서 startActivity를 호출하는 형태로 처리할 수 있습니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-167.png){: style="box-shadow: 0 0 5px #777"}



# 3. 액티비티의 조각 프래그먼트 다루기

안드로이드의 액티비티는 화면을 표현하기 위한 기본 단위입니다.

액티비티를 구성하다 보면 화면이 너무 복잡하거나 또는 코드의 양이 너무 많아졌거나 하는 이유로 화면 부위별로 따로 동작시키고 싶을 때가 있습니다.

그럴 때 화면을 각각 분할해서 독립적인 코드로 구성할 수 있게 도와주는 것이 프래그먼트<sup>Fragment</sup>입니다.

프래그먼트는 서로 다른 크기의 화면을 가진 기기 (태블릿, 스마트폰 등) 에서 하나의 액티비티로 서로 다른 레이아웃을 구성할 수 있도록 설계되었습니다.

목록 프래그먼트<sup>List Fragment</sup>와 상세 프래그먼트<sup>Detail Fragment</sup>가 있을 때 태블릿과 같은 큰 화면에서는 두 프래그먼트를 한 화면에 표시하고, 스마트폰처럼 작은 화면에서는 먼저 목록 프래그먼트만 표시한 후 목록을 클릭하면 상세가 나타나는 구조입니다.


![1]({{site.baseurl}}/images/this-is-android/this-is-android-168.png){: style="box-shadow: 0 0 5px #777"}


구글의 설계 의도는 앞의 구조처럼 사용하는 것이지만, 실제 개발할 때에는 태블릿 환경을 고려하기 보다는 다음과 같은 구조로 더 많이 사용합니다.

- 한 번에 1개의 프래그먼트가 화면에 나타나는 형태로 프래그먼트를 여러 개를 미리 만들어두고 탭 메뉴나 스와이프<sup>Swipe</sup>로 화면 간 이동할 때 사용됩니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-169.png){: style="box-shadow: 0 0 5px #777"}

- 한 번에 여러 개의 프래그먼트가 동시에 화면에 나타나는 형태로 태블릿과 같은 대형 화면을 가진 디바이스에서 메뉴와 뷰를 함께 나타내거나 여러 개의 섹션을 모듈화 한 후 한 화면에 나타낼 때 사용됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-170.png){: style="box-shadow: 0 0 5px #777"}


## 3.1 프래그먼트를 만들어 액티비티에 추가하기

프래그먼트는 단독으로 사용되지 않고 액티비티의 일부로 사용됩니다.

이번에는 프래그먼트를 액티비티에 추가하는 방법을 예제롤 통해서 알아보겠습니다.

Fragment 프로젝트를 하나 생성합니다. 프로젝트가 생성되면 build.gradle 파일을 열고 viewBinding 설정을 합니다.

### 목록 프래그먼트 만들기

1. java 디렉토리 밑에 있는 패키지명을 선택하여 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Fragment] - [Fragment (Black)]를 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-171.png){: style="box-shadow: 0 0 5px #777"}

1. Fragment Name에 ‘ListFragment’를 입력하면 해당 프래그먼트가 사용하는 레이아웃인 fragment_list를 자동으로 생성해줍니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-172.png){: style="box-shadow: 0 0 5px #777"}

1. 이제 layout 디렉토리 아래에 fragment_list.xml 과 java 디렉토리 아래의 패키지명 밑에 ListFragment.kt 파일이 생성되고 화면에 열려 있습니다.  ListFragment.kt의 onCreateView() 메서드는 리사이클러뷰의 onCreateViewHolder() 메서드처럼 동작합니다.  액티비티가 프래그먼트를 요청하면 onCreateView() 메서드를 통해 뷰를 만들어서 보여줍니다. inflate 메서드는 리사이클러뷰에서와 동일하게 동작합니다.  다음은 프래그먼트 생성 후 ListFragment.kt의 기본 코드입니다.
    ```kotiln
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private const val ARG_PARAM1 = "param1"
    private const val ARG_PARAM2 = "param2"

    /**
    * A simple [Fragment] subclass.
    * Use the [ListFragment.newInstance] factory method to
    * create an instance of this fragment.
    */
    class ListFragment : Fragment() {
        // TODO: Rename and change types of parameters
        private var param1: String? = null
        private var param2: String? = null

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            arguments?.let {
                param1 = it.getString(ARG_PARAM1)
                param2 = it.getString(ARG_PARAM2)
            }
        }

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            // Inflate the layout for this fragment
            return inflater.inflate(R.layout.fragment_list, container, false)
        }

        companion object {
            /**
            * Use this factory method to create a new instance of
            * this fragment using the provided parameters.
            *
            * @param param1 Parameter 1.
            * @param param2 Parameter 2.
            * @return A new instance of fragment ListFragment.
            */
            // TODO: Rename and change types and number of parameters
            @JvmStatic
            fun newInstance(param1: String, param2: String) =
                ListFragment().apply {
                    arguments = Bundle().apply {
                        putString(ARG_PARAM1, param1)
                        putString(ARG_PARAM2, param2)
                    }
                }
        }
    }
    ```
    현재 실습을 하지 않는 코드가 많이 있기 때문에 가독성을 위해 모두 지웁니다.<br>
    ``수정 후 전체코드``
    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private const val ARG_PARAM1 = "param1"
    private const val ARG_PARAM2 = "param2"

    /**
    * A simple [Fragment] subclass.
    * Use the [ListFragment.newInstance] factory method to
    * create an instance of this fragment.
    */
    class ListFragment : Fragment() {

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            // Inflate the layout for this fragment
            return inflater.inflate(R.layout.fragment_list, container, false)
        }
    }
    ```
    - onCreateView 의 파라미터
      - ``inflater`` : 레이아웃 파일을 로드하기 위한 레이아웃 인플레이터를 기본으로 제공합니다.
      - ``container`` : 프래그먼트 레이아웃이 배치되는 부모 레이아웃입니다. (액티비티의 레이아웃입니다.)
      - ``savedInstanceState`` : 상태 값 저장을 위한 보조 도구. 액티비티의 onCreate 의 파라미터와 동일하게 동작합니다.

1. 이제 목록 프래그먼트의 레이아웃을 작성합니다.  fragment_list.xml 파일을 열어보면 프래그먼트의 기본 레이아웃에는 프레임 레이아웃과 그 안에 1개의 텍스트뷰 위젯이 있습니다.  그리고 텍스트뷰 위젯의 layout_width 와 layout_height 속성의 설정값이 ‘match_parent’로 설정되어 있어 텍스트뷰 영역이 화면 전체를 차지합니다.

1. 화면 우측 상단의 [Code] 버튼을 클릭해서 모드를 변경합니다. [Code] 모드에서 두 번째 줄에 있는 ``<FrameLayout>`` 태그를 ``‘ConstraintLayout’``으로 변경합니다.
    ```kotlin
    <?xml version="1.0" encoding="utf-8"?>
    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ListFragment">

        <!-- TODO: Update blank fragment layout -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="@string/hello_blank_fragment" />

    </androidx.constraintlayout.widget.ConstraintLayout>
    ```

1. 편집기 우측 상단의 [Design] 버튼을 클릭해서 모드를 변경합니다.  텍스트뷰의 layout_width 와 layout_height 속성을 모두 ‘wrap_content’로 바꿉니다. 그 당ㅁ text 속성에 ‘List’를 입력하고 드래드해서 화면 상단 중앙에 가져다 놓고 좌우 그리고 위쪽의 컨스트레인트를 화면 끝에 연결합니다. 위쪽의 거리는 컨스트레인트 편집기에서 ‘32’로 설정해줍니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-173.png){: style="box-shadow: 0 0 5px #777"}

1. 팔레트 영역에서 버튼을 화면 중앙에 추가합니다. 버튼의 좌우 컨스트레인트는화면 가장자리에 연결하고, 위쪽은 텍스트뷰에 연결하며 거리는 ‘24’로 설정합니다. text 속성에 ‘Next’를 입력하고, id 속성에 ‘btnNext’를 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-174.png){: style="box-shadow: 0 0 5px #777"}


### 액티비티에 프래그먼트 추가하기 

프래그먼트의 기본 화면을 구성한 상태에서 액티비티와 연결하겠습니다.
프래그먼트는 기본적으로 하나의 뷰로 동작하기 때문에 액티비티 안에 뷰를 삽입할 수 있는 레이아웃을 준비해야 합니다.

프래그먼트를 삽입하기 위한 전용 레이아웃으로 컨테이너 카테고리의 ``<fragment>``와 레이아웃 카테고리의 프레임 레이아웃이 있는데, 화면 전환 (목록 <-> 상세)이 필요할 때는 프레임 레이아웃을 사용하는 것이 좋습니다.

``<fragment>``화면 전환 없이 프래그먼트 하나만 화면에 표시할 때 사용합니다.

1. activity_main.xml 파일을 열고 액티비티 영역과 프래그먼트 영역을 구분해주기 위해서 레이아웃을 수정합니다.  기본 텍스트뷰를 화면 상단으로 옮기고 text 속성에 ‘Activity’를 입력합니다. 컨스트레인트는 아래르 제외하고 모두 연결하며 위쪽과의 거리는 ‘16’으로 설정합니다.

1. 레이아웃 카테고리의 프레임 레이아웃을 드래그해서 화면에 가져다 놓고 텍스트뷰 아래 화면이 꽉 차도록 컨스트레인트를 설정합니다. id속성에 ‘frameLayout’을 입력합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-175.png){: style="box-shadow: 0 0 5px #777"}

1. 앞에서 만든 프래그먼트를 액티비티에 삽입하는 코드를 작성해야 하는데, 이번 절에서는 액티비티에서 레이아웃에 접근하는 코드가 없기 때문에 MainActivity에는 바인딩 관련 코드를 작성하지 않습니다.  MainActivity.kt파일을 열고 onCreate() 메서드 아래에 프래그먼트를 삽입하는 빈 메서드인 setFragment()를 만들고 onCreate() 안에서 미리 호출합니다. 
    ```kotlin
    package kr.co.hanbit.fragment

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle

    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            setFragment()
        }

        fun setFragment() {
            
        }
    }
    ```

1. 액티비티에 프래그먼트를 삽입하기 위해서는 프래그먼트 매니저를 통해 삽입할 레이아웃의 id를 지정합니다. 프래그먼트를 삽입하는 과정은 하나의 트랜잭션으로 관리되기 때문에 트랜잭션 매니저를 통해 begin transaction > add fragment > commit transaction 의 순서로 처리됩니다. setFragment() 메서드 안에 다음과 같이 ListFragment를 생성합니다.
    ```kotlin
    val listFragment: ListFragment = ListFragment()
    ```

1. 이어서 액티비티가 가지고 있는 프래그먼트 매니저를 통해서 트랜잭션을 시작하고, 시작한 트랜잭션을 변수에 저장해둡니다.
    ```kotlin
    val transaction = supportFragmentmanager.beginTrasaction()
    ```

1. 트랜잭션 add() 메서드로 frameLayout을 id로 가지고 있는 레이아웃에 앞에서 생성한 listFragment를 삽입합니다.
    ```kotlin
    transaction.add(R.id.frameLayout, listFragment)
    ```

1. commit() 메서드로 모든 작업이 정상적으로 처리되었음을 트랜잭션에 알려주면 작업이 반영됩니다.
    ```kotlin
    transaction.commit()
    ```
    - ``프래그먼트를 화면에 삽입하는 메서드``
      - add(레이아웃, 프래그먼트): 프래그먼트를 레이아웃에 추가합니다.
      - replace(레이아웃, 프래그먼트): 레이아웃에 삽입되어 있는 프래그먼트를 교체합니다.
      - remove(프래그먼트): 지정한 프래그먼트를 제거합니다.

1. 에뮬레이터에서 실행하면 Activity안에 List가 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-176.png){: style="box-shadow: 0 0 5px #777"}<br>
  다음은 MainActivity.kt 파일에 작성된 코드의 일부입니다.
    ```kotlin
    package kr.co.hanbit.fragment

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle

    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            setFragment()
        }

        fun setFragment() {
            val listFragment: ListFragment = ListFragment()
            val transaction = supportFragmentManager.beginTransaction()
            transaction.add(R.id.frameLayout, listFragment)
            transaction.commit()
        }
    }
    ```

### 레이아웃에서 프래그먼트 추가하기

fragment 컨테이너를 사용하면 소스 코드를 거치지 않고 레이아웃 파일에서도 위젯처럼 프래그먼트를 추가할 수 있습니다. 하나의 프래그먼트를 화면 전환 없이 사용하면 소스 코드에스 추가하는 것보다 레이아웃에서 추가하는 것이 훨씬 효율적입니다.

레이아웃 파일에서 프래그먼트를 추가하기 위해서는 메인 액티비티의 레이아웃에 추가했던 ‘FrameLayout’을 ‘Fragment’로 변경해야 합니다.

1. activity_main.xml 파일을 열고 [Code]버튼을 클릭해서 모드를 변경합니다. XML 태그 중간에 ``<FrameLayout> ~ </FrameLayout>``까지 주석으로 처리합니다.

1. 다시 디자인 모드로 변경하고 컨테이너 카테고리의 ``<fragment>``를 화면에 가져다 놓습니다. 이 때 ``<fragment>``태그를 삽입할 클래스 선택 팝업창이 뜨는데 앞에서 작성한 [ListFragment]를 선택합니다. ``책에서 잘 안되어 다음 그림과 같이 처리함!!``<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-177.png){: style="box-shadow: 0 0 5px #777"}

1. 속성 영역에서 id를 ‘fragmentLayout’으로 변경합니다. ``<fragment>``의 컨스트레인트를 네 방향 모두 연결합니다. 위쪽은 텍스트뷰에 연결합니다. layout_width와 layout_height 속성을 모두 ‘match_constraint’로 변경합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-178.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt 파일을 열고 setFragment() 메서드 안의 내용을 모두 주석 처리합니다.<br>
    ```kotlin
    fun setFragment() {
    /*

        val listFragment: ListFragment = ListFragment()
        val transaction = supportFragmentManager.beginTransaction()
        transaction.add(R.id.frameLayout, listFragment)
        transaction.commit()
    */

    }
    ```

1. 에뮬레이터에서 확인하면 05에서 본 화면과 같은 화면이 나타납니다.

## 3.2 프래그먼트 화면 전환

DetailFragment를 새로 하나 만들고, 앞에서 만든 ListFragment의 Next버튼을 클릭하면 DetailFragment로 화면이 전환되는 과정을 알아보겠습니다.

### 상세 프래그먼트 만들기

1. 파일 탐색기에 있는 java 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나오는 메뉴에서 [New] - [Fragment] - [Fragment (Blank)] 를 선택합니다. Fragment Name을 ‘DetailFragment’로 수정하고 [Finish]버튼을 클릭하면 프래그먼트 파일과 레이아웃 파일이 생성됩니다.

1. fragment_detail.xml 파일을 열고 [Code] 모드에서 ‘FrameLayout’을 ‘ConstraintLayout’으로 변경합니다.

1. [Design] 버튼을 클릭해서 모드를 바꿈니다.  기존 텍스트뷰의 text 속성에는 ‘Detail’을 입력하고 layout_width와 layout_height 속성은 모두 ‘wrap_content’로 바꿉니다. 텍스트뷰를 화면 상단 중앙으로 옮기고 컨스트레인트는 좌우와 위쪽을 연결합니다. 위쪽 거리는 ‘24’로 설정합니다.<br>

1. 텍스트뷰 아래에 버튼을 하나 드래그해서 가져다 놓고, id속성에 ‘btnBlank’, text속성에는 ‘Back’을 입력합니다. 컨스트레인트의 위쪽은 텍스트뷰와 연결하고 거리를 ‘24’로 설정하고 좌우로도 화면 가장자리에 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-179.png){: style="box-shadow: 0 0 5px #777"}


### 메인 액티비티에 두 프래그먼트 연결하기

이제 앞에서 만든 목록 프래그먼트의 Next 버튼을 클릭하면 상세 프래그먼트로 이동하고 다시 상세 프래그먼트의 [Back] 버튼을 클릭하면 목록 프래그먼트로 돌아가는 코드를 작성하겠습니다.  프래그먼트를 메인 액티비티에서 생성하고 프래그먼트를 담는 레이아웃도 메인 액티비티에 있으므로 화면 전환을 위한 기본적인 소스 코드는 메인 액티비티에서 작성합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-180.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt을 열고 ListFragment의 Next 버튼을 클릭했을 때 호출할 goDetail() 메서드를 setFragment() 메서드 아래에 작성합니다. goDetail() 메서드가 호출되면 DetailFragment를 생성해서 메인 액티비티의 frameLayout에 삽입할 겁니다.<br>
    ```kotlin
    fun goDetail()
    ```

1. goDetail() 메서드 안에서 DetailFragment를 생성하고 detailFragment 변수에 저장합니다.<br>
    ```kotlin
    fun goDetail() {
        val detailFragment = DetailFragment()
    }
    ```

1. 생성된 DetailFragment를 액티비티에 삽입하기 위해 setFragment에 작성했던 코드 세 줄을 복사해서 붙여넣습니다. 그리고 listFragment만 detailFragment로 다음처럼 수정합니다.
    ```kotlin
    val transaction = supportFragmentManager.beginTransaction()
    transaction.add(R.id.frameLayout, detailFragment)
    transaction.commit()
    ```

1. transaction의 add()와 commit() 사이에 addToBackStack()을 추가합니다. ``이렇게 하면 스마트폰의 뒤로가기 버틍을 사용할 수 있습니다.``
    ```kotlin
    transaction.addToBackStack("detail")
    ```
    - ``addToBackStack으로 프래그먼트 트랜잭션을 백스택에 담을 수 있습니다.``
      - 스마트폰의 삽입하기 위해 사용되는 트랜잭션을 마치 하나의 액티비티처럼 백스택에 담아 둘 수 있습니다. 따라서 스마트폰의 뒤로가기 버튼으로 트랜잭션 전체를 마치 액티비티처럼 제거할 수 있게 됩니다. 주의할 점은 개별 프래그먼트가 스택에 담기는 것이 아니라 트랜잭션 전체가 담기기 때문에 add나 replace에 상관없이 해당 트랜잭션 전체가 제거됩니다.


1. DetailFragment.kt의 Back 버튼을 클릭하면 호출되는 goBack() 메서드를 작성합니다. Back 버튼 역시 DetailFragment에 있지만 코드는 MainActivity.kt에 작성합니다. 상세 프래그먼트에서 목록으로 돌아가는 코드는 트랜잭션 없이 뒤로가기로 간단하게 처리할 수 있으므로 메서드의 이름을 goBack()으로 작성합니다. ``onBackPressed()``는 뒤로가기가 필요할 때 액티비티에서 사용할 수 있는 기본 메서드 입니다.
    ```kotlin
    fun goBack() {
        onBackPressed()
    }
    ```

### ListFragment.kt 코드 수정하기

이번에는 ListFragment.kt에서 Next버튼의 클릭리스너를 작성합니다. 

프래그먼트의 버튼으로 사용자의 클릭이 전달되면 메인 액티비티의 goDetail() 메서드를 호출하는 형태로 만들어집니다.
MainActivity.kt에서 작성된 goDetail() 메서드를 호출해야 하므로 MainActivity를 전달받는 코드를 먼저 작성해야 합니다.
프래그먼트의 생명 주기 메서드 중에 onAttach()를 통해 코드를 전달받는 것이 가장 일반적인 방법입니다.

1. MainActivity를 담아둘 멤버 변수 mainActivity를 class 바로 밑에 선언합니다.
    ```kotlin
    class ListFragment: Fragment() {
        var mainActivity: MainActivity? = null
    }
    ```
    - 인터페이스를 사용하지 않고 액티비티를 직접 변수에 담아 사용합니다.
      - 프래그먼트를 만들면 자동으로 생성되는 기본 코드에서는 인터페이스를 통해 의존성을 제거하는 코드로 작성되어 있지만, 처음 공부할 때는 이런 코드가 오히려 이해하는 데 방해가 될 수 있어서 액티비티를 그대로 사용하는 것을 권장합니다.

1. ListFragment 의 빈 공간을 클릭한 상태에서 키보드의 ``Ctrl`` + ``O``키를 입력하면 메서드를 오버라이드할 수 있는 팝업창이 나타납니다. onAttach(context: Context)메서드를 오버라이드 합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-181.png){: style="box-shadow: 0 0 5px #777"}


1. onAttach() 메서드를 통해 넘어온 Context를 캐스팅해서 MainActivity에 담습니다. 프래그먼트의 onAttach() 메서드를 통해 넘어오는 Context는 부모 액티비티 전체가 담겨 있습니다. context의 타입이 MainActivity인 것을 확인하고 mainActivity 프로퍼티에 저장해둡니다.
    ```kotlin
    override fun onAttach(context: Context) {
        super.onAttach(context)

        if (context is MainActivity) mainActivity = context
    }
    ```

1. 목록 플래그먼트의 레이아웃에 있는 버튼을 사용하기 위해서 onCreateView() 메서드에 만들어져 있는 코드 한 줄을 수정합니다.
    ```kotlin
    /* 원본 코드 : inflater로 생성한 뷰를 바로 리턴하는 구조입니다. */
    return inflater.inflate(R.layout.fragment_list, container, false)

    /* 수정 코드 : 바인딩으로 생성한 후 레이아웃에 있는 btnNext 버튼에 리스너를 등록한 후에 binding.root를 리턴합니다. */
    val binding = FragmentListBinding.inflate(inflater, container, false)
    binding.btnNext.setOnClickListener { mainActivity?.getDetail() }
    return binding.root
    ```
    코드의 마지막 줄이 return binding이 아니라 binding.root인 이유는 onCreateView() 메서드의 반환값이 View이기 때문에 바인딩이 가지고 있는 root뷰를 넘겨주는 것입니다.
    ``ListFragment의 전체 코드``
    ```kotlin
    package kr.co.hanbit.fragment

    import android.content.Context
    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import kr.co.hanbit.fragment.databinding.FragmentListBinding

    class ListFragment : Fragment() {

        var mainActivity: MainActivity? = null

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            // Inflate the layout for this fragment
            /* 원본 코드 : inflater로 생성한 뷰를 바로 리턴하는 구조입니다. */
            return inflater.inflate(R.layout.fragment_list, container, false)

            /* 수정 코드 : 바인딩으로 생성한 후 레이아웃에 있는 btnNext 버튼에 리스너를 등록한 후에 binding.root를 리턴합니다. */
            val binding = FragmentListBinding.inflate(inflater, container, false)
            binding.btnNext.setOnClickListener { mainActivity?.goDetail() }
            return binding.root
        }

        override fun onAttach(context: Context) {
            super.onAttach(context)

            if (context is MainActivity) mainActivity = context
        }
    }
    ```

1. 에뮬레이터에서 실행한 후 Next 버튼을 클릭하면 Detail 프래그먼트가 화면에 겹쳐 보입니다. 프래그먼트는 하나의 레이아웃에 한 층씩 쌓이는 형태라서 기본 배경색을 설정하지 않으면 화면이 중첩된 채로 그려집니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-182.png){: style="box-shadow: 0 0 5px #777"}


1. fragment_detail.xml 파일을 열고 컴포넌트 트리의 컨스트레인트 레이아웃을 선택한 다음 속성 영역의 background 속성에 ‘#ff0000’을 입력해서 배경을 빨강색으로 설정합니다.

1. 여기서 한가지 더 해야할 것이 있습니다. 프래그먼트가 중첩되었을 때 아래쪽 프래그먼트에 버튼과 같은 클릭 가능한 요소가 있으면 위쪽 프래그먼트를 통과해서 클릭됩니다. 그래서 예상치 못한 이벤트가 발생할 수 있는데 이를 방지하기 위해서 컴포넌트 트리의 컨스트레인트 레이아웃의 clickable속성을 체크해서 ‘true’로 변경합니다.


1. 이제 마지막으로 DetailFragment.kt의 Back 버튼을 클릭했을 때 ListFragment.kt로 돌아가는 코드를 작성하겠습니다. DetailFragment.kt 파일을 열고 ListFragment.kt에서 한 것과 같은 순서로 코드를 추가합니다. clsss... 바로 밑 첫 줄에 메인 액티비티를 담아두는 변수 miainActivity를 선언합니다. 여기서는 앞의 코드와 조금 다르게 앞에서 공부했던 lateinit을 사용해 보겠습니다.
    ```kotlin
    lateinit var mainActivity: MainActivity
    ```

1. onCreateView() 아래에 onAttach() 메서드를 오버라이드하고 context를 MainActivity로 캐스팅해서 미리 선언한 mainActivity로 캐스팅해서 미리 선언한 mainActivity 변수에 담습니다. if 문으로 타입을 비교하는 대신 as 키워드로 타입 캐스팅 (형 변환) 해서 사용할 수 있습니다.
    ```kotlin
    override fun onAttach(context: Context) {
        super.onAttach(context)

        mainActivity = context as MainActivity
    }
    ```

1. onCreateView()의 코드에서 인플레이트한 레이아웃을 view변수에 담고 버튼에 리스너를 등록한 후 mainActivity의 goBack() 메서드를 호출하도록 수정합니다.
    ```kotlin
    package kr.co.hanbit.fragment

    import android.content.Context
    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import kr.co.hanbit.fragment.databinding.FragmentDetailBinding

    class DetailFragment : Fragment() {

        lateinit var mainActivity: MainActivity

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            val binding = FragmentDetailBinding.inflate(inflater, container, false)
            binding.btnBack.setOnClickListener { mainActivity.goBack() }
            return binding.root
        }

        override fun onAttach(context: Context) {
            super.onAttach(context)

            mainActivity = context as MainActivity
        }
    }
    ```

1. 에뮬레이터를 실행하고 테스트합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-183.png){: style="box-shadow: 0 0 5px #777"}


## 3.3 프래그먼트로 값 전달하기

프래그먼트로 값을 전달하는 방법에는 크게 두 가지가 있습니다.

하나는 프래그먼트 생성 시에 값을 전달하는 것이고, 또 하나는 이미 생성되어 있는 프래그먼트에 값을 전달하는 것입니다.

### 프래그먼트 생성 시 값 전달하기

안드로이드에서는 프래그먼트를 생성하면서 값을 전달하는 방법으로 arguments 를 제공합니다.

arguments는 프래그먼트의 기본 프로퍼티이기 때문에 선언 없이 사용할 수 있습니다.


<style>
.page-container {max-width: 1200px}378‘’
</style>