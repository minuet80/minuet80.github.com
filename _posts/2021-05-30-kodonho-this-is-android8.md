---
layout: post
title:  "[IT] - [BOOK] 8강 - 이것이 안드로이드다 with 코틀린 "
description: 카메라와 갤러리
date:   2021-06-06 11:22:30 +0900
categories: jekyll update
img: this-is-android/this-is-android-1.png
categories: [one, two]
color: 00897B
author: Minuet80
permalink: /this-is-android8/
width: large
---

* some text
{: toc}


# 1. 카메라 사용하기

6장에서 언급했듯이 안드로이드 6.0 (API level23, targetSdkVersion23)버전 이후부터 카메라 관련 작업도 위험 권한으로 분류되어 부가적인 코드 처리가 필요합니다.

예제를 따라 하면서 카메라 권한 처리를 이해하고, 촬영한 이미지를 다루는 방법을 알아보겠습니다.

## 1.1 UI 화면 만들고 권한 요청하기

새 프로젝트 CameraAndGallery 를 생성하고 build.gradle 파일에 viewBinding 설정을 합니다.

1. activity_main.xml 파일을 열고 화면 가운데 있는 텍스트뷰를 삭제합니다.

1. 카메라 앱을 호출하는 버튼을 드래그해서 화면 하단에 배치합니다. 그리고 text속성에는 ‘카메라’, id속성에는 ‘buttonCamera’를 입력하고, 컨스트레인트는 다음 그림과 같이 연결합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-250.png){: style="box-shadow: 0 0 5px #777"}


1. 카메라 앱으로 촬영한 사진을 미리보기 할 이미지뷰(ImageView)를 버튼 상단에 배치합니다. 이미지뷰를 드래그했을 때 나타나는 팝업창에서 [avatars]를 선택한 다음 [OK]버튼을 클릭합니다.

1. 이미지뷰의 layout_width와 layout_height 의 속성에 ‘0dp’를 입력한 다음 컨스트레인트를 우측 그림과 같이 연결합니다. 그리고 id속성에는 ‘imagePreview’를 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-251.png){: style="box-shadow: 0 0 5px #777"}

1. [app] - [manifests]의 AndroidManifest.xml 파일을 열고 다음의 코드를 입력하여 카메라 권한과 카메라로 촬영한 사진에 대한 접근 권한을 선언합니다.  위치는 \<application\>태그 시작 전에 입력합니다. (WRITE 권한이 있으면 같은 그룹의 READ권한은 없어도 되지만, 이렇게 모두 작성하고 사용해도 괜찮습니다.) 카메라를 사용하기 위해서는 \<uses-feature /\>도 같이 설정해야 합니다.
    ```xml
    <!-- 카메라 권한 -->
    <uses-permission android:name="android.permission.CAMERA" />
    <!-- 저장소 읽기 권한 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <!-- 저장소 쓰기 권한 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <!-- 카메라 사용 -->
    <uses-feature android:name="android.hardware.camera" />
    ```

## 1.2 권한 처리를 위한 코드 작성하기

카메라 및 활영한 사진을 저장할 외부 저장소의 권한을 요청하는 코드를 작성합니다.

1. 먼저 5장 3절에서 작성했던 Base 프로젝트를 불러온 후 BaseActivity를 복사해서 현재 프로젝트에 붙여넣기 합니다.

1. MainActivity.kt 를 열고 BaseActivity를 상속하도록 class 코드를 수정합니다.
    ```kotlin
    class MainActivity: BaseActivity() {

    }
    ```

1. onCreate() 메서드 바로 아래에서 ``Ctrl`` + ``I`` 키를 눌러 나타나는 팝업창에서 BaseActivity에 선언되어 있는 2개의 추상 메서드를 선택하고 [OK]버튼을 클릭해서 오버라이드 합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-252.png){: style="box-shadow: 0 0 5px #777"}

    생성된 코드에서 TODO() 행만 삭제하고 일단 빈 채로 두겠습니다.

    ```kotlin
    override fun permissionGranted(requestCode: Int) {
    }

    override fun permissionDenied(requestCode: Int) {
    }
    ```

