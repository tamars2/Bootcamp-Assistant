
var dataStore; 
var bcaCurrentUser;

function connedtToDatabase()
{ 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqfTnrMLjnNr5VPR28AHSDfwbXNhPhMYY",
    authDomain: "bootcampstuff-c6ecb.firebaseapp.com",
    databaseURL: "https://bootcampstuff-c6ecb.firebaseio.com",
    storageBucket: "bootcampstuff-c6ecb.appspot.com",
    messagingSenderId: "632661052823"
  };
  firebase.initializeApp(config);	
	database = firebase.database();	

  return database;
}

function verifyDataEntry()
{
	data = new userPreferenceEntry();
	if (data.newUser == "new")
	{
		if (data.email != data.confirmEmail )
		{
			return false;
		}
		if (data.name.length<1)
		{
			return false;
		}
	}
	if (data.email.length<4)
	{
		return false;
	}
}
// Called from the menu bar this opens the login screen
function editUserPreference()
{
  dataStore = connedtToDatabase();
	addEventHandlers();
  $("#form-dialog").modal("toggle");
}

// strip out unsupported characters
// replace with placeholders
function getUserPath(a)
{
	return a.split('.').join('-');
}
function loadUserFromDB(userid)
{

	dataStore.ref('/users/' + userid).once('value').then(function(snapshot) {
	bcaCurrentUser = snapshot.val();
	});
}
function addNewuserToDB(newUserPref)
{
  // set path to useremail
  var  userPath = getUserPath(newUserPref.email);
     
  // save the user data 
  dataStore.ref('users/' + userPath).set(newUserPref); 
}

// Pulls the data entered unto the user login screen and places into an objcet
function userPreferenceEntry()
{	
  this.newUser = $("#bca-user-login").attr("data-bca-user-type");
  this.name = $("#bca-userpref-name").val().trim();
  this.email = $("#bca-userpref-username").val().trim();
	this.confirmEmail = $("#bca-userpref-emailid").val().trim();
  this.zipCode = $("#bca-zipcode").val().trim();
}

// Submits the NewUser infotmation to the database 
function submitUIPrefdata()
{
	var userPref = new userPreferenceEntry();
	if (userPref.newUser == "new")
	{
		userPref.newUser = "returning";
		addNewuserToDB(userPref);
		bcaCurrentUser = userPref;
	}
	else
	{
	  var userPath = getUserPath(userPref.email);
		loadUserFromDB(userPath);
	}
}

// right now does nothing as there is nothing to do when the worker clicks discard
function discardUIPrefdata()
{

}

// Hides and show data entry items on the modal user login screen based on new or returning rb
function userType(userT)
{
	// new
	if (userT == 1)
	{
		$("#bca-user-login").attr("data-bca-user-type","new");
		$("#bca-userpref-confirmemail-grp").show();   
		$("#bca-userpref-name-grp").show(); 
    $("#bca-userpref-username-grp").show(); 
	  $("#bca-userpref-emailid-grp").show(); 
    $("#bca-zipcode-grp").show(); 
		$(".help-text").show()
	}
	else // returning
	{
		$("#bca-user-login").attr("data-bca-user-type","returning");
		$("#bca-userpref-confirmemail-grp").hide();  
		$("#bca-userpref-name-grp").hide(); 
    $("#bca-zipcode-grp").hide();
		$(".help-text").hide();
	}
}

// Event Handles for the items on the preference page
function addEventHandlers()
{
  $("#bca-userpref-btn_submit").on("hover", function(e) {
		verifyDataEntry();
  });
  	
	$("#form-dialog").on("hidden.bs.modal", function (e) {	
  });

  
	$("#bca-userpref-btn_submit").on("click", function (e){
  	submitUIPrefdata();
	});
	
	$("#bca-userpref-btn_discard").on("click", function (e){
		discardUIPrefdata();
	});
}