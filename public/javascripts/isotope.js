// external js: isotope.pkgd.js
var Fetched_User_Data = false;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});



// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});


function getMaData() {
	if (Fetched_User_Data === false){
	var inputData = $.ajax({
        type: 'get',
        url: 'http://localhost:3000/workers',
		async: false
    }).responseJSON;
	
	//for(var k in inputData) {
   //console.log(k, inputData[k]);
	//}
  
  
  //  inputData.length --->>>>> Anzahl der ELemente des zurückgegebenen JSON Arrays
  
  for (var k = 0; k < inputData.length; k++) {
	   var $items = getItemElement(inputData[k].name,inputData[k].gender,inputData[k].role,inputData[k].contract,inputData[k].credit,inputData[k].vacationState,inputData[k].illnessState);
	   console.log(inputData[k])
  // insert new elements
  $grid.isotope( 'insert', $items ); 
  }
  

 Fetched_User_Data = true;
	}
};

// make <div class="grid-item grid-item--width# grid-item--height#" />
function getItemElement(name, gender, role, contract,credit, vacationState, illnessState) {
  var $item = $('<div class="element-item" style="background-image: url(../media/ma_avatars/user1.jpg); background-size: 150px 193px; background-repeat: no-repeat;"></div>');
    $item.addClass( gender );
  // add random number
  $item.append( '<p class="name">' + name + '</p>' );
  $item.append( '<p class="gender">' + gender + '</p>' );
  $item.append( '<p class="role">' + role + '</p>' );
  $item.append( '<p class="contract">' + contract + '</p>' );
  $item.append( '<p class="credit">' + credit + '</p>' );
  $item.append( '<p class="vacationState">' + vacationState + '</p>' );
  $item.append( '<p class="illnessState">' + illnessState + '</p>' );
  
  return $item;
}
