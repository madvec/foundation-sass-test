var latte;
(function (latte) {
    class settingBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'Setting';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idsetting = null;
            /**
             * Database field: int(11)
             */
            this._idowner = null;
            /**
             * Database field: varchar(50)
             */
            this._owner = null;
            /**
             * Database field: varchar(255)
             */
            this._name = null;
            /**
             * Database field: longtext
             */
            this._value = null;
        }
        /**
         * Gets or sets the value of the idsetting field of type int(11)
         */
        get idsetting() {
            return this._idsetting;
        }
        /**
         * Gets or sets the value of the idsetting field of type int(11)
         */
        set idsetting(value) {
            var changed = value !== this._idsetting;
            this._idsetting = value;
            if (changed) {
                this.onIdsettingChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idsetting property changes
         */
        get idsettingChanged() {
            if (!this._idsettingChanged) {
                this._idsettingChanged = new latte.LatteEvent(this);
            }
            return this._idsettingChanged;
        }
        /**
         * Raises the <c>idsettingChanged</c> event
         */
        onIdsettingChanged() {
            if (this._idsettingChanged) {
                this._idsettingChanged.raise();
            }
            this.onFieldValueChanged('idsetting', this.idsetting);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idsetting'; }
        /**
         * Gets or sets the value of the idowner field of type int(11)
         */
        get idowner() {
            return this._idowner;
        }
        /**
         * Gets or sets the value of the idowner field of type int(11)
         */
        set idowner(value) {
            var changed = value !== this._idowner;
            this._idowner = value;
            if (changed) {
                this.onIdownerChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idowner property changes
         */
        get idownerChanged() {
            if (!this._idownerChanged) {
                this._idownerChanged = new latte.LatteEvent(this);
            }
            return this._idownerChanged;
        }
        /**
         * Raises the <c>idownerChanged</c> event
         */
        onIdownerChanged() {
            if (this._idownerChanged) {
                this._idownerChanged.raise();
            }
            this.onFieldValueChanged('idowner', this.idowner);
        }
        /**
         * Gets or sets the value of the owner field of type varchar(50)
         */
        get owner() {
            return this._owner;
        }
        /**
         * Gets or sets the value of the owner field of type varchar(50)
         */
        set owner(value) {
            var changed = value !== this._owner;
            this._owner = value;
            if (changed) {
                this.onOwnerChanged();
            }
        }
        /**
         * Gets an event raised when the value of the owner property changes
         */
        get ownerChanged() {
            if (!this._ownerChanged) {
                this._ownerChanged = new latte.LatteEvent(this);
            }
            return this._ownerChanged;
        }
        /**
         * Raises the <c>ownerChanged</c> event
         */
        onOwnerChanged() {
            if (this._ownerChanged) {
                this._ownerChanged.raise();
            }
            this.onFieldValueChanged('owner', this.owner);
        }
        /**
         * Gets or sets the value of the name field of type varchar(255)
         */
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the value of the name field of type varchar(255)
         */
        set name(value) {
            var changed = value !== this._name;
            this._name = value;
            if (changed) {
                this.onNameChanged();
            }
        }
        /**
         * Gets an event raised when the value of the name property changes
         */
        get nameChanged() {
            if (!this._nameChanged) {
                this._nameChanged = new latte.LatteEvent(this);
            }
            return this._nameChanged;
        }
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged() {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        }
        /**
         * Gets or sets the value of the value field of type longtext
         */
        get value() {
            return this._value;
        }
        /**
         * Gets or sets the value of the value field of type longtext
         */
        set value(value) {
            var changed = value !== this._value;
            this._value = value;
            if (changed) {
                this.onValueChanged();
            }
        }
        /**
         * Gets an event raised when the value of the value property changes
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
            this.onFieldValueChanged('value', this.value);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idsetting': this.idsetting, 'idowner': this.idowner, 'owner': this.owner, 'name': this.name, 'value': this.value }; }
        /*
         * Remote Method.
 Gets the global settings of the app


         */
        static getGlobal(name) {
            return new latte.RemoteCall('fragment', 'Setting', 'getGlobal', { name: name });
        }
        /*
         * Remote Method.
 Gets the global settings of the app


         */
        static getGlobals() {
            return new latte.RemoteCall('fragment', 'Setting', 'getGlobals', {});
        }
        /*
         * Remote Method.
 Gets the global setting by name. Only for root users

         */
        static getGlobalByName(name) {
            return new latte.RemoteCall('fragment', 'Setting', 'getGlobalByName', { name: name });
        }
        /*
         * Remote Method.

         */
        static getGlobalConfigurableSettings() {
            return new latte.RemoteCall('fragment', 'Setting', 'getGlobalConfigurableSettings', {});
        }
    }
    /**
    * Declares the native types of the record.
    **/
    settingBase.nativeTypes = { "idsetting": "int(11)", "idowner": "int(11)", "owner": "varchar(50)", "name": "varchar(255)", "value": "longtext" };
    latte.settingBase = settingBase;
    class pageBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'Page';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idpage = null;
            /**
             * Database field: int(11)
             */
            this._idparent = null;
            /**
             * Database field: int(11)
             */
            this._idgroup = null;
            /**
             * Database field: int(11)
             */
            this._iduser = null;
            /**
             * Database field: varchar(50)
             */
            this._guid = null;
            /**
             * Database field: varchar(200)
             */
            this._key = null;
            /**
             * Database field: int(1)
             */
            this._trash = null;
            /**
             * Database field: int(1)
             */
            this._online = null;
            /**
             * Database field: varchar(20)
             */
            this._template = null;
            /**
             * Database field: datetime
             */
            this._created = null;
            /**
             * Database field: datetime
             */
            this._modified = null;
            /**
             * Database field: varchar(128)
             */
            this._title = null;
            /**
             * Database field: varchar(255)
             */
            this._description = null;
            /**
             * Database field: int(11)
             */
            this._order = null;
            /**
             * Database field: varchar(20)
             */
            this._sort = null;
            /**
             * Database field: int(11)
             */
            this._powner = null;
            /**
             * Database field: int(11)
             */
            this._pgroup = null;
            /**
             * Database field: int(11)
             */
            this._pother = null;
            /**
             * Database field: int(11)
             */
            this._pworld = null;
            /**
             * Database field: int(11)
             */
            this._flags = null;
        }
        /**
         * Gets or sets the value of the idpage field of type int(11)
         */
        get idpage() {
            return this._idpage;
        }
        /**
         * Gets or sets the value of the idpage field of type int(11)
         */
        set idpage(value) {
            var changed = value !== this._idpage;
            this._idpage = value;
            if (changed) {
                this.onIdpageChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idpage property changes
         */
        get idpageChanged() {
            if (!this._idpageChanged) {
                this._idpageChanged = new latte.LatteEvent(this);
            }
            return this._idpageChanged;
        }
        /**
         * Raises the <c>idpageChanged</c> event
         */
        onIdpageChanged() {
            if (this._idpageChanged) {
                this._idpageChanged.raise();
            }
            this.onFieldValueChanged('idpage', this.idpage);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idpage'; }
        /**
         * Gets or sets the value of the idparent field of type int(11)
         */
        get idparent() {
            return this._idparent;
        }
        /**
         * Gets or sets the value of the idparent field of type int(11)
         */
        set idparent(value) {
            var changed = value !== this._idparent;
            this._idparent = value;
            if (changed) {
                this.onIdparentChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idparent property changes
         */
        get idparentChanged() {
            if (!this._idparentChanged) {
                this._idparentChanged = new latte.LatteEvent(this);
            }
            return this._idparentChanged;
        }
        /**
         * Raises the <c>idparentChanged</c> event
         */
        onIdparentChanged() {
            if (this._idparentChanged) {
                this._idparentChanged.raise();
            }
            this.onFieldValueChanged('idparent', this.idparent);
        }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        get idgroup() {
            return this._idgroup;
        }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        set idgroup(value) {
            var changed = value !== this._idgroup;
            this._idgroup = value;
            if (changed) {
                this.onIdgroupChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idgroup property changes
         */
        get idgroupChanged() {
            if (!this._idgroupChanged) {
                this._idgroupChanged = new latte.LatteEvent(this);
            }
            return this._idgroupChanged;
        }
        /**
         * Raises the <c>idgroupChanged</c> event
         */
        onIdgroupChanged() {
            if (this._idgroupChanged) {
                this._idgroupChanged.raise();
            }
            this.onFieldValueChanged('idgroup', this.idgroup);
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        get iduser() {
            return this._iduser;
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        set iduser(value) {
            var changed = value !== this._iduser;
            this._iduser = value;
            if (changed) {
                this.onIduserChanged();
            }
        }
        /**
         * Gets an event raised when the value of the iduser property changes
         */
        get iduserChanged() {
            if (!this._iduserChanged) {
                this._iduserChanged = new latte.LatteEvent(this);
            }
            return this._iduserChanged;
        }
        /**
         * Raises the <c>iduserChanged</c> event
         */
        onIduserChanged() {
            if (this._iduserChanged) {
                this._iduserChanged.raise();
            }
            this.onFieldValueChanged('iduser', this.iduser);
        }
        /**
         * Gets or sets the value of the guid field of type varchar(50)
         */
        get guid() {
            return this._guid;
        }
        /**
         * Gets or sets the value of the guid field of type varchar(50)
         */
        set guid(value) {
            var changed = value !== this._guid;
            this._guid = value;
            if (changed) {
                this.onGuidChanged();
            }
        }
        /**
         * Gets an event raised when the value of the guid property changes
         */
        get guidChanged() {
            if (!this._guidChanged) {
                this._guidChanged = new latte.LatteEvent(this);
            }
            return this._guidChanged;
        }
        /**
         * Raises the <c>guidChanged</c> event
         */
        onGuidChanged() {
            if (this._guidChanged) {
                this._guidChanged.raise();
            }
            this.onFieldValueChanged('guid', this.guid);
        }
        /**
         * Gets or sets the value of the key field of type varchar(200)
         */
        get key() {
            return this._key;
        }
        /**
         * Gets or sets the value of the key field of type varchar(200)
         */
        set key(value) {
            var changed = value !== this._key;
            this._key = value;
            if (changed) {
                this.onKeyChanged();
            }
        }
        /**
         * Gets an event raised when the value of the key property changes
         */
        get keyChanged() {
            if (!this._keyChanged) {
                this._keyChanged = new latte.LatteEvent(this);
            }
            return this._keyChanged;
        }
        /**
         * Raises the <c>keyChanged</c> event
         */
        onKeyChanged() {
            if (this._keyChanged) {
                this._keyChanged.raise();
            }
            this.onFieldValueChanged('key', this.key);
        }
        /**
         * Gets or sets the value of the trash field of type int(1)
         */
        get trash() {
            return this._trash;
        }
        /**
         * Gets or sets the value of the trash field of type int(1)
         */
        set trash(value) {
            var changed = value !== this._trash;
            this._trash = value;
            if (changed) {
                this.onTrashChanged();
            }
        }
        /**
         * Gets an event raised when the value of the trash property changes
         */
        get trashChanged() {
            if (!this._trashChanged) {
                this._trashChanged = new latte.LatteEvent(this);
            }
            return this._trashChanged;
        }
        /**
         * Raises the <c>trashChanged</c> event
         */
        onTrashChanged() {
            if (this._trashChanged) {
                this._trashChanged.raise();
            }
            this.onFieldValueChanged('trash', this.trash);
        }
        /**
         * Gets or sets the value of the online field of type int(1)
         */
        get online() {
            return this._online;
        }
        /**
         * Gets or sets the value of the online field of type int(1)
         */
        set online(value) {
            var changed = value !== this._online;
            this._online = value;
            if (changed) {
                this.onOnlineChanged();
            }
        }
        /**
         * Gets an event raised when the value of the online property changes
         */
        get onlineChanged() {
            if (!this._onlineChanged) {
                this._onlineChanged = new latte.LatteEvent(this);
            }
            return this._onlineChanged;
        }
        /**
         * Raises the <c>onlineChanged</c> event
         */
        onOnlineChanged() {
            if (this._onlineChanged) {
                this._onlineChanged.raise();
            }
            this.onFieldValueChanged('online', this.online);
        }
        /**
         * Gets or sets the value of the template field of type varchar(20)
         */
        get template() {
            return this._template;
        }
        /**
         * Gets or sets the value of the template field of type varchar(20)
         */
        set template(value) {
            var changed = value !== this._template;
            this._template = value;
            if (changed) {
                this.onTemplateChanged();
            }
        }
        /**
         * Gets an event raised when the value of the template property changes
         */
        get templateChanged() {
            if (!this._templateChanged) {
                this._templateChanged = new latte.LatteEvent(this);
            }
            return this._templateChanged;
        }
        /**
         * Raises the <c>templateChanged</c> event
         */
        onTemplateChanged() {
            if (this._templateChanged) {
                this._templateChanged.raise();
            }
            this.onFieldValueChanged('template', this.template);
        }
        /**
         * Gets or sets the value of the created field of type datetime
         */
        get created() {
            return this._created;
        }
        /**
         * Gets or sets the value of the created field of type datetime
         */
        set created(value) {
            var changed = value !== this._created;
            this._created = value;
            if (changed) {
                this.onCreatedChanged();
            }
        }
        /**
         * Gets an event raised when the value of the created property changes
         */
        get createdChanged() {
            if (!this._createdChanged) {
                this._createdChanged = new latte.LatteEvent(this);
            }
            return this._createdChanged;
        }
        /**
         * Raises the <c>createdChanged</c> event
         */
        onCreatedChanged() {
            if (this._createdChanged) {
                this._createdChanged.raise();
            }
            this.onFieldValueChanged('created', this.created);
        }
        /**
         * Gets or sets the value of the modified field of type datetime
         */
        get modified() {
            return this._modified;
        }
        /**
         * Gets or sets the value of the modified field of type datetime
         */
        set modified(value) {
            var changed = value !== this._modified;
            this._modified = value;
            if (changed) {
                this.onModifiedChanged();
            }
        }
        /**
         * Gets an event raised when the value of the modified property changes
         */
        get modifiedChanged() {
            if (!this._modifiedChanged) {
                this._modifiedChanged = new latte.LatteEvent(this);
            }
            return this._modifiedChanged;
        }
        /**
         * Raises the <c>modifiedChanged</c> event
         */
        onModifiedChanged() {
            if (this._modifiedChanged) {
                this._modifiedChanged.raise();
            }
            this.onFieldValueChanged('modified', this.modified);
        }
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        get title() {
            return this._title;
        }
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        set title(value) {
            var changed = value !== this._title;
            this._title = value;
            if (changed) {
                this.onTitleChanged();
            }
        }
        /**
         * Gets an event raised when the value of the title property changes
         */
        get titleChanged() {
            if (!this._titleChanged) {
                this._titleChanged = new latte.LatteEvent(this);
            }
            return this._titleChanged;
        }
        /**
         * Raises the <c>titleChanged</c> event
         */
        onTitleChanged() {
            if (this._titleChanged) {
                this._titleChanged.raise();
            }
            this.onFieldValueChanged('title', this.title);
        }
        /**
         * Gets or sets the value of the description field of type varchar(255)
         */
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the value of the description field of type varchar(255)
         */
        set description(value) {
            var changed = value !== this._description;
            this._description = value;
            if (changed) {
                this.onDescriptionChanged();
            }
        }
        /**
         * Gets an event raised when the value of the description property changes
         */
        get descriptionChanged() {
            if (!this._descriptionChanged) {
                this._descriptionChanged = new latte.LatteEvent(this);
            }
            return this._descriptionChanged;
        }
        /**
         * Raises the <c>descriptionChanged</c> event
         */
        onDescriptionChanged() {
            if (this._descriptionChanged) {
                this._descriptionChanged.raise();
            }
            this.onFieldValueChanged('description', this.description);
        }
        /**
         * Gets or sets the value of the order field of type int(11)
         */
        get order() {
            return this._order;
        }
        /**
         * Gets or sets the value of the order field of type int(11)
         */
        set order(value) {
            var changed = value !== this._order;
            this._order = value;
            if (changed) {
                this.onOrderChanged();
            }
        }
        /**
         * Gets an event raised when the value of the order property changes
         */
        get orderChanged() {
            if (!this._orderChanged) {
                this._orderChanged = new latte.LatteEvent(this);
            }
            return this._orderChanged;
        }
        /**
         * Raises the <c>orderChanged</c> event
         */
        onOrderChanged() {
            if (this._orderChanged) {
                this._orderChanged.raise();
            }
            this.onFieldValueChanged('order', this.order);
        }
        /**
         * Gets or sets the value of the sort field of type varchar(20)
         */
        get sort() {
            return this._sort;
        }
        /**
         * Gets or sets the value of the sort field of type varchar(20)
         */
        set sort(value) {
            var changed = value !== this._sort;
            this._sort = value;
            if (changed) {
                this.onSortChanged();
            }
        }
        /**
         * Gets an event raised when the value of the sort property changes
         */
        get sortChanged() {
            if (!this._sortChanged) {
                this._sortChanged = new latte.LatteEvent(this);
            }
            return this._sortChanged;
        }
        /**
         * Raises the <c>sortChanged</c> event
         */
        onSortChanged() {
            if (this._sortChanged) {
                this._sortChanged.raise();
            }
            this.onFieldValueChanged('sort', this.sort);
        }
        /**
         * Gets or sets the value of the powner field of type int(11)
         */
        get powner() {
            return this._powner;
        }
        /**
         * Gets or sets the value of the powner field of type int(11)
         */
        set powner(value) {
            var changed = value !== this._powner;
            this._powner = value;
            if (changed) {
                this.onPownerChanged();
            }
        }
        /**
         * Gets an event raised when the value of the powner property changes
         */
        get pownerChanged() {
            if (!this._pownerChanged) {
                this._pownerChanged = new latte.LatteEvent(this);
            }
            return this._pownerChanged;
        }
        /**
         * Raises the <c>pownerChanged</c> event
         */
        onPownerChanged() {
            if (this._pownerChanged) {
                this._pownerChanged.raise();
            }
            this.onFieldValueChanged('powner', this.powner);
        }
        /**
         * Gets or sets the value of the pgroup field of type int(11)
         */
        get pgroup() {
            return this._pgroup;
        }
        /**
         * Gets or sets the value of the pgroup field of type int(11)
         */
        set pgroup(value) {
            var changed = value !== this._pgroup;
            this._pgroup = value;
            if (changed) {
                this.onPgroupChanged();
            }
        }
        /**
         * Gets an event raised when the value of the pgroup property changes
         */
        get pgroupChanged() {
            if (!this._pgroupChanged) {
                this._pgroupChanged = new latte.LatteEvent(this);
            }
            return this._pgroupChanged;
        }
        /**
         * Raises the <c>pgroupChanged</c> event
         */
        onPgroupChanged() {
            if (this._pgroupChanged) {
                this._pgroupChanged.raise();
            }
            this.onFieldValueChanged('pgroup', this.pgroup);
        }
        /**
         * Gets or sets the value of the pother field of type int(11)
         */
        get pother() {
            return this._pother;
        }
        /**
         * Gets or sets the value of the pother field of type int(11)
         */
        set pother(value) {
            var changed = value !== this._pother;
            this._pother = value;
            if (changed) {
                this.onPotherChanged();
            }
        }
        /**
         * Gets an event raised when the value of the pother property changes
         */
        get potherChanged() {
            if (!this._potherChanged) {
                this._potherChanged = new latte.LatteEvent(this);
            }
            return this._potherChanged;
        }
        /**
         * Raises the <c>potherChanged</c> event
         */
        onPotherChanged() {
            if (this._potherChanged) {
                this._potherChanged.raise();
            }
            this.onFieldValueChanged('pother', this.pother);
        }
        /**
         * Gets or sets the value of the pworld field of type int(11)
         */
        get pworld() {
            return this._pworld;
        }
        /**
         * Gets or sets the value of the pworld field of type int(11)
         */
        set pworld(value) {
            var changed = value !== this._pworld;
            this._pworld = value;
            if (changed) {
                this.onPworldChanged();
            }
        }
        /**
         * Gets an event raised when the value of the pworld property changes
         */
        get pworldChanged() {
            if (!this._pworldChanged) {
                this._pworldChanged = new latte.LatteEvent(this);
            }
            return this._pworldChanged;
        }
        /**
         * Raises the <c>pworldChanged</c> event
         */
        onPworldChanged() {
            if (this._pworldChanged) {
                this._pworldChanged.raise();
            }
            this.onFieldValueChanged('pworld', this.pworld);
        }
        /**
         * Gets or sets the value of the flags field of type int(11)
         */
        get flags() {
            return this._flags;
        }
        /**
         * Gets or sets the value of the flags field of type int(11)
         */
        set flags(value) {
            var changed = value !== this._flags;
            this._flags = value;
            if (changed) {
                this.onFlagsChanged();
            }
        }
        /**
         * Gets an event raised when the value of the flags property changes
         */
        get flagsChanged() {
            if (!this._flagsChanged) {
                this._flagsChanged = new latte.LatteEvent(this);
            }
            return this._flagsChanged;
        }
        /**
         * Raises the <c>flagsChanged</c> event
         */
        onFlagsChanged() {
            if (this._flagsChanged) {
                this._flagsChanged.raise();
            }
            this.onFieldValueChanged('flags', this.flags);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idpage': this.idpage, 'idparent': this.idparent, 'idgroup': this.idgroup, 'iduser': this.iduser, 'guid': this.guid, 'key': this.key, 'trash': this.trash, 'online': this.online, 'template': this.template, 'created': this.created, 'modified': this.modified, 'title': this.title, 'description': this.description, 'order': this.order, 'sort': this.sort, 'powner': this.powner, 'pgroup': this.pgroup, 'pother': this.pother, 'pworld': this.pworld, 'flags': this.flags }; }
        /*
         * Remote Method.
 Returns a page from the specified URL query token.
 The q variable may be the guid or the key of the page.


         */
        static byUrlQ(q) {
            return new latte.RemoteCall('fragment', 'Page', 'byUrlQ', { q: q });
        }
        /*
         * Remote Method.
 Return a value indicating if the key is valid for the specified page


         */
        static isValidURLKey(idpage, key) {
            return new latte.RemoteCall('fragment', 'Page', 'isValidURLKey', { idpage: idpage, key: key });
        }
        /*
         * Remote Method.

         */
        static rootPages() {
            return new latte.RemoteCall('fragment', 'Page', 'rootPages', {});
        }
        /*
         * Remote Method.
 Gets the configuration of the page


         */
        getConfiguration() {
            return new latte.RemoteCall('fragment', 'Page', 'getConfiguration', {}, this.recordId);
        }
        /*
         * Remote Method.
 Saves the configuration of the page


         */
        setConfiguration(json) {
            return new latte.RemoteCall('fragment', 'Page', 'setConfiguration', { json: json }, this.recordId);
        }
        /*
         * Remote Method.
 Returns the fragments of the page


         */
        getFragments() {
            return new latte.RemoteCall('fragment', 'Page', 'getFragments', {}, this.recordId);
        }
        /*
         * Remote Method.
 Gets the child pages of the page.
 This method can be a little confuse because is a paginated result. Page parameter refers to pagination.


         */
        getPages(page = 1) {
            return new latte.RemoteCall('fragment', 'Page', 'getPages', { page: page }, this.recordId);
        }
        /*
         * Remote Method.
 Gets the settings of the page, including the parent ones.

         */
        getSettingsPack() {
            return new latte.RemoteCall('fragment', 'Page', 'getSettingsPack', {}, this.recordId);
        }
        /*
         * Remote Method.
 Sends the page to trash

         */
        sendToTrash() {
            return new latte.RemoteCall('fragment', 'Page', 'sendToTrash', {}, this.recordId);
        }
        /*
         * Remote Method.

         */
        setOnline(online) {
            return new latte.RemoteCall('fragment', 'Page', 'setOnline', { online: online }, this.recordId);
        }
    }
    /**
    * Declares the native types of the record.
    **/
    pageBase.nativeTypes = { "idpage": "int(11)", "idparent": "int(11)", "idgroup": "int(11)", "iduser": "int(11)", "guid": "varchar(50)", "key": "varchar(200)", "trash": "int(1)", "online": "int(1)", "template": "varchar(20)", "created": "datetime", "modified": "datetime", "title": "varchar(128)", "description": "varchar(255)", "order": "int(11)", "sort": "varchar(20)", "powner": "int(11)", "pgroup": "int(11)", "pother": "int(11)", "pworld": "int(11)", "flags": "int(11)" };
    latte.pageBase = pageBase;
    class fragmentBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'Fragment';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idfragment = null;
            /**
             * Database field: int(11)
             */
            this._idpage = null;
            /**
             * Database field: longtext
             */
            this._value = null;
            /**
             * Database field: varchar(50)
             */
            this._name = null;
        }
        /**
         * Gets or sets the value of the idfragment field of type int(11)
         */
        get idfragment() {
            return this._idfragment;
        }
        /**
         * Gets or sets the value of the idfragment field of type int(11)
         */
        set idfragment(value) {
            var changed = value !== this._idfragment;
            this._idfragment = value;
            if (changed) {
                this.onIdfragmentChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idfragment property changes
         */
        get idfragmentChanged() {
            if (!this._idfragmentChanged) {
                this._idfragmentChanged = new latte.LatteEvent(this);
            }
            return this._idfragmentChanged;
        }
        /**
         * Raises the <c>idfragmentChanged</c> event
         */
        onIdfragmentChanged() {
            if (this._idfragmentChanged) {
                this._idfragmentChanged.raise();
            }
            this.onFieldValueChanged('idfragment', this.idfragment);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idfragment'; }
        /**
         * Gets or sets the value of the idpage field of type int(11)
         */
        get idpage() {
            return this._idpage;
        }
        /**
         * Gets or sets the value of the idpage field of type int(11)
         */
        set idpage(value) {
            var changed = value !== this._idpage;
            this._idpage = value;
            if (changed) {
                this.onIdpageChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idpage property changes
         */
        get idpageChanged() {
            if (!this._idpageChanged) {
                this._idpageChanged = new latte.LatteEvent(this);
            }
            return this._idpageChanged;
        }
        /**
         * Raises the <c>idpageChanged</c> event
         */
        onIdpageChanged() {
            if (this._idpageChanged) {
                this._idpageChanged.raise();
            }
            this.onFieldValueChanged('idpage', this.idpage);
        }
        /**
         * Gets or sets the value of the value field of type longtext
         */
        get value() {
            return this._value;
        }
        /**
         * Gets or sets the value of the value field of type longtext
         */
        set value(value) {
            var changed = value !== this._value;
            this._value = value;
            if (changed) {
                this.onValueChanged();
            }
        }
        /**
         * Gets an event raised when the value of the value property changes
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
            this.onFieldValueChanged('value', this.value);
        }
        /**
         * Gets or sets the value of the name field of type varchar(50)
         */
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the value of the name field of type varchar(50)
         */
        set name(value) {
            var changed = value !== this._name;
            this._name = value;
            if (changed) {
                this.onNameChanged();
            }
        }
        /**
         * Gets an event raised when the value of the name property changes
         */
        get nameChanged() {
            if (!this._nameChanged) {
                this._nameChanged = new latte.LatteEvent(this);
            }
            return this._nameChanged;
        }
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged() {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idfragment': this.idfragment, 'idpage': this.idpage, 'value': this.value, 'name': this.name }; }
    }
    /**
    * Declares the native types of the record.
    **/
    fragmentBase.nativeTypes = { "idfragment": "int(11)", "idpage": "int(11)", "value": "longtext", "name": "varchar(50)" };
    latte.fragmentBase = fragmentBase;
    class fileBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'File';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idfile = null;
            /**
             * Database field: varchar(50)
             */
            this._guid = null;
            /**
             * Database field: int(11)
             */
            this._iduser = null;
            /**
             * Database field: int(11)
             */
            this._idowner = null;
            /**
             * Database field: int(11)
             */
            this._idparent = null;
            /**
             * Database field: varchar(50)
             */
            this._owner = null;
            /**
             * Database field: varchar(128)
             */
            this._name = null;
            /**
             * Database field: int(11)
             */
            this._size = null;
            /**
             * Database field: varchar(30)
             */
            this._bucket = null;
            /**
             * Database field: varchar(128)
             */
            this._path = null;
            /**
             * Database field: datetime
             */
            this._uploaded = null;
            /**
             * Database field: varchar(200)
             */
            this._description = null;
            /**
             * Database field: int(11)
             */
            this._width = null;
            /**
             * Database field: int(11)
             */
            this._height = null;
            /**
             * Database field: varchar(50)
             */
            this._key = null;
        }
        /**
         * Gets or sets the value of the idfile field of type int(11)
         */
        get idfile() {
            return this._idfile;
        }
        /**
         * Gets or sets the value of the idfile field of type int(11)
         */
        set idfile(value) {
            var changed = value !== this._idfile;
            this._idfile = value;
            if (changed) {
                this.onIdfileChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idfile property changes
         */
        get idfileChanged() {
            if (!this._idfileChanged) {
                this._idfileChanged = new latte.LatteEvent(this);
            }
            return this._idfileChanged;
        }
        /**
         * Raises the <c>idfileChanged</c> event
         */
        onIdfileChanged() {
            if (this._idfileChanged) {
                this._idfileChanged.raise();
            }
            this.onFieldValueChanged('idfile', this.idfile);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idfile'; }
        /**
         * Gets or sets the value of the guid field of type varchar(50)
         */
        get guid() {
            return this._guid;
        }
        /**
         * Gets or sets the value of the guid field of type varchar(50)
         */
        set guid(value) {
            var changed = value !== this._guid;
            this._guid = value;
            if (changed) {
                this.onGuidChanged();
            }
        }
        /**
         * Gets an event raised when the value of the guid property changes
         */
        get guidChanged() {
            if (!this._guidChanged) {
                this._guidChanged = new latte.LatteEvent(this);
            }
            return this._guidChanged;
        }
        /**
         * Raises the <c>guidChanged</c> event
         */
        onGuidChanged() {
            if (this._guidChanged) {
                this._guidChanged.raise();
            }
            this.onFieldValueChanged('guid', this.guid);
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        get iduser() {
            return this._iduser;
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        set iduser(value) {
            var changed = value !== this._iduser;
            this._iduser = value;
            if (changed) {
                this.onIduserChanged();
            }
        }
        /**
         * Gets an event raised when the value of the iduser property changes
         */
        get iduserChanged() {
            if (!this._iduserChanged) {
                this._iduserChanged = new latte.LatteEvent(this);
            }
            return this._iduserChanged;
        }
        /**
         * Raises the <c>iduserChanged</c> event
         */
        onIduserChanged() {
            if (this._iduserChanged) {
                this._iduserChanged.raise();
            }
            this.onFieldValueChanged('iduser', this.iduser);
        }
        /**
         * Gets or sets the value of the idowner field of type int(11)
         */
        get idowner() {
            return this._idowner;
        }
        /**
         * Gets or sets the value of the idowner field of type int(11)
         */
        set idowner(value) {
            var changed = value !== this._idowner;
            this._idowner = value;
            if (changed) {
                this.onIdownerChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idowner property changes
         */
        get idownerChanged() {
            if (!this._idownerChanged) {
                this._idownerChanged = new latte.LatteEvent(this);
            }
            return this._idownerChanged;
        }
        /**
         * Raises the <c>idownerChanged</c> event
         */
        onIdownerChanged() {
            if (this._idownerChanged) {
                this._idownerChanged.raise();
            }
            this.onFieldValueChanged('idowner', this.idowner);
        }
        /**
         * Gets or sets the value of the idparent field of type int(11)
         */
        get idparent() {
            return this._idparent;
        }
        /**
         * Gets or sets the value of the idparent field of type int(11)
         */
        set idparent(value) {
            var changed = value !== this._idparent;
            this._idparent = value;
            if (changed) {
                this.onIdparentChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idparent property changes
         */
        get idparentChanged() {
            if (!this._idparentChanged) {
                this._idparentChanged = new latte.LatteEvent(this);
            }
            return this._idparentChanged;
        }
        /**
         * Raises the <c>idparentChanged</c> event
         */
        onIdparentChanged() {
            if (this._idparentChanged) {
                this._idparentChanged.raise();
            }
            this.onFieldValueChanged('idparent', this.idparent);
        }
        /**
         * Gets or sets the value of the owner field of type varchar(50)
         */
        get owner() {
            return this._owner;
        }
        /**
         * Gets or sets the value of the owner field of type varchar(50)
         */
        set owner(value) {
            var changed = value !== this._owner;
            this._owner = value;
            if (changed) {
                this.onOwnerChanged();
            }
        }
        /**
         * Gets an event raised when the value of the owner property changes
         */
        get ownerChanged() {
            if (!this._ownerChanged) {
                this._ownerChanged = new latte.LatteEvent(this);
            }
            return this._ownerChanged;
        }
        /**
         * Raises the <c>ownerChanged</c> event
         */
        onOwnerChanged() {
            if (this._ownerChanged) {
                this._ownerChanged.raise();
            }
            this.onFieldValueChanged('owner', this.owner);
        }
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        set name(value) {
            var changed = value !== this._name;
            this._name = value;
            if (changed) {
                this.onNameChanged();
            }
        }
        /**
         * Gets an event raised when the value of the name property changes
         */
        get nameChanged() {
            if (!this._nameChanged) {
                this._nameChanged = new latte.LatteEvent(this);
            }
            return this._nameChanged;
        }
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged() {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        }
        /**
         * Gets or sets the value of the size field of type int(11)
         */
        get size() {
            return this._size;
        }
        /**
         * Gets or sets the value of the size field of type int(11)
         */
        set size(value) {
            var changed = value !== this._size;
            this._size = value;
            if (changed) {
                this.onSizeChanged();
            }
        }
        /**
         * Gets an event raised when the value of the size property changes
         */
        get sizeChanged() {
            if (!this._sizeChanged) {
                this._sizeChanged = new latte.LatteEvent(this);
            }
            return this._sizeChanged;
        }
        /**
         * Raises the <c>sizeChanged</c> event
         */
        onSizeChanged() {
            if (this._sizeChanged) {
                this._sizeChanged.raise();
            }
            this.onFieldValueChanged('size', this.size);
        }
        /**
         * Gets or sets the value of the bucket field of type varchar(30)
         */
        get bucket() {
            return this._bucket;
        }
        /**
         * Gets or sets the value of the bucket field of type varchar(30)
         */
        set bucket(value) {
            var changed = value !== this._bucket;
            this._bucket = value;
            if (changed) {
                this.onBucketChanged();
            }
        }
        /**
         * Gets an event raised when the value of the bucket property changes
         */
        get bucketChanged() {
            if (!this._bucketChanged) {
                this._bucketChanged = new latte.LatteEvent(this);
            }
            return this._bucketChanged;
        }
        /**
         * Raises the <c>bucketChanged</c> event
         */
        onBucketChanged() {
            if (this._bucketChanged) {
                this._bucketChanged.raise();
            }
            this.onFieldValueChanged('bucket', this.bucket);
        }
        /**
         * Gets or sets the value of the path field of type varchar(128)
         */
        get path() {
            return this._path;
        }
        /**
         * Gets or sets the value of the path field of type varchar(128)
         */
        set path(value) {
            var changed = value !== this._path;
            this._path = value;
            if (changed) {
                this.onPathChanged();
            }
        }
        /**
         * Gets an event raised when the value of the path property changes
         */
        get pathChanged() {
            if (!this._pathChanged) {
                this._pathChanged = new latte.LatteEvent(this);
            }
            return this._pathChanged;
        }
        /**
         * Raises the <c>pathChanged</c> event
         */
        onPathChanged() {
            if (this._pathChanged) {
                this._pathChanged.raise();
            }
            this.onFieldValueChanged('path', this.path);
        }
        /**
         * Gets or sets the value of the uploaded field of type datetime
         */
        get uploaded() {
            return this._uploaded;
        }
        /**
         * Gets or sets the value of the uploaded field of type datetime
         */
        set uploaded(value) {
            var changed = value !== this._uploaded;
            this._uploaded = value;
            if (changed) {
                this.onUploadedChanged();
            }
        }
        /**
         * Gets an event raised when the value of the uploaded property changes
         */
        get uploadedChanged() {
            if (!this._uploadedChanged) {
                this._uploadedChanged = new latte.LatteEvent(this);
            }
            return this._uploadedChanged;
        }
        /**
         * Raises the <c>uploadedChanged</c> event
         */
        onUploadedChanged() {
            if (this._uploadedChanged) {
                this._uploadedChanged.raise();
            }
            this.onFieldValueChanged('uploaded', this.uploaded);
        }
        /**
         * Gets or sets the value of the description field of type varchar(200)
         */
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the value of the description field of type varchar(200)
         */
        set description(value) {
            var changed = value !== this._description;
            this._description = value;
            if (changed) {
                this.onDescriptionChanged();
            }
        }
        /**
         * Gets an event raised when the value of the description property changes
         */
        get descriptionChanged() {
            if (!this._descriptionChanged) {
                this._descriptionChanged = new latte.LatteEvent(this);
            }
            return this._descriptionChanged;
        }
        /**
         * Raises the <c>descriptionChanged</c> event
         */
        onDescriptionChanged() {
            if (this._descriptionChanged) {
                this._descriptionChanged.raise();
            }
            this.onFieldValueChanged('description', this.description);
        }
        /**
         * Gets or sets the value of the width field of type int(11)
         */
        get width() {
            return this._width;
        }
        /**
         * Gets or sets the value of the width field of type int(11)
         */
        set width(value) {
            var changed = value !== this._width;
            this._width = value;
            if (changed) {
                this.onWidthChanged();
            }
        }
        /**
         * Gets an event raised when the value of the width property changes
         */
        get widthChanged() {
            if (!this._widthChanged) {
                this._widthChanged = new latte.LatteEvent(this);
            }
            return this._widthChanged;
        }
        /**
         * Raises the <c>widthChanged</c> event
         */
        onWidthChanged() {
            if (this._widthChanged) {
                this._widthChanged.raise();
            }
            this.onFieldValueChanged('width', this.width);
        }
        /**
         * Gets or sets the value of the height field of type int(11)
         */
        get height() {
            return this._height;
        }
        /**
         * Gets or sets the value of the height field of type int(11)
         */
        set height(value) {
            var changed = value !== this._height;
            this._height = value;
            if (changed) {
                this.onHeightChanged();
            }
        }
        /**
         * Gets an event raised when the value of the height property changes
         */
        get heightChanged() {
            if (!this._heightChanged) {
                this._heightChanged = new latte.LatteEvent(this);
            }
            return this._heightChanged;
        }
        /**
         * Raises the <c>heightChanged</c> event
         */
        onHeightChanged() {
            if (this._heightChanged) {
                this._heightChanged.raise();
            }
            this.onFieldValueChanged('height', this.height);
        }
        /**
         * Gets or sets the value of the key field of type varchar(50)
         */
        get key() {
            return this._key;
        }
        /**
         * Gets or sets the value of the key field of type varchar(50)
         */
        set key(value) {
            var changed = value !== this._key;
            this._key = value;
            if (changed) {
                this.onKeyChanged();
            }
        }
        /**
         * Gets an event raised when the value of the key property changes
         */
        get keyChanged() {
            if (!this._keyChanged) {
                this._keyChanged = new latte.LatteEvent(this);
            }
            return this._keyChanged;
        }
        /**
         * Raises the <c>keyChanged</c> event
         */
        onKeyChanged() {
            if (this._keyChanged) {
                this._keyChanged.raise();
            }
            this.onFieldValueChanged('key', this.key);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idfile': this.idfile, 'guid': this.guid, 'iduser': this.iduser, 'idowner': this.idowner, 'idparent': this.idparent, 'owner': this.owner, 'name': this.name, 'size': this.size, 'bucket': this.bucket, 'path': this.path, 'uploaded': this.uploaded, 'description': this.description, 'width': this.width, 'height': this.height, 'key': this.key }; }
        /*
         * Remote Method.
 Retrieves a list of files by searching by the specified, comma separated guids


         */
        static byGuids(guids) {
            return new latte.RemoteCall('fragment', 'File', 'byGuids', { guids: guids });
        }
        /*
         * Remote Method.
 Gets the files of the specified records.  Files contains all children.


         */
        static byOwner(name, id) {
            return new latte.RemoteCall('fragment', 'File', 'byOwner', { name: name, id: id });
        }
        /*
         * Remote Method.
 Gets an array unlinked File objects inserted by the logged user.


         */
        static myUnlinked(ownerName) {
            return new latte.RemoteCall('fragment', 'File', 'myUnlinked', { ownerName: ownerName });
        }
        /*
         * Remote Method.

         */
        static changeNameDescription(idfile, name, description) {
            return new latte.RemoteCall('fragment', 'File', 'changeNameDescription', { idfile: idfile, name: name, description: description });
        }
        /*
         * Remote Method.
 Deletes the children of the file

         */
        deleteChildren() {
            return new latte.RemoteCall('fragment', 'File', 'deleteChildren', {}, this.recordId);
        }
        /*
         * Remote Method.
 Removes the registry of file and its contents from S3.


         */
        physicalRemove() {
            return new latte.RemoteCall('fragment', 'File', 'physicalRemove', {}, this.recordId);
        }
    }
    /**
    * Declares the native types of the record.
    **/
    fileBase.nativeTypes = { "idfile": "int(11)", "guid": "varchar(50)", "iduser": "int(11)", "idowner": "int(11)", "idparent": "int(11)", "owner": "varchar(50)", "name": "varchar(128)", "size": "int(11)", "bucket": "varchar(30)", "path": "varchar(128)", "uploaded": "datetime", "description": "varchar(200)", "width": "int(11)", "height": "int(11)", "key": "varchar(50)" };
    latte.fileBase = fileBase;
    class groupUserBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'GroupUser';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idgroupuser = null;
            /**
             * Database field: int(11)
             */
            this._idgroup = null;
            /**
             * Database field: int(11)
             */
            this._iduser = null;
        }
        /**
         * Gets or sets the value of the idgroupuser field of type int(11)
         */
        get idgroupuser() {
            return this._idgroupuser;
        }
        /**
         * Gets or sets the value of the idgroupuser field of type int(11)
         */
        set idgroupuser(value) {
            var changed = value !== this._idgroupuser;
            this._idgroupuser = value;
            if (changed) {
                this.onIdgroupuserChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idgroupuser property changes
         */
        get idgroupuserChanged() {
            if (!this._idgroupuserChanged) {
                this._idgroupuserChanged = new latte.LatteEvent(this);
            }
            return this._idgroupuserChanged;
        }
        /**
         * Raises the <c>idgroupuserChanged</c> event
         */
        onIdgroupuserChanged() {
            if (this._idgroupuserChanged) {
                this._idgroupuserChanged.raise();
            }
            this.onFieldValueChanged('idgroupuser', this.idgroupuser);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idgroupuser'; }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        get idgroup() {
            return this._idgroup;
        }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        set idgroup(value) {
            var changed = value !== this._idgroup;
            this._idgroup = value;
            if (changed) {
                this.onIdgroupChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idgroup property changes
         */
        get idgroupChanged() {
            if (!this._idgroupChanged) {
                this._idgroupChanged = new latte.LatteEvent(this);
            }
            return this._idgroupChanged;
        }
        /**
         * Raises the <c>idgroupChanged</c> event
         */
        onIdgroupChanged() {
            if (this._idgroupChanged) {
                this._idgroupChanged.raise();
            }
            this.onFieldValueChanged('idgroup', this.idgroup);
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        get iduser() {
            return this._iduser;
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        set iduser(value) {
            var changed = value !== this._iduser;
            this._iduser = value;
            if (changed) {
                this.onIduserChanged();
            }
        }
        /**
         * Gets an event raised when the value of the iduser property changes
         */
        get iduserChanged() {
            if (!this._iduserChanged) {
                this._iduserChanged = new latte.LatteEvent(this);
            }
            return this._iduserChanged;
        }
        /**
         * Raises the <c>iduserChanged</c> event
         */
        onIduserChanged() {
            if (this._iduserChanged) {
                this._iduserChanged.raise();
            }
            this.onFieldValueChanged('iduser', this.iduser);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idgroupuser': this.idgroupuser, 'idgroup': this.idgroup, 'iduser': this.iduser }; }
        /*
         * Remote Method.

         */
        static byGroup(idgroup) {
            return new latte.RemoteCall('fragment', 'GroupUser', 'byGroup', { idgroup: idgroup });
        }
    }
    /**
    * Declares the native types of the record.
    **/
    groupUserBase.nativeTypes = { "idgroupuser": "int(11)", "idgroup": "int(11)", "iduser": "int(11)" };
    latte.groupUserBase = groupUserBase;
    class userBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'User';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._iduser = null;
            /**
             * Database field: varchar(128)
             */
            this._uname = null;
            /**
             * Database field: varchar(128)
             */
            this._password = null;
            /**
             * Database field: int(11)
             */
            this._flags = null;
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        get iduser() {
            return this._iduser;
        }
        /**
         * Gets or sets the value of the iduser field of type int(11)
         */
        set iduser(value) {
            var changed = value !== this._iduser;
            this._iduser = value;
            if (changed) {
                this.onIduserChanged();
            }
        }
        /**
         * Gets an event raised when the value of the iduser property changes
         */
        get iduserChanged() {
            if (!this._iduserChanged) {
                this._iduserChanged = new latte.LatteEvent(this);
            }
            return this._iduserChanged;
        }
        /**
         * Raises the <c>iduserChanged</c> event
         */
        onIduserChanged() {
            if (this._iduserChanged) {
                this._iduserChanged.raise();
            }
            this.onFieldValueChanged('iduser', this.iduser);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'iduser'; }
        /**
         * Gets or sets the value of the uname field of type varchar(128)
         */
        get uname() {
            return this._uname;
        }
        /**
         * Gets or sets the value of the uname field of type varchar(128)
         */
        set uname(value) {
            var changed = value !== this._uname;
            this._uname = value;
            if (changed) {
                this.onUnameChanged();
            }
        }
        /**
         * Gets an event raised when the value of the uname property changes
         */
        get unameChanged() {
            if (!this._unameChanged) {
                this._unameChanged = new latte.LatteEvent(this);
            }
            return this._unameChanged;
        }
        /**
         * Raises the <c>unameChanged</c> event
         */
        onUnameChanged() {
            if (this._unameChanged) {
                this._unameChanged.raise();
            }
            this.onFieldValueChanged('uname', this.uname);
        }
        /**
         * Gets or sets the value of the password field of type varchar(128)
         */
        get password() {
            return this._password;
        }
        /**
         * Gets or sets the value of the password field of type varchar(128)
         */
        set password(value) {
            var changed = value !== this._password;
            this._password = value;
            if (changed) {
                this.onPasswordChanged();
            }
        }
        /**
         * Gets an event raised when the value of the password property changes
         */
        get passwordChanged() {
            if (!this._passwordChanged) {
                this._passwordChanged = new latte.LatteEvent(this);
            }
            return this._passwordChanged;
        }
        /**
         * Raises the <c>passwordChanged</c> event
         */
        onPasswordChanged() {
            if (this._passwordChanged) {
                this._passwordChanged.raise();
            }
            this.onFieldValueChanged('password', this.password);
        }
        /**
         * Gets or sets the value of the flags field of type int(11)
         */
        get flags() {
            return this._flags;
        }
        /**
         * Gets or sets the value of the flags field of type int(11)
         */
        set flags(value) {
            var changed = value !== this._flags;
            this._flags = value;
            if (changed) {
                this.onFlagsChanged();
            }
        }
        /**
         * Gets an event raised when the value of the flags property changes
         */
        get flagsChanged() {
            if (!this._flagsChanged) {
                this._flagsChanged = new latte.LatteEvent(this);
            }
            return this._flagsChanged;
        }
        /**
         * Raises the <c>flagsChanged</c> event
         */
        onFlagsChanged() {
            if (this._flagsChanged) {
                this._flagsChanged.raise();
            }
            this.onFieldValueChanged('flags', this.flags);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'iduser': this.iduser, 'uname': this.uname, 'password': this.password, 'flags': this.flags }; }
        /*
         * Remote Method.

         */
        static search(text) {
            return new latte.RemoteCall('fragment', 'User', 'search', { text: text });
        }
        /*
         * Remote Method.

         */
        static catalog() {
            return new latte.RemoteCall('fragment', 'User', 'catalog', {});
        }
        /*
         * Remote Method.

         */
        changePassword(oldPassword, password) {
            return new latte.RemoteCall('fragment', 'User', 'changePassword', { oldPassword: oldPassword, password: password }, this.recordId);
        }
        /*
         * Remote Method.

         */
        passwordCorrect(password) {
            return new latte.RemoteCall('fragment', 'User', 'passwordCorrect', { password: password }, this.recordId);
        }
    }
    /**
    * Declares the native types of the record.
    **/
    userBase.nativeTypes = { "iduser": "int(11)", "uname": "varchar(128)", "password": "varchar(128)", "flags": "int(11)" };
    latte.userBase = userBase;
    class groupBase extends latte.DataRecord {
        constructor(...args) {
            super(...args);
            /* Name of Php record */
            this._recordType = 'Group';
            /* Name of Module where record lives */
            this._moduleName = 'fragment';
            /**
             * Database field: int(11)
             */
            this._idgroup = null;
            /**
             * Database field: varchar(128)
             */
            this._name = null;
        }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        get idgroup() {
            return this._idgroup;
        }
        /**
         * Gets or sets the value of the idgroup field of type int(11)
         */
        set idgroup(value) {
            var changed = value !== this._idgroup;
            this._idgroup = value;
            if (changed) {
                this.onIdgroupChanged();
            }
        }
        /**
         * Gets an event raised when the value of the idgroup property changes
         */
        get idgroupChanged() {
            if (!this._idgroupChanged) {
                this._idgroupChanged = new latte.LatteEvent(this);
            }
            return this._idgroupChanged;
        }
        /**
         * Raises the <c>idgroupChanged</c> event
         */
        onIdgroupChanged() {
            if (this._idgroupChanged) {
                this._idgroupChanged.raise();
            }
            this.onFieldValueChanged('idgroup', this.idgroup);
        }
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName() { return 'idgroup'; }
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        set name(value) {
            var changed = value !== this._name;
            this._name = value;
            if (changed) {
                this.onNameChanged();
            }
        }
        /**
         * Gets an event raised when the value of the name property changes
         */
        get nameChanged() {
            if (!this._nameChanged) {
                this._nameChanged = new latte.LatteEvent(this);
            }
            return this._nameChanged;
        }
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged() {
            if (this._nameChanged) {
                this._nameChanged.raise();
            }
            this.onFieldValueChanged('name', this.name);
        }
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields() { return { 'idgroup': this.idgroup, 'name': this.name }; }
        /*
         * Remote Method.


         */
        static catalog() {
            return new latte.RemoteCall('fragment', 'Group', 'catalog', {});
        }
        /*
         * Remote Method.

         */
        static search(text) {
            return new latte.RemoteCall('fragment', 'Group', 'search', { text: text });
        }
    }
    /**
    * Declares the native types of the record.
    **/
    groupBase.nativeTypes = { "idgroup": "int(11)", "name": "varchar(128)" };
    latte.groupBase = groupBase;
    /*
     *
Created by PhpStorm.
User: josemanuel
Date: 9/21/16
Time: 12:21

     */
    class Server {
        /*
         * Remote Method.
 Returns a value indicating if the parent folder of fragment can be written

         */
        static canWriteHtAccess() {
            return new latte.RemoteCall('fragment', 'Server', 'canWriteHtAccess', {});
        }
        /*
         * Remote Method.
 Checks if there is a current valid connection with a database

         */
        static checkConnectionOk() {
            return new latte.RemoteCall('fragment', 'Server', 'checkConnectionOk', {});
        }
        /*
         * Remote Method.
 Checks if server can write on fragment folder


         */
        static checkFragmentFolderWritable() {
            return new latte.RemoteCall('fragment', 'Server', 'checkFragmentFolderWritable', {});
        }
        /*
         * Remote Method.
 Returns a value indicating if the database has no tables

         */
        static isDatabaseEmpty() {
            return new latte.RemoteCall('fragment', 'Server', 'isDatabaseEmpty', {});
        }
        /*
         * Remote Method.
 Returns a valude indicating if the .htaccess on root is present


         */
        static isHtAccessPresent() {
            return new latte.RemoteCall('fragment', 'Server', 'isHtAccessPresent', {});
        }
        /*
         * Remote Method.
 Checks if mod_rewrite is enabled

         */
        static checkModRewriteEnabled() {
            return new latte.RemoteCall('fragment', 'Server', 'checkModRewriteEnabled', {});
        }
        /*
         * Remote Method.
 Returns the source of the htaccess that should be present on installation

         */
        static getHtAccessSource() {
            return new latte.RemoteCall('fragment', 'Server', 'getHtAccessSource', {});
        }
        /*
         * Remote Method.
 Installs the database included in installer

         */
        static installDatabase() {
            return new latte.RemoteCall('fragment', 'Server', 'installDatabase', {});
        }
        /*
         * Remote Method.
 Copies the htaccess to the

         */
        static installHtAccess() {
            return new latte.RemoteCall('fragment', 'Server', 'installHtAccess', {});
        }
        /*
         * Remote Method.
 Adds records for an initial database

         */
        static installInitialRecords(rootPassword) {
            return new latte.RemoteCall('fragment', 'Server', 'installInitialRecords', { rootPassword: rootPassword });
        }
        /*
         * Remote Method.
 Saves the specified connection parameters

         */
        static saveConnectionParameters(user, pass, db, host, lang) {
            return new latte.RemoteCall('fragment', 'Server', 'saveConnectionParameters', { user: user, pass: pass, db: db, host: host, lang: lang });
        }
        /*
         * Remote Method.
 Changes the temporary language (used for install wizard)


         */
        static setTemporaryLang(lang) {
            return new latte.RemoteCall('fragment', 'Server', 'setTemporaryLang', { lang: lang });
        }
    }
    latte.Server = Server;
    /*
     *
Created by PhpStorm.
User: josemanuel
Date: 8/1/16
Time: 21:34

     */
    class Session {
        /*
         * Remote Method.
 Makes a user login


         */
        static logIn(uname, pass) {
            return new latte.RemoteCall('fragment', 'Session', 'logIn', { uname: uname, pass: pass });
        }
        /*
         * Remote Method.
 Logs the user out


         */
        static logOut() {
            return new latte.RemoteCall('fragment', 'Session', 'logOut', {});
        }
    }
    latte.Session = Session;
})(latte || (latte = {}));
var latte;
(function (latte) {
    class SignInViewBase extends latte.Element {
        constructor() {
            super(latte.Element.fromBank('SignInViewBase'));
            this.bind(this, true);
        }
        get combo() {
            if (!this._combo) {
                this._combo = new latte.Element(this.querySelector('[data-property=combo]'));
            }
            return this._combo;
        }
        get error() {
            if (!this._error) {
                this._error = new latte.Element(this.querySelector('[data-property=error]'));
            }
            return this._error;
        }
        get fieldEmail() {
            if (!this._fieldEmail) {
                this._fieldEmail = new latte.Element(this.querySelector('[data-property=fieldEmail]'));
            }
            return this._fieldEmail;
        }
        get fieldPassword() {
            if (!this._fieldPassword) {
                this._fieldPassword = new latte.Element(this.querySelector('[data-property=fieldPassword]'));
            }
            return this._fieldPassword;
        }
        get form() {
            if (!this._form) {
                this._form = new latte.Element(this.querySelector('[data-property=form]'));
            }
            return this._form;
        }
        get txtEmail() {
            if (!this._txtEmail) {
                this._txtEmail = new latte.Textbox(this.querySelector('[data-property=txtEmail]'));
            }
            return this._txtEmail;
        }
        get txtPassword() {
            if (!this._txtPassword) {
                this._txtPassword = new latte.Textbox(this.querySelector('[data-property=txtPassword]'));
            }
            return this._txtPassword;
        }
        static getModel() {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.fromBank('SignInViewBase'));
            }
            return this._Model;
        }
    }
    latte.SignInViewBase = SignInViewBase;
})(latte || (latte = {}));
var latte;
(function (latte) {
    window['latte']['globalViewsBank'] = latte._merge(window['latte']['globalViewsBank'] || {}, {
        "SignInViewBase": "<div data-class=\"SignInViewBase\" class=\"signin-view holder\">\n    <header>\n        <!--<h1>Cuenta</h1>-->\n        <div class=\"logo\"></div>\n    </header>\n    <main>\n        <h2>Sign In</h2>\n        <form data-property=\"form\">\n            <div data-property=\"combo\" class=\"combo\">\n                <div data-property=\"fieldEmail\" class=\"field user\">\n                    <input data-property=\"txtEmail\" type=\"text\" placeholder=\"User\">\n                </div>\n                <div class=\"separator\"></div>\n                <div data-property=\"fieldPassword\" class=\"field password \">\n                    <input data-property=\"txtPassword\" type=\"password\" placeholder=\"Password\">\n                </div>\n            </div>\n            <div style=\"display: none;\" data-property=\"error\" class=\"error\">\n                User, email or password are invalid. Please try again.\n            </div>\n            <!--<div class=\"remember\">-->\n                <!--<input id=\"remember\" name=\"remember\" type=\"checkbox\" checked/>-->\n                <!--<label for=\"remember\">Remember Me</label>-->\n            <!--</div>-->\n            <button class=\"submit\" tabindex=\"0\">Sign In</button>\n        </form>\n    </main>\n    <footer>\n        <!--<p class=\"link\">Forgot Password?</p>-->\n        <!--<p class=\"link\">Register</p>-->\n    </footer>\n</div>"
    });
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/11/16.
 */
var latte;
(function (latte) {
    // Inform url
    latte._latteUrl('/fragment/latte');
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     * Adapts a fragment to its editor capabilities
     */
    class FragmentAdapter {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * You should leave empty the constructor
         */
        constructor() {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._expando = null;
            /**
             * Property field
             */
            this._fragmentConfiguration = null;
            /**
             * Property field
             */
            this._fragment = null;
            /**
             * Property field
             */
            this._editorItem = null;
            /**
             * Property field
             */
            this._unsavedChanges = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Implementation.
         *
         * @returns {RemoteCall<any>[]}
         */
        getSaveCalls() {
            if (this.unsavedChanges) {
                return [this.fragment.saveCall().withHandlers(() => this.unsavedChanges = false)];
            }
            return [];
        }
        /**
         * Returns the tabs for the ribbon of the view
         * @returns {Array}
         */
        getEditorTabs() {
            return [];
        }
        /**
         * Returns the items for the ribbon of the view
         * @returns {Array}
         */
        getEditorTabItems() {
            return [];
        }
        /**
         * Raises the <c>createEditorItem</c> event
         */
        onCreateEditorItem() {
            if (this._createEditorItem) {
                this._createEditorItem.raise();
            }
        }
        /**
         * Raises the <c>fragment</c> event
         */
        onFragmentChanged() {
            if (this._fragmentChanged) {
                this._fragmentChanged.raise();
            }
        }
        /**
         * Raises the <c>fragmentConfiguration</c> event
         */
        onFragmentConfigurationChanged() {
            if (this._fragmentConfigurationChanged) {
                this._fragmentConfigurationChanged.raise();
            }
        }
        /**
         * Raises the <c>editorBlur</c> event
         */
        onEditorBlur() {
            if (this._editorBlur) {
                this._editorBlur.raise();
            }
            if (this.expando) {
                this.expando.removeClass('focused');
            }
        }
        /**
         * Raises the <c>editorFocus</c> event
         */
        onEditorFocus() {
            if (this._editorFocus) {
                this._editorFocus.raise();
            }
            if (this.expando) {
                this.expando.addClass('focused');
            }
        }
        /**
         * Raises the <c>editorItem</c> event
         */
        onEditorItemChanged() {
            if (this._editorItemChanged) {
                this._editorItemChanged.raise();
            }
            if (this.editorItem) {
                this.editorItem.focused.add(() => this.onEditorFocus());
                this.editorItem.blur.add(() => this.onEditorBlur());
            }
        }
        /**
         * Raises the <c>register</c> event
         */
        onRegister() {
            if (this._register) {
                this._register.raise();
            }
        }
        /**
         * Raises the <c>tabsChanged</c> event
         */
        onTabsChanged() {
            if (this._tabsChanged) {
                this._tabsChanged.raise();
            }
        }
        /**
         * Raises the <c>unRegister</c> event
         */
        onUnRegister() {
            if (this._unRegister) {
                this._unRegister.raise();
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
         * Gets an event raised when the editorItem should be initialized
         *
         * @returns {LatteEvent}
         */
        get createEditorItem() {
            if (!this._createEditorItem) {
                this._createEditorItem = new latte.LatteEvent(this);
            }
            return this._createEditorItem;
        }
        /**
         * Gets an event raised when the value of the fragmentConfiguration property changes
         *
         * @returns {LatteEvent}
         */
        get fragmentConfigurationChanged() {
            if (!this._fragmentConfigurationChanged) {
                this._fragmentConfigurationChanged = new latte.LatteEvent(this);
            }
            return this._fragmentConfigurationChanged;
        }
        /**
         * Gets an event raised when the editor item loses the focus
         *
         * @returns {LatteEvent}
         */
        get editorBlur() {
            if (!this._editorBlur) {
                this._editorBlur = new latte.LatteEvent(this);
            }
            return this._editorBlur;
        }
        /**
         * Gets an event raised when the editor item receives the focus
         *
         * @returns {LatteEvent}
         */
        get editorFocus() {
            if (!this._editorFocus) {
                this._editorFocus = new latte.LatteEvent(this);
            }
            return this._editorFocus;
        }
        /**
         * Gets an event raised when the value of the editorItem property changes
         *
         * @returns {LatteEvent}
         */
        get editorItemChanged() {
            if (!this._editorItemChanged) {
                this._editorItemChanged = new latte.LatteEvent(this);
            }
            return this._editorItemChanged;
        }
        /**
         * Gets an event raised when the adapter is registered
         *
         * @returns {LatteEvent}
         */
        get register() {
            if (!this._register) {
                this._register = new latte.LatteEvent(this);
            }
            return this._register;
        }
        /**
         * Gets an event raised when the tabs of the adapter changed
         *
         * @returns {LatteEvent}
         */
        get tabsChanged() {
            if (!this._tabsChanged) {
                this._tabsChanged = new latte.LatteEvent(this);
            }
            return this._tabsChanged;
        }
        /**
         * Gets an event raised when the adapter is un-registered
         *
         * @returns {LatteEvent}
         */
        get unRegister() {
            if (!this._unRegister) {
                this._unRegister = new latte.LatteEvent(this);
            }
            return this._unRegister;
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
         * Gets or sets the expando where the item lives
         *
         * @returns {FragmentExpandoItem}
         */
        get expando() {
            return this._expando;
        }
        /**
         * Gets or sets the expando where the item lives
         *
         * @param {FragmentExpandoItem} value
         */
        set expando(value) {
            this._expando = value;
        }
        /**
         * Gets an event raised when the value of the fragment property changes
         *
         * @returns {LatteEvent}
         */
        get fragmentChanged() {
            if (!this._fragmentChanged) {
                this._fragmentChanged = new latte.LatteEvent(this);
            }
            return this._fragmentChanged;
        }
        /**
         * Gets or sets the fragment configuration info
         *
         * @returns {IFragment}
         */
        get fragmentConfiguration() {
            return this._fragmentConfiguration;
        }
        /**
         * Gets or sets the fragment configuration info
         *
         * @param {IFragment} value
         */
        set fragmentConfiguration(value) {
            // Check if value changed
            let changed = value !== this._fragmentConfiguration;
            // Set value
            this._fragmentConfiguration = value;
            // Trigger changed event
            if (changed) {
                this.onFragmentConfigurationChanged();
            }
        }
        /**
         * Gets or sets the fragment of the adapter
         *
         * @returns {Fragment}
         */
        get fragment() {
            return this._fragment;
        }
        /**
         * Gets or sets the fragment of the adapter
         *
         * @param {Fragment} value
         */
        set fragment(value) {
            // Check if value changed
            let changed = value !== this._fragment;
            // Set value
            this._fragment = value;
            // Trigger changed event
            if (changed) {
                this.onFragmentChanged();
            }
        }
        /**
         * Gets or sets the item of the fragment used to edit fragment contents
         *
         * @returns {Item}
         */
        get editorItem() {
            return this._editorItem;
        }
        /**
         * Gets or sets the item of the fragment used to edit fragment contents
         *
         * @param {Item} value
         */
        set editorItem(value) {
            // Check if value changed
            let changed = value !== this._editorItem;
            // Set value
            this._editorItem = value;
            // Trigger changed event
            if (changed) {
                this.onEditorItemChanged();
            }
        }
        /**
         * Gets or sets unsaved changes.
         *
         * @returns {boolean}
         */
        get unsavedChanges() {
            return this._unsavedChanges;
        }
        /**
         * Gets or sets unsaved changes.
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
    }
    latte.FragmentAdapter = FragmentAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 12/9/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Uploader {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the uploader. Additionally specifies target url.
         */
        constructor(url = null) {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._data = null;
            /**
             * Property field
             */
            this._formData = [];
            /**
             * Property field
             */
            this._progress = 0;
            /**
             * Property field
             */
            this._url = null;
            if (url) {
                this.url = url;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Appends data to the form data
         * @param name
         * @param value
         */
        appendFormData(name, value) {
            this.formData.push({ name: name, value: value });
        }
        /**
         * Starts the upload
         */
        upload() {
            if (!this.url) {
                throw "No URL for upload";
            }
            if (this.formData.length == 0) {
                throw "No data to upload";
            }
            this._uploading = true;
            this._uploadStarted = latte.DateTime.now;
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            // Append form data
            for (var i = 0; i < this.formData.length; i++) {
                formData.append(this.formData[i].name, this.formData[i].value);
            }
            // Get upload object
            var upload = xhr.upload;
            upload.addEventListener('progress', (e) => {
                this._uploadedBytes = e.total;
                this.progress = e.loaded / e.total;
            }, false);
            upload.addEventListener('error', () => {
                this.onError('');
            }, false);
            upload.addEventListener('abort', function () {
                this.onAborted();
            }, false);
            upload.addEventListener('load', function () {
            }, false);
            xhr.onreadystatechange = () => {
                if (xhr.responseText && this.uploading) {
                    this._response = xhr.responseText;
                    // Create message & call to emulate response
                    var m = new latte.Message();
                    var call = new latte.RemoteCall(null, null, null);
                    call.success.add((data) => {
                        this._uploading = false;
                        this._data = data;
                        this.onComplete();
                    });
                    m.calls.push(call);
                    m.dataArrived(xhr.responseText);
                }
            };
            xhr.open('post', this.url, true);
            xhr.send(formData);
        }
        /**
         * Gets an event raised when the upload is aborted
         *
         * @returns {LatteEvent}
         */
        get aborted() {
            if (!this._aborted) {
                this._aborted = new latte.LatteEvent(this);
            }
            return this._aborted;
        }
        /**
         * Raises the <c>aborted</c> event
         */
        onAborted() {
            if (this._aborted) {
                this._aborted.raise();
            }
        }
        /**
         * Gets an event raised when the upload is complete
         *
         * @returns {LatteEvent}
         */
        get complete() {
            if (!this._complete) {
                this._complete = new latte.LatteEvent(this);
            }
            return this._complete;
        }
        /**
         * Raises the <c>complete</c> event
         */
        onComplete() {
            if (this._complete) {
                this._complete.raise();
            }
        }
        /**
         * Gets an event raised when an error occurs
         *
         * @returns {LatteEvent}
         */
        get error() {
            if (!this._error) {
                this._error = new latte.LatteEvent(this);
            }
            return this._error;
        }
        /**
         * Raises the <c>error</c> event
         */
        onError(message) {
            if (this._error) {
                this._error.raise(message);
            }
        }
        /**
         * Gets an event raised when the value of the progress property changes
         *
         * @returns {LatteEvent}
         */
        get progressChanged() {
            if (!this._progressChanged) {
                this._progressChanged = new latte.LatteEvent(this);
            }
            return this._progressChanged;
        }
        /**
         * Raises the <c>progress</c> event
         */
        onProgressChanged() {
            if (this._progressChanged) {
                this._progressChanged.raise();
            }
        }
        /**
         * Gets or sets the data result of the upload post
         *
         * @returns {any}
         */
        get data() {
            return this._data;
        }
        /**
         * Gets the form data
         *
         * @returns {Array<{name: string; value: string}>}
         */
        get formData() {
            return this._formData;
        }
        /**
         * Gets the current speed of upload. Zero if any
         *
         * @returns {string}
         */
        get currentUploadBytesPerSecond() {
            return this.uploadedBytes / latte.DateTime.now.subtractDate(this.uploadStarted).totalSeconds;
        }
        /**
         * Gets or sets the progress of the upload (0 to 1)
         *
         * @returns {number}
         */
        get progress() {
            return this._progress;
        }
        /**
         * Gets or sets the progress of the upload (0 to 1)
         *
         * @param {number} value
         */
        set progress(value) {
            // Check if value changed
            var changed = value !== this._progress;
            // Set value
            this._progress = value;
            // Trigger changed event
            if (changed) {
                this.onProgressChanged();
            }
        }
        /**
         * Gets the raw response from server
         *
         * @returns {string}
         */
        get response() {
            return this._response;
        }
        /**
         * Gets a value indicating if upload is in progress
         *
         * @returns {boolean}
         */
        get uploading() {
            return this._uploading;
        }
        /**
         * Gets the amount of uploaded bytes
         *
         * @returns {number}
         */
        get uploadedBytes() {
            return this._uploadedBytes;
        }
        /**
         * Gets a value indicating the time when upload started
         *
         * @returns {DateTime}
         */
        get uploadStarted() {
            return this._uploadStarted;
        }
        /**
         * Gets or sets the url to post upload
         *
         * @returns {string}
         */
        get url() {
            return this._url;
        }
        /**
         * Gets or sets the url to post upload
         *
         * @param {string} value
         */
        set url(value) {
            this._url = value;
        }
    }
    latte.Uploader = Uploader;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/14/16.
 */
var latte;
(function (latte) {
    /**
     * Folder of global settings
     */
    class GlobalSettingsExplorer extends latte.ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the item
         */
        constructor() {
            super();
            this.loadsChildrenFolders = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         * @returns {latte.ColumnHeader[]}
         */
        getColumnHeaders() {
            return [new latte.ColumnHeader(strings.name)];
        }
        /**
         * Gets the loader of children items
         *
         * @Override
         */
        getChildrenLoader() {
            return latte.Setting.getGlobalConfigurableSettings().withHandlers((sets) => {
                for (let i in sets) {
                    sets[i].name = i;
                    this.children.add(new latte.GlobalSettingExplorer(sets[i], latte.LinearIcon[sets[i]['icon']] || latte.LinearIcon.cog));
                }
            });
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return strings.settings;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.cog;
        }
    }
    latte.GlobalSettingsExplorer = GlobalSettingsExplorer;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    class UaEvents {
        //region Static Methods
        /**
         * Raises the <c>initializedExplorer</c> event
         */
        static onInitializedExplorer(cmsExplorer) {
            if (this._initializedExplorer) {
                this._initializedExplorer.raise(cmsExplorer);
            }
        }
        /**
         * Raises the <c>initializingExplorer</c> event
         */
        static onInitializingExplorer(cmsExplorer) {
            if (this._initializingExplorer) {
                this._initializingExplorer.raise(cmsExplorer);
            }
        }
        /**
         * Gets an event raised when the explorer is being initialized
         *
         * @returns {LatteEvent}
         */
        static get initializingExplorer() {
            if (!this._initializingExplorer) {
                this._initializingExplorer = new latte.LatteEvent(this);
            }
            return this._initializingExplorer;
        }
        /**
         * Gets an event raised when the explorer has been initialized
         *
         * @returns {LatteEvent}
         */
        static get initializedExplorer() {
            if (!this._initializedExplorer) {
                this._initializedExplorer = new latte.LatteEvent(this);
            }
            return this._initializedExplorer;
        }
    }
    latte.UaEvents = UaEvents;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/16/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class GlobalSettingExplorer extends latte.ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the setting
         */
        constructor(globalSetting, icon = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._globalSetting = null;
            /**
             * Property field
             */
            this._settingName = null;
            /**
             * Property field
             */
            this._settingIcon = null;
            this.globalSetting = globalSetting;
            this.settingName = globalSetting.name;
            if (icon) {
                this.settingIcon = icon;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return this.settingName;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return this.settingIcon || latte.LinearIcon.cog;
        }
        /**
         * Gets the detail view of the item
         * @Override
         */
        getDetailView() {
            return new latte.GlobalSettingView(this.globalSetting);
        }
        /**
         * Raises the <c>globalSetting</c> event
         */
        onGlobalSettingChanged() {
            if (this._globalSettingChanged) {
                this._globalSettingChanged.raise();
            }
        }
        /**
         * Gets an event raised when the value of the globalSetting property changes
         *
         * @returns {LatteEvent}
         */
        get globalSettingChanged() {
            if (!this._globalSettingChanged) {
                this._globalSettingChanged = new latte.LatteEvent(this);
            }
            return this._globalSettingChanged;
        }
        /**
         * Gets or sets the global setting item
         *
         * @returns {IGlobalConfigSetting}
         */
        get globalSetting() {
            return this._globalSetting;
        }
        /**
         * Gets or sets the global setting item
         *
         * @param {IGlobalConfigSetting} value
         */
        set globalSetting(value) {
            // Check if value changed
            let changed = value !== this._globalSetting;
            // Set value
            this._globalSetting = value;
            // Trigger changed event
            if (changed) {
                this.onGlobalSettingChanged();
            }
        }
        /**
         * Gets or sets the name of the setting
         *
         * @returns {string}
         */
        get settingName() {
            return this._settingName;
        }
        /**
         * Gets or sets the name of the setting
         *
         * @param {string} value
         */
        set settingName(value) {
            this._settingName = value;
        }
        /**
         * Gets or sets the settings icon
         *
         * @returns {IconItem}
         */
        get settingIcon() {
            return this._settingIcon;
        }
        /**
         * Gets or sets the settings icon
         *
         * @param {IconItem} value
         */
        set settingIcon(value) {
            this._settingIcon = value;
        }
    }
    latte.GlobalSettingExplorer = GlobalSettingExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/5/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class GroupExplorer extends latte.ExplorerItemDataRecord {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(r = null) {
            super();
            this.loadsChildrenFolders = false;
            this.loadsChildren = false;
            if (r) {
                this.record = r;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the loader of children items
         *
         * @Override
         */
        getChildrenLoader() {
            return latte.GroupUser.byGroup(this.record.idgroup).withHandlers((records) => {
                for (let i in records) {
                    this.children.add(new latte.GroupUserExplorer(records[i]));
                }
            });
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return this.record.name;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.bookmark;
        }
        /**
         * Gets the items (actions) of the item
         * @Override
         */
        getItems() {
            return [
                new latte.ButtonItem(strings.addUserToGroup, latte.LinearIcon.book, () => {
                    var r = new latte.GroupUser();
                    r.idgroup = this.record.idgroup;
                    latte.DataRecordDialogView.editRecord(r, () => this.onChildrenChanged(), strings.addUserToGroup);
                })
            ];
        }
    }
    latte.GroupExplorer = GroupExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/5/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class GroupUserExplorer extends latte.ExplorerItemDataRecord {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(r = null) {
            super();
            if (r) {
                this.record = r;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the columns of the item
         * @Override
         */
        getColumns() {
            return ['userName', 'userAttributes'];
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return (this.record.user || new latte.User()).toString();
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.user;
        }
    }
    latte.GroupUserExplorer = GroupUserExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/14/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Main {
        //endregion
        //region Fields
        //endregion
        /**
         * Boots the script
         */
        constructor() {
            console.log('%cF R %cΔ %cG M E N T', 'letter-spacing: 10px; font-size: 20px; color: #000; text-shadow: 0px 3px 3px rgba(0,0,0,0.2); font-family:"Avenir Next","Myriad",sans-serif;', 'letter-spacing: 10px; font-size: 20px; color: #ff4d4d; text-shadow: 0px 0px 7px rgba(255,66,66,0.5); font-family:"Avenir Next","Myriad",sans-serif;', 'letter-spacing: 10px; font-size: 20px; color: #000; text-shadow: 0px 3px 3px rgba(0,0,0,0.2); font-family:"Avenir Next","Myriad",sans-serif;');
            console.log('http://github.com/menendezpoo/Fragment');
            // _latteUrl('/fragment/latte');
            latte.FragmentAdapterManager.register('text', 'PlainTextFragmentAdapter');
            latte.FragmentAdapterManager.register('html', 'HtmlFragmentAdapter');
            latte.FragmentAdapterManager.register('gallery', 'ImageGalleryFragmentAdapter');
            latte.FragmentAdapterManager.register('image', 'ImageFragmentAdapter');
            if (window['fragmentNoDbConnection']) {
                Main.goInstllWizard();
            }
            else {
                if (window['loggedFragmentUser']) {
                    latte.User.me = latte.DataRecord.fromServerObject(window['loggedFragmentUser']);
                    if (window.location.hash.indexOf('#/Editor/') === 0) {
                        Main.goEditorView(window.location.hash.substr(9));
                    }
                    else {
                        Main.goMainView();
                    }
                }
                else {
                    Main.goSignInView();
                }
            }
        }
        //region Static
        /**
         * Goes to the editor view
         * @param guid
         */
        static goEditorView(guid) {
            latte.Page.byUrlQ(guid).send((p) => {
                latte.Element.body.clear();
                latte.View.mainView = new latte.PageEditorView(p);
            });
        }
        /**
         * Goes to the install wizard
         */
        static goInstllWizard() {
            latte.Element.body.clear();
            latte.View.mainView = new latte.InstallWizardView();
        }
        /**
         * Goes to the main view
         */
        static goMainView() {
            latte.Element.body.clear();
            latte.View.mainView = new latte.CmsMainView();
        }
        /**
         * Goes to the sign in view
         */
        static goSignInView() {
            latte.Element.body.clear();
            let v = new latte.SignInView();
            document.body.appendChild(v.element);
        }
        /**
         * Logs the user out
         */
        static logOut() {
            latte.View.mainView = null;
            latte.Session.logOut().send(() => {
                document.location.reload();
            });
        }
    }
    latte.Main = Main;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/5/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class GroupsExplorer extends latte.ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the loader of children items
         *
         * @Override
         */
        getChildrenLoader() {
            return latte.Group.catalog().withHandlers((records) => {
                for (let i in records) {
                    this.children.add(new latte.GroupExplorer(records[i]));
                }
            });
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return strings.groups;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.book;
        }
        /**
         * Gets the items (actions) of the item
         * @Override
         */
        getItems() {
            return [
                new latte.ButtonItem(strings.newGroup, latte.LinearIcon.bookmark, () => {
                    var r = new latte.Group();
                    latte.DataRecordDialogView.editRecord(r, () => this.onChildrenChanged(), strings.newGroup);
                })
            ];
        }
    }
    latte.GroupsExplorer = GroupsExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/14/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageExplorer extends latte.ExplorerItemDataRecord {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the Item
         */
        constructor(r) {
            super();
            this.record = r;
            this.loadsChildrenFolders = r.configuration.childrenMayHaveChildren;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the loader of children items
         * @Override
         */
        getChildrenLoader() {
            return this.record.getPages(this.childrenPage).withHandlers((result) => {
                for (let i in result.records) {
                    this.children.add(new PageExplorer(result.records[i]));
                    this.childrenPage = result.page;
                    this.childrenPages = result.pages;
                }
            });
        }
        /**
         * Override
         */
        getColumnHeaders() {
            return [
                new latte.ColumnHeader(strings.title, 150),
                new latte.ColumnHeader(strings.pageKey),
                new latte.ColumnHeader(strings.guid)
            ];
        }
        /**
         * Gets the columns of the item
         * @Override
         */
        getColumns() {
            return ['title', 'key', 'guid'];
        }
        /**
         * Gets the width of columns
         * @Override
         */
        getColumnWithFor(name) {
            if (name == "title") {
                return 250;
            }
            return super.getColumnWithFor(name);
        }
        /**
         * Gets the detail view of the item
         * @Override
         */
        getDetailView() {
            return new latte.PageSidebar(this);
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return this.record.title;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            let icon = latte.LinearIcon.file_empty;
            if (!this.record.isOnline) {
                icon.css('opacity', 0.2);
            }
            return icon;
        }
        /**
         * Gets the items (actions) of the item
         * @Override
         */
        getItems() {
            let items = [];
            if (this.record.canIInsertChild) {
                items.push(new latte.ButtonItem(strings.newPage, latte.LinearIcon.file_add, () => {
                    let p = new latte.Page();
                    p.idparent = this.record.idpage;
                    latte.DataRecordDialogView.editRecord(p, () => this.onChildrenChanged(), strings.newPage);
                }));
            }
            return items;
        }
    }
    latte.PageExplorer = PageExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/5/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class UserExplorer extends latte.ExplorerItemDataRecord {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(r) {
            super();
            if (r) {
                this.record = r;
            }
            this.loadsChildren = false;
        }
        //region Private Methods
        changePassword() {
            let fields = {
                old: {
                    text: strings.oldPassword,
                    type: 'password'
                },
                choose: {
                    text: strings.newPassword,
                    type: 'password',
                    hint: strings.passwordRules
                },
                confirm: {
                    text: strings.confirmNewPassword,
                    type: 'password'
                }
            };
            if (latte.User.me.isRoot) {
                delete fields['old'];
            }
            latte.DialogView.input(strings.changePassword, fields, (values, inputs) => {
                inputs['choose'].valid = String(values['choose']).length >= 5;
                if (values['choose'] != values['confirm']) {
                    inputs['confirm'].valid = false;
                    inputs['confirm'].setHint(strings.passwordsDontMatch);
                }
                else {
                    inputs['confirm'].valid = true;
                    inputs['confirm'].hintItem = null;
                }
                if (!latte.User.me.isRoot) {
                    return (callback) => {
                        this.record.passwordCorrect(values['old']).send((result) => {
                            inputs['old'].valid = result;
                            inputs['old'].setHint(result ? null : strings.currentPasswordNotValid);
                            callback();
                        });
                    };
                }
            }, (values) => {
                this.record.changePassword(values['old'] || '', values['choose']).send(() => {
                    latte.DialogView.inform(strings.passwordChangeSuccess).addOkButton();
                });
            });
        }
        //endregion
        //region Methods
        /**
        * Gets the columns of the item
        * @Override
        */
        getColumns() {
            return ['uname', 'flags'];
        }
        /**
         * Gets the detail view of the item
         * @Override
         */
        getDetailView() {
            let v = super.getDetailView();
            v.items.add(this.btnChangePassword);
            return v;
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return this.record.uname;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.user;
        }
        /**
         * Gets the change password button
         *
         * @returns {ButtonItem}
         */
        get btnChangePassword() {
            if (!this._btnChangePassword) {
                this._btnChangePassword = new latte.ButtonItem(strings.changePassword);
                this._btnChangePassword.addClass('action-button');
                this._btnChangePassword.click.add(() => this.changePassword());
            }
            return this._btnChangePassword;
        }
    }
    latte.UserExplorer = UserExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/14/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PagesExplorer extends latte.ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the loader of children items
         * @Override
         */
        getChildrenLoader() {
            return latte.Page.rootPages().withHandlers((records) => {
                for (let i in records) {
                    this.children.add(new latte.PageExplorer(records[i]));
                }
            });
        }
        /**
         * Override
         */
        getColumnHeaders() {
            return [
                new latte.ColumnHeader(strings.title, 150),
                new latte.ColumnHeader(strings.pageKey),
                new latte.ColumnHeader(strings.guid)
            ];
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return strings.pages;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.home;
            // return IconItem.folderIcon()
        }
        /**
         * Gets the items (actions) of the item
         * @Override
         */
        getItems() {
            let items = [];
            if (latte.User.me.isRoot) {
                items.push(new latte.ButtonItem(strings.newRootPage, latte.LinearIcon.file_add, () => {
                    var p = new latte.Page();
                    latte.DataRecordDialogView.editRecord(p, () => this.onChildrenChanged(), strings.newPage);
                }));
            }
            return items;
        }
    }
    latte.PagesExplorer = PagesExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/5/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class UsersExplorer extends latte.ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            // this.loadsChildrenFolders = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         * @returns {latte.ColumnHeader[]}
         */
        getColumnHeaders() {
            return [
                new latte.ColumnHeader(strings.name),
                new latte.ColumnHeader(strings.detail)
            ];
        }
        /**
         * Gets the loader of children items
         *
         * @Override
         */
        getChildrenLoader() {
            return latte.User.catalog().withHandlers((records) => {
                // Add Groups Explorer
                this.children.add(new latte.GroupsExplorer());
                // Add Users
                this.children.addArray(records.map(r => new latte.UserExplorer(r)));
            });
        }
        /**
         * Gets the name of the item
         * @Override
         */
        getName() {
            return strings.users;
        }
        /**
         * Gets the icon of the item
         * @Override
         */
        getIcon() {
            return latte.LinearIcon.users;
        }
        /**
         * Gets the items (actions) of the item
         * @Override
         */
        getItems() {
            return [
                new latte.ButtonItem(strings.newUser, latte.LinearIcon.user, () => {
                    var r = new latte.User();
                    latte.DataRecordDialogView.editRecord(r, () => this.onChildrenChanged(), strings.newUser);
                })
            ];
        }
    }
    latte.UsersExplorer = UsersExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/28/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FileReplacer extends latte.Uploader {
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
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._base64 = null;
            /**
             * Property field
             */
            this._description = null;
            /**
             * Property field
             */
            this._height = null;
            /**
             * Property field
             */
            this._id = null;
            /**
             * Property field
             */
            this._key = null;
            /**
             * Property field
             */
            this._width = null;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onComplete() {
            var data = this.data;
            if (latte._isArray(data) && data.length > 0 && data[0]) {
                this._fileRecord = (data[0]);
            }
            else {
                latte.log("Error uploading file: " + this.response);
            }
            super.onComplete();
        }
        /**
         * Uploads the specified DetailView file
         **/
        upload() {
            // Set url
            this.url = latte._latteUrl() + '/releases/fragment/support/actions/file_replace64.php';
            // Add file params
            this.appendFormData('id', this.id);
            if (this.width != null)
                this.appendFormData('width', this.width);
            if (this.height != null)
                this.appendFormData('height', this.height);
            if (this.description != null)
                this.appendFormData('description', this.description);
            if (this.key != null)
                this.appendFormData('key', this.key);
            if (this.base64) {
                this.appendFormData('data', this.base64);
            }
            super.upload();
        }
        /**
         * Gets or sets the base64 data to upload, if any
         *
         * @returns {string}
         */
        get base64() {
            return this._base64;
        }
        /**
         * Gets or sets the base64 data to upload, if any
         *
         * @param {string} value
         */
        set base64(value) {
            this._base64 = value;
        }
        /**
         * Gets or sets the description of the file
         *
         * @returns {string}
         */
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the description of the file
         *
         * @param {string} value
         */
        set description(value) {
            this._description = value;
        }
        /**
         * Gets the file record result of replacement
         *
         * @returns {File}
         */
        get fileRecord() {
            return this._fileRecord;
        }
        /**
         * Gets or sets the height of the image (if image)
         *
         * @returns {number}
         */
        get height() {
            return this._height;
        }
        /**
         * Gets or sets the height of the image (if image)
         *
         * @param {number} value
         */
        set height(value) {
            this._height = value;
        }
        /**
         * Gets or sets the id of the file to replace
         *
         * @returns {string}
         */
        get id() {
            return this._id;
        }
        /**
         * Gets or sets the id of the file to replace
         *
         * @param {string} value
         */
        set id(value) {
            this._id = value;
        }
        /**
         * Gets or sets the key of the file to replace
         *
         * @returns {string}
         */
        get key() {
            return this._key;
        }
        /**
         * Gets or sets the key of the file to replace
         *
         * @param {string} value
         */
        set key(value) {
            this._key = value;
        }
        /**
         * Gets or sets the width of the image (if image)
         *
         * @returns {number}
         */
        get width() {
            return this._width;
        }
        /**
         * Gets or sets the width of the image (if image)
         *
         * @param {number} value
         */
        set width(value) {
            this._width = value;
        }
    }
    latte.FileReplacer = FileReplacer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/24/14.
 */
var latte;
(function (latte) {
    /**
     * Uploads a file to the server, linking it to an object.
     * To upload a file as base46 mode, use static fromBase64
     */
    class FileUploader extends latte.Uploader {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the file uploader
         */
        constructor(file, recordName, recordId) {
            super();
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._base64 = null;
            /**
             * Property field
             */
            this._base64FileName = null;
            /**
             * Property field
             */
            this._description = null;
            /**
             * Property field
             */
            this._fileLocal = null;
            /**
             * Property field
             */
            this._height = null;
            /**
             * Property field
             */
            this._idparent = null;
            /**
             * Property field
             */
            this._key = null;
            /**
             * Property field
             */
            this._width = null;
            this._fileLocal = file;
            this._recordName = recordName;
            this._recordId = String(recordId);
        }
        //region Static
        /**
         * Creates a FileUploader object from base64 encoded data
         * @param base64
         * @param fileName
         * @param recordName
         * @param recordId
         * @returns {latte.FileUploader}
         */
        static fromBase64(base64, fileName, recordName, recordId) {
            var f = new FileUploader(null, recordName, recordId);
            f.base64 = base64;
            f.base64FileName = fileName;
            return f;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onComplete() {
            var data = this.data;
            if (latte._isArray(data) && data.length > 0 && data[0]) {
                this._fileRecord = (data[0]);
            }
            else {
                latte.log("Error uploading file: " + this.response);
            }
            super.onComplete();
        }
        /**
         * Uploads the specified DetailView file
         **/
        upload() {
            // Set url
            this.url = latte._latteUrl() + '/releases/fragment/support/actions/file_'
                + (this.base64 ? 'upload64' : 'upload') + '.php';
            // Add file params
            this.appendFormData('name', this.recordName);
            this.appendFormData('id', this.recordId);
            if (this.idparent != null)
                this.appendFormData('idparent', this.idparent);
            if (this.width != null)
                this.appendFormData('width', this.width);
            if (this.height != null)
                this.appendFormData('height', this.height);
            if (this.description != null)
                this.appendFormData('description', this.description);
            if (this.key != null)
                this.appendFormData('key', this.key);
            if (this.base64) {
                this.appendFormData('data', this.base64);
                this.appendFormData('filename', this.base64FileName);
            }
            else {
                this.appendFormData('file', this.fileLocal);
            }
            super.upload();
        }
        /**
         * Gets or sets the base64 data to upload, if any
         *
         * @returns {string}
         */
        get base64() {
            return this._base64;
        }
        /**
         * Gets or sets the base64 data to upload, if any
         *
         * @param {string} value
         */
        set base64(value) {
            this._base64 = value;
        }
        /**
         * Gets or sets the file name when uploading base64 data
         *
         * @returns {string}
         */
        get base64FileName() {
            return this._base64FileName;
        }
        /**
         * Gets or sets the file name when uploading base64 data
         *
         * @param {string} value
         */
        set base64FileName(value) {
            this._base64FileName = value;
        }
        /**
         * Gets or sets the description of the file to upload
         *
         * @returns {string}
         */
        get description() {
            return this._description;
        }
        /**
         * Gets or sets the description of the file to upload
         *
         * @param {string} value
         */
        set description(value) {
            this._description = value;
        }
        /**
         * Gets the local file object
         *
         * @returns {File}
         */
        get fileLocal() {
            return this._fileLocal;
        }
        /**
         * Gets the result file
         *
         * @returns {File}
         */
        get fileRecord() {
            return this._fileRecord;
        }
        /**
         * Gets or sets the height of the file if is image
         *
         * @returns {number}
         */
        get height() {
            return this._height;
        }
        /**
         * Gets or sets the height of the file if is image
         *
         * @param {number} value
         */
        set height(value) {
            this._height = value;
        }
        /**
         * Gets or sets the id of the parent file to make this file a thumbnail
         *
         * @returns {number}
         */
        get idparent() {
            return this._idparent;
        }
        /**
         * Gets or sets the id of the parent file to make this file a thumbnail
         *
         * @param {number} value
         */
        set idparent(value) {
            this._idparent = value;
        }
        /**
         * Gets or sets the key of the file
         *
         * @returns {string}
         */
        get key() {
            return this._key;
        }
        /**
         * Gets or sets the key of the file
         *
         * @param {string} value
         */
        set key(value) {
            this._key = value;
        }
        /**
         * Gets the id of record
         *
         * @returns {string}
         */
        get recordId() {
            return this._recordId;
        }
        /**
         * Gets the name of the record
         *
         * @returns {string}
         */
        get recordName() {
            return this._recordName;
        }
        /**
         * Gets or sets the width of the file if is image
         *
         * @returns {number}
         */
        get width() {
            return this._width;
        }
        /**
         * Gets or sets the width of the file if is image
         *
         * @param {number} value
         */
        set width(value) {
            this._width = value;
        }
    }
    latte.FileUploader = FileUploader;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FragmentAdapterManager {
        /**
         * Gets the adapter for the supported type
         *
         * @param type
         * @returns {any|null}
         */
        static byType(type) {
            return FragmentAdapterManager._adapters[type] ? new latte[FragmentAdapterManager._adapters[type]] : null;
        }
        /**
         * Gets the list of loaded plugins
         *
         * @returns {Plugin[]}
         */
        static getLoadedAdapters() {
            var r = [];
            for (let i in FragmentAdapterManager._adapters) {
                r.push(FragmentAdapterManager._adapters[i]);
            }
            return r;
        }
        /**
         * Returns a value indicating if the specified type is supported by the manager
         *
         * @param type
         * @returns {boolean}
         */
        static isSupported(type) {
            return !!FragmentAdapterManager._adapters[type];
        }
        /**
         * Loads the specified plugin. If the plugin is already loaded, it will ignore it.
         * @param p
         */
        static register(type, className) {
            FragmentAdapterManager._adapters[type] = className;
        }
        /**
         * Unloads the specified plugin. Ignored if plugin wasn't loaded
         *
         * @param f
         */
        static unregister(type) {
            if (FragmentAdapterManager._adapters[type]) {
                delete FragmentAdapterManager._adapters[type];
            }
        }
    }
    //region Static
    FragmentAdapterManager._adapters = {};
    latte.FragmentAdapterManager = FragmentAdapterManager;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/27/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ImageLoader {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(src) {
            /**
             * Property field
             */
            this._progress = 0;
            this._src = src;
        }
        //region Private Methods
        /**
         * Starts the load
         */
        start() {
            let x = new XMLHttpRequest();
            x.open('GET', this.src, true);
            x.responseType = 'arraybuffer';
            x.onload = () => {
                let b = new Blob([x.response]);
                this._resultBytes = b.size;
                this._resultSrc = window.URL.createObjectURL(b);
                this.onEnded();
            };
            x.onprogress = (e) => {
                this.progress = e.loaded / e.total;
            };
            x.onloadstart = () => {
                this.onStarted();
            };
            x.send();
        }
        //endregion
        //region Methods
        /**
         * Raises the <c>ended</c> event
         */
        onEnded() {
            this._hasEnded = true;
            if (this._ended) {
                this._ended.raise();
            }
        }
        /**
         * Raises the <c>progress</c> event
         */
        onProgressChanged() {
            if (this._progressChanged) {
                this._progressChanged.raise();
            }
        }
        /**
         * Raises the <c>started</c> event
         */
        onStarted() {
            this._hasStarted = true;
            if (this._started) {
                this._started.raise();
            }
        }
        /**
         * Gets an event raised when the load has ended
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
         * Gets an event raised when the value of the progress property changes
         *
         * @returns {LatteEvent}
         */
        get progressChanged() {
            if (!this._progressChanged) {
                this._progressChanged = new latte.LatteEvent(this);
            }
            return this._progressChanged;
        }
        /**
         * Gets an event raised when the load has started
         *
         * @returns {LatteEvent}
         */
        get started() {
            if (!this._started) {
                this._started = new latte.LatteEvent(this);
            }
            return this._started;
        }
        /**
         * Gets a value indicating if the load has started
         *
         * @returns {boolean}
         */
        get hasStarted() {
            return this._hasStarted;
        }
        /**
         * Gets a value indicating if the load has ended
         *
         * @returns {boolean}
         */
        get hasEnded() {
            return this._hasEnded;
        }
        /**
         * Gets or sets the progress of the load
         *
         * @returns {number}
         */
        get progress() {
            return this._progress;
        }
        /**
         * Gets or sets the progress of the load
         *
         * @param {number} value
         */
        set progress(value) {
            // Check if value changed
            let changed = value !== this._progress;
            // Set value
            this._progress = value;
            // Trigger changed event
            if (changed) {
                this.onProgressChanged();
            }
        }
        /**
         * Gets the number of bytes
         *
         * @returns {number}
         */
        get resultBytes() {
            return this._resultBytes;
        }
        /**
         * Gets the result image
         *
         * @returns {HTMLImageElement}
         */
        get resultImage() {
            if (!this._resultImage) {
                this._resultImage = document.createElement('img');
                this._resultImage.src = this.resultSrc;
            }
            return this._resultImage;
        }
        /**
         * Gets the result source
         *
         * @returns {string}
         */
        get resultSrc() {
            return this._resultSrc;
        }
        /**
         * Gets the src of the image to load
         *
         * @returns {string}
         */
        get src() {
            return this._src;
        }
    }
    latte.ImageLoader = ImageLoader;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 4/29/15.
 */
var latte;
(function (latte) {
    (function (ImageFit) {
        ImageFit[ImageFit["AspectFit"] = 0] = "AspectFit";
        ImageFit[ImageFit["AspectFill"] = 1] = "AspectFill";
        ImageFit[ImageFit["AspectFillNear"] = 2] = "AspectFillNear";
        ImageFit[ImageFit["AspectFillFar"] = 3] = "AspectFillFar";
    })(latte.ImageFit || (latte.ImageFit = {}));
    var ImageFit = latte.ImageFit;
    ;
    /**
     *
     */
    class ImageUtil {
        /**
         * Returns the amount of bytes on the specified string
         * @param base64
         * @returns {number}
         */
        static base64ByteSize(base64) {
            return atob(base64).length;
        }
        /**
         * Parses ImageFit from specified string
         * @param fit
         * @returns {any}
         */
        static imageFitFromString(fit) {
            if (fit == 'aspect-fit') {
                return ImageFit.AspectFit;
            }
            else if (fit == 'aspect-fill') {
                return ImageFit.AspectFill;
            }
            else if (fit == 'aspect-fill-near') {
                return ImageFit.AspectFillNear;
            }
            else if (fit == 'aspect-fill-far') {
                return ImageFit.AspectFillFar;
            }
            return null;
        }
        /**
         * Creates an icon of the specified file, assuming it's an image file.
         *
         * @param file
         * @param size
         * @param callback
         */
        static createThumbOfFile(file, options, callback = null) {
            ImageUtil.readFileAsDataUrl(file, (dataUrl) => {
                // Create icon
                ImageUtil.createThumbOfUrl(dataUrl, options, (dataUrl) => {
                    // Return result
                    callback(dataUrl);
                });
            });
        }
        /**
         * Creates an icon of the specified image.
         * This algorithm is stored under the name _Steps because it makes n steps
         * to scale down the image. It proved to be ineficient and results unwanted.
         * @param image
         * @param size
         * @returns {string}
         */
        static createThumbOfImage_Steps(image, size) {
            var w = image.width;
            var h = image.height;
            var scale = Math.min(size.width / w, size.height / h);
            var targW = w * scale;
            var steps = Math.ceil(Math.log(w / targW) / Math.log(2)) + 1;
            var stepWidth = Math.round(Math.abs(targW - w) / steps);
            //console.log(w + " X " + h + "-> scale: " + scale + " steps: " + steps + " of " + stepWidth)
            //console.log("Target: " + targW + " x " + targH);
            var oc = document.createElement('canvas'), octx = oc.getContext('2d');
            var curW = w;
            var curH = h;
            var curImg = image;
            for (var i = 0; i < steps; i++) {
                curW -= stepWidth;
                curH = Math.round(curW * h / w);
                //console.log("Step: " + curW + " x " + curH);
                oc.width = curW;
                oc.height = curH;
                octx.drawImage(curImg, 0, 0, curW, curH);
                curImg = document.createElement('img');
                curImg.src = oc.toDataURL();
            }
            //log(sprintf("Scaled image of (%s x %s) asked to (%s x %s) scaled to (%s x %s) scale of %s %s steps of %s",
            //    w, h, size.width, size.height, curImg.width, curImg.height, scale, steps, stepWidth));
            // Capture DataURL
            var result = curImg.src;
            // Free memory
            curImg = null;
            oc = null;
            octx = null;
            return result;
        }
        /**
         * Crops the image with the specified crop bounds.
         * Crop bounds are referenced as dimensions from the edges to the specified property.
         * @param image
         * @param crop
         * @param options
         * @returns {HTMLImageElement|HTMLElement}
         */
        static cropImage(image, crop, options = null) {
            if (!options) {
                options = {};
            }
            crop.top = crop.top || 0;
            crop.left = crop.left || 0;
            crop.right = crop.right || 0;
            crop.bottom = crop.bottom || 0;
            let w = image.naturalWidth;
            let h = image.naturalHeight;
            let neww = w - crop.left - crop.right;
            let newh = h - crop.top - crop.bottom;
            let c = document.createElement('canvas');
            c.width = w - crop.left - crop.right;
            c.height = h - crop.top - crop.bottom;
            let x = c.getContext('2d');
            x.drawImage(image, crop.left, crop.top, neww, newh, 0, 0, neww, newh);
            let img = document.createElement('img');
            img.src = c.toDataURL(options.type || ImageUtil.DEFAULT_TYPE, options.quality || ImageUtil.DEFAULT_QUALITY);
            return img;
        }
        static resizeImage(image, options) {
            let w = image.width;
            let h = image.height;
            let original = new latte.Size(w, h);
            let size = options.size;
            let type = options.type || ImageUtil.DEFAULT_TYPE;
            let quality = options.quality || ImageUtil.DEFAULT_QUALITY;
            let bg = options.background || null;
            let canvas = document.createElement('canvas');
            let cx = canvas.getContext('2d');
            let target;
            let fit = options.fit || ImageFit.AspectFit;
            if (fit == ImageFit.AspectFit) {
                target = original.scaleToFit(size);
            }
            else {
                target = original.scaleToFill(size);
            }
            canvas.width = image.width;
            canvas.height = image.height;
            if (bg instanceof latte.Color) {
                cx.fillStyle = bg.toHexString();
                cx.fillRect(0, 0, w, h);
            }
            cx.drawImage(image, 0, 0, w, h);
            ImageUtil.resample_hermite(canvas, w, h, target.width, target.height);
            // Trim extra edges
            if (fit == ImageFit.AspectFill || fit == ImageFit.AspectFillNear || fit == ImageFit.AspectFillFar) {
                let offsetx = 0;
                let offsety = 0;
                if (target.height > size.height) {
                    if (fit == ImageFit.AspectFill) {
                        offsety = (target.height - size.height) / 2;
                    }
                    else if (fit == ImageFit.AspectFillFar) {
                        offsety = target.height - size.height;
                    }
                }
                if (target.width > size.width) {
                    if (fit == ImageFit.AspectFill) {
                        offsetx = (target.width - size.width) / 2;
                    }
                    else if (fit == ImageFit.AspectFillFar) {
                        offsetx = target.width - size.width;
                    }
                }
                let canvasex = document.createElement('canvas');
                canvasex.width = size.width;
                canvasex.height = size.height;
                let cx = canvasex.getContext('2d');
                cx.drawImage(canvas, offsetx, offsety, size.width, size.height, 0, 0, size.width, size.height);
                canvas = canvasex;
            }
            var result = '';
            // log("Type: " + type);
            if (ImageUtil.mimeTypeCompressable(type)) {
                // log("Quality: " + quality);
                result = canvas.toDataURL(type, quality);
            }
            else {
                result = canvas.toDataURL(type);
            }
            // Explicitly free memory
            canvas = null;
            return result;
        }
        /**
         * Creates a smaller version of the image.
         * @param image
         * @param size
         * @param type Mime type of the image
         * @param quality Quality 0 - 1, if jpg
         */
        static createThumbOfImage(image, options) {
            return ImageUtil.resizeImage(image, options);
            //
            // let w = image.width;
            // let h = image.height;
            // let size = options.size;
            // let type = options.type || "image/png";
            // let quality = options.quality || 0.9;
            // let bg: Color = options.background || null;
            // let canvas: HTMLCanvasElement = document.createElement('canvas');
            // let fit = options.fit || ImageFit.AspectFit;
            // let cx = canvas.getContext('2d');
            // let scale = 0;
            // let targW = 0;
            // let targH = 0;
            //
            // if(fit == ImageFit.AspectFit) {
            //     scale = Math.min(size.width / w, size.height / h);
            //     targW = w * scale;
            //     targH = targW * h / w;
            //
            // }else if(fit == ImageFit.AspectFill) {
            //
            // }
            //
            // // Prepare canvas with original image
            // canvas.width = image.width;
            // canvas.height = image.height;
            //
            // // Draw background
            // if(bg instanceof Color){
            //     cx.fillStyle = bg.toHexString();
            //     cx.fillRect(0, 0, w, h);
            // }
            //
            // // Draw original image
            // cx.drawImage(image, 0, 0, w, h);
            //
            // ImageUtil.resample_hermite(canvas, w, h, targW, targH);
            //
            // var result = '';
            //
            // if(ImageUtil.mimeTypeCompressable(type)){
            //     result = canvas.toDataURL(type, quality);
            // }else {
            //     result = canvas.toDataURL(type);
            // }
            //
            // // Explicitly free memory
            // canvas = null;
            //
            // return result;
        }
        static resample_hermite(canvas, W, H, W2, H2) {
            var time1 = Date.now();
            W2 = Math.round(W2);
            H2 = Math.round(H2);
            var img = canvas.getContext("2d").getImageData(0, 0, W, H);
            var img2 = canvas.getContext("2d").getImageData(0, 0, W2, H2);
            var data = img.data;
            var data2 = img2.data;
            var ratio_w = W / W2;
            var ratio_h = H / H2;
            var ratio_w_half = Math.ceil(ratio_w / 2);
            var ratio_h_half = Math.ceil(ratio_h / 2);
            for (var j = 0; j < H2; j++) {
                for (var i = 0; i < W2; i++) {
                    var x2 = (i + j * W2) * 4;
                    var weight = 0;
                    var weights = 0;
                    var weights_alpha = 0;
                    var gx_r = 0, gx_g = 0, gx_b = 0, gx_a = 0;
                    var center_y = (j + 0.5) * ratio_h;
                    for (var yy = Math.floor(j * ratio_h); yy < (j + 1) * ratio_h; yy++) {
                        var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                        var center_x = (i + 0.5) * ratio_w;
                        var w0 = dy * dy; //pre-calc part of w
                        for (var xx = Math.floor(i * ratio_w); xx < (i + 1) * ratio_w; xx++) {
                            var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                            var w = Math.sqrt(w0 + dx * dx);
                            if (w >= -1 && w <= 1) {
                                //hermite filter
                                weight = 2 * w * w * w - 3 * w * w + 1;
                                if (weight > 0) {
                                    dx = 4 * (xx + yy * W);
                                    //alpha
                                    gx_a += weight * data[dx + 3];
                                    weights_alpha += weight;
                                    //colors
                                    if (data[dx + 3] < 255)
                                        weight = weight * data[dx + 3] / 250;
                                    gx_r += weight * data[dx];
                                    gx_g += weight * data[dx + 1];
                                    gx_b += weight * data[dx + 2];
                                    weights += weight;
                                }
                            }
                        }
                    }
                    data2[x2] = gx_r / weights;
                    data2[x2 + 1] = gx_g / weights;
                    data2[x2 + 2] = gx_b / weights;
                    data2[x2 + 3] = gx_a / weights_alpha;
                }
            }
            // console.log("hermite = "+(Math.round(Date.now() - time1)/1000)+" s");
            canvas.getContext("2d").clearRect(0, 0, Math.max(W, W2), Math.max(H, H2));
            canvas.width = W2;
            canvas.height = H2;
            canvas.getContext("2d").putImageData(img2, 0, 0);
        }
        /**
         * Creates an icon of the specified url image
         *
         * @param url
         * @param size
         * @param type
         * @param quality
         * @param callback
         */
        static createThumbOfUrl(url, options, callback = null) {
            // Create image
            var img = new Image();
            // Handle load
            img.onload = () => {
                // Create icon of image
                callback(ImageUtil.createThumbOfImage(img, options));
            };
            // Start loading image
            img.crossOrigin = '';
            img.src = url;
        }
        /**
         * Gets the base64 data of the specified data url
         * @param dataUrl
         */
        static getBase64(dataUrl) {
            var indicator = 'base64,';
            var index = dataUrl.indexOf(indicator);
            if (index > 0) {
                return dataUrl.substr(index + indicator.length);
            }
            return null;
        }
        /**
         * Reads the file and returns de data as dataUrl in the callback
         * @param url
         * @param callback
         */
        static readFileAsDataUrl(file, callback) {
            // Craete file reader
            var reader = new FileReader();
            // Handle load of file
            reader.onload = (e) => {
                // Gets the data url
                var dataUrl = e.target.result;
                // Callback
                callback(dataUrl);
            };
            // Start reading file
            reader.readAsDataURL(file);
        }
        /**
         * Gets the image encoded as base64 data
         * @param image
         * @returns {string}
         */
        static getImageAsBase64(image) {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var c = canvas.getContext('2d');
            c.drawImage(image, 0, 0);
            return ImageUtil.getBase64(canvas.toDataURL('image/png'));
        }
        /**
         * Gets the mimetype of the specified extension.
         * Pass extension either with or without dot at the first character.
         * @param extension
         */
        static mimeTypeOf(extension) {
            var e = String(extension).toLowerCase().trim();
            if (e.charAt(0) == '.')
                e = e.substr(1);
            switch (e) {
                case "jpg":
                    return "image/jpeg";
                case "jpeg":
                    return "image/jpeg";
                case "gif":
                    return "image/gif";
                case "webp":
                    return "image/webp";
                case "png":
                    return "image/png";
                default:
                    return "image/png";
            }
        }
        /**
         * Returns a value indicating if the specified mimetype is compressabel
         * @param mimeType
         * @returns {boolean}
         */
        static mimeTypeCompressable(mimeType) {
            var m = String(mimeType).toLocaleLowerCase();
            return m == "image/jpg" || m == "image/jpeg" || m == "image/webp";
        }
        /**
         * Returns a value indicating if the specified mimetype is compressabel
         * @param mimeType
         * @returns {boolean}
         */
        static mimeTypeTransparent(mimeType) {
            var m = String(mimeType).toLocaleLowerCase();
            return m == "image/png" || m == "image/gif";
        }
        /**
         * Rotates the image counterclockwise
         * @param image
         * @param options
         * @returns {HTMLImageElement|HTMLElement}
         */
        static rotateCounterClockwise(image, options = null) {
            if (!options) {
                options = {};
            }
            let c = document.createElement('canvas');
            c.width = image.naturalHeight;
            c.height = image.naturalWidth;
            let x = c.getContext('2d');
            x.save();
            x.translate(c.width / 2, c.height / 2);
            x.rotate(-90 * Math.PI / 180);
            x.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
            x.restore();
            let img = document.createElement('img');
            img.src = c.toDataURL(options.type || ImageUtil.DEFAULT_TYPE, options.quality || ImageUtil.DEFAULT_QUALITY);
            return img;
        }
        /**
         * Rotates the image clockwise.
         * @param image
         * @param options
         * @returns {HTMLImageElement|HTMLElement}
         */
        static rotateClockwise(image, options = null) {
            if (!options) {
                options = {};
            }
            let c = document.createElement('canvas');
            c.width = image.naturalHeight;
            c.height = image.naturalWidth;
            let x = c.getContext('2d');
            x.save();
            x.translate(c.width / 2, c.height / 2);
            x.rotate(90 * Math.PI / 180);
            x.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
            x.restore();
            let img = document.createElement('img');
            img.src = c.toDataURL(options.type || ImageUtil.DEFAULT_TYPE, options.quality || ImageUtil.DEFAULT_QUALITY);
            return img;
        }
    }
    //region Static
    ImageUtil.DEFAULT_QUALITY = 0.85;
    ImageUtil.DEFAULT_TYPE = 'image/jpeg';
    latte.ImageUtil = ImageUtil;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     * Manages the plugins of the program
     */
    class PluginManager {
        /**
         * Gets the list of loaded plugins
         *
         * @returns {Plugin[]}
         */
        static getLoadedPlugins() {
            return PluginManager._plugins;
        }
        /**
         * Loads the specified plugin. If the plugin is already loaded, it will ignore it.
         * @param p
         */
        static load(p) {
            PluginManager._plugins.push(p);
            p.onLoad();
        }
        /**
         * Unloads the specified plugin. Ignored if plugin wasn't loaded
         *
         * @param plugin
         */
        static unload(plugin) {
            var r = [];
            for (let i in PluginManager._plugins) {
                let p = PluginManager._plugins[i];
                if (p == plugin) {
                    p.onUnload();
                }
                else {
                    r.push(p);
                }
            }
            PluginManager._plugins = r;
        }
    }
    latte.PluginManager = PluginManager;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    latte.defaultPageConfigurationFragment = {
        body: {
            name: "strings.body"
        }
    };
    /**
     * Helps manage the configuration of a page.
     */
    class PageConfiguration {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the configuration helper
         */
        constructor(r, pack = null) {
            /**
             * Property field
             */
            this._pack = null;
            /**
             * Property field
             */
            this._page = null;
            if (pack) {
                this.pack = pack;
            }
            this.page = r;
        }
        //region Static
        /**
         * Creates an input for the setting
         * @param setting
         */
        static inputFromSetting(setting) {
            let input = new latte.InputItem(setting.name, setting.type || 'string', setting.defaultValue);
            if (setting.options) {
                input.options = setting.options;
            }
            return input;
        }
        /**
         * Parses configuration
         * @param configuration
         */
        static parseConfiguration(configuration) {
            let r = {};
            if (configuration) {
                try {
                    r = JSON.parse(configuration);
                }
                catch (e) {
                    r = {};
                }
            }
            return r;
        }
        /**
         * Resolves a string in configuration
         * @param s
         * @returns {any}
         */
        static resolveString(s) {
            if (s.indexOf('strings.') === 0) {
                return strings[s.substr(8)];
            }
            return s;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>pack</c> event
         */
        onPackChanged() {
            if (this._packChanged) {
                this._packChanged.raise();
            }
            this._parentConfig = {};
            this._pageConfig = {};
            this._hasParentConfiguration = false;
            if (this.pack) {
                this._hasParentConfiguration = true;
                this._parentConfig = PageConfiguration.parseConfiguration(this.pack.parentConfig);
                this._pageConfig = PageConfiguration.parseConfiguration(this.pack.config);
                this._settingsValues = {};
                for (let i in this.pack.settings) {
                    let s = this.pack.settings[i];
                    this.settingsValues[s.name] = s;
                }
            }
        }
        /**
         * Raises the <c>page</c> event
         */
        onPageChanged() {
            if (this._pageChanged) {
                this._pageChanged.raise();
            }
            this._pageConfig = {};
            if (this.page.configurationSetting) {
                this._pageConfig = PageConfiguration.parseConfiguration(this.page.configurationSetting.value);
            }
        }
        /**
         * Reloads the pack.
         * Use this only when you know for sure that the settings of the parent
         * or the page have changed.
         *
         * @param call
         */
        reloadPack(call = null) {
            this.page.getSettingsPack().send((p) => {
                this.pack = p;
                if (call) {
                    call();
                }
            });
        }
        /**
         * Gets an event raised when the value of the pack property changes
         *
         * @returns {LatteEvent}
         */
        get packChanged() {
            if (!this._packChanged) {
                this._packChanged = new latte.LatteEvent(this);
            }
            return this._packChanged;
        }
        /**
         * Gets an event raised when the value of the page property changes
         *
         * @returns {LatteEvent}
         */
        get pageChanged() {
            if (!this._pageChanged) {
                this._pageChanged = new latte.LatteEvent(this);
            }
            return this._pageChanged;
        }
        //endregion
        //region Properties
        /**
         * Gets a value indicating if children of page may have children
         *
         * @returns {boolean}
         */
        get childrenMayHaveChildren() {
            return !(this.pageConfig.children && this.pageConfig.children.mayHaveChildren === false);
        }
        /**
         * Gets the fragments for the page, including parent page criteria
         *
         * @returns {IFragments}
         */
        get fragments() {
            let parents = this.parentConfig.children && this.parentConfig.children.fragments ? this.parentConfig.children.fragments : {};
            let locals = this.pageConfig.fragments ? this.pageConfig.fragments : {};
            let all = latte._merge(parents, locals);
            return latte._empty(all) ? latte.defaultPageConfigurationFragment : all;
        }
        /**
         * Gets a value indicating if the helper has parent configuration.
         * You should call reloadPack in order to load it.
         *
         * @returns {boolean}
         */
        get hasParentConfiguration() {
            return !!this._hasParentConfiguration;
        }
        /**
         * Gets a value indicating if the configuration indicates settings
         *
         * @returns {boolean}
         */
        get hasSettings() {
            return !latte._empty(this.settings);
        }
        /**
         * Gets or sets the settings pack
         *
         * @returns {IPageSettingsPack}
         */
        get pack() {
            return this._pack;
        }
        /**
         * Gets or sets the settings pack
         *
         * @param {IPageSettingsPack} value
         */
        set pack(value) {
            // Check if value changed
            let changed = value !== this._pack;
            // Set value
            this._pack = value;
            // Trigger changed event
            if (changed) {
                this.onPackChanged();
            }
        }
        /**
         * Gets or sets the page of the object
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the page of the object
         *
         * @param {Page} value
         */
        set page(value) {
            // Check if value changed
            let changed = value !== this._page;
            // Set value
            this._page = value;
            // Trigger changed event
            if (changed) {
                this.onPageChanged();
            }
        }
        /**
         * Gets the page configuration
         *
         * @returns {IPageConfiguration}
         */
        get pageConfig() {
            return this._pageConfig;
        }
        /**
         * Gets the parent configuration settings
         *
         * @returns {IPageConfigurationSettings}
         */
        get parentConfig() {
            return this._parentConfig;
        }
        /**
         * Gets the settings for the page, including parent page criteria
         *
         * @returns {IPageConfigurationSettings}
         */
        get settings() {
            return latte._merge(this.parentConfig.children && this.parentConfig.children.settings ? this.parentConfig.children.settings : {}, this.pageConfig.settings ? this.pageConfig.settings : {});
        }
        /**
         * Gets the settings
         *
         * @returns {{[index: string]: Setting}}
         */
        get settingsValues() {
            return this._settingsValues;
        }
    }
    latte.PageConfiguration = PageConfiguration;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class Plugin {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>load</c> event
         */
        onLoad() {
            if (this._load) {
                this._load.raise();
            }
        }
        /**
         * Raises the <c>unload</c> event
         */
        onUnload() {
            if (this._unload) {
                this._unload.raise();
            }
        }
        /**
         * Gets an event raised when the plugin is loaded
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
         * Gets an event raised when the plugin is unloaded
         *
         * @returns {LatteEvent}
         */
        get unload() {
            if (!this._unload) {
                this._unload = new latte.LatteEvent(this);
            }
            return this._unload;
        }
    }
    latte.Plugin = Plugin;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/27/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class HtmlFragmentAdapter extends latte.FragmentAdapter {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override
         */
        getEditorTabs() {
            return [
                this.tabFormat
            ];
        }
        /**
         * Returns the items for the ribbon of the view
         * @returns {Array}
         */
        getEditorTabItems() {
            return this.formatItems;
        }
        /**
         * Override. Raises the <c>createEditorItem</c> event
         */
        onCreateEditorItem() {
            super.onCreateEditorItem();
            this.editorItem = this.htmlEditor;
            this.htmlEditor.value = this.fragment.value || '';
        }
        /**
         * Gets the html editor
         *
         * @returns {HtmlEditorItem}
         */
        get htmlEditor() {
            if (!this._htmlEditor) {
                this._htmlEditor = new latte.HtmlEditorItem();
                this._htmlEditor.toolbar.visible = false;
                this._htmlEditor.focused.add(() => this.onEditorFocus());
                this._htmlEditor.blur.add(() => this.onEditorBlur());
                this._htmlEditor.addClass('html-fragment-adapter');
                this._htmlEditor.valueChanged.add(() => {
                    this.fragment.value = this.htmlEditor.value;
                    this.unsavedChanges = true;
                });
            }
            return this._htmlEditor;
        }
        /**
         * Gets the format tab
         *
         * @returns {TabItem}
         */
        get tabFormat() {
            if (!this._tabFormat) {
                this._tabFormat = new latte.TabItem(strings.format);
            }
            return this._tabFormat;
        }
        /**
         * Gets the format items
         *
         * @returns {Item[]}
         */
        get formatItems() {
            if (!this._formatItems) {
                let btn = (icon, tooltip, cmd) => {
                    let b = new latte.ButtonItem();
                    b.icon = icon;
                    b.tooltip = tooltip;
                    b.click.add(() => this.htmlEditor.execCommand(cmd));
                    b.tab = this.tabFormat;
                    return b;
                };
                let sep = () => {
                    let s = new latte.SeparatorItem();
                    s.tab = this.tabFormat;
                    return s;
                };
                this._formatItems = [
                    btn(latte.LinearIcon.bold, strings.bold, latte.HtmlEditorCommands.BOLD),
                    btn(latte.LinearIcon.italic, strings.italics, latte.HtmlEditorCommands.ITALIC),
                    sep(),
                    btn(latte.LinearIcon.text_align_left, strings.alignLeft, latte.HtmlEditorCommands.JUSTIFY_LEFT),
                    btn(latte.LinearIcon.text_align_center, strings.alignCenter, latte.HtmlEditorCommands.JUSTIFY_CENTER),
                    btn(latte.LinearIcon.text_align_right, strings.alignRight, latte.HtmlEditorCommands.JUSTIFY_RIGHT),
                    btn(latte.LinearIcon.text_align_justify, strings.alignJustify, latte.HtmlEditorCommands.JUSTIFY_FULL),
                    sep(),
                    btn(latte.LinearIcon.indent_increase, strings.indent, latte.HtmlEditorCommands.INDENT),
                    btn(latte.LinearIcon.indent_decrease, strings.outdent, latte.HtmlEditorCommands.OUTDENT),
                    sep(),
                    btn(latte.LinearIcon.menu, strings.numberedList, latte.HtmlEditorCommands.INSERT_ORDERED_LIST),
                    btn(latte.LinearIcon.list, strings.bulletList, latte.HtmlEditorCommands.INSERT_UNORDERED_LIST),
                    sep(),
                    btn(latte.LinearIcon.text_format_remove, strings.eraseFormat, latte.HtmlEditorCommands.CLEAR_FORMAT),
                    sep(),
                    btn(latte.LinearIcon.link, strings.insertLink, latte.HtmlEditorCommands.INSERT_LINK),
                    btn(latte.LinearIcon.picture, strings.insertImage, latte.HtmlEditorCommands.INSERT_IMAGE)
                ];
            }
            return this._formatItems;
        }
    }
    latte.HtmlFragmentAdapter = HtmlFragmentAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/9/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ImageFragmentAdapter extends latte.FragmentAdapter {
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
            this._file = null;
            /**
             * Property field
             */
            this._image = null;
            /**
             * Property field
             */
            this._presentableFile = null;
        }
        //region Private Methods
        /**
         * Uploads the file on the input
         */
        fileInputChanged() {
            if (this.fileInput.element.files.length > 0) {
                this.setSystemFile(this.fileInput.element.files[0]);
            }
        }
        showProgressItem() {
            this.progressItem.visible = true;
        }
        hideProgressItem() {
            this.progressItem.visible = false;
        }
        redoImages() {
            if (this.presentableFile) {
                this.presentableFile.remove(() => {
                    this.generatePresentableImage(this.file, (child) => {
                        this.presentableFile = child;
                        this.serialize();
                    });
                });
            }
        }
        viewOriginal() {
            let editor = latte.ImageEditorView.editImageFile(this.file);
            editor.saved.add(() => {
                this.redoImages();
            });
        }
        viewResultImage() {
            let editor = latte.ImageEditorView.editImageFile(this.presentableFile);
            editor.editable = false;
        }
        //endregion
        //region Methods
        /**
         * Override
         */
        getEditorTabs() {
            let tabs = [];
            tabs.push(this.tabImage);
            return tabs;
        }
        /**
         * Returns the items for the ribbon of the view
         * @returns {Array}
         */
        getEditorTabItems() {
            let items = [this.btnInsertImage];
            if (this.file) {
                items.push(latte.SeparatorItem.withTab(this.tabImage));
                items.push(this.btnViewOriginal);
                items.push(this.btnResultImage);
                items.push(latte.SeparatorItem.withTab(this.tabImage));
                items.push(this.btnRedoImages);
            }
            return items;
        }
        /**
         * Generates the presentable image of the specified file item.
         * @param item
         * @param callback
         */
        generatePresentableImage(file, callback) {
            file.createThumbChild({
                size: this.imageSize,
                fit: latte.ImageUtil.imageFitFromString(this.fragmentConfiguration['image-fit']) || latte.ImageFit.AspectFill
            }, ImageFragmentAdapter.PRESENTABLE_KEY, (child) => callback(child));
        }
        /**
         * Activates the file input
         */
        insertImage() {
            this.fileInput.element.click();
        }
        /**
         * Raises the <c>file</c> event
         */
        onFileChanged() {
            if (this._fileChanged) {
                this._fileChanged.raise();
            }
            let file = this.file;
            if (file) {
                let presentable = file.getChildByKey(ImageFragmentAdapter.PRESENTABLE_KEY);
                let done = (presentable) => {
                    this.presentableFile = presentable;
                    this.serialize();
                };
                if (!presentable) {
                    this.generatePresentableImage(file, (child) => done(child));
                }
                else {
                    done(presentable);
                }
            }
        }
        /**
         * Override.
         */
        onCreateEditorItem() {
            let editor = this.editorItem = new latte.FragmentPlaceholderItem();
            editor.addClass('image-fragment-editor');
            editor.emptyIcon = latte.LinearIcon.picture;
            editor.node.appendChild(this.imageContainer);
            editor.element.append(this.fileInput.element);
            editor.drop.add((e) => {
                if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    this.setSystemFile(e.dataTransfer.files[0]);
                }
            });
            this.unserialize();
        }
        /**
         * Raises the <c>image</c> event
         */
        onImageChanged() {
            if (this._imageChanged) {
                this._imageChanged.raise();
            }
            $(this.imageContainer).empty();
            if (this.image) {
                this.imageContainer.appendChild(this.image);
            }
        }
        /**
         * Raises the <c>presentableFile</c> event
         */
        onPresentableFileChanged() {
            if (this._presentableFileChanged) {
                this._presentableFileChanged.raise();
            }
            let file = this.presentableFile;
            this.onTabsChanged();
            if (file) {
                this.editorItem.emptyIcon = null;
                let loader = new latte.ImageLoader(file.url);
                loader.progressChanged.add(() => this.progressItem.value = loader.progress * 100);
                loader.ended.add(() => {
                    this.image = loader.resultImage;
                });
                loader.start();
            }
        }
        /**
         * Sets the file
         * @param list
         */
        setSystemFile(file) {
            this.showProgressItem();
            // Create uploader
            let uploader = new latte.FileUploader(file, 'Page', this.fragment.idpage);
            // Progress updater
            uploader.progressChanged.add(() => this.progressItem.value = uploader.progress * 100);
            // Handles completion
            uploader.complete.add(() => {
                // Hide progress bar
                this.hideProgressItem();
                // Set the actual file
                this.file = uploader.fileRecord;
            });
            // Upload now
            uploader.upload();
        }
        /**
         * Serializes the presentable image
         */
        serialize() {
            let buffer = document.createElement('div');
            let img = document.createElement('img');
            img.setAttribute('data-guid', this.presentableFile.guid);
            img.setAttribute('data-original-guid', this.file.guid);
            img.src = this.presentableFile.url;
            buffer.appendChild(img);
            // log("Serialized: " + buffer.innerHTML);
            let oldValue = this.fragment.value;
            this.fragment.value = buffer.innerHTML;
            this.unsavedChanges = oldValue != this.fragment.value;
        }
        /**
         * Unserializes the presentable image
         */
        unserialize() {
            let guids = [];
            let buffer = new latte.Element(document.createElement('div'));
            // Eval nodes
            buffer.element.innerHTML = this.fragment.value;
            // Scan nodes
            for (let i in buffer.element.childNodes) {
                let node = buffer.element.childNodes[i];
                if (node.nodeType == 1) {
                    let img = node;
                    let guid = img.getAttribute('data-original-guid');
                    if (guid) {
                        guids.push(guid);
                    }
                }
            }
            // Load files
            latte.File.byGuids(guids.join(',')).send((files) => {
                // Insert Image / Replace Image button text
                this.btnInsertImage.text = files.length > 0 ? strings.replaceImage : strings.insertImage;
                // Set image if present
                if (files.length > 0) {
                    this.file = files[0];
                }
            });
        }
        /**
         * Gets an event raised when the value of the file property changes
         *
         * @returns {LatteEvent}
         */
        get fileChanged() {
            if (!this._fileChanged) {
                this._fileChanged = new latte.LatteEvent(this);
            }
            return this._fileChanged;
        }
        /**
         * Gets an event raised when the value of the image property changes
         *
         * @returns {LatteEvent}
         */
        get imageChanged() {
            if (!this._imageChanged) {
                this._imageChanged = new latte.LatteEvent(this);
            }
            return this._imageChanged;
        }
        /**
         * Gets an event raised when the value of the presentableFile property changes
         *
         * @returns {LatteEvent}
         */
        get presentableFileChanged() {
            if (!this._presentableFileChanged) {
                this._presentableFileChanged = new latte.LatteEvent(this);
            }
            return this._presentableFileChanged;
        }
        /**
         * Gets or sets the file of image
         *
         * @returns {File}
         */
        get file() {
            return this._file;
        }
        /**
         * Gets or sets the file of image
         *
         * @param {File} value
         */
        set file(value) {
            // Check if value changed
            let changed = value !== this._file;
            // Set value
            this._file = value;
            // Trigger changed event
            if (changed) {
                this.onFileChanged();
            }
        }
        /**
         * Gets the file input
         *
         * @returns {Element<HTMLInputElement>}
         */
        get fileInput() {
            if (!this._fileInput) {
                this._fileInput = new latte.Element(document.createElement('input'));
                this._fileInput.element.type = 'file';
                this._fileInput.element.multiple = true;
                this._fileInput.addEventListener('change', () => this.fileInputChanged());
            }
            return this._fileInput;
        }
        /**
         * Gets or sets the presentable image
         *
         * @returns {HTMLImageElement}
         */
        get image() {
            return this._image;
        }
        /**
         * Gets or sets the presentable image
         *
         * @param {HTMLImageElement} value
         */
        set image(value) {
            // Check if value changed
            let changed = value !== this._image;
            // Set value
            this._image = value;
            // Trigger changed event
            if (changed) {
                this.onImageChanged();
            }
        }
        /**
         * Gets the container of the image
         *
         * @returns {HTMLDivElement}
         */
        get imageContainer() {
            if (!this._imageContainer) {
                this._imageContainer = document.createElement('div');
                this._imageContainer.className = 'image-container';
            }
            return this._imageContainer;
        }
        /**
         * Gets the configured image size
         *
         * @returns {Size}
         */
        get imageSize() {
            if (!this._imageSize) {
                this._imageSize = new latte.Size(this.fragmentConfiguration["image-width"] || latte.ImageGalleryFragmentAdapter.defaultImageWidth, this.fragmentConfiguration["image-height"] || latte.ImageGalleryFragmentAdapter.defaultImageHeight);
            }
            return this._imageSize;
        }
        /**
         * Gets or sets the presentable file of the fragment
         *
         * @returns {File}
         */
        get presentableFile() {
            return this._presentableFile;
        }
        /**
         * Gets or sets the presentable file of the fragment
         *
         * @param {File} value
         */
        set presentableFile(value) {
            // Check if value changed
            let changed = value !== this._presentableFile;
            // Set value
            this._presentableFile = value;
            // Trigger changed event
            if (changed) {
                this.onPresentableFileChanged();
            }
        }
        /**
         * Gets the progress item
         *
         * @returns {ProgressItem}
         */
        get progressItem() {
            if (!this._progressItem) {
                this._progressItem = new latte.ProgressItem();
                this._progressItem.visible = false;
                this.editorItem.node.appendChild(this.progressItem.node);
            }
            return this._progressItem;
        }
        /**
         * Gets the inser image button
         *
         * @returns {ButtonItem}
         */
        get btnInsertImage() {
            if (!this._btnInsertImage) {
                this._btnInsertImage = new latte.ButtonItem(strings.insertImage, latte.LinearIcon.picture.go32(), () => this.insertImage());
                this._btnInsertImage.tab = this.tabImage;
            }
            return this._btnInsertImage;
        }
        /**
         * Gets the redo images button
         *
         * @returns {ButtonItem}
         */
        get btnRedoImages() {
            if (!this._btnRedoImages) {
                this._btnRedoImages = new latte.ButtonItem(strings.redoThumb, latte.LinearIcon.sync, () => this.redoImages());
                this._btnRedoImages.tab = this.tabImage;
            }
            return this._btnRedoImages;
        }
        /**
         * Gets the result image
         *
         * @returns {ButtonItem}
         */
        get btnResultImage() {
            if (!this._btnResultImage) {
                this._btnResultImage = new latte.ButtonItem(strings.seeResultImage, latte.LinearIcon.picture, () => this.viewResultImage());
                this._btnResultImage.tab = this.tabImage;
            }
            return this._btnResultImage;
        }
        /**
         * Gets the view original button
         *
         * @returns {ButtonItem}
         */
        get btnViewOriginal() {
            if (!this._btnViewOriginal) {
                this._btnViewOriginal = new latte.ButtonItem(strings.viewOriginal, latte.LinearIcon.file_empty, () => this.viewOriginal());
                this._btnViewOriginal.tab = this.tabImage;
            }
            return this._btnViewOriginal;
        }
        /**
         * Gets the image tab
         *
         * @returns {TabItem}
         */
        get tabImage() {
            if (!this._tabImage) {
                this._tabImage = new latte.TabItem(strings.image);
            }
            return this._tabImage;
        }
    }
    //region Static
    ImageFragmentAdapter.PRESENTABLE_KEY = 'presentable';
    latte.ImageFragmentAdapter = ImageFragmentAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PlainTextFragmentAdapter extends latte.FragmentAdapter {
        constructor(...args) {
            super(...args);
            this.heightCheck = false;
        }
        //region Static
        //endregion
        //region Fields
        //endregion
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override. Raises the <c>createEditorItem</c> event
         */
        onCreateEditorItem() {
            super.onCreateEditorItem();
            this.editorItem = new latte.Item();
            this.editorItem.element.get(0).appendChild(this.textbox.element);
            this.textbox.text = this.fragment.value;
        }
        /**
         * Gets the textbox element
         *
         * @returns {Element<HTMLTextAreaElement>}
         */
        get textbox() {
            if (!this._textbox) {
                this._textbox = new latte.Element(document.createElement('textarea'));
                this._textbox.addClass('plain-text-fragment');
                this._textbox.element.rows = 10;
                this._textbox.addEventListener('input', () => {
                    this.unsavedChanges = true;
                    this.fragment.value = this.textbox.text;
                    if (!this.heightCheck) {
                        let minRows = 10;
                        let rows;
                        this._textbox.element.rows = minRows;
                        rows = Math.ceil((this._textbox.element.scrollHeight - this.baseScrollHeight) / 17);
                        this._textbox.element.rows = minRows + rows;
                        this.heightCheck = true;
                    }
                });
                this._textbox.addEventListener('focus', () => {
                    let savedValue = this._textbox.text;
                    this._textbox.text = '';
                    this.baseScrollHeight = this._textbox.element.scrollHeight;
                    this._textbox.text = savedValue;
                    this.onEditorFocus();
                });
                this._textbox.addEventListener('blur', () => {
                    this.onEditorBlur();
                });
            }
            return this._textbox;
        }
    }
    latte.PlainTextFragmentAdapter = PlainTextFragmentAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/29/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ImageGalleryFragmentAdapter extends latte.FragmentAdapter {
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            /**
             * Property field
             */
            this._selectedFile = null;
        }
        //region Private Methods
        /**
         * Uploads the file on the input
         */
        fileInputChanged() {
            if (this.fileInput.element.files.length > 0) {
                this.onFilesSelected(this.fileInput.element.files);
            }
        }
        /**
         * Generates the presentable image of the specified file item.
         * @param item
         * @param callback
         */
        generatePresentableImage(item, callback) {
            item.file.createThumbChild({
                size: this.imageSize,
                fit: latte.ImageUtil.imageFitFromString(this.fragmentConfiguration['thumb-fit']) || latte.ImageFit.AspectFill
            }, ImageGalleryFragmentAdapter.PRESENTABLE_KEY, () => callback());
        }
        /**
         * Gets the files based
         */
        getFileRecords() {
            let a = [];
            this.files.each((f) => a.push(f.file));
            return a;
        }
        /**
         * Moves the selected image one position further
         */
        moveImageAfter() {
            if (!this.selectedFile) {
                return;
            }
            this.swapSelectedImage(true);
        }
        /**
         * Moves the selected image one position back
         */
        moveImageBefore() {
            if (!this.selectedFile) {
                return;
            }
            this.swapSelectedImage(false);
        }
        /**
         * Swaps the selected image with the contigous beofe (or after if the passed flag is true)
         * @param after
         */
        swapSelectedImage(after) {
            let index = this.files.indexOf(this.selectedFile);
            this.files.each((f) => f.element.detach());
            let indexA = index - 1;
            let indexB = index;
            if (after) {
                indexA = index + 1;
                indexB = index;
            }
            let tmp = this.files[indexA];
            this.files[indexA] = this.selectedFile;
            this.files[indexB] = tmp;
            this.files.each((f) => this.editorItem.element.append(f.element));
            this.updateBeforeAfterButtons();
            this.serialize();
        }
        /**
         * Redoes the thumbs of selected file item
         */
        redoThumbs() {
            if (this.selectedFile) {
                this.createImagesOfFile(this.selectedFile);
            }
        }
        /**
         * Removes the selected image. (Asking first)
         */
        removeSelectedImage() {
            if (!this.selectedFile) {
                return;
            }
            latte.DialogView.confirmDelete(this.selectedFile.file.name, () => {
                this.selectedFile.file.remove(() => latte.log("Removed Record & Physical"));
                this.files.remove(this.selectedFile);
                this.selectedFile = null;
                this.serialize();
            });
        }
        /**
         * Updates the enabled property of move before and after buttons
         */
        updateBeforeAfterButtons() {
            let index = this.files.indexOf(this.selectedFile);
            this.btnMoveImageBefore.enabled = index > 0;
            this.btnMoveImageAfter.enabled = index < (this.files.length - 1);
        }
        /**
         * Opens the viewer for selected presentable image
         */
        viewSelectedImage() {
            let file = this.selectedFile.file;
            let pic = file.getChildByKey(ImageGalleryFragmentAdapter.PRESENTABLE_KEY);
            if (pic) {
                let editor = latte.ImageEditorView.editImageFile(pic);
                editor.editable = false;
            }
        }
        /**
         * Opens the editor for selected original
         */
        viewSelectedOriginal() {
            if (this.selectedFile) {
                let index = this.files.indexOf(this.selectedFile);
                let files = this.getFileRecords();
                let editor = latte.ImageEditorView.editImageFiles(files, index);
                // Re create images when saved
                editor.saved.add(() => {
                    this.createImagesOfFile(this.selectedFile);
                });
            }
        }
        /**
         * Opens the viewer for selected thumb
         */
        viewSelectedThumb() {
            if (this.selectedFile) {
                let file = this.selectedFile.file;
                let thumb = file.getChildByKey(latte.FileItem.SYS_THUMB_KEY);
                if (thumb) {
                    let editor = latte.ImageEditorView.editImageFile(thumb);
                    editor.editable = false;
                }
            }
        }
        //endregion
        //region Methods
        /**
         *
         */
        activateFileInput() {
            this.fileInput.element.click();
        }
        /**
         * Override
         */
        getEditorTabs() {
            let tabs = [
                this.tabGallery
            ];
            if (this.selectedFile) {
                tabs.push(this.tabImage);
            }
            return tabs;
        }
        /**
         * Returns the items for the ribbon of the view
         * @returns {Array}
         */
        getEditorTabItems() {
            let items = [this.btnInsertImage];
            if (this.selectedFile) {
                items = items.concat([
                    this.btnViewImage,
                    this.btnViewOriginal,
                    this.btnViewThumb,
                    this.btnRedoThumb,
                    latte.SeparatorItem.withTab(this.tabImage),
                    this.btnMoveImageBefore,
                    this.btnMoveImageAfter,
                    latte.SeparatorItem.withTab(this.tabImage),
                    this.btnRemoveImage
                ]);
            }
            return items;
        }
        /**
         * Override. Raises the <c>createEditorItem</c> event
         */
        onCreateEditorItem() {
            super.onCreateEditorItem();
            let editor = this.editorItem = new latte.FragmentPlaceholderItem();
            this.editorItem.addClass('gallery-fragment-editor');
            editor.emptyIcon = latte.LinearIcon.book;
            this.editorItem.node.addEventListener('click', () => this.selectedFile = null);
            this.editorItem.element.append(this.fileInput.element);
            editor.drop.add((e) => {
                if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    this.onFilesSelected(e.dataTransfer.files);
                }
            });
            this.unserialize();
        }
        /**
         * Raises the <c>filesSelected</c> event
         */
        onFilesSelected(files) {
            if (this._filesSelected) {
                this._filesSelected.raise(files);
            }
            for (let i = 0; i < files.length; i++) {
                // Get file
                let f = files[i];
                if (latte.File.isImageExtension(latte.File.extensionOf(f.name))) {
                    // Creates file item
                    let item = new latte.FileItem();
                    // Add the Item to Files
                    this.files.add(item);
                    // Process thumbs & resized image
                    this.createImagesOfFile(item, f);
                }
                else {
                    latte.DialogView.alert(strings.cantAddImage, latte.sprintf(strings.SNotCompatibleImage, f.name));
                }
            }
        }
        /**
         * Creates the image of the specified file item
         * @param item
         */
        createImagesOfFile(item, f = null) {
            let fileBuffer = null;
            // Creates the images
            let doImages = () => {
                // After thumb has been created, create the presentable image
                if (item.thumbCreated.handlers.length == 0) {
                    item.thumbCreated.add(() => {
                        this.generatePresentableImage(item, () => {
                            // debugger;
                            // log("Generated Presentable: ")
                            // log(item.file.children)
                            this.serialize();
                        });
                    });
                }
                // If system file, upload it
                if (f) {
                    item.fileUploader = new latte.FileUploader(f, 'Page', String(this.fragment.idpage));
                    item.fileUploader.upload();
                }
                else {
                    // Re-assign file
                    item.file = fileBuffer;
                }
            };
            if (item.file && item.file.children.length > 0) {
                // log("Deleting files: ")
                // log(item.file.children)
                item.file.deleteChildren().send(() => {
                    fileBuffer = item.file;
                    item.file.children = [];
                    item.file = null;
                    doImages();
                });
            }
            else {
                doImages();
            }
        }
        /**
         * Raises the <c>selectedFile</c> event
         */
        onSelectedFileChanged() {
            if (this._selectedFileChanged) {
                this._selectedFileChanged.raise();
            }
            this.files.each((f) => f.removeClass('selected'));
            if (this.selectedFile) {
                this.selectedFile.addClass('selected');
                this.updateBeforeAfterButtons();
            }
            this.onTabsChanged();
        }
        /**
         * Serializes the file array into the value of the fragment
         */
        serialize() {
            let d = document.createElement('div');
            this.files.each((f) => {
                // log(f.file.name)
                let thumb = f.file.getChildByKey(latte.FileItem.SYS_THUMB_KEY);
                let presentable = f.file.getChildByKey(ImageGalleryFragmentAdapter.PRESENTABLE_KEY);
                if (!thumb || !presentable)
                    return;
                let img = document.createElement('img');
                img.setAttribute('data-guid', f.file.guid);
                img.setAttribute('data-thumb-guid', thumb.guid);
                img.setAttribute('data-image-guid', presentable.guid);
                img.setAttribute('data-image-url', presentable.url);
                img.classList.add('thumb');
                img.src = thumb.url;
                d.appendChild(img);
            });
            let oldValue = this.fragment.value;
            this.fragment.value = d.innerHTML;
            this.unsavedChanges = oldValue != this.fragment.value;
            // if(this.unsavedChanges) {
            //     log("Unsaved Changes")
            // }
            // log(this.fragment.value);
        }
        /**
         * Unserializes
         */
        unserialize() {
            let guids = [];
            // debugger;
            // log("Unserializing: " + this.fragment.value)
            let d = new latte.Element(document.createElement('div'));
            // Eval nodes
            d.element.innerHTML = this.fragment.value;
            // Scan nodes for images
            for (let i in d.element.childNodes) {
                let node = d.element.childNodes[i];
                if (node.nodeType == 1) {
                    let img = node;
                    let guid = img.getAttribute('data-guid');
                    if (guid) {
                        guids.push(guid);
                    }
                }
            }
            // Load files
            // TODO: Loading visual cues!
            latte.File.byGuids(guids.join(',')).send((files) => {
                let sorted = {};
                files.forEach((f) => sorted[f.guid] = f);
                guids.forEach((g) => {
                    if (sorted[g]) {
                        this.files.add(new latte.FileItem(sorted[g]));
                    }
                });
            });
        }
        /**
         * Gets an event raised when files are selected for upload
         *
         * @returns {LatteEvent}
         */
        get filesSelected() {
            if (!this._filesSelected) {
                this._filesSelected = new latte.LatteEvent(this);
            }
            return this._filesSelected;
        }
        /**
         * Gets an event raised when the value of the selectedFile property changes
         *
         * @returns {LatteEvent}
         */
        get selectedFileChanged() {
            if (!this._selectedFileChanged) {
                this._selectedFileChanged = new latte.LatteEvent(this);
            }
            return this._selectedFileChanged;
        }
        /**
         * Gets the files of the editor
         *
         * @returns {Collection<FileItem>}
         */
        get files() {
            if (!this._files) {
                this._files = new latte.Collection(
                // Added
                // Added
                    (f) => {
                    // Remove empty icon
                    this.editorItem.emptyIcon = null;
                    this.editorItem.element.append(f.element);
                    f.thumbSize = this.thumbSize;
                    f.element.get(0).addEventListener('click', (e) => {
                        e.stopImmediatePropagation();
                        this.selectedFile = f;
                    });
                }, 
                // Removed
                // Removed
                    (f) => {
                    if (this.files.length == 0) {
                        this.editorItem.emptyIcon = latte.LinearIcon.book;
                    }
                    f.element.detach();
                });
            }
            return this._files;
        }
        /**
         * Gets the configured image size
         *
         * @returns {Size}
         */
        get imageSize() {
            if (!this._imageSize) {
                this._imageSize = new latte.Size(this.fragmentConfiguration["image-width"] || ImageGalleryFragmentAdapter.defaultImageWidth, this.fragmentConfiguration["image-height"] || ImageGalleryFragmentAdapter.defaultImageHeight);
            }
            return this._imageSize;
        }
        /**
         * Gets or sets the selected file item
         *
         * @returns {FileItem}
         */
        get selectedFile() {
            return this._selectedFile;
        }
        /**
         * Gets or sets the selected file item
         *
         * @param {FileItem} value
         */
        set selectedFile(value) {
            // Check if value changed
            let changed = value !== this._selectedFile;
            // Set value
            this._selectedFile = value;
            // Trigger changed event
            if (changed) {
                this.onSelectedFileChanged();
            }
        }
        /**
         * Gets the configured thumb size
         *
         * @returns {Size}
         */
        get thumbSize() {
            if (!this._thumbSize) {
                this._thumbSize = new latte.Size(this.fragmentConfiguration["thumb-width"] || ImageGalleryFragmentAdapter.defaultThumbWidth, this.fragmentConfiguration["thumb-height"] || ImageGalleryFragmentAdapter.defaultThumbHeight);
            }
            return this._thumbSize;
        }
        /**
         * Gets the insert image button
         *
         * @returns {ButtonItem}
         */
        get btnInsertImage() {
            if (!this._btnInsertImage) {
                this._btnInsertImage = new latte.ButtonItem(strings.insertImage, latte.LinearIcon.picture.go32(), () => this.activateFileInput());
                this._btnInsertImage.tab = this.tabGallery;
            }
            return this._btnInsertImage;
        }
        /**
         * Gets the move image after button
         *
         * @returns {ButtonItem}
         */
        get btnMoveImageAfter() {
            if (!this._btnMoveImageAfter) {
                this._btnMoveImageAfter = new latte.ButtonItem(null, latte.LinearIcon.chevron_right, () => this.moveImageAfter());
                this._btnMoveImageAfter.tooltip = strings.moveImageAfter;
                this._btnMoveImageAfter.tab = this.tabImage;
            }
            return this._btnMoveImageAfter;
        }
        /**
         * Gets the move image before item
         *
         * @returns {ButtonItem}
         */
        get btnMoveImageBefore() {
            if (!this._btnMoveImageBefore) {
                this._btnMoveImageBefore = new latte.ButtonItem(null, latte.LinearIcon.chevron_left, () => this.moveImageBefore());
                this._btnMoveImageBefore.tooltip = strings.moveImageBefore;
                this._btnMoveImageBefore.tab = this.tabImage;
            }
            return this._btnMoveImageBefore;
        }
        /**
         * Gets the remove image button
         *
         * @returns {ButtonItem}
         */
        get btnRemoveImage() {
            if (!this._btnRemoveImage) {
                this._btnRemoveImage = new latte.ButtonItem(strings.deleteImage, latte.LinearIcon.trash.go32(), () => this.removeSelectedImage());
                this._btnRemoveImage.tab = this.tabImage;
            }
            return this._btnRemoveImage;
        }
        /**
         * Gets the thumbs redo button
         *
         * @returns {ButtonItem}
         */
        get btnRedoThumb() {
            if (!this._btnRedoThumb) {
                this._btnRedoThumb = new latte.ButtonItem(strings.redoThumb, latte.LinearIcon.sync, () => this.redoThumbs());
                this._btnRedoThumb.tab = this.tabImage;
            }
            return this._btnRedoThumb;
        }
        /**
         * Gets the view image button
         *
         * @returns {ButtonImage}
         */
        get btnViewImage() {
            if (!this._btnViewImage) {
                this._btnViewImage = new latte.ButtonItem(strings.viewImage, latte.LinearIcon.picture, () => this.viewSelectedImage());
                this._btnViewImage.tab = this.tabImage;
            }
            return this._btnViewImage;
        }
        /**
         * Gets the view original image button
         *
         * @returns {ButtonItem}
         */
        get btnViewOriginal() {
            if (!this._btnViewOriginal) {
                this._btnViewOriginal = new latte.ButtonItem(strings.viewOriginal, latte.LinearIcon.file_empty, () => this.viewSelectedOriginal());
                this._btnViewOriginal.tab = this.tabImage;
            }
            return this._btnViewOriginal;
        }
        /**
         * Gets the view thumb button
         *
         * @returns {ButtonItem}
         */
        get btnViewThumb() {
            if (!this._btnViewThumb) {
                this._btnViewThumb = new latte.ButtonItem(strings.viewThumb, latte.LinearIcon.picture, () => this.viewSelectedThumb());
                this._btnViewThumb.tab = this.tabImage;
            }
            return this._btnViewThumb;
        }
        /**
         * Gets the file input
         *
         * @returns {Element<HTMLInputElement>}
         */
        get fileInput() {
            if (!this._fileInput) {
                this._fileInput = new latte.Element(document.createElement('input'));
                this._fileInput.element.type = 'file';
                this._fileInput.element.multiple = true;
                this._fileInput.addEventListener('change', () => this.fileInputChanged());
            }
            return this._fileInput;
        }
        /**
         * Gets the gallery tab
         *
         * @returns {TabItem}
         */
        get tabGallery() {
            if (!this._tabGallery) {
                this._tabGallery = new latte.TabItem(strings.imageGallery);
            }
            return this._tabGallery;
        }
        /**
         * Gets the image tab
         *
         * @returns {TabItem}
         */
        get tabImage() {
            if (!this._tabImage) {
                this._tabImage = new latte.TabItem(strings.image);
            }
            return this._tabImage;
        }
    }
    //region Static
    ImageGalleryFragmentAdapter.PRESENTABLE_KEY = 'presentable';
    ImageGalleryFragmentAdapter.defaultThumbWidth = 200;
    ImageGalleryFragmentAdapter.defaultThumbHeight = 200;
    ImageGalleryFragmentAdapter.defaultImageWidth = 800;
    ImageGalleryFragmentAdapter.defaultImageHeight = 600;
    latte.ImageGalleryFragmentAdapter = ImageGalleryFragmentAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/1/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FileItem extends latte.Item {
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(f = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._file = null;
            /**
             * Property field
             */
            this._fileUploader = null;
            /**
             * Property field
             */
            this._thumbSize = null;
            this.addClass('file');
            this.divBar.add(this.divName);
            this.divBar.add(this.divSize);
            this.element.append(this.divThumb.element);
            this.element.append(this.divBar.element);
            if (f) {
                this.file = f;
            }
        }
        //region Private Methods
        /**
         * Updates the thumb of the item.
         */
        updateThumb() {
            let thumb = this.file.getChildByKey(FileItem.SYS_THUMB_KEY);
            if (thumb) {
                this.img.element.src = thumb.url;
            }
            else {
                this.img.element.src = this.file.url;
                // Generate thumb
                this.file.createThumbChild({
                    size: this.thumbSize || new latte.Size(FileItem.defaultThumbWidth, FileItem.defaultThumbHeight),
                    fit: latte.ImageFit.AspectFillNear
                }, FileItem.SYS_THUMB_KEY, () => {
                    this.updateThumb();
                    this.onThumbCreated();
                });
            }
        }
        //endregion
        //region Methods
        /**
         * Raises the <c>file</c> event
         */
        onFileChanged() {
            if (this._fileChanged) {
                this._fileChanged.raise();
            }
            if (this.file) {
                this.divName.text = this.divName.tooltip = this.file.name;
                this.divSize.text = this.file.humanSize;
                if (!this.file.isImage) {
                    this.divExtension.text = this.file.extension.toUpperCase();
                }
                else {
                    this.updateThumb();
                }
            }
            else {
                this.divName.text = '';
                this.divSize.text = '';
                this.divExtension.text = '';
            }
        }
        /**
         * Raises the <c>fileUploader</c> event
         */
        onFileUploaderChanged() {
            if (this._fileUploaderChanged) {
                this._fileUploaderChanged.raise();
            }
            if (this.fileUploader) {
                this.divName.text = this.divName.tooltip = this.fileUploader.fileLocal.name;
                this.divSize.text = latte.File.humanSizeOf(this.fileUploader.fileLocal.size);
                this.divThumb.element.appendChild(this.progressBar.element.get(0));
                this.fileUploader.progressChanged.add(() => {
                    this.progressBar.value = this.fileUploader.progress * 100;
                });
                this.fileUploader.complete.add(() => {
                    this.progressBar.visible = false;
                    this.file = this.fileUploader.fileRecord;
                });
            }
        }
        /**
         * Raises the <c>thumbCreated</c> event
         */
        onThumbCreated() {
            if (this._thumbCreated) {
                this._thumbCreated.raise();
            }
        }
        /**
         * Raises the <c>thumbSize</c> event
         */
        onThumbSizeChanged() {
            if (this._thumbSizeChanged) {
                this._thumbSizeChanged.raise();
            }
            if (this.thumbSize) {
                this.divThumb.width = this.thumbSize.width;
                this.divThumb.height = this.thumbSize.height;
            }
        }
        /**
         * Gets an event raised when the value of the file property changes
         *
         * @returns {LatteEvent}
         */
        get fileChanged() {
            if (!this._fileChanged) {
                this._fileChanged = new latte.LatteEvent(this);
            }
            return this._fileChanged;
        }
        /**
         * Gets an event raised when the value of the fileUploader property changes
         *
         * @returns {LatteEvent}
         */
        get fileUploaderChanged() {
            if (!this._fileUploaderChanged) {
                this._fileUploaderChanged = new latte.LatteEvent(this);
            }
            return this._fileUploaderChanged;
        }
        /**
         * Gets an event raised when the system thumb has been created
         *
         * @returns {LatteEvent}
         */
        get thumbCreated() {
            if (!this._thumbCreated) {
                this._thumbCreated = new latte.LatteEvent(this);
            }
            return this._thumbCreated;
        }
        /**
         * Gets an event raised when the value of the thumbSize property changes
         *
         * @returns {LatteEvent}
         */
        get thumbSizeChanged() {
            if (!this._thumbSizeChanged) {
                this._thumbSizeChanged = new latte.LatteEvent(this);
            }
            return this._thumbSizeChanged;
        }
        /**
         * Gets or sets the latte File
         *
         * @returns {latte.File}
         */
        get file() {
            return this._file;
        }
        /**
         * Gets or sets the latte File
         *
         * @param {latte.File} value
         */
        set file(value) {
            // Check if value changed
            let changed = value !== this._file;
            // Set value
            this._file = value;
            // Trigger changed event
            if (changed) {
                this.onFileChanged();
            }
        }
        /**
         * Gets or sets the file uploader for this item. After uploading the file record will be added.
         *
         * @returns {FileUploader}
         */
        get fileUploader() {
            return this._fileUploader;
        }
        /**
         * Gets or sets the file uploader for this item. After uploading the file record will be added.
         *
         * @param {FileUploader} value
         */
        set fileUploader(value) {
            // Check if value changed
            let changed = value !== this._fileUploader;
            // Set value
            this._fileUploader = value;
            // Trigger changed event
            if (changed) {
                this.onFileUploaderChanged();
            }
        }
        /**
         * Gets or sets the size of the thumbnail
         *
         * @returns {Size}
         */
        get thumbSize() {
            return this._thumbSize;
        }
        /**
         * Gets or sets the size of the thumbnail
         *
         * @param {Size} value
         */
        set thumbSize(value) {
            // Check if value changed
            let changed = value !== this._thumbSize;
            // Set value
            this._thumbSize = value;
            // Trigger changed event
            if (changed) {
                this.onThumbSizeChanged();
            }
        }
        /**
         * Gets the info bar element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get divBar() {
            if (!this._divBar) {
                this._divBar = new latte.Element(document.createElement('div'));
                this._divBar.addClass('info');
            }
            return this._divBar;
        }
        /**
         * Gets the extension div
         *
         * @returns {Element<HTMLDivElement>}
         */
        get divExtension() {
            if (!this._divExtension) {
                this._divExtension = new latte.Element(document.createElement('div'));
                this._divExtension.appendTo(this.divThumb.element);
                this._divExtension.addClass('extension');
            }
            return this._divExtension;
        }
        /**
         * Gets the name element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get divName() {
            if (!this._divName) {
                this._divName = new latte.Element(document.createElement('div'));
                this._divName.addClass('name');
            }
            return this._divName;
        }
        /**
         * Gets the size element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get divSize() {
            if (!this._divSize) {
                this._divSize = new latte.Element(document.createElement('div'));
                this._divSize.addClass('size');
            }
            return this._divSize;
        }
        /**
         * Gets the thumb of the item
         *
         * @returns {Element<HTMLDivElement>}
         */
        get divThumb() {
            if (!this._divThumb) {
                this._divThumb = new latte.Element(document.createElement('div'));
                this._divThumb.addClass('thumb');
            }
            return this._divThumb;
        }
        /**
         * Gets the image of the thumb
         *
         * @returns {Element<HTMLDivElement>}
         */
        get img() {
            if (!this._img) {
                this._img = new latte.Element(document.createElement('img'));
                this.divThumb.add(this._img);
            }
            return this._img;
        }
        /**
         * Gets the progress item
         *
         * @returns {ProgressItem}
         */
        get progressBar() {
            if (!this._progressBar) {
                this._progressBar = new latte.ProgressItem();
                this._progressBar.maxValue = 100;
                this._progressBar.animated = false;
            }
            return this._progressBar;
        }
    }
    //region Static
    FileItem.SYS_THUMB_KEY = 'sys-thumb';
    FileItem.defaultThumbWidth = 200;
    FileItem.defaultThumbHeight = 200;
    latte.FileItem = FileItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/9/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FragmentPlaceholderItem extends latte.Item {
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
            this._allowDrop = false;
            /**
             * Property field
             */
            this._dragging = false;
            //endregion
            //region Components
            /**
             * Property field
             */
            this._emptyIcon = null;
            this.addClass('fragment-placeholder');
            this.focusable = true;
            this.allowDrop = true;
            this.addEventListener('dragover', (e) => this.onDragStart(e));
            this.addEventListener('dragleave', (e) => this.onDragEnd(e));
            this.addEventListener('drop', (e) => this.onDrop(e));
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>click</c> event
         */
        onClick() {
            if (this._click) {
                this._click.raise();
            }
        }
        /**
         * Raises the <c>dragEnd</c> event
         */
        onDragEnd(e) {
            if (this._dragEnd) {
                this._dragEnd.raise(e);
            }
            if (this.allowDrop) {
                e.preventDefault();
            }
            this.dragging = false;
        }
        /**
         * Raises the <c>dragging</c> event
         */
        onDraggingChanged() {
            if (this._draggingChanged) {
                this._draggingChanged.raise();
            }
            this.ensureClass('dragging', this.dragging);
        }
        /**
         * Raises the <c>dragStart</c> event
         */
        onDragStart(e) {
            if (this._dragStart) {
                this._dragStart.raise(e);
            }
            if (this.allowDrop) {
                e.preventDefault();
                this.dragging = true;
            }
        }
        /**
         * Raises the <c>drop</c> event
         */
        onDrop(e) {
            if (this._drop) {
                this._drop.raise(e);
            }
            if (this.allowDrop) {
                e.preventDefault();
            }
            this.dragging = false;
        }
        /**
         * Raises the <c>emptyIcon</c> event
         */
        onEmptyIconChanged() {
            if (this._emptyIconChanged) {
                this._emptyIconChanged.raise();
            }
            if (this.emptyIcon) {
                this.emptyIcon.addClass('empty-icon');
                this.node.appendChild(this.emptyIcon.node);
            }
        }
        /**
         * Gets an event raised when user clicks the control
         *
         * @returns {LatteEvent}
         */
        get click() {
            if (!this._click) {
                this._click = new latte.LatteEvent(this);
            }
            return this._click;
        }
        /**
         * Gets an event raised when the drag operation ends
         *
         * @returns {LatteEvent}
         */
        get dragEnd() {
            if (!this._dragEnd) {
                this._dragEnd = new latte.LatteEvent(this);
            }
            return this._dragEnd;
        }
        /**
         * Gets an event raised when the value of the dragging property changes
         *
         * @returns {LatteEvent}
         */
        get draggingChanged() {
            if (!this._draggingChanged) {
                this._draggingChanged = new latte.LatteEvent(this);
            }
            return this._draggingChanged;
        }
        /**
         * Gets an event raised when a drag operation starts
         *
         * @returns {LatteEvent}
         */
        get dragStart() {
            if (!this._dragStart) {
                this._dragStart = new latte.LatteEvent(this);
            }
            return this._dragStart;
        }
        /**
         * Gets an event raised when the user drops data
         *
         * @returns {LatteEvent}
         */
        get drop() {
            if (!this._drop) {
                this._drop = new latte.LatteEvent(this);
            }
            return this._drop;
        }
        /**
         * Gets an event raised when the value of the emptyIcon property changes
         *
         * @returns {LatteEvent}
         */
        get emptyIconChanged() {
            if (!this._emptyIconChanged) {
                this._emptyIconChanged = new latte.LatteEvent(this);
            }
            return this._emptyIconChanged;
        }
        /**
         * Gets or sets a value indicating if the placeholder allows drop
         *
         * @returns {boolean}
         */
        get allowDrop() {
            return this._allowDrop;
        }
        /**
         * Gets or sets a value indicating if the placeholder allows drop
         *
         * @param {boolean} value
         */
        set allowDrop(value) {
            this._allowDrop = value;
        }
        /**
         * Gets or sets a value indicating if the user is dragging something over the item
         *
         * @returns {boolean}
         */
        get dragging() {
            return this._dragging;
        }
        /**
         * Gets or sets a value indicating if the user is dragging something over the item
         *
         * @param {boolean} value
         */
        set dragging(value) {
            // Check if value changed
            let changed = value !== this._dragging;
            // Set value
            this._dragging = value;
            // Trigger changed event
            if (changed) {
                this.onDraggingChanged();
            }
        }
        /**
         * Gets or sets the icon item
         *
         * @returns {IconItem}
         */
        get emptyIcon() {
            return this._emptyIcon;
        }
        /**
         * Gets or sets the icon item
         *
         * @param {IconItem} value
         */
        set emptyIcon(value) {
            if (this._emptyIcon) {
                this._emptyIcon.element.remove();
            }
            // Check if value changed
            let changed = value !== this._emptyIcon;
            // Set value
            this._emptyIcon = value;
            // Trigger changed event
            if (changed) {
                this.onEmptyIconChanged();
            }
        }
    }
    latte.FragmentPlaceholderItem = FragmentPlaceholderItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/22/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class LinearIcon extends latte.IconItem {
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._linearIconName = null;
            this.addClass('lnr');
            this.url = null;
        }
        //region Static
        static get home() { return LinearIcon.byStyleName("home"); }
        static get apartment() { return LinearIcon.byStyleName("apartment"); }
        static get pencil() { return LinearIcon.byStyleName("pencil"); }
        static get magic_wand() { return LinearIcon.byStyleName("magic-wand"); }
        static get drop() { return LinearIcon.byStyleName("drop"); }
        static get lighter() { return LinearIcon.byStyleName("lighter"); }
        static get poop() { return LinearIcon.byStyleName("poop"); }
        static get sun() { return LinearIcon.byStyleName("sun"); }
        static get moon() { return LinearIcon.byStyleName("moon"); }
        static get cloud() { return LinearIcon.byStyleName("cloud"); }
        static get cloud_upload() { return LinearIcon.byStyleName("cloud-upload"); }
        static get cloud_download() { return LinearIcon.byStyleName("cloud-download"); }
        static get cloud_sync() { return LinearIcon.byStyleName("cloud-sync"); }
        static get cloud_check() { return LinearIcon.byStyleName("cloud-check"); }
        static get database() { return LinearIcon.byStyleName("database"); }
        static get lock() { return LinearIcon.byStyleName("lock"); }
        static get cog() { return LinearIcon.byStyleName("cog"); }
        static get trash() { return LinearIcon.byStyleName("trash"); }
        static get dice() { return LinearIcon.byStyleName("dice"); }
        static get heart() { return LinearIcon.byStyleName("heart"); }
        static get star() { return LinearIcon.byStyleName("star"); }
        static get star_half() { return LinearIcon.byStyleName("star-half"); }
        static get star_empty() { return LinearIcon.byStyleName("star-empty"); }
        static get flag() { return LinearIcon.byStyleName("flag"); }
        static get envelope() { return LinearIcon.byStyleName("envelope"); }
        static get paperclip() { return LinearIcon.byStyleName("paperclip"); }
        static get inbox() { return LinearIcon.byStyleName("inbox"); }
        static get eye() { return LinearIcon.byStyleName("eye"); }
        static get printer() { return LinearIcon.byStyleName("printer"); }
        static get file_empty() { return LinearIcon.byStyleName("file-empty"); }
        static get file_add() { return LinearIcon.byStyleName("file-add"); }
        static get enter() { return LinearIcon.byStyleName("enter"); }
        static get exit() { return LinearIcon.byStyleName("exit"); }
        static get graduation_hat() { return LinearIcon.byStyleName("graduation-hat"); }
        static get license() { return LinearIcon.byStyleName("license"); }
        static get music_note() { return LinearIcon.byStyleName("music-note"); }
        static get film_play() { return LinearIcon.byStyleName("film-play"); }
        static get camera_video() { return LinearIcon.byStyleName("camera-video"); }
        static get camera() { return LinearIcon.byStyleName("camera"); }
        static get picture() { return LinearIcon.byStyleName("picture"); }
        static get book() { return LinearIcon.byStyleName("book"); }
        static get bookmark() { return LinearIcon.byStyleName("bookmark"); }
        static get user() { return LinearIcon.byStyleName("user"); }
        static get users() { return LinearIcon.byStyleName("users"); }
        static get shirt() { return LinearIcon.byStyleName("shirt"); }
        static get store() { return LinearIcon.byStyleName("store"); }
        static get cart() { return LinearIcon.byStyleName("cart"); }
        static get tag() { return LinearIcon.byStyleName("tag"); }
        static get phone_handset() { return LinearIcon.byStyleName("phone-handset"); }
        static get phone() { return LinearIcon.byStyleName("phone"); }
        static get pushpin() { return LinearIcon.byStyleName("pushpin"); }
        static get map_marker() { return LinearIcon.byStyleName("map-marker"); }
        static get map() { return LinearIcon.byStyleName("map"); }
        static get location() { return LinearIcon.byStyleName("location"); }
        static get calendar_full() { return LinearIcon.byStyleName("calendar-full"); }
        static get keyboard() { return LinearIcon.byStyleName("keyboard"); }
        static get spell_check() { return LinearIcon.byStyleName("spell-check"); }
        static get screen() { return LinearIcon.byStyleName("screen"); }
        static get smartphone() { return LinearIcon.byStyleName("smartphone"); }
        static get tablet() { return LinearIcon.byStyleName("tablet"); }
        static get laptop() { return LinearIcon.byStyleName("laptop"); }
        static get laptop_phone() { return LinearIcon.byStyleName("laptop-phone"); }
        static get power_switch() { return LinearIcon.byStyleName("power-switch"); }
        static get bubble() { return LinearIcon.byStyleName("bubble"); }
        static get heart_pulse() { return LinearIcon.byStyleName("heart-pulse"); }
        static get construction() { return LinearIcon.byStyleName("construction"); }
        static get pie_chart() { return LinearIcon.byStyleName("pie-chart"); }
        static get chart_bars() { return LinearIcon.byStyleName("chart-bars"); }
        static get gift() { return LinearIcon.byStyleName("gift"); }
        static get diamond() { return LinearIcon.byStyleName("diamond"); }
        static get linearicons() { return LinearIcon.byStyleName("linearicons"); }
        static get dinner() { return LinearIcon.byStyleName("dinner"); }
        static get coffee_cup() { return LinearIcon.byStyleName("coffee-cup"); }
        static get leaf() { return LinearIcon.byStyleName("leaf"); }
        static get paw() { return LinearIcon.byStyleName("paw"); }
        static get rocket() { return LinearIcon.byStyleName("rocket"); }
        static get briefcase() { return LinearIcon.byStyleName("briefcase"); }
        static get bus() { return LinearIcon.byStyleName("bus"); }
        static get car() { return LinearIcon.byStyleName("car"); }
        static get train() { return LinearIcon.byStyleName("train"); }
        static get bicycle() { return LinearIcon.byStyleName("bicycle"); }
        static get wheelchair() { return LinearIcon.byStyleName("wheelchair"); }
        static get select() { return LinearIcon.byStyleName("select"); }
        static get earth() { return LinearIcon.byStyleName("earth"); }
        static get smile() { return LinearIcon.byStyleName("smile"); }
        static get sad() { return LinearIcon.byStyleName("sad"); }
        static get neutral() { return LinearIcon.byStyleName("neutral"); }
        static get mustache() { return LinearIcon.byStyleName("mustache"); }
        static get alarm() { return LinearIcon.byStyleName("alarm"); }
        static get bullhorn() { return LinearIcon.byStyleName("bullhorn"); }
        static get volume_high() { return LinearIcon.byStyleName("volume-high"); }
        static get volume_medium() { return LinearIcon.byStyleName("volume-medium"); }
        static get volume_low() { return LinearIcon.byStyleName("volume-low"); }
        static get volume() { return LinearIcon.byStyleName("volume"); }
        static get mic() { return LinearIcon.byStyleName("mic"); }
        static get hourglass() { return LinearIcon.byStyleName("hourglass"); }
        static get undo() { return LinearIcon.byStyleName("undo"); }
        static get redo() { return LinearIcon.byStyleName("redo"); }
        static get sync() { return LinearIcon.byStyleName("sync"); }
        static get history() { return LinearIcon.byStyleName("history"); }
        static get clock() { return LinearIcon.byStyleName("clock"); }
        static get download() { return LinearIcon.byStyleName("download"); }
        static get upload() { return LinearIcon.byStyleName("upload"); }
        static get enter_down() { return LinearIcon.byStyleName("enter-down"); }
        static get exit_up() { return LinearIcon.byStyleName("exit-up"); }
        static get bug() { return LinearIcon.byStyleName("bug"); }
        static get code() { return LinearIcon.byStyleName("code"); }
        static get link() { return LinearIcon.byStyleName("link"); }
        static get unlink() { return LinearIcon.byStyleName("unlink"); }
        static get thumbs_up() { return LinearIcon.byStyleName("thumbs-up"); }
        static get thumbs_down() { return LinearIcon.byStyleName("thumbs-down"); }
        static get magnifier() { return LinearIcon.byStyleName("magnifier"); }
        static get cross() { return LinearIcon.byStyleName("cross"); }
        static get menu() { return LinearIcon.byStyleName("menu"); }
        static get list() { return LinearIcon.byStyleName("list"); }
        static get chevron_up() { return LinearIcon.byStyleName("chevron-up"); }
        static get chevron_down() { return LinearIcon.byStyleName("chevron-down"); }
        static get chevron_left() { return LinearIcon.byStyleName("chevron-left"); }
        static get chevron_right() { return LinearIcon.byStyleName("chevron-right"); }
        static get arrow_up() { return LinearIcon.byStyleName("arrow-up"); }
        static get arrow_down() { return LinearIcon.byStyleName("arrow-down"); }
        static get arrow_left() { return LinearIcon.byStyleName("arrow-left"); }
        static get arrow_right() { return LinearIcon.byStyleName("arrow-right"); }
        static get move() { return LinearIcon.byStyleName("move"); }
        static get warning() { return LinearIcon.byStyleName("warning"); }
        static get question_circle() { return LinearIcon.byStyleName("question-circle"); }
        static get menu_circle() { return LinearIcon.byStyleName("menu-circle"); }
        static get checkmark_circle() { return LinearIcon.byStyleName("checkmark-circle"); }
        static get cross_circle() { return LinearIcon.byStyleName("cross-circle"); }
        static get plus_circle() { return LinearIcon.byStyleName("plus-circle"); }
        static get circle_minus() { return LinearIcon.byStyleName("circle-minus"); }
        static get arrow_up_circle() { return LinearIcon.byStyleName("arrow-up-circle"); }
        static get arrow_down_circle() { return LinearIcon.byStyleName("arrow-down-circle"); }
        static get arrow_left_circle() { return LinearIcon.byStyleName("arrow-left-circle"); }
        static get arrow_right_circle() { return LinearIcon.byStyleName("arrow-right-circle"); }
        static get chevron_up_circle() { return LinearIcon.byStyleName("chevron-up-circle"); }
        static get chevron_down_circle() { return LinearIcon.byStyleName("chevron-down-circle "); }
        static get chevron_left_circle() { return LinearIcon.byStyleName("chevron-left-circle "); }
        static get chevron_right_circle() { return LinearIcon.byStyleName("chevron-right-circle"); }
        static get crop() { return LinearIcon.byStyleName("crop"); }
        static get frame_expand() { return LinearIcon.byStyleName("frame-expand"); }
        static get frame_contract() { return LinearIcon.byStyleName("frame-contract"); }
        static get layers() { return LinearIcon.byStyleName("layers"); }
        static get funnel() { return LinearIcon.byStyleName("funnel"); }
        static get text_format() { return LinearIcon.byStyleName("text-format"); }
        static get text_format_remove() { return LinearIcon.byStyleName("text-format-remove"); }
        static get text_size() { return LinearIcon.byStyleName("text-size"); }
        static get bold() { return LinearIcon.byStyleName("bold"); }
        static get italic() { return LinearIcon.byStyleName("italic"); }
        static get underline() { return LinearIcon.byStyleName("underline"); }
        static get strikethrough() { return LinearIcon.byStyleName("strikethrough"); }
        static get highlight() { return LinearIcon.byStyleName("highlight"); }
        static get text_align_left() { return LinearIcon.byStyleName("text-align-left"); }
        static get text_align_center() { return LinearIcon.byStyleName("text-align-center"); }
        static get text_align_right() { return LinearIcon.byStyleName("text-align-right"); }
        static get text_align_justify() { return LinearIcon.byStyleName("text-align-justify"); }
        static get line_spacing() { return LinearIcon.byStyleName("line-spacing"); }
        static get indent_increase() { return LinearIcon.byStyleName("indent-increase"); }
        static get indent_decrease() { return LinearIcon.byStyleName("indent-decrease"); }
        static get pilcrow() { return LinearIcon.byStyleName("pilcrow"); }
        static get direction_ltr() { return LinearIcon.byStyleName("direction-ltr"); }
        static get direction_rtl() { return LinearIcon.byStyleName("direction-rtl"); }
        static get page_break() { return LinearIcon.byStyleName("page-break"); }
        static get sort_alpha_asc() { return LinearIcon.byStyleName("sort-alpha-asc"); }
        static get sort_amount_asc() { return LinearIcon.byStyleName("sort-amount-asc"); }
        static get hand() { return LinearIcon.byStyleName("hand"); }
        static get pointer_up() { return LinearIcon.byStyleName("pointer-up"); }
        static get pointer_right() { return LinearIcon.byStyleName("pointer-right"); }
        static get pointer_down() { return LinearIcon.byStyleName("pointer-down"); }
        static get pointer_left() { return LinearIcon.byStyleName("pointer-left"); }
        /**
         * Gets the icon by name
         * @param name
         * @returns {latte.LinearIcon}
         */
        static byStyleName(name) {
            let item = new LinearIcon();
            item.addClass('lnr-' + name);
            item.linearIconName = name;
            return item;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns a clone of the icon
         **/
        clone() {
            let icon = super.clone();
            icon.addClass('lnr');
            icon.addClass('lnr' + this.linearIconName);
            return icon;
        }
        /**
         * Sets the color and returns the icon for chaining
         * @param color
         * @returns {latte.LinearIcon}
         */
        colorize(color) {
            this.element.css('color', color.toString());
            return this;
        }
        /**
         * Sets the size to 32 and returns the icon for chaining
         * @returns {latte.LinearIcon}
         */
        go32() {
            this.size = 32;
            return this;
        }
        /**
         * Gets or sets the linear icon name
         *
         * @returns {string}
         */
        get linearIconName() {
            return this._linearIconName;
        }
        /**
         * Gets or sets the linear icon name
         *
         * @param {string} value
         */
        set linearIconName(value) {
            this._linearIconName = value;
        }
    }
    latte.LinearIcon = LinearIcon;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/26/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class FragmentExpandoItem extends latte.ItemStack {
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
            this._expanded = true;
            /**
             * Property field
             */
            this._fragmentItem = null;
            this.addClass('cms-fragment-expando');
            this.padding = 0;
            this.items.add(this.toolbar);
            this.toolbar.items.addArray([
                this.lblTitle
            ]);
            this.toolbar.sideItems.addArray([
                this.btnFold
            ]);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>fragmentItem</c> event
         */
        onFragmentItemChanged() {
            if (this._fragmentItemChanged) {
                this._fragmentItemChanged.raise();
            }
            // Remove items
            while (this.items.length > 1) {
                this.items.remove(this.items[1]);
            }
            // Add current item
            this.items.add(this.fragmentItem);
        }
        /**
         * Raises the <c>expanded</c> event
         */
        onExpandedChanged() {
            if (this._expandedChanged) {
                this._expandedChanged.raise();
            }
            if (this.items.length > 1) {
                this.items[1].visible = this.expanded;
            }
            if (this.expanded) {
                this.btnFold.icon = latte.LinearIcon.chevron_up;
            }
            else {
                this.btnFold.icon = latte.LinearIcon.chevron_down;
            }
        }
        /**
         * Gets an event raised when the value of the expanded property changes
         *
         * @returns {LatteEvent}
         */
        get expandedChanged() {
            if (!this._expandedChanged) {
                this._expandedChanged = new latte.LatteEvent(this);
            }
            return this._expandedChanged;
        }
        /**
         * Gets an event raised when the value of the fragmentItem property changes
         *
         * @returns {LatteEvent}
         */
        get fragmentItemChanged() {
            if (!this._fragmentItemChanged) {
                this._fragmentItemChanged = new latte.LatteEvent(this);
            }
            return this._fragmentItemChanged;
        }
        /**
         * Gets or sets a value indicating if the expando is expanded
         *
         * @returns {boolean}
         */
        get expanded() {
            return this._expanded;
        }
        /**
         * Gets or sets a value indicating if the expando is expanded
         *
         * @param {boolean} value
         */
        set expanded(value) {
            // Check if value changed
            let changed = value !== this._expanded;
            // Set value
            this._expanded = value;
            // Trigger changed event
            if (changed) {
                this.onExpandedChanged();
            }
        }
        /**
         * Gets or sets the fragment item of the expando
         *
         * @returns {Item}
         */
        get fragmentItem() {
            return this._fragmentItem;
        }
        /**
         * Gets or sets the fragment item of the expando
         *
         * @param {Item} value
         */
        set fragmentItem(value) {
            // Check if value changed
            let changed = value !== this._fragmentItem;
            // Set value
            this._fragmentItem = value;
            // Trigger changed event
            if (changed) {
                this.onFragmentItemChanged();
            }
        }
        /**
         * Gets or sets the title of the expando
         *
         * @returns {string}
         */
        get title() {
            return this.lblTitle.text;
        }
        /**
         * Gets or sets the title of the expando
         *
         * @param {string} value
         */
        set title(value) {
            this.lblTitle.text = value;
        }
        /**
         * Gets the fold button
         *
         * @returns {ButtonItem}
         */
        get btnFold() {
            if (!this._btnFold) {
                this._btnFold = new latte.ButtonItem(null, latte.LinearIcon.chevron_up, () => this.expanded = !this.expanded);
            }
            return this._btnFold;
        }
        /**
         * Gets the title label
         *
         * @returns {LabelItem}
         */
        get lblTitle() {
            if (!this._lblTitle) {
                this._lblTitle = new latte.LabelItem();
                this._lblTitle.addClass('expando-title');
            }
            return this._lblTitle;
        }
        /**
         * Gets the toolbar of the expando
         *
         * @returns {Toolbar}
         */
        get toolbar() {
            if (!this._toolbar) {
                this._toolbar = new latte.Toolbar();
            }
            return this._toolbar;
        }
    }
    latte.FragmentExpandoItem = FragmentExpandoItem;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table fragment
     */
    class Fragment extends latte.fragmentBase {
    }
    latte.Fragment = Fragment;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * File Record
     **/
    class File extends latte.fileBase {
        //endregion
        /**
         *
         **/
        constructor() {
            super();
        }
        //region Static
        /**
         * Gets an array of files belonging to the specified record
         **/
        static byRecord(record, callback) {
            if (!(record instanceof latte.DataRecord))
                throw new latte.InvalidArgumentEx('record');
            if (!latte._isFunction(callback))
                throw new latte.InvalidArgumentEx('callback');
            return latte.fileBase.byOwner(record.recordType, record.recordId)
                .send(function (data) {
                var object = data;
                callback.call(this, object);
            });
        }
        /**
         * Gets the extension of the file
         * @param ext
         * @returns {string}
         */
        static extensionOf(ext) {
            var point = ext.lastIndexOf('.');
            if (point < 0)
                return '';
            return ext.substr(point + 1).toLowerCase();
        }
        /**
         * Returns a value indicating if the extension is an image extension
         * @param e
         * @returns {boolean}
         */
        static isImageExtension(e) {
            return e == 'jpg' || e == 'jpeg' || e == 'gif' || e == 'png' || e == 'tiff' || e == 'bmp';
        }
        /**
         * Gets the name of the file without extension
         * @param fileName
         */
        static nameWithoutExtensionOf(fileName) {
            var ext = File.extensionOf(fileName);
            if (ext.length == 0) {
                return fileName;
            }
            else {
                var index = fileName.lastIndexOf('.');
                return fileName.substr(0, index);
            }
        }
        /**
         * Makes a single upload of a file with the specified record as owner
         *
         * @param owner
         * @param idOwner
         * @param callback
         */
        static singleUpload(owner, idOwner, callback = null) {
            var f = $('<input type=file>').appendTo('body').change(() => {
                var input = f.get(0);
                var files = input.files;
                var loader = new latte.Loader(latte.sprintf(strings.uploadingS, '0%'));
                loader.progress.visible = true;
                loader.progress.maxValue = 100;
                if (!files || !files.length) {
                    return;
                }
                var uploader = new latte.FileUploader(files[0], owner, idOwner);
                uploader.complete.add(() => {
                    loader.progress.visible = false;
                    loader.text = strings.loading;
                    loader.stop();
                    f.remove();
                    if (callback) {
                        callback(uploader.fileRecord);
                    }
                });
                uploader.progressChanged.add((value) => {
                    loader.progress.value = value * 100;
                    loader.text = latte.sprintf(strings.uploadingS, Math.round(value * 100) + '%');
                });
                uploader.upload();
            });
            f.trigger('click');
        }
        /**
         * Gets the human size of specified amount of bytes
         * @param size
         * @returns {string}
         */
        static humanSizeOf(size = 0) {
            var bytes = size;
            var kilobyte = 1024;
            var megabyte = kilobyte * 1024;
            var gigabyte = megabyte * 1024;
            var terabyte = gigabyte * 1024;
            if ((bytes >= 0) && (bytes < kilobyte)) {
                return bytes + ' B';
            }
            else if ((bytes >= kilobyte) && (bytes < megabyte)) {
                return (bytes / kilobyte).toFixed(0) + ' KB';
            }
            else if ((bytes >= megabyte) && (bytes < gigabyte)) {
                return (bytes / megabyte).toFixed(1) + ' MB';
            }
            else if ((bytes >= gigabyte) && (bytes < terabyte)) {
                return (bytes / gigabyte).toFixed(2) + 'GB';
            }
            else if (bytes >= terabyte) {
                return (bytes / gigabyte).toFixed(2) + ' TB';
            }
            else {
                return bytes + ' B';
            }
        }
        /**
         * Gets an URL for the specified path, by using the default bucket
         **/
        static urlOfPath(path) {
            var p = document.location.protocol == 'https:' ? 'https://' : 'http://';
            return p + 'goplek-net' + ".s3.amazonaws.com/" + path;
        }
        //region Methods
        /**
         * Creates a thumb that fits on the specified size
         *
         * @param width
         * @param height
         * @param description
         * @param callback
         */
        createThumbChild(options, key, callback = null) {
            latte.ImageUtil.DEFAULT_TYPE = latte.ImageUtil.mimeTypeOf(this.extension);
            // Load quality parameter
            latte.Setting.getGlobalBuffered('image-quality', (setting) => {
                // Check quality parameter
                let quality = parseFloat(setting.value);
                // Apply quality to ImageUtil
                if (quality)
                    latte.ImageUtil.DEFAULT_QUALITY = quality;
                // Generate actual thumb
                latte.ImageUtil.createThumbOfUrl(this.url, options, (data) => {
                    var img = document.createElement('img');
                    img.addEventListener('load', () => {
                        var fu = latte.FileUploader.fromBase64(latte.ImageUtil.getBase64(data), this.name, "File", String(this.idfile));
                        fu.complete.add(() => {
                            // File uploaded!
                            this.children.push(fu.fileRecord);
                            // Free memory
                            img = null;
                            if (latte._isFunction(callback)) {
                                callback(fu.fileRecord);
                            }
                        });
                        fu.key = key;
                        fu.width = img.width;
                        fu.height = img.height;
                        fu.idparent = this.idfile;
                        // Upload file
                        fu.upload();
                    });
                    img.src = data;
                });
            });
        }
        /**
         * Searches for the child of the specified description. Returns null if not found.
         * @param key
         * @returns {any}
         */
        getChildByKey(key) {
            if (!latte._isArray(this.children))
                return null;
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].key == key)
                    return this.children[i];
            }
            return null;
        }
        /**
         * Override.
         */
        getMetadata() {
            return {
                fields: {
                    name: {
                        text: strings.name
                    },
                    size: {
                        text: strings.fileSize
                    },
                    path: {
                        text: strings.path
                    },
                    uploaded: {
                        text: strings.created
                    }
                }
            };
        }
        //endregion
        //region Properties
        /**
         * Gets a value indicating if the file can be manipulated
         **/
        get canManipulate() {
            // HACK: Wuts up with dis?
            return true;
        }
        /**
         * Gets the extension of the file, without the dot.
         The extension is returned always as a lowercase string.
         If the file has no name set, null will be returned. If the name has no extension,
         empty string will be returned.
         **/
        get extension() {
            var ext = this.name;
            if (!latte._isString(ext))
                return null;
            var point = ext.lastIndexOf('.');
            if (point < 0)
                return '';
            return ext.substr(point + 1).toLowerCase();
        }
        /**
         * Gets the human size of the file
         **/
        get humanSize() {
            return File.humanSizeOf(this.size);
        }
        /**
         * Gets a value indicating if the file is an image
         **/
        get isImage() {
            return File.isImageExtension(this.extension);
        }
        /**
         * Gets the url for downloading the file
         **/
        get url() {
            if (this.bucket) {
                latte.log(this);
                let p = document.location.protocol == 'https:' ? 'https://' : 'http://';
                return p + this.bucket + ".s3.amazonaws.com/" + this.path;
            }
            else {
                return '/' + this.path;
            }
        }
    }
    latte.File = File;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table group
     */
    class Group extends latte.groupBase {
        //region Static
        /**
         * Gets the suggestion loader
         * @returns {*}
         */
        static suggestionLoader() {
            return (d, callback) => {
                return Group.search(d.text).send((records) => {
                    var items = [];
                    records.forEach((g) => {
                        var b = new latte.ButtonItem(g.name);
                        b.click.add(() => { d.record = g; });
                        items.push(b);
                    });
                    callback.call(this, items);
                });
            };
        }
        //endregion
        //region Fields
        //endregion
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the metadata about the record
         *
         * @returns Object
         */
        getMetadata() {
            return {
                fields: {
                    name: {
                        text: strings.name,
                        type: 'string'
                    }
                }
            };
        }
        /**
         * Returns a string representation of the object
         */
        toString() {
            return this.name;
        }
    }
    latte.Group = Group;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table group_user
     */
    class GroupUser extends latte.groupUserBase {
        constructor(...args) {
            super(...args);
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._user = null;
        }
        //region Static
        //endregion
        //region Fields
        //endregion
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the metadata about the record
         *
         * @returns Object
         */
        getMetadata() {
            return {
                fields: {
                    idgroup: {
                        text: strings.group,
                        type: 'record',
                        recordType: 'Group',
                        loaderFunction: latte.Group.suggestionLoader()
                    },
                    iduser: {
                        text: strings.user,
                        type: 'record',
                        recordType: 'User',
                        loaderFunction: latte.User.suggestionLoader()
                    }
                }
            };
        }
        /**
         * Gets or sets the user of the relationship
         *
         * @returns {User}
         */
        get user() {
            return this._user;
        }
        /**
         * Gets or sets the user of the relationship
         *
         * @param {User} value
         */
        set user(value) {
            this._user = value;
        }
        /**
         * Gets the users name
         *
         * @returns {string}
         */
        get userName() {
            return (this.user || new latte.User()).toString();
        }
        /**
         * Gets the user attributes string
         *
         * @returns {string}
         */
        get userAttributes() {
            return (this.user || new latte.User()).attributes;
        }
    }
    latte.GroupUser = GroupUser;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table page
     */
    class Page extends latte.pageBase {
        constructor(...args) {
            super(...args);
            /**
             * Property field
             */
            this._configurationSetting = null;
        }
        //endregion
        //region Fields
        //endregion
        //region  Methods
        /**
         * Returns a boolean indicating if the user has the specified permission for the page
         * @param permission
         */
        canI(permission) {
            if (latte.User.me.isRoot) {
                return true;
            }
            let owner = (this.powner & permission) == permission;
            let group = (this.pgroup & permission) == permission;
            let other = (this.pother & permission) == permission;
            let can = false;
            if (other) {
                return true;
            }
            if (owner || group) {
                can = owner && this.iduser == latte.User.me.iduser;
                if (!can && latte.User.me.inGroup(this.idgroup)) {
                    can = true;
                }
            }
            return can;
        }
        /**
         * Gets the metadata about the record
         *
         * @returns Object
         */
        getMetadata() {
            return {
                fields: {
                    idparent: {
                        visible: false
                    },
                    guid: {
                        text: strings.guid,
                        type: 'string',
                        readOnly: true,
                        visible: 'if-inserted'
                    },
                    online: {
                        text: strings.online,
                        type: 'switch',
                        visible: 'if-inserted'
                    },
                    title: {
                        text: strings.title,
                        type: 'string'
                    },
                    description: {
                        text: strings.description,
                        type: 'string'
                    },
                    key: {
                        text: strings.pageKey,
                        type: 'string'
                    },
                    template: {
                        category: 'advanced',
                        text: strings.template,
                        type: 'string',
                        visible: 'if-inserted'
                    },
                    trash: {
                        text: strings.inTrash,
                        type: 'boolean',
                        visible: false
                    },
                    created: {
                        category: 'advanced',
                        text: strings.created,
                        type: 'datetime',
                        readOnly: true,
                        visible: 'if-inserted'
                    },
                    modified: {
                        category: 'advanced',
                        text: strings.modified,
                        type: 'string',
                        readOnly: true,
                        visible: 'if-inserted'
                    },
                    sort: {
                        category: 'advanced',
                        text: strings.pageSort,
                        type: 'combo',
                        defaultValue: 'created-asc',
                        options: {
                            'created-asc': strings.pageSortCreatedAsc,
                            'created-desc': strings.pageSortCreatedDesc,
                            'modified-asc': strings.pageSortModifiedAsc,
                            'modified-desc': strings.pageSortModifiedDesc,
                            'title-asc': strings.pageSortTitleAsc,
                            'title-desc': strings.pageSortTitleDesc,
                            'custom': strings.pageSortCustom,
                        },
                        visible: 'if-inserted'
                    },
                    order: {
                        category: 'advanced',
                        text: strings.pageSortIndex,
                        type: 'number',
                        visible: this.sort == 'custom'
                    },
                    idgroup: {
                        category: 'advanced',
                        text: strings.group,
                        type: 'record',
                        recordType: 'Group',
                        loaderFunction: latte.Group.suggestionLoader(),
                        visible: 'if-inserted',
                        readOnly: !latte.User.me.isRoot
                    },
                    iduser: {
                        category: 'advanced',
                        text: strings.user,
                        type: 'record',
                        recordType: 'User',
                        loaderFunction: latte.User.suggestionLoader(),
                        visible: 'if-inserted',
                        readOnly: !latte.User.me.isRoot
                    },
                    powner: {
                        category: 'advanced',
                        text: strings.owner,
                        type: 'flags',
                        options: {
                            1: strings.readPermission,
                            2: strings.writePermission,
                            4: strings.removePermission,
                            8: strings.insertChildPermission,
                            16: strings.readChildrenPermission
                        },
                        visible: 'if-inserted'
                    },
                    pgroup: {
                        category: 'advanced',
                        text: strings.group,
                        type: 'flags',
                        options: {
                            1: strings.readPermission,
                            2: strings.writePermission,
                            4: strings.removePermission,
                            8: strings.insertChildPermission,
                            16: strings.readChildrenPermission
                        },
                        visible: 'if-inserted'
                    },
                    pother: {
                        category: 'advanced',
                        text: strings.permissionsOther,
                        type: 'flags',
                        options: {
                            1: strings.readPermission,
                            2: strings.writePermission,
                            4: strings.removePermission,
                            8: strings.insertChildPermission,
                            16: strings.readChildrenPermission
                        },
                        visible: 'if-inserted'
                    },
                    pworld: {
                        category: 'advanced',
                        text: strings.permissionsWorld,
                        type: 'flags',
                        options: {
                            1: strings.readPermission,
                            16: strings.readChildrenPermission
                        },
                        defaultValue: 17,
                        visible: 'if-inserted'
                    }
                }
            };
        }
        /**
         * Override.
         * @param form
         */
        onFormCreated(form) {
            // Change color of iduser
            // form.byName('guid').visible = this.inserted();
            // form.byName('created').visible = this.inserted();
            // form.byName('modified').visible = this.inserted();
            let sw = form.byName('online');
            // debugger;
            if (sw) {
                sw.valueChanged.add(() => {
                    if (sw.value) {
                        if (this.isMineAndCantWrite) {
                            let d = latte.DialogView.ask(strings.areYouSureSetPageOnline, strings.areYouSureSetPageOnlineDesc, [
                                new latte.ButtonItem(strings.yesMakeOnline, null, () => {
                                    this.setOnline(true).send(() => {
                                        this.online = true;
                                        this.onOnlineSwitched();
                                        latte.log("Has been set online.");
                                    });
                                }),
                                new latte.ButtonItem(strings.cancel, null, () => {
                                    sw.value = false;
                                })
                            ]);
                            d.closeButton.visible = false;
                        }
                    }
                });
            }
        }
        /**
         * Raises the <c>onlineSwitched</c> event
         */
        onOnlineSwitched() {
            if (this._onlineSwitched) {
                this._onlineSwitched.raise();
            }
        }
        /**
         * Gets an event raised when the online attribute has been switched
         *
         * @returns {LatteEvent}
         */
        get onlineSwitched() {
            if (!this._onlineSwitched) {
                this._onlineSwitched = new latte.LatteEvent(this);
            }
            return this._onlineSwitched;
        }
        //endregion
        //region Properties
        /**
         * Gets a value indicating if user has WRITE permission
         *
         * @returns {boolean}
         */
        get canIDelete() {
            return this.canI(Page.PERMISSION_DELETE);
        }
        /**
         * Gets a value indicating if user has INSERT_CHILD permission
         *
         * @returns {boolean}
         */
        get canIInsertChild() {
            return this.canI(Page.PERMISSION_INSERT_CHILD);
        }
        /**
         * Gets a value indicating if user has READ permission
         *
         * @returns {boolean}
         */
        get canIRead() {
            return this.canI(Page.PERMISSION_READ);
        }
        /**
         * Gets a value indicating if the user has READ_CHILDREN permission
         *
         * @returns {boolean}
         */
        get canIReadChildren() {
            return this.canI(Page.PERMISSION_READ_CHILDREN);
        }
        /**
         * Gets a value indicating if user has WRITE permission
         *
         * @returns {boolean}
         */
        get canIWrite() {
            return this.canI(Page.PERMISSION_WRITE) || (this.isMine && !this.isOnline);
        }
        /**
         * Gets or sets the configuration of the page
         *
         * @returns {Setting}
         */
        get configurationSetting() {
            return this._configurationSetting;
        }
        /**
         * Gets or sets the configuration of the page
         *
         * @param {Setting} value
         */
        set configurationSetting(value) {
            this._configurationSetting = value;
            this._configuration = null;
        }
        /**
         * Gets the configuration helper for the page
         *
         * @returns {PageConfiguration}
         */
        get configuration() {
            if (!this._configuration) {
                this._configuration = new latte.PageConfiguration(this);
            }
            return this._configuration;
        }
        /**
         * Gets a value indicating if the page belongs to the logged user
         *
         * @returns {boolean}
         */
        get isMine() {
            return this.iduser == latte.User.me.iduser;
        }
        /**
         * Gets a value indicating if the user owns the page and has not write permissions
         *
         * @returns {boolean}
         */
        get isMineAndCantWrite() {
            return !this.canI(Page.PERMISSION_WRITE) && this.isMine;
        }
        /**
         * Gets a value indicating if the page is currently online
         *
         * @returns {boolean}
         */
        get isOnline() {
            return this.online;
        }
    }
    //region Static
    /**
     * Allows the user to see the page and access the fragments of the page.
     * @type {number}
     */
    Page.PERMISSION_READ = 1;
    /**
     * Allows the user to modify the page after it becomes online.
     * @type {number}
     */
    Page.PERMISSION_WRITE = 2;
    /**
     * Allows the user to delete the page.
     * @type {number}
     */
    Page.PERMISSION_DELETE = 4;
    /**
     * Allows the user to insert new children to the page.
     * @type {number}
     */
    Page.PERMISSION_INSERT_CHILD = 8;
    /**
     * Allows the user to read children of the page. User gets to know the children he owns.
     * @type {number}
     */
    Page.PERMISSION_READ_CHILDREN = 16;
    latte.Page = Page;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table setting
     */
    class Setting extends latte.settingBase {
        /**
         * Clears the buffer of loaded global settings
         */
        static clearGlobalSettingsBuffer() {
            Setting.globalBuffer = [];
        }
        /**
         * Goes to the server for a global setting. It buffers it locally.
         * @param name
         * @param callback
         */
        static getGlobalBuffered(name, callback) {
            let found = Setting.globalBuffer.filter(s => s.name == name)[0];
            if (found) {
                callback(found);
            }
            else {
                Setting.getGlobalByName(name).send((s) => {
                    Setting.globalBuffer.push(s);
                    callback(s);
                });
            }
        }
        //endregion
        //region Methods
        /**
         * Gets the metadata about the record
         *
         * @returns Object
         */
        getMetadata() {
            return {
                fields: {
                    value: {
                        text: strings.settingValue,
                        type: (this.settingType) || 'string'
                    }
                }
            };
        }
    }
    //region Static
    /**
     * Buffer of settings
     * @type {{}}
     */
    Setting.globalBuffer = [];
    latte.Setting = Setting;
})(latte || (latte = {}));
/**
 * Generated by xlatte
 */
var latte;
(function (latte) {
    /**
     * Record for table user
     */
    class User extends latte.userBase {
        /**
         * Gets the suggestion loader
         * @returns {*}
         */
        static suggestionLoader() {
            return (d, callback) => {
                return User.search(d.text).send((users) => {
                    var items = [];
                    users.forEach((u) => {
                        var b = new latte.ButtonItem(u.uname);
                        b.click.add(() => { d.record = u; });
                        items.push(b);
                    });
                    callback.call(this, items);
                });
            };
        }
        //endregion
        //region Fields
        //endregion
        //region Methods
        /**
         * Gets the metadata about the record
         *
         * @returns Object
         */
        getMetadata() {
            return {
                fields: {
                    uname: {
                        text: strings.userName,
                        type: 'string'
                    },
                    password: {
                        text: strings.password,
                        type: 'password',
                        visible: 'if-not-inserted'
                    },
                    flags: {
                        text: strings.flags,
                        type: 'flags',
                        options: {
                            1: strings.isRoot,
                            2: strings.isSysAdmin,
                            16: strings.canUseBackend,
                            4: strings.isBanned,
                            8: strings.inTrash
                        }
                    }
                }
            };
        }
        /**
         * Returns a value indicating if the user belongs to the specified group
         * @param idgroup
         * @returns {boolean}
         */
        inGroup(idgroup) {
            if (this.groups && this.groups.length) {
                for (let i in this.groups) {
                    if (this.groups[i].idgroup == idgroup) {
                        return true;
                    }
                }
            }
            return false;
        }
        /**
         * Returns a string representation of the object
         */
        toString() {
            return this.uname;
        }
        //endregion
        //region Events
        //endregion
        //region Properties
        /**
         * Gets a string with attributes of the record
         *
         * @returns {string}
         */
        get attributes() {
            // TODO: Give info like "is root", "is banned" etc
            let arr = [];
            if (this.isRoot) {
                arr.push(strings.isRoot);
            }
            if (this.isBanned) {
                arr.push(strings.isBanned);
            }
            if (this.isTrash) {
                arr.push(strings.inTrash);
            }
            return arr.join(", ");
        }
        /**
         * Gets a value indicating if the user is able to use the backend
         *
         * @returns {boolean}
         */
        get canUseBackend() {
            return this.isRoot || ((this.flags & User.FLAG_USE_BACKEND) == User.FLAG_USE_BACKEND);
        }
        /**
         * Gets the flags as a string
         *
         * @returns {string}
         */
        get flagsString() {
            return latte.InputItem.format(this.flags, 'flags', this.getMetadata().fields['flags'].options);
        }
        /**
         * Gets or sets the groups of the record
         *
         * @returns {Group[]}
         */
        get groups() {
            return this._groups;
        }
        /**
         * Gets or sets the groups of the record
         *
         * @param {Group[]} value
         */
        set groups(value) {
            this._groups = value;
        }
        /**
         * Gets a value indicating if the user is banned
         *
         * @returns {boolean}
         */
        get isBanned() {
            return (this.flags & User.FLAG_BANNED_USER) == User.FLAG_BANNED_USER;
        }
        /**
         * Gets a value indicating if user is root
         *
         * @returns {boolean}
         */
        get isRoot() {
            return (this.flags & User.FLAG_ROOT_USER) == User.FLAG_ROOT_USER;
        }
        /**
         * Gets a value indicating if user is sys-admin
         *
         * @returns {boolean}
         */
        get isSysAdmin() {
            return (this.flags & User.FLAG_SYS_ADMIN) == User.FLAG_SYS_ADMIN;
        }
        /**
         * Gets a value indicating if the user is trash
         *
         * @returns {boolean}
         */
        get isTrash() {
            return (this.flags & User.FLAG_TRASH) == User.FLAG_TRASH;
        }
    }
    //region Static
    User.FLAG_ROOT_USER = 1;
    User.FLAG_SYS_ADMIN = 2;
    User.FLAG_BANNED_USER = 4;
    User.FLAG_TRASH = 8;
    User.FLAG_USE_BACKEND = 16;
    User.me = null;
    latte.User = User;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/14/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class CmsExplorer extends latte.ExplorerView {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            this.addClass('cms-explorer');
            latte.UaEvents.onInitializingExplorer(this);
            this.addRootItem(new latte.PagesExplorer());
            if (latte.User.me.isRoot) {
                this.addRootItem(new latte.UsersExplorer());
                // this.addRootItem(new GroupsExplorer());
                this.addRootItem(new latte.GlobalSettingsExplorer());
            }
            latte.UaEvents.onInitializedExplorer(this);
        }
    }
    latte.CmsExplorer = CmsExplorer;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/11/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class CmsMainView extends latte.View {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            this.addClass('cms-main-view');
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onLoad() {
            super.onLoad();
            this.element.append(this.topBar.element);
            this.topBar.add(this.logo);
            this.topBar.add(this.logout);
            this.view = this.explorer;
        }
        /**
         * Gets the explorer
         *
         * @returns {CmsExplorer}
         */
        get explorer() {
            if (!this._explorer) {
                this._explorer = new latte.CmsExplorer();
                this._explorer.btnRefresh.icon = latte.LinearIcon.sync;
                this._explorer.btnSaveDetail.icon = latte.LinearIcon.enter_down;
                latte.TreeItem.globalCollapseGlyph = (item) => { return latte.IconItem.empty(16); };
                latte.TreeItem.globalExpandGlyph = (item) => { return latte.IconItem.empty(16); };
            }
            return this._explorer;
        }
        /**
         * Gets the top bar
         *
         * @returns {Element<HTMLDivElement>}
         */
        get topBar() {
            if (!this._topBar) {
                this._topBar = new latte.Element(document.createElement('div'));
                this._topBar.addClass('top-bar');
            }
            return this._topBar;
        }
        /**
         * Gets the logo element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get logo() {
            if (!this._logo) {
                this._logo = new latte.Element(document.createElement('div'));
                this._logo.addClass('logo');
            }
            return this._logo;
        }
        /**
         * Gets the logout element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get logout() {
            if (!this._logout) {
                this._logout = new latte.Element(document.createElement('div'));
                this._logout.text = latte.User.me.uname; //sprintf('(%s) %s', User.me.uname, strings.signOut);
                this._logout.element.appendChild(latte.LinearIcon.power_switch.element.get(0));
                this._logout.addClass('logout');
                this._logout.addEventListener('click', () => latte.Main.logOut());
            }
            return this._logout;
        }
    }
    latte.CmsMainView = CmsMainView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/18/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class GlobalSettingView extends latte.ColumnView {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the view
         */
        constructor(globalSetting) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._setting = null;
            /**
             * Property field
             */
            this._globalSetting = null;
            this.globalSetting = globalSetting;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onLoad() {
            super.onLoad();
            this.items.add(this.settingForm);
            latte.Setting.getGlobalByName(this.globalSetting.name).send((s) => this.setting = s);
        }
        /**
         * Raises the <c>setting</c> event
         */
        onSettingChanged() {
            if (this._settingChanged) {
                return this._settingChanged.raise();
            }
            this.setting.settingType = this.globalSetting.type;
            if (this.setting) {
                this.settingForm.record = this.setting;
            }
        }
        /**
         * Gets an event raised when the value of the setting property changes
         *
         * @returns {LatteEvent}
         */
        get settingChanged() {
            if (!this._settingChanged) {
                this._settingChanged = new latte.LatteEvent(this);
            }
            return this._settingChanged;
        }
        /**
         * Gets or sets the setting of the view
         *
         * @returns {Setting}
         */
        get setting() {
            return this._setting;
        }
        /**
         * Gets or sets the setting of the view
         *
         * @param {Setting} value
         */
        set setting(value) {
            // Check if value changed
            let changed = value !== this._setting;
            // Set value
            this._setting = value;
            // Trigger changed event
            if (changed) {
                this.onSettingChanged();
            }
        }
        /**
         * Gets or sets the setting item
         *
         * @returns {IGlobalConfigSetting}
         */
        get globalSetting() {
            return this._globalSetting;
        }
        /**
         * Gets or sets the setting item
         *
         * @param {IGlobalConfigSetting} value
         */
        set globalSetting(value) {
            this._globalSetting = value;
        }
        /**
         * Gets the form of the setting
         *
         * @returns {DataRecordFormItem}
         */
        get settingForm() {
            if (!this._settingForm) {
                this._settingForm = new latte.DataRecordFormItem();
                this.saveItems.add(this._settingForm);
            }
            return this._settingForm;
        }
    }
    latte.GlobalSettingView = GlobalSettingView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/21/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class InstallWizardView extends latte.View {
        //endregion
        /**
         *
         */
        constructor() {
            super();
            //region Static
            //endregion
            //region Fields
            /**
             * Notes during installation
             * @type {Array}
             */
            this.notes = [];
            this.addClass('install-wizard');
            this.element.append(this.spinner);
            if (window['fragmentMustChooseLang'] === true) {
                this.steps.push(this.langChoose);
            }
            else {
                this.steps.push(this.checkModRewrite);
                this.steps.push(this.checkHtAccess);
                this.steps.push(this.checkFolderWritable);
                this.steps.push(this.setupDBConnection);
                this.steps.push(this.setupDataBase);
                this.steps.push(this.setupRoot);
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Starts the wizard
         */
        start() {
            latte.Element.body.addClass('on-fragment-install');
            this.disptachStep();
        }
        /**
         * Executes the next step of installation wizard
         */
        disptachStep() {
            if (this.steps.length == 0) {
                this.onEnded();
                return;
            }
            // Execute next step
            (this.steps.shift()).call(this, () => this.disptachStep());
        }
        /**
         * Step for checking folder writability
         * @param callback
         */
        checkFolderWritable(callback) {
            let doCheck = () => {
                latte.Server.checkFragmentFolderWritable().send((writable) => {
                    if (writable) {
                        callback();
                    }
                    else {
                        showRetry();
                    }
                });
            };
            let showRetry = () => {
                var d = latte.DialogView.alert(strings.cantWriteOnFFolder, strings.cantWriteOnFFolderDesc, [
                    new latte.ButtonItem(strings.retry, latte.LinearIcon.redo, () => doCheck())
                ]);
                d.closeable = false;
            };
            doCheck();
        }
        /**
         * Checks if htaccess is present, installs if not
         * @param callback
         */
        checkHtAccess(callback) {
            let checkPresent = () => {
                latte.Server.isHtAccessPresent().send((present) => {
                    if (present) {
                        callback();
                    }
                    else {
                        checkWritable();
                    }
                });
            };
            let checkWritable = () => {
                latte.Server.canWriteHtAccess().send((isWritable) => {
                    if (isWritable) {
                        latte.Server.installHtAccess().send(() => checkPresent());
                    }
                    else {
                        presentOptions();
                    }
                });
            };
            let presentOptions = () => {
                latte.DialogView.alert(strings.installHtOpts, strings.installHtOptsDesc, [
                    new latte.ButtonItem(strings.iHaveGivenPermToFolder, latte.LinearIcon.redo, () => checkPresent()),
                    new latte.ButtonItem(strings.iWillInstallHtAccessManually, latte.LinearIcon.pencil, () => showSource())
                ]);
            };
            let showSource = () => {
                latte.Server.getHtAccessSource().send((source) => {
                    let t = new latte.TextboxItem();
                    t.multiline = true;
                    t.minHeight = 200;
                    t.width = 470;
                    t.value = source;
                    t.autoGrow = false;
                    t.css('font-family', 'monospace');
                    t.css('white-space', 'pre');
                    let v = new latte.ColumnView();
                    v.items.add(t);
                    let d = new latte.DialogView(v, [
                        new latte.ButtonItem(strings.iHaveCreatedHtAcc, null, () => checkPresent())
                    ]);
                    d.title = strings.useThisForHtAcc;
                    d.show();
                });
            };
            checkPresent();
        }
        /**
         * Checks if mod_rewrite is available
         * @param callback
         */
        checkModRewrite(callback) {
            latte.log("Checking mod_rewrite");
            let alertNotPresent = () => {
                latte.DialogView.alert(strings.modRwNotEnabled, strings.modRwNotEnabledDesc, [new latte.ButtonItem(strings.retry, latte.LinearIcon.redo, () => check())]);
            };
            let check = () => {
                latte.Server.checkModRewriteEnabled().send((r) => {
                    if (r == 1) {
                        callback();
                    }
                    else if (r == 2) {
                        alertNotPresent();
                    }
                    else {
                        this.notes.push("Can't determine if mod_rewrite available in server.");
                        callback();
                    }
                });
            };
            check();
        }
        /**
         * Ensures the database is present
         * @param callback
         */
        setupDataBase(callback) {
            let checkInstalled = () => {
                latte.Server.isDatabaseEmpty().send((empty) => {
                    latte.log("Empty: " + empty);
                    if (empty) {
                        install();
                    }
                    else {
                        this.notes.push(strings.wDatabaseNotInstalled);
                        callback();
                    }
                });
            };
            let install = () => {
                latte.log("Installing database");
                latte.Server.installDatabase().send((r) => {
                    latte.log("Database installed");
                    if (r != 'OK') {
                        this.notes.push(r);
                    }
                    initialRecords();
                });
            };
            let initialRecords = () => {
                latte.DialogView.input(strings.chooseRootPassword, {
                    password: {
                        text: strings.password,
                        type: 'password'
                    },
                    confirm: {
                        text: strings.confirmNewPassword,
                        type: 'password'
                    }
                }, 
                // Validation logic
                    (values, inputs) => {
                    // Password should be longer than 5 chars
                    inputs['password'].valid = values['password'].length >= 4;
                    inputs['password'].setHint(inputs['password'].valid ? null : latte.sprintf(strings.passwordsMustBeSLong, 4));
                    // Passwords should match
                    inputs['confirm'].valid = values['password'] == values['confirm'];
                    inputs['confirm'].setHint(values['password'] == inputs['confirm'].valid ? null : strings.passwordsDontMatch);
                }, 
                // Save
                    (values) => {
                    latte.Server.installInitialRecords(values['password']).send((r) => {
                        if (r != 'OK') {
                            this.notes.push(r);
                        }
                        callback();
                    });
                });
            };
            checkInstalled();
        }
        /**
         *
         * @param callback
         */
        setupDBConnection(callback) {
            let lastValues = {};
            let askParameters = () => {
                let fd = latte.DialogView.input(strings.enterConnectionData, {
                    user: {
                        text: strings.user,
                        defaultValue: lastValues.user
                    },
                    pass: {
                        text: strings.password,
                        type: 'password',
                        defaultValue: lastValues.pass
                    },
                    db: {
                        text: strings.database,
                        defaultValue: lastValues.db
                    },
                    host: {
                        text: strings.host,
                        defaultValue: lastValues.host
                    },
                    lang: {
                        text: strings.language,
                        type: 'enumeration',
                        options: {
                            'en': strings.english,
                            'es': strings.spanish
                        },
                        defaultValue: strings.english == 'English' ? 'en' : 'es'
                    }
                }, 
                /** Validation */
                    () => {
                    // None
                }, 
                /** Save */
                    (values) => {
                    lastValues = values;
                    latte.Server.saveConnectionParameters(values.user, values.pass, values.db, values.host, values.lang).send((r) => {
                        if (r == 'OK') {
                            checkNow();
                        }
                        else {
                            let d = latte.DialogView.alert(strings.errorSavingConfig, strings[r], [
                                new latte.ButtonItem(strings.retry, latte.LinearIcon.redo, () => {
                                    setTimeout(() => askParameters(), 100);
                                })
                            ]);
                            d.closeable = false;
                        }
                    });
                });
                fd.items.removeAt(1);
            };
            let checkNow = () => {
                latte.Server.checkConnectionOk().send((connectionOk) => {
                    if (connectionOk) {
                        callback();
                    }
                    else {
                        askParameters();
                    }
                });
            };
            checkNow();
        }
        setupRoot(callback) {
            callback();
        }
        /**
         * Chooose lang
         * @param callback
         */
        langChoose(callback) {
            let bar = document.createElement('div');
            let createChooser = (title, lang) => {
                let btn = document.createElement('div');
                btn.className = 'bare-button';
                btn.innerText = title;
                btn.addEventListener('click', () => {
                    jQuery(bar).fadeOut(() => {
                        latte.Server.setTemporaryLang(lang).send(() => {
                            document.location.reload(true);
                        });
                    });
                });
                bar.appendChild(btn);
            };
            bar.className = 'lang-bar';
            createChooser('Español', 'es');
            createChooser('English', 'en');
            this.element.append(bar);
            jQuery(bar).fadeIn();
        }
        /**
         * Override. Start dispatching.
         */
        onLoad() {
            super.onLoad();
            // Start dispatching
            this.start();
        }
        /**
         * Raises the <c>ended</c> event
         */
        onEnded() {
            if (this._ended) {
                this._ended.raise();
            }
            latte.log(this.notes);
            latte.DialogView.inform(strings.installComplete, strings.installCompleteDesc, [
                new latte.ButtonItem(strings.ok, null, () => document.location.reload(true))
            ]);
            latte.Element.body.removeClass('on-fragment-install');
        }
        /**
         * Gets an event raised when the install steps end
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
         * Gets the steps to execute on the wizard
         *
         * @returns {InstallWizardStep[]}
         */
        get steps() {
            if (!this._steps) {
                this._steps = [];
            }
            return this._steps;
        }
        /**
         * Gets the spinner element
         *
         * @returns {HTMLDivElement}
         */
        get spinner() {
            if (!this._spinner) {
                this._spinner = document.createElement('div');
                this._spinner.className = 'spinner';
            }
            return this._spinner;
        }
    }
    latte.InstallWizardView = InstallWizardView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/7/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageAdvancedView extends latte.ColumnView {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(r = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._page = null;
            if (r) {
                this.page = r;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override
         */
        onLoad() {
            this.items.add(this.form);
            if (this.page.canIWrite) {
                this.items.add(this.btnDelete);
            }
        }
        /**
         * Raises the <c>page</c> event
         */
        onPageChanged() {
            if (this._pageChanged) {
                this._pageChanged.raise();
            }
            this.form.record = this.page;
            this.form.readOnly = !this.page.canI(latte.Page.PERMISSION_WRITE);
        }
        /**
         * Raises the <c>sentToTrash</c> event
         */
        onSentToTrash() {
            if (this._sentToTrash) {
                this._sentToTrash.raise();
            }
        }
        /**
         * Sends the page to trash
         */
        sendToTrash() {
            latte.DialogView.confirmDelete(this.page.title, () => {
                this.page.sendToTrash().send(() => {
                    this.onSentToTrash();
                });
            });
        }
        /**
         * Gets an event raised when the value of the page property changes
         *
         * @returns {LatteEvent}
         */
        get pageChanged() {
            if (!this._pageChanged) {
                this._pageChanged = new latte.LatteEvent(this);
            }
            return this._pageChanged;
        }
        /**
         * Gets an event raised when the page is sent to trash
         *
         * @returns {LatteEvent}
         */
        get sentToTrash() {
            if (!this._sentToTrash) {
                this._sentToTrash = new latte.LatteEvent(this);
            }
            return this._sentToTrash;
        }
        /**
         * Gets or sets the page of the view
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the page of the view
         *
         * @param {Page} value
         */
        set page(value) {
            // Check if value changed
            let changed = value !== this._page;
            // Set value
            this._page = value;
            // Trigger changed event
            if (changed) {
                this.onPageChanged();
            }
        }
        /**
         * Gets the delete button
         *
         * @returns {ButtonItem}
         */
        get btnDelete() {
            if (!this._btnDelete) {
                this._btnDelete = new latte.ButtonItem(strings.sendToTrash, null, () => this.sendToTrash());
                this._btnDelete.addClass('danger');
            }
            return this._btnDelete;
        }
        /**
         * Gets the form item
         *
         * @returns {DataRecordFormItem}
         */
        get form() {
            if (!this._form) {
                this._form = new latte.DataRecordFormItem();
                this._form.category = 'advanced';
                this.saveItems.add(this._form);
            }
            return this._form;
        }
    }
    latte.PageAdvancedView = PageAdvancedView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 9/27/16.
 */
var latte;
(function (latte) {
    (function (ImageZoomMode) {
        ImageZoomMode[ImageZoomMode["ACTUAL_SIZE"] = 0] = "ACTUAL_SIZE";
        ImageZoomMode[ImageZoomMode["FIT"] = 1] = "FIT";
        ImageZoomMode[ImageZoomMode["NUMBER"] = 2] = "NUMBER";
    })(latte.ImageZoomMode || (latte.ImageZoomMode = {}));
    var ImageZoomMode = latte.ImageZoomMode;
    /**
     * Possible areas of crop
     */
    (function (CropArea) {
        CropArea[CropArea["NONE"] = 0] = "NONE";
        CropArea[CropArea["INSIDE"] = 1] = "INSIDE";
        CropArea[CropArea["TOP"] = 2] = "TOP";
        CropArea[CropArea["LEFT"] = 3] = "LEFT";
        CropArea[CropArea["RIGHT"] = 4] = "RIGHT";
        CropArea[CropArea["BOTTOM"] = 5] = "BOTTOM";
        CropArea[CropArea["TOP_LEFT"] = 6] = "TOP_LEFT";
        CropArea[CropArea["TOP_RIGHT"] = 7] = "TOP_RIGHT";
        CropArea[CropArea["BOTTOM_LEFT"] = 8] = "BOTTOM_LEFT";
        CropArea[CropArea["BOTTOM_RIGHT"] = 9] = "BOTTOM_RIGHT";
    })(latte.CropArea || (latte.CropArea = {}));
    var CropArea = latte.CropArea;
    (function (ImageEditorTool) {
        ImageEditorTool[ImageEditorTool["NONE"] = 0] = "NONE";
        ImageEditorTool[ImageEditorTool["CROP"] = 1] = "CROP";
    })(latte.ImageEditorTool || (latte.ImageEditorTool = {}));
    var ImageEditorTool = latte.ImageEditorTool;
    /**
     *
     */
    class ImageEditorView extends latte.ToolbarView {
        //endregion
        /**
         * Creates the editor view
         */
        constructor() {
            super();
            this.draggingCropArea = CropArea.NONE;
            this.undoStack = [];
            this.loadingFromUndo = false;
            this.defaultQuality = 0.85;
            this._quality = 0;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._bytes = 0;
            /**
             * Property field
             */
            this._cropBounds = null;
            /**
             * Property field
             */
            this._editable = true;
            /**
             * Property field
             */
            this._image = null;
            /**
             * Property field
             */
            this._mouseCropArea = null;
            /**
             * Property field
             */
            this._saveHandler = null;
            /**
             * Property field
             */
            this._tool = ImageEditorTool.NONE;
            /**
             * Property field
             */
            this._zoomMode = null;
            this.addClass('image-editor');
            this.toolbar.faceVisible = false;
            this.toolbar.items.add(this.btnSave);
            this.toolbar.items.add(this.btnUndo);
            this.toolbar.items.add(this.btnResize);
            this.toolbar.items.add(this.btnCrop);
            // this.toolbar.items.add(this.btnRotateCounterClockwise);
            this.toolbar.items.add(this.btnRotateClockwise);
            this.toolbar.sideItems.add(this.btnClose);
            this.toolbar.sideItems.add(this.btnCropNow);
            this.anchorBottom = this.bottomToolbar;
            this.bottomToolbar.faceVisible = false;
            this.bottomToolbar.items.add(this.lblInfo);
            this.bottomToolbar.sideItems.add(this.lblZoom);
            this.container.get(0).addEventListener('mousemove', (e) => this.mouseMove(e));
            this.container.get(0).addEventListener('mousedown', (e) => this.mouseDown(e));
            this.container.get(0).addEventListener('mouseup', (e) => this.mouseUp(e));
            this.container.append(this.canvas);
            this.bodyKeyChecker = (e) => {
                if (latte.View.modalView instanceof latte.DialogView) {
                    return;
                }
                let control = e.metaKey || e.ctrlKey;
                let something = true;
                let editable = this.editable;
                if (e.keyCode == latte.Key.ESCAPE) {
                    this.cancelCurrentAction();
                }
                else if (e.keyCode == latte.Key.ARROW_RIGHT && !control) {
                    this.onNextImageRequested();
                }
                else if (e.keyCode == latte.Key.ARROW_LEFT && !control) {
                    this.onPreviousImageRequested();
                }
                else if (e.keyCode == latte.Key.C && !control && editable) {
                    this.btnCrop.onClick();
                }
                else if (e.keyCode == latte.Key.I && !control && editable) {
                    this.btnResize.onClick();
                }
                else if (e.keyCode == latte.Key.R && !control && editable) {
                    this.rotateImageClockwise();
                }
                else if (e.keyCode == latte.Key.S && control && editable) {
                    this.btnSave.onClick();
                }
                else if (e.keyCode == latte.Key.S && !control && editable) {
                    this.btnResize.onClick();
                }
                else if (e.keyCode == latte.Key.Z && control && editable) {
                    this.undo();
                }
                else if (e.keyCode == latte.Key.SPACEBAR) {
                    this.swapZoom();
                }
                else if (e.keyCode == latte.Key.ENTER) {
                    if (this.tool == ImageEditorTool.NONE) {
                        this.swapZoom();
                    }
                    else if (this.tool == ImageEditorTool.CROP) {
                        this.cropNow();
                    }
                }
                else {
                    something = false;
                }
                if (something) {
                    e.preventDefault();
                }
            };
            window.addEventListener('keydown', this.bodyKeyChecker);
        }
        /**
         * Gets a function that saves the image on the editor to the specified file
         * @returns {null}
         */
        static fileSaver(file, editor) {
            return (callback) => {
                let img = editor.image;
                let can = editor.canvas;
                let rep = new latte.FileReplacer();
                can.style.visibility = 'hidden';
                editor.infoItem = editor.progressItem;
                rep.id = String(file.idfile);
                rep.width = img.naturalWidth;
                rep.height = img.naturalHeight;
                rep.base64 = latte.ImageUtil.getBase64(img.src);
                rep.progressChanged.add(() => {
                    editor.progressItem.value = Math.round(rep.progress * 100);
                });
                rep.complete.add(() => {
                    editor.infoItem = null;
                    can.style.visibility = 'visible';
                    file.path = rep.fileRecord.path;
                    file.size = rep.fileRecord.size;
                    if (latte._isFunction(callback)) {
                        callback();
                    }
                });
                rep.upload();
            };
        }
        /**
         * Creates an editor, shows it and returns it without any image
         * @returns {latte.ImageEditorView}
         */
        static showEditor(save = null) {
            let editor = new ImageEditorView();
            let current = latte.View.mainView;
            editor.closeRequested.add(() => {
                latte.View.mainView = current;
                editor.onClosed();
            });
            if (latte._isFunction(save)) {
                editor.saveHandler = save;
            }
            latte.View.mainView = editor;
            return editor;
        }
        /**
         * Shows the editor for the specified file
         * @param file
         */
        static editImageFile(file) {
            if (!file.isImage) {
                throw "Not an image";
            }
            // Configure Image Util for File transparency
            latte.ImageUtil.DEFAULT_TYPE = latte.ImageUtil.mimeTypeOf(file.extension);
            let editor = ImageEditorView.showEditor();
            editor.loadImageFromUrl(file.url);
            editor.saveHandler = ImageEditorView.fileSaver(file, editor);
            // editor.saveRequested.add(ImageEditorView.fileSaver(file, editor));
            return editor;
        }
        /**
         * Shows the editor for the specified files, starting by specified image as current.
         */
        static editImageFiles(files, current = 0) {
            let editor = ImageEditorView.showEditor();
            let goImage = (index) => {
                if (index < 0 || index >= files.length) {
                    throw "Index not in bounds";
                }
                let file = files[index];
                if (!file.isImage) {
                    throw "Not an image";
                }
                editor.loadImageFromUrl(file.url);
                editor.saveHandler = ImageEditorView.fileSaver(file, editor);
                // editor.saveRequested.handlers = [ImageEditorView.fileSaver(file, editor)];
                current = index;
            };
            let tryGo = (index) => {
                editor.dismissImage(() => {
                    goImage(index);
                });
            };
            editor.nextImageRequested.add(() => {
                if (current == files.length - 1) {
                    current = 0;
                }
                else {
                    current++;
                }
                tryGo(current);
            });
            editor.previousImageRequested.add(() => {
                if (current == 0) {
                    current = files.length - 1;
                }
                else {
                    current--;
                }
                tryGo(current);
            });
            tryGo(current);
            return editor;
        }
        /**
         * Shows the editor for the specified image's URL
         * @param url
         * @param save
         * @returns {ImageEditorView}
         */
        static editImageByUrl(url, save = null) {
            let editor = ImageEditorView.showEditor(save);
            editor.loadImageFromUrl(url);
            return editor;
        }
        /**
         *
         * @param image
         * @param save
         * @returns {ImageEditorView}
         */
        static editImage(image, save = null) {
            let editor = ImageEditorView.showEditor(save);
            editor.image = image;
            return editor;
        }
        //region Private Methods
        /**
         * Prepares UI for crop tool
         */
        activateCrop() {
            if (this._cropper) {
                return;
            }
            this.canvas.appendChild(this.cropper.element);
            this.canvas.appendChild(this.cropperOverlayTop);
            this.canvas.appendChild(this.cropperOverlayLeft);
            this.canvas.appendChild(this.cropperOverlayRight);
            this.canvas.appendChild(this.cropperOverlayBottom);
            this.cropBounds = {};
        }
        /**
         * Handles click on the close button
         */
        closeClick() {
            this.dismissImage(() => {
                this.onCloseRequested();
            });
        }
        /**
         * Actually performs the crop of the crop tool
         */
        cropNow() {
            this.enableControls(false);
            this.image = latte.ImageUtil.cropImage(this.image, this.cropBounds);
            this.enableControls(true);
            this.unsavedChanges = true;
            this.tool = ImageEditorTool.NONE;
        }
        /**
         * Checks image layout after image loading
         */
        layoutCheck() {
            let img = this.image;
            if (!img)
                return;
            let size = new latte.Size(this.container.width(), this.container.height());
            this.updateInfo();
            if (img.naturalWidth > size.width || img.naturalHeight > size.height) {
                this.zoomMode = ImageZoomMode.FIT;
            }
            else {
                this.zoomMode = ImageZoomMode.ACTUAL_SIZE;
            }
            this.canvas.style.visibility = 'visible';
        }
        /**
         * Gets the crop area depending on the specified point
         * @param x
         * @param y
         * @returns {any}
         */
        getCropArea(x, y) {
            if (!this._cropper) {
                return CropArea.NONE;
            }
            let cr = this.canvas.getBoundingClientRect();
            let canvasr = new latte.Rectangle(cr.left, cr.top, cr.width, cr.height);
            let br = this.cropper.element.getBoundingClientRect();
            let r = new latte.Rectangle(br.left, br.top, br.width, br.height);
            let sense = 10;
            // Sensors
            let sTop = new latte.Rectangle(r.left, r.top - sense, r.width, sense * 2);
            let sBottom = new latte.Rectangle(r.left, r.bottom - sense, r.width, sense * 2);
            let sLeft = new latte.Rectangle(r.left - sense, r.top, sense * 2, r.height);
            let sRight = new latte.Rectangle(r.right - sense, r.top, sense * 2, r.height);
            let sTopLeft = new latte.Rectangle(r.left - sense, r.top - sense, sense * 2, sense * 2);
            let sTopRight = new latte.Rectangle(r.right - sense, r.top - sense, sense * 2, sense * 2);
            let sBottomLeft = new latte.Rectangle(r.left - sense, r.bottom - sense, sense * 2, sense * 2);
            let sBottomRight = new latte.Rectangle(r.right - sense, r.bottom - sense, sense * 2, sense * 2);
            let checkers = [
                [CropArea.TOP_LEFT, sTopLeft],
                [CropArea.TOP_RIGHT, sTopRight],
                [CropArea.BOTTOM_RIGHT, sBottomRight],
                [CropArea.BOTTOM_LEFT, sBottomLeft],
                [CropArea.TOP, sTop],
                [CropArea.LEFT, sLeft],
                [CropArea.RIGHT, sRight],
                [CropArea.BOTTOM, sBottom],
            ];
            for (let i in checkers) {
                let checker = checkers[i][1];
                if (checker.contains(x, y)) {
                    return checkers[i][0];
                }
            }
            if (canvasr.contains(x, y)) {
                return CropArea.INSIDE;
            }
            return CropArea.NONE;
        }
        /**
         * Handles editor mousemove
         * @param e
         */
        mouseMove(e) {
            if (this.draggingCropArea) {
                this.updateCropperDrag(e.x, e.y);
            }
            else {
                if (this.tool == ImageEditorTool.CROP) {
                    this.mouseCropArea = this.getCropArea(e.clientX, e.clientY);
                }
            }
        }
        /**
         * Handles editor mouse up
         * @param e
         */
        mouseUp(e) {
            if (this.draggingCropArea) {
                this.draggingCropArea = null;
                this.cropBounds = this.cropBoundsCorrection(this.cropBounds);
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            else {
                this.swapZoom();
            }
        }
        /**
         * Handles editor mouse down
         * @param e
         */
        mouseDown(e) {
            let cropArea = this.getCropArea(e.clientX, e.clientY);
            if (cropArea != CropArea.NONE) {
                if (cropArea == CropArea.INSIDE) {
                    // Set cropper to cross-hair position
                    this.cropBounds = {
                        left: this.toActualX(e.clientX),
                        top: this.toActualY(e.clientY),
                        right: this.image.naturalWidth - this.toActualX(e.clientX),
                        bottom: this.image.naturalHeight - this.toActualY(e.clientY),
                    };
                    // Set Crop Area to SouthEast
                    cropArea = CropArea.BOTTOM_RIGHT;
                }
                this.draggingCropArea = cropArea;
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }
        /**
         * Transforms a client coordinate to an image coordinate
         * @param x
         * @returns {number}
         */
        toActualX(x) {
            let r = this.canvas.getBoundingClientRect();
            return (x - r.left) / (this.canvas.clientWidth / this.image.naturalWidth);
        }
        /**
         * Transforms a client coordinate to an image coordinate
         * @param y
         * @returns {number}
         */
        toActualY(y) {
            let r = this.canvas.getBoundingClientRect();
            return (y - r.top) / (this.canvas.clientHeight / this.image.naturalHeight);
        }
        /**
         * Updates the cropper by the current draggingCropArea
         * @param x
         * @param y
         */
        updateCropperDrag(x, y) {
            let r = this.canvas.getBoundingClientRect();
            let b = {};
            for (let i in this.cropBounds)
                b[i] = this.cropBounds[i];
            let vz = this.canvas.clientHeight / this.image.naturalHeight;
            let hz = this.canvas.clientWidth / this.image.naturalWidth;
            switch (this.draggingCropArea) {
                case CropArea.TOP:
                    b.top = (y - r.top) / vz;
                    break;
                case CropArea.LEFT:
                    b.left = (x - r.left) / hz;
                    break;
                case CropArea.BOTTOM:
                    b.bottom = (r.bottom - y) / vz;
                    break;
                case CropArea.RIGHT:
                    b.right = (r.right - x) / hz;
                    break;
                case CropArea.TOP_LEFT:
                    b.top = (y - r.top) / vz;
                    b.left = (x - r.left) / hz;
                    break;
                case CropArea.TOP_RIGHT:
                    b.top = (y - r.top) / vz;
                    b.right = (r.right - x) / hz;
                    break;
                case CropArea.BOTTOM_LEFT:
                    b.bottom = (r.bottom - y) / vz;
                    b.left = (x - r.left) / hz;
                    break;
                case CropArea.BOTTOM_RIGHT:
                    b.bottom = (r.bottom - y) / vz;
                    b.right = (r.right - x) / hz;
                    break;
            }
            this.cropBounds = b;
        }
        /**
         * Converts the crop bounds to an actual rectangle
         * @param b
         * @returns {latte.Rectangle}
         */
        cropBoundsToRectangle(b) {
            let imgW = this.image.naturalWidth;
            let imgH = this.image.naturalHeight;
            let top = b.top || 0;
            let left = b.left || 0;
            let right = b.right || 0;
            let bottom = b.bottom || 0;
            return new latte.Rectangle(left, top, imgW - left - right, imgH - top - bottom);
        }
        /**
         * Returns a corrected ICropBounds object, making the rectangle absolute and
         * not larger than the image or canvas
         * @param b
         * @returns {{top: number, left: number, right: number, bottom: number}}
         */
        cropBoundsCorrection(b) {
            let imgW = this.image.naturalWidth;
            let imgH = this.image.naturalHeight;
            let r = this.cropBoundsToRectangle(b).absolute();
            // Max out for natural size
            r = r.intersection(new latte.Rectangle(0, 0, imgW, imgH));
            return {
                top: r.top,
                left: r.left,
                right: imgW - r.right,
                bottom: imgH - r.bottom
            };
        }
        swapZoom() {
            if (this.zoomMode == ImageZoomMode.FIT) {
                this.zoomMode = ImageZoomMode.ACTUAL_SIZE;
            }
            else {
                this.zoomMode = ImageZoomMode.FIT;
            }
        }
        updateInfo() {
            switch (this.tool) {
                case ImageEditorTool.NONE:
                    let sw = latte.Culture.formatNumber(this.image.naturalWidth);
                    let sh = latte.Culture.formatNumber(this.image.naturalHeight);
                    this.lblInfo.text = latte.sprintf("%spx x %spx (%s)", sw, sh, latte.File.humanSizeOf(this.bytes));
                    break;
                case ImageEditorTool.CROP:
                    let r = this.cropBoundsToRectangle(this.cropBounds);
                    let cw = latte.Culture.formatNumber(r.width);
                    let ch = latte.Culture.formatNumber(r.height);
                    this.lblInfo.text = latte.sprintf("%spx x %spx", cw, ch);
                    break;
            }
        }
        //endregion
        //region Methods
        /**
         * Cancels current action
         */
        cancelCurrentAction() {
            switch (this.tool) {
                case ImageEditorTool.NONE:
                    this.btnClose.onClick();
                    break;
                case ImageEditorTool.CROP:
                    this.tool = ImageEditorTool.NONE;
                    break;
            }
        }
        /**
         * Tries to dismiss the image, first asking for saving changes
         * @param callback
         */
        dismissImage(callback) {
            if (this.unsavedChanges) {
                latte.DialogView.ask(strings.unsavedChanges, strings.saveChangesOnImageQ, [
                    new latte.ButtonItem(strings.yesSaveChanges, null, () => {
                        // this.closeAfterSave = true;
                        this.save(callback);
                    }),
                    new latte.ButtonItem(strings.noIgnoreChanges, null, () => {
                        this.unsavedChanges = false;
                        callback();
                    }),
                    new latte.ButtonItem(strings.cancel)
                ]);
            }
            else {
                callback();
            }
        }
        /**
         * Changes the enable state of controls
         * @param enabled
         */
        /**
         * Gets the quality setting for images
         * @param callback
         */
        getQuality(callback) {
            if (ImageEditorView.QUALITY) {
                callback(ImageEditorView.QUALITY);
            }
            else {
                latte.Setting.getGlobalByName('image-quality').send((s) => {
                    ImageEditorView.QUALITY = parseFloat(s.value) || latte.ImageUtil.DEFAULT_QUALITY;
                    // Is this a patch?
                    latte.ImageUtil.DEFAULT_QUALITY = ImageEditorView.QUALITY;
                    callback(ImageEditorView.QUALITY);
                });
            }
        }
        enableControls(enabled) {
            this.btnUndo.enabled =
                this.btnResize.enabled =
                    this.btnCrop.enabled =
                        this.btnRotateClockwise.enabled = enabled;
            this.btnSave.enabled = enabled && this.unsavedChanges;
        }
        /**
         * Loads the image from the specified url
         * @param url
         */
        loadImageFromUrl(url) {
            this.image = null;
            this.infoItem = this.progressItem;
            let loader = new latte.ImageLoader(url);
            loader.progressChanged.add(() => {
                this.progressItem.value = loader.progress * 100;
            });
            loader.ended.add(() => {
                this.image = loader.resultImage;
                this.bytes = loader.resultBytes;
                this.infoItem = null;
            });
            loader.start();
        }
        /**
         * Raises the <c>bytes</c> event
         */
        onBytesChanged() {
            if (this._bytesChanged) {
                this._bytesChanged.raise();
            }
            this.updateInfo();
        }
        /**
         * Raises the <c>closed</c> event
         */
        onClosed() {
            if (this._closed) {
                this._closed.raise();
            }
            window.removeEventListener('keydown', this.bodyKeyChecker);
        }
        /**
         * Raises the <c>closeRequested</c> event
         */
        onCloseRequested() {
            if (this._closeRequested) {
                this._closeRequested.raise();
            }
        }
        /**
         * Raises the <c>cropBounds</c> event
         */
        onCropBoundsChanged() {
            if (this._cropBoundsChanged) {
                this._cropBoundsChanged.raise();
            }
            if (this._cropper) {
                let bounds = this.cropBoundsCorrection(this.cropBounds);
                let vz = this.canvas.clientHeight / this.image.naturalHeight;
                let hz = this.canvas.clientWidth / this.image.naturalWidth;
                let top = vz * (bounds.top || 0);
                let left = hz * (bounds.left || 0);
                let right = hz * (bounds.right || 0);
                let bottom = vz * (bounds.bottom || 0);
                this.cropper.style.top = top + 'px';
                this.cropper.style.left = left + 'px';
                this.cropper.style.right = right + 'px';
                this.cropper.style.bottom = bottom + 'px';
                this.cropperOverlayTop.style.height = top + 'px';
                this.cropperOverlayLeft.style.width = left + 'px';
                this.cropperOverlayLeft.style.top = top + 'px';
                this.cropperOverlayLeft.style.bottom = bottom + 'px';
                this.cropperOverlayRight.style.width = right + 'px';
                this.cropperOverlayRight.style.top = top + 'px';
                this.cropperOverlayRight.style.bottom = bottom + 'px';
                this.cropperOverlayBottom.style.height = bottom + 'px';
            }
            this.updateInfo();
        }
        /**
         * Raises the <c>editable</c> event
         */
        onEditableChanged() {
            if (this._editableChanged) {
                this._editableChanged.raise();
            }
            this.btnSave.visible = this.editable;
            this.btnRotateClockwise.visible = this.editable;
            this.btnRotateCounterClockwise.visible = this.editable;
            this.btnUndo.visible = this.editable;
            this.btnCrop.visible = this.editable;
            this.btnResize.visible = this.editable;
        }
        /**
         * Raises the <c>image</c> event
         */
        onImageChanged() {
            if (this._imageChanged) {
                this._imageChanged.raise();
            }
            $(this.canvas).empty();
            this._cropper = null;
            if (this.image) {
                // Wait for quality parameter before loading image
                this.getQuality(q => {
                    if (this.image.src.indexOf('data:image') === 0) {
                        this.bytes = latte.ImageUtil.base64ByteSize(latte.ImageUtil.getBase64(this.image.src));
                    }
                    this.zoomMode = null;
                    this.canvas.appendChild(this.image);
                    this.canvas.style.visibility = 'hidden';
                    if (this.image.naturalWidth > 0) {
                        this.layoutCheck();
                    }
                    else {
                        this.image.onload = () => { this.layoutCheck(); };
                    }
                    this.btnUndo.enabled = this.undoStack.length > 0;
                });
            }
        }
        /**
         * Raises the <c>mouseCropArea</c> event
         */
        onMouseCropAreaChanged() {
            if (this._mouseCropAreaChanged) {
                this._mouseCropAreaChanged.raise();
            }
            let n = 'default';
            switch (this.mouseCropArea) {
                case CropArea.TOP:
                    n = 'ns-resize';
                    break;
                case CropArea.BOTTOM:
                    n = 'ns-resize';
                    break;
                case CropArea.LEFT:
                    n = 'ew-resize';
                    break;
                case CropArea.RIGHT:
                    n = 'ew-resize';
                    break;
                case CropArea.TOP_LEFT:
                    n = 'nwse-resize';
                    break;
                case CropArea.TOP_RIGHT:
                    n = 'nesw-resize';
                    break;
                case CropArea.BOTTOM_LEFT:
                    n = 'nesw-resize';
                    break;
                case CropArea.BOTTOM_RIGHT:
                    n = 'nwse-resize';
                    break;
                case CropArea.INSIDE:
                    n = 'crosshair';
                    break;
            }
            this.container.css('cursor', n);
        }
        /**
         * Raises the <c>nextImageRequested</c> event
         */
        onNextImageRequested() {
            if (this._nextImageRequested) {
                this._nextImageRequested.raise();
            }
        }
        /**
         * Raises the <c>previousImageRequested</c> event
         */
        onPreviousImageRequested() {
            if (this._previousImageRequested) {
                this._previousImageRequested.raise();
            }
        }
        /**
         * Raises the <c>saved</c> event
         */
        onSaved() {
            if (this._saved) {
                this._saved.raise();
            }
            this.unsavedChanges = false;
        }
        /**
         * Raises the <c>saveHandler</c> event
         */
        onSaveHandlerChanged() {
            if (this._saveHandlerChanged) {
                this._saveHandlerChanged.raise();
            }
            //TODO: Aqui me quede, reemplazar por saveRequested para hacer chaining
        }
        /**
         * Raises the <c>tool</c> event
         */
        onToolChanged() {
            if (this._toolChanged) {
                this._toolChanged.raise();
            }
            switch (this.tool) {
                case ImageEditorTool.NONE:
                    if (this._cropper) {
                        this._cropper.removeFromParent();
                        this._cropperOverlayTop.remove();
                        this._cropperOverlayLeft.remove();
                        this._cropperOverlayRight.remove();
                        this._cropperOverlayBottom.remove();
                        this._cropper = null;
                    }
                    this.container.css('cursor', 'default');
                    this.btnCropNow.visible = false;
                    this.btnClose.visible = true;
                    this.btnCrop.enabled = true;
                    break;
                case ImageEditorTool.CROP:
                    this.activateCrop();
                    this.btnCropNow.visible = true;
                    this.btnClose.visible = false;
                    this.btnCrop.enabled = false;
                    break;
            }
            this.updateInfo();
        }
        /**
         * Override
         */
        onUnsavedChangesChanged() {
            super.onUnsavedChangesChanged();
            this.btnSave.enabled = this.unsavedChanges;
        }
        /**
         * Raises the <c>zoomMode</c> event
         */
        onZoomModeChanged() {
            if (this._zoomModeChanged) {
                this._zoomModeChanged.raise();
            }
            if (this.zoomMode == null) {
                return;
            }
            let size = new latte.Size(this.container.width(), this.container.height());
            let img = this.image;
            if (!img) {
                return;
            }
            let can = new latte.Element(this.canvas);
            let imgSize = new latte.Size(img.naturalWidth, img.naturalHeight);
            this._zoom = 1;
            can.removeClass('centered-x');
            can.removeClass('centered-y');
            can.style.marginTop = '';
            can.style.marginLeft = '';
            switch (this.zoomMode) {
                case ImageZoomMode.ACTUAL_SIZE:
                    can.width = img.naturalWidth;
                    can.height = img.naturalHeight;
                    this.lblZoom.text = strings.actualSize;
                    break;
                case ImageZoomMode.FIT:
                    let fitted = imgSize.scaleToFit(size);
                    can.width = fitted.width;
                    can.height = fitted.height;
                    this._zoom = fitted.area / imgSize.area;
                    this.lblZoom.text = latte.sprintf("%s%", Math.round(this.zoom * 100));
                    break;
            }
            img.width = can.width;
            img.height = can.height;
            if (size.width > img.width) {
                can.addClass('centered-x');
                can.style.marginLeft = latte.sprintf('%spx', Math.round(-img.width / 2));
            }
            if (size.height > img.height) {
                can.addClass('centered-y');
                can.style.marginTop = latte.sprintf('%spx', Math.round(-img.height / 2));
            }
            if (size.height < img.height && size.width < img.height) {
                can.addClass('overflow');
            }
            else {
                can.removeClass('overflow');
            }
            if (!size.contains(imgSize)) {
                this.container.css('overflow', 'auto');
            }
            if (this._cropper) {
                // Force update of cropper
                this.onCropBoundsChanged();
            }
        }
        /**
         * Rotates the image counter clockwise
         */
        rotateImageCounterClockwise() {
            this.enableControls(false);
            this.image = latte.ImageUtil.rotateCounterClockwise(this.image);
            this.enableControls(false);
            this.unsavedChanges = true;
        }
        /**
         * Rotates the image clockwise
         */
        rotateImageClockwise() {
            this.enableControls(false);
            this.image = latte.ImageUtil.rotateClockwise(this.image);
            this.enableControls(true);
            this.unsavedChanges = true;
        }
        /**
         * Tries to save the image, and calls the callback when done
         * @param callback
         */
        save(callback = null) {
            if (this.saveHandler) {
                let f = this.saveHandler;
                f(() => {
                    this.onSaved();
                    if (latte._isFunction(callback)) {
                        callback();
                    }
                });
            }
            else {
                if (latte._isFunction(callback)) {
                    callback();
                }
            }
        }
        /**
         * Shows a dialog for resizing the image
         */
        showResizeDialog() {
            let width = this.image.naturalWidth;
            let height = this.image.naturalHeight;
            let scale = 1;
            let newWidth = width;
            let newHeight = height;
            let form = new latte.FormView();
            let wpx = new latte.InputItem(strings.widthPx, 'integer', width);
            let hpx = new latte.InputItem(strings.heightPx, 'integer', height);
            let sp = new latte.InputItem(strings.scaleImg, 'number', 100);
            let twpx = wpx.valueItem;
            let thpx = hpx.valueItem;
            let tscale = sp.valueItem;
            let updating = false;
            let updatingScale = false;
            let updateUI = () => {
                updating = true;
                twpx.value = String(newWidth);
                thpx.value = String(newHeight);
                if (!updatingScale) {
                    sp.value = String(Math.round(newWidth / width * 100));
                }
                updating = false;
            };
            wpx.valueChanged.add(() => {
                if (updating)
                    return;
                newWidth = parseFloat(wpx.value);
                newHeight = Math.round(newWidth * height / width);
                updateUI();
            });
            hpx.valueChanged.add(() => {
                if (updating)
                    return;
                newHeight = parseFloat(hpx.value);
                newWidth = Math.round(newHeight * width / height);
                updateUI();
            });
            sp.valueChanged.add(() => {
                if (updating)
                    return;
                updatingScale = true;
                var area = (new latte.Size(width, height)).area;
                var newArea = parseFloat(sp.value) / 100;
                newHeight = Math.round((area * newArea) / width);
                newWidth = Math.round(newHeight * width / height);
                updateUI();
                updatingScale = false;
            });
            tscale.sideLabel.text = '%';
            form.inputs.add(sp);
            form.inputs.add(wpx);
            form.inputs.add(hpx);
            let resizeNow = () => {
                if (newWidth != width || newHeight != height) {
                    this.enableControls(false);
                    let src = latte.ImageUtil.resizeImage(this.image, {
                        size: new latte.Size(newWidth, newHeight),
                        fit: latte.ImageFit.AspectFit
                    });
                    let img = document.createElement('img');
                    img.src = src;
                    this.image = img;
                    this.enableControls(true);
                    this.unsavedChanges = true;
                }
            };
            let d = new latte.DialogView();
            d.view = form;
            d.title = strings.resizeImage;
            d.addOkButton(() => resizeNow());
            d.addCancelButton();
            d.show();
        }
        /**
         * Undoes the last action
         */
        undo() {
            if (this.undoStack.length > 0) {
                let move = this.undoStack.pop();
                this.loadingFromUndo = true;
                this.image = move.image;
                this.loadingFromUndo = false;
            }
        }
        /**
         * Gets an event raised when the value of the bytes property changes
         *
         * @returns {LatteEvent}
         */
        get bytesChanged() {
            if (!this._bytesChanged) {
                this._bytesChanged = new latte.LatteEvent(this);
            }
            return this._bytesChanged;
        }
        /**
         * Gets an event raised when the editor has been closed
         *
         * @returns {LatteEvent}
         */
        get closed() {
            if (!this._closed) {
                this._closed = new latte.LatteEvent(this);
            }
            return this._closed;
        }
        /**
         * Gets an event raised when the close of editor has been requested
         *
         * @returns {LatteEvent}
         */
        get closeRequested() {
            if (!this._closeRequested) {
                this._closeRequested = new latte.LatteEvent(this);
            }
            return this._closeRequested;
        }
        /**
         * Gets an event raised when the value of the cropBounds property changes
         *
         * @returns {LatteEvent}
         */
        get cropBoundsChanged() {
            if (!this._cropBoundsChanged) {
                this._cropBoundsChanged = new latte.LatteEvent(this);
            }
            return this._cropBoundsChanged;
        }
        /**
         * Gets an event raised when the value of the editable property changes
         *
         * @returns {LatteEvent}
         */
        get editableChanged() {
            if (!this._editableChanged) {
                this._editableChanged = new latte.LatteEvent(this);
            }
            return this._editableChanged;
        }
        /**
         * Gets an event raised when the value of the image property changes
         *
         * @returns {LatteEvent}
         */
        get imageChanged() {
            if (!this._imageChanged) {
                this._imageChanged = new latte.LatteEvent(this);
            }
            return this._imageChanged;
        }
        /**
         * Gets an event raised when the value of the mouseCropArea property changes
         *
         * @returns {LatteEvent}
         */
        get mouseCropAreaChanged() {
            if (!this._mouseCropAreaChanged) {
                this._mouseCropAreaChanged = new latte.LatteEvent(this);
            }
            return this._mouseCropAreaChanged;
        }
        /**
         * Gets an event raised when the next image is requested
         *
         * @returns {LatteEvent}
         */
        get nextImageRequested() {
            if (!this._nextImageRequested) {
                this._nextImageRequested = new latte.LatteEvent(this);
            }
            return this._nextImageRequested;
        }
        /**
         * Gets an event raised when the previous image is requested
         *
         * @returns {LatteEvent}
         */
        get previousImageRequested() {
            if (!this._previousImageRequested) {
                this._previousImageRequested = new latte.LatteEvent(this);
            }
            return this._previousImageRequested;
        }
        /**
         * Gets an event raised when the image is saved
         *
         * @returns {LatteEvent}
         */
        get saved() {
            if (!this._saved) {
                this._saved = new latte.LatteEvent(this);
            }
            return this._saved;
        }
        /**
         * Gets an event raised when the value of the saveHandler property changes
         *
         * @returns {LatteEvent}
         */
        get saveHandlerChanged() {
            if (!this._saveHandlerChanged) {
                this._saveHandlerChanged = new latte.LatteEvent(this);
            }
            return this._saveHandlerChanged;
        }
        /**
         * Gets an event raised when the value of the tool property changes
         *
         * @returns {LatteEvent}
         */
        get toolChanged() {
            if (!this._toolChanged) {
                this._toolChanged = new latte.LatteEvent(this);
            }
            return this._toolChanged;
        }
        /**
         * Gets an event raised when the value of the zoomMode property changes
         *
         * @returns {LatteEvent}
         */
        get zoomModeChanged() {
            if (!this._zoomModeChanged) {
                this._zoomModeChanged = new latte.LatteEvent(this);
            }
            return this._zoomModeChanged;
        }
        /**
         * Gets or sets the size of the image in bytes
         *
         * @returns {number}
         */
        get bytes() {
            return this._bytes;
        }
        /**
         * Gets or sets the size of the image in bytes
         *
         * @param {number} value
         */
        set bytes(value) {
            // Check if value changed
            let changed = value !== this._bytes;
            // Set value
            this._bytes = value;
            // Trigger changed event
            if (changed) {
                this.onBytesChanged();
            }
        }
        /**
         * Gets or sets the crop bounds
         *
         * @returns {ICropBounds}
         */
        get cropBounds() {
            return this._cropBounds;
        }
        /**
         * Gets or sets the crop bounds
         *
         * @param {ICropBounds} value
         */
        set cropBounds(value) {
            // Check if value changed
            let changed = value !== this._cropBounds;
            // Set value
            this._cropBounds = value;
            // Trigger changed event
            if (changed) {
                this.onCropBoundsChanged();
            }
        }
        /**
         * Gets or sets a value indicating if the image should be editable
         *
         * @returns {boolean}
         */
        get editable() {
            return this._editable;
        }
        /**
         * Gets or sets a value indicating if the image should be editable
         *
         * @param {boolean} value
         */
        set editable(value) {
            // Check if value changed
            let changed = value !== this._editable;
            // Set value
            this._editable = value;
            // Trigger changed event
            if (changed) {
                this.onEditableChanged();
            }
        }
        /**
         * Gets or sets the image of the editor
         *
         * @returns {HTMLImageElement}
         */
        get image() {
            return this._image;
        }
        /**
         * Gets or sets the image of the editor
         *
         * @param {HTMLImageElement} value
         */
        set image(value) {
            if (this._image) {
                if (!this.loadingFromUndo) {
                    this.undoStack.push({
                        image: this.image,
                        bytes: this.bytes
                    });
                }
            }
            // Check if value changed
            let changed = value !== this._image;
            // Set value
            this._image = value;
            // Trigger changed event
            if (changed) {
                this.onImageChanged();
            }
        }
        /**
         * Gets or sets the CropArea of current mouse position
         *
         * @returns {CropArea}
         */
        get mouseCropArea() {
            return this._mouseCropArea;
        }
        /**
         * Gets or sets the CropArea of current mouse position
         *
         * @param {CropArea} value
         */
        set mouseCropArea(value) {
            // Check if value changed
            let changed = value !== this._mouseCropArea;
            // Set value
            this._mouseCropArea = value;
            // Trigger changed event
            if (changed) {
                this.onMouseCropAreaChanged();
            }
        }
        /**
         * Gets or sets the save handler of the view
         *
         * @returns {(callback: () => any) => any}
         */
        get saveHandler() {
            return this._saveHandler;
        }
        /**
         * Gets or sets the save handler of the view
         *
         * @param {(callback: () => any) => any} value
         */
        set saveHandler(value) {
            // Check if value changed
            let changed = value !== this._saveHandler;
            // Set value
            this._saveHandler = value;
            // Trigger changed event
            if (changed) {
                this.onSaveHandlerChanged();
            }
        }
        /**
         * Gets or sets the current tool of the editor
         *
         * @returns {ImageEditorTool}
         */
        get tool() {
            return this._tool;
        }
        /**
         * Gets or sets the current tool of the editor
         *
         * @param {ImageEditorTool} value
         */
        set tool(value) {
            // Check if value changed
            let changed = value !== this._tool;
            // Set value
            this._tool = value;
            // Trigger changed event
            if (changed) {
                this.onToolChanged();
            }
        }
        /**
         * Gets the current zoom level. (1 is 100%)
         *
         * @returns {number}
         */
        get zoom() {
            return this._zoom;
        }
        /**
         * Gets or sets the image zoom mode
         *
         * @returns {ImageZoomMode}
         */
        get zoomMode() {
            return this._zoomMode;
        }
        /**
         * Gets or sets the image zoom mode
         *
         * @param {ImageZoomMode} value
         */
        set zoomMode(value) {
            // Check if value changed
            let changed = value !== this._zoomMode;
            // Set value
            this._zoomMode = value;
            // Trigger changed event
            if (changed) {
                this.onZoomModeChanged();
            }
        }
        /**
         * Gets the bottom toolbar
         *
         * @returns {Toolbar}
         */
        get bottomToolbar() {
            if (!this._bottomToolbar) {
                this._bottomToolbar = new latte.Toolbar();
            }
            return this._bottomToolbar;
        }
        /**
         * Gets the close button
         *
         * @returns {ButtonItem}
         */
        get btnClose() {
            if (!this._btnClose) {
                this._btnClose = new latte.ButtonItem(null, latte.LinearIcon.cross, () => this.closeClick());
            }
            return this._btnClose;
        }
        /**
         * Gets the crop button
         *
         * @returns {ButtonItem}
         */
        get btnCrop() {
            if (!this._btnCrop) {
                this._btnCrop = new latte.ButtonItem(null, latte.LinearIcon.crop, () => this.tool = ImageEditorTool.CROP);
            }
            return this._btnCrop;
        }
        /**
         * Gets the crop now button
         *
         * @returns {ButtonItem}
         */
        get btnCropNow() {
            if (!this._btnCropNow) {
                this._btnCropNow = new latte.ButtonItem(strings.cropNow, null, () => this.cropNow());
                this._btnCropNow.visible = false;
            }
            return this._btnCropNow;
        }
        /**
         * Gets the resize button
         *
         * @returns {ButtonItem}
         */
        get btnResize() {
            if (!this._btnResize) {
                this._btnResize = new latte.ButtonItem(null, latte.LinearIcon.frame_expand, () => this.showResizeDialog());
            }
            return this._btnResize;
        }
        /**
         * Gets the rotate clockwise button
         *
         * @returns {ButtonItem}
         */
        get btnRotateClockwise() {
            if (!this._btnRotateClockwise) {
                this._btnRotateClockwise = new latte.ButtonItem(null, latte.LinearIcon.redo, () => this.rotateImageClockwise());
            }
            return this._btnRotateClockwise;
        }
        /**
         * Gets the rotate counter clockwise button
         *
         * @returns {ButtonItem}
         */
        get btnRotateCounterClockwise() {
            if (!this._btnRotateCounterClockwise) {
                this._btnRotateCounterClockwise = new latte.ButtonItem(null, latte.LinearIcon.undo, () => this.rotateImageCounterClockwise());
            }
            return this._btnRotateCounterClockwise;
        }
        /**
         * Gets the save button
         *
         * @returns {ButtonItem}
         */
        get btnSave() {
            if (!this._btnSave) {
                this._btnSave = new latte.ButtonItem(null, latte.LinearIcon.cloud_upload, () => this.save());
                this._btnSave.enabled = false;
            }
            return this._btnSave;
        }
        /**
         * Gets the undo button
         *
         * @returns {ButtonItem}
         */
        get btnUndo() {
            if (!this._btnUndo) {
                this._btnUndo = new latte.ButtonItem(null, latte.LinearIcon.undo, () => this.undo());
                this._btnUndo.enabled = false;
            }
            return this._btnUndo;
        }
        /**
         * Gets the canvas where image is placed
         *
         * @returns {HTMLCanvasElement}
         */
        get canvas() {
            if (!this._canvas) {
                this._canvas = document.createElement('div');
                this._canvas.className = 'canvas';
            }
            return this._canvas;
        }
        /**
         * Gets the cropper element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get cropper() {
            if (!this._cropper) {
                this._cropper = new latte.Element(document.createElement('div'));
                this._cropper.addClass('cropper');
            }
            return this._cropper;
        }
        /**
         * Gets the cropper overlay top
         *
         * @returns {HTMLDivElement}
         */
        get cropperOverlayTop() {
            if (!this._cropperOverlayTop) {
                this._cropperOverlayTop = document.createElement('div');
                this._cropperOverlayTop.className = 'cropper-overlay top';
            }
            return this._cropperOverlayTop;
        }
        /**
         * Gets the cropper overlay top
         *
         * @returns {HTMLDivElement}
         */
        get cropperOverlayLeft() {
            if (!this._cropperOverlayLeft) {
                this._cropperOverlayLeft = document.createElement('div');
                this._cropperOverlayLeft.className = 'cropper-overlay left';
            }
            return this._cropperOverlayLeft;
        }
        /**
         * Gets the cropper overlay top
         *
         * @returns {HTMLDivElement}
         */
        get cropperOverlayRight() {
            if (!this._cropperOverlayRight) {
                this._cropperOverlayRight = document.createElement('div');
                this._cropperOverlayRight.className = 'cropper-overlay right';
            }
            return this._cropperOverlayRight;
        }
        /**
         * Gets the cropper overlay top
         *
         * @returns {HTMLDivElement}
         */
        get cropperOverlayBottom() {
            if (!this._cropperOverlayBottom) {
                this._cropperOverlayBottom = document.createElement('div');
                this._cropperOverlayBottom.className = 'cropper-overlay bottom';
            }
            return this._cropperOverlayBottom;
        }
        /**
         * Gets the info label
         *
         * @returns {LabelItem}
         */
        get lblInfo() {
            if (!this._lblInfo) {
                this._lblInfo = new latte.LabelItem();
            }
            return this._lblInfo;
        }
        /**
         * Gets the zoom label
         *
         * @returns {LabelItem}
         */
        get lblZoom() {
            if (!this._lblZoom) {
                this._lblZoom = new latte.LabelItem();
            }
            return this._lblZoom;
        }
        /**
         * Gets the progress item
         *
         * @returns {ProgressItem}
         */
        get progressItem() {
            if (!this._progressItem) {
                this._progressItem = new latte.ProgressItem();
                this._progressItem.animated = false;
                this._progressItem.element.css('min-width', 100);
                this._progressItem.element.css('max-width', 100);
            }
            return this._progressItem;
        }
    }
    latte.ImageEditorView = ImageEditorView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/16/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageConfigurationView extends latte.View {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the view
         */
        constructor(r) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._page = null;
            this.container.get(0).appendChild(this.textbox.element);
            this.page = r;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Loads data
         */
        onLoad() {
            this.page.getConfiguration().send((config) => {
                this.textbox.text = config;
            });
        }
        getSaveCalls() {
            return [
                this.page.setConfiguration(this.textbox.text).withHandlers((s) => {
                    this.page.configurationSetting = s;
                    this.unsavedChanges = false;
                })];
        }
        /**
         * Gets the textbox
         *
         * @returns {Textbox}
         */
        get textbox() {
            if (!this._textbox) {
                this._textbox = new latte.Element(document.createElement('textarea'));
                this._textbox.addClass('page-configuration');
                this._textbox.addEventListener('input', () => this.unsavedChanges = true);
            }
            return this._textbox;
        }
        /**
         * Gets or sets the page of theview
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the page of theview
         *
         * @param {Page} value
         */
        set page(value) {
            this._page = value;
        }
    }
    latte.PageConfigurationView = PageConfigurationView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/18/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageDetailView extends latte.ColumnView {
        //endregion
        /**
         * Creates the view
         */
        constructor() {
            super();
            //region Static
            //endregion
            //region Fields
            this.validated = true;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._page = null;
            this.addClass('page-detail-view');
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds settings to the view
         * @param settings
         * @param values
         */
        addSettings(settings, values) {
            for (let key in settings) {
                let setting = values[key];
                if (!setting) {
                    setting = new latte.Setting();
                    setting.owner = 'Page';
                    setting.idowner = this.page.idpage;
                    setting.name = key;
                }
                let input = latte.PageConfiguration.inputFromSetting(settings[key]);
                input.tag = {
                    data: settings[key],
                    record: setting,
                    changes: false
                };
                //TODO: CHECK HERE TO VALIDATE REQUIRED ATTRIBUTE
                if (setting.idsetting > 0) {
                    input.value = setting.value;
                }
                // When changes value, activate changes flag
                ((input) => {
                    input.valueChanged.add(() => {
                        input.tag.changes = true;
                    });
                })(input);
                this.settingsForm.inputs.add(input);
            }
        }
        /**
         * Loads the settings of the page
         */
        loadSettings() {
            if (!this.page.configuration.pack) {
                this.page.configuration.reloadPack(() => this.loadSettings());
                return;
            }
            // Clear settings
            this.settingsForm.inputs.clear();
            // Add settings inputs
            this.addSettings(this.page.configuration.settings, this.page.configuration.settingsValues);
            // Set settings form visibility
            this.settingsForm.visible = this.settingsForm.inputs.count > 0;
        }
        /**
         * Override
         */
        onLoad() {
            super.onLoad();
            if (this.page.canIWrite) {
                this.items.add(this.btnOpen);
            }
            this.items.addArray([
                this.dataForm,
                this.settingsForm
            ]);
        }
        /**
         * Raises the <c>page</c> event
         */
        onPageChanged() {
            if (this._pageChanged) {
                this._pageChanged.raise();
            }
            this.page.onlineChanged.add(() => {
                if (!this.page.canIWrite) {
                    for (let i = 0; i < this.dataForm.inputs.length; i++) {
                        this.dataForm.inputs[i].readOnly = true;
                    }
                    for (let i = 0; i < this.settingsForm.inputs.length; i++) {
                        this.settingsForm.inputs[i].readOnly = true;
                    }
                    this.unsavedChanges = false;
                }
            });
            // Set record on form
            this.dataForm.record = this.page;
            // Check write permission
            this.dataForm.readOnly = this.settingsForm.readOnly = !this.page.canIWrite;
            // Load settings
            this.loadSettings();
            let pageKey = this._dataForm.byName('key');
            if (pageKey) {
                // Invalidate if user changes the URL key
                pageKey.valueChanged.add(() => {
                    this.validated = false;
                });
            }
        }
        /**
         * Override.
         */
        onSavingChanges() {
            if (!this.validated) {
                let k = this.dataForm.byName('key');
                latte.Page.isValidURLKey(this.page.idpage, k.value).send((isValid) => {
                    this.validated = k.valid = isValid;
                    k.setHint(isValid ? null : strings.urlKeyInUse);
                    if (isValid) {
                        // Call saveChanges again to continue save procedure
                        this.saveChanges();
                    }
                });
                return false;
            }
            else {
                return super.onSavingChanges();
            }
        }
        /**
         * Opens the editor
         */
        openEditor() {
            let url = latte.sprintf("%s/%s#/Editor/%s", window.location.origin, window.location.pathname, this.page.guid);
            window.open(url);
            // var mainView = View.mainView;
            // let editor = new PageEditorView(this.page);
            //
            // View.mainView = editor;
            //
            // editor.closeRequested.add(() => {
            //     this.dataForm.onRecordChanged();
            //     View.mainView = mainView
            // });
        }
        /**
         * Override.
         * @returns {any[]}
         */
        getSaveCalls() {
            let all = []
                .concat(this.dataForm.getSaveCalls())
                .concat(this.saveSettingsCalls());
            return all;
        }
        /**
         * @returns {Array}
         */
        saveSettingsCalls() {
            let r = [];
            let checker = 0;
            for (let i = 0; i < this.settingsForm.inputs.length; i++) {
                let input = this.settingsForm.inputs[i];
                let tag = input.tag;
                let setting = tag.record;
                if (!input.tag.changes) {
                    continue;
                }
                setting.value = input.value;
                let call = setting.saveCall();
                if (++checker == 1) {
                    call.withHandlers(() => {
                        this.unsavedChanges = false;
                        this.settingsForm.unsavedChanges = false;
                        this.onPageChanged();
                    });
                }
                r.push(call);
            }
            return r;
        }
        /**
         * Gets an event raised when the value of the page property changes
         *
         * @returns {LatteEvent}
         */
        get pageChanged() {
            if (!this._pageChanged) {
                this._pageChanged = new latte.LatteEvent(this);
            }
            return this._pageChanged;
        }
        /**
         * Gets or sets the page of the view
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the page of the view
         *
         * @param {Page} value
         */
        set page(value) {
            // Check if value changed
            let changed = value !== this._page;
            // Set value
            this._page = value;
            // Trigger changed event
            if (changed) {
                this.onPageChanged();
            }
        }
        /**
         * Gets the open button
         *
         * @returns {ButtonItem}
         */
        get btnOpen() {
            if (!this._btnOpen) {
                this._btnOpen = new latte.ButtonItem(strings.openPageEditor, null, () => this.openEditor());
                this._btnOpen.addClass('open-editor-button');
            }
            return this._btnOpen;
        }
        /**
         * Gets the data record for item of the page
         *
         * @returns {DataRecordFormItem}
         */
        get dataForm() {
            if (!this._dataForm) {
                this._dataForm = new latte.DataRecordFormItem();
                this._dataForm.category = '';
                this.saveItems.add(this._dataForm);
            }
            return this._dataForm;
        }
        /**
         * Gets the settings form item
         *
         * @returns {FormItem}
         */
        get settingsForm() {
            if (!this._settingsForm) {
                this._settingsForm = new latte.FormItem();
                this._settingsForm.direction = latte.Direction.VERTICAL;
                this.saveItems.add(this._settingsForm);
            }
            return this._settingsForm;
        }
    }
    latte.PageDetailView = PageDetailView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 6/10/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class SignInView extends latte.SignInViewBase {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
            super();
            // FX handlers
            this.txtEmail.addEventListener('focus', () => {
                this.combo.ensureClass('focus', true);
                this.fieldEmail.ensureClass('focus', true);
                this.fieldPassword.ensureClass('focus', false);
            });
            this.txtPassword.addEventListener('focus', () => {
                this.combo.ensureClass('focus', true);
                this.fieldEmail.ensureClass('focus', false);
                this.fieldPassword.ensureClass('focus', true);
            });
            this.txtEmail.addEventListener('blur', () => {
                this.combo.ensureClass('focus', false);
                this.fieldEmail.ensureClass('focus', false);
            });
            this.txtPassword.addEventListener('blur', () => {
                this.combo.ensureClass('focus', false);
                this.fieldPassword.ensureClass('focus', false);
            });
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.formSubmit();
            });
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Handles the form submit
         */
        formSubmit() {
            let call = latte.Session.logIn(this.txtEmail.text, this.txtPassword.text).withHandlers((user) => {
                latte.User.me = user;
                latte.Main.goMainView();
            });
            call.failure.add((err) => {
                if (err) {
                    if (strings[err]) {
                        this.error.text = strings[err];
                    }
                    else {
                        this.error.text = err;
                    }
                }
                this.error.visible = true;
            });
            call.send();
        }
    }
    latte.SignInView = SignInView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/23/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageEditorView extends latte.View {
        //endregion
        /**
         *
         */
        constructor(r, pack = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._focusedFragmentAdapter = null;
            /**
             * Property field
             */
            this._pack = null;
            /**
             * Property field
             */
            this._page = null;
            this.addClass('page-editor-main-view');
            if (pack) {
                this.pack = pack;
            }
            this.page = r;
        }
        //region Private Methods
        /**
         * Clears the ribbon of non-standard items and tabs
         */
        clearRibbon(selectFirstTab = true) {
            this.ribbon.items.clear();
            this.ribbon.tabs.clear();
            this.ribbon.items.addArray([
                this.btnPreview,
                latte.SeparatorItem.withTab(this.tabPage),
                this.onlineInput,
            ]);
            this.ribbon.tabs.addArray([
                this.tabPage
            ]);
            if (selectFirstTab !== false) {
                this.ribbon.selectedTab = this.ribbon.tabs.first;
            }
        }
        /**
         * Handles focus on the fragment
         *
         * @param adapter
         */
        fragmentFocus(adapter) {
            this.focusedFragmentAdapter = adapter;
            this.fragmentTabsUpdate(adapter);
        }
        /**
         * Updates the tabs of the specified fragment adapter
         * @param adapter
         */
        fragmentTabsUpdate(adapter) {
            if (adapter != this.focusedFragmentAdapter) {
                return;
            }
            this.clearRibbon(false);
            let tabs = adapter.getEditorTabs();
            let items = adapter.getEditorTabItems();
            items.filter(i => i.tab != null);
            this.ribbon.tabs.addArray(tabs);
            this.ribbon.items.addArray(items);
            if (this.ribbon.tabs.length > 0) {
                this.ribbon.selectedTab = this.ribbon.tabs.last;
            }
        }
        //endregion
        //region Methods
        /**
         * Adds a fragment to the ui
         * @param key
         * @param fragment
         */
        addFragment(key, fragmentData, fragment) {
            let type = fragmentData.type || 'html';
            let adapter = null;
            // Get the adapter
            if (latte.FragmentAdapterManager.isSupported(type)) {
                adapter = latte.FragmentAdapterManager.byType(type);
            }
            else {
                adapter = new latte.PlainTextFragmentAdapter();
            }
            // Initialize adapter
            adapter.fragmentConfiguration = fragmentData;
            adapter.fragment = fragment;
            adapter.onCreateEditorItem();
            adapter.editorFocus.add(() => this.fragmentFocus(adapter));
            adapter.tabsChanged.add(() => this.fragmentTabsUpdate(adapter));
            //adapter.editorBlur.add(() => this.clearRibbon());
            // Create expando
            let expando = new latte.FragmentExpandoItem();
            adapter.expando = expando;
            expando.title = latte.PageConfiguration.resolveString(fragmentData.name) || strings.missingName;
            expando.fragmentItem = adapter.editorItem;
            this.columnView.items.add(expando);
            this.fragmentAdapters.push(adapter);
        }
        /**
         * Loads the page
         */
        loadPage() {
            if (!this.page.configuration.pack) {
                this.page.configuration.reloadPack(() => this.loadPage());
                return;
            }
            this.fragmentAdapters = [];
            // Title
            this.titleElement.text = this.page.title;
            // Load Fragments
            this.page.getFragments().send((arr) => {
                let fragments = {};
                arr.forEach((f) => fragments[f.name] = f);
                // Add each fragment
                for (let i in this.page.configuration.fragments) {
                    let spec = this.page.configuration.fragments[i];
                    let f = fragments[spec.key || i] ? fragments[spec.key || i] : new latte.Fragment();
                    if (!(f.idfragment > 0)) {
                        f.idpage = this.page.idpage;
                        f.name = spec.key || i;
                    }
                    this.addFragment(i, spec, f);
                }
            });
        }
        /**
         * Raises the <c>focusedFragmentAdapter</c> event
         */
        onFocusedFragmentAdapterChanged() {
            if (this._focusedFragmentAdapterChanged) {
                this._focusedFragmentAdapterChanged.raise();
            }
        }
        /**
         * Override.
         */
        onLoad() {
            super.onLoad();
            this.element.append(this.titleElement.element);
            //this.element.append(this.btnClose.element);
            this.ribbon.startButton.visible = false;
            this.clearRibbon();
            this.ribbon.selectedTab = this.ribbon.tabs.first;
            this.ribbonView.view = this.columnView;
            this.view = this.ribbonView;
            this.timerId = setInterval(() => this.saveTick(), 1000);
        }
        /**
         * Override.
         */
        onUnload() {
            super.onUnload();
            clearInterval(this.timerId);
        }
        /**
         * Raises the <c>page</c> event
         */
        onPageChanged() {
            if (this._pageChanged) {
                this._pageChanged.raise();
            }
            this.loadPage();
        }
        /**
         * Previews the page
         */
        preview() {
            let loc = document.location;
            window.open(latte.sprintf("%s//%s/%s", loc.protocol, loc.host, this.page.guid));
        }
        /**
         *
         */
        saveTick() {
            let calls = [];
            let pageChanged = false;
            for (let i in this.fragmentAdapters) {
                let a = this.fragmentAdapters[i];
                calls = calls.concat(a.getSaveCalls());
            }
            if (this.titleChanged) {
                this.page.title = this.titleElement.text;
                pageChanged = true;
            }
            if (this.onlineChanged) {
                pageChanged = true;
            }
            if (pageChanged) {
                calls.push(this.page.saveCall());
            }
            if (calls.length) {
                latte.Message.sendCalls(calls);
            }
        }
        /**
         * Gets an event raised when close was requested
         *
         * @returns {LatteEvent}
         */
        get closeRequested() {
            if (!this._closeRequested) {
                this._closeRequested = new latte.LatteEvent(this);
            }
            return this._closeRequested;
        }
        /**
         * Raises the <c>closeRequested</c> event
         */
        onCloseRequested() {
            if (this._closeRequested) {
                this._closeRequested.raise();
            }
        }
        /**
         * Gets an event raised when the value of the focusedFragmentAdapter property changes
         *
         * @returns {LatteEvent}
         */
        get focusedFragmentAdapterChanged() {
            if (!this._focusedFragmentAdapterChanged) {
                this._focusedFragmentAdapterChanged = new latte.LatteEvent(this);
            }
            return this._focusedFragmentAdapterChanged;
        }
        /**
         * Gets an event raised when the value of the page property changes
         *
         * @returns {LatteEvent}
         */
        get pageChanged() {
            if (!this._pageChanged) {
                this._pageChanged = new latte.LatteEvent(this);
            }
            return this._pageChanged;
        }
        /**
         * Gets or sets the focused fragment adapter
         *
         * @returns {FragmentAdapter<IFragment>}
         */
        get focusedFragmentAdapter() {
            return this._focusedFragmentAdapter;
        }
        /**
         * Gets or sets the focused fragment adapter
         *
         * @param {FragmentAdapter<IFragment>} value
         */
        set focusedFragmentAdapter(value) {
            // Check if value changed
            let changed = value !== this._focusedFragmentAdapter;
            // Set value
            this._focusedFragmentAdapter = value;
            // Trigger changed event
            if (changed) {
                this.onFocusedFragmentAdapterChanged();
            }
        }
        /**
         * Gets or sets the settings pack of the page
         *
         * @returns {IPageSettingsPack}
         */
        get pack() {
            return this._pack;
        }
        /**
         * Gets or sets
         *
         * @param {IPageSettingsPack} value
         */
        set pack(value) {
            this._pack = value;
        }
        /**
         * Gets or sets the record of the view
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the record of the view
         *
         * @param {Page} value
         */
        set page(value) {
            // Check if value changed
            let changed = value !== this._page;
            // Set value
            this._page = value;
            // Trigger changed event
            if (changed) {
                this.onPageChanged();
            }
        }
        /**
         * Gets the ribbon of the view
         *
         * @returns {Ribbon}
         */
        get ribbon() {
            return this.ribbonView.ribbon;
        }
        /**
         * Gets the close button
         *
         * @returns {ButtonItem}
         */
        get btnClose() {
            if (!this._btnClose) {
                this._btnClose = new latte.ButtonItem(null, latte.LinearIcon.cross, () => this.onCloseRequested());
                this._btnClose.addClass('page-close');
                this._btnClose.faceVisible = false;
            }
            return this._btnClose;
        }
        /**
         * Gets the preview button
         *
         * @returns {ButtonItem}
         */
        get btnPreview() {
            if (!this._btnPreview) {
                this._btnPreview = new latte.ButtonItem(strings.previewPage, latte.LinearIcon.screen.go32(), () => this.preview());
                this._btnPreview.tab = this.tabPage;
            }
            return this._btnPreview;
        }
        /**
         * Gets the column view
         *
         * @returns {ColumnView}
         */
        get columnView() {
            if (!this._columnView) {
                this._columnView = new latte.ColumnView();
                this._columnView.columnPadding = 0;
            }
            return this._columnView;
        }
        /**
         * Gets the ribbon in the view
         *
         * @returns {RibbonView}
         */
        get ribbonView() {
            if (!this._ribbonView) {
                this._ribbonView = new latte.RibbonView();
                this._ribbonView.ribbon.collapseButton.visible = false;
            }
            return this._ribbonView;
        }
        /**
         * Gets the online input
         *
         * @returns {InputItem}
         */
        get onlineInput() {
            if (!this._onlineInput) {
                this._onlineInput = latte.InputItem.fromIInput({
                    text: strings.online,
                    type: 'switch'
                }, 'online', this.page.online);
                this._onlineInput.valueChanged.add(() => {
                    this.page.online = this.onlineInput.value;
                    this.onlineChanged = true;
                });
                this._onlineInput.tab = this.tabPage;
            }
            return this._onlineInput;
        }
        /**
         * Gets the page tab
         *
         * @returns {TabItem}
         */
        get tabPage() {
            if (!this._tabPage) {
                this._tabPage = new latte.TabItem(strings.page);
            }
            return this._tabPage;
        }
        /**
         * Gets the title element
         *
         * @returns {Element<HTMLDivElement>}
         */
        get titleElement() {
            if (!this._titleElement) {
                this._titleElement = new latte.Element(document.createElement('div'));
                this._titleElement.addClass('page-title-gizmo');
                this._titleElement.contentEditable = true;
                this._titleElement.addEventListener('focus', () => {
                    this.clearRibbon();
                    this.cancelTitle = this.titleElement.text;
                });
                this._titleElement.addEventListener('input', () => this.titleChanged = true);
                this._titleElement.addEventListener('keydown', (e) => {
                    if (e.keyCode == latte.Key.ENTER) {
                        this.titleElement.element.blur();
                        e.preventDefault();
                    }
                    else if (e.keyCode == latte.Key.ESCAPE) {
                        this.titleElement.text = this.cancelTitle;
                        this.titleChanged = true;
                        this.titleElement.element.blur();
                        e.preventDefault();
                    }
                });
            }
            return this._titleElement;
        }
    }
    latte.PageEditorView = PageEditorView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/14/16.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class PageSidebar extends latte.TabView {
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(r) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._page = null;
            /**
             * Property field
             */
            this._pageExplorer = null;
            this.pageExplorer = r;
            this.page = r.record;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Override.
         */
        onLoad() {
            this.tabs.addArray([
                this.tabDetail,
                this.tabConfiguration,
                this.tabAdvanced
            ]);
            if (PageSidebar.lastSelectedTab == this.tabAdvanced.text) {
                this.selectedTab = this.tabAdvanced;
            }
            else if (PageSidebar.lastSelectedTab == this.tabConfiguration.text) {
                this.selectedTab = this.tabConfiguration;
            }
            else {
                this.selectedTab = this.tabDetail;
            }
            this.tabsSide = latte.Side.BOTTOM;
        }
        /**
         * Override.
         */
        onSavingChanges() {
            if (this.view) {
                return this.view.onSavingChanges();
            }
            return super.onSavingChanges();
        }
        /**
         * Override.
         */
        onSelectedTabChanged() {
            super.onSelectedTabChanged();
            PageSidebar.lastSelectedTab = this.selectedTab.text;
            if (this.selectedTab == this.tabDetail) {
                this.view = this.detailView;
            }
            else if (this.selectedTab == this.tabConfiguration) {
                this.view = this.configurationView;
            }
            else if (this.selectedTab == this.tabAdvanced) {
                this.view = this.advancedView;
            }
        }
        /**
         * Raises the <c>page</c> event
         */
        onPageChanged() {
            if (this._pageChanged) {
                this._pageChanged.raise();
            }
            if (this._configurationView) {
                this.configurationView.page = this.page;
            }
            if (this._advancedView) {
                this.advancedView.page = this.page;
            }
            this.detailView.page = this.page;
            this.tabConfiguration.visible = latte.User.me.isSysAdmin;
        }
        /**
         * Gets an event raised when the value of the page property changes
         *
         * @returns {LatteEvent}
         */
        get pageChanged() {
            if (!this._pageChanged) {
                this._pageChanged = new latte.LatteEvent(this);
            }
            return this._pageChanged;
        }
        /**
         * Gets or sets the page of the sidebar
         *
         * @returns {Page}
         */
        get page() {
            return this._page;
        }
        /**
         * Gets or sets the page of the sidebar
         *
         * @param {Page} value
         */
        set page(value) {
            // Check if value changed
            let changed = value !== this._page;
            // Set value
            this._page = value;
            // Trigger changed event
            if (changed) {
                this.onPageChanged();
            }
        }
        /**
         * Gets or sets the page explorer
         *
         * @returns {PageExplorer}
         */
        get pageExplorer() {
            return this._pageExplorer;
        }
        /**
         * Gets or sets the page explorer
         *
         * @param {PageExplorer} value
         */
        set pageExplorer(value) {
            this._pageExplorer = value;
        }
        /**
         * Gets the advanced view
         *
         * @returns {PageAdvancedView}
         */
        get advancedView() {
            if (!this._advancedView) {
                this._advancedView = new latte.PageAdvancedView(this.page);
                this._advancedView.sentToTrash.add(() => {
                    this.pageExplorer.explorer.refreshList();
                });
            }
            return this._advancedView;
        }
        /**
         * Gets the configuration view
         *
         * @returns {PageConfigurationView}
         */
        get configurationView() {
            if (!this._configurationView) {
                this._configurationView = new latte.PageConfigurationView(this.page);
            }
            return this._configurationView;
        }
        /**
         * Gets the detail view
         *
         * @returns {PageDetailView}
         */
        get detailView() {
            if (!this._detailView) {
                this._detailView = new latte.PageDetailView();
            }
            return this._detailView;
        }
        /**
         * Gets the advanced tab
         *
         * @returns {TabItem}
         */
        get tabAdvanced() {
            if (!this._tabAdvanced) {
                this._tabAdvanced = new latte.TabItem(strings.advanced);
            }
            return this._tabAdvanced;
        }
        /**
         * Gets the detail tab
         *
         * @returns {TabItem}
         */
        get tabDetail() {
            if (!this._tabDetail) {
                this._tabDetail = new latte.TabItem(strings.detail);
            }
            return this._tabDetail;
        }
        /**
         * Gets the configuration tab
         *
         * @returns {TabItem}
         */
        get tabConfiguration() {
            if (!this._tabConfiguration) {
                this._tabConfiguration = new latte.TabItem(strings.configuration);
            }
            return this._tabConfiguration;
        }
    }
    //region Static
    PageSidebar.lastSelectedTab = null;
    latte.PageSidebar = PageSidebar;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/fragment.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/jquery.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.data.ui.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.element.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.ui.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/latte.ui.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/records.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/views.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/support/ts-include/views_bank.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/fragment.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IFragment.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IFragments.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IGlobalConfigSetting.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IGlobalConfigurationSettings.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IPageConfigurationChildren.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IImageFragment.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IImageGalleryFragment.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IPageConfigurationSetting.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IPageConfigurationSettings.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IPageSettingsPack.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/interfaces/IPageConfiguration.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/FragmentAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/Uploader.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/GlobalSettingsExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/UaEvents.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/GlobalSettingExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/GroupExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/GroupUserExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/Main.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/GroupsExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/PageExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/UserExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/PagesExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/explorers/UsersExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/FileReplacer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/FileUploader.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/FragmentAdapterManager.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/ImageLoader.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/ImageUtil.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/PluginManager.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/PageConfiguration.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/Plugin.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/adapters/HtmlFragmentAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/adapters/ImageFragmentAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/adapters/PlainTextFragmentAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/helpers/adapters/ImageGalleryFragmentAdapter.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/items/FileItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/items/FragmentPlaceholderItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/items/LinearIcon.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/items/FragmentExpandoItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/Fragment.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/File.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/Group.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/GroupUser.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/Page.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/Setting.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/records/User.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/CmsExplorer.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/CmsMainView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/GlobalSettingView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/InstallWizardView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/PageAdvancedView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/ImageEditorView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/PageConfigurationView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/PageDetailView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/SignInView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/PageEditorView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/fragment/ts/views/PageSidebar.ts" /> 
