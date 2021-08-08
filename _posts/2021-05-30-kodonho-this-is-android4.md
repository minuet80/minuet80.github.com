---
layout: post
title:  "[IT] - [BOOK] 4강 - 이것이 안드로이드다 with 코틀린 "
description: 화면 구성하기
date:   2021-06-02 11:22:30 +0900
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
대부분의 컨텍스트는 컴포넌트 실행<sup>Runtime</sup>시 함께 생성되고, 생성된 컴포넌트가 가지고 있는 메서드를 호출해서 각각의 도구들을 사용할 수 있습니다.

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
하지만 MainActivity외에 다른 액티비티를 사용할 때는 인텐트에 새 액티비티의 이름을 담아서 시스템에 전달합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-128.png){: style="box-shadow: 0 0 5px #777"}

1. 실행할 대상의 액티비티 이름과 전달할 데이터를 담아서 인텐트를 생성합니다.
1. 생성한 인텐트를 startActivity() 메서드에 담아서 호출하면 액티비티 매니저가 전달합니다.
1. 액티비티 매니저는 인텐트를 분석해서 액티비티를 실행시킵니다.
1. 전달된 인텐트는 최종 목적지인 타깃 액티비티까지 전달됩니다.
1. 타깃 액티비티에서는 전달받은 인텐트에 데이터가 있다면 이를 꺼내서 사용할 수 있습니다.


## 1.3 새 액티비티 만들고 실행하기

1. [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하여 나타나는 메뉴에서 [New] - [Activity] - [Empty Activity] 를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-129.png){: style="box-shadow: 0 0 5px #777"}

1. 액티비티 생성 창의 Activity Name에 ‘SubActivity’라고 입력하면 Layout name은 자동적으로 ‘activity_sub’라고 입력됩니다. 액티비티명은 ``낙타표기법<sup>Camel-Case</sup>``을 사용합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-130.png){: style="box-shadow: 0 0 5px #777"}
    - Launcher Activity : ``Launcher Activity 를 체크``하면 안드로이드 설정 파일인 AndroidManifest.xml 에 런처로 등록되어 프로그램 실행 시 가장 먼저 호출되도록 설정됩니다.

1. 생성된 activity_sub.xml 파일을 열고 화면 상단에 텍스트뷰를 하나 가져다 놓고 속성 영역의 text 속성에 ‘서브 액티비티’라고 입력합니다.


### 메인 액티비티 화면 구성하기

1. ‘Hello World!’가 적힌 텍스트뷰의 text속성에 ‘메인 액티비티’라고 입력합니다. 컨스트레인트는 세방향을 연결하고 아래쪽은 해제한 다음 ‘서브 액티비티’와 같은 위치에 배치합니다. 속성 영역의 Layout 에서 상단 숫자를 같게 입력하면 같은 위치가 됩니다.

1. 버튼을 텍스트뷰 아래에 가져다 놓고 위쪽 컨스트레인트를 텍스트뷰에 연결하고 좌우는 화면의 가장자리에 연결합니다. 버튼의 id속성에는 ‘btnStart’, text속성에는 ‘서브 액티비티 실행’이라고 입력합니다.

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

1. 에뮬레이터에서 실행하면 메인 액티비티 화면에 실행 버튼이 보입니다. 버튼을 클릭하면 서비 액티비티가 실행됩니다.

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

1. 값을 받는 측의 코드를 작성하기 전에, 전달받은 값을 출력할 텍스트뷰 2개를 화면에 배치하겠습니다. activity_sub.xml 을 열고 텍스트뷰 2개를 화면에 배치합니다. 다음 그림처럼 첫 번째 텍스트뷰는 화면 좌측에 위치시키고 id와 text속성에 모두 ‘to1’이라고 입력합니다. 두번째 텍스트뷰는 화면 우측에 위치시키고 id와 text속성에 모두 ‘to2’라고 입력합니다.

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

1. 에뮬레이터에서 실행한 다음 결과를 확인합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-134.png){: style="box-shadow: 0 0 5px #777"}

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

1. 플레인텍스트 하단에 버튼을 하나 추가하고 오른쪽 그림을 참고해서 컨스트레인트를 연결합니다. 버튼의 id속성에는 ‘btnClose’, text속성에는 ‘액티비티 닫기’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-135.png){: style="box-shadow: 0 0 5px #777"}

1. 서브 액티비티가 종료될 때 자신을 호출했던 액티비티로 값을 돌려주는 코드를 추가하겠습니다. SubActivity.kt 파일을 열고 onCreate() 메서드 안에 ‘btnClose’를 입력한 후에 클릭리스너를 달아줍니다.

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

