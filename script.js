(function(){

    'use strict';

    loadData().done(function(){
        load();
    });
    

})(jQuery);

function loadData() {
    return $.ajax({
        url: "data.json",
        dataType: 'json',
        async: false,
        success: function (data) {
            var menuItems = '<li class="active" data-filter="*"><a href="#!">Todos</a></li>';
            $.each(data.menus, function (i, v) {
                menuItems += '<li data-filter="'+v.claseCss+'"><a href="#!">'+v.nombre+'</a></li>'; 
            });
            $("#menuItems").html(menuItems);


            var items ="";
            $.each(data.items, function(i,v){
                items += '<div class="col-lg-4 item '+v.clases+'">';
                items += '  <div class="card">';
                items += '     <div class="card-head">';
                items += '        <img src="'+v.imagen+'" alt="" class="img-fluid card-img">';
                items += '        <div class="card-overlay">';
                items += '            <h2></h2>';
                items += '        </div>';
                items += '        <div class="card-hover">';
                items += '            <h2>'+v.nombre+'</h2>';
                items += '            <p>'+v.descripcion+'</p>';
                items += '        </div>';
                items += '    </div>';
                items += '    <div class="card-body text-center">';
                items += '        <h4 class="title">'+v.nombre+'</h4>';
                items += '        <a href="#!" class="btn btn-lg card-btn">Ver m&aacute;s</a>';
                items += '    </div>';
                items += '  </div>';
                items += '</div>';
            });
            $("#catalogItems").html(items);
        }                
    });
}
function load(){
    var $projects = $('.projects');

    $projects.isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    $('ul.filters > li').on('click', function(e){

        e.preventDefault();

        var filter = $(this).attr('data-filter');

        $('ul.filters > li').removeClass('active');
        $(this).addClass('active');

        $projects.isotope({filter: filter});

    });

    $('.card').mouseenter(function(){

        $(this).find('.card-overlay').css({'top': '-100%'});
        $(this).find('.card-hover').css({'top':'0'});

    }).mouseleave(function(){

        $(this).find('.card-overlay').css({'top': '0'});
        $(this).find('.card-hover').css({'top':'100%'});

    });
}