$(document).ready(function () {
  loadSetting();

});

var csrfToken = $('meta[name="csrf_token"]').attr('content');

$(function(){
  $("#formLupaPassword").submit(function(event){
    event.preventDefault();
    const email = $("[name='email']").val();
    
      $.ajax({
        type : 'POST',
        data : {
          ['csrf_token']:csrfToken,
          email: email,
        },
        headers:{'csrfToken': csrfToken},
        url: BASE_URL+"/login/prosesLupa",
        dataType : 'JSON',
        success:function(data) {
          
          console.log(data);

          if (data.status == "success") {
            swal("Success!", data.message, "success");
            setTimeout(() => {
              window.location.href = BASE_URL+"/reset-password";
            }, 2500);
          }else if (data.status == "wrongEmail") {
            swal("Gagal!", data.message, "error");
          }else if(data.status == 'failed'){
            swal("Gagal!", data.message, "error")
          }
          
        }

    });
  });
});