1. MainActivity.kt 안에 SubActivity에서 돌려준 값을 받는 코드를 추가합니다. onCreate() 메서드의 블록 밖을 클릭한 후 ``Ctrl`` + ``O``키를 누릅니다. 메서드 목록 중에서 onActivityResult를 선택하고 [OK]버튼을 클릭하면 코드가 자동으로 생성됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-136.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
    }
    ```

    ``onActivityResult() 메서드 구조``
    
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

1. 해당 메시지를 토스트(Toast)로 화면에 보여주는 코드를 작성합니다. 토스트는 화면에 잠깐 나타났다 사라지는 메시지 출력 도구입니다. 메서드의 닫는 괄호()) 다음에 반드시 .show() 를 호출해야지만 화면에 나타납니다.

    ```kotlin
    Toast.makeText(this, messsage, Toast.LENGTH_LONG).show()
    ```
    
    Toast.makeText의 파라미터
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

1. 여기까지 작성하고 에뮬레이터에서 실행한 후 액티비티 닫기 버튼을 클릭해보세요. 그런데 서브 액티비티는 닫히지만 받는 메인 액티비티에는 아무런 변화가 없습니다. startActivity() 메서드로 실행된 액티비티에서는 값을 돌려받을 수 없기 때문입니다. 메인 액티비티에서 서브 액티비티를 호출한 후 값을 돌려받고 싶을 때는 startActivityForResult() 메서드를 사용해야만 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-137.png){: style="box-shadow: 0 0 5px #777"}


### startActivityForResult() 메서드 사용하기

1. 이어서 MainActivity.kt의 onCreate() 메서드 코드 블록 안에 있는 클릭리스너에서 호출하는 startActivity() 메서드를 startActivityForResult() 로 변경하고 첫 번째 인텐트와 함께 두번째 파라미터는 임시로 ‘99’라는 값을 입력합니다. 두 번째 파라미터는 메인 액티비티에서 서브 액티비티를 호출하는 버튼이 여러 개 있을 때 어떤 버튼에서 호출된 것인지를 구분하는 용도입니다.

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

1. 전체 코드

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
| onResume() | 화면에 나타남 현재 실행중 | 실제 액티비티가 실행되고 있음 |
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

1. 먼저 액티비티를 생성해서 화면에 나타내는 생명 주기를 살펴봅니다. 액티비티는 onCreate() 메서드로 생성된 다음 화면 구성 요소를 메모리에 로드하고, onStart() 와 onResume() 에서 화면의 구성요소를 나타내고 사용자와의 상호작용을 시작합니다. onResume() 메서드 다음의 상태 표시인 Resumed(실행 중) 는 액티비티가 화면에서 실행되고 있음을 나타냅니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-138.png){: style="box-shadow: 0 0 5px #777"}

1. 다음으로 액티비티를 화면에서 제거하는 생명 주기를 살펴봅니다. 액티비티를 벗어나게 되면 소멸과 관련된 생명주기가 시작되는데 뒤로가기를 하거나 finish() 메서드로 액티비티를 종료하면 onPause() 와 onStop() 이 동시에 실행되고, 최종적으로 onDestroy() 가 호출되면서 액티비티가 메모리에서 제거됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-139.png){: style="box-shadow: 0 0 5px #777"}

1. 새로운 액티비티가 생성될 때 현재 액티비티의 생명 주기를 살펴봅니다. 액티비티를 종료하지 않고 현재 액티비티에서 새로운 액티비티를 실행하면 현재 액티비티의 생명주기가 onPause()를 거쳐서 onStop()까지만 호출되고 종료되지는 않습니다. 그리고 새로 생성된 액티비티는 onStart()와 onResume()을 연속적으로 호출한 후 실행 상태가 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-140.png){: style="box-shadow: 0 0 5px #777"}

1. 새로운 액티비티가 현재 액티비티를 모두 가리지 않고 생성될 때 현재 액티비티의 생명 주기를 살펴봅니다. 현재 액티비티에서 실행되는 새로운 액티비티가 반투명하거나 전체 화면이 아니라서 현재 액티비티의 영역이 1dp라도 화면에 표시되면 onPause()까지만 진행된 후 Paused상태에서 대기하고, 새로 생성됐던 액티비티가 종료되면 onStart()를 거치지 않고 바로 onResume() 이 호출됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-141.png){: style="box-shadow: 0 0 5px #777"}


### 액티비티 백스택

백스택<sup>Back Stack</sup>은 액티비티 또는 화면 컴포넌트를 담는 안드로이드의 저장 공간입니다. 액티비티 A에서 액티비티 B를 실행하고, 다시 액티비티 B에서 액티비티 C를 실행하면 다음 그림과 같이 마치 종이가 쌓이듯이 액티비티가 화면 (백스택)에 쌓이게 되고, 사용자는 가장 위에 있는 액티비티를 보게 됩니다.

### 태스크와 프로세스
태스크<sup>Task</sup>는 애플리케이션에서 실행되는 프로세스<sup>Process</sup>를 관리하는 작업 단위입니다. 안드로이드는 애플리케이션의 실행 단위로 프로세스를 사용하는데 먼저 애플리케이션의 실행 단위인 프로세스를 살펴보겠습니다. 다음 그림과 같이 하나의 앱을 만들고 실행하면 앱당 하나의 프로세스가 생성되고 액티비티를 처리합니다.

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
| launchMode | 호출할 엑티비티를 새로 생성할 것인지 재사용할 것인지를 결정합니다. 기본값은 항상 새로 생성하게 되어 있습니다. 네 가지 모드: ``standard``, ``singleTop``, ``singleTask``, ``singleInstance`` |
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
| FLAG_ACTIVITY_CLEAR_TOP | 호출하는 액티비티가 스택에 있으면 해당 액티비티를 Top으로 만들기 위해 그 위에 존재하던 액티비티를 모두 삭제합니다. 예를 들어 액티비티 A/B/C/D/E가 스택에 있을 때 C를 호출하면 D/E를 삭제해서 C를 화면에 나타냅니다. |
| FLAG_ACTIVITY_NEW_TASK | 새로운 태스크를 생성하여 안에 액티비티를 추가할 때 사용합니다. 단, 기존에 존재하는 태스크 중에 생성하려는 액티비티와 동일한 AFFINITY를 가지고 있는 태스크가 있으면 해당 태스크로 액티비티가 들어갑니다. |
| FLAG_ACTIVITY_MULTIPLE_TASK | 호출되는 액티비티를 메인으로 하는 새로운 태스크를 생성합니다. 이렇게 하면 동일한 액티비티를 하나 이상의 태스크에서 열 수 있습니다. FLAG_ACTIVITY_NEW_TASK와 함께 사용하지 않는다면 아무 효과 없는 플래그입니다. |
| FLAG_ACTIVITY_SINGLE_TOP | 호출되는 액티비티가 Top에 있으면 해당 액티비티를 다시 생성하지 않고, 존재하던 액티비티를 다시 사용합니다. 액티비티 A/B/C가 있을 때 C를 호출하면 기존과 동리하게 A/B/C가 나옵니다. |
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

1. 스피너의 컨스트레인트를 좌우는 끝까지 연결하고 위는 텍스트뷰와 연결합니다. 마진은 좌우는 ‘50’, 위는 ‘25’로 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-145.png){: style="box-shadow: 0 0 5px #777"}

1. 혹시 그림과 같이 마진값이 적용되지 않는다면 사각형 중앙의 가로 측 사이즈 조절바를 클릭해서 매치 컨스트레인트(![1]({{site.baseurl}}/images/this-is-android/this-is-android-40.png){: style="box-shadow: 0 0 5px #777"}) 로 만들어줍니다. 또는 layout_width 속성에 ‘0dp’라고 입력해도 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-146.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle파일에 viewBinding설정을 하고 [MainActivity.kt] 탭을 클릭해서 소스코드로 이동합니다. 그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.

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

1. 앞에서 만든 데이터와 스피너를 연결해줄 ArrayAdapter 클래스를 만들어 adapter 변수에 저장합니다. ArrayAdapter클래스는 adapter에서 사용할 데이터 타입을 제네릭으로 지정해야 합니다. 앞에서 문자열로 데이터를 구성했기 때문에 ``<String>``으로 지정합니다. ArrayAdapter의 파라미터는 총 3개이며 (스피너를 화면에 그리기 위한 컨텍스트, 스피너에 보여줄 목록 하나하나가 그려질 레이아웃, 어댑터에서 사용할 데이터) 순으로 입력합니다. 컨텍스트는 this를 사용하고, 레이아웃은 기본으로 제공하는 simple_list_item1을 사용합니다. 마지막 값으로 미리 만들어둔 data변수를 입력합니다.

    ```kotlin
    var dapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, data)
    ```

1. 다음 코드를 입력해 어댑터를 스피너 위젯에 연결합니다. 스피너의 adapter속성에 담아주는 것만으로 간단하게 연결됩니다.

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

1. 코드 블럭 사이를 클릭한 다음 마우스 오른쪽 버튼을 클릭해서 [Generate] - [Implements Methods]를 선택합니다. 나오는 메서드 목록 2개를 모두 선택하면 코드가 자동 완서오디는데 TODO()행은 모두 삭제합니다.

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

1. 이제 스피너를 선택하면 해당 값이 선택 결과의 위치에 표시됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-149.png){: style="box-shadow: 0 0 5px #777"}

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

![1]({{site.baseurl}}/images/this-is-android/this-is-android-150.png){: style="box-shadow: 0 0 5px #777"}

리사이클러뷰처럼 목록을 표시하는 컨테이너들은 표시될 데이터와 아이템 레이아웃을 어댑터에서 연결해주므로 어댑터에서 어떤 아이템 레이아웃을 사용하느냐에 따라 표시되는 모양을 다르게 만들 수 있습니다.


### 화면 구성하기

ContainerRecyclerView 프로젝트를 생성합니다.

1. activity_main.xml 파일을 열고 기본 텍스트뷰는 삭제합니다. 리사이클러뷰 (RecyclerView)를 처음 사용한다면 팔레트의 컨테이너를 클릭했을 때 리사이클러뷰 오른쪽에 [다운로드 아이콘]이 보일 것입니다. 이 상태에서 리사이클러뷰를 드래그해서 UI편집기에 가져다 놓습니다.

1. 다운로드가 완료되면 Item0, Item1... 이라는 글자가 여러 줄 쓰여 있는 리사이클러뷰가 화면에 그려집니다. id 속성에 ‘recyclerView’라고 입력합니다.
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-151.png){: style="box-shadow: 0 0 5px #777"}

1. 컨스트레이트는 상하좌우를 모두 연결합니다. 네 방향을 모두 연결해야 할 때는 아이콘을 하나씩 클릭하는 대신 UI 편집기 상단 [Infer Constraints 아이콘 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-152.png){: style="box-shadow: 0 0 5px #777"}]을 클릭하면 컨스트레인트를 가장 가까운 곳에 모두 연결해줍니다.


1. 여러 개의 정보를 하나의 아이템에 보여줘야 하니 아이템 레이아웃을 레이아웃 파일로 직접 생성하여 사용합니다. [app] - [res] - [layout] 디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Layout Resource File]를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-153.png){: style="box-shadow: 0 0 5px #777"}

1. File name 에 ‘item_recycler’를, Root element에 ‘LinearLayout’을 입력하고 [OK]를 클릭해서 파일을 생성합니다. 다른 값은 건드리지 않습니다. activity_main.xml 아래에 item_recycler.xml이 생성된 걸 확인할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-154.png){: style="box-shadow: 0 0 5px #777"}

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-155.png){: style="box-shadow: 0 0 5px #777"}

1. 리니어 레이아웃의 속성 영역에서 layout_height를 ‘50dp’로 변경합니다. 대부분 match_parent일 텐데 ‘50dp’을 입력하면 바로 수정됩니다. 반드시 뒤에 ‘dp’를 같이 입력해야 합니다. 숫자만 입력하면 오류가 발생할 수 있습니다. 이어서 orientation속성을 ‘horizontal’로 변경하고, gravity 속성에 ‘center_vertical’을 적용합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-156.png){: style="box-shadow: 0 0 5px #777"}

1. 레이아웃 안에 텍스트뷰를 3개 배치합니다. 각각 번호, 제목, 날짜 데이터를 표시할 텍스트뷰입니다. 이어서 layout-weight 속성을 각각 ‘1, 5, 3’으로 수정하면 다음과 같이 보입니다. 가로 비율이 맞지 않으면 각 텍스트뷰의 layout_width 속성을 ‘0dp’로 설정합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-157.png){: style="box-shadow: 0 0 5px #777"}

1. 첫 번째 텍스튜브의 text속성은 ‘01’, id속성은 ‘textNo’로 입력합니다. 두 번째 텍스뷰의 text속성은 ‘Title’, id속성은 ‘textTitle’로 입력하고, 세 번째 텍스트뷰의 text속성은 ‘2021-01-01’, id속성은 ‘textDate’로 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-158.png){: style="box-shadow: 0 0 5px #777"}


### 데이터를 정의하고 가상 데이터 만들기
이제 아이템 레이아웃에 맞춰서 화면에 뿌려질 데이터 클래스를 하나 생성하겠습니다.

번호, 타이틀, 날짜 세 종류의 값을 담을 데이터 클래스를하나 만들겠습니다.

1. java 디렉토리 아래에 있는 기본 패키지명을 마우스 우클릭하여 나타나는 메뉴에서 [New] - [Kotlin File/Class]를 선택합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-159.png){: style="box-shadow: 0 0 5px #777"}

1. 입력 필드에 ‘Memo’를 입력하고, 바로 아래 목록 중에 Data Class를 더블클릭하면 파일이 생성됩니다.

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

1. java 디렉토리 밑에 있는 패키지에 CustomAdapter 클래스를 하나 생성하고 같은 파일 안에 Holder 클래스를 작성하겠습니다.  패키지명을 마우스 우클릭하여 [New] - [Kotlin File/Class]를 선택한 후 나타나는 팝업의 입력란에 ‘CustomAdapter’를 입력하고 그 아래 목록에서 Class를 더블클릭해서 파일을 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-162.png){: style="box-shadow: 0 0 5px #777"}

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-163.png){: style="box-shadow: 0 0 5px #777"}

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

    ``바인딩 생성은 어댑터에서``
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

1. class CustomAdapter... 코드 블록 ({}) 의 중간에서 ``Ctrl`` + ``I``키를 눌러 팝업창에서 3개의 인터페이스를 모두 선택해서 import하면 코드가 자동으로 추가됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-164.png){: style="box-shadow: 0 0 5px #777"}

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

1. 마지막으로 리사이클러뷰에서 확인해봅니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-165.png){: style="box-shadow: 0 0 5px #777"}


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

1. ``StaggeredGridLayoutManager``

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-166.png){: style="box-shadow: 0 0 5px #777"}

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

- 한 번에 여러 개의 프래그먼트가 동시에 화면에 나타나는 형태로 태블릿과 같은 대형 화면을 가진 디바이스에서 메뉴와 뷰를 함께 나타내거나 여러 개의 섹션을 모듈화 한 후 한 화면에 나타낼 때 사용됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-170.png){: style="box-shadow: 0 0 5px #777"}


## 3.1 프래그먼트를 만들어 액티비티에 추가하기

프래그먼트는 단독으로 사용되지 않고 액티비티의 일부로 사용됩니다.

이번에는 프래그먼트를 액티비티에 추가하는 방법을 예제롤 통해서 알아보겠습니다.

Fragment 프로젝트를 하나 생성합니다. 프로젝트가 생성되면 build.gradle 파일을 열고 viewBinding 설정을 합니다.

### 목록 프래그먼트 만들기

1. java 디렉토리 밑에 있는 패키지명을 선택하여 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Fragment] - [Fragment (Black)]를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-171.png){: style="box-shadow: 0 0 5px #777"}

1. Fragment Name에 ‘ListFragment’를 입력하면 해당 프래그먼트가 사용하는 레이아웃인 fragment_list를 자동으로 생성해줍니다.

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

    현재 실습을 하지 않는 코드가 많이 있기 때문에 가독성을 위해 모두 지웁니다.

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

1. 편집기 우측 상단의 [Design] 버튼을 클릭해서 모드를 변경합니다.  텍스트뷰의 layout_width 와 layout_height 속성을 모두 ‘wrap_content’로 바꿉니다. 그 당ㅁ text 속성에 ‘List’를 입력하고 드래드해서 화면 상단 중앙에 가져다 놓고 좌우 그리고 위쪽의 컨스트레인트를 화면 끝에 연결합니다. 위쪽의 거리는 컨스트레인트 편집기에서 ‘32’로 설정해줍니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-173.png){: style="box-shadow: 0 0 5px #777"}

1. 팔레트 영역에서 버튼을 화면 중앙에 추가합니다. 버튼의 좌우 컨스트레인트는화면 가장자리에 연결하고, 위쪽은 텍스트뷰에 연결하며 거리는 ‘24’로 설정합니다. text 속성에 ‘Next’를 입력하고, id 속성에 ‘btnNext’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-174.png){: style="box-shadow: 0 0 5px #777"}


### 액티비티에 프래그먼트 추가하기 

프래그먼트의 기본 화면을 구성한 상태에서 액티비티와 연결하겠습니다.
프래그먼트는 기본적으로 하나의 뷰로 동작하기 때문에 액티비티 안에 뷰를 삽입할 수 있는 레이아웃을 준비해야 합니다.

프래그먼트를 삽입하기 위한 전용 레이아웃으로 컨테이너 카테고리의 ``<fragment>``와 레이아웃 카테고리의 프레임 레이아웃이 있는데, 화면 전환 (목록 <-> 상세)이 필요할 때는 프레임 레이아웃을 사용하는 것이 좋습니다.

``<fragment>``화면 전환 없이 프래그먼트 하나만 화면에 표시할 때 사용합니다.

1. activity_main.xml 파일을 열고 액티비티 영역과 프래그먼트 영역을 구분해주기 위해서 레이아웃을 수정합니다.  기본 텍스트뷰를 화면 상단으로 옮기고 text 속성에 ‘Activity’를 입력합니다. 컨스트레인트는 아래르 제외하고 모두 연결하며 위쪽과의 거리는 ‘16’으로 설정합니다.

1. 레이아웃 카테고리의 프레임 레이아웃을 드래그해서 화면에 가져다 놓고 텍스트뷰 아래 화면이 꽉 차도록 컨스트레인트를 설정합니다. id속성에 ‘frameLayout’을 입력합니다.

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

1. 에뮬레이터에서 실행하면 Activity안에 List가 나타납니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-176.png){: style="box-shadow: 0 0 5px #777"}

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

1. 다시 디자인 모드로 변경하고 컨테이너 카테고리의 ``<fragment>``를 화면에 가져다 놓습니다. 이 때 ``<fragment>``태그를 삽입할 클래스 선택 팝업창이 뜨는데 앞에서 작성한 [ListFragment]를 선택합니다. ``책에서 잘 안되어 다음 그림과 같이 처리함!!``

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-177.png){: style="box-shadow: 0 0 5px #777"}

1. 속성 영역에서 id를 ‘fragmentLayout’으로 변경합니다. ``<fragment>``의 컨스트레인트를 네 방향 모두 연결합니다. 위쪽은 텍스트뷰에 연결합니다. layout_width와 layout_height 속성을 모두 ‘match_constraint’로 변경합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-178.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt 파일을 열고 setFragment() 메서드 안의 내용을 모두 주석 처리합니다.

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

1. [Design] 버튼을 클릭해서 모드를 바꿈니다.  기존 텍스트뷰의 text 속성에는 ‘Detail’을 입력하고 layout_width와 layout_height 속성은 모두 ‘wrap_content’로 바꿉니다. 텍스트뷰를 화면 상단 중앙으로 옮기고 컨스트레인트는 좌우와 위쪽을 연결합니다. 위쪽 거리는 ‘24’로 설정합니다.

1. 텍스트뷰 아래에 버튼을 하나 드래그해서 가져다 놓고, id속성에 ‘btnBlank’, text속성에는 ‘Back’을 입력합니다. 컨스트레인트의 위쪽은 텍스트뷰와 연결하고 거리를 ‘24’로 설정하고 좌우로도 화면 가장자리에 연결합니다.
    
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-179.png){: style="box-shadow: 0 0 5px #777"}


### 메인 액티비티에 두 프래그먼트 연결하기

이제 앞에서 만든 목록 프래그먼트의 Next 버튼을 클릭하면 상세 프래그먼트로 이동하고 다시 상세 프래그먼트의 [Back] 버튼을 클릭하면 목록 프래그먼트로 돌아가는 코드를 작성하겠습니다.  프래그먼트를 메인 액티비티에서 생성하고 프래그먼트를 담는 레이아웃도 메인 액티비티에 있으므로 화면 전환을 위한 기본적인 소스 코드는 메인 액티비티에서 작성합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-180.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt을 열고 ListFragment의 Next 버튼을 클릭했을 때 호출할 goDetail() 메서드를 setFragment() 메서드 아래에 작성합니다. goDetail() 메서드가 호출되면 DetailFragment를 생성해서 메인 액티비티의 frameLayout에 삽입할 겁니다.

    ```kotlin
    fun goDetail()
    ```

1. goDetail() 메서드 안에서 DetailFragment를 생성하고 detailFragment 변수에 저장합니다.

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

1. ListFragment 의 빈 공간을 클릭한 상태에서 키보드의 ``Ctrl`` + ``O``키를 입력하면 메서드를 오버라이드할 수 있는 팝업창이 나타납니다. onAttach(context: Context)메서드를 오버라이드 합니다.

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

1. 에뮬레이터에서 실행한 후 Next 버튼을 클릭하면 Detail 프래그먼트가 화면에 겹쳐 보입니다. 프래그먼트는 하나의 레이아웃에 한 층씩 쌓이는 형태라서 기본 배경색을 설정하지 않으면 화면이 중첩된 채로 그려집니다.

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

1. 에뮬레이터를 실행하고 테스트합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-183.png){: style="box-shadow: 0 0 5px #777"}


## 3.3 프래그먼트로 값 전달하기

프래그먼트로 값을 전달하는 방법에는 크게 두 가지가 있습니다.

하나는 프래그먼트 생성 시에 값을 전달하는 것이고, 또 하나는 이미 생성되어 있는 프래그먼트에 값을 전달하는 것입니다.

### 프래그먼트 생성 시 값 전달하기

안드로이드에서는 프래그먼트를 생성하면서 값을 전달하는 방법으로 arguments 를 제공합니다.

arguments는 프래그먼트의 기본 프로퍼티이기 때문에 선언 없이 사용할 수 있습니다.

번들을 arguments에 전달하면 생성된 프래그먼트에서 arguments로 꺼낼 수 있습니다.


![1]({{site.baseurl}}/images/this-is-android/this-is-android-184.png){: style="box-shadow: 0 0 5px #777"}


앞의 프로젝트에 이어서 작성합니다.

1. MainActivity.kt 파일을 열고 setFragment() 메서드의 첫 번째 줄 val listFragment... 바로 다음 줄에 다음과 같이 번들을 하나 생성한 후 전달할 값을 담습니다. 
    ```kotlin
    var bundle = Bundle()
    bundle.putString("key1", "List Fragment")
    bundle.putInt("ket2", 20210101)
    ```

1. 값이 담긴 번들을 프래그먼트의 arguments에 담습니다.
    ```kotlin
    listFragment arguments = bundle
    ```
    나머지 코드는 그대로 두면 됩니다. 이제 프래그먼트 매너저를 통해서 프래그먼트를 액티비티에 삽입하면 값이 전달됩니다.

1. setFragment() 메서드의 전체 코드입니다.
    ```kotlin
    fun setFragment() {
        val listFragment: ListFragment = ListFragment()

        var bundle = Bundle()
        bundle.putString("key1", "List Fragment")
        bundle.putInt("key2", 20210101)
        listFragment.arguments = bundle

        val transaction = supportFragmentManager.beginTransaction()
        transaction.add(R.id.frameLayout, listFragment)
        transaction.commit()
    }
    ```

1. ListFragment에서 사용하는 레이아웃 파일인 fragment_list.xml 파일을 열고, 화면의 Next 버튼 바로 아래에 텍스트뷰 2개를 추가한 후 다음과 같이 설정합니다. 왼쪽 텍스트의 id속성은 ‘textTitle’, 오른쪽 텍스트의 id속성은 ‘textValue’를 각각 입력하고 컨스트레인트를 연결해서 화면과 비슷하게 배치합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-185.png){: style="box-shadow: 0 0 5px #777"}

1. 프래그먼트에서 전달받은 값을 꺼낼 때에는 arguments에서 직접 꺼낼 수 있습니다. ListFragment.kt파일을 열고 onCreateView() 메서드의 마지막 줄에 있는 return binding.root 바로 윗줄에 코드를 입력합니다. arguements 에서 값을 꺼낸 후 레이아웃에 작성해둔 텍스트뷰에 입력하는 코드입니다.
    ```kotlin
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        /* 원본 코드 : inflater로 생성한 뷰를 바로 리턴하는 구조입니다. */
        //return inflater.inflate(R.layout.fragment_list, container, false)
        /* 수정 코드 : 바인딩으로 생성한 후 레이아웃에 있는 btnNext 버튼에 리스너를 등록한 후에 binding.root를 리턴합니다. */
        val binding = FragmentListBinding.inflate(inflater, container, false)
        binding.btnNext.setOnClickListener { mainActivity?.goDetail() }
        binding.textTitle.text = arguments?.getString("key1")
        binding.textValue.text = "${arguments?.getInt("key2")}"
        return binding.root
    }
    ```

1. 이제 에뮬레이터에서 실행하면 ListFragment에 액티비티에서 전달한 2개의 값이 표시되는 것을 확인할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-186.png){: style="box-shadow: 0 0 5px #777"}

### 생성되어 화면에 보이는 프래그먼트에 값 전달하기

액티비티에서 이미 생성되어 화면에 보이는 프래그먼트로 값을 전달하기 위해서는 프래그먼트에 메서드를 정의하고 fragment.setValue() 의 형태로 만들어둔 메서드를 직접 호출하면 되기 때문에 앞의 코드를 조금 응용해서 사용할 수 있습니다.

1. 앞의 코드에 이어서 따라 해보겠습니다. fragment_list.xml 파일을 열고 텍스트뷰를 하나 더 추가하고 다음과 같이 설정합니다. text속성과 id속성에 ‘textFromActivity’를 입력하고 컨스트레인트를 연결해서 그림과 같이 배치합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-187.png){: style="box-shadow: 0 0 5px #777"}

1. ListFragment.kt를 열고 액티비티로부터 전달받을 문자열을 출력하는 setValue() 메서드를 하나 추가합니다. 메서드 안에서 textFromActivity에 전달받은 문자열을 세팅하는 코드를 다음과 같이 작성하면 되는데 binding이 아직 프로퍼티로 생성되지 않았기 때문에 빨간색으로 나타납니다. 
    ```kotlin
    fun setValue(value: String) {
        binding.textFromActivity.text = value
    }
    ```

1. onCreateView() 메서드의 가장 윗줄에 선언된 binding 변수를 메서드 밖으로 빼서 프로퍼티로 만들어줍니다. 그리고 onCreateView() 메서드 안에서 val 예약어를 삭제하면 클래스 안에서 모두 사용할 수 있게 바뀌면서, 앞에서 빨간색으로 보였던 binding이 정상적으로 보입니다.
    ```kotlin
    lateinit var binding:FragmentListBinding

    var mainActivity: MainActivity? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        /* 원본 코드 : inflater로 생성한 뷰를 바로 리턴하는 구조입니다. */
        //return inflater.inflate(R.layout.fragment_list, container, false)
        /* 수정 코드 : 바인딩으로 생성한 후 레이아웃에 있는 btnNext 버튼에 리스너를 등록한 후에 binding.root를 리턴합니다. */
        binding = FragmentListBinding.inflate(inflater, container, false)
        binding.btnNext.setOnClickListener { mainActivity?.goDetail() }
        binding.textTitle.text = arguments?.getString("key1")
        binding.textValue.text = "${arguments?.getInt("key2")}"
        return binding.root
    }
    ```
1. activity_main.xml 파일을열고 화면에 버튼을 하나 추가하고 id 속성에 ‘btnSend’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-188.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt 파일을 열고 onCreate() 메서드 위에 바인딩을 추가하고, setContentView에는 binding.root를 입력합니다.
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        setFragment()
    }
    ```

