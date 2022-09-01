$(document).ready(function () {
  dataCaraBayar();
  loadSetting();
});

function dataCaraBayar(){
  getData(BASE_URL+"/home/dataCaraBayar", function(result){
    //console.log(result);
    //Pengaturan
    let atur = result.cara;

    for (let i = 0; i < atur.length; i++) {
      $("#fotoCara").attr('src', BASE_URL+'/public/file/img/pengaturan/'+atur[i].foto_cara);
      $("#fotoCara").attr('alt',BASE_URL+'/public/file/img/pengaturan/'+atur[i].foto_cara);
      $("#caraBayar").text(`${atur[i].cara_bayar}`);
    }

      
  });
}