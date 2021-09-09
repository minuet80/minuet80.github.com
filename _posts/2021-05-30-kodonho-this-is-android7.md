---
layout: post
title:  "[IT] - [BOOK] 7강 - 이것이 안드로이드다 with 코틀린 "
description: 데이터베이스
date:   2021-06-05 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet
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

#### DDL

DDL<sup> (Data Definition Language) </sup>은 데이터의 구조를 정의하는 명령어입니다. 테이블을 생성하고 컬럼의 속성을 정의하는 일이 포함됩니다.

| SQL | 설명 |
| :--- | :--- |
| CREATE TABLE | 테이블 생성 CREATE TABLE 테이블명 (컬럼 타입) |
| DROP TABLE | 테이블 삭제 DROP TABLE 테이블 명 | 
| ALTER TABLE | 테이블 수정 (컬럼 수정, 추가, 삭제) ALTER TABLE 테이블명 ADD COLUMN 컬럼 타입, ALTER TABLE 테이블명 MODIFY COLUMN 컬럼 타입, ALTER TABLE 테이블명 DROP COLUMN 컬럼 타입 |
{: .table .table-striped .table-hover}

데이터베이스는 하나의 빈 껍데기이고 DDL 쿼리를 실행하여 테이블을 하나씩 만들고 수정합니다.

#### DML

DML<sup> (Data Manipulation Language) </sup>은 데이터를 조작하는 명령어입니다. 

가장 많이 사용되는 명령어이고 기본적으로 C(Create), R(Read), U(Update), D(Delete)에 해당하는 네가지 명령어에 대한 이해가 필요합니다.

| SQL | 명령 | 설명 |
| :--- | :--- | :--- |
| SELECT | Read | 데이터 조회, SELECT 컬럼 FROM 테이블명 WHERE 조건 |
| INSERT | Create | 데이터 삽입, INSERT INTO 테이블명 VALUES (데이터) |
| UPDATE | Update | 데이터 수정, UPDATE 테이블명 SET 컬럼 = 데이터 WHERE 조건 |
| DELETE | Delete | 데이터 삭제, DELETE FROM 테이블명 WHERE 조건 |
{: .table .table-striped .table-hover}

데이터를 읽고 쓰기 위해서 SELECT, INSERT, UPDATE, DELETE 네 가지 명령어만 알고 있으면 거의 모든 처리를 할 수 있습니다.

#### DCL

DCL<sup> (Data Control Language) </sup>은 데이터를 조작하는 명령어로 혼동될 수 있는데 데이터베이스 권한과 관련된 명령어입니다.

특정 유저에게 읽기와 쓰기 권한을 부여할 때 주로 사용합니다.

주로 Oracle, MSSQL, MySQL 같은 DBMS (데이터베이스 관리 시스템)에서 사용합니다.


## 1.2 SQLite 데이터베이스


안드로이드의 기본 데이터베이스는 경량 데이터베이스인 SQLite입니다.

```sql
CREATE TABLE 테이블명 (
    [컬럼명1] [타입] [옵션], [컬럼명2] [타입], [컬럼명3] [타입] [옵션]
)
```

컬럼은 [컬럼명] [타입] [옵션] 의 순서대로 작성하고 공백으로 구분합니다.

컬럼이 2개 이상이면 쉼표로 컬럼을 구분합니다.

컬럼에 따라 옵션이 없는 경우가 있습니다.

다음은 데이터베이스 타입의 종류입니다.

이외에도 BLOB, NUMERIC 등이 있지만 다음 3개만 사용하면 됩니다.

- INTEGER: 정수형 컬럼
- TEXT: 문자형 컬럼
- REAL: 소숫점이 있는 숫자형

실습용으로 데이터베이스를 설계하고 쿼리를 작성해보겠습니다.

간단한 메모를 저장하고 사용하는 프로젝트를 생성할 텐데, 이 프로젝트에서 메모 데이터를 저장하고 사용할 테이블을 다음처럼 설계합니다.

| 컬럼명 | 타입 | 설명 |
| :--- | :--- | :--- |
| no | INTEGER | 메모의 순번, 자동 증가 옵션 적용 |
| content | TEXT | 메모의 내용을 문자로 입력, 옵션 없음 |
| datetime | INTEGER | 작성 시간을 숫자로 입력, 옵션 없음 |

메모장을 열어서 앞에서 한 설계를 바탕으로 쿼리를 한번 작성해보세요

```sql
CREATE TABLE memo {
    no INTEGER PRIMARY KEY,
    content TEXT,
    datetime INTEGER
}
```

첫 번째 no 컬럼은 PRIMARY KEY 옵션을 정의했습니다.

이 옵션은 ‘해당 컬럼에 중복 값이 없는 유일한 키로 사용하겠다’는 선언입니다.

SQLite에는 PRIMARY KEY의 타입이 INTEGER 일 때, 숫자를 자동으로 증가시키는 기능이 있습니다.

죽, no는 레코드가 하나씩 추가될 때마다 자동으로 1씩 증가합니다.

쿼리를 작성할 때 일정한 규칙(특히 컬럼이나 테이블명은 소문자 또는 대문자 한 가지로만 작성) 만 있다면 모두 소문자 또는 대문자로 작성해도 상관없습니다.

### SQLiteOpenHelper 사용하기

SQLite를 사용하기 위해서는 안드로이드의 컨텍스트가 가지고 있는 createDatabase() 메서드를 사용하거나, SQLiteOpenHelper클래스를 상속받아서 사용할 수 있습니다.

SQLiteOpenHelper클래스를 상속 받아서 사용하는 방법이 사용성이 더 좋고 쉬우므로 이 책에서는 SQLiteOpenHelper를 사용해서 데이터베이스를 다루겠습니다.
SQLiteOpenHelper클래스는 데이터베이스를 파일로 생성하고 코틀린 코드에서 사용할 수 있도록 데이터베이스와 연결하는 역활을 합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-237.png){: style="box-shadow: 0 0 5px #777"}

새로운 SQLite 프로젝트를 하나 생성하고 예제를 따라 하면서 데이터베이스 사용법을 읽혀보겠습니다.


1. [app] - [java] 데릭토리 밑에 있는 패키지에 SqliteHelper 클래스를 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-238.png){: style="box-shadow: 0 0 5px #777"}

