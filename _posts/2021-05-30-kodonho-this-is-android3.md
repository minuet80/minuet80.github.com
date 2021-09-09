---
layout: post
title:  "[IT] - [BOOK] 3강 - 이것이 안드로이드다 with 코틀린 "
description: 위젯과 리소스 다루기
date:   2021-06-01 10:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet
permalink: /this-is-android3/
width: large
---

* some text
{: toc}

# 1. 배치를 담당하는 레이아웃

## 1.1 레이아웃 파일
프로젝트를 처음 생성하면 우리가 아무런 설정을 하지 않아도 소스 코드를 작성할 수 있는 1개의 액티비티 (MainActivty.kt) 파일이 만들어집니다.
마찬가지로 화면을 구성할 수 있는 ``activity_main``이라는 이름의 레이아웃 파일도 자동으로 만들어지는데, 레이아웃 파일은 소스 코드가 아닌 리소스로 분류되기 때문에 파일명은 모두 소문자로 작성되고 파일명 끝에 파일의 타입인 ``XML``를 붙여 ``activity_main.xml`` 이 됩니다.

## 1.2 컨스트레인트 레이아웃
컨스트레인트 레이아웃<sup>ConstraintLayout</sup>은 안드로이드 기본<sup>Default</sup>레이아웃으로 화면에 배치되는 위젝 사이에 간단한 제약조건<sup>Constraint</sup> 설정만으로 전체 화면을 쉽게 구성할 수 있습니다.

### 핸들러 사용하기
컴포넌트 트리 또는 UI 편집기에서 컨스트레인트 레이아웃 안에 있는 텍스트뷰를 클릭하면 다음 그림과 같은 선택 영역이 텍스트뷰 주위에 표시됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-53.png){: style="box-shadow: 0 0 5px #777"}

텍스튜뷰 상하좌우로 그림과 같은 4개의 동그라미가 보이는데 이것을 핸들러<sup>Handler</sup>라고 합니다.
핸들러가 ``연결상태이면 파란색``으로, ``연결되어 있지 않으면 흰색``으로 나타납니다.


![1]({{site.baseurl}}/images/this-is-android/this-is-android-54.png){: style="box-shadow: 0 0 5px #777"}

핸들러를 드래그해서 연결하고자 하는 다른 위쩻의 핸들러에 가져다 놓거나, 자신을 포함하고 있는 레이아웃의 가장자리에 가져다 놓으면 주름무늬선 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-55.png){: style="box-shadow: 0 0 5px #777"} 이 생성됩니다. 이렇게 연결되는 선을 컨스트레인트<sup>Constraint</sup>라고 하고, 컨스트레인트가 연결될 수 있는 부위를 앵커 포인트<sup>Anchor Point</sup>라고 합니다.

### 컨스트레인트 편집기
컨스트레인트 레이아웃 안에 있는 위젯(지금 화면에서 ‘Hello World!’) 를 컨스트레인트를 조절할 수 있는 편집기가 속성 영역에 나타납니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-56.png){: style="box-shadow: 0 0 5px #777"}

편집기의 검은색 도윽라미가 UI편집기의 파란색 동그라미와 같은 핸들러입니다. 컨스트레인트 편집기에서 연결되어 있는 핸들러를 클릭하면 현재 연결을 해제할 수 있습니다. 연결이 해제되면 다음의 그림처럼 컨스트레인트 편집기의 위아래 핸들러에 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-57.png){: style="box-shadow: 0 0 5px #777"} 표시가 나타나고, UI편집기의 파란색 핸들러도 우측 그림처럼 흰색으로 바뀜니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-58.png){: style="box-shadow: 0 0 5px #777"}

편집기에서 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-57.png){: style="box-shadow: 0 0 5px #777"}를 클릭하면 가장 가까이에 있는 다른 위젯 또는 레이아웃의 앵커 포인트에 컨스트레인트가 생성됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-59.png){: style="box-shadow: 0 0 5px #777"}

### 크기 조절 핸들러
크기 조절 핸들러<sup>Size Handler</sup>는 주로 상하 또는 좌우 양쪽에 컨스트레인트가 연결되었을 때 사용합니다.
다음은 좌우 양쪽으로 연결되었을 때의 모습입니다. 
핸들러 가운데에 보이는 사각 박스 안의 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-38.png){: style="box-shadow: 0 0 5px #777"}를 클릭하면 세가지 모드로 변경할 수 있습니다.

  - ![1]({{site.baseurl}}/images/this-is-android/this-is-android-38.png){: style="box-shadow: 0 0 5px #777"} ``Wrap Content`` : 위젯의 크기를 내용물의 크기에 맞춰줍니다. 텍스트뷰의 경우 입력된 문자의 크기에 맞춰서 크기가 조절됩니다.
  - ![1]({{site.baseurl}}/images/this-is-android/this-is-android-39.png){: style="box-shadow: 0 0 5px #777"} ``Fixed Content`` : layout_width, layout_height 속성에 입력된 크기로 고정됩니다. 
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-60.png){: style="box-shadow: 0 0 5px #777"}
  - ![1]({{site.baseurl}}/images/this-is-android/this-is-android-40.png){: style="box-shadow: 0 0 5px #777"} ``Match Content`` : 컨스트레인트의 시작과 끝 (앵커 포인트) 에 맞춰서 크기가 조절됩니다.
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-61.png){: style="box-shadow: 0 0 5px #777"}


### 바이어스
상하 또는 좌우 양쪽이 같이 연결되었을 때 ``바이어스``<sup>Bias</sup>라는 위치 조절 버튼이 활성화 됩니다.
처음에 50으로 설정되어 있는 값은 비율을 의미하며, 위젯을 양쪽 컨스트레인트의 중앙에 위치 시킵니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-62.png){: style="box-shadow: 0 0 5px #777"}


### 레이아웃 툴바
![1]({{site.baseurl}}/images/this-is-android/this-is-android-63.png){: style="box-shadow: 0 0 5px #777"}
1. ``View Option`` : 제약조건을 화면에 표시하거나 숨길 수 있습니다. 제약조건이 너무 많거나 화면에 표시되는 위젯의 수가 많아져 복잡해졌을 때는 클릭해서 끌 수 있습니다.
1. ``Auto Connect`` : 오토 커넥트가 켜진 상태에서 위젯을 컨스트레인트 레이아웃에 가져다 놓으면 기본 컨스틀인트를 연결해줍니다.
1. ``Default Margins`` : 컨스트레인트 연결 시 설정한 만큼 기본 마진값을 적용합니다.
1. ``Clear Constraints`` : 화면상의 모든 컨스트레인트를 제거합니다. 개별로 제거할 때는 위젯에 마우스 포인터를 올리면 나타나는 모양의 아이콘을 클릭합니다.
1. ``Infer Constraints`` : 오토 커넥트를 끄고 작업할 때 사용합니다. 가까운 위젯이나 레이아웃에 2개 이상의 컨스트레인트를 연결합니다.
1. ``Pack`` : 여러 개의 위젯을 동시에 선택한 상태에서 크기를 저절할 때 사용합니다. 선택된 위젯의 상태에 따라서 크기가 조절될 때도 있고, 위치가 조절될 때도 있습니다.
1. ``Align`` : 선택된 위젯들을 정렬해줍니다.
1. ``GuideLine`` : 레이아웃 안의 모든 위젯에 공통의 여백을 지정할 때 사용합니다. 가로 또는 세로 가이드라인을 삽입하면 위젯은 가이드라인에 컨스트레인트를 연결할 수 있습니다.

### 체인으로 연결하기
체이닝은 컨스트레인트로 연결된 위젯끼지 서로의 위칫값을 공유해서 상대적인 값으로 크기와 위치를 결정해주는데 각 화면 전체를 기준으로 했을 때는 물론, 화면을 가로세로로 전환했을 때도 위젯의 상대 비율을 유지해 줍니다.

ConstraintChain 프로젝트를 하나 새로 생성하고 레이아웃 파일을 엽니다.
화면 가운데 있는 텍스트뷰는 삭제합니다.

1. 팔레트의 버튼 카테고리에서 버튼 4개를 차례대로 UI편집기로 드래그하여 컨스트레인트를 연결하지 않은 채 그림과 같이 배치합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-64.png){: style="box-shadow: 0 0 5px #777"}

