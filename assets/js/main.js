jQuery(document).ready(function ($) {

    $.ajax({
            'method': 'GET',
            'url': 'https://api.openweathermap.org/data/2.5/forecast?lat=46.516&lon=6.633&appid=c09781f311c8060403ea712fc0fbd97f&units=metric',
            'datType': 'json'
    })
    .done(function (weatherJson) {
        active();
        let currentDt = new Date();
        let currentMonth = ("0" + (currentDt.getMonth() + 1)).slice(-2);
        let datePrinted = currentDt.getDate() + '/'+currentMonth+'/'+ currentDt.getFullYear();
        let currentMinute = ("0" + (currentDt.getMinutes())).slice(-2);
        let currentTime = currentDt.getHours() + ":" + currentMinute;

        $('.title p').append('<span class="date">'+datePrinted+'</span><span class="time">'+currentTime+'</span>');
        jQuery.each(weatherJson.list, function(i){
            let infodate = weatherJson.list[i].dt_txt.split(" ");
            let date = infodate[0];
            let time = infodate[1].split(":");
            let myTime = time[0]+':'+time[1];
            let day = ("0" + (currentDt.getDate())).slice(-2);
            let currentDate = currentDt.getFullYear()+'-'+currentMonth+'-'+day;
            let temperature = weatherJson.list[i].main.temp_max;
            let windSpeed = weatherJson.list[i].wind.speed;
            let humidity = weatherJson.list[i].main.humidity;
            temperature = temperature.toFixed(0); 
            windSpeed = windSpeed.toFixed(1);

            if(currentDate == date){
                $('main').append('<section class="weather"><div class="container"><div class="row"><div class="col-md-7"><span class="daytime-preview">'+myTime+'</span><div class="weather_image"><img src="assets/images/icons/'+ weatherJson.list[i].weather[0].icon+'.svg"></div></div><div class="col-md-5"><div class="weather_data"><p><span class="daytime">'+myTime+'</span><span class="dateInfo">'+datePrinted+'</span><span class="degrees">'+temperature+'°</span><span class="description">' + weatherJson.list[i].weather[0].description + '</span><span class="data wind">Wind: '+ windSpeed +' m/s</span><span class="data humidity">Humidity: '+humidity+'%</span></p></div></div></div></div></section>');
            } 

        });

        // Next

        let j = 0;
        let bodyIndex = $('body').attr('index');
        if(bodyIndex == 0) {
            $('.btn_previous').addClass('hide');
        }

        $('.btn_next').on('click', function () {
            
            $('.weather').remove();
            active();

            // next and prev button management
            bodyIndex++;
            if(bodyIndex == 0) {
                $('.btn_previous').addClass('hide');
            } else {
                $('.btn_previous').removeClass('hide');
            }
            if(bodyIndex == 5) {
                $('.btn_next').addClass('hide');
            } else {
                $('.btn_next').removeClass('hide');;
            }

            let tomorrow = new Date();
            j++;
            tomorrow.setDate(tomorrow.getDate()+j);
            tomorrowMonth = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
            tomorrowDay = ("0" + (tomorrow.getDate())).slice(-2);
            tomorrowYear = tomorrow.getFullYear();
            tomorrow = tomorrow.getFullYear()+'-'+tomorrowMonth+'-'+tomorrowDay;
            tomorrowPrinted = tomorrowDay + '/' + tomorrowMonth+'/' + tomorrowYear;
             
            jQuery.each(weatherJson.list, function(i){
                let infodate = weatherJson.list[i].dt_txt.split(" ");
                let date = infodate[0];
                let time = infodate[1].split(":");
                let myTime = time[0]+':'+time[1];

                let temperature = weatherJson.list[i].main.temp_max;
                let windSpeed = weatherJson.list[i].wind.speed;
                let humidity = weatherJson.list[i].main.humidity;
                temperature = temperature.toFixed(0); 
                windSpeed = windSpeed.toFixed(1);
            
                if(tomorrow == date){
                    $('main').append('<section class="weather"><div class="container"><div class="row"><div class="col-md-7"><span class="daytime-preview">'+myTime+'</span><div class="weather_image"><img src="assets/images/icons/'+ weatherJson.list[i].weather[0].icon+'.svg"></div></div><div class="col-md-5"><div class="weather_data"><p><span class="daytime">'+myTime+'</span><span class="dateInfo">'+tomorrowPrinted+'</span><span class="degrees">'+temperature+'°</span><span class="description">' + weatherJson.list[i].weather[0].description + '</span><span class="data wind">Wind: '+ windSpeed +' m/s</span><span class="data humidity">Humidity: '+humidity+'%</span></p></div></div></div></div></section>');
                } 
    
            });
        });

        // Previous
        $('.btn_previous').on('click', function () {

            $('.weather').remove();
            active();

            // next and prev button management
            bodyIndex--;
            if(bodyIndex == 0) {
                $('.btn_previous').addClass('hide');
            } else {
                $('.btn_previous').removeClass('hide');
            }
            if(bodyIndex == 4) {
                $('.btn_next').addClass('hide');
            } else {
                $('.btn_next').removeClass('hide');
            }

            let yesterday = new Date();
            j--;
            yesterday.setDate(yesterday.getDate()+j);
            yesterdayMonth = ("0" + (yesterday.getMonth() + 1)).slice(-2);
            yesterdayDay = ("0" + (yesterday.getDate())).slice(-2);
            yesterdayYear = yesterday.getFullYear();
            yesterday = yesterday.getFullYear()+'-'+yesterdayMonth+'-'+yesterdayDay;
            yesterdayPrinted = yesterdayDay + '/' + yesterdayMonth+'/' + yesterdayYear;
            

            jQuery.each(weatherJson.list, function(i){
                let infodate = weatherJson.list[i].dt_txt.split(" ");
                let date = infodate[0];
                let time = infodate[1].split(":");
                let myTime = time[0]+':'+time[1];

                let temperature = weatherJson.list[i].main.temp_max;
                let windSpeed = weatherJson.list[i].wind.speed;
                let humidity = weatherJson.list[i].main.humidity;
                temperature = temperature.toFixed(0); 
                windSpeed = windSpeed.toFixed(1);
            
                if(yesterday == date){
                    $('main').append('<section class="weather"><div class="container"><div class="row"><div class="col-md-7"><span class="daytime-preview">'+myTime+'</span><div class="weather_image"><img src="assets/images/icons/'+ weatherJson.list[i].weather[0].icon+'.svg"></div></div><div class="col-md-5"><div class="weather_data"><p><span class="daytime">'+myTime+'</span><span class="dateInfo">'+yesterdayPrinted+'</span><span class="degrees">'+temperature+'°</span><span class="description">' + weatherJson.list[i].weather[0].description + '</span><span class="data wind">Wind: '+ windSpeed +' m/s</span><span class="data humidity">Humidity: '+humidity+'%</span></p></div></div></div></div></section>');
                    
                } 
    
            });
        });

    });

    function active() {

        setTimeout(function(){
            $('.weather:first-child').addClass('active');
            $('.weather').on('click', function (e) {
                e.preventDefault();
                $('.weather').removeClass('active');
                $(this).toggleClass('active');
            });
        },100);
    }


    // Don't you like the color palette? Try random colors!
    /*
    $( document ).on( "ajaxComplete", function() {
        $('.weather').each(function(){
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            if (randomColor === "ffffff") {
                randomColor = Math.floor(Math.random() * 16777215).toString(16);
                }
            $(this).css('background', '#'+randomColor);
        })
    } );
    */

});
