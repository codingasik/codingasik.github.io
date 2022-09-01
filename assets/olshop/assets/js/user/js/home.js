$(document).ready(function () {
  dataHome();
});

function dataHome(){
  getData(BASE_URL+"/home/getData", function(result){
    //console.log(result);
    //Pengaturan
    let atur = result.pengaturan;

    for (let i = 0; i < atur.length; i++) {
      $("#olshopLogo").attr('src', BASE_URL+'/public/file/img/pengaturan/thumb/'+atur[i].logo_thumb);
      $("#banner").attr('src', BASE_URL+'/public/file/img/pengaturan/'+atur[i].banner);
      $("#judul").text(`${atur[i].judul}`);
      $("#isi").text(`${atur[i].sub_judul}`);
      $("#cfgTelepon").text(`${atur[i].telepon}`);
      $("#cfgEmail").text(`${atur[i].email}`);
      $("#cfgAlamat").text(`${atur[i].alamat} , ${atur[i].city_name} , ${atur[i].province}`);
      $("a#cfgInstagram").attr("href", atur[i].instagram);
      $("a#cfgInstagram").attr("title", atur[i].instagram);
      $("a#cfgFacebook").attr("href", atur[i].facebook);
      $("a#cfgFacebook").attr("title", atur[i].facebook);

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
    
    }

    //kategori
    let kat = result.kategori;
    let htmlKat ="";
    let htmlListKat ="";
    let htmlFooter = "";
    for (let k = 0; k < kat.length; k++) {
      
      htmlKat += `
        <div class="card-category">
        <a href="${BASE_URL}/kategori/${kat[k].slug}" title="Cari ${kat[k].kategori}"><img class="mx-auto pesanan-product"  src="${BASE_URL}/public/file/img/kategori/${kat[k].gambar}" alt="${kat[k].gambar}"></a>
          <p>${kat[k].kategori}</p>
        </div>
      `;

      htmlListKat += `
        <li><a class="dropdown-item" href="kategori/${kat[k].slug}">${kat[k].kategori}</a></li>
      `;

      htmlFooter += `
        <li class="kategori-list"><a href="kategori/${kat[k].slug}">${kat[k].kategori}</a></li>
      `;
    }
    $("#kategoriList").html(htmlKat);
    $("#listKategori").html(htmlListKat);
    $(".kategori-menu").html(htmlFooter);

    //Produk Terbaru
    let jual = result.dataPenjualan;
    let baru = result.produkTerbaru;
    let htmlBaru = "";

    for (let b = 0; b < baru.length; b++) {
      htmlBaru += `
        <div class="col-lg-2 col-md-3 col-sm-4 col-6">
          <div class="product">
            <div class="product-top">
              <img src="${BASE_URL}/public/file/img/produk/${baru[b].foto}" class="product-img img-thumbnail" alt="${baru[b].foto}">
              <div class="product-body">
                <h6 class="card-title">${baru[b].produk}</h5>
                <p class="card-text">
                  Rp ${formatRupiah(baru[b].harga)}`;
                  if(baru[b].qty == null){
                    htmlBaru += `<span>0 terjual</span>`;
                  }else{
                    htmlBaru += `<span>${baru[b].qty} terjual</span>`;
                  }
      htmlBaru += `</p>
              </div>
            </div>
            <div class="product-bottom">
              <a class="product-btn" href="detail-produk/${baru[b].slug}" title="Detail Produk"><i class="fa fa-eye"></i></a>
              <form class="add-cart">
                <input type="hidden" name="id_produk" value="${baru[b].id_produk}" >
                <input type="hidden" name="jumlah" value="1" >
                <button type="submit" class="btn btn product-btn" href="${BASE_URL}/add-cart/${baru[b].id_produk}" title="Add to Cart"><i class="fa fa-shopping-cart"></i></button>
              </form>
            </div>
          </div>
        </div>
      `;
      
    }
    $("#produkBaru").html(htmlBaru);

    
    
    //Produk Terpopuler
    let pop = result.produkTerlaris;
    
    let htmlPop = "";

    for (let b = 0; b < pop.length; b++) {
      htmlPop += `
        <div class="col-lg-2 col-md-3 col-sm-4 col-6">
          <div class="product">
            <div class="product-top">
              <img src="${BASE_URL}/public/file/img/produk/${pop[b].foto}" class="product-img img-thumbnail" alt="${pop[b].foto}">
              <div class="product-body">
                <h6 class="card-title">${pop[b].produk}</h5>
                <p class="card-text">
                    Rp ${formatRupiah(pop[b].harga)}`;
                      if(pop[b].qty == null){
                      htmlPop += `<span>0 terjual</span>`;
                      }else{
                      htmlPop += `<span>${pop[b].qty} terjual</span>`;
                      }

        htmlPop += `</p>
              </div>
            </div>
            <div class="product-bottom">
              <a class="product-btn" href="detail-produk/${pop[b].slug}" title="Detail Produk"><i class="fa fa-eye"></i></a>
              <form class="add-cart">
                <input type="hidden" name="id_produk" value="${pop[b].id_produk}" >
                <input type="hidden" name="jumlah" value="1" >
                <button type="submit" class="btn btn product-btn" title="Add to Cart"><i class="fa fa-shopping-cart"></i></button>
              </form>
            </div>
          </div>
        </div>
      `;
      
    }
    $("#produkPopuler").html(htmlPop);

    addCart();

  });
}

function addCart(){
  $(".add-cart").submit(function(event){
    event.preventDefault();

    let formdata = new FormData(this);

      $.ajax({
        type : 'POST',
        data : formdata,
        contentType: false,
        processData: false,
        headers:{'csrfToken': csrfToken},
        url:BASE_URL+"/produk/addCart",
        dataType : 'JSON',
        success:function(data) {
          //console.log(data);
         
          if(data.status == 1){
            swal("Success!", "cart berhasil ditambah", "success");
            loadSetting();
          }else if(data == "kosong"){
            window.location.href = BASE_URL+"/login";
          }else{
            swal("Gagal!", data.message, "error");
          }
          
        }

    });

    /* saveData('/manage/simpan-kategori',new FormData(this),'#modal');
    reloadTable(); */
  });
}