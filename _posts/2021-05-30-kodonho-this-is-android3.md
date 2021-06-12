---
layout: post
title:  "[IT] - [BOOK] 3강 - 이것이 안드로이드다 with 코틀린 "
description: 위젯과 리소스 다루기
date:   2021-05-30 10:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
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
컴포넌트 트리 또는 UI 편집기에서 컨스트레인트 레이아웃 안에 있는 텍스트뷰를 클릭하면 다음 그림과 같은 선택 영역이 텍스트뷰 주위에 표시됩니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-53.png){: style="box-shadow: 0 0 5px #777"}

텍스튜뷰 상하좌우로 그림과 같은 4개의 동그라미가 보이는데 이것을 핸들러<sup>Handler</sup>라고 합니다.<br>
핸들러가 ``연결상태이면 파란색``으로, ``연결되어 있지 않으면 흰색``으로 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-54.png){: style="box-shadow: 0 0 5px #777"}

핸들러를 드래그해서 연결하고자 하는 다른 위쩻의 핸들러에 가져다 놓거나, 자신을 포함하고 있는 레이아웃의 가장자리에 가져다 놓으면 주름무늬선 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-55.png){: style="box-shadow: 0 0 5px #777"} 이 생성됩니다. 이렇게 연결되는 선을 컨스트레인트<sup>Constraint</sup>라고 하고, 컨스트레인트가 연결될 수 있는 부위를 앵커 포인트<sup>Anchor Point</sup>라고 합니다.

### 컨스트레인트 편집기
컨스트레인트 레이아웃 안에 있는 위젯(지금 화면에서 ‘Hello World!’) 를 컨스트레인트를 조절할 수 있는 편집기가 속성 영역에 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-56.png){: style="box-shadow: 0 0 5px #777"}

편집기의 검은색 도윽라미가 UI편집기의 파란색 동그라미와 같은 핸들러입니다. 컨스트레인트 편집기에서 연결되어 있는 핸들러를 클릭하면 현재 연결을 해제할 수 있습니다. 연결이 해제되면 다음의 그림처럼 컨스트레인트 편집기의 위아래 핸들러에 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-57.png){: style="box-shadow: 0 0 5px #777"} 표시가 나타나고, UI편집기의 파란색 핸들러도 우측 그림처럼 흰색으로 바뀜니다.
![1]({{site.baseurl}}/images/this-is-android/this-is-android-58.png){: style="box-shadow: 0 0 5px #777"}

편집기에서 ![1]({{site.baseurl}}/images/this-is-android/this-is-android-57.png){: style="box-shadow: 0 0 5px #777"}를 클릭하면 가장 가까이에 있는 다른 위젯 또는 레이아웃의 앵커 포인트에 컨스트레인트가 생성됩니다.<br>
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
처음에 50으로 설정되어 있는 값은 비율을 의미하며, 위젯을 양쪽 컨스트레인트의 중앙에 위치 시킵니다.<br>
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

1. 팔레트의 버튼 카테고리에서 버튼 4개를 차례대로 UI편집기로 드래그하여 컨스트레인트를 연결하지 않은 채 그림과 같이 배치합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-64.png){: style="box-shadow: 0 0 5px #777"}

1. 먼저 위쪽에 있는 버튼 2개를 선택한 다음 마우스 우클릭하면 나타나는 메뉴에서 [Chains] - [Create Horizontal Chain]을 선택합니다. 
![1]({{site.baseurl}}/images/this-is-android/this-is-android-65.png){: style="box-shadow: 0 0 5px #777"}<br><br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-66.png){: style="box-shadow: 0 0 5px #777"}

