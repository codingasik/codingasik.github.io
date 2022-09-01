var tabel;
var logoOlshop = "";
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
      //console.log(data);
      
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

function loadSetting(){
  getData(BASE_URL+"/home/loadSetting",function(result){ 

    //console.log(result);

    let atur = result.pengaturan;

    for (let i = 0; i < atur.length; i++) {
      $("#olshopLogo").attr('src', BASE_URL+'/public/file/img/pengaturan/thumb/'+atur[i].logo_thumb);
      $("#loginLogo").attr('src', BASE_URL+'/public/file/img/pengaturan/'+atur[i].logo);
      $("#banner").attr('src', BASE_URL+'/public/file/img/pengaturan/'+atur[i].banner);
      $("#fotoCara").attr('src', BASE_URL+'/public/file/img/pengaturan/'+atur[i].foto_cara);
      $("#caraBayar").text(`${atur[i].cara_bayar}`);
      $("#judul").text(`${atur[i].judul}`);
      $("#isi").text(`${atur[i].sub_judul}`);
      $("#cfgTelepon").text(`${atur[i].telepon}`);
      $("#cfgEmail").text(`${atur[i].email}`);
      $("#cfgAlamat").text(`${atur[i].alamat} , ${atur[i].city_name} , ${atur[i].province}`);
      $("a#cfgInstagram").attr("href", atur[i].instagram);
      $("a#cfgInstagram").attr("title", atur[i].instagram);
      $("a#cfgFacebook").attr("href", atur[i].facebook);
      $("a#cfgFacebook").attr("title", atur[i].facebook);
      setLogo(atur[i].logo);
    
    }

    //cart
    if(result.countCart == 0){
      $("#countCart").text("");
    }else{
      $("#countCart").text(`${result.countCart}`);
    }

    if(result.unreadChat == 0){
      $("#unreadChat").text("");
    }else{
      $("#unreadChat").text(`${result.unreadChat}`);
    }

    //kategori
    let kat = result.kategori;
    let htmlListKat ="";
    let htmlFooter ="";
    for (let k = 0; k < kat.length; k++) {

      
      htmlListKat += `
      <li><a class="dropdown-item" href="${BASE_URL}/kategori/${kat[k].slug}">${kat[k].kategori}</a></li>
      `;

      htmlFooter += `
        <li class="kategori-list"><a href="${BASE_URL}/kategori/${kat[k].slug}">${kat[k].kategori}</a></li>
      `;
    }
    $("#listKategori").html(htmlListKat);
    $(".kategori-menu").html(htmlFooter);
  });
}



function setLogo(val){
  return logoOlshop = val;
}
function getLogo(){
  return logoOlshop;
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

function scrollSmoothToBottom (id) {
  var div = document.getElementById(id);
  $('#' + id).animate({
     scrollTop: div.scrollHeight - div.clientHeight
  }, 500);
}
