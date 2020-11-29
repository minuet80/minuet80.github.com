$(document).ready(function() {
    var youtubeEmbedUrl = 'https://www.youtube-nocookie.com/embed/';
    var audio = [];
    var ringsToPlay = 0;
    var repeat = 0;
    var q = 0;

    $('a img').css('textDecoration','none')
    $('#footer').hide();
    $('#vocabulary').hide();
    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }
    $('#conversation').find('tr').each(function (index, element) {
        var $a = $(element).find('a');
        $(element).find('td:eq(0)').css('width', '100%');
        $(element).find('td:eq(1)').addClass('playTd');
        $(element).find('td:eq(2)').addClass('youtubeTd');
        $(element).find('td:eq(2)').css('padding', '5px');
        if ($a.length > 0) {
            if (index !== 0) {
                q++;
            }
            $(element).prop('id', 'tr'+ (q < 10 ? ('0' + q) : q));
        } else {
            $(element).prop('id', 'tr'+ (q < 10 ? ('0' + q) : q) + '-' + index);
        }
    });
    $('.youtubeTd').hide();
    $('a[id*=play-pause-button]').each(function (index, element) {
        audio[index] = new Audio($(element).data('url'));
        $(element).click(function (e, p) {
            e.preventDefault();
            var audioSize = audio.length - 1;
            var trSize = $(this).closest('tbody').find('tr').length;
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
            no = Number(no);
            if (type === '') {
                $('#allListen').html('∀');
                $('#allListen').removeClass('btn--danger');
                $('#allListen').addClass('btn--inverse');

                $('#infListen').html('∞');
                $('#infListen').removeClass('btn--warning');
                $('#infListen').addClass('btn--inverse');
            }
            if (repeat === 0) {
                ringsToPlay = Number($('#ringsToPlay').val()) - 1;
            }
            for (var i = 0; i <= audioSize; i++) {
                if (i === no) {
                    continue;
                } else {
                    $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                    $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                    var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                    $('tr[id*=' + trId +']').css('background-color', '');
                    audio[i].currentTime = 0;
                    audio[i].pause();
                }
            }
            if($(this).hasClass('fa-play')) {
                $(this).removeClass('fa-play');
                $(this).addClass('fa-pause');
                var trId = $(this).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '#CCCCFF');
                if (type !== '') {
                    var offset = $(this).offset();
                    $('html, body').animate({scrollTop : offset.top - 100}, 400);
                }
                audio[no].playbackRate = $('#playbackspeed').val();
                audio[no].play();
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                var trId = $(this).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                audio[no].currentTime = 0;
                audio[no].pause();
            }
            audio[no].onended = function() {
                $('a[id*=play-pause-button]').removeClass('fa-pause');
                $('a[id*=play-pause-button]').addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(no).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');

                var map = {};
                if (ringsToPlay === 0) {
                    repeat = 0;
                    if (type === 'allListen') {
                        
                        if (no < audioSize) {
                            map.no = no + 1;
                            map.type = 'allListen';
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#allListen').html('∀');
                            $('#allListen').removeClass('btn--danger');
                            $('#allListen').addClass('btn--inverse');
                            var offset = $('.page__content').offset();
                            $('html, body').animate({scrollTop : offset.top}, 400);
                        }
                    } else if (type === 'infListen') {
                        var date = new Date();
                        var startTimestamp = date.setMinutes(date.getMinutes());
                        if (startTimestamp < endTimestamp) {
                            var map = {};
                            map.no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                            map.type = 'infListen';
                            map.endTimestamp = endTimestamp;
                            $('a[id*=play-pause-button]').eq(map.no).trigger('click', map);
                        } else {
                            $('#infListen').html('∞');
                            $('#infListen').removeClass('btn--warning');
                            $('#infListen').addClass('btn--inverse');
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
    $('a[id*=infListen]').click(function (e) {
        e.preventDefault();
        if ($('#playModeBtn').hasClass('youtube')) {
            return;
        }
        $('#allListen').html('∀');
        $('#allListen').removeClass('btn--danger');
        $('#allListen').addClass('btn--inverse');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--inverse')) {
                $(this).html('‖');
                $(this).removeClass('btn--inverse');
                $(this).addClass('btn--warning');

                var audioSize = audio.length - 1;
                var no = Math.floor(Math.random() * (audioSize - 0 + 1)) + 0;
                var addMinutes = Number($(this).data('addminutes'));
                var date = new Date();
                var endTimestamp = date.setMinutes(date.getMinutes() + addMinutes);

                var map = {};
                map.no = no;
                map.type = 'infListen';
                map.endTimestamp = endTimestamp;
                $('a[id*=play-pause-button]').eq(no).trigger('click', map);
            } else {
                $(this).html('∞');
                $(this).removeClass('btn--warning');
                $(this).addClass('btn--inverse');
            }
        }
    });

    $('#allListen').click(function (e) {
        e.preventDefault();
        if ($('#playModeBtn').hasClass('youtube')) {
            return;
        }
        $('#infListen').html('∞');
        $('#infListen').removeClass('btn--warning');
        $('#infListen').addClass('btn--inverse');

        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                audio[i].currentTime = 0;
                audio[i].pause();
            }
            if ($(this).hasClass('btn--inverse')) {
                $(this).html('‖');
                $(this).removeClass('btn--inverse');
                $(this).addClass('btn--danger');
    
                var map = {};
                map.no = 0;
                map.type = 'allListen';
                $('a[id*=play-pause-button]').eq(0).trigger('click', map);
            } else {
                $(this).html('∀');
                $(this).removeClass('btn--danger');
                $(this).addClass('btn--inverse');
            }
        }
    });

    $('#vocabularyBtn').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).html('단어장 닫힘');
            $(this).removeClass('open');
            $(this).addClass('close');
            $('#vocabulary').show();
        } else {
            $(this).html('단어장 열람');
            $(this).removeClass('close');
            $(this).addClass('open');
            $('#vocabulary').hide();
        }
    });

    $('a[id*=youtube-pause-button]').each(function (index, element) {
        $(element).click(function (e) {
            e.preventDefault();
            var offset = $('.responsive-video-container').offset();
            $('html, body').animate({scrollTop : offset.top}, 400);
            var videoSeq = $(element).find('img').prop('alt');
            $('.responsive-video-container').find('iframe').prop('src', youtubeEmbedUrl + videoSeq + '?autoplay=1');
        });
    });

    $('#playModeBtn').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('play')) {
            $(this).find('img').prop('src', '/assets/images/play.png');
            $(this).removeClass('play');
            $(this).addClass('youtube');
            $('.playTd').hide();
            $('.youtubeTd').show();
        } else {
            $(this).find('img').prop('src', '/assets/images/youtube_play.png');
            $(this).removeClass('youtube');
            $(this).addClass('play');
            $('.youtubeTd').hide();
            $('.playTd').show();
        }
        $('#reset').trigger('click');
    });

    $('#reset').click(function (e) {
        e.preventDefault();
        $('#playbackspeed').val('1.0');
        $('#ringsToPlay').val('1');
        if (audio !== null) {
            for (var i = 0; i < audio.length; i++) {
                $('a[id*=play-pause-button]').eq(i).removeClass('fa-pause');
                $('a[id*=play-pause-button]').eq(i).addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(i).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');

                audio[i].currentTime = 0;
                audio[i].pause();
            }
        }
        $('#infListen').html('∞');
        $('#infListen').removeClass('btn--warning');
        $('#infListen').addClass('btn--inverse');
        $('#allListen').html('∀');
        $('#allListen').removeClass('btn--danger');
        $('#allListen').addClass('btn--inverse');
        var offset = $('.page__content').offset();
        $('html, body').animate({scrollTop : offset.top}, 400);
    });
});