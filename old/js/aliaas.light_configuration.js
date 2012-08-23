var house = null ;

$(function () {
    
    socket = io.connect('banane.cpe.fr', {port:8080}); 
    socket.on('house', function (data) { 
        if(data != "") house = JSON.parse(data) ;
        displayLightThumbnails();
    }); 
});


function displayLightThumbnails() {

    $.each(house.rooms, function (indiceRoom, room) {
        $.each(room.devices, function (indiceDevice, device) {
            var $li = $("<li></li>").attr("class", "span3") ;
            var $thumbnail = $("<div></div>").attr("class", "thumbnail"); 
            var $innerThumbnailImg = $("<img></img>").attr("src", "./domotique/" + device.filename );
            var $innerThumbnailH5 = $("<h5></h5>").html(device.address+' ('+device.moduleName+')');
            
            var $buttonEdit = $("<a></a>").attr({class:'btn btn-primary dropdown-toggle'})
                                          .data('toggle','dropdown')
                                          .html("<i class='icon-edit icon-white'></i> Modifier <span class='caret'></span>") ;

            var $buttonDelete = $("<a></a>").attr({class:'btn btn-danger'}).html("<i class='icon-remove icon-white'></i> Supprimer");

            var $btnGroup = $("<div></div>").attr("class", "btn-group") ;
            $btnGroup.append($buttonEdit); 

            $dropdownMenu = $("<ul></ul>").attr("class","dropdown-menu") ;
         
            for (var i = 1; i <= device.services.length ; i++)       
               $dropdownMenu.append("<li><a class='updateLevelLink' data-filename='"+device.services[i-1].url+"'  data-address='"+device.address+"' data-level='"+i+"'>Niveau "+i+"</a></li>") 

            $btnGroup.append($dropdownMenu); 

            $btnGroup.append($buttonDelete);

            $thumbnail.append($innerThumbnailImg);
            $thumbnail.append($innerThumbnailH5);
            $thumbnail.append("<br>");
            $thumbnail.append($btnGroup);

            $li.html($thumbnail); 

            $("#thumbnails").append($li);
        });
    });

    $('.dropdown-toggle').dropdown();
    $('.updateLevelLink').live('click', updateLevelLink) ;
}

function updateLevelLink(){
    var $this = $(this) ; 

    $('#myModal').data("level"   , $this.data("level"))
                 .data("address" , $this.data("address"))
                 .data("filename", $this.data("filename")); 

    $('.modal').css({width:'650px',top:'40%'}); 
    $('.modal-body').css('max-height',  '620px')
    
    $('.modal-header').find("h3").html("Modification de la lampe à l'adresse "+$this.data("address")+" au niveau "+$this.data("level")); 

    var $canvas = $("<img width='600' height='500'></img>").attr('src','./domotique/'+$this.data("filename")) ;
    //var $canvas = $("<canvas width='600' height='500'></canvas>");


    $('.modal-body').html($canvas); 

    $('#myModal').modal();
}