1. SQLite 데이터베이스를 사용하려면 SQLiteOpenHelper 클래스를 상속받아야 합니다. SQLiteOpenHelper는 생성 시에 Context, 데이터베이스명, 팩토리, 버전 정보가 필요합니다. 팩토리는 사용하지 않아도 되므로 나머지 세 가지 정보를 내가 만든 클래스의 생성자에 파라미터로 정의한 후에 상속받은 SQLiteOpenHelper에 전달합니다. SqliteHelper.kt 파일의 class SqliteHelper를 다음과 같이 수정합니다. 
    ```kotlin
    package kr.co.hanbit.sqlite

    import android.content.Context
    import android.database.sqlite.SQLiteDatabase
    import android.database.sqlite.SQLiteOpenHelper

    class SqliteHelper(
        context: Context?,
        name: String?,
        version: Int
    ) : SQLiteOpenHelper(context, name, null, version) {

    }
    ```

1. 클래스 안쪽을 클릭한 상태에서 ``Ctrl`` + ``I`` 키를 입력하면 나타나는 목록에서 2개의 메서드를 모두 선택하고 [OK]를 클릭합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-239.png){: style="box-shadow: 0 0 5px #777"}

1. 2개의 메서드가 자동으로 생성됩니다. TODO가 입력된 행은 삭제합니다.  생성되는 메서드의 첫 번째 파라미터로 우리가 사용할 데이터베이스가 전달됩니다.
    ```kotlin
    override fun onCreate(db: SQLiteDatabase?) {
    }

    override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
    }
    ```

    ``onUpdate() 메서드``
    onUpdate() 메서드는 SqliteHelper에 전달되는 버전 정보가 변경되었을 때 현재 생성되어 있는 데이터베이스의 버전과 비교해서 더 높으면 호출됩니다. 버전 변경 사항이 없으면 호출되지 않습니다.

1. 아직 데이터베이스가 생성되지 않았기 때문에 onCreate() 메서드에서 테이블을 생성합니다. 이 메서드 안에 테이블 생성 쿼리를 작성하고 실행하면 됩니다. 데이터베이스가 생성되어 있으면 더 이상 실행되지 않습니다. onCreate() 메서드 안에 앞에서 만든 테이블 생성 쿼리를 문자열로 입력 한 후, db의 execSQL() 메서드에 전달해서 실행합니다. 문자열을 한 줄에 늘어놓을 수도 있지만 보기 어려워지니 다음처럼 문자열 끝에 ‘+’를 입력해서 다음 줄과 연결합니다.
    ```kotlin
    override fun onCreate(db: SQLiteDatabase?) {
        val create = "create table memo (" +
                "no integer primary key, " +
                "content text, " +
                "datetime interger" +
                ")"
        db?.execSQL(create)
    }
    ```

1. SqliteHelper 클래스 바깥에 Memo 클래스를 하나 생성하고 다음과 같이 정의합니다. no와 datetime의 타입을 데이터베이스에서는 INTEGER로 정의했는데, 여기서는 Long입니다. 숫자의 범위가 서로 다르기 때문입니다. 특별한 이유가 없다면 SQLite에서 INTEGER로 선언한 것은 소스 코드에서는 Long으로 사용합니다. 그리고 no만 null을 허용한 것은 PRIMARY KEY옵션으로 값이 자동으로 증가되기 때문에 데이터 삽입 시에는 필요하지 않아서 입니다. Memo 클래스의 INSERT, SELECT, UPDATE, DELETE에 모두 사용됩니다. 
    ```kotlin
    data class Memo(var no: Long?, var content: String, var datetime: Long)
    ```

    사용할 데이터 클래스까지 정의되었기 때문에 이제 삽입, 조회, 수정, 삭제에 해당하는 4개의 기본 메서드를 구현하겠습니다.

### 삽입 메서드

SqliteHelper 클래스에 데이터 삽입 메서드 (INSERT)를 구현합니다.

1. SQLiteOpenHelper를 이용해서 값을 입력할 때는 코틀린의 Map클래스처럼 키, 값 형태로 사용되는 ContentValues클래스를 사용합니다. 
    ```kotlin
    fun insertMemo(memo: Memo) {
        val values = ContentValues()
        values.put("content", memo.content)
        values.put("datetime", memo.datetime)
        // 02는 여기에 입력합니다.
    }
    ```

1. 상속받은 SQLiteOpenHelper에 이미 구현된 writableDatabase에 테이블명과 함께 앞에서 작성한 값을 전달해서 insert() 하고, 사용한 후에는 close()를 호출해서 꼭 닫아줘야 합니다.
    ```kotlin
    val wd = writableDatabase
    wd.insert("memo", null, values)
    wd.close()
    ```

### 조회 메서드

1. 조회 메서드는 반환값이 있으므로 메서드의 가장 윗줄에 반환할 값을 변수로 선언하고, 가장 아랫줄에서 반환하는 코드를 작성한 후 그 사이에 구현 코드를 작성하는 것이 좋습니다. 앞서 생성한 insertMemo클래스 아래에 다음 코드를 입력합니다.
    ```kotlin
    fun selectMemo(): MutableList<Memo> {
        val list = mutableListOf<Memo>()
        // 02부터 08까지는 여기에 입력합니다.
        return list
    }
    ```

1. 메모의 전체 데이터를 조회하는 쿼리를 작성합니다.
    ```kotlin
    val select = "select * from memo"
    ```

1. 읽기 전용 데이터베이스를 변수에 담습니다.
    ```kotlin
    val rd = readableDatabase
    ```

1. 데이터베이스의 rawQuery() 메서드에 앞에서 작성해둔 쿼리를 담아서 실행하면 커서(cursor)형태로 값이 반환됩니다.
    ```kotlin
    val cursor = rd.rawQuery(select, null)
    ```

1. 커서의 moveToNext() 메서드가 실행되면 다음 줄에 사용할 수 있는 레코드가 있는지 여부를 반환하고, 해당 커서를 다음 위치로 이동시킵니다. 레코드가 없으면 반복문을 빠져나갑니다. 모든 레코드를 읽을 때까지 반복합니다.
    ```kotlin
    while (cursor.moveToNext()) {
        // 06, 07은 여기에 입력합니다.
    }
    // 08은 반복문이 끝난 다음인 여기에 입력합니다.
    ```

1. 반복문을 돌면서 테이블에 정의된 3개의 컬럼에서 값을 꺼낸 후 각각 변수에 담습니다.
    ```kotlin
    val no = cursor.getLong(cursor.getColumIndex("no"))
    val content = cursor.getString(cursor.getColumnIndex("content"))
    val datetime = cursor.getLong(cursor.getColumnIndex("datetime"))
    ```

