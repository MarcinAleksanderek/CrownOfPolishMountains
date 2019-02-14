
'use strict';
var markers = [];
//map variable requires to be declared globaly so the other functions could access it
var map;

// Use Mustashe to insert array of objects as slides
var slides = [
  { 
    id: 'Snieznik',
    url: './images/5.png',
    slogan: 'Adventure Awaits, Go find it.',
    coords: {lat: 50.251571, lng: 16.886471}, 
  },
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
    var Snieznik = slides[0].coords;
    
    map = new google.maps.Map(document.getElementById('map'), {
      zoom:  6,
      center: Snieznik
    });
   
    for (let i = 0; i < slides.length; i++) {
      var marker = new google.maps.Marker({ position: slides[i].coords, map: map });
      marker.addListener('click', function () {
        flkty.select(i);
      });
    }

    map.panTo(Snieznik);
		map.setZoom(6);
  }
  })();

function	smoothPanAndZoom (map, zoom, coords){
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
    jumpZoom = Math.max(jumpZoom, 3);
    
		smoothZoom(map, jumpZoom, function(){
			smoothPan(map, coords, function(){ 
				smoothZoom(map, zoom); 
			});
		});
	};

var smoothPanAndZoom = function(map, zoom, coords){
  var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
  jumpZoom = Math.min(jumpZoom, zoom -1);
  jumpZoom = Math.max(jumpZoom, 3);

  smoothZoom(map, jumpZoom, function(){
    smoothPan(map, coords, function(){
      smoothZoom(map, zoom); 
    });
  });
};

var smoothZoom = function(map, zoom, callback) {
  var startingZoom = map.getZoom();
  var steps = Math.abs(startingZoom - zoom);
  
  if(!steps) {
    if(callback) {
      callback();
    }
    return;
  }

  var stepChange = - (startingZoom - zoom) / steps;

  var i = 0;
  var timer = window.setInterval(function(){
    if(++i >= steps) {
      window.clearInterval(timer);
      if(callback) {
        callback();
      }
    }
    map.setZoom(Math.round(startingZoom + stepChange * i));
  }, 80);
};

var smoothPan = function(map, coords, callback) {
  var mapCenter = map.getCenter();
  coords = new google.maps.LatLng(coords);

  var steps = 12;
  var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

  var i = 0;
  var timer = window.setInterval(function(){
    if(++i >= steps) {
      window.clearInterval(timer);
      if(callback) callback();
    }
    map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
  }, 1000/30);
};

flkty.on( 'change', function( index ) {
  console.log('Flickity change ' + index );
  smoothPanAndZoom(map, 7, slides[index].coords);
});