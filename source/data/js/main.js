var currentPost;  //  Текущий пост
var elemTop, elemBottom;  //  Его верх и низ

if ($('.b-story').length) {  //  Если страница с постами
    currentPost = $(".b-story")[0];  //  Выбираем первый пост как активный
    elemTop = $(currentPost).offset().top, elemBottom = elemTop + $(currentPost).height() - 1;  //  Затем определяем его верх и низ на странице
    $(currentPost).find(".pg_click").addClass('currentPostClick');

    //  После чего запускаем сопроводительные функции
    runScroller();
    runKeyMapper();
    runMenu();
}

//  Функция, отвечающая за определение текущего активного поста
function runScroller() {
    var lastScrollTop = 0;
    $(document).scroll(function (){

        var st = $(window).scrollTop();
        if (st > lastScrollTop){
            if ($('#fastScroller').hasClass('fastDown')) {
                $('#fastScroller').removeClass('fastDown').addClass('fastUp');
            }
        }
        lastScrollTop = st;

        if ($(currentPost).height() == 0) {
            currentPost = $(".b-story")[0];
            elemTop = $(currentPost).offset().top, elemBottom = elemTop + $(currentPost).height() - 1;
        }  //  Делаем активным постом первый, если прошлый активный пост пропал со страницы
        var docViewTop = $(window).scrollTop();  //  Текущий скролл страницы

        if (elemTop <= docViewTop) {  //  Если скроллится активный пост
            $(currentPost).find(".scrollBtnStyle").removeClass("scrollBtn").addClass('scrollBtnCustom');
            $(currentPost).find(".curs").css("cursor","pointer");
            if (elemBottom - $(currentPost).find(".b-story__main-header").height() <= docViewTop) {
                $(currentPost).find(".rating").css("position","static").next().css("padding-left","8px");
            } else if ($(currentPost).find('.b-story__header-additional > noindex > .sv_img').attr('attr') == 1) {
                $(currentPost).find(".rating").css("position","fixed").css("top","0px").next().css({
                    'padding-left': $(currentPost).find(".rating").width() + 7,
                    'height': $(currentPost).find(".rating").height() - 6
                });
            }
        }

        //  Если нижняя граница активного поста выше верхней границы экрана, назначаем активным следующий пост
        if (elemBottom < docViewTop) {
            $(currentPost).find(".scrollBtnStyle").addClass("scrollBtn").removeClass('scrollBtnCustom');
            $(currentPost).find(".rating").css("position","static").next().css("padding-left","8px");
            stopAllMedia(currentPost);
            $(currentPost).find(".pg_click").removeClass('currentPostClick');
            currentPost = $(currentPost).nextAll('.b-story')[0];
            $(currentPost).find(".pg_click").addClass('currentPostClick');
            elemTop = $(currentPost).offset().top;
            elemBottom = elemTop + $(currentPost).height() - 1;
        }

        //  Если верхняя граница активного поста ниже верхней границы экрана, назначаем активным предыдущий пост
        if (elemTop > docViewTop) {
            $(currentPost).find(".scrollBtnStyle").addClass("scrollBtn").removeClass('scrollBtnCustom');
            $(currentPost).find(".rating").css("position","static").next().css("padding-left","8px");
            if ($(currentPost).index() > 0) {
                $(currentPost).find(".pg_click").removeClass('currentPostClick');
                currentPost = $(currentPost).prevAll('.b-story')[0];
                $(currentPost).find(".pg_click").addClass('currentPostClick');
                elemTop = $(currentPost).offset().top;
                elemBottom = elemTop + $(currentPost).height() - 1;
            }
        }
    });
}
//  Если пост сворачивается/разворачивается
$(document).on('click','.currentPostClick',function() {
    var storyOpened = $(currentPost).find('.b-story__header-additional > noindex > .sv_img').attr('attr');  //  определяем конкретное действие
    elemBottom = elemTop + $(currentPost).height() - 1;  //  переопределяем нижнюю границу поста
    if (storyOpened == 0) {
        $(currentPost).find(".rating").css("position","static").next().css("padding-left","8px");
    }
});