1. 앞에서 변수에 저장해두었던 값들로 Memo 클래스를 생성하고 반환할 목록에 더합니다.
    ```kotlin
    list.add(Memo(no, content, datetime))
    ```

1. while 문의 블록 밖에서 커서와 읽기 전용 데이터베이스를 모두 닫아줍니다.
    ```kotlin
    cursor.close()
    rd.close()
    ```

### 수정 메서드

SqliteHelper 클래스에 데이터 수정 메서드 (UPDATE)를 정의합니다.

1. INSERT와 동일하게 ContentValues를 사용해서 수정할 값을 저장합니다.
    ```kotlin
    fun updateDemo(memo: Memo) {
        val values = ContentValues()
        values.put("content", memo.content)
        values.put("datetime", memo.datetime)
        // 02는 여기에 입력합니다.
    }
    ```

1. writableDatabase의 update() 메서드를 사용하여 수정한 다음 close()를 호출합니다. update() 메서드의 파라미터는 총 4개인데 (테이블명, 수정할 값, 수정할 조건) 순서입니다. 수정할 조건은 PRIMARY KEY로 지정된 컬럼을 사용하며 여기서는 PRIMARY KEY인 컬럼이 no이기 때문에 "no = 숫자" 가 됩니다.  네 번째 값은 ‘null’을 입력합니다. 세 번째 값을 "no = ?"의 형태로 입력하고, 네 번째에 ?에 매핑할 값을 arrayOf("${memo.no}")의 형태로 전달할 수도 있습니다. 여기서는 세 번째에 조건과 값을 모두 할당했기 때문에 네 번째에 null을 사용하는 것입니다.
    ```kotlin
    val wd = writableDatabase
    wd.update("memo", values, "no = ${memo.no}", null)
    wd.close()
    ```


### 삭제 메서드

SqliteHelper 클래스를 사용하면 앞에서처럼 insert(), update() 메서드의 사용법만 알면 쿼리를 몰라도 데이터베이스를 사용할 수 있습니다.

하지만 복잡한 데이터베이스를 다룰 때에는 쿼리를 직접 작성하면 데이터를 더 정밀하게 다룰 수 있으므로 쿼리를 공부하는 것은 중요합니다. 

삭제 메서드 (DELETE) 는 쿼리를 직접 입력해서 데이터를 삭제하는 코드로 작성해보겠습니다.

삭제 쿼리를 미리 보면 다음과 같은 구조입니다.

```sql
DELETE FROM 테이블명 WHERE 조건식
```

1. SqliteHelper 클래스에 데이터 삭제 메서드를 정의합니다. 조건식은 "컬럼명 = 값" 형태가 됩니다.
    ```kotlin
    fun deleteMemo(memo: Memo) {
        val delete = "delete from memo where no = ${meno.no}"
        // 02는 여기에 입력합니다.
    }
    ```

1. writableDatabase의 execSQL() 메서드로 쿼리를 실행한 후 close()를 호출합니다. execSQL() 메서드로 쿼리를 직접 실행할 수 있습니다.
    ```kotlin
    val db = writableDatabase
    db.execSQL(delete)
    db.close()
    ```

    ``SqliteHelper.kt의 전체 코드는 다음과 같습니다.``

    ```kotlin
    package kr.co.hanbit.sqlite

    import android.content.ContentValues
    import android.content.Context
    import android.database.sqlite.SQLiteDatabase
    import android.database.sqlite.SQLiteOpenHelper

    class SqliteHelper(
        context: Context?,
        name: String?,
        version: Int
    ) : SQLiteOpenHelper(context, name, null, version) {
        override fun onCreate(db: SQLiteDatabase?) {
            val create = "create table memo (" +
                    "no integer primary key, " +
                    "content text, " +
                    "datetime interger" +
                    ")"
            db?.execSQL(create)
        }

        override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
        }

        fun insertMemo(memo: Memo) {
            val values = ContentValues()
            values.put("content", memo.content)
            values.put("datetime", memo.datetime)

            val wd =writableDatabase
            wd.insert("memo", null, values)
            wd.close()

        }

        fun selectMemo(): MutableList<Memo> {
            val list = mutableListOf<Memo>()

            val select = "select * from memo"
            val rd = readableDatabase
            val cursor = rd.rawQuery(select, null)
            while (cursor.moveToNext()) {
                val no = cursor.getLong(cursor.getColumnIndex("no"))
                val content = cursor.getString(cursor.getColumnIndex("content"))
                val datetime = cursor.getLong(cursor.getColumnIndex("datetime"))

                list.add(Memo(no, content, datetime))
            }

            cursor.close()
            rd.close()

            return list
        }

        fun updateMemo(memo: Memo) {
            val values = ContentValues()
            values.put("content", memo.content)
            values.put("datetime", memo.datetime)

            val wd = writableDatabase
            wd.update("memo", values, "no = ${memo.no}", null)
            wd.close()
        }
        
        fun deleteMemo(memo: Memo) {
            val delete = "delete from memo where no = ${memo.no}"
            
            val db = writableDatabase
            db.execSQL(delete)
            db.close()
        }
    }

    data class Memo(var no: Long?, var content: String, val datetime: Long)
    ```

# 2. 화면을 만들고 소스 코드 연결하기

SqliteHelper를 만들었으니 이제 화면을 만들고 MainActivity.kt에 연결해보겠습니다.

## 2.1 화면 만들기

화면을 구성하려면 두 XML파일을 수정해야 합니다.

### activity_main.xml 편집하기

1. 파일의 [Design]모드에서 기존이 텍스트뷰는 지우고 팔레트 컨테이너 카테고리에서 리사이클러뷰를 선택해 화면 상단에 배치합니다. 그리고 id속성에 ‘recyclerMemo’을 입력합니다. 

1. 팔레트의 텍스트 카테고리에서 플레인텍스트를 드래그해서 화면 하단에 배치합니다. 여기에 메모를 입력할 겁니다. id속성은 ‘editMemo’, text속성은 지우고 hint속성을 “메모를 입력하세요”라고 수정합니다. 여러 줄을 입력할 수 있어야 하므로 inputType속성의 아래 화살표를 눌러 textMultiLine을 ‘true’로 변경합니다. textPErsionName도 그대로 체크 상태입니다.

