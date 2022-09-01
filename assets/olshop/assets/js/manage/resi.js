$(document).ready(function () {
  getDataDetail();
  dataPengaturan();
});

function getDataDetail() {
  let kode_transaksi = $("#kodeTransaksi").text();
  //console.log(kode_transaksi);
  getDataParam(BASE_URL+"/manage/data-detail",
    { ["csrf_token"]: csrfToken, kode_transaksi: kode_transaksi },
    function (result) {

      let trs = result.dataTransaksi;
      //console.log(JSON.stringify(trs));

      let ongkir = parseInt(trs.ongkir);

      $("#userNama").text(trs.nama);
      $("#userUsername").text(trs.username);
      $("#userAlamat").text(trs.alamat);
      $("#userCity").text(trs.city_name);
      $("#userProvince").text(trs.province);
      $("#userPostal").text(trs.postal_code);
      $("#userTelepon").text(trs.telepon);
      $("#userEmail").text(trs.email);
      $("#kurir").text(`${trs.kurir.toUpperCase()} ${trs.service} | ${trs.estimasi} days`);
      $("#ongkir").text(formatRupiah(trs.ongkir));
      $("#berat").text(trs.berat+' gr');
      $("#catatan").text(trs.catatan);
      $("#bukti").attr(
        "src",
        BASE_URL+"/public/file/img/transaksi/" + trs.bukti
      );
      $("a#linkBukti").attr(
        "href",
        BASE_URL+"/public/file/img/transaksi/" + trs.bukti
      );

      let html = "";
      let no = 1;
      let i;
      let total = 0;
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
        total += parseInt(result.dataDetail[i].harga) * parseInt(result.dataDetail[i].qty);
        //console.log(result.dataDetail[i].harga);
      }
      let totalBayar = ongkir + total;
      $("#totalBayar").text(formatRupiah(totalBayar));
      $("#total").text(formatRupiah(total));
      $("#bodyDetail").html(html);
    }
  );

  return false;
}

function dataPengaturan() {
  getData(BASE_URL+"/manage/data-pengaturan", function (result) {
    //console.log(JSON.stringify(result[0]));
    let data = JSON.stringify(result[0]);

    $("#picLogo").attr(
      "src",
      BASE_URL+"/public/file/img/pengaturan/thumb/" + result[0].logo_thumb
    );
    $("#olshop").text(result[0].olshop);
    $("#toko").text(result[0].toko);
    $("#alamat").text(result[0].alamat);
    $("#city").text(result[0].city_name);
    $("#province").text(result[0].province);
    $("#postalCode").text(result[0].postal_code);
    $("#telepon").text(result[0].telepon);
    $("#email").text(result[0].email);
    window.print();
  });
  return false;
}
