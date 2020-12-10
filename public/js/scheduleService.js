// JQuery
$(document).ready(() => {
  console.log('scripts for schedule service page');
  
  // TODO: create click events for buttons or call from form submit

  
  function scheduleService(){
      // get date, serviceId, petId
      // fill in query url
      
      // not sure if the dataType returned here is JSON if the data is a row
      $.ajax({
          method:"POST",
          url:`/api/scheduleService?date=${}&serviceId=${}&petId=${}`,
          success: function(result, status){
              // returns true if successful
              // display success message
              // navigate or refresh
          },
          error: function(xhr, textStatus, errorThrown){
              
          }
      });// ajax
  }// scheduleService
  
});
