$(document).ready(function () {
  listChat();
  checkChat();
  kirimChat();
  
});


function scrollSmoothToBottom (id) {
  var div = document.getElementById(id);
  $('#' + id).animate({
     scrollTop: div.scrollHeight - div.clientHeight
  }, 500);
}


function listChat(){
  getDataParam(BASE_URL+'/manage/data-chat-admin',{level:'Admin'},function(result){
    let html = "";
    
    console.log(result);

      for (let i = 0; i < result.length; i++) {

        if(`${result[i].username}`)
        html += `<div id="box${result[i].id_user}" class="chat__user box${result[i].id_user}">
                  <img class="avatar"  src="${BASE_URL}/public/file/img/user/${result[i].foto}" alt="Foto">
                  <div class="chat__user__box">
                    <div class="chat__user__box-top">
                      <h4><a href="javascript:;" onclick="detailChat(${result[i].id_user})" >${result[i].username}</a></h4>
                      <span class="badge bg-green">`;
                      if(result[i].pesan_baru != 0){
                        html +=`${result[i].pesan_baru}`;
                      }
                      html +=`</span>
                    </div>
                  </div>
                </div>`;
      } 

    $("#listChat").html(html); 
    kirimChat();
    /* 
<small>${result[i].created_at}</small>
     <p>${result[i].message}</p>
    
    */
  });
}

function detailChat(id_user){
  if($(".chat__user").hasClass('active')){
    $(".chat__user").removeClass('active');
  };
  getDataParam(BASE_URL+'/manage/chat-detail',{send_by:id_user},function(result){
    listChat();
    
    setTimeout(() => {
      $(".box"+id_user).addClass('active');
      checkChat();
      
    }, 100);
    
    //console.log(result.data);
    let html = "";
  
    html += `
      <div class="col-md-8 col-sm-8 col-xs-12">
      <input type="hidden" name="id_user" value="${id_user}">
        <div class="x_panel">
          <div class="x_title">
            <h2>Chat</h2>
            <ul  class="nav navbar-right panel_toolbox" style="
            text-align: right;">
                <li ><a href="javascript:;" onclick="refreshChat()" class=""><i class="fa fa-refresh"></i></a>
                </li>
                <li ><a href="javascript:;" onclick="closeChat()" class="close-link"><i class="fa fa-close"></i></a>
                </li>
              </ul>
            <div class="clearfix"></div>
          </div>
          <div class="x_content" id="boxChat">
            <div class="clearfix"></div>
            <div class="message">
              <div class="message__display">
                `;
                
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


              html += `</div>
              <form class="message_form" id="formChat">
                <input type="hidden" name="id_user" value="${id_user}">
                <input name="message" type="text" class="form-control" placeholder="Ketik text . ." required>
                <button type="submit" class="btn btn-sm btn-info"><i class="fa fa-send"></i></button>
              </form>
        
            </div>
  
          </div>
        </div>
      </div>
    `;
  
    $("#chatBox").html(html);
    setTimeout(() => {
      scrollSmoothToBottom ('boxChat');
      
    }, 100);
    

    /* 
     <div class="message__layout-from">
                  <div class="msg message__from">
                    <i class="option-from fa fa-close"></i>
                    <p>${result.data[i].message}</p>
                    <small>${result.data[i].created_at}</small>
                  </div>
                </div>

          <div class="message__tgl">
                  <p >15 Januari 2022</p>
                </div>
    */
  });

}

function closeChat(){

  $("#chatBox").html("");
}

function refreshChat(){
  let id_user = $("[name='id_user']").val();
  detailChat(id_user);
  scrollSmoothToBottom ('boxChat');
}

function chatDelete(id_chat){
  deleteData(BASE_URL+'/manage/hapus-chat',{id_chat:id_chat},function(data){

    if (data == 'relasiData'){
      swal("Gagal!", notifRelasiData, "error");
    }else{
      refreshChat();

      swal("Sukses!", notifDataHapus, "success");
    }

  });
}




function kirimChat(){
  $("#formChat").submit(function(event){
    event.preventDefault();

    $.ajax({
      url:BASE_URL+"/manage/kirim-chat",
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