//  Функция, отвечающая за остановку всех медиафайлов до заданного поста
function stopAllMedia(currentPost) {
    $(currentPost).find(".playGif").css("display","block");
    $(currentPost).find(".showGif").css("display","none");
    if ($(currentPost).find('.videoDiv').hasClass('b-video__wrapper')) {
        var back = $(currentPost).find('.b-video__wrapper');
        var url = $(back).attr('data-url');
        if (url.indexOf('youtube') > -1) {
            if ($(currentPost).find(".b-video__preview").length) {
                if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                    $(back).find('.b-video__preview').css({'display':'block'});
                    $(back).find('iframe').remove();
                }
            } else {
                if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?showinfo=0&amp;fs=1&amp;autoplay=0&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fpikabu.ru');
            }
        }
        if (url.indexOf('coub') > -1) {
            if ($(currentPost).find(".b-video__preview").length) {
                if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                    $(back).find('.b-video__preview').css({'display':'block'});
                    $(back).find('iframe').remove();
                }
            } else {
                if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?muted=false&autostart=false&originalSize=false&hideTopBar=true');
            }
        }
        if (url.indexOf('vimeo') > -1) {
            if ($(currentPost).find(".b-video__preview").length) {
                if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                    $(back).find('.b-video__preview').css({'display':'block'});
                    $(back).find('iframe').remove();
                }
            } else {
                if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?api=1&autoplay=0&autohide=1&wmode=opaque&showinfo=0&fs=1&player_id=player_'+$(back).attr('data-id'));
            }
        }
    }
}

//  Функция, отвечающая за расширенное управление с клавиатуры
function runKeyMapper() {
    var focused = false;
    $("textarea").blur(function() {
        focused = false;
    });
    $("textarea").focus(function() {
        focused = true;
    });
    $("input").blur(function() {
        focused = false;
    });
    $("input").focus(function() {
        focused = true;
    });
    $(document).keypress(function(e) {
        if (!focused) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 114 || code == 1082) {  //  Если нажата кнопка R
                //  Если это GIF
                /*
                if ($(currentPost).find(".b-preview__player").css("display") == "none") {
                    $(currentPost).find(".b-preview__player").html('<img class="b-preview__gif" src="'+$(currentPost).find(".b-preview__player").attr('data-src')+'">');
                    $(currentPost).find(".b-preview__player").css("display","block");
                    $(currentPost).find(".b-preview__preview").css("display","none");
                } else {
                    $(currentPost).find(".b-preview__player").css("display","none").html('');
                    $(currentPost).find(".b-preview__preview").css("display","block");
                }*/
                //  Если это видео
                if ($(currentPost).find('.videoDiv').hasClass('b-video__wrapper')) {
                    var back = $(currentPost).find('.b-video__wrapper');
                    var url = $(back).attr('data-url');
                    //  Если проигрыватель YouTube
                    if (url.indexOf('youtube') > -1) {
                        if ($(currentPost).find(".b-video__preview").length) {
                            if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                                $(back).find('.b-video__preview').css({'display':'block'});
                                $(back).find('iframe').remove();
                            } else {
                                $(back).find('.b-video__preview').css({'display':'none'});
                                $(back).append('<iframe id="player_'+$(back).attr('data-id')+'" frameborder="0" allowfullscreen="1" title="YouTube video player" width="585" height="'+$(back).find('.b-video__preview').height()+'" ' +
                                    'src="'+url+'?showinfo=0&amp;fs=1&amp;autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fpikabu.ru"></iframe>');
                            }
                        } else {
                            if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?showinfo=0&amp;fs=1&amp;autoplay=0&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fpikabu.ru');
                                else $(currentPost).addClass('playing').find('iframe').attr('src',url+'?showinfo=0&amp;fs=1&amp;autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fpikabu.ru');
                        }
                    }
                    //  Если проигрыватель Coub
                    if (url.indexOf('coub') > -1) {
                        if ($(currentPost).find(".b-video__preview").length) {
                            if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                                $(back).find('.b-video__preview').css({'display':'block'});
                                $(back).find('iframe').remove();
                            } else {
                                $(back).find('.b-video__preview').css({'display':'none'});
                                $(back).append('<iframe id="player_'+$(back).attr('data-id')+'" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="585" height="'+$(back).find('.b-video__preview').height()+'"' +
                                    'src="'+url+'?muted=false&autostart=true&originalSize=false&hideTopBar=true"></iframe>');
                            }
                        } else {
                            if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?muted=false&autostart=false&originalSize=false&hideTopBar=true');
                            else $(currentPost).addClass('playing').find('iframe').attr('src',url+'?muted=false&autostart=true&originalSize=false&hideTopBar=true');
                        }
                    }
                    //  Если проигрыватель Vimeo
                    if (url.indexOf('vimeo') > -1) {
                        if ($(currentPost).find(".b-video__preview").length) {
                            if ($(currentPost).find(".b-video__preview").css("display") == "none") {
                                $(back).find('.b-video__preview').css({'display':'block'});
                                $(back).find('iframe').remove();
                            } else {
                                $(back).find('.b-video__preview').css({'display':'none'});
                                $(back).append('<iframe id="player_'+$(back).attr('data-id')+'" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" width="585" height="'+$(back).find('.b-video__preview').height()+'"' +
                                    'src="'+url+'?api=1&autoplay=1&autohide=1&wmode=opaque&showinfo=0&fs=1&player_id=player_'+$(back).attr('data-id')+'"></iframe>');
                            }
                        } else {
                            if ($(currentPost).hasClass('playing')) $(currentPost).removeClass('playing').find('iframe').attr('src',url+'?api=1&autoplay=0&autohide=1&wmode=opaque&showinfo=0&fs=1&player_id=player_'+$(back).attr('data-id'));
                            else $(currentPost).addClass('playing').find('iframe').attr('src',url+'?api=1&autoplay=1&autohide=1&wmode=opaque&showinfo=0&fs=1&player_id=player_'+$(back).attr('data-id'));
                        }
                    }
                }
            }
        }
    });
}

