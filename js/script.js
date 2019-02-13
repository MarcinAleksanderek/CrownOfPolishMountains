
'use strict';
(function(){ 
window.initMap = function() {
  
  var uluru = {lat: 49.999, lng: 19.244};
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom:  7,
    center: uluru
  });
  
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  }); 
}
})();  


// Use Mustashe to insert array of objects as slides
var slides = [
  {
    id: 'Rysy',
    url: './images/1.png',
    slogan: 'Jobs fill your pockets, but adventures fill your soul.'
  },
  {
    id: 'Sniezka',
    url: './images/2.png',
    slogan: 'Spontaneity is the best kind of adventure'
  },
  {
    id: 'Babia_Gora',
    url: './images/3.png',
    slogan: 'Life was meant for good friends and great adventures'
  },
  {
    id: 'Giewont',
    url: './images/4.png',
    slogan: 'Then one day, when you least expect it, the great adventure finds you.'
  },
  {
    id: 'Snieznik',
    url: './images/5.png',
    slogan: 'Adventure Awaits, Go find it.'
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



var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true,
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity( '.main-carousel', {
  // options
});


document.querySelector('#restart').addEventListener('click', function(e) {
  if(e.target === this) {
    flkty.selectCell(0);
  }
})

var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

initMap();