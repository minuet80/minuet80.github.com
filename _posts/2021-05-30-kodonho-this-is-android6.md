---
layout: post
title:  "[IT] - [BOOK] 6강 - 이것이 안드로이드다 with 코틀린 "
description: 파일 입출력과 SharedPreferences
date:   2021-05-30 11:22:30 +0900
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

<style>
.page-container {max-width: 1200px}476‘’
</style>