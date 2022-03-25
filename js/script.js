let accessToken2,
    accessToken1 = "ff3dc6a967c906ba06d917aa822e1fd711d44e8a",
    refreshToken = "",
    client_id = "80013"

const allActivitiesAPI = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken1}`
const activityAPI = ""
const reAuthAPI = "https://www.strava.com/oauth/token?client_id=80013&client_secret=4c3e0e3af32ed51d86a5c7e045fb4fe4422387e9&refresh_token=82366156b53f4a94b0e25147c8ab47c73e2573e7&grant_type=refresh_token"




getRequest = url =>{
    $.get({
        url: url
    }).then(data =>{
        console.log(data)
        var map = L.map('map').setView([51.505, -0.09], 13);
        var marker = L.marker([51.5, -0.09]).addTo(map);
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoia21hY2hhcHB5IiwiYSI6ImNsMTYyY2RhODA1MnAzYm13eW1vNGlqa3oifQ.u34CHpBVa9Nk_584VZlDjA'
        }).addTo(map);
    })
}

//api request that get all activites
getAllActivities = access_token => {
    let allActivitiesLink =`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`
    getRequest(allActivitiesLink)
}
getActivity = access_token => {
    let activityLink = ``
}


// since the access toke expires I am making sure i always get a new valid access token 
// make this into a post request 
// uses refreshToken to get new accessToken
reAuthToken = () => {
    $.post({
        url: reAuthAPI
    }).then(data =>{
         console.log(data.access_token)
        // console.log(data)
        console.log(convertEpoch(data.expires_at))
        //pipe access_token to get all activities
        getAllActivities(data.access_token)
        
    })
}

// converts epoch timestamp to a human readable timestamp
convertEpoch = epochTimeStamp =>{
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

// getActivity= () => {
//     $.ajax({
//         url: 
//     })
// }






reAuthToken()
// getAllActivities()

// make the box hover at the start, add the link from the start to allow the user to login and then his data will then propagate on the page .

