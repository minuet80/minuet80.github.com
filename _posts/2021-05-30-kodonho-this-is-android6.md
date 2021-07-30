---
layout: post
title:  "[IT] - [BOOK] 6강 - 이것이 안드로이드다 with 코틀린 "
description: 파일 입출력과 SharedPreferences
date:   2021-06-04 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android6/
width: large
---

* some text
{: toc}

# 1. 파일 입출력

안드로이드는 텍스트, 이미지, 음원, 영상 등의 파일을 읽고 쓸 수 있도록 파일 입출력 도구를 제공합니다.

파일 입출력<sup>File I/O, File Input Output</sup>이라는 용어는 기계의 입장에서 사용되는 용어로 기기에 저장하는 것을 입력이라 하고 사용자나 다른 기기에 전달하는 것을 출력이라고 합니다.

## 1.1 저장소의 종류와 권한

안드로이드는 리눅스 위에 가상 머신이 동작하는 플랫폼입니다.

그래서 내부적으로 리눅스 기반의 파일 시스템으로 구성되어 있습니다.

리눅스 파일 시스템의 특징 중 하나는 파일과 디렉토리에 대한 권한 설정인데, 설치된 앱 하나당 리눅스 사용자 아이디와 그에 해당하는 디렉토리가 할당되며 각각의 디렉토리는 해당 사용자만 접근할 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-230.png){: style="box-shadow: 0 0 5px #777"}


이렇게 특정 앱의 사용자가 접근할 수 있는 영역을 내부 저장소<sup>Internal Storage</sup>라 하고, 모든 앱이 공용으로 사용할 수 있는 영역을 외부 저장소<sup>External Storage</sup>라고 합니다.

### 내부 저장소 (앱별 저장 공간)

내부 저장소는 설치한 앱에 제공되는 디렉토리 입니다. 

A앱을 설치하면 /data/data/A 디렉토리가 생성되며 A앱은 해당 디렉토리에 한해서만 특별한 권한이 없어도 읽고 쓸 수 이씃ㅂ니다.

A앱이 해당 디렉토리의 소유주<sup>owner</sup>이기 때문입니다.

내부 저장소에는 주로 내 앱에서만 사용하는 데이터를 저장합니다.

예를 들어 일기장 앱이라면 일기의 내용을 다른 앱이 공유할 필요가 없으므로 데이터를 내부 저장소에 저장하는 것이 좋습니다.


### 외부 저장소 (공유 저장 공간)

외부 저장소는 모든 앱이 함께 사용할 수 있는 공간입니다.

외부 저장소에 저장된 파일에 접근하려면 앱의 매니페이스에 접근하려는 파일은 물론 외부 저장소 디렉토리의 권한을 명세해야 합니다.