1. onCreate() 메서드의 가장 아랫줄에 버튼이 클릭되면 listFragment를 통해서 setValue를 호출하는 코드를 작성합니다. 
    ```kotlin
    binding.btnSend.setOnClickListener { 
        listFragment.setValue("전달할 값")
    }
    ```

1. setFragment() 메서드 안에서 변수로 선언된 val listFragment를 메서드 밖으로 빼서 프로퍼티로 만들어줍니다.
    ```kotlin
    ...
        lateinit var listFragment: ListFragment
        ...
        fun setFragment() {
            listFragment = ListFragment() // 수정한 코드
        ...
    ```
    ``MainActivity.kt의 전체 코드``
    ```kotlin
    package kr.co.hanbit.fragment

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import kr.co.hanbit.fragment.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        lateinit var listFragment: ListFragment

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            setFragment()

            binding.btnSend.setOnClickListener {
                listFragment.setValue("전달할 값")
            }
        }

        fun setFragment() {
            listFragment = ListFragment()

            var bundle = Bundle()
            bundle.putString("key1", "List Fragment")
            bundle.putInt("key2", 20210101)
            listFragment.arguments = bundle

            val transaction = supportFragmentManager.beginTransaction()
            transaction.add(R.id.frameLayout, listFragment)
            transaction.commit()
        }

        fun goDetail() {
            val detailFragment = DetailFragment()
            val transaction = supportFragmentManager.beginTransaction()
            transaction.add(R.id.frameLayout, detailFragment)
            transaction.addToBackStack("detail")
            transaction.commit()
        }

        fun goBack() {
            onBackPressed()
        }
    }
    ```

