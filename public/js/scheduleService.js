// JQuery
$(document).ready(function(){
  console.log('scripts for schedule service page');
  
 $("#serviceSchedule").on("submit",scheduleService);

  async function scheduleService(){
    alert("button was clicked");
    const petId = $("#petId").val();
    const date = $("#date").val();
    const serviceId = $("#serviceId").val();
      
    let url = `/api/scheduleService`;
    let response = await fetch(url, {
        body: JSON.stringify({ petId: petId, date: date, serviceId: serviceId }),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      }
    );
    let data = await response.json();
    
    if(data){
      $("#scheduleSuccess").html("You've Sucessfuly Scheduled a Pet!");
    }
    
  }// scheduleService
  
});
