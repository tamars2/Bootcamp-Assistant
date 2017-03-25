
var dataStore; 
var bcaCurrentUser;
var validation = [];
var name_passed = false;
var email_passed = false;
var con_email_passed = false;
var zip_passed = false;

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

// this function can fire onclick handler for any DOM-Element
function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
}

// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openNewURLInTheSameWindow() 
{
  var a = document.createElement('a');
  a.href = './index.html';
  fireClickEvent(a);
}

function checkEmail(emailTest) 
  {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(emailTest)) 
    {
      return false;
    }
    return true;
  }  
  
function validateZipCode(zipCodeText)
{
  var parsedZipCode = zipCodeText.split();
  if (zipCodeText.length > 10 )
  {
    return false
  }
  if ((zipCodeText.length > 5) & (parsedZipCode[5] != '-'))
  {
    return false;
  }
  if (zipCodeText.length < 5)
  {
    return false;
  }
  return true;
}  
  
	function validated()
	{
		
		if  (((zip_passed) &  (name_passed) & (con_email_passed) & (email_passed)))
		{
			$('#bca-userpref-btn_submit').prop('disabled', false);
		}
		else
		{
			$('#bca-userpref-btn_submit').prop('disabled', true);
		}
	}

// Called from the menu bar this opens the login screen
function editUserPreference()
{
  dataStore = connedtToDatabase();
	addEventHandlers();
  $("#form-dialog").modal("toggle");	
	$('#bca-userpref-btn_submit').prop('disabled', true);
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
  
  openNewURLInTheSameWindow();
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
    name_passed = false;
    con_email_passed = false;
    zip_passed = false;
	}
	else // returning
	{
		$("#bca-user-login").attr("data-bca-user-type","returning");
		$("#bca-userpref-confirmemail-grp").hide();  
		$("#bca-userpref-name-grp").hide(); 
    $("#bca-zipcode-grp").hide();
		$(".help-text").hide();
    name_passed = true;
    con_email_passed = true;
    zip_passed = true;
	}
}





// Event Handles for the items on the preference page
function addEventHandlers()
{	
	$("#form-dialog").on("hidden.bs.modal", function (e) {	
  });

	$("#bca-userpref-name").on("blur", function (e){
		if ($("#bca-userpref-name").val().trim().length > 0)
		{
  	  name_passed = true;
	    validated();
		}
		else
		{
			name_passed = false;
	    validated();
		}
	});
	  
	$("#bca-userpref-username").on("blur", function (e){
		if (checkEmail($("#bca-userpref-username").val().trim()))
		{
			email_passed = true;
			validated();
		}
		else
		{
		  email_passed = false;
	    validated();
		}
	});
	
	$("#bca-userpref-emailid").on("blur", function (e){
		if (checkEmail($("#bca-userpref-emailid").val().trim()) & ($("#bca-userpref-username").val().trim() == $("#bca-userpref-emailid").val().trim()))
		{
			con_email_passed = true;
			validated();
		}
		else
		{
			con_email_passed = false;
	    validated();
		}
	});
	
	$("#bca-zipcode").on("blur", function (e){
	  if (validateZipCode($("#bca-zipcode").val().trim()))
	  {
			zip_passed = true;
			validated();		 
	  }
		else
		{
			zip_passed = false;
	    validated();
		}
	});
  
	$("#bca-userpref-btn_submit").on("click", function (e){
      submitUIPrefdata();
	});
	
	$("#bca-userpref-btn_discard").on("click", function (e){
		discardUIPrefdata();
    openNewURLInTheSameWindow();
	});
}