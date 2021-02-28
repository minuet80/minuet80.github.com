---
title: "주식공부"
categories:
  - Me
tags:
  - Asset
toc: true
toc_label: "목차"
toc_sticky: true
---
### ✔ 상장일
{: .wood-text}
---

<div id="listingDay"></div>

### ✔ PER・PBR・ROE・EV/EBITDA
{: .wood-text}
---

![](/assets/images/me/2020-12-27-me-it-business3-1.png)
<br>
- ROE  (Return On Equity) : 자기자본이익율
  - 내가 처음 투자한 돈 대비 회사가 돈을 얼마나 잘 벌고 있는지 나타내는 지표
  - 당기순이익 / 평균 자기자본 * 100
  - ROE가 5~20% 이면 적정 투자대상, 10% 이상이면 수익성이 높은 회사
  - 향후 ROE가 높아진다면 기업가치는 계속 성장
- EPS (Earnings Per Share) : 주당순이익
  - 주식 1주가 1년간 벌어들이는 순이익금을 나타냄
  - EPS = 당기순이익 / 발행주식수 
  - <cite>EPS 증가율이 3년 이상 3~25% 인 종목은 투자유망 종목</cite> - 존 네프
- PER (Price Earning Ratio) 예상 주가 수익 비율
  - 기업의 가치가 1년 간 벌어들인 돈 대비 얼마나 거래가 되는지 확인할 수 있는 지표
  - PER = 시가총액 / 당기순이익 = 주가 / 주당순이익 (EPS)
  - PER는 경쟁사와 비교하기! 업종마다 PER가 다르다 (일반적인 제조업은 PER 10배 정도)
  - 저 PER에 사서 고 PER에 팔기
- PBR (Price Book-value Ratio) : 주가순자산비율
  - PBR = 주가 / 주당순자산
  - 주가가 순자산에 비해서 1주당 몇 배에 거래되고 있는지 확인할 수 있는 지표
  - 수치가 낮을수록 회사 가치는 저평가
  - 1미만의 수치 = 주가가 장부상의 순자산가치에도 못 미친다는 뜻
- EV/EBITDA (Enterprise Value / Earnings Before Interest, Tax, Depreciation and Amortization)
  - EV는 기업가치 (Enterprise Value)를 의미함
  - EBITDA는 이자비용, 법인세, 유무형자산, 감가상각비를 반영하기 전의 이익을 말함
  - EV = 시가총액 + 순차입금 (총차입금 - 현금 및 투자유가증권)
  - EBITDA = 영업이익 + 감가상각비 등 비현금성 비용 + 제 세금
- 배당성향 = 배당금 / 주당순이익
- 적정주가 = EPS * PER (PER > ROE → 고평가)
- <button id="stockCalc">계산</button>
  - 현재주가 <input type="text" name="stkpc" placeholder="36050" value="36050" />
  - 발행주식수 <input type="text" name="pblicteStockCnt"  placeholder="9604000" value="9604000" />
  - 당기순이익 <input type="text" name="ntpfThstrm" placeholder="15100532141" value="15100532141" />
  - 자산총계 <input type="text" name="assetsTotamt" placeholder="132725123457" value="132725123457" />
  - 부채총계 <input type="text" name="debtTotamt" placeholder="47072945035" value="47072945035" />
  - 자기자본/자본총계 <input type="text" name="ecptl" placeholder="85652178422" value="85652178422" />
  - 업종 PER <input type="text" name="indutyPer" placeholder="94.04" value="94.04" />
  - 배당금 <input type="text" name="dvdnd" placeholder="100" value="100" />
- 결과
  - 시가총액 = 현재주가 * 발행주식수
    - <font color="red"><span id="mktcTotamt"></span></font>
  - EPS (주당 순이익) = 당기순이익 / 발행주식수
    - <font color="red"><span id="eps"></span></font>
  - PER (예상 주가 수익 비율) = 시가총액 / 당기순이익
    - <font color="red"><span id="per"></span></font>
  - BPS (주당순자산) = (자산총계 - 부채총계) / 발행주식수
    - <font color="red"><span id="bps"></span></font>
  - ROE (자기자본이익율) = 당기순이익 / 자본총계 * 100
    - <font color="red"><span id="roe"></span></font>
  - PBR (주가순자산비율) = 시가총액 / 자본총계
    - <font color="red"><span id="pbr"></span></font>
  - 평균 업종PER 적정주가 = (주당순이익 * 업종 예상주기수익비율)
    - <font color="red"><span id="proprtStkpcByIndutyPer"></span></font>
  - 슈퍼개미 김정환식 적정주가 = (주당순이익 * 자기자본이익율)
    - <font color="red"><span id="proprtStkpcByEpsRoe"></span></font>
  - 배당수익률(%) = (배당금 * 현재주가) * 100
    - <font color="red"><span id="alotErnrt"></span></font>
  - 배당성향 = (배당금 * 주식수) / 당기순이익 * 100
    - <font color="red"><span id="alotIncln"></span></font>
  - EV/EBITDA
    - <font color="red"><span id="evEbitda"></span></font>
  - EV (기업가치)
    - <font color="red"><span id="ev"></span></font>
  - EBITDA
    - <font color="red"><span id="ebitda"></span></font>


### ✔ [주식용어] 유동비율, 부채비율, 총차입금, 순차입금, 순차입금비율, 이자보상비율
{: .wood-text}
---
- 이익잉여금
  - 기업이 사업을 통해 축적한 잉여금
- 유동비율
  - 계산식 : (유동자산 / 유동부채) * 100
  - 유동자산은 당장 쓸 수 있는 돈이나 현금화 시키기 쉬운 자산, 유동부채는 올해안에 갚아야 될 빛
  - 기업이 보유하는 지급 능력, 신용능력을 판단하기 위해 스이는 것으로 신용분석적 관점에서 가장 중요하다.