1. 바인딩을 생성해서 binding 프로퍼티에 저장하고, setContentView()에 binding.root를 전달합니다.  그리고 binding 바로 윗줄에 3개이 상수를 정의합니다. const 예약어를 사용하려면 companion object 블록이 있어야 되기 때문에 그냥 val로 정의합니다.  각각은 주석처럼 2개의 권한 처리와 1개의 카메라 요청 requestCode로 사용할 예정입니다.
    ```kotlin
    // 외부 저장소 권한 처리
    val PERM_STORAGE = 99
    // 카메라 권한 처리
    val PERM_CAMERA = 100
    // 카메라 촬영 요청
    val REQ_CAMERA = 101
    
    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
    }
    ```

## 1.3 MainActivity에서 카메라 앱 호출하기

Intent에 카메라 앱을 호출하기 위한 플래그인 MediaStore.ACTOIN_IMAGE_CAPTURE를 담아 startActivityForResult() 메서드로 호출하면 카메라 앱의 활영 화면을 호출할 수 있습니다. 

1. 카메라에서 찍은 사진을 외부 저장소 (포토갤러리)에 저장할 것이기 때문에 setContentView 아랫줄에 저장소 권한을 요청하는 코드를 작성합니다.  저장소 권한과 함께 두 번째 파라미터인 requestCode에는 앞에서 미리 정의해둔 PERM_STORAGE를 전달합니다. 
    ```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        requirePermissions(arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), PERM_STORAGE)
    }
    ```

1. 앞에서 오버라이드했던 permissionGranted() 메서드에 when 문을 사용해서 requestCode가 PERM_STROAGE인 것을 체크하고 맞으면 setViews() 메서드를 호출하는 코드를 작성합니다. setViews() 코드는 04에서 작성할 예정입니다.
    ```kotlin
    override fun permissionGranted(requestCode: Int) {
        when (requestCode) {
            PERM_STORAGE -> setViews()
        }
    }
    ```

1. 저장소 권한 요청에대한 승인이 거부되었을 경우 토스트로 안내 메시지를 보여준 후 앱을 종료하는 코드를 작성합니다.  앞에서와 마찬가지로 when 문을 사용해서 requestCode가 PERM_STORAGE일 때에만 동작하도록 작성합니다.
    ```kotlin
    override fun permissionDenied(requestCode: Int) {
        when (requestCode) {
            PERM_STORAGE -> {
                Toast.makeText(baseContext, "외부 저장소 권한을 승인해야 앱을 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                finish()
            }
        }
    }
    ```

1. 외부 저장소 권한이 승인되었을 때 호출할 setViews() 메서드를 만듭니다. 메서드 안에 버튼 클릭 시 카메라 권한을 요청하는 코드를 작성합니다. 두 번째 파라미터인 requestCode 에는 역시 앞에서 정의한 PERM_CAMERA를 전달합니다. 카메라를 직접 호출하는 것이 아니라 권한 요청의 결과에 따라 승인되었을 경우에만 perissionGranted() 메서드에서 카메라를 요청할 것입니다.
    ```kotlin
    fun setViews() {
        binding.btnCamera.setOnClickListener {
            requirePermissions(arrayOf(Manifest.permission.CAMERA), PERM_CAMERA)
        }
    }
    ```

1. 카메라를 요청하는 openCamera() 메서드를 작성합니다. startActivityForResult의 두 번째 파라미터에는 앞에서 정의했던 REQ_CAMERA를 사용하면 됩니다.
    ```kotlin
    fun openCamera() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, REQ_CAMERA)
    }
    ```

    이제 권한 승인 요청과 카메라를 요청하는 코드는 모두 준비되었습니다.  오버라이드했던 권한 처리 메서드에서 각각의 코드를 완성해줍니다.

