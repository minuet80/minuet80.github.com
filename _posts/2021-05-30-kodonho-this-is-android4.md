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


<style>
.page-container {max-width: 1200px}‘’
</style>
