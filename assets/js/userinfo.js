
var dataStore; 
var bcaCurrentUser;
var validation = [];

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

    // if (emailTest.length < 4)
    // {
      // return false;
    // }
    if (!filter.test(emailTest)) 
    {
      return false;
    }
    return true;
  }  
  
function validateZipCode(zipCodeText)
{
  var parsedZipCode = zipCodeText.split();
  if (parsedZipCode.length > 10 )
  {
    return false
  }
  if ((parsedZipCode.length > 5) & (parsedZipCode[5] != '-'))
  {
    return false;
  }
  if (parsedZipCode.length < 5)
  {
    return false;
  }
  
}  
  
function verifyDataEntry()
{
	data = new userPreferenceEntry();
  
	if (!checkEmail(data.email))
	{
    validation[validation.length] = 'Please supply a valid Email';
	}
  
	if (data.newUser == "new")
	{
		if (data.email != data.confirmEmail )
		{
      validation[validation.length] = 'Emails entered do not match'+'['+data.email+']'+'['+data.confirmEmail+']';
		}
		if (data.name.length<1)
		{
      validation[validation.length] = 'Please enter a name '+validation.length;
		}
    if (!validateZipCode(data.zipCode))
    {
       validation[validation.length] = 'Please supply a valid Zip Code';
    }	
  }
  
  if (validation.length > 0)
  {
    return false;
  }
  return true;
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
	$("#form-dialog").on("hidden.bs.modal", function (e) {	
  });

  
	$("#bca-userpref-btn_submit").on("click", function (e){
		//if (
    verifyDataEntry();
    //)
    //{
      submitUIPrefdata();
    //}
	});
	
	$("#bca-userpref-btn_discard").on("click", function (e){
		discardUIPrefdata();
    openNewURLInTheSameWindow();
	});
}