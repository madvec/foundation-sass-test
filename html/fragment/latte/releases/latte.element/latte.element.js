/**
 * Created by josemanuel on 3/25/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Element {
        //endregion
        /**
         * Creates an element
         */
        constructor(element) {
            //endregion
            //region Fields
            this.dataElements = [];
            /**
             * Property field
             */
            this._contentEditable = false;
            /**
             * Property field
             */
            this._isAnimated = false;
            /**
             * Property field
             */
            this._tag = null;
            /**
             * Property field
             */
            this._visible = true;
            if (!(element instanceof HTMLElement))
                throw "Element Required";
            this._element = element;
            this._element['latte-element-instance'] = this;
        }
        //region Static
        /**
         * Creates a new element in memory from the specified tag name
         * @param tagName
         * @returns {latte.Element<HTMLElement>}
         */
        static create(tagName = 'div') {
            var parts = tagName.split('.');
            var tagName = parts[0];
            var element = new Element(document.createElement(tagName));
            for (var i = 1; i < parts.length; i++) {
                element.addClass(parts[i]);
            }
            return element;
        }
        /**
         * Creates an element from the latte.globalViewBank object.
         *
         * @param key
         * @returns {latte.Element<HTMLElement>}
         */
        static fromBank(key) {
            if (!latte._undef(latte['globalViewsBank']) && !latte._undef(latte['globalViewsBank'][key])) {
                // Bring from bank into a wrap
                var wrap = document.createElement('div');
                wrap.innerHTML = latte['globalViewsBank'][key];
                // Obtain generated element
                var e = wrap.children[0];
                return e;
            }
            throw latte.sprintf("View %s not found in bank.", key);
        }
        /**
         * Searches for the specified path, clones it and returns its html element
         * @param path
         */
        static outlet(path) {
            var element = document.querySelector(path);
            return element.cloneNode(true);
        }
        /**
         * Gets the height of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentHeight(d) {
            var doc = d.documentElement;
            return Math.max(d.body.scrollWidth, doc.scrollWidth, d.body.offsetWidth, doc.offsetWidth, doc.clientWidth);
        }
        /**
         * Gets the width of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentWidth(d) {
            var doc = d.documentElement;
            return Math.max(d.body.scrollHeight, doc.scrollHeight, d.body.offsetHeight, doc.offsetHeight, doc.clientHeight);
        }
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportWidth(d) {
            return d.documentElement.clientWidth;
        }
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportHeight(d) {
            return d.documentElement.clientHeight;
        }
        /**
         * Converts the value in css format to a number
         *
         * @param property
         * @returns {number}
         */
        getCssNumericValue(property) {
            return parseFloat(this.style[property] || '0');
        }
        /**
         * Converts the value to a value + px, depending on the property
         *
         * @param property
         * @param value
         */
        setCssNumericValue(property, value) {
            if (property == 'opacity') {
                this.style[property] = String(value);
            }
            else {
                this.style[property] = value + 'px';
            }
        }
        /**
         * Gets the body element
         *
         * @returns {Element<HTMLBodyElement>}
         */
        static get body() {
            if (!Element._body && document.body) {
                Element._body = new Element(document.body);
            }
            return Element._body;
        }
        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static get windowScrollLeft() {
            return window.pageXOffset;
        }
        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static get windowScrollTop() {
            return window.pageYOffset;
        }
        //region Private Methods
        addBindedElement(e, ebind, dbind) {
            for (let i = 0; i < this.bindedElements.length; i++) {
                if (this.bindedElements[i] === e) {
                    return;
                }
            }
            if (ebind) {
                this.onEventBindAdded(ebind);
            }
            if (dbind) {
                this.onDataBindAdded(dbind);
            }
            this.bindedElements.push(e);
        }
        //endregion
        //region Methods
        /**
         * Adds an element
         * @param element
         */
        add(element) {
            this.element.appendChild(element.element);
            return element;
        }
        /**
         * Adds an array of elements to this element
         * @param elements
         */
        addArray(elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
            return elements;
        }
        /**
         * Adds the specified collection of elements
         *
         * @param elements
         */
        addCollection(elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
            return elements;
        }
        /**
         * Adds the specified class to the class list
         * @param className
         */
        addClass(className) {
            if (className.indexOf(' ') >= 0)
                throw "Only one class can be added.";
            this.element.classList.add(className);
        }
        /**
         * Adds an event listener
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event, handler, capture = false) {
            this.element.addEventListener(event, handler, capture);
        }
        /**
         * Animates the element specified properties, by establishing the initial values for the properties to animate.
         *
         * @param startProperties
         * @param endProperties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animateFrom(startProperties, endProperties, duration = 0.1, callback = null) {
            var animations = [];
            var setValue = (p, value) => {
                if (latte._undef(this[p])) {
                    this.setCssNumericValue(p, value);
                }
                else {
                    this[p] = value;
                }
            };
            for (var p in startProperties) {
                var a = new latte.Animation(startProperties[p], endProperties[p], duration, null);
                a.tag = p;
                animations.push(a);
            }
            if (animations.length > 0) {
                var leader = animations[0];
                // Handle update
                leader.update.add(() => {
                    // Update all values
                    for (var i = 0; i < animations.length; i++) {
                        var a = animations[i];
                        setValue(a.tag, leader.running ? a.currentValue : a.endValue);
                    }
                });
                // Handle end of animations
                leader.ended.add(() => {
                    this._isAnimated = false;
                });
                // Handle end
                if (callback) {
                    leader.ended.add(callback);
                }
                this._isAnimated = true;
                leader.start();
                for (var i = 1; i < animations.length; i++)
                    animations[i].startTime = latte.DateTime.now;
            }
        }
        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animate(properties, duration = 0.1, callback = null) {
            var starts = {};
            var getValue = (p) => {
                if (latte._undef(this[p])) {
                    return this.getCssNumericValue(p);
                }
                else {
                    return this[p];
                }
            };
            for (var p in properties) {
                starts[p] = getValue(p);
            }
            this.animateFrom(starts, properties, duration, callback);
        }
        /**
         * Appends the element to the specified container
         * @param parent
         */
        appendTo(parent) {
            parent.appendChild(this.element);
        }
        /**
         * Creates an automatic handler
         *
         * @param container
         * @param elementName
         * @param eventName
         */
        autohandler(container, elementName, eventName) {
            var elem = this;
            this.addEventListener(eventName, function () {
                var methodname = (elementName + "_" + eventName).toLowerCase();
                var found = false;
                for (var i in container) {
                    if (String(i).toLowerCase() == methodname) {
                        found = true;
                        container[i].call(container, arguments);
                    }
                }
                if (!found) {
                    latte.log(latte.sprintf("%s method missing from declaration", methodname));
                }
            });
        }
        /**
         * Binds the element to the specified object
         * @param object
         * @param hide
         */
        bind(object, hide = false) {
            let list = this.element.querySelectorAll('[data-bind]');
            for (let i = 0; i < list.length; i++) {
                ((node) => {
                    if (node.nodeType != 1)
                        return;
                    let e = new Element(node);
                    let prop = e.element.getAttribute('data-bind');
                    let dataBinds = prop.split(";");
                    for (let j = 0; j < dataBinds.length; j++) {
                        let parts = dataBinds[j].split(":");
                        let elementProperty = parts.length == 2 ? parts[0] : 'text';
                        let recordProperty = parts.length == 2 ? parts[1] : parts[0];
                        let bind = new latte.DataBind(e, elementProperty, object, recordProperty, latte.DataBindType.AUTO, null, 'input', latte.sprintf('%sChanged', prop));
                        if (!hide) {
                            this.dataBinds.push(bind);
                        }
                        this.addBindedElement(e, null, bind);
                    }
                    //// TODO: Criteria for elementProperty, elementEvent, type, DataAdapter
                    //var bind = new DataBind(e, 'text', object, prop, DataBindType.AUTO, null, 'input', sprintf('%sChanged', prop));
                    //
                    //if(!hide){
                    //    this.dataBinds.push(bind);
                    //}
                    //
                    //this.addBindedElement(e);
                })(list[i]);
            }
            let elist = this.element.querySelectorAll('[data-event]');
            for (let i = 0; i < elist.length; i++) {
                ((node) => {
                    let e = new Element(node);
                    let prop = e.element.getAttribute('data-event');
                    let binds = prop.split(';');
                    for (let j = 0; j < binds.length; j++) {
                        let parts = binds[j].split(':');
                        if (parts.length == 2) {
                            let bind = new latte.EventBind(e, parts[0].trim(), object, parts[1].trim());
                            e.eventBinds.push(bind);
                            this.addBindedElement(e, bind, null);
                        }
                        else {
                            latte.log("[data-event] Bad Syntax: " + binds[j]);
                        }
                    }
                })(elist[i]);
            }
        }
        /**
         * Makes the element blink
         *
         * @param callback
         */
        blink(callback = null) {
            var visible = true;
            var total = 6;
            var current = 0;
            var time = 0.1; //1000;
            //var me = this.$ element;
            //me.stop();
            if (!this.visible) {
                this.visible = true;
            }
            var show = (callback) => {
                this.animate({ opacity: 1 }, time, () => { visible = true; callback(); });
                //me.animate({
                //    opacity: 1
                //}, time, 'swing', () => { visible = true; callback(); })
            };
            var hide = (callback) => {
                this.animate({ opacity: 0 }, time, () => { visible = false; callback(); });
                //me.animate({
                //    opacity: 0
                //}, time, 'swing', () => { visible = false; callback(); })
            };
            var go = function () {
                if (++current == total) {
                    show(() => { });
                    if (latte._isFunction(callback)) {
                        callback();
                    }
                    return;
                }
                if (visible) {
                    hide(go);
                }
                else {
                    show(go);
                }
            };
            go();
        }
        /**
         * Clears all the children of the element
         */
        clear() {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        /**
         * Called when the data of the element has loaded successfully
         */
        dataDidLoad() {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataDidLoad();
            }
        }
        /**
         * Called when the data load failed
         */
        dataLoadFailed(errorDescription) {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataLoadFailed(errorDescription);
            }
        }
        /**
         * Called when data load is about to start
         */
        dataWillLoad() {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataWillLoad();
            }
        }
        /**
         * Called when the element has been assigned as only child of another element, using the setContent method
         */
        didLoad() {
        }
        /**
         * If conditional is true, ensures element has class, if not, ensures it doesn't
         * @param className
         * @param condition
         */
        ensureClass(className, condition) {
            if (condition) {
                this.addClass(className);
            }
            else {
                this.removeClass(className);
            }
        }
        /**
         * Fades the element in
         * @param duration
         * @param callback
         */
        fadeIn(duration = 0.1, callback = null) {
            this.style.opacity = '0';
            this.style.display = null;
            this.animate({ opacity: 1 }, duration, () => {
                this.visible = true;
                if (latte._isFunction(callback))
                    callback();
            });
        }
        /**
         * Fades the element out
         * @param duration
         * @param callback
         */
        fadeOut(duration = 0.1, callback = null) {
            this.style.opacity = '1';
            this.style.display = null;
            this.animate({ opacity: 0 }, duration, () => {
                this.visible = false;
                if (latte._isFunction(callback))
                    callback();
            });
            //$(this.element).animate({ opacity: 0}, duration, 'swing', () => {
            //
            //    this.visible = false;
            //
            //    if('function' == typeof callback)
            //    callback();
            //});
        }
        /**
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        find(query) {
            return new Element(this.querySelector(query));
        }
        /**
         * Returns the collection of matched nodes who are instances of latte.Element
         * @param query
         * @returns {latte.ElementCollection}
         */
        findAll(query) {
            return latte.ElementCollection.fromNodeList(this.querySelectorAll(query));
        }
        /**
         * Gets the children of the element as an ElementCollection
         */
        getCollection() {
            return latte.ElementCollection.fromNodeList(this.element.childNodes);
        }
        /**
         * Gets the size of the element
         */
        getSize() {
            var s = {
                width: this.element.offsetWidth,
                height: this.element.offsetHeight
            };
            if (!this.visible) {
                var buffDisplay = this.style.display;
                var buffPosition = this.style.position;
                var buffVisibility = this.style.visibility;
                // Prepare for measuring
                this.style.display = 'block';
                this.style.position = 'absolute';
                this.style.visibility = 'hidden';
                s.width = this.element.offsetWidth;
                s.height = this.element.offsetHeight;
                // Restore properties
                this.style.display = buffDisplay;
                this.style.position = buffPosition;
                this.style.visibility = buffVisibility;
            }
            return s;
        }
        /**
         * Adds an event handler to the
         * @param event
         * @param f
         */
        handle(context, event, f) {
            this.addEventListener(event, function () {
                f.apply(context, arguments);
            });
        }
        /**
         * Returns a value indicating if the element has the specified class
         *
         * @param className
         */
        hasClass(className) {
            return this.element.classList.contains(className);
        }
        /**
         * Loads the data of the data calls
         */
        loadData() {
            var calls = this.loadDataCalls();
            if (calls.length > 0) {
                // Data will load
                this.dataWillLoad();
                // Create message
                var m = latte.Message.sendCalls(calls);
                // Handle fail
                m.failed.add((errorDesc) => {
                    this.dataLoadFailed(errorDesc);
                });
                // Handle arrival
                m.responseArrived.add(() => {
                    this.dataDidLoad();
                });
            }
        }
        /**
         * Override this method to indicate the element loads data
         * @returns {null}
         */
        loadDataCalls() {
            return [];
        }
        /**
         * Raises the <c>contentEditable</c> event
         */
        onContentEditableChanged() {
            if (this._contentEditableChanged) {
                this._contentEditableChanged.raise();
            }
            if (this.contentEditable) {
                this.element['contentEditable'] = 'true';
            }
            else {
                this.element['contentEditable'] = 'false';
            }
        }
        /**
         * Raises the <c>dataBindAdded</c> event
         */
        onDataBindAdded(b) {
            if (this._dataBindAdded) {
                this._dataBindAdded.raise(b);
            }
        }
        /**
         * Raises the <c>eventBindAdded</c> event
         */
        onEventBindAdded(b) {
            if (this._eventBindAdded) {
                this._eventBindAdded.raise(b);
            }
        }
        /**
         * Raises the <c>tag</c> event
         */
        onTagChanged() {
            if (this._tagChanged) {
                this._tagChanged.raise();
            }
        }
        /**
         * Raises the <c>visible</c> event
         */
        onVisibleChanged() {
            if (this._visibleChanged) {
                this._visibleChanged.raise();
            }
        }
        /**
         * Queries element for a native HTMLElement
         * @param query
         * @returns {HTMLElement}
         */
        querySelector(query) {
            return this.element.querySelector(query);
        }
        /**
         * Queries element for native HTMLElements
         * @param query
         * @returns {NodeList}
         */
        querySelectorAll(query) {
            return this.element.querySelectorAll(query);
        }
        /**
         * Removes the specified child
         * @param e
         */
        remove(e) {
            this.element.removeChild(e.element);
        }
        /**
         * Removes the bind to the specified object
         * @param object
         */
        removeBindedElement(object) {
            let dataCount = 0;
            // Scan data bindings
            this.dataBinds.forEach((bind) => {
                bind.uninstall();
                dataCount++;
            });
            // Delete from BindedElements
        }
        /**
         * Removes the specified class to the class list
         *
         * @param className
         */
        removeClass(className) {
            if (className.indexOf(' ') >= 0)
                throw "Only one class can be removed.";
            this.element.classList.remove(className);
        }
        /**
         * Removes this from its parent element
         */
        removeFromParent() {
            // Check if still has parent
            if (this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        }
        /**
         * Sets the content of the element, deleting all existing children.
         * @param e
         */
        setContent(e, silent = false) {
            this.clear();
            this.add(e);
            if (!silent) {
                e.visible = true;
                e.didLoad();
            }
        }
        /**
         * Sets the children of the element, deleting all existing children
         * @param e
         */
        setChildren(e) {
            this.clear();
            for (var i = 0; i < e.length; i++) {
                this.add(e[i]);
            }
        }
        /**
         * Sets the children of the element as the elements of the collection
         * @param c
         */
        setCollection(c) {
            this.clear();
            this.addCollection(c);
            return c;
        }
        /**
         * Replaces the element
         * @param e
         */
        setElement(e) {
            this._element = null;
            this._element = e;
        }
        /**
         * Alternates the class, adds it if no present and removes it if present.
         * @param className
         */
        swapClass(className) {
            if (this.hasClass(className)) {
                this.removeClass(className);
            }
            else {
                this.addClass(className);
            }
        }
        toString() {
            return latte.sprintf("%s.%s", this.element.tagName, this.element.classList.toString());
        }
        /**
         * Gets an event raised when the value of the contentEditable property changes
         *
         * @returns {LatteEvent}
         */
        get contentEditableChanged() {
            if (!this._contentEditableChanged) {
                this._contentEditableChanged = new latte.LatteEvent(this);
            }
            return this._contentEditableChanged;
        }
        /**
         * Gets an event raised when a data bind is added
         *
         * @returns {LatteEvent}
         */
        get dataBindAdded() {
            if (!this._dataBindAdded) {
                this._dataBindAdded = new latte.LatteEvent(this);
            }
            return this._dataBindAdded;
        }
        /**
         * Gets an event raised when an event bind is added
         *
         * @returns {LatteEvent}
         */
        get eventBindAdded() {
            if (!this._eventBindAdded) {
                this._eventBindAdded = new latte.LatteEvent(this);
            }
            return this._eventBindAdded;
        }
        /**
         * Gets an event raised when the value of the tag property changes
         *
         * @returns {LatteEvent}
         */
        get tagChanged() {
            if (!this._tagChanged) {
                this._tagChanged = new latte.LatteEvent(this);
            }
            return this._tagChanged;
        }
        /**
         * Gets an event raised when the value of the visible property changes
         *
         * @returns {LatteEvent}
         */
        get visibleChanged() {
            if (!this._visibleChanged) {
                this._visibleChanged = new latte.LatteEvent(this);
            }
            return this._visibleChanged;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the background color of the element
         * @returns {string}
         */
        get backgroundColor() {
            return this.style.backgroundColor;
        }
        /**
         * Gets or sets the background color of the element
         * @param value
         */
        set backgroundColor(value) {
            this.style.backgroundColor = value;
        }
        /**
         * Gets or sets the background image url
         *
         * @returns {string}
         */
        get backgroundImageUrl() {
            return this.element.style.backgroundImage;
        }
        /**
         * Gets or sets the background image url
         *
         * @param {string} value
         */
        set backgroundImageUrl(value) {
            this.element.style.backgroundImage = latte.sprintf("url(%s)", value);
        }
        /**
         * Gets the binded elements of this element
         *
         * @returns {Element<HTMLElement>[]}
         */
        get bindedElements() {
            if (!this._bindedElements) {
                this._bindedElements = [];
            }
            return this._bindedElements;
        }
        /**
         * Gets or sets a value indicating if the node should de activated as editable
         *
         * @returns {boolean}
         */
        get contentEditable() {
            return this._contentEditable;
        }
        /**
         * Gets or sets a value indicating if the node should de activated as editable
         *
         * @param {boolean} value
         */
        set contentEditable(value) {
            // Check if value changed
            var changed = value !== this._contentEditable;
            // Set value
            this._contentEditable = value;
            // Trigger changed event
            if (changed) {
                this.onContentEditableChanged();
            }
        }
        /**
         * Gets a value indicating if the element is being animated
         *
         * @returns {boolean}
         */
        get isAnimated() {
            return this._isAnimated;
        }
        /**
         * Gets the data binds of the element
         *
         * @returns {DataBind[]}
         */
        get dataBinds() {
            if (!this._dataBinds) {
                this._dataBinds = [];
            }
            return this._dataBinds;
        }
        /**
         * Gets the height of the elements document
         *
         * @returns {number}
         */
        get documentHeight() {
            return Element.getDocumentHeight(this.element.ownerDocument);
        }
        /**
         * Gets the width of the elements document
         *
         * @returns {number}
         */
        get documentWidth() {
            return Element.getDocumentWidth(this.element.ownerDocument);
        }
        /**
         * Gets the core html element
         *
         * @returns {HTMLDivElement}
         */
        get element() {
            return this._element;
        }
        /**
         * Gets the event binds of the element
         *
         * @returns {EventBind[]}
         */
        get eventBinds() {
            if (!this._eventBinds) {
                this._eventBinds = [];
            }
            return this._eventBinds;
        }
        /**
         * Gets or sets the height of the element in pixels
         *
         * @returns {number}
         */
        get height() {
            if (!this.visible) {
                return this.getSize().height;
            }
            return this.element.offsetHeight;
        }
        /**
         * Gets or sets the height of the element in pixels
         *
         * @param {number} value
         */
        set height(value) {
            if (isNaN(value)) {
                this.element.style.height = 'auto';
            }
            else if (value == null) {
                this.element.style.height = '';
            }
            else if (value < 1) {
                this.element.style.height = (value * 100) + 'px';
            }
            else {
                this.element.style.height = value + 'px';
            }
        }
        /**
         * Gets the left of the element, relative to the viewport
         *
         * @returns {number}
         */
        get left() {
            return this.element.getBoundingClientRect().left;
        }
        /**
         * Gets the style of the element
         *
         * @returns {CSSStyleDeclaration}
         */
        get style() {
            return this.element.style;
        }
        /**
         * Gets or sets the tag for the object
         *
         * @returns {any}
         */
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets the tag for the object
         *
         * @param {any} value
         */
        set tag(value) {
            // Check if value changed
            var changed = value !== this._tag;
            // Set value
            this._tag = value;
            // Trigger changed event
            if (changed) {
                this.onTagChanged();
            }
        }
        /**
         * Gets or sets the inner text of the element
         *
         * @returns {string}
         */
        get text() {
            var tagName = this.element.tagName.toLowerCase();
            //log("was " +tagName)
            if (tagName == 'input' || tagName == 'textarea') {
                return this.element['value'];
            }
            else {
                return this.element.innerHTML;
            }
        }
        /**
         * Gets or sets the inner text of the element
         *
         * @param {string} value
         */
        set text(value) {
            var tagName = this.element.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'textarea' && !latte._undef(value)) {
                this.element['value'] = value;
            }
            else {
                this.element['innerHTML'] = value;
            }
        }
        /**
         * Gets the top of the element, relative to the viewport
         *
         * @returns {number}
         */
        get top() {
            return this.element.getBoundingClientRect().top;
        }
        /**
         * Gets the height of the viewport of the element
         *
         * @returns {number}
         */
        get viewportHeight() {
            return Element.getViewportHeight(this.element.ownerDocument);
        }
        /**
         * Gets the width of the viewport of the element
         *
         * @returns {number}
         */
        get viewportWidth() {
            return Element.getViewportWidth(this.element.ownerDocument);
        }
        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @returns {boolean}
         */
        get visible() {
            return this._visible;
        }
        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @param {boolean} value
         */
        set visible(value) {
            // Check if value changed
            var changed = value !== this._visible;
            // Set value
            this._visible = value;
            if (this.visible) {
                this.element.style.display = null;
            }
            else {
                this.element.style.display = 'none';
            }
            // Trigger changed event
            if (changed) {
                this.onVisibleChanged();
            }
        }
        /**
         * Gets or sets the width of the element in pixels
         *
         * @returns {number}
         */
        get width() {
            if (!this.visible) {
                return this.getSize().width;
            }
            return this.element.offsetWidth;
        }
        /**
         * Gets or sets the width of the element in pixels
         *
         * @param {number} value
         */
        set width(value) {
            this.element.style.width = value + 'px';
        }
        /**
         * Gets or sets the tooltip of the elent
         *
         * @returns {string}
         */
        get tooltip() {
            return this.element.title;
        }
        /**
         * Gets or sets the tooltip of the elent
         *
         * @param {string} value
         */
        set tooltip(value) {
            this.element['title'] = value;
        }
    }
    latte.Element = Element;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 4/20/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Animation {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        constructor(startValue, endValue, duration, updateHandler = null, endHandler = null) {
            /**
             * Property field
             */
            this._running = false;
            /**
             * Property field
             */
            this._tag = null;
            this._duration = duration;
            this._startValue = startValue;
            this._endValue = endValue;
            if (updateHandler) {
                this.update.add(updateHandler);
            }
            if (endHandler) {
                this.ended.add(endHandler);
            }
        }
        /**
         * Gets the requestAnimationRequest function, cross-browser
         */
        static get requestAnimationFrame() {
            return window.requestAnimationFrame || (function () {
                var timeLast = 0;
                return window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function (callback) {
                    var timeCurrent = (new Date()).getTime(), timeDelta;
                    /* Dynamically set the delay on a per-tick basis to more closely match 60fps. */
                    /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671. */
                    timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                    timeLast = timeCurrent + timeDelta;
                    return setTimeout(function () { callback(timeCurrent + timeDelta); }, timeDelta);
                };
            })();
        }
        /**
         * Starts the animation loop.
         */
        static loop() {
            Animation.loopActive = true;
            var now = latte.DateTime.now;
            var runningAnimations = 0;
            for (var i = 0; i < Animation.stack.length; i++) {
                // Get animation to attend
                var a = Animation.stack[i];
                // If animation no longer valid, continue
                if (!a || !a.running)
                    continue;
                var value = a.currentValue;
                //log("Updating: %s-%s -> %s", a.startValue, a.endValue, a.currentValue)
                if (now.compareTo(a.endTime) > 0 || value >= a.endValue) {
                    a._running = false;
                    a.onUpdate(a.endValue);
                    a.onEnded();
                }
                else {
                    a.onUpdate(value);
                    runningAnimations++;
                }
            }
            if (runningAnimations > 0) {
                var rq = Animation.requestAnimationFrame;
                //log("Relooping")
                rq(Animation.loop);
            }
            else {
                // Clear stack
                //log("Ending Loop")
                Animation.stack = [];
                Animation.loopActive = false;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the value of the animation for the specified second of the animation
         * @param f
         * @returns {number}
         */
        getValueForSecond(s) {
            //if(this.startValue  + (this.speed * s) > 600) {
            //    debugger;
            //}
            return this.startValue + (this.speed * s);
        }
        /**
         * Starts the animation
         */
        start() {
            this._startTime = latte.DateTime.now;
            this._running = true;
            Animation.stack.push(this);
            if (!Animation.loopActive)
                Animation.loop(); // Start the animation loop
        }
        /**
         * Gets an event raised when the animation ends
         *
         * @returns {LatteEvent}
         */
        get ended() {
            if (!this._ended) {
                this._ended = new latte.LatteEvent(this);
            }
            return this._ended;
        }
        /**
         * Raises the <c>ended</c> event
         */
        onEnded() {
            if (this._ended) {
                this._ended.raise();
            }
        }
        /**
         * Gets an event raised when an update to the animation is performed
         *
         * @returns {LatteEvent}
         */
        get update() {
            if (!this._update) {
                this._update = new latte.LatteEvent(this);
            }
            return this._update;
        }
        /**
         * Raises the <c>update</c> event
         */
        onUpdate(value) {
            if (this._update) {
                this._update.raise(value);
            }
        }
        //endregion
        //region Properties
        /**
         * Gets the current value of distance to the current frame
         *
         * @returns {number}
         */
        get currentValue() {
            return this.getValueForSecond(latte.DateTime.now.subtractDate(this.startTime).totalSeconds);
        }
        /**
         * Gets the distance of the animation
         *
         * @returns {number}
         */
        get distance() {
            return this.endValue - this.startValue;
        }
        /**
         * Gets the duration of the animation, in seconds
         *
         * @returns {number}
         */
        get duration() {
            return this._duration;
        }
        /**
         * Gets the final value of the animation
         *
         * @returns {number}
         */
        get endValue() {
            return this._endValue;
        }
        /**
         * Gets the end time of the animation
         *
         * @returns {number}
         */
        get endTime() {
            return this.startTime.addSeconds(this.duration);
        }
        /**
         * Gets a value indicating if the animation is currently running
         *
         * @returns {boolean}
         */
        get running() {
            return this._running;
        }
        /**
         * Gets the initial value for the animation
         *
         * @returns {number}
         */
        get startValue() {
            return this._startValue;
        }
        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        get startTime() {
            return this._startTime;
        }
        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        set startTime(value) {
            this._startTime = value;
        }
        /**
         * Gets the speed of the animation value, in distance per second
         *
         * @returns {number}
         */
        get speed() {
            return this.distance / this.duration;
        }
        /**
         * Gets or sets the tag of the animation
         *
         * @returns {any}
         */
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets the tag of the animation
         *
         * @param {any} value
         */
        set tag(value) {
            this._tag = value;
        }
    }
    //region Static
    /**
     * Stack of active animations
     * @type {Array}
     */
    Animation.stack = [];
    Animation.loopActive = false;
    latte.Animation = Animation;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 4/15/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Textbox extends latte.Element {
        //endregion
        /**
         * Creates the textbox
         */
        constructor(element) {
            super(element);
            //endregion
            //region Fields
            this.lastValueOnKeyUp = null;
            /**
             * Property field
             */
            this._pristine = true;
            this.addEventListener('input', () => {
                if (this.pristine) {
                    //log("Unpristined: " + this.input.name)
                    this.pristine = false;
                }
                this.lastValueOnKeyUp = this.value;
            });
        }
        //region Static
        /**
         * Checks if email is valid
         * @param email
         * @returns {boolean}
         */
        static validEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns a value indicating if the value of the textbox contains only the caracters specified
         * in the validChars string.
         * @param validChars
         */
        static charCheck(text, validChars) {
            validChars = String(validChars);
            for (var i = 0; i < text.length; i++) {
                if (validChars.indexOf(text.charAt(i)) < 0) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Focuses on the Input
         */
        focus() {
            this.input.focus();
        }
        /**
         * Returns the value of the textbox
         * @returns {string}
         */
        toString() {
            return this.value;
        }
        //endregion
        //region Events
        //endregion
        //region Properties
        /**
         * Gets the element as an input element (Type Cast)
         *
         * @returns {HTMLInputElement}
         */
        get input() {
            return this.element;
        }
        /**
         * Gets a value indicating if the value of the textbox has only letters and numbers
         * @returns {boolean}
         */
        get isAlphanumeric() {
            return Textbox.charCheck(this.value, '1234567890qwertyuiopasdfghjklzxcvbnm');
        }
        /**
         * Gets a value indicating if the value of the textbox is an email
         *
         * @returns {boolean}
         */
        get isEmail() {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(this.value);
        }
        /**
         * Gets a value indicating if the value of the textbox is an integer number
         * @returns {boolean}
         */
        get isInt() {
            return Textbox.charCheck(this.value, '1234567890');
        }
        /**
         * Gets a value indicating if the value of the textbox is a floating point number
         * @returns {boolean}
         */
        get isFloat() {
            return Textbox.charCheck(this.value, '123456789.');
        }
        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @returns {number}
         */
        get minLength() {
            return parseInt(this.element.getAttribute('data-minlength'), 10) || 0;
        }
        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @param {number} value
         */
        set minLength(value) {
            this.element.setAttribute('data-minlength', String(value));
        }
        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @returns {boolean}
         */
        get pristine() {
            return this._pristine;
        }
        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @param {boolean} value
         */
        set pristine(value) {
            // Check if value changed
            var changed = value !== this._pristine;
            // Set value
            this._pristine = value;
            // Trigger changed event
            if (changed) {
                this.onPristineChanged();
            }
        }
        /**
         * Gets an event raised when the value of the pristine property changes
         *
         * @returns {LatteEvent}
         */
        get pristineChanged() {
            if (!this._pristineChanged) {
                this._pristineChanged = new latte.LatteEvent(this);
            }
            return this._pristineChanged;
        }
        /**
         * Raises the <c>pristine</c> event
         */
        onPristineChanged() {
            if (this._pristineChanged) {
                this._pristineChanged.raise();
            }
        }
        /**
         * Gets a value indicating if the textbox is valid
         *
         * @returns {boolean}
         */
        get valid() {
            var valid = true;
            if (valid && latte._isNumber(this.minLength)) {
                valid = String(this.value).length >= this.minLength;
            }
            return valid;
        }
        /**
         * Gets or sets the value of the textbox
         *
         * @returns {string}
         */
        get value() {
            return this.input.value || "";
        }
        /**
         * Gets or sets the value of the textbox
         *
         * @param {string} value
         */
        set value(value) {
            this.input.value = value;
        }
    }
    latte.Textbox = Textbox;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ElementCollection extends latte.Collection {
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
        }
        //region Static
        /**
         * Creates the collection from the specified NodeList
         * @param list
         * @returns {latte.ElementCollection}
         */
        static fromNodeList(list) {
            var collection = new ElementCollection();
            for (var i = 0; i < list.length; i++) {
                ((node) => {
                    if (node['latte-element-instance'] instanceof latte.Element) {
                        collection.add(node['latte-element-instance']);
                    }
                })(list[i]);
            }
            return collection;
        }
        /**
         * Creates an array of elements of the specified base class, binds them to the specified array of records
         * and returns them as a ElementCollection
         *
         * @param array
         * @param baseClass
         * @returns {latte.ElementCollection}
         */
        static fromBindArray(array, baseClass) {
            var collection = new ElementCollection();
            for (var i = 0; i < array.length; i++) {
                ((object) => {
                    var c = baseClass;
                    var element = (new c);
                    element.bind(object);
                    collection.add(element);
                })(array[i]);
            }
            return collection;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds an event listener to the elements in the collection
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event, handler, capture = false) {
            this.each((e) => {
                e.addEventListener(event, function (evt) {
                    var args = [e, evt];
                    for (var i = 0; i < arguments.length; i++)
                        args.push(arguments[i]);
                    handler.apply(e, args);
                }, capture);
            });
        }
        /**
         * Adds the specified class to the class list of the elements in the collection
         * @param className
         */
        addClass(className) {
            this.each((e) => {
                e.addClass(className);
            });
        }
        /**
         * Clears all the children of the elements in the collection
         */
        clear() {
            this.each((e) => {
                e.clear();
            });
        }
        /**
         * Fades in the elements in the collection
         * @param duration
         * @param callback
         */
        fadeIn(duration = 0.1, callback = null) {
            this.each((e) => {
                e.fadeIn(duration, callback);
            });
        }
        /**
         * Fades out the elements in the collection
         * @param duration
         * @param callback
         */
        fadeOut(duration = 0.1, callback = null) {
            this.each((e) => {
                e.fadeOut(duration, callback);
            });
        }
        /**
         * Adds an event handler to the elements in the collection
         * @param context
         * @param event
         * @param f
         */
        handle(context, event, f) {
            this.each((e) => {
                e.handle(context, event, f);
            });
        }
        /**
         * Removes the specified class to the class list of elements in the collection
         *
         * @param className
         */
        removeClass(className) {
            this.each((e) => {
                e.removeClass(className);
            });
        }
        /**
         * Sets the attribute of the elements
         * @param property
         * @param value
         */
        setAttribute(att, value) {
            this.each((e) => {
                e.element.setAttribute(att, value);
            });
        }
        /**
         * Sets the property of the elements
         * @param property
         * @param value
         */
        setProperty(property, value) {
            this.each((e) => {
                e[property] = value;
            });
        }
        /**
         * Sets the visibility of the elements in the collection
         * @param visible
         */
        setVisible(visible) {
            this.each((e) => {
                e.visible = visible;
            });
        }
    }
    latte.ElementCollection = ElementCollection;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/29/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class CollectionDataBind {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates and automatically sets up the binding
         */
        constructor(element, elementProperty, collection, type = latte.DataBindType.AUTO) {
            collection.each((object) => {
            });
        }
    }
    latte.CollectionDataBind = CollectionDataBind;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     * Types of binding
     */
    (function (DataBindType) {
        /**
         * Will listen for changes on both the element and the record.
         */
        DataBindType[DataBindType["AUTO"] = 1] = "AUTO";
        /**
         * Will listen for changes only on the record property in order to call apply()
         * @type {number}
         */
        DataBindType[DataBindType["AUTO_APPLY"] = 2] = "AUTO_APPLY";
        /**
         * Will listen for changes only on the element, in order to call commit()
         * @type {number}
         */
        DataBindType[DataBindType["AUTO_COMMIT"] = 3] = "AUTO_COMMIT";
        /**
         * Will not listen for any changes. User must call apply() and commit() manually.
         * @type {number}
         */
        DataBindType[DataBindType["MANUAL"] = 4] = "MANUAL";
    })(latte.DataBindType || (latte.DataBindType = {}));
    var DataBindType = latte.DataBindType;
    /**
     * Binds the property of an object to the property of an element
     */
    class DataBind {
        //endregion
        /**
         * Creates and automatically sets up the binding
         */
        constructor(element, elementProperty, record, recordProperty, type = DataBindType.AUTO, dataAdapter = null, elementEvent = null, recordEvent = null) {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._dataAdapter = null;
            /**
             * Property field
             */
            this._element = null;
            /**
             * Property field
             */
            this._elementEvent = null;
            /**
             * Property field
             */
            this._elementProperty = null;
            /**
             * Property field
             */
            this._record = null;
            /**
             * Property field
             */
            this._recordEvent = null;
            /**
             * Property field
             */
            this._recordProperty = null;
            if (dataAdapter) {
                this.dataAdapter = dataAdapter;
            }
            this.setup(element, elementProperty, record, recordProperty, type, elementEvent, recordEvent);
        }
        //region Private Methods
        /**
         * Sets up the listeners, removes previous listeners and applies the binding for the first time.
         */
        setup(element, elementProperty, record, recordProperty, type = DataBindType.MANUAL, elementEvent = null, recordEvent = null) {
            this._element = element;
            this._elementProperty = elementProperty;
            this._record = record;
            this._recordProperty = recordProperty;
            this._elementEvent = elementEvent;
            this._recordEvent = recordEvent;
            this._type = type;
            this.uninstall();
            if (this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_COMMIT) {
                if (this.element instanceof latte.Element && latte._isString(this.elementEvent)) {
                    this.lastElement = this.element;
                    this.lastElementEvent = this.elementEvent;
                    this.lastElementListener = () => { this.commit(); };
                    // Obtain when element changes
                    this.element.addEventListener(this.elementEvent, this.lastElementListener);
                }
                else {
                    latte.log(latte.sprintf("Warning: Binding -> commit not possible (Element: %s; %s; elementProperty: %s; recordProperty: %s).", String(this.element), String(this.record), String(this.elementProperty), String(this.recordProperty)));
                }
            }
            if (this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_APPLY) {
                if (this.record && latte._isString(this.recordEvent) && this.record[this.recordEvent]) {
                    this.lastRecord = this.record;
                    this.lastRecordEvent = this.recordEvent;
                    this.lastRecordListener = () => { this.apply(); };
                    // Apply when data on record changes
                    this.record[this.recordEvent].add(this.lastRecordListener);
                }
                else {
                    if (!latte._undef(this.record[this.recordProperty])) {
                    }
                }
            }
            this.apply();
        }
        /**
         * Uninstalls the last assigned listeners
         */
        uninstall() {
            if (this.lastElementListener) {
                this.lastElement.element.removeEventListener(this.lastElementEvent, this.lastElementListener);
            }
            if (this.lastRecordListener) {
                this.lastRecord[this.lastRecordEvent].remove(this.lastRecordListener);
            }
        }
        //endregion
        //region Methods
        /**
         * Applies the data of the record to the elements property
         */
        apply() {
            var value = this.record[this.recordProperty];
            //Is this all right? value will be only applied when value is not undefined
            if (!latte._undef(value)) {
                this.element[this.elementProperty] = this.dataAdapter.adaptForElement(value);
            }
            this.onApplied();
        }
        /**
         * Raises the <c>applied</c> event
         */
        onApplied() {
            if (this._applied) {
                this._applied.raise();
            }
        }
        /**
         * Obtains the data from the element and sends it to the record
         */
        commit() {
            this.record[this.recordProperty] = this.dataAdapter.adaptForRecord(this.element[this.elementProperty]);
            this.onCommitted();
        }
        /**
         * Raises the <c>committed</c> event
         */
        onCommitted() {
            if (this._committed) {
                this._committed.raise();
            }
        }
        /**
         * Gets an event raised when the data of the record is applied to the element
         *
         * @returns {LatteEvent}
         */
        get applied() {
            if (!this._applied) {
                this._applied = new latte.LatteEvent(this);
            }
            return this._applied;
        }
        /**
         * Gets an event raised when the binding is returned from the element to the record
         *
         * @returns {LatteEvent}
         */
        get committed() {
            if (!this._committed) {
                this._committed = new latte.LatteEvent(this);
            }
            return this._committed;
        }
        /**
         * Gets or sets the data adapter of the bind
         *
         * @returns {DataAdapter<any, any>}
         */
        get dataAdapter() {
            if (!this._dataAdapter) {
                this._dataAdapter = new latte.DefaultDataAdapter();
            }
            return this._dataAdapter;
        }
        /**
         * Gets or sets the data adapter of the bind
         *
         * @param {DataAdapter<any, any>} value
         */
        set dataAdapter(value) {
            this._dataAdapter = value;
        }
        /**
         * Gets or sets the binded element
         *
         * @returns {Element}
         */
        get element() {
            return this._element;
        }
        /**
         * Gets or sets the event that will trigger obtain on change
         *
         * @returns {string}
         */
        get elementEvent() {
            return this._elementEvent;
        }
        /**
         * Gets or sets the property of the element to bind
         *
         * @returns {string}
         */
        get elementProperty() {
            return this._elementProperty;
        }
        /**
         * Gets or sets the record to bind
         *
         * @returns {any}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the name of the event that detonates a change in the record
         *
         * @returns {string}
         */
        get recordEvent() {
            return this._recordEvent;
        }
        /**
         * Gets or sets the property of the record to bind
         *
         * @returns {string}
         */
        get recordProperty() {
            return this._recordProperty;
        }
        /**
         * Gets the type of binding
         *
         * @returns {DataBindType}
         */
        get type() {
            return this._type;
        }
    }
    latte.DataBind = DataBind;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     * Represents a very simple data adapter that passes the data along as strings.
     */
    class DefaultDataAdapter {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the adapter
         */
        constructor() {
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        adaptForElement(value) {
            return value;
        }
        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        adaptForRecord(value) {
            return value;
        }
    }
    latte.DefaultDataAdapter = DefaultDataAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class EventBind {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(element, elementEvent, record, recordMethod) {
            this.setup(element, elementEvent, record, recordMethod);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Sets up the bind
         * @param element
         * @param elementEvent
         * @param record
         * @param recordMethod
         */
        setup(element, elementEvent, record, recordMethod) {
            this._element = element;
            this._elementEvent = elementEvent;
            this._record = record;
            this._recordMethod = recordMethod;
            var __this = this;
            if (this.element[this.elementEvent] instanceof latte.LatteEvent) {
                this.element[this.elementEvent].add(function () {
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    if (latte._isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);
                    }
                    else {
                    }
                });
            }
            else {
                this.element.addEventListener(this.elementEvent, function () {
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    if (latte._isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);
                    }
                    else {
                    }
                });
            }
        }
        /**
         * Gets the element to bind
         *
         * @returns {Element<HTMLElement>}
         */
        get element() {
            return this._element;
        }
        /**
         * Gets the element event
         *
         * @returns {string}
         */
        get elementEvent() {
            return this._elementEvent;
        }
        /**
         * Gets the record to bind
         *
         * @returns {any}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets the method to execute on the record
         *
         * @returns {string}
         */
        get recordMethod() {
            return this._recordMethod;
        }
    }
    latte.EventBind = EventBind;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/data-bind/DataAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/Element.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/Animation.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/Textbox.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/ElementCollection.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/data-bind/CollectionDataBind.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/data-bind/DataBind.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/data-bind/DefaultDataAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.element/ts/data-bind/EventBind.ts" /> 
