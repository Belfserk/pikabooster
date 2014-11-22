var postIndex = 0;
var currentPost = $("#stories_container .inner_wrap:eq("+postIndex+")").attr("id");
//if (document.location.href.match(/*pikabu.ru/story*/)) currentPost = $("#wrap .inner_wrap").attr("id");

runScroller();
runKeyMapper();
runMenu();

function runScroller() {
    //var action = 'save';
    $(document).scroll(function (){
        var docViewTop = $(window).scrollTop();
        var elemTop = $("#"+currentPost).offset().top;
        var elemBottom = elemTop + $("#"+currentPost).height();
        var idSave;

        if (elemTop <= docViewTop) {
            //var storyid = currentPost.substr(currentPost.lastIndexOf('_')+1);
            idSave = $("#" + currentPost + " .scrollBtn").attr("id");
            $("#" + currentPost + " .scrollBtnStyle").attr("id","boosterWrap").removeClass("scrollBtn").css({"top":"80px","left":"83px","position":"fixed"});
            $("#" + currentPost + " .rating").css("position","fixed").css("top","0px").next().css("padding-left","67px").css("height", "65px");
            $("#" + currentPost + " .pg_click").removeClass('pg_click');
            $("#" + currentPost + " #story_main_t").addClass('pg_click');
            $('#' + currentPost + " .curs").css("cursor","pointer");/*.attr('onclick','SaveStory('+storyid+',\''+action+'\')').click(function() {
             $("#" + currentPost + " .info>a").each(function() {
             if ($(this).css('display') == "inline") {
             var id = $(this).attr("id");
             action = id.substr(0,id.indexOf('_'));
             }
             });
             });*/
            if (elemBottom - 73 <= docViewTop) {
                $("#" + currentPost + " .rating").css("position","static").next().css("padding-left","0px");
            } else {
                $("#" + currentPost + " .rating").css("position","fixed").css("top","0px").next().css("padding-left","67px").css("height", "65px");
            }
        }

        if (elemBottom <= docViewTop) {
            $("#" + currentPost + " .scrollBtnStyle").attr("id",idSave).addClass("scrollBtn");
            $("#" + currentPost + " .rating").css("position","static").next().css("padding-left","0px");
            $("#" + currentPost + " tr[attr=out]").addClass('pg_click');
            $("#" + currentPost + " #story_main_t").removeClass('pg_click');
            currentPost = $("#stories_container .inner_wrap:eq("+(++postIndex)+")").attr("id");
            if ($("#stories_container .inner_wrap:eq("+(postIndex)+")").hasClass("adv_wrap")) {
                currentPost = $("#stories_container .inner_wrap:eq("+(++postIndex)+")").attr("id");
            }
        }

        if (elemTop > docViewTop) {
            $("#" + currentPost + " .scrollBtnStyle").attr("id",idSave).addClass("scrollBtn");
            $("#" + currentPost + " tr[attr=out]").addClass('pg_click');
            $("#" + currentPost + " #story_main_t").removeClass('pg_click');
            $("#" + currentPost + " .rating").css("position","static").next().css("padding-left","0px");
            --postIndex;
            if (postIndex < 0) postIndex = 0;
            currentPost = $("#stories_container .inner_wrap:eq("+postIndex+")").attr("id");
            if ($("#stories_container .inner_wrap:eq("+postIndex+")").hasClass("adv_wrap")) {
                --postIndex;
                if (postIndex < 0) postIndex = 0;
                currentPost = $("#stories_container .inner_wrap:eq("+postIndex+")").attr("id");
            }
        }
    });
}

function autoPlayVideo(post,vcode, width, height){
    $("#" + currentPost + " .videoDiv").html('<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
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
            if (code == 114 || code == 1082) {/*
                if ($("#" + currentPost + " .playGif").css("display") == "none") {
                    $("#" + currentPost + " .playGif").css("display","block");
                    $("#" + currentPost + " .showGif").css("display","none");
                } else {
                    $("#" + currentPost + " .playGif").css("display","none");
                    $("#" + currentPost + " .showGif").css("display","block");
                }*/
                if ($("#" + currentPost + " .videoDiv iframe").length) {
                    var vcode = $("#" + currentPost + " iframe").attr('src').substr($("#" + currentPost + " iframe").attr('src').indexOf('embed/')+6);
                    alert(vcode);
                    autoPlayVideo(currentPost,vcode,'600','475');
                }
            }
        }
    });
}

function runMenu() {
    var userName = $(".name a:first-child").html();
    var userLink = "<a id='boosterUserName' href='http://pikabu.ru/profile/"+userName+"' target='blank'>"+userName+"</a>";
    $('#p_prev_container').prepend(userLink).after('<div id="boosterMenu"></div>');
    $('#boosterUserName').css("font","Normal 13px Tahoma").css('color','#686969').css('margin-right','5px').css('text-decoration','none');
    $('#boosterMenu').html($('.personals').html()).css({'position': 'fixed','top': '35px','right': '40px','font': 'normal','display': 'none',
        'font-size': '13px','font-family': 'Tahoma','color': 'rgb(104, 105, 105)','margin-right': '2px','text-decoration': 'none',
        'background-color': '#e8e8e8','border-radius': '0px 0px 6px 6px','width': '166px','z-index': '50','box-shadow': 'rgb(163, 163, 163) 0px 0px 2px'});
    $('#boosterMenu ul').css({'list-style': 'none','padding': '0'});
    $('#boosterMenu li').css('padding','0 0 0 15px');
    $('#boosterMenu span').css({'color': '#686969','padding': '0 0 0 15px','text-decoration': 'none','font-size': '11px','line-height': '17px'});
    $('#boosterMenu a').css({'color': '#5190B8','padding': '0 0 0 15px','text-decoration': 'none','font-size': '11px','line-height': '17px'}).hover(function() {
        $(this).css('text-decoration','underline');
    },function() {$(this).css('text-decoration','none')});

    $('#boosterUserName').hover(function() {
        $('#boosterMenu').fadeIn('fast');
    },function() {
        $('#boosterMenu').hover(function() {}, function() {
            $('#boosterMenu').fadeOut('fast');
        });
    });
}