1. 팔레트의 버튼 카테고리에서 버튼을 하나 드래그해서 우측 하단에 가져다둡니다. id속성에는 ‘btnSave’, text속성에는 ‘저장’이라고 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-240.png){: style="box-shadow: 0 0 5px #777"}


### item_recycler.xml 추가하기

리사이클러뷰의 아이템 용도로 사용할 item_recycler.xml 레이아웃 파일을 생성해서 편집하겠습니다.

1. [app] - [res] - [layout] 디렉토리에서 새 리소스 파일을 생성해서 다음과 같이 입력합니다. File name과 Root element를 주의해서 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-241.png){: style="box-shadow: 0 0 5px #777"}

1. 레이아웃 파일이 생성되면 [Degign] 모드에서 컴포넌트 트리의 최상위 컨스트레인트 레이아웃을 클릭합니다. 그리고 우측의 layout_height 속성을 ‘100dp’로 수정해서 아이템의 높이를 미리 정해 놓습니다.

1. 번호와 메모의 내용을 표시할 텍스트뷰를 배치합니다. 그리고 내용을 표시하는 텍스트뷰 아래에 날자를 표시할 텍스트뷰를 하나 배치합니다. 각 속성의 수정 내용은다음 그림을 참고합니다. 이중 ellipsize속성은 maxLines에서 ‘2’로 텍스트뷰의 줄을 제한했는데 두 줄이 넘어가면 말줄임표(...)가 나오도록 하는 속성입니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-242.png){: style="box-shadow: 0 0 5px #777"}

    - 01: textNo
    - 메모 내용 표시
        - id: textContent
        - maxLines: 2
        - ellipsize: end
        - gravity: center_vertical
    - 2021/01/01 13:57
        - id: textDatetime

## 2.2 소스 코드 연결하기

이제 레이아웃과 소스 코드를 연결합니다.

아래 코드에서 binding을 사용하므로 build.gradle 파일에 viewBinding 설정을 추가해주세요.

### RecyclerAdapter 클래스 만들기

먼저 Memo 클래스를 데이터로 사용하는 RecyclerAdapter 클래스를 정의합니다.

[app] - [java] 밑에 있는 패키지에 RecyclerAdapter라는 이름의 클래스를 생성합니다.

다음 코드가 RecyclerAdapter.kt 파일이며 설명은 생략합니다.

5장의 ‘2. 컨테이너: 목록 만들기’에서 사용했던 어댑터와 비교했을 때 위젯의 id와 Memo클래스의 변수명만 달라질 뿐 코드는 그대로 입니다.

```kotlin
package kr.co.hanbit.sqlite

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kr.co.hanbit.sqlite.databinding.ItemRecyclerBinding
import java.text.SimpleDateFormat

class RecyclerAdapter: RecyclerView.Adapter<Holder>() {

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
        binding.textContent.text = memo.content
        val sdf = SimpleDateFormat("yyyy/MM/dd hh:mm")
        // 날짜 포맷은 SimpleDateFormat으로 설정합니다.
        binding.textDatetime.text = "${sdf.format(memo.datetime)}"
    }
}
```

### MainActivty에서 코드 조합하기

1. MainActivity.kt를 열고 클래스 코드 블록 맨 윗줄에서 바인딩을 생성하고 binding 변수에 저장합니다. 그리고 바로 아랫줄에서 SqliteHelper를 생성하고 변수에 저장합니다.
    ```kotlin
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    val helper = SqliteHelper(this, "memo", 1)
    ```

1. onCreate()의 contentView에 binding.root를 전달하고, 다음 줄에서 RecyclerAdapter를 생성합니다.
    ```kotlin
    val adapter = RecyclerAdapter()
    ```

1. 이어서 adapter의 listData에 데이터베이스에서 가져온 데이터를 세팅합니다.
    ```kotlin
    adapter.listData.addAll(helper.selectMemo())
    ```

1. 화면의 리사이클러뷰 위젯에 adapter를 연결하고 레이아웃 매니저를 설정합니다.
    ```kotlin
    binding.recyclerMemo.adapter = adapter
    binding.recyclerMemo.layoutManager = LinearLayoutManager(this)
    ```

1. 저장 버튼에 클릭 리스너를 달아줍니다.
    ```kotlin
    binding.btnSave.setOnClickListener {
        // 06은 여기에 입력합니다.
    }
    ```

1. 메모를 입력하는 플레인 텍스트를 검사해서 값이 있으면 해당 내용으로 Memo 클래스를 생성합니다.
    ```kotlin
    if (binding.editMemo.text.toString().isNotEmpty()) {
        val memo = Memo(null, binding.editMemo.text.toString(), System.currentTimeMillis())
        // 07은 여기에 입력합니다.
    }
    ```

1. helper 클래스의 insertMemo() 메서드에 앞에서 생성한 Memo를 전달해 데이터베이스에 저장합니다.
    ```kotlin
    helper.insertMemo(memo)
    ```

1. 아랫줄에 다음 코드를 입력하여 어댑터의 데이터를 모두 초기화합니다.
    ```kotlin
    adapter.listData.clear()
    ```

1. 그리고 데이터베이스에서 새로운 목록을 읽어와 어댑터에 세팅하고 갱신합니다. 새로 생성되는 메모에는 번호가 자동 입력되므로 번호를 갱신하기 위해서 새로운 데이터를 세팅하는 것입니다.
    ```kotlin
    adapter.listData.addAll(helper.selectMemo())
    adapter.notifyDataSetChanged()
    ```

1. 끝으로 메모 내용을 입력하는 위젯의 내용을 지워서 초기화합니다.
    ```kotlin
    binding.editMemo.setText("")
    ```

1. 에뮬레이터에서 실행하고 테스트합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-243.png){: style="box-shadow: 0 0 5px #777"}

    ``activity_main.xml의 전체 코드``

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity" >

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recyclerMemo"
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintBottom_toTopOf="@+id/editMemo"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <EditText
            android:id="@+id/editMemo"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:ems="10"
            android:hint="메모를 입력하세요"
            android:inputType="textMultiLine|textPersonName"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/btnSave"
            app:layout_constraintStart_toStartOf="parent" />

        <Button
            android:id="@+id/btnSave"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="저장"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>
    ```

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.sqlite

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import androidx.recyclerview.widget.LinearLayoutManager
    import kr.co.hanbit.sqlite.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        val helper = SqliteHelper(this, "memo", 1)


        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            val adapter = RecyclerAdapter()
            adapter.listData.addAll(helper.selectMemo())

            binding.recyclerMemo.adapter = adapter
            binding.recyclerMemo.layoutManager = LinearLayoutManager(this)

            binding.btnSave.setOnClickListener {
                if (binding.editMemo.text.toString().isNotEmpty()) {
                    val memo = Memo(null, binding.editMemo.text.toString(), System.currentTimeMillis())
                    helper.insertMemo(memo)
                    adapter.listData.clear()
                    adapter.listData.addAll(helper.selectMemo())
                    adapter.notifyDataSetChanged()
                    binding.editMemo.setText("")
                }
            }
        }
    }
    ```

