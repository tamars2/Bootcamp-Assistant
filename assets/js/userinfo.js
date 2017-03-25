
var dataStore; 

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

// Set the user name appearing in the navication bar
function setNavBarUserID(userid)
{
  $("#bca-userid").html(userid);
}

// Called from the menu bar this opens the login screen
function editUserPreference()
{
  dataStore = connedtToDatabase();
	addEventHandlers();
  $("#form-dialog").modal("toggle");
}

// Called from the menu bar when the user clicks on the logout 
//********* NOT YET IMPLEMENTED

function addNewuserToDB(newuser)
{
  // set path to useremail
  var  userPath = newuser.email;
     
  // save the user data 
  dataStore.ref('users/' + userPath).set(newuser); 
  
  // set info in session memory
  // user id = email
  sessionStorage.setItem('GATechCodeAssist', newuser.email);
}

// Pulls the data entered unto the user login screen and places into an objcet
function userPreferenceEntry()
{	
	var cbx = $('#bca_cbx');    
  this.newUser = true; //cbx.context.activeElement.checked;// $("#bca-userpref-cbx-newuser").attr("value");
  this.name = $("#bca-userpref-name").val().trim();
  this.email = $("#bca-userpref-username").val().trim();
  this.zipCode = $("#bca-zipcode").val().trim();
}

// Submits the NewUser infotmation to the database 
// Need to decide what how this does.
// NOT YET IMPLEMENTED **************************
function submitUIPrefdata()
{
	var userPref = new userPreferenceEntry();
  console.log(userPref);
  addNewuserToDB(userPref);
  // go to the database and check fo
  userPref.newUser=false;
}

// right now does nothing as there is nothing to do when the worker clicks discard
function discardUIPrefdata()
{

}

// Event Handles for the items on the preference page
function addEventHandlers()
{
  $("bca-brand").on("hover", function(e) {
      displayHoverMessage();
  });
  
	$("#bca-userpref-cbx-newuser").on("click", function (e) {	
		var cbx = $('#bca_cbx');    
    if (cbx.context.activeElement.checked == undefined)
    {
      
    }
    else
    {
      if (cbx.context.activeElement.checked)
      {
			$("#bca-userpref-confirmemail-grp").addClass("bca-hide");
        
      }
      else
      {
			$("#bca-userpref-confirmemail-grp").removeClass("bca-hide"); 
        
      }
    }
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