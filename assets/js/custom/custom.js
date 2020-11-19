$(document).ready(function() {
    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }

    

    $('a[id*=play-pause-button').each(function (index, element) {
        var audio = [];
        $(element).click(function (e) {
            e.preventDefault();
            var url = 'https://minuet80.github.io/';
            url += $(this).data('url');
            audio[index] = new Audio(url);
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                audio[index].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                audio[index].pause();
            }
            audio[index].onended = function() {
                $('a[id*=play-pause-button').removeClass('fa-pause');
                $('a[id*=play-pause-button').addClass('fa-play');
           };
        });
    });

});