1. 이제 에뮬레이터에서 실행한 후 SEND 버튼을 클릭하면 setValue() 메서드를 통해서 전달한 값이 ListFragment 화면에 나타나는 것을 확인할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-189.png){: style="box-shadow: 0 0 5px #777"}


### 프래그먼트에 프래그먼트로 값 전달하기

안드로이드는 fragment 버전 1.3.x 부터 프래그먼트 간 통신을 위해 Fragment Listener라는 새로운 기능을 제공합니다.

1. 액티비티를 통한 액션이나 값 전달은 앞의 예제와 같이 사용할 수 있는데, 프래그먼트에서 다른 프로그먼트로 직접 값을 전달하기 위해서는 부가적인 설정이 필요합니다. build.gradle 파일을 열고 아래쪽 dependencies 영역에 프래그먼트 버전 1.3.0-beta02와 코틀린용 fragment 1.3.0 버전을 추가하고 우측 상단에 [Sync Now]를 클릭해 설정을 반영합니다. 
    ```gradle
    dependencies {

        ...

        def fragment_version = "1.3.0-beta02"
        // 자바용 fragment 1.3.0
        //implementation "androidx.fragment:fragment:$fragment_version"
        // 코틀린용 fragment 1.3.0
        implementation "androidx.fragment:fragment-ktx:$fragment_version"
    }
    ```
    
    ``fragment 버전 확인``
    - 책을 쓰는 시점에서 fragment의 버전이 1.3.0-beta02이지만, 책이 출시된 시점에서는 버전이 변경되거나 내장 모듈로 탑재될 수도 있습니다. 
    - [안드로이드 사이트 이동](https://developer.android.com/jetpack/androidx/releases/fragment)


1. 위쪽 android 스코프에 viewBinding 설정도미리 추가합니다.
    ```gradle
    android {
        buildFeatures {
            viewBinding true
        }
    }
    ```

1. java 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Fragment] - [Fragment (Blank)]를 선택합니다. ReceiverFragment 를 생성합니다.

1. 자동으로 같이 생성된 Fragment_receiver.xml 파일을 열고, 가운데 있는 텍스트뷰를 선택한 후 id에 ‘textView’를 입력하고, gravity속성에 ‘center’를 적용합니다. 그리고 text속성에 알아보기 쉽게 ‘리시버’라고 입력해둡니다.

1. ReceiverFragment.kt 파일을 열고 onCreateView() 메서드만 남기고 코드를 모두 삭제합니다.
    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup

    class ReceiverFragment : Fragment() {
        
        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            // Inflate the layout for this fragment
            return inflater.inflate(R.layout.fragment_receiver, container, false)
        }

    }
    ```

1. onCreateView() 메서드 위에 lateinit으로 binding 선언을 다음과 같이 추가합니다. 다른 메서드에서도 사용하기 위해 onCreateView() 메서드 밖에 바인딩을 생성했습니다. 그리고 프래그먼트는 바인딩 생성 시에 onCreateView() 메서드 안에서만 사용할 수 있는 파라미터가 필요하므로 이렇게 앞에서 미리 lateinit으로 선언만하고 진행합니다.
    ```kotlin
    lateinit var binding:FragmentReceiverBinding

    override fun onCreateView(...)
    ```

1. onCreateView() 메서드 안에서 바인딩을 생성해서 binding 프로퍼티에 저장하고 return... 을 수정해서 binding.root를 반환합니다.  이제 binding 프로퍼티에 바인딩을 저장했기 때문에 다른 메서드에서도 가져다 쓸 수 있습니다.
    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import kr.co.hanbit.fragment.databinding.FragmentReceiverBinding

    class ReceiverFragment : Fragment() {

        lateinit var binding: FragmentReceiverBinding

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            binding = FragmentReceiverBinding.inflate(inflater, container, false)
            return binding.root
        }

    }
    ```

1. onCreateView() 아래에서 ``Ctrl`` + ``O`` 키를 눌러 onViewCreated 메서드를 오버라이드합니다.  자동 생선된 onViewCreated... 코드 아랫줄에 다음과 같이 setFragmentResultListener() 메서드를 추가합니다. 파라미터는 "request"를 입력해둡니다. 이제 값을 보내는 측 프래그먼트에서 "request"라는 키로 값을 보내면 이 리스너 안의 코드가 실행됩니다.
    ```kotlin
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setFragmentResultListener("request") {
            key, bundle ->
        }
    }
    ```

1. 계속해서 리스너 블록 안에 코드를 추가합니다. 리스너는 값을 수신하면 key와 bundle 2개의 파라미터를 사용할 수 있는데, 실제 값은 bundle안에 Map 형태로 담겨 있습니다. bundle.getString("키") 로 값을 꺼낼 수 있습니다. 스코프 함수 let을 사용해서 꺼낸 값이 있을 때만 화면의 textView에 값을 세팅하도록 합니다.  setFragmentResultListener에 입력되는 "request" 는 요청 전체에 대한 키이고, bundle.getString에 입력되는 "valueKey"는 요청에 담겨 있는 여러 개의 값 중에 하나의 값을 가르키는 키입니다.
    ```kotlin
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setFragmentResultListener("request") { key, bundle ->
            bundle.getString("valueKey")?.let {
                binding.textView.setText(it)
            }
        }
    }
    ```
    
    이제 수신 측의 코드는 완료되었습니다.

    ``ReceiverFragment.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import androidx.fragment.app.setFragmentResult
    import androidx.fragment.app.setFragmentResultListener
    import kr.co.hanbit.fragment.databinding.FragmentReceiverBinding

    class ReceiverFragment : Fragment() {

        lateinit var binding: FragmentReceiverBinding

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            binding = FragmentReceiverBinding.inflate(inflater, container, false)
            return binding.root
        }

        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)

            setFragmentResultListener("request") { key, bundle ->
                bundle.getString("valueKey")?.let {
                    binding.textView.setText(it)
                }
            }
        }
    }
    ```

1. 값을 전달하는 송식 측 프래그먼트를 만들 차례입니다. 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Fragment] - [Fragment (Blank)]를 선택하고 SenderFragment를 생성합니다.

1. 자동 생성된 fragment_sender.xml 파일을 열과 다음과 같이 화면을 구성합니다. [Code]모드에서 두 번째 줄에 있는 ``<FrameLayout>`` 태그를 ‘ConstraintLayout’으로 변경합니다. 그리고 화면 가운데 2개의 버튼을 배치하고 버튼 이름에 각각 'YES', 'NO' 를 입력합니다. id에도 각각 ‘btnYes’, ‘btnNo’를 입력해 둡니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-190.png){: style="box-shadow: 0 0 5px #777"}

1. SenderFragment.kt 파일을 열고 ReceiverFragment.kt 파일과 마찬가지로 onCreateView 메서드만 남기고 코드를 모두 삭제합니다. onCreateView 메서드 위에 바인딩을 선언합니다. 레이아웃의 이름이 fragment_sender.xml 이기 때문에 바인딩 이름은 FragmentSenderBinding 입니다.

1. 계속해서 onCreateView 안에서 바인딩을 생성하고, binding.root를 반환합니다.
    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import kr.co.hanbit.fragment.databinding.FragmentSenderBinding

    class SenderFragment : Fragment() {

        lateinit var binding:FragmentSenderBinding

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            binding = FragmentSenderBinding.inflate(inflater, container, false)
            return binding.root
        }
    }
    ```

1. onCreateView 메서드 아래에서 ``Ctrl`` + ``O``키를 눌러 onViewCreated 메서드를 오버라이드 합니다.
    ```kotlin
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }
    ```

1. super.onView... 코드 아랫줄에 다음과 같이 코드를 추가합니다. 먼저 YES 버튼이 클릭 됐을 때 값을 전송하는 코드입니다. btnYes에 클릭리스너를 달고, 리스너 안에서 "valueKey" 를 키로 "Yes"를 값으로 갖는 번들을 생성하고 bundle 변수에 저장합니다. 그리고 setFragmentResult 메서드를 "request"와 번들을 입력해서 호출하면 수신 측 프래그먼트로 전달됩니다.
    ```kotlin
    binding.btnYes.setOnClickListener {
        val bundle = bundleOf("valueOf" to "Yes")
        setFragmentResult("request", bundle)
    }
    ```
    - ``번들 만들기``
      - 앞에서 Bundle() 생성자를 통해서 번들을 사용해봤습니다. bundleOf("키" to "값") 메서드를 사용하면 더 간단하게 번들을 만들 수 있습니다.

1. NO 버튼이 클릭 됐을 때 값을 전송하는 코드를 작성합니다. 각각 키는 동일하고 값만 "NO"로 다릅니다.
    ```kotlin
    binding.btnNo.setOnClickListener {
        val bundle = bundleOf("valueOf" to "No")
        setFragmentResult("request", bundle)
    }
    ```
    이제 송신 측도 준비가 되었습니다.
    ``SenderFragment.kt의 전체코드``
    ```kotlin
    package kr.co.hanbit.fragment

    import android.os.Bundle
    import androidx.fragment.app.Fragment
    import android.view.LayoutInflater
    import android.view.View
    import android.view.ViewGroup
    import androidx.core.os.bundleOf
    import androidx.fragment.app.setFragmentResult
    import kr.co.hanbit.fragment.databinding.FragmentSenderBinding

    class SenderFragment : Fragment() {

        lateinit var binding:FragmentSenderBinding

        override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            binding = FragmentSenderBinding.inflate(inflater, container, false)
            return binding.root
        }

        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)

            binding.btnYes.setOnClickListener {
                val bundle = bundleOf("valueOf" to "Yes")
                setFragmentResult("request", bundle)
            }

            binding.btnNo.setOnClickListener {
                val bundle = bundleOf("valueOf" to "No")
                setFragmentResult("request", bundle)
            }
        }
    }
    ```

