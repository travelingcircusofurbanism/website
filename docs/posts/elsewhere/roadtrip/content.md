
# Visualizing My Google Location History on my cross country road-trip.

![](roadtrip01.jpg)
*Photo by anja. on Unsplash*

Recently I got to know that my phone has detailed location

At first I was a little bit surprised that there are not so many exciting personal map projects/examples out there that are based on personal location data from Google Map.

However, I managed to find some tutorials/services to create my own travel map based on Google location data, and this post is a memorandum of my creation/learning process. I also checked [some inspirational maps](https://carto.com/blog/eighty-data-visualizations-examples-using-location-data-maps/#sites) that are also based on various location data, which motivated me and pushed me forward even when I encountered some techinical problems and felt like hitting my head to a wall.

- Foreword

First of all, you can easily check [your Google Maps Timeline](https://www.google.com/maps/timeline?pb) online - you can choose the date etc and it's very fun (or creepy) to look at to begin with. However, I wanted to visualize data from certain period of time with my own design. In this case it's always better to download the data itself and use the other mapping methods/softwares such as [Carto](https://carto.com/) or [Mapbox](https://www.mapbox.com/). You can download the data easily from [here](https://takeout.google.com/settings/takeout) in JSON format.

Here are the three different ways that I tried to visualize my location data.

1. Convert JSON file to CSV, and simply throw data into [Carto](https://carto.com/)

For this method followed the steps from [this Medium post](Visualizing Your Google Location History).

  - Convert the data
  - Cleaning the data
  - Use Carto

2. Visualize Google Location History using R

I referred to [this article](https://medium.com/@tejasrr19/visualize-your-google-location-history-a2343b14a6fe)

3. Use Visit

I found a interesting service called [visits](http://v.isits.in/), in which you can simply upload your LocationHistory.json file (without conversion/cleaning!) and it creates super fun visualization for you.

![](roadtrip02)

One circule indicate one stay, meaning that the bigger the circle gets, the longer your stay were.

![](roadtrip03)

One of the cool thing about this visualization is that you can define place size (street/neighborhood/city/region etc..). For instance, you can click on one city, and see which neighborhood/street you spent more time in.

It is also connected with Flickr,

<iframe src="https://player.vimeo.com/video/97545748" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/97545748">visits- Explore the Places You Have Visited!</a> from <a href="https://vimeo.com/user18098668">Alice Thudt</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

---

There are
