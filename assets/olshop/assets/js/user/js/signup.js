$(document).ready(function () {
  loadSetting();
});

var csrfToken = $('meta[name="csrf_token"]').attr('content');

$(function(){
  $("#formdata").submit(function(event){
    event.preventDefault();

      var formData = new FormData($('#formdata')[0]);
      $.ajax({
        type : 'POST',
        data : formData,
        contentType: false,
        processData: false,
        headers:{'csrfToken': csrfToken},
        url:BASE_URL+"/login/proses_signup",
        dataType : 'JSON',
        success:function(data) {
         
          if(data.status == 1){
            swal("Success!", data.message, "success");
          }else if(data.status == 7){
            swal("Gagal!", data.message, "error");
          }else if(data.status == 5){
            swal("Gagal!", data.message, "error");
          }else{
            swal("Gagal!", data.message, "error");
          }
          
          
        }

    });
  });
});
