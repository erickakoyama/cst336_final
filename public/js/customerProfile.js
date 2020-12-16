// JQuery
$(document).ready(() => {
  console.log('scripts for customer profile page');

  $("#checkIn").on("click", checkinPet);
  $("#checkOut").on("click", checkinPet);
  $("#edit").on("click", editMode);
  $("#submit").on("click", updateProfile);

  let val = 1;

  function editMode() {
    var elements = document.getElementsByTagName("INPUT");
    switch (val) {
      case 0:
        for (var i = 0; i < elements.length; i++) {
          elements[i].readOnly = true;
        };
        document.getElementById("submit").disabled = true;
        val = 1;
        break;
      case 1:
        for (var i = 0; i < elements.length; i++) {
          elements[i].readOnly = false;
        };
        document.getElementById("submit").disabled = false;
        val = 0;
        break;
    }

  };

  async function updateProfile() {
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


    // returns the customer, update the page

  };

  async function checkinPet() {
    const action = 1;
    const petId = 2;
    // get the pet id and action
    //let url = `/api/checkin?action=${}&petId=${}`;
    let url = `/api/checkin`;
    let response = await fetch(
      url, {
        body: JSON.stringify({ action: 1, petId: 2 }),
        method: 'PUT'
      }
    );
    let data = await response.json();
    switch (action) {
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

  };

});