```xml
<!-- 외부 저장소 읽기 권한 -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<!-- 외부 저장소 쓰기 권한 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

외부 저장소에 기록되는 내용은 사용자가 앱을 제거한 뒤에도 저장되어야 하는 데이터이거나 다른 앱도 접근할 수 있는 데이터여야 합니다.

화면 캡쳐나 다운로드한 파일 등이 좋은 예입니다.


## 1.2 내부 저장소 파일 읽기

파일을 활용할 때는 텍스트 파일이냐 아니냐에 따라서 파일을 읽고 쓰기 위해 사용하는 API가 달라지므로 먼저 파일의 형태를 알아야 합니다.

### 파일 사용하기

파일 정보를 사용하려면 File 클래스를 먼저 생성해야 합니다.

그리고 생성된 File 클래스를 통해서 각종 정보를 얻거나 기능을 사용할 수 있습니다.

File은 파일 또는 디렉토리의 경로를 생성자에 입력해서 생성할 수 있습니다.

디렉토리도 일종의 파일이기 때문에 입력된 경로에 따라 파일이 될 수도 있고 디렉토리가 될 수도 있습니다.

이렇게 생성된 File을 변수에 저장해두고 File에 제공하는 메서드를 이용해서 정보를 처리하면 됩니다.

```kotlin
val file = File("경로")
```

또 다른 방법으로는 파일의 경로와 파일명을 입력해서 생성할 수도 있습니다.

파일의 경로는 컨텍스트가 가지고 있는 filesDir 프로퍼티를 통해 내부 저장소의 files 디렉토리에 접근할 수 있습니다.

컨텍스트를 상속받은 액티비티나 프래그먼트에서 바로 사용할 수 있기 때문에 files라는 동일한 공간에 읽고 쓰기를 한다면 다음과 같은 방식이 편리합니다.

```kotlin
val file = File(baseContext.filesDir, "파일명")
// 액티비티의 경우 filesDir이 기본 프로퍼티 입니다.
val file = File(filesDir, "파일명")
```

File 클래스를 사용해 생성된 파일은 코드에서 다음과 같이 사용할 수 있습니다.

#### exists

File의 존재 여부를 확인합니다.

```kotlin
if (file.exists()) {
    Log.d("File", "파일이 존재합니다.")
}
```

#### isFile

File의 생성자에 전달된 경로가 파일인지를 확인합니다.

```kotlin
if (file.isFile) {
    Log.d("File", "파일입니다.")
}
```

#### isDirectory

File의 생성자에 전달된 경로가 디렉토리인지를 확인합니다.

```kotlin
Log.d("File", "디렉토리입니다.")
```

#### name

생성된 파일 또는 디렉토리의 이름을 반환합니다.

```kotlin
Log.d("File", "이 파일(디렉토리)의 이름은 ${file.name}입니다.")
```

#### createNewFile()

해당 경로에 파일이 존재하지 않으면 createNewFile()로 파일을 생성하며 보통 exists()와 함께 사용합니다.

```kotlin
if (!file.exists()) {
    file.createNewFile()
}
```

#### mkdirs() 

디렉토리를 생성합니다.

```kotlin
if (!file.exists()) {
    file.mkdirs()
}
```

#### delete()

파일이나 디렉토리를 삭제합니다. 디렉토리 내부에 파일이 존재한다면 삭제되지 않습니다.

```kotlin
file.delete()
```

#### absolutePath

파일 또는 디렉토리의 절대경로를 반환합니다.

절대 경로는 시스템 루트 (/)부터 시작하는 경로입니다. 

일반적으로 파일을 저장하거나 읽을 때는 절대경로를 기준으로 사용합니다.

```kotlin
Log.d("File", "이 파일(디렉토리)의 절대경로는 ${file.absolutePath}입니다.")
```

### 파일을 읽고 쓰는 스트림

파일의 기본 정보는 File 클래스를 사용해서 간단하게 처리할 수 있는데 반해서, 파일의 실제 데이터를 읽고 쓰려면 스트림<sup>stream</sup>이라는 복잡한 클래스를 사용합니다.

스트림은 파일에 파이프를 하나 연결해 놓고 해당 파이프를 통해서 데이터를 꺼내오는 방식으로 동작합니다.

파일의 크기를 특정할 수 없기 때문에 읽거나 쓸 때만 파이프를 연결하고 사용이 끝나면 파이프를 제거하는 방식으로 컴퓨터 자원을 효율적으로 사용합니다.

스트림은 읽는 용도와 쓰는 용도가 구분되어 있으며 읽기 위해서는 읽기 전용 스트림을, 쓰기 위해서는 쓰는 전용 스트림을 사용해야 합니다.


### 텍스트 파일 읽기

텍스트 파일을 읽을 때는 Reader 계열의 스트림을 사용합니다.

FileIO 프로젝트를 만들어 예제를 따라 하면서 파일 경로를 파라미터로 전달받아 파일 정보를 읽은 후에 스트림을 사용해서 파일의 실제 데이터를 읽는 방법을 하나씩 알아보겠습니다.

1. [app] - [java] 디렉토리 밑에 있는 패키지 밑에 FileUtil 클래스를 생성합니다.

1. FileUtil.kt 파일을 열고 fullPath 파라미터로 파일의 경로를 전달받는 메서드를 FileUtil 클래스 안에 생성합니다. 그리고 result 변수로 파일을 읽은 결괏값을 리턴합니다.
    ```kotlin
    fun readTextFile(fullPath: String): String {
        // 이 후 작성하는 코드는 이 안에 적습니다.
    }
    ```

1. 여기서부터는 readTextFile() 메서드의 코드 블록 안에 한 줄씩 순서대로 코드를 작성합니다.  먼저 전달된 fullPath 경로를 File로 생성하고 실제 파일이 있는지 검사합니다. 없으면 공백값을 리턴합니다.
    ```kotlin
    val file = File(fullPath)
    if (!file.exists()) {
        return ""
    }
    ]
    ```

1. FileReader로 file을 읽고 BufferedReader에 담아서 속도를 향상시킵니다.
    ```kotlin
    val reader = FileReader(file)
    val buffer = BufferedReader(reader)
    ```

1. buffer를 통해 한 줄씩 읽은 내용을 임시로 저장할 temp 변수를 선언하고 모든 내용을 저장할 StringBuffer를 result 변수로 선언합니다.
    ```kotlin
    var temp = ""
    val result = StringBuffer()
    ```

1. while문을 반복하면서 buffer에서 한 줄씩 꺼내 temp변수에 담고 그 값이 null이라면 더 이상 읽을 내용이 없으니 반복문을 빠져나갑니다.  값이 있다면 (null이 아니라면 ) result 변수에 append() 합니다.
    ```kotlin
    while (true) {
        temp = buffer.readLine()
        if (temp = null) {
            break
        } else {
            result.append(buffer)
        }
    }
    ```

1. buffer를 close()로 닫고 결괏값을 리턴합니다.
    ```kotlin
    buffer.close()
    return result.toString()
    ```

    ``파일 읽기 메서드의 전체 코드``

    ```kotlin
    fun readTextFile(fullPath: String): String {
        val file = File(fullPath)
        if (!file.exists()) {
            return ""
        }

        val reader = StringBuffer()
        while (true) {
            temp = buffer.readLine()
            if (temp == null ) {
                break
            } else {
                result.append(buffer)
            }
        }
        buffer.close()
        return result.toString()
    }
    ```

    내부 저장소에서 파일을 읽으려면 내부 저장소인 filesDir과 파일명을 조합합니다. 그리고 readTextFile() 파라미터로 넘기면 됩니다. 디렉토리와 파일명 사이를 슬래시(/)로 구분하거나 File.pathSeparator로 구분할 수 있습니다. 

    ```kotlin
    var content = readTextFile("${filesDir}/파일명.txt")
    ```

### openFileInput을 사용해서 코드 축약하기

안드로이드는 파일을 읽어서 스트림으로 반환해주는 openFileInput을 읽기 메서드로 제공합니다. 

openFileInput과 함께 몇 개의 메서드들을 조합하면 다음과 같이 짧은 코드로 텍스트 파일을 읽을 수 있습니다.

```kotlin
var contents = ""
context.openFileInput("파일 경로").bufferedReader().useLines { lines -> {
    contents = lines.joinToString("\n")
}
```

## 1.3 내부 저장소에 파일 쓰기

쓰기도 역시 일기와 동일합니다.

### 텍스트 파일 쓰기

파일은 읽기보다 쓰기가 조금 더 단순한 로직으로 구성되어 있습니다. 

계속해서 FileUtil 클래스에 코드를 작성합니다.

1. 쓰기 파일은 총 3개의 파라미터를 사용합니다. 파일을 생성할 디렉토리, 파일명, 작성할 내용 이렇게 3개의 값이 전달되어야 합니다.  먼저 3개의 파라미터를 가진 메서드를 생성합니다.
    ```kotlin
    fun writeTextFile(directory: String, filename: String, content: String) {
        // 이후 작성하는 코드는 이 안에 작성합니다.
    }
    ```

1. directory가 존재하는지 검사하고 없으면 생성합니다. 파일처럼 디렉토리도 File객체에 경로를 전달하면 상태를 체크할 수 있습니다.
    ```kotlin
    val dir = File(directory)
    if (!dir.exists()) {
        dir.mkdirs()
    }
    ```

1. 디렉토리가 생성되었다면 디렉토리에 파일명을 합해서 FileWriter로 생성합니다. 생성된 FileWriter를 buffer에 담으면 쓰기 속도가 향상됩니다.
    ```kotlin
    val writer = FileWriter(directory + "/" + filename)
    val buffer = BufferedWriter(writer)
    ```

1. buffer로 내용을 쓰고 close()로 닫습니다.
    ```kotlin
    buffer.write(content)
    buffer.close()
    ```

    ``파일 쓰기 메서드의 전체 코드``

    ```kotlin
    fun writeTextFile(directory: String, filename: String, content: String) {
        val dir = File(directory)
        if (!dir.exists()) {
            dir.mkdirs()
        }
        val writer = FileWriter(directory + "/" + filename)
        val buffer = BufferedWriter(writer)
        buffer.write(content)
        buffer.close()
    }
    ```

    내부 저장소에 텍스트 파일을 쓸 때는 다음과 같이 사용합니다.

    ```kotlin
    writeTextFile(filesDir, "filename.txt", "글의 내용")
    ```

### openFileOutput으로 쓰기 코드 축약하기

읽기와 마찬가지로 파일 쓰기도 openFileOutput() 메서드러 다음과 같이 축약해서 사용할 수 있습니다.

파일명 다음에 입력되는 Context.MODE_PRIVATE 대신에 Context.MODE_APPEND를 사용하면 기존에 동일한 파일명이 있을 경우 기존 내용에 이어서 새로운 내용을 저장할 수 있습니다.

```kotlin
val contents = "Hello\nworld!"
context.openFileOutput("파일명", Context.MODE_PRIVATE).use { stream -> 
    stream.write(contents.toByteArray())
}
```

내용이 담긴 contents 변수는 스트림에 쓸 때 바이트 배열 (ByteArray)로 변환해야 합니다.

외부 저장소에 쓰이는 9장의 ‘카메라 갤러리’에서, 읽기는 11장의 ‘컨텐트 리졸버’에서 다루겠습니다.


# 2. SharedPreferences

안ㄷ로이드 플랫폼은 간단한 데이터의 저장을 목적으로 SharedPreferences를 제공합니다.

앞에서 공부한 파일은 사용하기가 까다롭고 외부 저장소에 저장할 때는 권한 설정이 필요한 반면, SharedPreferences는 내부 저장소를 이용하기 때문에 권한 설정이 필요 없고 훨씬 간단한 코드로 사용할 수 있습니다.

주로 로그인 정보나 앱의 상태 정보를 저장하는 용도로 사용되는데 액티비티에서 인텐트에 값을 넣고 빼는 것과 비슷한 형태로 동작합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-231.png){: style="box-shadow: 0 0 5px #777"}

## 2.1 SharedPreferences를 사용하고 데이터 저장하기

SharedPreferences는 인텐트에 값을 전달하듯이 데이터를 키와 값 쌍으로 저장할 수 있습니다.

데이터는 XML 형식으로 된 파일로 저장되며 앱이 종료되어도 남아 있습니다.

### SharedPreference 사용하기

SharedPreference를 사용하기 위해선는 몇 가지 과정이 필요합니다.

값을 저장하기 위해서는 마지막에 꼭 apply()를 해줘야 하지만 읽어올 때는 필요하지 않습니다.

먼저 4단계를 거쳐 값을 저장합니다.

- 1단계: SharedPreference 생성하기
- 2단계: Editor꺼내기
- 3단계: putInt(), putString() 메서드로 저장하기
- 4단계: apply()러 파일에 반영하기

그리고 2단계에 걸쳐 값을 읽어옵니다.

- 1단계: SharedPreference 생성하기
- 2단계: getInt(), getString() 메서드로 값 읽어오기

값을 읽어올 때는 apply() 가 필요하지 않습니다.

#### getSharedPreferences()

getSharedPreferences() 는 Context를 가지고 있는 모든 컴포넌트에서 접근과 호출이 가능합니다.

getSharedPreferences(이름, 모드)를 액티비티에서 호출하면 SharedPreferences가 반환됩니다.

```kotlin
val shared = getSharedPreferences("이름", Context.MODE_PRIVATE)
```

첫 번째 파라미터에는 입력된 데이터가 저장될 파일명을, 두 번째 파라미터에는 파일 접근 권한을 설정합니다.

MODE_PRIVATE, MODE_WORLD_READABLE, MODE_WORLD, WRITEABLE의 접근 권한이 있지만, API Level 17 부터 보안상의 이유로 MODE_PRIVATE만 사용합니다.


#### getPreferences()

개별 액티비티에서 사용하거나 액티비티가 하나밖에 없는 앱이라면 getPreferences()를 호출해서 사용할 수 있습니다.

호출하는 액티비티의 이름으로 저장 파일이 생성됩니다.

```kotlin
var preference = getPreferences(Context.MODE_PRIVATE)
```

#### Editor로 데이터를 저장하고 불러오기

SharedPreferences로 데이터를 저장하기 위해서는 Editor 인터페이스를 사용해야 합니다.

Editor 인터페이스는 edit() 메서드를 호출해서 사용할 수 있습니다.

```kotin
val shared = getSharedPreferences("이름", Context.MODE_PRIVATE)
val editor = shared.edit();
```

데이터를 저장할 때는 입력될 값의 타입에 맞는 Editor의 메서드를 사용해서 저장할 수 있는데, 마지막에 apply() 메서드를 호출해야 하지만 실제 파일에 반영됩니다.

```kotlin
val shared = getSharedPreferences("이름", Context.MODE_PRIVATE)
val editor = shared.edit()
editor.putString("키", "값")
editor.apply()
```

다음 메서드로 데이터를 저장할 수 있습니다.

메서드 이름의 접두사<sup>prefix</sup>인 put 다음에 나오는 문자가 입력값의 타입입니다.

putFloat() 이면 Float형을 저장하는 메서드입니다.

또 key = 이름표, value = 타입별 저장할 값이 들어갑니다.

- putFloat(key: String, value: Float)
- putLong(key: String, value: Long)
- putInt(key: String, value: Int)
- putString(key: String, value: String)
- putBoolean(key: String, value: Boolean)
- putStringSet(key: String, value: Set\<String\>)

반면 데이터를 불러올 때는 저장할 때와는 다르게 중간에 Editor를 사용하는 단계가 없으며, SharedPreferences 의 메서드를 직접 호출해서 데이터를 불러옵니다.

defaultValue를 지정하면 해당 키의 데이터가 없으면 지정한 기본값을 반환합니다.

```kotlin
val shared = getSharedPreferences("이름", Context.MODE_PRIVATE)
shared.getString("키", "기본값")
```

다은 메서드들로 데이터를 불러올 수 있습니다.

메서드의 사용법은 put과는 다르게 입력값이 들어가는 파라미터 대신에 기본값을 지정할 수 있습니다.

- getFloat(key: String, defaultValue: Float)
- getLong(key: String, defaultValue: Long)
- getInt(key: String, defaultValue: Int)
- getString(key: String, defaultValue: String)
- getBoolean(key: String, defaultValue: Boolean)
- getStringSet(key: String, defaultValue: Set\<String\>)

그 외에도 Editor를 사용해서 삭제 처리도 할 수 있습니다. 

삭제 처리 후에도 apply() 를 호출해야 합니다.

| 메서드 | 설명 |
| :--- | :--- |
| remove(String key) | 해당 키의 데이터를 삭제합니다. |
| clear() | 모든 데이터를 삭제합니다. |
| apply() | 변경한 업데이트를 파일에 비동기적으로 저장합니다. |
| commit() | 변경한 업데이트를 동기적으로 저장합니다. 동기 작업이므로 UI 스레드에서 호출하는 것을 피해야 합니다. |


## 2.2 설정 화면 만들기

안드로이드는 레이아웃 파일을 이용해서 화면을 구성하지 않아도 설정 화면을 만들 수 있는 SharedPreferences API를 제공합니다.

안드로이드 10부터 AndriodX Preference 라이브러리의 PreferenceFragment를 사용해 설정 화면을 만들 수 있습니다.

예제를 따라 하면서 설정 화면을 만드는 방법을 알아보겠습니다.

### androidx.preference 의존성 추가하기

AndroidX Preference를 사용하기 위해서는 라이브러리가 설치되어야 합니다.

특정 라이브러리가 있어야만 프로그램이 동작하며 해당 라이브러리 의존성<sup>dependency</sup>이 있다고 표현합니다.

1. Gradle Scripts 디렉토리 밑에 있는 build.gradle 파일을 엽니다.

1. 다음처럼 dependencies { 바로 밑에 androidx.preference 의존성을 추가합니다. }
    ```kotlin
    def preference_version = "1.1.1"
    implementation "androidx.preference:preference-ktx:$preference_version"
    ```

    ``프로젝트 스트럭처에서 의존성 추가하기``
    1. build.gradle 파일 열기
    1. 에디터 우측 상단에 [Open] 버튼 클릭
    1. 좌측 메뉴에서 Dependencies 선택
    1. 가운데 Declared Dependencies 아래에 있는 + 버튼 (Add Dependency) 클릭
    1. Library Dependency 선택
    1. [Step 1.]의 입력 필드에 preference 입력 후 Search 버큰 클릭
    1. 검색된 목록에서 Group ID가 androidx.preference인 것 선택
    1. 오른쪽 Versions에서 rc, 또는 beta없이 숫자로만 이루어진 버전 선택 (2021년 2월 기준으로 1.1.1)
    1. [Step 2.]에 implementation 선택된 것 확인
    1. OK버튼을 클릭하여 의존성 추가


### PreferenceScreen 화면 정의

preferences.xml 파일에 설정 화면에서 사용할 화면 구조를 XML로 정의해두면 안드로이드가 정의된 XML의 구조를 분석해서 화면을 그려줍니다.

1. 리소스 디렉토리 res를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Android Resource File]를 선택합니다.

1. 다음 그림과 같이 입력 필드를 채우고 [OK] 버튼을 클릭해 파일을 생성합니다.
    - File name: preferences
    - resource type: XML
    - Root element: PreferenceScreen
    - Source set: main
    - Directory name: xml (xml 디렉토리가 생성되고 그 안에 preferences.xml이 생깁니다.)

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-232.png){: style="box-shadow: 0 0 5px #777"}

1. preferences.xml 파일을 [Code] 모드로 변경한 다음 화면에 보여줄 설정 화면의 구조를 XML로 작성합니다. \<PreferenceScreen\>태그 다음 계층에 설정하는 화면에 보여질 카테고리를 구성합니다. 카테고리는 주로 입력 필드의 그룹명을 출력하는 용도로 사용됩니다.
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">

        <PreferenceCategory
            android:title="기능 설정"
            app:iconSpaceReserved="false">


        </PreferenceCategory>

        <PreferenceCategory
            android:title="옵션 설정"
            app:iconSpaceReserved="false">

        </PreferenceCategory>

    </PreferenceScreen>
    ```

1. 각각의 카테고리 안에 실제 입력 필드를 구성합니다. 각각의 입력 필드를 2개의 타케고리에 골고루 배치합니다. 다음 코드와 똑같이 배치할 필요는 없지만 key, title, icon속성은 타입에 맞춰서 그래돌 사용하는게 좋습니다.  중간에 ListPreference에는 XML 로 정의된 목록 데이터가 필요하므로 일단 이름만 먼저 정의합니다.
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">

        <PreferenceCategory
            android:title="기능 설정"
            app:iconSpaceReserved="false">

            <CheckBoxPreference
                android:key="key_add_shortcut"
                android:title="바로가기 아이콘"
                android:icon="@mipmap/ic_launcher"
                android:defaultValue="true" />

            <SwitchPreference
                android:key="key_switch_on"
                android:title="화면 꺼짐"
                android:icon="@mipmap/ic_launcher"
                android:defaultValue="false" />


        </PreferenceCategory>

        <PreferenceCategory
            android:title="옵션 설정"
            app:iconSpaceReserved="false">

            <EditTextPreference
                android:key="key_edit_name"
                android:title="이름"
                android:summary="이름을 입력하세요"
                android:dialogTitle="이름 입력"
                app:iconSpaceReserved="false" />

            <ListPreference
                android:key="key_set_item"
                android:title="목록 선택형"
                android:summary="목록"
                android:entries="@array/action_list"
                android:entryValues="@array/action_values"
                android:dialogTitle="목록 선택 제목"
                app:iconSpaceReserved="false" />


            <PreferenceScreen
                android:title="설정 화면 타이틀"
                android:summary="설정 화면 요약"
                app:iconSpaceReserved="false">

                <intent android:action="android:intent.action.VIEW"
                    android:data="http://www.android.com" />

            </PreferenceScreen>

        </PreferenceCategory>

    </PreferenceScreen>
    ```

1. ListPreference에서 사용할 리소스 파일을 생성하고 목록 데이터를 입력합니다.   [res] - [values] 디렉토리를 마우스 우클릭한 다음 [New] - [Values Resource File]을 선택하고, File name에 ‘array’를 입력하여 array.xml 파일을 생성합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-233.png){: style="box-shadow: 0 0 5px #777"}

1. 생성된 array.xml에 다음과 같이 작성합니다. 각 태그의 name에 해당하는 부분이 ListPreference의 entries와 entryValues의 값으로 사용됩니다.
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <string-array name="action_list">
            <item>action 1</item>
            <item>action 2</item>
            <item>action 3</item>
            <item>action 4</item>
        </string-array>
        <string-array name="action_values">
            <item>value 1</item>
            <item>value 2</item>
            <item>value 3</item>
            <item>value 4</item>
        </string-array>
    </resources>
    ```

1. 이어서 java 디렉토리 밑에 있는 기본 패키지를 마우스 우클릭한 다음 [New] - [Kotlin File/Class]를 클릭합니다. 다음과 같이 입력하여 SettingFragment 클래스를 생성합니다.

1. 생성된 SettingFragment.kt 파일을 열고 PreferenceFragmentCompat 추상 클래스를 상속받습니다. 그리고 onCreatePreferences() 메서드를 오버라이드 합니다.
    ```kotlin
    package kr.co.hanbit.base

    import android.os.Bundle
    import androidx.preference.PreferenceFragmentCompat

    class SettingFragment: PreferenceFragmentCompat() {
        override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        }
    }
    ```

1. onCreatePreferences() 메서드 블록 안에서 addPreferencesFromResource를 호출하고 PreferenceScreen이 정의된 preference파일을 파라미터로 전달하면 설정 항목에 대한 View가 자동으로 생성됩니다.
    ```kotlin
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        addPreferencesFromResource(R.xml.preferences)
    }
    ```

1. 이제 activity_main.xml 을 열고 SettingFragment를 추가하겠습니다. [Design] 모드에서 화면 중앙의 기본 텍스트뷰는 삭제합니다. 그리고 팔레트의 커먼 또는 컨테이너에 있는 \<fragment\>를 화면에 드래그하면 나타나는 팝업창에서 SettingFragment를 추가하면 됩니다. <br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-234.png){: style="box-shadow: 0 0 5px #777"}

