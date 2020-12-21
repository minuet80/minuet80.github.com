/**
 * 좌측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
String.prototype.lpad = function(padLen, padStr) {
    var str = this;
    if (padStr.length > padLen) {
        return str + '';
    }
    while (str.length < padLen) {
        str = padStr + str;
    }
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
};
console.log("05".lpad(5, "00")); // 00000
console.log("05".lpad(5, "01")); // 01010

/**
 * 우측문자열채우기
 * @params
 *  - padLen : 최대 채우고자 하는 길이
 *  - padStr : 채우고자하는 문자(char)
 */
String.prototype.rpad = function(padLen, padStr) {
    var str = this;
    if (padStr.length > padLen) {
        return str + '';
    }
    while (str.length < padLen) {
        str += padStr;
    }
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
};

$(document).ready(function() {

    if ($(window).outerWidth() <= 1200) {
        $("abbr[title]").click(function() {
            $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
        });
    }

    $('.lbsize').find('img').css('width', '100px');
    $('.lbsize').find('img').css('height', '100px');

    var youtubeEmbedUrl = 'https://www.youtube-nocookie.com/embed/';
    var audio = [];
    var ringsToPlay = 0;
    var repeat = 0;
    var num;
    var q = 0;

    $('a img').css('textDecoration','none')
    $('#footer').hide();
    $('#vocabulary').hide();

    $('#conversation').prepend('<colgroup><col width="*" /><col width="40px;" /><col width="40px;" /></colgroup>');
    $('#conversation').find('tr').each(function (index, element) {
        var textTd = $.trim($(element).find('td:eq(0)').html());
        var title = $.trim($(element).find('td:eq(1)').html());
        if (/!\d*!/.test(textTd)) {
            $(element).empty();
            $(element).append('<td colspan="2" style="font-weight: 800; background: radial-gradient(ellipse farthest-corner at 0% 50%, red, yellow 0%, #1e90ff 0%, beige);"><i>' + title +'</i></td>');
            q++;
        } else {
            var $a = $(element).find('a');
            $(element).find('td:eq(1)').addClass('playTd');
            $(element).find('td:eq(2)').addClass('youtubeTd');
            $(element).find('td:eq(2)').css('padding', '5px');
            
            if ($a.length > 0) {
                if (index !== 0) {
                    q++;
                }
                num = q.toString().lpad(5, 0);
                $(element).prop('id', 'tr'+ num);
            } else {
                num = q.toString().lpad(5, 0);
                $(element).prop('id', 'tr'+ num + '-' + index);
            }
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
                $('tr[id*=' + trId +']').css('background-color', '#f74');
                if (type !== '') {
                    var offset = $(this).offset();
                    $('html, body').animate({scrollTop : offset.top - 100}, 400);
                }
                setTimeout(function () {
                    var reTitle = '';
                    $('tr[id*=' + trId +']').find('td:eq(0)').each(function (index, element) {
                        if (index !== 0) {
                            reTitle += '<br />';
                        }
                        reTitle += $(element).html();
                    });
                    var magnificTitl = {};
                    magnificTitl.src = '<div class="white-popup">' + reTitle +'<button title="Close (Esc)" type="button" class="mfp-close">×</button></div>';
                    magnificTitl.type = 'inline';
                    $('#popupBtn').magnificPopup({
                        items: magnificTitl,
                        closeBtnInside: true,
                        callbacks: {
                            open: function() {
                                $('.mfp-content').find('abbr[title]').click(function() {
                                    $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
                                });
                            }
                        }
                    });
                    $('#popupBtn').trigger('click');
                    audio[no].playbackRate = $('#playbackspeed').val();
                    audio[no].play();
                }, 600);
            } else {
                $(this).removeClass('fa-pause');
                $(this).addClass('fa-play');
                var trId = $(this).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                $('.mfp-close').trigger('click');
                audio[no].currentTime = 0;
                audio[no].pause();
            }
            audio[no].onended = function() {
                $('a[id*=play-pause-button]').removeClass('fa-pause');
                $('a[id*=play-pause-button]').addClass('fa-play');
                var trId = $('a[id*=play-pause-button]').eq(no).closest('tr').prop('id');
                $('tr[id*=' + trId +']').css('background-color', '');
                $('.mfp-close').trigger('click');
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
    var i = 0;
    var j = 0;
    var intrvlId = setInterval(function () {
        $('#js-mkw-makerwidget__wrap').css('width', '0px');
        if (i == 0 && $('.mkw-makerwidget__widget-wrap').length > 0) {
            i++;
            if (j == 0 && $('.author__avatar').length > 0) {
                $('.author__avatar').click(function (e) {
                    e.preventDefault();
                    $('#js-mkw-maker-widget-trigger').click();
                    j++;
                    clearInterval(intrvlId);
                });
            }
        }
    }, 3000);
});