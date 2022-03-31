
<br />
<div align="center">
  <a href="https://kmachappy.github.io/">
    <img src="https://i.imgur.com/HEdvaxd.png" alt="Logo" width="200" height="80">
  </a>

<h3 align="center">Athletes Activity Page</h3>
  
  <p align="center">
    View all your Athelitic Activity in just one page!
    <br />
    <a href="https://kmachappy.github.io/"><strong>Live Website - Marathon View</strong></a>
    <br />
    <a href="https://developers.strava.com/">Strava API</a>
    ·
    <a href="https://leafletjs.com/SlavaUkraini/reference.html">Leaflet API</a>
    ·
    <a href="https://docs.mapbox.com/">Mapbox API</a>
  </p>
</div>

# About
<div align="center">
    <a href="https://github.com/othneildrew/Best-README-Template">
        <img src="https://i.imgur.com/HGX8twB.png" alt="Logo" width="600" height="400">
    </a>
</div>

# Goal and what this tries to achieve
- Athelets today do not have a centralized site to view their Atheletic activities from runs, cycling and swimming. Today Atheletes depend on their phone to view their activities, that are tracked by a plethora of activity tracking apps such as Strava, Nike - Run Club, Asics - RunKeeper, UnderArmor - Map my Run, AllTrails, ect. 

- The goal of this page is to gather data from all activity trackers and compile all the information into one webpage. Information from Strava, Nike - Run Club, Asics - RunKeeper, UnderArmor - Map my Run, AllTrails, ect. 

<p align="right">(<a href="#top">back to top</a>)</p>


# Current State

- In this app we will get a singular athelete user data and display data on page and map api. We use my data for the example

- Because strava doesn't use a standard api key and follow oauth2 and tokens for api calls. I had to write a function refreshed my access_key which expires every 6 hours
    
- To do this we will be utilizing the strava api app to get user activity data 
    
- hardships of api oauth2 authentication code and authorizations, tokens and token refresh
    - I have to generate authorization code from an oauth2 authorization page
<div align="center">
    <a href="https://www.strava.com/oauth/authorize?client_id=80013&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read_all">
        <img src="https://i.imgur.com/wMGwQUp.png" alt="Logo" width="250" height="250">
    </a>
</div>

- With the authorization page we mimic as if we were logging into an app that will use our authorization login 

- Once this authorization is done, users will be able to see activities with map data and a poly line of the specific data

- user will be able to see their average data points and highest data point
    - avg hr, avg pace, avg run, best miles, longest milage, 

- Atheletes need an easy to access website to view their atheletic activities across different plateforms and their visualization.
<p align="right">(<a href="#top">back to top</a>)</p>



# Reference Activity I am displaying. 
 - https://www.strava.com/activities/6867917209


 # API's used
 - **[Strava API](https://developers.strava.com/)**.
 - **[Leaflet API](https://leafletjs.com/SlavaUkraini/)**.
 - **[mapbox API](https://leafletjs.com/SlavaUkraini/)**.

 # Technologies used 
 - OAuth2 for authorization and token refresh
 - Javascript
 - HTML
 - CSS
 

# Resources 
- https://developers.strava.com/
- https://developers.strava.com/docs/getting-started/
- https://leafletjs.com/SlavaUkraini/reference.html
- https://www.strava.com/oauth/authorize?client_id=80013&redirect_uri=http://localhost&response_type=code&scope=activity:read_all


# Roadmap and future Implementations

- add authorization page so the user could import their peronal data on to the page
- add poly line to all user activities
- Create a roadmap of all the miles onto the map.
    - When user hovers/clicks a mile or activity it will highlight and zoom onto location on map
- add more data points from different apps
- change user interface.
- In progress: users will be able to login and authorize strava to allow me to use and propagated their own use data
- add more map styling and interactiveness


# User Story

- You just finished your marathon, run, or any activity and imported your data on strava. 
- now you want to see your data on a page 
- you click my Athelets views and authorize Atheletes view to connect to strave
- once that authorization is done your activity data propagates on the page
- 
