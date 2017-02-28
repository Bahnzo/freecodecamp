$(document).ready(function() {
    var city, state, country, lat, lon, zip, tempType = null;
    var skyCondition, temp_f, wind_dir, wind_mph, feelsLike_f, icon_url;
    var radar_url;
    var forecast = [];
    var day, month, date, high_temp, low_temp, weather_icon, conditions, precip_chance;
    var apiKey = "01e0f7ff17e5165b";
    var bgImages = [
        ["rainyday", "http://az616578.vo.msecnd.net/files/2016/08/13/6360670335816709561877596775_635838328234606825-1082304514_rainy_day_wallpaper_2.jpeg"],
        ["sunnyday", "http://cdn.wallpapersafari.com/9/33/vSUK86.jpg"],
        ["snowyday", "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjyqYa2-a7SAhWrhVQKHb83BKgQjRwIBw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOrAkClA4i6c&bvm=bv.148073327,d.cGw&psig=AFQjCNEUHBXJgUErtDUM1NNsjdqtP_Hq6A&ust=1488239200689156"],
        ["night", "http://cdn.pcwallart.com/images/clear-dusk-sky-wallpaper-1.jpg"]
    ];

    $.get("https://cors-anywhere.herokuapp.com/http://freegeoip.net/json/", function(data) {
        country = data.country;
        state = data.region_code;
        city = data.city;
        lat = Math.round(data.latitude);
        lon = Math.round(data.longitude);
        zip = data.zip_code;
        tempType = "F";
        $("#city").text(city + ", " + state);
        radar_url = "http://api.wunderground.com/api/" + apiKey + "/radar/q/" + state + "/" + city + ".gif?&width=320&height=320&newmaps=1";
        $("#radar").attr("src", radar_url);
        $.get("http://api.wunderground.com/api/" + apiKey + "/conditions/q/" + zip + ".json", function(data) {
            skyCondition = data.current_observation.weather;
            temp_f = data.current_observation.temp_f;
            humidity = data.current_observation.relative_humidity;
            wind_dir = data.current_observation.wind_dir;
            wind_mph = data.current_observation.wind_mph;
            feelsLike_f = data.current_observation.feelslike_f;
            icon_url = data.current_observation.icon_url;
            $("#temp").html("<h2 id='temp' onclick='changeF(this)'>Temp: " + Math.round(temp_f) + "&degF</h2>");
            $("#humid").text("Humidity: " + humidity);
            $("#condition").html("<h2 id='condition'>" + skyCondition + "<img src='' id='icon'></h2>");
            $("#wind").text("Wind: " + wind_dir + " @ " + wind_mph + " mph");
            $("#feels").html("<h2 id='feels'>Feels like: " + feelsLike_f + "&degF</h2>");
            $("#icon").attr("src", icon_url);
            $.get("http://api.wunderground.com/api/" + apiKey + "/forecast/q/" + state + "/" + city + ".json", function(fc) {
                for (var i = 0; i < 4; i++) { //iter thru 4 days and get forecast data
                    forecast[i] = fc.forecast.simpleforecast.forecastday[i];
                    day = fc.forecast.simpleforecast.forecastday[i].date.weekday_short;
                    month = fc.forecast.simpleforecast.forecastday[i].date.monthname;
                    date = fc.forecast.simpleforecast.forecastday[i].date.day;
                    high_temp = fc.forecast.simpleforecast.forecastday[i].high.fahrenheit;
                    low_temp = fc.forecast.simpleforecast.forecastday[i].low.fahrenheit;
                    precip_chance = fc.forecast.simpleforecast.forecastday[i].pop;
                    precip_amount = fc.forecast.simpleforecast.forecastday[i].qpf_allday.in;
                    weather_icon = fc.forecast.simpleforecast.forecastday[i].icon_url;
                    conditions = fc.forecast.simpleforecast.forecastday[i].conditions;
                    $("#day" + i).text(day);
                    $("#date" + i).text(month + " " + date);
                    $("#high_temp" + i).text(high_temp);
                    $("#low_temp" + i).text(low_temp);
                    $("#weather_icon" + i).attr("src", weather_icon).attr("alt", conditions);
                    $("#conditions" + i).text(conditions);
                    $("#precip_amount" + i).text(precip_amount + "in");
                    $("#precip_chance" + i).text(precip_chance + "%");
                    // alert(fc.forecast.simpleforecast.forecastday[i].icon_url);
                }
            });
        });
    });

    function f2c(temp) { //takes temp in farenheit and returns celcius
        return Math.round(((temp - 32) * 0.5556));
    }

    function c2f(temp) { //temp in celsius and return fahrenheit
        return Math.round((temp * 1.8) + 32);
    }

    $("#temp").click(function() {
        changeF();
    });

    function changeF(id) {
        if (tempType == "F") {
            var temp = f2c(temp_f);
            document.getElementById("temp").innerHTML = "Temp: " + temp + "&degC";
            tempType = "C";
            temp_f = temp;
        } else {
            var temp = c2f(temp_f);
            document.getElementById("temp").innerHTML = "Temp: " + temp + "&degF";
            tempType = "F";
            temp_f = temp;
        }
    }
});