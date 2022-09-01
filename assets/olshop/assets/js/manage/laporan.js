$(document).ready(function () {
  checkChat();
});

$(function(){
  $("#formdata").submit(function(event){
    event.preventDefault();
    
    var selectSort = $("#selectSort").val();
    getDataParam(BASE_URL+"/manage/sort-laporan",{selectSort:selectSort}, function(result){
        var html = "";
        var html2 = "";
        
        if (result.selectSort == "tanggal"){
          html += `
            <div class="col-md-6 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Sort by Tanggal</h2>
                  <ul class="nav navbar-right panel_toolbox">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div class="x_content">
                  <br>
        
                  <form class="form-horizontal form-label-left input_mask" id="formTanggal" action="${BASE_URL}/manage/data-laporan" method="POST" target="_blank">
                    <input name="filter" type="hidden" value="tanggal">
                    <input name="proses" type="hidden" value="print">
        
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Dari tanggal</label>
                      <div class="col-md-8 col-sm-8 col-xs-12">
                        <input name="tanggalawal" value="" type="date" class="form-control col-md-7 col-xs-12" id="tanggalawal" required="">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Sampai tanggal</label>
                      <div class="col-md-8 col-sm-8 col-xs-12">
                        <input name="tanggalakhir" value="" type="date" class="form-control col-md-7 col-xs-12" id="tanggalakhir" required="">
                      </div>
                    </div>
        
                    <div class="ln_solid"></div>
                    <div class="form-group">
                      <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                        <button type="submit" class="btn btn-primary" id="btnReset">Print</button>
                        <button type="button" class="btn btn-success" id="btnProsesTanggal">Proses</button>
                      </div>
                    </div>
        
                  </form>
                </div>
              </div>
            </div>
          `;
          $("#templateSort").html(html);
          getTanggal();
          
          
        }else if (result.selectSort == "bulan"){
          html += `
            <div class="col-md-6 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Sort by Bulan</h2>
                  <ul class="nav navbar-right panel_toolbox">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div class="x_content">
                  <br>
        
                  <form class="form-horizontal form-label-left input_mask" id="formBulan" action="${BASE_URL}/manage/data-laporan" method="POST" target="_blank">
                    <input name="filter" type="hidden" value="bulan">
                    <input name="proses" type="hidden" value="print">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Dari Bulan</label>
                      <div class="col-md-8 col-sm-8 col-xs-12">
        
                        <select required="" name="bulanawal" id="bulanawal" class="form-control col-md-7 col-xs-12" title="Pilih Bulan">
                          <option value="">--Pilih Bulan--</option>
                          `;

                          $.map(result.bulan, function (val, key) {
                            html += `<option value="${key}">${val}</option>`;
                          });
                          
                          /* result.bulan.map(function(key,val){
                            html += `<option value="${key}">${val}</option>`;
                          }); */

                          
                    html += `</select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Sampai Bulan</label>
                      <div class="col-md-8 col-sm-8 col-xs-12">
        
                        <select required="" name="bulanakhir" id="bulanakhir" class="form-control col-md-7 col-xs-12" title="Pilih Bulan">
                          <option value="">--Pilih Bulan--</option>`;

                          $.map(result.bulan, function (val, key) {
                            html += `<option value="${key}">${val}</option>`;
                          });

              html += `</select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Tahun</label>
                      <div class="col-md-8 col-sm-8 col-xs-12">
                        <select required="" name="tahun" class="form-control form-control-user" title="Pilih Tahun">
                          <option value="">--Pilih Tahun--</option>`;
                         /*  $.map(result.tahun, function (val, key) {
                            html += `<option value="${val}">${key}</option>`;
                          }); */
                          for(var i=0; i<result.tahun.length; i++){
                              html += '<option value="'+result.tahun[i].tahun+'">'+result.tahun[i].tahun+'</option>';
                          }
                       html += `</select>
                      </div>
                    </div>
                    <div class="ln_solid"></div>
                    <div class="form-group">
                      <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                        <button type="submit" class="btn btn-primary" id="btnReset">Print</button>
                        <button type="button" class="btn btn-success" id="btnProsesBulan">Proses</button>
                      </div>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          `;

          $("#templateSort").html(html);
          getBulan();
        }else if( result.selectSort == "tahun"){
          html += `
          <div class="col-md-6 col-xs-12">
          <div class="x_panel">
            <div class="x_title">
              <h2>Sort by Tahun</h2>
              <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
              </ul>
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <br>
    
              <form class="form-horizontal form-label-left input_mask" id="formTahun" action="${BASE_URL}/manage/data-laporan" method="POST" target="_blank">
                <input name="filter" type="hidden" value="tahun">
                <input name="proses" type="hidden" value="print">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Tahun</label>
                  <div class="col-md-8 col-sm-8 col-xs-12">
                    <select required="" name="tahun" class="form-control form-control-user" title="Pilih Tahun">
                      <option value="">--Pilih Tahun--</option>`;
                      for(var i=0; i<result.tahun.length; i++){
                        html += '<option value="'+result.tahun[i].tahun+'">'+result.tahun[i].tahun+'</option>';
                      }
                    html += `</select>
                  </div>
                </div>
                <div class="ln_solid"></div>
                <div class="form-group">
                  <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                    <button type="submit" class="btn btn-primary" id="btnReset">Print</button>
                    <button type="button" class="btn btn-success" id="btnProsesTahun">Proses</button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
          `;

          $("#templateSort").html(html);
        
          getTahun();
        }

        html2 += `
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="x_title">
                <h2>Data Laporan Pembayaran</h2>
                <ul class="nav navbar-right panel_toolbox">
                  <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                  </li>
                  <li><a class="close-link"><i class="fa fa-close"></i></a>
                  </li>
                </ul>
                <div class="clearfix"></div>
              </div>
              <div class="x_content">
      
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Kode Transaksi</th>
                      <th>Username</th>
                      <th>Total</th>
                      <th>Status Bayar</th>
                      <th>Status Kirim</th>
                      <th>Kurir</th>
                    </tr>
                  </thead>
                  <tbody id="dataPembayaran">
                  </tbody>
                </table>
      
              </div>
            </div>
          </div>
        `;

        $("#tabelPembayaran").html(html2);
        
        
      });
      return false;


  });
});