1. permissionGranted() 메서드에 카메라 권한 승인 시 openCamera()를 호출하는 코드를 추가합니다.
    ```kotlin
    override fun permissionGranted(requestCode: Int) {
        when (requestCode) {
            PERM_STORAGE -> setViews()
            PERM_CAMERA -> openCamera()
        }
    }
    ```

1. permissionDenied() 에도 카메라 권한 요청이 거부되었을 때 토스트 메시지를 보여주는 코드를 추가합니다.  카메라 권한은 승인이 거부되어도 앱을 종료하지 않습니다.
    ```kotlin
    override fun permissionDenied(requestCode: Int) {
        when (requestCode) {
            PERM_STORAGE -> {
                Toast.makeText(baseContext, "외부 저장소 권한을 승인해야 앱을 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                finish()
            }
            PERM_CAMERA -> {
                Toast.makeText(baseContext, "카메라 권한을 승인해야 카메라를 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
            }
        }
    }
    ```

1. openCamera() 메서드를 통해서 카메라가 정상적으로 호출되고, 사진 촬영이 완료하면 onActivityResult() 메서드로 결괏값이 전달됩니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-253.png){: style="box-shadow: 0 0 5px #777"}

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.cameraandgallery

    import android.Manifest
    import android.content.Intent
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.provider.MediaStore
    import android.widget.Toast
    import kr.co.hanbit.cameraandgallery.databinding.ActivityMainBinding

    @Suppress("DEPRECATION")
    class MainActivity : BaseActivity() {

        // 외부 저장소 권한 처리
        val PERM_STORAGE = 99
        // 카메라 권한 처리
        val PERM_CAMERA = 100
        // 카메라 촬영 요청
        val REQ_CAMERA = 101

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            requirePermissions(arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), PERM_STORAGE)
        }

        override fun permissionGranted(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> setViews()
                PERM_CAMERA -> openCamera()
            }
        }

        override fun permissionDenied(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> {
                    Toast.makeText(baseContext, "외부 저장소 권한을 승인해야 앱을 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                    finish()
                }
                PERM_CAMERA -> {
                    Toast.makeText(baseContext, "카메라 권한을 승인해야 카메라를 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                }
            }
        }

        fun setViews() {
            binding.btnCamera.setOnClickListener {
                requirePermissions(arrayOf(Manifest.permission.CAMERA), PERM_CAMERA)
            }
        }

        fun openCamera() {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            startActivityForResult(intent, REQ_CAMERA)
        }
    }
    ```

1. 촬영한 사진 정보는 세 번째 파라미터인 data에 인텐트로 전달됩니다.  전달받은 data파라미터에서 사진을 꺼낸 후 이미지뷰에 세팅합니다. onActivitResult() 메서드를 override하고 다음과 같은 코드를 추가합니다.
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK)  {
            when (requestCode) {
                REQ_CAMERA -> {
                    if (data?.extras?.get("data") != null) {
                        val bitmap = data?.extras?.get("data") as Bitmap
                        binding.imagePreview.setImageBitmap(bitmap)
                    }
                }
            }
        }
    }
    ```

여기까지 작성하면 BaseActivity를 사용해서 2개의 권한을 각각의 requestCode로 처리하는 방법을 알게 됩니다.

이제 앱에서 촬영한 이미지를 선택하면 이미지 프리뷰 화면에 촬영한 이미지가 나타납니다.

하지만 약간 깨져 있는 것을 확인할 수 있습니다.

onActivityResult의 세 번째 파라미터로 전달되는 data에는 해당 이미지의 프리뷰가 들어 있기 때문입니다.

코드를 조금 수정해서 실제 이미지를 미디어스토어에 저장하고 저장된 이미지를 가져와서 화면에 보여주는 코드로 변경해보겠습니다.

1. 먼저 MainActivity의 binding 프로퍼티 아랫줄에 이미지의 Uri를 가져와서 저장할 photoUri 프로퍼티를 추가합니다. Uri가 빨간색으로 보이면 ``Alt`` + ``Enter``키로 import해야 합니다.
    ```kotlin
    var realUri: Uri? = null
    ```

    ``URI?``
    
    통합 자원 식별자<sup> (Uniform Resuorce Identifier, URI) </sup>는 특정 리소스 자원을 고유하게 실벽할 수 있는 식별자를 의미합니다.
    URI의 하위 개념으로 웹 서버의 특정 리소스의 위치를 나타내는 URL<sup> (Uniform Resource Locator) </sup>과 위치와 관계없이 유일한 URN<sup> (Uniform Resource Name) </sup>이 있습니다.

    안드로이드의 Uri는 다음과 같이 한 줄의 텍스트 형태로 구성되어 있습니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-254.png){: style="box-shadow: 0 0 5px #777"}

    1. ``프로토콜``: 가장 앞의 content://는 가져올 리소스를 주고받는 방식을 정의한 것으로, 우리가 웹 브라우저의 주소창에 주소를 입력할 때 http://를 붙이는 것과 같은 방식으로 동작합니다.
    1. ``프로토콜ID (리소스ID)``: 리소스를 제공하는 앱의 이름 또는 안드로이드에서 해당 리소스를 구분하기 위해서 사용하는 고유한 값입니다.
    1. ``데이터 경로``: 실제 경로가 아닌 가상으로 매핑된 데이터의 주소입니다.
    1. ``데이터ID``: 데이터 경로에는 복수 개의 데이터가 있는데, 그 하나하나를 구분하기 위한 ID입니다.