1. 먼저 위쪽에 있는 버튼 2개를 선택한 다음 마우스 우클릭하면 나타나는 메뉴에서 [Chains] - [Create Horizontal Chain]을 선택합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-65.png){: style="box-shadow: 0 0 5px #777"}

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-66.png){: style="box-shadow: 0 0 5px #777"}

1. 같은 방법으로 아래쪽 버튼 2개도 체인으로 연결합니다.

1. 정상적으로 연결되었다면 버튼 4개를 모두 클릭했을 때 다음과 같은 화면이 나타납니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-67.png){: style="box-shadow: 0 0 5px #777"}

1. 이번에는 세로축 체인을 연결해보세요. 한 번에 한 줄 씩 해야 합니다. 4개를 모두 선택하고 적용하면 원하지 않은 결과가 나타나므로 좌측의 버튼 2개를 먼저 선택합니다. 그리고 마우스 우클릭한 다음 메뉴에서 [Chains] - [Create Vertical Chain]을 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-68.png){: style="box-shadow: 0 0 5px #777"}
    
1. 남은 2개의 버튼도 같은 방법으로 [Vertical Chain]을 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-69.png){: style="box-shadow: 0 0 5px #777"}

1. 버튼 4개가 모두 체인으로 연결되었습니다. 체인은 컨스트레인트와는 다르게 체인 모양 (![1]({{site.baseurl}}/images/this-is-android/this-is-android-70.png){: style="box-shadow: 0 0 5px #777"}) 의 인터페이스로 되어 있습니다. 이제 4개의 버튼을 모두 선택하고 속성에서 ``layout_width``와 ``layout_height``값을 ``‘0dp (match_constraint)’``으로 변경합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-71.png){: style="box-shadow: 0 0 5px #777"}

1. match_constraint로 설정하면 ‘0dp’로 설정됩니다.

1. 버튼이 모두 꽉 찬 형태로 보여집니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-72.png){: style="box-shadow: 0 0 5px #777"}

### 가이드 라인
가이드라인<sup>GuideLine</sup>은 컨스트레인트 레이아웃에서만 사용할 수 있는 보조 도구입니다.
가로/세로 두 가지 가이드라인이 있는데, 가이드라인을 드래드해서 화면 임의의 위치에 가져다 놓으면 레이아웃 안에 배치되는 위젯에 가장의 앵커 포인트를 제공합니다.


## 1.3 리니어 레이아웃
리니어 레이아웃<sup>LinearLayout</sup>은 위젯을 가로 또는 세로 한 줄로 배치하기 위한 레이아웃 입니다.
레이아웃 속성 중에 orientation의 가로, 세로만 변경해주면 기존에 배치되어 있던 위젯들도 방향을 바꿀 수 있습니다.

### 리니어 레이아웃을 기본 레이아웃으로 사용하기
리니어 레이아웃을 사용하기 위해서 컨스트레인트 레이아웃 안에 리니어 레이아웃을 추가할 수도 있지만 레이아웃이 중첩되면 그만큼 그래픽 처리 속도가 느려지기 때문에 기본 레이아웃인 컨스트레인트 레이아웃을 바꾼 후에 작업하도록 하겠습니다.

1. 속성 영역 위에 있는 [Code] 버튼을 클릭해서 모드를 변경합니다.

1. 화면이 XML 코드를 직접 편집할 수 있는 모양으로 변경됩니다.

1. XML코드에서 2행에 있는 androidx.constraintlayout.widget.ConstraintLayout을 ``‘LinearLayout’``으로 수정합니다.

1. 다시 우측 상단에 있는 [Design]버튼을 클릭해서 모드를 변경하면 컴포넌트 트리 (Component Tree)의 최상위 레이아웃이 리니어 레이아웃으로 변경된 것을 볼 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-73.png){: style="box-shadow: 0 0 5px #777"}

#### orientation속성
orientation하위 버전의 안드로이드 스튜디오에서는 필수 속성이었지만 3.1부터는 입력하지 않으면 가로로 배치됩니다.
레이아웃 안에 있는 기본 텍스트뷰를 삭제하고, 팔레트에서 새로운 텍스트뷰 3개를 드래드해서 레이아웃 안에 가져다 놓습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-74.png){: style="box-shadow: 0 0 5px #777"}


#### layout_weight속성
레이아웃 안에 배치되는 위젯의 크기를 비율로 나타낼 수 있는 옵션입니다.
리니어 레이아웃에 배치되는 위젯은 layout_weight 속성의 기본 설정값이 1입니다.
따라서 앞의 그림에서 텍스트뷰 3개의 가로 비율은 1:1:1입니다.
리니어 레이아웃의 orientation 속성이 vertical이면 세로 비율이 1:1:1입니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-74.png){: style="box-shadow: 0 0 5px #777"}

그런데 자세히 보면 각각의 넓이가 1:2:1이 아닌 1:1.5:1 정도로 보입니다.
이것은 텍스트뷰의 layout_width 속성의 기본값이 wrap_content이기 때문인데 3개의 텍스트뷰를 모두 선택한 상태에서 layout_width의 값을 ‘0dp’로 변경해주면 정확히 1:2:1로 설정됩니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-75.png){: style="box-shadow: 0 0 5px #777"}

![1]({{site.baseurl}}/images/this-is-android/this-is-android-76.png){: style="box-shadow: 0 0 5px #777"}


- ``layout_weight``속성값 변경에 따른 정확한 비율 설정 방법
  - layout_weight속성을 정확하게 해주기 위해서는 layout_width 또는 layout_height 속성값을 ‘0dp’로 입력하고 사용해야 합니다.

#### gravity속성
레이아웃에 삽입되는 위젯을 gravity속성에서 설정된 방향으로 정렬합니다. 동시에 2개 이상의 방향을 선택할 수 있습니다.
gravity 하위 속성 중에 center 의 체크박스를 체크하면 ``‘true’``로 변경되며 ``글자가 가운데로 정렬됩니다.``

![1]({{site.baseurl}}/images/this-is-android/this-is-android-77.png){: style="box-shadow: 0 0 5px #777"}


#### layout_gravity속성
자신이 속한 레이아웃(부모 레이아웃)을 기준으로 자신의 위치를 설정할 때 사용합니다.

#### 스코롤뷰와 함께 사용하기
리니어 레이아웃과 같은 일반 레이아웃들은 화면 크기 (높이 또는 넓이)를 넘어가는 위젯이 삽입돼도 스크롤이 되지 않습니다.
이럴 때는 최상위 레이아웃을 스크롤 할 수 있는 요소로 감싸야 합니다. 
스크롤뷰를 사용하려면 기본 레이아웃 (컨스트레인트 레이아웃)을 스크롤뷰로 변경해서 사용하거나 기본 레이아웃 안에 스크롤뷰를 추가해야 합니다.

