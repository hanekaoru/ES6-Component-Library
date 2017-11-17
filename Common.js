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
