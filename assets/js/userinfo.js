
// Set the user name appearing in the navication bar
function setNavBarUserID(userid)
{
  $("#bca-userid").html(userid);
}

// Called from the menu bar this opens the login screen
function editUserPreference()
{
  $("#form-dialog").modal("toggle");
}

// Called from the menu bar when the user clicks on the logout 
//********* NOT YET IMPLEMENTED
function logoutUser()
{
	alert('adrian');
}

// Pulls the data entered unto the user login screen and places into an objcet
function userPreferenceEntry()
{	
	var cbx = $('#bca_cbx');    
  this.newUser = cbx.context.activeElement.checked;// $("#bca-userpref-cbx-newuser").attr("value");
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

function temp()
{
	addEventHandlers();
  setNavBarUserID("samantha davis jones");
}