### 삭제 버튼 추가하기

메모 목록에 삭제 버튼을 추가하여 메모를 삭제할 수 있도록 만들겠습니다.

1. item_recycler.xml 파일을 열고 목록 아이템의 우측에 삭제 버튼을 배치합니다. id는 btnDelete로 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-244.png){: style="box-shadow: 0 0 5px #777"}

1. 메모를 삭제하려면 SQLite의 데이터와 어댑터에 있는 Memo컬렉션의 데이터를 삭제해야 합니다.  SQLite의 데이터를 삭제하기 위해서 MainActivity.kt를 열고 클래스의 두 번째 줄에 생성해 둔 helper를 어댑터에 전달합니다. 어댑터 생성 코드 바로 아랫줄에 작성하는데 어댑터에는 아직 helper 프로퍼티가 없기 때문에 빨간색으로 나옵니다.
    ```kotlin
    val adapter = RecyclerAdapter()
    adapter.helper = helper // 추가한 코드
    ```

1. RecyclerAdapter.kt를 열고 클래스 블록 가장 윗줄에 helper 프로퍼티를 만듭니다. 아랫줄에는 listData 프로퍼티가 있습니다.
    ```kotlin
    var helper: SqliteHelper? = null
    ```

1. 계속해서 RecyclerAdapter.kt의 Holder 클래스에 init 블록을 만듭니다. 그리고 추가한 btnDelete에 클릭리스너를 달아줍니다.
    ```kotlin
    init {
        binding.btnDelete.setOnClickListener {
            
        }
    }
    ```

1.  삭제 버튼을 클릭하면 어댑터의 helper와 listData에 접근해야 되는데, 지금은 어댑터 밖에 Holder 클래스가 있기 때문에 접근할 수 없습니다. Holder 클래스 전체를 어댑터 클래스 안으로 옮기고 class 앞에 inner 키워드를 붙여줍니다.
    ```kotlin
    class RecyclerAdapter: RecyclerView.Adapter<RecyclerAdapter.Holder>() {

        //.. 중략

        inner class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {

            init {
                binding.btnDelete.setOnClickListener {
                    
                }
            }

            fun setMemo(memo: Memo) {
                binding.textNo.text = "${memo.no}"
                binding.textContent.text = memo.content
                val sdf = SimpleDateFormat("yyyy/MM/dd hh:mm")
                // 날짜 포맷은 SimpleDateFormat으로 설정합니다.
                binding.textDatetime.text = "${sdf.format(memo.datetime)}"
            }
        }
    }
    ```

1. 홀더는 한 화면에 그려지는 개수만큼 만든 후 재사용하므로 1번 메모가 있는 홀더를 스크롤해서 위로 올리면 아래에서 올라오는 새로운 메모가 1번 홀더를 재사용하는 구조입니다. 따라서 클릭하는 시점에 어떤 데이터가 있는지 알아야 하므로 Holder 클래스의 init 위에 변수를 하나 선언하고 setMemo() 메서드로 넘어온 Memo를 임시로 저장합니다.
    ```kotlin
    var mMemo: Memo?= null
    // 중략..
    fun setMemo(memo: Memo) {
        // 중략..
        this.mMemo = memo
    }
    ```

1. init 블록 안에 있는 btnDelete의 클릭 리스너 블록 안에서 SQLite의 데이터를 먼제 삭제하고, listData의 데이터도 삭제합니다. 그리고 어댑터를 갱신합니다.
    ```kotlin
    // deleteMemo()는 null을 허용하지 않았는데, 
    // mMemo는 null을 허용하도록 설정되었기 때문에 !!를 사용해서 강제해야 합니다.
    helper?.deleteMemo(mMemo!!)
    listData.remove(mMemo)
    notifyDataSetChanged()
    ```

1. 에뮬레이터에서 실행하고 테스트합니다. 메모 데이터 하나를 삭제한 후 앱을 껏다 켰을 때도 삭제되어 있으면 정상적으로 동작하는 것입니다.

### 메모 내용 전체 보기

앞서 메모 앱의 목록은 두 줄까지만 보여주도록 설계했습니다. 전체 내용을 모두 보여주도록 레이아웃을 조금 수정하겠습니다.

1. item_recycler.xml 파일을 열고 최상위 레이아웃인 컨스트레인트 레이아웃의 layout_height속성을 ‘wrap_content’로 변경합니다.

1. 메모 내용이 표시되는 텍스트뷰의 maxlines 속성값을 삭제하고 layout_height 속성을 ‘wrap_content’로 변경합니다.

1. 에뮬레이터에서 실행하고 여러 줄의 데이터를 작성해보세요.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-245.png){: style="box-shadow: 0 0 5px #777"}

### 프로젝트 전체 코드

다음은 MainActivity.kt의 전체 코드입니다.

```kotlin
package kr.co.hanbit.sqlite

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kr.co.hanbit.sqlite.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    val helper = SqliteHelper(this, "memo", 1)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val adapter = RecyclerAdapter()
        adapter.helper = helper // 추가한 코드

        adapter.listData.addAll(helper.selectMemo())

        binding.recyclerMemo.adapter = adapter
        binding.recyclerMemo.layoutManager = LinearLayoutManager(this)

        binding.btnSave.setOnClickListener {
            if (binding.editMemo.text.toString().isNotEmpty()) {
                val memo = Memo(null, binding.editMemo.text.toString(), System.currentTimeMillis())
                helper.insertMemo(memo)
                adapter.listData.clear()
                adapter.listData.addAll(helper.selectMemo())
                adapter.notifyDataSetChanged()
                binding.editMemo.setText("")
            }
        }
    }
}
```

다음은 RecyclerAdapter.kt의 전체 코드 입니다.

