$(document).ready(function () {
  dataDetail();
  loadSetting();
  addCart();
});

function dataDetail(){
  let slug = $('[name="slugProduk"]').val();
  getDataParam(BASE_URL+"/produk/dataDetail",{slug:slug}, function(result){
    console.log(result);

    //produk
    let pro = result.produk;
    $("#produk").text(pro.produk);
    $("#harga").text('Rp '+formatRupiah(pro.harga));
    $("#deskripsi").text(pro.deskripsi);
    $("#stok").text(pro.stok);
    if(pro.qty != null){
      $("#produkTerjual").text('0 terjual');
    }
    $("[name='id_produk']").val(pro.id_produk);

    
    //foto produk
    let htmlFoto="";
    let htmlIndikator="";
    let foto = result.foto;
    for (let f = 0; f < foto.length; f++) {

     /*  for($i=0; $i<$result->num_rows;$i++){
        echo '
        <li data-target="#carouselExampleIndicators" data-slide-to="'.$i.'"';
        if($i==0){echo'class="active"';}echo'></li>';
    }?> */

      htmlIndikator  += `
        <button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${f}" `;
      if(f == 0){
        htmlIndikator += `class="active"`;
      }  
      htmlIndikator += `aria-current="true" aria-label="Slide 1"></button>`;
      
      if(f == 0){
        htmlFoto += `<div  class="carousel-item active">`;
      }else{
        htmlFoto += `<div class="carousel-item">`;
      } 
      htmlFoto += `
        <img src="${BASE_URL}/public/file/img/produk/${foto[f].foto}" class="d-block w-100" alt="${foto[f].foto}">
        </div>
        `;
      
    }
    $("#fotoIndikator").html(htmlIndikator);
    $("#fotoProduk").html(htmlFoto);
      
  });
}


function addCart(){
  $("#add-cart").submit(function(event){
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
            window.location.href = BASE_URL+'/login';
          }else{
            swal("Gagal!", data.message, "error");
          }
          
        }

    });

  });
}