1. 촬영한 이미지를 저장할 Uri를 미디어스토어에 생성하는 createImageUri() 메서드를 만듭니다. 다음과 같이 ContentValues 클래스를 사용해서 파일명과 파일의 타입을 입력한 후, contentResolver의 insert() 메서드를 통해 저장할 수 있습니다.
    ```kotlin
    fun createImageUri(filename: String, mimeType: String): Uri? {
        var values = ContentValues()
        values.put(MediaStore.Images.Media.DISPLAY_NAME, filename)
        values.put(MediaStore.Images.Media.MIME_TYPE, mimeType)
        return contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
    }
    ```

    ``MediaStore란?``
    안드로이드에서 외부 저장소를 관리하는 데이터베이스입니다. 안드로이드 10(Q)부터는 MediaStore를 통해서만 외부 저장소에 파일을 읽고 쓰도록 보안 정책이 변경되었습니다.

1. openCamera() 메서드를 다음과 같이 수정합니다. createImageUri로 Uri를 생성하고 정상적으로 생성되었으면 위에서 선언한 realUri에 저장합니다. 그리고 startActivityForResult에 전달할 인텐트에 MediaStore.EXTRA_OUTPUT을 키로 해서 생성한 uri를 같이 전달합니다. newFileName() 메서드는 바로 이어 04에서 작성합디ㅏ.
    ```kotlin
    fun openCamera() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

        createImageUri(newFileName(), "images/jpg")?.let { uri ->
            realUri = uri
            intent.putExtra(MediaStore.EXTRA_OUTPUT, realUri)
            startActivityForResult(intent, REQ_CAMERA)
        }
    }
    ```

1. 파일명을 만들어주는 newFileName() 메서드를 작성합니다. 파일명이 중복되지 않도록 시간 값을 활용해서 다음과 같이 만들었습니다. SimpleDateFormat은 ``Alt`` + ``Enter``키로 import 합니다. newFileName() 메서드를 사용하면 “연월일_시간.jpg”형태의 파일명을 얻을 수 있습니다.
    ```kotlin
    fun newFileName(): String {
        val sdf = SimpleDateFormat("yyyyMMdd_HHmmss")
        val filename = sdf.format(System.currentTimeMillis())

        return "$filename.jpg"
    }
    ```