```kotlin
package kr.co.hanbit.sqlite

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kr.co.hanbit.sqlite.databinding.ItemRecyclerBinding
import java.text.SimpleDateFormat

class RecyclerAdapter: RecyclerView.Adapter<RecyclerAdapter.Holder>() {

    var listData = mutableListOf<Memo>()
    var helper: SqliteHelper? = null


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

    inner class Holder(val binding: ItemRecyclerBinding): RecyclerView.ViewHolder(binding.root) {

        var mMemo: Memo?= null

        init {
            binding.btnDelete.setOnClickListener {
                helper?.deleteMemo(mMemo!!)
                listData.remove(mMemo)
                notifyDataSetChanged()
            }
        }

        fun setMemo(memo: Memo) {
            binding.textNo.text = "${memo.no}"
            binding.textContent.text = memo.content
            val sdf = SimpleDateFormat("yyyy/MM/dd hh:mm")
            // 날짜 포맷은 SimpleDateFormat으로 설정합니다.
            binding.textDatetime.text = "${sdf.format(memo.datetime)}"

            this.mMemo = memo
        }
    }
}
```

다음은 item_recycler.xml의 전체 코드입니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="100dp">

    <TextView
        android:id="@+id/textNo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginBottom="32dp"
        android:text="01"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textContent"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginEnd="50dp"
        android:layout_marginRight="50dp"
        android:layout_marginBottom="32dp"
        android:ellipsize="end"
        android:gravity="center_vertical"
        android:text="메모 내용 표시"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textNo"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textDatetime"
        android:layout_width="150dp"
        android:layout_height="wrap_content"
        android:gravity="right"
        android:text="2021/01/01 13:57"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textContent" />

    <Button
        android:id="@+id/btnDelete"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginEnd="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginBottom="32dp"
        android:text="삭제"
        app:elevation="2dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textContent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.0" />
</androidx.constraintlayout.widget.ConstraintLayout>
```


# 3. Room: ORM 라이브러리

ORM<sup> (Object-Relational Mapping) </sup>은 객체와 관계형 데이터베이스의 데이터를 매핑하고 변환하는 기술로 복잡한 쿼리를 잘 몰라도 코드만으로 데이터베이스의 모든 것을 컨트롤 할 수 있도록 도와줍니다.

안드로이드는 SQLite를 코드 관점에서 접근할 수 있도록 ORM 라이브러리인 Room을 제공합니다.

![1]({{site.baseurl}}/images/this-is-android/this-is-android-246.png){: style="box-shadow: 0 0 5px #777"}

## 3.1 Room 추가하기

Room 프로젝트를 하나 새로 생성합니다.

앞에서 작성했던 SQLite프로젝트에서 몇 개의 화면과 액티비티는 복사해서 재사용하겠습니다.

1. build.gradle 파일을 열고 가장 윗줄 plugins 블록에 다음과 같이 입력해 kotlin-kapt를 사용한다는 것을 명시하고, andriod블록에 viewBinding 설정도 같이 추가합니다.
    ```gradle
    plugins {
        id 'com.android.application'
        id 'kotlin-andriod'
        id 'kotlin-kapt'
    }

    android {
        buildFeatures {
            viewBinding true
        }
    }
    ```

1. 그리고 dependencies 블록 앞부분에 다음과 같이 입력해서 Room을 추가합니다. Room은 빠른 처리 속도를 위해서 어노테이션 프로세서 <sup> (annotation processor) </sup>를 사용하는데, 콜틀린에서는 이것을 대신해서 kapt를 사용합니다. kapt 를 사용하기 위해서는 먼저 build.gradle 파일의 상단에 kotalin-kapt 플러그인을 추가해야 합니다. dependencies 블록에 추가한 코드 중 세번째줄에 kapt라고 작성되어 있는 부분을 주의해서 작성해야 합니다.
    ```gradle
    dependencies {

        def room_version = "2.2.6"
        implementation "androidx.room:room-runtime:$room_version"
        kapt "androidx.room:room-compiler:$room_version"
        implementation "androidx.room:room-ktx:$room_version"
        //.. 생략
    }
    ```

1. build.gradle 파일의 우측 상단을 보면 [Sync Now] 가 생겼을 겁니다. 클릭해서 설정사항을 적용합니다.

## 3.2 RoomMemo 클래스 정의하기

1. 먼저 앞 절 SQLite 프로젝트에서 사용한 파일 중에서 java 패키지 아래에 있는 MainActivity, RecyclerAdapter를 복사해서 이 프로젝트에 붙여넣기 합니다. 동일한 파일인 MainActivity가 이미 있기 때문에 붙여넣기 여부를 묻는 팝업창에서 [Overwrite]를 클릭합니다. 붙여넣기 한 ActivityMain을 열어보면 패키지명과 네 번째 import인 ActivityMainBinding의 경로가 다릅니다. 둘 다 sqlite를 현재 패키지명인 room으로 수정합니다.

    ``MainActivity 변경 전``

    ```kotlin
    package kr.co.hanbit.sqlite
    
    ...
    import kr.co.hanbit.sqlite.databinding.ActivityMainBinding
    ```

    ``MainActivity 변경 후``

    ```kotlin
    package kr.co.hanbit.room
    
    ...
    import kr.co.hanbit.room.databinding.ActivityMainBinding
    ```

    RecyclerAdapter도 열어서 같은 위치의 패키지명을 수정합니다.

    ``RecyclerAdapter 변경 후``

    ```kotlin
    package krco.hanbit.room

    ...
    import kr.co.hanbit.room.databinding.ItemRecyclerBinding
    ```

1. [res] - [layout] 밑에 있는 activity_main.xml 과 item_recycler.xml도 마저 복사해서 붙여넣기 합니다. 

1. 이제 패키지 이름에서 [New] - [Kotlin File/Class]를 선택해서 RoomMemo로 클래스를 생성합니다. 그리고 @Entity 어노테이션을 class RoomMemo위에 작성합니다. Room 라이브러리는 @Entity 어노테이션이 적용된 클래스를 찾아 테이블로 변환합니다.  데이터베이스에서 테이블명을 클래스명과 다르게 하고 싶을 때는 @Entity(tableName = "테이블명")과 같이 작성하면 됩니다. 여기서는 테이블명을 room_memo로 만듭니다.
    ```kotlin
    @Entity(tableName = "room_memo)
    class RoomMemo {
        // 04는 여기에 작성합니다.
    }
    ```

1. 맴버 변수 no, content, date 3개를 선언하고 변수명 위에 @ColumnInfo 어노테이션을 작성해서 테이블의 컬럼으로 사용된다는 것을 명시합니다. 컬럼명도 테이블명처럼 변수명과 다르게 하고 싶을 때는 @ColumnInfo(name = "컬럼명")과 같이 작성하면 됩니다.
    ```kotlin
    @ColumnInfo
    var no: Long? = null

    @ColumnInfo
    var content: String = ""

    @ColumnInfo(name = "date")
    var datetime: Long = 0
    ```

1. no 변수에는 @PrimaryKey 어노테이션을 사용해서 키 (Key)라는 점을 명시하고 자동 증가 옵션을 추가합니다.
    ```kotlin
    @PrimaryKey(autoGenerate = true) // 추가한 코드
    @ColumnInfo
    var no: Long? = null
    ```

1. content와 datetime을 받는 생성자를 작성합니다.
    ```kotlin
    constructor(content: String, datetime: Long) {
        this.content = content
        this.datetime = datetime
    }
    ```

1. 코드를 따라서 작성해보고, 빨간색으로 나타나는 코드는 ``Alt`` + ``Enter`` 키로 모두 import 합니다.

    ``RoomMemo.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.room

    import androidx.room.ColumnInfo
    import androidx.room.Entity
    import androidx.room.PrimaryKey


    @Entity(tableName = "room_memo")
    class RoomMemo {

        @PrimaryKey(autoGenerate = true)
        @ColumnInfo
        var no: Long? = null

        @ColumnInfo
        var content: String = ""

        @ColumnInfo(name = "date")
        var datetime: Long = 0

        constructor(content: String, datetime: Long) {
            this.content = content
            this.datetime = datetime
        }
    }
    ```

    ``변수를 테이블의 컬럼으로 사용하고 싶지 않을 때``

    @Ignore 어노테이션을 적용하면 해당 변수가 테이블과 관계없는 변수라는 정보를 알릴 수 있습니다.
    ```kotlin
    @Ignore
    var temp: String = "임시로 사용되는 데이터입니다."
    ```

## 3.3 RoomMemoDAO 인터페이스 정의하기

Room은 데이터베이스에 읽고 쓰는 메서드를 인터페이스 형태로 설계하고 사용합니다.

코드 없이 이름만 명시하는 형태로 인터페이스를 만들면 Room이 나머지 코드를 자동생성합니다.

``DAO란?``: *Data Access Object의 약어로 데이터베이스에 접근해서 DML 쿼리를 실행하는 메서드의 모음입니다.*

1. [app] - [java] 밑의 패키지 아래에 다음처럼 RoomMemoDao 인터페이스를 생성합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-247.png){: style="box-shadow: 0 0 5px #777"}