//  Функция, отвечающая за расширенное меню пользователя
function runMenu() {
    var navigator = $('.b-navigator');
    if ($(".name a:first-child").length) {
        var userName = $(".name a:first-child").html();
        var userLink = "<div id='modeSwitch'></div><div id='boosterUserName'><a href='http://pikabu.ru/profile/"+userName+"' target='blank'>"+userName+"</a></div>";
        $(navigator).addClass('boosterMenuOut').prepend(userLink).after('<div id="boosterMenu" class="boosterMenuOut"></div>');

        $('#boosterMenu').html($('.personals').html()).css({
            'width': $(navigator).width(),
            'right': (parseInt($(navigator).css('right')) + 7) + 'px',
            'top': $(navigator).innerHeight() - 1
        });

        $(document).on('mouseenter','#boosterUserName',function() {
            $('#boosterMenu').fadeIn(300);
        });

        $(document).on('mouseleave','.boosterMenuOut',function(e) {
            var elem = e.toElement || e.relatedTarget;
            if (!$(elem).hasClass('boosterMenuOut')) $('#boosterMenu').fadeOut(300);
        });

        $('#modeSwitch').css('background-image','url('+chrome.extension.getURL('data/images/gear.png')+')');
    }
}

var scrollPosition = 0;
runFastScroll();
//  Функция, отвечающая за быстрый скролл на страницах
function runFastScroll() {
    $('#updown').remove();
    $('body').prepend('<div id="fastScroller" class="fastUp"><span></span></div>');
    $(document).on('click','#fastScroller',function() {
        if ($(this).hasClass('fastUp')) {
            scrollPosition = $(window).scrollTop();
            $('html, body').animate({scrollTop: 0},500,'',function() {
                $('#fastScroller').removeClass('fastUp').addClass('fastDown');
            });
        }
        if ($(this).hasClass('fastDown')) {
            $('html, body').animate({scrollTop: scrollPosition},500,'',function() {
                $('#fastScroller').removeClass('fastDown').addClass('fastUp');
            })
        }
    });
}

