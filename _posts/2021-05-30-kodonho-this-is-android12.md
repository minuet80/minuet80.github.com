---
layout: post
title:  "[IT] - [BOOK] 12강 - 이것이 안드로이드다 with 코틀린 "
description: 구글 플레이 스토어에 앱 출시하기
date:   2021-06-10 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Hanbit
permalink: /this-is-android12/
width: large
---

* some text
{: toc}


앱을 출시하는 일은 간단하게는 설치 파일을 생성하고 스토어에 등록한다고 설명할 수 있습니다.

이를 총 7단계로 나누어서 자세히 살펴보려 합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-318.png){: style="box-shadow: 0 0 5px #777"}


첫 두 단계는 설치 파일을 생성하는 단계이며 나머지 단계는 구글 플레이 콘솔에 앱을 등록하는 단계입니다.

1. 키 스토어 생성

    키 스토어는 스토어에 등록하기 위한 설치 파일을 생성할 때 사용합니다.

1. 설치 파일 생성

    AAB 형식으로 설치 파일을 생성합니다. 이전 버전인 APK에 비해 경량화된 설치 파일입니다.

1. 구글 플레이 콘솔 가입

    구글 플레이 콘솔에 가입해서 개발자로 등록해야 합니다. 구글 메일로 로그인할 수 있으며 로그인 후에 개발자 계약, 등록 수수료를 결제해야 합니다.

1. 콘솔에 앱 정보 작성

    출시할 앱의 아이콘, 이름 등 세부 정보를 등록하고 앱의 실행 화면 스크린숏도 함께 등록해야 합니다.

1. AAB 파일 업로드 > 내부 테스트

    앞에서 생성한 설치 파일을 앱 관리 메뉴를 통해 업로드 합니다. 주로 개발자 내부 테스트용으로 사용됩니다.

1. 알파 테스트

    내부 테스트가 완료된 앱을 개발자 이외의 관계자 테스트용으로 사용합니다. 외부 업체를 통해 테스트를 진행한다면 외주 테스터들의 이메일을 등록해두고 등록된 이메일만 앱을 다운로드받고 설치할 수 있도록 합니다.

1. 프로덕션 출시

    알파 테스트가 완료된 앱을 실제 스토어에 출시합니다.

## A.1 설치 파일 생성하기

예제를 따라 하면서 하나씩 알아보도록 하겠습니다.

12장에서 마지막으로 작성한 도서관 지도 앱 프로젝트로 실습하려 합니다.

해당 프로젝트를 다시 열어보세요

1. 안드로이드 스튜디오 메뉴에서 [Build] - [Generate Signed Bundle/APK...]를 선택합니다. 선택 창이 나오면 [Android App Bundle]을 선택하고 [Next]버튼을 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-319.png){: style="box-shadow: 0 0 5px #777"}

    ``AAB가 무엇인가요?``

    오래전부터 안드로이드 스마트폰을 사용한 독자라면 APK 파일은 들어봤을 겁니다. AAB는 Android App Bundle 의 약어로 새로운 설치 파일 형식입니다. 
    2018년 구글 I/O를 통해 소개되었으며 앱 번들은 안드로이드 스튜디오에서 임의 기기에 대해 앱에서 필요한 모든 것을 담은 앱 번들을 빌드합니다. 
    재미있는 것은 이 다음 처리인데, 이렇게 올라간 빌드 파일이 그대로 사용자의 스마트폰에 들어가는게 아니라 구글 플레이의 다이나믹 딜리버리 (Dinamic Delivery)를 거쳐 사용자의 기기에 맞춤형 앱으로 변경되어 전달됩니다.

1. 다음 단계는 설치 파일에 사용할 암호키 생성 단계입니다. 아직 키 스토어가 없을 테니 가운데 [Create new...] 버튼을 클릭해서 키 스토어 생성 창을 엽니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-320.png){: style="box-shadow: 0 0 5px #777"}


