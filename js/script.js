
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