1. 시본 레이아웃을 스크롤뷰로 변경하는 방법은 컨스트레인트 레이아웃을 리니어 레이아웃으로 변경하는 방법과 동리합니다. XML 코드를 편집하기 위해 UI편집기를 [Code]모드로 변경한후 ``ConstraintLayout`` 문자열을 ``‘ScrollView’``로 변경합니다.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">
    </ScrollView>
    ```
1. 다시 UI편집기를 [Design]모드로 변경하고, 기본으로 있는 텍스트뷰를 삭제합니다. 그리고 팔레트 영역의 레이아웃 카테고리에 있는 리니어 레이아웃 1개를 드래그해서 스크롤뷰 안에 가져다 놓습니다. 그런 다음 orientation속성을 ``‘vertical’``로 변경합니다.
1. 리니어 레이아웃 안에 버튼 20개 정도 삽입한 다음 에뮬레이터에서 실행해보면 스크롤 되는 것을 확인할 수 있습니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-78.png){: style="box-shadow: 0 0 5px #777"}

#### 빈 여백을 만드는 Space 도구
레이아웃에 있는 스페이스<sup>Space</sup>는 빈 여백을 만들 수 있는 레이아웃 보조 도구입니다.
리니어 레이아웃에 여러 개의 버튼을 배치하면서 버튼 사이에 일정한 간격을 두고 싶을 때 사용합니다.


## 1.4 프레임 레이아웃
프레임 레이아웃<sup>Framelayout</sup>은 입력되는 위젯의 위치를 결정하기 보다는 위젯을 중첩해서 사용하기 위한 레이아웃입니다.
주로 게임 화면 처럼 배경과 플레이어가 서로 다른 레이어에서 겹쳐 움직여야 할 때 사용하면 좋습니다.
레이아웃 중에서 처리 속도가 가장 빠르기 때문에 1개의 이미지만 화면에 보여준다든지 하는 단순한 형태로 사용할 경우에 성능이 가장 좋습니다.
프레임 레이아웃은 주로 삽입되는 다른 레이아웃이나 위젯을 겹쳐 놓는 용도이기 때문에 레이아웃으로의 필수 속성이 따로 없습니다.
정렬도 프레임 레이아웃이 아닌 삽입되는 위젯의 layout_gravity속성을 사용합니다.

### 프레임 레이아웃으로 살펴보는 XML 코드의 구조
```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
</FrameLayout>
```

## 1.5 레이아웃의 기본 사용법
- ``컨스트레인트 레이아웃(ConstraintLayout)``을 사용하면 간단한 드래드 앤 드롭만으로 각각의 화면 요소들을 원하는 곳에 배치할 수 있습니다.
- ``리니어 레이아웃(LinearLayout)``은 위젯을 가로 또는 세로 한 줄로 배치하기 위한 레이아웃입니다.
- ``프레인 레이아웃(FrameLayout)``은 입력되는 위젯의 위치를 결정하기보다는 위젯을 중첩해서 사용하기 위한 레이아웃입니다.


# 2. 화면에 그려지는 디자인 요소 위젯

## 2.1 위젯의 대표 메뉴

### Common
### Text
### Button
### Widget
위젯<sup>Widget</sup>은 이미지, 웹 사이트, 별점 표시, 진행 상태 등의 정보를 화면에 그리는 위젯 모음입니다.

## 2.2 텍스트 뷰

### 사용할 텍스트 정의 및 적용하기: text
``text``는 화면에 나타낼 택스트(글자)를 입력하는 속성입니다.
text속성에 직접 입력할 수도 있지만 권장하지 않습니다.
앱을 개발할 때 ``strings.xml``에 사용할 텍스트를 미리 정의해 놓고 가져다가 사용하는 것이 ``다국어 처리``, ``텍스트 수정`` 등 앱을 관리하기에 용이하기 때문입니다.

1. 프로젝트 탐색기의 뷰가 Android 인 상태에서 [app] - [res] - [values] 디렉토리 아래 ``strings.xml`` 파일이 있습니다.

1. 파일을 열어서 다음 3행과 4행을 추가합니다. 태그 형식은 <string name="스트링 이름"> 보여질 텍스트 </string> 형식으로 사용합니다. 3행에는 ``<string name="string_01">화면에 보여질 글자 01</string>``라고 입력하고, 4행에는 ``<string name="string_02">화면에 보여질 글자 02</string>``라고 입력합니다.

    ```xml
    <resources>
        <string name="app_name">Framelayout</string>
        <string name="string_01">화면에 보여질 글자 01</string>
        <string name="string_02">화면에 보여질 글자 02</string>
    </resources>
    ```
1. ``TextView``에 적용하기 위해 activity_main.xml파일을 열고 UI편집기에 기본으로 생성되어 있는 텍스트뷰를 선택합니다. 우측 속성 영역에서 ‘Hello World!’가 입력된 text속성의 입력 필드에 strings.xml에서 미리 작성해두었던 스트링 name하나를 ``‘@string/id_01’``형태로 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-79.png){: style="box-shadow: 0 0 5px #777"}


### 텍스트 색상 지정하기:textColor
안드로이드의 모든 색상은 빛의 기본색인 RGS(+투명)를 기준으로 각각 0부터 255까지의 숫자를 16진수(0~F)로 입력해서 표현합니다.

#### 색상 지정 예
```text
#FFFFFFFF(흰색), #FF888888(회색), #FFFF0000(빨간색)
```

| 색상 | 투명 | 빨간색 | 녹색 | 파란색 |
| --- | --- | --- | --- | --- |
| 범위 | 00 ~ FF | 00 ~ FF | 00 ~ FF | 00 ~ FF |
{: .table .table-striped .table-hover}

색상도 문자열과 같이 직접 입력하지 않고 ``colors.xml`` 에 작성된 값을 참조해서 사용합니다.
colors.xml 파일은 strings.xml 과 같은 디렉토리에 있습니다.
파일이 없을 경우에는 values디렉토리를 마우스 우클릭하면 나타나는 메뉴에서 [New] - [Value] - [Resource File]을 선택해 생성할 수 있습니다.

1. ``colors.xml`` 파일을 열면 앱에서 사용하는 기본 컬러가 이미 작성되어 있습니다. 기본 컬러 아래에 2개 정도의 컬러를 추가합니다.
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <color name="purple_200">#FFBB86FC</color>
        <color name="purple_500">#FF6200EE</color>
        <color name="purple_700">#FF3700B3</color>
        <color name="teal_200">#FF03DAC5</color>
        <color name="teal_700">#FF018786</color>
        <color name="black">#FF000000</color>
        <color name="white">#FFFFFFFF</color>
        <!-- 새로 추가 -->
        <color name="color_blue">#0000FF</color>
        <color name="color_red">#FF0000</color>
    </resources>
    ```
1. 적용 시에는 텍스트를 적용했던 것과 같이 텍스트뷰를 선택한 상태에서 속성 영역의 textColor속성에 ``‘@color/컬러이름’``을 입력하면 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-80.png){: style="box-shadow: 0 0 5px #777"}

### 텍스트 크기 지정하기: textSize
안드로이드에서는 ``dp, px, sp`` 등과 같은 단위를 사용하는데, 텍스트가 입력되는 위젯 (텍스트뷰, 에디트텍스트)은 주로 sp를 사용합니다.
``sp``는 Scale-independent Pixels의 약자로 문자열 크기를 나타내기 위해 사용하는 단위입니다.
다른 위젯이 모두 dp를 사용하는 것과 달리 텍스트 위젯이 sp단위를 사용하는 이유는 같은 해상도에서 문자열의 크기를 다르게 사용하는 경우가 있기 때문입니다.
이름에서도 유추할 수 있듯이 화면 스케일에 독립적으로 크기를 조절할 수 있는 단위입니다.

1. 크기를 조절하는 textSize도 ``dimens.xml``이라는 파일에 따로 입력한 후에 참조해서 사용할 수 있습니다. ``dimens.xml``은 기본으로 제공되는 파일이 아니라 values 디렉토리에 따로 생성해서 사용해야 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-81.png){: style="box-shadow: 0 0 5px #777"}

1. File name에 ``‘dimens’``를 입려갛고 [OK]를 클릭해 파일을 생성합니다. 확장자인 ``.xml``은 자동으로 생성되기 때문에 입력하지 않습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-82.png){: style="box-shadow: 0 0 5px #777"}

