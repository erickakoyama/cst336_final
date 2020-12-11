// JQuery
$(document).ready(() => {
  console.log('scripts for schedule service page');
  
  // TODO: create click events for buttons or call from form submit

  async function scheduleService(){
      //get date formate = yyyy-mm-dd hh:mm:ss, serviceId, petId
        // I wouldent worry about time zones for this project
      // fill in query url
      
      //let url = `/api/scheduleService?date=${}&serviceId=${}&petId=${}`,
      let url = `/api/scheduleService?date=2020-12-31&serviceId=1&petId=1`;
      let response = await fetch(url);
      let data = await response.json();
      
      // parse data and populate the page
  }
  
});
