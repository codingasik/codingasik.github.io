var tabel;
var notifSimpan = "Data Berhasil Disimpan";
var notifGagal = "Data Gagal Disimpan";
var notifDataHapus = "Data Berhasil Dihapus";
var notifBatalHapus = "Data Batal Dihapus"
var notifAdaData = "Data Sudah Ada";
var notifFileBesar = "File Size terlalu besar"
var notifRelasiData = "Data Sudah Berelasi";
var csrfToken = $('meta[name="csrf_token"]').attr('content');
/* var Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
 */


/* Lazyload url : https://appelsiini.net/projects/lazyload/ */

const getData = (url, successCallback) =>{
  //show loading... image

  $.ajax({
      type: 'POST',
      url: url,
      headers:{'csrf_token': csrfToken},
      dataType: 'json',
      beforeSend: function() {
        $(".loader").show();
      },
      success: successCallback,
      error: function(xhr, textStatus, errorThrown) {
          console.log('error');
      }
  });
}

const getDataParam = (url,parameters, successCallback) =>{
  //show loading... image
 
  $.ajax({
      type: 'POST',
      url: url,
      headers:{'csrf_token': csrfToken},
      dataType : "JSON",
      data : parameters,
      beforeSend: function() {
        $(".loader").show();
      },
      success: successCallback,
      error: function(xhr, textStatus, errorThrown) {
          console.log('error');
      }
  });
}

const saveData = (url,dataForm,modal) =>{
  
  $.ajax({
    url:url,
    type:"POST",
    dataType : 'JSON',
    headers:{'csrf_token': csrfToken},
    data:dataForm,
    processData: false,
    contentType: false,
    cache: false,
    async: false,
    success:function(data) {
      
      if(data.status == 1){
        swal("Sukses!", data.message, "success");
        $(modal).modal('hide');

        
      }else if (data.status == 3){
        swal("Gagal!", data.message, "error");

      }else if(data.status == 2){
        swal("Gagal!", data.message, "error");
        
      }else{
        swal("Gagal!", data.message, "error");

      }
      
    }

  });
}


function deleteData(url,parameters,successCallback){
  swal({
    title: "Apakah data akan dihapus?",
    text: "Ketika sudah dihapus, anda tidak bisa mengembalikan lagi!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: 'POST',
        url: url,
        headers:{'csrf_token': csrfToken},
        data: parameters,
        dataType : 'JSON',
        success: successCallback,
      });
      
    } else {
        
      swal(notifBatalHapus);
    }
  });
};

function formatRupiah(angka) {
  var 	bilangan = angka;
      
  var	reverse = bilangan.toString().split('').reverse().join(''),
      ribuan 	= reverse.match(/\d{1,3}/g);
      ribuan	= ribuan.join('.').split('').reverse().join('');
  return ribuan;
}

function notif(jenis, param){

}

function checkChat(){
  getData(BASE_URL+'/manage/unread-chat',function(result){ 

    //console.log(result);
    if(result != 0){
      $("#chatCount").text(result);
    }
  });
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