1. ``<dimen name="단위이름">150sp</dimen>``의 형태로 작성합니다.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <dimen name="text_dimen">24sp</dimen>
        <dimen name="size_dimen">24dp</dimen>
    </resources>
    ```
1. 값을 적용할 때는 앞의 방법과 동리하게 텍스트뷰를 선택한 상태에서 textSize속성의 입력 필드에 ``‘@dimen/단위이름’``을 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-83.png){: style="box-shadow: 0 0 5px #777"}

### 텍스트 스타일 지정하기: textStyle
시스템에서 제공해주는 스타일은 ``normal, bold, italic`` 세가지가 있습니다.


### 입력 가능한 줄 수 설정하기: maxLines, minLines
``maxLines``속성은 텍스트뷰에 입력 가능한 최대 줄 수를 설정합니다. 1로 설정한 상태에서 한 줄 이상의 글자가 입력되면 두 번째 줄부터는 화면에 출력되지 않습니다.

### 텍스트뷰 한 줄로 보이기: singleLine
``singleLine``은 텍스튜뷰를 한 줄로 보이게 하는 속성입니다. 
maxLines 속성을 1로 설정할 때와 다른점은 여러 줄이 있을 때 두 번째 줄을 없애는 것이 아니라 줄 사이의 ``‘\n’``를 없애 한 줄로 보이게 합니다.

### 말줄임 표시하기: ellipsize
ellipsize는 처음, 중간, 또는 마지막 부분에 말줄임(...) 표시를 하거나 marquee로 글자를 좌우로 움직이게 할 수 있습니다.
- none: 설정하지 않습니다.
- start: 텍스트의 첫 부분을 말줄임표로 바꿈니다.
- end: 텍스트의 끝 부분을 말줄임표로 바꿈니다.
- marquee: 글자가 흐르는 효과를 줍니다.  marquee 기능을 주기 위해서는 ``singleLine``을 ``true``, 텍스트가 포커스를 받아야 하므로 ``focusable`` 속성은 ``auto``, ``focusableInTouchMode`` 속성은 `true`로 설정하고, 완료된 후 앱을 실행하면 전광판처럼 텍스트가 움직입니다.

### 텍스트 글꼴 지정하기: fontFamily
``fontFamily`` 는 글꼴을 지정하는 속성으로 기본으로 제공하는 글꼴 이외에 외부 폰트도 지정할 수 있습니다.
입력 필드를 클릭하면 나타나는 메뉴에서 스크롤을 밑으로 내리면 ``[More Fonts...]`` 로 사용할 글꼴을 추가할 수 있습니다.

### 비율로 글꼴 크기 지정하기: ems
ems속성은 텍스트뷰의 크기를 나타낼 때 현재 글꼴의 크기를 기준으로 설정하는 상댓값입니다.
예를 들어, ``텍스트뷰에 설정된 크기가 12sp라면, 1em = 12sp 이고 2em = 24sp`` 입니다.
즉, 글꼴 크기에 텍스트뷰를 맞춰 글꼴이 커질 때 텍스트와 텍스트뷰의 비율을 유지하는 것입니다.

### 텍스트뷰 높이 고정하기: lines
line속성은 텍스트뷰의 높이를 고정할 때 사용합니다. 
maxLines 속성과 사용법이 비슷해 보이나 다른 점은 maxLines의 경우 5로 설정해도 입력되는 문자열의 줄 수가 한 줄이면 텍스트뷰의 높이도 화면에서 한 줄만 차지하는 반면에, lines는 높이가 5로 항상 고정됩니다.

### 텍스트 전체 길이 제한하기: maxLength


## 2.3 에디트 텍스트

### 에디트텍스트에 입력되는 글자를 실시간으로 처리하기
실제 앱을 개발할 때 실시간으로 아이디의 유효성을 검사하거나, 패스워드를 검사할 때 사용하는 코드 형태입니다.

1. activity_main.xml 파일을 열고 텍스트 카테고리의 플레인텍스트(PlainText)를 드래그해서 화면 가운데에 미리 생성되어 있는 텍스트뷰 아래에 가져다 놓습니다. 좌우 양쪽 컨스트레인트는 레이아웃 가장자리에, 위쪽은 텍스트뷰에 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-84.png){: style="box-shadow: 0 0 5px #777"}

1. id속성 입력 필드에는 `‘editText’`를 입력합니다. (id변경시 Rename팝업이 나타나며 [Refactor]버튼을 클릭해서 적용합니다.)

1. 위젯을 처음 생성하면 text속성에 기본값이 적혀 있는데 이것을 삭제합니다. text속성은 Common Attributes에 있습니다.

1. ``build.gradle (Module: WidgetsEditText.app)``파일을 열고 android스코프(범위)에 다음과 같이 ``viewBinding true`` 설정을 추가합니다. 설정 후 우측 상단의 ``[Sync Now]``를 클릭하는 것을 잊으면 안됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-85.png){: style="box-shadow: 0 0 5px #777"}

1. [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. ``class MainActivity``에 binding프로퍼티를 하나 생성하고 ``by lazy``를 사용해서 안드로이드가 생성해둔 ``ActivityMainBinding``을 ``inflate`` 합니다.

    ```kotlin
    package kr.co.hanbit.widgetsedittext

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.widgetsedittext.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)
        }
    }
    ```
1. 이제 onCreate() 메서드 안에 작성되어 있는 setContentView에 binding.root를 전달합니다.
    ```kotlin
    package kr.co.hanbit.widgetsedittext

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.widgetsedittext.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```
1. 이어서 binding으로 앞에서 작성해둔 에디트텍스트의 id에 연결합니다. 간단하게 ``‘binding.e’``까지만 작성하면 자동 완성 코드가 나타납니다. 코드에서 editText를 선택합니다.
1. 에디트텍스트의 변경 사항을 캐치할 수 있는 리스너를 달아야 합니다. 
    ```kotlin
    package kr.co.hanbit.widgetsedittext

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import androidx.core.widget.addTextChangedListener
    import kr.co.hanbit.widgetsedittext.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.editText.addTextChangedListener {  }
        }
    }
    ```
1. 추가된 코드의 여는 중괄호 ({) 안에서 ``Enter``키를 입력하여 줄을 바꾼 후에 다음과 같이 로그를 출력하는 코드를 작성해줍니다.

    ```kotlin
    package kr.co.hanbit.widgetsedittext

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import androidx.core.widget.addTextChangedListener
    import kr.co.hanbit.widgetsedittext.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.editText.addTextChangedListener {
                Log.d("EditText", "현재 입력된 값은 = ${it.toString()}")
            }
        }
    }
    ```
1. [Run ‘app’]아이콘을 클릭해서 에뮬레이터를 실행합니다.
    ```text
    현재 입력된 값은 = 1
    현재 입력된 값은 = 12
    현재 입력된 값은 = 123
    현재 입력된 값은 = 1234
    현재 입력된 값은 = 12345
    현재 입력된 값은 = 123456
    현재 입력된 값은 = 1234567
    현재 입력된 값은 = 12345678
    ```

- 한글 키보드 설정
  1. 에뮬레이터에서 화면 하단을 클릭한 다음에 위쪽으로 드래그하면 앱 목록이 펼쳐집니다.
  1. 목록에서 Settings를 선택해서 설정 화면으로 이동합니다.
  1. 설정 화면을 아래쪽으로 스크롤 해서 System 메뉴를 선택합니다.
  1. Languages & Input을 선택합니다.
  1. 다시 한번 Languages(English)를 선택합니다.
  1. English가 이미 추가되어 있는 화면이나오고, 아래에 +Add a language가 있습니다. 클릭합니다.
  1. 우측 상단 돋보기 아이콘을 클릭한 후 ‘Korean’을 입력하면 한국어가 검색됩니다. 

### 클릭하면 사라지는 미리보기: hint
클릭하면 사라지는 미리보기를 작성할 수 있습니다.

### 키보드 모양 설정하기: inputType

| inputType | 옵션값 |
| --- | --- |
| textUrl | URI형식의 문자 입력 |
| textEmailAddress | email주소 형식의 문자 입력 |
| textPostalAddress | 우편 번호 형식의 문자 입력 |
| textPassword | 비밀번호 입력 |
| textVisibliePassword | 비밀번호를 문자 그대로 표시 |
| number | 숫자 형식 |
| numberPassword | 숫자로만 구성된 비밀번호 입력 |
| phone | 전화번호 형식 |
| date | 날짜 형식 |

### 이벤트 설정하기
입력 완료 후 실행할 이벤트를 설정합니다.
``ime``는 ``input method editor``의 약자로 텍스트 편집기를 뜻합니다.
inputType 속성을 통해서 어떤 입력을 가능하게 할지 결정했다면 imeOptions 속성에서는 입력이 완료된 상황에서 다음 이벤트로 어떤 처리를 할 것인지 결정하는 것입니다.
예를 들어 키보드 오른쪽 아래에 확인 키가 나타나는데 ``imeOptions``를 ``‘actionSearch’``로 설정하면 돋보기 모양의 키가 나타납니다.

| imeOptions 옵션 | 옵션값 |
| --- | --- |
| normal | 특변한 기능 없음 |
| actionUnspecified | 특별한 액션 없음 |
| actionNone | 액션을 사용하지 않음 |
| actionGo | 어딘가로 넘어감, URL 입력 후 해당 페이지로 넘어가기 |
| actionSearch | 검색하기 구글, 네이버, 다음 검색 |
| actionSend | 메일, 메시지 보내기 |
| actionNext | 다음으로 넘어가기, 다음 입력창으로 이동 |
| actionDone | 입력 완료, 키보드 숨김 |
| actionPrevious | 이전 단계로 돌아가기, 이전 입력창으로 이동 |

## 2.4 이미지 버튼
버튼, 이미지버튼 둘 다 백그라운드 속성으로 이미지를 부여할 수 있는데 버튼은 백그라운드 이미지 위에 텍스트만, 이미지 버튼은 백그라운드 이미지 위에 아이콘과 같은 이미지를 추가할 수 있습니다.

| 버튼 | 이미지 버튼 |
| --- | --- |
| 이미지 위에 텍스트 | 이미지 위에 이미지 |


### 기본 이미지 사용하기
activity_main.xml을 열고 이미지버튼을 드래그해서 UI편집기에 가져다 놓으면 사용할 이미지를 선택하는 창이 나타납니다.
[Drawable]을 선택하면 임시로 사용할 수 있는 Sample Data가 나오고, 그중에서 하나를 선택할 수 있습니다. Saple data중에서 ``[avatars]``를 선택하고 [OK]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-86.png){: style="box-shadow: 0 0 5px #777"}


### 새로운 이미지 사용하기

1. 구글에서 PNG이미지를 검색해서 내려받습니다. 준비한 이미지를 drawable 디렉토리에 붙여넣기한 다음 그림과 같은 팝업창이 나타나면 [Refactor]를 클릭해 drawable 디렉토리에 저장됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-87.png){: style="box-shadow: 0 0 5px #777"}

1. 팔레트에서 이미지버튼을 드래그해서 UI편집기에 가져다 놓습니다. 이미지버튼을 선택한 상태에서 속성 영역의 src옆의 버튼을 클릭하면 이미지를 선택할 수 있는 팝업창이 다시 나타납니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-88.png){: style="box-shadow: 0 0 5px #777"}

1. 선택한 이미지가 나타납니다.

### 투명 배경 설정하기
이미지버튼은 기본적으로 배경에 회색 영역을 포함하고 있는데 속성 중 ``background`` 속성에 ``‘@android:color/transparent’``를 적용하면 회색 영역을 없애고 투명하게 만들 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-89.png){: style="box-shadow: 0 0 5px #777"}


### 이미지 크기 설정하기
``scaleType``은 이미지뿐만 아니라 이미지뷰에서도 많이 사용하는 속성으로 다음과 같은 효과가 있습니다.

| scaleType | status |
| --- | --- |
| ``matrix`` : 실제 이미지를 좌측 상탄부터 이미지버튼 크기만큼 보여줍니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-90.png){: style="box-shadow: 0 0 5px #777"} |
| ``fitXY`` : 상하좌우를 이미지뷰 또는 이미지버튼 크기에 맞춰 늘려줍니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-91.png){: style="box-shadow: 0 0 5px #777"} | 
| ``fitStart`` : 좌측 상단부터 시작해서 비율에 맞게 이미지 크기를 조절하여 위젯 안에 채워줍니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-92.png){: style="box-shadow: 0 0 5px #777"} |
| ``fitCenter`` : 중앙을 기준으로 비율에 맞게 이미지 크기를 조절하여 위젯 안에 채워줍니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-93.png){: style="box-shadow: 0 0 5px #777"} |
| ``fitEnd`` : 우측 하단부터 시작해서 비율에 맞게 이미지 크기를 조절하여 위젯 안에 채워줍니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-94.png){: style="box-shadow: 0 0 5px #777"} |
| ``center`` : 실제 이미지 사이즈대로 정중앙에 위치시킵니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-95.png){: style="box-shadow: 0 0 5px #777"} |
| ``centerCrop`` : 가로세로 사이즈 중 근접한 길이를 기준으로 나머지 한쪽을 잘라 비율을 맞춰줍니다 뷰에 이미지를 가득 채워주기 때문에 앨범 이미지를 섬네일로 보여줄 때 많이 사용합니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-96.png){: style="box-shadow: 0 0 5px #777"} |
| ``centerInside`` : 이미지가 위젯보다 크면 fitCenter와 동일하게 동작하고, 작으면 위젯의 중앙에 위치시킵니다. | ![1]({{site.baseurl}}/images/this-is-android/this-is-android-97.png){: style="box-shadow: 0 0 5px #777"} |


### 이미지 영역에 색 채우기: tint
tint는 이미지 영역에 색을 채우는 속성입니다. [스포이드 아이콘]을 클릭해서 색을 선택할 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-98.png){: style="box-shadow: 0 0 5px #777"}
tint속성의 경우 이미지의 투명도를 기준으로 색이 적용되기 때문에 ``일반적으로 투명 배경을 가진 이미지에 사용합니다.``


### 투명도 조절하기: alpha
alpha는 투명도를 조절합니다. 
1부터 0까지의 값을 입력하여 1이면 투명하지 않은 상태, 0이면 투명한 상태가 됩니다.


## 2.5 라디오그룹과 라디오버튼

### 라디오그룹과 라디오버튼 사용하기
1. 버튼 카테고리에서 라디오그룹을 찾아 UI편집기에 드래그해서 가져다 놓고 id속성에 ``‘raioGroup’``이 입력되어 있는지 확인합니다. 없다면 ``‘radioGroup’``이라고 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-99.png){: style="box-shadow: 0 0 5px #777"}

1. 라디오그룹의 경우 UI편집기에는 아무것도 나타나지 않을 수 있습니다. 찾기 힘들 때는 컴포넌트 트리에서 [radioGroup]을 찾아 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-100.png){: style="box-shadow: 0 0 5px #777"}

1. 컨스트레인트를 네 방향 모두 연결해서 화면 가운데에 배치합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-101.png){: style="box-shadow: 0 0 5px #777"}

1. 라디오그룹 안에 3개의 라디오버튼을 가져다 놓습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-102.png){: style="box-shadow: 0 0 5px #777"}

1. 라디오버튼은 스마트폰 화면에서 볼 수 있도록 이름을 입력해줍니다. text속성에 각각 ‘사과’, ‘바나나’, ‘오렌지’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-103.png){: style="box-shadow: 0 0 5px #777"}

1. 모두 작성하면 다음과 같은 레이아웃이 구성됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-104.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle 파일을 열고 android 스코프에 다음과 같이 viewBinding true 설정을 추가합니다.

    ```gradle
    buildFeatures {
        viewBinding true
    }
    ```

1. [MainActivity.kt]탭을 클릭해서 소스 코드를 이동합니다. onCreate() 메서드 위에 binding 프로퍼티를 하나 생성하고 by lazy를 사용하여 ActivityMainBinding을 inflate 합니다.

    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    ```

