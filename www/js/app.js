function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    // Listener for button
    $('#getLocationButton').on("click", getPosition);
    
    // Swip page nav
    $( document ).on( "swipeleft", "#header1", function() {
        $.mobile.changePage('#page2', { transition: "slide"} );
    });
    $( document ).on( "swiperight", "#header2", function() {
        $.mobile.changePage('#page1', { transition: "slide",
            reverse: true } );
    });
    $( document ).on( "swipeleft", "#header2", function() {
        $.mobile.changePage('#page3', { transition: "slide" } );
    });
    $( document ).on( "swiperight", "#header3", function() {
        $.mobile.changePage('#page2', { transition: "slide",
            reverse: true } );
    });
    
    // COMPASS - toggle switch to turn Geolocation.watchPosition() on/off
    $( document ).on( "change", "#flip-loc", watchPosToggle);
    


    
}
document.addEventListener("app.Ready", onAppReady, false) ;


//Call this function when you want to get the current position
function getPosition() {
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}

// stored position for debugging purposes
var permpos;

//called when the position is successfully determined
function successPosition(position) {
	permpos = position;
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	
	//lets get some stuff out of the position object
    var longitude = permpos.coords.longitude;
	var latitude = position.coords.latitude;
    var accuracy = position.coords.accuracy;
    var altitude = position.coords.altitude;
    var altacc = position.coords.altitudeAccuracy;
    var heading = position.coords.heading;
    var speed = position.coords.speed;
    
    // DATE + TIME
    // position.timestamp returuns type domTimeStamp
	var domTimeStamp = position.timestamp;
    // convert domTimeStamp to Date which browsers recognise
    var date = new Date(domTimeStamp);
    // convert to formated time string
    var time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    
   
    // Display position data
    $('#longtext').val(longitude);
	$('#lattext').val(latitude);
    
    // Display time
    $('#time').val("Recieved data at " + time);
    
    // Display extras
	$('#acctext').val(accuracy);
    $('#alttext').val(altitude);
    $('#altacctext').val(altacc);
    $('#headtext').val(heading);
    $('#speedtext').val(speed);
    
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#timeF').val("Error getting data: " + error);
	
}

//////////// COMPASS ///////////

// boolean recording if geoWatch is on or off
var geoWatchRunning = false;
// watchPosition ID returned by the current geoWatch - use to .clearWatch()
var watchID;


//var localOptions = {
//    enableHighAccuracy : true,
//		timeout : Infinity,
//		maximumAge : 0
//};

//var locationOptions = { 
//	maximumAge: 10000, 
//	timeout: 6000, 
//	enableHighAccuracy: true 
//};


//Respond to changes in location moitoring toggle switch
function watchPosToggle() {
    // if toggle true, start geoWatch, otherwise turn off
    locWatchOn = $("#flip-loc").prop("checked");
    if (locWatchOn)
        {
            startWatch();
        } else {
            stopWatch();
        }	
}

function startWatch(){
    // Set optiond
    var locationOptions = { 
        maximumAge: 10000, 
        timeout: 6000, 
        enableHighAccuracy: true 
    };
    // Set geoWatch listener and save ID
    watchID = navigator.geolocation.watchPosition(success, fail);//, locationOptions);
}


function stopWatch(){
//    if (watchID) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
//	}
    
    $('#clongtext').val("Monitoring OFF");
	$('#clattext').val("Monitoring OFF");
    // Display time
    $('#ctime').val("Monitoring OFF");
    $('#runningText').text(watchID);

}

function success(pos) {
    // get data
    var clong = pos.coords.longitude;
	var clat = pos.coords.latitude;
    // DATE + TIME
    // position.timestamp returuns type domTimeStamp
	var cdomTimeStamp = pos.timestamp;
    // convert domTimeStamp to Date which browsers recognise
    var cdate = new Date(cdomTimeStamp);
    // convert to formated time string
    var ctime = cdate.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    
    // Display position data
    $('#clongtext').val(clong);
	$('#clattext').val(clat);
    // Display time
    $('#ctime').val("Recieved data at " + ctime);

    $('#runningText').text(watchID);
}

function fail(err) {
    alert('ERROR(' + err.code + '): ' + err.message);
  console.warn('ERROR(' + err.code + '): ' + err.message);
}



