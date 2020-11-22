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
    $('a[id*=play-pause-button]').each(function (index, element) {
        audio[index] = new Audio(domain + $(element).data('url'));
        $(element).click(function (e, p) {
            e.preventDefault();

            var type;
            var no;
            var endTimestamp;
            if (typeof p === 'undefined') {
                type = '';
                no = index;
            } else {
                type = p.type;
                no = p.no;
                endTimestamp = p.endTimestamp;
            }
            if (type === '') {
                $('#allListen').html('♬ (전체듣기)');
                $('#allListen').removeClass('btn--danger');
                $('#allListen').addClass('btn--success');

                $('#infiniteListen').html('♬ (60분 셔플)');
                $('#infiniteListen').removeClass('btn--warning');
                $('#infiniteListen').addClass('btn--info');
            }
            if (repeat === 0) {
                ringsToPlay = Number($('#ringsToPlay').val()) - 1;
            }
            for (var i = 0; i < audio.length; i++) {
                if (i === no) {
                    continue;
                } else {
                    $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                    $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                    $('a[id*=play-pause-button]').eq(i).closest('tr').css('background-color', '');
                    audio[i].currentTime = 0;
                    audio[i].pause();
                }
            }
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                $(this).closest('tr').css('background-color', '#CCCCFF');
                if (type !== '') {
                    var offset = $(this).offset();
                    $('html, body').animate({scrollTop : offset.top - 100}, 400);
                }
                audio[no].playbackRate = $('#playbackspeed').val();
                audio[no].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                $(this).closest('tr').css('background-color', '');
                audio[no].currentTime = 0;
                audio[no].pause();
            }
            audio[no].onended = function() {
                $('a[id*=play-pause-button]').removeClass('fa-pause');
                $('a[id*=play-pause-button]').addClass('fa-play');
                $('a[id*=play-pause-button]').eq(no).closest('tr').css('background-color', '');

                var map = {};
                var audioSize = audio.length - 1;
                if (ringsToPlay === 0) {
                    repeat = 0;
                    if (type === 'allListen') {
                        
                        if (no < audioSize) {
                            map.no = no + 1;
                            map.type = 'allListen';
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#allListen').html('♬ (전체듣기)');
                            $('#allListen').removeClass('btn--danger');
                            $('#allListen').addClass('btn--success');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    } else if (type === 'infiniteListen') {
                        var date = new Date();
                        var startTimestamp = date.setMinutes(date.getMinutes());
                        if (startTimestamp < endTimestamp) {
                            var map = {};
                            map.no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                            map.type = 'infiniteListen';
                            map.endTimestamp = endTimestamp;
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#infiniteListen').html('♬ (60분 셔플)');
                            $('#infiniteListen').removeClass('btn--warning');
                            $('#infiniteListen').addClass('btn--info');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    }
                } else {
                    ringsToPlay--;
                    repeat = 1;
                    if (type !== '') {
                        map.no = no;
                        map.type = type;
                        map.endTimestamp = endTimestamp;
                        $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                    } else {
                        $('a[id*=play-pause-button]').eq(no).trigger('click');
                    }
                    
                }
            };
        });
    });
    $('a[id*=infiniteListen]').click(function (e) {
        e.preventDefault();
        $('#allListen').html('♬ (전체듣기)');
        $('#allListen').removeClass('btn--danger');
        $('#allListen').addClass('btn--success');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                $('a[id*=play-pause-button]').eq(i).closest('tr').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--info')) {
                $(this).html('‖ (60분 셔플)');
                $(this).removeClass('btn--info');
                $(this).addClass('btn--warning');

                var audioSize = audio.length - 1;
                var no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                var addMinutes = Number($(this).data('addminutes'));
                var date = new Date();
                var endTimestamp = date.setMinutes(date.getMinutes() + addMinutes);

                var map = {};
                map.no = no;
                map.type = 'infiniteListen';
                map.endTimestamp = endTimestamp;
                $('a[id*=play-pause-button]').eq(no).trigger('click', map);
            } else {
                $(this).html('♬ (60분 셔플)');
                $(this).removeClass('btn--warning');
                $(this).addClass('btn--info');
            }
        }
    });

    $('#allListen').click(function (e) {
        e.preventDefault();
        $('#infiniteListen').html('♬ (60분 셔플)');
        $('#infiniteListen').removeClass('btn--warning');
        $('#infiniteListen').addClass('btn--info');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                $('a[id*=play-pause-button]').eq(i).closest('tr').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--success')) {
                $(this).html('‖ (전체듣기)');
                $(this).removeClass('btn--success');
                $(this).addClass('btn--danger');
    
                var map = {};
                map.no = 0;
                map.type = 'allListen';
                $('a[id*=play-pause-button]').eq(0).trigger('click', map);
            } else {
                $(this).html('♬ (전체듣기)');
                $(this).removeClass('btn--danger');
                $(this).addClass('btn--success');
            }
        }
    });
});