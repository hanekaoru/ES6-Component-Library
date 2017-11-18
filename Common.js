$.fn.extend({
    placeholder: function (str) {
        var placeholderText = str || $(this).attr('placeholder');
        var $this = $(this);
        var setPlaceholder = function (str) {
            var inpt = $this.position();
            inpt.size = $this.css('fontSize');
            var $inpt = $('<div class="__inpt__" style="height:' + $this.height() + 'px;display:' + ($this.val() == '' ? 'block' : 'none') + ';font-size:' + inpt.size + ';line-height:' + $this.height() + 'px;color:#aaa;padding-left:' + $this.css('paddingLeft') + ';padding-top:' + $this.css('paddingTop') + ';position:absolute;top:' + (inpt.top + 1) + 'px;left:' + (inpt.left + 2) + 'px;">' + placeholderText + '</div>');
            $this.parent().append($inpt);
            $inpt.click(function () {
                $this.focus();
            });
            $this.keyup(function () {
                if ($(this).val() == '') {
                    $inpt.css('display', 'block');
                } else {
                    $inpt.css('display', 'none');
                };
            });
        }

        setPlaceholder();
    },
    // 四个方向的 tooltip
    tooltipLeft: function (str, bg, color) {
        $('.tooltip').remove();
        $('<div class="tooltip" style="color:' + (color || '#E5E5E5') + ';">' + str + '<div class="tra tra-right"></div></div>').appendTo($('body'));
        $('.tooltip').css({ 'background': bg, 'top': ($(this).offset().top + ($(this).outerHeight() - $('.tooltip').outerHeight()) / 2) + 'px', 'left': ($(this).offset().left - $('.tooltip').outerWidth() - 10) + 'px' });
        $('.tra-right').css({ 'border-left-color': bg, 'top': ($('.tooltip').outerHeight() - 8) / 2 + 'px', 'right': '-8px' });
        return $(this);
    },
    tooltipRight: function (str, bg, color) {
        $('.tooltip').remove();
        $('<div class="tooltip" style="color:' + (color || '#E5E5E5') + ';">' + str + '<div class="tra tra-left"></div></div>').appendTo($('body'));
        $('.tooltip').css({ 'background': bg, 'top': ($(this).offset().top + ($(this).outerHeight() - $('.tooltip').outerHeight()) / 2) + 'px', 'left': ($(this).offset().left + $(this).outerWidth() + 10) + 'px' });
        $('.tra-left').css({ 'border-right-color': bg, 'top': ($('.tooltip').outerHeight() - 8) / 2 + 'px', 'left': '-8px' });
        return $(this);
    },
    tooltipTop: function (str, bg, color, bor, fn) {
        $('.tooltip').remove();
        $('<div class="tooltip" style="color:' + (color || '#E5E5E5') + ';">' + str + '<div class="tra tra-bottom"></div></div>').appendTo($('body'));
        $('.tooltip').css({ 'background': bg, 'top': ($(this).offset().top - $('.tooltip').outerHeight() - 8) + 'px', 'left': ($(this).outerWidth() - $('.tooltip').outerWidth() - 5) / 2 + $(this).offset().left + 'px' });
        $('.tra-bottom').css({ 'border-top-color': bg, 'left': ($('.tooltip').outerWidth() - 8) / 2 + 'px', 'bottom': '-8px' });
        if (bor) {
            $('.tra-bottom').before('<div class="tra tra-bottom" style="border-top-color: rgb(125, 124, 124); left:' + (($('.tooltip').outerWidth() - 8) / 2 - 2) + 'px; bottom: -12px;border-width: 6px;"></div>');
        }
        fn && fn($('.tooltip'));
        return $(this);
    },
    tooltipBottom: function (str, bg, color) {
        $('.tooltip').remove();
        $('<div class="tooltip" style="color:' + (color || '#E5E5E5') + ';">' + str + '<div class="tra tra-top"></div></div>').appendTo($('body'));
        $('.tooltip').css({ 'background': bg, 'top': ($(this).offset().top + $(this).outerHeight() + 5) + 'px', 'left': ($(this).outerWidth() - $('.tooltip').outerWidth() - 5) / 2 + $(this).offset().left + 'px' });
        $('.tra-top').css({ 'border-bottom-color': bg, 'left': ($('.tooltip').outerWidth() - 8) / 2 + 'px', 'top': '-8px' });
        return $(this);
    }
});




