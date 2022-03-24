let accessToken,
    accessToken1 = "ff3dc6a967c906ba06d917aa822e1fd711d44e8a",
    refreshToken = "",
    userID = ""

const allActivitiesAPI = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken1}`
const activityAPI = ""
const reAuthAPI = "https://www.strava.com/oauth/token?client_id=80013&client_secret=4c3e0e3af32ed51d86a5c7e045fb4fe4422387e9&refresh_token=82366156b53f4a94b0e25147c8ab47c73e2573e7&grant_type=refresh_token"


// since the access toke expires I am making sure i always get a new valid access token 
// make this into a post request 
// uses refreshToken to get new accessToken
reAuthToken = () => {
    $.post({
        url: reAuthAPI
    }).then(data =>{
        //console.log(data.access_token)
        console.log(data)
        //console.log(data.expires_at)
        //console.log(typeof(data.expires_at))
        console.log(convertEpoch(data.expires_at))
        
    })
}

//api request that get all activites
getAllActivities = () => {
    $.get({
        url: allActivitiesAPI
    }).then(data => {
        console.log(data)
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
getAllActivities()

// make the box hover at the start, add the link from the start to allow the user to login and then his data will then propagate on the page .