1. 이제 마지막으로 activity_main.xml 파일을 열고 화면의 위쪽 절반에는 SenderFragment를 배치하고, 아래쪽 절반에는 ReceiverFragment를 배치하겠습니다.

    - ``안드로이드 스튜디오 버전별 Fragment 컨테이너 사용``
        - **``4.2.x 이상``**: Containers 팔레트에 있는 FragmentContainerView를 사용
        - **``4.`.x 미만``**: Containers 팔레트에 있는 Fragment를 사용

1. 사용할 프래그먼트를 선택하는 팝업창이 나타납니다. 먼저 SenderFragment를 선택해서 화면 위쪽에 배치합니다. 위쪽과 좌우 컨스트레인트를 연결하고 높이를 3dp 정도로 미리 고정해두는 것이 배치하기 편합니다.

1. ReceiverFragment를 같은 방식으로 화면 아래쪽에 배치합니다. SenderFragment의 높이를 고정했기 때문에 ReceiverFragment는 상하좌우 컨스트레인트를 모두 연결합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-191.png){: style="box-shadow: 0 0 5px #777"}

1. 에뮬레이터를 실행하고 YES와 NO 버튼을 클릭하면 ‘리시버’에 값이 각각 전달되는 것을 확인할 수 있습니다.



## 3.4 프래그먼트의 생명 주기 관리

프래그먼트는 액티비티와 마찬가지로 화면에 보이는 것을 기준으로 생명 주기 메서드를 가지는데, 생성에 관련된 5개와 소멸에 관련된 5개를 가지고 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-192.png){: style="box-shadow: 0 0 5px #777"}


### 생성 주기 메서드

생성과 관련된 5개의 생명 주기 메서드가 있지만 프래그먼트를 포함하고 있는 액티비티가 화면에 계속 나타나고 있는 상태에서는 onAttach() 부터 onResume() 까지의 메서드가 모두 한 번에 호출됩니다. 

1. onAttach()

  프래그먼트 매너저를 통해 액티비티에 프래그먼트가 추가되고 commit되는 순간 호출됩니다. 
  액티비티 소스 코드에서 var fragment = Fragment() 형태로 생성자가 호출하는 순간에는 호출되지 않습니다.
  파라미터로 전달되는 Context 를 저장해 놓고 사용하거나 또는 Context 로부터 상위 액티비티를 꺼내서 사용합니다. 
  객체지향의 설계구조로 인해 onAttach()를 통해 넘어오는 Context에서만 상위 액티비티를 꺼낼 수 있습니다.

1. onCreate()

  프래그먼트가 생성됨과 동시에 호출됩니다.
  사용자 인터페이스인 뷰와 관련된 것을 제외한 프래그먼트 자원(주로 변수)을 초기화할 때 사용합니다.

1. onCreateView

  사용자 인터페이스와 관련된 뷰를 초기화하기 위해 사용됩니다.

1. onStart()

  액티비티의 startActivity로 새로운 액티비티를 호출하는 것처럼 프래그먼트가 새로 add되거나 화면에서 사라졌다가 다시 나타나면 onCreateView()는 호출되지 않고 onStart()만 호출됩니다. 주로 화면 생성 후에 화면에 입력되 값을 초기화하는 용도로 사용됩니다.

1. onResume()
  onStart()와 같은 용도로 사용됩니다. 다른 점은 소멸 주기 메서드가 onPause() 상태에서 멈췄을 때 (현재 프래그먼트의 일부가 가려지지 않았을 때)는 onStart() 를 거치지 않고 onResume()이 바로 호출된다는 점입니다.


### 소멸 주기 메서드

현재 프래그먼트 위로 새로운 프래그먼트가 add되거나 현재 프래그먼트를 제거하면 소멸 주기와 관련된 메서드가 순차적으로 호출됩니다.

1. onPause()

  현재 프래그먼트가 화면에서 사라지면 호출됩니다. ``주로 동영상 플레이어를 일시정지한다거나 현재 작업을 잠시 멈추는 용도로 사용됩니다.``

1. onStop()

  onPause()와 다른 점은 현재 프래그먼트가 화면에 일부분이라도 보이면 onStop()은 호출되지 않습니다. 예를 들어 add되는 새로운 플래그먼트가 반투명하면 현재 프래그먼트의 생명 주기 메서드는 onPause() 까지만 호출됩니다. ``동영상 플레이어를 예로 든다면 일시정지가 아닌 정지를 하는 용도로 사용됩니다.``

1. onDestroyView()

  뷰의 초기화를 해제하는 용도로 사용됩니다. 이 메서드가 호출된 후에 생성 주기 메서드인 onCreateView()에서 인프레이터로 생성한 View가 모두 소멸됩니다.

1. onDestory()

  액티비티에는 아직 남아있지만 프래그먼트 자체는 소멸됩니다. 프래그먼트에 연결된 모든 자원을 해제하는 용도로 사용됩니다.

1. onDetach()

  액티비티에서 연결이 해제됩니다.

# 4. 뷰 사용하기

뷰<sup>View</sup>는 화면을 구성하는 최소 단위의 컴포넌트라고 할 수 있습니다.

지금까지 화면을 구성하기 위해 컨스트레인트 레이아웃, 리니어 레이아웃 등의 레이아웃과 텍스트 뷰, 버튼 등을 사용했는데 모두 최상위 클래스인 View 클래스를 상속받아서 구현합니다.

TextView 클래스도 View 클래스를 상속받아서 구현되어 있습니다.

```kotlin
open class TextView: View {
    constructor(context: Context): super(context, null, 0) {

    }
    constructor(context: Context, attrs: AttributeSet?): super(context, attrs, 0) {

    }
    constructor(context: Context, attrs: AttributeSet?, defStyleAtr: Int): super(context, attrs, defStyleAttr) {

    }
}
```

레이아웃 파일에서 UI 편집기로 만들어진 텍스트뷰는 다음과 같은 XML 태그로 표현되는데 클래스화 (Inflating) 하는 과정을 거쳐서 TextView 클래스로 변환됩니다.

태그 안의 속성들은 AttributeSet 으로 만들어진 후에 TextView 클래스의 생성자에 파라미터로 전달되고, 안드로이드는 입력된 속성들을 분석해서 화면에 그려줍니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-193.png){: style="box-shadow: 0 0 5px #777"}


TextView 클래스 앞에 ``open 키워드``가 있는 것은 상속으로 확장이 가능하다는 의미입니다.

TextView가 View를 상속받아서 만든 것처럼 TextView 를 상속받아서 얼마든지 확장할 수 있습니다.

## 4.1 뷰 클래스 다루기

위젯과 레이아웃의 최상위 클래스인 View는 화면에 그림을 그리기 위한 메서드를 가지고 있습니다.

텍스트뷰 위젯의 text속성에 ‘안녕하세요’라고 입력하면 TextView는 부모 클래스인 View에 이벽된 문자열을 전달하고, View는 문자열을 받아서 글자 크기, 색상, 위치 등을 결정하고 onDraw() 메서드를 사용해서 화면에 그려줍니다.

onDraw() 메서드의 사용법만 정확하게 이해한다면 원하는 위젯이 없어도 직접 만들어서 사용할 수 있습니다.

### 뷰에 텍스트 출력하기

예제를 따라할 CustomView 프로젝트를 하나 새로 만든 후에 build.gradle 파일을 열고 viewBinding 설정을 추가합니다.

1. MainActivity.kt 파일을 열어서 class MainActivity...밖에 다음과 같이 View를 상속받는 CustomView 클래스를 하나 만듭니다.  View는 컨텍스트를 생성자에서 입력받아야 하므로 CustomView에는 컨텍스트를 입력받는 생성자가 하나 꼭 있어야만 합니다.
    ```kotlin
    class MainActivity: AppCompatActivity() {
        //...
    }

    class CustomView(context: Context): View(context) {
        
    }
    ```

1. customView 안에서 onDraw() 메서드를 오버라이드 합니다. onDraw() 메서드의 파라미터로 넘어오는 Canvas는 일종의 그리기 도구입니다. ``Canvas``에는 그림판과 함께 그림을 그리기 위해서 draw로 시작하는 메서드들이 제공됩니다.
    ```kotlin
    class CustomView(context: Context): View(context) {

        override fun onDraw(canvas: Canvas?) {
            super.onDraw(canvas)
        }
    }
    ```

1. 텍스트를 출력하기 위해서는 Canvas의 drawText() 메서드를 사용하는데, drawText() 메서드는 출력할 문자열, 가로세로 좌표 그리고 글자의 색과 두께 정보를 가지고 있는 Paint가 필요합니다. super.onDraw(canvas) 아랫줄에 Paint를 하나 만들어서 paint 변수에 저장하고, Paint의 color 프로퍼티에 ‘Color.Black’을 입력합니다. 그리고 textSize 프로퍼티에는 ‘100f’를 입력합니다. 값이 타입이 Float 형이기 때문에 숫자 뒤에 f를 같이 입력해야 합니다.
    ```kotlin
    val paint = Paint()
    paint.color = Color.BLACK
    paint.textSize = 100f
    ```

1. 이제 onDraw() 메서드의 파라미터로 전달되는 canvas의 drawText() 메서드를 호출해서 텍스트를 그려줍니다. 첫 번째 파라미터로부터 순서대로 출력할 글자, x좌표, y좌표, 색상 정보입니다. CustomView의 전체 코드는 다음과 같습니다.
    ```kotlin
    class CustomView(context: Context): View(context) {

        override fun onDraw(canvas: Canvas?) {
            super.onDraw(canvas)

            val paint = Paint()
            paint.color = Color.BLACK
            paint.textSize = 100f
            // drawText 메서드
            canvas?.drawText("안녕하세요", 0f, 0f, paint)

        }
    }
    ```

1. activity_main.xml 파일을 열고 ‘Hello World!’가 적인 텍스트뷰의 text속성을 ‘Draw Text’로 바꿔주고 위쪽으로부터 거리는 ‘24’로 설정합니다. 그리고 팔레트의 레이아웃 프레임을 하나 추가하고 텍스트뷰의 위치를 조정하여 다음과 같은 화면을 만듭니다. 프레임 레이아웃의 id속성에는 ‘frameLayout’을 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-194.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt 파일을 열고 바인딩을 생성한 후 binding 변수에 담아둡니다. 그리고 setCnotextView에 binding.root를 입력합니다.

    ```kotlin
    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            
        }
    }
    ```

1. setContentView 아랫줄에 앞에서 만든 CustomView를 생성한 후 frameLayout에 삽입합니다. 레이아웃의 addView() 메서드를 사용하면 소스 코드에서 생성한 뷰를 레이아웃에 삽입할 수 있습니다.
    ```kotlin
    val customView = CustomView(this)
    binding.frameLayout.addView(customView)
    ```

1. 에뮬레이터에서 실행합니다. 다음처럼 ‘안녕하세요’글자의 아래쪽만 살짝 걸친 듯이 출력됩니다. drawText를 할 때 좌표의 기준이 문자열의 좌측 하단이기 때문에 그렇습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-195.png){: style="box-shadow: 0 0 5px #777"}

1. 정상적으로 표시하기 위해서 drawText의 세 번째 파라미터인 y 좌푯값에 텍스트의 크기인 ‘100f’를 입력한 후 다시 한번 실행합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-196.png){: style="box-shadow: 0 0 5px #777"}

1. 앞의 코드에서 CustomView는 항상 ‘안녕하세요’라는 글자면 출력할 수 있습니다. CustomView의 생성자에 문자열을 입력받는 파라미터를 추가해서 내가 원하는 글자를 출력할 수 있도록 변경하겠습니다. CustomView의 생성자에 문자열 타입인 text 파라미터를 추가해보겠습니다. class CustomView(context: Context): View(context) 코드에 ‘text: String’을 다음과 같이 입력합니다. 
    ```kotlin
    class CustomView(text: String, context: Context): View(context)
    ```

1. text 파라미터를 onDraw() 메서드에서 사용하기 위해 text 변수를 하나 선언하고, init 블록에서 생성자를 통해 넘어온 문자열을 저장합니다. onDraw() 메서드 위에 다음 내용을 저장합니다.
    ```kotlin
    val customView = CustomView("안녕 코틀린!", this)
    //..
    canvas?.drawText(text, 0f, 100f, paint)
    ```

1. 에뮬레이터에서 실행하고 확인합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-197.png){: style="box-shadow: 0 0 5px #777"}

    ``MainActiity.kt의 전체 소스``

    ```kotlin
    package kr.co.hanbit.customview

    import android.content.Context
    import android.graphics.Canvas
    import android.graphics.Color
    import android.graphics.Paint
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.view.View
    import kr.co.hanbit.customview.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val customView = CustomView("안녕 코틀린!", this)
            binding.frameLayout.addView(customView)
        }
    }

    class CustomView(text: String, context: Context): View(context) {

        val text: String = text

        override fun onDraw(canvas: Canvas?) {
            super.onDraw(canvas)

            val paint = Paint()
            paint.color = Color.BLACK
            paint.textSize = 100f
            // drawText 메서드
            canvas?.drawText(text, 0f, 100f, paint)

        }
    }
    ```

### 뷰에 그림 그리기

텍스튜뿐만 아니라 일반적인 도형도 뷰에 그릴 수 있습니다.

도형을 그리는데 필요한 Paint의 프로퍼티를 먼저 간단히 정리하겠습니다.

- ``color`` : 대상의 색상. 도형의 색상을 정의합니다.
- ``style`` : 도형의 형태. 외곽선을 그리거나 면을 채우는 등의 모양을 정의합니다. 색상이 Color 클래스에 정의된 것 처럼 사용할 스타일이 Style 클래스에 상수로 미리 정의되어 있습니다. 
  - Style.STROKE, Style.FILL, Style.STROKE_AND_FILL
- ``strokeWidth`` : 외곽선을 그릴 경우 외곽선의 두께를 정의합니다.



1. ``drawCircle()`` : 원그리기
    drawCircle 의 파라미터는 순서대로 (원의 x축 중심, 원의 y축 중심, 반지름, 페인트) 입니다.
    ```kotlin
    val blue = Paint()
    blue.style = Paint.Style.FILL
    blue.color = Color.BLUE
    canvas?.drawCircle(150f, 300f, 100f, blue)
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-198.png){: style="box-shadow: 0 0 5px #777"}


