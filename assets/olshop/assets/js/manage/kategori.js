function reloadTable()
{
  table.ajax.reload(null,false); //reload datatable ajax 
}


$('#btnTambah').click(function(){
  $('#modal').modal('show');
  
  $('#formKategori')[0].reset();
  $("#judulKategori").text("Tambah Data");
});

$('.batal').click(batal);

function batal(){
  $('#formKategori')[0].reset();
  $("[name='id_kategori']").val("");
  $("[name='kategori']").val("");
  $("[name='keterangan']").val("");
  $("#gambar").attr('required', 'required');
}

$(function(){
  $("#formKategori").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-kategori',new FormData(this),'#modal');
    reloadTable();
  });
});

function getedit(id_kategori){
  $('#modal').modal('show');
  
  $("#gambar").removeAttr('required');

  getDataParam(BASE_URL+"/manage/data-kategori-id",{['csrf_token']:csrfToken,id_kategori:id_kategori}, function(result){
    $("#judulKategori").text("Edit Data");

    $("#id_kategori").val(result['id_kategori']);
    $("[name='kategori']").val(result['kategori']);
    $("[name='gambarLama']").val(result['gambar']);
  });
  return false;
};



function hapus(id_kategori){

  deleteData(BASE_URL+'/manage/hapus-kategori',{['csrf_token']:csrfToken,id_kategori:id_kategori},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      reloadTable();
      batal();
      swal("Sukses!", notifDataHapus, "success");
    }

  });
  
};
