// JQuery
$(document).ready(() => {
  console.log('scripts for customer profile page');
  
  // TODO: create click events for buttons or call from form submit
  
  async function updateProfile(){
    // get fn, ln, email, phone, addr1, addr2, city, state, zip
    // fill in query url
    
    // let url = `/api/updateProfile?fn=${}&ln=${}&email=${}&phone=${}&addr1=${}&addr2=${}&city=${}&state=${}&zip=${}`;
    let url = "/api/updateProfile?fn=Roger";
    let response = await fetch(url);
    let data = await response.json();
    
    // returns the customer, update the page
    
  }// updateProfile
  
  async function checkinPet(){
    // get the pet id and action
    
    //let url = `/api/checkin?action=${}&petId=${}`;
    let url = `/api/checkin?action=0&petId=1`;
    let response = await fetch(url);
    let data = await response.json();
    
    // returns 0 or 1
    
  }// checkinPet
  
});
