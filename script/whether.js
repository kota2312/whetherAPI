/* 天気・温度API */
//現在の天気を取得する場所の名前
let zip = document.getElementById("address");
if (zip && zip.value == "") {
  zip.addEventListener(
    "change",
    function () {
      let targetCityName = zip.value;
      let appId = "0ed919eb6bdf93840ca67c82708330e5"; //My Api key

      const requestUrl =
        "https://api.openweathermap.org/data/2.5/weather?APPID=" +
        appId +
        "&lang=ja&units=metric&q=" +
        targetCityName +
        ",jp;";
      //Ajax通信用のオブジェクトを作成
      let xhr = new XMLHttpRequest();

      //通信方式とURLを設定
      xhr.open("GET", requestUrl);

      //通信を実行する
      xhr.send();

      //通信ステータスが変わったら実行される関数
      xhr.onreadystatechange = function () {
        //通信が完了
        if (xhr.readyState == 4) {
          ShowTodaysWeather(xhr.responseText);
        }
      };
    },
    false
  );
}

/**
 * 今日の天気を表示する
 */
function ShowTodaysWeather(response) {
  let obj = JSON.parse(response);
  let zip = document.getElementById("address");

  let weather = obj.weather[0].description;
  let city = obj.name;
  let temp = obj.main.temp;

  let weatherText = document.getElementById("whether");
  if (weatherText && zip.value != "") {
    weatherText.innerHTML =
      "現在の" +
      city +
      "の天気は" +
      weather +
      "<br>" +
      "気温は" +
      temp +
      "度です。";
  } else {
    weatherText.innerHTML = "";
  }

  //console.log("現在の" + city + "の天気は" + weather);
  //console.log("気温は" + temp + "度です。");
}
