var currentPost = $(".b-story")[0];
var elemTop = parseInt($(currentPost).offset().top), elemBottom = parseInt(elemTop + $(currentPost).height() - 1);

runScroller();
runKeyMapper();
runMenu();

function runScroller() {
    $(document).scroll(function (){
        if (!$(currentPost).length) currentPost = $(".b-story")[0];
        var docViewTop = parseInt($(window).scrollTop());
        var idSave;

        if (elemTop <= docViewTop) {
            idSave = $(currentPost).find(".scrollBtn").attr("id");
            $(currentPost).find(".scrollBtnStyle").attr("id","boosterWrap").removeClass("scrollBtn").css({"top":"80px","left":"83px","position":"fixed"});
            $(currentPost).find(".rating").css("position","fixed").css("top","0px").next().css("padding-left","67px").css("height", "65px");
            $(currentPost).find(".pg_click").removeClass('pg_click');
            $(currentPost).find("#story_main_t").addClass('pg_click');
            $(currentPost).find(".curs").css("cursor","pointer");
            if (elemBottom - 73 <= docViewTop) {
                $(currentPost).find(".rating").css("position","static").next().css("padding-left","0px");
            } else {
                $(currentPost).find(".rating").css("position","fixed").css("top","0px").next().css("padding-left","67px").css("height", "65px");
            }
        }

        if (elemBottom < docViewTop) {
            $(currentPost).find(".scrollBtnStyle").attr("id",idSave).addClass("scrollBtn");
            $(currentPost).find(".rating").css("position","static").next().css("padding-left","0px");
            $(currentPost).find("tr[attr=out]").addClass('pg_click');
            $(currentPost).find("#story_main_t").removeClass('pg_click');
            stopAllMedia(currentPost);
            currentPost = $(currentPost).nextAll('.b-story')[0];
            elemTop = parseInt($(currentPost).offset().top);
            elemBottom = parseInt(elemTop + $(currentPost).height() - 1);
        }

        if (elemTop > docViewTop) {
            $(currentPost).find(".scrollBtnStyle").attr("id",idSave).addClass("scrollBtn");
            $(currentPost).find("tr[attr=out]").addClass('pg_click');
            $(currentPost).find("#story_main_t").removeClass('pg_click');
            $(currentPost).find(".rating").css("position","static").next().css("padding-left","0px");
            if ($(currentPost).index() > 0) {
                currentPost = $(currentPost).prevAll('.b-story')[0];
                elemTop = parseInt($(currentPost).offset().top);
                elemBottom = parseInt(elemTop + $(currentPost).height() - 1);
            }
        }
    });
}

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
            if (code == 114 || code == 1082) {
                if ($(currentPost).find(".playGif").css("display") == "none") {
                    $(currentPost).find(".playGif").css("display","block");
                    $(currentPost).find(".showGif").css("display","none");
                } else {
                    $(currentPost).find(".playGif").css("display","none");
                    $(currentPost).find(".showGif").css("display","block");
                }
                if ($(currentPost).find('.videoDiv').hasClass('b-video__wrapper')) {
                    var back = $(currentPost).find('.b-video__wrapper');
                    var url = $(back).attr('data-url');
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

function runMenu() {
    var navigator = $('.b-navigator');
    var userName = $(".name a:first-child").html();
    var userLink = "<div id='boosterUserName'><a href='http://pikabu.ru/profile/"+userName+"' target='blank'>"+userName+"</a></div>";
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

}