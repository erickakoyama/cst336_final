// JQuery
$(document).ready(() => {
  console.log('scripts for customer profile page');
  
  $("#checkIn").on("click", checkinPet(1, $("#checkIn").val()));
  $("#checkOut").on("click", checkinPet(0, $("#checkIn").val()));
  $("#edit").on("click", editMode(1));
  $("#submit").on("click", updateProfile());
  
  function editMode(val){
    var elements = document.getElementsByTagName("INPUT");
    console.log(elements);
    switch(val){
      case 0:
        for(var i = 0; i < elements.length; i++){
          elements[i].readOnly=true;
        };
        break;
      case 1:
        for(var i = 0; i < elements.length; i++){
          elements[i].readOnly=false;
        };
        document.getElementById("submit").disabled=false;
        break;
    }
    
  }
  
  async function updateProfile(){
    // get fn, ln, email, phone, addr1, addr2, city, state, zip
    // fill in query url
    
    const fn = $("#custFirstName").val();
    const ln = $("#custLastName").val();
    const email = $("#custEmail").val();
    const phone = $("#custPhone").val();
    const addr1 = $("#custAdrOne").val();
    const addr2 = $("#custAdrTwo").val();
    const city = $("#custCity").val();
    const state = $("#custState").val();
    const zip = $("custZip").val();
    
    let url = `/api/updateProfile?fn=${fn}&ln=${ln}&email=${email}&phone=${phone}&addr1=${addr1}&addr2=${addr2}&city=${city}&state=${state}&zip=${zip}`;
    //let url = "/api/updateProfile?fn=Roger";
    let response = await fetch(url);
    let data = await response.json();
    
    editMode(0);
    // returns the customer, update the page
    
  }// updateProfile
  
  async function checkinPet(action, petId){
    // get the pet id and action
    //let url = `/api/checkin?action=${}&petId=${}`;
    let url = `/api/checkin?action=${action}&petId=${petId}`;
    let response = await fetch(url);
    let data = await response.json();
    switch (action){
      case 0:
        document.getElementById("checkIn").style.disabled = false;
        document.getElementById("checkOut").style.disabled = true;
        break;
      case 1:
        document.getElementById("checkIn").style.disabled = true;
        document.getElementById("checkOut").style.disabled = false;
        break;
    }
    
    
    // returns 0 or 1
    
  }// checkinPet
  
});
