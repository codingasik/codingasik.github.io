$(document).ready(function () {
  dataCheckout();
  loadSetting();
  cekOngkir();
  buatPesanan();
});

function dataCheckout() {
  getData("produk/dataCheckout", function (result) {
    console.log(result);

    $("#alamat").html(`
      ${result.profil.nama} (${result.profil.telepon}) <br>
      ${result.profil.alamat}, ${result.profil.kecamatan}, ${result.profil.city_name}, ${result.profil.province}, ${result.profil.postal_code}`);

    $("[name='city_id']").val(result.profil.city_id);

    //foto produk
    let htmlCart = "";
    let no = 1;
    let cart = result.cart;
    let total = 0;
    let berat = 0;
    for (let i = 0; i < cart.length; i++) {
      let subTotal = cart[i].jumlah * cart[i].harga;
      let beratTotal = cart[i].jumlah * cart[i].berat;
      htmlCart += `
        
        <tr>
          <td scope="row">${no++}</td>
          <td>
            <div class="product-name">
              <img class="thumbnail" src="public/file/img/produk/${
                cart[i].foto
              }" alt="">
              <p class="ms-2">${cart[i].produk}</p>
            </div>
          </td>
          <td>Rp ${formatRupiah(cart[i].harga)}</td>
          <td>${cart[i].jumlah}</td>
          /* <td>${beratTotal}</td> */
          <td>Rp ${formatRupiah(subTotal)}</td>
        </tr>
      `;
      total += subTotal;
      berat += beratTotal;
    }
    $("#bodyCart").html(htmlCart);
    $("[name='totalHarga']").val(total);
    $("#totalHarga").text('Rp '+formatRupiah(total));
    $("[name='berat']").val(berat);
    $("[name='totalBerat']").val(berat);
    $("#totalBerat").text(berat+' gr');
    $("[name='id_user']").val(result.id_user);
  });
}

$('#btnCheck').click(function(){
  getData(BASE_URL+"/profil/dataProfil", function(result){
    console.log(result);
    let pro = result.profil;

    if(pro.alamat == null || pro.alamat == "" || pro.telepon == null || pro.telepon == "" || pro.province_id == null || pro.province_id == ""|| pro.city_id == null || pro.city_id == ""|| pro.postal_code == null || pro.postal_code == ""|| pro.kecamatan == null || pro.kecamatan == "" || pro.nama == null || pro.nama == "" || pro.province == null || pro.province == ""|| pro.city_name == null || pro.city_name == ""){
      swal("Alert!", "Lengkapi profil terlebih dahulu", "error");
      setTimeout(() => {
        window.location.href = BASE_URL+"/profil";
      }, 2500);
    }else{
      $('#modalKirim').modal('show');
    }

  });
  //

});

function cekOngkir() {
  $("#formKurir").submit(function (event) {
    event.preventDefault();

    let kurir = $("[name='kurir']").val();
    $("[name='jasaKurir']").val(kurir);


    $.ajax({
      url: "produk/cekOngkir",
      type: "POST",
      dataType: "JSON",
      data: new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success: function (data) {
        let html = "";
        let no = 1;
        for (let i = 0; i < data.length; i++) {
          let co = data[i].costs;
          //console.log(co);

          for (let c = 0; c < co.length; c++) {
            html += `
              <tr>
                <th scope="row">${no++}</th>
                <td>${co[c].service} (${co[c].description})</td>
                <td>${co[c].cost[0].etd}</td>
                <td>${co[c].cost[0].value}</td>
                <td>
                  <form class="form-checkout">
                    <input type="hidden" name="service" value="${co[c].service}">
                    <input type="hidden" name="description" value="${
                      co[c].description
                    }">
                    <input type="hidden" name="etd" value="${co[c].cost[0].etd}">
                    <input type="hidden" name="value" value="${
                      co[c].cost[0].value
                    }">
                    <button type="submit" class="btn btn-success btn-sm" title="Pilih Layanan"><i class="fa fa-check"></i></button>
                  </form>
                </td>
              </tr>
            `;
          }
        }

        $("#bodyCheckout").html(html);
        pilihKurir();
        
      },
    });
  });
}

function pilihKurir() {
  $(".form-checkout").submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: "produk/pilihKurir",
      type: "POST",
      dataType: "JSON",
      data: new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success: function (data) {

        //console.log(data);
        let jasaKurir = $("[name='jasaKurir']").val();

        $("#totalOngkir").text('Rp '+formatRupiah(data.value));
        $("#ongkir").text('Rp '+formatRupiah(data.value));

        let totalHarga = $("[name='totalHarga']").val();

        let totalPesanan = parseInt(totalHarga) + parseInt(data.value);
        $("[name='totalPesanan']").val(totalPesanan);
        $("[name='totalOngkir']").val(data.value);
        $("#totalPesanan").text('Rp '+formatRupiah(totalPesanan));
        $("[name='serviceKurir']").val(data.service);
        $("[name='etd']").val(data.etd);
        $("#kurirService").text(`${jasaKurir} ${data.service} (${data.description})`);

        $("#modalKirim").modal('hide');

      },
    });
  });
}


function buatPesanan() {
  $("#formBuatPesanan").submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: BASE_URL+"/produk/buatPesanan",
      type: "POST",
      dataType: "JSON",
      data: new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success: function (data) {

        //console.log(data);

        if(data.status == "isidata"){
          swal("Gagal!", data.message, "error");
        }else if(data.status == "berhasil"){
          swal("Sukses!", data.message, "success");

          setTimeout(() => {
            window.location.href = BASE_URL+"/pesanan";
          }, 2000);
        }else{
          swal("Gagal!", data.message, "error");
        }

      },
    });
  });
}