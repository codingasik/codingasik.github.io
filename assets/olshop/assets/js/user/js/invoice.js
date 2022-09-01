$(document).ready(function () {
  loadSetting();
  detail();
});

function detail() {
  let kode_transaksi = $("[name='kode_transaksi']").val();

  getDataParam(BASE_URL+"/produk/dataPesananDetail",{kode_transaksi:kode_transaksi}, function (result) {

    console.log(result);

    let trs = result.dataTransaksi;
    let pfl = result.dataProfil;

    $("#total").text('Rp '+formatRupiah(trs.total));
    $("#tglBayar").text(trs.tgl_bayar);
    $("#ongkir").text('Rp '+formatRupiah(trs.ongkir));
    $("#totalPesanan").text('Rp '+formatRupiah(trs.total));

    $("#nama").text(pfl.nama);
    $("#username").text(pfl.username);
    $("#alamat").text(pfl.alamat);
    $("#kota").text(pfl.city_name);
    $("#provinsi").text(pfl.province);
    $("#kodePos").text(pfl.postal_code);
    $("#telepon").text(pfl.telepon);

    if(trs.kurir != ""){
      $("#jasaKurir").text(`${trs.kurir.toUpperCase()} ${trs.service} | ${trs.estimasi} days`);
    }

    $("a#struk").attr('href',`${BASE_URL}/invoice-pesanan/${trs.kode_transaksi}`);
    

    let byr = result.dataDetail;
    let html ="";
    let subtotal = 0;
    $.each(byr, function (i, row) { 
       
      subtotal += parseInt(byr[i].harga) * parseInt(byr[i].qty);
      html += `
        <div class="row my-2">
          <div class="col-6 col-md-6">
            <span>${byr[i].produk}</span>
            <span>${byr[i].qty}x</span>
          </div>
          <div class="col-6 col-md-6 text-end text-md-start">
            <span>Rp ${formatRupiah(byr[i].harga)}</span>
          </div>
        </div>
      `;
    });

    $("#listProduk").html(html);
    $("#subTotal").text('Rp '+formatRupiah(subtotal));


  });

  getData(BASE_URL+"/home/loadSetting",function(result){ 

    //console.log(result);

    let atur = result.pengaturan;

    for (let i = 0; i < atur.length; i++) {

      $("#tokoNama").text(`${atur[i].toko}`);
      $("#tokoAlamat").text(`${atur[i].alamat}`);
      $("#tokoKota").text(`${atur[i].city_name}`);
      $("#tokoProvinsi").text(`${atur[i].province}`);
      $("#tokoTelepon").text(`${atur[i].telepon}`);
      $("#tokoEmail").text(`${atur[i].email}`);
      $("a#cfgFacebook").attr("title", atur[i].facebook);
    
    }
  });

}

