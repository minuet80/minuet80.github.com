---
layout: post
title:  "[IT] - [BOOK] 10강 - 이것이 안드로이드다 with 코틀린 "
description: 서비스와 콘텐트 리졸버
date:   2021-06-08 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android10/
width: large
---

* some text
{: toc}


# 1. 서비스

서비스는 화면이 없는 액티비티입니다.


서비스가 백그라운드에서 동작하는 컴포넌트로 알려져 있는데 실제로 서비스만으로는 백그라운드에서 동작하지 않습니다.

그리고 화면이 없는 액티비티라고 표현한 이유는 서비스가 메인 스레드를 사용하기 때문입니다.

액티비티와 서비스 양쪽에 10초 동안, 1초마다 컴포넌트의 이름을 출력하는 코드를 작성합니다.

서비스는 ‘Service’를 출력하고, 액티비티는 ‘Activity’를 출력하도록 작성되어야 합니다.

그리고 액티비티에서 startService를 실행함과 동시에 반복문으로 ‘Activity’를 출력하는 코드를 실행하면, 어느 한쪽의 코드가 끝나야만 다른 쪽 코드가 실행됩니다.

보통 동일한 코드를 백그라운드 스레드로 작성하면 2개가 뒤섞여서 출력됩니다.

| 서비스로 동작할 때 로그캣 | 백그라운드 스레드로 동작할 때 로그캣 |
| :--- | :--- |
| Activity | Activity |
| Activity | Service |
| Activity | Service |
| ..10번 완료후 | Activity |
| Service | Service |
| Service | ... |
| ... |  |
{: .table .table-striped .table-hover}



<style>
.page-container {max-width: 1200px}‘’“”
</style>