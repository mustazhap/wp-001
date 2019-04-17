 $(document).ready(function(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);


  // fileupload имаге - image
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('#img').attr('src', e.target.result);
        $('.fileButton_img').show().css("display", "flex");
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#imgInp").change(function() {
    readURL(this);
  });

  $(".img-delete").click(function(){
    $('#img').attr('src', '');
    $('.fileButton_img').hide();

  })
  

  // tooltip
  $( document ).tooltip({
    position: {
      my: "center bottom+35",
      at: "center bottom",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

  // Lang
  
  $(".header__lang-wrapper").mouseenter(function(){
    $(".submenu").show().addClass("submenu_active");
})
$(".header__lang-wrapper, .submenu").mouseleave(function(){
  $(".submenu").hide().removeClass("submenu_active");
  })

  $( '.inputfile' ).each( function()
  {
      var $input	 = $( this ),
          $label	 = $input.next( 'label' ),
          labelVal = $label.html();

      $input.on( 'change', function( e )
      {
          console.log("filename");
          var fileName = '';

          if( this.files && this.files.length > 1 )
              fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
          else if( e.target.value )
              fileName = e.target.value.split( '\\' ).pop();

              function truncate(n, len) {
                  var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
                  var filename = n.replace('.' + ext,'');
                  if(filename.length <= len) {
                      return n;
                  }
                  filename = filename.substr(0, len) + (n.length > len ? '...' : '');
                  return filename + '.' + ext;
              };

          if( fileName.length ){
              $label.html(truncate(fileName,10) );
          }
          else
              $label.html( labelVal );
      });

      // Firefox bug fix
      $input
      .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
      .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
  });
    

// Accordion - 
    var allPanels = $(".accordion-panel");

    $(".accordion").click(function(e){
        allPanels.slideUp();
        var $this = $(this).parent();
        if($($this).hasClass("acc-active")){
            $($this).removeClass("acc-active");
            $($this).next().slideUp();
            $(".inbox__message-reply").slideUp();
        }else{
            $($this).next().slideDown();
            $($this).addClass("acc-active");
        }
        return false;
    })

    $(".inbox-reply").click(function(event){
        var $parent = $(this).parents(".inbox__message-top");
        if($parent.hasClass("acc-active")){
            $parent.next().find(".inbox__message-reply").slideDown();
        }else{
            $parent.next().find(".inbox__message-reply").show();
            $parent.next().slideDown();
            $parent.addClass("acc-active");
        }

    })
// Accordion - end

// popup
$(".pop-button").click(function(){ //popup call-button
    var $key = $(this).attr("rel");
    $("." + $key).addClass("in");
    $("body").css("overflow", "hidden");
})
$(".fa-times").click(function(){ //popup close-button
    $("body").css("overflow", "auto");
    $(".modal").removeClass("in");
})
$(".modal").click(function(){ //popup hide on body
    $(this).removeClass("in");
    $("body").css("overflow", "auto");
})
$(".modal__inner").click(function(event){ //popup not hide on text
    event.stopPropagation();
})
// popup-end

// autocomplete
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  $( "#search" ).autocomplete({
    source: availableTags
  });

    $("#guests").selectmenu().addClass("overflow");
    $(".select-menu").selectmenu().addClass("overflow");

    var events = [ 
        { Title: "Five K for charity", Date: new Date("30/03/2019") }, 
        { Title: "Dinner", Date: new Date("39==03/31/2019") }, 
        { Title: "Meeting with manager", Date: new Date("03/01/2011") }
    ];


    // datapicker
    $( ".datepicker" ).datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function(dateText, inst){
            var $this = $("this");
            $this.next().datepicker("option","minDate",
            $this.next().datepicker("getDate"));
         },
         beforeShowDay: function(date) {
            var result = [true, '', null];
            var matching = $.grep(events, function(event) {
                return event.Date.valueOf() === date.valueOf();
            });
        
            if (matching.length) {
                result = [true, 'highlight', null];
            }
            return result;
        }
    });
    $(".ui-state-default").on("mouseenter", function() {
        $(this).attr('title');  // title attribute will be shown during the hover
      });
    $( ".datepicker2" ).datepicker(
        {
            dateFormat: 'yy-mm-dd',
            minDate: 0
        }
    );

    //results

    $( ".radius-slider" ).slider({
        step: 1,
        min:1,
        max: 50,
        value: 12,
        change: function( event, ui ) {
            $(".radius-span").html($( ".radius-slider" ).slider( "value" ))
        }
      });

      $( ".price-slider" ).slider({
        step: 1,
        min:0,
        max: 2500,
        values: [0,2500],
        change: function( event, ui ) {
            $(".price-min").html(ui.values[0]);
            $(".price-max").html(ui.values[1]);
        }
      });



// spoiler

$('.spoiler-text').hide()
$('.spoiler').click(function(){
    $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle()
})
});     

// Calendar 
function Calendar2(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    if (DNfirst != 0) {
    for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
    for(var  i = 0; i < 6; i++) calendar += '<td>';
    }
    for(var  i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today">' + i;
    }else{
        calendar += '<td>' + i;
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
        calendar += '<tr>';
    }
    }
    for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}

function Calendar3(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    if (DNfirst != 0) {
    for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
    for(var  i = 0; i < 6; i++) calendar += '<td>';
    }
    for(var  i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today">' + i;
    }else{
        calendar += '<td>' + i;
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
        calendar += '<tr>';
    }
    }
    for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}

Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
Calendar3("calendar3", new Date().getFullYear(), new Date().getMonth()+1);

// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
Calendar3("calendar3", document.querySelector('#calendar3 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar3 thead td:nth-child(2)').dataset.month)-1);

}
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
}

// переключатель минус месяц
document.querySelector('#calendar3 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
}
// переключатель плюс месяц
document.querySelector('#calendar3 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);

Calendar3("calendar3", document.querySelector('#calendar3 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar3 thead td:nth-child(2)').dataset.month)+1);
}

// Gallery on item single


// Select menu

// $('select').each(function(){
//   var $this = $(this), numberOfOptions = $(this).children('option').length;

//   $this.addClass('select-hidden'); 
//   $this.wrap('<div class="select"></div>');
//   $this.after('<div class="select-styled"></div>');

//   var $styledSelect = $this.next('div.select-styled');
//   $styledSelect.text($this.children('option').eq(0).text());

//   var $list = $('<ul />', {
//       'class': 'select-options'
//   }).insertAfter($styledSelect);

//   for (var i = 0; i < numberOfOptions; i++) {
//       $('<li />', {
//           text: $this.children('option').eq(i).text(),
//           rel: $this.children('option').eq(i).val()
//       }).appendTo($list);
//   }

//   var $listItems = $list.children('li');

//   $styledSelect.click(function(e) {
//       e.stopPropagation();
//       $('div.select-styled.active').not(this).each(function(){
//           $(this).removeClass('active').next('ul.select-options').hide();
//       });
//       $(this).toggleClass('active').next('ul.select-options').toggle();
//   });

//   $listItems.click(function(e) {
//       e.stopPropagation();
//       $styledSelect.text($(this).text()).removeClass('active');
//       $this.val($(this).attr('rel'));
//       $list.hide();
//       //console.log($this.val());
//   });

//   $(document).click(function() {
//       $styledSelect.removeClass('active');
//       $list.hide();
//   });

// });

// 


