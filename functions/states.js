module.exports.states = [
  {
    name: "Busan",
    cities: ["Busan"],
  },
  {
    name: "Chungcheongbuk-do",
    // cities: ["Cheongju"],
    cities: ["Yeongdong"],
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
    // cities: ["Jinju"],
    cities: ["Gimhae"],
  },
  {
    name: "Jeju-do",
    cities: ["Jeju"],
  },
  {
    name: "Jeollabuk-do",
    // cities: ["Jeonju"],
    cities: ["Gunsan"],
  },
  {
    name: "Jeollanam-do",
    // cities: ["Suncheon"],
    cities: ["Jangseong"],
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
 * api call 13회 / hour (한국 내 13지역 데이터 불러오므로),
 * 하루 호출: 24시간 13회 * 24시간 >> 312회
 * 한달 약 30일. => 312회 * 30일 >> 9,360회
 * api call limit 10,000회
 */