1. ``drawArc()``: 원호 그리기
    STROKKE 스타일을 사용하면 도형의 외곽선을 그릴 수 있습니다.
    ```kotlin
    val red = Paint()
    red.style = Paint.Style.STROKE
    red.color = Color.RED
    canvas?.drawCircle(400f, 300f, 100f, red)
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-199.png){: style="box-shadow: 0 0 5px #777"}


1. ``drawRect()``: 사각형 그리기
    drawRect는 사각형을 그리기 전에 Rect 클래스에 사각형의 left, top, right, bottom 좌표를 입력해서 생성합니다.
    ```kotlin
    val green = Paint()
    green.style = Paint.Style.STROKE
    green.strokeWidth = 20f
    green.color = Color.GREEN
    val rect = Rect(50f, 450f, 250f, 650f)
    canvas?.drawRect(rect, green)
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-200.png){: style="box-shadow: 0 0 5px #777"}

1. ``drawRoundRect()``: 라운드 사각형 그리기
    drawRoundrect는 사각형의 네 귀퉁이에 라운드를 줄 수 있는 메서드인데, roundrect와는 다르게 RectF 클래스를 사용합니다. RectF 클래스는 좌푯값을 Float로 입력하기 때문에 소수점 이하 좌표를 입력해서 조금 더 정밀하게 표현할 수 있습니다. 메서드의 두 번째 (rx)와 세 번째 (ry) 파라미터가 라운드의 크기를 결정하는데 동일한 값을 입력해야만 일반적인 형태의 라운드 사각형이 그려집니다. 
    ```kotlin
    var cyan = Paint()
    cyan.style = Paint.Style.FILL
    cyan.color = Color.CYAN
    val recF = RectF(300f, 450f, 500f, 650f)
    canvas?.frawRoundRect(rectF, 50f, 50f, cyan)s
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-201.png){: style="box-shadow: 0 0 5px #777"}


이런 식으로 View 클래스를 상속받은 후에 onDraw() 메서드로 전달되는 Canvas를 사용하면 원하는 그림을 그릴 수 있습니다.

``<Button>`` 같은 태그로 사용하는 위젯들도 실제로는 View를 상속한 후에 이와 비슷한 형태의 코드로 구성되어 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-202.png){: style="box-shadow: 0 0 5px #777"}


## 4.2 커스텀 위젯 만들기

회사에서는 프로젝트를 진행하면 텍스트뷰와 같은 기본 위젯은 잘 사용하지 않습니다.

보통 기본 위젯을 상속받아 앞에 접두어<sup>Prefix</sup>를 붙여 커스템 위젯으로 사용하는데, 예를 들어 카카오를 다닌다면 KakaoTextView와 같은 이름의 위젯을 사용합니다.

커스텀 위젯에 사용할 접두어<sup>Prefix</sup>를 정하고 나면 위젯의 커스터마이징은 크게 3단계로 진행됩니다.

1. attrs.xml 파일 생성
    새로운 위젯을 생성하고 사용할 때 위젯 이름뿐만 아니라 속성의 이름과 입력되는 값의 타입을 정의하고 사용할 수 있도록 해줍니다.

    ```xml
    <declare-styleable name="CustomWidget">
        <attr name="새로운 속성" format="string" />
    </declare-styleable>
    ```

    레이아웃 파일에서는 태그 속성의 prefix가 android가 아닌 custom을 사용해서 attrs.xml에 저으이된 새로운 속성값을 사용할 수 있습니다.

    ```xml
    <CustomWidtget
        android:id="@+id/button"
        custom: 새로운 속성="값"
        android:text="새로 만든 위젯이에요" />
    ```

1. 커스텀 위젯 클래스 생성
    커스터마이징을 하기 위한 위젯 클래스를 상속받아 클래스를 생성하고 위에서 새롭게 정의한 속성을 처리하는 코드를 작성합니다.
    ```kotlin
    class CustomWidget: TextView {
        constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int): super(context, attrs, defStyleAttr) {

        }
    }
    ```

1. 레이아웃에 태그 적용
    생성된 커스텀 클래스를 레이아웃 파일에 태그로 적용합니다. 커스텀 위젯은 컨스트레인트 레이아웃 처럼 클래스의 패키지 경로명도 함께 입력해서 사용합니다.
    ```kotin
    <패키지명.customWidget
        android:id="@+id/button"
        custom:새로운 속성="값"
        android:text="새로 만든 위젯이에요" />
    ```

### 커스텀 TextView 설계

text 속성의 입력값으로 ‘20210101’이 입력되면 연월일을 구분하기 위해 연월일 사이에 구분값으로 ‘-(하이픈)’을 자동으로 입력해서 화면에 출력하는 위젯을 만들겠습니다.

부가적으로 구분값에 해당하는 delimeter 속성을 하나 만들 텐데, 값이 없으면 Default 로 ‘-’를 사용하고 delimeter에 값이 입력되면 delimeter를 구분자로 사용합니다. 

예를 들어 text 속성에 ‘20210101’이 입력되고 delimeter 속성에 ‘+(더하기)’가 입력되는 화면에서는 ‘2021+01+01’이 나타나야 합니다.

실습을 위해 CustomText 프로젝트를 생성합니다.

### attrs.xml 속성 파일을 생성하고 CustomText 클래스 생성하기

1. [app] - [res] - [values] 디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Value Resource File]을 선택합니다.

1. File name에 ‘attrs’를 입력하고 [OK] 버튼을 클릭하면 파일이 생성됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-203.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 파일의 ``<resources>`` 태그 사이에 다음과 같이 입력합니다. strings나 dimens와는 다르게 정의하는 클래스와 속성을 계층형으로 입력해야 하므로 여러 줄이 필요합니다.
    ```kotlin
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <declare-styleable name="CustomText">
            <attr name="delimeter" format="string" />
        </declare-styleable>
    </resources>
    ```
    이렇게 커스텀 속성 정보를 정의하면 activity_main.xml과 같은 레이아웃 파일에서 새로운 태그로 사용할 수 있습니다.
    ```kotlin
    <CustomText
        android:id="@+id/customtext"
        custom:delimeter="/"
        android:text="20210101" />
    ```

1. [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Kotlin File/Class]를 선택하여 나타난 팝업창의 입력란에 ‘CustomText’를 입력한 후 목록에서 Class를 더블클릭해서 파일을 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-204.png){: style="box-shadow: 0 0 5px #777"}

1. 파일이 열리면 다음과 같이 수정해서 ``AppCompatTextView`` 클래스를 상속받습니다.

    *버전 호환을 위해 기본 위젯인 TextView가 아니라 AppCompatTextView를 상속받습니다.*{: style="color: #ff0000"}

    ```kotlin
    class CustomText: AppCompatTextView {
    }
    ```

1. AppCompatTextView에 빨간색 밑줄이 생기는데 아래와 같이 생성자 3개를 추가하고 super예약어로 AppCompatTextView의 생성자에게 파라미터를 전달합니다. 위젯 클래스를 소스 코드에서 사용할 때는 Context 하나만 입력받는 첫 번째 생성자가 호출되고, 레이아웃 파일에서는 두 번째 생성자가 주로 호출됩니다. 커스텀 위젯은 레이아웃에서도 사용되지만 코드에서도 직접 사용할 수 있게 때문에 항상 3개의 생성자를 모두 작성해두는 것이 좋습니다.
    ```kotlin
    class CustomText: AppCompatTextView {

        constructor(context: Context): super(context) {

        }
        constructor(context: Context, attrs: AttributeSet): super(context, attrs) {

        }
        constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int): super(context, attrs, defStyleAttr) {
            
        }
    }
    ```

1. 두 번째 생성자에 다음과 같은 코드를 작성합니다.
    ```kotlin
    constructor(context: Context, attrs: AttributeSet): super(context, attrs) {
        val typed = context.obtainStyledAttributes(attrs, R.styleable.CustomText)
        val size = typed.indexCount

        for (i in 0 until size) {
            when (typed.getIndex(i)) {
                R.styleable.CustomText_delimeter -> {
                    val delimeter = typed.getString(typed.getIndex(i)) ?: "-"
                    process(delimeter)
                }
            }
        }
    }
    ```

1. delimeter와 입력된 값을 조합해서 처리하는 process() 메서드를 첫 번째 class CustomText... 바로 밑에 다음과 같이 작성합니다.
    ```kotlin
    fun process(delimeter: String) {
        var one = text.substring(0, 4)
        var two = text.substring(4, 6)
        var three = text.substring(6)

        setText("$one $delimeter $two $delimeter $three")
    }
    ```
    ``CustomText.kt의 전체 코드``
    ```kotlin
    package kr.co.hanbit.customtext

    import android.content.Context
    import android.util.AttributeSet
    import androidx.appcompat.widget.AppCompatTextView


    class CustomText: AppCompatTextView {

        constructor(context: Context): super(context) {

        }
        constructor(context: Context, attrs: AttributeSet): super(context, attrs) {
            val typed = context.obtainStyledAttributes(attrs, R.styleable.CustomText)
            val size = typed.indexCount

            for (i in 0 until size) {
                when (typed.getIndex(i)) {
                    R.styleable.CustomText_delimeter -> {
                        val delimeter = typed.getString(typed.getIndex(i)) ?: "-"
                        process(delimeter)
                    }
                }
            }
        }
        constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int): super(context, attrs, defStyleAttr) {

        }

        fun process(delimeter: String) {
            var one = text.substring(0, 4)
            var two = text.substring(4, 6)
            var three = text.substring(6)

            setText("$one $delimeter $two $delimeter $three")
        }
    }
    ```

### 레이아웃에서 CustomText 사용하기

1. activity_main.xml 파일을 열고 화면 가운데 있는 텍스트뷰를 삭제합니다.

1. 팔레트의 가장 아래에 프로젝트(Project)라는 카테고리가 생성되어 있고, 프로젝트 카테고리를 클릭하면 우측에 커스텀텍스트(CustomText) 위젯이 추가된 것을 확인할 수 있습니다.

    *``반드시 안드로이드 스튜디오를 재시작해야 합니다.``*

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-205.png){: style="box-shadow: 0 0 5px #777"}

1. 커스텀 텍스트를 드래그해서 화면 가운데 가져다 놓고 컨스트레인트를 상하좌우 모두 연결합니다. 커스텀 텍스트 위젯을 클릭한 상태에서 text 속성에 ‘20210101’을 입력합니다.

1. 속성 영역의 All Attributes를 펼치면 중간쯤에 delimeter 속성이 추가되어 있습니다. ‘-’을 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-206.png){: style="box-shadow: 0 0 5px #777"}

    - ``View``: 화면에 보이는 모든 요소의 최상위 클래스입니다. 화면에 무엇인가를 그리기 위해서는 View클래스가 상속받아져 있어야 합니다.
    - ``onDraw() 메서드``: View클래스가 화면에 텍스트를 출력하거나 그림을 그릴 때 호출하는 메서드입니다.
    - ``Canvas``: onDraw() 메서드를 통해 전달되는 그리기 도구입니다. drawText(), drawCircle() 등의 메서드를 사용하여 화면에 그릴 수 있습니다.
    - ``Paint``: 화면에 그려지는 요소들의 색상, 스타일, 굵기 정보 등을 정의하는 클래스입니다.
    - ``attrs.xml``: 내가 만든 위젯에 새로운 속성을 정의할 때 사용되는 리소스 파일입니다.
    - ``custom``: attrs.xml에 정의한 새로운 속성을 custom이라는 Prefix로 레이아웃에서 사용할 수 있습니다.


# 5. 탭 메뉴로 화면 구성하기: 뷰 페이저와 탭 레이아웃

안드로이드나 아이폰에서 가장 많이 사용되는 메뉴의 형태는 탭이나 스와이프<sup>swipe</sup>로 화면을 전환하는 혀앹입니다.

아래 그림에서 메뉴를 클릭하면 화면이 전환되고, 화면을 좌우로 스와이프하면 화면 전환과 동시에 메뉴의 인디케이터도 함께 동작합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-207.png){: style="box-shadow: 0 0 5px #777"}

안드로이드에서는 ``스와이프로 화면을 전환할 수 있도록 컨테이너인 뷰페이저<sup>ViewPager</sup>를 제공하고, 탭 메뉴 구성을 위해서는 탭 레이아웃<sup>TabLayout</sup>를 제공합니다.


## 5.1 뷰페이저에서 프래그먼트 사용하기

탭 메뉴와 함께 4개의 화면을 프래그먼트로 구성해보겠습니다. 각 프래그먼트에 해당하는 4개의 메뉴를 탭으로 구성한 다음 탭 메뉴를 클릭하거나 스와이프 (손가락으로 화면을 쓸어 넘기는 동작)을 하면 다음 화면으로 전환됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-208.png){: style="box-shadow: 0 0 5px #777"}

### 프래그먼트 화면 4개 만들기

ViewPager 프로젝트를 하나 새로 생성하고, build.gradle 파일에 viewBinding 설정을 추가합니다.

FragmentA.kt 부터 설명합니다.

FragmentB.kt, FragmentC.kt, FragmentD.kt 도 같은 과정으로 만듭니다.

1. 탐색기의 [app] - [java] 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Fragment] - [Fragment (Blank)]를 선택합니다.

1. Fragment Name에 ‘FragmentA’라고 입력합니다. 레이아웃 이름이 자동으로 생성되는데 fragment_만 있거나 fragment_fragment_a와 같은 이름이 중복되어 있다면 fragment_a로 변경합니다.  클래스의 이름을 참조해 레이아웃 파일의 이름이 결정되는데, fragment_a.xml 형식으로 된 이름을 자동으로 만들기 위해서는 A를 이름 앞에 작성하고 Fragment를 뒤에 붙여서 AFragment라고 하면 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-209.png){: style="box-shadow: 0 0 5px #777"}

1. [Finish] 버튼을 클릭해서 프래그먼트를 생성합니다.

1. fragment_a.xml 파일을 열고 기본으로 생성된 텍스트뷰의 layout_width와 layout_height속성을 ‘wrap_content’로 변경하고, 화면 가운데에 배치합니다. FrameLayout에는 정렬 기능이 따로 없기 때문에 텍스트뷰를 선택한 상태에서 텍스트뷰 속성인 layout_gravity의 값을 ‘center’로 바꿔주면 가운데 정렬이 됩니다. text속성에 ‘프래그먼트A’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-210.png){: style="box-shadow: 0 0 5px #777"}

    FragmentB.kt, FragmentC.kt, FragmentD.kt도 위와 같은 순서대로 작성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-211.png){: style="box-shadow: 0 0 5px #777"}


### 뷰페이저와 어댑터 만들기

뷰페이저<sup>ViewPager</sup>는 리사이클러뷰와 구현 방식이 비슷한데 한 화면에 하나의 아이템만 보이는 리사이클러뷰라고 생각하면 됩니다.

페이저어댑터<sup>PagerAdapter</sup>를 통해서 뷰페이저에서 보일 화면들을 연결하는 구조도 리사이클러뷰와 같습니다.

먼저 메인 레이아웃에 뷰페이저를 배치하고 소스 코드에서 연결하겠습니다.

그 다음 뷰페이저와 연결하기 위한 프래그먼트 어댑터를 만들겠습니다.

1. activity_main.xml 파일을 열고 화면 가운데 있는 텍스트뷰는 삭제합니다.

1. 팔레트의 컨테이너 카테고리에 있는 ViewPager2(안드로이드 스튜디오 4버전 부터 ViewPager가 ViewPager2로 변경됨)를 드래그해서 추가하고, 상하좌우 컨스트레인트를 화면 가장자리에 연결합니다.

1. id에 ‘viewPager’를 입력합니다.

1. 이제 프래그먼트를 뷰페이지에 보여주기 위한 프래그먼트 어댑터를 만들 차례입니다. 마치 리사이클러뷰에서 Adapter를 상속받아 커스텀어댑터를 만들었던 것처럼 프래그먼트를 담을 수 있는 FragmentStateAdapter를 상속받아서 FragmentAdapter를 만들겠습니다. java 디렉토리 밑에 있는 패키지명을 마우스 우클릭하면 나타나는 메뉴에서 우측과 같이 FragmentAdapter 클래스를 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-212.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 클래스 파일에서 FragmentStateAdapter를 상속받도록 소스 코드를 수정합니다. 끝에 괄호를 생략하고 상속받습니다.
    ```kotlin
    class FragmentAdapter: FragmentStateAdapter {
    }
    ```

1. FragmentPagerAdapter 아래에 빨간색 밑줄이 생기는데 글자를 클릭한 후 ``Alt`` + ``Enter`` 키를 눌러 목록에서 [Add constructor parameters...(FragmentActivity)]를 선택해 생성자를 추가합니다.
    ```kotlin
    class FragmentAdapter(fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity) {
    }
    ```

1. 아직 클래스명 아래에 빨간색 밑줄이 생기는데 클릭한 후 ``Alt`` + ``Enter``키를 눌러 목록에서 Implement members를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-213.png){: style="box-shadow: 0 0 5px #777"}

1. 그 다음 선택 창에서 2개의 메서드를 모두 선택하고 [OK]버튼을 클릭하면 코드가 자동 생성됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-214.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    class FragmentAdapter(fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity) {
        override fun getItemCount(): Int {
            TODO("Not yet implemented")
        }

        override fun createFragment(position: Int): Fragment {
            TODO("Not yet implemented")
        }
    }
    ```

    ``FragmentStateAdapter의 필수 메서드``
    - ``createFragment()``: 현재 페이지의 position이 파라미터로 넘어옵니다. position에 해당하는 위치 프래그먼트를 만들어서 안드로이드에 반환해야 합니다.
    - ``getItemCount()``: 어댑터가 화면에 보여줄 전체 프래그먼트의 개수를 반환해야 합니다.


