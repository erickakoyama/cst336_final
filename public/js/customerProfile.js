// JQuery
$(document).ready(() => {
  console.log('scripts for customer profile page');
  
  // TODO: create click events for buttons or call from form submit
  
  function updateProfile(){
      // get fn, ln, email, phone, addr1, addr2, city, state, zip
      // fill in query url
      
      // not sure if the dataType returned here is JSON if the data is a row
      $.ajax({
          method:"PUT",
          url:`/api/updateProfile?fn=${}&ln=${}&email=${}&phone=${}&addr1=${}&addr2=${}&city=${}&state=${}&zip=${}`,
          dataType: "json",
          success: function(result, status){
              // populate customer info
          },
          error: function(xhr, textStatus, errorThrown){
              
          }
      });// ajax
  }// updateProfile
  
  function checkinPet(){
      // action is 1 if checking in 0 if checking out
      $.ajax({
          method:"POST",
          url:`/api/checkin?action=${}`,
          success: function(result, status){
              // returns 0 if checkedout, 1, if checked in
              // toggle UI to display this
          },
          error: function(xhr, textStatus, errorThrown){
              
          }
      });// ajax
  }// checkinPet
  
});
