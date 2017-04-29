/ valid email pattern
var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$.validator.addMethod("validemail", function( value, element ) {
   return this.optional( element ) || eregex.test( value );
});


$("document").ready(function(){
  $("#subscribe-form").validate({
    rules:
    {
      email: {
        required: true,
        validemail: true
      },
    },
    messages:
    {
      email: {
        required: "Please Enter Email Address",
        validemail: "Enter Valid Email Address"
      },
    },
    errorPlacement : function(error, element) {
    $(element).closest('.form-group').find('.help-block').html(error.html());
    },
    highlight : function(element) {
    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element, errorClass, validClass) {
    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    $(element).closest('.form-group').find('.help-block').html('');
  }
  });
  $('#subscribe-form').submit(function(event) {
    event.preventDefault();
    submitSubscribeForm($("#subscribe-form"));

    function submitSubscribeForm($form) {
      $.ajax({
        type: 'GET',
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: 'jsonp',
        jsonp: "c",
        contentType: "application/json; charset=utf-8",
        error: function(error) {
        },
        success: function (data) {
          var resultMessage = data.msg || "Oops! This is embarassing. Please try again."
          if (data.result != "success") {
            if (data.msg && data.msg.indexOf("already subscribed")>=0) {
              resultMessage = "You're already subscribed. Thank you."
            }
          } else {
              resultMessage = "Thank you!! <br> Please confirm subscription in your inbox."
          }
        }
      })
    }
  });

})
