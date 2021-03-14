---
title: "실전주식!!"
categories:
  - Me
tags:
  - Asset
toc: true
toc_label: "목차"
toc_sticky: true
---

### ✔ 매수시 유의사항 
{: .neon-text}

- 모두 알고있지만 실패하는 이유는 기다림이다
- 당장의 이익보다는 사업성을 보라
- CEO의 MBA 출신여부
- 수익률의 92%는 보유기간의 8%에서 나온다
- 독과점 기업
  - 안정적
  - 이미 시장잠식으로 점유율을 올리기 힘듬
  - <font color="red">메가트랜드가 더 매력적</font>
- 자신만의 원칙으로 단타 패턴을 만들어라
  - 하루 1번
  - 3:8:10 법칙 - 예수금의 30%, 80%, 100% 분할매수
  - 가장 HOT한 종목을 찾고 1일내 팔아라

### ✔ 상장일
{: .wood-text}

<div id="listingDay"></div>
<br>


### ✔ 주식거래시간
{: .wood-text}

![](/assets/images/me/2020-12-27-me-it-business3-1.png)


### ✔ 물타기와 불타기의 평균단가와 기회비용
{: .wood-text}

![](/assets/images/me/2020-12-27-me-it-business3-4.png)


### ✔ 투자지표
{: .wood-text}

- <a class="btn btn--inverse my-popup" id="stockCalc" href="#">계산</a> [[참고1]](/assets/images/me/2020-12-27-me-it-business3-2-1.png){: .gallery-enabled-false} [[참고2]](/assets/images/me/2020-12-27-me-it-business3-2-2.png){: .gallery-enabled-false} [[참고3]](/assets/images/me/2020-12-27-me-it-business3-2-3.png){: .gallery-enabled-false}
  - 현재주가 <input type="text" name="stkpc" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 발행주식수 <input type="text" name="pblicteStockCnt" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 자사주 <input type="text" name="treasuryStockCnt" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 당기순이익 <input type="text" name="ntpfThstrm" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 자산총계 <input type="text" name="assetsTotamt" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 부채총계 <input type="text" name="debtTotamt" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 자기자본/자본총계 <input type="text" name="ecptl" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 유동 차입부채 <input type="text" name="dynmcBrrwDebt" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 비유동 차입부채 <input type="text" name="notDynmcBrrwDebt" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 현금성 자산 <input type="text" name="cashAssets" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 영업이익 <input type="text" name="bsnProfit" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 대손상각비 + 감가상각비 + 사용권자산상각비 + 무형자산상각비 + 기타의 대손강각비(환입) <input type="text" name="dprc" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>
  - 업종 멀티플 <input type="text" name="indutyPer" />
  - 배당금 <input type="text" name="dvdnd" class="won" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"/>

  <div id="stockCalcResult" style="display: none;">
    <table>
      <tbody>
        <tr>
          <td><font color="blue">시가총액</font><br>현재주가 * 발행주식수</td>
          <td><font color="red"><span id="mktcTotamt"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">EPS (주당 순이익)</font><br>당기순이익 / 발행주식수</td>
          <td><font color="red"><span id="eps"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">PER (예상 주가 수익 비율)</font><br>시가총액 / 당기순이익</td>
          <td><font color="red"><span id="per"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">BPS (주당순자산)</font><br>(자산총계 - 부채총계) / 발행주식수</td>
          <td><font color="red"><span id="bps"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">ROE (자기자본이익율)</font><br>당기순이익 / 자본총계 * 100</td>
          <td><font color="red"><span id="roe"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">PBR (주가순자산비율)</font><br>시가총액 / 자본총계</td>
          <td><font color="red"><span id="pbr"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">배당수익률(%)</font><br>(배당금 * 현재주가) * 100</td>
          <td><font color="red"><span id="alotErnrt"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">배당성향</font><br>(배당금 * 주식수) / 당기순이익 * 100</td>
          <td><font color="red"><span id="alotIncln"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">EV (기업가치)</font><br>자기자본(시가총액) + 순차입금 (총차입금 - 현금성 자산)</td>
          <td><font color="red"><span id="ev"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">EBITDA</font><br>영업이익 + 감가상각비 등 비현금성 비용 + 제세금</td>
          <td><font color="red"><span id="ebitda"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">EV/EBITDA</font></td>
          <td><font color="red"><span id="evEbitda"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">평균 업종PER 적정주가</font><br>(주당순이익 * 업종 예상주기수익비율)</td>
          <td><font color="red"><span id="proprtStkpcByIndutyPer"></span></font></td>
        </tr>
        <tr>
          <td><font color="blue">슈퍼개미 김정환 적정주가</font><br>(주당순이익 * 자기자본이익율)</td>
          <td><font color="red"><span id="proprtStkpcByEpsRoe"></span></font></td>
        </tr>
      </tbody>
    </table>
  </div>