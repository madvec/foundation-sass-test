var latte;
(function (latte) {
    /**
     * Enumeration of Keyboard key codes
     */
    (function (Key) {
        /**
         * Backspace key
         *
         * @type {number}
         */
        Key[Key["BACKSPACE"] = 8] = "BACKSPACE";
        /**
         * Tab key
         *
         * @type {number}
         */
        Key[Key["TAB"] = 9] = "TAB";
        /**
         * Enter key
         *
         * @type {number}
         */
        Key[Key["ENTER"] = 13] = "ENTER";
        /**
         * Shift key
         *
         * @type {number}
         */
        Key[Key["SHIFT"] = 16] = "SHIFT";
        /**
         * Control key
         *
         * @type {number}
         */
        Key[Key["CONTROL"] = 17] = "CONTROL";
        /**
         * Alt key
         *
         * @type {number}
         */
        Key[Key["ALT"] = 18] = "ALT";
        /**
         * Backspace key
         *
         * @type {number}
         */
        Key[Key["PAUSE"] = 19] = "PAUSE";
        /**
         * Caps Lock key
         *
         * @type {number}
         */
        Key[Key["CAPS_LOCK"] = 20] = "CAPS_LOCK";
        /**
         * Escape key
         *
         * @type {number}
         */
        Key[Key["ESCAPE"] = 27] = "ESCAPE";
        /**
         * Page up key
         *
         * @type {number}
         */
        Key[Key["PAGE_UP"] = 33] = "PAGE_UP";
        /**
         * Page down key
         *
         * @type {number}
         */
        Key[Key["PAGE_DOWN"] = 34] = "PAGE_DOWN";
        /**
         * End key
         *
         * @type {number}
         */
        Key[Key["END"] = 35] = "END";
        /**
         * Home key
         *
         * @type {number}
         */
        Key[Key["HOME"] = 36] = "HOME";
        /**
         * Left arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_LEFT"] = 37] = "ARROW_LEFT";
        /**
         * Up arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_UP"] = 38] = "ARROW_UP";
        /**
         * Right arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
        /**
         * Down arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_DOWN"] = 40] = "ARROW_DOWN";
        /**
         * Insert key
         *
         * @type {number}
         */
        Key[Key["INSERT"] = 45] = "INSERT";
        /**
         * Delete key
         *
         * @type {number}
         */
        Key[Key["DELETE"] = 46] = "DELETE";
        /**
         * Zero key
         *
         * @type {number}
         */
        Key[Key["NUMBER_0"] = 48] = "NUMBER_0";
        /**
         * One key
         *
         * @type {number}
         */
        Key[Key["NUMBER_1"] = 49] = "NUMBER_1";
        /**
         * Two key
         *
         * @type {number}
         */
        Key[Key["NUMBER_2"] = 50] = "NUMBER_2";
        /**
         * Three key
         *
         * @type {number}
         */
        Key[Key["NUMBER_3"] = 51] = "NUMBER_3";
        /**
         * Four key
         *
         * @type {number}
         */
        Key[Key["NUMBER_4"] = 52] = "NUMBER_4";
        /**
         * Five key
         *
         * @type {number}
         */
        Key[Key["NUMBER_5"] = 53] = "NUMBER_5";
        /**
         * Siz key
         *
         * @type {number}
         */
        Key[Key["NUMBER_6"] = 54] = "NUMBER_6";
        /**
         * Seven key
         *
         * @type {number}
         */
        Key[Key["NUMBER_7"] = 55] = "NUMBER_7";
        /**
         * Eight key
         *
         * @type {number}
         */
        Key[Key["NUMBER_8"] = 56] = "NUMBER_8";
        /**
         * Nine key
         *
         * @type {number}
         */
        Key[Key["NUMBER_9"] = 57] = "NUMBER_9";
        /**
         * A key
         *
         * @type {number}
         */
        Key[Key["A"] = 65] = "A";
        /**
         * B key
         *
         * @type {number}
         */
        Key[Key["B"] = 66] = "B";
        /**
         * C key
         *
         * @type {number}
         */
        Key[Key["C"] = 67] = "C";
        /**
         * D key
         *
         * @type {number}
         */
        Key[Key["D"] = 68] = "D";
        /**
         * E key
         *
         * @type {number}
         */
        Key[Key["E"] = 69] = "E";
        /**
         * F key
         *
         * @type {number}
         */
        Key[Key["F"] = 70] = "F";
        /**
         * G key
         *
         * @type {number}
         */
        Key[Key["G"] = 71] = "G";
        /**
         * H key
         *
         * @type {number}
         */
        Key[Key["H"] = 72] = "H";
        /**
         * I key
         *
         * @type {number}
         */
        Key[Key["I"] = 73] = "I";
        /**
         * J key
         *
         * @type {number}
         */
        Key[Key["J"] = 74] = "J";
        /**
         * K key
         *
         * @type {number}
         */
        Key[Key["K"] = 75] = "K";
        /**
         * L key
         *
         * @type {number}
         */
        Key[Key["L"] = 76] = "L";
        /**
         * M key
         *
         * @type {number}
         */
        Key[Key["M"] = 77] = "M";
        /**
         * N key
         *
         * @type {number}
         */
        Key[Key["N"] = 78] = "N";
        /**
         * O key
         *
         * @type {number}
         */
        Key[Key["O"] = 79] = "O";
        /**
         * P key
         *
         * @type {number}
         */
        Key[Key["P"] = 80] = "P";
        /**
         * Q key
         *
         * @type {number}
         */
        Key[Key["Q"] = 81] = "Q";
        /**
         * R key
         *
         * @type {number}
         */
        Key[Key["R"] = 82] = "R";
        /**
         * S key
         *
         * @type {number}
         */
        Key[Key["S"] = 83] = "S";
        /**
         * T key
         *
         * @type {number}
         */
        Key[Key["T"] = 84] = "T";
        /**
         * U key
         *
         * @type {number}
         */
        Key[Key["U"] = 85] = "U";
        /**
         * V key
         *
         * @type {number}
         */
        Key[Key["V"] = 86] = "V";
        /**
         * W key
         *
         * @type {number}
         */
        Key[Key["W"] = 87] = "W";
        /**
         * X key
         *
         * @type {number}
         */
        Key[Key["X"] = 88] = "X";
        /**
         * Y key
         *
         * @type {number}
         */
        Key[Key["Y"] = 89] = "Y";
        /**
         * Z key
         *
         * @type {number}
         */
        Key[Key["Z"] = 90] = "Z";
        /**
         * Left window key
         *
         * @type {number}
         */
        Key[Key["LEFT_WINDOW"] = 91] = "LEFT_WINDOW";
        /**
         * Right window key
         *
         * @type {number}
         */
        Key[Key["RIGHT_WINDOW"] = 92] = "RIGHT_WINDOW";
        /**
         * Select key
         *
         * @type {number}
         */
        Key[Key["SELECT"] = 93] = "SELECT";
        /**
         * Numpad Zero key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_0"] = 96] = "NUMPAD_0";
        /**
         * Numpad One key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_1"] = 97] = "NUMPAD_1";
        /**
         * Numpad two key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_2"] = 98] = "NUMPAD_2";
        /**
         * Numpad 3 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_3"] = 99] = "NUMPAD_3";
        /**
         * Numpad 4 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_4"] = 100] = "NUMPAD_4";
        /**
         * Numpad 5 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_5"] = 101] = "NUMPAD_5";
        /**
         * Numpad 6 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_6"] = 102] = "NUMPAD_6";
        /**
         * Numpad 7 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_7"] = 103] = "NUMPAD_7";
        /**
         * Numpad 8 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_8"] = 104] = "NUMPAD_8";
        /**
         * Numpad 9 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_9"] = 105] = "NUMPAD_9";
        /**
         * Numpad * key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_MULTIPLY"] = 106] = "NUMPAD_MULTIPLY";
        /**
         * Numpad + key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_ADD"] = 107] = "NUMPAD_ADD";
        /**
         * Numpad - key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_SUBTRACT"] = 109] = "NUMPAD_SUBTRACT";
        /**
         * Numpad . key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_DECIMAL_POINT"] = 110] = "NUMPAD_DECIMAL_POINT";
        /**
         * Numpad / key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_DIVIDE"] = 111] = "NUMPAD_DIVIDE";
        /**
         * F1 key
         *
         * @type {number}
         */
        Key[Key["F1"] = 112] = "F1";
        /**
         * F2 key
         *
         * @type {number}
         */
        Key[Key["F2"] = 113] = "F2";
        /**
         * F3 key
         *
         * @type {number}
         */
        Key[Key["F3"] = 114] = "F3";
        /**
         * F4 key
         *
         * @type {number}
         */
        Key[Key["F4"] = 115] = "F4";
        /**
         * F5 key
         *
         * @type {number}
         */
        Key[Key["F5"] = 116] = "F5";
        /**
         * F6 key
         *
         * @type {number}
         */
        Key[Key["F6"] = 117] = "F6";
        /**
         * F7 key
         *
         * @type {number}
         */
        Key[Key["F7"] = 118] = "F7";
        /**
         * F8 key
         *
         * @type {number}
         */
        Key[Key["F8"] = 119] = "F8";
        /**
         * F9 key
         *
         * @type {number}
         */
        Key[Key["F9"] = 120] = "F9";
        /**
         * F10 key
         *
         * @type {number}
         */
        Key[Key["F10"] = 121] = "F10";
        /**
         * F11 key
         *
         * @type {number}
         */
        Key[Key["F11"] = 122] = "F11";
        /**
         * F12 key
         *
         * @type {number}
         */
        Key[Key["F12"] = 123] = "F12";
        /**
         * Num lock key
         *
         * @type {number}
         */
        Key[Key["NUM_LOCK"] = 144] = "NUM_LOCK";
        /**
         * Scroll lock key
         *
         * @type {number}
         */
        Key[Key["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
        /**
         * , key
         *
         * @type {number}
         */
        Key[Key["SEMI_COLON"] = 186] = "SEMI_COLON";
        /**
         *  = key
         *
         * @type {number}
         */
        Key[Key["EQUAL_SIGN"] = 187] = "EQUAL_SIGN";
        /**
         * , key
         *
         * @type {number}
         */
        Key[Key["COMMA"] = 188] = "COMMA";
        /**
         * - key
         *
         * @type {number}
         */
        Key[Key["DASH"] = 189] = "DASH";
        /**
         * . key
         *
         * @type {number}
         */
        Key[Key["PERIOD"] = 190] = "PERIOD";
        /**
         * / key
         *
         * @type {number}
         */
        Key[Key["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
        /**
         * Grave acccent key
         *
         * @type {number}
         */
        Key[Key["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
        /**
         * [ key
         *
         * @type {number}
         */
        Key[Key["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
        /**
         * \ key
         *
         * @type {number}
         */
        Key[Key["BACK_SLASH"] = 220] = "BACK_SLASH";
        /**
         * ] key
         *
         * @type {number}
         */
        Key[Key["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
        /**
         * ' key
         *
         * @type {number}
         */
        Key[Key["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
        /**
         * Space bar key
         * @type {number}
         */
        Key[Key["SPACEBAR"] = 32] = "SPACEBAR";
    })(latte.Key || (latte.Key = {}));
    var Key = latte.Key;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 12/12/13.
 */
var latte;
(function (latte) {
    (function (TriBool) {
        TriBool[TriBool["UNKNOWN"] = 0] = "UNKNOWN";
        TriBool[TriBool["TRUE"] = 1] = "TRUE";
        TriBool[TriBool["FALSE"] = 2] = "FALSE";
    })(latte.TriBool || (latte.TriBool = {}));
    var TriBool = latte.TriBool;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Enumerates week days
     */
    (function (WeekDay) {
        /**
         * Sunday
         *
         * @type {number}
         */
        WeekDay[WeekDay["SUNDAY"] = 0] = "SUNDAY";
        /**
         * Monday
         *
         * @type {number}
         */
        WeekDay[WeekDay["MONDAY"] = 1] = "MONDAY";
        /**
         * Tuesday
         *
         * @type {number}
         */
        WeekDay[WeekDay["TUESDAY"] = 2] = "TUESDAY";
        /**
         * Wednesday
         *
         * @type {number}
         */
        WeekDay[WeekDay["WEDNESDAY"] = 3] = "WEDNESDAY";
        /**
         * Thursday
         *
         * @type {number}
         */
        WeekDay[WeekDay["THURSDAY"] = 4] = "THURSDAY";
        /**
         * Friday
         *
         * @type {number}
         */
        WeekDay[WeekDay["FRIDAY"] = 5] = "FRIDAY";
        /**
         * Saturday
         *
         * @type {number}
         */
        WeekDay[WeekDay["SATURDAY"] = 6] = "SATURDAY";
    })(latte.WeekDay || (latte.WeekDay = {}));
    var WeekDay = latte.WeekDay;
})(latte || (latte = {}));
/*
 * DataLatte Runtime
 *
 *  Includes:
 *
 *    - Simple javascript inheritance: Class & Class.extend()
 *    - Namespacing: include()
 *
 *
 */
var latte;
(function (latte) {
    /**
     * Saves data about deprecated warns
     */
    var deprecatedWarns = {};
    /**
     * Holds a list of already included plugins
     *
     * @type {Array<string>}
     */
    latte.includedPlugins = {};
    /**
     * Tells if the passed objects are equal in its properties
     *
     * @param {object} a
     * @param {object} b
     */
    function _equalObjects(a, b) {
        if (!_isObject(a) || !_isObject(b))
            throw 'No objects';
        var p;
        for (p in a) {
            if (typeof (b[p]) == 'undefined') {
                return false;
            }
        }
        for (p in a) {
            if (a[p]) {
                switch (typeof (a[p])) {
                    case 'object':
                        if (!a[p].equals(b[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (b[p]) == 'undefined' ||
                            (p != 'equals' && a[p].toString() != b[p].toString()))
                            return false;
                        break;
                    default:
                        if (a[p] != b[p]) {
                            return false;
                        }
                }
            }
            else {
                if (b[p])
                    return false;
            }
        }
        for (p in b) {
            if (typeof (a[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    }
    latte._equalObjects = _equalObjects;
    ;
    /**
     * Returns a value indicating if the parameter is a number
     *
     * @returns {boolean}
     */
    function _isNumber(param) { return typeof param == 'number'; }
    latte._isNumber = _isNumber;
    ;
    /**
     * Returns a value indicating if the parameter is a boolean
     *
     * @returns {boolean}
     */
    function _isBoolean(param) { return typeof param == 'boolean'; }
    latte._isBoolean = _isBoolean;
    ;
    /**
     * Returns a value indicating if the parameter is a string
     *
     * @returns {boolean}
     */
    function _isString(param) { return typeof param == 'string'; }
    latte._isString = _isString;
    ;
    /**
     * Returns a value indicating if the parameter is an Array
     *
     * @returns {boolean}
     */
    function _isArray(param) { return param instanceof Array; }
    latte._isArray = _isArray;
    ;
    /**
     * Returns a value indicating if the parameter is a Function
     *
     * @returns {boolean}
     */
    function _isFunction(param) { return typeof param == 'function'; }
    latte._isFunction = _isFunction;
    ;
    /**
     * Returns a value indicating if the parameter is an Object
     *
     * @returns {boolean}
     */
    function _isObject(param) { return typeof param == 'object'; }
    latte._isObject = _isObject;
    ;
    /**
     * Returns a value indicating if the parameter as string represents a numeric value
     *
     * @returns {boolean}
     */
    function _isNumeric(param) {
        var allowed = "1234567890.";
        if (!_isString(param))
            param = String(param);
        if (param.length == 0) {
            return false;
        }
        else {
            for (var i = 0; i < param.length; i++)
                if (allowed.indexOf(param.charAt(i)) < 0)
                    return false;
            return true;
        }
    }
    latte._isNumeric = _isNumeric;
    ;
    /**
     * Gets or sets the latte Url. By default: /latte
     * @private
     */
    function _latteUrl(value) {
        if (_undef(value)) {
            return window['-vendor-latte-url'] || '/latte';
        }
        else {
            window['-vendor-latte-url'] = value;
        }
    }
    latte._latteUrl = _latteUrl;
    /**
     * Returns a value indicating if the specified object is empty of properties
     * @param object
     * @returns {boolean}
     * @private
     */
    function _empty(object) {
        if (!object)
            return true;
        for (let i in object) {
            return false;
        }
        return true;
    }
    latte._empty = _empty;
    /**
     * Returns a value indicating if the parameter is undefined
     *
     * @returns {boolean}
     */
    function _undef(param) { return typeof param == 'undefined'; }
    latte._undef = _undef;
    ;
    /**
     * Logs the specified data if there's a console.
     */
    function log(...any) {
        if (!_undef(console) && !_undef(console.log)) {
            if (arguments['length'] == 1) {
                console.log(arguments[0]);
            }
            else {
                console.log(sprintf.apply(this, arguments));
            }
        }
    }
    latte.log = log;
    ;
    /**
     * Merges the two objects
     * @param a
     * @param b
     * @private
     */
    function _merge(a, b) {
        for (var i in a) {
            b[i] = a[i];
        }
        return b;
    }
    latte._merge = _merge;
    /**
     * sprintf for only %s strings
     */
    function sprintf(...any) {
        var arg = 1, format = arguments[0], cur, next, result = [];
        for (var i = 0; i < format.length; i++) {
            cur = format.substr(i, 1);
            next = i == format.length - 1 ? '' : format.substr(i + 1, 1);
            if (cur == '%' && next == 's') {
                result.push(arguments[arg++]);
                i++;
            }
            else {
                result.push(cur);
            }
        }
        return result.join('');
    }
    latte.sprintf = sprintf;
    ;
    /**
     * Warns user about deprecated code.
     *
     * @param code
     * @param alternateUse
     */
    function warnDeprecated(code, alternateUse) {
        if (_undef(deprecatedWarns[code]) && console && console.warn) {
            deprecatedWarns[code] = true;
            console.warn(sprintf("latte: %s is deprecated. Please use %s instead", code, alternateUse));
        }
    }
    latte.warnDeprecated = warnDeprecated;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Generic Exception class
     *
     * Usage
     * <example>
     *  if(somethingWrong){
     *      // Throw a simple exception
     *      throw new Ex()
     *  }
     * </example>
     */
    class Ex {
        /**
         * Creates the exception object
         *
         * @param description
         */
        constructor(description = "") {
            this.description = description;
        }
        /**
         * Returns the exception as a string.
         *
         * @returns {string}
         */
        toString() {
            return this.description ? this.description : "Uncaught exception";
        }
    }
    latte.Ex = Ex;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/4/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Ajax {
        //region Static
        /**
         * Loads an URL
         * @param url
         * @param success
         * @param error
         */
        static get(url, success = null, error = null) {
            var xmlhttp;
            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if (latte._isFunction(success))
                            success(xmlhttp.responseText);
                    }
                    else {
                        if (latte._isFunction(error))
                            error(latte.sprintf("Error %s: %s", xmlhttp.status, url));
                    }
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        /**
         * Loads an URL
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        static post(url, data, success = null, error = null) {
            var req;
            var params = [];
            var query = null;
            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                req = new XMLHttpRequest();
            }
            else {
                // code for IE6, IE5
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        if (latte._isFunction(success))
                            success(req.responseText);
                    }
                    else {
                        if (latte._isFunction(error))
                            error(latte.sprintf("Error %s: %s", req.status, url));
                    }
                }
            };
            var fdata = new FormData();
            //Prepare params
            for (var i in data) {
                fdata.append(i, data[i]);
            }
            req.open("POST", url);
            try {
                req.send(fdata);
            }
            catch (e) { }
        }
    }
    latte.Ajax = Ajax;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    class Collection {
        //endregion
        /**
         *
         */
        constructor(addCallback = null, removeCallback = null, context = null) {
            //region Static
            //endregion
            //region Fields
            this.pointer = 0;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._context = null;
            /**
             * Property field
             */
            this._length = 0;
            if (addCallback) {
                this.addItem.add(addCallback, context);
            }
            if (removeCallback) {
                this.removeItem.add(removeCallback, context);
            }
            this.context = context;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds an element to the collection
         *
         * @param element
         * @param raiseEvent
         */
        add(element, raiseEvent = true) {
            this[this._length++] = element;
            if (raiseEvent) {
                this.onAddItem(element, this.length);
            }
        }
        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        addArray(elements, raiseEvent = true) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        }
        /**
         * Adds a collection of elements to the collection
         *
         * @param collection
         * @param raiseEvent
         */
        addCollection(collection, raiseEvent = true) {
            for (var i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        }
        /**
         * Clears the collection
         */
        clear() {
            while (this.length > 0) {
                this.removeAt(0);
            }
        }
        /**
         * Returns a value indicating if the specified element is contained in the collection
         * @param element
         */
        contains(element) {
            for (let i = 0; i < this.length; i++) {
                if (this[i] == element)
                    return true;
            }
            return false;
        }
        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        each(handler) {
            for (var i = 0; i < this.count; i++) {
                handler.call(this.context, this[i], i);
            }
        }
        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        indexOf(item) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        }
        /**
         * Gets the item at the specified position
         * @param index
         * @returns {*}
         */
        item(index) {
            return this[index];
        }
        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {*}
         */
        next() {
            if (this.pointer >= this.length) {
                this.pointer = 0;
                return null;
            }
            var elem = this[this.pointer];
            this.pointer++;
            return elem;
        }
        /**
         * Raises the <c>addItem</c> event
         */
        onAddItem(item, index) {
            if (this._addItem) {
                this._addItem.raise(item, index);
            }
        }
        /**
         * Raises the <c>removeItem</c> event
         */
        onRemoveItem(item, index) {
            if (this._removeItem) {
                this._removeItem.raise(item, index);
            }
        }
        /**
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        remove(item, raiseEvent = true) {
            var buffer = [];
            var index = -1;
            //region Clear this
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                delete this[i];
                if (t === item) {
                    index = i;
                }
                else {
                    buffer.push(t);
                }
            }
            //endregion
            //region Apply buffer
            for (var i = 0; i < buffer.length; i++) {
                this[i] = buffer[i];
            }
            this._length = buffer.length;
            //endregion
            if (index >= 0) {
                if (raiseEvent) {
                    this.onRemoveItem(item, index);
                }
            }
            return this;
        }
        /**
         * Removes the item ath the specified index
         * @param index
         * @param raiseEvent
         */
        removeAt(index, raiseEvent = true) {
            this.remove(this[index], raiseEvent);
        }
        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        resetPointer() {
            this.pointer = 0;
        }
        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        get addItem() {
            if (!this._addItem) {
                this._addItem = new latte.LatteEvent(this);
                this._addItem.context = this.context;
            }
            return this._addItem;
        }
        /**
         * Gets an event raised when an item is removed
         *
         * @returns {LatteEvent}
         */
        get removeItem() {
            if (!this._removeItem) {
                this._removeItem = new latte.LatteEvent(this);
                this._addItem.context = this.context;
            }
            return this._removeItem;
        }
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @returns {any}
         */
        get context() {
            return this._context;
        }
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @param {any} value
         */
        set context(value) {
            this._context = value;
        }
        /**
         * Gets the count of elements in collection
         *
         * @returns {number}
         */
        get count() {
            return this.length;
        }
        /**
         * Gets the first element of the collection
         * @returns {*}
         */
        get first() {
            return this.length > 0 ? this[0] : null;
        }
        /**
         * Gets the last element of the collection
         * @returns {*}
         */
        get last() {
            return (this.length > 0 ? this[this.length - 1] : null);
        }
        /**
         * Gets the length of the collection
         *
         * @returns {number}
         */
        get length() {
            return this._length;
        }
    }
    latte.Collection = Collection;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a color
     **/
    class Color {
        //endregion
        /**
         * Creates the color from the specified RGB and Aplha components.
         **/
        constructor(r = 0, g = 0, b = 0, a = 255) {
            //endregion
            //region Properties
            /**
             *
             **/
            this._a = 255;
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        //region Static
        /**
         * Creates a color from the hexadecimal value.
         * It may contain the <c>#</c> symbol at the beginning of the string.
         **/
        static fromHex(hexColor) {
            if (latte._isString(hexColor)) {
                if (hexColor.toLowerCase() == 'white') {
                    hexColor = '#FFF';
                }
                if (hexColor.toLowerCase() == 'black') {
                    hexColor = '#000';
                }
                if (hexColor.toLowerCase() == 'gray') {
                    hexColor = '#777';
                }
                if (hexColor.length == 0) {
                    hexColor = '#000';
                }
            }
            // Check is string
            if (!latte._isString(hexColor) || hexColor.length == 0)
                throw new latte.InvalidArgumentEx('hexColor', hexColor);
            // Remove #
            if (hexColor.charAt(0) == '#')
                hexColor = hexColor.substr(1);
            // Check length
            if (!(hexColor.length == 3 || hexColor.length == 6 || hexColor.length == 9))
                throw new latte.InvalidArgumentEx('hexColor', hexColor);
            var c = new latte.Color();
            var toDecimal = function (hex) { return parseInt(hex, 16); };
            // If three digits
            if (hexColor.length == 3) {
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(0)));
                c.g = (toDecimal(hexColor.charAt(1) + hexColor.charAt(1)));
                c.b = (toDecimal(hexColor.charAt(2) + hexColor.charAt(2)));
            }
            else {
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(1)));
                c.g = (toDecimal(hexColor.charAt(2) + hexColor.charAt(3)));
                c.b = (toDecimal(hexColor.charAt(4) + hexColor.charAt(5)));
                if (hexColor.length == 9)
                    c.a = (toDecimal(hexColor.charAt(6) + hexColor.charAt(7)));
            }
            return c;
        }
        /**
         * Gets the RGB (Red, Green, Blue) components from a CMYK namespace
         * @param c
         * @param m
         * @param y
         * @param k
         * @returns number[]
         */
        static cmykToRgb(c, m, y, k) {
            return [
                255 * (1 - c) * (1 - k),
                255 * (1 - m) * (1 - k),
                255 * (1 - y) * (1 - k)
            ];
        }
        /**
         * HSV to RGB color conversion
         *
         * H runs from 0 to 360 degrees
         * S and V run from 0 to 100
         *
         * Ported from the excellent java algorithm by Eugene Vishnevsky at:
         * http://www.cs.rit.edu/~ncs/color/t_convert.html
         */
        static hsvToRgb(h, s, v) {
            var r, g, b;
            var i;
            var f, p, q, t;
            // Make sure our arguments stay in-range
            h = Math.max(0, Math.min(360, h));
            s = Math.max(0, Math.min(100, s));
            v = Math.max(0, Math.min(100, v));
            // We accept saturation and value arguments from 0 to 100 because that's
            // how Photoshop represents those values. Internally, however, the
            // saturation and value are calculated from a range of 0 to 1. We make
            // That conversion here.
            s /= 100;
            v /= 100;
            if (s == 0) {
                // Achromatic (grey)
                r = g = b = v;
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
            h /= 60; // sector 0 to 5
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                default:
                    r = v;
                    g = p;
                    b = q;
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
        /**
         * Gets the CMYK (Cyan, Magenta, Yellow and Key Black) components from a RGB namespace
         * @param red
         * @param green
         * @param blue
         * @returns {number[]}
         */
        static rgbToCmyk(red, green, blue) {
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var k = 1 - Math.max(r, g, b);
            var ck = 1 - k;
            return [
                (1 - r - k) / ck,
                (1 - g - k) / ck,
                (1 - b - k) / ck,
                k
            ];
        }
        /**
         * Gets the HSV (Hue, Saturation, Value) components from a RGB namespace
         * @param red
         * @param green
         * @param blue
         * @returns {number[]}
         */
        static rgbToHsv(red, green, blue) {
            var rr, gg, bb;
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var h = 0;
            var s = 0;
            var v = Math.max(r, g, b);
            var diff = v - Math.min(r, g, b);
            var diffc = (c) => { return (v - c) / 6 / diff + 1 / 2; };
            if (diff == 0) {
                h = s = 0;
            }
            else {
                s = diff / v;
                rr = diffc(r);
                gg = diffc(g);
                bb = diffc(b);
                if (r === v) {
                    h = bb - gg;
                }
                else if (g === v) {
                    h = (1 / 3) + rr - bb;
                }
                else if (b === v) {
                    h = (2 / 3) + gg - rr;
                }
            }
            if (h < 0) {
                h += 1;
            }
            else if (h > 1) {
                h -= 1;
            }
            return [
                Math.round(h * 360),
                Math.round(s * 100),
                Math.round(v * 100)
            ];
        }
        /**
         * Gets the black color
         */
        static get black() {
            if (!this._black) {
                this._black = new Color(0, 0, 0);
            }
            return this._black;
        }
        /**
         * Gets the white color
         */
        static get white() {
            if (!this._white) {
                this._white = new Color(255, 255, 255);
            }
            return this._white;
        }
        /**
         * Gets the red color
         */
        static get red() {
            if (!this._red) {
                this._red = new Color(255, 0, 0);
            }
            return this._red;
        }
        /**
         * Gets the green color
         */
        static get green() {
            if (!this._green) {
                this._green = new Color(0, 128, 0);
            }
            return this._green;
        }
        /**
         * Gets the blue color
         */
        static get blue() {
            if (!this._blue) {
                this._blue = new Color(0, 0, 255);
            }
            return this._blue;
        }
        /**
         * Gets the transparent color
         */
        static get transparent() {
            if (!this._transparent) {
                this._transparent = new Color(0, 0, 0, 0);
            }
            return this._transparent;
        }
        //region Methods
        /**
         * Returns the color as a hex string
         **/
        toHexString() {
            var d = function (s) { if (s.length == 1)
                return '0' + s; return s; };
            if (this.a != 255) {
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16)) + d(this.a.toString(16));
            }
            else {
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16));
            }
        }
        /**
         * Returns the color as a string
         **/
        toString() {
            if (this.isTransparent) {
                return 'transparent';
            }
            else if (this.a != 255) {
                return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
            }
            else {
                return this.toHexString();
            }
        }
        /**
         * Gets r sets the Alpha component of color, from 0 to 255
         * @returns {number}
         */
        get a() {
            return this._a;
        }
        /**
         * Gets or sets the Aplha component of color, from 0 to 255.
         **/
        set a(value) {
            if (value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);
            this._a = value;
        }
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        get b() {
            return this._b;
        }
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        set b(value) {
            if (value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);
            this._b = value;
        }
        /**
         * Gets or sets the Cyan component of the CMKYK namespace
         *
         * @returns {number}
         */
        get c() {
            return (1 - (this.r / 255) - this.k) / (1 - this.k);
        }
        /**
         * Gets or sets the Cyan component of the CMKYK namespace
         *
         * @returns {number}
         */
        set c(value) {
            this.r = 255 * (1 - value) * (1 - this.k);
        }
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        get g() {
            return this._g;
        }
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        set g(value) {
            if (value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);
            this._g = value;
        }
        /**
         * Gets the K (Black Key) component of the CMKYK namespace
         *
         * @returns {number}
         */
        get k() {
            return 1 - Math.max(this.r / 255, this.g / 255, this.b / 255);
        }
        /**
         * Gets the Magenta component of the CMYK namespace
         *
         * @returns {number}
         */
        get m() {
            return (1 - (this.g / 255) - this.k) / (1 - this.k);
        }
        /**
         * Gets the Yellow component of the CMYK namespace
         *
         * @returns {number}
         */
        get y() {
            return (1 - (this.b / 255) - this.k) / (1 - this.k);
        }
        /**
         * Returns a copy of the color with the specified alpha between 0 and 255.
         *
         * @param alpha
         */
        fade(alpha) {
            return new Color(this.r, this.g, this.b, alpha);
        }
        /**
         * Returns a copy of the color with the specified alpha between 0 and 1.
         *
         * @param alpha
         */
        fadeFloat(alpha) {
            return new Color(this.r, this.g, this.b, alpha * 255);
        }
        /**
         * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        get isDark() {
            return this.perceivedLuminosity > 0.5;
        }
        /**
         * Gets a value indicating if the color is a light color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        get isLight() {
            return this.perceivedLuminosity <= 0.5;
        }
        /**
         * Gets a value indicating if the color is transparent.
         **/
        get isTransparent() {
            return this.a === 0;
        }
        /**
         * Returns the perceived luminosity (https://en.wikipedia.org/wiki/Luminous_intensity)
         *
         *
         * @returns {number}
         */
        get perceivedLuminosity() {
            // Preceived Luminosity
            var a = 1 - (this.r * 0.299 + this.g * 0.587 + this.b * 0.114) / 255;
            return a;
        }
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        get r() {
            return this._r;
        }
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        set r(value) {
            if (value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);
            this._r = value;
        }
    }
    latte.Color = Color;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 2/6/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Culture {
        //endregion
        /**
         *
         */
        constructor() {
            //endregion
            //region Fields
            /**
             * Short date format
             */
            this.shortDateFormat = 'dd/MM/yyyy';
            /**
             * Long date format
             */
            this.longDateFormat = 'dddd, d de MMMM de YYYY';
            /**
             * Amount of decimals to show in currency format
             */
            this.currencyDecimals = 2;
            /**
             * Separator of decimals for currency
             */
            this.numberDecimalsSeparator = '.';
            /**
             * Thousands separator for currency
             */
            this.numberThousandsSeparator = ',';
            /**
             * Symbol to use in currency
             */
            this.currencySymbol = '$';
            /**
             * Regular expression for validating floating point numbers
             * @type {RegExp}
             */
            this.floatValidator = /^[\d,]+([.][\d]+)?$/;
            /**
             * Regular expression for validating integer numbers
             * @type {RegExp}
             */
            this.intValidator = /^[\d,]+$/;
        }
        /**
         * Gets or sets the current culture of the system
         *
         * @returns {Culture}
         */
        static get current() {
            if (!Culture._current) {
                Culture._current = Culture.enUs;
            }
            return this._current;
        }
        /**
         * Gets or sets the current culture of the system
         *
         * @param {Culture} value
         */
        static set current(value) {
            this._current = value;
        }
        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        static get esEs() {
            if (!Culture._esEs) {
                var _zeroPad = (n) => { return n <= 9 ? '0' + n.toString() : n.toString(); };
                Culture._esEs = new Culture();
                Culture._esEs.currencyDecimals = 2;
                Culture._esEs.numberDecimalsSeparator = ',';
                Culture._esEs.numberThousandsSeparator = '.';
                Culture._esEs.currencySymbol = '$';
                Culture._esEs.shortDateFormat = 'dd/MMM/yyyy';
                Culture._esEs.longDateFormat = 'dddd, d de MMMM de yyyy';
                Culture._esEs.floatValidator = /^[\d.]+([,][\d]+)?$/;
                Culture._esEs.intValidator = /^[\d.]+$/;
                Culture._esEs.onFormatShortDate = (d) => {
                    return latte.sprintf("%s/%s/%s", _zeroPad(d.day), d.monthStringShort, d.year);
                };
                Culture._esEs.onFormatLongDate = (d) => {
                    return latte.sprintf("%s, %s de %s de %s", d.dayOfWeekString, d.day, d.monthString, d.year);
                };
            }
            return Culture._esEs;
        }
        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        static get esMx() {
            if (!Culture._esMx) {
                var _zeroPad = (n) => { return n <= 9 ? '0' + n.toString() : n.toString(); };
                Culture._esMx = new Culture();
                Culture._esMx.currencyDecimals = 2;
                Culture._esMx.numberDecimalsSeparator = '.';
                Culture._esMx.numberThousandsSeparator = ',';
                Culture._esMx.currencySymbol = '$';
                Culture._esMx.shortDateFormat = 'dd/MMM/yyyy';
                Culture._esMx.longDateFormat = 'dddd, d de MMMM de yyyy';
                Culture._esMx.onFormatShortDate = (d) => {
                    return latte.sprintf("%s/%s/%s", _zeroPad(d.day), d.monthStringShort, d.year);
                };
                Culture._esMx.onFormatLongDate = (d) => {
                    return latte.sprintf("%s, %s de %s de %s", d.dayOfWeekString, d.day, d.monthString, d.year);
                };
            }
            return Culture._esMx;
        }
        /**
         * Gets the English-USA Culture
         *
         * @returns {Culture}
         */
        static get enUs() {
            if (!Culture._enUs) {
                var _zeroPad = (n) => { return n <= 9 ? '0' + n.toString() : n.toString(); };
                Culture._enUs = new Culture();
                Culture._enUs.currencyDecimals = 2;
                Culture._enUs.numberDecimalsSeparator = '.';
                Culture._enUs.numberThousandsSeparator = ',';
                Culture._enUs.currencySymbol = '$';
                Culture._enUs.shortDateFormat = 'MMM/dd/yyyy';
                Culture._enUs.longDateFormat = 'dddd, MMMM d yyyy';
                Culture._enUs.onFormatShortDate = (d) => {
                    return latte.sprintf("%s/%s/%s", d.monthStringShort, _zeroPad(d.day), d.year);
                };
                Culture._enUs.onFormatLongDate = (d) => {
                    return latte.sprintf("%s, %s %s %s", d.dayOfWeekString, d.monthString, d.day, d.year);
                };
            }
            return Culture._enUs;
        }
        /**
         * Formats currency using the current culture
         * @param n
         * @returns {string}
         */
        static formatCurrency(n) {
            return Culture.current.onFormatCurrency(n);
        }
        /**
         * Returns the date as a short format
         * @param d
         */
        static formatShortDate(d) {
            return Culture.current.onFormatShortDate(d);
        }
        /**
         * Returns the date as a short format
         * @param d
         */
        static formatLongDate(d) {
            return Culture.current.onFormatLongDate(d);
        }
        /**
         * Formats a number using the current Culture
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        static formatNumber(n, decimals = 0, symbol = '') {
            return Culture.current.onFormatNumber(n, decimals, symbol);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns the specified number as a currency
         * @param n
         */
        onFormatCurrency(n) {
            return this.onFormatNumber(n, this.currencyDecimals, this.currencySymbol);
        }
        /**
         * Formats the specified number
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        onFormatNumber(n, decimals = 0, symbol = '') {
            var point = this.numberDecimalsSeparator; //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
            //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
            var separator = this.numberThousandsSeparator;
            var sign = (n < 0) ? '-' : '';
            //extracting the absolute value of the integer part of the number and converting to string
            var round = parseInt(Math.abs(n).toFixed(decimals)) + '';
            var length = round.length;
            var offset = ((length) > 3) ? length % 3 : 0;
            var a = sign;
            var b = symbol;
            var c = (offset ? round.substr(0, offset) + separator : '');
            var d = round.substr(offset).replace(/(\d{3})(?=\d)/g, "$1" + separator);
            //[Hack]
            var e = (decimals ? point + (Math.abs(n) - parseInt(round)).toFixed(decimals).slice(2) : '');
            return a + b + c + d + e;
        }
        /**
         * Returns the date as a long format
         * @param d
         */
        onFormatLongDate(d) {
            return "NotImplemented";
        }
        /**
         * Returns the date as a short format
         * @param d
         */
        onFormatShortDate(d) {
            return "NotImplemented";
        }
    }
    //region Static
    /**
     * Property field
     */
    Culture._current = null;
    latte.Culture = Culture;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a specific date and time
     **/
    class DateTime {
        /**
         * Creates the DateTime object
         **/
        constructor(year = 1, month = 1, day = 1, hour = 0, minute = null, second = null, millisecond = null) {
            // Calculate days
            var days = DateTime.absoluteDays(year, month, day);
            // Calculate TimeSpan
            this._span = new latte.TimeSpan(days, hour, minute, second, millisecond);
        }
        /**
         * Returns the absolute number of days on the specified day-month-year
         **/
        static absoluteDays(year, month, day) {
            var div = function (a, b) { return Math.floor(a / b); };
            var arr = DateTime.isLeapYear(year) ?
                [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] :
                [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            var num = year - 1;
            var num2 = ((((((num * 365) + div(num, 4)) - div(num, 100)) + div(num, 400)) + arr[month - 1]) + day) - 1;
            return num2;
        }
        /**
         * Returns the amount of days in the specified month of the specified year
         **/
        static daysInMonth(year, month) {
            if (DateTime.isLeapYear(year)) {
                return DateTime.monthDaysLeapYear[month];
            }
            else {
                return DateTime.monthDays[month];
            }
        }
        /**
         * Returns a DateTime object from the specifed date and time components
         **/
        static fromDateAndTime(date, time) {
            if (!(date instanceof DateTime))
                throw new latte.InvalidArgumentEx('date');
            if (!(time instanceof latte.TimeSpan))
                throw new latte.InvalidArgumentEx('time');
            return new DateTime(date.year, date.month, date.day, time.hours, time.minutes, time.seconds, time.milliseconds);
        }
        /**
         * Returns a DateTime object from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds) {
            var d = new DateTime();
            d._span = latte.TimeSpan.fromMilliseconds(milliseconds);
            return d;
        }
        /**
         * Creates a DateTime object from the specified string.
         String should be in the format <c>yyyy-mm-dd hh:mm:ss</c>
         **/
        static fromString(dateTimeString) {
            if (!latte._isString(dateTimeString))
                throw new latte.InvalidArgumentEx('dateTimeString', dateTimeString);
            if (dateTimeString.length === 0)
                return new DateTime();
            var year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0;
            var parts = dateTimeString.split(' ');
            var dateParts = parts.length > 0 ? parts[0].split('-') : [];
            var timeParts = parts.length > 1 ? parts[1].split(':') : [];
            if (dateParts.length === 3) {
                year = parseInt(dateParts[0], 10);
                month = parseInt(dateParts[1], 10);
                day = parseInt(dateParts[2], 10);
            }
            if (timeParts.length === 3) {
                hour = parseInt(timeParts[0], 10);
                minute = parseInt(timeParts[1], 10);
                second = parseInt(timeParts[2], 10);
            }
            if (year <= 0)
                year = 1;
            if (month <= 0)
                month = 1;
            if (day <= 0)
                day = 1;
            return new DateTime(year, month, day, hour, minute, second);
        }
        /**
         * Returns a value indicating if the specified year is leap year
         **/
        static isLeapYear(year) {
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                return true;
            }
            return false;
        }
        /**
         * Gets a DateTime representing the current millisecond
         **/
        static get now() {
            var d = new Date();
            return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        }
        /**
         * Gets a DateTime representing the current day without time component
         **/
        static get today() {
            var d = new Date();
            return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate());
        }
        /**
         * Gets a DateTime representing the day of tomorrow without time component
         **/
        static get tomorrow() {
            var d = new Date();
            return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(1);
        }
        /**
         * Gets a DateTime representing the day of yesterday without time component
         **/
        static get yesterday() {
            var d = new Date();
            return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(-1);
        }
        /**
         * Prepends a zero to the number if lower than 10
         **/
        _zeroPad(n) {
            return n <= 9 ? '0' + n.toString() : n.toString();
        }
        /**
         * Returns the specified element of date.
         Possible values for <c>what</c> are: <c>year</c> | <c>month</c> | <c>dayyear</c> | <c>day</c>
         **/
        fromTimeSpan(what) {
            var div = function (a, b) { return Math.floor(a / b); };
            var num2 = this._span.days;
            var num3 = div(num2, 146097);
            num2 -= num3 * 146097;
            var num4 = div(num2, 36524);
            if (num4 == 4) {
                num4 = 3;
            }
            num2 -= num4 * 36524;
            var num5 = div(num2, 1461);
            num2 -= num5 * 1461;
            var num6 = div(num2, 365);
            if (num6 == 4) {
                num6 = 3;
            }
            if (what == "year") {
                return (((((num3 * 400) + (num4 * 100)) + (num5 * 4)) + num6) + 1);
            }
            num2 -= num6 * 365;
            if (what == "dayyear") {
                return (num2 + 1);
            }
            var arr = ((num6 == 3) && ((num5 != 24) || (num4 == 3))) ?
                [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] :
                [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            var index = num2 >> 6;
            while (num2 >= arr[index]) {
                index++;
            }
            if (what == "month") {
                return index;
            }
            return ((num2 - arr[index - 1]) + 1);
        }
        /**
         * Returns the result of adding the specified timespan to this date
         **/
        add(timespan) {
            return DateTime.fromMilliseconds(this._span.millis + timespan.millis);
        }
        /**
         * Returns the result of adding the specified amount of days to this date
         **/
        addDays(days) {
            return DateTime.fromMilliseconds(this._span.millis + days * 86400000);
        }
        /**
         * Returns the result of adding the specified amount of hours to this date
         **/
        addHours(hours) {
            return DateTime.fromMilliseconds(this._span.millis + hours * 3600000);
        }
        /**
         * Returns the result of adding the specified amount of milliseconds to this date
         **/
        addMilliseconds(milliseconds) {
            return DateTime.fromMilliseconds(this._span.millis + milliseconds);
        }
        /**
         * Returns the result of adding the specified amount of minutes to this date
         **/
        addMinutes(minutes) {
            return DateTime.fromMilliseconds(this._span.millis + minutes * 60000);
        }
        /**
         * Returns the result of adding the specified amount of months to this date
         **/
        addMonths(months) {
            var year = this.year;
            var month = this.month;
            var day = this.day;
            var newMonth = month - 1 + months;
            if (newMonth < 0) {
                month = 12 + (newMonth + 1) % 12;
                year += Math.ceil((newMonth - 11) / 12);
            }
            else {
                month = newMonth % 12 + 1;
                year += Math.floor(newMonth / 12);
            }
            if (year < 1 || year > 9999) {
                throw new latte.InvalidArgumentEx('months');
            }
            else {
                var daysInMonth = DateTime.daysInMonth(year, month);
                if (day > daysInMonth)
                    day = daysInMonth;
                return new DateTime(year, month, day);
            }
        }
        /**
         * Returns the result of adding the specified amount of seconds to this date
         **/
        addSeconds(seconds) {
            return new DateTime(this._span.millis + seconds * 1000);
        }
        /**
         * Returns the result of adding the specified amount of years to this date
         **/
        addYears(years) {
            return this.addMonths(years * 12);
        }
        /**
         * Returns the result of comparing this datetime to the specified datetime
         **/
        compareTo(datetime) {
            return this._span.compareTo(datetime._span);
        }
        /**
         * Gets the comparer value of the date
         *
         * @returns {number}
         */
        get comparer() {
            return this._span.totalMilliseconds;
        }
        /**
         * Returns just the date component of this datetime
         **/
        get date() {
            return new DateTime(this.year, this.month, this.day);
        }
        /**
         * Gets a value indicating if the specified datetime is equals to this datetime
         **/
        equals(datetime) {
            return this._span.equals(datetime._span);
        }
        /**
         * Returns a value indicating if the date is contained in the range specified by the arguments
         **/
        onRange(start, end) {
            return this.compareTo(start) >= 0 && this.compareTo(end) <= 0;
        }
        /**
         * Returns the result of subtracting the specified datetime to this datetime
         **/
        subtractDate(datetime) {
            if (!(datetime instanceof DateTime))
                throw new latte.InvalidArgumentEx('datetime');
            return latte.TimeSpan.fromMilliseconds(this._span.millis - datetime._span.millis);
        }
        /**
         * Returns the result of subtracting the specified timespan to this datetime
         **/
        subtractTime(timespan) {
            if (!(timespan instanceof latte.TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return DateTime.fromMilliseconds(this._span.millis - timespan.millis);
        }
        /**
         * Returns a relative representatio of the date, like "Yesterday 10:00AM"
         **/
        toRelativeString() {
            var now = DateTime.now;
            var today = DateTime.today;
            var yesterday = DateTime.yesterday;
            var tomorrow = DateTime.tomorrow;
            var timePart = this._zeroPad(this.hour) + ':' + this._zeroPad(this.minute);
            var datePart = "";
            var d = this.date;
            var t = this.timeOfDay;
            var diff;
            if (this.date.equals(today)) {
                diff = now.timeOfDay.subtract(t);
                var hours = Math.ceil(diff.totalHours);
                var minutes = Math.ceil(diff.totalMinutes);
                if (diff.totalSeconds < 60) {
                    return strings.justNow;
                }
                else if (diff.totalMinutes == 1) {
                    return strings.oneMinuteAgo;
                }
                else if (minutes < 60) {
                    return latte.sprintf(strings.SMinutesAgo, minutes);
                }
                else if (hours == 1) {
                    return strings.oneHourAgo;
                }
                else {
                    return latte.sprintf(strings.SHoursAgo, hours);
                }
            }
            else if (d.equals(tomorrow)) {
                datePart = strings.tomorrow;
            }
            else if (d.equals(yesterday)) {
                datePart = strings.yesterday;
            }
            else if (this.compareTo(today) < 0) {
                timePart = '';
                diff = today.subtractDate(this);
                var days = Math.ceil(diff.totalDays);
                var weeks = Math.ceil(days / 7);
                var years = Math.ceil(weeks / 51);
                if (days < 7) {
                    datePart = latte.sprintf(strings.SDaysAgo, days);
                }
                else if (weeks == 1) {
                    datePart = strings.oneWeekAgo;
                }
                else if (weeks < 51) {
                    datePart = latte.sprintf(strings.SWeeksAgo, weeks);
                }
                else if (years == 1) {
                    datePart = strings.oneYearAgo;
                }
                else {
                    datePart = latte.sprintf(strings.SYearsAgo, years);
                }
            }
            else {
                return this.toString();
            }
            if (this.minute == 0 && this.hour == 0) {
                timePart = '';
            }
            return timePart ? datePart + ' ' + timePart : datePart;
        }
        /**
         * Gets the day of this datetime
         **/
        get day() {
            return this.fromTimeSpan("day");
        }
        /**
         * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
         **/
        get dayOfWeek() {
            return (this._span.days + 1) % 7;
        }
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekString() {
            var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek]];
        }
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekStringShort() {
            var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek] + 'Short'];
        }
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekStringInitial() {
            var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek] + 'Initial'];
        }
        /**
         * Gets the day of year datetime
         **/
        get dayOfYear() {
            return this.fromTimeSpan("dayyear");
        }
        /**
         * Gets the hour of the datetime
         **/
        get hour() {
            return this._span.hours;
        }
        /**
         * Gets the millisecond of the date
         **/
        get millisecond() {
            return this._span.milliseconds;
        }
        /**
         * Gets the minute of the time
         **/
        get minute() {
            return this._span.minutes;
        }
        /**
         * Gets the month of the date
         **/
        get month() {
            return this.fromTimeSpan("month");
        }
        /**
         * Gets the name of the month of the date
         **/
        get monthString() {
            return strings["january february march april may june july august september october november december".split(" ")[this.month - 1]];
        }
        /**
         * Gets the name of the month of the date
         **/
        get monthStringShort() {
            return strings["january february march april may june july august september october november december".split(" ")[(this.month - 1)] + 'Short'];
        }
        /**
         * Gets the name of the month of the date
         **/
        get monthStringInitial() {
            return strings["january february march april may june july august september october november december".split(" ")[(this.month - 1)] + 'Initial'];
        }
        /**
         * Gets the second of the date
         **/
        get second() {
            return this._span.seconds;
        }
        /**
         * Gets the time component of this datetime
         **/
        get timeOfDay() {
            return latte.TimeSpan.fromMilliseconds(this._span.millis % 86400000);
        }
        /**
         * Returns a formatted string
         **/
        toFormattedString(format = null) {
            return latte.Culture.formatShortDate(this);
        }
        /**
         * Gets the DateTime as a string
         **/
        toString(includeTime = true) {
            if (isNaN(this.year))
                return '';
            var t = this.timeOfDay;
            var r = this.year + '-' + this._zeroPad(this.month) + '-' + this._zeroPad(this.day);
            if (includeTime) {
                r += ' ' + this._zeroPad(t.hours) + ":" + this._zeroPad(t.minutes) + ':'
                    + this._zeroPad(t.seconds);
            }
            return r;
        }
        /**
         * Gets the week number of date. First week of year is 1
         **/
        get weekOfYear() {
            var oneJan = new DateTime(this.year, 1, 1);
            return Math.ceil((this.dayOfYear + oneJan.dayOfWeek) / 7);
        }
        /**
         * Gets the year of the date
         **/
        get year() {
            return this.fromTimeSpan("year");
        }
    }
    /**
     * Amount of days in months of a non-leap year
     **/
    DateTime.monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    /**
     * Amount of days in months of leap year
     **/
    DateTime.monthDaysLeapYear = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    latte.DateTime = DateTime;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class EventHandler {
        constructor(handler, context) {
            this.handler = handler;
            this.context = context;
        }
    }
    latte.EventHandler = EventHandler;
    /**
     * Manages events and event handlers
     */
    class LatteEvent {
        /**
         *
         * @param context Context where
         */
        constructor(context) {
            this.context = context;
            this.handlers = [];
        }
        /**
         * Gets the event for handler adding
         *
         * @returns {LatteEvent}
         */
        get handlerAdded() {
            if (!this._handlerAdded) {
                this._handlerAdded = new latte.LatteEvent(this);
            }
            return this._handlerAdded;
        }
        /**
         * Adds a handler to the event
         * @param handler
         */
        add(handler, context = null) {
            //            var c = context === null ? this.context : context;
            this.handlers.push(new EventHandler(handler, context));
            this.onHandlerAdded(handler);
        }
        /**
         * Raises the <c>handlerAdded</c> event
         * @param handler
         */
        onHandlerAdded(handler) {
            this.handlerAdded.raise(handler);
        }
        /**
         * Raises the actual event handlers.
         * @param parameter
         * @returns {*}
         */
        raise(...parameter) {
            var args = arguments;
            // Call each handler
            for (var i = 0; i < this.handlers.length; i++) {
                var evh = this.handlers[i];
                if (!evh.handler)
                    continue;
                var result = evh.handler.apply(evh.context || this.context, args);
                if (typeof result !== 'undefined') {
                    return result;
                }
            }
        }
    }
    latte.LatteEvent = LatteEvent;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      if(typeof a != 'number')
     *          // Inform user that the parameter was invalid
     *          throw new InvalidArgumentEx('a');
     *
     *      return a * a;
     *
     * }
     *
     * </example>
     */
    class InvalidArgumentEx extends latte.Ex {
        /**
         * Creates the exception
         *
         * @param argument
         * @param value
         */
        constructor(argument = "", value = "") {
            super();
            this.argument = argument;
            this.value = value;
        }
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString() {
            return "Invalid argument: " +
                (this.argument ? this.argument : '<no argument specified>') +
                (!this.value ? " ( " + this.value + ")" : '');
        }
    }
    latte.InvalidArgumentEx = InvalidArgumentEx;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      throw new latte.InvalidCallEx('pow')
     *
     * }
     *
     * </example>
     */
    class InvalidCallEx extends latte.Ex {
        /**
         * Creates the Exception
         * @param method
         */
        constructor(method = null) {
            super();
            this.method = method;
        }
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString() {
            return "Invalid call: " +
                (this.method ? this.method : '<no method specified>');
        }
    }
    latte.InvalidCallEx = InvalidCallEx;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Point {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates a new point, optionally
         */
        constructor(x = null, y = null) {
            /**
             * Property field
             */
            this._x = null;
            /**
             * Property field
             */
            this._y = null;
            if (x !== null) {
                this._x = x;
            }
            if (y !== null) {
                this._y = y;
            }
        }
        //region Static
        /**
         * Gets the distance between two points
         * @param a
         * @param b
         */
        static distance(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }
        /**
         * Returns an empty point
         * @returns {latte.Point}
         */
        static empty() {
            return new Point(null, null);
        }
        /**
         * Returns a point situated on the origin
         * @returns {latte.Point}
         */
        static origin() {
            return new Point(0, 0);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns the offset operation of the point
         *
         * @param x
         * @param y
         * @returns {latte.Point}
         */
        offset(x, y) {
            return new Point(this.x + x, this.y + y);
        }
        /**
         * Gets string representation of the point
         * @returns {string}
         */
        toString() {
            return latte.sprintf("Point(%s, %s)", this._x, this._y);
        }
        //endregion
        //region Events
        //endregion
        //region Properties
        /**
         * Gets a value indicating if the point is empty (No value has been set)
         *
         * @returns {boolean}
         */
        get isEmpty() {
            return this._x == null || this._y == null;
        }
        /**
         * Gets or sets the X of the point
         *
         * @returns {number}
         */
        get x() {
            return this._x || 0;
        }
        /**
         * Gets the Y coordinate of the point
         *
         * @returns {number}
         */
        get y() {
            return this._y || 0;
        }
    }
    latte.Point = Point;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Reprsents a Rectangle
     **/
    class Rectangle {
        /**
         * Creates a rectangle with the specified left, top, width and height.
         **/
        constructor(left = 0, top = 0, width = 0, height = 0) {
            this.top = top;
            this.left = left;
            this.width = width;
            this.height = height;
        }
        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        static fromLRTB(left, right, top, bottom) {
            var r = new Rectangle(left, top);
            r.right = right;
            r.bottom = bottom;
            return r;
        }
        /**
         * Returns a rectangle of positive width and height, by changing its coordinates and preserving width and height
         */
        absolute() {
            let width = Math.abs(this.width);
            let height = Math.abs(this.height);
            let left = this.width < 0 ? this.right : this.left;
            let top = this.height < 0 ? this.bottom : this.top;
            return new Rectangle(left, top, width, height);
        }
        /**
         * Returns the result of centering this into the specified container
         **/
        center(container) {
            var c = new Rectangle(container.left + (container.width - this.width) / 2, container.top + (container.height - this.height) / 2, this.width, this.height);
            return c;
        }
        /**
         * Gets a value indicating if the specified point is contained
         **/
        contains(x, y) {
            return this._left <= x && this.right >= x
                && this._top <= y && this.bottom >= y;
        }
        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        containsRectangle(rectangle) {
            return this.contains(rectangle.left, rectangle.top)
                && this.contains(rectangle.right, rectangle.bottom);
        }
        /**
         * Compares this rectangle with the specified rectangle and returns the result
         * @param r
         * @returns {boolean}
         */
        equals(r) {
            if (!r)
                return false;
            return this.left == r.left && this.top == this.top && this.width == r.width && this.height == r.height;
        }
        /**
         * Returns the result of inflating the rectangle vertically and horizontally on each edge.
         **/
        inflate(horizontal, vertical) {
            // Check arguments
            if (!latte._isNumber(horizontal))
                throw new latte.InvalidArgumentEx('horizontal', horizontal);
            if (!latte._isNumber(vertical))
                throw new latte.InvalidArgumentEx('vertical', vertical);
            return Rectangle.fromLRTB(this.left - horizontal, this.right + horizontal, this.top - vertical, this.bottom + vertical);
        }
        /**
         * Returns the rectangle result of intersecting this with passed rectangle
         **/
        intersection(rectangle) {
            return Rectangle.fromLRTB(Math.max(this.left, rectangle.left), Math.min(this.right, rectangle.right), Math.max(this.top, rectangle.top), Math.min(this.bottom, rectangle.bottom));
        }
        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        intersects(rectangle) {
            return this.contains(rectangle.left, rectangle.top)
                || this.contains(rectangle.right, rectangle.top)
                || this.contains(rectangle.right, rectangle.bottom)
                || this.contains(rectangle.left, rectangle.bottom);
        }
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToHeight(height) {
            return new Rectangle(this.left, this.top, height * this.width / this.height, height);
        }
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToWidth(width) {
            return new Rectangle(this.left, this.top, width, width * this.height / this.width);
        }
        /**
         * Returns a string describing the rectangle
         **/
        toString() {
            return "Rectangle: " + [this._left, this._top, this._width, this._height].join(', ');
        }
        /**
         * Gets a rectangle representing the union of this rectangle and the passed one
         **/
        union(rectangle) {
            return Rectangle.fromLRTB(Math.min(this.left, rectangle.left), Math.max(this.right, rectangle.right), Math.min(this.top, rectangle.top), Math.max(this.bottom, rectangle.bottom));
        }
        /**
         * Gets or sets the right side of the rectangle
         **/
        get bottom() {
            return this._top + this._height;
        }
        /**
         * Gets or sets the right side of the rectangle
         **/
        set bottom(value) {
            this._height = value - this._top;
        }
        /**
         * Gets or sets the height of the rectangle
         **/
        get height() {
            return this._height;
        }
        /**
         * Gets or sets the height of the rectangle
         **/
        set height(value) {
            this._height = value;
        }
        /**
         * Gets or sets the left of the rectangle
         **/
        get left() {
            return this._left;
        }
        /**
         * Gets or sets the left of the rectangle
         **/
        set left(value) {
            this._left = value;
        }
        /**
         * Gets or sets the right side of the rectangle
         **/
        get right() {
            return this._left + this._width;
        }
        /**
         * Gets or sets the right side of the rectangle
         **/
        set right(value) {
            this._width = value - this._left;
        }
        /**
         * Gets the size of the rectangle
         *
         * @returns {Size}
         */
        get size() {
            return new latte.Size(this.width, this.height);
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        /**
         * Gets or sets the top of the rectangle
         **/
        get top() {
            return this._top;
        }
        /**
         * Gets or sets the top of the rectangle
         **/
        set top(value) {
            this._top = value;
        }
        /**
         * Gets or sets the width of the rectangle
         **/
        get width() {
            return this._width;
        }
        /**
         * Gets or sets the width of the rectangle
         **/
        set width(value) {
            this._width = value;
        }
    }
    latte.Rectangle = Rectangle;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Size {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates a new Size, optionally sets its Width and Height components
         */
        constructor(width = null, height = null) {
            /**
             * Property field
             */
            this._height = null;
            /**
             * Property field
             */
            this._width = null;
            if (width !== null) {
                this._width = width;
            }
            if (height !== null) {
                this._height = height;
            }
        }
        //region Static
        /**
         * Returns an empty size
         * @returns {latte.Size}
         */
        static empty() {
            return new Size(null, null);
        }
        /**
         * Returns a size of zero width and zero height
         * @returns {latte.Point}
         */
        static zero() {
            return new Size(0, 0);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets a value indicating if the size contains the specified size.
         * @param size
         */
        contains(size) {
            return this.width >= size.width && this.height >= size.height;
        }
        /**
         * Inflates the size on the specified width and height
         *
         * @param width
         * @param height
         * @returns {latte.Size}
         */
        inflate(width, height) {
            return new Size(this.width + width, this.height + height);
        }
        /**
         * Inflates the size uniformly
         * @param wide
         */
        inflateUniform(wide) {
            return new Size(this.width + wide, this.height + wide);
        }
        /**
         * Gets a scaled Size that fits in the specified target.
         * @param target
         */
        scaleToFit(target) {
            let dh = target.width * this.height / this.width;
            if (dh > target.height) {
                return new Size(target.height * this.width / this.height, target.height);
            }
            return new Size(target.width, dh);
        }
        /**
         * Gets a scaled Size that fills the specified target.
         * @param target
         */
        scaleToFill(target) {
            let dh = target.width * this.height / this.width;
            if (dh <= target.height) {
                return new Size(target.height * this.width / this.height, target.height);
            }
            return new Size(target.width, dh);
        }
        /**
         * Gets string representation of the size
         * @returns {string}
         */
        toString() {
            return latte.sprintf("Size(%s, %s)", this._width, this._height);
        }
        //endregion
        //region Events
        //endregion
        //region Properties
        /**
         * Gets the area represented by the size
         *
         * @returns {number}
         */
        get area() {
            return this.width * this.height;
        }
        /**
         * Gets a value indicating if the size has no compnents assigned or initialized
         *
         * @returns {boolean}
         */
        get isEmpty() {
            return this._height == null && this._width == null;
        }
        /**
         * Gets a value indicating if the size is horizontal
         *
         * @returns {boolean}
         */
        get isHorizontal() {
            return this.width > this.height;
        }
        /**
         * Gets a value indicating if the size is a square
         *
         * @returns {boolean}
         */
        get isSquare() {
            return this.width == this.height;
        }
        /**
         * Gets a value indicating if the size is vertical
         *
         * @returns {boolean}
         */
        get isVertical() {
            return this.height > this.width;
        }
        /**
         * Gets the Height component of the size
         *
         * @returns {number}
         */
        get height() {
            return this._height;
        }
        /**
         * Gets the Width component of the size
         *
         * @returns {number}
         */
        get width() {
            return this._width;
        }
    }
    latte.Size = Size;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a time interval.
     **/
    class TimeSpan {
        /**
         * Creates the TimeSpan with the specified parameters. Parameters not specified will be asumed to be zero.
         **/
        constructor(days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
            this.millis = 0;
            this.millis = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
        }
        /**
         * Creates a TimeSpan from the specified amount of days
         **/
        static fromDays(days) {
            return new TimeSpan(days);
        }
        /**
         * Creates a TimeSpan from the specified amount of hours
         **/
        static fromHours(hours) {
            return new TimeSpan(0, hours);
        }
        /**
         * Creates a TimeSpan from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds) {
            var t = new TimeSpan();
            t.millis = milliseconds;
            return t;
        }
        /**
         * Creates a TimeSpan from the specified amount of minutes
         **/
        static fromMinutes(minutes) {
            return new TimeSpan(0, 0, minutes);
        }
        /**
         * Creates a TimeSpan from the specified amount of seconds
         **/
        static fromSeconds(seconds) {
            return new TimeSpan(0, 0, 0, seconds);
        }
        /**
         * Creates a TimeSpan object from the specified string.
         String should be in the format <c>hh:mm:ss</c>
         **/
        static fromString(timeString) {
            var parts = timeString.split(':');
            var hours = parts.length > 0 && latte._isNumeric(parts[0]) ? parseInt(parts[0], 10) : 0;
            var minutes = parts.length > 1 && latte._isNumeric(parts[1]) ? parseInt(parts[1], 10) : 0;
            var seconds = parts.length > 2 && latte._isNumeric(parts[2]) ? parseInt(parts[2], 10) : 0;
            return new TimeSpan(0, hours, minutes, seconds);
        }
        /**
         * Gets a timespan with the time passed since the specified date and time
         * @param d
         */
        static timeSince(d) {
            return latte.DateTime.now.subtractDate(d);
        }
        /**
         * Makes math rounding depending on the sign of the milliseconds
         **/
        _rounder(number) {
            if (this.millis < 0)
                return Math.ceil(number);
            return Math.floor(number);
        }
        /**
         * Prepends a zero to the number if lower than 10
         **/
        _zeroPad(n) {
            return n <= 9 ? '0' + n.toString() : n.toString();
        }
        /**
         * Returns the result of adding the specified timespan to this timespan
         **/
        add(timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return TimeSpan.fromMilliseconds(this.millis + timespan.millis);
        }
        /**
         * Returns the result of adding the specified amount of hours to this timespan
         **/
        addHours(hours) {
            return this.add(new TimeSpan(0, hours));
        }
        /**
         * Returns the result of adding the specified amount of minutes to this timespan
         **/
        addMinutes(minutes) {
            return this.add(new TimeSpan(0, 0, minutes));
        }
        /**
         * Returns the result of adding the specified amount of seconds to this timespan
         **/
        addSeconds(seconds) {
            return this.add(new TimeSpan(0, 0, 0, seconds));
        }
        /**
         * Returns the result of comparing this timespan against the provided timespan
         **/
        compareTo(timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            if (this.millis > timespan.millis)
                return 1;
            if (this.millis == timespan.millis)
                return 0;
            if (this.millis < timespan.millis)
                return -1;
            throw new latte.Ex();
        }
        /**
         * Returns a timespan representing the actual duration of the timespan
         **/
        duration() {
            return new TimeSpan(Math.abs(this.millis));
        }
        /**
         * Returns a value indicating if this timespan represents the same than the specified timespan
         **/
        equals(timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return this.millis == timespan.millis;
        }
        /**
         * Negates the timespan duration
         **/
        negate() {
            this.millis *= -1;
        }
        /**
         * Returns the result of subtracting the specified timespan to this timespan
         **/
        subtract(timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return TimeSpan.fromMilliseconds(this.millis - timespan.millis);
        }
        /**
         * Returns this timespan as a string
         **/
        toString(includeMilliseconds = false) {
            return (this.millis < 0 ? '-' : '') +
                (this.days ? this.days + ' ' : '') +
                this._zeroPad(this.hours) + ":" +
                this._zeroPad(this.minutes) +
                (this.seconds ? ':' + this._zeroPad(this.seconds) : '') +
                (includeMilliseconds ? '.' + Math.abs(this.milliseconds) : '');
        }
        /**
         * Returns the timespan as a shor string, e.g. 5 minutes or 5m
         * @param shortNames
         */
        toShortString(shortNames = false) {
            var suf = shortNames ? 'Short' : '';
            if (this.totalSeconds < 1) {
                return latte.sprintf(strings['Smillis' + suf], this.totalMilliseconds);
            }
            else if (this.totalMinutes < 1) {
                var seconds = Math.round(this.totalSeconds);
                return latte.sprintf(strings[(seconds == 1 ? 'oneSecond' : 'Sseconds') + suf], seconds);
            }
            else if (this.totalHours < 1) {
                var minutes = Math.round(this.totalMinutes);
                return latte.sprintf(strings[(minutes == 1 ? 'oneMinute' : 'Sminutes') + suf], minutes);
            }
            else {
                var hours = Math.round(this.totalHours);
                return latte.sprintf(strings[(hours == 1 ? 'oneHour' : 'Shours') + suf], latte.Culture.formatNumber(hours));
            }
        }
        /**
         * Gets the days component of the time interval represented by this object
         **/
        get days() {
            return this._rounder(this.millis / 86400000);
        }
        /**
         * Gets the hours component of the time interval represented by this object
         **/
        get hours() {
            return this._rounder((this.millis % (24 * 3600 * 1000)) / (3600 * 1000));
        }
        /**
         * Gets a value indicating if the total time this timespan represents is zero
         **/
        get isEmpty() {
            return this.millis == 0;
        }
        /**
         * Gets the milliseconds component of the time interval represented by this object
         **/
        get milliseconds() {
            return this._rounder(this.millis % 1000);
        }
        /**
         * Gets the minutes component of the time interval represented by this object
         **/
        get minutes() {
            return this._rounder((this.millis % (3600 * 1000)) / (60 * 1000));
        }
        /**
         * Gets the seconds component of the time interval represented by this object
         **/
        get seconds() {
            return this._rounder((this.millis % 60000) / 1000);
        }
        /**
         * Gets the value of this timespan expressed in whole and fractional days
         **/
        get totalDays() {
            //                     86400000
            return this.millis / (86400000);
        }
        /**
         * Gets the value of this timespan expressed in whole and fractional hours
         **/
        get totalHours() {
            return this.millis / (3600000);
        }
        /**
         * Gets the value of this timespan expressed in milliseconds
         **/
        get totalMilliseconds() {
            return this.millis;
        }
        /**
         * Gets the value of this timespan expressed in whole and fractional minutes
         **/
        get totalMinutes() {
            return this.millis / (60 * 1000);
        }
        /**
         * Gets the value of this timespan expressed in whole and fractional seconds
         **/
        get totalSeconds() {
            return this.millis / 1000;
        }
    }
    latte.TimeSpan = TimeSpan;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/26/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class LoadInfo {
        //endregion
        //region Fields
        //endregion
        /**
         * @private
         */
        constructor() {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._loadingText = null;
        }
        /**
         * Gets the load mechanism singleton.
         *
         * @returns {LoadMechanism}
         */
        static get instance() {
            if (!this._instance) {
                this._instance = new LoadInfo();
            }
            return this._instance;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Ends a loading process
         */
        end() {
            this.onLoadingEnd();
        }
        /**
         * Raises the <c>loadingStart</c> event
         */
        onLoadingStart() {
            if (this._loadingStart) {
                this._loadingStart.raise();
            }
            else {
            }
        }
        /**
         * Raises the <c>loadingEnd</c> event
         */
        onLoadingEnd() {
            if (this._loadingEnd) {
                this._loadingEnd.raise();
            }
            else {
            }
        }
        /**
         * Raises the <c>loadingText</c> event
         */
        onLoadingTextChanged() {
            if (this._loadingTextChanged) {
                this._loadingTextChanged.raise();
            }
        }
        /**
         * Starts a loading process
         * @param text
         */
        start(text) {
            this.loadingText = text;
            this.onLoadingStart();
        }
        /**
         * Gets an event raised when the loading starts
         *
         * @returns {LatteEvent}
         */
        get loadingStart() {
            if (!this._loadingStart) {
                this._loadingStart = new latte.LatteEvent(this);
            }
            return this._loadingStart;
        }
        /**
         * Gets an event raised when the loading ends
         *
         * @returns {LatteEvent}
         */
        get loadingEnd() {
            if (!this._loadingEnd) {
                this._loadingEnd = new latte.LatteEvent(this);
            }
            return this._loadingEnd;
        }
        /**
         * Gets an event raised when the value of the loadingText property changes
         *
         * @returns {LatteEvent}
         */
        get loadingTextChanged() {
            if (!this._loadingTextChanged) {
                this._loadingTextChanged = new latte.LatteEvent(this);
            }
            return this._loadingTextChanged;
        }
        /**
         * Gets or sets the text of the load information
         *
         * @returns {string}
         */
        get loadingText() {
            return this._loadingText;
        }
        /**
         * Gets or sets the text of the load information
         *
         * @param {string} value
         */
        set loadingText(value) {
            // Check if value changed
            var changed = value !== this._loadingText;
            // Set value
            this._loadingText = value;
            // Trigger changed event
            if (changed) {
                this.onLoadingTextChanged();
            }
        }
    }
    latte.LoadInfo = LoadInfo;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Executes an action every specified amount of milliseconds
     **/
    class Timer {
        /**
         * Creates a timer that will call <c>callback</c> every specified amount of
         <c>milliseconds</c> on the specified <c>context</c>.
         **/
        constructor(callback, milliseconds, context) {
            this.callback = callback;
            this.milliseconds = milliseconds;
            this.context = context;
        }
        /**
         * Gets or sets the function who will be called every tick
         **/
        get callback() {
            return this._callback;
        }
        /**
         * Gets or sets the function who will be called every tick
         **/
        set callback(value) {
            this._callback = value;
        }
        /**
         * Gets or sets the context in which the function is executed
         **/
        get context() {
            return this._context;
        }
        /**
         * Gets or sets the context in which the function is executed
         **/
        set context(value) {
            this._context = value;
        }
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        get milliseconds() {
            return this._milliseconds;
        }
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        set milliseconds(value) {
            this._milliseconds = value;
        }
        /**
         * Pauses the timer
         **/
        pause() {
            this._paused = true;
        }
        /**
         * Starts ticking
         **/
        start() {
            if (this._paused === false)
                return;
            this._paused = false;
            setTimeout(() => { this.tick(); }, this.milliseconds);
        }
        /**
         * Ticks the timer. Executes the callback and programs next tick.
         **/
        tick() {
            // If paused, bye bye!
            if (this._paused === true)
                return;
            // Call callback
            this.callback.apply(this.context);
            // Program next tick
            setTimeout(() => { this.tick(); }, this.milliseconds);
        }
    }
    latte.Timer = Timer;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class HEvent {
    }
    latte.HEvent = HEvent;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/ICall.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/IInput.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/ISave.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/IMessage.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/ISaveContainer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Key.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/TriBool.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/WeekDay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/latte.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Ex.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Ajax.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Collection.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Color.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Culture.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/DateTime.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Event.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/InvaldArgumentEx.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/InvalidCallEx.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Point.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Rectangle.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Size.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/TimeSpan.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/LoadInfo.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/Timer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte/ts/TypeEvent.ts" /> 