1. 컨스트레인트의 네 방향을 화면 가장자리에 연결하고 layout_width와 layout_height의 속성을 ‘match_constraint’로 바꿔서 화면에 꽉 차게 배치합니다.

1. 에뮬레이터에스 실행하면 다음 그림처럼 설정 화면이 나타나며 기능과 옵션 설정을 사용할 수 있습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-235.png){: style="box-shadow: 0 0 5px #777"}

### 설정값 사용하기

``PreferenceScreen에서 값을 조절하면 설정값이 자동으로 지정된 SharedPreferences파일에 저장됩니다. ``

해당 파일은 PreferenceManager.getDefaultSharedPreferences() 메서드를 호출해서 사용할 수 있습니다.

사용법은 일반적인 SharedPreferences를 사용하는 방법과 동일합니다.

```kotlin
val shared = PreferenceManager.getDefaultSharedPreferences(this)

val checkboxValue = shared.getBoolean("key_add_shortcut", false)
val switchValue = shared.getBoolean("key_switch_on", false)
val name = shared.getString("key_edit_name", "")
val selected = shared.getString("key_set_item", "")
```

CheckBoxPerference와 SwitchPreference는 저장값이 참과 거짓인 Boolean 타입이기 때문에 getBoolean() 메서드로 사용할 수 있고 EditPreference와 ListPreference는 입력된 값과 선택된 값을 모두 getString() 메서드로 사용할 수 있습니다.

onCreate() 메서드에서 PreferenceManager를 이용해서 입력된 값들을 Log로 출력해보세요.

<style>
.page-container {max-width: 1200px}
</style>