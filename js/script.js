
'use strict';
var markers = [];
// Use Mustashe to insert array of objects as slides
var slides = [
  {
    id: 'Rysy',
    url: './images/1.png',
    slogan: 'Jobs fill your pockets, but adventures fill your soul.',
    coords: {lat: 49.179554, lng: 20.088062},
  },
  {
    id: 'Sniezka',
    url: './images/2.png',
    slogan: 'Spontaneity is the best kind of adventure',
    coords: {lat: 50.7362200, lng:  15.7403500},
  },
  {
    id: 'BabiaGora',
    url: './images/3.png',
    slogan: 'Life was meant for good friends and great adventures',
    coords: {lat: 49.574200, lng: 19.530500},
  },
  {
    id: 'Giewont',
    url: './images/4.png',
    slogan: 'Then one day, when you least expect it, the great adventure finds you.',
    coords: {lat: 49.251400, lng:  19.933701},
  },
  {
    id: 'Snieznik',
    url: './images/5.png',
    slogan: 'Adventure Awaits, Go find it.',
    coords: {lat: 50.251571, lng: 16.886471}, 
  },
]

var slideList = document.getElementById('mountain-slide-list').innerHTML;
var results = document.getElementById('carousel');
var listItems = '';

for (var i = 0; i < slides.length; i++){
  console.log(slides);
  listItems += Mustache.render(slideList, slides[i]);
}

results.insertAdjacentHTML('beforeend', listItems);

// Initialize Flickity Carousel 
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true,
});

var flkty = new Flickity( '.main-carousel', {
  // options
});

// Add custom button to restart slides
document.querySelector('#restart').addEventListener('click', function(e) {
  if(e.target === this) {
    flkty.selectCell(0);
  }
})

// Add slider progressbar
var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

// Initialize Google Maps Api
(function(){ 
  window.initMap = function() {
    
    var Rysy = slides[0].coords;
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:  7,
      center: Rysy
    });
    
    //place marker for each slide coords
    for (var i = 0; i < slides.length; i++){
        markers[i] = new google.maps.Marker({
        position: slides[i].coords,
        map: map,
      }); 

     /* 
     How to dynamically add listeners???
      markers[i].addListener('click', function(){
        console.log (i);
        flkty.selectCell(i);
      });	*/
    }
    
  }
  })();  

initMap();