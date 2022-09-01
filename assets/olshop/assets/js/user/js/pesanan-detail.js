$(document).ready(function () {
  loadSetting();
  detail();
  konfirmasi();
});

function detail() {
  let kode_transaksi = $("[name='kode_transaksi']").val();

  getDataParam(BASE_URL+"/produk/dataPesananDetail",{kode_transaksi:kode_transaksi}, function (result) {

    //console.log(result);

    let trs = result.dataTransaksi;

    if(trs.catatan != ""){
      $("#catatan").text(trs.catatan);
    }
    $("#totalBayar").text('Rp '+formatRupiah(trs.total));
    if(trs.status_bayar == 0){
      $("#statusBayar").text("Belum Bayar");
    }else{
      $("#statusBayar").text("Sudah Dibayar");
    }

    if(trs.status_kirim == "menunggu"){
      $("#statusKirim").text("Menunggu Pembayaran");
    }else if(trs.status_kirim == "diproses"){
      $("#statusKirim").text("Sedang Diproses");
    }else if(trs.status_kirim == "dikirim"){
      $("#statusKirim").text("Sedang Dikirim");

      $("#boxKonfirmasi").html(`    
        <form id="formKonfirmasi">
          <input type="hidden" name="kodeTransaksi" value="${kode_transaksi}">
          <div class="form-group row ">
            <label for="konfirmasi" class="control-label col-4 col-md-4">Produk telah diterima?</label>
            <select class="col-8 col-md-8 " name="konfirmasi" id="konfirmasi" required>
              <option value="">--Konfirmasi--</option>
              <option value="diterima">Produk Diterima</option>
            </select>
          </div>
          <div class="form-group row mt-3">
            <label for="konfirmasi" class="control-label col-4 col-md-4"></label>
            <button type="submit" class="btn btn-sm btn-primary col-8 col-md-8">Konfirmasi</button>
          </div>
        </form>
      `);
      konfirmasi();
    }else{
      $("#statusKirim").text("Selesai");
    }
    if(trs.kurir != ""){
      $("#jasaKurir").text(`${trs.kurir.toUpperCase()} ${trs.service} | Rp ${formatRupiah(trs.ongkir)} | ${trs.estimasi} days`);
    }

    $("a#struk").attr('href',`${BASE_URL}/invoice-pesanan/${trs.kode_transaksi}`);
    
    
    

    let byr = result.dataDetail;
    let html ="";
    $.each(byr, function (i, row) { 
       
      html += `
        <div class="mb-2 col-12 col-md-12">
          <img id="fotoProduk" class="thumbnail float-start me-2" src="${BASE_URL}/public/file/img/produk/${byr[i].foto}" alt="">
          <div >
            <span>${byr[i].produk}</span> <br>
            <span>${byr[i].qty}x</span>
          </div>
        </div>
      `;
    });

    $("#produkList").html(html);


    if(trs.bukti == null || trs.bukti == ""){
      let html2 = `
        <div class="table-box" >
          <form id="formUploadBukti">
            <input type="hidden" name="kode_transaksi" value="${trs.kode_transaksi}">
            <div class="form-group row mb-3">
              <label class="control-label col-md-3 col-sm-4 col-5 text-end">Foto Bukti :</label>
              <div class="col-md-9 col-sm-8 col-7">
                <input name="foto" id="foto" type="file" class="form-control"> <br>
                <small style="color:red">*nb : file size max 400kb</small>
              </div>
            </div>
            <div class="form-group row mb-3">
              <label class="control-label col-md-3 col-sm-4 col-5 text-end"></label>
              <button type="submit" class="d-grid mx-2 btn btn-sm btn-primary col-md-8 col-sm-5 col-5 my-2">Kirim Bukti</button>
            </div>
          </form>
        </div>
      `;  
      $("#boxUploadBukti").html(html2);

      uploadBukti();
    }else{
      let html = `
      <div class="table-box">
        <div class="form-group row mb-3">
          <label class="control-label col-md-3 col-sm-4 col-5 text-end">Foto Bukti :</label>
          <a id="aFotoBukti" href="${BASE_URL}/public/file/img/transaksi/${trs.bukti}" target="_blank" class="col-md-9 col-sm-8 col-7" title="Lihat bukti pembayaran">
            <img id="fotoBukti" src="${BASE_URL}/public/file/img/transaksi/${trs.bukti}" class="img-fluid" alt="">
          </a>
        </div>
      </div>
      `;
      $("#boxUploadBukti").html(html);

      $("#strukBox").html(`
      <a id="struk" href="${BASE_URL}/invoice-pesanan/${trs.kode_transaksi}" class="d-grid btn btn-warning " target="_blank"><i class="fa fa-print"> Struk</i></a>`);
    }

  });

  getData(BASE_URL+"/home/loadSetting",function(result){ 

    //console.log(result);

    let atur = result.pengaturan;

    for (let i = 0; i < atur.length; i++) {

      $("a#whatsapp").attr('href',`https://wa.me/${atur[i].telepon}`);
    
    }
  });
}

function uploadBukti(){
  $("#formUploadBukti").submit(function(event){
    event.preventDefault();
    $.ajax({
      url:BASE_URL+"/produk/uploadBukti",
      type:"POST",
      dataType : 'JSON',
      data:new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success:function(data) {

        if(data.status == "success"){
          swal("Sukses!", data.message, "success");
          detail();
        }else if(data.status == 2){
          swal("Gagal!", data.message, "error");
        }else{
          swal("Gagal!", data.message, "error");
        }

        
      }

    });
        
  });
}


function konfirmasi(){
  $("#formKonfirmasi").submit(function(event){
    event.preventDefault();
    $.ajax({
      url:BASE_URL+"/produk/konfirmasi",
      type:"POST",
      dataType : 'JSON',
      data:new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success:function(data) {
        console.log(data);

        if(data.status == "success"){
          swal("Sukses!", data.message, "success");
          detail();
        }else if(data.status == "failed"){
          swal("Gagal!", data.message, "error");
        }else{
          swal("Gagal!", data.message, "error");
        }

        
      }

    });
        
  });
}
