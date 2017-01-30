// external js: isotope.pkgd.js
var Fetched_User_Data = false;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    startDate: '.startDate parseInt',
    endDate: '.endDate parseInt',
    vacation: '.vacation parseInt',
    illness: '.illness parseInt',
    contract: '.contract',
    illnessState: '.illnessState',
    vacationState: '.vacationState'
    
    
  }
});



// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var ist = $(this).find('.credit').text();
    var soll =$(this).find('.debit').text();
      console.log("Berechnung: "+ist>soll/2);
    return parseFloat(ist, 10) < (soll/2);
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
	   var $items = getItemElement(inputData[k].username,inputData[k].name,inputData[k].gender,inputData[k].role,inputData[k].contract,inputData[k].credit,inputData[k].debit,inputData[k].vacationState,inputData[k].illnessState,inputData[k].startDate,inputData[k].endDate,inputData[k].vacation,inputData[k].illness);
	   console.log(inputData[k])
  // insert new elements
  $grid.isotope( 'insert', $items ); 
  }
   Fetched_User_Data = true;
	}
};

function getItemElement(username, name, gender, role, contract,credit, debit, vacationState, illnessState, startDate, endDate, vacation, illness) {
  var $item = $('<div class="element-item" style="background-image: url(../media/ma_avatars/noPic_user.png); background-size: 150px 193px; background-repeat: no-repeat;"></div>');
    $item.addClass( gender );
    if(contract === "befristet"){
       $item.addClass( "contract" ); 
    }
    if(illnessState === true){
      $item.addClass( "illnessState" );  
    }
    if(vacationState === true){
      $item.addClass( "vacationState" );  
    }
    
    
    
  // add random number
  console.log(name);
  $item.append( '<p class="name">' + name + '</p>' );
  //$item.append( '<p class="gender">' + gender + '</p>' );
  $item.append( '<p class="role">' + role + '</p>' );
  
  if (contract === "befristet"){
	$item.append( '<p class="contract">' + contract + "  " + getReadableDate(endDate) + '</p>' );  
  }
  else{
	 $item.append( '<p class="contract">' + contract + '</p>' ); 
  }
  $item.append( '<p class="credit">' + getReadableHours(credit) + '</p>' );
  $item.append( '<p class="debit">' + debit + '</p>' );
    
  $item.append( '<p class="startDate">' + getReadableDate(startDate) + '</p>' );
  $item.append( '<p class="endDate">' + getReadableDate(endDate) + '</p>' );
  $item.append( '<p class="vacation">' + vacation + '</p>' );
  $item.append( '<p class="illness">' + illness + '</p>' );
  $item.append( '<p class ="delete"><input type="submit" class="btn btn-primary active" autocomplete="off" name="l&ouml;schen" id="l&ouml;schen" value="l&ouml;schen"></p>');
    
  if (vacationState != true && illnessState != true){
	  $item.append( '<p class="vacationState">' + "Verf&uuml;gbar" + '</p>' );  
  }
  else
  {
	$item.append( '<p class="vacationState">' + "im Urlaub" + '</p>' ); 
  }
  if (illnessState === true){
  $item.append( '<p class="illnessState">' + "Krank" + '</p>' );
  }
  return $item;
}