$('#btnReset').click(function (e) { 
  e.preventDefault();
  $("#templateSort").html("");
  $("#tabelPembayaran").html("");
  $("#selectSort").val("");
});



function getTanggal(){
  var prosestanggal = document.querySelector('#btnProsesTanggal');

  prosestanggal.addEventListener("click",getData2);
}

function getBulan(){
  var prosesbulan = document.querySelector('#btnProsesBulan');

  prosesbulan.addEventListener("click",getData2);
}

function getTahun(){
  var prosestahun = document.querySelector('#btnProsesTahun');

  prosestahun.addEventListener("click",getData2);
}

function getData2(){
      var ptanggal = $('#btnProsesTangal');
      var pbulan = $('#btnProsesBulan');
      var ptahun = $('#btnProsesTahun');

      var filter = $("[name='filter']").val();
      var tanggalawal = $("[name='tanggalawal']").val();
      var tanggalakhir = $("[name='tanggalakhir']").val();
      var bulanawal = $("[name='bulanawal']").val();
      var bulanakhir = $("[name='bulanakhir']").val();
      var tahun = $("[name='tahun']").val();

      if(ptanggal.click()){
          if(tanggalawal =="" || tanggalakhir ==""){
              swal("Peringatan!", "Data Harus diisi!!", "error");
          }
      }

      if(pbulan.click()){
          if(bulanawal =="" || bulanakhir =="" || tahun ==""){
              swal("Peringatan!", "Data Harus diisi!!", "error");
          }
      }

      if(ptahun.click()){
          if(tahun ==""){
              swal("Peringatan!", "Data Harus diisi!!", "error");
          }
      }

      getDataParam(BASE_URL+"/manage/data-laporan",{filter:filter,tanggalawal:tanggalawal,tanggalakhir:tanggalakhir,bulanakhir:bulanakhir,bulanawal:bulanawal,tahun:tahun}, function(result){
        let html = '';
        let lap = result.laporan;
        if(result.status == "berhasil"){

          var i;
          var no = 1;     
          for(i=0; i < lap.length; i++){

              html += `<tr>
                      <td>${no++}</td>
                      <td>${lap[i].created_at}</td>
                      <td>${lap[i].kode_transaksi}</td>
                      <td>${lap[i].username}</td>
                      <td>Rp. ${formatRupiah(lap[i].total)}</td>`;
                      if(lap[i].status_kirim == 0){
                        html += `<td>Belum Bayar</td>`;
                      }else{
                        html += `<td>Sudah Dibayar</td>`;
                      }

                      html += `
                      <td>${lap[i].status_kirim}</td>
                      <td>${lap[i].kurir.toUpperCase()} ${lap[i].service}</td>
                      </td>`;
          }
        }else{
          html += `<tr><td colspan="7" style="text-align:center">${result.message}</td></tr>`;
        }

        $('#dataPembayaran').html(html);
      });
    };




/* var prosesbulan = document.querySelector('#prosesbulan');
var prosestahun = document.querySelector('#prosestahun');
prosesbulan.addEventListener("click",datalaporan);
prosestahun.addEventListener("click",datalaporan); */


function resetLaporan(){
  var reset = document.getElementById("resetLaporan");
  reset.addEventListener("click",function(e){
      e.preventDefault();
      
      $("#cardTanggal").remove();
      $("#cardBulan").remove();
      $("#cardTahun").remove();
      $("#cardBpn").remove();
      $("#cardPajak").remove();
      $("#cardHak").remove();
      $("#filterby").val('');
      $("#selectLaporan").val('');
      
      
  });
}
