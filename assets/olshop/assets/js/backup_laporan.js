$(function(){
    $("#formdata").submit(function(event){
        event.preventDefault();
        //document.getElementById('formLaporan').innerHTML = "<h1>Hai in</h1>";
        $("#formLaporan").html('<div class="col-md-7 col-xs-12" id="form-ubah-password"><div class="x_panel"><div class="x_title"><h2>Form Cari Data</h2><ul class="nav navbar-right panel_toolbox"><li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li></ul><div class="clearfix"></div></div><div class="x_content"><form class="form-horizontal form-label-left input_mask"><div class="form-group"><label class="control-label col-md-3 col-sm-3 col-xs-12">Filter By</label><div class="col-md-9 col-sm-9 col-xs-12"><select class="form-control" name="filterSelect" id="filterSelect"></select></div></div><div class="form-group"><label class="control-label col-md-3 col-sm-3 col-xs-12">Cari Data</label><div class="col-md-9 col-sm-9 col-xs-12"><input name="cariLaporan" id="cariLaporan" type="text" class="form-control" placeholder="exp : Bank . ." required></div></div><div class="ln_solid"></div><div class="form-group"><div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3"><button class="btn btn-outline-primary" type="reset" id="prosesLaporan">Proses</button><button type="submit" class="btn btn-success" id="printLaporan">Print</button></div></div></form></div></div></div>');

        var select = $("#selectLaporan").val();
        if(select == ""){
            $("#filterSelect").html('<h1>Kosong</h1>');
        }else if(select == "bpn"){
            $("#filterSelect").html('<option value="all">Semua Data</option><option value="nama">Nama</option><option value="proses">Proses</option><option value="asal_hak">Asal Hak</option><option value="desa">Desa</option><option value="no_berkas">No Berkas</option>');
        }else if(select == "pajak"){
            $("#filterSelect").html('<option value="all">Semua Data</option><option value="nama">Nama</option><option value="proses">Proses</option>');
        }else if(select == "hak"){
            $("#filterSelect").html('<option value="all">Semua Data</option><option value="no_akta">No Akta</option><option value="no_berkas">No Berkas</option><option value="kreditur" >Kreditur</option><option value="debitur">Debitur</option><option value="terbit">Terbit</option>');
        }

    });
});

$(function(){
    $("#filterSelect").change(function(e){
        e.preventDefault;

        var select = $("#selectLaporan").val();

    });
});