1. 리사이클러뷰어댑터에서 사용했던 것 처럼 페이저어댑터도 화면에 표시해줄 아이템의 목록이 필요합니다. class FragmentAdapter... 밑에 fragmentList 변수를 하나 만들고 초기화합니다. 메뉴 형태로 사용하는 뷰페이저의 화면 아이템은 대부분 중간에 개수가 늘거나 줄지 않고, 처음에 정해진 개수만큼 사용합니다. 그래서 mutableListOf가 아닌 listOf를 사용하는 것이 효율적입니다.
    ```kotlin
    var fragmentList = listOf<Fragment>()
    ```

1. 앞에서 implement 했던 2개의 메서드를 마저 구현합니다. 먼저 페이지의 개수를 결정하기 위해 getItemCount 메서드에서 프래그먼트의 개수를 리턴합니다.
    ```kotlin
    override fun getItemCount(): Int {
        return fragmentList.size
    }
    ```
1. 페이지가 요청될 때 getItem으로 요청되는 페이지의 position값이 넘어옵니다. position값을 이용해서 프래그먼트 목록에서 해당 position에 있는 프래그먼트 1개를 리턴합니다.
    ```kotlin
    override fun createFragment(position: Int): Fragment {
        return fragmentList.get(position)
    }
    ```
    ``FragmentAdapter.kt의 전체 코드``
    ```kotlin
    package kr.co.hanbit.viewpager

    import androidx.fragment.app.Fragment
    import androidx.fragment.app.FragmentActivity
    import androidx.viewpager2.adapter.FragmentStateAdapter

    class FragmentAdapter(fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity) {

        var fragmentList = listOf<Fragment>()

        override fun getItemCount(): Int {
            return fragmentList.size
        }

        override fun createFragment(position: Int): Fragment {
            return fragmentList.get(position)
        }
    }
    ```

### MainActivity에서 연결하기

