$(document).ready(function () {
  loadSetting();
  detailChat();

  setTimeout(() => {
    detailChat();
  }, 3000);
  
  //$('#chatBox')[0].scrollTop = $('#chatBox')[0].scrollHeight
  scrollSmoothToBottom ('chatBox');
  kirimChat();
});





function detailChat() {
  getData(BASE_URL+"/chat/chatDetail", function (result) {
    //$('#chatBox')[0].scrollTop = $('#chatBox')[0].scrollHeight
    scrollSmoothToBottom ('chatBox');
    //console.log(result.data);
    let html = "";
  
                
    for (let i = 0; i < result.data.length; i++) {

      if(result.data[i].send_by == result.send_by){
        html += 
        `
          <div class="message__layout-from">
            <div class="msg message__from">
              <p>${urlify(result.data[i].message)}</p>
              <small>${result.data[i].created_at}</small>
            </div>
          </div>
        `;
      }else{
        html += `
        
        <div class="message__layout-to">
          <div class="msg message__to">
            <a href="javascript:;" onclick="chatDelete(${result.data[i].id_chat})"><i class="option-to fa fa-close"></i></a>
            <p>${urlify(result.data[i].message)}</p>
            <small>${result.data[i].created_at}</small>
          </div>
        </div>`;
      }
    }
  
    $("#chatBox").html(html);
    

  });
}

function refreshChat() {
  detailChat();
}

function chatDelete(id_chat) {
  deleteData(BASE_URL+"/chat/hapus", { id_chat: id_chat }, function (data) {
    if (data == "relasiData") {
      swal("Gagal!", notifRelasiData, "error");
    } else {
      refreshChat();
      $('[name="message"]').val("");
      swal("Sukses!", notifDataHapus, "success");
    }
  });
}

function kirimChat() {
  $("#formChat").submit(function (event) {
    event.preventDefault();

    $.ajax({
      url:BASE_URL+"/chat/kirim",
      type:"POST",
      dataType : 'JSON',
      headers:{'csrf_token': csrfToken},
      data:new FormData(this),
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success:function(data) {
        //console.log(data);
        $("[name='message']").val("");
        refreshChat();
        
      }
  
    });

    
  });
}
