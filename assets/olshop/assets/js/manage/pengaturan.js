$(document).ready(function() {
  checkChat();
  getDataProvinsi();
    getDataCity();
  dataPengaturan();
  changeSelectProvince();
  
  $('#province_id').on('change', function() {
    let valSelectProvince = $(this).find("option:selected").text();
      //$("[name='province']").val("");
      $("[name='province']").val(valSelectProvince);
  });
  
  $('#city_id').on('change', function() {
    let valSelectCity = $(this).find("option:selected").text();
      //$("[name='city']").val("");
      $("[name='city_name']").val(valSelectCity);
  });
  
});

function changeSelectProvince(){
    let valSelectProvince = $( "#province_id option:selected" ).text();
    $("#province").val(valSelectProvince);

}

function dataPengaturan(){

  getData(BASE_URL+"/manage/data-pengaturan",function(result){

    $("[name='id_pengaturan']").val(result[0].id_pengaturan);

    $("#picLogo").attr('src', BASE_URL+'/public/file/img/pengaturan/'+result[0].logo);
    $("#picLogo").attr('alt', result[0].logo);
    $("[name='logoLama']").val(result[0].logo);
    $("[name='logoLamaThumb']").val(result[0].logo_thumb);

    $("#picBanner").attr('src', BASE_URL+'/public/file/img/pengaturan/'+result[0].banner);
    $("#picBanner").attr('alt', result[0].banner);
    $("[name='bannerLama']").val(result[0].banner);

    $("[name='olshop']").val(result[0].olshop);
    $("[name='judul']").val(result[0].judul);
    $("[name='subJudul']").val(result[0].sub_judul);

    $("[name='toko']").val(result[0].toko);
    $("[name='telepon']").val(result[0].telepon);
    $("[name='instagram']").val(result[0].instagram);
    $("[name='facebook']").val(result[0].facebook);
  
    $("[name='province_id']").val(result[0].province_id);
    $("[name='province']").val(result[0].province);
    $("[name='city_id']").val(result[0].city_id);
    $("[name='city_name']").val(result[0].city_name);
    $("[name='bendahara_nip']").val(result[0].bendahara_nip);
    $("[name='kecamatan']").val(result[0].kecamatan);
    $("[name='postalCode']").val(result[0].postal_code);
    $("[name='alamat']").val(result[0].alamat);
    
    $("[name='email']").val(result[0].email);

    $("[name='caraBayar']").val(result[0].cara_bayar);
    $("#picFotoBayar").attr('src', BASE_URL+'/public/file/img/pengaturan/'+result[0].foto_cara);
    $("#picFotoBayar").attr('alt', result[0].foto_cara);
    $("[name='fotoCaraLama']").val(result[0].foto_cara);
  });
  return false;

}


function getDataProvinsi(){
  getDataParam(BASE_URL+'/manage/data-alamat',{data:'provinsi'},function(result){
    let html = "";

   
    //console.log(result);

      html += '<option value="">--Pilih Provinsi--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].province_id}">${result[i].province}</option>`;
      } 

    $("#province_id").html(html); 
  });
}

function getDataCity(){
  getDataParam(BASE_URL+'/manage/data-alamat',{data:'kabupaten'},function(result){
    let html = "";

   
    //console.log(result);

      html += '<option value="">--Pilih Kota/Kabupaten--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].city_id}">${result[i].city_name}</option>`;
      } 

    $("#city_id").html(html); 
  });
}


$(function(){
  $("#formDataWeb").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-data-web',new FormData(this),'#modal');
    dataPengaturan();
    $('[name="logo"]').val("");
    $('[name="banner"]').val("");
  });
});

$(function(){
  $("#formDataToko").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-data-toko',new FormData(this),'#modal');
    dataPengaturan();
  });
});

$(function(){
  $("#formCaraBayar").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-cara-bayar',new FormData(this),'#modal');
    dataPengaturan();
    /* $('[name="fotoCara"]').val(""); */
  });
});

$(function(){
  $("#formDataAlamat").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-data-alamat',new FormData(this),'#modal');
    dataPengaturan();
  });
});

$(function(){
  $("#formNotifikasi").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-notifikasi',new FormData(this),'#modal');
    dataPengaturan();
  });
});


$(function(){
  $("#formRestore").submit(function(event){
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: BASE_URL+'/pengaturan/restore',
      headers:{'csrfToken': csrfToken},
      dataType : 'JSON',
      data:new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success: function(result){
        if (result.status == 'berhasil'){
          swal("Sukses!", result.message, "success");

        }else{
          swal("Gagal!", result.message, "error");
          
        }
      },
      error: function(xhr, textStatus, errorThrown) {
          console.log('error');
      }
  });

  });
});

