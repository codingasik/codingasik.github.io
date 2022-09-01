$(document).ready(function () {
  dataKategori();
  loadSetting();
});


function dataKategori(){
  let slug = $('[name="slugKategori"]').val();
  let pageActive = $('[name="pageActive"]').val();
  let filterProduk = $('[name="filterProduk"]').val();
  
  getDataParam(BASE_URL+"/produk/dataKategori",{slug:slug,pageActive:pageActive,filterProduk:filterProduk}, function(result){
    //console.log(result);

    //kategori side
    let jum = result.jumlahKategori;
    let htmlJum ="";
    for (let k = 0; k < jum.length; k++) {


      htmlJum += `
        <li><a href="${BASE_URL}/kategori/${jum[k].slug}">${jum[k].kategori}</a> <span class="float-end">${jum[k].jumlah}</span></li>
      `;
    }
    $("#kategoriProduk").html(htmlJum);

    //Total Produk
    $("#totalProduk").text(result.totalProduk);

    //Produk Terbaru
    let pro = result.produk;
    //let jual = result.dataPenjualan;
    let htmlPro = "";

    for (let b = 0; b < pro.length; b++) {
      htmlPro += `
        <div class="col-lg-3 col-md-3 col-sm-4 col-6">
          <div class="product">
            <div class="product-top">
              <img src="${BASE_URL}/public/file/img/produk/${pro[b].foto}" class="product-img img-thumbnail" alt="${pro[b].foto}">
              <div class="product-body">
                <h6 class="card-title">${pro[b].produk}</h5>
                  <p class="card-text">
                    Rp ${formatRupiah(pro[b].harga)}`;
                    /* $.each(jual, function (i, row) { 
                       if (jual[i].id_produk == pro[b].id_produk){ */
                         if(pro[b].qty == null){
                          htmlPro += `<span>0 terjual</span>`;
                         }else{
                          htmlPro += `<span>${pro[b].qty} terjual</span>`;
                         }
                       /* }
                    }); */
        htmlPro += `</p>
              </div>
            </div>
            <div class="product-bottom">
              <a class="product-btn" href="${BASE_URL}/detail-produk/${pro[b].slug}" title="Detail Produk"><i class="fa fa-eye"></i></a>
              <form class="add-cart">
                <input type="hidden" name="id_produk" value="${pro[b].id_produk}" >
                <input type="hidden" name="jumlah" value="1" >
                <button type="submit" class="btn btn product-btn" href="${BASE_URL}/add-cart/${pro[b].id_produk}" title="Add to Cart"><i class="fa fa-shopping-cart"></i></button>
              </form>
            </div>
          </div>
        </div>
      `;
      
    }
    $("#listProduk").html(htmlPro);

    //console.log();
    let htmlPaginate = "";
    let totalPage = Math.ceil(result.totalPage);

    $("[name='totalPage']").val(totalPage);

    htmlPaginate += `<a href="javascript:;" onclick="previous()" class=""><i class="fa fa-angle-left"></i></a>`;
    for (let i = 1; i <= totalPage; i++) {

      htmlPaginate += `<a href="javascript:;"`;
      if(i == pageActive){ htmlPaginate += `class="active"` } 
      htmlPaginate += `onclick=paginate(${i})>${i}</a>`;
      
    }
    htmlPaginate += `<a href="javascript:;" onclick="next()"><i class="fa fa-angle-right"></i></a>`;

    $(".pagination").html(htmlPaginate);

    addCart();
  });
}

function next(){
  let pageActive = $('[name="pageActive"]').val();
  let totalPage = $("[name='totalPage']").val();
  if(pageActive < totalPage){
    $('[name="pageActive"]').val(parseInt(pageActive)+1);
    dataKategori();
  }
}

function paginate(val){
  let pageActive = $('[name="pageActive"]').val();
  if(pageActive > 1){
    $('[name="pageActive"]').val(val);
    dataKategori();
  }
}

function previous(){
  let pageActive = $('[name="pageActive"]').val();
  if(pageActive > 1){
    $('[name="pageActive"]').val(parseInt(pageActive)-1);
    dataKategori();
  }
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
            swal("Success!", data.message, "success");
            loadSetting();
          }else if(data == "kosong"){
            window.location.href = BASE_URL+'/login';
          }else{
            swal("Gagal!", data.message, "error");
          }
          
        }

    });

    /* saveData('/manage/simpan-kategori',new FormData(this),'#modal');
    reloadTable(); */
  });
}

$("#formFilterHarga").submit(function (e) { 
  e.preventDefault();
  
  let filterHarga = $('[name="filterHarga"]').val();
  $('[name="filterProduk"]').val(filterHarga);
  dataKategori();

});

function filterHarga(val){
  $('[name="filterProduk"]').val(val);
  dataKategori();
}