$('.menu').append('<li class="noactive gear"><a style="background-image: url('+chrome.extension.getURL('data/images/gear.png')+')"></a></li>');
switchMode();
$(document).on('click','#modeSwitch, .gear a',function() {
    if (darkMode) chrome.storage.local.set({'darkMode': false},function() {
        switchMode();
    });
    else chrome.storage.local.set({'darkMode': true},function() {
        switchMode();
    });
});
$(document).on('click','.answer_comm .show_comm_tree',function() {
    if (darkMode) {
        if ($(this).attr('attr') == '0') {
            $(this).next().attr('src',chrome.extension.getURL('data/images/show_tree.gif'));
        } else {
            $(this).next().attr('src',chrome.extension.getURL('data/images/show_tree_active.gif'));
        }
    }
});
var darkMode;
function switchMode() {
    chrome.storage.local.get('darkMode',function(result) {
        if (result.darkMode === undefined) {
            chrome.storage.local.set({'darkMode': false});
            darkMode = false;
        }
        else darkMode = result.darkMode;
        if (darkMode) {
            $('body').addClass('bodyBlack');
            chrome.storage.local.set({'hide_news_counter': $('#hide_news_counter').css('background')});
            $('#hide_news_counter').css({
                'background': 'url('+chrome.extension.getURL('data/images/bg_counter.png')+')'
            });
            chrome.storage.local.set({'name': $('.name').css('background')});
            $('.name').css({
                'background': 'url('+chrome.extension.getURL('data/images/menu_elements_top_bottom.png')+') no-repeat 0 0px'
            });
            chrome.storage.local.set({'nameH4': $('.name > h4').css('background')});
            $('.name > h4').css({
                'background': 'url('+chrome.extension.getURL('data/images/line_name.gif')+') no-repeat left bottom'
            });
            chrome.storage.local.set({'logoutImg': $('#logout img').attr('src')});
            $('#logout img').attr('src',chrome.extension.getURL('data/images/logout.png'));
            chrome.storage.local.set({'personals': $('.personals').css('background')});
            $('.personals').css({
                'background': 'url('+chrome.extension.getURL('data/images/menu_bg.gif')+') repeat-y'
            });
            chrome.storage.local.set({'pmenu': $('.pmenu > tbody > tr:last-of-type > td').css('background')});
            $('.pmenu > tbody > tr:last-of-type > td').css({
                'background': 'url('+chrome.extension.getURL('data/images/menu_elements_top_bottom.png')+') no-repeat 0 -38px'
            });
            chrome.storage.local.set({'iSprite': $('.i-sprite_b-rating_up').css('background-image')});
            $('.i-sprite_b-rating_up, .i-sprite_b-rating_down, .i-sprite_b-rating_dot-none, .i-sprite_b-rating_up-small, .i-sprite_b-rating_down-small').css({
                'background-image': 'url('+chrome.extension.getURL('data/images/support.png')+')'
            });
            chrome.storage.local.set({'wrapPrev': $('#wrap').prev().css('background')});
            $('#wrap').prev().css({
                'background': 'url('+chrome.extension.getURL('data/images/header_bg.gif')+') #303030 repeat-x bottom'
            });
            chrome.storage.local.set({'storySave': $('.story-save').css('background')});
            $('.story-save').css({
                'background': 'url('+chrome.extension.getURL('data/images/menu_saved_nactive.png')+') no-repeat'
            });
            chrome.storage.local.set({'navigatorSeparate': $('body .i-sprite_navigator_separate').css('background-image')});
            $('body .i-sprite_navigator_separate').css({
                'background-image': 'url('+chrome.extension.getURL('data/images/support.png')+')'
            });
            chrome.storage.local.set({'shareButtons': $('.show_share_buttons img').attr('src')});
            $('.show_share_buttons img').attr('src',chrome.extension.getURL('data/images/share_all.png'));
            chrome.storage.local.set({'commentImg': $('.comment > img').attr('src')});
            $('.comment > img').attr('src',chrome.extension.getURL('data/images/comments.gif'));
            chrome.storage.local.set({'answerVmiddle': $('.answer_comm a + .vmiddle').attr('src')});
            $('.answer_comm a + .vmiddle').attr('src',chrome.extension.getURL('data/images/show_tree.gif'));
            chrome.storage.local.set({'profileFirst': $('.profile_wrap .vmiddle:first-of-type').attr('src')});
            $('.profile_wrap .vmiddle:first-of-type').attr('src',chrome.extension.getURL('data/images/rating_t_up_profile.png'));
            chrome.storage.local.set({'profileLast': $('.profile_wrap .vmiddle:last-of-type').attr('src')});
            $('.profile_wrap .vmiddle:last-of-type').attr('src',chrome.extension.getURL('data/images/rating_t_down_profile.png'));
        } else {
            $('body').removeClass('bodyBlack');
            chrome.storage.local.get('hide_news_counter',function(result) {
                if (result.hide_news_counter != undefined) $('#hide_news_counter').css('background',result.hide_news_counter);
            });
            chrome.storage.local.get('name',function(result) {
                if (result.name != undefined) $('.name').css('background',result.name);
            });
            chrome.storage.local.get('nameH4',function(result) {
                if (result.nameH4 != undefined) $('.name > h4').css('background',result.nameH4);
            });
            chrome.storage.local.get('logoutImg',function(result) {
                if (result.logoutImg != undefined) $('#logout img').attr('src',result.logoutImg);
            });
            chrome.storage.local.get('personals',function(result) {
                if (result.personals != undefined) $('.personals').css('background',result.personals);
            });
            chrome.storage.local.get('pmenu',function(result) {
                if (result.pmenu != undefined) $('.pmenu > tbody > tr:last-of-type > td').css('background',result.pmenu);
            });
            chrome.storage.local.get('iSprite',function(result) {
                if (result.iSprite != undefined) {
                    $('.i-sprite_b-rating_up').css('background-image',result.iSprite);
                    $('.i-sprite_b-rating_down').css('background-image',result.iSprite);
                    $('.i-sprite_b-rating_dot-none').css('background-image',result.iSprite);
                    $('.i-sprite_b-rating_up-small').css('background-image',result.iSprite);
                    $('.i-sprite_b-rating_down-small').css('background-image',result.iSprite);
                }
            });
            chrome.storage.local.get('wrapPrev',function(result) {
                if (result.wrapPrev != undefined) $('#wrap').prev().css('background',result.wrapPrev);
            });
            chrome.storage.local.get('storySave',function(result) {
                if (result.storySave != undefined) $('.story-save').css('background',result.storySave);
            });
            chrome.storage.local.get('navigatorSeparate',function(result) {
                if (result.navigatorSeparate != undefined) $('.bodyBlack .i-sprite_navigator_separate').css('background-image',result.navigatorSeparate);
            });
            chrome.storage.local.get('shareButtons',function(result) {
                if (result.shareButtons != undefined) $('.show_share_buttons img').attr('src',result.shareButtons);
            });
            chrome.storage.local.get('commentImg',function(result) {
                if (result.commentImg != undefined) $('.comment > img').attr('src',result.commentImg);
            });
            chrome.storage.local.get('answerVmiddle',function(result) {
                if (result.answerVmiddle != undefined) $('.answer_comm a + .vmiddle').attr('src',result.answerVmiddle);
            });
            chrome.storage.local.get('profileFirst',function(result) {
                if (result.profileFirst != undefined) $('.profile_wrap .vmiddle:first-of-type').attr('src',result.profileFirst);
            });
            chrome.storage.local.get('profileLast',function(result) {
                if (result.profileLast != undefined) $('.profile_wrap .vmiddle:last-of-type').attr('src',result.profileLast);
            });
        }
    });

}

