$(document).ready(function() {
    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }

    var audio = [];
    var domain = 'https://minuet80.github.io';
    var ringsToPlay = 0;
    var repeat = 0;
    $('a[id*=play-pause-button').each(function (index, element) {
        audio[index] = new Audio(domain + $(element).data('url'));
        $(element).click(function (e, p) {
            e.preventDefault();
            var allListen = (typeof p === 'undefined') ? false : true;
            if (!allListen) {
                $('#allListen').html('♬ (all for)');
                $('#allListen').removeClass('btn--danger');
                $('#allListen').addClass('btn--success');

            }
            if (repeat === 0) {
                ringsToPlay = Number($('#ringsToPlay').val()) - 1;
            }
            var j = allListen ? p : index;
            for (var i = 0; i < audio.length; i++) {
                if (i == j) {
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
                if (allListen) {
                    var offset = $(this).offset();
                    $('html, body').animate({scrollTop : offset.top - 100}, 400);
                }
                audio[j].playbackRate = $('#playbackspeed').val();
                audio[j].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                $(this).closest('tr').css('background-color', '');
                audio[j].currentTime = 0;
                audio[j].pause();
            }
            audio[j].onended = function() {
                $('a[id*=play-pause-button').removeClass('fa-pause');
                $('a[id*=play-pause-button').addClass('fa-play');
                $('a[id*=play-pause-button').eq(j).closest('tr').css('background-color', '');
                if (ringsToPlay === 0) {
                    repeat = 0;
                    if (allListen) {
                        if (j < audio.length - 1) {
                            $('a[id*=play-pause-button').eq(j + 1).trigger('click', j + 1);
                        } else {
                            $('#allListen').html('♬ (all for)');
                            $('#allListen').removeClass('btn--danger');
                            $('#allListen').addClass('btn--success');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    }
                } else {
                    ringsToPlay--;
                    repeat = 1;
                    if (allListen) {
                        $('a[id*=play-pause-button').eq(j).trigger('click', j);
                    } else {
                        $('a[id*=play-pause-button').eq(j).trigger('click');
                    }
                    
                }
            };
        });
    });

    $('#allListen').click(function (e) {
        e.preventDefault();
        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button').eq(i).addClass('fa-play');
                $('a[id*=play-pause-button').eq(i).closest('tr').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
        }
        if ($(this).hasClass('btn--success')) {
            $(this).html('‖ (all for)');
            $(this).removeClass('btn--success');
            $(this).addClass('btn--danger');

            $('a[id*=play-pause-button').eq(0).trigger('click', 0);
        } else {
            $(this).html('♬ (all for)');
            $(this).removeClass('btn--danger');
            $(this).addClass('btn--success');
        }
    });
});