1. RoomMemoDao.kt 파일 class 위에 @Dao 어노테이션을 작성해서 Dao라는 것을 명시하고 ``Alt`` + ``Enter``키를 눌러 import합니다.
    ```kotlin
    @Dao
    interface RoomMemoDao {
        
    }
    ```

1. 삽입, 조회, 수정, 삭제에 해당하는 3개의 메서드를 만들고 각각의 어노테이션을 붙여줍니다.
    ```kotlin
    package kr.co.hanbit.room

    import androidx.room.Dao
    import androidx.room.Insert
    import androidx.room.OnConflictStrategy.REPLACE
    import androidx.room.Query
    import androidx.room.Delete

    @Dao
    interface RoomMemoDao {

        @Query("select * from room_memo")
        fun getAll(): List<RoomMemo>

        @Insert(onConflict = REPLACE)
        fun insert(memo: RoomMemo)

        @Delete
        fun delete(memo: RoomMemo)
    }
    ```

    두 번째 @Insert 어노테이션의 경우 옵션으로 onConflict = REPLACE를 적용하면 동일한 키를 가진 값이 입력되었을 때 UPDATE 쿼리로 실행됩니다.

    어노테이션의 종류를 표로 살펴보겠습니다.

    | 어노테이션 | 위치 | 옵션 | 설명 |
    | :--- | :--- | :--- | :--- |
    | @Database | 클래스 | entities, version | 데이터베이스 |
    | @Entity | 클래스 | (tableNAme = "테이블명") | 테이블 |
    | @ColumnInfo | 맴버변수 | (name = "컬럼명") | 컬럼 |
    | @PrimaryKey | 맴버변수 | (autoGenerate = true) | 컬럼옵션 |
    | @Dao | 인터페이스 |  | 실행 메서드 인터페이스 |
    | @Query | 맴버 메서드 | ("쿼리") | 쿼리를 직접 작성하고 실행 |
    | @Insert | 맴버 메서드 | (onConflict = REPLACE) | 중복시 수정 |
    | @Delete | 맴버 메서드 |  | 삭제 |
    {: .table .table-striped .table-hover}

    ``RoomMemoDao.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.room

    import androidx.room.Dao
    import androidx.room.Insert
    import androidx.room.OnConflictStrategy.REPLACE
    import androidx.room.Query
    import androidx.room.Delete

    @Dao
    interface RoomMemoDao {

        @Query("select * from room_memo")
        fun getAll(): List<RoomMemo>

        @Insert(onConflict = REPLACE)
        fun insert(memo: RoomMemo)

        @Delete
        fun delete(memo: RoomMemo)
    }
    ```

## 3.4 RoomHelper 클래스 정의하기

마치 SQLiteOpenHelper를 상속받아서 구현했던 것처럼 Room도 유사한 구조로 사용할 수 있습니다.

Room은 RoomDatabase를 제공하는데 RoomDatabase를 상속받아 클래스를 생성하면 됩니다.

주의할 점은 추상 클래스로 생성해야 한다는 점입니다.

기존 클래스와 동일하게 생성하고 class 앞에 abstract 키워드를 붙이면 추상 클래스가 됩니다.

1. [app] - [java] 밑의 패키지 아래에 RoomHelper 클래스를 생성하고 앞에 abstract 키워드를 붙여서 추상 클래스로 만듭니다. 이 클래스는 RoomDatabase를 상속받습니다.
    ```kotlin
    package kr.co.hanbit.room

    import androidx.room.RoomDatabase

    abstract class RoomHelper: RoomDatabase() {
    }
    ```

1. 클래스명 위에 @Database 어노테이션을 작성합니다.
    ```kotlin
    @Database(entities = arrayOf(RoomMemo::class), version = 1, exportSchema = false)
    ```

    ``@Database 어노테이션 속성``

    | 옵션 | 설명 |
    | :--- | :--- |
    | entities | Room 라이브러리가 사용할 엔티티(테이블) 클래스 목록 |
    | version | 데이터베이스의 버전 |
    | exportSchema | true면 스키마 정보를 파일로 출력 |
    {: .table .table-striped .table-hover}

1. RoomHelper 클래스 안에 앞에서 정의한 RoomMemoDao 인터페이스의 구현체를 사용할 수 있는 메서드명을 정의합니다.
    ```kotlin
    abstract fun roomMemoDao(): RoomMemoDao
    ```

    ``RoomHelper.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.room

    import androidx.room.Database
    import androidx.room.RoomDatabase

    @Database(entities = arrayOf(RoomMemo::class), version = 1, exportSchema = false)
    abstract class RoomHelper: RoomDatabase() {
        abstract fun roomMemoDao(): RoomMemoDao
    }
    ```

    이렇게 빈 껍데기 코드만 작성해두는 검나으로 Room라이브러리를 통해서 미리 만들어져 있는 코드를 사용할 수 있게 됩니다.

