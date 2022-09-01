function dataGet(){
  getDataParam(BASE_URL+'/manage/data-transaksi-all',{tabel:'transaksi'},function(result){
    //console.log(result);
    let html = "";

    if(result.length == 0){
      html += '<option value="">--Pilih transaksi--</option>';
      $("#btn-simpan").attr('disabled', 'true');
    }else{

      html += '<option value="">--Pilih transaksi--</option>';
      for (let i = 0; i < result.length; i++) {
        html += `<option value="${result[i].id_transaksi}">${result[i].transaksi}</option>`;
      }
    }

    $("#id_transaksi").html(html);
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
  
  $('#formTransaksi')[0].reset();
  $("#judulTransaksi").text("Tambah Data");
});

$('.batal').click(batal);

function batal(){
  $('#formTransaksi')[0].reset();
  $("[name='id_transaksi']").val("");
  $("[name='id_transaksi']").val("");
  $("[name='harga']").val("");
  $("[name='stok']").val("");
  $("[name='deskripsi']").val("");
  $("[name='berat']").val("");
  $("#foto").attr('required', 'required');
  $("#foto").removeAttr('disabled');
}

$(function(){
  $("#formTransaksi").submit(function(event){
    event.preventDefault();
    let $fileUpload = $("input[type='file']");
    if (parseInt($fileUpload.get(0).files.length)>4){
      swal("Gagal!", "Hanya diperbolehkan upload foto maks 3", "error");
    }else{

      saveData(BASE_URL+'/manage/simpan-transaksi',new FormData(this),'#modal');
      reloadTable();
      batal();
    }
  });
});

function getedit(id_transaksi){
  $('#modal').modal('show');
  
  dataGet();
  getDataParam(BASE_URL+"/manage/data-transaksi-id",{['csrf_token']:csrfToken,id_transaksi:id_transaksi}, function(result){
    $("#judulTransaksi").text("Edit Data");

    $("#id_transaksi").val(result['id_transaksi']);
    $("#id_transaksi").val(result['id_transaksi']);
    $("[name='transaksi']").val(result['transaksi']);
    $("[name='harga']").val(result['harga']);
    $("[name='stok']").val(result['stok']);
    $("[name='deskripsi']").val(result['deskripsi']);
    $("[name='berat']").val(result['berat']);
    $("#foto").removeAttr('required');
    $("#foto").attr('disabled', 'true');
  });
  return false;
};



function hapus(id_transaksi){

  deleteData(BASE_URL+'/manage/hapus-transaksi',{['csrf_token']:csrfToken,id_transaksi:id_transaksi},function(data){

    if (data.status == 6){
      swal("Gagal!", data.message, "error");
    }else if (data.status == 0){
      swal("Gagal!", data.message, "error");
    }else{
      reloadTable();
      batal();
      swal("Sukses!", data.message, "success");
    }

  });
  
};

function detail(id_transaksi){
  $('#modalFoto').modal('show');
  
  
  $("#judulFoto").text("Ubah Data");
  getDataParam(BASE_URL+"/manage/data-detail-transaksi-id",{['csrf_token']:csrfToken,id_transaksi:id_transaksi}, function(result){
    $("#judulTransaksi").text("Edit Data");

    let html = "";
    let no = 1;
    for (let i = 0; i < result.length; i++) {


      html += `
        <tr>
          <th scope="row">${no++}</th>
          <td><img width="100px" src="${BASE_URL}/public/file/img/transaksi/${result[i].foto}" /></td>
          <td>
          <form class="form-horizontal form-label-left input_mask formFoto" >
            
              <input type="hidden" name="id_dtransaksi" value="${result[i].id_dtransaksi}">
              <input type="hidden" name="id_transaksi" value="${result[i].id_transaksi}">
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
    //<a href="javascript:;" class="btn btn-danger btn-xs" onclick="hapusFoto(${result[i].id_dtransaksi})"><i class="fa fa-trash" title="Hapus Foto"></i></a>
  });
}
function simpanData(){
  $(".formFoto").submit(function(event){
    event.preventDefault();
    saveData(BASE_URL+'/manage/simpan-detail-transaksi',new FormData(this),'#modalFoto');
    reloadTable();
  });
}


function hapusFoto(id_dtransaksi){

  deleteData(BASE_URL+'/manage/hapus-detail-transaksi',{id_dtransaksi:id_dtransaksi},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      reloadTable();
      /* batal(); */
      swal("Sukses!", notifDataHapus, "success");
    }

  });
  
};