//  Функция, отвечающая за получение информации о последней версии расширения
getLatestVersion();
$(document).on('click','#versionClose',function() {
    $('#versionView').fadeOut(300);
    chrome.storage.local.set({'versionOff':'true'});
});
function getLatestVersion() {
    $.ajax({
        url: 'http://job.mslwork.ru/versions/controller.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response != 0) {
                chrome.storage.local.get('versionOff',function(result) {
                    if (result.versionOff == 'true') {
                        chrome.storage.local.get('versionNumber',function(result) {
                            if (result.versionNumber != response.version) {
                                $('#right_menu > *:nth-child(4)').after('<div id="versionView" class="login_f">'+
                                    '<div class="rating_bl">Новая версия<span id="versionClose" style="float: right">Скрыть</span></div>' +
                                    '<div id="versionWrap">' +
                                    '<div id="versionLink"></div>' +
                                    '<ul id="versionChangeList"></ul>' +
                                    '</div></div>');
                                if (response.link != '') $('#versionLink').html('<a href="'+response.link+'" target="_blank">PikaBooster '+response.version+'</a>');
                                else $('#versionLink').html('PikaBooster ' + response.version);
                                for ($i = 0; $i < response.feature.length; $i++) {
                                    $('#versionChangeList').append('<li class="versionFeature">'+response.feature[$i]+'</li>');
                                }
                                chrome.storage.local.set({'versionOff':'false'});
                                chrome.storage.local.set({'versionNumber':response.version});
                            }
                        });
                    } else {
                        $('#right_menu > *:nth-child(4)').after('<div id="versionView" class="login_f">'+
                            '<div class="rating_bl">Новая версия<span id="versionClose" style="float: right">Скрыть</span></div>' +
                            '<div id="versionWrap">' +
                            '<div id="versionLink"></div>' +
                            '<ul id="versionChangeList"></ul>' +
                            '</div></div>');
                        if (response.link != '') $('#versionLink').html('<a href="'+response.link+'" target="_blank">PikaBooster '+response.version+'</a>');
                        else $('#versionLink').html('PikaBooster ' + response.version);
                        for ($i = 0; $i < response.feature.length; $i++) {
                            $('#versionChangeList').append('<li class="versionFeature">'+response.feature[$i]+'</li>');
                        }
                        chrome.storage.local.set({'versionOff':'false'});
                        chrome.storage.local.set({'versionNumber':response.version});
                    }
                });
            }
        }
    });
}