1. onCreate() 메서드 안에 작성되어 있는 setContentView에 binding.root를 전달합니다.
    ```kotlin
    setContentView(binding.root)
    ```

1. 다음 줄에 binding으로 앞에서 작성해둔 라디오그룹의 id에 연결합니다.

    ```kotlin
    package kr.co.hanbit.widgetsradio

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.widgetsradio.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.radioGroup.setOnCheckedChangeListener { group, checkedId ->  }
        }
    }
    ```

1. 코드 블록 끝에 있는 화살표 (->) 다음에서 ``Enter``키를 입력하고 블록 안에 다음과 같이 코드를 추가합니다.
    ```kotlin
    package kr.co.hanbit.widgetsradio

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import kr.co.hanbit.widgetsradio.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.radioGroup.setOnCheckedChangeListener { group, checkedId ->
                when (checkedId) {
                    R.id.radioApple -> Log.d("RadioButton", "사과가 선택되었습니다.")
                    R.id.radioBanana -> Log.d("RadioButton", "바나나가 선택되었습니다.")
                    R.id.radioOrange -> Log.d("RadioButton", "오렌지가 선택되었습니다.")
                }
            }
        }
    }
    ```

1. 에뮬레이터를 실행하고 라디오버튼을 클릭해보면 로그캣창에 메시지가 출력되는 것을 확인합니다.
    ```text
    사과가 선택되었습니다.
    바나나가 선택되었습니다.
    오렌지가 선택되었습니다.
    ```

