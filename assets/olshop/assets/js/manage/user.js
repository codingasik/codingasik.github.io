
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

function getDataCity(province_id){
  getDataParam(BASE_URL+'/manage/data-alamat',{data:'kabupaten',province_id:province_id},function(result){
    let html = "";

   
    //console.log(result);

      html += '<option value="">--Pilih Kota/Kabupaten--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].city_id}">${result[i].city_name}</option>`;
      } 

    $("#city_id").html(html); 
  });
}

function reloadTable()
{
  table.ajax.reload(null,false); //reload datatable ajax 
}


$('#btnTambah').click(function(){
  getDataProvinsi();
    $('#modal').modal('show');
  
  $('#formUser')[0].reset();
  $("#judulUser").text("Tambah Data");
});


$('.batal').click(batal);

function batal(){
  $('#formUser')[0].reset();
  $("[name='id_user']").val("");
  $("[name='username']").val("");
  $("[name='nama']").val("");
  $("[name='email']").val("");
  $("[name='password']").val("");
  $("[name='tgl_lahir']").val("");
  $("[name='jk']").val("");
  $("[name='telepon']").val("");
  $("[name='province_id']").val("");
  $("[name='province']").val("");
  $("[name='city_id']").val("");
  $("[name='city_name']").val("");
  $("[name='kecamatan']").val("");
  $("[name='postal_code']").val("");
  $("[name='alamat']").val("");
  $("[name='status']").val("");
  $("[name='foto']").val("");
  $("[name='fotoLama']").val("");

  $("[name='password']").attr('required','required');
  $("[name='password']").removeAttr('disabled');
}

$(function(){
  $("#formUser").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-user',new FormData(this),'#modal');
    reloadTable();
  });
});

function getedit(id_user){
  getDataProvinsi();
  $('#modal').modal('show');

  getDataParam(BASE_URL+"/manage/data-user-id",{['csrf_token']:csrfToken,id_user:id_user}, function(result){
    $("#judulUser").text("Edit Data");
  
    $("[name='id_user']").val(result['id_user']);
    $("[name='username']").val(result['username']);
    $("[name='nama']").val(result['nama']);
    $("[name='email']").val(result['email']);
    $("[name='password']").attr('disabled','disabled');
    $("[name='password']").removeAttr('required');
    $("[name='tgl_lahir']").val(result['tgl_lahir']);
    $("[name='jk']").val(result['jk']);
    $("[name='telepon']").val(result['telepon']);
    $("[name='province_id']").val(result['province_id']);
    $("[name='province']").val(result['province']);
    $("[name='city_id']").val(result['city_id']);
    $("[name='city_name']").val(result['city_name']);
    $("[name='kecamatan']").val(result['kecamatan']);
    $("[name='postal_code']").val(result['postal_code']);
    $("[name='alamat']").val(result['alamat']);
    $("[name='status']").val(result['status']);
    $("[name='foto']").val(result['foto']);
    $("[name='fotoLama']").val(result['foto']);
  });
  return false;
};



function hapus(id_user){

  deleteData(BASE_URL+'/manage/hapus-user',{['csrf_token']:csrfToken,id_user:id_user},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      reloadTable();
      batal();
      swal("Sukses!", notifDataHapus, "success");
    }

  });
  
};
