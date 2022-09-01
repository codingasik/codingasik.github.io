$(document).ready(function () {
  dataCart();
  loadSetting();
});

function dataCart(){
  getData(BASE_URL+"/produk/dataCart", function(result){
    //console.log(result);
    
    //foto produk
    let htmlCart="";
    let no = 1;
    let cart = result.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      let subTotal = cart[i].jumlah * cart[i].harga;
      htmlCart += `
        
        <tr>
          <td scope="row">${no++}</td>
          <td>
            <div class="product-name">
              <img class="thumbnail" src="${BASE_URL}/public/file/img/produk/${cart[i].foto}" alt="">
              <p class="ms-2">${cart[i].produk}</p>
            </div>
          </td>
          <td>Rp ${formatRupiah(cart[i].harga)}</td>
          <td>${cart[i].jumlah}</td>
          <td>Rp ${formatRupiah(subTotal)}</td>
          <td>
            <form class="delete-cart">
                <input type="hidden" name="id_cart" value="${cart[i].id_cart}" >
               <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-close"></i></button>
            </form>
          </td>
        </tr>
      `;
      total += subTotal;
      
    }
    if (cart.length == 0) {
      $("#bodyCart").html(`
        <tr>
          <td colspan="6" class="text-center">Cart Kosong</td>
        </tr>
      `);

      $("#btnCheckout").attr('href','javascript:;');
    }else{
      $("#btnCheckout").attr('href',BASE_URL+'/checkout');
      $("#bodyCart").html(htmlCart);
    }
    $("#totalHarga").text('Rp '+formatRupiah(total));
    $("[name='id_user']").val(result.id_user);
    deleteCart();
    loadSetting();
    checkout();
      
  });
}


function deleteCart(){
  $(".delete-cart").submit(function(event){
    event.preventDefault();

    let formdata = new FormData(this);

      $.ajax({
        type : 'POST',
        data : formdata,
        contentType: false,
        processData: false,
        headers:{'csrfToken': csrfToken},
        url:BASE_URL+"/produk/deleteCart",
        dataType : 'JSON',
        success:function(data) {
          //console.log(data);
         
          if (data == 'relasiData'){
            swal("Gagal!", notifRelasiData, "error");
          }else{
            swal("Sukses!", notifDataHapus, "success");
            dataCart();
            loadSetting();
          }
          
        }

    });

  });
}

function checkout(){
  $("#formCheckout").submit(function(event){
    event.preventDefault();

    let formdata = new FormData(this);

      $.ajax({
        type : 'POST',
        data : formdata,
        contentType: false,
        processData: false,
        headers:{'csrfToken': csrfToken},
        url:BASE_URL+"/produk/deleteCart",
        dataType : 'JSON',
        success:function(data) {
          //console.log(data);
         
          if (data == 'relasiData'){
            swal("Gagal!", notifRelasiData, "error");
          }else{
            swal("Sukses!", notifDataHapus, "success");
            dataCart();
            loadSetting();
          }
          
        }

    });

  });
}

