(function() {
  $('.drag').draggable({
    cursor: "crosshair",
    zIndex: 2700,
    appendTo: "#main",
    revert: true,
    snap: true,
  });

  $('.drop').droppable({
    // hoverClass: "highlight",
    over: function(event, ui) {
      console.log('over');
      if($(ui.draggable).data('target') == $(this).attr('id')){
        $(this).addClass('highlight');
      }
    },
    out: function(event, ui) {
      console.log('out');
      $(this).removeClass('highlight');

    },
    drop: function(event, ui) {
      if($(ui.draggable).data('target') == $(this).attr('id')){
        ui.draggable.appendTo(this);
        $(this).droppable('disable');
        $(this).addClass('dropped');
      }
    }
  });
  $('.drop').each(function(e) {
    var num = e + 1;
    $(this).droppable('option', 'accept', '#task-' + num);
  });

  $('.drop').on('click', '.drag', function() {
    $('.info', this).toggleClass('hide');
  })
})(jQuery);
