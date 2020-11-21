$(document).ready(function() {
    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }

    var audio = [];
    var domain = 'https://minuet80.github.io/';
    var ringsToPlay = 0;
    var repeatCount = 0;
    $('a[id*=play-pause-button').each(function (index, element) {
        audio[index] = new Audio(domain + $(element).data('url'));
        $(element).click(function (e) {
            e.preventDefault();
            if (repeatCount === 0) {
                ringsToPlay = Number($('#ringsToPlay').val()) - 1;
            }
            for (var i = 0; i < audio.length; i++) {
                if (i == index) {
                    continue;
                } else {
                    $('a[id*=play-pause-button').eq(i).removeClass('fa-pause');
                    $('a[id*=play-pause-button').eq(i).addClass('fa-play');
                    $('a[id*=play-pause-button').eq(i).closest('tr').css('background-color', '');
                    audio[i].currentTime = 0;
                    audio[i].pause();
                }
            }
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                $(this).closest('tr').css('background-color', '#CCCCFF');
                audio[index].playbackRate = $('#playbackspeed').val();
                audio[index].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                $(this).closest('tr').css('background-color', '');
                audio[index].currentTime = 0;
                audio[index].pause();
            }
            audio[index].onended = function() {
                $('a[id*=play-pause-button').removeClass('fa-pause');
                $('a[id*=play-pause-button').addClass('fa-play');
                $('a[id*=play-pause-button').eq(index).closest('tr').css('background-color', '');
                if (ringsToPlay === 0) {
                    repeatCount = 0;
                } else {
                    ringsToPlay--;
                    repeatCount = 1;
                    $('a[id*=play-pause-button').eq(index).click();
                }
            };
        });
    });

    var sound;
    $('#allListen').click(function (e) {
        e.preventDefault();
        sound = new Audio(domain + $(this).data('url'));

        if($(this).hasClass('fa-play')) {
            $(this).removeClass('fa-play');
            $(this).addClass('fa-pause');
            sound.playbackRate = $('#playbackspeed').val();
            sound.play();
        } else {
            $(this).removeClass('fa-pause');
            $(this).addClass('fa-play');
            sound.currentTime = 0;
            sound.pause();
        }
        sound.onended = function() {
            $('#allListen').removeClass('fa-pause');
            $('#allListen').addClass('fa-play');
        };
        

    });
});