### 라디오버튼 배치하기: orientation
라디오그룹은 리니어 레이아웃에 라디오버튼을 담을 수 있는 형태의 레이아웃입니다. 리니어 레이아웃 처럼 orientation속성을 조절해서 배치되는 라디오버튼들을 가로로 정렬할 건지 세로로 정렬할 건지를 결정할 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-105.png){: style="box-shadow: 0 0 5px #777"}


### 선택된 라디오버튼 설정하기: checkedButton
미리 선택되어 있는 라디오버튼을 설정할 수 있습니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-106.png){: style="box-shadow: 0 0 5px #777"}


## 2.6 체크박스

1. 체크박스를 라디오버튼처럼 구성하기 위해서 기본 텍스트뷰는 삭제하고 리니어 레이아웃 (horizontal) 을 화면 가운데 배치합니다. 컨스트레인트를 네 방향 모두 연결하여 화면 가운데 배치합니다. 그런 다음 3개의 체크박스를 리니어 레이아웃 안에 가져다 놓고 각각의 id속성에는 ‘checkedApple’, ‘checkedBanana’, ‘checkedOrange’를 입력합니다. 그리고 text속성도 ‘사과’, ‘바나나’, ‘오렌지’를 순서대로 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-107.png){: style="box-shadow: 0 0 5px #777"}

1. 리니어 레이아웃의 외곽선이 입력된 체크박스에 맞추기 위해 각 체크박스의 layout_width와 layout_height 속성을 모두 ``‘wrap_content’``로 설정합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-108.png){: style="box-shadow: 0 0 5px #777"}

1. 소스 코드와 연결하기 위해서 그래들 설정에 viewBinding을 추가합니다. build.gradle 파일을 열고 android 스코프에 viewBinding true 설정을 추가합니다. 설정 후 우측 상단의 [Sync Now]를 클릭하는 것을 잊으면 안됩니다.

1. [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. onCreate() 위에 binding프로퍼티를 하나 생성하고 by lazy를 사용해서 ActivityMainBinding을 inflate합니다.

    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    ```

1. onCreate() 메서드 안에 작성되어 있는 setContentView에 binding.root를 전달합니다.

    ```kotlin
    setContentView(binding.root)
    ```

1. 이어서 binding으로 앞에서 작성해둔 체크박스에 id를 연결합니다.

1. 이어서 ‘setOnChecked’까지 입력하면 나타나는 리스너 중에 중괄호로 시작하는 코드를 선택합니다.

    ```kotlin
    package kr.co.hanbit.widgetscheckbox

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.widgetscheckbox.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.checkApple.setOnCheckedChangeListener { buttonView, isChecked ->  }
        }
    }
    ```

1. 생성되는 코드 블록의 두 번째 파라미터가 영문 이니셜 (b 또는 다른 글자)로 표시되어 있으면 알아보기 쉽게 ‘isChecked’로 바꿔줍니다. 체크박스 리스너의 첫 번째 파라미터에는 상태 변화가 있는 체크박스 위젯이 그대로 전달되고, 두 번째 파라미터에는 라디오그룹과는 다르게 체크 여부가 Boolean 타입으로 전달됩니다.

    ```kotlin
    package kr.co.hanbit.widgetscheckbox

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import kr.co.hanbit.widgetscheckbox.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.checkApple.setOnCheckedChangeListener { buttonView, isChecked ->
                if (isChecked) {
                    Log.d("CheckBox", "사과가 선택되었습니다.")
                } else {
                    Log.d("CheckBox", "사과가 선택 해제되었습니다.")
                }
            }
        }
    }
    ```

1. 이런 방식으로 코딩하면 모든 체크박스에 리스너를 달아줘야 해서 코드량이 늘어나는 단점이 있습니다. 라디오 그룹에서 처럼 하나의 코드 블록을 처리하기 위해 코드를 조금 바꿔보겠습니다. onCreate() 메서드 위에 listener 프로퍼티를 하나 만듭니다.  그리고 by lazy 를 사용해서 CompoundButton 클래스에 있는 OnCheckedChangeListener를 직접 작성합니다. 

    ```kotlin
    package kr.co.hanbit.widgetscheckbox

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import android.widget.CompoundButton
    import kr.co.hanbit.widgetscheckbox.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        val listener by lazy { CompoundButton.OnCheckedChangeListener
            { buttonView, isChecked ->  }
        }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. 이 리스너를 모든 체크박스에서 사용할 것이기 때문에 when 문으로 어떤 체크박스가 이 리스너로 전달되는지 확인하는 코드를 작성합니다.

    ```kotlin
    package kr.co.hanbit.widgetscheckbox

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import android.widget.CompoundButton
    import kr.co.hanbit.widgetscheckbox.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        val listener by lazy { CompoundButton.OnCheckedChangeListener {
                buttonView, isChecked -> when (buttonView.id) {
                    R.id.checkApple -> Log.d("CheckBox", "사과가 선택되었습니다.")
                    R.id.checkBanana -> Log.d("CheckBox", "바나나가 선택되었습니다.")
                    R.id.checkOrange -> Log.d("CheckBox", "오렌지가 선택되었습니다.")
                }
            }
        }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }
    }
    ```

1. onCreate() 메서드 안에 작성했던 리스너의 중괄호 ({})를 괄호 (())로 변경한 다음 앞에서 작성한 listener프로퍼티를 입력해서 세 줄의 코드를 한줄로 변경합니다.

    ```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        binding.checkApple.setOnCheckedChangeListener(listener);
        binding.checkBanana.setOnCheckedChangeListener(listener);
        binding.checkOrange.setOnCheckedChangeListener(listener);
    }
    ```

1. 에뮬레이터에서 실행하고 로그를 확인합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-109.png){: style="box-shadow: 0 0 5px #777"}

    다음은 MainActivity.kt의 전체 코드입니다. 체크박스는 보통 체크와 해제를 모두 확인해야 하기 때문에 실제 프로젝트에서는 다음처럼 체크박스 해제 코드도 추가해야 합니다.

    ```kotlin
    package kr.co.hanbit.widgetscheckbox

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.util.Log
    import android.widget.CompoundButton
    import kr.co.hanbit.widgetscheckbox.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        val listener by lazy {
            CompoundButton.OnCheckedChangeListener { buttonView, isChecked ->
                if (isChecked) {
                    when (buttonView.id) {
                        R.id.checkApple -> Log.d("CheckBox", "사과가 선택되었습니다.")
                        R.id.checkBanana -> Log.d("CheckBox", "바나나가 선택되었습니다.")
                        R.id.checkOrange -> Log.d("CheckBox", "오렌지가 선택되었습니다.")
                    }
                } else {
                    when (buttonView.id) {
                        R.id.checkApple -> Log.d("CheckBox", "사과가 선택 해제되었습니다.")
                        R.id.checkBanana -> Log.d("CheckBox", "바나나가 선택 해제되었습니다.")
                        R.id.checkOrange -> Log.d("CheckBox", "오렌지가 선택 해제되었습니다.")
                    }
                }
            }
        }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
            binding.checkApple.setOnCheckedChangeListener(listener);
            binding.checkBanana.setOnCheckedChangeListener(listener);
            binding.checkOrange.setOnCheckedChangeListener(listener);
        }
    }
    ```

## 2.7 토글버튼, 스위치, 이미지뷰

토글버튼<sup>ToggleButton</sup>은 체크박스와 동일합니다. 부모 클래스인 CompoundButton을 상속받아 사용하기 때문에 체크박스의 리스너와 구현이 완전 동일합니다.

스위치도 체크박스와 구현이 동일하며 체크박스, 토글버튼, 스위치는 모두 CompoundButton을 상속받아 사용하므로 하나의 사용법만 익히면 동일한 리스너로 컨트롤 할 수 있습니다.

## 2.8 프로그래스바

프로그래스바<sup>ProgressBar</sup>는 진행 상태를 나타내는 위젯입니다.

### 프로그래스바의 진행 상태 표시하기

1. activity_main.xml 에서 화면에 리니어 레이아웃 (vertical)을 가져다 놓고 컨스트레인트는 네방향 모두 연결합니다. 리니어 레이아웃의 id속성에 ‘progressLayout’이라고 입력하고 gravity속성을 ‘center’로 설정합니다.

1. 그다음 팔레트의 위젯 카테고리에서 프로그래스바(ProgressBar)와 텍스트 카테고리의 텍스트뷰를 1개씩 리니어 레이아웃 안에 가져다 놓습니다. 텍스튜뷰의 gravity속성도 ‘center’로 설정합니다.

