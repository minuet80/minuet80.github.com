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

### ✔ PER・PBR・ROE・EV/EBITDA
{: .wood-text}
---

- ![](/assets/images/me/2020-12-27-me-it-business3-1.png)
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
- 적정주가 = EPS * PER
- <button id="stockCalc">계산</button>
  - 현재주가 <input type="text" name="stkpc" />
  - 발행주식수 <input type="text" name="pblicteStockCnt" />
  - 당기순이익 <input type="text" name="ntpfThstrm" />
  - 자기자본/자본총계 <input type="text" name="ecptl" />
  - 주당순자산 <input type="text" name="nstsr" />
  - 업종 PER <input type="text" name="indutyPer" />
- 결과
  - EPS (주당 순이익) <span id="eps"></span>
  - PER (예상 주가 수익 비율) <span id="per"></span>
  - ROE (자기자본이익율) <span id="row"></span>
  - PBR (주가순자산비율) <span id="pbr"></span>
  - EV/EBITDA <span id="evEbitda"></span>
  - EV (기업가치) <span id="ev"></span>
  - EBITDA <span id="ebitda"></span>
  - 적정주가 <span id="proprtStkpc"></span>


### ✔ [주식용어] 유동비율, 부채비율, 총차입금, 순차입금, 순차입금비율, 이자보상비율
{: .wood-text}
---

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