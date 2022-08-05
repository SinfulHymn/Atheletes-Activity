//first make sure token is authorized to be able to access strava
// since the access token expires I am making sure i always get a new valid access token 
// make this into a post request 
// uses refreshToken to get new accessToken
function reAuthToken(){
    const reAuthAPI = "https://www.strava.com/oauth/token?client_id=80013&client_secret=4c3e0e3af32ed51d86a5c7e045fb4fe4422387e9&refresh_token=82366156b53f4a94b0e25147c8ab47c73e2573e7&grant_type=refresh_token"

    $.post({
        url: reAuthAPI
    }).then(data =>{
        const accessToken = data.access_token
         //console.log(data.access_token)
        // console.log(data)
        console.log(`${convertEpoch(data.expires_at)} : ${data.access_token}`)
        //pipe access_token to get all activities
        getAllActivities(accessToken)
        getActivity(accessToken)
    })
}

//api request that get all activites from strava
function getAllActivities(access_token){
    let url =`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`
    // getRequest(allActivitiesLink)
    $.get({
        url: url
    }).then(data =>{
        // console.log('getall activities',data)
        // const polyline = 
        
        dataRender(data[0]) 
    })
}
// get the single activity I am focusing on 
function getActivity(access_token){
    let url = `https://www.strava.com/api/v3/activities/6867917209?access_token=${access_token}`
    $.get({
        url: url
    }).then(data =>{
        // console.log(data)
        //console.log(data.splits_standard)
        const splits = data.splits_standard
        // console.log(splits)
        milesRender(splits)
        titleDataRender(data)
        avgData(data)
        let polyline = data.map.polyline
        // console.log('polyline', polyline)
        mapRender(polyline) 
    })

    
}

//continue working on attributes and changing map color
function mapRender(polyline){
    var map = L.map('map',{
        center: [34.07579760955182, -118.36575474764047],
        zoom: 12,
        zoomSnap: .1,
        zoomDelta: .4,
        wheelPxPerZoomLevel: 400,
        
    })
    // console.log(map)
    
    L.marker([34.07579760955182, -118.36575474764047]).addTo(map)

    
    //array of coordinate of the miles
    // console.log(coordinates)

    // mapbox://styles/kmachappy/cl162wrgb001615o2i6699d2y
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia21hY2hhcHB5IiwiYSI6ImNsMTYyY2RhODA1MnAzYm13eW1vNGlqa3oifQ.u34CHpBVa9Nk_584VZlDjA'
    }).addTo(map);

    L.polyline(
        L.Polyline.fromEncoded(polyline).getLatLngs(),
        {
            color: "green",
            weight: 5,
            opacity: .7,
            lineJoin: 'round'
        }       
    ).addTo(map)
}

// render data[0] onto document doesn't contain all activity details 
// all activities seems to not put all data by default like activity by id

function dataRender(data0){
    // console.log(data0)
    $('#marathon-title').text(data0.name)
    const miles = convertToMiles(data0.distance).toFixed(2)
    $('#main-data-row1').html(`<span id=total-distance>Distance: ${miles}mi`)
   
    let elapsedTime = new Date(data0.elapsed_time * 1000).toISOString().substr(12, 8)
    // console.log(elapsedTime)
    // $('#main-data-row1').html(`<span id=elapsed-time> Elapsed Time: ${elapsedTime}`)
    // to be able to add another element to the same div I need to append it.
    //create the elements, give element content, then append to div
    const $date = $('<span id=elapsed-time>')
    $date.text(` Elapsed Time: ${elapsedTime}`)
    $('#main-data-row1').append($date)
}
function milesRender(splits){
    
    
    const table = $('table')
    const thead = $('<thead>')
    table.append(thead)
    const mile = $('<th>Mile: </th>')
    thead.append(mile)
    const pace = $('<th>Pace: min/mi</th>')
    thead.append(pace)
    const heartrate = $('<th>HeartRate: BPM</th>')
    thead.append(heartrate)
    const speed = $('<th>Speed: mph</th>')
    thead.append(speed)

    const tbody = $('<tbody id="splits"></tbody>')
    table.append(tbody)
    
    const splitsContainer = $('#splits')
    //make a for loop that will append all mile splits
    splits.forEach((mile, index) => {
        const spanMile = $(`<tr class=mile-split>`)
        let elapsedTime = new Date(mile.elapsed_time * 1000).toISOString().substr(14, 5)

        let mph = mpsToMph(mile.average_speed)

        spanMile.html(`<td class="mile-split-data">${mile.split}</td> <td class="mile-split-data">${elapsedTime}/mi </td> <td class="mile-split-data">${(mile.average_heartrate).toFixed(0)}/bpm </td> <td class="mile-split-data">${mph.toFixed(2)}/mph</td>`)
        splitsContainer.append(spanMile)
    })
}
function titleDataRender(data){
    // console.log(data)
    $('#marathon-subtitle').text(data.description)
    $('#splits-title').text('Miles Splits')
}

