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











<style>
.page-container {max-width: 1200px}‘’
</style>
