// You'll need to require jQuery for this to work.
// Add this to your application.js 
(function($){
  $.jsonRequest = function(options){

    // Store the success function in the temp var validResponseCB. 
    // If the user did not specify a success function, we'll default it to 
    // log the jsonr object.
    var validResponseCB = options.success || function(jsonResponse){
      console.log("Valid response returned");
      console.log(jsonResponse);
    };
    
    // Store the error function in the temp var invalidResponseCB.
    // If the user did not specify an error function, we'll default it to 
    // log the jsonr object.
    var invalidResponseCB = options.error || function(jsonResponse){
      console.log("Invalid response returned");
      conosle.log(jsonResponse);
    };
    
    // Provide a more common success function for the $.ajax callback.
    // Also, take care of the redirect scenario, since that will be common
    // in all jsonr responses (if the server returns a status = redirect).
    options.success = function(jsonResponse){
      if(jsonResponse.status == "redirect"){
        window.location = jsonResponse.to;
      }
      else{
        validResponseCB(jsonResponse);
      }
    };
    
    // Provide a common error function for $.ajax.
    // When the error's status is 400, evaluate the responseText
    // and pass that into the invalidResponseCB function. 
    options.error = function(XMLHttpRequest, textStatus){
      if(XMLHttpRequest.status == 400){
        jsonResponse = window.eval(XMLHttpRequest.responseText);
        invalidResponseCB(jsonResponse);
      }
    };
    

    // The real action takes place here.
    $.ajax(options);
  };
})(jQuery);

// Simple example
// This assumes the response sends back a +message+ property.
// It merely alerts the user that the request was successful, or failed
$.jsonRequest({ 
  
  // Note: You can choose to use the .jsonr extension
  // or add "format=jsonr" to the data. I've chosen to use the
  // extension.
  url: "http://www.example.com/comments.jsonr"  
  type: "POST",
  data: /* gather form data here - probably something like $("form").serialize() */,
  
  success: function(jsonResponse){
    alert("Success: " + jsonResponse.message);
  },
  
  error: function(jsonResponse){
    alert("Request Error: " + jsonResponse.message);
  }
});