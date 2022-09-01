function dataGet(){
  getDataParam(BASE_URL+'/manage/data-kategori-all',{tabel:'kategori'},function(result){
    //console.log(result);
    let html = "";

    if(result.length == 0){
      html += '<option value="">--Pilih kategori--</option>';
      $("#btn-simpan").attr('disabled', 'true');
    }else{

      html += '<option value="">--Pilih kategori--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].id_kategori}">${result[i].kategori}</option>`;
      }
    }

    $("#id_kategori").html(html);
  });
}

function reloadTable()
{
  table.ajax.reload(null,false); //reload datatable ajax 
}


$('#btnTambah').click(function(){
  batal();
  dataGet();
  $('#modal').modal('show');
  
  $('#formProduk')[0].reset();
  $("#judulProduk").text("Tambah Data");
});

$('.batal').click(batal);

function batal(){
  $('#formProduk')[0].reset();
  $("[name='id_produk']").val("");
  $("[name='id_kategori']").val("");
  $("[name='harga']").val("");
  $("[name='stok']").val("");
  $("[name='deskripsi']").val("");
  $("[name='berat']").val("");
  $("#foto").attr('required', 'required');
  $("#foto").removeAttr('disabled');
}

$(function(){
  $("#formProduk").submit(function(event){
    event.preventDefault();
    let $fileUpload = $("input[type='file']");
    if (parseInt($fileUpload.get(0).files.length)>4){
      swal("Gagal!", "Hanya diperbolehkan upload foto maks 3", "error");
    }else{

      saveData(BASE_URL+'/manage/simpan-produk',new FormData(this),'#modal');
      reloadTable();
      batal();
    }
  });
});

function getedit(id_produk){
  $('#modal').modal('show');
  
  dataGet();
  getDataParam(BASE_URL+"/manage/data-produk-id",{['csrf_token']:csrfToken,id_produk:id_produk}, function(result){
    $("#judulProduk").text("Edit Data");

    $("#id_produk").val(result['id_produk']);
    $("#id_kategori").val(result['id_kategori']);
    $("[name='produk']").val(result['produk']);
    $("[name='harga']").val(result['harga']);
    $("[name='stok']").val(result['stok']);
    $("[name='deskripsi']").val(result['deskripsi']);
    $("[name='berat']").val(result['berat']);
    $("#foto").removeAttr('required');
    $("#foto").attr('disabled', 'true');
  });
  return false;
};



function hapus(id_produk){

  deleteData(BASE_URL+'/manage/hapus-produk',{['csrf_token']:csrfToken,id_produk:id_produk},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      reloadTable();
      batal();
      swal("Sukses!", notifDataHapus, "success");
    }

  });
  
};

function detail(id_produk){
  $('#modalFoto').modal('show');
  
  
  $("#judulFoto").text("Ubah Data");
  getDataParam(BASE_URL+"/manage/data-detail-produk-id",{['csrf_token']:csrfToken,id_produk:id_produk}, function(result){
    $("#judulProduk").text("Edit Data");

    let html = "";
    let no = 1;
    for (let i = 0; i < result.length; i++) {


      html += `
        <tr>
          <th scope="row">${no++}</th>
          <td><img width="100px" src="${BASE_URL}/public/file/img/produk/${result[i].foto}" /></td>
          <td>
          <form class="form-horizontal form-label-left input_mask formFoto" >
            
              <input type="hidden" name="id_dproduk" value="${result[i].id_dproduk}">
              <input type="hidden" name="id_produk" value="${result[i].id_produk}">
              <input type="hidden" name="fotoUbahLama" value="${result[i].foto}">
              <div class="row">
                <div class="col-md-6">
                <input type="file" accept="image/jpg,image/jpeg,image/png"   name="fotoUbah" class="form-control col-md-7 col-xs-12">
                </div>
                <div class="col-md-6">
               <button type="submit" class="btn btn-success btn-xs simpanFoto" title="Ubah Foto"><i class="fa fa-save"></i></button> 
                </div>
              </div>
            </form>
            </td>
            </tr>
            `;

      
    }
    $("#bodyFoto").html(html);
    simpanData();
    //<a href="javascript:;" class="btn btn-danger btn-xs" onclick="hapusFoto(${result[i].id_dproduk})"><i class="fa fa-trash" title="Hapus Foto"></i></a>
  });
}
function simpanData(){
  $(".formFoto").submit(function(event){
    event.preventDefault();
    saveData(BASE_URL+'/manage/simpan-detail-produk',new FormData(this),'#modalFoto');
    reloadTable();
  });
}


function hapusFoto(id_dproduk){

  deleteData(BASE_URL+'/manage/hapus-detail-produk',{id_dproduk:id_dproduk},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      reloadTable();
      /* batal(); */
      swal("Sukses!", notifDataHapus, "success");
    }

  });
  
};