1. 텍스트뷰의 text 속성에 ‘Downloading...’이라고 입력해주면 다음 그림과 같이 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-110.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle 파일에 viewBinding을 설정하고 [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. 그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.

1. 클래스 안에 showProgress메서드를 만들고 리니어 레이아웃을 숨겼다 보였다 할 수 있는 코드를 추가합니다.

    ```kotlin
    package kr.co.hanbit.widgetsprogressbar

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.view.View
    import kr.co.hanbit.widgetsprogressbar.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)
        }

        fun showProgress(show: Boolean) {
            if (show) {
                binding.progressLayout.visibility = View.VISIBLE
            } else {
                binding.progressLayout.visibility = View.GONE
            }
        }
    }
    ```

    ``공통 속성 visiblity``

      - ``VISIBLE`` : 현재 보이는 상태
      - ``INVISIBLE`` : 현재 안 보이는 상태. 보이지는 않지만 공간을 차지하고 있습니다.
      - ``GONE`` : 현재 안보이는 상태. 보이지도 않고 공간도 차지하지 않습니다.

1. 앱이 실행되고 3초 후에 showProgress(false)를 호출하는 코드를 onCreate() 메서드 안에 작성합니다. Thread.sleep() 메서드를 사용하면 지정된 시간 동안 다음 코드가 실행되지 않습니다.

    ```kotlin
    setContentView(binding.root)

    Thread.sleep(3000) // 3초
    showProgress(false)
    ```

1. 에뮬레이터에서 실행해봅니다. 실행해도 에뮬레이터 화면에는 아무것도 보이지 않습니다. 메인 스레드에서 동작을 멈추는 Thread.sleep() 메서드를 호출했기 때문입니다.

1. Thread.sleep 메서드를 백그라운드 (서브 스레드)에서 동작시키기 위해 코드를 추가합니다. thread(start=true) 함수를 사용하면 함수 블록 안의 코드가 모두 백그라운드에서 동작합니다.

    ```kotlin
    thread(start=true) {
        Thread.sleep(3000)
        showProgress(false)
    }
    ```
    이대로 실행하면 3초간 프로그래스바가 동작하다가 앱이 죽습니다. UI와 관련된 모든 코드는 메인 스레드에서 실행해야만 합니다. 앞의 코드에서 showProgress메서드를 백그라운드에서 호출하기 때문에 앱이 강제 종료되는 것입니다.

1. showProgress메서드만 메인 스레드에서 실행하도록 코드를 한 줄 더 추가합니다.

    ```kotlin
    thread(start=true) {
        Thread.sleep(3000)
        runOnUiThread {
            showProgress(false)
        }
    }
    ```

1. 이제 앱을 다시 실행하면 3초간 프로그래스바가 동작하다가 없어집니다.


## 2.9 시크바

시크바<sup>SeekBar</sup>는 ``볼륨을 조절``하거나 ``뮤직플레이어에서 재생 시간을 조절``하는 용도로 많이 사용합니다.

1. 위젯 카테고리의 시크바 (SeekBar)를 드래드해서 화면 가운데에 가져다 놓고 컨스트레인트를 네 방향 모두 연결합니다. 그리고 layout-width 속성은 ‘0dp’, layout_height 속성은 ‘wrap_content’로 입력합니다.

1. id속성에 seekBar가 입력되어 있는 것을 확인합니다. 없으면 입력합니다.

1. 시크바 위에 텍스트뷰를 하나 가져다 놓고 컨스트레인트를 연결합니다. 텍스트뷰의 id속성에는 ‘textView’, text속성에는 ‘0’을 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-111.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle 파일에 viewBinding 설정을 하고 [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. 그리고 binding을 생성한 후, setContentView에 binding.root를 전달합니다.

1. setContentView 아랫줄에 ‘binding.seekBar.set’까지만 입력하면 나타나는 목록에서 setOnSeekBarChangeListnener를 선택합니다.

1. 앞에서 생성된 리스너의 괄호 안에 ‘object: SeekBar.OnSeekBarChangeListener {}’ 코드를 다음과 같이 추가합니다.

    ```kotlin
    binding.seekBar.setOnSeekBarChangeListener(object: SeekBar.OnSeekBarChangeListener {

    })
    ```

1. 리스너의 코드 블록 사이를 클릭한 채로 (중괄호 안에 마우스 포인터를 두고) ``Ctrl`` + `I`키를 입력한 후 나타나는 [Implement Members]팝업창에서 3개의 메서드를 모두 선택하고 [OK]를 클릭합니다.
    
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-112.png){: style="box-shadow: 0 0 5px #777"}

1. onProgressChanged 메서드 안에 다음의 코드를 한 줄 추가합니다.

    ```kotlin
    override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
        binding.textView.text = "$progress"
    }
    ```
    - ``텍스트뷰의 text속성``
      - 텍스트뷰의 text속성에는 문자열만 입력이 가능합니다. 텍스트뷰의 text에 Int타입의 숫자를 입력하면 리소스 아이디로 인식해서 오류가 발생합니다. 따라서 Int타입의 숫자를 입력할 때는 쌍따음표 ("") 안에 $변수를 넣는 형태로 입력해야 합니다.

1. 에뮬레이터에서 실행한 후 시크바를 드래그하면 상단의 숫자가 바뀌는 것을 확인할 수 있습니다.

    OnSeekBarChangeListener의 첫 번째 메서드인 onProgressChanged의 파라미터는 다음과 같습니다.

    - ``seekBar`` : 리스너가 동작하고 있는 시크바 위젯
    - ``progress`` : 현재 시크바의 현재 progress값
    - ``fromUser`` : 사용자 터치 여부 (코드에서 시크바를 움직일 수도 있기 때문에 사용자의 터치에 의해 동작하는 것인지를 알기위한 값)

    ```kotlin
    package kr.co.hanbit.widgetsseekbar

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.widget.SeekBar
    import kr.co.hanbit.widgetsseekbar.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            binding.seekBar.setOnSeekBarChangeListener(object: SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                    binding.textView.text = "$progress"
                }

                override fun onStartTrackingTouch(seekBar: SeekBar?) {
                    //TODO("Not yet implemented")
                }

                override fun onStopTrackingTouch(seekBar: SeekBar?) {
                    //TODO("Not yet implemented")
                }
            })
        }
    }
    ```

    시크바의 주요 속성은 다음과 같습니다.

    - ``max`` : 시크바의 최대값을 설정합니다. 위의 예제에서 드래그를 좌측 끝까지 설정하면 100이 되는데, max값을 200으로 설정하면 200까지 표현할 수 있습니다.
    - ``progress`` : 처음 시작하는 시크바의 값을 설정합니다. 기본값은 0


## 2.10 레이팅바

1. 화면 중앙에 위젯의 레이팅바<sup>RatingBar</sup>를 가져다 놓고 컨스트레인트를 네 방향 모두 연결합니다. id속성에는 ‘ratingBar’가 입력되어 있는지 확인합니다.

1. 레이팅바 오른쪽에 텍스트뷰를 배치하고 컨스트레인트를 레이팅바에 연결합니다. 그리고 텍스트뷰의 id속성에는 ‘textView’, text속성에는 ‘0.0’를 입력합니다.
    
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-113.png){: style="box-shadow: 0 0 5px #777"}

1. build.gradle파일에 viewBinding설정을 하고 [MainActivity.kt]탭을 클릭해서 소스 코드로 이동합니다. 그리고 binding을 생성한 후 setContentView에 binding.root를 전달합니다.

    ```kotlin
    package kr.co.hanbit.wdgetsratingbar

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import kr.co.hanbit.wdgetsratingbar.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            
        }
    }
    ```

1. setContentView 다음 줄에 ‘binding.ratingBar.setOn’까지만 입력하면 나타나는 리스너 메서드 중에 중괄호로 시작하는 코드를 선택합니다. 그러면 다음과 같이 코드가 생성됩니다.

    ```kotlin
    binding.ratingBar.setOnRatingBarChangeListener { ratingBar, rating, fromUser ->
        
    }
    ```

