var latte;
(function (latte) {
    /**
     * Represents selection modes for DateItem
     **/
    (function (DateSelectionMode) {
        /**
         * Single day
         **/
        DateSelectionMode[DateSelectionMode["DAY"] = 0] = "DAY";
        /**
         * No side specified so let to user selection
         **/
        DateSelectionMode[DateSelectionMode["MANUAL"] = 1] = "MANUAL";
        /**
         * Month
         **/
        DateSelectionMode[DateSelectionMode["MONTH"] = 2] = "MONTH";
        /**
         * Week
         **/
        DateSelectionMode[DateSelectionMode["WEEK"] = 3] = "WEEK";
        /**
         * Work week
         **/
        DateSelectionMode[DateSelectionMode["WORKWEEK"] = 4] = "WORKWEEK";
    })(latte.DateSelectionMode || (latte.DateSelectionMode = {}));
    var DateSelectionMode = latte.DateSelectionMode;
})(latte || (latte = {}));
/// jQuery Rectangle plugin
(function ($) {
    $['fn'].rectangle = function (rect, relative) {
        var offset = relative !== true ? this.offset() : this.position();
        if (!offset)
            offset = { top: 0, left: 0 };
        if (rect instanceof latte.Rectangle) {
            return this.css({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        }
        else {
            return new latte.Rectangle(offset.left, offset.top, this.outerWidth(), this.outerHeight());
        }
    };
    $['fn'].innerRectangle = function (rect, relative) {
        var offset = relative !== true ? this.offset() : this.position();
        if (!offset)
            offset = { top: 0, left: 0 };
        if (rect instanceof latte.Rectangle) {
            return this.css({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        }
        else {
            return new latte.Rectangle(offset.left, offset.top, this.width(), this.height());
        }
    };
})(jQuery);
/**
 * Adds a cleaner of Css float properties to the elements
 */
$.fn.clear = function () { return this.append($('<div>').css({ 'clear': 'both' })); };
/**
 * Returns the latte instance object related with first element
 */
$.fn.instance = function () { return this.data('instance'); };
var latte;
(function (latte) {
    /**
     * Possible Directions
     **/
    (function (Direction) {
        /**
         * Horizontal direction
         **/
        Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
        /**
         * Vertical direction
         **/
        Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
        /**
         * Non established direction
         */
        Direction[Direction["NONE"] = 2] = "NONE";
    })(latte.Direction || (latte.Direction = {}));
    var Direction = latte.Direction;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Enumerates sides of objects
     **/
    (function (Side) {
        /**
         * No side specified so automatic side is chosen.
         **/
        Side[Side["AUTO"] = 1] = "AUTO";
        /**
         * Bottom side of something
         **/
        Side[Side["BOTTOM"] = 4] = "BOTTOM";
        /**
         * Left side of something
         **/
        Side[Side["LEFT"] = 8] = "LEFT";
        /**
         * Right side of something
         **/
        Side[Side["RIGHT"] = 16] = "RIGHT";
        /**
         * Top side of something
         **/
        Side[Side["TOP"] = 32] = "TOP";
    })(latte.Side || (latte.Side = {}));
    var Side = latte.Side;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Defines possible transition modes for views
     **/
    (function (Transition) {
        /**
         * Fades out the current view and fades in the new one.
         **/
        Transition[Transition["FADE"] = 0] = "FADE";
        /**
         * Gives the impression of advancing forward.
         **/
        Transition[Transition["SWIPE_FORWARD"] = 1] = "SWIPE_FORWARD";
    })(latte.Transition || (latte.Transition = {}));
    var Transition = latte.Transition;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a basic element of the DOM, on which latte UI objects are constructed.
     **/
    class UiElement {
        //endregion
        /**
         * Creates the UiElement.
         **/
        constructor() {
            /**
             *
             **/
            this._enabled = true;
            /**
             * Property field
             */
            this._hidden = false;
            if (!UiElement._staticInited) {
                UiElement.staticInit();
            }
            // Initialize events
            this.contextItemsShow = new latte.LatteEvent(this);
            this.layout = new latte.LatteEvent(this);
            this.enabledChanged = new latte.LatteEvent(this);
            this.visibleChanged = new latte.LatteEvent(this);
            // Initialize collecitons
            this.contextItems = new latte.Collection();
            // Initialize static collection
            if (!UiElement._contextItemsCollect)
                UiElement._contextItemsCollect =
                    new latte.Collection();
            // Create base element
            this.element = $('<div>');
            this.element.addClass('latte-uielement');
            this.element.data('instance', this);
            this.element.bind('contextmenu', (e) => { return this._contextMenu(e); });
            this.addEventListener('click', (e) => {
                if (!this.enabled) {
                    e.preventDefault();
                    return false;
                }
            });
            this.addEventListener('mousedown', (e) => {
                if (!this.enabled) {
                    e.preventDefault();
                    return false;
                }
            });
            // Disable text selection
            //UiElement.disableTextSelection(this.element);
        }
        //region Static methods
        /**
         * Disables the text selection feature of User Agent on the specified element.
         **/
        static disableTextSelection(element) {
            if (!(element instanceof jQuery))
                throw new latte.InvalidArgumentEx('element');
            element.attr('unselectable', 'on')
                .css({
                '-moz-user-select': 'none',
                '-webkit-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none'
            });
            //            .each(function(){
            //                this.onselectstart = function(){ return false; }
            //            });
            return element;
        }
        /**
         * Enables the text selection feature of User Agent on the specified element.
         **/
        static enableTextSelection(element) {
            element.attr('unselectable', 'off')
                .css({
                '-moz-user-select': '',
                '-webkit-user-select': '',
                '-ms-user-select': '',
                'user-select': ''
            });
            //            .each(function(){
            //                this.onselectstart = null;
            //            });
            return element;
        }
        /**
         * Gets the opposite side of passed side
         * @param side
         * @returns {*}
         */
        static oppositeSide(side) {
            switch (side) {
                case latte.Side.TOP: return latte.Side.BOTTOM;
                case latte.Side.BOTTOM: return latte.Side.TOP;
                case latte.Side.LEFT: return latte.Side.RIGHT;
                case latte.Side.RIGHT: return latte.Side.LEFT;
                default: return latte.Side.BOTTOM;
            }
        }
        /**
         * Static initializator
         */
        static staticInit() {
            $('body')
                .mousemove((e) => {
                if (UiElement.dragging) {
                    UiElement._dragElement.css({
                        top: e.pageY + 10,
                        left: e.pageX + 10
                    });
                }
            })
                .mouseup((e) => {
                UiElement._dragging = false;
                if (UiElement._dragElement) {
                    UiElement._dragElement.remove();
                    UiElement._dragElement = null;
                }
                if (UiElement._draggingElement) {
                    if (UiElement.dropTarget) {
                        UiElement.dropTarget.onDropElement();
                    }
                    UiElement._draggingElement.onDropped();
                    UiElement._draggingElement.beingDragged = false;
                    UiElement._draggingElement = null;
                }
            });
        }
        /**
         * Gets the element dragged around to show user something is dragging.
         * @returns {JQuery}
         */
        static get dragElement() {
            return this._dragElement;
        }
        /**
         * Gets a value indicating if the element is being dragged
         * @returns {boolean}
         */
        static get dragging() {
            return this._dragging;
        }
        /**
         * Gets the UiElement currently being dragged (if any)
         * @returns {boolean}
         */
        static get draggingElement() {
            return this._draggingElement;
        }
        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @returns {UiElement}
         */
        static get dropTarget() {
            return this._dropTarget;
        }
        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @param {UiElement} value
         */
        static set dropTarget(value) {
            this._dropTarget = value;
        }
        //region Private
        /**
         *
         **/
        _contextMenu(e) {
            var menu = this.showContextMenu(e.pageX, e.pageY);
            return !(menu instanceof latte.MenuOverlay);
        }
        //endregion
        //region Methods
        /**
         * Shorthand for the addEventListener of the element
         * @param event
         * @param f
         * @param useCapture
         */
        addEventListener(event, f, useCapture = false) {
            this.node.addEventListener(event, f, useCapture);
        }
        /**
         * Adds classes to the element
         **/
        addClass(classString) {
            this.element.addClass(classString);
            return this;
        }
        /**
         * Appends the view to the specified element.
         **/
        appendTo(element) {
            if (element instanceof jQuery || latte._isString(element)) {
                this.element.appendTo(element);
            }
            else if (element instanceof UiElement) {
                this.element.appendTo(element.element);
            }
            else {
                throw new latte.InvalidArgumentEx('element', element);
            }
            return this;
        }
        /**
         * Passes css method to <c>element</c>
         **/
        css(css, value = '') {
            this.element.css(css, value);
            return this;
        }
        /**
         * Ensures the class is present on the element, depending on the specified condition.
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
         * Finalizes the element
         */
        finalize() {
            if (this.onFinalizing() === false) {
                return;
            }
            this.element.remove();
        }
        /**
         * Raises the <c>blur</c> event
         */
        onBlur() {
            if (this._blur) {
                this._blur.raise();
            }
        }
        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        onContextItemsShow() {
            this.contextItemsShow.raise();
        }
        /**
         * Called when the element who shows dragging is created, from this UiElement.
         */
        onCreateDragElement() {
            var copy = this.element.clone();
            copy.addClass('active-drag-element');
            copy.css({
                position: 'fixed',
                opacity: 0.5,
                width: this.element.width(),
                height: this.element.height(),
                left: UiElement._dragStart.x,
                top: UiElement._dragStart.y
            });
            copy.appendTo('body');
            return copy;
        }
        /**
         * Raises the <c>dragOver</c> event
         */
        onDragOver() {
            if (this._dragOver) {
                return this._dragOver.raise();
            }
        }
        /**
         * Raises the <c>dropped</c> event
         */
        onDropped() {
            if (this._dropped) {
                this.dropped.raise();
            }
        }
        /**
         * Raises the <c>dropElement</c> event.
         */
        onDropElement() {
            if (this._dropElement) {
                this._dropElement.raise();
            }
        }
        /**
         * Raises the <c>enabledChanged</c> event.
         **/
        onEnabledChanged() {
            this.enabledChanged.raise();
        }
        /**
         * Raises the <c>focusable</c> event
         */
        onFocusableChanged() {
            if (this._focusableChanged) {
                this._focusableChanged.raise();
            }
            if (this.focusable) {
                this.addClass('focusable');
                this.node.setAttribute('tabindex', "0"); // TabIndexManager.subscribe(this));
                this.addEventListener('focus', () => {
                    this.onFocused();
                });
                this.addEventListener('blur', () => {
                    this.onBlur();
                });
            }
            else {
                this.removeClass('focusable');
                this.node.removeAttribute('tabindex');
            }
        }
        /**
         * Raises the <c>finalizing</c> event
         */
        onFinalizing() {
            if (this._finalizing) {
                return this._finalizing.raise();
            }
        }
        /**
         * Raises the <c>focused</c> event
         */
        onFocused() {
            if (this._focused) {
                this._focused.raise();
            }
        }
        /**
         * Raises the <c>hidden</c> event
         */
        onHiddenChanged() {
            if (this.hidden) {
                this.css('visibility', 'hidden');
            }
            else {
                this.css('visibility', '');
            }
            if (this._hiddenChanged) {
                this._hiddenChanged.raise();
            }
        }
        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout() {
            this.layout.raise();
        }
        /**
         * Raises the <c>visibleChanged</c> event.
         **/
        onVisibleChanged() {
            this.visibleChanged.raise();
        }
        /**
         * Removes classes to the element
         **/
        removeClass(classString) {
            this.element.removeClass(classString);
            return this;
        }
        /**
         * Shows a menu with the <c>contextItems</c> at the specified position.
         **/
        showContextMenu(pageX, pageY) {
            var buffer = UiElement._contextItemsCollect;
            // Invoke event to allow control to prepare its items
            this.onContextItemsShow();
            // Add separator
            if (buffer.count > 0 && this.contextItems.count > 0) {
                buffer.add(new latte.SeparatorItem());
            }
            // Add items of this item
            buffer.addCollection(this.contextItems);
            // If no parent elements and there's items to show
            if (this.element.parents('.latte-uielement').length == 0
                && buffer.count > 0) {
                latte.MenuOverlay.closeAll();
                // Create menu
                var m = new latte.MenuOverlay();
                // Add items
                m.items.addCollection(buffer);
                // show it
                m.showAt(pageX, pageY);
                // Clear items buffer
                buffer.clear();
                return m;
            }
            return null;
        }
        /**
         * Gets an event raised when the element loses focus (if focusable)
         *
         * @returns {LatteEvent}
         */
        get blur() {
            if (!this._blur) {
                this._blur = new latte.LatteEvent(this);
            }
            return this._blur;
        }
        /**
         * Gets an event raised when an element is dragged over this element.
         * The handler must return <c>true</c> to confirm drop is allowed
         *
         * @returns {LatteEvent}
         */
        get dragOver() {
            if (!this._dragOver) {
                this._dragOver = new latte.LatteEvent(this);
                this._dragOver.handlerAdded.add(() => {
                    this.element.mouseover(() => {
                        if (UiElement.dragging) {
                            if (this.onDragOver()) {
                                UiElement.dropTarget = this;
                            }
                            else {
                                UiElement.dropTarget = null;
                            }
                        }
                    });
                });
            }
            return this._dragOver;
        }
        /**
         * Gets an event raised when the element is being finalized
         *
         * @returns {LatteEvent}
         */
        get finalizing() {
            if (!this._finalizing) {
                this._finalizing = new latte.LatteEvent(this);
            }
            return this._finalizing;
        }
        /**
         * Gets an event raised when the element recieves focus (if focusasble)
         *
         * @returns {LatteEvent}
         */
        get focused() {
            if (!this._focused) {
                this._focused = new latte.LatteEvent(this);
            }
            return this._focused;
        }
        /**
         * Gets an event raised when the value of the hidden property changes
         *
         * @returns {LatteEvent}
         */
        get hiddenChanged() {
            if (!this._hiddenChanged) {
                this._hiddenChanged = new latte.LatteEvent(this);
            }
            return this._hiddenChanged;
        }
        /**
         * Gets an event raised when an element is dropped over this element.
         * For an element to be allowed to be dropped over,
         *  the <c>dragOver</c> event handler must return true before the drop operation.
         *
         * @returns {LatteEvent}
         */
        get dropElement() {
            if (!this._dropElement) {
                this._dropElement = new latte.LatteEvent(this);
            }
            return this._dropElement;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @returns {boolean}
         */
        get beingDragged() {
            return this._beingDragged;
        }
        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @param value
         */
        set beingDragged(value) {
            this._beingDragged = value;
            if (this.hideWhileDragging === true) {
                this.visible = !value;
            }
        }
        /**
         * Gets or sets the element who will act as source for dragging.
         * @returns {JQuery}
         */
        get dragSource() {
            return this._dragSource;
        }
        /**
         *
         * @param value
         */
        set dragSource(value) {
            if (this._dragSource instanceof $) {
            }
            this._dragSource = value;
            var hTimeout = 0;
            this._dragSource
                .mousedown((e) => {
                if (e.which == 1) {
                    // Set up timeout to start dragging
                    hTimeout = setTimeout(() => {
                        UiElement._dragStart = { x: e.pageX, y: e.pageY };
                        UiElement._dragging = true;
                        UiElement._dragElement = this.onCreateDragElement();
                        UiElement._draggingElement = this;
                        this.beingDragged = true;
                    }, 200);
                    e.stopPropagation();
                    return false;
                }
            })
                .mouseup((e) => {
                // Cancel timeout
                if (hTimeout) {
                    clearTimeout(hTimeout);
                }
            });
        }
        /**
         * Gets an event raised when the element is dropped after a dragging operation
         */
        get dropped() {
            if (!this._dropped) {
                this._dropped = new latte.LatteEvent(this);
            }
            return this._dropped;
        }
        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        get enabled() {
            return this._enabled;
        }
        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        set enabled(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = this._enabled != value;
            this._enabled = value;
            if (value) {
                this.element.removeClass('disabled');
                this.element.css('opacity', 1);
            }
            else {
                this.element.addClass('disabled');
                this.element.css('opacity', .4);
            }
            if (changed)
                this.onEnabledChanged();
        }
        /**
         * Gets a value indicating if the element has been finalized
         *
         * @returns {boolean}
         */
        get finalized() {
            return this._finalized;
        }
        /**
         * Gets or sets a value
         **/
        get focusable() {
            return this._focusable;
        }
        /**
         * Gets or sets a value indicating if the element should be focusable
         **/
        set focusable(value) {
            if (value) {
                this.addClass('focusable');
                this.element.attr('tabindex', 0); // TabIndexManager.subscribe(this));
                this.node.addEventListener('focus', () => {
                    this.onFocused();
                });
                this.node.addEventListener('blur', () => {
                    this.onBlur();
                });
            }
            else {
                this.removeClass('focusable');
                this.element.removeAttr('tabindex');
            }
            this._focusable = value;
        }
        /**
         * Gets an event raised when the value of the focusable property changes
         *
         * @returns {LatteEvent}
         */
        get focusableChanged() {
            if (!this._focusableChanged) {
                this._focusableChanged = new latte.LatteEvent(this);
            }
            return this._focusableChanged;
        }
        /**
         * Gets or sets the height of the element.
         **/
        get height() {
            return this.element.height();
        }
        /**
         * Gets or sets the height of the element.
         **/
        set height(value) {
            this.element.height(value);
        }
        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @returns {boolean}
         */
        get hidden() {
            return this._hidden;
        }
        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @param {boolean} value
         */
        set hidden(value) {
            // Check if value changed
            var changed = value !== this._hidden;
            // Set value
            this._hidden = value;
            // Trigger changed event
            if (changed) {
                this.onHiddenChanged();
            }
        }
        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @returns {boolean}
         */
        get hideWhileDragging() {
            return this._hideWhileDragging;
        }
        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @param value
         */
        set hideWhileDragging(value) {
            this._hideWhileDragging = value;
        }
        /**
         * Gets the raw HTML element
         *
         * @returns {HTMLDivElement}
         */
        get node() {
            return this.element.get(0);
        }
        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        set tag(value) {
            this._tag = value;
        }
        /**
         * Gets or sets the tooltip of the element
         **/
        get tooltip() {
            return this._tooltip;
        }
        /**
         * Gets or sets the tooltip of the element
         **/
        set tooltip(value) {
            this.element.attr('title', value);
            this._tooltip = value;
        }
        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        get visible() {
            return this._visible;
        }
        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        set visible(value) {
            this._visible = value;
            var changed = this._visible != value;
            if (value) {
                this.element.show();
            }
            else {
                this.element.hide();
            }
            if (changed) {
                this.onVisibleChanged();
            }
        }
        /**
         * Gets or sets the width of the element.
         **/
        get width() {
            return this.element.width();
        }
        /**
         * Gets or sets the width of the element.
         **/
        set width(value) {
            this.element.width(value);
        }
    }
    /**
     * Saves the coordinates where the drag operation started
     */
    UiElement._dragStart = null;
    /**
     * Flag to know if static constructor has been called
     */
    UiElement._staticInited = false;
    /**
     *
     */
    UiElement._dragging = false;
    /**
     *
     */
    UiElement._draggingElement = null;
    /**
     * Property field
     */
    UiElement._dropTarget = null;
    latte.UiElement = UiElement;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Base class for UI items.

     The <c>element</c> property points to the DOM element who contains the item.
     **/
    class Item extends latte.UiElement {
        /**
         * Creates a new <c>Item</c>
         **/
        constructor() {
            super();
            // Create base element
            this.element.addClass('latte-item');
        }
        /**
         * Creates a Clickable element. This element will react to clicks and mouse movement.
         **/
        static clickable() {
            return latte.UiElement.disableTextSelection($('<div>')
                .addClass('clickable')
                .mouseover(function () {
                var $this = $(this);
                if ($this.hasClass('disabled'))
                    return;
                if (!$this.hasClass('with-menu'))
                    $this.addClass('hover');
            })
                .mouseout(function () {
                var $this = $(this);
                if ($this.hasClass('disabled'))
                    return;
                $this.removeClass('hover');
                $this.removeClass('pressed');
            })
                .mousedown(function () {
                var $this = $(this);
                if ($this.hasClass('disabled'))
                    return;
                $this.addClass('pressed');
            })
                .mouseup(function () {
                var $this = $(this);
                // Remove Pressed
                $this.removeClass('pressed');
                // Check if checkable
                if ($this.hasClass('checkable')) {
                    if ($this.hasClass('checked')) {
                        $this.removeClass('checked');
                    }
                    else {
                        $this.addClass('checked');
                    }
                }
            }));
        }
        /**
         * Creates a Selectable element. This element will react to clicks and mouse movement.
         **/
        static selectable() {
            return latte.UiElement.disableTextSelection($('<div>')
                .addClass('selectable')
                .click(function () {
                var $this = $(this);
                if ($this.hasClass('selected')) {
                    $this.removeClass('selected');
                }
                else {
                    $this.addClass('selected');
                    $this.removeClass('hover');
                }
            })
                .mouseover(function () {
                if (!$(this).hasClass('selected'))
                    $(this).addClass('hover');
            })
                .mouseout(function () {
                $(this).removeClass('hover pressed');
            }));
        }
        /**
         * Brings the item to the front
         **/
        bringToFront() {
            latte.ZIndex.bringToFront(this.element);
        }
        /**
         * Gets the <c>MenuOverlay</c> who contains this <c>Item</c>
         **/
        get parentMenu() {
            var r = null;
            if (this.parentIsMenu) {
                r = this.element.parent().data('instance');
            }
            return r;
        }
        /**
         * Gets a value indicating if the parent of this <c>Item</c> is a <c>MenuOverlay</c>
         **/
        get parentIsMenu() {
            return this.element.parent().is('.latte-overlay.menu');
        }
        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        get tab() {
            return this._tab;
        }
        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        set tab(value) {
            this._tab = value;
        }
    }
    latte.Item = Item;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders an element that fills the space where its added. This is the base class for Views in DataLatte.

     The main feature of View is the fact that it can contains another View or Views.
     **/
    class View extends latte.UiElement {
        ///**
        // * Raised when the view stops being visible
        // **/
        //hidden: LatteEvent;
        //endregion
        /**
         * Creates the <c>View</c>
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._unsavedChanges = false;
            // Create base elements
            this.element.addClass('latte-view');
            this.container = $('<div>').appendTo(this.element).addClass('container');
        }
        /**
         *
         **/
        static getMainView() {
            return View._mainViewHolder ? View._mainViewHolder.view : null;
        }
        /**
         *
         **/
        static initStatic() {
            View.smallScreenChanged = new latte.LatteEvent(this);
            $(document)
                .keydown(function (e) {
                if (e.keyCode == latte.Key.ENTER) {
                    if (View.defaultButton instanceof latte.ButtonItem)
                        View.defaultButton.onClick();
                }
            });
        }
        /**
         * SPECIAL GETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static getModalView() {
            return this._modalView;
        }
        /**
         * Raises the <c>smallScreenChanged</c> event
         */
        static onSmallScreenChanged() {
            if (View.mainView instanceof View) {
                if (View.smallScreen) {
                    $('body').addClass('small-screen');
                }
                else {
                    $('body').removeClass('small-screen');
                }
            }
            if (View.smallScreenChanged instanceof latte.LatteEvent) {
                View.smallScreenChanged.raise();
            }
        }
        /**
         * SPECIAL SETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static setModalView(view = null, itemsArray = null) {
            var items = new latte.Collection();
            if (itemsArray) {
                items.addArray(itemsArray);
            }
            // Hide previous modal
            if (this._modalView instanceof View && this._modalView !== view) {
                if (this._layer) {
                    this._layer.fadeOut(function () { $(this).remove(); });
                    this._layer = null;
                }
                if (this._modalView) {
                    var parentsParent = this._modalView.element.parent().parent();
                    parentsParent.animate({
                        top: $(window).height()
                    }, 'fast', 'swing', () => { parentsParent.remove(); });
                }
            }
            if (view instanceof View) {
                var layer = $('<div>').addClass('latte-modal-view-layer').appendTo('body');
                var dialog = $('<div>').addClass('latte-modal-view').appendTo('body');
                var eInner = $('<div>').addClass('inner-view').appendTo(dialog);
                var eItems = $('<div>').addClass('items').appendTo(dialog);
                // Adapt & append view
                view.parentIsModal = true;
                eInner.append(view.element);
                // Items
                var its = new latte.Collection();
                its.addCollection(items);
                var item;
                while ((item = its.next()))
                    eItems.append(item.element);
                eItems.clear();
                if (its.count == 0)
                    eItems.detach();
                // Center dialog
                var centerRect = dialog.rectangle().center(layer.rectangle());
                dialog.rectangle(centerRect);
                dialog.css('height', '');
                var start = {
                    top: -dialog.height(),
                    opacity: 0
                };
                var end = {
                    top: centerRect.top,
                    opacity: 1
                };
                view.onLayout();
                // Show now
                layer.css({ opacity: 0 }).animate({ opacity: 1 }, 'fast');
                dialog.css(start).animate(end, 'fast', 'swing', function () { view.focusInput(); });
                this._layer = layer;
            }
            this._modalView = view;
        }
        /**
         * Sets the mainView of the User Agent Viewport
         **/
        static setMainView(view, transition = null, milliseconds = 0) {
            // Create main holder if not already present
            if (!(View._mainViewHolder instanceof View)) {
                View._mainViewHolder = new View();
                View._mainViewHolder.addClass('main-view-holder');
                View._mainViewHolder.appendTo('body');
            }
            // Handle window resize
            if (!View._initialized) {
                $(window).bind('resize', function () {
                    if (View._mainViewHolder instanceof View) {
                        View.smallScreen = document.documentElement.clientWidth <= 480;
                        View._mainViewHolder.onLayout();
                    }
                });
                View._initialized = true;
            }
            // Set view of main holder
            View._mainViewHolder.setView(view, transition, milliseconds);
            View.smallScreen = document.documentElement.clientWidth <= 480;
        }
        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        static get defaultButton() {
            return View._defaultButton;
        }
        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        static set defaultButton(value) {
            View._defaultButton = value;
        }
        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        static get mainView() {
            return this.getMainView();
        }
        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        static set mainView(view) {
            this.setMainView(view);
        }
        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        static get modalView() {
            return this.getModalView();
        }
        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        static set modalView(value) {
            this.setModalView(value);
        }
        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @returns {boolean}
         */
        static get smallScreen() {
            return View._smallScreen;
        }
        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @param value
         */
        static set smallScreen(value) {
            var changed = value !== View._smallScreen;
            View._smallScreen = value;
            if (changed) {
                View.onSmallScreenChanged();
            }
        }
        /**
         * Gets an event raised when the view is loaded
         *
         * @returns {LatteEvent}
         */
        get load() {
            if (!this._load) {
                this._load = new latte.LatteEvent(this);
            }
            return this._load;
        }
        /**
         * Gets an event raised when the view is already visible
         *
         * @returns {LatteEvent}
         */
        get shown() {
            if (!this._shown) {
                this._shown = new latte.LatteEvent(this);
            }
            return this._shown;
        }
        /**
         * Gets an event raised when the view is unloaded. If result of event is false, unload will be aborted
         *
         * @returns {LatteEvent}
         */
        get unload() {
            if (!this._unload) {
                this._unload = new latte.LatteEvent(this);
            }
            return this._unload;
        }
        /**
         * Gets an event raised when the unsavedChanges variable value changes
         *
         * @returns {LatteEvent}
         */
        get unsavedChangesChanged() {
            if (!this._unsavedChangesChanged) {
                this._unsavedChangesChanged = new latte.LatteEvent(this);
            }
            return this._unsavedChangesChanged;
        }
        /**
         * Gets an event raised when the <c>saveChanges</c> method is called.
         *
         * @returns {LatteEvent}
         */
        get savingChanges() {
            if (!this._savingChanges) {
                this._savingChanges = new latte.LatteEvent(this);
            }
            return this._savingChanges;
        }
        /**
         * Gets an event raised when the changes have finalized saving
         *
         * @returns {LatteEvent}
         */
        get savedChanges() {
            if (!this._savedChanges) {
                this._savedChanges = new latte.LatteEvent(this);
            }
            return this._savedChanges;
        }
        //endregion
        //region Methods
        /**
         * Focuses the first input if any
         **/
        focusInput() {
            this.element.find('input, select, textarea').first().focus().select();
        }
        /**
         * Returns the current view of the view
         **/
        getView() {
            return this._view;
        }
        /**
         * Raises the <c>hidden</c> event
         **/
        //onHidden(){
        //
        //    this.hidden.raise();
        //
        //}
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            if (this._infoItem instanceof latte.Item) {
                this._infoItem.element.css({ width: 'auto', height: 'auto' });
                // Center on view
                var viewRect = this.element.rectangle();
                viewRect.top = 0;
                viewRect.left = 0;
                var itemRect = this._infoItem.element.rectangle();
                this._infoItem.element.css('position', 'absolute').rectangle(itemRect.center(viewRect));
            }
            if (this._view instanceof View)
                this._view.onLayout();
        }
        /**
         * Raises the <c>load</c> event
         */
        onLoad() {
            if (this._load) {
                this._load.raise();
            }
        }
        /**
         * Raises the <c>savedChanges</c> event
         */
        onSavedChanges() {
            if (this._savedChanges) {
                this._savedChanges.raise();
            }
        }
        /**
         * Raises the <c>savingChanges</c> event
         */
        onSavingChanges() {
            if (this._savingChanges) {
                return this._savingChanges.raise();
            }
        }
        /**
         * Raises the <c>shown</c> event
         */
        onShown() {
            if (this._shown) {
                this._shown.raise();
            }
        }
        /**
         * Raises the <c>unload</c> event
         **/
        onUnload() {
            let response = this.unload.raise();
            if (response !== false) {
                // Check if unsaved changes
                if (this.unsavedChanges) {
                    let btnSave = new latte.ButtonItem();
                    btnSave.text = strings.yesSaveChanges;
                    btnSave.click.add(() => { this.saveChanges(); });
                    let btnIgnore = new latte.ButtonItem();
                    btnIgnore.text = strings.noIgnoreChanges;
                    btnIgnore.click.add(() => { this.unsavedChanges = false; });
                    // Ask if user wants to save changes
                    latte.DialogView
                        .ask(strings.askSaveChanges, strings.unsavedChanges, [btnSave, btnIgnore]);
                }
            }
            return response;
        }
        /**
         * Raises the <c>unsavedChangesChanged</c> event
         */
        onUnsavedChangesChanged() {
            if (this._unsavedChangesChanged) {
                this._unsavedChangesChanged.raise();
            }
        }
        /**
         * Saves changes on view.
         Override <c>onSavingChanges</c> to custom save your data.
         **/
        saveChanges() {
            if (this.onSavingChanges() != false) {
                // Backwards compatibility
                if (this['onSaveChanges']) {
                    debugger;
                    latte.warnDeprecated('View.onSaveChanges', 'ISave.getSaveCalls');
                    this.unsavedChanges = false;
                    this['onSaveChanges']();
                    this.onSavedChanges();
                }
                else {
                    // Send using Message
                    // HACK: This is invoking the Message Class
                    //       creating a dependency on the latte.data class.
                    //       A cleaner implementation should make correct use of
                    //       ICall & IMessage classes on latte module.
                    let m = latte['Message'].sendCalls(this.getSaveCalls());
                    m.responseArrived.add(() => this.onSavedChanges());
                }
            }
        }
        /**
         * Sets the <c>View</c> inside this view.
         If view swap fails, it will return <c>false</c>
         **/
        setView(view = null, transition = null, milliseconds = 0) {
            // If same view as current, cancel.
            if (view && view === this._view)
                return true;
            // Set default transition
            if (latte._undef(transition))
                transition = latte.Transition.FADE;
            // Unload current view
            if (this._view instanceof View) {
                if (this._view.onUnload() === false) {
                    // Cancel unload
                    return false;
                }
                this.saveItems.remove(this._view);
            }
            // States for animation of transition
            let oldView = this._view, newView = view, oldStart = {}, oldEnd = {}, newStart = {}, newEnd = {};
            if (newView) {
                // Call load of view
                view.onLoad();
                // Set modal if necessary
                newView.parentIsModal = this.parentIsModal;
                // Append view
                this.container.append(view.element);
                // Add to saveItems
                this.saveItems.add(view);
                newView._parentView = this;
            }
            if (oldView)
                oldView._parentView = null;
            // Prepare states for animation
            switch (transition) {
                case latte.Transition.FADE:
                    oldStart.opacity = newEnd.opacity = 1;
                    oldEnd.opacity = newStart.opacity = 0;
                    break;
                case latte.Transition.SWIPE_FORWARD:
                    oldEnd.left = oldView ? -oldView.element.width() : 0;
                    newStart.left = newView ? newView.element.width() : 0;
                    newEnd.left = 0;
                    break;
            }
            // Prepare animation
            if (newView)
                newView.element.css(newStart);
            if (oldView)
                oldView.element.css(oldStart);
            // Perform a layout of items
            if (newView)
                view.onLayout();
            // Animate new view
            if (newView)
                view.element.animate(newEnd, latte._undef(milliseconds) ? 100 : milliseconds, 'swing', () => {
                    // Let view know is about to be shown
                    if (newView)
                        view.onShown();
                });
            // Animate old view
            if (oldView)
                oldView.element.animate(oldEnd, latte._undef(milliseconds) ? 100 : milliseconds, 'swing', () => {
                    // Detach from view
                    oldView.element.detach();
                    // Inform hidden
                    //oldView.onHidden();
                });
            this._view = newView;
        }
        /**
         * SPECIAL GETTER
         Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        getUnsavedChanges() {
            return this._unsavedChanges;
        }
        /**
         * Implementation. Gets the save calls of all its descendants.
         */
        getSaveCalls() {
            let calls = [];
            // Concat all calls
            this.saveItems.each((item) => calls = calls.concat(item.getSaveCalls()));
            return calls;
        }
        /**
         * SPECIAL SETTER
         Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        setUnsavedChanges(value = false, silent = false) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._unsavedChanges;
            this._unsavedChanges = value;
            if (changed && silent !== true)
                this.onUnsavedChangesChanged();
        }
        /**
         * Updates the changes based on saveItems
         */
        updateSavedChanges() {
            let changes = false;
            for (let i = 0; i < this.saveItems.length; i++) {
                if (this.saveItems[i].unsavedChanges) {
                    changes = true;
                    break;
                }
            }
            this.unsavedChanges = changes;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        get infoItem() {
            return this._infoItem;
        }
        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        set infoItem(value) {
            if (this._infoItem instanceof latte.Item)
                this._infoItem.element.detach();
            if (value instanceof latte.Item)
                value.element.insertBefore(this.container);
            this._infoItem = value;
            this.onLayout();
        }
        /**
         * Gets or sets the padding of the container
         **/
        get padding() {
            return this._padding;
        }
        /**
         * Gets or sets the padding of the container
         **/
        set padding(value) {
            this._padding = value;
            this.container.css('padding', value);
        }
        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        get parentIsModal() {
            return this._parentIsModal;
        }
        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        set parentIsModal(value) {
            this._parentIsModal = value;
            if (value) {
                this.element.css('position', 'static');
                this.container.css('position', 'static');
            }
            else {
                this.element.css('position', 'absolute');
                this.container.css('position', 'absolute');
            }
            if (this.view instanceof View)
                this.view.parentIsModal = value;
        }
        /**
         * Gets the parent view of this view.
         **/
        get parentView() {
            return this._parentView;
        }
        /**
         * Gets the ISave items
         *
         * @returns {Collection<ISave>}
         */
        get saveItems() {
            if (!this._saveItems) {
                this._saveItems = new latte.Collection((item) => {
                    item.unsavedChangesChanged.add(() => {
                        if (this.saveItems.contains(item)) {
                            // log("unsavedChangesChanged! Checking")
                            // log(item)
                            this.updateSavedChanges();
                        }
                    });
                });
            }
            return this._saveItems;
        }
        /**
         * Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        get unsavedChanges() {
            return this.getUnsavedChanges();
        }
        /**
         * Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        set unsavedChanges(value) {
            this.setUnsavedChanges(value);
        }
        /**
         * Gets or sets the view of the view
         **/
        get view() {
            return this.getView();
        }
        /**
         * Gets or sets the view of the view
         **/
        set view(value) {
            this.setView(value);
        }
    }
    //region Static
    View._smallScreen = false;
    latte.View = View;
    $(() => { View.initStatic(); });
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Base class for items who capture values from user.

     Classes who inherits from ValueItem must implement <c>value</c> method
     and initialize the <c>input</c> property to the focusable.
     **/
    class ValueItem extends latte.Item {
        /**
         * Every ValueItem must create its own <c>input</c> element
         **/
        constructor() {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._value = null;
            this.element.addClass('value');
        }
        //region Methods
        /**
         * Override
         * @returns {String}
         */
        onGetValueString() {
            return String(this.value);
        }
        /**
         * Raises the <c>value</c> event
         */
        onValueChanged() {
            if (this._valueChanged) {
                this._valueChanged.raise();
            }
        }
        /**
         * Gets an event raised when the value of the value property changes
         *
         * @returns {LatteEvent}
         */
        get valueChanged() {
            if (!this._valueChanged) {
                this._valueChanged = new latte.LatteEvent(this);
            }
            return this._valueChanged;
        }
        /**
         * Gets or sets the value this item represents
         *
         * @returns {T}
         */
        get value() {
            return this._value;
        }
        /**
         * Gets or sets the value this item represents
         *
         * @param {T} value
         */
        set value(value) {
            // Check if value changed
            let changed = value !== this._value;
            // Set value
            this._value = value;
            // Trigger changed event
            if (changed) {
                this.onValueChanged();
            }
        }
        /**
         * Gets the value as a string
         *
         * @returns {string}
         */
        get valueString() {
            return this.onGetValueString();
        }
    }
    latte.ValueItem = ValueItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class Overlay extends latte.UiElement {
        /**
         * Creates the overlay
         */
        constructor() {
            super();
            this.element.addClass('latte-overlay');
        }
        close() {
            this.element.remove();
        }
        /**
         * Sets the parent of the overlay, and the overlay is inserted as first node of the parent
         * @param parent
         */
        setFirstInParent(parent) {
            this._parent = parent;
            parent.element.prepend(this.element);
        }
        /**
         * Shows at the specified position of the specified element
         *
         * @param side
         * @param element
         */
        showAtSide(side, uielement) {
            var r = uielement.element.rectangle();
            switch (side) {
                case latte.Side.TOP:
                    this.top = r.top - this.height;
                    this.left = r.left;
                    this.width = r.width;
                    break;
                case latte.Side.BOTTOM:
                    this.top = r.bottom;
                    this.left = r.left;
                    this.width = r.width;
                    break;
                default:
                    throw new latte.Ex();
            }
            //            this.appendTo('body');
        }
        /**
         * Gets the left coordinate of the overlay
         * @returns {number}
         */
        get left() {
            return this._left;
        }
        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        set left(value) {
            this._left = value;
            this.element.css('left', value);
        }
        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @returns {UiElement}
         */
        get parent() {
            return this._parent;
        }
        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @param value
         */
        set parent(value) {
            this._parent = value;
            this.element.detach().appendTo(value.element);
        }
        /**
         * Gets the top coordinate of the overlay
         *
         * @returns {number}
         */
        get top() {
            return this._top;
        }
        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        set top(value) {
            this._top = value;
            this.element.css('top', value);
        }
    }
    latte.Overlay = Overlay;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows items in a stack
     **/
    class ItemStack extends latte.Item {
        /**
         * Creates the stack of items
         **/
        constructor(items = null) {
            super();
            this.element.addClass('stack');
            // Init event
            this.itemsChanged = new latte.LatteEvent(this);
            // Init collection
            this.items = new latte.Collection(this.onAddItem, this.onRemoveItem, this);
            // Init element
            this.container = $('<div>').addClass('container').appendTo(this.element);
            if (items) {
                this.items.addArray(items);
            }
        }
        /**
         *
         **/
        onAddItem(item) {
            item.element.appendTo(this.container);
            if (latte._isNumber(this.padding)) {
                item.element.css('margin-bottom', this.padding);
            }
            this.onItemsChanged();
        }
        /**
         *
         **/
        onRemoveItem(item) {
            item.element.detach();
            this.onItemsChanged();
        }
        /**
         * Adds an item to the <c>items</c> collection
         **/
        add(item) {
            this.items.add(item);
        }
        /**
         * Clears all elements of collection
         **/
        clear() {
            this.items.clear();
        }
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onItemsChanged() {
            this.itemsChanged.raise();
        }
        /**
         * Overriden
         **/
        onLayout() {
            super.onLayout();
            for (var i = 0; i < this.items.count; i++) {
                this.items.item(i).onLayout();
            }
        }
        /**
         * Removes an item from the <c>items</c> collection
         **/
        remove(item) {
            this.items.remove(item);
        }
        /**
         * Gets the count of <c>items</c> collection
         **/
        get count() {
            return this.items.count;
        }
        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        get padding() {
            return this._padding;
        }
        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        set padding(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value');
            // Set value
            this._padding = value;
            if (latte._isNumber(value)) {
                // Margin of container
                this.container.css('padding', value);
                // Bottom margin of elements
                this.container.children().css('margin-bottom', value);
            }
            else {
                // Delete properties
                this.container.css('padding', '');
                this.container.children().css('margin-bottom', '');
            }
        }
    }
    latte.ItemStack = ItemStack;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents an item that is selectable
     **/
    class SelectableItem extends latte.Item {
        /**
         * Creates the selectable
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('selectable');
            // Init events
            this.selectedChanged = new latte.LatteEvent(this);
            // Init handlers
            this.element.mouseover((e) => { this._thisMouseOver(e); });
            this.element.mouseout((e) => { this._thisMouseOut(e); });
            this.element.click((e) => { this._thisClick(e); });
            this.element.mousedown((e) => { this._thisMouseDown(e); });
        }
        /**
         *
         **/
        _thisClick(e) {
        }
        /**
         *
         **/
        _thisMouseDown(e) {
            if (!this.enabled)
                return;
            // Remove hover flag
            this.element.removeClass('hover');
            // Select
            this.selected = true;
        }
        /**
         *
         **/
        _thisMouseOut(e) {
            if (!this.enabled)
                return;
            this.element.removeClass('hover pressed');
        }
        /**
         *
         **/
        _thisMouseOver(e) {
            if (!this.enabled)
                return;
            this.element.addClass('hover');
        }
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged() {
            this.selectedChanged.raise(this);
        }
        /**
         * Sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        setSelected(value = false, raiseEvent = false) {
            var changed = false;
            if (value) {
                // Changed flag
                changed = !this.element.hasClass('selected');
                // Select face
                this.element.addClass('selected');
            }
            else {
                // Changed flag
                changed = this.element.hasClass('selected');
                // Remove flag
                this.element.removeClass('selected');
            }
            // Raise event
            if (changed && raiseEvent !== false)
                this.onSelectedChanged();
        }
        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        get selected() {
            return this.element.hasClass('selected');
        }
        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        set selected(value) {
            this.setSelected(value, true);
        }
    }
    latte.SelectableItem = SelectableItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class AnchorView extends latte.View {
        /**
         * Initializes view, optionally with an anchor item.
         */
        constructor(anchorTop = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._anchorTop = null;
            /**
             * Property field
             */
            this._anchorTopVisible = true;
            /**
             * Property field
             */
            this._anchorRight = null;
            /**
             * Property field
             */
            this._anchorRightVisible = true;
            /**
             * Property field
             */
            this._anchorBottom = null;
            /**
             * Property field
             */
            this._anchorBottomVisible = true;
            /**
             * Property field
             */
            this._anchorLeft = null;
            /**
             * Property field
             */
            this._anchorLeftVisible = true;
            this.element.addClass('anchor');
            // Set item
            if (anchorTop) {
                this.anchorTop = anchorTop;
            }
        }
        //region Methods
        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout() {
            super.onLayout();
            var containerCss = {
                top: '',
                left: '',
                right: '',
                bottom: ''
            };
            var itemCss = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };
            if (this.anchorTop && this.anchorTopVisible) {
                containerCss.top = this.anchorTop.element.outerHeight();
                this.anchorTop.css({
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: ''
                });
                this.anchorTop.onLayout();
            }
            if (this.anchorRight && this.anchorRightVisible) {
                containerCss.right = this.anchorRight.element.outerWidth();
                this.anchorRight.css({
                    top: 0,
                    left: '',
                    right: 0,
                    bottom: 0
                });
                this.anchorRight.onLayout();
            }
            if (this.anchorBottom && this.anchorBottomVisible) {
                containerCss.bottom = this.anchorBottom.element.outerHeight();
                this.anchorBottom.css({
                    top: '',
                    left: 0,
                    right: 0,
                    bottom: 0
                });
                this.anchorBottom.onLayout();
            }
            if (this.anchorLeft && this.anchorLeftVisible) {
                containerCss.left = this.anchorLeft.element.outerWidth();
                this.anchorLeft.css({
                    top: 0,
                    left: 0,
                    right: '',
                    bottom: 0
                });
                this.anchorLeft.onLayout();
            }
            this.container.css(containerCss);
        }
        /**
         * Gets an event raised when the value of anchorTop changes
         *
         * @returns {LatteEvent}
         */
        get anchorTopChanged() {
            if (!this._anchorTopChanged) {
                this._anchorTopChanged = new latte.LatteEvent(this);
            }
            return this._anchorTopChanged;
        }
        /**
         * Raises the <c>anchorTopChanged</c> event
         */
        onAnchorTopChanged() {
            if (this._anchorTopChanged) {
                this._anchorTopChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorRight changes
         *
         * @returns {LatteEvent}
         */
        get anchorRightChanged() {
            if (!this._anchorRightChanged) {
                this._anchorRightChanged = new latte.LatteEvent(this);
            }
            return this._anchorRightChanged;
        }
        /**
         * Raises the <c>anchorRightChanged</c> event
         */
        onAnchorRightChanged() {
            if (this._anchorRightChanged) {
                this._anchorRightChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorBottom changes
         *
         * @returns {LatteEvent}
         */
        get anchorBottomChanged() {
            if (!this._anchorBottomChanged) {
                this._anchorBottomChanged = new latte.LatteEvent(this);
            }
            return this._anchorBottomChanged;
        }
        /**
         * Raises the <c>anchorBottomChanged</c> event
         */
        onAnchorBottomChanged() {
            if (this._anchorBottomChanged) {
                this._anchorBottomChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when when what?
         *
         * @returns {LatteEvent}
         */
        get anchorLeftChanged() {
            if (!this._anchorLeftChanged) {
                this._anchorLeftChanged = new latte.LatteEvent(this);
            }
            return this._anchorLeftChanged;
        }
        /**
         * Raises the <c>anchorLeftChanged</c> event
         */
        onAnchorLeftChanged() {
            if (this._anchorLeftChanged) {
                this._anchorLeftChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorTopVisible changes
         *
         * @returns {LatteEvent}
         */
        get anchorTopVisibleChanged() {
            if (!this._anchorTopVisibleChanged) {
                this._anchorTopVisibleChanged = new latte.LatteEvent(this);
            }
            return this._anchorTopVisibleChanged;
        }
        /**
         * Raises the <c>anchorTopVisibleChanged</c> event
         */
        onAnchorTopVisibleChanged() {
            if (this._anchorTopVisibleChanged) {
                this._anchorTopVisibleChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorRightVisible changes
         *
         * @returns {LatteEvent}
         */
        get anchorRightVisibleChanged() {
            if (!this._anchorRightVisibleChanged) {
                this._anchorRightVisibleChanged = new latte.LatteEvent(this);
            }
            return this._anchorRightVisibleChanged;
        }
        /**
         * Raises the <c>anchorRightVisibleChanged</c> event
         */
        onAnchorRightVisibleChanged() {
            if (this._anchorRightVisibleChanged) {
                this._anchorRightVisibleChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorBottomVisible changed
         *
         * @returns {LatteEvent}
         */
        get anchorBottomVisibleChanged() {
            if (!this._anchorBottomVisibleChanged) {
                this._anchorBottomVisibleChanged = new latte.LatteEvent(this);
            }
            return this._anchorBottomVisibleChanged;
        }
        /**
         * Raises the <c>anchorBottomVisibleChanged</c> event
         */
        onAnchorBottomVisibleChanged() {
            if (this._anchorBottomVisibleChanged) {
                this._anchorBottomVisibleChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets an event raised when the value of anchorLeftVisible changed
         *
         * @returns {LatteEvent}
         */
        get anchorLeftVisibleChanged() {
            if (!this._anchorLeftVisibleChanged) {
                this._anchorLeftVisibleChanged = new latte.LatteEvent(this);
            }
            return this._anchorLeftVisibleChanged;
        }
        /**
         * Raises the <c>anchorLeftVisibleChanged</c> event
         */
        onAnchorLeftVisibleChanged() {
            if (this._anchorLeftVisibleChanged) {
                this._anchorLeftVisibleChanged.raise();
            }
            this.onLayout();
        }
        /**
         * Gets or sets the top anchor item
         *
         * @returns {Item}
         */
        get anchorTop() {
            return this._anchorTop;
        }
        /**
         * Gets or sets the top anchor item
         *
         * @param {Item} value
         */
        set anchorTop(value) {
            var changed = this._anchorTop !== value;
            // If some item previously anchored
            if (this._anchorTop instanceof latte.Item) {
                // Declass it
                this._anchorTop.removeClass('anchor');
                // Detach it
                this._anchorTop.element.detach();
            }
            this._anchorTop = value;
            if (changed) {
                if (value) {
                    value.addClass('anchor anchor-top');
                    value.appendTo(this.element);
                }
                this.onAnchorTopChanged();
            }
        }
        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @returns {boolean}
         */
        get anchorTopVisible() {
            return this._anchorTopVisible;
        }
        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @param {boolean} value
         */
        set anchorTopVisible(value) {
            var changed = this._anchorTopVisible !== value;
            this._anchorTopVisible = value;
            if (changed) {
                this.anchorTop.visible = value;
                this.onAnchorTopVisibleChanged();
            }
        }
        /**
         * Gets or sets the right anchor item
         *
         * @returns {Item}
         */
        get anchorRight() {
            return this._anchorRight;
        }
        /**
         * Gets or sets the right anchor item
         *
         * @param {Item} value
         */
        set anchorRight(value) {
            var changed = this._anchorRight !== value;
            // If some item previously anchored
            if (this._anchorRight instanceof latte.Item) {
                // Declass it
                this._anchorRight.removeClass('anchor');
                // Detach it
                this._anchorRight.element.detach();
            }
            this._anchorRight = value;
            if (changed) {
                if (value) {
                    value.addClass('anchor anchor-right');
                    value.appendTo(this.element);
                }
                this.onAnchorRightChanged();
            }
        }
        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @returns {boolean}
         */
        get anchorRightVisible() {
            return this._anchorRightVisible;
        }
        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @param {boolean} value
         */
        set anchorRightVisible(value) {
            var changed = this._anchorRightVisible !== value;
            this._anchorRightVisible = value;
            if (changed) {
                this.anchorRight.visible = value;
                this.onAnchorRightVisibleChanged();
            }
        }
        /**
         * Gets or sets the bottom anchor item
         *
         * @returns {Item}
         */
        get anchorBottom() {
            return this._anchorBottom;
        }
        /**
         * Gets or sets the bottom anchor item
         *
         * @param {Item} value
         */
        set anchorBottom(value) {
            var changed = this._anchorBottom !== value;
            // If some item previously anchored
            if (this._anchorBottom instanceof latte.Item) {
                // Declass it
                this._anchorBottom.removeClass('anchor');
                // Detach it
                this._anchorBottom.element.detach();
            }
            this._anchorBottom = value;
            if (changed) {
                if (value) {
                    value.addClass('anchor anchor-bottom');
                    value.appendTo(this.element);
                }
                this.onAnchorBottomChanged();
            }
        }
        /**
         * Gets or sets the visibility of bottom top anchor item
         *
         * @returns {boolean}
         */
        get anchorBottomVisible() {
            return this._anchorBottomVisible;
        }
        /**
         * Gets or sets the visibility of the bottom anchor item
         *
         * @param {boolean} value
         */
        set anchorBottomVisible(value) {
            var changed = this._anchorBottomVisible !== value;
            this._anchorBottomVisible = value;
            if (changed) {
                this.anchorBottom.visible = value;
                this.onAnchorBottomVisibleChanged();
            }
        }
        /**
         * Gets or sets the left item anchor
         *
         * @returns {Item}
         */
        get anchorLeft() {
            return this._anchorLeft;
        }
        /**
         * Gets or sets the left item anchor
         *
         * @param {Item} value
         */
        set anchorLeft(value) {
            var changed = this._anchorLeft !== value;
            // If some item previously anchored
            if (this._anchorLeft instanceof latte.Item) {
                // Declass it
                this._anchorLeft.removeClass('anchor');
                // Detach it
                this._anchorLeft.element.detach();
            }
            this._anchorLeft = value;
            if (changed) {
                if (value) {
                    value.addClass('anchor anchor-left');
                    value.appendTo(this.element);
                }
                this.onAnchorLeftChanged();
            }
        }
        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @returns {boolean}
         */
        get anchorLeftVisible() {
            return this._anchorLeftVisible;
        }
        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @param {boolean} value
         */
        set anchorLeftVisible(value) {
            var changed = this._anchorLeftVisible !== value;
            this._anchorLeftVisible = value;
            if (changed) {
                this.anchorLeft.visible = value;
                this.onAnchorLeftVisibleChanged();
            }
        }
    }
    latte.AnchorView = AnchorView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a view splitted in two. A <c>side</c> and the main <c>view</c>
     **/
    class SplitView extends latte.View {
        /**
         * Creates the View
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._draggingSplit = latte.Direction.NONE;
            /**
             *
             **/
            this._sensitivity = 5;
            /**
             *
             **/
            this._sideSize = 200;
            /**
             *
             **/
            this._splitterSize = 1;
            /**
             *
             */
            this._sideVisible = true;
            this.element.addClass('split');
            this.element.mousemove((e) => { this._onMouseMove(e); });
            this.element.mouseup((e) => { this._onMouseUp(e); });
            this.element.mousedown((e) => { this._onMouseDown(e); });
            // Initialize side container
            this.sideWrap = new latte.View();
            this.sideWrap.addClass('side');
            this.sideWrap.appendTo(this.element);
            // Initialize splitter
            this.splitterElement = $('<div>').addClass('splitter').appendTo(this.element);
            // Initialize side
            this._side = latte.Side.AUTO;
        }
        /**
         *
         **/
        _onMouseDown(e) {
            var sensor = this.splitterElement.rectangle().inflate(this.sensitivity, this.sensitivity);
            if (sensor.contains(e.pageX, e.pageY)) {
                if (this.side === latte.Side.TOP || this.side === latte.Side.BOTTOM) {
                    this._draggingSplit = latte.Direction.VERTICAL;
                }
                else {
                    this._draggingSplit = latte.Direction.HORIZONTAL;
                }
                latte.UiElement.disableTextSelection(this.element);
                e.stopPropagation();
                return false;
            }
            else {
                this._draggingSplit = latte.Direction.NONE;
            }
            return true;
        }
        /**
         *
         **/
        _onMouseMove(e) {
            var sensor = this.splitterElement.rectangle().inflate(this.sensitivity, this.sensitivity);
            if (this._draggingSplit === latte.Direction.NONE) {
                if (sensor.contains(e.pageX, e.pageY)) {
                    if (this.side === latte.Side.TOP || this.side === latte.Side.BOTTOM) {
                        this.element.css('cursor', 'ns-resize');
                    }
                    else {
                        this.element.css('cursor', 'ew-resize');
                    }
                }
                else {
                    this.element.css('cursor', 'default');
                }
            }
            else {
                var rect = this.element.rectangle();
                switch (this.side) {
                    case latte.Side.AUTO:
                    case latte.Side.LEFT:
                        this.sideSize = e.pageX - rect.left;
                        break;
                    case latte.Side.RIGHT:
                        this.sideSize = rect.right - e.pageX;
                        break;
                    case latte.Side.TOP:
                        this.sideSize = e.pageY - rect.top;
                        break;
                    case latte.Side.BOTTOM:
                        this.sideSize = rect.bottom - e.pageY;
                        break;
                    default:
                        throw new latte.InvalidCallEx();
                }
            }
        }
        /**
         *
         **/
        _onMouseUp(e) {
            if (this._draggingSplit !== latte.Direction.NONE) {
                latte.UiElement.enableTextSelection(this.element);
            }
            this._draggingSplit = latte.Direction.NONE;
        }
        /**
         * Updates the layout of View
         **/
        onLayout() {
            super.onLayout();
            var side = this.side;
            var sp = this.splitterSize;
            var size = this.sideSize > 1 ?
                this.sideSize :
                (side === latte.Side.TOP || side === latte.Side.BOTTOM ?
                    this.sideSize * this.element.height() :
                    this.sideSize * this.element.width());
            var start = {
                left: '',
                top: '',
                bottom: '',
                right: '',
                width: '',
                height: ''
            };
            if (!this.sideVisible) {
                size = 0;
            }
            var sideCss = $.extend({}, start);
            var splitterCss = $.extend({}, start);
            var containerCss = $.extend({}, start);
            if (side === latte.Side.TOP || side === latte.Side.BOTTOM) {
                sideCss.left = 0;
                sideCss.right = 0;
                sideCss.height = size;
                splitterCss.left = 0;
                splitterCss.right = 0;
                splitterCss.height = sp;
                containerCss.left = 0;
                containerCss.right = 0;
            }
            else {
                sideCss.top = 0;
                sideCss.bottom = 0;
                sideCss.width = size;
                splitterCss.top = 0;
                splitterCss.bottom = 0;
                splitterCss.width = sp;
                containerCss.top = 0;
                containerCss.bottom = 0;
            }
            switch (this.side) {
                case latte.Side.AUTO:
                case latte.Side.LEFT:
                    sideCss.left = 0;
                    sideCss.right = 'auto';
                    splitterCss.left = size;
                    containerCss.left = size - sp + 1; // This plus one is because a misterious padding
                    containerCss.right = 0;
                    break;
                case latte.Side.RIGHT:
                    sideCss.right = 0;
                    sideCss.left = 'auto';
                    splitterCss.right = size;
                    containerCss.right = size + sp;
                    containerCss.top = 0;
                    break;
                case latte.Side.TOP:
                    sideCss.top = 0;
                    sideCss.bottom = 'auto';
                    splitterCss.top = size;
                    containerCss.top = size - sp;
                    containerCss.bottom = 0;
                    break;
                case latte.Side.BOTTOM:
                    sideCss.bottom = 0;
                    sideCss.top = 'auto';
                    splitterCss.bottom = size;
                    containerCss.bottom = size + sp;
                    containerCss.top = 0;
                    break;
                default:
                    throw new latte.InvalidCallEx();
            }
            this.sideWrap.element.css(sideCss);
            this.splitterElement.css(splitterCss);
            this.container.css(containerCss);
            this.sideWrap.onLayout();
        }
        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        get sensitivity() {
            return this._sensitivity;
        }
        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        set sensitivity(value) {
            this._sensitivity = value;
        }
        /**
         * Gets or sets the side of the side view
         **/
        get side() {
            return this._side;
        }
        /**
         * Gets or sets the side of the side view
         **/
        set side(value) {
            this._side = value;
            this.onLayout();
        }
        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        get sideSize() {
            return this._sideSize;
        }
        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        set sideSize(value) {
            this._sideSize = value;
            this.onLayout();
        }
        /**
         * Gets or sets the side <c>View</c>
         **/
        get sideView() {
            return this.sideWrap.view;
        }
        /**
         * Gets or sets the side <c>View</c>
         **/
        set sideView(value) {
            this.sideWrap.view = value;
        }
        /**
         * Sets a value indicating if side is currently visible
         * @returns {boolean}
         */
        get sideVisible() {
            return this._sideVisible;
        }
        /**
         * Gets a value indicating if side is currently visible
         * @param value
         */
        set sideVisible(value) {
            this._sideVisible = value;
            if (value) {
                this.sideWrap.element.show();
            }
            else {
                this.sideWrap.element.hide();
            }
            this.onLayout();
        }
        /**
         * Gets or sets the wide of the splitterElement
         **/
        get splitterSize() {
            return this._splitterSize;
        }
        /**
         * Gets or sets the wide of the splitterElement
         **/
        set splitterSize(value) {
            this._splitterSize = value;
            this.onLayout();
        }
    }
    latte.SplitView = SplitView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a square Icon.

     Icons may be come from a single image, or from a sprite image with several icons.
     <c>IconItem</c> comes with a default sprite built in with a wide variety of icons.
     **/
    class IconItem extends latte.Item {
        //endregion
        /**
         * Creates the icon
         **/
        constructor() {
            super();
            //endregion
            //region Properties
            /**
             *
             **/
            this._name = '';
            /**
             *
             **/
            this._size = 16;
            this.element.addClass('icon');
            if (IconItem.defaultUrl !== null)
                this.url = IconItem.defaultUrl;
            // Initalize size
            this.size = this._size;
        }
        //region Static
        /**
         * Default URL of sprite used if coordinates are specified, and no <c>url</c> is provided.
         **/
        static get defaultUrl() {
            return latte._latteUrl() + '/releases/latte.ui/support/imgs/std-icons.png';
        }
        /**
         * Creates an empty icon of the specified size
         **/
        static empty(size) {
            var icon = new IconItem();
            icon.size = size;
            icon.url = null;
            return icon;
        }
        /**
         * Gets a standard icon of the specified u and v coordinates. Size 16.
         **/
        static standard(u, v, size = 16) {
            var icon = new IconItem();
            icon.u = u;
            icon.v = v;
            icon.size = size;
            return icon;
        }
        /**
         *
         * @returns {IconItem}
         */
        static fileIcon() {
            return IconItem.standard(2, 1);
        }
        /**
         *
         * @returns {IconItem}
         */
        static folderIcon() {
            return IconItem.standard(5, 1);
        }
        /**
         *
         * @returns {IconItem}
         */
        static homeIcon() {
            return IconItem.standard(11, 1);
        }
        /**
         *
         * @returns {IconItem}
         */
        static newIcon() {
            return IconItem.standard(3, 3);
        }
        /**
         *
         * @returns {IconItem}
         */
        static saveIcon() {
            return IconItem.standard(4, 2);
        }
        /**
         *
         * @returns {IconItem}
         */
        static refreshIcon() {
            return IconItem.standard(1, 4);
        }
        /**
         *
         * @returns {IconItem}
         */
        static editIcon() {
            return IconItem.standard(14, 8);
        }
        /**
         *
         * @returns {IconItem}
         */
        static deleteIcon() {
            return IconItem.standard(9, 1);
        }
        //region Methods
        /**
         * Returns a clone of the icon
         **/
        clone() {
            var icon = new IconItem();
            icon.name = this.name;
            icon.size = this.size;
            icon.url = this.url;
            icon.x = this.x;
            icon.y = this.y;
            return icon;
        }
        /**
         * Gets or sets the name of the icon
         **/
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the name of the icon
         **/
        set name(value) {
            this._name = value;
        }
        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        get size() {
            return this._size;
        }
        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        set size(value) {
            //if(value != 16 && value != 32 && value != 48)
            //    throw "Icon.size(" + value + ") size not supported";
            // Set size attributes
            this.element.width(value).height(value);
            this._size = value;
            if (latte._isNumber(this.u))
                this.u = this.u;
            if (latte._isNumber(this.v))
                this.v = this.v;
            this.addClass('size-' + value);
        }
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        get u() {
            return this._u;
        }
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        set u(value) {
            this._u = value;
            this.x = (value - 1) * this.size;
        }
        /**
         * Gets or sets the URL of the icon's image URL
         **/
        get url() {
            return this._url;
        }
        /**
         * Gets or sets the URL of the icon's image URL
         **/
        set url(value) {
            if (latte._isString(value) && value.length > 0) {
                this.element.css({
                    backgroundImage: 'url(' + value + ')',
                    backgroundRepeat: 'no-repeat'
                });
            }
            else {
                this.element.css({
                    backgroundImage: '',
                    backgroundRepeat: ''
                });
            }
            this._url = value;
        }
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        get v() {
            return this._v;
        }
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        set v(value) {
            this._v = value;
            this.y = (value - 1) * this.size;
        }
        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        get x() {
            return this._x;
        }
        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        set x(value) {
            this._x = value;
            this.element.css('background-position', (this._x !== null ? '-' + this._x : '0') + "px " + (this._y !== null ? '-' + this._y : '0') + "px");
        }
        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        get y() {
            return this._y;
        }
        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        set y(value) {
            this._y = value;
            this.element.css('background-position', (this._x !== null ? '-' + this._x : '0') + "px " + (this._y !== null ? '-' + this._y : '0') + "px");
        }
    }
    latte.IconItem = IconItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents an item which can be apparently clicked.

     - Item may be checked, event automatically if <c>checked()</c> value is <c>true</c>
     - Item may be selected, when user hovers over it, if <c>selectable()</c> value is <c>true</c>
     - Item may be pressed, when user holds the mouse button down.
     - Item may be withContext, when its showing contextual data, like a menu or a tab's content
     **/
    class ClickableItem extends latte.Item {
        /**
         *
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._contextAt = null;
            /**
             *
             **/
            this._selectable = true;
            //endregion
            //region Props
            /**
             * Property field
             */
            this._defaulted = false;
            this.element.addClass('clickable');
            // Init events
            this.checkedChanged = new latte.LatteEvent(this);
            this.click = new latte.LatteEvent(this);
            this.faceVisibleChanged = new latte.LatteEvent(this);
            this.pressedChanged = new latte.LatteEvent(this);
            this.selectedChanged = new latte.LatteEvent(this);
            this.withContextChanged = new latte.LatteEvent(this);
            // Init this
            this.faceVisible = true;
            // Wire events
            this.element
                .hover(() => {
                if (this.selectable && this.enabled) {
                    this.selected = true;
                }
            }, () => {
                if (this.selectable && this.enabled) {
                    this.selected = false;
                }
                this.pressed = false;
            })
                .mousedown(() => {
                if (this.enabled) {
                    this.pressed = true;
                }
            })
                .mouseup(() => {
                if (this.enabled) {
                    this.pressed = false;
                    this.selected = false;
                }
            })
                .click((e) => {
                if (this.enabled) {
                    this.onClick();
                    if (!this.clickPropagation) {
                        e.stopPropagation();
                        return false;
                    }
                }
                return undefined;
            });
        }
        /**
         * Returns the value of the checked property
         **/
        getChecked() {
            return this._checked;
        }
        /**
         *
         **/
        getContextAt() {
            return this._contextAt;
        }
        /**
         *
         **/
        getSelected() {
            return this._selected;
        }
        /**
         * Override
         */
        onBlur() {
            super.onBlur();
            this.selected = false;
        }
        /**
         * Raises the <c>checkedChanged</c> event
         **/
        onCheckedChanged() {
            this.checkedChanged.raise();
        }
        /**
         * Raises the <c>click</c> event
         **/
        onClick() {
            if (this.checkable) {
                this.checked = !this.checked;
            }
            this.click.raise(this);
        }
        /**
         * Raises the <c>defaulted</c> event
         */
        onDefaultedChanged() {
            if (this._defaultedChanged) {
                this._defaultedChanged.raise();
            }
            if (this.defaulted) {
                this.addClass('defaulted');
            }
            else {
                this.removeClass('defaulted');
            }
        }
        /**
         * Overriden. Raises the <c>enabledChanged</c> event
         **/
        onEnabledChanged() {
            super.onEnabledChanged();
            this.selected = false;
            this.pressed = false;
        }
        /**
         * Raises the <c>faceVisibleChanged</c> event
         **/
        onFaceVisibleChanged() {
            this.faceVisibleChanged.raise();
        }
        /**
         * Override
         */
        onFocused() {
            super.onFocused();
            this.selected = true;
        }
        /**
         * Raises the <c>pressedChanged</c> event
         **/
        onPressedChanged() {
            this.pressedChanged.raise();
        }
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged() {
            this.selectedChanged.raise();
        }
        /**
         * Raises the <c>withContextChanged</c> event
         **/
        onWithContextChanged() {
            this.withContextChanged.raise();
        }
        /**
         * Sets a value indicating if the item is currently checked.
         Optionally omits the <c>checkedChanged</c> event trigger.
         **/
        setChecked(value, silent = false) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._checked;
            this._checked = value;
            if (value) {
                this.element.addClass('checked');
            }
            else {
                this.element.removeClass('checked');
            }
            if (changed && silent !== true) {
                this.onCheckedChanged();
            }
        }
        /**
         *
         **/
        setContextAt(value) {
            this.openSide = value;
            this.flatSide = value;
            this.withContext = value !== null;
            this._contextAt = value;
        }
        /**
         *
         **/
        setSelected(value, silent = false) {
            var changed = value != this._selected;
            this._selected = value;
            if (value) {
                this.element.addClass('selected');
            }
            else {
                this.element.removeClass('selected');
            }
            if (changed && silent !== true) {
                this.onSelectedChanged();
            }
        }
        /**
         * Gets an event raised when the value of the defaulted property changes
         *
         * @returns {LatteEvent}
         */
        get defaultedChanged() {
            if (!this._defaultedChanged) {
                this._defaultedChanged = new latte.LatteEvent(this);
            }
            return this._defaultedChanged;
        }
        /**
         * Gets or sets a value indicating if the item is defaulted (Will recieve enter when pressed)
         *
         * @returns {boolean}
         */
        get defaulted() {
            return this._defaulted;
        }
        /**
         * Gets or sets a value indicating if the item is defaulted (Will recieve enter when pressed)
         *
         * @param {boolean} value
         */
        set defaulted(value) {
            // Check if value changed
            var changed = value !== this._defaulted;
            // Set value
            this._defaulted = value;
            // Trigger changed event
            if (changed) {
                this.onDefaultedChanged();
            }
        }
        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        get checkable() {
            return this._checkable;
        }
        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        set checkable(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._checkable = value;
        }
        /**
         * Gets or sets the checked state of the clickable
         **/
        get checked() {
            return this.getChecked();
        }
        /**
         * Gets or sets the checked state of the clickable
         **/
        set checked(value) {
            this.setChecked(value);
        }
        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        get clickPropagation() {
            return this._clickPropagation;
        }
        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        set clickPropagation(value) {
            this._clickPropagation = value;
        }
        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        get contextAt() {
            return this.getContextAt();
        }
        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        set contextAt(value) {
            this.setContextAt(value);
        }
        /**
         * Gets or sets the visibility of the button face
         **/
        get faceVisible() {
            return this.getFaceVisible();
        }
        /**
         *
         **/
        getFaceVisible() {
            return this._faceVisible;
        }
        /**
         * Sets a value indicating if the item's face is currently visible.
         **/
        setFaceVisible(value = false, silent = false) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value !== this._faceVisible;
            this._faceVisible = value;
            if (value) {
                this.element.addClass('with-face');
            }
            else {
                this.element.removeClass('with-face');
            }
            if (changed && silent !== true) {
                this.onFaceVisibleChanged();
            }
        }
        /**
         * Gets or sets the visibility of the button face
         **/
        set faceVisible(value) {
            this.setFaceVisible(value);
        }
        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        get flatSide() {
            return this._flatSide;
        }
        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        set flatSide(value) {
            this._flatSide = value;
            // Remove other flat sides
            this.element.removeClass('flat-bottom flat-right flat-left flat-top');
            if ((value & latte.Side.BOTTOM) == latte.Side.BOTTOM)
                this.element.addClass('flat-bottom');
            if ((value & latte.Side.RIGHT) == latte.Side.RIGHT)
                this.element.addClass('flat-right');
            if ((value & latte.Side.LEFT) == latte.Side.LEFT)
                this.element.addClass('flat-left');
            if ((value & latte.Side.TOP) == latte.Side.TOP)
                this.element.addClass('flat-top');
        }
        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        get openSide() {
            return this._openSide;
        }
        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        set openSide(value) {
            this._openSide = value;
            // Remove other flat sides
            this.element.removeClass('open-at-bottom open-at-right open-at-left open-at-top');
            if ((value & latte.Side.BOTTOM) == latte.Side.BOTTOM)
                this.element.addClass('open-at-bottom');
            if ((value & latte.Side.RIGHT) == latte.Side.RIGHT)
                this.element.addClass('open-at-right');
            if ((value & latte.Side.LEFT) == latte.Side.LEFT)
                this.element.addClass('open-at-left');
            if ((value & latte.Side.TOP) == latte.Side.TOP)
                this.element.addClass('open-at-top');
        }
        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        get pressed() {
            return this._pressed;
        }
        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        set pressed(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._pressed;
            this._pressed = value;
            if (value) {
                this.element.addClass('pressed');
            }
            else {
                this.element.removeClass('pressed');
            }
            if (changed) {
                this.onPressedChanged();
            }
        }
        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        get selectable() {
            return this._selectable;
        }
        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        set selectable(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._selectable = value;
        }
        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        get selected() {
            return this.getSelected();
        }
        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        set selected(value) {
            this.setSelected(value);
        }
        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        get withContext() {
            return this._withContext;
        }
        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        set withContext(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._withContext;
            this._withContext = value;
            if (value) {
                this.element.addClass('with-context');
            }
            else {
                this.element.removeClass('with-context');
            }
            if (changed) {
                this.onWithContextChanged();
            }
        }
    }
    latte.ClickableItem = ClickableItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a single label
     **/
    class LabelItem extends latte.Item {
        /**
         *
         **/
        constructor(text = '', description = '', icon = null, title = 0) {
            super();
            /**
             *
             */
            this._iconAndTextPadding = 0;
            /**
             *
             **/
            this._preformatted = true;
            this.element.addClass('label');
            // Init events
            this.descriptionChanged = new latte.LatteEvent(this);
            this.iconChanged = new latte.LatteEvent(this);
            this.textChanged = new latte.LatteEvent(this);
            this.navigate = new latte.LatteEvent(this);
            // Init elements
            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.contentElement = $('<div>').addClass('label-content').appendTo(this.element);
            this.textElement = $('<div>').addClass('text').appendTo(this.contentElement);
            this.descriptionElement = $('<div>').addClass('description').appendTo(this.contentElement);
            this.element.clear();
            // Init this item
            this.direction = latte.Direction.HORIZONTAL;
            this.element.click(() => {
                if (this.linkStyle) {
                    this.onNavigate();
                }
            });
            this.text = text;
            this.description = description;
            this.icon = icon;
            this.title = title;
        }
        /**
         * Updates the <c>.icon-and-text</c> flag.
         Also updates margin of label-cotent
         **/
        updateIconAndTextFlag() {
            if (this.icon instanceof latte.IconItem && (this.text || this.description || this.textElement.children().length > 0 || this.descriptionElement.children().length > 0)) {
                this.element.addClass('icon-and-text');
            }
            else {
                this.element.removeClass('icon-and-text');
            }
            if (this.element.hasClass('icon-and-text') && this.direction == latte.Direction.HORIZONTAL && this.icon) {
                this.contentElement.css({ marginLeft: this.icon.size + this.iconAndTextPadding });
            }
            else {
                this.contentElement.css({ marginLeft: '' });
            }
        }
        /**
         * Updates the <c>white-space</c> CSS property
         **/
        _updateWhitespace() {
            var p = this.preformatted;
            var w = this.textWrap;
            if (p) {
                if (w) {
                    this.contentElement.css('white-space', 'pre-wrap');
                }
                else {
                    this.contentElement.css('white-space', 'pre');
                }
            }
            else {
                this.contentElement.css('whiteSpace', 'normal');
            }
        }
        /**
         * Raises the <c>descriptionChanged</c> event
         **/
        onDescriptionChanged() {
            this.descriptionChanged;
        }
        /**
         * Raises the <c>iconChanged</c> event
         **/
        onIconChanged() {
            this.iconChanged.raise();
        }
        /**
         * Raises the <c>navigate</c> event
         **/
        onNavigate() {
            this.navigate.raise();
        }
        /**
         * Raises the <c>textChanged</c> event
         **/
        onTextChanged() {
            this.textChanged.raise();
        }
        /**
         * Gets or sets the description of label, shown below the text.
         **/
        get description() {
            return this.descriptionElement.html();
        }
        /**
         * Gets or sets the description of label, shown below the text.
         **/
        set description(value) {
            this.descriptionElement.html(value);
            this.updateIconAndTextFlag();
            this.onDescriptionChanged();
        }
        /**
         * Gets or sets the direction of the label
         **/
        get direction() {
            return this._direction;
        }
        /**
         * Gets or sets the direction of the label
         **/
        set direction(value) {
            if (value != latte.Direction.VERTICAL && value != latte.Direction.HORIZONTAL)
                throw new latte.InvalidArgumentEx('value', value);
            if (value == latte.Direction.VERTICAL) {
                this.element.removeClass('horizontal').addClass('vertical');
            }
            else {
                this.element.removeClass('vertical').addClass('horizontal');
            }
            this._direction = value;
            this.updateIconAndTextFlag();
        }
        /**
         * Gets or sets the icon of the label
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the icon of the label
         **/
        set icon(value) {
            if (value != null && !(value instanceof latte.IconItem))
                throw new latte.InvalidArgumentEx('value', value);
            this._icon = value;
            this.iconElement.empty();
            if (value) {
                this.iconElement.append(value.element);
            }
            this.updateIconAndTextFlag();
            this.onIconChanged();
        }
        get iconAndTextPadding() {
            return this._iconAndTextPadding;
        }
        set iconAndTextPadding(value) {
            this._iconAndTextPadding = value;
            this.updateIconAndTextFlag();
        }
        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        get linkStyle() {
            return this._linkStyle;
        }
        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        set linkStyle(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value');
            this._linkStyle = value;
            if (value)
                this.addClass('link-style');
            else
                this.removeClass('link-style');
        }
        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        get preformatted() {
            return this._preformatted;
        }
        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        set preformatted(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._preformatted = value;
            this._updateWhitespace();
        }
        /**
         * Gets or sets the text of the label. This text may include HTML.
         **/
        get text() {
            return this.textElement.html();
        }
        /**
         * Gets or sets the text of the label. This text may include HTML.
         **/
        set text(value) {
            this.textElement.html(value);
            this.updateIconAndTextFlag();
            this.onTextChanged();
        }
        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        get textWrap() {
            return this._textWrap;
        }
        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        set textWrap(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._textWrap = value;
            this._updateWhitespace();
        }
        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        get title() {
            return this._title;
        }
        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        set title(value) {
            if (!latte._isNumber(value) || (value < 0 && value > 5))
                throw new latte.InvalidArgumentEx('value');
            this.element.removeClass('title-1 title-2 title-3');
            if (value > 0)
                this.element.addClass('title-' + value);
            this._title = value;
        }
    }
    latte.LabelItem = LabelItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Group of buttons.

     By default ButtonGroupItem doesn't allow to have multiple buttons checked at
     once, this can be altered by using the <c>multiCheck</c> method
     **/
    class ButtonGroupItem extends latte.Item {
        /**
         * Creates the Button Group. Optionally adds the buttons to the group
         **/
        constructor(buttons = null) {
            super();
            /**
             *
             **/
            this._faceVisible = true;
            this.element.addClass('button-group');
            this.checkedChanged = new latte.LatteEvent(this);
            this.buttons = new latte.Collection(this._onAddButton, this._onRemoveButton, this);
            this._direction = latte.Direction.HORIZONTAL;
            if (buttons) {
                this.buttons.addArray(buttons);
            }
        }
        /**
         *
         **/
        _checkCheck(checkedButton) {
            if (this.multiCheck) {
                return;
            }
            this.buttons.each(function (b) {
                if (b != checkedButton) {
                    b.setChecked(false, true);
                }
                else {
                    this._checkedButton = b;
                }
            });
            this.onCheckedChanged();
        }
        /**
         *
         **/
        _onAddButton(button) {
            var __this = this;
            this.element.append(button.element);
            button.faceVisible = this.faceVisible;
            button.checkedChanged.add(function () { __this._checkCheck(this); });
            this._update();
        }
        /**
         *
         **/
        _onRemoveButton(button) {
            button.element.detach();
            this._update();
        }
        /**
         *
         **/
        _update() {
            var faces = this.element.find('.latte-item.clickable');
            var maxh = 0;
            var maxw = 0;
            var i = 0;
            // Clear corners
            faces.css({
                'border-top-right-radius': 0,
                'border-bottom-right-radius': 0,
                'border-top-left-radius': 0,
                'border-bottom-left-radius': 0
            });
            if (this.buttons.count > 0) {
                if (this.direction == latte.Direction.HORIZONTAL) {
                    // Last button
                    this.buttons.last.element.css({
                        'border-top-right-radius': 4,
                        'border-bottom-right-radius': 4
                    });
                    // First button corners
                    this.buttons.first.element.css({
                        'border-top-left-radius': 4,
                        'border-bottom-left-radius': 4
                    });
                    for (i = 0; i < this.buttons.count; i++) {
                        if (i > 0)
                            this.buttons.item(i).element.css('marginLeft', -1);
                        maxh = Math.max(maxh, this.buttons.item(i).element.height());
                    }
                    if (maxh > 0)
                        this.element.find('.latte-item > .face').height(maxh);
                    this.element.find('.latte-item.button').css('float', 'left');
                }
                else {
                    // Last button
                    this.buttons.last.element.css({
                        'border-bottom-right-radius': 4,
                        'border-bottom-left-radius': 4
                    });
                    // First button corners
                    this.buttons.first.element.css({
                        'border-top-right-radius': 4,
                        'border-top-left-radius': 4
                    });
                    for (i = 0; i < this.buttons.count; i++) {
                        //if(i > 0)
                        this.buttons.item(i).element.css('marginBottom', -1);
                        maxw = Math.max(maxw, this.buttons.item(i).element.width());
                    }
                    if (maxh > 0)
                        this.element.find('.latte-item > .face').width(maxw);
                    this.element.find('.latte-item.button').css('float', 'none');
                }
            }
        }
        /**
         * Raises the <c>checkedChanged</c>
         **/
        onCheckedChanged() {
            this.checkedChanged.raise();
        }
        /**
         * Overriden.
         **/
        onEnabledChanged() {
            super.onEnabledChanged();
            var __this = this;
            this.buttons.each(function (b) {
                b.enabled = __this.enabled;
            });
        }
        /**
         * Overriden.
         **/
        onLayout() {
            super.onLayout();
            this._update();
        }
        /**
         * Gets the checked button of the group
         **/
        get checkedButton() {
            return this._checkedButton;
        }
        /**
         * Gets the checked button of the group
         **/
        set checkedButton(value) {
            if (!(value instanceof latte.ButtonItem))
                throw new latte.InvalidArgumentEx('value', value);
            value.checked = true;
        }
        /**
         * Gets or sets the direction of the groups
         **/
        get direction() {
            return this._direction;
        }
        /**
         * Gets or sets the direction of the groups
         **/
        set direction(value) {
            this._direction = value;
            this._update();
        }
        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        get faceVisible() {
            return this._faceVisible;
        }
        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        set faceVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value');
            this._faceVisible = value;
            // Update buttons
            this.buttons.each(function (b) { b.faceVisible = value; });
        }
        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        get multiCheck() {
            return this._multiCheck;
        }
        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        set multiCheck(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._multiCheck = value;
        }
    }
    latte.ButtonGroupItem = ButtonGroupItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a clickable button.

     Button may obtain different render modes, sub items who are shown in a
     contextual menu and react to its icon size.
     **/
    class ButtonItem extends latte.ClickableItem {
        /**
         * Creates the button
         **/
        constructor(text = '', icon = null, click = null, tab = null) {
            // Init
            super();
            this.element.addClass('button');
            latte.UiElement.disableTextSelection(this.element);
            // Init collection
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            // Init Events
            this.loadItems = new latte.LatteEvent(this);
            this.itemsShown = new latte.LatteEvent(this);
            // Init Elements
            this.label = new latte.LabelItem();
            this.label.appendTo(this);
            this.element.clear();
            this.itemsEdge = latte.Side.AUTO;
            this.itemsSide = latte.Side.AUTO;
            this.direction = latte.Direction.HORIZONTAL;
            this.split = false;
            // Patch for split case
            this.element.hover(() => {
                if (this.split && !this.faceVisible) {
                    this.element.addClass('with-face');
                    this.dropdown.element.addClass('with-face');
                }
            }, () => {
                if (this.split && this.contextAt == null) {
                    this.element.removeClass('with-face');
                    this.dropdown.element.removeClass('with-face');
                    this.dropdown.setSelected(false, true);
                }
            });
            this.label.descriptionChanged.add(() => { this._updateLabelFlag(); });
            this.label.iconChanged.add(() => { this._updateLabelFlag(); });
            this.label.textChanged.add(() => { this._updateLabelFlag(); });
            this.text = text;
            this.icon = icon;
            if (click)
                this.click.add(click);
            this.tab = tab;
        }
        /**
         * Handles drop down click
         **/
        _dropdownClick() {
            if (this.dropdownVisible && !this.split) {
                this.onClick();
            }
            if (this.split) {
                this._showOrHideItems();
            }
        }
        /**
         * Handles dropdown pressedChanged
         **/
        _dropdownPressedChanged() {
        }
        /**
         * Handles dropdown selectedChanged
         **/
        _dropdownSelectedChanged() {
            if (this.dropdownVisible && this.selected && !this.dropdown.selected) {
                this.dropdown.selected = true;
            }
            if (this.split) {
                this.setSelected(!this.dropdown.selected, true);
            }
        }
        /**
         * Handles item add
         **/
        _onAddItem(item) {
            // If indeterminate dropdown visiblitiy
            if (this.dropdownVisible !== false) {
                // Make dropdown visible
                this.dropdownVisible = true;
                // Assign default glyph
                if (this.glyph == null) {
                    this.glyph = latte.Glyph[ButtonItem.defaultGlyph];
                }
            }
            this.clickPropagation = false;
        }
        /**
         * Handles item remove
         **/
        _onRemoveItem(item) {
        }
        /**
         * Alternates between items visibility
         **/
        _showOrHideItems() {
            if (this.showingItems)
                this.hideItems();
            else
                this.showItems();
        }
        /**
         * Updates edges of dropdown clickable
         **/
        _updateDropdownProperties() {
            var openSide = this.direction == latte.Direction.VERTICAL ?
                latte.Side.TOP : latte.Side.LEFT;
            this.dropdown.flatSide = openSide;
            if (this.split) {
                this.dropdown.openSide = null;
            }
            else {
                this.dropdown.openSide = openSide;
            }
        }
        /**
         * Checks for the formatting CSS flags
         **/
        _updateLabelFlag() {
            if (!this.label.icon) {
                this.element.addClass('no-icon');
            }
            else {
                this.element.removeClass('no-icon');
            }
        }
        createDropdownButton() {
            // Initialize properties
            this._dropdown = new latte.ClickableItem();
            this._dropdown.appendTo(this);
            this._dropdown.visible = false;
            this._dropdown.clickPropagation = false;
            // Wire events
            this._dropdown.selectedChanged.add(() => { this._dropdownSelectedChanged(); });
            this._dropdown.pressedChanged.add(() => { this._dropdownPressedChanged(); });
            this._dropdown.click.add(() => { this._dropdownClick(); });
        }
        /**
         *
         **/
        getContextAt() {
            if (this.split) {
                return this.dropdown.contextAt;
            }
            else {
                return super.getContextAt();
            }
        }
        /**
         * Returns a value indicating if the button contains items or will load them eventually
         **/
        get hasItems() {
            return this.items.count > 0 || this.willLoadItems;
        }
        /**
         * Hides the MenuOverlay showing this button's items
         **/
        hideItems() {
            if (!this._itemsMenu)
                return;
            this.itemsMenu.close();
            this._itemsMenu = null;
            var item;
            while ((item = this.items.next())) {
                if (item instanceof ButtonItem)
                    item.hideItems();
            }
        }
        /**
         * Overriden.
         **/
        onClick() {
            if (!(this.hasItems && !this.split)) {
                super.onClick();
            }
            if (!this.split && this.hasItems) {
                this._showOrHideItems();
            }
        }
        /**
         * Overriden.
         **/
        onFaceVisibleChanged() {
            super.onFaceVisibleChanged();
            this.dropdown.faceVisible = this.faceVisible;
        }
        /**
         * Raises the <c>itemsShown</c> event
         **/
        onItemsShown(menuItem) {
            this.itemsShown.raise(menuItem);
        }
        /**
         * Overriden.
         **/
        onPressedChanged() {
            super.onPressedChanged();
            if (this.dropdownVisible && !this.split && !this.contextAt) {
                this.dropdown.pressed = this.pressed;
            }
        }
        /**
         * Overriden.
         **/
        onSelectedChanged() {
            super.onSelectedChanged();
            if (this.dropdownVisible && !this.split) {
                this.dropdown.selected = this.selected;
            }
            if (this.showingItems && this.selected) {
                this.selected = false;
            }
            if (this.split) {
                if (this.selected) {
                    this.dropdown.element.addClass('with-face');
                }
                else {
                    this.dropdown.element.removeClass('with-face');
                }
            }
        }
        /**
         * Overriden.
         **/
        onWithContextChanged() {
            super.onWithContextChanged();
            if (this.dropdownVisible && !this.split) {
                this.dropdown.withContext = this.withContext;
            }
        }
        /**
         *
         **/
        setContextAt(value) {
            if (this.split) {
                this.dropdown.contextAt = value;
                if (value === null) {
                    this.direction = this.direction;
                    if (!this.faceVisible) {
                        this.element.removeClass('with-face');
                        this.dropdown.element.removeClass('with-face');
                        this.dropdown.setSelected(false, true);
                    }
                }
            }
            else {
                super.setContextAt(value);
            }
        }
        /**
         * Shows the items of the button. Optionally specifies the side and edge on which items are shown.
         **/
        showItems(side = null, edge = null) {
            if (this.parentIsMenu) {
                this.parentMenu.closeChildrenMenus();
            }
            else {
                latte.MenuOverlay.closeAll();
            }
            if (!side)
                side = this.itemsSide;
            if (!edge)
                edge = this.itemsEdge;
            // Create menu
            var menu = new latte.MenuOverlay();
            // Set menu items
            this._itemsMenu = menu;
            if (this.willLoadItems) {
                this.loadItems.raise();
            }
            // Add items
            menu.items.addCollection(this.items);
            // If side set to auto
            if (side === latte.Side.AUTO) {
                // Can infere from glpyh?
                if (this.glyph && !latte._undef(latte.Side[this.glyph.name.toUpperCase()])) {
                    side = latte.Side[this.glyph.name.toUpperCase()];
                }
                else {
                    side = latte.Side.BOTTOM;
                }
            }
            if (this.split && !this.faceVisible) {
                this.element.addClass('with-face');
            }
            // Check orientation fix
            if (side == latte.Side.AUTO && this.split) {
                edge = latte.Side.RIGHT;
            }
            // Show relative to the control
            menu.show(this, side, edge);
            // When closed, remove zIndex
            menu.closed.add(() => {
                latte.ZIndex.removeElement(this.element);
                if (this.split && !this.faceVisible) {
                    this.element.removeClass('with-face');
                }
            });
            // Hook parent button
            menu.setParentButton(this);
            //m.bringToFront();
            //this.bringToFront();
            latte.ZIndex.bringToFront(this.element);
            //this.element.bringToFront();
            this.onItemsShown(menu);
        }
        /**
         * Gets or sets the description of the button
         **/
        get description() {
            return this.label.description;
        }
        /**
         * Gets or sets the description of the button
         **/
        set description(value) {
            this.label.description = value;
        }
        /**
         * Gets or sets the direction of the button.
         **/
        get direction() {
            return this.label.direction;
        }
        /**
         * Gets or sets the direction of the button.
         **/
        set direction(value) {
            this.label.direction = value;
            if (value == latte.Direction.VERTICAL) {
                this.element.removeClass('horizontal').addClass('vertical');
            }
            else {
                this.element.removeClass('vertical').addClass('horizontal');
            }
            this._updateDropdownProperties();
        }
        get dropdown() {
            if (!this._dropdown) {
                // Initialize properties
                this._dropdown = new latte.ClickableItem();
                this._dropdown.appendTo(this);
                this._dropdown.visible = false;
                //                this._dropdown.clickPropagation  = false;
                // Wire events
                this._dropdown.selectedChanged.add(() => { this._dropdownSelectedChanged(); });
                this._dropdown.pressedChanged.add(() => { this._dropdownPressedChanged(); });
                this._dropdown.click.add(() => { this._dropdownClick(); });
            }
            return this._dropdown;
        }
        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        get dropdownVisible() {
            return this._dropdownVisible;
        }
        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        set dropdownVisible(value) {
            this._dropdownVisible = value;
            this.dropdown.visible = !!value;
            if (!!value) {
                this.element.addClass('with-dropdown');
            }
            else {
                this.element.removeClass('with-dropdown');
            }
        }
        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        get glyph() {
            return this._glyph;
        }
        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        set glyph(value) {
            if (value && !(value instanceof latte.IconItem))
                throw new latte.InvalidArgumentEx('value', value);
            this._glyph = value;
            this.dropdown.element.empty();
            if (value) {
                this.dropdown.element.append(value.element);
            }
        }
        /**
         * Gets or sets the icon of the button
         **/
        get icon() {
            return this.label.icon;
        }
        /**
         * Gets or sets the icon of the button
         **/
        set icon(value) {
            this.label.icon = value;
        }
        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        get itemsEdge() {
            return this._itemsEdge;
        }
        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        set itemsEdge(value) {
            this._itemsEdge = value;
        }
        /**
         * Gets the MenuOverlay containing items, If currently being shown
         **/
        get itemsMenu() {
            return this._itemsMenu;
        }
        /**
         * Sets the menu containing the items.
         * SET BY CODE, you should not use this method.
         *
         * @param value
         */
        set itemsMenu(value) {
            this._itemsMenu = value;
        }
        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        get itemsSide() {
            return this._itemsSide;
        }
        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        set itemsSide(value) {
            this._itemsSide = value;
        }
        /**
         * Gets a boolean indicating if the items menu is currently showing
         **/
        get showingItems() {
            return this.itemsMenu ? true : false;
        }
        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        get split() {
            return this._split;
        }
        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        set split(value) {
            this._split = value;
            if (value) {
                this.element.addClass('split');
            }
            else {
                this.element.removeClass('split');
            }
            this._updateDropdownProperties();
        }
        /**
         * Gets or sets the text of the button
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets or sets the text of the button
         **/
        set text(value) {
            this.label.text = value;
        }
        /**
         * Gets a flag indicating if the button will load items before showing them
         **/
        get willLoadItems() {
            return latte._isArray(this.loadItems.handlers) && this.loadItems.handlers.length ? true : false;
        }
    }
    /**
     * Name of default glyph of buttons. This name must match a method name
     in the <c>Glyph</c> class.
     **/
    ButtonItem.defaultGlyph = 'down';
    latte.ButtonItem = ButtonItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows items in a strip
     **/
    class Toolbar extends latte.Item {
        /**
         * Creates the Toolbar
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('toolbar');
            latte.UiElement.disableTextSelection(this.element);
            // Events
            this.itemsChanged = new latte.LatteEvent(this);
            this.sideItemsChanged = new latte.LatteEvent(this);
            // Init elements
            this.faceElement = $('<div>').addClass('face').appendTo(this.element);
            this.holderElement = $('<div>').addClass('holder').appendTo(this.faceElement);
            this.itemsElement = $('<div>').addClass('items-container').appendTo(this.holderElement);
            this.sideItemsElement = $('<div>').addClass('side-items-container').appendTo(this.holderElement);
            this.faceElement.clear();
            // Initialize collection
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            this.sideItems = new latte.Collection(this._onAddSideItem, this._onRemoveSideItem, this);
            this.direction = latte.Direction.HORIZONTAL;
            this.faceVisible = true;
        }
        /**
         *
         **/
        _onAddItem(item) {
            if (item instanceof latte.ButtonItem) {
                item.faceVisible = false;
            }
            item.appendTo(this.itemsElement);
            // Apply padding
            if (this.padding)
                item.element.css('marginRight', this.padding);
            this.onItemsChanged();
        }
        /**
         *
         **/
        _onAddSideItem(item) {
            if (item instanceof latte.ButtonItem) {
                item.faceVisible = false;
            }
            item.appendTo(this.sideItemsElement);
            // Apply padding
            if (this.padding)
                item.element.css('marginRight', this.padding);
            this.onSideItemsChanged();
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item.element.detach();
            this.onItemsChanged();
        }
        /**
         *
         **/
        _onRemoveSideItem(item) {
            item.element.detach();
            this.onSideItemsChanged();
        }
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onItemsChanged() {
            this.itemsChanged.raise();
        }
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onSideItemsChanged() {
            this.sideItemsChanged.raise();
        }
        /**
         * Gets or sets the direction of the toolbar
         **/
        get direction() {
            return this._direction;
        }
        /**
         * Gets or sets the direction of the toolbar
         **/
        set direction(value) {
            var changed = value !== this._direction;
            this._direction = value;
            if (changed) {
                if (value === latte.Direction.HORIZONTAL) {
                    this.removeClass('vertical');
                    this.addClass('horizontal');
                }
                else {
                    this.removeClass('horizontal');
                    this.addClass('vertical');
                }
                this.onLayout();
            }
        }
        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        get faceVisible() {
            return this._faceVisible;
        }
        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        set faceVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            if (value)
                this.element.addClass('with-face');
            else
                this.element.removeClass('with-face');
            this._faceVisible = value;
        }
        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        get holderWide() {
            return this._holderWide;
        }
        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        set holderWide(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value');
            if (value > 0) {
                this.holderElement.width(value);
            }
            else {
                this.css('width', '');
            }
            this._holderWide = value;
        }
        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        get padding() {
            return this._padding;
        }
        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        set padding(value) {
            if (value == null)
                value = 0;
            this._padding = value;
            // Adjust margins
            this.itemsElement.children().css('marginRight', value);
            this.itemsElement.css('paddingLeft', value);
            this.sideItemsElement.children().css('marginLeft', value);
            this.sideItemsElement.css('paddingRight', value);
        }
    }
    latte.Toolbar = Toolbar;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class SelectableLabel extends latte.SelectableItem {
        /**
         *
         **/
        constructor() {
            super();
            this.addClass('with-label');
            // Init element
            this.label = new latte.LabelItem();
            this.label.appendTo(this);
            this.element.clear();
        }
        /**
         * Gets or sets the description of the item's label
         **/
        get description() {
            return this.label.description;
        }
        /**
         * Gets or sets the description of the item's label
         **/
        set description(value) {
            this.label.description = value;
        }
        /**
         * Gets or sets the icon of the item's label
         **/
        get icon() {
            return this.label.icon;
        }
        /**
         * Gets or sets the icon of the item's label
         **/
        set icon(value) {
            this.label.icon = value;
        }
        /**
         * Gets or sets the text of the item's label
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets or sets the text of the item's label
         **/
        set text(value) {
            this.label.text = value;
        }
    }
    latte.SelectableLabel = SelectableLabel;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class StackOverlay extends latte.Overlay {
        constructor() {
            super();
            this.stack = new latte.ItemStack();
            this.stack.appendTo(this);
        }
        /**
         * Gets the collection of items of stack
         *
         * @returns {latte.Collection<latte.Item>}
         */
        get items() {
            return this.stack.items;
        }
    }
    latte.StackOverlay = StackOverlay;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a view who presents items in columns
     **/
    class ColumnView extends latte.View {
        /**
         * Creates the View with the specified amount of columns.
         **/
        constructor(columns = 1) {
            super();
            /**
             *
             **/
            this._columnWeights = [];
            /**
             *
             */
            this._paddingColumns = 10;
            this.element.addClass('column');
            this.items = new latte.Collection(this.onAddItem, this.onRemoveItem, this);
            if (columns > 0) {
                this.columns = columns;
            }
        }
        /**
         * Called when an item is added to the items collection
         **/
        onAddItem(item) {
            var column = this.getColumnAt((this.items.count - 1) % this.columns);
            // Append to current column
            item.appendTo(column);
            // Padding between items
            item.element.css('margin-bottom', this.columnPadding);
            // Layout item
            item.onLayout();
        }
        /**
         * Called when an item is removed to the items collection
         **/
        onRemoveItem(item) {
            item.element.detach();
        }
        /**
         * Returns the column at the specified index. First column is zero
         **/
        getColumnAt(index) {
            if (!latte._isNumber(index) || index < 0 || index >= this.columns)
                throw new latte.InvalidArgumentEx('index', index);
            return this.container.find('.column').eq(index).find('.column-content');
        }
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            if (this.columnWeights.length > 0) {
            }
            else {
                if (latte.View.smallScreen) {
                    this.container.children().css('width', '');
                }
                else {
                    var w = Math.floor(100 / this.columns);
                    this.container.children().css('width', w + '%');
                }
            }
            // Pass event to items
            for (var i = 0; i < this.items.count; i++) {
                this.items.item(i).onLayout();
            }
        }
        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        get columnWeights() {
            return this._columnWeights;
        }
        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        set columnWeights(value) {
            if (value.length != this._columns)
                throw new latte.Ex();
            this._columnWeights = value;
            if (latte.View.smallScreen) {
                for (var i = 0; i < this.columns; i++) {
                    this.getColumnAt(i).parent().css('width', '');
                }
            }
            else {
                for (var i = 0; i < this.columns; i++) {
                    this.getColumnAt(i).parent().css('width', value[i] + '%');
                }
            }
            this.onLayout();
        }
        /**
         * Gets or sets the number of columns in the view.
         **/
        get columns() {
            return this._columns;
        }
        /**
         * Gets or sets the number of columns in the view.
         **/
        set columns(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._columns = value;
            var i = 0;
            // Detach items
            for (i = 0; i < this.items.count; i++)
                this.items.item(i).element.detach();
            // Clear space
            this.container.empty();
            if (value > 0) {
                var w = Math.floor(100 / value);
                for (i = 0; i < value; i++) {
                    // Create column
                    var c = $('<div>')
                        .addClass('column')
                        .css('width', w + '%')
                        .appendTo(this.container);
                    // Create container
                    $('<div>')
                        .addClass('column-content')
                        .appendTo(c);
                }
                var buffer = [];
                // Buffer items
                for (i = 0; i < this.items.count; i++)
                    buffer.push(this.items.item(i));
                // Clear items
                this.items.clear();
                // Reatach items
                for (i = 0; i < buffer.length; i++)
                    this.items.add(buffer[i]);
            }
            this.columnPadding = this.columnPadding;
        }
        /**
         * Gets or sets the column padding inside of columns
         **/
        get columnPadding() {
            return this._paddingColumns;
        }
        /**
         * Gets or sets the column  padding inside of columns
         **/
        set columnPadding(value) {
            this.container.find('.column-content').css('margin', value);
            this.container.find('.column-content > .latte-item').css('margin-bottom', value);
            this._paddingColumns = value;
        }
    }
    latte.ColumnView = ColumnView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a resizable dialog
     **/
    class DialogView extends latte.View {
        //endregion
        /**
         * Creates the Dialog
         **/
        constructor(view = null, items = null) {
            super();
            /**
             *
             **/
            this._closeable = true;
            DialogView._initialize();
            this.element.addClass('dialog');
            // Initialize events
            this.closing = new latte.LatteEvent(this);
            this.closed = new latte.LatteEvent(this);
            // Initialize collection
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            // Initialize elements
            this.barElement = $('<div>').addClass('bar').appendTo(this.element);
            this.itemsElement = $('<div>').addClass('items').appendTo(this.element);
            this.titleElement = $('<div>').addClass('title').appendTo(this.barElement);
            this.closeButton = new latte.ButtonItem();
            this.closeButton.faceVisible = false;
            this.closeButton.icon = latte.Glyph.dismiss;
            this.closeButton.appendTo(this.barElement);
            this.closeButton.click.add(() => {
                this.close();
            });
            this.closeButton.element.addClass('close');
            if (view instanceof latte.View) {
                this.view = view;
            }
            if (items instanceof Array) {
                this.items.addArray(items);
            }
            // TODO: PATCH:
            if (!latte.View.smallScreen) {
                this.container.css('maxHeight', 400);
            }
        }
        /**
         * Initialize handlers at global level
         **/
        static _initialize() {
            var f = DialogView;
            // Check if not already initialized
            if (!latte._undef(f.initialized) && f.initialized)
                return;
            // Flag as initialized
            f.initialized = true;
            $(window)
                .keydown(function (e) {
                var modal = (latte.View.modalView instanceof DialogView) ? latte.View.modalView : null;
                modal = modal instanceof DialogView ? modal : null;
                if (e.keyCode == latte.Key.ESCAPE) {
                    if (modal && modal.closeable)
                        (modal).close();
                }
                else if (e.keyCode == latte.Key.ENTER) {
                    if (modal // There's a modal
                        && modal.defaultButton // Has a default button
                        && modal.defaultButton.enabled // Default button is enabled
                        && document.activeElement['tagName'] != 'TEXTAREA' // And focused element is not a textarea (enter is for new lines)
                    ) {
                        modal.defaultButton.onClick();
                    }
                }
            });
            // log("DialogView Inited")
        }
        /**
         * Shows an alert <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static alert(message, description = '', items = null) {
            if (!latte._isString(message))
                throw new latte.InvalidArgumentEx('message', message);
            if (!latte._undef(description) && !latte._isString(description))
                throw new latte.InvalidArgumentEx('description', description);
            var m = new latte.MessageView();
            // Prepare message
            m.message = message;
            // Prepare description
            if (!latte._undef(description))
                m.description = description;
            m.iconAlert();
            if (!items) {
                items = [new latte.ButtonItem(strings.ok)];
            }
            return DialogView.showMessage(m, items);
        }
        /**
         * Shows a question <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static ask(message, description = '', items = null) {
            if (!latte._isString(message))
                throw new latte.InvalidArgumentEx('message', message);
            if (!latte._undef(description) && !latte._isString(description))
                throw new latte.InvalidArgumentEx('description', description);
            var m = new latte.MessageView();
            // Prepare message
            m.message = message;
            // Prepare description
            if (!latte._undef(description))
                m.description = description;
            m.iconQuestion();
            return DialogView.showMessage(m, items);
        }
        /**
         * Shows a question MessageView asking form deletion confirmation of the specified object
         * @param objectName
         * @param callback
         */
        static confirmDelete(objectName, callback) {
            DialogView.ask(latte.sprintf(strings.confirmDeleteS, objectName), strings.cantBeUndone, [
                new latte.ButtonItem(latte.sprintf(strings.yesDeleteS, objectName), null, () => { callback(); }),
                new latte.ButtonItem(strings.cancel)
            ]);
        }
        /**
         * Shows an error <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static error(message, description = '', items = null) {
            if (!latte._undef(description) && !latte._isString(description))
                throw new latte.InvalidArgumentEx('description', description);
            var m = new latte.MessageView();
            // Prepare message
            m.message = (message || "");
            // Prepare description
            if (!latte._undef(description))
                m.description = description;
            m.iconError();
            return DialogView.showMessage(m, items);
        }
        /**
         * Shows an information <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static inform(message, description = '', items = null) {
            if (!latte._isString(message))
                throw new latte.InvalidArgumentEx('message', message);
            if (!latte._undef(description) && !latte._isString(description))
                throw new latte.InvalidArgumentEx('description', description);
            var m = new latte.MessageView();
            // Prepare message
            m.message = message;
            // Prepare description
            if (!latte._undef(description))
                m.description = description;
            m.iconInfo();
            return DialogView.showMessage(m, items);
        }
        /**
         * Presents the specified inputs and presents them
         * @param title
         * @param inputs
         * @param save
         * @param validate Return false in case validation is incorrect
         */
        static input(title, inputs, validate = null, save = null) {
            let d = new DialogView();
            let f = new latte.FormView();
            let items = {};
            let values = () => {
                let r = {};
                for (let i in items) {
                    r[i] = items[i].value;
                }
                return r;
            };
            let cancelled = false;
            d.closeButton.visible = false;
            for (let i in inputs) {
                items[i] = latte.InputItem.fromIInput(inputs[i], i, null);
                f.inputs.add(items[i]);
            }
            d.items.addArray([
                new latte.ButtonItem(strings.ok),
            ]);
            d.addCancelButton(() => {
                cancelled = true;
            });
            d.closing.add(() => {
                if (cancelled) {
                    return true;
                }
                let valid = null;
                if (validate) {
                    valid = validate(values(), items);
                }
                if (latte._isFunction(valid)) {
                    // Execute validation
                    d.enabled = false;
                    valid((validationResult) => {
                        d.enabled = true;
                        if ((latte._isBoolean(validationResult) && validationResult) || f.isValid) {
                            cancelled = true;
                            d.close();
                            save(values());
                        }
                    });
                    return false;
                }
                if (!latte._isBoolean(valid)) {
                    valid = f.isValid;
                }
                // Check for validation
                if (valid) {
                    // Save callback
                    save(values());
                }
                else {
                    return false;
                }
            });
            d.title = title;
            d.view = f;
            d.show();
            return d;
        }
        /**
         * Shows the specified <c>message</c> within a DialogView. Optionally specifies <c>items</c> for the dialog.
         **/
        static showMessage(message, items = null) {
            if (!(message instanceof latte.MessageView))
                throw new latte.InvalidArgumentEx('message', message);
            if (latte._undef(items)) {
                var okButton = new latte.ButtonItem();
                okButton.text = strings.ok;
                items = [okButton];
            }
            return new DialogView(message, items).show();
        }
        //region Methods
        clickableItemsCount() {
            var count = 0;
            this.items.each((item) => {
                if (item instanceof latte.ClickableItem)
                    count++;
            });
            return count;
        }
        /**
         *
         **/
        _onAddItem(item) {
            if (item instanceof latte.ButtonItem) {
                item.click.add(() => {
                    return this.close();
                });
            }
            this.itemsElement.append(item.element);
            this.onLayout();
            item.focusable = true;
            if (this.items.length == 1 && item instanceof latte.ButtonItem) {
                item.defaulted = true;
                this.defaultButton = item;
            }
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item.element.detach();
            this.onLayout();
        }
        /**
         * Adds a button with the specified text and handler to the dialog items
         **/
        addButton(text, handler = null) {
            var b = new latte.ButtonItem();
            b.text = text;
            b.click.add(latte._isFunction(handler) ? handler : () => { });
            this.items.add(b);
            return this;
        }
        /**
         * Adds an 'Cancel' button to the dialog items
         **/
        addCancelButton(handler = null) {
            return this.addButton(strings.cancel, handler);
        }
        /**
         * Adds an 'No' button to the dialog items
         **/
        addNoButton(handler = null) {
            return this.addButton(strings.no, handler);
        }
        /**
         * Adds an 'Ok' button to the dialog items
         **/
        addOkButton(handler = null) {
            return this.addButton(strings.ok, handler);
        }
        /**
         * Adds an 'Save' button to the dialog items
         **/
        addSaveButton(handler = null) {
            return this.addButton(strings.save, handler);
        }
        /**
         * Adds a 'Yes' button to the dialog items
         **/
        addYesButton(handler = null) {
            return this.addButton(strings.yes, handler);
        }
        /**
         * Closes the dialog
         **/
        close() {
            if (this.onClosing() === false) {
                return false;
            }
            latte.View.modalView = null;
            this.onClosed();
            return true;
        }
        /**
         *
         **/
        handler() {
            throw new latte.Ex();
        }
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed() {
            this.closed.raise();
        }
        /**
         * Raises the <c>closing</c> event
         **/
        onClosing() {
            return this.closing.raise();
        }
        onEnabledChanged() {
            super.onEnabledChanged();
            // TODO: Disabling the dialog should disable every single click on it.
            if (this.enabled) {
                this.removeClass('disabled');
            }
            else {
                this.addClass('disabled');
            }
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].enabled = this.enabled;
            }
        }
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            this.container.css('margin-top', this.barElement.outerHeight());
            if (this.items.count > 0) {
                this.itemsElement.show();
                this.container.css('margin-bottom', this.itemsElement.outerHeight());
            }
            else {
                this.itemsElement.hide();
                this.container.css('margin-bottom', 0);
            }
        }
        /**
         * Shows the dialog as modal
         **/
        show(items = null) {
            latte.View.modalView = this;
            if (items) {
                this.items.addArray(items);
            }
            return this;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        get cancelButton() {
            if (this._cancelButton === null) {
                if (this.items.count > 0 && this.items.first instanceof latte.ButtonItem) {
                    return (this.items.first);
                }
                else {
                    return null;
                }
            }
            else {
                return this._cancelButton;
            }
        }
        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        set cancelButton(button) {
            this._cancelButton = button;
        }
        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        get closeable() {
            return this._closeable;
        }
        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        set closeable(value) {
            this._closeable = value;
            this.closeButton.visible = value;
        }
        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        get defaultButton() {
            if (this._defaultButton === null) {
                if (this.items.count > 0 && this.items.first instanceof latte.ButtonItem) {
                    return this.items.first;
                }
                else {
                    return null;
                }
            }
            else {
                return this._defaultButton;
            }
        }
        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        set defaultButton(button) {
            this._defaultButton = button;
        }
        /**
         * Gets or sets the title of the dialog
         **/
        get title() {
            return this.titleElement.html();
        }
        /**
         * Gets or sets the title of the dialog
         **/
        set title(value) {
            this.titleElement.html(value);
        }
    }
    latte.DialogView = DialogView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class NavigationView extends latte.SplitView {
        /**
         *
         **/
        constructor() {
            super();
            this.addClass('navigation');
            this.tree = new latte.TreeView();
            this.sideView = new latte.ToolbarView();
            this.sideView.view = this.tree;
            this.treeToolbar = this.sideView.toolbar;
        }
    }
    latte.NavigationView = NavigationView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * represents an action
     **/
    class Action {
        /**
         * Creates the action
         **/
        constructor(text = null, icon = null, execute = null, description = null) {
            /**
             *
             **/
            this._buttons = [];
            /**
             *
             **/
            this._enabled = true;
            // Initialize events
            this.execute = new latte.LatteEvent(this);
            // Initialize collections
            this.actions = new latte.Collection();
            // Create buttons array
            this._buttons = [];
            if (text) {
                this.text = text;
            }
            if (icon) {
                this.icon = icon;
            }
            if (execute) {
                this.execute.add(execute);
            }
            if (description) {
                this.description = description;
            }
        }
        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        get checked() {
            return this._checked;
        }
        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        set checked(value) {
            this._checked = value;
            for (var i = 0; i < this._buttons.length; i++)
                this._buttons[i].checked = value;
        }
        /**
         * Gets or sets the description of the action
         **/
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the description of the action
         **/
        set description(value) {
            this._description = value;
            for (var i = 0; i < this._buttons.length; i++)
                this._buttons[i].description = value;
        }
        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        get enabled() {
            return this._enabled;
        }
        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        set enabled(value) {
            this._enabled = value;
            for (var i = 0; i < this._buttons.length; i++)
                this._buttons[i].enabled = value;
        }
        /**
         * Gets a <c>ButtonItem</c> representation of the action
         **/
        getButton() {
            var b = new latte.ButtonItem();
            var a = this;
            this._buttons.push(b);
            b.text = this.text;
            b.description = this.description;
            b.enabled = this.enabled;
            //b.checked = this.checked;
            b.click.add(() => { a.execute.raise(); });
            if (this.icon)
                b.icon = this.icon.clone();
            return b;
        }
        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        set icon(value) {
            this._icon = value;
            for (var i = 0; i < this._buttons.length; i++)
                this._buttons[i].icon = value.clone();
        }
        /**
         * Gets or sets the text of the action
         **/
        get text() {
            return this._text;
        }
        /**
         * Gets or sets the text of the action
         **/
        set text(value) {
            this._text = value;
            for (var i = 0; i < this._buttons.length; i++)
                this._buttons[i].text = value;
        }
    }
    latte.Action = Action;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Handles hash navigation. This is designed to manage navigation of apps.

     Catch a handler to <c>hashChanged</c> event, and to alter the current hash path
     use the <c>Navigation.hash</c> property.
     **/
    class Navigation {
        /**
         * Initializes the static class
         **/
        static staticConstructor() {
            // Assign initial hash
            if (!latte._undef(window.location.hash))
                Navigation.hash = window.location.hash;
            // Init event
            Navigation.hashChanged = new latte.LatteEvent(Navigation);
            // React to handler adding
            Navigation.hashChanged.handlerAdded.add(() => {
                Navigation.onHashChanged(Navigation._hash);
            });
            // Catch outer hashchange event
            if (!latte._undef(window.onhashchange)) {
                $(window).bind('hashchange', () => {
                    Navigation.hash = window.location.hash;
                });
            }
        }
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static get hash() {
            return Navigation._hash;
        }
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static set hash(value) {
            Navigation.setHash(value, false);
        }
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static setHash(value, silent = false) {
            if (latte._isString(value) && value.length > 0 && value.charAt(0) == '#')
                value = value.substr(1);
            var change = value != Navigation._hash;
            Navigation._hash = value;
            if (!latte._undef(window.location.hash)) {
                Navigation._lock = true;
                window.location.hash = value;
                Navigation._lock = false;
            }
            /// Create path
            var path = value.split('/');
            if (path.length > 0 && !path[0])
                path.shift();
            Navigation.path = path;
            if (change && !(silent === true))
                Navigation.onHashChanged(value);
            return Navigation;
        }
        /**
         * Raises the <c>hashChanged</c> event
         **/
        static onHashChanged(hash) {
            if (Navigation.hashChanged)
                Navigation.hashChanged.raise(hash);
        }
    }
    /**
     * Hash represented as a path. It is updated every time the value of <c>hash</c> changes.
     **/
    Navigation.path = [];
    latte.Navigation = Navigation;
    $(() => { Navigation.staticConstructor(); });
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Manages z-index related positions
     <b style="color:darkred">This class should not be used directly because it is likely to disappear in future version</b>
     **/
    class ZIndex {
        /**
         * Brings the specified element to the top
         **/
        static bringToFront(element) {
            if (element instanceof jQuery)
                element = element.get(0);
            // Add to elements
            this.elements.push(element);
            // Update indexes
            this.updateZIndexes();
        }
        /**
         * Remove elemet from elements, and erase z-index
         **/
        static removeElement(element) {
            var arr = [];
            if (element instanceof jQuery)
                element = element.get(0);
            // Remove z-index
            // debugger;
            $(element).css('zIndex', '');
            // Create new array
            for (var i = 0; i < this.elements.length; i++)
                if (this.elements[i] !== element)
                    arr.push(this.elements[i]);
            // Set new array
            this.elements = arr;
            this.updateZIndexes();
        }
        /**
         * Updates the z-indexes of elements
         **/
        static updateZIndexes() {
            // Calculate max index
            //var max = document.all ? document.all.length : $('*').length;
            var max = $(':not(.latte-overlay.menu)').length - this.elements.length;
            for (var i = 0; i < this.elements.length; i++) {
                $(this.elements[i]).css('zIndex', max++);
            }
        }
    }
    /**
     * Array of elements that are being handled by class
     **/
    ZIndex.elements = [];
    latte.ZIndex = ZIndex;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/1/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ColorIconItem extends latte.IconItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(color, size = 16) {
            super();
            //region Private Methods
            //endregion
            //region Methods
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._color = null;
            this.u = 1;
            this.v = 1;
            this.size = size;
            this.color = color;
        }
        /**
         * Gets or sets the color of the icon
         *
         * @returns {Color}
         */
        get color() {
            return this._color;
        }
        /**
         * Gets or sets the color of the icon
         *
         * @param {Color} value
         */
        set color(value) {
            this._color = value;
            this.css('background', value.toString());
        }
    }
    latte.ColorIconItem = ColorIconItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Provides an icon from provided built-in glyphs to indicate graphical actions.
     **/
    class Glyph extends latte.IconItem {
        /**
         * Creates the glyph
         **/
        constructor() {
            super();
            this.element.addClass('glyph');
        }
        /**
         * URL used for glyphs sprite
         **/
        static get defaultUrl() {
            return latte._latteUrl() + '/releases/latte.ui/support/imgs/glyphs.png';
        }
        /**
         * Returns the glyph specified by its location
         **/
        static _byLocation(u, v, name) {
            var g = new Glyph();
            g.size = 16;
            g.url = Glyph.defaultUrl;
            g.u = u;
            g.v = v;
            g.name = name || '';
            return g;
        }
        /**
         * Gets an empty glyph
         **/
        static get add() {
            return Glyph._byLocation(2, 10, 'add');
        }
        /**
         * Gets an empty glyph
         **/
        static get check() {
            return Glyph._byLocation(2, 5, 'check');
        }
        /**
         * Gets a checked glyph
         **/
        static get checked() {
            return Glyph._byLocation(3, 4, 'checked');
        }
        /**
         * Gets a checked glyph
         **/
        static get checkedRadio() {
            return Glyph._byLocation(4, 4, 'checked');
        }
        /**
         * Gets a chevron glyph
         **/
        static get chevron() {
            return Glyph._byLocation(2, 7, 'chevron');
        }
        /**
         * Gets a collapse glyph
         **/
        static get collapse() {
            return Glyph._byLocation(1, 3, 'collapse');
        }
        /**
         * Gets collapse icon for ribbon glyph
         **/
        static get collapseRibbon() {
            return Glyph._byLocation(2, 8, 'collapse');
        }
        /**
         *
         * @returns {Glyph}
         */
        static get collapseWidget() {
            return Glyph._byLocation(2, 8, 'collapse');
        }
        /**
         *
         * @returns {Glyph}
         */
        static get expandWidget() {
            return Glyph._byLocation(3, 5, 'expand');
        }
        /**
         * Gets a dismiss glyph
         **/
        static get dismiss() {
            return Glyph._byLocation(2, 9, 'dismiss');
        }
        /**
         * Gets a down arrow glyph
         **/
        static get down() {
            return Glyph._byLocation(2, 2, 'down');
        }
        /**
         * Gets an expand glyph
         **/
        static get expand() {
            return Glyph._byLocation(1, 2, 'expand');
        }
        /**
         * Gets a grip glyph
         **/
        static get grip() {
            return Glyph._byLocation(2, 6, 'grip');
        }
        /**
         * Gets a left arrow glyph
         **/
        static get left() {
            return Glyph._byLocation(2, 4, 'left');
        }
        /**
         * Gets a maximize glyph
         **/
        static get maximize() {
            return Glyph._byLocation(3, 2, 'maximize');
        }
        /**
         * Gets a minimize glyph
         **/
        static get minimize() {
            return Glyph._byLocation(3, 1, 'minimize');
        }
        /**
         * Gets note glyph
         **/
        static get note() {
            return Glyph._byLocation(1, 4, 'note');
        }
        /**
         * Gets a right arrow glyph
         **/
        static get right() {
            return Glyph._byLocation(2, 3, 'right');
        }
        /**
         * Gets a checked glyph
         **/
        static get unchecked() {
            return Glyph._byLocation(3, 3, 'checked');
        }
        /**
         * Gets a checked glyph
         **/
        static get uncheckedRadio() {
            return Glyph._byLocation(4, 3, 'checked');
        }
        /**
         * Gets an up arrow glyph
         **/
        static get up() {
            return Glyph._byLocation(2, 1, 'up');
        }
    }
    latte.Glyph = Glyph;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class ImageItem extends latte.Item {
        /**
         *
         */
        constructor() {
            super();
            /**
             *
             */
            this._autoSize = false;
            this.addClass('image');
            this.imageElement = $('<img>').appendTo(this.element);
        }
        /**
         *
         * @returns {boolean}
         */
        get autoSize() {
            return this._autoSize;
        }
        /**
         *
         * @param value
         */
        set autoSize(value) {
            this._autoSize = value;
        }
        /**
         *
         * @returns {string|JQuery}
         */
        get src() {
            return this.imageElement.attr('src');
        }
        /**
         *
         * @param value
         */
        set src(value) {
            this.imageElement.attr('src', value);
        }
    }
    latte.ImageItem = ImageItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a separator for various purposes.
     **/
    class SeparatorItem extends latte.Item {
        /**
         * Creates the separator
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('separator');
        }
        //region Static
        /**
         * Returns the separator with the specified tab pointer
         * @param tab
         * @returns {latte.SeparatorItem}
         */
        static withTab(tab) {
            let s = new SeparatorItem();
            s.tab = tab;
            return s;
        }
        /**
         * Gets or sets the text of the separator
         **/
        get text() {
            return this._text;
        }
        /**
         * Gets or sets the text of the separator
         **/
        set text(value) {
            // Empty me
            this.element.empty();
            if (latte._isString(value)) {
                var label = new latte.LabelItem();
                label.text = value;
                label.appendTo(this.element);
                this.element.addClass('with-text');
                this.element.clear();
            }
            else {
                this.element.removeClass('with-text');
            }
            this._text = value;
        }
    }
    latte.SeparatorItem = SeparatorItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * ButtonGroup with pagination information
     **/
    class PaginationItem extends latte.ButtonGroupItem {
        /**
         *
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._page = 1;
            /**
             *
             **/
            this._pages = 1;
            this.addClass('pagination');
            // Events
            this.pageChanged = new latte.LatteEvent(this);
            // Elements
            this.btnCurrent = new latte.ButtonItem();
            this.btnNext = new latte.ButtonItem();
            this.btnNext.icon = latte.Glyph.right;
            this.btnPrevious = new latte.ButtonItem();
            this.btnPrevious.icon = latte.Glyph.left;
            // Tag CSS
            this.btnPrevious.addClass('previous');
            this.btnCurrent.addClass('current');
            this.btnNext.addClass('next');
            this.btnCurrent.items.add(this.btnOverlay);
            this.buttons.addArray([
                this.btnPrevious, this.btnCurrent, this.btnNext
            ]);
            // Wire events
            this.btnNext.click.add(() => { this.nextPage(); });
            this.btnPrevious.click.add(() => { this.previousPage(); });
            this.page = 1;
            this.pages = 1;
        }
        /**
         * Navigates to next page, if possible.
         **/
        nextPage() {
            if (this.page < this.pages) {
                this.page = this.page + 1;
            }
        }
        /**
         * Raises the <c>pageChanged</c> event
         **/
        onPageChanged() {
            this.pageChanged.raise();
        }
        /**
         * Navigates to the previous page, if possible.
         **/
        previousPage() {
            if (this.page > 0) {
                this.page = this.page - 1;
            }
        }
        // region Private Methods
        txtPage_enterPressed() {
            if (!(+this.txtPage.value > this.pages)) {
                if (this.txtPage.value == "" || +this.txtPage.value <= 0 || isNaN(+this.txtPage.value))
                    this.txtPage.value = this.page + "";
                // Set page
                this.page = parseInt(this.txtPage.value, 10);
            }
            else {
                this.txtPage.value = this.page + "";
            }
        }
        // endregion
        /**
         * Gets or sets the current page
         **/
        get page() {
            return this.getPage();
        }
        /**
         * Gets or sets the current page
         **/
        set page(value) {
            this.setPage(value);
        }
        /**
         * Gets the current page.
         * @returns {number}
         */
        getPage() {
            return this._page;
        }
        /**
         * Sets the current page.
         * Optionally omits the <c>pageChanged</c> event trigger.
         * @param value
         * @param silent
         */
        setPage(value, silent = false) {
            var changed = this._page != value;
            this._page = value;
            this.btnCurrent.text = this._page + '/' + this._pages;
            this.btnNext.enabled = this._page < this.pages;
            this.btnPrevious.enabled = this._page > 1;
            this.txtPage.enabled = this._page <= this.pages && this._page >= 1;
            if (changed && silent !== true) {
                this.onPageChanged();
            }
        }
        /**
         * Gets or sets the amount of pages for navigation
         **/
        get pages() {
            return this._pages;
        }
        /**
         * Gets or sets the amount of pages for navigation
         **/
        set pages(value) {
            this._pages = value;
            this.btnCurrent.text = this._page + '/' + this._pages;
            this.enabled = value > 1;
            if (this.enabled)
                this.page = this.page;
        }
        get txtPage() {
            if (!this._txtPage) {
                this._txtPage = new latte.TextboxItem();
                this._txtPage.value = this.page + "";
                this._txtPage.input.width(20);
                this._txtPage.input.height(14);
                this._txtPage.enabled = false;
                this._txtPage.enterPressed.add(this.txtPage_enterPressed, this);
                this._txtPage.element.css({ float: 'left' });
            }
            return this._txtPage;
        }
        /**
         * Gets a value indicating
         */
        get lblPages() {
            if (!this._lblPages) {
                this._lblPages = new latte.LabelItem(strings.goToPage);
                this._lblPages.element.css({ float: 'left', paddingTop: 5, paddingRight: 5, color: 'black' });
            }
            return this._lblPages;
        }
        /**
         * Gets a value indicating
         */
        get btnGo() {
            if (!this._btnGo) {
                this._btnGo = new latte.ButtonItem("Ir");
                this._btnGo.removeClass('clickable');
                this._btnGo.element.css({ float: 'left' });
                this._btnGo.click.add(this.txtPage_enterPressed, this);
            }
            return this._btnGo;
        }
        /**
         * Gets a value indicating
         */
        get btnOverlay() {
            if (!this._btnOverlay) {
                this._btnOverlay = new latte.ButtonItem();
                this._btnOverlay.faceVisible = false;
                this._btnOverlay.removeClass('clickable');
                this._btnOverlay.height = 28;
                this._btnOverlay.label.contentElement.append(this.lblPages.element);
                this._btnOverlay.label.contentElement.append(this.txtPage.element);
                //this._btnOverlay.label.contentElement.append(this.btnGo.element);
                this._btnOverlay.label.contentElement.clear();
            }
            return this._btnOverlay;
        }
    }
    latte.PaginationItem = PaginationItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a selectable tab
     **/
    class TabItem extends latte.ButtonItem {
        /**
         * Creates the tab
         **/
        constructor(text = '', icon = null, click = null, tab = null) {
            super(text, icon, click);
            this.activeChanged = new latte.LatteEvent(this);
            this.element.addClass('tab');
            // Init me
            this.faceVisible = false;
            this.flatSide = latte.Side.BOTTOM;
        }
        _applyActiveProperties() {
            if (this.active) {
                this.addClass('active');
                this.openSide = this.contentSide;
            }
            else {
                this.removeClass('active');
                this.openSide = null;
            }
        }
        /**
         * Raises the activeChanged event.
         */
        onActiveChanged() {
            this.activeChanged.raise();
        }
        /**
         * Gets a value indicating if the tab is currently active.
         * @returns {boolean}
         */
        get active() {
            return this._active;
        }
        /**
         * Sets a value indicating if the tab is currently active.
         * @param value
         */
        set active(value) {
            var changed = value !== this._active;
            this._active = value;
            this._applyActiveProperties();
            if (changed) {
                this.onActiveChanged();
            }
        }
        /**
         * Gets the side where content is shown. So tab is drawn accordingly.
         *
         * @returns {Side}
         */
        get contentSide() {
            return this._contentSide;
        }
        /**
         * Sets the side where content is shown. So tab is drawn accordingly.
         * @param value
         */
        set contentSide(value) {
            this._contentSide = value;
            // Set the flat side of tab
            this.flatSide = value;
            // Reload active properties
            this._applyActiveProperties();
        }
    }
    latte.TabItem = TabItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 3/21/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ColorPicker extends latte.ItemStack {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._color = null;
            /**
             * Field for swatches property
             */
            this._swatches = [];
            // Structure
            var wrapper = new latte.Item();
            wrapper.element.append(this.canvas);
            this.items.add(wrapper);
            this.items.add(this.toolbar);
            this.toolbar.sideItems.addArray([
                this.lblIndicator,
                this.txtHex
            ]);
            // Init selection
            this.color = latte.Color.transparent;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Handles mouse move on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseMove(screenX, screenY) {
            var swatch = this.swatchAt(screenX, screenY);
            if (swatch) {
            }
        }
        /**
         * Handles mouse down on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseDown(screenX, screenY) {
            var swatch = this.swatchAt(screenX, screenY);
            if (swatch) {
                this.color = swatch.color;
            }
        }
        /**
         * Draws the palette
         */
        drawPalette() {
            var canvasWidth = this.canvas.width();
            var canvasHeight = this.canvas.height();
            this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            var swatchSize = canvasWidth / 20;
            //region Swatches
            this._swatches = [];
            var selectedSwatch = null;
            // Adds a swatch to the palette
            var swatch = (x, y, color) => {
                var r = new latte.Rectangle(x * swatchSize, y * swatchSize, swatchSize, swatchSize);
                var colorObj = (color == 'transparent' ? latte.Color.transparent : latte.Color.fromHex(color));
                this.context.fillStyle = color;
                this.context.fillRect(r.left, r.top, r.width, r.height);
                var swatch = {
                    bounds: r,
                    color: colorObj
                };
                this.swatches.push(swatch);
                if (colorObj.isTransparent) {
                    this.context.lineWidth = 3;
                    this.context.strokeStyle = 'red';
                    this.context.beginPath();
                    this.context.moveTo(r.right, r.top);
                    this.context.lineTo(r.left, r.bottom);
                    this.context.stroke();
                    this.context.lineWidth = 1;
                }
                if (!selectedSwatch && colorObj.toString() == this.color.toString()) {
                    selectedSwatch = swatch;
                }
            };
            var swatchGroup = (x, y, initialRed) => {
                var startX = x;
                var startY = y;
                var colorValues = ['0', '3', '6', '9', 'C', 'F'];
                var r = colorValues[initialRed];
                var g = '0';
                var b = '0';
                for (var j = 0; j < colorValues.length; j++) {
                    b = colorValues[j];
                    for (var i = 0; i < colorValues.length; i++) {
                        g = colorValues[i];
                        swatch(startX + i, startY + j, latte.sprintf('#%s%s%s%s%s%s', r, r, g, g, b, b));
                    }
                    g = colorValues[0];
                }
            };
            swatchGroup(2, 0, 0);
            swatchGroup(8, 0, 1);
            swatchGroup(14, 0, 2);
            swatchGroup(2, 6, 3);
            swatchGroup(8, 6, 4);
            swatchGroup(14, 6, 5);
            swatch(0, 0, '#000000');
            swatch(0, 1, '#333333');
            swatch(0, 2, '#666666');
            swatch(0, 3, '#999999');
            swatch(0, 4, '#CCCCCC');
            swatch(0, 5, '#FFFFFF');
            swatch(0, 6, '#FF0000');
            swatch(0, 7, '#00FF00');
            swatch(0, 8, '#0000FF');
            swatch(0, 9, '#FFFF00');
            swatch(0, 10, '#00FFFF');
            swatch(0, 11, '#FF00FF');
            for (var i = 0; i <= 10; i++)
                swatch(1, i, '#000');
            swatch(1, 11, 'transparent');
            //endregion
            //region Grid
            this.context.strokeStyle = 'black';
            var gridX = 0;
            var gridY = 0;
            for (var i = 0; i < Math.ceil(canvasWidth / swatchSize) + 1; i++) {
                this.context.beginPath();
                this.context.moveTo(i * swatchSize, 0);
                this.context.lineTo(i * swatchSize, canvasHeight);
                this.context.stroke();
            }
            for (var i = 0; i < Math.ceil(canvasHeight / swatchSize) + 1; i++) {
                this.context.beginPath();
                this.context.moveTo(0, i * swatchSize);
                this.context.lineTo(canvasWidth, i * swatchSize);
                this.context.stroke();
            }
            //endregion
            //region Mark Selection
            if (selectedSwatch) {
                this.context.lineWidth = 2;
                this.context.strokeStyle = 'white';
                this.context.strokeRect(selectedSwatch.bounds.left, selectedSwatch.bounds.top, selectedSwatch.bounds.width, selectedSwatch.bounds.height);
                this.context.lineWidth = 1;
            }
            //endregion
        }
        /**
         * Raises the <c>color</c> event
         */
        onColorChanged() {
            if (this._colorChanged) {
                this._colorChanged.raise();
            }
            this.txtHex.value = this.color.toString().toUpperCase();
            this.lblIndicator.css({ background: this.color.toString() });
            this.drawPalette();
        }
        /**
         * Override.
         */
        onLayout() {
            super.onLayout();
            // Get swatch size
            var swatchSize = this.element.width() / 20;
            // Adjust height to 12 swatches
            var swatchesHeight = swatchSize * 12;
            // Pass width & height
            this.canvas.attr('width', this.element.width());
            this.canvas.attr('height', swatchesHeight);
            // Redraw palette
            this.drawPalette();
        }
        /**
         * Gets the swatch at the specified point (if any)
         * @param screenX
         * @param screenY
         * @returns {*}
         */
        swatchAt(screenX, screenY) {
            var offset = this.canvas.offset();
            var x = screenX - offset.left;
            var y = screenY - offset.top;
            for (var i = 0; i < this.swatches.length; i++) {
                var colorPickerSwatch = this.swatches[i];
                if (colorPickerSwatch.bounds.contains(x, y)) {
                    return colorPickerSwatch;
                }
            }
            return null;
        }
        /**
         * Gets an event raised when the value of the color property changes
         *
         * @returns {LatteEvent}
         */
        get colorChanged() {
            if (!this._colorChanged) {
                this._colorChanged = new latte.LatteEvent(this);
            }
            return this._colorChanged;
        }
        /**
         * Gets the canvas where color palette is drawn
         *
         * @returns {JQuery}
         */
        get canvas() {
            if (!this._canvas) {
                this._canvas = jQuery('<canvas>');
                this._canvas.mousemove((e) => { this.canvasMouseMove(e.pageX, e.pageY); });
                this._canvas.mousedown((e) => { this.canvasMouseDown(e.pageX, e.pageY); });
            }
            return this._canvas;
        }
        /**
         * Gets the color indicator label
         *
         * @returns {LabelItem}
         */
        get lblIndicator() {
            if (!this._lblIndicator) {
                this._lblIndicator = new latte.LabelItem();
                this._lblIndicator.css({
                    border: 'solid 1px black',
                    width: 50,
                    minHeight: 25,
                    marginTop: -1,
                    marginLeft: 10
                });
            }
            return this._lblIndicator;
        }
        /**
         * Gets the toolbar
         *
         * @returns {Toolbar}
         */
        get toolbar() {
            if (!this._toolbar) {
                this._toolbar = new latte.Toolbar();
            }
            return this._toolbar;
        }
        /**
         * Gets the textbox item
         *
         * @returns {TextboxItem}
         */
        get txtHex() {
            if (!this._txtHex) {
                this._txtHex = new latte.TextboxItem();
                //                this._txtHex.width = 60;
                this._txtHex.enterPressed.add(() => {
                    this.color = latte.Color.fromHex(this._txtHex.value);
                });
            }
            return this._txtHex;
        }
        /**
         * Gets or sets the selected color of the picker
         *
         * @returns {Color}
         */
        get color() {
            return this._color;
        }
        /**
         * Gets or sets the selected color of the picker
         *
         * @param {Color} value
         */
        set color(value) {
            // Check if value changed
            var changed = value !== this._color;
            // Set value
            this._color = value;
            // Trigger changed event
            if (changed) {
                this.onColorChanged();
            }
        }
        /**
         * Gets the context for rendering
         *
         * @returns {CanvasRenderingContext2D}
         */
        get context() {
            if (!this._context) {
                this._context = this.canvas.get(0).getContext('2d');
            }
            return this._context;
        }
        /**
         * Gets the swatches on the canvas
         *
         * @returns {ColorPickerSwatch[]}
         */
        get swatches() {
            return this._swatches;
        }
    }
    latte.ColorPicker = ColorPicker;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a conversation made of <c>CommentItem</c>s, allowing the user to add comments.
     **/
    class ConversationItem extends latte.Item {
        /**
         * Creates the conversation
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._allowNewComments = true;
            /**
             * Property field
             */
            this._ignoreEnter = false;
            var __this = this;
            this.element.addClass('conversation');
            // Initialize evens
            this.commentAdded = new latte.LatteEvent(this);
            this.pendentPagesSolicited = new latte.LatteEvent(this);
            this.commentsChanged = new latte.LatteEvent(this);
            // Initialize collection
            this.comments = new latte.Collection(this._onAddComment, this._onRemoveComment, this);
            // Initialize elements
            this.pendentPagesElement = $('<div>').addClass('hidden-comments').hide().appendTo(this.element);
            this.commentsElement = $('<div>').addClass('comments').appendTo(this.element);
            this.newCommentElement = $('<div>').addClass('new-comment').appendTo(this.element);
            this.setTextbox(new latte.TextboxItem());
            // Add handlers
            this.pendentPagesElement.click(function () {
                __this.onPendentPagesSolicited();
            });
        }
        //region Methods
        /**
         * Sets the textbox of the comment editor.
         * This method is useful for replacing the default textbox for a custom one.
         *
         * @param t
         */
        setTextbox(t) {
            var replace = !!this.textbox;
            var old = this.textbox;
            this.textbox = t;
            this.textbox.multiline = true;
            this.textbox.placeholder = strings.writeComment;
            this.textbox.appendTo(this.newCommentElement);
            if (replace) {
                old.element.replaceWith(this.textbox);
            }
            else {
                this.textbox.appendTo(this.newCommentElement);
            }
            this.element.clear();
            this.textbox.enterPressed.add(() => {
                if (this.ignoreEnter) {
                    return;
                }
                if (this.textbox.value.length > 0) {
                    setTimeout(() => {
                        this.onCommentAdded(this.textbox.value);
                        this.textbox.value = ('');
                    }, 100);
                }
            });
        }
        //endregion
        /**
         *
         **/
        _onAddComment(comment) {
            this.commentsElement.append(comment.element);
            this.onCommentsChanged();
        }
        /**
         *
         **/
        _onRemoveComment(comment) {
            comment.element.detach();
            this.onCommentsChanged();
        }
        /**
         * Raises the <c>commentAdded</c> event
         **/
        onCommentAdded(text) {
            return this.commentAdded.raise(text);
        }
        /**
         *
         **/
        onCommentsChanged() {
            this.commentsChanged.raise();
        }
        /**
         * Raises the <c>pendentPagesRequested</c> event
         **/
        onHiddenCommentsRequested() {
            this.pendentPagesSolicited.raise();
        }
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            this.textbox.onLayout();
            this.textbox.width = this.width;
        }
        /**
         * Raises the <c>pendentPagesSolicited</c> event
         **/
        onPendentPagesSolicited() {
            this.pendentPagesSolicited.raise();
        }
        /**
         * Prepends the specified comment
         **/
        prependComment(comment) {
            this.commentsElement.prepend(comment.element);
        }
        //region Properties
        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        get allowNewComments() {
            return this._allowNewComments;
        }
        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        set allowNewComments(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            if (value) {
                this.newCommentElement.show();
            }
            else {
                this.newCommentElement.hide();
            }
            this._allowNewComments = value;
        }
        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @returns {boolean}
         */
        get ignoreEnter() {
            return this._ignoreEnter;
        }
        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @param {boolean} value
         */
        set ignoreEnter(value) {
            this._ignoreEnter = value;
        }
        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        get pendentPages() {
            return this._pendentPages;
        }
        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        set pendentPages(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._pendentPages = value;
            if (value <= 0) {
                this.pendentPagesElement.hide();
            }
            else {
                this.pendentPagesElement.show();
                this.pendentPagesElement.text(latte.sprintf(strings.showMoreCommentsS, value));
            }
            this._pendentPages = value;
        }
    }
    latte.ConversationItem = ConversationItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a calendar to pick a date or a date range.
     **/
    class DateItem extends latte.Item {
        //endregion
        /**
         * Creates the Item
         **/
        constructor() {
            super();
            //region Fields
            /**
             *
             **/
            this._columns = 1;
            /**
             *
             **/
            this._draggingSelection = null;
            /**
             *
             **/
            this._rows = 1;
            // Init
            this.element.addClass('date');
            // Init events
            this.selectionChanged = new latte.LatteEvent(this);
            this.selectionEndChanged = new latte.LatteEvent(this);
            this.selectionStartChanged = new latte.LatteEvent(this);
            this.selectionModeChanged = new latte.LatteEvent(this);
            this.selectionStart = latte.DateTime.today;
        }
        //region Private Methods
        /**
         * Creates a month. January is 1, december is 12.
         **/
        _createMonth(year, month) {
            if (year < 0)
                throw new latte.InvalidArgumentEx('year');
            if (month < 1 || month > 12)
                throw new latte.InvalidArgumentEx('year');
            var __this = this;
            var i = 0, j = 0;
            var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var monthNames = "january,february,march,april,may,june,july,august,september,october,november,december".split(',');
            var container = $('<div>').addClass('month');
            var monthName = strings[monthNames[month - 1]] + ' ' + year;
            var table = $('<table>').addClass('month').appendTo(container);
            var tr = null;
            var today = latte.DateTime.today;
            var monthDate = new latte.DateTime(year, month, 1);
            var firstDay = monthDate.addDays(monthDate.dayOfWeek * -1);
            var cur = firstDay.date;
            // Create first row
            tr = $('<tr>').appendTo(table);
            // "Prev" control space
            $('<td>').addClass('previous').appendTo(tr);
            // Month name space
            $('<td>', { colspan: 5 }).addClass('month-name').text(monthName).appendTo(tr);
            // "Next" control space
            $('<td>').addClass('next').appendTo(tr);
            // Create day names
            tr = $('<tr>').addClass('day-names').appendTo(table);
            for (i = 0; i < 7; i++)
                tr.append($('<td>')
                    .addClass('day-name')
                    .text(strings[(dayNames[i]) + 'Short']));
            // Create days
            for (i = 0; i < 6; i++) {
                tr = $('<tr>').appendTo(table);
                for (j = 0; j < 7; j++) {
                    var cell = $('<td>');
                    var sel = new latte.SelectableItem();
                    var grayed = cur.month != monthDate.month;
                    sel.element.append($('<span>').text(cur.day.toString()));
                    sel.element.appendTo(cell);
                    sel.tag = cur;
                    sel.element.mousedown(function (e) { __this._dayMouseDown(e, $(this).data('instance')); });
                    sel.element.mousemove(function (e) { __this._dayMouseMove(e, $(this).data('instance')); });
                    sel.element.mouseup(function (e) { __this._dayMouseUp(e, $(this).data('instance')); });
                    cell.addClass('day date-' + cur.year + '-' + cur.month + '-' + cur.day);
                    cell.appendTo(tr);
                    if (cur.compareTo(today) === 0) {
                        cell.addClass('today');
                    }
                    if (grayed) {
                        cell.addClass('grayed');
                        if (cur.compareTo(monthDate) < 1) {
                            cell.addClass('before');
                        }
                        else {
                            cell.addClass('after');
                        }
                    }
                    cur = cur.addDays(1);
                }
            }
            return container;
        }
        /**
         *
         **/
        _dayMouseDown(e, day) {
            var daytag = day.tag;
            switch (this._selectionMode) {
                case latte.DateSelectionMode.WORKWEEK:
                    var monday = daytag.addDays(-daytag.dayOfWeek + 1);
                    var friday = monday.addDays(4);
                    this.setSelectionRange(monday, friday, false, false);
                    break;
                case latte.DateSelectionMode.WEEK:
                    var sunday = daytag.addDays(-daytag.dayOfWeek);
                    var saturday = monday.addDays(6);
                    this.setSelectionRange(monday, friday, false, false);
                    break;
                case latte.DateSelectionMode.MONTH:
                    var first = new latte.DateTime(daytag.year, daytag.month, 1);
                    var last = first.addDays(latte.DateTime.daysInMonth(first.year, first.month) - 1);
                    this.setSelectionRange(first, last, false, false);
                    break;
                default:
                    this.setSelectionRange(daytag, daytag, false, false);
                    break;
            }
            this._draggingSelection = daytag;
        }
        /**
         *
         **/
        _dayMouseMove(e, day) {
            if (this._draggingSelection !== null) {
                this.setSelectionRange(this._draggingSelection, day.tag, false, false);
                this.setSelectionRange(this._draggingSelection, day.tag, false, false);
                this.selectionMode = latte.DateSelectionMode.MANUAL;
            }
        }
        /**
         *
         **/
        _dayMouseUp(e, day) {
            if (this._draggingSelection !== null) {
                this._draggingSelection = null;
                this.setSelectionRange(this.selectionStart, this.selectionEnd, false, true);
            }
        }
        /**
         * Marks the specified day in calendar as selected
         **/
        _selectDay(date) {
            this.element.find('td.date-' + date.year + '-' + date.month + '-' + date.day + ' > .latte-item.selectable').addClass('selected');
        }
        //endregion
        //region Methods
        /**
         *
        **/
        getSelectionStart() {
            return this._selectionStart;
        }
        /**
         * Returns a value indicating if the specified date is currently visible in the date range.
         **/
        isOnDisplay(date) {
            return this.element.find('td.date-' + date.year + '-' + date.month + '-' + date.day + ':not(.grayed)').length > 0;
        }
        /**
         *
         **/
        onSelectionChanged() {
            this.selectionChanged.raise();
        }
        /**
         *
         **/
        onSelectionEndChanged() {
            this.selectionEndChanged.raise();
        }
        /**
         *
         **/
        onSelectionModeChanged() {
            this.selectionModeChanged.raise();
        }
        /**
         *
         **/
        onSelectionStartChanged() {
            this.selectionStartChanged.raise();
        }
        /**
         * SPECIAL GETTER
         Gets or sets the end of selection
         **/
        getSelectionEnd() {
            return this._selectionEnd;
        }
        /**
         * SPECIAL SETTER
         Gets or sets the end of selection
         **/
        setSelectionEnd(value = null, raiseEvent = false) {
            var changed = this._selectionEnd ? this._selectionEnd.compareTo(value) != 0 : true;
            if (changed && !(raiseEvent === false)) {
                this.setSelectionRange(this._selectionStart ? this._selectionStart : value, value);
                this.onSelectionEndChanged();
                this.onSelectionChanged();
            }
            this._selectionEnd = value;
        }
        /**
         * Sets the selection range.
         If <c>start</c> is not on view, view will be taken to the <c>start</c>'s month
         Optionally rebuilds the calendar rows and columns.
         Optionally raises events.
         **/
        setSelectionRange(start, end, rebuild = false, raiseEvents = false) {
            if (!(start instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('start');
            if (!(end instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('end');
            // Swap if end is before start
            if (start.compareTo(end) > 0) {
                var tmp = start;
                start = end;
                end = tmp;
            }
            var cur = start.date;
            var sel = null;
            // If date is not visible
            if (!this.isOnDisplay(start) || rebuild === true) {
                this.setViewStart(start);
            }
            // Unselect all
            this.unselectAll();
            // Select everything
            while (cur.compareTo(end) <= 0) {
                this._selectDay(cur);
                cur = cur.addDays(1);
            }
            if (latte._undef(raiseEvents)) {
                var changes = false;
                if (this._selectionStart && start.compareTo(this._selectionStart) != 0) {
                    changes = true;
                    this._selectionStart = start;
                    this.onSelectionStartChanged();
                }
                if (this._selectionEnd && end.compareTo(this._selectionEnd) != 0) {
                    changes = true;
                    this._selectionEnd = end;
                    this.onSelectionEndChanged();
                }
                if (changes) {
                    this.onSelectionChanged();
                }
            }
            else {
                this._selectionStart = start;
                this._selectionEnd = end;
                if (raiseEvents === true) {
                    this.onSelectionStartChanged();
                    this.onSelectionEndChanged();
                    this.onSelectionChanged();
                }
            }
        }
        /**
         * Sets the start of selection
         **/
        setSelectionStart(value = null, raiseEvent = true) {
            var changed = this._selectionStart ? this._selectionStart.compareTo(value) != 0 : true;
            if (changed && raiseEvent !== false) {
                this.setSelectionRange(value, this._selectionEnd ? this._selectionEnd : value);
                this.onSelectionStartChanged();
                this.onSelectionChanged();
            }
            if (this._selectionEnd === null)
                this._selectionEnd = value;
            // Save date
            this._selectionStart = value;
        }
        /**
         * Sets the view start
         **/
        setViewStart(date) {
            //            var __this = this;
            var i = 0, j = 0;
            var curMonth = new latte.DateTime(date.year, date.month, 1);
            var start = this._selectionStart;
            var end = this._selectionEnd;
            // append month
            this.element.empty();
            // Create months table
            var months = $('<table>').addClass('months').appendTo(this.element);
            for (i = 0; i < this.rows; i++) {
                var row = $('<tr>').appendTo(months);
                for (j = 0; j < this.columns; j++) {
                    var cell = $('<td>').appendTo(row);
                    // Create month
                    var month = this._createMonth(curMonth.year, curMonth.month).appendTo(cell);
                    // Hide the first items
                    if (!(j == 0 && i == 0))
                        month.find('.grayed.before').addClass('hidden');
                    if (!(j == this.columns - 1 && i == this.rows - 1))
                        month.find('.grayed.after').addClass('hidden');
                    // Increment month
                    curMonth = curMonth.addMonths(1);
                }
            }
            // Create Previous & Next buttons
            var prev = new latte.ButtonItem();
            prev.faceVisible = false;
            prev.icon = latte.Glyph.left;
            prev.clickPropagation = false;
            var next = new latte.ButtonItem();
            next.faceVisible = false;
            next.icon = latte.Glyph.right;
            next.clickPropagation = false;
            // Insert on DOM
            months.find('table.month').first().find('td.previous').append(prev.element);
            months.find('tr').first().find('table.month').last().find('td.next').append(next.element);
            // Assign Handlers
            prev.click.add(() => { this.viewPrevious(); });
            next.click.add(() => { this.viewNext(); });
            // Pointer to table
            this.table = months;
            // Re-select dates in range
            var days = start && end ? end.subtractDate(start).totalDays + 1 : 0;
            // Select days
            for (i = 0; i < days; i++)
                this._selectDay(start.addDays(i));
        }
        /**
         * Unselects all dates on display
         **/
        unselectAll() {
            this.element.find('.selectable').removeClass('selected');
        }
        /**
         * Moves the view to the next set of months
         **/
        viewNext() {
            this.setViewStart(this.viewStart.addMonths(this.rows * this.columns));
        }
        /**
         * Moves the view to the previous set of months
         **/
        viewPrevious() {
            this.setViewStart(this.viewStart.addMonths(this.rows * this.columns * -1));
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the number of columns of months
         **/
        get columns() {
            return this._columns;
        }
        /**
         * Gets or sets the number of columns of months
         **/
        set columns(value) {
            if (value < 1)
                throw new latte.InvalidArgumentEx('value');
            this._columns = value;
            this.setSelectionRange(this.selectionStart, this.selectionEnd, true);
        }
        /**
         * Gets the size of a month as an object {width, height}
         **/
        get monthSize() {
            var m = this.element.find('table.month').first();
            return {
                width: m.width(),
                height: m.height()
            };
        }
        /**
         * Gets or sets the number of rows of months
         **/
        get rows() {
            return this._rows;
        }
        /**
         * Gets or sets the number of rows of months
         **/
        set rows(value) {
            if (value < 1)
                throw new latte.InvalidArgumentEx('value');
            this._rows = value;
            this.setSelectionRange(this.selectionStart, this.selectionEnd, true);
        }
        /**
         * Gets or sets the end of selection
         **/
        get selectionEnd() {
            return this.getSelectionEnd();
        }
        /**
         * Gets or sets the end of selection
         **/
        set selectionEnd(value) {
            this.setSelectionEnd(value);
        }
        /**
         * Gets or sets the selection mode
         **/
        get selectionMode() {
            return this._selectionMode;
        }
        /**
         * Gets or sets the selection mode
         **/
        set selectionMode(value) {
            var start = this.selectionStart || latte.DateTime.today;
            var first = new latte.DateTime(start.year, start.month, 1);
            var sunday = start.addDays(-start.dayOfWeek);
            var monday = sunday.addDays(1);
            switch (value) {
                case latte.DateSelectionMode.DAY:
                    this.setSelectionRange(start, start);
                    break;
                case latte.DateSelectionMode.WEEK:
                    this.setSelectionRange(sunday, sunday.addDays(6));
                    break;
                case latte.DateSelectionMode.WORKWEEK:
                    this.setSelectionRange(monday, monday.addDays(4));
                    break;
                case latte.DateSelectionMode.MONTH:
                    this.setSelectionRange(first, first.addDays(latte.DateTime.daysInMonth(first.year, first.month) - 1));
                    break;
            }
            this._selectionMode = value;
            this.onSelectionModeChanged();
        }
        /**
         * Gets or sets the start of selection
         **/
        get selectionStart() {
            return this.getSelectionStart();
        }
        /**
         * Gets or sets the start of selection
         **/
        set selectionStart(value) {
            this.setSelectionStart(value);
        }
        /**
         * Gets the first day on view
         **/
        get viewEnd() {
            return this.element.find('td.day').last().children().first().data('instance').tag;
        }
        /**
         * Gets the first day on view
         **/
        get viewStart() {
            return this.element.find('td.day:not(.grayed)').first().children().first().data('instance').tag;
        }
    }
    latte.DateItem = DateItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class FormItem extends latte.ItemStack {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         **/
        constructor() {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._direction = null;
            /**
             * Property field
             */
            this._readOnly = null;
            /**
             * Property field
             */
            this._unsavedChanges = false;
            this.element.addClass('form');
            // Init me
            this.faceVisible = true;
            // Add label item
            this.items.add(this.titleLabel);
        }
        //region Private
        //endregion
        //region Methods
        /**
         * Returns an input by its assigned name
         **/
        byName(name) {
            if (!latte._isString(name))
                throw new latte.InvalidArgumentEx('name', name);
            for (var i = 0; i < this.inputs.count; i++) {
                if (this.inputs.item(i).name == name) {
                    return this.inputs.item(i);
                }
            }
            return null;
        }
        /**
         * Implementation. Gets an empty array since the form class itself has no way of knowing what calls should make
         * the save itself.
         */
        getSaveCalls() {
            return [];
        }
        /**
         * Gets an object with the values of fields
         **/
        getValues() {
            var r = {};
            var input = null;
            while ((input = this.inputs.next()))
                r[input.name] = input.value;
            return r;
        }
        /**
         * Raises the <c>direction</c> event
         */
        onDirectionChanged() {
            if (this._directionChanged) {
                this._directionChanged.raise();
            }
            for (var i = 0; i < this.inputs.length; i++) {
                this.inputs.item(i).direction = this.direction;
            }
        }
        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged() {
            if (this._readOnlyChanged) {
                this._readOnlyChanged.raise();
            }
            for (let i = 0; i < this.inputs.length; i++) {
                let input = this.inputs[i];
                if (input.readOnly === null && this.readOnly !== null) {
                    input.readOnly = this.readOnly;
                }
            }
        }
        /**
         * Raises the <c>unsavedChanges</c> event
         */
        onUnsavedChangesChanged() {
            if (this._unsavedChangesChanged) {
                this._unsavedChangesChanged.raise();
            }
        }
        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged() {
            if (this._valueChanged) {
                this._valueChanged.raise();
            }
            this.unsavedChanges = true;
        }
        /**
         * Sets the direction of Inputs
         * @param d
         */
        setDirection(d) {
            latte.warnDeprecated('FormItem.setDirection', 'FormItem.direction');
            this.direction = d;
        }
        /**
         * Gets or sets the with of the text parts.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        setTextWidth(value) {
            for (var i = 0; i < this.inputs.length; i++) {
                this.inputs[i].textWidth = value;
            }
        }
        /**
         * Gets an event raised when the value of the direction property changes
         *
         * @returns {LatteEvent}
         */
        get directionChanged() {
            if (!this._directionChanged) {
                this._directionChanged = new latte.LatteEvent(this);
            }
            return this._directionChanged;
        }
        /**
         * Gets an event raised when the value of the readOnly property changes
         *
         * @returns {LatteEvent}
         */
        get readOnlyChanged() {
            if (!this._readOnlyChanged) {
                this._readOnlyChanged = new latte.LatteEvent(this);
            }
            return this._readOnlyChanged;
        }
        /**
         * Gets an event raised when the value of the unsavedChanges property changes
         *
         * @returns {LatteEvent}
         */
        get unsavedChangesChanged() {
            if (!this._unsavedChangesChanged) {
                this._unsavedChangesChanged = new latte.LatteEvent(this);
            }
            return this._unsavedChangesChanged;
        }
        /**
         * Gets an event raised when the value of an input is changed
         *
         * @returns {LatteEvent}
         */
        get valueChanged() {
            if (!this._valueChanged) {
                this._valueChanged = new latte.LatteEvent(this);
            }
            return this._valueChanged;
        }
        /**
         * Gets or sets the direction of the inputs in the form
         *
         * @returns {Direction}
         */
        get direction() {
            return this._direction;
        }
        /**
         * Gets or sets the direction of the inputs in the form
         *
         * @param {Direction} value
         */
        set direction(value) {
            // Check if value changed
            let changed = value !== this._direction;
            // Set value
            this._direction = value;
            // Trigger changed event
            if (changed) {
                this.onDirectionChanged();
            }
        }
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        get faceVisible() {
            return this._faceVisible;
        }
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        set faceVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._faceVisible = value;
            if (value) {
                this.addClass('with-face');
            }
            else {
                this.removeClass('with-face');
            }
        }
        /**
         * Gets the inputs of the form
         *
         * @returns {Collection<Input>}
         */
        get inputs() {
            if (!this._inputs) {
                this._inputs = new latte.Collection((input) => {
                    this.items.add(input);
                    input.valueChanged.add(() => this.onValueChanged());
                    if (this.direction) {
                        input.direction = this.direction;
                    }
                    if (input.readOnly === null && this.readOnly !== null) {
                        input.readOnly = this.readOnly;
                    }
                    input.textVisible = true;
                }, (input) => {
                    this.items.remove(input);
                });
            }
            return this._inputs;
        }
        /**
         * Gets a value indicating if the form is currently valid
         *
         * @returns {boolean}
         */
        get isValid() {
            for (let i = 0; i < this.inputs.length; i++) {
                if (!this.inputs[i].valid) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Gets or sets a value indicating if the inputs should be read-only.
         *
         * @returns {boolean}
         */
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the inputs should be read-only.
         *
         * @param {boolean} value
         */
        set readOnly(value) {
            // Check if value changed
            let changed = value !== this._readOnly;
            // Set value
            this._readOnly = value;
            // Trigger changed event
            if (changed) {
                this.onReadOnlyChanged();
            }
        }
        /**
         * Gets or sets the title of the form
         **/
        get title() {
            return this.titleLabel.text;
        }
        /**
         * Gets or sets the title of the form
         **/
        set title(value) {
            if (value) {
                this.titleLabel.visible = true;
            }
            this.titleLabel.text = value;
        }
        /**
         * Gets or sets a value indicating if the form has changes
         *
         * @returns {boolean}
         */
        get unsavedChanges() {
            return this._unsavedChanges;
        }
        /**
         * Gets or sets a value indicating if the form has changes
         *
         * @param {boolean} value
         */
        set unsavedChanges(value) {
            // Check if value changed
            let changed = value !== this._unsavedChanges;
            // Set value
            this._unsavedChanges = value;
            // Trigger changed event
            if (changed) {
                this.onUnsavedChangesChanged();
            }
        }
        /**
         * Gets a value of checking every input in <c>inputs</c> to be valid
         **/
        get valid() {
            var input = null;
            while ((input = this.inputs.next()))
                if (!input.valid)
                    return false;
            return true;
        }
        /**
         * Gets the title label
         *
         * @returns {LabelItem}
         */
        get titleLabel() {
            if (!this._titleLabel) {
                this._titleLabel = new latte.LabelItem();
                this._titleLabel.visible = false;
                this._titleLabel.title = 1;
            }
            return this._titleLabel;
        }
    }
    latte.FormItem = FormItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Stack of items. It unselects siblings when a selectable within is selected
     */
    class SelectableStack extends latte.ItemStack {
        /**
         * Creates the item
         */
        constructor() {
            super();
            this._selectedItem = null;
            this.element.addClass('selectable');
        }
        /**
         * Clears the current selection
         */
        clearSelection() {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] instanceof latte.SelectableItem) {
                    this.items[i].selected = false;
                }
            }
            this._selectedItem = null;
            this.onSelectedItemChanged();
        }
        /**
         * Adds selection handlers
         * @param item
         */
        onAddItem(item) {
            super.onAddItem(item);
            // Add seleciton hook
            if (item instanceof latte.SelectableItem) {
                var sel = item;
                sel.selectedChanged.add(() => {
                    if (sel.selected) {
                        this._selectedItem = sel;
                        this.onSelectedItemChanged();
                        for (var i = 0; i < this.items.length; i++) {
                            if (this.items[i] !== item && this.items[i] instanceof latte.SelectableItem) {
                                this.items[i].selected = false;
                            }
                        }
                    }
                });
            }
        }
        /**
         * Raises the <c>selectedItemChanged</c> event
         */
        onSelectedItemChanged() {
            if (this._selectedItemChanged instanceof latte.LatteEvent) {
                this._selectedItemChanged.raise();
            }
        }
        /**
         * Gets the selected item of the stack
         *
         * @returns {SelectableItem}
         */
        get selectedItem() {
            return this._selectedItem;
        }
        /**
         * Gets an event raised when
         * @returns {LatteEvent}
         */
        get selectedItemChanged() {
            if (!this._selectedItemChanged) {
                this._selectedItemChanged = new latte.LatteEvent(this);
            }
            return this._selectedItemChanged;
        }
    }
    latte.SelectableStack = SelectableStack;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a Ribbon.

     Ribbons are toolbars with tabbed views of tools and a button called <c>startButton</c>.
     **/
    class Ribbon extends latte.Item {
        /**
         * Creates the Ribbon
         **/
        constructor() {
            // Init
            super();
            /**
             * Field for itemsInGroup property.
             */
            this._itemsInGroup = 2;
            this.addClass('ribbon');
            var ribbon = this;
            // Events
            this.collapsedChanged = new latte.LatteEvent(this);
            this.selectedTabChanged = new latte.LatteEvent(this);
            // Collections
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            this.tabs = new latte.Collection(this._onAddTab, this._onRemoveTab, this);
            // Elements
            this.tabsElement = $('<div>').addClass('tabs').appendTo(this.element);
            this.face = $('<div>').addClass('face').appendTo(this.element);
            this.itemsContainer = $('<div>').addClass('items-container').appendTo(this.face);
            // Create start button
            this.startButton = new latte.ButtonItem();
            this.startButton.appendTo(this.tabsElement);
            this.startButton.text = ("Untitled");
            this.startButton.dropdownVisible = false;
            this.startButton.addClass('start-button');
            // Collapse button
            this.collapseButton = new latte.ButtonItem();
            this.collapseButton.appendTo(this.element);
            this.collapseButton.faceVisible = false;
            this.collapseButton.text = null;
            this.collapseButton.icon = latte.Glyph.collapseRibbon;
            this.collapseButton.click.add(() => { this.collapsed = !this.collapsed; });
            this.collapseButton.addClass('collapse');
            // Wire events
            this.face.mouseleave(() => {
                if (this.collapsed) {
                    this.faceVisible = false;
                }
            });
            // Initialize properties
            this.tabsElement.height(this.startButton.element.height());
            latte.UiElement.disableTextSelection(this.element);
        }
        /**
         * Adds the item to the face of ribbon
         **/
        _addToFace(item) {
            /// Check if goes on itself or it needs to be placed in wrapper
            if (this._goesWrapped(item)) {
                // Goes on wrapper
                this._addWrappedItem(item);
            }
            else {
                item.appendTo(this.itemsContainer);
                this._cutLastWrapper();
            }
        }
        _cutLastWrapper() {
            if (this._lastWrapper) {
                var ch = this._lastWrapper.children();
                if (ch.length == 2) {
                    this._lastWrapper.css('paddingTop', 13);
                }
                else if (ch.length == 1) {
                    this._lastWrapper.css('paddingTop', 20);
                }
            }
            this._lastWrapper = null;
        }
        /**
         * Creates a wrapper for grouping items on ribbon's face
         **/
        _addWrappedItem(item) {
            if (!this._lastWrapper || (this._lastWrapper && this._lastWrapper.children().length == this.itemsInGroup)) {
                if (this._lastWrapper) {
                    this._cutLastWrapper();
                }
                /// Create wrapper
                this._lastWrapper = $('<div>')
                    .addClass('ribbon-wrapper')
                    .appendTo(this.itemsContainer);
            }
            item.appendTo(this._lastWrapper);
        }
        /**
         *
         **/
        _clearTabsMarks() {
            /// Remove marks from all tabs
            var tab;
            while ((tab = this.tabs.next())) {
                //MenuOverlay.mark(tab.face);
                tab.withContext = (false);
                tab.openSide = (null);
                tab.faceVisible = (false);
            }
        }
        /**
         * Gets the tab for the specified item
         **/
        _getItemTab(item) {
            var t = null;
            /// Check tab property
            if (typeof item.tab === null) {
                console.warn("The item must have 'tab' property: ");
                latte.log(item);
            }
            else if (item.tab instanceof latte.ButtonItem) {
                t = item.tab;
            }
            else if (!isNaN(item.tab)) {
                t = this.tabs.item(item.tab);
            }
            return t;
        }
        /**
         * Tells if the item should be wrapped
         **/
        _goesWrapped(item) {
            if (item instanceof latte.SeparatorItem) {
                return false;
            }
            else if (item instanceof latte.ButtonItem) {
                return item.direction != latte.Direction.VERTICAL;
            }
            else {
                return true;
            }
        }
        /**
         *
         **/
        _onAddItem(item) {
            /// Check tab property
            if (!item.tab)
                console.warn("The item must have 'tab' property: " + item);
            /// Adapt buttons for ribbon
            if (item instanceof latte.ButtonItem) {
                var b = item;
                /// Remove face
                b.faceVisible = false;
                /// Remove description
                b.description = null;
                if (b.icon && b.icon.size == 32) {
                    b.direction = latte.Direction.VERTICAL;
                }
            }
            /// If item belongs to selected tab
            if (this._getItemTab(item) === this.selectedTab) {
                // Add the item to the face
                this._addToFace(item);
            }
        }
        /**
         *
         **/
        _onAddTab(tab) {
            //            var __this = this;
            tab.appendTo(this.tabsElement);
            tab.click.add(() => { this.selectedTab = tab; });
            this.onLayout();
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            /// If item belongs to selected tab
            if (this._getItemTab(item) === this.selectedTab) {
                // Remove item from face
                item.element.detach();
            }
        }
        /**
         *
         **/
        _onRemoveTab(tab) {
            tab.element.detach();
        }
        /**
         * Adds a tab with the specified text
         **/
        addTab(text) {
            var t = new latte.TabItem();
            t.text = text;
            this.tabs.add(t);
            return t;
        }
        /**
         * Adds a separator on the specified tab
         * @param tab
         */
        addSeparator(tab) {
            var s = new latte.SeparatorItem();
            s.tab = tab;
            this.items.add(s);
        }
        /**
         * Raises the <c>collapsedChanged</c> event
         **/
        onCollapsedChanged() {
            this.collapsedChanged.raise();
        }
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            if (this.tabs.count > 0) {
                this.tabsElement.height(this.tabs.first.element.outerHeight() - 1);
            }
            else {
                this.tabsElement.height(this.startButton.height);
            }
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].onLayout();
            }
        }
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged() {
            this.selectedTabChanged.raise();
        }
        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        get collapsed() {
            return this.element.hasClass('collapsed');
        }
        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        set collapsed(value) {
            if (value) {
                this.addClass('collapsed');
                this.faceVisible = false;
                this.collapseButton.checked = true;
                this._clearTabsMarks();
            }
            else {
                this.removeClass('collapsed');
                this.collapseButton.checked = false;
                this.selectedTab = this.selectedTab;
                this.face.show().css('opacity', 1);
            }
            this.onCollapsedChanged();
        }
        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        get faceVisible() {
            return this.face.is(':visible');
        }
        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        set faceVisible(value) {
            if (!this.collapsed)
                return;
            //            var __this = this;
            if (value) {
                this.face.show().animate({ top: this.tabsElement.outerHeight(), opacity: 1 }, 100, 'swing', () => { this.onLayout(); });
                this.addClass('face-visible');
                this.removeClass('face-hidden');
            }
            else {
                this._clearTabsMarks();
                this.face.animate({ top: '-=50', opacity: 0 }, 100, 'swing', () => { this.face.hide(); this.onLayout(); });
                this.removeClass('face-visible');
                this.addClass('face-hidden');
            }
        }
        /**
         * Gets or sets the number of items in groups
         */
        get itemsInGroup() {
            return this._itemsInGroup;
        }
        /**
         * Gets or sets the number of items in groups
         */
        set itemsInGroup(value) {
            this._itemsInGroup = value;
        }
        /**
         * Gets or sets the currently selected Tab
         **/
        get selectedTab() {
            return this._selectedTab;
        }
        /**
         * Gets or sets the currently selected Tab
         **/
        set selectedTab(tab) {
            if (!(tab instanceof latte.ButtonItem))
                throw new latte.InvalidArgumentEx('tab', tab);
            /// Remove marks from all tabs
            this._clearTabsMarks();
            /// Mark tab
            tab.contextAt = latte.Side.BOTTOM;
            /// Empties items container
            this.itemsContainer.children().detach();
            this.itemsContainer.empty();
            var item;
            /// Scan items
            while ((item = this.items.next())) {
                /// If item belongs to tab
                if (this._getItemTab(item) === tab) {
                    // Add the item to the face
                    this._addToFace(item);
                }
            }
            this._cutLastWrapper();
            var changed = this._selectedTab !== tab;
            this._selectedTab = tab;
            if (this.collapsed) {
                this.faceVisible = true;
            }
            if (changed) {
                this.onSelectedTabChanged();
            }
        }
    }
    latte.Ribbon = Ribbon;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class TabContainer extends latte.ItemStack {
        constructor() {
            super();
            this.element.addClass('tab-container');
            // Create elements
            this.tabToolbar = new latte.TabToolbar();
            this.tabToolbar.faceVisible = false;
            // Init collections
            this.tabs = new latte.Collection(this.onTabAdded, this.onTabRemoved, this);
            this.content = new latte.Collection(this.onContentAdded, this.onContentRemoved, this);
            // Init events
            this.selectedTabChanged = new latte.LatteEvent(this);
            this.tabToolbar.selectedTabChanged.add(() => {
                this.onSelectedTabChanged();
            });
        }
        updateVisibility() {
            var index = this.tabs.indexOf(this.selectedTab);
            var item = this.content[index];
            for (var i = 0; i < this.content.length; i++) {
                var checker = this.content[i];
                if (checker === item) {
                    checker.element.show();
                }
                else {
                    checker.element.hide();
                }
            }
        }
        /**
         *
         **/
        onTabAdded(tab) {
            this.tabToolbar.tabs.add(tab);
            this.onLayout();
        }
        /**
         *
         **/
        onTabRemoved(tab) {
            this.tabToolbar.tabs.remove(tab);
        }
        /**
         *
         * @param item
         */
        onContentAdded(item) {
            this.contentSide = this.contentSide;
            item.addClass('content');
        }
        /**
         *
         * @param item
         */
        onContentRemoved(item) {
            //            this.contentSide = this.contentSide;
        }
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged() {
            this.updateVisibility();
            this.selectedTabChanged.raise();
        }
        /**
         * Gets or sets the selected tab of the view
         **/
        get selectedTab() {
            return this.tabToolbar.selectedTab;
        }
        /**
         * Gets or sets the selected tab of the view
         **/
        set selectedTab(value) {
            this.tabToolbar.selectedTab = value;
            this.onSelectedTabChanged();
        }
        /**
         * Gets the side where content should be relative to the tabs
         * @returns {Side}
         */
        get contentSide() {
            return this.tabToolbar.contentSide;
        }
        /**
         * Sets the side where content should be relative to the tabs
         * @param value
         */
        set contentSide(value) {
            this.tabToolbar.contentSide = value;
            // Clear classes
            this.element.removeClass('content-at-top content-at-bottom content-at-left content-at-right');
            // Set class
            switch (value) {
                case latte.Side.TOP:
                    this.element.addClass('content-at-top');
                    break;
                case latte.Side.BOTTOM:
                    this.element.addClass('content-at-bottom');
                    break;
                case latte.Side.LEFT:
                    this.element.addClass('content-at-left');
                    break;
                case latte.Side.RIGHT:
                    this.element.addClass('content-at-right');
                    break;
            }
            // Clear stack items
            this.items.clear();
            var addViews = () => {
                for (var i = 0; i < this.content.length; i++) {
                    this.items.add(this.content[i]);
                }
            };
            if (value == latte.Side.BOTTOM) {
                // Toolbar first
                this.items.add(this.tabToolbar);
                // Add views
                addViews();
            }
            else if (value == latte.Side.TOP) {
                // Views first
                addViews();
                // Toolbar last
                this.items.add(this.tabToolbar);
            }
            this.updateVisibility();
        }
    }
    latte.TabContainer = TabContainer;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Toolbar specialized on showing tabs.
     *
     * This toolbar is necessary because of the rendering styles applied to tabs to make the
     * graphical "tab" effect.
     */
    class TabToolbar extends latte.Toolbar {
        /**
         * Creates the toolbar
         */
        constructor() {
            super();
            this.element.addClass('tab');
            // Init collection
            this.tabs = new latte.Collection(this.onTabAdded, this.onTabRemoved, this);
            // Init events
            this.selectedTabChanged = new latte.LatteEvent(this);
            this.contentSide = latte.Side.BOTTOM;
        }
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged() {
            this.selectedTabChanged.raise();
        }
        /**
         * Handles tab adding
         * @param tab
         */
        onTabAdded(tab) {
            this.items.add(tab);
            tab.contentSide = this.contentSide;
            tab.click.add(() => {
                this.selectedTab = tab;
            });
        }
        /**
         * Handles tab removing
         * @param tab
         */
        onTabRemoved(tab) {
            this.items.remove(tab);
        }
        /**
         * Gets the current content side
         * @returns {Side}
         */
        get contentSide() {
            return this._contentSide;
        }
        /**
         * Sets the content side of tabs
         * @param value
         */
        set contentSide(value) {
            this._contentSide = value;
            // Set side of all tabs
            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs[i].contentSide = value;
            }
            // Clear classes
            this.element.removeClass('content-at-top content-at-bottom content-at-left content-at-right');
            // Set class
            switch (value) {
                case latte.Side.TOP:
                    this.element.addClass('content-at-top');
                    break;
                case latte.Side.BOTTOM:
                    this.element.addClass('content-at-bottom');
                    break;
                case latte.Side.LEFT:
                    this.element.addClass('content-at-left');
                    break;
                case latte.Side.RIGHT:
                    this.element.addClass('content-at-right');
                    break;
            }
        }
        /**
         * Gets the selected tab of the toolbar
         * @returns {TabItem}
         */
        get selectedTab() {
            return this._selectedTab;
        }
        /**
         * Sets the selected tab of the toolbar
         * @param value
         */
        set selectedTab(value) {
            var changed = value !== this._selectedTab;
            this._selectedTab = value;
            if (changed) {
                // De-activate siblings
                for (var i = 0; i < this.tabs.length; i++) {
                    var tab = this.tabs[i];
                    if (tab !== value) {
                        tab.active = false;
                    }
                }
                // Activate selected
                value.active = true;
                this.onSelectedTabChanged();
            }
        }
    }
    latte.TabToolbar = TabToolbar;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * An Item for containing a View
     **/
    class ViewItem extends latte.Item {
        /**
         * Creates the Item, optionally specifies the view to contain.
         **/
        constructor(view = null) {
            super();
            this.element.addClass('view');
            if (view)
                this.view = view;
        }
        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        get autoHeight() {
            return this._autoHeight;
        }
        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        set autoHeight(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._autoHeight = value;
            if (value) {
                this.view.element.css('bottom', 'inherit');
                this.view.container.css('bottom', 'inherit');
            }
            else {
                this.view.element.css('bottom', '');
                this.view.container.css('bottom', '');
            }
        }
        /**
         * Gets or sets the height of the item, and so the view
         **/
        get height() {
            return this.element.height();
        }
        /**
         * Gets or sets the height of the item, and so the view
         **/
        set height(value) {
            this.element.height(value);
        }
        /**
         * Gets or sets the View inside this item
         **/
        get view() {
            return this._view;
        }
        /**
         * Gets or sets the View inside this item
         **/
        set view(value) {
            this._view = value;
            this.element.empty();
            value.appendTo(this.element);
        }
    }
    latte.ViewItem = ViewItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a widget.

     Widgets are like small windows who can be maximized, minimized and dragged around.
     **/
    class WidgetItem extends latte.Item {
        /**
         * Creates the widget
         **/
        constructor() {
            // Init
            super();
            /**
             *
             **/
            this._allowClose = true;
            /**
             *
             **/
            this._allowMaximize = true;
            /**
             *
             **/
            this._allowMinimize = true;
            var widget = this;
            this.element.addClass('widget');
            // Init events
            this.closed = new latte.LatteEvent(this);
            this.maximized = new latte.LatteEvent(this);
            this.minimizedChanged = new latte.LatteEvent(this);
            // Init collections
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            this.options = new latte.Collection(this._onAddOption, this._onRemoveOption, this);
            // Init main elements
            this.topToolbar = new latte.Toolbar();
            this.topToolbar.appendTo(this.element);
            this.stack = new latte.ItemStack();
            this.stack.appendTo(this.element);
            this.toolbar = new latte.Toolbar();
            this.toolbar.visible = false;
            this.toolbar.appendTo(this.element);
            this.topToolbar.element.addClass('top');
            this.toolbar.element.addClass('bottom');
            // Init detailed elements
            this.titleLabel = new latte.LabelItem();
            this.optionsButton = new latte.ButtonItem();
            this.optionsButton.icon = latte.Glyph.down;
            this.closeButton = new latte.ButtonItem();
            this.closeButton.icon = latte.Glyph.dismiss;
            this.minimizeButton = new latte.ButtonItem();
            this.minimizeButton.icon = latte.Glyph.collapseWidget;
            this.maximizeButton = new latte.ButtonItem();
            this.maximizeButton.icon = latte.Glyph.maximize;
            // Prepare top toolbar
            this.topToolbar.items.add(this.optionsButton);
            this.topToolbar.items.add(this.titleLabel);
            this.topToolbar.sideItems.addArray([this.closeButton, this.maximizeButton, this.minimizeButton]);
            // Default reacts
            this.closeButton.click.add(() => { this.onClosed(); });
            this.minimizeButton.click.add(() => { this.minimized = !this.minimized; });
            this.maximizeButton.click.add(() => { this.onMaximized(); });
            this.toolbar.itemsChanged.add(() => { this.onLayout(); });
            this.toolbar.sideItemsChanged.add(() => { this.onLayout(); });
            this.topToolbar.element.dblclick(() => { if (this.allowMaximize)
                this.onMaximized(); });
        }
        /**
         *
         **/
        _onAddItem(item) {
            this.stack.items.add(item);
        }
        /**
         *
         **/
        _onAddOption(item) {
            this.optionsButton.items.add(item);
            this.optionsButton.glyph = null;
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            this.stack.items.remove(item);
        }
        /**
         *
         **/
        _onRemoveOption(item) {
            this.optionsButton.items.remove(item);
        }
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed() {
            this.closed.raise();
        }
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            this.stack.onLayout();
            // Check bottom bar visible
            this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;
        }
        /**
         * Raises the <c>maximized</c> event
         **/
        onMaximized() {
            this.maximized.raise();
        }
        /**
         * Raises the <c>minimized</c> event
         **/
        onMinimizedChanged() {
            this.minimizedChanged.raise();
        }
        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        get allowClose() {
            return this._allowClose;
        }
        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        set allowClose(value) {
            this._allowClose = value;
            this.closeButton.visible = value;
            this.onLayout();
        }
        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        get allowMaximize() {
            return this._allowMaximize;
        }
        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        set allowMaximize(value) {
            this._allowMaximize = value;
            this.maximizeButton.visible = value;
            this.onLayout();
        }
        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        get allowMinimize() {
            return this._allowMinimize;
        }
        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        set allowMinimize(value) {
            this._allowMinimize = value;
            this.minimizeButton.visible = value;
            this.onLayout();
        }
        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        get minimized() {
            return this._minimized;
        }
        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        set minimized(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            var original = this._minimized;
            if (value) {
                this.element.addClass('minimized');
                this.stack.visible = false;
                this.toolbar.visible = false;
                this.minimizeButton.icon = latte.Glyph.expandWidget;
            }
            else {
                this.element.removeClass('minimized');
                this.stack.visible = true;
                this.toolbar.visible = this.toolbar.items.count > 0 || this.toolbar.sideItems.count > 0;
                this.minimizeButton.icon = latte.Glyph.collapseWidget;
            }
            this._minimized = value;
            if (original !== this._minimized)
                this.onMinimizedChanged();
        }
        /**
         * Gets or sets the title of the widget
         **/
        get title() {
            return this.titleLabel.text;
        }
        /**
         * Gets or sets the title of the widget
         **/
        set title(value) {
            this.titleLabel.text = value;
            this.titleLabel.tooltip = value;
            this.onLayout();
        }
    }
    latte.WidgetItem = WidgetItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a column header
     **/
    class ColumnHeader extends latte.LabelItem {
        //endregion
        /**
         * Creates the Column Header
         **/
        constructor(text = '', width = 150) {
            super();
            //region Fields
            this.mouseDownRect = null;
            this.mouseDownPoint = null;
            this.bodyMouseMoveHandler = null;
            this.bodyMouseUpHandler = null;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._sortable = false;
            /**
             * Property field
             */
            this._width = 0;
            this.element.addClass('column-header');
            this.element.append(this.resizer);
            this.element.click(() => { if (this.sortable)
                this.onSortRequested(); });
            this.width = width;
            this.text = text;
        }
        //region Methods
        /**
         * Handles mouse down of resizer
         * @param e
         */
        resizer_MouseDown(e) {
            this.addClass('resizing');
            this.mouseDownPoint = new latte.Point(e.clientX, e.clientY);
            this.mouseDownRect = this.element.get(0).getBoundingClientRect();
            this.bodyMouseMoveHandler = (e) => this.body_MouseMove(e);
            this.bodyMouseUpHandler = (e) => this.body_MouseUp(e);
            document.body.addEventListener('mousemove', this.bodyMouseMoveHandler);
            document.body.addEventListener('mouseup', this.bodyMouseUpHandler);
        }
        /**
         * Handles temporary body mouse up
         * @param e
         */
        body_MouseUp(e) {
            this.removeClass('resizing');
            // Flush the toilet: Xin Lee.
            document.body.removeEventListener('mousemove', this.bodyMouseMoveHandler);
            document.body.removeEventListener('mouseup', this.bodyMouseUpHandler);
        }
        /**
         * Handles temporary body mouse move
         * @param e
         */
        body_MouseMove(e) {
            e.preventDefault();
            this.width = e.clientX - this.mouseDownRect.left;
        }
        /**
         * Raises the <c>autoResize</c> event
         */
        onAutoResize() {
            if (this._autoResize) {
                return this._autoResize.raise();
            }
        }
        /**
         * Raises the <c>autoResizeAll</c> event
         */
        onAutoResizeAll() {
            if (this._autoResizeAll) {
                this._autoResizeAll.raise();
            }
        }
        /**
         * Raises the <c>sortable</c> event
         */
        onSortableChanged() {
            if (this._sortableChanged) {
                return this._sortableChanged.raise();
            }
            this.ensureClass('sortable', this.sortable);
        }
        /**
         * Raises the <c>width</c> event
         */
        onWidthChanged() {
            if (this._widthChanged) {
                this._widthChanged.raise();
            }
            this.element.width(this._width);
        }
        /**
         * Gets an event raised when user requests auto resize
         *
         * @returns {LatteEvent}
         */
        get autoResize() {
            if (!this._autoResize) {
                this._autoResize = new latte.LatteEvent(this);
            }
            return this._autoResize;
        }
        /**
         * Gets an event raised when the user requests to autoresize all columns
         *
         * @returns {LatteEvent}
         */
        get autoResizeAll() {
            if (!this._autoResizeAll) {
                this._autoResizeAll = new latte.LatteEvent(this);
            }
            return this._autoResizeAll;
        }
        /**
         * Gets an event raised when the value of the sortable property changes
         *
         * @returns {LatteEvent}
         */
        get sortableChanged() {
            if (!this._sortableChanged) {
                this._sortableChanged = new latte.LatteEvent(this);
            }
            return this._sortableChanged;
        }
        /**
         * Gets an event raised when sort is requested
         *
         * @returns {LatteEvent}
         */
        get sortRequested() {
            if (!this._sortRequested) {
                this._sortRequested = new latte.LatteEvent(this);
            }
            return this._sortRequested;
        }
        /**
         * Raises the <c>sortRequested</c> event
         */
        onSortRequested() {
            if (this._sortRequested) {
                return this._sortRequested.raise();
            }
        }
        /**
         * Gets an event raised when the value of the width property changes
         *
         * @returns {LatteEvent}
         */
        get widthChanged() {
            if (!this._widthChanged) {
                this._widthChanged = new latte.LatteEvent(this);
            }
            return this._widthChanged;
        }
        /**
         * Gets or sets a boolean indicating if the header is sortable
         *
         * @returns {boolean}
         */
        get sortable() {
            return this._sortable;
        }
        /**
         * Gets or sets a boolean indicating if the header is sortable
         *
         * @param {boolean} value
         */
        set sortable(value) {
            // Check if value changed
            let changed = value !== this._sortable;
            // Set value
            this._sortable = value;
            // Trigger changed event
            if (changed) {
                this.onSortableChanged();
            }
        }
        /**
         * Gets or sets the width of the header
         *
         * @returns {number}
         */
        get width() {
            return this._width;
        }
        /**
         * Gets or sets the width of the header
         *
         * @param {number} value
         */
        set width(value) {
            let original = this._width;
            // Check if value changed
            let changed = value !== this._width;
            // Set value
            this._width = value;
            // Trigger changed event
            if (changed) {
                this.onWidthChanged();
            }
        }
        /**
         * Gets the resizer of the column
         *
         * @returns {HTMLDivElement}
         */
        get resizer() {
            if (!this._resizer) {
                this._resizer = document.createElement('div');
                this._resizer.className = 'resizer';
                this._resizer.addEventListener('mousedown', (e) => this.resizer_MouseDown(e));
                this._resizer.addEventListener('dblclick', (e) => {
                    if (e.ctrlKey || e.metaKey) {
                        this.onAutoResizeAll();
                    }
                    else {
                        this.onAutoResize();
                    }
                });
            }
            return this._resizer;
        }
    }
    latte.ColumnHeader = ColumnHeader;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Label with date time as value. When clicked swaps between relative date
     and exact date displaying.
     **/
    class DateTimeLabel extends latte.LabelItem {
        /**
         * Creates the label. Optionally it may be initialized with a date, passed
         as a <c>string</c> or a <c>latte.DateTime</c> object.
         **/
        constructor(value = null) {
            super();
            /**
             *
             **/
            this._relative = true;
            this.addClass('datetime');
            this.element.click(() => {
                this.relative = !this.relative;
            });
            if (value)
                this.value = value;
        }
        /**
         * Updates the text of the label
         **/
        _updateText() {
            if (this.value) {
                if (this.relative) {
                    this.text = this.value.toRelativeString();
                    this.tooltip = this.value.toFormattedString();
                }
                else {
                    this.text = this.value.toFormattedString();
                    this.tooltip = this.value.toRelativeString();
                }
            }
        }
        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        get relative() {
            return this._relative;
        }
        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        set relative(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value');
            this._relative = value;
            this._updateText();
        }
        /**
         * Gets or sets the value of the label
         **/
        get value() {
            return this._value;
        }
        /**
         * Gets or sets the value of the label
         **/
        set value(value) {
            if (latte._isString(value))
                value = latte.DateTime.fromString(value);
            if (!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');
            this._value = value;
            this._updateText();
        }
    }
    latte.DateTimeLabel = DateTimeLabel;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a Comment
     **/
    class CommentItem extends latte.Item {
        /**
         * Creates the item
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._relativeDate = true;
            var item = this;
            this.element.addClass('comment');
            latte.UiElement.enableTextSelection(this.element);
            // Initialize events
            this.userDetail = new latte.LatteEvent(this);
            // Initialize elements
            this.blinkerElement = $('<div>').addClass('blinker').appendTo(this.element);
            this.container = $('<div>').addClass('comment-content').appendTo(this.element);
            this.iconSideElement = $('<div>').addClass('icon-side').appendTo(this.container);
            this.commentSideElement = $('<div>').addClass('comment-side').appendTo(this.container);
            this.userElement = $('<a>', { href: 'javascript:void(0)' }).addClass('user').appendTo(this.commentSideElement);
            this.textElement = $('<span>').addClass('text').appendTo(this.commentSideElement);
            this.dateElement = $('<div>').addClass('date').appendTo(this.commentSideElement);
            this.container.clear();
            this.element.clear();
            // Elements handlers
            this.userElement.click(() => { item.onUserDetail(); });
            this.iconSideElement.click(() => { item.onUserDetail(); });
            this.dateElement.click(() => { item.relativeDate = !item.relativeDate; });
            this.icon = latte.IconItem.empty(32);
        }
        /**
         * Blinks to call for attention. Optionally specifies the milliseconds to blink.
         **/
        blink(milliseconds = 0) {
            if (latte._undef(milliseconds))
                milliseconds = 3000;
            var __this = this;
            this.blinkerElement
                .show()
                .animate({ opacity: 0 }, milliseconds, 'swing', function () {
                __this.blinkerElement.hide().css({ opacity: 1 });
            });
        }
        /**
         * Raises the <c>userDetail</c> event
         **/
        onUserDetail() {
            this.userDetail.raise();
        }
        /**
         * Gets or sets the date of the comment
         **/
        get date() {
            return this._date;
        }
        /**
         * Gets or sets the date of the comment
         **/
        set date(value) {
            if (!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');
            if (this.relativeDate) {
                this.dateElement.html(value.toRelativeString());
                this.dateElement.attr('title', value.toString());
            }
            else {
                this.dateElement.html(value.toString());
                this.dateElement.attr('title', value.toRelativeString());
            }
            this._date = value;
        }
        /**
         * Gets or sets the icon of the comment.
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the icon of the comment.
         **/
        set icon(value) {
            this.iconSideElement.empty();
            if (value instanceof latte.IconItem)
                this.iconSideElement.append(value.element);
            this._icon = value;
        }
        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        get relativeDate() {
            return this._relativeDate;
        }
        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        set relativeDate(value) {
            this._relativeDate = value;
            // Refresh date
            this.date = this.date;
        }
        /**
         * Gets or sets the date of the comment
         **/
        get text() {
            return this._text;
        }
        /**
         * Gets or sets the date of the comment
         **/
        set text(value) {
            this.textElement.html(value);
            this._text = value;
        }
        /**
         * Gets or sets the date of the comment
         **/
        get user() {
            return this._user;
        }
        /**
         * Gets or sets the date of the comment
         **/
        set user(value) {
            this.userElement.html(value);
            this._user = value;
        }
    }
    latte.CommentItem = CommentItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents an item for calendar views
     **/
    class CalendarItem extends latte.SelectableLabel {
        /**
         * Creates the item
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('calendar');
            // Rectangles
            this.rectangles = new latte.Collection(this._onAddRectangle, this._onRemoveRectangle, this);
            // Hide element. It is not visible by default
            this.element.hide();
        }
        /**
         *
         **/
        _onAddRectangle(r) {
            // Clone element
            var clon = this.element.clone();
            // Set bounds of clon
            clon.rectangle(r);
            // append as sibling
            this.element.parent().append(clon);
            clon.click((evt) => {
                this.selected = !this.selected;
                evt.stopPropagation();
            });
            // Make visible
            clon.show();
            // mark rectangle
            r.tag = clon;
        }
        /**
         *
         **/
        _onRemoveRectangle(r) {
            if (r.tag instanceof jQuery)
                r.tag.remove();
        }
        /**
         * Clones the item
         **/
        clone() {
            var c = new CalendarItem();
            c.dateStart = this.dateStart;
            c.dateEnd = this.dateEnd;
            c.text = this.text;
            return c;
        }
        /**
         *
         **/
        onSelectedChanged() {
            super.onSelectedChanged();
        }
        /**
         * Gets a value indicating if the item is an <c>all-day</c> item.
         All-day items are those who its time of day both start and end dates are zero minutes
         **/
        get allDay() {
            return this._dateStart.timeOfDay.totalMinutes == 0
                && this._dateEnd.timeOfDay.totalMinutes == 0;
        }
        /**
         * Gets or sets the end date of the item
         **/
        get dateEnd() {
            return this._dateEnd;
        }
        /**
         * Gets or sets the end date of the item
         **/
        set dateEnd(value) {
            if (!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');
            this._dateEnd = value;
        }
        /**
         * Gets or sets the start date of the item
         **/
        get dateStart() {
            return this._dateStart;
        }
        /**
         * Gets or sets the start date of the item
         **/
        set dateStart(value) {
            if (!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');
            this._dateStart = value;
        }
        /**
         * Gets or sets the text of the item
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets or sets the text of the item
         **/
        set text(value) {
            this.label.text = value;
        }
    }
    latte.CalendarItem = CalendarItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents an item of a ListView
     **/
    class ListViewItem extends latte.SelectableItem {
        /**
         * Creates the Item. Optionally specifies its <c>ListView</c>
         **/
        constructor(listView = null) {
            super();
            /**
             *
             **/
            this._iconPadding = 10;
            /**
             *
             */
            this._columns = [];
            /**
             * Holds pointers to items
             */
            this._items = [];
            /**
             * Property field
             */
            this._listView = null;
            // Init
            this.element.addClass('list');
            // Init events
            this.activated = new latte.LatteEvent(this);
            // Init elements
            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.columnsElement = $('<div>').addClass('columns').appendTo(this.element);
            this.element.clear();
            // Add empty icon
            this.icon = latte.IconItem.empty(16);
            // Check if list passed
            if (listView) {
                this._listView = listView;
                listView.items.add(this);
            }
        }
        /**
         * Adds a column of the specified width
         **/
        addColumn(width = 200) {
            var column = $('<div>').width(width);
            this._columns.push(column);
            this.columnsElement.append(column);
            this.onLayout();
            return this;
        }
        /**
         * Gets the column element at the specified index
         *
         * @deprecated use columns.count instead
         **/
        getColumn(index) {
            latte.warnDeprecated("ListViewItem.getColumn", "ListViewItem.columns");
            return this.columns[index];
        }
        /**
         * Gets the count of columns in item
         *
         * @deprecated use columns.count instead
         **/
        getColumnCount() {
            latte.warnDeprecated("ListViewItem.getColumnCount", "ListViewItem.columns.length");
            return this.columns.length;
        }
        /**
         * Returns or sets the item of the specified column. First column's index is zero.
         *
         * @deprecated Use getItem and setItem methods
         **/
        item(index, value) {
            latte.warnDeprecated("ListViewItem.item", "ListViewItem.getItem and ListViewItem.setItem");
            if (!latte._isNumber(index) || index < 0 || index > this.columns.length)
                throw new latte.InvalidArgumentEx('index');
            if (latte._undef(value)) {
                return this._items[index];
            }
            this.setItem(index, value);
            return this;
        }
        /**
         * Raises the <c>activated</c> event
         **/
        onActivated() {
            this.activated.raise(this);
        }
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout() {
            if (this.element.parent().length === 0)
                return;
            super.onLayout();
            var w = 0;
            for (var i = 0; i < this.columns.length; i++) {
                w += this.columns[i].outerWidth();
            }
            // Icon padding
            w += this._iconPadding;
            if (this._icon instanceof latte.IconItem)
                w += this._icon.size;
            this.columnsElement.width(w);
            this.iconElement.css('margin-right', this._iconPadding);
            // this.element.css('min-width', w + this._iconPadding * 2);
            if (this.listView)
                this.element.css('min-width', this.listView.columnHeadersWidth);
        }
        /**
         *
         **/
        onSelectedChanged() {
            if (this.selected) {
                // Get TreeView
                var lv = this.listView;
                // Inform tree view selection
                if (lv) {
                    lv.informSelectedItem(this);
                }
            }
            super.onSelectedChanged();
            if (this.selected) {
                this.onActivated();
            }
        }
        /**
         * Sets the width of the specified column
         **/
        setColumnWidth(index, width) {
            this._columns[index].width(width);
        }
        /**
         * Gets the item at the specified column
         * @param index
         */
        getItem(index) {
            return this._items[index];
        }
        /**
         * Gets the text of a column (if a LabelItem)
         * @param index
         */
        getText(index) {
            if (this._items[index] instanceof latte.LabelItem) {
                return this._items[index].text;
            }
            else {
                latte.log("ListViewItem.getText should be not invoked on non-LabelItem items. This addresses performance.");
                return this._columns[index].text();
            }
        }
        /**
         * Sets the text of a column
         *
         * @param index
         * @param text
         */
        setText(index, text) {
            this.setItem(index, new latte.LabelItem(text));
        }
        /**
         * Sets the item at the specified column
         * @param index
         * @param item
         */
        setItem(index, item) {
            if (!latte._isNumber(index) || index < 0 || index > this.columns.length) {
                throw new latte.InvalidArgumentEx('index');
            }
            // Empty column
            this.columns[index].empty();
            // Append Item
            this.columns[index].append(item.element);
            // Save item
            this._items[index] = item;
            // Perform layout
            this.onLayout();
        }
        /**
         * Returns or sets the text of the specified column.
         * When setting, it is equivalent to passing a <c>LabelItem</c> to the <c>item</c> method.
         *
         * @deprecated Use getText and setText instead
         **/
        text(index, value = '') {
            latte.warnDeprecated("ListViewItem.text", "ListViewItem.getText and ListViewItem.setText");
            if (!latte._isNumber(index) || index < 0 || index > this.columns.length)
                throw new latte.InvalidArgumentEx('index');
            if (latte._undef(value)) {
                var item = this.item(index);
                return item instanceof latte.Item ? item.element.text() : null;
            }
            var lbl = new latte.LabelItem();
            lbl.text = value;
            this.item(index, lbl);
            return value;
        }
        /**
         * Gets the column elements of the item
         *
         * @returns {Array<JQuery>}
         */
        get columns() {
            return this._columns;
        }
        /**
         * Gets or sets the icon of the item.
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the icon of the item.
         **/
        set icon(value) {
            // Empty element
            this.iconElement.empty();
            if (value instanceof latte.IconItem)
                this.iconElement.append(value.element).clear();
            this._icon = value;
            this.onLayout();
        }
        /**
         * Gets or sets the listview of the item
         *
         * @returns {ListView}
         */
        get listView() {
            return this._listView;
        }
        /**
         * Gets or sets the listview of the item
         *
         * @param {ListView} value
         */
        set listView(value) {
            this._listView = value;
        }
    }
    latte.ListViewItem = ListViewItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Single element containing text
     */
    class UiText extends latte.UiElement {
        /**
         * Creates the text
         */
        constructor(text = null) {
            super();
            this.addClass('text');
            if (text !== null) {
                this.text = text;
            }
        }
        /**
         * Trims the text and adds ellipsis if it overpasses the limit.
         *
         * @param text
         * @param length
         * @returns {string}
         */
        static ellipsis(text, length = 50) {
            if (!latte._isString(text) || text.length < length) {
                return text;
            }
            return text.substr(0, length) + '...';
        }
        /**
         * Gets the text/html of the box
         * @returns {string}
         */
        get text() {
            return this.element.html();
        }
        /**
         * Sets the text/html of the box
         * @param value
         */
        set text(value) {
            this.element.html(value);
        }
    }
    latte.UiText = UiText;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders an Item that may contains more <c>TreeItem</c>s and shows them as a tree.
     **/
    class TreeItem extends latte.Item {
        /**
         * Creates the item
         **/
        constructor() {
            super();
            //endregion
            /**
             *
             **/
            this._expandOnSelect = true;
            /**
             *
             **/
            this._level = 0;
            var item = this;
            // Init
            latte.UiElement.disableTextSelection(this.element);
            this.click = new latte.LatteEvent(this);
            this.loadItems = new latte.LatteEvent(this);
            this.selectedChanged = new latte.LatteEvent(this);
            // Update glyph when loadItems handler is added
            this.loadItems.handlerAdded.add(() => {
                //this.glyph = Glyph.expand;
                this._updateGlyph();
            });
            this.element.addClass('tree-item');
            this.faceElement = latte.Item.selectable().appendTo(this.element);
            this.levelElement = $('<div>').addClass('level').appendTo(this.faceElement);
            this.glyphElement = $('<div>').addClass('glyph').appendTo(this.faceElement);
            this.iconElement = $('<div>').addClass('icon').appendTo(this.faceElement);
            this.textElement = $('<div>').addClass('text').appendTo(this.faceElement);
            this.faceElement.clear();
            this.itemsElement = $('<div>').addClass('items-container').hide().appendTo(this.element);
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            this.glyphElement
                .click((evt) => {
                item.expanded = !item.expanded;
                evt.stopPropagation();
            });
            this.faceElement
                .click(() => {
                this.selected = true;
                this.onClick();
            });
        }
        /**
         *
         **/
        _onAddItem(item) {
            item.level = this.level + 1;
            item._parent = this;
            this.itemsElement.append(item.element);
            item._updateGlyph();
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item._parent = null;
            item.element.remove();
        }
        /**
         *
         **/
        _updateGlyph() {
            if (this.hasItems) {
                if (this.expanded) {
                    if (TreeItem.globalCollapseGlyph) {
                        this.glyph = TreeItem.globalCollapseGlyph(this);
                    }
                    else {
                        if (this.treeView && this.treeView.defaultGlyphCollapse) {
                            if (this.selected && this.treeView.defaultGlyphCollapseSelected)
                                this.glyph = this.treeView.defaultGlyphCollapseSelected.clone();
                            else
                                this.glyph = this.treeView.defaultGlyphCollapse.clone();
                        }
                        else {
                            this.glyph = latte.Glyph.collapse;
                        }
                    }
                }
                else {
                    if (TreeItem.globalExpandGlyph) {
                        this.glyph = TreeItem.globalExpandGlyph(this);
                    }
                    else {
                        if (this.treeView && this.treeView.defaultGlyphExpand) {
                            if (this.selected && this.treeView.defaultGlyphExpandSelected)
                                this.glyph = this.treeView.defaultGlyphExpandSelected.clone();
                            else
                                debugger;
                            this.glyph = this.treeView.defaultGlyphExpand.clone();
                        }
                        else {
                            // debugger;
                            this.glyph = latte.Glyph.expand;
                        }
                    }
                }
            }
        }
        /**
         * Deletes the node from its parent
         **/
        deleteFromParent() {
            if (this.parent) {
                this.parent.items.remove(this);
            }
            else {
                if (this.treeView) {
                    this.treeView.items.remove(this);
                }
                else {
                    throw new latte.InvalidCallEx();
                }
            }
        }
        /**
         * Raises the <c>click</c> event
         **/
        onClick() {
            this.click.raise();
        }
        /**
         * Raises the <c>loadItems</c> event
         **/
        onLoadItems() {
            this.loadItems.raise();
        }
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged() {
            this.selectedChanged.raise();
            if (this.selectedIcon) {
                if (this.selected) {
                    this.selectedIcon.appendTo(this.iconElement.empty());
                }
                else {
                    this.icon.appendTo(this.iconElement.empty());
                }
            }
            this._updateGlyph();
        }
        /**
         * Reports to the <c>TreeView</c> that items have been loaded
         so it can trigger the <c>itemItemsLoaded</c>
         **/
        reportItemsLoaded() {
            var tree = this.treeView;
            if (tree instanceof latte.TreeView) {
                tree.onItemItemsLoaded(this);
            }
        }
        /**
         * Returns the top most parent of the item
         **/
        topParent() {
            if (latte._undef(this.parent)) {
                return this;
            }
            else {
                return this.parent.topParent();
            }
        }
        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        get expandOnSelect() {
            return this._expandOnSelect;
        }
        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        set expandOnSelect(value) {
            if (typeof value != 'boolean')
                throw new latte.InvalidArgumentEx('value');
            this._expandOnSelect = value;
        }
        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        get expanded() {
            return this._expanded;
        }
        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        set expanded(value) {
            if (this.hasItems) {
                if (!latte._isBoolean(value))
                    throw new latte.InvalidArgumentEx('value');
                this._expanded = value;
                if (value) {
                    this.itemsElement.show();
                    this.onLoadItems();
                }
                else {
                    this.itemsElement.hide();
                }
                this._updateGlyph();
            }
        }
        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        get glyph() {
            return this._glyph;
        }
        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        set glyph(value) {
            this.glyphElement.empty().append(value.element);
            this._glyph = value;
        }
        /**
         * Gets a value indicating if the item contains child items or a handler for <c>loadItems</c> has been set
         **/
        get hasItems() {
            return this.items.length > 0 || (latte._isArray(this.loadItems.handlers) && this.loadItems.handlers.length > 0);
        }
        /**
         * Gets or sets the icon of the item
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the icon of the item
         **/
        set icon(value) {
            if (!(value instanceof latte.IconItem))
                throw new latte.InvalidArgumentEx('value');
            this._icon = value;
            // Append icon
            value.appendTo(this.iconElement.empty());
        }
        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        get level() {
            return this._level;
        }
        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        set level(value) {
            this._level = value;
            this.levelElement.width(value * 16);
        }
        /**
         * Gets the parent <c>TreeItem</c> of this item
         **/
        get parent() {
            return this._parent;
        }
        /**
         * Gets the navigation path as a string
         **/
        get path() {
            var r = [];
            var item = this;
            while (item != null) {
                r.push(item.text);
                item = item.parent;
            }
            r.reverse();
            return "/" + r.join("/");
        }
        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        get selected() {
            return this._selected;
        }
        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        set selected(value) {
            var changed = value !== this._selected;
            this._selected = value;
            if (value) {
                // Get TreeView
                var tv = this.treeView;
                if (tv) {
                    //region Unselect siblings of all tree
                    var tabOf = (len) => {
                        var s = '';
                        for (var i = 0; i < len; i++)
                            s += '-';
                        return s;
                    };
                    var unselect = (item, tab = 0) => {
                        if (item !== this && item.selected) {
                            item.selected = false;
                        }
                        for (var i = 0; i < item.items.length; i++) {
                            unselect(item.items[i], tab + 1);
                        }
                    };
                    for (var i = 0; i < tv.items.length; i++) {
                        unselect(tv.items[i]);
                    }
                }
                // Select face
                this.faceElement.addClass('selected');
                // Expand if needed
                if (this.expandOnSelect && !this.expanded) {
                    this.expanded = true;
                }
                // Inform tree view selection
                if (tv) {
                    tv.informSelectedItem(this);
                }
            }
            else {
                this.faceElement.removeClass('selected');
            }
            if (changed) {
                this.onSelectedChanged();
            }
        }
        /**
         * Gets or sets the icon of the item when selected
         **/
        get selectedIcon() {
            return this._selectedIcon;
        }
        /**
         * Gets or sets the icon of the item when selected
         **/
        set selectedIcon(value) {
            if (!(value instanceof latte.IconItem))
                throw new latte.InvalidArgumentEx('value');
            this._selectedIcon = value;
            // Append icon
            if (this.selected) {
                value.appendTo(this.iconElement.empty());
            }
        }
        /**
         * Gets or sets the text of the item
         **/
        get text() {
            return this.textElement.html();
        }
        /**
         * Gets or sets the text of the item
         **/
        set text(value) {
            this.textElement.html(value);
        }
        /**
         * Gets the <c>TreeView</c> item who contains this item, if any
         **/
        get treeView() {
            var t = this.element.parents('.latte-view.tree');
            if (t.length) {
                return t.data('instance');
            }
            else {
                return null;
            }
        }
    }
    //region Static
    /**
     * Global level expand glyph loader
     * @type {any}
     */
    TreeItem.globalExpandGlyph = null;
    /**
     * Global level collapse glyph loader
     * @type {any}
     */
    TreeItem.globalCollapseGlyph = null;
    latte.TreeItem = TreeItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class CheckboxItem extends latte.ValueItem {
        /**
         * Creates the item
         **/
        constructor() {
            super();
            this.element.addClass('checkbox');
            this.label.appendTo(this);
            this.addEventListener('click', () => this.value = !this.value);
        }
        //region Methods
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            let value = this.value;
            if (!latte._isBoolean(value) && latte._isString(value) && latte._isNumeric(value)) {
                this.value = !!parseInt(value);
            }
            else {
                this.label.icon = this.value ? latte.Glyph.checked : latte.Glyph.unchecked;
            }
        }
        /**
         * Override
         */
        serialize() {
            return this.value ? "1" : "0";
        }
        /**
         * Override
         */
        unserialize(value) {
            this.value = !!parseInt(value);
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the text of the checkbox
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets or sets the text of the checkbox
         **/
        set text(value) {
            this.label.text = value;
        }
        /**
         * Gets the label of the checkbox
         *
         * @returns {LabelItem}
         */
        get label() {
            if (!this._label) {
                this._label = new latte.LabelItem();
            }
            return this._label;
        }
    }
    latte.CheckboxItem = CheckboxItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/1/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ColorValueItem extends latte.ValueItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(color = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._color = null;
            this.element.append(this.button.element);
            if (!color) {
                color = latte.Color.black;
            }
            this.color = color;
        }
        //region Private Methods
        //endregion
        //region Methods
        setValue(value) {
            this.color = latte.Color.fromHex(value);
        }
        getValue() {
            return this.color.toHexString();
        }
        onLayout() {
            super.onLayout();
            this.button.onLayout();
        }
        /**
         * Gets the color picker
         *
         * @returns {ColorPicker}
         */
        get colorPicker() {
            if (!this._colorPicker) {
                this._colorPicker = new latte.ColorPicker();
                this._colorPicker.colorChanged.add(() => {
                    this.color = this._colorPicker.color;
                    this.onValueChanged();
                    //MenuOverlay.closeAll();
                });
            }
            return this._colorPicker;
        }
        /**
         * Gets the button for selection
         *
         * @returns {ButtonItem}
         */
        get button() {
            if (!this._button) {
                this._button = new latte.ButtonItem();
                this._button.items.add(this.colorPicker);
                this._button.icon = this.icon;
            }
            return this._button;
        }
        /**
         * Gets or sets the color of the item
         *
         * @returns {Color}
         */
        get color() {
            return this._color;
        }
        /**
         * Gets or sets the color of the item
         *
         * @param {Color} value
         */
        set color(value) {
            this._color = value;
            this.icon.color = value;
        }
        /**
         * Gets the color icon
         *
         * @returns {ColorIconItem}
         */
        get icon() {
            if (!this._icon) {
                this._icon = new latte.ColorIconItem(latte.Color.black);
            }
            return this._icon;
        }
    }
    latte.ColorValueItem = ColorValueItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Presents a method for choosing options from a combobox.
     Combo options are presented as the button's items.
     The button's items tag value is assumed to be the value of the combobox.
     **/
    class ComboItem extends latte.ValueItem {
        /**
         *
         **/
        constructor() {
            super();
            this.element.addClass('combo');
            this.button = new latte.ButtonItem();
            this.button.text = strings.pleaseSelect;
            this.button.appendTo(this.element);
        }
        /**
         * Override
         * @returns {any}
         */
        onGetValueString() {
            var item;
            while ((item = this.button.items.next())) {
                if (item.tag == this.value) {
                    return item.text;
                }
            }
            return '';
        }
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            this.button.text = this.value === null ? strings.pleaseSelect : this.valueString;
        }
        /**
         * Gets or sets the options of the combo
         **/
        get options() {
            return this._options;
        }
        /**
         * Gets or sets the options of the combo
         **/
        set options(options) {
            var __this = this;
            if (!latte._isArray(options) && !latte._isObject(options))
                throw new latte.InvalidArgumentEx('options', options);
            this.button.items.clear();
            for (var i in options) {
                var b = new latte.ButtonItem();
                b.text = options[i].toString();
                b.tag = i;
                b.click.add(function () {
                    __this.value = this.tag;
                    __this.button.text = this.text;
                });
                this.button.items.add(b);
            }
            this._options = options;
        }
    }
    latte.ComboItem = ComboItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Value item for files. Value of item is an array of system File objects.
     */
    class FileValueItem extends latte.ValueItem {
        constructor() {
            super();
            this.addClass('file');
            this.resetInput();
        }
        /**
         * Gets an array of selected files
         *
         * @returns {Array<File>}
         */
        getValue() {
            return this.fileInput.get(0).files;
        }
        /**
         * Resets the input field
         */
        resetInput() {
            this.fileInput = $('<input multiple type="file">').appendTo(this.element.empty());
            this.fileInput.change(() => {
                this.onValueChanged();
            });
        }
        /**
         * Sets the value. This is ignored since UA won't allow it.
         *
         * @param value
         */
        setValue(value) {
            // Ignore. Files cannot be set
        }
    }
    latte.FileValueItem = FileValueItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/6/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FlagsValueItem extends latte.ValueItem {
        //endregion
        /**
         *
         */
        constructor() {
            super();
            //region Static
            //endregion
            //region Fields
            this.ignoreUpdateChecks = false;
            this.ignoreUpdateValue = false;
            /**
             * Property field
             */
            this._options = null;
            this.addClass('flags');
            this.element.append(this.stack.element);
        }
        //region Private Methods
        updateChecks() {
            if (this.ignoreUpdateChecks) {
                this.ignoreUpdateChecks = false;
                return;
            }
            // log("Updating Checks")
            for (let i = 0; i < this.checks.length; i++) {
                let check = this.checks[i];
                let flag = check.tag;
                this.ignoreUpdateValue = true;
                check.value = (this.value & flag) == flag;
            }
            this.ignoreUpdateValue = false;
        }
        updateValue() {
            if (this.ignoreUpdateValue) {
                this.ignoreUpdateValue = false;
                return;
            }
            // log("Updating Value")
            let val = 0;
            for (let i = 0; i < this.checks.length; i++) {
                let check = this.checks[i];
                let flag = check.tag;
                if (check.value) {
                    val = val | flag;
                }
            }
            // this.ignoreValueChange = true;
            this.ignoreUpdateChecks = true;
            this.value = val;
        }
        //endregion
        //region Methods
        /**
         * Override.
         */
        onGetValueString() {
            let list = [];
            let f = this.value;
            for (let i in this.options) {
                let flag = parseInt(i);
                if ((f & flag) == flag) {
                    list.push(this.options[i]);
                }
            }
            return list.join(', ') || strings.flagsNone;
        }
        /**
         * Raises the <c>options</c> event
         */
        onOptionsChanged() {
            if (this._optionsChanged) {
                this._optionsChanged.raise();
            }
            this.checks.clear();
            for (let i in this.options) {
                let check = new latte.CheckboxItem();
                check.label.text = this.options[i];
                check.tag = i;
                check.valueChanged.add(() => this.updateValue());
                this.checks.add(check);
            }
            // log("Options changed")
            this.updateChecks();
        }
        /**
         * Raises the <c>value</c> event
         */
        onValueChanged() {
            super.onValueChanged();
            // log("Value Changed: " + this.value)
            if (!this.ignoreUpdateChecks) {
                this.updateChecks();
            }
            this.ignoreUpdateChecks = false;
        }
        /**
         * Gets an event raised when the value of the options property changes
         *
         * @returns {LatteEvent}
         */
        get optionsChanged() {
            if (!this._optionsChanged) {
                this._optionsChanged = new latte.LatteEvent(this);
            }
            return this._optionsChanged;
        }
        /**
         * Gets the checkboxes
         *
         * @returns {Collection<CheckboxItem>}
         */
        get checks() {
            if (!this._checks) {
                this._checks = new latte.Collection(
                // Add
                // Add
                    (check) => {
                    this.stack.items.add(check);
                }, 
                // Remove
                // Remove
                    (check) => {
                    this.stack.items.remove(check);
                });
            }
            return this._checks;
        }
        /**
         * Gets or sets the options of the flags
         *
         * @returns {IFlags}
         */
        get options() {
            return this._options;
        }
        /**
         * Gets or sets the options of the flags
         *
         * @param {IFlags} value
         */
        set options(value) {
            // Check if value changed
            let changed = value !== this._options;
            // Set value
            this._options = value;
            // Trigger changed event
            if (changed) {
                this.onOptionsChanged();
            }
        }
        /**
         * Gets the stack of the item
         *
         * @returns {ItemStack}
         */
        get stack() {
            if (!this._stack) {
                this._stack = new latte.ItemStack();
            }
            return this._stack;
        }
    }
    latte.FlagsValueItem = FlagsValueItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Presents an input method for picking a date
     **/
    class DatePickerItem extends latte.ValueItem {
        //endregion
        /**
         *
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._dateVisible = true;
            /**
             *
             **/
            this._timeVisible = false;
            /**
             *
             * @type {boolean}
             */
            this.ignorePassToCombos = false;
            /**
             * Property field
             */
            this._nullable = false;
            this.element.addClass('date-picker');
            this._dateButton = new latte.ButtonItem();
            this._dateButton.dropdownVisible = true;
            this._dateButton.glyph = latte.Glyph.down;
            this._dateButton.appendTo(this.element);
            this._dateButton.element.css({ marginRight: 15 });
            //this.element.clear();
            this._dateButton.loadItems.add(() => {
                this._dateButton.items.add(this.dateItem);
            });
            this.date = latte.DateTime.today;
        }
        //region Private Methods
        /**
         * Zero pads for dates
         * @param i
         * @returns {string}
         */
        zeroPad(i) {
            return i < 10 ? '0' + i : i.toString();
        }
        //endregion
        //region Methods
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            if (this.value) {
                this.date = this.value;
            }
            if (this.ignorePassToCombos) {
                this.ignorePassToCombos = false;
            }
            else {
            }
        }
        /**
         * Sets the value of the item silently, without passing it to the combos
         * @param date
         */
        setValueSilently(date) {
            this.ignorePassToCombos = true;
            this.value = date;
        }
        /**
         * Gets the date item
         *
         * @returns {DateItem}
         */
        get dateItem() {
            if (!this._dateItem) {
                this._dateItem = new latte.DateItem();
                this._dateItem.selectionChanged.add(() => {
                    var d = this.dateItem.selectionStart;
                    if (this.timeVisible) {
                        this.date = latte.DateTime.fromDateAndTime(d, this.date.timeOfDay);
                    }
                    else {
                        this.date = this.dateItem.selectionStart;
                    }
                    this.setValueSilently(this.date);
                });
            }
            return this._dateItem;
        }
        /**
         * Gets the checkbox of item
         *
         * @returns {CheckboxItem}
         */
        get checkbox() {
            if (!this._checkbox) {
                this._checkbox = new latte.CheckboxItem();
                this._checkbox.valueChanged.add(() => {
                    this._dateButton.enabled = !!this._checkbox.value;
                });
                this.element.prepend(this.checkbox.element);
            }
            return this._checkbox;
        }
        /**
         * Gets the hour combo item
         *
         * @returns {ComboItem}
         */
        get hourCombo() {
            if (!this._hourCombo) {
                this._hourCombo = new latte.ComboItem();
                this._hourCombo.valueChanged.add(() => { this.onValueChanged(); });
                this._hourCombo.button.loadItems.add(() => {
                    var hours = [];
                    for (var i = 0; i <= 23; i++) {
                        hours[i] = this.zeroPad(i);
                    }
                    this._hourCombo.options = hours;
                });
                this._hourCombo.value = 0;
                this._hourCombo.button.dropdownVisible = false;
            }
            return this._hourCombo;
        }
        /**
         * Gets the minutes combo Item
         *
         * @returns {ComboItem}
         */
        get minuteCombo() {
            if (!this._minuteCombo) {
                this._minuteCombo = new latte.ComboItem();
                this._minuteCombo.valueChanged.add(() => { this.onValueChanged(); });
                this._minuteCombo.button.loadItems.add(() => {
                    var minutes = [];
                    for (var i = 0; i <= 59; i++) {
                        minutes[i] = this.zeroPad(i);
                    }
                    this._minuteCombo.options = minutes;
                });
                this._minuteCombo.value = 0;
                this._minuteCombo.button.dropdownVisible = false;
            }
            return this._minuteCombo;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the date of the picker
         **/
        get date() {
            if (this.timeVisible)
                return latte.DateTime.fromDateAndTime(this._date, new latte.TimeSpan(0, this._hourCombo.value, this._minuteCombo.value));
            else
                return this._date;
        }
        /**
         * Gets or sets the date of the picker
         **/
        set date(value) {
            if (!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');
            if (isNaN(value._span.millis))
                throw new latte.InvalidArgumentEx('value');
            this._date = value;
            this._dateButton.text = latte.sprintf("%s / %s / %s", value.day, value.monthString, value.year);
            if (this.timeVisible) {
                this._hourCombo.value = value.timeOfDay.hours;
                this._minuteCombo.value = value.minute;
                this._hourCombo.button.text = this.zeroPad(value.timeOfDay.hours);
                this._minuteCombo.button.text = this.zeroPad(value.minute);
            }
        }
        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        get dateVisible() {
            return this._dateVisible;
        }
        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        set dateVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx();
            this._dateVisible = value;
            this._dateButton.visible = value;
        }
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @returns {boolean}
         */
        get nullable() {
            return this._nullable;
        }
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @param {boolean} value
         */
        set nullable(value) {
            // Check if value changed
            var changed = value !== this._nullable;
            // Set value
            this._nullable = value;
            if (value) {
                this.checkbox.visible = true;
                this._dateButton.enabled = this.checkbox.value;
            }
            else {
                this.checkbox.visible = false;
                this._dateButton.enabled = true;
            }
            // Trigger changed event
            if (changed) {
                this.onNullableChanged();
            }
        }
        /**
         * Gets an event raised when the value of the nullable property changes
         *
         * @returns {LatteEvent}
         */
        get nullableChanged() {
            if (!this._nullableChanged) {
                this._nullableChanged = new latte.LatteEvent(this);
            }
            return this._nullableChanged;
        }
        /**
         * Raises the <c>nullable</c> event
         */
        onNullableChanged() {
            if (this._nullableChanged) {
                this._nullableChanged.raise();
            }
        }
        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        get timeVisible() {
            return this._timeVisible;
        }
        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        set timeVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx();
            this._timeVisible = value;
            if (value) {
                //region Check if controls must be created
                if (!this._hourCombo) {
                    var colon = new latte.UiText(' : ');
                    colon.css({
                        'float': 'left',
                        marginTop: 5,
                        marginLeft: 2,
                        marginRight: 3
                    });
                    this.element.append(this.hourCombo.element);
                    this.element.append(colon.element);
                    this.element.append(this.minuteCombo.element);
                }
                //endregion
                this.hourCombo.visible = this.minuteCombo.visible = true;
            }
            else if (this._hourCombo) {
                this.hourCombo.visible = this.minuteCombo.visible = false;
            }
        }
    }
    latte.DatePickerItem = DatePickerItem;
})(latte || (latte = {}));
/*
 * Commands available for <c>HtmlEditorItem</c>
 *
 * @enum
 */
var latte;
(function (latte) {
    class HtmlEditorCommands {
    }
    /**
     * Swaps selection boldness
     */
    HtmlEditorCommands.BOLD = 'bold';
    /**
     * Wraps seletion into CODE tag
     */
    HtmlEditorCommands.CODE = 'code';
    /**
     * Clears all formatting on fonts and colors
     */
    HtmlEditorCommands.CLEAR_FORMAT = 'clearformat';
    /**
     * Formats the block as something
     */
    HtmlEditorCommands.FORMAT_BLOCK = 'formatblock';
    /**
     * Swaps selection italics
     */
    HtmlEditorCommands.ITALIC = 'italic';
    /**
     * Makes selectikon super-script
     */
    HtmlEditorCommands.SUPER_SCRIPT = 'superscript';
    /**
     * Makes selection sub-script
     */
    HtmlEditorCommands.SUB_SCRIPT = 'subscript';
    /**
     * Aligns text to left
     */
    HtmlEditorCommands.JUSTIFY_LEFT = 'justifyleft';
    /**
     * Centers text
     */
    HtmlEditorCommands.JUSTIFY_CENTER = 'justifycenter';
    /**
     * Aligns text to right
     */
    HtmlEditorCommands.JUSTIFY_RIGHT = 'justifyright';
    /**
     * Justifies text
     */
    HtmlEditorCommands.JUSTIFY_FULL = 'justifyfull';
    /**
     * Decreases indent
     */
    HtmlEditorCommands.OUTDENT = 'outdent';
    /**
     * Increases indent
     */
    HtmlEditorCommands.INDENT = 'indent';
    /**
     * Shows a dialog to insert HTML
     */
    HtmlEditorCommands.INSERT_HTML = 'inserthtml';
    /**
     * Inserts an image
     */
    HtmlEditorCommands.INSERT_IMAGE = 'insertimage';
    /**
     * Inserts a link
     */
    HtmlEditorCommands.INSERT_LINK = 'insertlink';
    /**
     * Inserts an ordered list
     */
    HtmlEditorCommands.INSERT_ORDERED_LIST = 'insertorderedlist';
    /**
     * Inserts an unordered list
     */
    HtmlEditorCommands.INSERT_UNORDERED_LIST = 'insertunorderedlist';
    /**
     * Shows a dialog to insert a YouTube video
     */
    HtmlEditorCommands.INSERT_YOUTUBE = 'insertyoutube';
    /**
     * Unerlines selection
     */
    HtmlEditorCommands.UNDERLINE = 'underline';
    latte.HtmlEditorCommands = HtmlEditorCommands;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Html Editor. Loads the <c>rangy</c> plugin.

     For specification of <c>rangy</c> objects refer to:
     <a href="http://code.google.com/p/rangy/w/list" target=_blank>http://code.google.com/p/rangy/w/list</a>
     **/
    class HtmlEditorItem extends latte.ValueItem {
        //endregion
        /**
         * Creates the editor.
         **/
        constructor() {
            //            var __this = this;
            super();
            this.addClass('html-editor');
            // Elements
            this.toolbar = new latte.Toolbar();
            this.toolbar.appendTo(this);
            this._addToolbarButtons();
            if (!HtmlEditorItem.rangyLoaded) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = HtmlEditorItem.rangyPath;
                document.body.appendChild(script);
                HtmlEditorItem.rangyLoaded = true;
            }
        }
        /**
         * Gets the path to rangy library
         * @returns {string}
         */
        static get rangyPath() {
            return latte._latteUrl() + '/releases/latte.ui/support/js/rangy.js';
        }
        //region Private Methods
        /**
         * Creates default buttons
         **/
        _addToolbarButtons() {
            var btn = (u, v, tooltip, cmd) => {
                var b = new latte.ButtonItem();
                b.icon = latte.IconItem.standard(u, v);
                b.tooltip = tooltip;
                b.click.add(() => { this.execCommand(cmd); });
                return b;
            };
            var sep = function () { return new latte.SeparatorItem(); };
            this.toolbar.items.addArray([
                btn(5, 2, strings.bold, latte.HtmlEditorCommands.BOLD),
                btn(6, 2, strings.italics, latte.HtmlEditorCommands.ITALIC),
                sep(),
                btn(8, 2, strings.alignLeft, latte.HtmlEditorCommands.JUSTIFY_LEFT),
                btn(10, 2, strings.alignCenter, latte.HtmlEditorCommands.JUSTIFY_CENTER),
                btn(9, 2, strings.alignRight, latte.HtmlEditorCommands.JUSTIFY_RIGHT),
                btn(11, 2, strings.alignJustify, latte.HtmlEditorCommands.JUSTIFY_FULL),
                sep(),
                btn(15, 2, strings.indent, latte.HtmlEditorCommands.INDENT),
                btn(14, 2, strings.outdent, latte.HtmlEditorCommands.OUTDENT),
                sep(),
                btn(18, 1, strings.numberedList, latte.HtmlEditorCommands.INSERT_ORDERED_LIST),
                btn(19, 1, strings.bulletList, latte.HtmlEditorCommands.INSERT_UNORDERED_LIST),
                sep(),
                btn(16, 2, strings.eraseFormat, latte.HtmlEditorCommands.CLEAR_FORMAT),
                sep(),
                btn(12, 3, strings.insertLink, latte.HtmlEditorCommands.INSERT_LINK),
                btn(9, 3, strings.insertImage, latte.HtmlEditorCommands.INSERT_IMAGE)
            ]);
        }
        /**
         *
         **/
        _assignElementHandlers() {
            if (this._mustInit())
                return;
            var __this = this;
            this.body()
                .find('img')
                .unbind('.editor')
                .bind('click.editor', function () {
                // Image click selects image
                __this.selectElement($(this));
                __this.onImageSelected($(this));
            })
                .bind('load.editor', function () {
                __this.onLayout();
            })
                .each(function () {
                if (this.complete) {
                    __this.onLayout();
                }
            });
            //log("Images: %s", this.body().find('img').length)
        }
        /**
         * Returns a value indicating if the editor can be initialized.
         It can be initialized when its attached to the DOM.
         **/
        _canInit() {
            return this.element.parents(':last').is('html');
        }
        /**
         * Clears all formatting in editor
         **/
        _clearFormatting() {
            this.body().find('*')
                .css({
                font: '',
                fontSize: '',
                fontFamily: '',
                color: '',
                margin: '',
                padding: '',
                wordSpacing: '',
                letterSpacing: '',
                background: '',
                backgroundColor: '',
                border: ''
            });
            // Ugly <font> tags
            this.body().find('font').removeAttr('face');
        }
        /**
         * Tries to convert the passed object to a node
         **/
        _ensureNode(obj) {
            if (window['rangy'] && !rangy.initialized) {
                rangy.init();
            }
            if (latte._isString(obj)) {
                return jQuery(obj).get(0);
            }
            else if (obj instanceof jQuery) {
                return obj.get(0);
            }
            else {
                if (typeof Element == 'undefined') {
                    return obj;
                }
                else {
                    if (obj instanceof Element) {
                        return obj;
                    }
                    else {
                        throw new latte.InvalidArgumentEx('obj');
                    }
                }
            }
        }
        /**
         * Tries to get the editor ready. Returns if control is ready after call.
         **/
        _ensureReady() {
            if (this._mustInit()) {
                this._initEditor();
            }
            return this.ready();
        }
        /**
         * Initializes the editor, if possible.
         **/
        _initEditor() {
            // Check if init needed
            if (this._mustInit()) {
                // Set ready flag as false
                this._ready = false;
                // If can't initialize, bye.
                if (!this._canInit()) {
                    return;
                }
            }
            else {
                // No need to init
                return;
            }
            var __this = this;
            // Remove previous iframe
            if (this.iframe instanceof jQuery)
                this.iframe.remove();
            if (window['rangy'])
                rangy.init();
            // Create iframe
            this.iframe = $('<iframe>').attr({ frameborder: 0 }).appendTo(this.element);
            // Insert editable content into the iframe
            this.document().open();
            this.document().write('<html><head>');
            this.document().write('<link rel=stylesheet href="' + $('link').attr('href') + '">');
            this.document().write('</head>');
            this.document().write('<body class=html-editor contenteditable=true></body>');
            this.document().write('</html>');
            this.document().close();
            this._ready = true;
            // If some value existed, re-assign it.
            if (this._valueHtml) {
                this.body().html(this._valueHtml);
                this._assignElementHandlers();
                this.onLayout();
            }
            this.body()
                .css({
                minHeight: 20,
                overflow: 'hidden',
                fontFamily: this.element.css('font-family'),
                fontSize: 14 //this.element.css('font-size')
            })
                .focus(function () { __this.onFocused(); })
                .blur(function () { __this.onBlur(); })
                .click(function () { __this.onSelectionChanged(); })
                .keyup(function () { __this._valueHtml = $(this).html(); __this.onSelectionChanged(); __this.onValueChanged(); })
                .change(function () { __this._valueHtml = $(this).html(); __this.onValueChanged(); });
        }
        /**
         * Shows a dialog to insert HTML
         **/
        _insertHTML() {
            //            var __this = this;
            var txt = new latte.TextboxItem();
            var d = new latte.DialogView();
            txt.multiline = true;
            txt.css({ margin: 20 });
            txt.input.css({ minHeight: 100 });
            txt.setRelativeWidth('100%');
            d.title = strings.insertHTML;
            d.view = (new latte.ItemView(txt));
            d.addOkButton(() => {
                this.insertElement($('<div class=cms-html-insert>').html(txt.value));
            });
            d.show();
        }
        /**
         * Inserts an image, asking for the URL
         **/
        _insertImage(value = '') {
            var url = latte._isString(value) ? value : prompt(strings.imageUrl, 'http://');
            if (!url)
                return;
            var elem = $('<img>').attr('src', url);
            this.insertElement(elem);
        }
        /**
         * Inserts a link, asking for the Url
         **/
        _insertLink() {
            var url = prompt(strings.linkUrl, 'http://');
            if (!url)
                return;
            var elem = $('<a>').attr({
                href: url,
                target: '_blank'
            });
            if (this.selection.isCollapsed) {
                elem.text(url);
                this.insertElement(elem);
            }
            else {
                this.surroundSelectionWith(elem);
            }
        }
        /**
         * Shows a dialog to insert a YouTube video
         **/
        _insertYouTube() {
            var __this = this;
            var txt = new latte.TextboxItem();
            var d = new latte.DialogView();
            txt.css({ margin: 20 });
            txt.setRelativeWidth('100%');
            txt.placeholder = strings.videoURL;
            d.title = strings.insertYouTube;
            d.view = (new latte.ItemView(txt));
            d.addOkButton(function () {
                var videoId = txt.value.split('v=')[1];
                var ampersandPosition = videoId.indexOf('&');
                if (ampersandPosition != -1) {
                    videoId = videoId.substring(0, ampersandPosition);
                }
                if (videoId) {
                    var iframe = $('<iframe width="420" height="345" frameborder="0" allowfullscreen />').attr({
                        src: 'http://www.youtube.com/embed/' + videoId
                    });
                    __this.insertElement($('<div class=cms-html-youtube>').append(iframe));
                }
                else {
                    alert(strings.urlNotYouTube);
                }
            });
            d.show();
        }
        /**
         * Returns a value indicating if editor must be initialized.
         It happens every time its dettached from DOM.
         **/
        _mustInit() {
            try {
                return (this.ready() && !this.body().hasClass('html-editor'))
                    || !this.ready();
            }
            catch (e) {
                return true;
            }
        }
        //endregion
        //region Methods
        /**
         * Gets the body of the iframe
         **/
        body() {
            return this.iframe.contents().find('body');
        }
        /**
         * Gets the JavaScript document's object of iframe.
         **/
        document() {
            // Raw IFRAME element
            var iframe = this.iframe.get(0);
            // Send document object
            return iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow.document || iframe.document);
        }
        /**
         * Executes the specified command
         **/
        execCommand(command, value = null) {
            if (!this._ensureReady())
                throw new latte.InvalidCallEx();
            switch (command) {
                case latte.HtmlEditorCommands.BOLD:
                case latte.HtmlEditorCommands.FORMAT_BLOCK:
                case latte.HtmlEditorCommands.INDENT:
                case latte.HtmlEditorCommands.INSERT_ORDERED_LIST:
                case latte.HtmlEditorCommands.INSERT_UNORDERED_LIST:
                case latte.HtmlEditorCommands.ITALIC:
                case latte.HtmlEditorCommands.JUSTIFY_CENTER:
                case latte.HtmlEditorCommands.JUSTIFY_FULL:
                case latte.HtmlEditorCommands.JUSTIFY_LEFT:
                case latte.HtmlEditorCommands.JUSTIFY_RIGHT:
                case latte.HtmlEditorCommands.OUTDENT:
                case latte.HtmlEditorCommands.SUB_SCRIPT:
                case latte.HtmlEditorCommands.SUPER_SCRIPT:
                case latte.HtmlEditorCommands.UNDERLINE:
                    this.document().execCommand(command, false, value);
                    break;
                case latte.HtmlEditorCommands.CLEAR_FORMAT:
                    this._clearFormatting();
                    break;
                case latte.HtmlEditorCommands.INSERT_IMAGE:
                    this._insertImage(value);
                    break;
                case latte.HtmlEditorCommands.INSERT_LINK:
                    this._insertLink();
                    break;
                case latte.HtmlEditorCommands.CODE:
                    this.surroundSelectionWith($('<code>'));
                    break;
                case latte.HtmlEditorCommands.INSERT_HTML:
                    this._insertHTML();
                    break;
                case latte.HtmlEditorCommands.INSERT_YOUTUBE:
                    this._insertYouTube();
                    break;
            }
            this.onValueChanged();
        }
        /**
         *
         **/
        getValue() {
            if (!this._mustInit()) {
                return this.body().html() || "";
            }
            else {
                return this._valueHtml || "";
            }
        }
        /**
         * Inserts the specified node at the currently selected range.
         Returns the inserted node, or <c>null</c> if not possible.
         **/
        insertElement(element) {
            var range = this.selectionRange;
            if (range) {
                var actualElement = this._ensureNode(element);
                range.insertNode(actualElement);
                this.onValueChanged();
                this._assignElementHandlers();
                return jQuery(actualElement);
            }
            return null;
        }
        /**
         * Raises the <c>imageSelected</c> event
         */
        onImageSelected(image) {
            if (this._imageSelected) {
                return this._imageSelected.raise(image);
            }
        }
        /**
         * Overriden.
         **/
        onLayout() {
            super.onLayout();
            if (this._ensureReady()) {
                // Height that editor should be
                var shouldHeight = this.body().get(0).scrollHeight + (this.toolbar.visible ? this.toolbar.height : 0);
                //            if(this.element.height() < shouldHeight){
                this.element.height(shouldHeight);
                //            }
                //            if(this.iframe.height() < shouldHeight){
                this.iframe.css('height', this.body().get(0).scrollHeight);
            }
        }
        /**
         * Raises the <c>selectionChanged</c> event.
         **/
        onSelectionChanged() {
            this.selectionChanged.raise();
            // Retrieve selection for inspection
            var sel = this.selectionRange;
            // If something selected
            if (sel) {
                // Node where selection starts
                var start = $(sel.startContainer);
            }
        }
        /**
         * Overriden.
         **/
        onValueChanged() {
            this.onLayout();
            super.onValueChanged();
        }
        /**
         * Gets a value indicating if the editor is ready to be used as editor.
         While the editor is not ready, all data will be displayed in a non-editable element.
         **/
        ready() {
            return this._ready;
        }
        /**
         * Selects the specified element and returns it as a jQuery object.
         **/
        selectElement(element) {
            var el = this._ensureNode(element);
            var range = rangy.createRange();
            range.selectNode(el);
            var sel = rangy.getSelection();
            sel.setSingleRange(range);
            this.onSelectionChanged();
            return jQuery(element);
        }
        /**
         * Selects the contents of the specified node and returns the element as a jQuery object.
         **/
        selectElementContents(element) {
            // Get element to select
            element = this._ensureNode(element);
            // Create a new range
            var range = rangy.createRange();
            // Select contents of node
            range.selectNodeContents(element);
            // Get selection
            var sel = rangy.getSelection();
            // Set range of selection
            sel.setSingleRange(range);
            // selection changed
            this.onSelectionChanged();
            return jQuery(element);
        }
        /**
         * Gets the element where selection ends.
         **/
        selectionEnd() {
            var sel = this.selectionRange;
            if (sel) {
                return $(sel.endContainer.parentElement);
            }
            return null;
        }
        /**
         * Returns the parent of selection, passing the specified <c>selector</c>
         to the jQuery <c>parents()<c> method.
         **/
        selectionParents(selector = '') {
            var range = this.selectionRange;
            if (range) {
                var container = jQuery(range.startContainer);
                return container.parents(selector);
            }
            return null;
        }
        /**
         * Gets the element where selection starts.
         **/
        selectionStart() {
            var sel = this.selectionRange;
            if (sel) {
                return $(sel.startContainer.parentElement);
            }
            return null;
        }
        /**
         * Override.
         **/
        setValue(value) {
            if (!latte._isString(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._valueHtml = value;
            // Update editable if possible
            if (this._ensureReady()) {
                this.body().html(value);
                this._assignElementHandlers();
                this.onLayout();
            }
        }
        /**
         * Surrounds selected contents with specified element, and returns the
         attached element as a jQuery object.
         **/
        surroundSelectionWith(element) {
            element = this._ensureNode(element);
            var savedSel = rangy.saveSelection(this.window);
            var range = this.selectionRange;
            if (range) {
                if (!range.canSurroundContents()) {
                    return null;
                }
                range.surroundContents(element);
                rangy.restoreSelection(savedSel);
                this.onValueChanged();
            }
            return jQuery(element);
        }
        /**
         * Gets an event raised when the selection of the editor changes
         *
         * @returns {LatteEvent}
         */
        get selectionChanged() {
            if (!this._selectionChanged) {
                this._selectionChanged = new latte.LatteEvent(this);
            }
            return this._selectionChanged;
        }
        /**
         * Gets an event raised when an image in the editor is selected
         *
         * @returns {LatteEvent}
         */
        get imageSelected() {
            if (!this._imageSelected) {
                this._imageSelected = new latte.LatteEvent(this);
            }
            return this._imageSelected;
        }
        //endregion
        //region Properties
        /**
         * Gets the current selection
         **/
        get selection() {
            if (window['rangy'] && !rangy.initialized) {
                rangy.init();
            }
            //return rangy.getIframeSelection(this.iframe.get(0));
            return rangy.getSelection();
        }
        /**
         * Gets the range of selection. Returns <c>null</c> if no current selection.
         **/
        get selectionRange() {
            var sel = this.selection;
            if (!sel.rangeCount)
                return null;
            return this.selection.getRangeAt(0);
        }
        /**
         * Gets or sets the source html
         */
        get value() {
            return this.getValue();
        }
        /**
         * Gets or sets the source html
         */
        set value(value) {
            this.setValue(value);
        }
        /**
         * Gets the Window of the iframe
         **/
        get window() {
            return this.iframe.get(0).contentWindow;
        }
    }
    //region Static
    HtmlEditorItem.rangyLoaded = false;
    latte.HtmlEditorItem = HtmlEditorItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a progress bar
     **/
    class ProgressItem extends latte.ValueItem {
        //endregion
        /**
         * Creates the progress item
         **/
        constructor() {
            super();
            //region Fields
            /**
             *
             **/
            this._maxValue = 100;
            /**
             *
             **/
            this._minValue = 0;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._animated = true;
            this.element.addClass('progress');
            // Initialize elements
            this.container = $('<div>').addClass('container').appendTo(this.element);
            this.bar = $('<div>').addClass('bar').appendTo(this.container);
            this.onLayout(false);
        }
        //region Methods
        /**
         * Gets the percentage represented by min, max and value values.
         Value ranges from 0 to 100
         **/
        getPercentage() {
            var diff = this.maxValue - this.minValue;
            var curr = this.value - this.minValue;
            return Math.ceil(curr * 100 / diff);
        }
        /**
         * Raises the layout event
         **/
        onLayout(animate = true) {
            var w = this.getPercentage();
            if (animate !== false && this.animated !== false)
                this.bar.animate({ width: w + '%' });
            else
                this.bar.css('width', w + '%');
        }
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            let value = this.value;
            if (value > this.maxValue) {
                value = this.maxValue;
                this.bar.css('backgroundColor', 'red');
            }
            else {
                this.bar.css('backgroundColor', '');
            }
            if (value < this.minValue) {
                value = this.minValue;
                this.container.css('borderColor', 'red');
            }
            else {
                this.container.css('borderColor', '');
            }
            this.onLayout();
        }
        /**
         * Gets or sets a value indicating if the progress should be animated
         *
         * @returns {boolean}
         */
        get animated() {
            return this._animated;
        }
        /**
         * Gets or sets a value indicating if the progress should be animated
         *
         * @param {boolean} value
         */
        set animated(value) {
            this._animated = value;
        }
        /**
         * Gets or sets the maximum value of the progress bar
         **/
        get maxValue() {
            return this._maxValue;
        }
        /**
         * Gets or sets the maximum value of the progress bar
         **/
        set maxValue(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._maxValue;
            this._maxValue = value;
            if (changed)
                this.onLayout();
        }
        /**
         * Gets or sets the minimum value of the progress bar
         **/
        get minValue() {
            return this._minValue;
        }
        /**
         * Gets or sets the minimum value of the progress bar
         **/
        set minValue(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value', value);
            var changed = value != this._minValue;
            this._minValue = value;
            if (changed)
                this.onLayout();
        }
    }
    latte.ProgressItem = ProgressItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders an item to input data from user.
     **/
    class InputItem extends latte.ValueItem {
        //endregion
        /**
         * Creates the input element
         **/
        constructor(text = '', type = '', value = null, readOnly = null, name = null) {
            super();
            /**
             *
             **/
            this._readOnly = null;
            /**
             *
             */
            this._textWidth = 0.2;
            /**
             * Property field
             */
            this._hintItem = null;
            /**
             * Property field
             */
            this._valid = true;
            this.element.addClass('input');
            // Create elements
            this.textElement = $('<div>').addClass('text').appendTo(this.element).hide();
            this.valueElement = $('<div>').addClass('value').appendTo(this.element);
            this.separatorElement = $('<div>').addClass('separator').appendTo(this.element);
            this.element.clear();
            // Create items
            this.label = new latte.LabelItem();
            this.label.appendTo(this.textElement);
            this.readOnlyLabel = new latte.LabelValueItem();
            this.readOnlyLabel.appendTo(this.valueElement);
            this.readOnlyLabel.addClass('read-only');
            this.readOnlyLabel.visible = (false);
            // Default props
            this.type = 'string';
            this.direction = latte.View.smallScreen ? latte.Direction.VERTICAL : latte.Direction.HORIZONTAL;
            if (text)
                this.text = (text);
            if (type)
                this.type = (type);
            if (value)
                this.value = (value);
            if (readOnly)
                this.readOnly = (readOnly);
            if (name)
                this.name = name;
        }
        //region Static
        /**
         * Gets a formatted string of the value depending on the type
         **/
        static format(value, type, options = null) {
            switch (type) {
                case 'switch':
                    return value === true || value === 1 ? strings.switchOn : strings.switchOff;
                case 'boolean':
                    return value === true || value === 1 ? strings.yes : strings.no;
                case 'record-combo':
                    // IMPORTANT: Do not modify call of literal
                    // This is necessary to compile without data module
                    var c = new latte['DataRecordCollection']();
                    // Try to prepare collection
                    if (options)
                        try {
                            c.add(options);
                        }
                        catch (e) {
                            throw new latte.InvalidArgumentEx('value');
                        }
                    var r = c.byId(value);
                    if (r)
                        return r.getMetadata().name;
                    return value;
                case 'combo':
                    if ((latte._isArray(options) || (typeof options === 'object')) && !latte._undef(options[value]))
                        return options[value];
                    return value;
                case 'flags':
                    let list = [];
                    let flags = parseInt(value);
                    for (let i in options) {
                        let flag = parseInt(i);
                        if ((flags & flag) == flag) {
                            list.push(options[i]);
                        }
                    }
                    return list.join(', ') || strings.flagsNone;
                default:
                    return value;
            }
        }
        /**
         * Creates the input item from a caption and a value item
         *
         * @param text
         * @param item
         */
        static fromItem(text, item) {
            var input = new InputItem(text, 'custom');
            input.valueItem = item;
            return input;
        }
        /**
         * Gets an input from the specified IInput
         * @param input
         * @param name
         */
        static fromIInput(input, name = null, value = null) {
            let item = new InputItem(input.text || '(no text)', input.type || 'string', (input.options) ? null : value || input.defaultValue || null, input.readOnly || null, name);
            item.name = name;
            if (input.options) {
                item.options = input.options;
                if (input.defaultValue) {
                    item.value = input.defaultValue;
                }
            }
            if (input.hint) {
                item.setHint(input.hint);
            }
            return item;
        }
        //region Methods
        /**
         * Checks if the current value is valid for the field <c>type</c>
         **/
        isValid() {
            var value = this.value;
            switch (this.type()) {
                case "integer":
                    var allowed = "1234567890";
                    for (var i = 0; i < value.length; i++)
                        if (allowed.indexOf(value.charAt(i)) < 0)
                            return false;
                    return true;
                case "number":
                case "float":
                    return !isNaN(value);
            }
            return true;
        }
        /**
         *
         **/
        onLayout() {
            super.onLayout();
            this.valueItem.onLayout();
        }
        onValueChanged() {
            super.onValueChanged();
            if (this.readOnly) {
                this.readOnly = this.readOnly;
            }
        }
        /**
         * Override.
         * @returns {string}
         */
        onGetValueString() {
            if (this.valueItem) {
                return this.valueItem.valueString;
            }
            else {
                return super.onGetValueString();
            }
        }
        /**
         * Override
         * @returns {string}
         */
        getValueString() {
            if (this.valueItem) {
                return this.valueItem.valueString;
            }
            else {
                return super.onGetValueString();
            }
        }
        /**
         * Raises the <c>valid</c> event
         */
        onValidChanged() {
            if (this._validChanged) {
                this._validChanged.raise();
            }
            if (this.valid) {
                this.removeClass('invalid');
            }
            else {
                this.addClass('invalid');
            }
        }
        /**
         * Sets the hint as a string in a label
         * @param hint
         */
        setHint(hint) {
            if (hint) {
                let l = new latte.LabelItem(hint);
                this.hintItem = l;
            }
            else {
                this.hintItem = null;
            }
        }
        /**
         * Gets an event raised when the value of the valid property changes
         *
         * @returns {LatteEvent}
         */
        get validChanged() {
            if (!this._validChanged) {
                this._validChanged = new latte.LatteEvent(this);
            }
            return this._validChanged;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the direction of input.
         **/
        get direction() {
            return this._direction;
        }
        /**
         * Gets or sets the direction of input.
         **/
        set direction(value) {
            if (value !== latte.Direction.VERTICAL && value !== latte.Direction.HORIZONTAL)
                throw new latte.InvalidArgumentEx('value', value);
            if (value === latte.Direction.VERTICAL) {
                this.element.removeClass('horizontal').addClass('vertical');
            }
            else {
                this.element.removeClass('vertical').addClass('horizontal');
            }
            this._direction = value;
        }
        /**
         * Gets or sets the hint item
         *
         * @returns {Item}
         */
        get hintItem() {
            return this._hintItem;
        }
        /**
         * Gets or sets the hint item
         *
         * @param {Item} value
         */
        set hintItem(value) {
            if (this._hintItem) {
                this._hintItem.element.remove();
            }
            this._hintItem = value;
            if (value) {
                this.valueElement.append(value.element);
            }
        }
        /**
         * Gets or sets the name of the input
         **/
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the name of the input
         **/
        set name(value) {
            this._name = value;
        }
        /**
         * Gets or sets the options of the control
         **/
        get options() {
            return this._options;
        }
        /**
         * Gets or sets the options of the control
         **/
        set options(value) {
            if (this.valueItem instanceof latte.ComboItem) {
                this.valueItem.options = value;
            }
            if (this.valueItem instanceof latte.RadioGroup) {
                this.valueItem.options = value;
            }
            if (this.valueItem instanceof latte.FlagsValueItem) {
                this.valueItem.options = value;
            }
            this._options = value;
        }
        /**
         * Gets or sets a value indicating if the input is read-only
         **/
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the input is read-only
         **/
        set readOnly(value) {
            this._readOnly = value;
            // Switch visibility
            this.readOnlyLabel.value = (this.valueItem.valueString);
            this.readOnlyLabel.visible = (value);
            this.valueItem.visible = (!value);
        }
        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         **/
        get separator() {
            return this._separator;
        }
        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         **/
        set separator(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._separator = value;
            if (value) {
                this.separatorElement.show();
            }
            else {
                this.separatorElement.hide();
            }
        }
        /**
         * Gets ors ets the text of the input
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets ors ets the text of the input
         **/
        set text(value) {
            this.label.text = (value);
            if (!this.textVisible)
                this.textVisible = (true);
        }
        /**
         * Gets or sets a value indicating if the text section is visible
         **/
        get textVisible() {
            return this.textElement.is(':visible');
        }
        /**
         * Gets or sets a value indicating if the text section is visible
         **/
        set textVisible(value) {
            if (value) {
                this.textElement.show();
                this.element.removeClass('no-text');
            }
            else {
                this.textElement.hide();
                this.element.addClass('no-text');
            }
        }
        /**
         * Gets or sets the with of the text part. Use value lower than 1 for percentages.
         * Note that when horizontal input, layout may become affected.
         *
         * @returns {number}
         */
        get textWidth() {
            return this._textWidth;
        }
        /**
         * Gets or sets the with of the text part.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        set textWidth(value) {
            this._textWidth = value;
            if (value < 0) {
                this.textElement.css('width', (value * 100) + '%');
                this.valueElement.css('width', ((100 - value - 0.05) * 100) + '%');
            }
            else {
                this.textElement.css('width', (value) + '%');
                this.valueElement.css('width', ((value - 0.1)) + '%');
            }
            this.onLayout();
        }
        /**
         * Gets or sets the type of the input.
         Possible values are: <c>auto</c> | <c>string</c> | <c>text</c> |
         <c>html</c> | <c>number</c> | <c>integer</c> | <c>float</c> |
         <c>boolean</c> | <c>password</c> | <c>md5-password</c> | <c>date</c> |
         <c>time</c> | <c>enumeration</c> | <c>combo</c> | <c>record-combo</c> | <c>flags</c> |
         <c>file</c> | <c>image</c> | <c>custom</c>

         If input is to be a type (function), it must inherit from <c>latte.ui.ValueItem</c>
         **/
        get type() {
            return this._type;
        }
        /**
         * Gets or sets the type of the input.
         Possible values are: <c>auto</c> | <c>string</c> | <c>text</c> |
         <c>html</c> | <c>number</c> | <c>integer</c> | <c>float</c> |
         <c>boolean</c> | <c>password</c> | <c>md5-password</c> | <c>date</c> |
         <c>time</c> | <c>enumeration</c> | <c>combo</c> | <c>record-combo</c> |
         <c>radio</c> | <c>flags</c> | <c>file</c> | <c>image</c> | <c>custom</c>

         If input is to be a type (function), it must inherit from <c>latte.ui.ValueItem</c>
         **/
        set type(value) {
            var item = null;
            this._type = value;
            if (latte._isFunction(value)) {
                item = new value();
                //                log("Created %s", value.toString())
                if (!(item instanceof latte.ValueItem))
                    throw new latte.InvalidArgumentEx('value');
            }
            else {
                switch (value) {
                    case "auto":
                    case "label":
                        item = new latte.LabelValueItem();
                        break;
                    case "string":
                        item = new latte.TextboxItem();
                        break;
                    case "text":
                        item = new latte.TextboxItem();
                        item.multiline = (true);
                        break;
                    case "html":
                        item = new latte.HtmlEditorItem();
                        break;
                    case "number":
                        item = new latte.TextboxItem();
                        item.filter = latte.TextboxFilter.NUMBER;
                        item.validationRegex = latte.Culture.current.floatValidator;
                        break;
                    case "integer":
                        item = new latte.TextboxItem();
                        item.filter = latte.TextboxFilter.INTEGER;
                        item.validationRegex = latte.Culture.current.intValidator;
                        break;
                    case "float":
                        item = new latte.TextboxItem();
                        item.filter = latte.TextboxFilter.NUMBER;
                        item.validationRegex = latte.Culture.current.floatValidator;
                        break;
                    case "boolean":
                        item = new latte.CheckboxItem();
                        break;
                    case "switch":
                        item = new latte.SwitchItem();
                        break;
                    case "password":
                        item = new latte.TextboxItem();
                        item.password = (true);
                        break;
                    case "md5-password":
                        item = new latte.TextboxItem();
                        item.password = (true);
                        break;
                    case "date":
                        item = new latte.DatePickerItem();
                        break;
                    case "time":
                        item = new latte.TimePickerItem();
                        break;
                    case "datetime":
                        item = new latte.DatePickerItem();
                        item.timeVisible = (true);
                        break;
                    case "enumeration":
                        item = new latte.ComboItem();
                        break;
                    case "combo":
                        item = new latte.ComboItem();
                        break;
                    case "radio":
                        item = new latte.RadioGroup();
                        break;
                    case "record-combo":
                        item = new latte.ComboItem();
                        break;
                    case "flags":
                        item = new latte.FlagsValueItem();
                        break;
                    case "color":
                        item = new latte.ColorValueItem();
                        break;
                    case "file":
                        item = new latte.FileValueItem();
                        break;
                    case "image":
                        item = new latte.LabelValueItem();
                        break;
                    case "custom":
                        item = new latte.LabelValueItem();
                        break;
                    case "record":
                        // IMPORTANT: Do not modify call of literal
                        // This is necessary to compile without data module
                        item = new latte['DataRecordValueItem']();
                        break;
                    default:
                        throw new latte.InvalidArgumentEx('value');
                }
            }
            if (item instanceof latte.ValueItem) {
                this.valueItem = (item);
            }
            else {
                throw new latte.InvalidCallEx("What the hey?");
            }
        }
        /**
         * Gets or sets the value of the input
         **/
        get value() {
            return this.valueItem.value;
        }
        /**
         * Gets or sets the value of the input
         **/
        set value(value) {
            this.valueItem.value = (value);
            this.readOnlyLabel.value = (this.valueItem.valueString);
        }
        /**
         * Gets or sets the valueItem of the input
         **/
        get valueItem() {
            return this._valueItem;
        }
        /**
         * Gets or sets the valueItem of the input
         **/
        set valueItem(value) {
            if (!(value instanceof latte.ValueItem))
                throw new latte.InvalidArgumentEx('value', value);
            if (this._valueItem)
                this._valueItem.element.remove();
            this._valueItem = value;
            this.valueElement.append(value.element);
            value.valueChanged.add(() => { this.onValueChanged(); });
        }
        /**
         * Gets or sets a value indicating if the value of the item is currently valid
         *
         * @returns {boolean}
         */
        get valid() {
            return this._valid;
        }
        /**
         * Gets or sets a value indicating if the value of the item is currently valid
         *
         * @param {boolean} value
         */
        set valid(value) {
            // Check if value changed
            let changed = value !== this._valid;
            // Set value
            this._valid = value;
            // Trigger changed event
            if (changed) {
                this.onValidChanged();
            }
        }
    }
    latte.InputItem = InputItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Label with value property
     **/
    class LabelValueItem extends latte.ValueItem {
        /**
         * Creates the item
         **/
        constructor() {
            super();
            this.element.addClass('label-value');
            this.label = new latte.LabelItem();
            this.label.appendTo(this.element);
        }
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            this.label.text = this.value;
        }
    }
    latte.LabelValueItem = LabelValueItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Presents a method for choosing options from a combobox.
     Combo options are presented as the button's items.
     The button's items tag value is assumed to be the value of the combobox.
     **/
    class RadioGroup extends latte.ValueItem {
        //endregion
        /**
         * Creates the radio group
         **/
        constructor(options = null) {
            super();
            this.element.addClass('radio-group');
            this.stack = new latte.ItemStack();
            this.stack.element.appendTo(this.element);
            if (options) {
                this.options = options;
            }
        }
        //region Methods
        /**
         * Gets the value as a string for human reading
         **/
        onGetValueString() {
            for (var i = 0; i < this.radios.length; i++) {
                if (this.radios[i].tag == this.value) {
                    return this.radios[i].text;
                }
            }
            return '';
        }
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            for (var i = 0; i < this.radios.length; i++) {
                if (this.radios[i].tag == this.value) {
                    this.radios[i].value = true;
                }
            }
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the options of the combo
         **/
        get options() {
            return this._options;
        }
        /**
         * Gets or sets the options of the combo
         **/
        set options(options) {
            if (!latte._isArray(options) && !latte._isObject(options))
                throw new latte.InvalidArgumentEx('options', options);
            for (var i in options) {
                ((name, option) => {
                    // Create radio
                    var r = new latte.RadioItem();
                    r.text = option.toString();
                    r.tag = name;
                    this.radios.add(r);
                })(i, options[i]);
            }
            this._options = options;
        }
        /**
         * Gets the collection of radio items
         *
         * @returns {Collection<RadioItem>}
         */
        get radios() {
            if (!this._radios) {
                this._radios = new latte.Collection((radio) => {
                    // Add radio button
                    this.stack.items.add(radio);
                    // React to selection, unselect other radios
                    radio.valueChanged.add(() => {
                        if (radio.value) {
                            this.value = radio.tag;
                            for (var i = 0; i < this.radios.length; i++) {
                                if (this.radios[i] !== radio) {
                                    this.radios[i].value = false;
                                }
                            }
                        }
                    });
                }, (radio) => { this.stack.items.remove(radio); }, this);
            }
            return this._radios;
        }
    }
    latte.RadioGroup = RadioGroup;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 12/23/13.
 */
var latte;
(function (latte) {
    /**
     * Shows a selectable radio button
     */
    class RadioItem extends latte.ValueItem {
        //endregion
        /**
         * Creates the RadioItem
         * @param text
         * @param value
         */
        constructor(text = null, value = null) {
            super();
            this.element.addClass('radio');
            // Label
            this.label = new latte.LabelItem();
            this.label.appendTo(this);
            this.addEventListener('click', () => this.value = !this.value);
            // Initialize Value
            if (latte._isBoolean(value)) {
                this.value = value;
            }
            else {
                this.value = false;
            }
            if (text) {
                this.text = text;
            }
        }
        //region Methods
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            if (this.value) {
                this.label.icon = latte.Glyph.checkedRadio;
            }
            else {
                this.label.icon = latte.Glyph.uncheckedRadio;
            }
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the text of the checkbox
         **/
        get text() {
            return this.label.text;
        }
        /**
         * Gets or sets the text of the checkbox
         **/
        set text(value) {
            this.label.text = value;
        }
    }
    latte.RadioItem = RadioItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/4/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class SwitchItem extends latte.ValueItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            this.addClass('switch');
            this.element.append(this.orb);
            this.addEventListener('click', () => this.value = !this.value);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onGetValueString() {
            return this.value ? strings.switchOn : strings.switchOff;
        }
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            let value = this.value;
            if (!latte._isBoolean(value) && latte._isString(value) && latte._isNumeric(value)) {
                this.value = !!parseInt(value);
            }
            else {
                this.ensureClass('on', this.value);
            }
        }
        /**
         * Override
         */
        serialize() {
            return this.value ? "1" : "0";
        }
        /**
         * Override
         */
        unserialize(value) {
            this.value = !!parseInt(value);
        }
        /**
         * Gets the orb of the switch
         *
         * @returns {HTMLElement}
         */
        get orb() {
            if (!this._orb) {
                this._orb = document.createElement('div');
                this._orb.classList.add('orb');
            }
            return this._orb;
        }
    }
    latte.SwitchItem = SwitchItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Allows user to pick a time
     **/
    class TimePickerItem extends latte.ValueItem {
        //endregion
        /**
         *
         **/
        constructor() {
            super();
            //region Private Fields
            this.ignorePassToCombos = false;
            this.element.addClass('time-picker');
            this.element.append(this.hourCombo);
            this.element.append(this.minuteCombo);
            this.element.append(this.secondCombo);
        }
        //region Private Methods
        /**
         * Zero pads for dates
         * @param i
         * @returns {string}
         */
        zeroPad(i) {
            return i < 10 ? '0' + i : i.toString();
        }
        //endregion
        //region Methods
        /**
         * Override.
         */
        onValueChanged() {
            super.onValueChanged();
            if (this.ignorePassToCombos) {
                this.ignorePassToCombos = false;
            }
            else {
                this.hourCombo.value = this.value.hours;
                this.minuteCombo.value = this.value.minutes;
                this.secondCombo.value = this.value.seconds;
            }
        }
        /**
         * Override.
         * @returns {String}
         */
        onGetValueString() {
            return String(this.value);
        }
        /**
         * Silently sets the hour component of the value
         * @param hours
         */
        setHourSilently(hours) {
            this.setValueSilently(new latte.TimeSpan(0, hours, this.value.minutes, this.value.seconds, this.value.milliseconds));
        }
        /**
         * Silently sets the hour component of the value
         * @param minutes
         */
        setMinuteSilently(minutes) {
            this.setValueSilently(new latte.TimeSpan(0, this.value.hours, minutes, this.value.seconds, this.value.milliseconds));
        }
        /**
         * Silently sets the hour component of the value
         * @param seconds
         */
        setSecondSilently(seconds) {
            this.setValueSilently(new latte.TimeSpan(0, this.value.hours, this.value.minutes, seconds, this.value.milliseconds));
        }
        /**
         * Silently sets the value without affecting the combos.
         * @param value
         */
        setValueSilently(value) {
            this.ignorePassToCombos = true;
            this.value = value;
        }
        /**
         * Gets the hour combo item
         *
         * @returns {ComboItem}
         */
        get hourCombo() {
            if (!this._hourCombo) {
                this._hourCombo = new latte.ComboItem();
                this._hourCombo.valueChanged.add(() => this.setHourSilently(this.hourCombo.value));
                this._hourCombo.button.loadItems.add(() => {
                    var hours = [];
                    for (var i = 0; i <= 23; i++) {
                        hours[i] = this.zeroPad(i);
                    }
                    this._hourCombo.options = hours;
                });
                this._hourCombo.value = 0;
                this._hourCombo.button.dropdownVisible = false;
            }
            return this._hourCombo;
        }
        /**
         * Gets the minutes combo Item
         *
         * @returns {ComboItem}
         */
        get minuteCombo() {
            if (!this._minuteCombo) {
                this._minuteCombo = new latte.ComboItem();
                this._minuteCombo.valueChanged.add(() => this.setMinuteSilently(this.minuteCombo.value));
                this._minuteCombo.button.loadItems.add(() => {
                    var minutes = [];
                    for (var i = 0; i <= 59; i++) {
                        minutes[i] = this.zeroPad(i);
                    }
                    this._minuteCombo.options = minutes;
                });
                this._minuteCombo.value = 0;
                this._minuteCombo.button.dropdownVisible = false;
            }
            return this._minuteCombo;
        }
        /**
         * Gets the seconds combo
         *
         * @returns {ComboItem}
         */
        get secondCombo() {
            if (!this._secondCombo) {
                this._secondCombo = new latte.ComboItem();
                this._secondCombo.valueChanged.add(() => this.setSecondSilently(this.secondCombo.value));
                this._secondCombo.button.loadItems.add(() => {
                    var minutes = [];
                    for (var i = 0; i <= 59; i++) {
                        minutes[i] = this.zeroPad(i);
                    }
                    this._secondCombo.options = minutes;
                });
                this._secondCombo.value = 0;
                this._secondCombo.button.dropdownVisible = false;
            }
            return this._secondCombo;
        }
    }
    latte.TimePickerItem = TimePickerItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    (function (TextboxFilter) {
        TextboxFilter[TextboxFilter["NONE"] = 0] = "NONE";
        TextboxFilter[TextboxFilter["NUMBER"] = 1] = "NUMBER";
        TextboxFilter[TextboxFilter["INTEGER"] = 2] = "INTEGER";
    })(latte.TextboxFilter || (latte.TextboxFilter = {}));
    var TextboxFilter = latte.TextboxFilter;
    /**
     *
     **/
    class TextboxItem extends latte.ValueItem {
        //endregion
        /**
         * Initializes the item
         **/
        constructor() {
            super();
            this.ignorePassToTextbox = false;
            //endregion
            //region Properties
            /**
             *
             **/
            this._autoGrow = true;
            /**
             *
             */
            this._minLenToSuggest = 4 - 1;
            /**
             *
             */
            this._suggestionOverlay = null;
            /**
             * Index of Currently selected suggestion
             */
            this.selectedIndex = -1;
            /**
             *
             */
            this._loadingSuggestions = false;
            /**
             * Property field
             */
            this._allowedKeys = null;
            /**
             * Property field
             */
            this._filter = null;
            /**
             * Property field
             */
            this._readOnly = false;
            /**
             * Property field
             */
            this._valid = true;
            /**
             * Property field
             */
            this._validationRegex = null;
            this.element.addClass('textbox');
            // Elements
            this._inputContainer = $('<div>').addClass('input').appendTo(this.element);
            this._invisible = $('<div>').addClass('invisible').appendTo(this.element);
            this._updateInput();
        }
        //region Methods
        /**
         * Updates the input element
         **/
        _updateInput() {
            this._inputContainer.empty();
            if (this.password) {
                this.input = $('<input type=password>').appendTo(this._inputContainer);
            }
            else {
                if (this.multiline) {
                    this.input = $('<textarea>').appendTo(this._inputContainer);
                }
                else {
                    this.input = $('<input type=text>').appendTo(this._inputContainer);
                }
            }
            if (this.maxLength > 0)
                this.maxLength = this.maxLength;
            this.input.click((e) => {
                e.stopPropagation();
                return false;
            });
            this.input.keydown((evt) => {
                // Allowed keys filter
                if (latte._isArray(this.allowedKeys)) {
                    let found = false;
                    if (!(evt.ctrlKey || evt.altKey || evt.metaKey || evt.shiftKey
                        || evt.keyCode == latte.Key.ENTER || evt.keyCode == latte.Key.TAB
                        || evt.keyCode == latte.Key.ESCAPE || evt.keyCode == latte.Key.ARROW_DOWN
                        || evt.keyCode == latte.Key.ARROW_LEFT || evt.keyCode == latte.Key.ARROW_RIGHT
                        || evt.keyCode == latte.Key.ARROW_UP)) {
                        // Search if key is in allowed keys
                        for (let i in this.allowedKeys) {
                            if (evt.keyCode == this.allowedKeys[i]) {
                                found = true;
                                break;
                            }
                        }
                        // If not found, bye
                        if (!found) {
                            latte.log("Preventing default");
                            evt.preventDefault();
                            evt.stopImmediatePropagation();
                            return false;
                        }
                    }
                }
                if (evt.keyCode === latte.Key.ENTER) {
                    this.onEnterPressed();
                }
                this.setValueSilently(this.input.val());
                if (this.onKeyDown(evt) === false) {
                    return false;
                }
            });
            this.input.keypress((e) => {
                this.onLayout();
                this.setValueSilently(this.input.val());
                this.onKeyPress(e);
            });
            this.input.keyup((e) => {
                this.onLayout();
                this.setValueSilently(this.input.val());
                return this.onKeyUp(e) !== false;
            });
        }
        /**
         * Hides the suggestions
         */
        hideSuggestions() {
            this.suggestionOverlay.items.clear();
            this.suggestionOverlay.close();
            this._suggestionOverlay = null;
        }
        /**
         * Raises the <c>addSuggestion</c> event
         * @param item
         */
        onAddSuggestion(item) {
            this.suggestionOverlay.items.add(item);
            if (item instanceof latte.ButtonItem) {
                item.click.add(() => { this.hideSuggestions(); });
            }
        }
        /**
         * Raises the <c>enterPressed</c> event
         */
        onEnterPressed() {
            if (this._enterPressed) {
                this._enterPressed.raise();
            }
        }
        /**
         * Raises the <c>filterSuggestions</c> event
         */
        onFilterSuggestions() {
            if (this._filterSuggestions) {
                this._filterSuggestions.raise();
            }
        }
        /**
         * Raises the <c>keyDown</c>
         * @param e
         */
        onKeyDown(e) {
            this.keyDown.raise();
            if (this.suggestionsVisible) {
                if (e.keyCode == latte.Key.ARROW_UP) {
                    this.selectPreviousSuggestion();
                    e.stopImmediatePropagation();
                    return false;
                }
                else if (e.keyCode == latte.Key.ARROW_DOWN) {
                    this.selectNextSuggestion();
                    e.stopImmediatePropagation();
                    return false;
                }
                else if (e.keyCode == latte.Key.ENTER || e.keyCode == latte.Key.TAB) {
                    if (this._selectedSuggestion instanceof latte.ButtonItem) {
                        this._selectedSuggestion.onClick();
                    }
                    e.stopImmediatePropagation();
                    return false;
                }
                else if (e.keyCode == latte.Key.ESCAPE) {
                    this.hideSuggestions();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        }
        /**
         * Raises the <c>keyUp</c>
         * @param e
         */
        onKeyUp(e) {
            this.keyUp.raise();
            if (e.keyCode != latte.Key.ARROW_DOWN && e.keyCode != latte.Key.ARROW_UP
                && e.keyCode != latte.Key.TAB && e.keyCode != latte.Key.ENTER && e.keyCode != latte.Key.ESCAPE) {
                if (!this._loadingSuggestions) {
                    if (this.value.length >= this.minLengthToActivateSuggestions) {
                        this._loadingSuggestions = true;
                        setInterval(() => { this._loadingSuggestions = false; }, 1000);
                        this.onFilterSuggestions();
                    }
                    else {
                        this.hideSuggestions();
                    }
                }
            }
        }
        /**
         * Raises the <c>keyPress</c> event
         */
        onKeyPress(e) {
            if (this._keyPress) {
                return this._keyPress.raise(e);
            }
        }
        /**
         * Override.
         **/
        onLayout() {
            super.onLayout();
            //this.width(this.element.width() - 12);
            if (this.multiline && this.autoGrow && this.input) {
                this._invisible
                    .width(this.input.width())
                    .text(this.input.val() + '.');
                this.input.height(Math.max(13, this._invisible.height()));
            }
        }
        /**
         * Raises the <c>removeSuggestion</c> event
         * @param item
         */
        onRemoveSuggestion(item) {
            this.suggestionOverlay.items.remove(item);
        }
        /**
         * Raises the <c>valid</c> event
         */
        onValidChanged() {
            if (this._validChanged) {
                return this._validChanged.raise();
            }
            this.ensureClass('invalid', !this.valid);
        }
        /**
         * Override
         **/
        onValueChanged() {
            super.onValueChanged();
            // Pass value to textbox
            if (this.ignorePassToTextbox) {
                this.ignorePassToTextbox = false;
            }
            else {
                this.input.val(this.value);
            }
            if (this._placeholderLabel) {
                this.placeholderLabel.visible = this.value.length === 0;
            }
            if (this.value.length < this.minLengthToActivateSuggestions && this.suggestionsVisible) {
                this.hideSuggestions();
            }
            if (this.validationRegex && String(this.value).length > 0) {
                this.valid = this.validationRegex.test(this.value);
            }
        }
        /**
         * Selects the first item of suggestions
         */
        selectFirstSuggestion() {
            this.selectSuggestion(0);
        }
        /**
         * Selects the next suggestion (if possible)
         */
        selectNextSuggestion() {
            if (this.suggestionsVisible && this.selectedIndex < this._suggestionOverlay.items.length) {
                this.selectSuggestion(this.selectedIndex + 1);
            }
        }
        /**
         * Selects the previous suggestion (if possible)
         */
        selectPreviousSuggestion() {
            if (this.suggestionsVisible && this.selectedIndex > 0) {
                this.selectSuggestion(this.selectedIndex - 1);
            }
        }
        /**
         * Selects the specified suggestion from list
         * @throws Exception if index is out of range
         * @param index
         */
        selectSuggestion(index) {
            if (this.suggestionsVisible) {
                if (index < 0 || index >= this._suggestionOverlay.items.length) {
                    throw new latte.Ex();
                }
                for (var i = 0; i < this._suggestionOverlay.items.length; i++) {
                    var b = this._suggestionOverlay.stack.items[i];
                    b.checked = i == index;
                    if (i == index)
                        this._selectedSuggestion = b;
                }
                this.selectedIndex = index;
            }
            else {
                this.selectedIndex = -1;
            }
        }
        /**
         * Sets the width as a percentage. Dont forget to include '%' after size
         **/
        setRelativeWidth(width) {
            this.input.css('width', width);
        }
        /**
         * Sets the side label as a "clear text" button, with the specified button
         * @param icon
         */
        setSideAsCleaner(icon = null) {
            if (!icon) {
                icon = latte.IconItem.standard(8, 10);
            }
            this.sideLabel.tooltip = strings.clearText;
            this.sideLabel.css('cursor', 'pointer');
            this.sideLabel.element.click(() => { this.value = ''; });
            this.valueChanged.add(() => {
                if (this.value.length > 0) {
                    this.sideLabel.icon = icon;
                }
                else {
                    this.sideLabel.icon = null;
                }
            });
        }
        /**
         * Sets the value silently without updating the textbox
         * @param value
         */
        setValueSilently(value) {
            this.ignorePassToTextbox = true;
            this.value = value;
        }
        /**
         * Gets an event raised when user presses the enter key
         *
         * @returns {LatteEvent}
         */
        get enterPressed() {
            if (!this._enterPressed) {
                this._enterPressed = new latte.LatteEvent(this);
            }
            return this._enterPressed;
        }
        /**
         * Gets an event raised when the user presses a key on the input
         *
         * @returns {LatteEvent}
         */
        get keyPress() {
            if (!this._keyPress) {
                this._keyPress = new latte.LatteEvent(this);
            }
            return this._keyPress;
        }
        /**
         * Gets an event raised when a key is pressed
         *
         * @returns {LatteEvent}
         */
        get keyDown() {
            if (!this._keyDown) {
                this._keyDown = new latte.LatteEvent(this);
            }
            return this._keyDown;
        }
        /**
         * Gets an event raised when the key is released
         *
         * @returns {LatteEvent}
         */
        get keyUp() {
            if (!this._keyUp) {
                this._keyUp = new latte.LatteEvent(this);
            }
            return this._keyUp;
        }
        /**
         * Gets an event raised when its time to add suggestins
         *
         * @returns {LatteEvent}
         */
        get filterSuggestions() {
            if (!this._filterSuggestions) {
                this._filterSuggestions = new latte.LatteEvent(this);
            }
            return this._filterSuggestions;
        }
        /**
         * Gets an event raised when the value of the valid property changes
         *
         * @returns {LatteEvent}
         */
        get validChanged() {
            if (!this._validChanged) {
                this._validChanged = new latte.LatteEvent(this);
            }
            return this._validChanged;
        }
        /**
         * Gets or sets the allowed keys of the keyboard
         *
         * @returns {Key[]}
         */
        get allowedKeys() {
            return this._allowedKeys;
        }
        /**
         * Gets or sets the allowed keys of the keyboard
         *
         * @param {Key[]} value
         */
        set allowedKeys(value) {
            this._allowedKeys = value;
        }
        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        get autoGrow() {
            return this._autoGrow;
        }
        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        set autoGrow(value) {
            this._autoGrow = value;
        }
        /**
         * Gets or sets the filter for input
         *
         * @returns {TextboxFilter}
         */
        get filter() {
            return this._filter;
        }
        /**
         * Gets or sets the filter for input
         *
         * @param {TextboxFilter} value
         */
        set filter(value) {
            this._filter = value;
            let navs = [latte.Key.ARROW_LEFT, latte.Key.ARROW_RIGHT, latte.Key.TAB,
                latte.Key.SHIFT, latte.Key.ALT, latte.Key.DELETE, latte.Key.BACKSPACE];
            let numbers = [latte.Key.NUMBER_0, latte.Key.NUMBER_1, latte.Key.NUMBER_2, latte.Key.NUMBER_3, latte.Key.NUMBER_4, latte.Key.NUMBER_5,
                latte.Key.NUMBER_6, latte.Key.NUMBER_7, latte.Key.NUMBER_8, latte.Key.NUMBER_9, latte.Key.NUMPAD_0, latte.Key.NUMPAD_1, latte.Key.NUMPAD_2,
                latte.Key.NUMPAD_3, latte.Key.NUMPAD_4, latte.Key.NUMPAD_5, latte.Key.NUMPAD_6, latte.Key.NUMPAD_7, latte.Key.NUMPAD_8, latte.Key.NUMPAD_9];
            let period = [latte.Key.PERIOD];
            let comma = [latte.Key.COMMA];
            if (value && value == TextboxFilter.NUMBER) {
                this.allowedKeys = navs.concat(numbers).concat(period).concat(comma);
            }
            else if (value && value == TextboxFilter.INTEGER) {
                this.allowedKeys = navs.concat(numbers);
            }
        }
        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        get maxLength() {
            return this._maxLength;
        }
        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        set maxLength(value) {
            if (!latte._isNumber(value))
                throw new latte.InvalidArgumentEx('value');
            this._maxLength = value;
            if (value > 0)
                this.input.attr('maxlength', value);
        }
        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        get minHeight() {
            return this._minHeight;
        }
        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        get minLengthToActivateSuggestions() {
            return this._minLenToSuggest;
        }
        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        set minLengthToActivateSuggestions(value) {
            this._minLenToSuggest = value;
        }
        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        set minHeight(value) {
            this._minHeight = value;
            this.input.css({ minHeight: value });
        }
        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        get multiline() {
            return this._multiline;
        }
        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        set multiline(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._multiline = value;
            this._updateInput();
        }
        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        get password() {
            return this._password;
        }
        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        set password(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value', value);
            this._password = value;
            this._updateInput();
        }
        /**
         * Gets or sets the placeholder text of textbox
         **/
        get placeholder() {
            return this.placeholderLabel.text;
        }
        /**
         * Gets or sets the placeholder text of textbox
         **/
        set placeholder(value) {
            this.placeholderLabel.text = value;
        }
        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @returns {boolean}
         */
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @param {boolean} value
         */
        set readOnly(value) {
            // Check if value changed
            var changed = value !== this._readOnly;
            // Set value
            this._readOnly = value;
            // Trigger changed event
            if (changed) {
                this.onReadOnlyChanged();
            }
        }
        /**
         * Gets an event raised when the value of the readOnly property changes
         *
         * @returns {LatteEvent}
         */
        get readOnlyChanged() {
            if (!this._readOnlyChanged) {
                this._readOnlyChanged = new latte.LatteEvent(this);
            }
            return this._readOnlyChanged;
        }
        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged() {
            if (this._readOnlyChanged) {
                this._readOnlyChanged.raise();
            }
            if (this.readOnly) {
                this.input.attr('readonly', 'yes');
            }
            else {
                this.input.removeAttr('readonly');
            }
        }
        /**
         * Gets the suggestions overlay
         */
        get suggestionOverlay() {
            if (!this._suggestionOverlay) {
                this._suggestionOverlay = new latte.SuggestionOverlay();
                //                this._suggestionOverlay.parent = this;
                this._suggestionOverlay.element.appendTo('body');
                /**
                 * Show suggestions when more than one
                 */
                this._suggestionOverlay.stack.items.addItem.add(() => {
                    if (this._suggestionOverlay.stack.items.length > 0) {
                        this._suggestionOverlay.showAtSide(latte.Side.BOTTOM, this);
                    }
                    if (this._suggestionOverlay.items.length == 1) {
                        this.selectFirstSuggestion();
                    }
                });
                this._suggestionOverlay.stack.items.removeItem.add(() => {
                    if (this._suggestionOverlay.stack.items.length == 0) {
                        this.hideSuggestions();
                    }
                });
            }
            return this._suggestionOverlay;
        }
        /**
         * Gets the collection of suggestions for autocompletion
         *
         * @returns {Collection<Item>}
         */
        get suggestions() {
            if (!this._suggestions) {
                this._suggestions = new latte.Collection(this.onAddSuggestion, this.onRemoveSuggestion, this);
            }
            return this._suggestions;
        }
        /**
         * Gets a value indicating if the suggestions list is currently visible
         * @returns {boolean}
         */
        get suggestionsVisible() {
            return this._suggestionOverlay instanceof latte.Overlay;
        }
        /**
         * Gets or sets a value indicating if the control is valid
         *
         * @returns {boolean}
         */
        get valid() {
            return this._valid;
        }
        /**
         * Gets or sets a value indicating if the control is valid
         *
         * @param {boolean} value
         */
        set valid(value) {
            // Check if value changed
            let changed = value !== this._valid;
            // Set value
            this._valid = value;
            // Trigger changed event
            if (changed) {
                this.onValidChanged();
            }
        }
        /**
         * Gets or sets the regular expression for validating content
         *
         * @returns {RegExp}
         */
        get validationRegex() {
            return this._validationRegex;
        }
        /**
         * Gets or sets the regular expression for validating content
         *
         * @param {RegExp} value
         */
        set validationRegex(value) {
            this._validationRegex = value;
        }
        /**
         * Gets or sets the width of the textbox.
         **/
        get width() {
            return this.input.width();
        }
        /**
         * Gets or sets the width of the textbox.
         **/
        set width(value) {
            // Width considering padding and border
            this.input.width(value - Math.abs(this.input.width() - this.input.outerWidth()));
        }
        /**
         * Gets the placeholder label
         *
         * @returns {LabelItem}
         */
        get placeholderLabel() {
            if (!this._placeholderLabel) {
                this._placeholderLabel = new latte.LabelItem();
                this._placeholderLabel.addClass('placeholder');
                this._placeholderLabel.appendTo(this);
                this._placeholderLabel.addEventListener('click', () => this.input.focus());
                latte.UiElement.disableTextSelection(this.placeholderLabel.element);
            }
            return this._placeholderLabel;
        }
        /**
         * Gets the side label
         *
         * @returns {LabelItem}
         */
        get sideLabel() {
            if (!this._sideLabel) {
                this._sideLabel = new latte.LabelItem();
                this._sideLabel.addClass('side-label');
                this._sideLabel.appendTo(this);
            }
            return this._sideLabel;
        }
    }
    latte.TextboxItem = TextboxItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 3/22/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ItemOverlay extends latte.Overlay {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the overlay
         */
        constructor(item) {
            super();
            //region Private Methods
            //endregion
            //region Methods
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._item = null;
            if (item) {
                this.item = item;
            }
        }
        /**
         * Gets or sets the item of the overlay
         *
         * @returns {Item}
         */
        get item() {
            return this._item;
        }
        /**
         * Gets or sets the item of the overlay
         *
         * @param {Item} value
         */
        set item(value) {
            // Check if value changed
            var changed = value !== this._item;
            // Set value
            this._item = value;
            // Trigger changed event
            if (changed) {
                this.onItemChanged();
            }
        }
        /**
         * Gets an event raised when the value of the item property changes
         *
         * @returns {LatteEvent}
         */
        get itemChanged() {
            if (!this._itemChanged) {
                this._itemChanged = new latte.LatteEvent(this);
            }
            return this._itemChanged;
        }
        /**
         * Raises the <c>item</c> event
         */
        onItemChanged() {
            if (this._itemChanged) {
                this._itemChanged.raise();
            }
            this.element.clear().append(this.item.element);
        }
    }
    latte.ItemOverlay = ItemOverlay;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a graphical indicator of activity.
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #007700">var&nbsp;</span><span style="color: #0000BB">loader&nbsp;</span><span style="color: #007700">=&nbsp;new&nbsp;</span><span style="color: #0000BB">Loader</span><span style="color: #007700">(</span><span style="color: #DD0000">"Doing&nbsp;some&nbsp;stuff"</span><span style="color: #007700">);<br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;...<br />&nbsp;&nbsp;//&nbsp;Load&nbsp;some&nbsp;heavy&nbsp;stuff..<br />&nbsp;&nbsp;//&nbsp;...<br /><br />&nbsp;&nbsp;//&nbsp;Hide&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #0000BB">loader</span><span style="color: #007700">.</span><span style="color: #0000BB">stop</span><span style="color: #007700">();<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    class Loader extends latte.Overlay {
        /**
         * Creates and shows the loader. Optionally specifies if is to be shown as <c>modal</c>.
         **/
        constructor(text = '', modal = false) {
            super();
            this.element.addClass('loader');
            // Init events
            this.cancelled = new latte.LatteEvent(this);
            this.element.addClass('loader').appendTo('body');
            this.labelElement = $('<div>').addClass('label').appendTo(this.element);
            this.cancelElement = $('<div>').addClass('cancel').appendTo(this.element);
            this.progress = new latte.ProgressItem();
            this.progress.visible = false;
            this.progress.appendTo(this.element);
            this.text = latte._undef(text) ? strings.working : text;
            this.modal = modal === true;
            this.start();
        }
        /**
         * Adds a loader to the list of active loaders, if not already present.
         **/
        static add(loader) {
            /// Validate loader
            if (!(loader instanceof Loader))
                throw new latte.InvalidArgumentEx('loader');
            /// Retrieve array
            var a = Loader._active;
            /// Check loader is not already there
            var found = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i] === loader) {
                    found = true;
                    break;
                }
            }
            /// Add if not found
            if (!found) {
                a.unshift(loader);
            }
        }
        /**
         * Removes the Loader from the active list of loaders
         **/
        static remove(loader) {
            /// Validate loader
            if (!(loader instanceof Loader))
                throw new latte.InvalidArgumentEx('loader');
            // Retrieve array
            var a = Loader._active;
            // New array
            var arr = [];
            // Scan
            for (var i = 0; i < a.length; i++) {
                if (a[i] != loader)
                    arr.push(a[i]);
            }
            // Set new array
            Loader._active = arr;
        }
        /**
         * Updates all active loaders position and ensures modal layer visibility
         **/
        static update() {
            Loader.updateModalVisibility();
            Loader.updateLayout();
        }
        /**
         * Updates all active loaders positions
         **/
        static updateLayout() {
            var loaders = Loader._active;
            if (!loaders.length)
                return;
            var loader = null;
            var curTop = 0;
            var s = Loader.separation;
            var sampleHeight = loaders[0].element.outerHeight();
            var r = new latte.Rectangle(s, 0, Loader.maxWidth, (sampleHeight + s) * loaders.length);
            /// Center r on screen
            r = r.center($(document).rectangle());
            if (!Loader.modalShouldBeVisible) {
                r.top = s;
            }
            curTop = r.top;
            /// Animate each loader to its place
            for (var i = 0; i < loaders.length; i++) {
                loader = loaders[i];
                loader
                    .element
                    .css({
                    left: r.left
                })
                    .show()
                    .animate({
                    opacity: 1,
                    //width: r.width(),
                    //left: r.left(),
                    top: curTop
                }, 'fast');
                // Increase curTop
                curTop += sampleHeight + s;
            }
        }
        /**
         * Iterates trough active loaders to check if modal layer should be visible
         **/
        static updateModalVisibility() {
            Loader.modalVisible = Loader.modalShouldBeVisible;
        }
        /**
         * Gets the widest loader width
         **/
        static get maxWidth() {
            var max = 0;
            var a = Loader._active;
            for (var i = 0; i < a.length; i++) {
                a[i].element.css('width', null);
                max = Math.max(max, a[i].element.width());
            }
            return max;
        }
        /**
         * Gets a boolean indicating if the modal layer should be visible based on the active loaders.
         **/
        static get modalShouldBeVisible() {
            var shouldBeVisible = false;
            var a = Loader._active;
            /// Scan all active loaders to check if layer should be visible
            for (var i = 0; i < a.length; i++) {
                if (a[i].modal === true) {
                    shouldBeVisible = true;
                    break;
                }
            }
            return shouldBeVisible;
        }
        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        static get modalVisible() {
            var m = $('.latte-loader-modal');
            return m.is(':visible') || m.hasClass('fading-out');
        }
        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        static set modalVisible(visible) {
            var m = $('.latte-loader-modal');
            if (m.length == 0) {
                m = $('<div>')
                    .addClass('latte-loader-modal')
                    .hide()
                    .appendTo('body')
                    .css({
                    position: 'fixed',
                    left: 0, top: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)'
                });
            }
            /// Re insert before any other loader
            m.detach();
            var loaders = $('body > div.loader');
            if (loaders.length == 0)
                $('body').append(m);
            else
                loaders.first().before(m);
            if (visible === true) {
                if (!m.is(':visible')) {
                    m.show().css('opacity', 0).animate({
                        opacity: 1
                    }, 'fast');
                }
            }
            else {
                if (m.is(':visible') && !m.hasClass('fading-out')) {
                    m.addClass('fading-out').css('opacity', 1).animate({
                        opacity: 0
                    }, 'fast', 'swing', function () { $(this).removeClass('fading-out').hide(); });
                }
            }
        }
        /**
         * Raises the <c>cancelled</c> event
         **/
        onCancelled() {
            this.cancelled.raise();
        }
        /**
         * Shows the loader on the UI
         **/
        start() {
            // Add to active Loaders
            Loader.add(this);
            var screen = $(document).rectangle();
            var r = this.element.rectangle();
            r = r.center(screen);
            // Position on the center
            this.element.css({
                top: -this.element.height() - 10,
                left: r.left,
                opacity: 0
            });
            /// Update Layout
            Loader.update();
        }
        /**
         * Hides the loader on the UI
         **/
        stop() {
            var inst = this;
            /// Remove from active loaders
            Loader.remove(this);
            /// Disappear element
            this.element
                .animate({
                opacity: 0,
                top: -(this.element.height())
            }, 'fast', 'swing', () => { inst.element.remove(); });
            /// Update Layout
            Loader.update();
        }
        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        get cancellable() {
            return this._cancellable;
        }
        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        set cancellable(value) {
            this._cancellable = value;
        }
        /**
         * Gets or sets the description of the loader
         **/
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the description of the loader
         **/
        set description(value) {
            this._description = value;
        }
        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        get modal() {
            return this._modal;
        }
        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        set modal(value) {
            this._modal = value;
        }
        /**
         * Gets or sets the text of the loader
         **/
        get text() {
            return this.labelElement.html();
        }
        /**
         * Gets or sets the text of the loader
         **/
        set text(value) {
            this.labelElement.html(value);
            Loader.update();
        }
    }
    /**
     *
     **/
    Loader._active = [];
    /**
     * Amount of pixels between loaders when stacked
     **/
    Loader.separation = 5;
    latte.Loader = Loader;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows items in a popup.
     **/
    class MenuOverlay extends latte.Overlay {
        /**
         * Creates the Menu
         **/
        constructor() {
            super();
            this.closed = new latte.LatteEvent(this);
            this.willShowAtX = new latte.LatteEvent(this);
            this.willShowAtY = new latte.LatteEvent(this);
            this._side = latte.Side.AUTO;
            this._edge = latte.Side.AUTO;
            this.element.addClass('menu');
            this.element.addClass('menu-face');
            // Add to DOM
            //            this.element.appendTo('body');
            // Temporary
            this.element.css({
                minWidth: 100, minHeight: 20
            });
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
        }
        /**
         * Initialize handlers at global level
         **/
        static _initialize() {
            // Check if not already initialized
            if (MenuOverlay.initialized === true) {
                return;
            }
            MenuOverlay.closingAll = new latte.LatteEvent(this);
            $(document)
                .click(function () {
                MenuOverlay.closeAll();
            })
                .keydown(function (evt) {
                if (evt.keyCode == latte.Key.ESCAPE) {
                    MenuOverlay.closeAll();
                }
            });
            // Flag as initialized
            MenuOverlay.initialized = true;
        }
        /**
         * Closes all open menus along the User Agent viewport
         **/
        static closeAll() {
            MenuOverlay.onClosingAll();
            $('.latte-overlay.menu').each(function () {
                $(this).data('instance').close();
            });
        }
        /**
         * Marks with CSS the element as currently showing a menu. If no side
         is specified, it just clears the CSS as "no showing the menu"
         **/
        static mark(elem, side = null) {
            if (!(elem instanceof jQuery))
                throw new latte.InvalidArgumentEx('elem', elem);
            elem.removeClass('with-menu with-menu-at-top with-menu-at-bottom ' +
                'with-menu-at-right with-menu-at-left hover pressed');
            if (side) {
                var str = '';
                switch (side) {
                    case latte.Side.BOTTOM:
                        str = 'bottom';
                        break;
                    case latte.Side.LEFT:
                        str = 'left';
                        break;
                    case latte.Side.RIGHT:
                        str = 'right';
                        break;
                    case latte.Side.TOP:
                        str = 'top';
                        break;
                }
                elem.addClass('with-menu with-menu-at-' + str);
            }
        }
        /**
         * Raises the <c>closingAll</c> static event
         **/
        static onClosingAll() {
            MenuOverlay.closingAll.raise();
        }
        /**
         *
         **/
        _onAddItem(item) {
            if (item instanceof latte.ButtonItem) {
                var b = item;
                // Remove face
                b.faceVisible = false;
                // Check if glyph is needed
                if (b.items.count > 0 || b.willLoadItems)
                    b.glyph = latte.Glyph.right;
                else
                    b.glyph = null;
                // Dismisser
                b.click.add(() => { MenuOverlay.closeAll(); });
            }
            this.element.append(item.element);
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item.element.detach();
        }
        /**
         * Closes the menu and removes its elements from the DOM
         **/
        close() {
            var m = this;
            if (this._parentButton)
                this._parentButton.itemsMenu = null;
            if (this.domElement) {
            }
            // Remove contextAt of clickable item
            if (this.item instanceof latte.ClickableItem) {
                this.item.contextAt = null;
            }
            latte.ZIndex.removeElement(this.element);
            // Execute event
            this.onClosed();
            // Fadeout
            this.element.fadeOut('fast', function () {
                // Bye bye from DOM
                m.element.detach();
            });
            return this;
        }
        /**
         * Closes the menus open by any of this Menu's children
         **/
        closeChildrenMenus() {
            var item;
            while ((item = this.items.next())) {
                if (item instanceof latte.ButtonItem)
                    item.hideItems();
            }
            return this;
        }
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed() {
            this.closed.raise();
        }
        onLayout() {
            super.onLayout();
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].onLayout();
            }
        }
        /**
         * Raises the <c>willShowAtX</c> event
         **/
        onWillShowAtX(x) {
            return this.willShowAtX.raise(x);
        }
        /**
         * Raises the <c>willShowAtY</c> event
         **/
        onWillShowAtY(y) {
            return this.willShowAtY.raise(y);
        }
        /**
         * Sets the parent button of the menu
         */
        setParentButton(b) {
            this._parentButton = b;
        }
        /**
         * Shows the menu relative to the specified element
         **/
        show(item, side, edge) {
            if (!(item instanceof latte.Item))
                throw new latte.InvalidArgumentEx('item', item);
            this.parent = item;
            var s = latte.Side;
            var $element = item instanceof latte.ButtonItem ? (item.split ? item.dropdown.element : item.element) : item.element;
            var e = item.element.rectangle();
            var r = this.element.rectangle();
            var x = 0;
            var y = 0;
            var iterations = 0;
            var offset = 2;
            this._item = item;
            this._domElement = $element;
            if (latte._undef(side) || !side)
                side = s.BOTTOM;
            if (latte._undef(edge) || !edge)
                edge = s.AUTO;
            // Hide?
            this.element.hide();
            while (iterations++ < 2) {
                //iterations++;
                // Remvove hover & pressed (for clickables)
                $element.removeClass('hover pressed');
                // Mark parent
                if (item instanceof latte.ClickableItem) {
                    item.contextAt = side;
                }
                switch (side) {
                    case s.TOP:
                        y = e.top - r.height + offset;
                        break;
                    case s.BOTTOM:
                        y = e.bottom - offset;
                        break;
                    case s.LEFT:
                        x = e.left - r.width + offset;
                        break;
                    case s.RIGHT:
                        x = e.right - offset;
                        break;
                }
                if (side == s.TOP || side == s.BOTTOM) {
                    var minWidth = Math.round(e.width * 1.3);
                    this.element.css('min-width', minWidth);
                    r = this.element.rectangle();
                    if (edge == s.RIGHT)
                        x = e.right - r.width;
                    else
                        x = e.left;
                }
                if (side == s.LEFT || side == s.RIGHT) {
                    var minHeight = Math.round(e.height * 1.3);
                    this.element.css('min-height', minHeight);
                    r = this.element.rectangle();
                    if (edge == s.BOTTOM)
                        y = e.bottom - r.height;
                    else
                        y = e.top;
                }
                var viewport = $(window).rectangle();
                var rect = new latte.Rectangle(x, y, this.element.width(), this.element.height());
                // Position correction or recalculation
                if (iterations <= 1 && !viewport.containsRectangle(rect)) {
                    // Check if necessary to invert
                    if (side == s.RIGHT && rect.right > viewport.right
                        || side == s.LEFT && rect.left < viewport.left
                        || side == s.BOTTOM && rect.bottom > viewport.bottom
                        || side == s.TOP && rect.top < viewport.top) {
                        switch (side) {
                            case s.TOP:
                                side = s.BOTTOM;
                                break;
                            case s.BOTTOM:
                                side = s.TOP;
                                break;
                            case s.RIGHT:
                                side = s.LEFT;
                                break;
                            case s.LEFT:
                                side = s.RIGHT;
                                break;
                        }
                        if ((item instanceof latte.ButtonItem) && item.split) {
                            $element = item.element;
                        }
                        continue;
                    }
                }
                // Bottom correction
                if (rect.bottom > viewport.bottom) {
                    rect.top = viewport.bottom - rect.height - offset;
                }
                // Top correction
                if (rect.top < viewport.top) {
                    rect.top = viewport.top;
                }
                // Right correction
                if (rect.right > viewport.right) {
                    rect.left = viewport.right - rect.width - offset;
                }
                // Left correction
                if (rect.left < viewport.left) {
                    rect.left = viewport.left;
                }
            }
            this._edge = edge;
            this._side = side;
            this.showAt(rect.left, rect.top);
            return this;
        }
        /**
         * Shows the menu at the exact point
         **/
        showAt(x, y) {
            if (!latte._isNumber(x))
                throw new latte.InvalidArgumentEx('x', x);
            if (!latte._isNumber(y))
                throw new latte.InvalidArgumentEx('y', y);
            var newX = this.onWillShowAtX(x);
            var newY = this.onWillShowAtY(y);
            if (latte._isNumber(newX))
                x = newX;
            if (latte._isNumber(newY))
                y = newY;
            this.element.hide();
            var viewport = $(window).rectangle();
            var rect = new latte.Rectangle(x, y, this.element.width(), this.element.height());
            var offset = 30;
            var time = 100;
            var animStart = { opacity: 0 };
            var animEnd = { opacity: 1 };
            var side = this.side;
            // If menu is larger than viewport
            if (rect.bottom > viewport.bottom) {
                // Make it fit
                latte.log("FITTING!");
                this.element.height(viewport.bottom - rect.top);
                this.element.css('overflow', 'auto');
            }
            //            log("MenuAt %s, %s", x, y)
            // Position
            this.element.css({
                left: x,
                top: y
            });
            // Fix position according to position
            if (latte.View.smallScreen) {
                this.element.css({
                    left: 0,
                    right: 0,
                    bottom: 0
                });
            }
            else {
                // Program animations
                if (side) {
                    switch (side) {
                        case latte.Side.RIGHT:
                            animStart.left = '-=' + offset;
                            animEnd.left = '+=' + offset;
                            break;
                        case latte.Side.LEFT:
                            animStart.left = '+=' + offset;
                            animEnd.left = '-=' + offset;
                            break;
                        case latte.Side.BOTTOM:
                            animStart.top = '-=' + offset;
                            animEnd.top = '+=' + offset;
                            break;
                        case latte.Side.TOP:
                            animStart.top = '+=' + offset;
                            animEnd.top = '-=' + offset;
                            break;
                    }
                }
            }
            if ($.fx.off || latte.View.smallScreen) {
                this.element.show();
            }
            else {
                this.element
                    .show()
                    .css(animStart)
                    .animate(animEnd, time, 'swing', () => { this.onLayout(); });
            }
        }
        /**
         * Gets the parent element relative to this menu. The menu is shown to the <c>side</c> of this element
         **/
        get domElement() {
            return this._domElement;
        }
        /**
         * Gets the edge of the menu, relative to element provided by <c>domElement</c>
         **/
        get edge() {
            return this._edge;
        }
        /**
         * Gets the parent item of the menu
         **/
        get item() {
            return this._item;
        }
        /**
         * Gets the orientation of the menu, relative to element provided by <c>domElement</c>
         **/
        get side() {
            return this._side;
        }
    }
    latte.MenuOverlay = MenuOverlay;
    $(() => { MenuOverlay._initialize(); });
})(latte || (latte = {}));
var latte;
(function (latte) {
    class SuggestionOverlay extends latte.StackOverlay {
        constructor() {
            super();
            this.addClass('suggestion');
            // Remove face from buttons
            this.items.addItem.add((item) => {
                if (item instanceof latte.ButtonItem) {
                    item.faceVisible = false;
                }
            });
        }
    }
    latte.SuggestionOverlay = SuggestionOverlay;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * A <c>View</c> with a ribbon on the top.

     The view reacts in size when ribbon is collapsed and preserves it on the top.
     **/
    class RibbonView extends latte.AnchorView {
        /**
         * Creates the View
         **/
        constructor() {
            super();
            this.element.addClass('ribbon');
            // Create Ribbon
            this.ribbon = new latte.Ribbon();
            this.anchorTop = this.ribbon;
            this.ribbon.collapsedChanged.add(() => {
                this.onLayout();
            });
            //            this.element.prepend(this.ribbon.element);
        }
        /**
         * Handles changes in size
         **/
        onLayoutHIDDEN() {
            super.onLayout();
            this.ribbon.onLayout();
            // Position the container
            this.container.css('top', this.ribbon.element.height());
        }
    }
    latte.RibbonView = RibbonView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a Tabbed View.
     *
     * Add tabs and views to its collections to obtain "Tabbed View" behavior
     **/
    class TabView extends latte.AnchorView {
        /**
         * Creates the view
         **/
        constructor() {
            // Init
            super();
            /**
             * Property field
             */
            this._tabsSide = latte.Side.AUTO;
            this.element.addClass('tab');
            this.tabToolbar = new latte.TabToolbar();
            this.anchorTop = this.tabToolbar;
            // Init collections
            this.tabs = new latte.Collection(this.onTabAdded, this.onTabRemoved, this);
            this.views = new latte.Collection();
            // Init events
            this.selectedTabChanged = new latte.LatteEvent(this);
            this.tabToolbar.selectedTabChanged.add(() => {
                this.onSelectedTabChanged();
            });
        }
        /**
         *
         **/
        onTabAdded(tab) {
            this.tabToolbar.tabs.add(tab);
            this.onLayout();
        }
        /**
         *
         **/
        onTabRemoved(tab) {
            this.tabToolbar.tabs.remove(tab);
        }
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged() {
            // Get index to show view
            var index = this.tabs.indexOf(this.selectedTab);
            // Show View
            if (this.views[index] instanceof latte.View) {
                this.view = this.views[index];
            }
            this.selectedTabChanged.raise();
        }
        /**
         * Override
         */
        onAnchorTopChanged() {
            super.onAnchorTopChanged();
            this.tabToolbar.contentSide = latte.Side.BOTTOM;
        }
        /**
         * Override
         */
        onAnchorRightChanged() {
            super.onAnchorRightChanged();
            this.tabToolbar.contentSide = latte.Side.LEFT;
        }
        /**
         * Override
         */
        onAnchorBottomChanged() {
            super.onAnchorBottomChanged();
            this.tabToolbar.contentSide = latte.Side.TOP;
        }
        /**
         * Override
         */
        onAnchorLeftChanged() {
            super.onAnchorLeftChanged();
            this.tabToolbar.contentSide = latte.Side.LEFT;
        }
        /**
         * Gets or sets the selected tab of the view
         **/
        get selectedTab() {
            return this.tabToolbar.selectedTab;
        }
        /**
         * Gets or sets the selected tab of the view
         **/
        set selectedTab(value) {
            this.tabToolbar.selectedTab = value;
            this.onSelectedTabChanged();
        }
        /**
         * Gets or sets the side of the tabs
         *
         * @returns {Side}
         */
        get tabsSide() {
            return this._tabsSide;
        }
        /**
         * Gets or sets the side of the tabs
         *
         * @param {Side} value
         */
        set tabsSide(value) {
            this._tabsSide = value;
            this.anchorTop = null;
            this.anchorRight = null;
            this.anchorBottom = null;
            this.anchorLeft = null;
            switch (value) {
                case latte.Side.AUTO:
                case latte.Side.TOP:
                    this.anchorTop = this.tabToolbar;
                    break;
                case latte.Side.RIGHT:
                    this.anchorRight = this.tabToolbar;
                    break;
                case latte.Side.BOTTOM:
                    this.anchorBottom = this.tabToolbar;
                    break;
                case latte.Side.LEFT:
                    this.anchorLeft = this.tabToolbar;
                    break;
            }
        }
    }
    latte.TabView = TabView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * A View with a toolbar on the top, bottom or side
     **/
    class ToolbarView extends latte.AnchorView {
        /**
         * Creates the ToolbarView
         **/
        constructor() {
            // Init
            super();
            this.toolbar = new latte.Toolbar();
            this.anchorTop = this.toolbar;
            this.element.addClass('toolbar');
            // Init elements
            this.toolbar.itemsChanged.add(() => {
                this.onLayout();
            });
        }
        onAnchorTopChanged() {
            this.toolbar.direction = latte.Direction.HORIZONTAL;
            this.removeClass('top left bottom right');
            this.addClass('top');
            super.onAnchorTopChanged();
        }
        onAnchorRightChanged() {
            this.toolbar.direction = latte.Direction.VERTICAL;
            this.removeClass('top left bottom right');
            this.addClass('right');
            super.onAnchorRightChanged();
        }
        onAnchorBottomChanged() {
            this.toolbar.direction = latte.Direction.HORIZONTAL;
            this.removeClass('top left bottom right');
            this.addClass('bottom');
            super.onAnchorBottomChanged();
        }
        onAnchorLeftChanged() {
            this.toolbar.direction = latte.Direction.VERTICAL;
            this.removeClass('top left bottom right');
            this.addClass('left');
            super.onAnchorLeftChanged();
        }
    }
    latte.ToolbarView = ToolbarView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a set of days who contains day items
     **/
    class CalendarDayView extends latte.View {
        /**
         * Creates the day view
         **/
        constructor() {
            // Init
            super();
            /**
             *
             **/
            this._allDayOffset = 30;
            /**
             *
             **/
            this._itemPadding = 4;
            /**
             *
             **/
            this._minuteSpan = 30;
            this.element.addClass('calendar-day');
            this.focusable = true;
            // Events
            this.userAddItem = new latte.LatteEvent(this);
            this.userRemoveItem = new latte.LatteEvent(this);
            this.viewRangeChanged = new latte.LatteEvent(this);
            // Init collection
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            // Create elements
            this._content = $('<div>').addClass('content').appendTo(this.element);
            this._timeline = $('<div>').addClass('timeline').appendTo(this._content);
            this._columnsGrid = $('<div>').addClass('columns-grid').appendTo(this._content);
            this._columns = $('<div>').addClass('columns').appendTo(this._columnsGrid);
            this._columnsItems = $('<div>').addClass('columns-items').appendTo(this._columnsGrid);
            this._separator = $('<div>').addClass('separator').appendTo(this._content);
            this._daysGrid = $('<div>').addClass('days-grid').appendTo(this._content);
            this._timeSpans = $('<div>').addClass('time-spans').appendTo(this._daysGrid);
            this._timeIndicator = $('<div>').addClass('time-indicator').appendTo(this._daysGrid);
            this._daysItems = $('<div>').addClass('days-items').appendTo(this._daysGrid);
            this._workDayStart = new latte.TimeSpan(0, 8);
            this._workDayEnd = new latte.TimeSpan(0, 17);
            this._scrollStart = new latte.TimeSpan(0, 7);
            // Handlers
            this.element.keydown((e) => { this._keyDown(e); });
            this._columnsGrid.mousedown((e) => { this._columnsMouseDown(e); })
                .mousemove((e) => { this._columnsMouseMove(e); })
                .mouseup((e) => { this._columnsMouseUp(e); })
                .mouseleave((e) => { this._columnsMouseLeave(e); });
            this._daysGrid.mousedown((e) => { this._daysGridMouseDown(e); })
                .mouseup((e) => { this._daysGridMouseUp(e); })
                .mousemove((e) => { this._daysGridMouseMove(e); })
                .mouseleave((e) => { this._daysGridMouseUp(e); });
            // Init on this week
            this.setViewRange(latte.DateTime.today.addDays(-latte.DateTime.today.dayOfWeek + 1), latte.DateTime.today.addDays(-latte.DateTime.today.dayOfWeek + 1).addDays(4));
        }
        /**
         *
         **/
        _columnsMouseDown(e) {
            if (!this.allowItemCreate) {
                return;
            }
            var x = e.pageX;
            var y = e.pageY;
            if (this._onHeadersZone(x, y)) {
                this._columns.children().each(function () {
                    var $this = $(this);
                    var r = $this.data('rectangle');
                    var d = $this.data('date');
                    if (r.contains(x, y)) {
                        this._draggingHeaderSelection = d;
                        latte.UiElement.disableTextSelection(this.element);
                        this.setSelectionRange(d, d);
                    }
                });
            }
        }
        /**
         *
         **/
        _columnsMouseLeave(e) {
            //this._columnsMouseUp(e);
        }
        /**
         *
         **/
        _columnsMouseMove(e) {
            if (this._draggingHeaderSelection) {
                var __this = this;
                var x = e.pageX;
                var y = e.pageY;
                if (this._onHeadersZone(x, y)) {
                    this._columns.children().each(function () {
                        var $this = $(this);
                        var r = $this.data('rectangle');
                        var d = $this.data('date');
                        if (r.contains(x, y)) {
                            __this.setSelectionRange(__this._draggingHeaderSelection, d);
                        }
                    });
                }
            }
        }
        /**
         *
         **/
        _columnsMouseUp(e) {
            if (this._draggingHeaderSelection) {
                latte.UiElement.enableTextSelection(this.element);
                this._draggingHeaderSelection = null;
            }
        }
        /**
         * Creates a matrix filling each item as a position to measure item width and horizontal location

         Assigns three properties to each item to know its horizontal position
         **/
        _createMatrix() {
            var i, j, k, item, itemDays, startspan, endspan, start, end, date, dayIndex, col;
            var m = []; // Matrix
            var empty = undefined;
            var columns = this._columns.children();
            var spans = this.element.find('.time-span');
            var lastSpan = spans.length - 1;
            // Prints the matrix
            var printm = function () {
                var s = "";
                var i, j, k;
                for (i = 0; i < m.length; i++) {
                    for (j = 0; j < m[i].length; j++) {
                        if (m[i][j].length > 0)
                            for (k = 0; k < m[i][j].length; k++)
                                s += latte._undef(m[i][j][k]) ? '.' : m[i][j][k];
                        s += '\t\t';
                    }
                    s += '\n';
                }
                latte.log(s);
            };
            // Checks if the specified place is available
            var isAvailable = function (day, depth, startspan, endspan) {
                for (var i = startspan; i <= endspan; i++)
                    if (m[i][day][depth] != empty)
                        return false;
                return true;
            };
            // Places the specified index at the specified position
            var placeIndex = function (day, depth, startspan, endspan, index) {
                for (var i = startspan; i <= endspan; i++)
                    m[i][day][depth] = index;
            };
            // Gets the depth of day
            var dayDepth = function (day) {
                return m.length > 0 ? m[0][day].length : 0;
            };
            // Initialize empty matrix
            for (i = 0; i < spans.length; i++)
                for (j = (m[i] = []).length; j < columns.length; j++)
                    m[i].push([]);
            // Iterate items
            for (i = 0; i < this.items.count; i++) {
                item = this.items.item(i);
                if (item.allDay)
                    continue;
                start = item.dateStart;
                end = item.dateEnd;
                itemDays = Math.ceil(end.date.subtractDate(start.date).totalDays) + 1;
                // for each day item touches
                for (j = 0; j < itemDays; j++) {
                    date = start.date.addDays(j);
                    dayIndex = this._dayColumn(date).index();
                    startspan = start.date.equals(date) ? this._timeSpanIndexOf(start.timeOfDay) : 0;
                    endspan = end.date.equals(date) ? this._timeSpanIndexOf(end.timeOfDay) - 1 : lastSpan;
                    // Add item through spans
                    if (dayIndex >= 0) {
                        // Check if space available
                        var depth = 0;
                        // Find depth
                        while (!isAvailable(dayIndex, depth, startspan, endspan))
                            depth++;
                        // Place index where it fits
                        placeIndex(dayIndex, depth, startspan, endspan, i);
                        if (latte._undef(item.matrixAttributes))
                            item.matrixAttributes = [];
                        var obj = {
                            day: dayIndex,
                            depth: depth,
                            start: startspan,
                            end: endspan,
                            wide: 1
                        };
                        item.matrixAttributes.push(obj);
                    }
                }
            }
            // Expand to the right items with space
            for (j = 0; j < m[0].length; j++) {
                // Get max amount of depth
                col = 0;
                for (i = 0; i < m.length; i++)
                    col = Math.max(col, m[i][j].length);
                // Make all equally deep
                for (i = 0; i < m.length; i++)
                    for (k = m[i][j].length; k < col; k++)
                        m[i][j].push(empty);
            }
            // Expand where possible
            for (i = 0; i < this.items.count; i++) {
                item = this.items.item(i);
                if (item.allDay)
                    continue;
                for (j = 0; j < item.matrixAttributes.length; j++) {
                    var r = item.matrixAttributes[j];
                    for (k = r.depth + 1; k < dayDepth(r.day); k++) {
                        if (isAvailable(r.day, k, r.start, r.end)) {
                            placeIndex(r.day, k, r.start, r.end, i);
                            r.wide++;
                        }
                        else {
                            break;
                        }
                    }
                    r.index = r.depth;
                    r.count = dayDepth(r.day);
                }
            }
            //printm();
        }
        /**
         * Craetes a matrix for filling the all-day items
         **/
        _createTopMatrix() {
            var i, j, item, start, end, startColumn, endColumn, depth, maxdepth = -1;
            var m = [];
            var empty = undefined;
            // Prints the matrix
            var printm = function () {
                var s = '', i, j;
                for (i = 0; i <= maxdepth; i++) {
                    for (j = 0; j < m.length; j++) {
                        s += latte._undef(m[j][i]) ? '.' : m[j][i];
                        s += '\t';
                    }
                    s += '\n';
                }
                latte.log(s);
            };
            // Checks if space available  in the specified depth
            var isAvailable = function (depth, start, end) {
                for (var i = start; i <= end; i++)
                    if (m[i][depth] != empty)
                        return false;
                return true;
            };
            // Adds the index to the specified position in the matrix
            var placeIndex = function (index, depth, start, end) {
                for (var i = start; i <= end; i++)
                    m[i][depth] = index;
            };
            // Initialize matrix
            this._columns.children().each(function () { m.push([]); });
            for (i = 0; i < this.items.count; i++) {
                item = this.items.item(i);
                if (!item.allDay)
                    continue;
                // Get start and end columns
                startColumn = item.dateStart.compareTo(this._viewStart) < 0 ? this._columns.children().first() : this._dayColumn(item.dateStart);
                endColumn = item.dateEnd.compareTo(this._viewEnd) > 0 ? this._columns.children().last() : this._dayColumn(item.dateEnd);
                // Add index
                start = startColumn.index();
                end = endColumn.index();
                depth = 0;
                // Run for index
                while (!isAvailable(depth, start, end))
                    depth++;
                // Place index
                placeIndex(i, depth, start, end);
                // Save depth
                item._matrixDepth = depth;
            }
            //printm();
            for (i = 0; i < m.length; i++)
                maxdepth = Math.max(maxdepth, m[i].length);
            return maxdepth;
        }
        /**
         *
         **/
        _dayColumn(date) {
            return this._columns.find(latte.sprintf('.day-%s-%s-%s', date.year, date.month, date.day));
        }
        /**
         *
         **/
        _daysGridMouseDown(e) {
            var hit = this._timeSpanHitTest(e.pageX, e.pageY);
            var col = hit.day;
            var span = hit.timespan;
            if (col && span) {
                var date = col.data('date');
                var time = span.data('time');
                var start = date.date.add(time);
                var end = start.add(new latte.TimeSpan(0, 0, this._minuteSpan));
                this._draggingSelection = start;
                this.setSelectionRange(start, end);
            }
        }
        /**
         *
         **/
        _daysGridMouseMove(e) {
            if (this._draggingSelection instanceof latte.DateTime) {
                var hit = this._timeSpanHitTest(e.pageX, e.pageY);
                var col = hit.day;
                var span = hit.timespan;
                if (col && span) {
                    var date = col.data('date');
                    var time = span.data('time');
                    var start = this._draggingSelection;
                    var end = date.date.add(time);
                    // Swap check
                    if (end.compareTo(start) < 0) {
                        start = start.addMinutes(this._minuteSpan);
                        var tmp = end;
                        end = start;
                        start = tmp;
                    }
                    else {
                        end = end.addMinutes(this._minuteSpan);
                    }
                    var changed = this._selectionStart.compareTo(start) != 0
                        || this._selectionEnd.compareTo(end) != 0;
                    if (changed) {
                        this.setSelectionRange(start, end);
                    }
                }
            }
        }
        /**
         *
         **/
        _daysGridMouseUp(e) {
            if (this._draggingSelection) {
                this._draggingSelection = null;
            }
        }
        /**
         *
         **/
        _keyDown(e) {
            if (e.keyCode === latte.Key.ENTER) {
                this.createItemAtSelection();
            }
        }
        /**
         *
         **/
        _onAddItem(item) {
            if (item.allDay) {
                item.element.appendTo(this._columnsItems);
                this.onLayout();
            }
            else {
                item.element.appendTo(this._daysItems);
                this.onLayoutItems();
            }
        }
        /**
         * Specifies if the page coordinates are on the headers zone
         **/
        _onHeadersZone(x, y) {
            var sep = this._separator.rectangle();
            var allday = this._columns.rectangle();
            allday.bottom = sep.top;
            return allday.contains(x, y);
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item.rectangles.each(function (r) {
                if (r.tag instanceof jQuery)
                    r.tag.remove();
            });
            item.element.remove();
        }
        /**
         * Returns a collection of rectangles for the specified range
         **/
        _rectanglesFor(start, end) {
            var rects = [], rect = null;
            var days = Math.ceil(end.date.subtractDate(start.date).totalDays) + 1;
            // If is on headers Select header
            if (start.timeOfDay.totalMinutes == 0 && end.timeOfDay.totalMinutes == 0) {
                rect = new latte.Rectangle();
                rects.push(rect);
                // If start is on view
                if (start.onRange(start, end)) {
                    rect.left = (this._dayColumn(start).position().left);
                }
                // Horizontal limits
                if (end.onRange(start, end)) {
                    rect.right = (this._dayColumn(end).rectangle(null, true).right);
                }
                else {
                    rect.right = (this._dayColumn(this._viewEnd).right());
                }
                // Bottom is separator's
                rect.bottom = (this._separator.position().top);
            }
            else {
                var lastspan = this._timeSpans.find('.time-span').last();
                var fullbottom = lastspan.position().top + lastspan.height() + this._daysGrid.scrollTop();
                var starttop = this._heightOf(start.timeOfDay);
                var endbottom = this._heightOf(end.timeOfDay);
                // One rectangle by day
                for (var i = 0; i < days; i++) {
                    rect = new latte.Rectangle();
                    var date = start.date.addDays(i);
                    var dayelem = this._columns.find(latte.sprintf('.day-%s-%s-%s', date.year, date.month, date.day));
                    if (dayelem.length == 0)
                        continue;
                    // Initialize rectangle
                    rect.left = dayelem.position().left + this._timeline.outerWidth();
                    rect.width = dayelem.width();
                    rect.height = fullbottom;
                    // If start is on day
                    if (start.date.compareTo(date) == 0) {
                        rect.top = starttop;
                        rect.bottom = fullbottom;
                    }
                    // If end is on day
                    if (end.date.compareTo(date) == 0) {
                        rect.bottom = (endbottom);
                    }
                    rects.push(rect);
                }
            }
            return rects;
        }
        /**
         *
         **/
        _timeSpanHitTest(x, y) {
            var col = null;
            var row = null;
            // Look for column collision
            this._columns.children().each(function () {
                var $this = $(this);
                var rect = $this.data('rectangle');
                if (rect instanceof latte.Rectangle) {
                    if (x >= rect.left && x <= rect.right) {
                        col = $this;
                    }
                }
            });
            // Look for row collision
            this._timeSpans.find('.time-span').each(function () {
                var $this = $(this);
                var rect = $this.innerRectangle(); //$this.data('rectangle');
                if (rect instanceof latte.Rectangle) {
                    if (y >= rect.top && y <= rect.bottom) {
                        row = $this;
                    }
                }
            });
            return { timespan: row, day: col };
        }
        /**
         *
         **/
        _updateBoard() {
            var i = 0;
            var today = latte.DateTime.today;
            var dayNames = "sunday,monday,tuesday,wednesday,thursday,friday,saturday".split(',');
            var dayCount = this._viewEnd.subtractDate(this._viewStart).totalDays + 1;
            var evenSpan = false;
            var firstSpan = true;
            this._columns.empty();
            this._timeSpans.empty();
            // Create columns
            for (i = 0; i < dayCount; i++) {
                var date = this._viewStart.addDays(i);
                var name = strings[dayNames[date.dayOfWeek]];
                // Create column
                var c = $('<div>').addClass('column').appendTo(this._columns)
                    .addClass('day-' + date.year + '-' + date.month + '-' + date.day)
                    .data('date', date);
                // Create date
                var d = $('<div>').addClass('date').appendTo(c)
                    .text(date.day + ' ' + name);
                // Check if today
                if (date.compareTo(today) == 0) {
                    d.text(date.day + ' ' + name + ' - ' + strings.today);
                    c.addClass('today');
                    if (dayCount == 1)
                        c.addClass('only-day');
                }
            }
            // Create rows
            for (var time = new latte.TimeSpan(); time.totalMinutes < 24 * 60; time = time.add(new latte.TimeSpan(0, 0, this._minuteSpan))) {
                // Create span
                var span = $('<div>').addClass('time-span').appendTo(this._timeSpans)
                    .addClass('time-' + time.hours + '-' + time.minutes)
                    .data('time', time);
                // Mark as hour
                if (time.minutes == 0)
                    span.addClass('hour');
                // Mark as first
                if (firstSpan)
                    span.addClass('first');
                // Add label
                if ((!evenSpan || this._minuteSpan == 60) && !firstSpan) {
                    var hour = time.hours;
                    var pm = hour > 12;
                    var ampm = pm ? 'PM' : 'AM';
                    var minutes = time.minutes == 0 ? ' ' + ampm : ':' + time.minutes;
                    var t = (pm ? hour - 12 : hour) + minutes;
                    span.append($('<div>').addClass('label').text(t));
                }
                // Mark as non-working
                if (!(time.compareTo(this._workDayStart) >= 0 && time.compareTo(this._workDayEnd) < 0)) {
                    span.addClass('non-working');
                }
                evenSpan = !evenSpan;
                firstSpan = false;
            }
        }
        /**
         * Clears the selection
         **/
        clearSelection() {
            // Clear selection
            this.element.find('.selection').remove();
            this._selectionStart = null;
            this._selectionEnd = null;
        }
        /**
         * Creates an item at the selection
         **/
        createItemAtSelection(text = '') {
            if (!this._selectionStart || !this._selectionEnd)
                return null;
            var item = new latte.CalendarItem();
            item.text = text;
            item.element.addClass('item-' + this.items.count);
            item.dateStart = this._selectionStart;
            item.dateEnd = this._selectionEnd;
            this.clearSelection();
            this.items.add(item);
            this.onUserAddItem(item);
            return item;
        }
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            var dayCount = this._columns.children().length;
            var allDayDepth = this._createTopMatrix();
            var allDayItemHeight = this.element.find('.time-span').first().height();
            var allDayHeight = Math.max(55, this._allDayOffset + allDayDepth * allDayItemHeight + this._itemPadding); // This should be computed based on items in all day fields
            /*
             * Update columns width
             */
            var colwidth = Math.floor(this._columns.width() / dayCount);
            var left = 0;
            this._columns.children().each(function () {
                var c = $(this);
                c.width(colwidth);
                c.css('left', left);
                c.data('rectangle', c.innerRectangle());
                left += colwidth;
            });
            /**
             * Update row rectangles
             */
            this._timeSpans.find('.time-span').each(function () {
                var $this = $(this);
                $this.data('rectangle', $this.innerRectangle());
            });
            // Update separator
            this._separator.css('top', allDayHeight);
            // Upate days grid top
            this._daysGrid.css('top', allDayHeight + this._separator.outerHeight());
            // update selection
            if (this._selectionStart && this._selectionEnd)
                this.setSelectionRange(this._selectionStart, this._selectionEnd);
            // Update time indicator
            this._timeIndicator.animate({ 'top': this._heightOf(latte.DateTime.now.timeOfDay) });
            // Layout items
            this.onLayoutItems();
            if (!this._firstScroll && this.element.height() > 0) {
                this._daysGrid.scrollTop(this._heightOf(this._scrollStart) + 1);
                this._firstScroll = true;
            }
        }
        /**
         * Updates layout of items on calendar
         **/
        onLayoutItems() {
            var i = 0;
            var j = 0;
            var padding = this._itemPadding;
            var colw = 0;
            var alldaystart = this._allDayOffset;
            var alldayh = this.element.find('.time-span').first().height();
            // Clear all rectangles
            for (i = 0; i < this.items.count; i++) {
                this.items.item(i).rectangles.clear();
                this.items.item(i).matrixAttributes = [];
            }
            // Create items matrix
            this._createTopMatrix();
            this._createMatrix();
            // Scan items
            for (i = 0; i < this.items.count; i++) {
                var item = this.items.item(i);
                var rects = this._rectanglesFor(item.dateStart, item.dateEnd);
                // Add items rectangles
                for (j = 0; j < rects.length; j++) {
                    var r = rects[j];
                    var att = item.matrixAttributes[j];
                    if (item.allDay) {
                        r.top = alldaystart + item._matrixDepth * alldayh;
                        r.height = alldayh - padding;
                        r.width = r.width - padding;
                    }
                    else {
                        colw = r.width / att.count;
                        r.left = r.left + colw * att.index;
                        r.width = colw * att.wide - padding;
                        r.height = r.height - padding;
                    }
                    item.rectangles.add(r);
                }
            }
            // Update horizontal bounds of items
        }
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item) {
            this.userAddItem.raise(item);
        }
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item) {
            this.userRemoveItem.raise(item);
        }
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged() {
            this.viewRangeChanged.raise();
        }
        /**
         * Returns a value indicating if the selection is on header
         **/
        selectionOnHeader() {
            return this._selectionStart instanceof latte.DateTime &&
                this._selectionEnd instanceof latte.DateTime &&
                this._selectionStart.timeOfDay.totalMinutes == 0 &&
                this._selectionEnd.timeOfDay.totalMinutes == 0;
        }
        /**
         * Sets the current selection range
         **/
        setSelectionRange(start, end) {
            if (!(start instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('start');
            if (!(end instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('end');
            // Swap check
            if (end.compareTo(start) < 0) {
                var tmp = start;
                start = end;
                end = tmp;
            }
            if (start.compareTo(this._viewStart) < 0)
                throw new latte.InvalidArgumentEx('start');
            if (end.compareTo(this._viewEnd.addHours(24)) > 0)
                throw new latte.InvalidArgumentEx('end');
            this.clearSelection();
            // Obtain selection rectangles
            var rects = this._rectanglesFor(start, end);
            // Add selection rectangles
            for (var i = 0; i < rects.length; i++) {
                var selection = $('<div>').addClass('selection');
                selection.rectangle(rects[i]);
                if (start.timeOfDay.totalMinutes == 0 && end.timeOfDay.totalMinutes == 0) {
                    this._columnsGrid.prepend(selection);
                }
                else {
                    this._timeSpans.append(selection);
                }
            }
            this._selectionStart = start;
            this._selectionEnd = end;
        }
        /**
         * Sets the view range of the day view
         **/
        setViewRange(start, end) {
            this._viewStart = start;
            this._viewEnd = end;
            this.clearSelection();
            this._updateBoard();
            this.onLayout();
            this._daysGrid.scrollTop(this._heightOf(this._scrollStart) + 1);
            this.onViewRangeChanged();
        }
        /**
         * Gets the height (or Y coordinate) for the specified time
         **/
        _heightOf(time) {
            var span = this._timeSpanOf(time);
            var diff = null;
            var minutes = 0;
            var extraheight = 0;
            if (span.length == 0)
                return 0;
            diff = time.subtract(span.data('time'));
            minutes = diff.totalMinutes;
            if (minutes > 0) {
                extraheight = Math.round(minutes * span.height() / this._minuteSpan);
            }
            return span.position().top + extraheight + this._daysGrid.scrollTop();
        }
        /**
         * Gets the timespan element index of the specified time
         **/
        _timeSpanIndexOf(time) {
            return Math.floor(time.totalMinutes / this._minuteSpan);
        }
        /**
         * Gets the timespan element of the specified time
         **/
        _timeSpanOf(time) {
            return this._daysGrid.find('.time-span').eq(this._timeSpanIndexOf(time));
        }
        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        get allowItemCreate() {
            return this._allowItemCreate;
        }
        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        set allowItemCreate(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value');
            this._allowItemCreate = value;
        }
        /**
         * Gets the end of view
         **/
        get viewEnd() {
            return this._viewEnd;
        }
        /**
         * Gets the start of view
         **/
        get viewStart() {
            return this._viewStart;
        }
    }
    latte.CalendarDayView = CalendarDayView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows items in calendar arrangement views
     **/
    class CalendarView extends latte.SplitView {
        /**
         * Creates the view
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('calendar');
            // Events
            this.userAddItem = new latte.LatteEvent(this);
            this.userRemoveItem = new latte.LatteEvent(this);
            this.viewRangeChanged = new latte.LatteEvent(this);
            // Init events
            this.selectionChanged = new latte.LatteEvent(this);
            // Init elements
            this._controls = $('<div>').addClass('controls').appendTo(this.element);
            // Init items
            this.dateView = new latte.DateView();
            this.dayView = new latte.CalendarDayView();
            this.monthView = new latte.CalendarMonthView();
            this.titleItem = new latte.LabelItem();
            this.titleItem.title = 1;
            this.buttonPrevious = new latte.ButtonItem();
            this.buttonPrevious.icon = latte.Glyph.left;
            this.buttonNext = new latte.ButtonItem();
            this.buttonNext.icon = latte.Glyph.right;
            this.buttonToday = new latte.ButtonItem();
            this.buttonToday.text = strings.today;
            this.buttonGroup = new latte.ButtonGroupItem();
            // Struct
            this.titleItem.appendTo(this._controls);
            this.buttonGroup.buttons.addArray([this.buttonPrevious, this.buttonToday, this.buttonNext]);
            this.buttonGroup.appendTo(this._controls);
            // Wire handlers
            this.dateView.dateItem.selectionChanged.add(() => { this.onSelectionChanged(); });
            this.dayView.userAddItem.add((i) => { this.onUserAddItem(i); });
            this.dayView.userRemoveItem.add((i) => { this.onUserRemoveItem(i); });
            this.dayView.viewRangeChanged.add(() => { this.onViewRangeChanged(); });
            this.monthView.userAddItem.add((i) => { this.onUserAddItem(i); });
            this.monthView.userRemoveItem.add((i) => { this.onUserRemoveItem(i); });
            this.monthView.viewRangeChanged.add(() => { this.onViewRangeChanged(); });
            this.buttonToday.click.add(() => { this.goToday(); });
            this.buttonPrevious.click.add(() => { this.goPrevious(); });
            this.buttonNext.click.add(() => { this.goNext(); });
            // Init me
            this.side = latte.Side.RIGHT;
            this.sideSize = 250;
            this.view = this.dayView;
            this.sideView = this.dateView;
            this.dateView.dateItem.setSelectionRange(latte.DateTime.today, latte.DateTime.today);
            this.dateView.dateItem.selectionMode = latte.DateSelectionMode.WORKWEEK;
        }
        /**
         * Navigates to the next range of dates, based on the current range
         **/
        goNext() {
            if (this.view === this.monthView) {
                var first = this.monthView.monthOnView.addMonths(1);
                var last = first.addDays(latte.DateTime.daysInMonth(first.year, first.month) - 1);
                this.dateView.dateItem.setSelectionRange(first, last);
            }
            else {
                var start = this.dayView.viewStart, end = this.dayView.viewEnd;
                var days = Math.floor(end.subtractDate(start).totalDays) + 1;
                if (this.dateView.dateItem.selectionMode === latte.DateSelectionMode.WORKWEEK) {
                    start = start.addDays(7);
                    var monday = start.addDays(-start.dayOfWeek + 1);
                    this.dateView.dateItem.setSelectionRange(monday, monday.addDays(4));
                }
                else {
                    this.dateView.dateItem.setSelectionRange(end.addDays(1), end.addDays(days));
                }
            }
        }
        /**
         * Navigates to the previous range of dates, based on the current range
         **/
        goPrevious() {
            if (this.view === this.monthView) {
                var first = this.monthView.monthOnView.addMonths(-1);
                var last = first.addDays(latte.DateTime.daysInMonth(first.year, first.month) - 1);
                this.dateView.dateItem.setSelectionRange(first, last);
            }
            else {
                var start = this.dayView.viewStart, end = this.dayView.viewEnd;
                var days = Math.floor(end.subtractDate(start).totalDays) + 1;
                if (this.dateView.dateItem.selectionMode === latte.DateSelectionMode.WORKWEEK) {
                    start = start.addDays(-7);
                    var monday = start.addDays(-start.dayOfWeek + 1);
                    this.dateView.dateItem.setSelectionRange(monday, monday.addDays(4));
                }
                else {
                    this.dateView.dateItem.setSelectionRange(start.addDays(-days), start.addDays(-1));
                }
            }
        }
        /**
         * Navigates to the today day.
         **/
        goToday() {
            this.dateView.dateItem.selectionMode = latte.DateSelectionMode.DAY;
            this.dateView.dateItem.setSelectionRange(latte.DateTime.today, latte.DateTime.today);
        }
        /**
         * Overriden.
         **/
        onLayout() {
            super.onLayout();
            this.container.css({
                top: '+=50'
            });
            var r = this.container.rectangle(null, true);
            this._controls.css({
                top: r.top - 50,
                left: r.left,
                right: r.right,
                width: r.width
            });
            this.buttonGroup.onLayout();
        }
        /**
         * Raises the <c>selectionChanged</c> event
         **/
        onSelectionChanged() {
            var months = "january,february,march,april,may,june,july,august,september,october,november,december".split(",");
            var start = this.dateView.dateItem.selectionStart;
            var end = this.dateView.dateItem.selectionEnd;
            var days = Math.floor(end.subtractDate(start).totalDays);
            var smonth = start.month, syear = start.year, emonth = end.month, eyear = end.year;
            if (days > 7) {
                if (this.view !== this.monthView) {
                    this.view = this.monthView;
                }
                this.titleItem.text = strings[months[start.month - 1]] + ' ' + start.year + (start.date.equals(latte.DateTime.today) ? ' - ' + strings.today : '');
            }
            else {
                if (this.view !== this.dayView) {
                    this.view = this.dayView;
                }
                if (days === 0) {
                    this.titleItem.text = start.day + ' ' + strings[months[smonth - 1]] + ' ' + syear;
                }
                else {
                    this.titleItem.text = start.day + (smonth !== emonth ? ' ' + strings[months[smonth - 1]] : '') + (syear != eyear ? ' ' + syear : '') + ' - ' +
                        end.day + ' ' + strings[months[emonth - 1]] + ' ' + eyear;
                }
            }
            // Set range of view
            this.view.setViewRange(start, end);
            this.selectionChanged.raise();
        }
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item) {
            this.userAddItem.raise(item);
            //            if(this.view === this.dayView){
            //                this.monthView.items.add();
            //            }
        }
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item) {
            this.userRemoveItem.raise(item);
        }
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged() {
            this.viewRangeChanged.raise();
        }
        /**
         * Gets or sets the working end time of specified week day.
         **/
        workDayEnd(day, value = null) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the working start time of specified week day.
         **/
        workDayStart(day, value = null) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        get allowItemCreate() {
            return this.view.allowItemCreate;
        }
        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        set allowItemCreate(value) {
            this.view.allowItemCreate = value;
        }
        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        get allowItemDrag() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        set allowItemDrag(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        get allowItemEdit() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        set allowItemEdit(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        get allowItemRemove() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        set allowItemRemove(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        get allowItemResize() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        set allowItemResize(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        get dayEnd() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        set dayEnd(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        get dayStart() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        set dayStart(value) {
            throw new latte.Ex();
        }
        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        get editMode() {
            throw new latte.Ex();
        }
        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        set editMode(value) {
            throw new latte.Ex();
        }
        /**
         * Gets the item being edited, if any.
         **/
        get editModeItem() {
            throw new latte.Ex();
        }
        /**
         * Gets the item being edited, if any.
         **/
        set editModeItem(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        get firstDayOfWeek() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        set firstDayOfWeek(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        get navigatorVisible() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        set navigatorVisible(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the selection's start
         **/
        get selectionEnd() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the selection's start
         **/
        set selectionEnd(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the selection mode
         **/
        get selectionMode() {
            return this.dateView.dateItem.selectionMode;
        }
        /**
         * Gets or sets the selection mode
         **/
        set selectionMode(value) {
            this.dateView.dateItem.selectionMode = value;
        }
        /**
         * Gets or sets the selection's start
         **/
        get selectionStart() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the selection's start
         **/
        set selectionStart(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the view's end.
         **/
        get viewEnd() {
            return this.view.viewEnd;
        }
        /**
         * Gets or sets the view's start.
         **/
        get viewStart() {
            return this.view.viewStart;
        }
        /**
         * Gets or sets the work week's end.
         **/
        get workWeekEnd() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the work week's end.
         **/
        set workWeekEnd(value) {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the work week's start.
         **/
        get workWeekStart() {
            throw new latte.Ex();
        }
        /**
         * Gets or sets the work week's start.
         **/
        set workWeekStart(value) {
            throw new latte.Ex();
        }
    }
    latte.CalendarView = CalendarView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a month who show <c>CalendarItem</c>s
     **/
    class CalendarMonthView extends latte.View {
        /**
         * Creates the MonthView
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._itemItemHeight = 25;
            /**
             *
             **/
            this._itemItemTopStart = 20;
            /**
             *
             **/
            this._itemPadding = 4;
            var __this = this;
            // Init
            this.element.addClass('calendar-month');
            this.focusable = true;
            // Events
            this.userAddItem = new latte.LatteEvent(this);
            this.userRemoveItem = new latte.LatteEvent(this);
            this.viewRangeChanged = new latte.LatteEvent(this);
            // Init collection
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            // Init elements
            this._content = $('<div>').addClass('content').appendTo(this.element);
            this._createBoard();
            //this._contentItems = $('<div>').addClass('content-items').appendTo(this._content);
            // Wire handlers
            this.element.keydown(function (e) { this._keyDown(e); });
            this._content.find('.day')
                .mousedown(function (e) { __this._dayMouseDown(e, $(this)); })
                .mouseup(function (e) { __this._dayMouseUp(e, $(this)); })
                .mousemove(function (e) { __this._dayMouseMove(e, $(this)); });
            // Init me
            this.setViewRange(latte.DateTime.today);
        }
        /**
         *
         **/
        _createBoard() {
            for (var row = 0; row < 7; row++) {
                for (var col = 0; col < 7; col++) {
                    this._content.append($('<div>').addClass(latte.sprintf('day day-%s-%s%s%s', row, col, (row == 0 ? ' with-top' : ''), (col == 0 ? ' with-left' : ''))));
                }
            }
        }
        /**
         *
         **/
        _createMatrix() {
            var i, j, item, start, end, startColumn, endColumn, depth, maxdepth = -1;
            var m = [];
            var empty = undefined;
            // Prints the matrix
            var printm = function () {
                var s = '', i, j;
                for (i = 0; i <= maxdepth; i++) {
                    for (j = 0; j < m.length; j++) {
                        s += latte._undef(m[j][i]) ? '.' : m[j][i];
                        s += '\t';
                    }
                    s += '\n';
                }
                latte.log(s);
            };
            // Checks if space available  in the specified depth
            var isAvailable = function (depth, start, end) {
                for (var i = start; i <= end; i++)
                    if (m[i][depth] != empty)
                        return false;
                return true;
            };
            // Adds the index to the specified position in the matrix
            var placeIndex = function (index, depth, start, end) {
                for (var i = start; i <= end; i++)
                    m[i][depth] = index;
            };
            // Initialize matrix
            this.element.find('.day').each(function () { m.push([]); });
            for (i = 0; i < this.items.count; i++) {
                item = this.items.item(i);
                // Get start and end columns
                startColumn = item.dateStart.compareTo(this._viewStart) < 0 ? this.element.find('.day:first') : this._dayElement(item.dateStart);
                endColumn = item.dateEnd.compareTo(this._viewEnd) > 0 ? this.element.find('.day:last') : this._dayElement(item.dateEnd);
                // Add index
                start = startColumn.index();
                end = endColumn.index();
                depth = 0;
                // Run for index
                while (!isAvailable(depth, start, end))
                    depth++;
                // Place index
                placeIndex(i, depth, start, end);
                // Save depth
                item._matrixDepth = depth;
            }
            //printm();
            for (i = 0; i < m.length; i++)
                maxdepth = Math.max(maxdepth, m[i].length);
            return maxdepth;
        }
        /**
         *
         **/
        _dayElement(date) {
            return this.element.find(latte.sprintf('.day-%s-%s-%s', date.year, date.month, date.day));
        }
        /**
         *
         **/
        _dayMouseDown(e, dayElement) {
            var date = dayElement.data('date');
            this._draggingSelection = date;
            this.setSelectionRange(date, date);
        }
        /**
         *
         **/
        _dayMouseMove(e, dayElement) {
            if (this._draggingSelection) {
                var date = dayElement.data('date');
                this.setSelectionRange(this._draggingSelection, date);
            }
        }
        /**
         *
         **/
        _dayMouseUp(e, dayElement) {
            if (this._draggingSelection) {
                this._draggingSelection = null;
            }
        }
        /**
         *
         **/
        _keyDown(e) {
            if (e.keyCode === latte.Key.ENTER) {
                this.createItemAtSelection();
            }
        }
        /**
         *
         **/
        _onAddItem(item) {
            var i;
            //            var __this = this;
            item.appendTo(this._content);
            // React to selection
            item.selectedChanged.add(() => {
                while ((i = this.items.next())) {
                    if (i != item) {
                        i.selected = (false);
                    }
                }
            });
            this.onLayout();
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            var r;
            item.element.remove();
            while ((r = item.rectangles.next())) {
                r._element.remove();
            }
        }
        /**
         *
         **/
        _rectanglesFor(start, end) {
            var rects = [];
            var rect;
            var week = start.addDays(-start.dayOfWeek);
            var weeks = end.weekOfYear - start.weekOfYear + 1;
            for (var i = 0; i < weeks; i++) {
                week = week.addDays(i == 0 ? 0 : 7);
                rect = this._weekRectangle(week);
                if (start.onRange(week, week.addDays(6))) {
                    var r = rect.right;
                    rect.left = this._dayElement(start).rectangle(null, true).left;
                    rect.right = r;
                }
                if (end.onRange(week, week.addDays(6))) {
                    rect.right = this._dayElement(end).rectangle(null, true).right;
                }
                rects.push(rect);
            }
            return rects;
        }
        /**
         *
         **/
        _weekRectangle(date) {
            var start = date.addDays(-date.dayOfWeek);
            var end = start.addDays(6);
            var startRect = this._dayElement(start).rectangle(null, true);
            var endRect = this._dayElement(end).rectangle(null, true);
            return startRect.union(endRect);
        }
        /**
         * Clears the selection
         **/
        clearSelection() {
            this.element.find('.selection').remove();
            this._selectionStart = this._selectionEnd = null;
        }
        /**
         * Creates an item at the selection
         **/
        createItemAtSelection(text = '') {
            if (!this._selectionStart || !this._selectionEnd)
                return null;
            var item = new latte.CalendarItem();
            item.text = text;
            item.element.addClass('item-' + this.items.count);
            item.dateStart = this._selectionStart;
            item.dateEnd = this._selectionEnd;
            this.clearSelection();
            this.items.add(item);
            this.onUserAddItem(item);
            return item;
        }
        /**
         * Overriden. Raises the <c>layout</c> event.
         **/
        onLayout() {
            super.onLayout();
            // Create items matrix
            var depth = this._createMatrix();
            // Width and height of items
            var w = Math.floor(this._content.width() / 7);
            var h = Math.max(Math.floor(this._content.height() / 7), depth * this._itemItemHeight + this._itemItemTopStart);
            // Position calendar squares
            for (var row = 0; row < 7; row++)
                for (var col = 0; col < 7; col++)
                    this.element.find(latte.sprintf('.day-%s-%s', row, col))
                        .css({ left: w * col, top: h * row })
                        .width(w).height(h);
            // Update selection
            if (this._selectionStart && this._selectionEnd)
                this.setSelectionRange(this._selectionStart, this._selectionEnd);
            // Layout items
            this.onLayoutItems();
        }
        /**
         * Extension for setting the layout of items
         **/
        onLayoutItems() {
            var i = 0;
            var j = 0;
            var padding = this._itemPadding;
            var topstart = this._itemItemTopStart;
            var itemh = this._itemItemHeight;
            // Clear all rectangles
            for (i = 0; i < this.items.count; i++) {
                this.items.item(i).rectangles.clear();
                this.items.item(i).matrixAttributes = [];
            }
            // Create items matrix
            this._createMatrix();
            // Scan items
            for (i = 0; i < this.items.count; i++) {
                var item = this.items.item(i);
                var rects = this._rectanglesFor(item.dateStart, item.dateEnd);
                // Add items rectangles
                for (j = 0; j < rects.length; j++) {
                    var r = rects[j];
                    var att = item.matrixAttributes[j];
                    r.top = r.top + topstart + item._matrixDepth * itemh;
                    r.height = itemh - padding;
                    r.width = r.width - padding;
                    item.rectangles.add(r);
                }
            }
        }
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item) {
            this.userAddItem.raise(item);
        }
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item) {
            this.userRemoveItem.raise(item);
        }
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged() {
            this.viewRangeChanged.raise();
        }
        /**
         *
         **/
        setSelectionRange(start, end) {
            if (!(start instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('start');
            if (!(end instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('end');
            // Swap check
            if (end.compareTo(start) < 0) {
                var tmp = start;
                start = end;
                end = tmp;
            }
            if (start.compareTo(this._viewStart) < 0)
                start = this._viewStart;
            if (end.compareTo(this._viewEnd.addHours(24)) > 0)
                end = this._viewEnd;
            this.clearSelection();
            // Obtain selection rectangles
            var rects = this._rectanglesFor(start, end);
            // Add selection rectangles
            for (var i = 0; i < rects.length; i++) {
                var selection = $('<div>').addClass('selection');
                selection.rectangle(rects[i]);
                this._content.prepend(selection);
            }
            this._selectionStart = start;
            this._selectionEnd = end;
        }
        /**
         * Sets the month to show. Only year and month of date will be taken.
         **/
        setViewRange(date) {
            var div, olddate, current;
            var daynames = "sunday,monday,tuesday,wednesday,thursday,friday,saturday".split(',');
            var monthFirst = new latte.DateTime(date.year, date.month, 1);
            var start = monthFirst.addDays(-monthFirst.dayOfWeek);
            var today = latte.DateTime.today;
            this.clearSelection();
            for (var row = 0; row < 7; row++) {
                for (var col = 0; col < 7; col++) {
                    div = this.element.find(latte.sprintf('.day-%s-%s', row, col));
                    olddate = div.data('date');
                    current = start.addDays(row * 7 + col);
                    if (current.month != date.month) {
                        div.addClass('grayed');
                    }
                    else {
                        div.removeClass('grayed');
                    }
                    // Remove old date
                    if (olddate) {
                        div.removeClass(latte.sprintf('day-%s-%s-%s', olddate.year, olddate.month, olddate.day));
                    }
                    // Set date
                    div.data('date', current);
                    // Mark with correspondant date
                    div.addClass(latte.sprintf('day-%s-%s-%s', current.year, current.month, current.day));
                    // Add day number
                    div.empty().append($('<div>').addClass('number').text((row == 0 ? strings[daynames[current.dayOfWeek]] + ' ' : '') + current.day));
                    // Add week number
                    if (col == 0) {
                        div.append($('<div>').addClass('week-number').text(current.weekOfYear));
                    }
                }
            }
            // Remove today
            this.element.find('.day.today').removeClass('today');
            // Add today
            this.element.find(latte.sprintf('.day-%s-%s-%s', today.year, today.month, today.day)).addClass('today');
            this._viewStart = start;
            this._viewEnd = current;
            this._monthOnView = monthFirst;
            this.onViewRangeChanged();
        }
        /**
         * Gets or sets the month on the view
         **/
        get monthOnView() {
            return this._monthOnView;
        }
        /**
         * Gets or sets the month on the view
         **/
        set monthOnView(value) {
            if (value instanceof latte.DateTime)
                this.setViewRange(value);
        }
        /**
         * Gets the end of view
         **/
        get viewEnd() {
            return this._viewEnd;
        }
        /**
         * Gets the start of view
         **/
        get viewStart() {
            return this._viewStart;
        }
    }
    latte.CalendarMonthView = CalendarMonthView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * View for choosing dates or date ranges.

     The <c>DateItem</c> used inside the view adapts its <c>rows</c> and <c>columns</c> to take advantage of the view area.
     **/
    class DateView extends latte.View {
        /**
         * Creates the view
         **/
        constructor() {
            //            var __this = this;
            // Init
            super();
            this.element.addClass('date');
            // Init items
            this.dateItem = new latte.DateItem();
            this.dayButton = new latte.ButtonItem();
            this.dayButton.text = strings.day;
            this.workWeekButton = new latte.ButtonItem();
            this.workWeekButton.text = strings.week;
            this.weekButton = new latte.ButtonItem();
            this.weekButton.text = strings.fullWeek;
            this.monthButton = new latte.ButtonItem();
            this.monthButton.text = strings.month;
            // Initprops
            this.dayButton.faceVisible = false;
            this.weekButton.faceVisible = false;
            this.monthButton.faceVisible = false;
            this.workWeekButton.faceVisible = false;
            this.dayButton.element.css('opacity', .5);
            this.weekButton.element.css('opacity', .5);
            this.monthButton.element.css('opacity', .5);
            this.workWeekButton.element.css('opacity', .5);
            this.weekButton.visible = false;
            // Init struct
            this.dateItem.appendTo(this.container);
            this.dayButton.appendTo(this.element);
            this.weekButton.appendTo(this.element);
            this.workWeekButton.appendTo(this.element);
            this.monthButton.appendTo(this.element);
            // Wire handlers
            this.dateItem.selectionModeChanged.add(() => { this.updateSelectionMode(); });
            this.dayButton.click.add(() => { this.dateItem.selectionMode = latte.DateSelectionMode.DAY; });
            this.weekButton.click.add(() => { this.dateItem.selectionMode = latte.DateSelectionMode.WEEK; });
            this.workWeekButton.click.add(() => { this.dateItem.selectionMode = latte.DateSelectionMode.WORKWEEK; });
            this.monthButton.click.add(() => { this.dateItem.selectionMode = latte.DateSelectionMode.MONTH; });
            this.dayButton.visibleChanged.add(() => { this.onLayout(); });
            this.weekButton.visibleChanged.add(() => { this.onLayout(); });
            this.workWeekButton.visibleChanged.add(() => { this.onLayout(); });
            this.monthButton.visibleChanged.add(() => { this.onLayout(); });
        }
        /**
         * Hides the selection mode buttons
         **/
        hideButtons() {
            this.weekButton.visible = false;
            this.workWeekButton.visible = false;
            this.monthButton.visible = false;
            this.dayButton.visible = false;
        }
        /**
         * Overriden
         **/
        onLayout() {
            super.onLayout();
            this.container.css('bottom', this.dayButton.element.height() + 2);
            var size = this.dateItem.monthSize;
            var cols = Math.floor(this.container.width() / size.width);
            var rows = Math.floor(this.container.height() / size.height);
            var cont = this.container.rectangle();
            cont.top = 0;
            cont.left = 0;
            var elem = this.dateItem.element;
            if (this.dateItem.columns != cols && cols > 0)
                this.dateItem.columns = cols;
            if (this.dateItem.rows != rows && rows > 0)
                this.dateItem.rows = rows;
            if (this.dateItem.table)
                elem.rectangle(this.dateItem.table.rectangle().center(cont));
            this.onLayoutButtons();
        }
        /**
         * Layout of buttons
         **/
        onLayoutButtons() {
            var btns = [];
            if (this.dayButton.visible)
                btns.push(this.dayButton);
            if (this.workWeekButton.visible)
                btns.push(this.workWeekButton);
            if (this.weekButton.visible)
                btns.push(this.weekButton);
            if (this.monthButton.visible)
                btns.push(this.monthButton);
            var w = Math.floor(this.element.width() / btns.length);
            for (var i = 0; i < btns.length; i++)
                // 22 accounts for padding
                btns[i].element.width(w - 22).css('left', w * i);
        }
        /**
         * Shows the selection mode buttons
         **/
        showButtons() {
            this.weekButton.visible = true;
            this.workWeekButton.visible = true;
            this.monthButton.visible = true;
            this.dayButton.visible = true;
        }
        /**
         * Updates the selection mode indicators
         **/
        updateSelectionMode() {
            this.dayButton.checked = (this.dateItem.selectionMode == latte.DateSelectionMode.DAY);
            this.workWeekButton.checked = (this.dateItem.selectionMode == latte.DateSelectionMode.WORKWEEK);
            this.weekButton.checked = (this.dateItem.selectionMode == latte.DateSelectionMode.WEEK);
            this.monthButton.checked = (this.dateItem.selectionMode == latte.DateSelectionMode.MONTH);
        }
    }
    latte.DateView = DateView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a form to iunput data.
     **/
    class FormView extends latte.ColumnView {
        /**
         * Creates a new form, using the specified fields
         and commands
         **/
        constructor(inputs = null) {
            super(1);
            this.addClass('form');
            this.items.add(this.form);
            if (inputs)
                this.inputs.addArray(inputs);
        }
        //region Methods
        /**
         * Checks every input in <c>inputs</c> to be valid
         **/
        valid() {
            return this.form.valid;
        }
        /**
         * Returns an object with the values of fields
         **/
        getValues() {
            return this.form.getValues();
        }
        /**
         * Gets or sets the with of the text parts.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        setTextWidth(value) {
            this.form.setTextWidth(value);
        }
        /**
         * Gets an event raised when a value of the form changes
         *
         * @returns {LatteEvent}
         */
        get valueChanged() {
            if (!this._valueChanged) {
                this._valueChanged = new latte.LatteEvent(this);
            }
            return this._valueChanged;
        }
        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged() {
            if (this._valueChanged) {
                this._valueChanged.raise();
            }
            this.unsavedChanges = true;
        }
        /**
         * Gets the form of the view
         *
         * @returns {FormItem}
         */
        get form() {
            if (!this._form) {
                this._form = new latte.FormItem();
                this._form.valueChanged.add(this.onValueChanged, this);
            }
            return this._form;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        get faceVisible() {
            return this.form.faceVisible;
        }
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        set faceVisible(value) {
            this.form.faceVisible = value;
        }
        /**
         * Gets the inputs of the form
         *
         * @returns {Collection<InputItem>}
         */
        get inputs() {
            return this.form.inputs;
        }
        /**
         * Gets a value indicating if the values in the form are valid
         *
         * @returns {boolean}
         */
        get isValid() {
            return this.form.isValid;
        }
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        get readOnly() {
            return this.form.readOnly;
        }
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        set readOnly(value) {
            this.form.readOnly = value;
        }
        /**
         * Gets or sets the title of the form
         **/
        get title() {
            return this.form.title;
        }
        /**
         * Gets or sets the title of the form
         **/
        set title(value) {
            this.form.title = value;
        }
        /**
         * Gets the title label of the form
         *
         * @returns {LabelItem}
         */
        get titleLabel() {
            return this.form.titleLabel;
        }
    }
    latte.FormView = FormView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Provides a view that contains just HTML
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;an&nbsp;HTML&nbsp;view&nbsp;as&nbsp;modal&nbsp;dialog<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">View</span><span style="color: #007700">.</span><span style="color: #0000BB">modalView</span><span style="color: #007700">(new&nbsp;</span><span style="color: #0000BB">HtmlView</span><span style="color: #007700">(</span><span style="color: #DD0000">"&lt;p&gt;Hello&nbsp;World&lt;/p&gt;"</span><span style="color: #007700">));<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    class HtmlView extends latte.View {
        /**
         * Creates the view with HTML or jQuery elements
         **/
        constructor(html) {
            super();
            this.element.addClass('html');
            if (html instanceof jQuery)
                this.append(html);
            else if (typeof html == 'string')
                this.html = html;
        }
        /**
         * Appends elements to the HTML view DOM
         **/
        append(element) {
            this.container.append(element);
        }
        /**
         * Gets or sets the html of the view
         **/
        get html() {
            return this.container.html();
        }
        /**
         * Gets or sets the html of the view
         **/
        set html(value) {
            this.container.html(value);
        }
    }
    latte.HtmlView = HtmlView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * A View containing an Item
     **/
    class ItemView extends latte.View {
        /**
         *
         **/
        constructor(item = null) {
            super();
            this.element.addClass('item');
            if (item)
                this.item = item;
        }
        /**
         * Overriden.
         **/
        onLayout() {
            super.onLayout();
            if (this.item)
                this.item.onLayout();
        }
        /**
         * Gets or sets the item of the view
         **/
        get item() {
            return this._item;
        }
        /**
         * Gets or sets the item of the view
         **/
        set item(value) {
            this._item = value;
            this.container.empty().append(value.element);
        }
    }
    latte.ItemView = ItemView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a message with eye sugar to improve usability and design.
     **/
    class MessageView extends latte.View {
        /**
         * Creates the message view
         **/
        constructor() {
            super();
            this.element.addClass('message');
            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.messageElement = $('<div>').addClass('message').appendTo(this.element);
            this.descriptionElement = $('<div>').addClass('description').appendTo(this.element);
            this.container.detach().appendTo(this.element);
        }
        /**
         * Sets the icon as the default "alert" icon
         **/
        iconAlert() {
            var icon = latte.IconItem.standard(4, 8);
            icon.size = 32;
            this.icon = icon;
            return this;
        }
        /**
         * Sets the icon as the default "error" icon
         **/
        iconError() {
            var icon = latte.IconItem.standard(5, 8);
            icon.size = 32;
            this.icon = icon;
            return this;
        }
        /**
         * Sets the icon as the default "info" icon
         **/
        iconInfo() {
            var icon = latte.IconItem.standard(5, 7);
            icon.size = 32;
            this.icon = icon;
            return this;
        }
        /**
         * Sets the icon as the default "alert" icon
         **/
        iconQuestion() {
            var icon = latte.IconItem.standard(4, 9);
            icon.size = 32;
            this.icon = icon;
            return this;
        }
        //region Properties
        /**
         * Gets or sets the description of the message
         **/
        get description() {
            return this.descriptionElement.html();
        }
        /**
         * Gets or sets the description of the message
         **/
        set description(value) {
            this.descriptionElement.html(value);
        }
        /**
         * Gets or sets the icon of the message
         **/
        get icon() {
            return this._icon;
        }
        /**
         * Gets or sets the icon of the message
         **/
        set icon(value) {
            this._icon = value;
            this.iconElement.empty();
            if (value instanceof latte.IconItem)
                this.iconElement.append(value.element);
        }
        /**
         * Gets or sets the message
         **/
        get message() {
            return this.messageElement.html();
        }
        /**
         * Gets or sets the message
         **/
        set message(value) {
            this.messageElement.html(value);
        }
    }
    latte.MessageView = MessageView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * A view with an editable text box
     **/
    class TextView extends latte.View {
        /**
         * Creates the TextView
         **/
        constructor() {
            super();
            this.element.addClass('text');
            this.textElement = $('<textarea>').appendTo(this.container);
        }
        /**
         * Gets or sets the text of the view
         **/
        get text() {
            return this.textElement.val();
        }
        /**
         * Gets or sets the text of the view
         **/
        set text(value) {
            this.textElement.val(value);
        }
    }
    latte.TextView = TextView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/8/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ProgressDialogView extends latte.DialogView {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            this.columnView.items.addArray([this.label, this.progress]);
            this.view = this.columnView;
        }
        /**
         * Updates the progress of the dialog
         * @param value
         * @param status
         * @param max
         * @param min
         */
        updateProgress(value, status = null, max = -1, min = -1) {
            this.progress.value = value;
            if (status)
                this.label.text = status;
            if (min >= 0)
                this.progress.minValue = min;
            if (max >= 0)
                this.progress.maxValue = max;
        }
        /**
         * Gets the column view
         *
         * @returns {ColumnView}
         */
        get columnView() {
            if (!this._columnView) {
                this._columnView = new latte.ColumnView(1);
            }
            return this._columnView;
        }
        /**
         * Gets the label of the dialog
         *
         * @returns {LabelItem}
         */
        get label() {
            if (!this._label) {
                this._label = new latte.LabelItem();
            }
            return this._label;
        }
        /**
         * Gets the progress item
         *
         * @returns {ProgressItem}
         */
        get progress() {
            if (!this._progress) {
                this._progress = new latte.ProgressItem();
            }
            return this._progress;
        }
    }
    latte.ProgressDialogView = ProgressDialogView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a list with columns
     **/
    class ListView extends latte.View {
        /**
         * Creates the ListView
         **/
        constructor() {
            // Init
            super();
            this.element.addClass('list');
            // Init collections
            this.items = new latte.Collection(this._onAddItem, this._onRemoveItem, this);
            this.columnHeaders = new latte.Collection(this._onAddColumn, this._onRemoveColumn, this);
            // Init elements
            this.columnHeadersElement = $('<div>').addClass('column-headers').appendTo(this.element);
            // Icon spacer for columns
            this.columnHeadersElement.append($('<div>').addClass('spacer'));
            // Test
            var lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac urna ac est ultrices adipiscing. Nulla eros justo, tristique venenatis ultricies et, congue ut orci. Donec vitae augue eros, nec pretium velit. Cras id nisl a sapien elementum mollis. Aenean augue turpis, sodales accumsan porttitor ut, sagittis quis massa. Etiam consequat, lectus ut tempor dapibus, dui lorem pharetra tellus, a luctus nunc tortor non nibh. Aliquam eros nisl, porta et consequat eleifend, rhoncus vel justo. Aliquam vel diam sit amet arcu suscipit aliquet. Morbi sed metus ut lectus condimentum interdum. Duis eu orci vel mauris luctus interdum. Proin sem lacus, dictum eget vehicula in, tempus ac felis. Mauris vitae purus nibh, et malesuada urna. Sed sit amet nunc leo, et vehicula dui.".split(' ');
            var word = function () { return lipsum[Math.round(Math.random() * (lipsum.length - 1))]; };
            var words = function () { var r = ''; for (var i = 0; i < Math.random() * 8; i++)
                r += word() + ' '; return r; };
            this.element.get(0).addEventListener('keydown', (e) => {
                if (e.keyCode == latte.Key.ARROW_DOWN || e.keyCode == latte.Key.ARROW_LEFT) {
                    this.selectNextItem();
                }
                else if (e.keyCode == latte.Key.ARROW_UP || e.keyCode == latte.Key.ARROW_RIGHT) {
                    this.selectPreviousItem();
                }
            });
        }
        //region Methods
        selectNextItem() {
            let index = this.selectedItem ? this.items.indexOf(this.selectedItem) : -1;
            index++;
            if (index >= this.items.length) {
                return;
            }
            if (index >= 0) {
                latte.log(index);
                this.items[index].selected = true;
            }
        }
        selectPreviousItem() {
            let index = this.selectedItem ? this.items.indexOf(this.selectedItem) : -1;
            index--;
            if (index < 0) {
                return;
            }
            if (index < this.items.length) {
                this.items[index].selected = true;
            }
        }
        /**
         *
         **/
        informSelectedItem(item) {
            // log("Informed!")
            var changed = item !== this._selectedItem;
            this._selectedItem = item;
            // log("Selected item set")
            if (changed) {
                this.onSelectedItemChanged();
            }
        }
        /**
         *
         **/
        _itemSelected(item) {
            for (var i = 0; i < this.items.count; i++) {
                if (this.items.item(i) !== item) {
                    this.items.item(i).selected = false;
                }
            }
        }
        /**
         *
         **/
        _onAddColumn(column) {
            this.columnHeadersElement.append(column.element);
            // Add column to existing items
            for (var i = 0; i < this.items.count; i++) {
                this.items.item(i).addColumn(column.width);
            }
            let index = this.columnHeaders.length - 1;
            // Handle width change
            column.widthChanged.add(() => this.updateWidthOfColumn(index, column));
            column.autoResize.add(() => this.autoSizeColumn(index));
            column.autoResizeAll.add(() => this.autoSizeAllColumns());
            column.sortRequested.add(() => this.sortByColumn(index));
            this.onLayout();
        }
        /**
         *
         **/
        _onAddItem(item) {
            var __this = this;
            this.container.append(item.element);
            item.selectedChanged.add(function () { if (this.selected)
                __this._itemSelected(this); });
            // Add existing columns
            for (var i = 0; i < this.columnHeaders.count; i++) {
                item.addColumn(this.columnHeaders.item(i).width);
            }
            item.onLayout();
        }
        /**
         *
         **/
        _onRemoveColumn(column) {
            column.element.detach();
            this.onLayout();
        }
        /**
         *
         **/
        _onRemoveItem(item) {
            item.element.detach();
        }
        /**
         * Auto sizes all columns
         */
        autoSizeAllColumns() {
            for (let i = 0; i < this.columnHeaders.length; i++) {
                this.autoSizeColumn(i);
            }
        }
        /**
         * Auto sizes the specified column
         * @param index
         */
        autoSizeColumn(index) {
            let max = 50;
            // Collect maximum
            this.items.each((item) => max = Math.max(max, item.getItem(index).element.width()));
            this.columnHeaders[index].width = max + 20; // 20 because of gradient transparency
        }
        updateWidthOfColumn(index, column) {
            this.items.each((item) => item.setColumnWidth(index, column.width));
            this.onLayout();
        }
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout() {
            super.onLayout();
            if (this.element.parent().length == 0)
                return;
            var i = 0;
            if (this.columnHeadersVisible) {
                if (this.columnHeaders.count > 0) {
                    var maxHeight = 23;
                    var widthSum = 36; /*HACK: Extracted from CSS*/
                    for (i = 0; i < this.columnHeaders.count; i++) {
                        maxHeight = Math.max(maxHeight, this.columnHeaders.item(i).element.outerHeight());
                        widthSum += this.columnHeaders.item(i).width;
                    }
                    this.columnHeadersElement.height(maxHeight);
                    this.columnHeadersElement.css('min-width', widthSum);
                    this.container.css('top', maxHeight);
                    this.container.css('min-width', widthSum);
                    this._columnHeadersWidth = widthSum;
                }
            }
            else {
                this.container.css('top', 0);
            }
            for (i = 0; i < this.items.count; i++)
                this.items.item(i).onLayout();
        }
        /**
         * Sorts by the specified column
         * @param index
         */
        sortByColumn(index) {
            //TODO: Implement this
        }
        //endregion
        //region Events
        //endregion
        //region Properties
        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        get columnHeadersVisible() {
            return this.columnHeadersElement.is(':visible');
        }
        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        set columnHeadersVisible(value) {
            if (!latte._isBoolean(value))
                throw new latte.InvalidArgumentEx('value');
            if (value)
                this.columnHeadersElement.show();
            else
                this.columnHeadersElement.hide();
        }
        /**
         * Gets the width of column headers zone
         *
         * @returns {number}
         */
        get columnHeadersWidth() {
            return this._columnHeadersWidth;
        }
        /**
         * Gets or sets the selected item of the list
         *
         * @returns {ListViewItem}
         */
        get selectedItem() {
            return this._selectedItem;
        }
        /**
         * Gets or sets the selected item of the list
         *
         * @param {ListViewItem} value
         */
        set selectedItem(value) {
            // Check if value changed
            var changed = value !== this._selectedItem;
            // Set value
            this._selectedItem = value;
            // Trigger changed event
            if (changed) {
                this.onSelectedItemChanged();
            }
        }
        /**
         * Gets an event raised when the value of the selectedItem property changes
         *
         * @returns {LatteEvent}
         */
        get selectedItemChanged() {
            if (!this._selectedItemChanged) {
                this._selectedItemChanged = new latte.LatteEvent(this);
            }
            return this._selectedItemChanged;
        }
        /**
         * Raises the <c>selectedItem</c> event
         */
        onSelectedItemChanged() {
            if (this._selectedItemChanged) {
                this._selectedItemChanged.raise();
            }
        }
    }
    latte.ListView = ListView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class NavigationListView extends latte.NavigationView {
        /**
         *
         **/
        constructor() {
            super();
            this.addClass('list');
            // Initialize view
            var t = new latte.ToolbarView();
            this.view = t;
            // Get toolbar pointer
            this.toolbar = t.toolbar;
            // Assign list view as main view of toolbar view
            this.view.view = this.list = new latte.ListView();
        }
    }
    latte.NavigationListView = NavigationListView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Renders a view that contains only TreeItems
     **/
    class TreeView extends latte.View {
        /**
         * Creates the item
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._navigatingPath = [];
            this.element.addClass('tree');
            latte.UiElement.disableTextSelection(this.element);
            this.itemSelected = new latte.LatteEvent(this);
            this.itemItemsLoaded = new latte.LatteEvent(this);
            this.items = new latte.Collection(this.onAddItem, this.onRemoveItem, this);
        }
        /**
         *
         **/
        informSelectedItem(item) {
            if (!(item instanceof latte.TreeItem))
                throw new latte.InvalidArgumentEx('item');
            this._selectedItem = item;
            this.onItemSelected(item);
        }
        /**
         * Advances in the navigation to a specific node path
         **/
        _navigateToSection(items, index) {
            if (index >= this._navigatingPath.length) {
                this._navigating = false;
                return;
            }
            this._navigatingCurrent = index;
            // Find node in items
            for (var i = 0; i < items.count; i++) {
                // Item found
                if (items[i].text == this._navigatingPath[index]) {
                    // If doesn't have items and it may, we must wait.
                    var mustWait = items.item(i).items.count == 0 && items.item(i).hasItems;
                    // If not expanded
                    if (!items[i].expanded) {
                        // Expand
                        items[i].expanded = (true);
                    }
                    if (!mustWait) {
                        // Immediately navigate to next section
                        this._navigateToSection(items[i].items, index + 1);
                    }
                    // If its the last node
                    if (index == this._navigatingPath.length - 1) {
                        // Select it
                        this._navigating = false;
                        items.item(i).selected = true;
                        items.item(i).onClick();
                    }
                }
            }
        }
        /**
         *
         **/
        onAddItem(item) {
            item.appendTo(this.container);
            item._updateGlyph();
        }
        /**
         *
         **/
        onRemoveItem(item) {
            item.element.detach();
        }
        /**
         * Goes to the specified path. Path is an array with names of nodes to visit.
         The path is in the format of the path found in <c>latte.Navigation.path</c>
         **/
        navigateToPath(path) {
            // Select first node
            this._navigating = true;
            this._navigatingCurrent = 0;
            this._navigatingPath = path;
            this._navigateToSection(this.items, 0);
        }
        /**
         * Raises the <c>itemItemsLoaded</c> event
         **/
        onItemItemsLoaded(item) {
            if (!(item instanceof latte.TreeItem))
                throw new latte.InvalidArgumentEx('item');
            if (this._navigating)
                this._navigateToSection(item.items, this._navigatingCurrent + 1);
            this.itemItemsLoaded.raise(item);
        }
        /**
         * Raises the <c>itemSelected</c> event
         **/
        onItemSelected(item) {
            if (!(item instanceof latte.TreeItem))
                throw new latte.InvalidArgumentEx('item');
            this.itemSelected.raise(item);
        }
        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        get addItem() {
            if (!this._addItem) {
                this._addItem = new latte.LatteEvent(this);
            }
            return this._addItem;
        }
        /**
         * Gets or sets the default glyph for collapse
         **/
        get defaultGlyphCollapse() {
            return this._defaultGlyphCollapse;
        }
        /**
         * Gets or sets the default glyph for collapse
         **/
        set defaultGlyphCollapse(value) {
            this._defaultGlyphCollapse = value;
        }
        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        get defaultGlyphCollapseSelected() {
            return this._defaultGlyphCollapseSelected;
        }
        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        set defaultGlyphCollapseSelected(value) {
            this._defaultGlyphCollapseSelected = value;
        }
        /**
         * Gets or sets the default glyph for expand
         **/
        get defaultGlyphExpand() {
            return this._defaultGlyphExpand;
        }
        /**
         * Gets or sets the default glyph for expand
         **/
        set defaultGlyphExpand(value) {
            this._defaultGlyphExpand = value;
        }
        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        get defaultGlyphExpandSelected() {
            return this._defaultGlyphExpandSelected;
        }
        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        set defaultGlyphExpandSelected(value) {
            this._defaultGlyphExpandSelected = value;
        }
        /**
         * Gets a value indicating if the tree view is currently in the process
         of navigating to a specific node.
         **/
        get navigating() {
            return this._navigating;
        }
        /**
         * Gets the current navigation path as a string
         **/
        get path() {
            if (this.selectedItem instanceof latte.TreeItem) {
                return this.selectedItem.path;
            }
            return "/";
        }
        /**
         * Gets or sets the item who is selected on the tree
         **/
        get selectedItem() {
            return this._selectedItem;
        }
        /**
         * Gets or sets the item who is selected on the tree
         **/
        set selectedItem(item) {
            item.selected = true;
        }
        /**
         * Gets an event raised when an item is removed from tree
         *
         * @returns {LatteEvent}
         */
        get removeItem() {
            if (!this._removeItem) {
                this._removeItem = new latte.LatteEvent(this);
            }
            return this._removeItem;
        }
    }
    latte.TreeView = TreeView;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/support/ts-include/jquery.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/support/ts-include/latte.ui.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/DateSelectionMode.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/jQuery.functions.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/Direction.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/Side.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/Transition.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/UiElement.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/Item.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/View.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/ValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/Overlay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/ItemStack.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/selectables/SelectableItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/anchor/AnchorView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/layout/SplitView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/IconItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/clickables/ClickableItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/labels/LabelItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/clickables/ButtonGroupItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/clickables/ButtonItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/Toolbar.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/selectables/SelectableLabel.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/StackOverlay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/layout/ColumnView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/layout/DialogView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/navigation/NavigationView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/Action.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/Navigation.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/ZIndex.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/ColorIconItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/Glyph.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/ImageItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/base/SeparatorItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/clickables/PaginationItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/clickables/TabItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/ColorPicker.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/ConversationItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/DateItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/FormItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/SelectableStack.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/Ribbon.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/TabContainer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/TabToolbar.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/ViewItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/composites/WidgetItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/labels/ColumnHeader.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/labels/DateTimeLabel.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/labels/CommentItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/selectables/CalendarItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/selectables/ListViewItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/labels/UiText.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/selectables/TreeItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/CheckboxItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/ColorValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/ComboItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/FileValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/FlagsValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/DatePickerItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/HtmlEditorCommands.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/HtmlEditorItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/ProgressItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/InputItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/LabelValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/RadioGroup.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/RadioItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/SwitchItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/TimePickerItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/items/values/TextboxItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/ItemOverlay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/Loader.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/MenuOverlay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/overlays/SuggestionOverlay.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/anchor/RibbonView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/anchor/TabView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/anchor/ToolbarView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/CalendarDayView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/CalendarView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/CalendarMonthView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/DateView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/FormView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/HtmlView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/ItemView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/MessageView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/content/TextView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/layout/ProgressDialogView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/navigation/ListView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/navigation/NavigationListView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.ui/ts/latte.ui/views/navigation/TreeView.ts" /> 