1. 이제 Uri를 사용해서 미디어스토어에 저장된 이미지를 읽어오는 메서드를 작성합니다. 입력 파라미터로 Uri를 받아서 결괏값을 Bitmap으로 반환해주는 메서드입니다. API 버전이 27이하이면 MediaStore에 있는 getBitmap메서드를 사용하고, 27보다 크면 ImageDecoder를 사용합니다. 
    ```kotlin
    fun loadBitmap(photoUri: Uri): Bitmap? {
        var image: Bitmap? = null

        try {
            image = if (Build.VERSION.SDK_INT > 27) {
                val source: ImageDecoder.Source = ImageDecoder.createSource(this.contentResolver, photoUri)
                ImageDecoder.decodeBitmap(source)
            } else {
                MediaStore.Images.Media.getBitmap(this.contentResolver, photoUri)
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return image
    }
    ```

1. 이제 결과 처리 메서드인 onActivityResult에서 realUri에 저장된 값이 있는 것을 확인하고 있을 경우 loadBitmap 메서드를 이용해서 화면에 세팅하면 됩니다. 세팅 후에 realUri는 null 처리해줘야 다음 번에도 사용할 수 있습니다.
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK)  {
            when (requestCode) {
                REQ_CAMERA -> {
                    realUri?.let { uri ->
                        val bitmap = loadBitmap(uri)
                        binding.imagePreview.setImageBitmap(bitmap)

                        realUri = null
                    }
                }
            }
        }
    }
    ```

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.cameraandgallery

    import android.Manifest
    import android.content.ContentValues
    import android.content.Intent
    import android.graphics.Bitmap
    import android.graphics.ImageDecoder
    import android.net.Uri
    import android.os.Build
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.provider.MediaStore
    import android.widget.Toast
    import kr.co.hanbit.cameraandgallery.databinding.ActivityMainBinding
    import java.io.IOException
    import java.text.SimpleDateFormat

    @Suppress("DEPRECATION")
    class MainActivity : BaseActivity() {

        // 외부 저장소 권한 처리
        val PERM_STORAGE = 99
        // 카메라 권한 처리
        val PERM_CAMERA = 100
        // 카메라 촬영 요청
        val REQ_CAMERA = 101

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        var realUri: Uri? = null

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            requirePermissions(arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), PERM_STORAGE)
        }

        override fun permissionGranted(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> setViews()
                PERM_CAMERA -> openCamera()
            }
        }

        override fun permissionDenied(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> {
                    Toast.makeText(baseContext, "외부 저장소 권한을 승인해야 앱을 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                    finish()
                }
                PERM_CAMERA -> {
                    Toast.makeText(baseContext, "카메라 권한을 승인해야 카메라를 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                }
            }
        }

        fun setViews() {
            binding.btnCamera.setOnClickListener {
                requirePermissions(arrayOf(Manifest.permission.CAMERA), PERM_CAMERA)
            }
        }

        fun openCamera() {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

            createImageUri(newFileName(), "images/jpg")?.let { uri ->
                realUri = uri
                intent.putExtra(MediaStore.EXTRA_OUTPUT, realUri)
                startActivityForResult(intent, REQ_CAMERA)
            }
        }

        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)
            if (resultCode == RESULT_OK)  {
                when (requestCode) {
                    REQ_CAMERA -> {
                        realUri?.let { uri ->
                            val bitmap = loadBitmap(uri)
                            binding.imagePreview.setImageBitmap(bitmap)

                            realUri = null
                        }
                    }
                }
            }
        }

        fun createImageUri(filename: String, mimeType: String): Uri? {
            var values = ContentValues()
            values.put(MediaStore.Images.Media.DISPLAY_NAME, filename)
            values.put(MediaStore.Images.Media.MIME_TYPE, mimeType)
            return contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
        }

        fun newFileName(): String {
            val sdf = SimpleDateFormat("yyyyMMdd_HHmmss")
            val filename = sdf.format(System.currentTimeMillis())

            return "$filename.jpg"
        }

        fun loadBitmap(photoUri: Uri): Bitmap? {
            var image: Bitmap? = null

            try {
                image = if (Build.VERSION.SDK_INT > 27) {
                    val source: ImageDecoder.Source = ImageDecoder.createSource(this.contentResolver, photoUri)
                    ImageDecoder.decodeBitmap(source)
                } else {
                    MediaStore.Images.Media.getBitmap(this.contentResolver, photoUri)
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
            return image
        }
    }
    ```

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-255.png){: style="box-shadow: 0 0 5px #777"}