1. 키 스토어 생성 화면입니다. Key store path 입력 필드의 끝에 있는 아이콘을 클릭해서 키 스토어를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-321.png){: style="box-shadow: 0 0 5px #777"}

    ``키 스토어 역할``

    키 스토어는 설치 파일을 생성할 때 사용할 키를 저장해둘 수 있는 일종의 암호화된 데이터베이스 같은 역할을 합니다.
    키 스토어에 저장된 키의 자료는 내보낼 수 없는 상태(non-exportable) 로 암호화해서 사용할 수 있으며, 사용 시기와 사용 방법을 제한할 수도 있습니다.

1. 키 스토어의 Password, Confirm 을 입력합니다. 그리고 키로 사용될 이름을 Alias에 입력하고, 역시 Password와 Confirm을 입력합니다. Certificate항목에는 가장 윗줄에 있는 입력 필드 하나만 입력하면 됩니다. (본인 이름 입력하시면 됩니다.)  [OK] 버튼을 클릭해서 키 스토어와 키를 생성합니다. 경고창이 나타나면 [OK]를 클릭하고 넘어갑니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-322.png){: style="box-shadow: 0 0 5px #777"}

1. 키 스토어와 함께 사용할 키가 자동으로 입력됩니다. Key store password나 Key password 필드가 비어 있다면 직접 입력하고 [Next] 버튼을 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-323.png){: style="box-shadow: 0 0 5px #777"}

1. 스토어 등록을 위해 [release]를 선택하고 [Finish] 버튼을 클릭해서 완료합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-324.png){: style="box-shadow: 0 0 5px #777"}

1. 프로젝트 디렉토리의 [app] - [release] 디렉토리 아래 app-release.aab 파일이 생성됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-325.png){: style="box-shadow: 0 0 5px #777"}



## A.2 구글 개발자 등록하기

1. 웹 브라우저를 실행한 다음 검색창에 ‘구글 플레이 콘솔’을 입력한 후 검색 결과를 클릭해서 이동합니다. 또는 다음 URL을 직접 입력해도 됩니다. 사이트에 접속한 다음 구글 계정으로 로그인합니다. 계정이 없으면 새로 만들어 로그인합니다.

    [https://developer.android.com/distribute/console](https://developer.android.com/distribute/console)

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-326.png){: style="box-shadow: 0 0 5px #777"}


1. 개발자 계정을 생성하는 창에서 필수 항목을 모두 입력하고 Create 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-327.png){: style="box-shadow: 0 0 5px #777"}

1. 결제 화면이 나타나면 카드 정보를 입력하고 [구매(Buy)] 버튼을 클릭해서 결제합니다.

    ``25$가 바로 결제됩니다. 😢 (강도가 따로업네) ``{: style="background-color: #ffcccc"}

1. 등록이 완료되면 구글 플레이 콘솔 화면이 나타납니다. 새로 등록한 계정이라면 중간에 앱 0개라고 표시될 겁니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-328.png){: style="box-shadow: 0 0 5px #777"}


## A.3 앱 등록하기

다음 순서에 따라서 앱을 등록하겠습니다.

1. 스토어 등록정보

1. 스토어 설정

1. 앱 콘텐츠

1. 출시 정보 등록

### 스토어 등록정보

스토어 등록정보를 작성합니다.

1. 구글 플레이 콘솔 메인 화면의 좌측 상단의 [모든 앱]을 선택합니다.

1. 그 다음화면의 우측 상단에 보이는 [앱 만들기] 버튼을 클릭합니다.

1. 앱 이름을 입력하고, 기본 언어, 앱 종류, 유/무료를 선택합니다. 하단의 요청에 있는 2개의 체크박스를 모두 체크한 후 [앱 만들기]를 클릭해서 앱을 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-329.png){: style="box-shadow: 0 0 5px #777"}

1. 앱 대시보드 화면이 나타나는데 좌측 메뉴의 [성장] 에서 [앱 정보] - [기본 스토어 등록정보]를 선택한 후 기본 정보 (앱 이름, 간단한 설명, 자세한 설명) 를 입력하고 하단의 그래픽 등록 화면에서 다음 예시처럼 앱 아이콘, 그래픽 이미지, 휴대전화 스크린샷을 등록하고 [저장] 버튼을 클릭해서 설정을 저장합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-330.png){: style="box-shadow: 0 0 5px #777"}


### 스토어 설정