## 3.5 어댑터에서 사용하는 Memo 클래스를 RoomMemo 클래스로 변경하기

RecyclerAdapter.kt를 열고 코드를 수정합니다.

1. ``Ctrl`` + ``R`` 키를 누른 후 Memo 문자열을 모두 RoomMemo로 수정합니다. 대소문자를 구분해야 하기 위해서 ``Aa``라고 써 있는 아이콘을 클릭해서 활성화 한 후 [Replace all]을 눌러서 문자열을 모두 수정합니다. 

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-248.png){: style="box-shadow: 0 0 5px #777"}

1. helper변수가 선언된 부분을 RoomHelper를 사용할 수 있도록 수정합니다.
    ``수정 전``
    ```kotlin
    var helper: SqliteHelper? = null
    ```

    ``수정 후``
    ```kotlin
    var helper: RoomHelper? = null
    ```

1. buttonDelete 클릭리스너에 있는 deleteMemo() 메서드를 RoomHelper의 메서드로 수정합니다. RoomHelper를 사용할 때는 여러 개의 Dao가 있을 수 있기 때문에 ‘헬퍼.Dao.메서드()’형태로 어떤 Dao를 쓸 것인지를 명시해야 합니다.
    ``수정 전``
    ```kotlin
    helper?.deleteMemo(mRoomMemo!!)
    ```

    ``수정 후``
    ```kotlin
    helper?.roomMemoDao()?.delete(mRoomMemo!!)
    ```

## 3.6 MainActivity에서 RoomHelper 사용하기

MainActivity.kt 파일을 열고 앞에서 작성한 SqliteHelper를 RoomHelper로 교체하겠습니다.

1. MainActivity 맨 윗줄에 정의된 helper 변수를 RoomHelper를 사용할 수 있도록 코드를 수정합니다.
    ``수정 전``
    ```kotlin
    var helper = SqliteHelper(this, "memo", 1)
    ```

    ``수정 후``
    ```kotlin
    var helper: RoomHelper? = null
    ```

1. onCreate() 의 setContentView 바로 아랫줄에 helper를 생성하는 부분을 추가합니다. databaseBuilder() 메서드의 세 번째 파라미터가 실제 생성되는 DB파일의 이름입니다. Room은 기본적으로 서브 스레드에서 동작하도록 설계되어 있기 때문에 allowMainThreadQueries() 옵션이 적용되지 않으면 앱이 동작을 멈춥니다.
    *``실제 프로젝트에서는 allowMainThreadQueries옵션을 사용하지 않기를 권합니다.``*{: style="background-color: #FFCCCC"}
    ```kotlin
    helper = Room.databaseBuilder(this, RoomHelper::class.java, "room_memo")
            .allowMainThreadQueries()
            .build()
    ```

1. 어댑터의 데이터 목록에 세팅하는 코드 (코드 중간 빨간색 selectMemo가 보이는 행입니다.)를 RoomHelper를 사용하는 것으로 수정합니다. helper에 null이 허용되므로 helper안의 코드를 사용하기 위해서는 hepler?.의 형태로 사용해야 합니다. 이어지는 roomMemoDao()?.도 같은 맥ㄱ락이고 adapter의 listData에 null이 허용되지 않기 때문에 마지막에 ?:(Elvis Operator)를 사용해서 앞의 2개가 null일 경우 사용하기 위한 디폴트값을 설정합니다.
    ```kotlin
    adapter.listData.addAll(helper?.roomMemoDao()?.getAll()?: listOf())
    ```

1. 저장 버튼을 클릭 시 사용하는 코드도 RoomHelper로 책과 대조하면서 바꿔줍니다.
    ```kotlin
    binding.btnSave.setOnClickListener {
        if (binding.editMemo.text.toString().isNotEmpty()) {
            val memo = RoomMemo(binding.editMemo.text.toString(), System.currentTimeMillis())
            helper?.roomMemoDao()?.insert(memo)
            adapter.listData.clear()
            adapter.listData.addAll(helper?.roomMemoDao()?.getAll()?: listOf())
            adapter.notifyDataSetChanged()
            binding.editMemo.setText("")
        }
    }
    ```

1. 에뮬레이터에서 실행하고 테스트합니다.
    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.room

    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import androidx.recyclerview.widget.LinearLayoutManager
    import androidx.room.Room
    import kr.co.hanbit.room.databinding.ActivityMainBinding

    class MainActivity : AppCompatActivity() {

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        var helper: RoomHelper? = null


        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            helper = Room.databaseBuilder(this, RoomHelper::class.java, "room_memo").allowMainThreadQueries().build()

            val adapter = RecyclerAdapter()
            adapter.listData.addAll(helper?.roomMemoDao()?.getAll()?: listOf())

            binding.recyclerMemo.adapter = adapter
            binding.recyclerMemo.layoutManager = LinearLayoutManager(this)

            binding.btnSave.setOnClickListener {
                if (binding.editMemo.text.toString().isNotEmpty()) {
                    val memo = RoomMemo(binding.editMemo.text.toString(), System.currentTimeMillis())
                    helper?.roomMemoDao()?.insert(memo)
                    adapter.listData.clear()
                    adapter.listData.addAll(helper?.roomMemoDao()?.getAll()?: listOf())
                    adapter.notifyDataSetChanged()
                    binding.editMemo.setText("")
                }
            }
        }
    }
    ```

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-249.png){: style="box-shadow: 0 0 5px #777"}

<style>
.page-container {max-width: 1200px}
</style>