---
layout: post
title:  "[IT] - [BOOK] 7강 - 이것이 안드로이드다 with 코틀린 "
description: 데이터베이스
date:   2021-05-30 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android7/
width: large
---

* some text
{: toc}


# 1. 관계형 데이터베이스와 안드로이드

안드로이드에서 사용하는 SQLite는 관계형 데이터베이스입니다.

관계형 데이터베이스는 데이터의 저장 형태와 관계를 정의하는데, 컬럼<sup> (Column) </sup>과 로우<sup> (Row) </sup>가 있는 테이블을 생각하면 됩니다.

## 1.1 데이블과 쿼리 이해하기

### 테이블

테이블은 한 종류의 데이터가 저장되는 단위입니다.

예를 들어 앱에 2개의 게시판 메뉴가 있다면 테이블을 2개로 만들어 사용할 수 있습니다.

즉, [공지사항]과 [묻고답하기]라는 메뉴가 있다면 [공지사항] 메뉴에 사용되는 데이터가 1개의 테이블이 됩니다.

테이블은 컬럼과 로우가 있다고 했습니다. 

테이블의 구조를 살펴보면 테이블에 저장되는 데이터의 속성은 컬럼(필드)으로 구분합니다.

그리고 각 컬럼에 값이 채워진 한 줄의 데이터 단위를 로우(레코드, 튜플)라고 합니다.

다음 테이블을 보면 ‘no, name, title, file, date’와 같은 데이터의 속성이 필드이고, ‘1, 마이클, 안녕 반가워, 없음, 2019/12’의 한줄이 레코드라는 데이터 단위입니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-236.png){: style="box-shadow: 0 0 5px #777"}

### 쿼리 이해하기

데이터가 있다면 이 데이터를 조작할 수 있어야 합니다.

관계형 데이터베이스는 SQL<sup> (Structured Query Languagee) </sup>이라는 데이터를 정의, 조작, 제어하는 용도의 언어로 사용합니다.

이때 사용하는 명령어를 SQL 구문 또는 쿼리<sup> (Query) </sup>라고 합니다.

생성과 관련된 쿼리를 제외하면 그 외의 쿼리는 테이블에 읽고, 쓰고, 수정하고, 삭제하는 명령어입니다.

예를 들어 테이블A에 있는 모든 데이터를 조회하는 쿼리는 다음과 같이 한 줄의 문자열로 구성됩니다.

```sql
SELECT * FROM 테이블A
```

- SELECT: 읽어와라
- *(애스터리스크): 전부
- FROM: 어디로부터
- 테이블A: 테이블A

이 쿼리는 ‘테이블A로부터 전부 읽어와라’라는 문장입니다. 즉, 데이터베이스의 테이블A에서 모든 레코드를 읽고 반환합니다.

특정 컬럼을 지정해서 레코드를 읽어오고 싶다면 * 대신에 컬럼명을 쉼표(,)로 구분해서 나열합니다.

```sql
SELECT no, name date FROM 테이블A
```

그리고 모든 레코드가 아니라 번호(no) 2번인 레코드 한 줄을 가져오고 싶을 때는 WHERE 구문을 사용해서 다음과 같이 작성할 수 있습니다.

```sql
SELECT * FROM 테이블A WHERE no = 2
```

마지막으로 위의 2개의 식을 조합할 수도 있습니다.

3번 레코드에서 name과 title컬럼만 읽어오려면 다음과 같이 작성할 수 있습니다.

```sql
SELECT name, title FROM 테이블A WHERE no = 3
```

### 쿼리의 종류

쿼리는 테이블의 생성과 관련되는 DDL, 앞서 예로 든 SELECT 와 같이 데이터를 읽고 쓰는 것과 관련된 DML, 그리고 모바일용 데이터베이스에서는 잘 사용되지 않지만 권한을 처리하는 DCL, 이렇게 세 가지로 분류할 수 있습니다.

### DDL

DDL<sup> (Data Definition Language) </sup>은 데이터의 구조를 정의하는 명령어입니다. 테이블을 생성하고 컬럼의 속성을 정의하는 일이 포함됩니다.


<style>
.page-container {max-width: 1200px}‘’“”
</style>