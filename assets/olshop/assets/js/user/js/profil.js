$(document).ready(function () {
  loadSetting();
  getDataProvinsi();
  getDataCity();
  dataProfil();

  $('#province_id').on('change', function() {
    let valSelectProvince = $(this).find("option:selected").text();
      let province_id = $("[name='province_id']").val();
      getDataCity(province_id);
      //console.log(province_id);
      $("[name='province']").val(valSelectProvince);
  });
  
  $('#city_id').on('change', function() {
    let valSelectCity = $(this).find("option:selected").text();
      //$("[name='city']").val("");
      $("[name='city_name']").val(valSelectCity);
  });
});



function dataProfil(){
  getData(BASE_URL+"/profil/dataProfil", function(result){
    console.log(result);

    $("[name='id_user']").val(result.profil.id_user);
    $("[name='fotoLama']").val(result.profil.foto);
    $("#username").text(result.profil.username);
    $("#nama").val(result.profil.nama);
    $("#email").val(result.profil.email);
    $("#telepon").val(result.profil.telepon);
    $("#tglLahir").val(result.profil.tgl_lahir);
    $("#province_id").val(result.profil.province_id);
    $("#city_id").val(result.profil.city_id);
    $("#kecamatan").val(result.profil.kecamatan);
    $("#postalCode").val(result.profil.postal_code);
    $("#alamat").val(result.profil.alamat);
    $("#province").val(result.profil.province);
    $("#city_name").val(result.profil.city_name);
    $("#userFoto").attr('src', BASE_URL+'/public/file/img/user/'+result.profil.foto);
    $("#userFoto").attr('alt',result.profil.foto);
    $("#userUsername").text(result.profil.username);
    //$('input[name="jk"]:checked').val(result.profil.jk);
    var $radios = $('input:radio[name=jk]');
    if($radios.is(':checked') === false) {
        $radios.filter('[value='+result.profil.jk+']').prop('checked', true);
    }
      
  });

  simpanAlamat();
  simpanProfil();
  simpanFoto();
  simpanPassword();
}

function getDataProvinsi(){
  getDataParam(BASE_URL+"/home/getDataAlamat",{data:'provinsi'},function(result){
    let html = "";

   
    //console.log(result);

      html += '<option value="">--Pilih Provinsi--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].province_id}">${result[i].province}</option>`;
      } 

    $("#province_id").html(html); 
  });
}

function getDataCity(province_id){
  //console.log(province_id);
  getDataParam('home/getDataAlamat',{data:'kabupaten',province_id:province_id},function(result){
    let html = "";

   

      html += '<option value="">--Pilih Kota/Kabupaten--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].city_id}">${result[i].city_name}</option>`;
      } 

    $("#city_id").html(html); 
  });
}

function simpanAlamat(){
  $("#formAlamat").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/profil/simpanAlamat',new FormData(this),'#modal');
    dataProfil();

  });
}

function simpanProfil(){
  $("#formProfil").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/profil/simpanProfil',new FormData(this),'#modal');
    dataProfil();

  });
}

function simpanFoto(){
  $("#formFoto").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/profil/simpanFoto',new FormData(this),'#modalFoto');
    dataProfil();
    $("[name='foto']").val('');

  });
}

function simpanPassword(){
  $("#formPassword").submit(function(event){
    event.preventDefault();
    $.ajax({
      url:BASE_URL+"/profil/simpanPassword",
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
          dataProfil();

          $("[name='oldPass']").val('');
          $("[name='newPass']").val('');
          $("[name='verPass']").val('');
          
            
        }else if(data.status == "tidaksama"){
            swal("Gagal!", "Password Tidak sama!", "error");
        }else if(data.status == "salahpass"){
            swal("Gagal!", "Password lama salah!", "error");
        }else{
          swal("Gagal!", "Data gagal disimpan!", "error");
        }

        
      }

    });
        
  });
}