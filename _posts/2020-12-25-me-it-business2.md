---
title: "한국어 텍스트 음성 변환 (TTS)"
categories:
  - IT
tags:
  - Business
---

<form onsubmit="return false;">
  <fieldset>
    <legend>✦ 텍스트 음성 변환 (TTS)</legend>
    <p></p>
    <input type="text" id="inputText" />
    <p></p>
    속도 <input type="range" min="0.5" max="2" value="1" step="0.1" id="speed"><div class="speed-value">1</div><div class="clearfix"></div>
    <p></p>
    강도 <input type="range" min="0" max="2" value="1" step="0.1" id="pitch"><div class="pitch-value">1</div><div class="clearfix"></div>
    <p></p>
    음성  
    <select id="lang">
      <option data-lang="ko-KR" data-name="Google 한국어" selected>Google 한국어 (ko-KR)</option>
      <option data-lang="en-US" data-name="Google US English">Google US English (en-US)</option>
      <option data-lang="en-GB" data-name="Google UK English Female">Google UK English Female (en-GB)</option>
      <option data-lang="en-GB" data-name="Google UK English Male">Google UK English Male (en-GB)</option>
      <option data-lang="ja-JP" data-name="Google 日本語">Google 日本語 (ja-JP)</option>
      <option data-lang="id-ID" data-name="Google Bahasa Indonesia">Google Bahasa Indonesia (id-ID)</option>
      <option data-lang="de-DE" data-name="Google Deutsch">Google Deutsch (de-DE)</option>
      <option data-lang="es-ES" data-name="Google español">Google español (es-ES)</option>
      <option data-lang="es-US" data-name="Google español de Estados Unidos">Google español de Estados Unidos (es-US)</option>
      <option data-lang="fr-FR" data-name="Google français">Google français (fr-FR)</option>
      <option data-lang="it-IT" data-name="Google italiano">Google italiano (it-IT)</option>
      <option data-lang="nl-NL" data-name="Google Nederlands">Google Nederlands (nl-NL)</option>
      <option data-lang="pl-PL" data-name="Google polski">Google polski (pl-PL)</option>
      <option data-lang="pt-BR" data-name="Google português do Brasil">Google português do Brasil (pt-BR)</option>
      <option data-lang="ru-RU" data-name="Google русский">Google русский (ru-RU)</option>
      <option data-lang="hi-IN" data-name="Google हिन्दी">Google हिन्दी (hi-IN)</option>
      <option data-lang="zh-TW" data-name="Google 國語（臺灣）">Google 國語（臺灣）(zh-TW)</option>
      <option data-lang="zh-CN" data-name="Google&nbsp;普通话（中国大陆）">Google 普通话（中国大陆）(zh-CN)</option>
      <option data-lang="zh-HK" data-name="Google&nbsp;粤語（香港）">Google 粤語（香港）(zh-HK)</option>
     </select>
  </fieldset>
</form>

{% capture a %}
[듣기](#){: #speak .btn .btn--inverse}
{% endcapture a %}

<center>
{{ a | markdownify | remove: "<p>" | remove: "</p>"}}
</center>

<p></p>

{% capture b %}
**금액 랜덤으로 듣기**
{% endcapture %}
<div class="notice--danger" style="text-align: center;">
{{ b | markdownify | remove: "<p>" | remove: "</p>"}}
</div>

| --- | --- | --- | --- |
| 금액 자릿수 <select id="digitNum">  <option value="1000">3자릿수</option>  <option value="10000">4자릿수</option>  <option value="100000">5자릿수</option>  <option value="1000000">6자릿수</option>  <option value="10000000">7자릿수</option>  <option value="100000000">8자릿수</option>  <option value="1000000000">9자릿수</option>  <option value="10000000000">10자릿수</option></select> | 딜레이 <select id="delay">  <option value="1000">1초</option>  <option value="3000">3초</option>  <option value="5000">6초</option>  <option value="7000">7초</option>  <option value="9000">9초</option>  <option value="11000">11초</option>  <option value="13000">13초</option></select> | [초기화](#){: #amtReset .btn .btn--inverse} [듣기](#){: #numSpeak data-type="0" .btn .btn--inverse} [랜덤듣기](#){: #randomNumSpeak data-type="1" .btn .btn--inverse} |

{% capture c %}
**생활 한국어**
{% endcapture %}
<div class="notice--danger" style="text-align: center;">
{{ c | markdownify | remove: "<p>" | remove: "</p>"}}
</div>

| --- | --- | --- | --- |
| | *커피를 내오거라* | [](#){: #play-pause-button .fa .fa-play} |
| | *뜯지 말아주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *영수증을 드릴까요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *치킨을 양념맵소킹 콤보 반 그리고 뿌링클 콤보 반으로 주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *노란색 봉투 10장 주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *노란색 비닐봉투 주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *오늘은 왜케 일찍자요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *또 먹어요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *내숭떨다* | [](#){: #play-pause-button .fa .fa-play} |
| | *영주권을 신청할 수 있다* | [](#){: #play-pause-button .fa .fa-play} |
| | *꾸준히 공부하세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *잘하는데 방심하면 안돼요* | [](#){: #play-pause-button .fa .fa-play} |
| | *집중력이 3살짜리 어린이에요* | [](#){: #play-pause-button .fa .fa-play} |
| | *내일 밥 먹을까요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *구어체 알아 두세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *환풍기를 틀어주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *왜 자꾸 핸드폰만 해요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *왜 자꾸 핸드폰만 만져요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *미역국에 이거 넣으면 어때요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *오늘 도깨비 드라마 보는건 어때요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *오늘은 외국인 등록증을 발급 받으러 갈거에요* | [](#){: #play-pause-button .fa .fa-play} |
| | *외국인청에 가기전에 조기적응프로그램을 이수해야 해요* | [](#){: #play-pause-button .fa .fa-play} |
| | *힘들것 같았기 때문이다* | [](#){: #play-pause-button .fa .fa-play} |
| | *오빠가 데릴러 갈까요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *종량제 봉투 주세요* | [](#){: #play-pause-button .fa .fa-play} |
| | *종량제 봉투에 물건을 담아요* | [](#){: #play-pause-button .fa .fa-play} |
| | *종업원이 이렇게 말할 거예요* | [](#){: #play-pause-button .fa .fa-play} |
| | *홈플러스 포인트 적립 하시겠어요?* | [](#){: #play-pause-button .fa .fa-play} |
| | *핸드폰 번호로 할게요* | [](#){: #play-pause-button .fa .fa-play} |
{: #conversation }


<div id="business2" style="display: none;"></div>