# 2. 갤러리에서 사진 가져오기

Intent 와 startActivityForResult() 메서드로 갤러리 앱을 호출한 후 사용자가 선택한 사진의 Uri를 onActivityResult() 메서드에서 받아서 사용하는 코드를 작성해보겠습니다.

1. activity_main.xml 의 [Degisn] 모드에서 버튼을 추가하고, text 속성은 ‘갤러리’, id속성은 ‘btnGallery’로 입력합니다.

    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-256.png){: style="box-shadow: 0 0 5px #777"}

1. MainActivity.kt를 열고 setViews() 메서드 안에 btnGallery.setOnClickListener를 추가하고 openGallery() 메서드를 호출합니다. openGallery() 메서드는 04에서 작성합니다.
    ```kotlin
    fun setViews() {
        binding.btnCamera.setOnClickListener {
            requirePermissions(arrayOf(Manifest.permission.CAMERA), PERM_CAMERA)
        }
        binding.btnGallery.setOnClickListener {
            openGallery()
        }
    }
    ```

1. 클래스 상단에 있는 REQ_CAMERA 아랫줄에 REQ_STORAGE를 추가합니다.
    ```kotlin
    ...
    val REQ_CAMERA = 101
    val REQ_STORAGE = 102
    ```

1. openGallery() 메서드를 추가하고 갤러리를 호출하는 코드를 작성합니다. intent의 파라미터로 ACTION_PICK을 사용하면 INTENT.TYPE에서 설정한 종류의 데이터를 mEDIAsTORE에서 불러와 목록으로 나열한 후 선택할 수 있는 앱이 실행됩니다. 다음과 같이 설정하면 이미지만 불러옵니다.
    ```kotlin
    fun openGallery() {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = MediaStore.Images.Media.CONTENT_TYPE
        startActivityForResult(intent, REQ_STORAGE)
    }
    ```

    *``갤러리도 외부 저장소 권한이 필요하지만 이미 앞 절에서 앱을 시작함과 동시에 승인을 받도록 처리했었습니다.``*{: style="background-color: #FFCCCC"}

1. onActivityResult() 메서드에서 when 블록에 REQ_STORAGE를 처리하는 코드를 추가합니다.
    ```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK)  {
            when (requestCode) {
                REQ_CAMERA -> {
                    realUri?.let { uri ->
                        val bitmap = loadBitmap(uri)
                        binding.imagePreview.setImageBitmap(bitmap)

                        realUri = null
                    }
                }
                REQ_STORAGE -> {
                    // 06에서 작성합니다.   
                }
            }
        }
    }
    ```