1. mainActivity.kt 파일을 열고 onCreate() 메서드 위에 바인딩을 생성하여 binding 변수에 저장하고 setCotentView() 에 binding.root를 입력합니다.
    ```kotlin
    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. setContentView 아랫줄에 프래그먼트 목록을 생성하는 코드를 추가합니다.
    ```kotlin
    val fragmentList = listOf(FragmentA(), FragmentB(), FragmentC(), FragmentD())
    ```

1. 어댑터를 생성하고, 앞에서 생성해둔 프래그먼트 목록을 저장합니다. 어댑터의 첫 번째 파라미터에는 항상 supportFragmentManager를 사용합니다.
    ```kotlin
    val adapter = FragmentAdapter(this)
    adapter.fragmentList = fragmentList
    ```

1. 레이아웃의 viewPAger를 import하고 어댑터를 적용합니다.
    ```kotlin
    binding.viewPager.adapter = adapter
    ```
    ``MainActivity.kt의 전체코드``
    ```kotlin
    package kr.co.hanbit.viewpager

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.viewpager.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val fragmentList = listOf(FragmentA(), FragmentB(), FragmentC(), FragmentD())
            val adapter = FragmentAdapter(this)
            adapter.fragmentList = fragmentList
            binding.viewPager.adapter = adapter
        }
    }
    ```

1. 작성한 코드를 실행합니다. 화면을 양옆으로 스와이프해보면 프래그먼트 A부터 D까지 화면이 이동하는 것을 확인할 수 있습니다.


### 탭 레이아웃 적용하기

앞에서 만든 화면의 상단의 탭 메뉴를 배치하고 탭 메뉴 클릭 시 해당 프래그먼트로 이동하는 코드를 작성해보겠습니다.

1. activity_main.xml 파일을 열고 팔레트의 컨테이너에 있는 탭 레이아웃(TabLayout)을 드래그해서 뷰페이저 위에 배치하고 id는 ‘tabLayout’으로 변경합니다. 뷰페이저의 위쪽 컨스트레인트를 삭제한 후 작업하는 것이 편합니다. 탭 레이아웃이 정상적으로 배치되었으면 뷰페이저의 위쪽 컨스트레인트를 탭 레이아웃 아래에 연결하여 다음 그림과 같이 만들어줍니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-215.png){: style="box-shadow: 0 0 5px #777"}

1. ViewPager1과는 다르게 ViewPager2에서는 TabLayoutMediator를 사용하여 TabLayout과 뷰페이저를 연결합니다. 먼저 메뉴명으로 사용할 이름들을 배열에 저장합니다. 앞에서 작성한 MainActivity.kt 파일을 열어 binding.viewPAger.... 다음 줄에 작성합니다.
```kotlin
val tabTitles = listOf<String>("A", "B", "C", "D")
```

1. TabLayoutMediator 를 사용해서 TabLayout과 뷰페이저를 연결합니다. 코드 블럭으로 전달되는 tab 파라미터의 text속성에 앞에서 미리 정의해둔 메뉴명을 입력합니다. 그 다음 코드 블록의 끝에서 attach() 메서드를 호출해서 적용합니다.
    ```kotlin
    TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
        tab.text = tabTitles[position]
    }.attach()
    ```

1. 에뮬레이터에서 실행하면 메뉴와 뷰페이저가 모두 정상적으로 동작합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-216.png){: style="box-shadow: 0 0 5px #777"}

    ``TabLayoutMediator가 추가된 MainActivity.kt의 전체코드``
    ```kotlin
    package kr.co.hanbit.viewpager

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import com.google.android.material.tabs.TabLayoutMediator
    import kr.co.hanbit.viewpager.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val fragmentList = listOf(FragmentA(), FragmentB(), FragmentC(), FragmentD())
            val adapter = FragmentAdapter(this)
            adapter.fragmentList = fragmentList
            binding.viewPager.adapter = adapter

            val tabTitles = listOf<String>("A", "B", "C", "D")
            TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
                tab.text = tabTitles[position]
            }.attach()
        }
    }
    ```

## 5.2 뷰를 사용하는 뷰페이저 만들기

앞에서 프래그먼트를 사용하여 뷰페이저를 구현해봤는데 이는 각각의 화면들이 독립적으로 구성될 필요가 있을 때 사용할 수 있습니다.

그런데 리사이클러뷰에서 하나의 아이템 레이아웃을 사용해서 반복적으로 동일한 구조의 텍스트나 이미지를 보여주는 용도라면 프래그먼트 보다는 뷰를 사용합니다.

목록을 가로로 스와이프해서 보여줄 필요가 있을 때 사용하는데, 일반적인 사진 갤러리 앱이 동작하는 방식을 생각하시면 됩니다.

프래그먼트 대신에 뷰를 사용해서 레이아웃 안의 내용을 교체해보겠습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-217.png){: style="box-shadow: 0 0 5px #777"}

ViewpagerView라는 새 프로젝트를 하나 생성하고 build.gradle 파일에 viewBinding 설정을 추가합니다.

### 아이템 레이아웃 만들기

1. 리사이클러뷰의 아이템 레이아웃처럼 하나의 뷰에서 사용할 아이템 레이아웃을 생성합니다. [res] - [layout] 디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Layout Resource File]을 선택합니다.

1. File name에 ‘item_viewpager’라고 입력하고 파일을 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-218.png){: style="box-shadow: 0 0 5px #777"}

1. 레이아웃 파일 가운데에 텍스트뷰를 하나 가져다 놓고 상하좌우 컨스트레인트를 연결해서 가운데에 오도록 배치합니다. 텍스트뷰의 text속성에 ‘여기제목’을 입력합니다. 텍스트뷰의 id에 ‘textView’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-219.png){: style="box-shadow: 0 0 5px #777"}


### CustomPagerAdapter 만들기

앞에서 생성한 레이아웃을 사용하는 커스텀어댑터를 생성합니다.

목록을 만들 때 사용하는 Recyclerview.Adapter를 상속받아서 사용합니다.

1. CustomPagerAdapter 클래스를 하나 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-220.png){: style="box-shadow: 0 0 5px #777"}

    *이후부터는 리사이클러뷰를 사용하는 방법과 같습니다. 뷰페이저에 리사이클러뷰어댑터를 사용하면 기존에는 세로로 출력되는 것을 가로로 출력되도록 해준다고 생각하면 이해하기가 더 쉽습니다.*

1. 먼저 RecyclerView.ViewHolder를 상속받는 Holder 클래스를 파일 아래쪽에 하나 만듭니다. Holder 클래스의 binding 파라미터로 onCreateViewHolder에서 생성할 바인딩이 전달됩니다. 바인딩 이름은 앞에서 작성한 레이아웃의 이름이 변환된 ItemViewpagerBinding입니다. ViewHolder 클래스의 생성자에는 binding.root를 전달합니다.
    ```kotlin
    class Holder(val binding: ItemViewpagerBinding): RecyclerView.ViewHolder(binding.root) {

    }
    ```

1. Holder 클래스 안에 setText() 메서드를 하나 만들고 item_viewpager 레이아웃 안에 미리 만들어둔 텍스트뷰(id: textView)에 값을 입력하는 코드를 작성합니다. setText() 메서드의 파라미터에는 가상으로 text:String 이라고 미리 정의하고 사용합니다.
    ```kotlin
    class Holder(val binding: ItemViewpagerBinding): RecyclerView.ViewHolder(binding.root) {

        fun setText(text: String) {
            binding.textView.text = text
        }
    }
    ```

1. CustomPagerAdapter에서 RecyclerView.Adapter를 상속받고 제네릭으로 앞에서 만든 Holder 클래스를 지정합니다.
    ```kotlin
    class CustomPagerAdapter: RecyclerView.Adapter<Holder>() {
    }
    ```

1. 클래스 안쪽을 클릭한 상태로 키보드의 ``Ctrl`` + ``I`` 키를 눌러 나타나는 메뉴에서 3개의 메서드를 선택하고 오버라이드 합니다. 자동 생성된 코드에서 TODO 행은 모두 삭제합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-221.png){: style="box-shadow: 0 0 5px #777"}

    ```kotlin
    class CustomPagerAdapter: RecyclerView.Adapter<Holder>() {
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {

        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
        }

        override fun getItemCount(): Int {
        }
    }
    ```

1. 어댑터에서 사용할 textList변수를 선언하고 listOf 함수로 초기화합니다. MainActivity에서 어댑터를 생성한 후 textList 변수로 각각의 페이지에서 보여줄 텍스트를 전달합니다.
    ```kotlin
    var textList = listOf<String>()
    ```

1. getItemCount 메서드는 몇 개의 페이지가 보일 건지 결정합니다.
    ```kotlin
    override fun getItemCount(): Int {
        return textList.size
    }
    ```

1. onCreateViewHolder() 에서 바인딩을 생성한 후 Holder에 전달합니다.
    ```kotlin
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemViewpagerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return Holder(binding)
    }
    ```

1. 마지막으로 onBindViewHolder() 에서 Holder에 만들어준 setText 메서드를 호출해서 화면에 출력합니다.
    ```kotlin
    override fun onBindViewHolder(holder: Holder, position: Int) {
        val text = textList[position]
        holder.setText(text)
    }
    ```
    ``CustomPagerAdapter.kt의 전체 코드``
    ```kotlin
    package kr.co.hanbit.viewpagerview

    import android.view.LayoutInflater
    import android.view.ViewGroup
    import androidx.recyclerview.widget.RecyclerView
    import kr.co.hanbit.viewpagerview.databinding.ItemViewpagerBinding

    class CustomPagerAdapter: RecyclerView.Adapter<Holder>() {

        var textList = listOf<String>()

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            val binding = ItemViewpagerBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            return Holder(binding)
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            val text = textList[position]
            holder.setText(text)
        }

        override fun getItemCount(): Int {
            return textList.size
        }
    }

    class Holder(val binding: ItemViewpagerBinding): RecyclerView.ViewHolder(binding.root) {

        fun setText(text: String) {
            binding.textView.text = text
        }
    }
    ```

### 레이아웃 파일에 ViewPager와 TabLayout 추가하기

앞에서 만든 어댑터를 연결할 화면을 작성합니다. 

프래그먼트에서 작성했던 것과 동일합니다.

1. activity_main.xml 파일을 열고 화면에 있는 텍스트뷰는 삭제합니다. 그리고 팔레트에서 탭 레이아웃을 드래그해서 화면에 가져다 놓습니다.

1. 좌우와 위쪽 컨스트레인트를 연결한 후 id에 ‘tabLayout’을 입력합니다.

1. ViewPager2를 드래그해서 탭 레이아웃 아래에 배치하고 상하좌우 컨스트레인트를 연결합니다.

1. id에 ‘viewPager’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-222.png){: style="box-shadow: 0 0 5px #777"}


### MainActivity 소스 코드 연결하기

끝으로 MainActivity 소스 코드를 연결하겠습니다.

1. MainActivity.kt 파일을 열고 바인딩을 생성해서 binding 변수에 담고 setContentView에 binding.root 를 입력합니다.
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater)}

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

1. 계속해서 setContentView 아래에 소스 코드를 추가합니다. 뷰페이저에서 사용할 데이터를 가상으로 생성한 후 textList 변수에 담습니다.
    ```kotlin
    val textList = listOf<String>("뷰A", "뷰B", "뷰C", "뷰D")
    ```

1. 커스텀어댑터를 생성합니다.
    ```kotlin
    val customAdapter = CustomPagerAdapter()
    ```

1. 생성해둔 가상 데이터를 어댑터에 전달합니다.
    ```kotlin
    customAdapter.textList = textList
    ```

1. viewPager에 어댑터를 연결합니다.
    ```kotlin
    binding.viewPager.adapter = customAdapter
    ```

1. 메뉴명으로 사용할 이름들을 배열에 저장합니다.
    ```kotlin
    val tabTitles = listOf<String>("View A", "View B", "View C", "View D")
    ```

1. TabLayoutMediator를 사용해서 탭 레이아웃과 뷰페이저를 연결합니다. 코드 블록으로 전달되는 tab 파라미터의 text속성에 앞에서 미리 정의해둔 메뉴명을 입력합니다. 코드블록 끝 attach() 메서드를 호출해서 적용합니다. 에뮬레이터에서 실행하고 확인합니다.
    ```kotlin
    TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
        tab.text = tabTitles[position]
    }.attach()
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-223.png){: style="box-shadow: 0 0 5px #777"}

    ``MainActivity.kt의 전체코드``

    ```kotlin
    package kr.co.hanbit.viewpagerview

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import com.google.android.material.tabs.TabLayoutMediator
    import kr.co.hanbit.viewpagerview.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater)}

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val textList = listOf("뷰A", "뷰B", "뷰C", "뷰D")
            val customAdapter = CustomPagerAdapter()
            customAdapter.textList = textList
            binding.viewPager.adapter = customAdapter

            val tabTitles = listOf("View A", "View B", "View C", "View D")
            TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
                tab.text = tabTitles[position]
            }.attach()
        }
    }
    ```


<style>
.page-container {max-width: 1200px}
</style>