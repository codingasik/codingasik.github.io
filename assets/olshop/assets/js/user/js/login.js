$(document).ready(function () {
  loadSetting();

  console.log(getLogo());
  //$("#loginLogo").attr('src', '/file/img/pengaturan/'+getLogo());
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
        url:BASE_URL+"/login/proses_login",
        dataType : 'JSON',
        success:function(data) {
         /*  console.log(data.data.token);
          $.cookie('token', data.data.token, { expires: 7 }); */
          
          if (data.status == 1) {
            window.location.href = BASE_URL+"/";
          }else if (data.status == 'nodata') {
            swal("Gagal!", "Username tidak terdaftar", "error");
          }else if(data.status == 'salahpass'){
            swal("Gagal!", "Username atau password salah", "error");
          }
          
        }

    });
  });
});
