(function ($) {

    var applyValue = (function (json, delimiter, name, value) {
        var pObj;
        var cpName;
        $.each(name.split(delimiter), function (i, nameSegment) {
            pObj = json;
            cpName = nameSegment;
            json = json[nameSegment] ? json[nameSegment] : (json[nameSegment] = {});
        });
        pObj[cpName] = value;
    });

    $.fn.formToObject = function (options) {
        var $form = this;
        var opts = $.extend({}, $.fn.formToObject.defaults, options);
        var delimiter = opts.delimiter;
        var json = {};
        var $elements = this.find(opts.selector);

        if ($elements.length <= 1) {
            return json;
        }

        $elements.each(function () {
            var $element = $(this);
            var name = $element.attr('name');

            if ($element.is('input')) {
                var type = $element.attr('type');

                if (typeof type === typeof undefined || type === false) {
                    return false;
                }

                if (type === 'radio' || type === 'checkbox') {
                    var value = $form.find('input[name="' + name + '"]:checked').val();

                    if (!value) {
                        applyValue(json, delimiter, name, null);
                        return;
                    }

                    applyValue(json, delimiter, name, value);
                    return;
                }
            }

            // by default just apply the value
            applyValue(json, delimiter, name, $element.val());
        });

        return json;
    };

    $.fn.formToObject.defaults = {
        pretty: false,
        delimiter: '.',
        selector: 'input[name], select[name], textarea[name]'
    };

    $.fn.formToJson = function (options) {
        var object = this.formToObject(options);

        if (options && options.pretty) {
            return JSON.stringify(object, null, 2);
        }

        return JSON.stringify(object);
    };
}(jQuery));