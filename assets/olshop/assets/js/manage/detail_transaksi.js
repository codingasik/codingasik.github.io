$(document).ready(function() {
  getDataDetail();
  checkChat();
});


function getDataDetail(){

  let kode_transaksi = $("#kodeTransaksi").text();
  //console.log(kode_transaksi);
  getDataParam(BASE_URL+"/manage/data-detail",{['csrf_token']:csrfToken,kode_transaksi:kode_transaksi}, function(result){
    //console.log(JSON.stringify(result.dataTransaksi));

    let trs = result.dataTransaksi;

    let ongkir = parseInt(trs.ongkir);

    $("#userNama").text(trs.nama);
    $("#userUsername").text(trs.username);
    $("#userAlamat").text(trs.alamat);
    $("#userCity").text(trs.city_name);
    $("#userProvince").text(trs.province);
    $("#userPostal").text(trs.postal_code);
    $("#userTelepon").text(trs.telepon);
    $("#userEmail").text(trs.email);
    $("#tanggal").text(trs.created_at);
    $("#status_kirim").text(trs.status_kirim);
    if(trs.status_bayar == 0){
      $("#status_bayar").text("Belum Bayar");
    }else{
      $("#status_bayar").text("Sudah Dibayar");
    }
    $("[name='status_kirim']").val(trs.status_kirim);
    $("[name='kode_transaksi']").val(trs.kode_transaksi);
    $("#kurir").text(`${trs.kurir.toUpperCase()} ${trs.service} | Rp ${formatRupiah(trs.ongkir)} | ${trs.estimasi} days`);
    $("#ongkir").text(formatRupiah(trs.ongkir));
    $("#catatan").text(trs.catatan);
    $("#bukti").attr('src', BASE_URL+'/public/file/img/transaksi/'+trs.bukti);
    $("a#linkBukti").attr("href", BASE_URL+'/public/file/img/transaksi/'+trs.bukti);
    
    let html = "";
    let no = 1;
    let i;
    let total =0;
    for (i = 0; i < result.dataDetail.length; i++) {

      html += `
        <tr>
          <td>${no++}</td>
          <td>${result.dataDetail[i].produk}</td>
          <td>${result.dataDetail[i].berat} gr</td>
          <td>Rp ${formatRupiah(result.dataDetail[i].harga)}</td>
          <td>${result.dataDetail[i].qty}</td>
        </tr>
      `;
      total += parseInt(result.dataDetail[i].harga);
      //console.log(result.dataDetail[i].harga);
      
    }
    let totalBayar = ongkir + total;
    $("#totalBayar").text(formatRupiah(totalBayar));
    $("#total").text(formatRupiah(total));
    $("#bodyDetail").html(html);
  });

  return false;
};

$(function(){
  $("#formStatus").submit(function(event){
    event.preventDefault();

    saveData(BASE_URL+'/manage/simpan-status',new FormData(this),'#modal');
    getDataDetail();
  });
});
