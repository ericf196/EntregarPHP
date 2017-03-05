$( document ).ready(function() {

var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;

manageData();

/* manage data list */
function manageData() {
    $.ajax({
        dataType: 'json',
        url: url+'EntregaPHP/api/getData.php',
        data: {page:page}
    }).done(function(data){
    	total_page = Math.ceil(data.total/10);
    	current_page = page;

    	$('#pagination').twbsPagination({
	        totalPages: total_page,
	        visiblePages: current_page,
	        onPageClick: function (event, pageL) {
	        	page = pageL;
                if(is_ajax_fire != 0){
	        	  getPageData();
                }
	        }
	    });

    	manageRow(data.data);
        is_ajax_fire = 1;

    });

}

/* Get Page Data*/
function getPageData() {
	$.ajax({
    	dataType: 'json',
    	url: url+'EntregaPHP/api/getData.php',
    	data: {page:page}
	}).done(function(data){
		(data.data);
	});
    
}


/* Add new Item table row */
function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.cedula+'</td>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.apellido+'</td>';
        rows = rows + '<td>'+value.email+'</td>';
        rows = rows + '<td>'+value.cargo+'</td>';
        rows = rows + '<td>'+value.estatus+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Edit</button> ';
        rows = rows + '<button class="btn btn-danger remove-item">Delete</button>';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});

	$("tbody").html(rows);
}

/* Create new Item */
$(".crud-submit").click(function(e){
    e.preventDefault();

    var form_action = $("#create-item").find("form").attr("action");
    var cedula = $("#create-item").find("input[name='cedula']").val();
    var nombre = $("#create-item").find("input[name='nombre']").val();
    var apellido = $("#create-item").find("input[name='apellido']").val();
    var email = $("#create-item").find("input[name='email']").val();
    var cargo = $("#create-item").find("input[name='cargo']").val();
    var estatus = $("#create-item").find("select[name='estatus']").val();
    
    
    if(cedula != '' && nombre != '' && apellido != '' && email != '' && cargo != '' && estatus != ''){

        $.ajax({
            dataType: 'json',
            type:'POST',
            url: url + form_action,
            data:{cedula:cedula, nombre:nombre, apellido:apellido , email:email , cargo:cargo , estatus:estatus}
            
        }).done(function(data){       
           
            $("#create-item").find("input[name='cedula']").val('');
            $("#create-item").find("input[name='nombre']").val('');
            $("#create-item").find("input[name='apellido']").val('');
            $("#create-item").find("input[name='email']").val('');
            $("#create-item").find("input[name='cargo']").val('');
            getPageData();
            $(".modal").modal('hide');
            toastr.success('Fue creado con exito', 'Error al crear', {timeOut: 5000});
            manageData();
            
        });
    }else{
        alert('You are missing title or description.')
    }


});

/* Remove Item */
$("body").on("click",".remove-item",function(){
    
    var id = $(this).parent("td").data('id');
    var c_obj = $(this).parents("tr");

    $.ajax({
        dataType: 'json',
        type:'POST',
        url: url + 'EntregaPHP/api/delete.php',
        data:{id:id}
    }).done(function(data){
        c_obj.remove();
        toastr.success('Trabajador Borrado', 'Error al borrar', {timeOut: 5000});
        getPageData();
    });
    

});


/* Edit Item */
$("body").on("click",".edit-item",function(){
   
    var id = $(this).parent("td").data('id');
    
    var cedula = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var apellido = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var email = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var cargo = $(this).parent("td").prev("td").prev("td").text();
    var estatus = $(this).parent("td").prev("td").text();
   
    $("#edit-item").find("input[name='cedula']").val(cedula);
    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='apellido']").val(apellido);
    $("#edit-item").find("input[name='email']").val(email);
    $("#edit-item").find("input[name='cargo']").val(cargo);
    $("#edit-item").find("select[name='estatus']").val(estatus);
    $("#edit-item").find(".edit-id").prev("td").val(id);
    

});


/* Updated new Item */
$(".crud-submit-edit").click(function(e){

    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    
    var cedula =$("#edit-item").find("input[name='cedula']").val();
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var apellido = $("#edit-item").find("input[name='apellido']").val();
    var email = $("#edit-item").find("input[name='email']").val();
    var cargo = $("#edit-item").find("input[name='cargo']").val();
    var estatus = $("#edit-item").find("select[name='estatus']").val();

    /*console.log(cedula);
    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(cargo);
    console.log(estatus);*/

    var id = $("#edit-item").find(".edit-id").val();

    if(cedula != '' && nombre != '' && apellido != '' && email != '' && cargo != '' && estatus != ''){
        
        $.ajax({
            dataType: 'json',
            type:'POST',
            url: url + form_action,
            data:{cedula:cedula, nombre:nombre, apellido:apellido , email:email , cargo:cargo , estatus:estatus , id:id}
        }).done(function(data){
            console.log("Bloque 2");
            getPageData();
            $(".modal").modal('hide');
            toastr.success('Se actualizo con exito.', 'Error al actualizar', {timeOut: 5000});
        });
    }else{
        alert('Error falta Campos')
    }

});
});