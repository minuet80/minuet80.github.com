$(document).ready(function() {
    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }

    var audio = [];
    var domain = 'https://minuet80.github.io/';
    $('a[id*=play-pause-button').each(function (index, element) {
        audio[index] = new Audio(domain + $(element).data('url'));
        $(element).click(function (e) {
            e.preventDefault();

            for (var i = 0; i < audio.length; i++) {
                if (i == index) {
                    continue;
                } else {
                    $('a[id*=play-pause-button').eq(i).removeClass('fa-pause');
                    $('a[id*=play-pause-button').eq(i).addClass('fa-play');
                    audio[i].pause();
                    audio[i].currentTime = 0;
                }
            }
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                audio[index].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                audio[index].pause();
                audio[index].currentTime = 0;
            }
            audio[index].onended = function() {
                $('a[id*=play-pause-button').removeClass('fa-pause');
                $('a[id*=play-pause-button').addClass('fa-play');
           };
        });
    });

});