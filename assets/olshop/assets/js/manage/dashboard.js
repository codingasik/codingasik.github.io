$(document).ready(function () {
  checkChat();
});


$(function(){
    $("#formdata").submit(function(event){
      event.preventDefault();

      var username = $("[name='username']").val();
      var password = $("[name='password']").val();
      getDataParam(BASE_URL+"/manage/verifikasi-password",{['csrf_token']:csrfToken,username:username,password:password}, function(result){
        if(result == "salah"){
          swal("Gagal!", "Password salah!", "error");
        }else{
          

            const html = `
              <div class="col-md-6 col-xs-12" id="form-ubah-password">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Edit Profil & Password</h2>
                    <ul class="nav navbar-right panel_toolbox"></ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <form id="formpass" class="form-horizontal form-label-left input_mask">
                    <input type="hidden" name="csrf_token" value="${csrfToken}" />
                      <input type="hidden" name="id_user" value="${result[0].id_user}">
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Nama</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                          <input value="${result[0].nama}" type="text" id="nama" name="nama" class="form-control" placeholder="Edit Nama" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Password Baru</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                          <input name="passbaru" type="password" class="form-control" placeholder="******" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Konfirmasi Password</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                        <input name="verifikasipass" type="password" class="form-control" placeholder="******" required>
                        </div>
                      </div>
                      <div class="ln_solid"></div>
                      <div class="form-group">
                        <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                          <button type="submit" class="btn btn-success ">Simpan</button></div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>`;
            $('#cardGantiPass').html(html);

            ganti();
        }
      });
      return false;
      
    });
  });

 function ganti(){
    $("#formpass").submit(function(event){
      event.preventDefault();
      $.ajax({
        url:BASE_URL+"/manage/ganti-password",
        type:"POST",
        dataType : 'JSON',
        data:new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        success:function(data) {

          if(data.status == "berhasil"){
              swal("Sukses!", "Data berhasil disimpan!", "success");
              prosesReset();
              
          }else if(data == "tidaksama"){
              swal("Gagal!", "Password Tidak sama!", "error");
          }else{
            swal("Gagal!", "Data gagal disimpan!", "error");
          }

          
        }

    });
          
    });
  };

  $("#resetForm").click(prosesReset);

  function prosesReset(){
      $("#form-ubah-password").remove();
      //$("[name='username']").val('');
      $("[name='password']").val('');

  }