- 당좌비율
  - 당좌자산이란? 유동자산 중에서 판매과정을 거치지 않고 1년 이내에 현금화가 가능한 자산
  - 계산식 : (당좌자산 / 유동부채 ) * 100
  - 일반적으로 100%가 넘으면 안정적인 상황이라 봄
  - 다만 당좌비율이 너무 높은 수준일 경우 현금을 효율적으로 재투자하지 못한다는 의미로 해석하기도 함
- 부채비율
  - 계산식 : 부채총액 (유동부채 + 비유동부채) / 자기자본
  - 경영분석에서 기업의 건전성의 정도를 나타내는 지표
  - 자기자본 (자본금과 이익금 남은것 합계) 과 부채총계 (빌린돈) 의 비율
- 총차입금
  - 계산식 : 단기차입금 + 유동성장기부채 + 사채 + 장기 차입금
  - 부채와 총 차입금의 차이 : 차입금은 빌린돈이고 부채는 차입금을 포함한 부채에 해당하는 여러 항목을 합한 것
- 순차입금
  - 계산식 : 총차입금 - 현금유동성 (현금 및 단기예금)
  - 당장 있는 현금을 빛갚는데 다 썼을때, 남은 빛을 순차입금이라 함
- 순차입금비율
  - 계산식 : (총차입금 - 현금유동성) / 자본총계 * 100
  - 전체 자산 중에서 순차입금이 차지하는 비율
- 이자보상배율
  - 계산식 : 영업이익 / 이자비용
  - 영업으로 버는 돈과 나가는 이자중 뭐가 많은지 확인하는 비율
  - 이자보상배율이 1미만인 것은 영업이익으로 이자조차 낼 수 없음을 의미
- ![예](/assets/images/me/2020-12-27-me-it-business3-2.png)


### ✔ 배당주 찾기
{: .wood-text}
---
- 진짜 배당주
  - CJ4우(전환)
    - 보통주로 전환이 약속되어 있는 우선주
    - 전환일 2029년 3월 26일
    - CJ와 괴리율이 크면 좋은 현재 30%정도
    - 우선배당건 (액명금액에 2%를 우선배당 받을 수 있음)
    - 참가적 배당
  - 삼성전자우
    - 괴리율 10.9%

- 가짜 배당주
  - 베트남개발
    - 주가가 10년 지속 하락
  - 동양고속
    - ![영업이익률이 1.12인데 순이익률이 69.21](/assets/images/me/2020-12-27-me-it-business3-3.png)
    - ![자산처분이익 313.0](/assets/images/me/2020-12-27-me-it-business3-4.png)
    - **<u>자산처분이익으로 배당 (일시적)</u>**
  - 두산, 두산우
    - 부도위기
  - 웅진씽크빅
    - 지주회사에 막대한 배당
  - 대동전자
    - 계열사 매각 → 아들이 매수 → 계열사 돈으로 모기업 인수
  - 한국ANKOR유전
    - 주가 지속 하락
  - 삼양옵틱스
    - 재고량 증가
    - 주가 지속적 하락
  - 유아이엘
    - 기업을 인수한수 이자를 배당금으로 지급
  - 대신증권우
    - 지속적 성장x

- 결론
  - 금융소득 2천만원 이상이면 종합소득세로 간주
  - **<font color="red"><u>배당소득세가 15.4%</u></font>**
  - 기준금리가 내려가면 우선주는 오름
  - 신형우선주를 싸게 사서 만기일에 보통주로 전환받기
  - 배당금이 늘어나는 주식을 사서 보통주와 괴리율 좁히기
  - 배당성향이 일정한 기업
  - **<font color="red"><u>배당성향 일정기업 배당금 예측법</u></font>** = 올해 예상 순이익 * 예상 배당성향 / 주식수
  - [배당 서프라이즈 기업 10분 만에 발굴하는 법](/darant/darant-playlist1/)


### ✔ 삼성전자・삼성전자우 지금 사도 될까?
{: .wood-text}
---
- Fwd PER : 현재 시점에서 애널리스트들이 예상한 1년 후 이익으로 계산한 PER
- 이익의 질이 중요
- 5G 데이터 수요 증가
  - IT 기업들의 데이터 센터 증축
  - 메모리 반도체 수요증가
- 비메모리 반도체
  - 삼성전자, 2030년까지 133조원 투자 - 비전선포식
  - 2030년 글로벌 반도체 1위 - 비전선포식
- 삼성전자와 필라델피아 반도체 지수 비교
  - ![](/assets/images/me/2020-12-27-me-it-business3-5.png)
  - [필라델피아 지수 바로가기](https://m.kr.investing.com/indices/phlx-semiconductor)
- 최근 주가 부진이유
  - 2021년 1분기 실적악화 전망
  - 배당금 2% 증가, 잉여현금흐름 50% 주주환원
- 코스피, 삼성전자, SK하이닉스 주가 비교
  - ![](/assets/images/me/2020-12-27-me-it-business3-6.png)
- 반도체 가격추이
  - ![](/assets/images/me/2020-12-27-me-it-business3-7.png)
  - [dramexchange 바로가기](https://www.dramexchange.com/)
  - 가파르게 상승중
- 결론
  - 현재 삼성전자 주가는 반도체/스마트폰 수요 증가를 선반영한 상태
  - 비메모리에서 가시적 성과가 있어야 함
  - 저금리 삼성전자 우선주 투자
  - 반도체 가격 지속적 상승중
  - 비메모리 M&A, 파운드르 증설 가능성