function avgData(data){
    // console.log(data)
    const leftColm = $('.left-col-container')
    const totalMile = convertToMiles(data.distance).toFixed(2)
    const $name = $(`<div class="left-data left-name">Name: ${data.name}</div>`)
    leftColm.append($name)
    let elapsedTime = new Date(data.elapsed_time * 1000).toISOString().substr(12,8)
    const $time = $(`<div class="left-data left-time">Total Time: ${elapsedTime}</div>`)
    leftColm.append($time)
    const $distance = $(`<div class="left-data left-dist">Total Distance: ${totalMile}/mi</div>`)
    leftColm.append($distance)
    const $calories = $(`<div class="left-data left-calories">Total Calories: ${data.calories}/cal</div>`)
    leftColm.append($calories)
    const $heartRate = $(`<div class="left-data left-heart">Avg Heart Rate: ${data.average_heartrate.toFixed(0)}/bpm</div>`)
    leftColm.append($heartRate)
    const avgmph = mpsToMph(data.average_speed).toFixed(2)
    const $speed = $(`<div class="left-data left-speed">Avg Speed: ${avgmph}/mph</div>`)
    leftColm.append($speed)
    const feet = metersToFeet(data.elev_high).toFixed(2)
    const $highElev = $(`<div class="left-data left-highelev">Highest Elevation: ${feet}/ft </div>`)
    leftColm.append($highElev)
    const $maxheart = $(`<div class="left-data left-maxheart">Max Heart Rate: ${data.max_heartrate}/bpm</div>`)
    leftColm.append($maxheart)
    const maxmph = mpsToMph(data.max_speed).toFixed(2)
    const $maxspeed = $(`<div class="left-data left-maxspped">Max Speed: ${maxmph}/mph</div>`)
    leftColm.append($maxspeed)
    const $device = $(`<div class="left-data left-device">Device Used: ${data.device_name}</div>`)
    leftColm.append($device)


    // const $
    // leftColm.text('test')
}


//how to split the data from both apis here
//ajax request from getAllActivities data

function getRequest(url){
    $.get({
        url: url
    }).then(data =>{
        // console.log(data)
        //console.log(data[0].map.summary_polyline)
        // loop through all objects in array to list all runs and data
        // data.forEach((Element, index) => {
        //     console.log(index)
        // })
        console.log(data)
        mapRender(data[0].map.summary_polyline) 
        dataRender(data[0])
        // return data
        
    })
}









/////////////////////////
// conversion functions
/////////////////////////
// converts epoch timestamp to a human readable timestamp

function convertEpoch(epochTimeStamp){
    let dateToMilli = new Date(epochTimeStamp*1000),
    year = dateToMilli.getFullYear(),
    month = ('0' + (dateToMilli.getMonth() + 1)).slice(-2),
    day = ('0' + dateToMilli.getDate()).slice(-2),
    hours = dateToMilli.getHours(),
    hour = hours,
    minute = ('0' + dateToMilli.getMinutes()).slice(-2)
    ampm = 'AM',
    timeStamp = ""

    if(hours > 12){
        hour = hours -12
        ampm = 'PM'
    } else if(hours == 12){
        hour = 12
        ampm = 'PM'
    }else if(hours == 0){
        hour = 12
    }

    timeStamp = `Token Expires at: ${year}-${month}-${day}, ${hour}:${minute} ${ampm}`
    
    return timeStamp            
}
convertToMiles = meters => meters*0.000621371192
metersToFeet = meters => meters*3.2808
mpsToMph = mps => Math.round(mps * 3600 / 1610.3*1000)/1000
secondsToTime = seconds => {
    let date = new Date(seconds * 1000).toISOString().substr(11, 8)
    return date
}
/////////////////////////
// conversion functions
/////////////////////////

reAuthToken()
// make the box hover at the start, add the link from the start to allow the user to login and then his data will then propagate on the page .

////////////////////////////
// questions
////////////////////////////
// ask how to make my convert secondstoTime function to work 