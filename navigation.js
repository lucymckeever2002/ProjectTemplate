
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails() {

    var gender= $("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();
      
      if($("#txtName").val() != "" && $("#txtTown").val() !="" && $("#txtEmail").val() !="" && $("txtAge").val() !="" && $("#txtYrsNoClaims").val() != "" && (gender =="m" || gender =="f"))
      {
    // Hide the personal details section (dvPersonalDetails)
    $("#dvPersonalDetails").hide();

    // Show the car details section (dvCarDetails)
    $("#dvCarDetails").show();
     $("#dvQuoteDetails").hide();

    setActiveNavigation('carLink')
      }
      else
      {
        $("#dvPersonalDetailsAlert").show();// otherwise shows error message 
      }



       // Hide the quote section (dvQuoteDetails)


  }

  function showPersonalDetails() {
      // Hide the car details section (dvCarDetails)
      $("#dvCarDetails").hide();
      // Hide the quote section (dvQuoteDetails)
      $("#dvQuoteDetails").hide();
      // Show the personal details section (dvPersonalDetails)
      $("#dvPersonalDetails").show();
  }

  function showQuoteDetails() {

    var gender= $("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();

    if($("#txtcarManufacturer").val() !="" && $("#txtModel").val()!="" && $("#txtcarAge").val() !="" && $("#txtEngineSize").val() !="" && $("#carStorage").val() !="" && $("#txtEstimatedValue").val() !="" && $("#txtName").val() != "" && $("#txtTown").val() !="" && $("#txtEmail").val() !="" && $("txtAge").val() !="" && $("#txtYrsNoClaims").val() != "" && (gender =="m" || gender =="f"))
    {
      // Hide the car details section (dvCarDetails)
      $("#dvCarDetails").hide();
      // Hide the personal details section (dvQuoteDetails)
     $("#dvPersonalDetails").hide();
      // Show the quote section (dvPersonalDetails)
      $("#dvQuoteDetails").show();
      setActiveNavigation('quoteLink')

      var manuf= $("#txtcarManufacturer option:selected").text();
      var model= $("#txtModel").val()
      var age=$("#txtcarAge").val()
      var engineSize= $("#txtEngineSize").val()
      var storage=  $("#carStorage option:selected").text()
      var value= $("#txtEstimatedValue").val()

      var carJSON='{"manuf": " '+ manuf 
      +'", "model":"'+ model 
      +'", "carAge":"'+ age 
      +'", "Engine":"'+ engineSize
      +'", "Storage":"'+ storage
      +'", "value":"'+ value + '"}'; 

      $("#carJSON").text(carJSON);
    }

    
    else
    {
      $("#dvCarDetailsAlert").show();
      $("#dvPersonalDetailsAlert").show();// otherwise shows error message 

    }
  }

  function getQuote() {

   // Perform validation to test that all data has been entered

    if (true)
    {
      var gender=$("#dvPersonalDetails input:radio[name=genderRadio]:checked").val();
      var age=$("#txtAge").val();
      var yearsNoClaims=$("#txtYrsNoClaims option:selected").val();
      var costOfCar=$("#txtEstimatedValue").val();
      var carStorage=$("carStorage option:selected").val();


      // Get the values from the page elements that you need to create your JSON

      $.ajax({
          type: "GET",
          url: "http://http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates :53753/api/rating/CalculateRates",
          data: {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage }
        }).done(function(msg) {
          // Put the return value into Label created on quote details
          $("#txtquotePrice").text(msg.result);
          // Hide the Car Details section
          $("#dvCarDetails").hide();
          // Display the quote details page
          $("#dvQuoteDetails").show();
          setActiveNavigation('quoteLink');
      });
  }
}
//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