1. 시크바와 마찬가지로 안드로이드 스튜디오 버전에 따라 파라미터 이름이 다를 수 있습니다.  앞의 순서대로 변경해서 사용하면 됩니다.

    - rating : 현재별점
    - fromUser : 사용자 입력 여부

1. 시크바와는 인터페이스 구조가 다르기 때문에 중괄호 안에 식을 바로 사용할 수 있습니다.

    ```kotlin
    binding.ratingBar.setOnRatingBarChangeListener { ratingBar, rating, fromUser ->
        binding.textView.text = "$rating"
    }
    ```

1. 에뮬레이터에서 실행하고 드래그해보면 숫자의 값이 바뀌는 것을 확인할 수 있습니다.

    레이팅바에서 사용되는 주요 속성은 다음과 같습니다.
    - numStars : 전체 표시되는 별의 개수를 설정할 수 있습니다.
    - rating : 기본 별점 처음 시작하는 별점값입니다.
    - stepSize : 별을 드래그했을 때 움직이는 최소 단위 0.1로 설정하면 별 하나를 10단위로 쪼개서 표시해줍니다.


# 3. 리소스 다루기

## 3.1 drawable과 단위

안드로이는 스마트폰마다 가로세로 화소(픽셀)의 개수가 다르기 때문에 사이즈를 표시하는 단위로 가상 화소 개념인 dp를 사용합니다. dp는 화면 밀도인 DPI에 따라서 실세 픽셀로 변환되는 크기가 달라지는데 drawable 또한 DPI에 따라서 서로 다른 이름의 디렉토리를 사용합니다.

### DPI

DPI<sup>Dots Per Inch</sup>는 가로세로 1인치 (2.54cm)의 정사각형 공간에 들어 있는 픽셀의 숫자를 나타내는 단위 입니다. 안드로이드는 160DPI를 기본으로 사용하는데 이를 mdpi라고 합니다. 내 스마트폰의 DPI가 mdpi라면 화면을 켰을 때 1인치의 사각형 안에 160개의 화소가 그려집니다. 

![1]({{site.baseurl}}/images/this-is-android/this-is-android-114.png){: style="box-shadow: 0 0 5px #777"}

### dp

DP<sup>Density-independent Pixels</sup>는 안드로이드에서 사용하는 독립적 수치 단위로, 해상도와 관계없이 동일한 크기로 화면에 표시하기 위해서 사용됩니다. 예를들어 가로세로가 각각 3dp인 사각형을 mdpi스마트폰에 그릴 때와 xhdpi스마트폰에 그릴 때 두 화면에서 같은 크기로 보이기 위해서 다음과 같이 그립니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-115.png){: style="box-shadow: 0 0 5px #777"}

### sp

텍스트뷰에서 한 번 언급한 바와 같이, 문자열 크기를 나타내기 위해 사용하는 단위입니다. 단위에 sp<sup>Scale-independent pixcels</sup>를 사용하면 줌인이나 줌아웃 시에 다른 위젯에는 영향을 주지 않고 해당 위젯의 글자만 커지거나 작아지게 할 수 있습니다.


### drawable 디렉토리 구성

앞서 설명한 DPI구조로 인해 각각의 해상도에 맞는 drawable디렉토리에 이미지를 넣고 사용합니다.
실무에서 디자이너와 함께 협업하면 총 5개의 디렉토리에 각 사이즈에 맞는 이미지를 전달해줍니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-116.png){: style="box-shadow: 0 0 5px #777"}

안드로이드 스튜디오의 좌측 탐색 영역 모드를 Project로 놓고 사용하는 것이 디렉토리 구조를 그대로 보여주기 때문에 이미지와 같은 리소스를 관리하기에 편합니다.
중간에 ``-v24``가 붙어 있는 ``drawable-v24`` 디렉토리에 있는 이미지는 안드로이드 디바이스의 버전이 24이상일 대 자동으로 선택됩니다.
이처럼 앱을 개발할 때는 동일한 이미지를 최소 5개의 해상도로 만들어서 사용해야 합니다.
뒤에 아무런 접미사<sup>suffix</sup>가 없는 drawable 디렉토리는 이미지 외에 화면과 관련된 XML파일을 관리하는 용도로 제공됩니다.
예를 들어 안드로이드 XML로 벡터 기반 (좌표로 이루어진)의 그림을 그릴 수 있는데 이렇게 만들어진 XML파일을 drawable에 저장하면 해상도와 상관없이 사용할 수 있습니다.


## 3.2 mipmap 앱 아이콘 사용하기

### mipmap
안드로이드는 drawable과 더불어 앱의 아이콘에 사용하는 용도로 mipmap디렉토리를 제공합니다.
mipmap은 앱 아이콘 관리용으로만 사용하도록 권장하므로 일반 이미지는 drawable에 넣고 사용해야 합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-117.png){: style="box-shadow: 0 0 5px #777"}

안드로이드 버전 26부터는 아이콘에 백그라운드, 포어그라운드 개념이 도입되면서 mipmap-anydpi-v26디렉토리가 추가되었습니다.
각각의 디렉토리에 아이콘 이미지를 넣고 AndroidManifest.xml에 있는 <application> 태그의 icon 속성에 설정하면 앱 설치 후 안드로이드 화면에 나타납니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-118.png){: style="box-shadow: 0 0 5px #777"}

roundIcon속성은 버전 25부터 지원한 속성으로 안드로이드 런처가 둥그란 아이콘을 사용하면 해당 속성에 지정된 mipmap이미지를 사용합니다.

### adaptive icon
mipmap-anydpi-v26 디렉토리 안에 있는 ic_launcher.xml 파일을 열어보면 다음과 같은 xml코드가 작성되어 있는데, 태그명에서 유추할 수 있듯이 백그라운드 이미지와 포어그라운드 이미지 2개를 포개어서 아이콘으로 그려주는 역활을 합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-119.png){: style="box-shadow: 0 0 5px #777"}

``<background>`` 태그값에 @drawable/ic_launcher_background 파일명이 지정되어 잇는데, 이 파일에 앞서 설명한 백터 기반의 이미지가 입력되어 있습니다.
이런 구조를 어댑티브 아이콘<sup>adaptive icon</sup>이라고 합니다

## 3.3 strings와 다국어 처리

### strings 다루기

안드로이드는 strings.xml 을 Translations Editor를 통해서 관리할 수 있습니다.

1. strings.xml 파일을 열어 우측 상단에 있는 [Open editor]링크를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-120.png){: style="box-shadow: 0 0 5px #777"}

1. 링크를 클릭하면 Translation Editor가 나타나는데 [Code]모드에서 직접 XML을 수정하는 대신에 이 에디터를 통해서 strings를 추가하거나 삭제할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-121.png){: style="box-shadow: 0 0 5px #777"}

1. 에디터 상단에 [+]버튼을 클릭하면 ``<string>`` 태그를 생성할 수 있는 팝업창이 나타납니다. Key와 Value를 입력해서 하나를 생성해보세요

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-122.png){: style="box-shadow: 0 0 5px #777"}

1. [-]버튼은 ``<string>``을 삭제하는데 사용합니다.


### 다국어 처리하기
Translations Editor의 원래 기능은 단순히 ``<string>`` 태그를 생성하는게 아니라 다국어를 처리하는데 목적이 있습니다.

1. [+]와 [-]버튼 오른쪽에 있는 지구본을 클릭하면 나타나는 선택 메뉴에서 [Korean(ko)]을 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-123.png){: style="box-shadow: 0 0 5px #777"}

1. ‘Korean(ko)’을 선택하면 기존 strings목록의 컬럼에 Korean(ko)가 추가됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-124.png){: style="box-shadow: 0 0 5px #777"}

1. 좌측의 탐색기를 보면 새로운 디렉토리인 values-ko가 생성되어 있고 그 안에 strings.xml이 추가되어 있습니다. 다국어 처리시에도 Project뷰로 놓고 사용하는 것이 좋습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-125.png){: style="box-shadow: 0 0 5px #777"}

1. 다시 Translations Editor로 돌아가서 새로 생긴 Korean(ko)컬럼에 한글을 입력합니다.

1. 입력을 완료하고  strings.xml(ko)파일을 열어보면 원본 strings.xml에 있는 key와 같은 key로 된 ``<string>``태그에 한글 value가 입력되어 있습니다.


<style>
.page-container {max-width: 1200px}
</style>