좌측 메뉴에서 [성장]에 있는 [앱 정보] - [스토어 설정]을 선택한 다음 앱의 종류와 카테고리를 선택합니다.

그리고 이메일 주소를 입력하되, 외부 마케팅은 체크하지 않은 다음 [저장] 버튼을 눌러서 설정을 저장합니다.


![1]({{site.baseurl}}/images/this-is-android/this-is-android-331.png){: style="box-shadow: 0 0 5px #777"}


### 앱 콘텐츠

좌측 메뉴 중 [정책]의 [앱 콘텐츠]를 선택해서 개인정보처리방침부터 순서대로 처리해야 합니다.

1. 개인정보처리방침은 사용자의 개인정보를 사용하지 않는다면 입력하지 않아도 됩니다. 개인정보처리방침에 있는 [시작] 버튼을 클릭하면 나타나는 화면에 개인정보처리방침을 작성해둔 웹 사이트 URL을 입력하고 [저장] 버튼을 클릭해 앱 콘텐츠 화면으로 이동합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-332.png){: style="box-shadow: 0 0 5px #777"}

1. 이어서 광고에 있는 [시작] 버튼을 클릭하고 광고를 설정합니다. 설정이 완료되면 [저장]을 눌러서 저장하고 앱 콘텐츠 화면으로 이동합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-333.png){: style="box-shadow: 0 0 5px #777"}

1. 앱 액세스 권한 아래의 [시작]을 클릭해서 권한을 설정합니다. 설정이 완료되면 [저장]을 눌러서 저장하고, 다시 앱 콘텐츠 화면으로 이동합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-334.png){: style="box-shadow: 0 0 5px #777"}

1. 콘텐츠 등급은 설문지 작성 과정이 있습니다. [시작] 버튼을 클릭한 다음 [설문지 시작] 버튼을 클릭합니다. 설문지 작성은 총 3단계로 나누어져 있는데 ``카테고리 - 설문지 - 요약`` 입니다.

    - ``카테고리``: 카테고리에서 이메일 주소를 입력하고 참고자료, 소셜 네트워킹, 콘텐츠 집계, 게임, 엔터테인먼트 등의 앱 카테고리를 선택한 후 [다음] 버튼을 클릭해서 설문을 시작합니다.

    - ``설문지``: 설문지 단계는 콘텐츠 등급을 결정하는 설문 내용이 있습니다. 설문 내용을 순서대로 모두 작성한 다음 [저장]을 클릭하고 [다음] 버튼을 클릭합니다.

    - ``요약``: 설문지 과정을 통해서 앱의 콘텐츠 등급이 결정됩니다. [제출] 버튼을 클릭해서 콘텐츠 등급 설정을 완료하고 앱 콘텐츠 화면으로 이동합니다.

1. 타겟층 및 콘텐츠의 [시작]을 클릭하면 대상 연령 - 앱 세부정보 - 광고 앱 정보 - 요약, 총 5단계로 진행됩니다.

    - ``대상 연령``: 콘텐츠의 대상 연령을 체크합니다.

    - ``앱 세부정보``: 앱 세부정보를 입력합니다.

    - ``광고``: 광고의 유무를 선택합니다.

    - ``앱 정보``: 대상 연령별 요구하는 앱 정보를 추가로 작성합니다.

    - ``요약``: 내용을 확인하고 [저장]을 클릭해서 설정한 내용을 저장한 후 앱 콘텐츠 화면으로 이동합니다.

1. 이어서 뉴스 앱의 [시작] 버튼을 클릭해서 뉴스인지를 설정한 다음 [저장]을 클릭하면 설정이 마무리 됩니다.


### 출시 정보 등록

좌측 메뉴의 [출시]에서 [테스트] - [내부 테스트]를 선택합니다.

1. 우측 상단의 [새 버전 만들기]를 선택합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-335.png){: style="box-shadow: 0 0 5px #777"}

1. 플레이 스토어에 앱을 처음 등록하는 경우에는 Play 앱 서명이 필요합니다. 중간에 [계속] 버튼을 클릭해서 앱 서명 설정을 완료합니다. 

