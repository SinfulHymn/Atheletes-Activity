let accessToken
const activitiesAPI = " https://www.strava.com/api/v3/athlete/activities?access_token=e66fdd367ede0cb7b55ef6812d22ad39a35a6ab6"

getActivities = () => {
    $.ajax({
        url: activitiesAPI
    }).then(data => {
        console.log(data)
    })

}
getActivities2 = () => {
    fetch(activitiesAPI)
        .then(data => console.log(data.json()))
}

getActivities2()
getActivities()

// $.ajax({
//     url: `https://api.nasa.gov/planetary/apod?api_key=${nasaAPI}&date=2022-03-22`
// }).then(data => {
//     // console.log(data)
//     const $img = $("<img id=apod>")
//     $img.attr("src", data.url)
//     $img.attr("alt", data.title)
//     $img.appendTo(".image-container")
//     $('#title').text(data.title)
//     $('#explanation').text(data.explanation)    
//     $('#copyright').text(data.copyright)
//     $('#date').text(data.date)
// }).catch( error =>{
//     console.log(error)
// })