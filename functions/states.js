module.exports.states = [
  {
    name: "Busan",
    cities: ["Busan"],
  },
  {
    name: "Chungcheongbuk-do",
    cities: ["Cheongju"],
  },
  {
    name: "Chungcheongnam-do",
    cities: ["Daejeon"],
  },
  {
    name: "Gangwon-do",
    cities: ["Chuncheon"],
  },
  {
    name: "Gyeongsangbuk-do",
    cities: ["Gyeongju"],
  },
  {
    name: "Gyeongsangnam-do",
    cities: ["Jinju"],
  },
  {
    name: "Jeju-do",
    cities: ["Jeju"],
  },
  {
    name: "Jeollabuk-do",
    cities: ["Jeonju"],
  },
  {
    name: "Jeollanam-do",
    cities: ["Suncheon"],
  },
  {
    name: "Gwangju",
    cities: ["Gwangju"],
  },
  {
    name: "Gyeonggi-do",
    cities: ["Dongducheon", "Osan"],
  },
  {
    name: "Seoul",
    cities: ["Seoul"],
  },
];

/** 
 * 한시간에 api call 13회(한국 내 13지역 데이터 불러오므로),
 * 하루 24시간이니깐 13회 * 24시간 >> 312회
 * 한달 약 30일. => 312회 * 30일 >> 9,360회
 * 한달 무료 api call limit이 10,000회 이므로
 * 640회 여유 있음. 좀 간당간당한가?
 * api key 3개 돌려쓰도록 했다!,
 * => key1: 5회/h, key2: 5회/h, key3: 3회/h
 * => key1: 3,600회/month, key2: 3,600회/month, key3: 2,160회/month
 */