$.extend({
    showMsg: function (opts, other) {
        var arrayHtml = [
            '<div class="dialogTitle">' + (opts.title || '提示') + '<div class="d" style="">×</div></div>',
            '<p style="line-height: 95px;text-align: center;font-size: 15px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="txt">' + (opts.msg || '') + '</p>',
            '<div id="dialogSure" class="btn btnprim fl newbtn" style="margin-top:0;padding: 0 20px;0px;margin-left: 78px;margin-right:15px;">' + (opts.yesText || '确定') + '</div>',
            '<div id="dialogClose" class="btn btnprim cancel fl newbtn" style="margin-top:0;padding: 0 20px;0px;">' + (opts.noText || '取消') + '</div>'];
        $.dialogJplus(Object.assign({
            containerCss: {
                width: '300px',
                height: '190px',
                'background-color': '#fff',
                color: '#666',
                "padding": "0px"
            },
            closeHTML: '',
            arrayHtml: arrayHtml,
            onShow: function () {
                $('#simplemodal-container').css({
                    'box-shadow': 'rgb(93, 93, 93) 0px 0px 20px'
                });
                opts.onShow && opts.onShow($('#simplemodal-container'));
                $(".cancel,.d").click(function () {
                    opts.onClose && opts.onClose();
                    $.modal.close();
                });
                $("#dialogSure").click(function () {
                    if ($(this).attr('sub') == '1') return false;
                    $(this).attr('sub', 1).html('确定...');
                    opts.onSure && opts.onSure($(this));
                });
            }
        }, other));
    },
    alertSuc: function (str, fn, title) {
        var arrayHtml = [
            '<div class="dialogTitle">' + (title || '提示') + '<div class="d" style="">×</div></div>',
            '<p style="line-height: 95px;text-align: center;font-size: 15px;color: #5AB317;" class="txt">' + str + '</p>'];
        $.dialogJplus({
            containerCss: {
                width: '255px',
                height: '160px',
                'background-color': '#fff',
                color: '#666',
                "padding": "0px"
            },
            closeHTML: '',
            arrayHtml: arrayHtml,
            onShow: function () {
                $('#simplemodal-container').css({
                    'box-shadow': 'rgb(93, 93, 93) 0px 0px 20px'
                });
                $(".cancel,.d").click(function () {
                    $.modal.close();
                });
                fn && fn($(this));
            }
        });

    },
    simpleLoading: function (str, fn) {
        $('body').append([
            '<div class="laymask" style="top:0;"></div>',
            '<div class="loadng"><div class="delloading" style="display: none;">×</div><div class="loading fl" style="margin-right: 10px;"></div><div class="fl" style="font-size: 15px;margin-top: 3px;">' + (str || '正在打开...') + '</div></div>',
        ].join(''));
        setTimeout(function () {
            $('.loadng').addClass('gaimcnor');
        }, 5);
        fn && fn();
    },
    remsimpleLoading: function () {
        $('.laymask,.loadng').remove();
    },
    delReload: function (data, str1, str2) {
        window.parent.$.modal.close();
        if (data <= 0) {
            window.parent.$.alert(str2 || '存在不能删除的，能删除的成功删除！');
            setTimeout(function () {
                location.reload();
                window.parent.$.modal.close();
            }, 1500);
        }
        if (data > 0) {
            window.parent.$.alertSuc(str1 || '删除成功！');
            setTimeout(function () {
                location.reload();
                window.parent.$.modal.close();
            }, 1500);
        }
    },
    saveReload: function (data, str1, str2) {
        window.parent.$.modal.close();
        if (data <= 0) {
            window.parent.$.alert(str2 || '存在重复！');
            setTimeout(function () {

                window.parent.$.modal.close();
                location.reload();
            }, 1500);
        }
        if (data > 0) {
            window.parent.$.alertSuc(str1 || '保存成功！');
            setTimeout(function () {

                window.parent.$.modal.close();
                location.reload();
            }, 1500);
        }
    }
})
