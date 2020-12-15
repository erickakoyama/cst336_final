// JQuery
$(document).ready(function(){
  console.log('scripts for schedule service page');
  
 $("#submit").on("click", scheduleService);

  async function scheduleService(){
    alert("button was clicked");
    const petId = $("#petId").val();
    const date = $("#date").val();
    const serviceId = $("#serviceId").val();
      
    let url = `/api/scheduleService?date=${date}&serviceId=${serviceId}&petId=${petId}`;
    let response = await fetch(url);
    let data = await response.json();
      
      // parse data and populate the page
  }
  
});