1. 갤러리 버튼을 통해 전달된 이미지 데이터를 imagesPreview에 세팅합니다. 호출된 갤러리에서 이미지를 선택하면 data의 data속성으로 해당 이미지의 Uri가 전달됩니다. 전달된 Uri를 이미지뷰에 세팅할 수 있습니다.
    ```kotlin
    REQ_STORAGE -> {
        data?.data?.let { uri ->
            binding.imagePreview.setImageURI(uri)
        }
    }
    ```

    ``MainActivity.kt의 전체 코드``

    ```kotlin
    package kr.co.hanbit.cameraandgallery

    import android.Manifest
    import android.content.ContentValues
    import android.content.Intent
    import android.graphics.Bitmap
    import android.graphics.ImageDecoder
    import android.net.Uri
    import android.os.Build
    import androidx.appcompat.app.AppCompatActivity
    import android.os.Bundle
    import android.provider.MediaStore
    import android.util.Log
    import android.widget.Toast
    import kr.co.hanbit.cameraandgallery.databinding.ActivityMainBinding
    import java.io.IOException
    import java.text.SimpleDateFormat

    @Suppress("DEPRECATION")
    class MainActivity : BaseActivity() {

        // 외부 저장소 권한 처리
        val PERM_STORAGE = 99
        // 카메라 권한 처리
        val PERM_CAMERA = 100
        // 카메라 촬영 요청
        val REQ_CAMERA = 101
        // 저장소 요청
        val REQ_STORAGE = 102

        val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
        var realUri: Uri? = null

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(binding.root)

            requirePermissions(arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), PERM_STORAGE)
        }

        override fun permissionGranted(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> setViews()
                PERM_CAMERA -> openCamera()
            }
        }

        override fun permissionDenied(requestCode: Int) {
            when (requestCode) {
                PERM_STORAGE -> {
                    Toast.makeText(baseContext, "외부 저장소 권한을 승인해야 앱을 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                    finish()
                }
                PERM_CAMERA -> {
                    Toast.makeText(baseContext, "카메라 권한을 승인해야 카메라를 사용할 수 있습니다.", Toast.LENGTH_LONG).show()
                }
            }
        }

        fun setViews() {
            binding.btnCamera.setOnClickListener {
                requirePermissions(arrayOf(Manifest.permission.CAMERA), PERM_CAMERA)
            }
            binding.btnGallery.setOnClickListener {
                openGallery()
            }
        }

        fun openCamera() {
            val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

            createImageUri(newFileName(), "images/jpg")?.let { uri ->
                realUri = uri
                intent.putExtra(MediaStore.EXTRA_OUTPUT, realUri)
                startActivityForResult(intent, REQ_CAMERA)
            }
        }

        fun createImageUri(filename: String, mimeType: String): Uri? {
            var values = ContentValues()
            values.put(MediaStore.Images.Media.DISPLAY_NAME, filename)
            values.put(MediaStore.Images.Media.MIME_TYPE, mimeType)

            Log.d("camera1", "uri ${MediaStore.Images.Media.EXTERNAL_CONTENT_URI}")
            return contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
        }

        fun newFileName(): String {
            val sdf = SimpleDateFormat("yyyyMMdd_HHmmss")
            val filename = sdf.format(System.currentTimeMillis())

            Log.d("camera1", "filename : " + "$filename.jpg")
            return "$filename.jpg"
        }

        fun loadBitmap(photoUri: Uri): Bitmap? {
            var image: Bitmap? = null

            try {
                Log.d("camera1", "sdk_version : " + Build.VERSION.SDK_INT)
                Log.d("camera1", "sdk_version : " + photoUri)

                image = if (Build.VERSION.SDK_INT > 27) {
                    val source: ImageDecoder.Source = ImageDecoder.createSource(this.contentResolver, photoUri)
                    ImageDecoder.decodeBitmap(source)
                } else {
                    MediaStore.Images.Media.getBitmap(this.contentResolver, photoUri)
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
            return image
        }

        fun openGallery() {
            val intent = Intent(Intent.ACTION_PICK)
            intent.type = MediaStore.Images.Media.CONTENT_TYPE
            startActivityForResult(intent, REQ_STORAGE)
        }

        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)
            if (resultCode == RESULT_OK)  {
                when (requestCode) {
                    REQ_CAMERA -> {
                        realUri?.let { uri ->
                            val bitmap = loadBitmap(uri)
                            binding.imagePreview.setImageBitmap(bitmap)

                            realUri = null
                        }
                    }
                    REQ_STORAGE -> {
                        data?.data?.let { uri ->
                            binding.imagePreview.setImageURI(uri)
                        }
                    }
                }
            }
        }
    }
    ```
    ![1]({{site.baseurl}}/images/this-is-android/this-is-android-257.png){: style="box-shadow: 0 0 5px #777"}


<style>
.page-container {max-width: 1200px}
</style>