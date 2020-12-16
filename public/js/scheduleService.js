// JQuery
$(document).ready(function(){
  console.log('scripts for schedule service page');
  
<<<<<<< HEAD
 $("#serviceSchedule").on("submit",scheduleService);

  async function scheduleService(){
=======
 $("#submit").on("click", scheduleService);

  async function scheduleService(){
    alert("button was clicked");
>>>>>>> ff2d8055cefdf8dd0f01ac8899b15bb3128f2c34
    const petId = $("#petId").val();
    const date = $("#date").val();
    const serviceId = $("#serviceId").val();
      
<<<<<<< HEAD
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
=======
    let url = `/api/scheduleService?date=${date}&serviceId=${serviceId}&petId=${petId}`;
    let response = await fetch(url);
    let data = await response.json();
      
      // parse data and populate the page
  }
>>>>>>> ff2d8055cefdf8dd0f01ac8899b15bb3128f2c34
  
});
