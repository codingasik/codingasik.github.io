$(document).ready(function () {
  loadSetting();

});

var csrfToken = $('meta[name="csrf_token"]').attr('content');

$(function(){
  $("#formResetPassword").submit(function(event){
    event.preventDefault();
    const passbaru = $("[name='passbaru']").val();
    const verpass = $("[name='verpass']").val();
    const token = $("[name='token']").val();
    
      $.ajax({
        type : 'POST',
        data : {
          ['csrf_token']:csrfToken,
          passbaru: passbaru,
          verpass : verpass,
          token   : token
        },
        headers:{'csrfToken': csrfToken},
        url: BASE_URL+"/login/prosesReset",
        dataType : 'JSON',
        success:function(data) {
          
          console.log(data);

          if (data.status == "success") {
            swal("Success!", data.message, "success");
            setTimeout(() => {
              window.location.href = BASE_URL+"/login";
            }, 2500);
          }else if (data.status == "wrongToken") {
            swal("Gagal!", data.message, "error");
          }else if(data.status == 'wrongVerpass'){
            swal("Gagal!", data.message, "error")
          }else if(data.status == 'failed'){
            swal("Gagal!", data.message, "error")
          }
          
        }

    });
  });
});
