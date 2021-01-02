---
title: "숫자 공부"
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

{% capture c %}
[듣기](#){: #speak .btn .btn--inverse}
<select id="digitNum">
  <option value="3">3자릿수</option>
  <option value="4">4자릿수</option>
  <option value="5">5자릿수</option>
  <option value="6">6자릿수</option>
  <option value="7">7자릿수</option>
  <option value="8">8자릿수</option>
  <option value="9">9자릿수</option>
  <option value="10">10자릿수</option>
</select>
[초기화](#){: #reset .btn .btn--inverse}
[금액계속듣기](#){: #speak .btn .btn--inverse}
{% endcapture %}
<center>{{ c | markdownify | remove: "<p>" | remove: "</p>"}}</center>

<div id="business2" style="display: none;"></div>