1. 번들 파일 등록에 앞서 내부 테스트 등록이 필요합니다. 내부 테스터로 등록하면 검토 시간과 상관없이 앱을 내려받을 수 있습니다. 보통 업로드 후 약 10분 내외의 시간이 소요됩니다. 화면 중간에 이메일 목록 만들기를 클릭해서 테스터의 이메일을 등록합니다. 미리 등록된 테스터가 있으면 테스터 목록 옆이 파란색 화살표를 클릭하면 됩니다.


1. 목록 이름을 작성한 후, 이메일 주소를 하나씩 추가합니다. 쉼표로 구분해서 이메일 여러 개를 한 번에 입력할 수도 있습니다. 입력이 완료되면 [변경사항 저장] 버튼을 클릭해서 테스터 등록을 완료합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-337.png){: style="box-shadow: 0 0 5px #777"}

1. 테스터 등록을 완료하면 목록에서 테스터를 체크한 후 화면 하단의 [변경사항 저장] 을 클릭해서 테스터를 설정합니다.

1. 다시 출시 탭을 선택하고 번들 파일을 등록할 준비를 합니다. 안드로이드 스튜디오에서 생성한 .aab파일을 드래그래서 [App Bundle 및 APK]아래의 박스에 가져다 놓습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-336.png){: style="box-shadow: 0 0 5px #777"}

1. 출시 명에는 안드로이드 스튜디오의 build.gradle 파일에 입력했던 versionName이 자동으로 입력됩니다.

1. 스토어에 표시될 출시 노트를 작성하고 아래의 [저장]을 클릭합니다.

1. 이후 활성화되는 [버전 검토]를 클릭합니다.

1. 버튼이 다시 [내부 테스트 트랙으로 출시 시작]으로 변경됩니다. 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-338.png){: style="box-shadow: 0 0 5px #777"}

1. 다음과 같이 출시 확인 팝업창이 나타납니다. [출시]를 클릭해서 출시합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-339.png){: style="box-shadow: 0 0 5px #777"}

1. 내부 테스트 트랙으로 출시가 되면 출시 세부정보 보기 텍스트 옆에 버전 승급 선택 메뉴가 나타납니다. 클릭하면 비공개 테스트 또는 프로덕션으로 승급처리를 할 수 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-340.png){: style="box-shadow: 0 0 5px #777"}

1. 앞의 선택 메뉴에서 프로덕션을 선택하면 내부테스트 처음 화면과 같은 화면이 나타납니다. 화면 하단의 [버전 검토]를 클릭하면 검토가 시작되는데, 아직 출시 국가를 설정하지 않았기 때문에 [프로덕션으로 출시 시작] 버튼이 활성화되지 않았습니다. 만약 출시 국가를 이미 활성화했다면 18번으로 건너 뛰면 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-341.png){: style="box-shadow: 0 0 5px #777"}

1. 화면 중간에 있는 [국가/지역] 탭을 선택해 [국가/지역 추가]를 클릭합니다. 보이지 않는다면 좌측 메뉴에서 출시 개요를 선택한 후 다시 프로덕션을 선택해서 화면을 갱신하면 됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-343.png){: style="box-shadow: 0 0 5px #777"}

1. 출시할 국가를 선택하고 [국가/지역 추가] 버튼을 클릭해서 설정을 저장합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-342.png){: style="box-shadow: 0 0 5px #777"}


1. 다시 출시 탭으로 이동합니다. 화면에서 [수정] 버튼을 클릭해서 출시를 계속 진행합니다.

1. 화면 하단에 [버전 검토] 버튼이 다시 나타납니다. 클릭해서 다음 단계로 넘어갑니다.

1. 여기까지 정상적으로 진행되었다면 [버전 검토] 버튼이 [프로덕션 트랙으로 출시 시작]으로 변경됩니다. 버튼을 클릭해서 출시를 시작합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-344.png){: style="box-shadow: 0 0 5px #777"}


``모든 설정을 정상적으로 수행했다면 앱을 프로덕션으로 출시하고 2~3시간 정도 후에 구글 플레이 스토어에서 검색할 수 있습니다.``{: style="background-color: #ffcccc"}


<style>
.page-container {max-width: 1200px}
</style>