$(document).ready(function () {
  kirim(0,'menunggu');
  loadSetting();

});


function kirim(bayar,kirim) {
  getDataParam(BASE_URL+"/produk/dataPesananKirim",{bayar:bayar,kirim:kirim}, function (result) {

    console.log(result); 

    let html = "";
    let byr  = result.dataTransaksi;

    let byr2 = result.dataKirim;
    $.each(byr, function (i, val) { 
      /* <span   class = "">Belum Dibayar</span> */
      html += `
        <div class = "pesanan-list">
        <div class = "table-box">
        <div class = "row">
        <div class = "col-8">
              <b>${byr[i].kode_transaksi}</b> <br>
                <span>Rp ${formatRupiah(byr[i].total)}</span> |
                <span>${byr[i].kurir} ${byr[i].service}</span> |
                <span>${byr[i].estimasi} Days</span>
              </div>
              <div    class = "col-4 text-md-end">
              
              <a href="${BASE_URL}/pesanan/${byr[i].kode_transaksi}" class = "btn btn-sm btn-primary">detail</a>
                </div>
                </div>
                <hr>`;
                $.each(byr2, function (k, key) { 

                  if(byr[i].kode_transaksi == byr2[k].kode_transaksi){

                    html += `<div class="pesanan-product">
                        <div class   = "row">
                        <div class   = "col-9">
                        <img loading = "lazy" class = "thumbnail float-start me-2" src = "${BASE_URL}/public/file/img/produk/${
                              byr2[k].foto
                            }" alt="${byr2[k].foto}">
                            <span>${byr2[k].produk}</span><br>
                            <span>${byr2[k].qty}x</span>
                          </div>
                          <div  class = "col-3">
                          <span class = "float-end">Rp ${formatRupiah(
                              byr2[k].harga
                            )}</span>
                          </div>
                        </div>
                        <div class = "clearfix"></div>
                            </div>`;
                  }
                });
      html += `
          </div>
        </div>
      `;

    });

    if (byr2.length == 0) {
      $("#"+kirim).html(`
      <div class = "pesanan-list">
        <div class="table-box text-center">
          <p class="mt-2">Pesanan Kosong</p>
        </div>
      </div>
      `); 
    }else{
      $("#"+kirim).html(html); 
    }

  });
}

