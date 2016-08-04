(function ($) {
    /**
     * Define strategies for syntax parsing here
     *
     * @type {{delimited: strategies.delimited, array: strategies.array}}
     */
    var syntaxes = {
        /**
         * Example: name="address.street"
         *
         * @param json
         * @param delimiter
         * @param name
         * @param value
         */
        delimited: function (json, delimiter, name, value) {
            var pObj;
            var cpName;
            $.each(name.split(delimiter), function (i, nameSegment) {
                pObj = json;
                cpName = nameSegment;
                json = json[nameSegment] ? json[nameSegment] : (json[nameSegment] = {});
            });
            pObj[cpName] = value;
        },

        /**
         * Example: name="form[address][street]"
         *
         * @param json
         * @param delimiter
         * @param name
         * @param value
         */
        array: function (json, delimiter, name, value) {
            var name = name.substr(name.indexOf('['));
            var pObj;
            var cpName;
            $.each(name.split(/\[(.+?)\]/), function (i, nameSegment) {
                if (nameSegment === '') {
                    return;
                }

                pObj = json;
                cpName = nameSegment;
                json = json[nameSegment] ? json[nameSegment] : (json[nameSegment] = {});
            });
            pObj[cpName] = value;
        }
    };

    /**
     * @param options
     * @returns {{}}
     */
    $.fn.formToObject = function (options) {
        var $form = this;
        var opts = $.extend({}, $.fn.formToObject.defaults, options);
        var delimiter = opts.delimiter;
        var syntax = opts.syntax;
        var json = {};
        var $elements = this.find(opts.selector);

        if ($elements.length < 1) {
            return json;
        }

        $elements.each(function () {
            var $element = $(this);
            var name = $element.attr('name');

            if ($element.is('select') && $element.is(':hidden')) {
                return;
            }

            if ($element.is('input')) {
                var type = $element.attr('type');

                if (typeof type === typeof undefined || type === false) {
                    return;
                }

                if (type != 'hidden' && $element.is(':hidden')) {
                    return;
                }

                if (type === 'radio' || type === 'checkbox') {
                    var value = $form.find('input[name="' + name + '"]:checked').val();

                    if (!value) {
                        syntaxes[syntax](json, delimiter, name, null);
                        return;
                    }

                    // "true" or "1" are true
                    if (value == 'true' || value == '1') {
                        value = true;
                    }

                    // "false" or "0" are false
                    if (value == 'false' || value == '0') {
                        value = false;
                    }

                    syntaxes[syntax](json, delimiter, name, value);
                    return;
                }
            }

            // by default just apply the value
            syntaxes[syntax](json, delimiter, name, $element.val());
        });

        return json;
    };

    /**
     * Defaults are defined here
     *
     * @type {{pretty: boolean, strategy: string, delimiter: string, selector: string}}
     */
    $.fn.formToObject.defaults = {
        pretty: false,
        syntax: 'delimited',
        delimiter: '.',
        selector: 'input[name], select[name], textarea[name]'
    };

    /**
     * @param options
     */
    $.fn.formToJson = function (options) {
        var object = this.formToObject(options);

        if (options && options.pretty) {
            return JSON.stringify(object, null, 2);
        }

        return JSON.stringify(object);
    };
}(jQuery));