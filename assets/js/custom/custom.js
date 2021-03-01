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

var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    },
    dday:function(start,end) {
        var distance = end - start;//디데이에서 현재까지 뺀다.
    
        var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일
    
        var h = Math.floor((distance / (1000*60*60)) % 24);//시간
        var m = Math.floor((distance / (1000*60)) % 60);//분
        var s = Math.floor((distance / 1000) % 60);//초

        if (distance <= 0) {//당일넘어섰을때, dday로 변경
            return d;
        } else {
            h = (h < 10 ? '0' + h : h);
            m = (m < 10 ? '0' + m : m);
            s = (s < 10 ? '0' + s : s);
            return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' (' + (h + ':' + m + ':' + s) + ')';
        }
    }
}

$(document).ready(function() {

    setInterval(function () {
        var day = $('#dday1').find('span').data('day');
        var strtDay = new Date(day);
        var endDay = new Date();
        var result = dates.dday(strtDay, endDay);
        $('#dday1').find('span').html('😢' + 'D+' + result + ' ~ ' + day);
    }, 1000);
    setInterval(function () {
        var day = $('#dday2').find('span').data('day');
        var strtDay = new Date(day);
        var endDay = new Date();
        var result = dates.dday(strtDay, endDay);
        $('#dday2').find('span').html('👰' + 'D+' + result + ' ~ ' + day);
    }, 1000);
    setInterval(function () {
        var day = $('#dday3').find('span').data('day');
        var strtDay = new Date(day);
        var endDay = new Date();
        var result = dates.dday(strtDay, endDay);
        $('#dday3').find('span').html('😍✈' + 'D+' + result + ' ~ ' + day);
    }, 1000);

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

    $('.iframe-link').magnificPopup({
        type:'iframe',
        iframe: {
            markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 100%;height:100%}</style>'+
                    '<div class="mfp-iframe-scaler" >'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div></div>'
        }
    });

    // 행정표준용어 정리
    if ($('#business1').length > 0) {
        $.get('/assets/json/abbr.json', function(jqXHR) {
        }, 'json')
        .done(function(data) {
            $('#searchStdCode').autocomplete({
                source: data,
                select: function (event, ui) {
                    event.preventDefault();
                    $('#resultStdCode').val(ui.item.abbr + ', ' + ui.item.value);
                    $('#searchStdCode').val(ui.item.label);
                },
                focus: function (event, ui) {
                    return false;
                },
                minLength: 1,
                autoFocus: true,
                classes: {
                    'ui-autocomplete': 'highlsndcight'
                },
                delay: 500,
                disable: false,
                position: {my: 'right top', at: 'right bottom'},
                close: function (event) {
                    console.log(event);
                }
            });
        });

    }
    // 행정표준용어 정리 end

    // 주식공부
    if ($('#searchHot10StockItemKospi, #searchHot10StockItemKosdaq').length > 0) {
        var naverStockUrl = 'https://finance.naver.com/item/board.nhn?code=';
        $('#searchHot10StockItemKospi, #searchHot10StockItemKosdaq').click(function (e) {
            e.preventDefault();
            var id = $(this).attr('id');
            if (id === 'searchHot10StockItemKospi') {
                var stockitemKospiUrl = 'http://localhost:4000/assets/json/stockitemKospi.json';
            } else if (id === 'searchHot10StockItemKosdaq') {
                $.get('/assets/json/stockitemKosdaq.json', function(jqXHR) {
                }, 'json')
                .done(function(jqXHR) {
                    $.each(jqXHR, function (index, item) {
                        $.ajax({
                            crossOrigin : true,
                            dataType : 'text/html',
                            url : naverStockUrl + item.code,
                            success : function(data) {
                                console.log(data);
                            }
                        });
                    });
                });
            } else {
                ;
            }
        });
    }
    if ($('#listingDay').length > 0) {
        new SimpleCalendar('#listingDay');
    }
    if ($('#stockCalc').length > 0) {
        $('#stockCalc').click(function (e) {
            e.preventDefault();
            // 현재주가
            var stkpc = Number($('input[name="stkpc"]').val());
            // 당기순이익
            var ntpfThstrm = Number($('input[name="ntpfThstrm"]').val());
            // 발행주식수
            var pblicteStockCnt = Number($('input[name="pblicteStockCnt"]').val());
            // 자기자본/자본총계
            var ecptl = Number($('input[name="ecptl"]').val());
            // 자산총계
            var assetsTotamt = Number($('input[name="assetsTotamt"]').val());
            // 부채총계
            var debtTotamt = Number($('input[name="debtTotamt"]').val());
            // 업종 PER
            var indutyPer = Number($('input[name="indutyPer"]').val());
            // 배당금
            var dvdnd = Number($('input[name="dvdnd"]').val());

            // 시가총액
            var mktcTotamt = Math.round((stkpc * pblicteStockCnt) * 100) / 100;
            // eps
            var eps = Math.round((ntpfThstrm / pblicteStockCnt) * 100) / 100;
            // per
            var per = Math.round((mktcTotamt / ntpfThstrm) * 100) / 100;
            // bps
            var bps = Math.round(((assetsTotamt - debtTotamt) / pblicteStockCnt) * 100) / 100;
            // pbr
            var pbr = Math.round((mktcTotamt / ecptl) * 100) / 100;
            // roe
            var roe = Math.round((ntpfThstrm / ecptl * 100) * 100) / 100;
            // 배당수익률(%)
            var alotErnrt = Math.round(((dvdnd / stkpc) * 100) * 100) / 100;
            // 배당성향
            var alotIncln = Math.round((((dvdnd * pblicteStockCnt) / ntpfThstrm) * 100) * 100) / 100;

            // 적정주가 (업종PER)
            var proprtStkpcByIndutyPer = Math.round((eps * indutyPer) * 100) / 100;
            // 적정주가 (eps * roe)
            var proprtStkpcByEpsRoe = Math.round((eps * roe) * 100) / 100;

            $('#mktcTotamt').html(mktcTotamt);
            $('#eps').html(eps);
            $('#per').html(per);
            $('#bps').html(bps);
            $('#roe').html(roe + '%');
            $('#pbr').html(pbr);
            $('#alotErnrt').html(alotErnrt);
            $('#alotIncln').html(alotIncln);
            $('#proprtStkpcByIndutyPer').html(proprtStkpcByIndutyPer);
            $('#proprtStkpcByEpsRoe').html(proprtStkpcByEpsRoe);
        });
    };
    // 주식공부 end

    if ($('#business2').length > 0) {

        // 텍스트 음성 변환
        var synth = window.speechSynthesis;
        var voices = [];
        var digitNum;
        var countRandom = 0;
        // 회화
        var utterThis = [];

        $('#speed').change(function () {
            $('.speed-value').html($(this).val());
        });
        $('#pitch').change(function () {
            $('.pitch-value').html($(this).val());
        });
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = function () {
                voices = synth.getVoices().sort(function (a, b) {
                    var aname = a.name.toUpperCase();
                    var bname = b.name.toUpperCase();
                    if (aname < bname) {
                        return -1;
                    } else if (aname == bname) {
                        return 0;
                    } else {
                        return +1;
                    }
                });
            };
        }
        $('#amtReset').click(function (e) {
            e.preventDefault();

            $('#inputText').val('');
            if (synth !== 'undefined') {
                synth.cancel();
            }
            countRandom = 0;
            $('#inputText').select();
        });
        $('#speak').click(function (e) {
            e.preventDefault();
            if (synth.speaking) {
                return;
            }
            if ($.trim($('#inputText').val()) === '') {
                return;
            } else {
                var utterThis = new SpeechSynthesisUtterance($.trim($('#inputText').val().replace(/(<([^>]+)>)/ig,"")));
                utterThis.onend = function (event) {
                }
                utterThis.onerror = function (event) {
                }
                var selectedOption = $('#lang').find('option:selected').data('name');
                for(i = 0; i < voices.length; i++) {
                    if(voices[i].name === selectedOption) {
                        utterThis.voice = voices[i];
                        break;
                    }
                }
                utterThis.pitch = $('#pitch').val();
                utterThis.rate = $('#speed').val();
                synth.speak(utterThis);
            }
        });
        $('#numSpeak').click(function (e) {
            e.preventDefault();
            if (synth.speaking) {
                return;
            }
            digitNum = Number($('#digitNum').val());
            $('#inputText').val(Math.floor( ( Math.random() * (digitNum - 1) + 1 ) ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원');
            if ($.trim($('#inputText').val()) === '') {
                return;
            } else {
                var utterThis = new SpeechSynthesisUtterance($.trim($('#inputText').val().replace(/(<([^>]+)>)/ig,"")));
                utterThis.onend = function (event) {
                }
                utterThis.onerror = function (event) {
                }
                var selectedOption = $('#lang').find('option:selected').data('name');
                for(i = 0; i < voices.length; i++) {
                    if(voices[i].name === selectedOption) {
                        utterThis.voice = voices[i];
                        break;
                    }
                }
                utterThis.pitch = $('#pitch').val();
                utterThis.rate = $('#speed').val();
                synth.speak(utterThis);
            }
        });
        $('#randomNumSpeak').click(function (e) {
            e.preventDefault();
            if (synth.speaking) {
                return;
            }
            countRandom++;
            digitNum = Number($('#digitNum').val());
            $('#inputText').val(Math.floor( ( Math.random() * (digitNum - 1) + 1 ) ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원');
            if ($.trim($('#inputText').val()) === '') {
                return;
            } else {
                var utterThis = new SpeechSynthesisUtterance($.trim($('#inputText').val().replace(/(<([^>]+)>)/ig,"")));
                utterThis.onend = function (event) {
                    if (countRandom > 0) {
                        var sleep = Number($('#delay').val());
                        setTimeout(function () {
                            $('#randomNumSpeak').trigger('click');
                        }, sleep);
                    }
                }
                utterThis.onerror = function (event) {
                }
                var selectedOption = $('#lang').find('option:selected').data('name');
                for(i = 0; i < voices.length; i++) {
                    if(voices[i].name === selectedOption) {
                        utterThis.voice = voices[i];
                        break;
                    }
                }
                utterThis.pitch = $('#pitch').val();
                utterThis.rate = $('#speed').val();
                synth.speak(utterThis);
            }
        });
        // 텍스트 음성 변환

        if ($(window).outerWidth() <= 1200) {
            $("abbr[title]").click(function() {
                $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
            });
        }

        var num;
        var q = 0;
        var tocMenu = [];

        $('a img').css('textDecoration','none')
        $('#footer').hide();
        $('#vocabulary').hide();

        tocMenu.push('<ul class="toc__menu">');
        $('#conversation').prepend('<colgroup><col width="4px;" /><col width="*" /><col width="40px;" /><col width="40px;" /></colgroup>');
        $('#conversation').find('tr').each(function (index, element) {
            var textTd = $.trim($(element).find('td:eq(0)').html());
            var title = $.trim($(element).find('td:eq(1)').html());
            if (/\d+/.test(textTd)) {
                $(element).empty();
                $(element).append('<td style="padding: 0px; background-color: #ee5f5b;" id=-' + textTd +'></td>');
                $(element).append('<td colspan="2" style="background-color: #fffef3"><i>' + title +'</i></td>');

                tocMenu.push('<li><a href="#-' + textTd + '">' + title + '</a></li>');
                q++;
            } else {
                var $a = $(element).find('a');
                $(element).find('td:eq(0)').css('padding', '0px')
                $(element).find('td:eq(2)').addClass('playTd');

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
        tocMenu.push('</ul>');
        $('.toc').append(tocMenu.join(''));

        $('a[id*=play-pause-button]').each(function (index, element) {
            utterThis[index] = new SpeechSynthesisUtterance($.trim($(element).closest('tr').find('td:eq(1)').html()).replace(/(<([^>]+)>)/ig,""));
            $(element).click(function (e, p) {
                e.preventDefault();
                var utterThisSize = utterThis.length - 1;
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

                if($(this).hasClass('fa-play')) {
                    $(this).removeClass('fa-play');
                    $(this).addClass('fa-pause');
                    var trId = $(this).closest('tr').prop('id');
                    $('tr[id*=' + trId +']').css('background-color', '#ebf5f8');
                    if (type !== '') {
                        var offset = $(this).offset();
                        $('html, body').animate({scrollTop : offset.top - 100}, 400);
                    }
                    var reTitle = '';
                    setTimeout(function () {
                        $('tr[id*=' + trId +']').find('td:eq(1)').each(function (index, element) {
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
                            closeBtnInside: false,
                            preloader: true,
                            removalDelay: 160,
                            mainClass: 'mfp-fade',
                            callbacks: {
                                open: function() {
                                    $('.mfp-content').find('abbr[title]').click(function() {
                                        $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
                                    });
                                }
                            }
                        });
                        $('#popupBtn').trigger('click');
                        var selectedOption = $('#lang').find('option:selected').data('name');
                        for(i = 0; i < voices.length; i++) {
                            if(voices[i].name === selectedOption) {
                                utterThis[no].voice = voices[i];
                                break;
                            }
                        }
                        utterThis[no].pitch = $('#pitch').val();
                        utterThis[no].rate = $('#speed').val();
                        synth.speak(utterThis[no]);
                    }, 600);
                } else {
                    $(this).removeClass('fa-pause');
                    $(this).addClass('fa-play');
                    var trId = $(this).closest('tr').prop('id');
                    $('tr[id*=' + trId +']').css('background-color', '');
                    $('.mfp-close').trigger('click');
                    synth.cancel();
                }
                utterThis[no].onend = function (event) {
                    $('a[id*=play-pause-button]').removeClass('fa-pause');
                    $('a[id*=play-pause-button]').addClass('fa-play');
                    var trId = $('a[id*=play-pause-button]').eq(no).closest('tr').prop('id');
                    $('tr[id*=' + trId +']').css('background-color', '');
                    $('.mfp-close').trigger('click');
                }
            });
        });
    }

    if ($('#business0').length > 0) {

        // 카드 슬라이드
        $('.my-slider').cardslider({
            swipe: true,
            dots: true,
            loop: true
        });
        // 카드 슬라이드

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
        var tocMenu = [];

        $('a img').css('textDecoration','none')
        $('#footer').hide();
        $('#vocabulary').hide();

        tocMenu.push('<ul class="toc__menu">');
        $('#conversation').prepend('<colgroup><col width="4px;" /><col width="*" /><col width="40px;" /><col width="40px;" /></colgroup>');
        $('#conversation').find('tr').each(function (index, element) {
            var textTd = $.trim($(element).find('td:eq(0)').html());
            var title = $.trim($(element).find('td:eq(1)').html());
            if (/\d+/.test(textTd)) {
                $(element).empty();
                $(element).append('<td style="padding: 0px; background-color: #ee5f5b;" id=-' + textTd +'></td>');
                $(element).append('<td colspan="2" style="background-color: #fffef3"><i>' + title +'</i></td>');

                tocMenu.push('<li><a href="#-' + textTd + '">' + title + '</a></li>');
                q++;
            } else {
                var $a = $(element).find('a');
                $(element).find('td:eq(0)').css('padding', '0px')
                $(element).find('td:eq(2)').addClass('playTd');
                $(element).find('td:eq(3)').addClass('youtubeTd');
                $(element).find('td:eq(3)').css('padding', '5px');

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
        tocMenu.push('</ul>');
        $('.toc').append(tocMenu.join(''));

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
                    $('tr[id*=' + trId +']').css('background-color', '#ebf5f8');
                    if (type !== '') {
                        var offset = $(this).offset();
                        $('html, body').animate({scrollTop : offset.top - 100}, 400);
                    }
                    setTimeout(function () {
                        var reTitle = '';
                        $('tr[id*=' + trId +']').find('td:eq(1)').each(function (index, element) {
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
                            closeBtnInside: false,
                            preloader: true,
                            removalDelay: 160,
                            mainClass: 'mfp-fade',
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
    }

    if ($('#business2').length > 0) {
        $('#inputText').select();
    }
    if ($('#business1').length > 0) {
        $('#searchStdCode').select();
    }
});