1. 같은 방법으로 아래쪽 버튼 2개도 체인으로 연결합니다.
1. 정상적으로 연결되었다면 버튼 4개를 모두 클릭했을 때 다음과 같은 화면이 나타납니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-67.png){: style="box-shadow: 0 0 5px #777"}
1. 이번에는 세로축 체인을 연결해보세요. 한 번에 한 줄 씩 해야 합니다. 4개를 모두 선택하고 적용하면 원하지 않은 결과가 나타나므로 좌측의 버튼 2개를 먼저 선택합니다. 그리고 마우스 우클릭한 다음 메뉴에서 [Chains] - [Create Vertical Chain]을 선택합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-68.png){: style="box-shadow: 0 0 5px #777"}
1. 남은 2개의 버튼도 같은 방법으로 [Vertical Chain]을 연결합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-69.png){: style="box-shadow: 0 0 5px #777"}
1. 버튼 4개가 모두 체인으로 연결되었습니다. 체인은 컨스트레인트와는 다르게 체인 모양 (![1]({{site.baseurl}}/images/this-is-android/this-is-android-70.png){: style="box-shadow: 0 0 5px #777"}) 의 인터페이스로 되어 있습니다. 이제 4개의 버튼을 모두 선택하고 속성에서 ``layout_width``와 ``layout_height``값을 ``‘0dp (match_constraint)’``으로 변경합니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-71.png){: style="box-shadow: 0 0 5px #777"}
1. match_constraint로 설정하면 ‘0dp’로 설정됩니다.
1. 버튼이 모두 꽉 찬 형태로 보여집니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-72.png){: style="box-shadow: 0 0 5px #777"}

### 가이드 라인
가이드라인<sup>GuideLine</sup>은 컨스트레인트 레이아웃에서만 사용할 수 있는 보조 도구입니다.
가로/세로 두 가지 가이드라인이 있는데, 가이드라인을 드래드해서 화면 임의의 위치에 가져다 놓으면 레이아웃 안에 배치되는 위젯에 가장의 앵커 포인트를 제공합니다.<br>


## 1.3 리니어 레이아웃
리니어 레이아웃<sup>LinearLayout</sup>은 위젯을 가로 또는 세로 한 줄로 배치하기 위한 레이아웃 입니다.
레이아웃 속성 중에 orientation의 가로, 세로만 변경해주면 기존에 배치되어 있던 위젯들도 방향을 바꿀 수 있습니다.

### 리니어 레이아웃을 기본 레이아웃으로 사용하기
리니어 레이아웃을 사용하기 위해서 컨스트레인트 레이아웃 안에 리니어 레이아웃을 추가할 수도 있지만 레이아웃이 중첩되면 그만큼 그래픽 처리 속도가 느려지기 때문에 기본 레이아웃인 컨스트레인트 레이아웃을 바꾼 후에 작업하도록 하겠습니다.

1. 속성 영역 위에 있는 [Code] 버튼을 클릭해서 모드를 변경합니다.
1. 화면이 XML 코드를 직접 편집할 수 있는 모양으로 변경됩니다.
1. XML코드에서 2행에 있는 androidx.constraintlayout.widget.ConstraintLayout을 ``‘LinearLayout’``으로 수정합니다.
1. 다시 우측 상단에 있는 [Design]버튼을 클릭해서 모드를 변경하면 컴포넌트 트리 (Component Tree)의 최상위 레이아웃이 리니어 레이아웃으로 변경된 것을 볼 수 있습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-73.png){: style="box-shadow: 0 0 5px #777"}

#### orientation속성
orientation하위 버전의 안드로이드 스튜디오에서는 필수 속성이었지만 3.1부터는 입력하지 않으면 가로로 배치됩니다.
레이아웃 안에 있는 기본 텍스트뷰를 삭제하고, 팔레트에서 새로운 텍스트뷰 3개를 드래드해서 레이아웃 안에 가져다 놓습니다.<br>
![1]({{site.baseurl}}/images/this-is-android/this-is-android-74.png){: style="box-shadow: 0 0 5px #777"}


<style>
.page-container {max-width: 1200px}‘’
</style>
