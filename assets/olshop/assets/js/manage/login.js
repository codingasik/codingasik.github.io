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
        url:BASE_URL+"/manage/proses-login",
        dataType : 'JSON',
        success:function(data) {
         /*  console.log(data.data.token);
          $.cookie('token', data.data.token, { expires: 7 }); */
          
          if (data.status == 1) {
            window.location.href = BASE_URL+'/manage/dashboard';
          }else if (data.status == 'nodata') {
            swal("Gagal!", "Username tidak terdaftar", "error");
          }else if(data.status == 'salahpass'){
            swal("Gagal!", "Username atau password salah", "error");
          }
          
        }

    });
  });
});
