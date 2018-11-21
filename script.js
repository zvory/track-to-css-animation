const video = document.getElementById('myVideo');
const track = document.getElementById('track')
const time = document.getElementById('time')
const loading = document.getElementById('loading')
const loc = document.getElementById('loading')

//simpleweather
/*! simpleWeather v3.1.0 - http://simpleweatherjs.com */
!function(t){"use strict";function e(t,e){return"f"===t?Math.round(5/9*(e-32)):Math.round(1.8*e+32)}t.extend({simpleWeather:function(i){i=t.extend({location:"",woeid:"",unit:"f",success:function(t){},error:function(t){}},i);var o=new Date,n="https://query.yahooapis.com/v1/public/yql?format=json&rnd="+o.getFullYear()+o.getMonth()+o.getDay()+o.getHours()+"&diagnostics=true&callback=?&q=";if(""!==i.location){var r="";r=/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(i.location)?"("+i.location+")":i.location,n+='select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+r+'") and u="'+i.unit+'"'}else{if(""===i.woeid)return i.error("Could not retrieve weather due to an invalid location."),!1;n+="select * from weather.forecast where woeid="+i.woeid+' and u="'+i.unit+'"'}return t.getJSON(encodeURI(n),function(t){if(null!==t&&null!==t.query&&null!==t.query.results&&"Yahoo! Weather Error"!==t.query.results.channel.description){var o,n=t.query.results.channel,r={},s=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],a="https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";r.title=n.item.title,r.temp=n.item.condition.temp,r.code=n.item.condition.code,r.todayCode=n.item.forecast[0].code,r.currently=n.item.condition.text,r.high=n.item.forecast[0].high,r.low=n.item.forecast[0].low,r.text=n.item.forecast[0].text,r.humidity=n.atmosphere.humidity,r.pressure=n.atmosphere.pressure,r.rising=n.atmosphere.rising,r.visibility=n.atmosphere.visibility,r.sunrise=n.astronomy.sunrise,r.sunset=n.astronomy.sunset,r.description=n.item.description,r.city=n.location.city,r.country=n.location.country,r.region=n.location.region,r.updated=n.item.pubDate,r.link=n.item.link,r.units={temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed},r.wind={chill:n.wind.chill,direction:s[Math.round(n.wind.direction/22.5)],speed:n.wind.speed},n.item.condition.temp<80&&n.atmosphere.humidity<40?r.heatindex=-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2):r.heatindex=n.item.condition.temp,"3200"==n.item.condition.code?(r.thumbnail=a,r.image=a):(r.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"ds.png",r.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"d.png"),r.alt={temp:e(i.unit,n.item.condition.temp),high:e(i.unit,n.item.forecast[0].high),low:e(i.unit,n.item.forecast[0].low)},"f"===i.unit?r.alt.unit="c":r.alt.unit="f",r.forecast=[];for(var m=0;m<n.item.forecast.length;m++)o=n.item.forecast[m],o.alt={high:e(i.unit,n.item.forecast[m].high),low:e(i.unit,n.item.forecast[m].low)},"3200"==n.item.forecast[m].code?(o.thumbnail=a,o.image=a):(o.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"ds.png",o.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"d.png"),r.forecast.push(o);i.success(r)}else i.error("There was a problem retrieving the latest weather information.")}),this}})}(jQuery);

const start = () => {
    loading.style.display = 'none'
    video.play()
    video.currentTime = 0
}

video.addEventListener('loadeddata', function() {
    setTimeout(start, 0)
 }, false);



// stolen from https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript/339033#339033
function adj(m) { // Compute the adjugate of m
    return [
        m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
        m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
        m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
    ];
}
function multmm(a, b) { // multiply two matrices
    var c = Array(9);
    for (var i = 0; i != 3; ++i) {
        for (var j = 0; j != 3; ++j) {
            var cij = 0;
            for (var k = 0; k != 3; ++k) {
                cij += a[3*i + k]*b[3*k + j];
            }
            c[3*i + j] = cij;
        }
    }
    return c;
}
function multmv(m, v) { // multiply matrix and vector
    return [
        m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
        m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
        m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
    ];
}
function pdbg(m, v) {
    var r = multmv(m, v);
    return r + " (" + r[0]/r[2] + ", " + r[1]/r[2] + ")";
}
function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
    var m = [
        x1, x2, x3,
        y1, y2, y3,
        1,  1,  1
    ];
    var v = multmv(adj(m), [x4, y4, 1]);
    return multmm(m, [
        v[0], 0, 0,
        0, v[1], 0,
        0, 0, v[2]
    ]);
}
function general2DProjection(
    x1s, y1s, x1d, y1d,
    x2s, y2s, x2d, y2d,
    x3s, y3s, x3d, y3d,
    x4s, y4s, x4d, y4d
) {
    var s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
    var d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
    return multmm(d, adj(s));
}
function project(m, x, y) {
    var v = multmv(m, [x, y, 1]);
    return [v[0]/v[2], v[1]/v[2]];
}
function transform2d(elt, x1, y1, x2, y2, x3, y3, x4, y4) {
    var w = elt.offsetWidth, h = elt.offsetHeight;
    var t = general2DProjection
    (0, 0, x1, y1, w, 0, x2, y2, 0, h, x3, y3, w, h, x4, y4);
    for(i = 0; i != 9; ++i) t[i] = t[i]/t[8];
    t = [t[0], t[3], 0, t[6],
    t[1], t[4], 0, t[7],
    0   , 0   , 1, 0   ,
    t[2], t[5], 0, t[8]];
    t = "matrix3d(" + t.join(", ") + ")";
    // console.log(t)
    elt.style["-webkit-transform"] = t;
    elt.style["-moz-transform"] = t;
    elt.style["-o-transform"] = t;
    elt.style.transform = t;
}

const binarySearchFirstLargestElement = (target, arr) => {
    let low = 0, high = arr.length; // numElems is the size of the array i.e arr.size() 
    while (low != high) {
        let mid = Math.floor((low + high) / 2); // Or a fancy way to avoid int overflow
        if (arr[mid][0] <= target) {
            /* This index, and everything below it, must not be the first element
             * greater than what we're looking for because this element is no greater
             * than the element.
             */
            low = mid + 1;
        }
        else {
            /* This element is at least as large as the element, so anything after it can't
             * be the first element that's at least as large.
             */
            high = mid;
        }
    }
    /* Now, low and high both point to the element in question. */
    return arr[low]
}

var timer = function(name) {
    var start = performance.now();
    return {
        stop: function() {
            var end  = performance.now();
            var time = end - start;
            // console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};


const setTrackPos = ()=> {
    const t = timer('setTrackPos');
  
    const time = video.currentTime
    const length = video.duration

    const portionThrough = time/length;

    // const first = trackArr.find(elt => elt[0] >= portionThrough)
    const first = binarySearchFirstLargestElement(portionThrough, trackArr)

    if (first === undefined) {
        // console.log('first is undefined', time, length, portionThrough)
    } else {
        const w =window.innerWidth
        const h =window.innerHeight
        const corners = first.slice(1)
        // transform2d(track, (corners[0]+0.17)*w, corners[1]*h, (0.17+corners[2])*w, corners[3]*h,
        // (0.2+corners[4])*w, corners[5]*h, (0.2+corners[6])*w, corners[7]*h);
    
        transform2d(track, (corners[0]+0)*w, corners[1]*h, (0+corners[2])*w, corners[3]*h,
        (0+corners[4])*w, corners[5]*h, (0+corners[6])*w, corners[7]*h);
    
    }
    t.stop(); // prints the time elapsed to the js console
}

setInterval(setTrackPos, 1)


const setTime = () => {
    time.innerHTML = new Date().toLocaleTimeString()
}

setInterval(setTime, 10)

// Docs at http://simpleweatherjs.com



/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
    $('.js-geolocation').show(); 
  } else {
    $('.js-geolocation').hide();
  }
  
  /* Where in the world are you? */
  $('.js-geolocation').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
    });
  });
  
  /* 
  * Test Locations
  * Austin lat/long: 30.2676,-97.74298
  * Austin WOEID: 2357536
  */
  $(document).ready(function() {

    loadWeather('New York City',''); //@params location, woeid
  });
  
  function loadWeather(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: function(weather) {
        html = `In ${weather.city}, ${weather.region} it is:`
        html += '<div> <i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+' and '+ weather.currently+'</div>';
        // html += '<div class="currently"> '+weather.currently+'</div>';
        
        $("#weather").html(html);
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    });
  }
  