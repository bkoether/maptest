(function() {

  // Shuffle plugin
  $.fn.shuffle = function() {
    var allElems = this.get(),
      getRandom = function(max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function(){
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);
  }




  // Shuffle at start
  $('.flip-container').shuffle();


  // Detect click on card.
  $('.flip-container').click(function(){
    if(!$(this).hasClass('locked')){
      memGame.click(this);
    }
  });


  var memGame = {
    numOpen: 0,

    click: function(e) {


      // 2 un-matching are open.
      if (memGame.numOpen == 2) {
        memGame.closeAll();
      }

      if($(e).hasClass('open')) {
        memGame.numOpen--;
      }
      else {
        memGame.numOpen++;
      }
      $(e).toggleClass('open');

      // 2 cards are open.
      if (memGame.numOpen == 2) {
        memGame.checkMatch();
      }
    },

    checkMatch: function() {
      var card1 = $('.flip-container.open').not('.locked')[0];
      var card2 = $('.flip-container.open').not('.locked')[1];

      if ($(card1).attr('data-cat') == $(card2).attr('data-cat') &&
        $(card1).attr('data-type') != $(card2).attr('data-type')) {
        $(card1).addClass('locked');
        $(card2).addClass('locked');
        memGame.checkComplete();

      }
    },

    checkComplete: function(){
      var total = $('.flip-container').length;
      var open = $('.flip-container.locked').length;
      if (total == open) {
        $('body').addClass('completed');
      }
    },

    closeAll: function(){
      $('.flip-container').not('.locked').removeClass('open');
      memGame.numOpen = 0;
    }
  }

})(jQuery);
