var latte;
(function (latte) {
    /**
     * Represents a DataRecord on App
     **/
    class DataRecord {
        //endregion
        /**
         * Creates the record
         **/
        constructor() {
            /**
             * Arbitrary collection of tags
             */
            this.tags = {};
            /**
             * Initialize empty the fields of record
             */
            var metadata = this.getMetadata();
            if (metadata && latte._isObject(metadata.fields)) {
                for (var i in metadata.fields) {
                    this[i] = '';
                }
            }
        }
        /**
         * Scans the passed Object and converts available packed records to latte.DataRecord
         instances
         **/
        static scanAndConvert(obj) {
            if (obj && latte._isObject(obj) || latte._isArray(obj)) {
                if (latte.DataRecord.isPackedRecord(obj)) {
                    obj = latte.DataRecord.fromServerObject(obj);
                }
                else {
                    for (var i in obj) {
                        obj[i] = latte.DataRecord.scanAndConvert(obj[i]);
                    }
                }
            }
            return obj;
        }
        /**
         * Sets the default records namespace, and injects common code into records.
         **/
        static setDefaultRecordsNamespace(namespace) {
            latte.DataRecord._defaultRecordsNamespace = namespace;
            for (var symbol in namespace) {
                // Set record name
                namespace[symbol].recordType = symbol;
                // Copy static methods
                namespace[symbol].fromServerObject = latte.DataRecord.fromServerObject;
                namespace[symbol].fromServerObjects = latte.DataRecord.fromServerObjects;
            }
        }
        /**
         * Creates a record from the specified name and id. If no id is specified, empty record will arrive.
         **/
        static fromName(name, id, callback) {
            var m = new latte.Message('latte.data', 'DataLatteUa', 'recordSelect', { name: name, id: id })
                .send((record) => {
                // Execute callback with record
                callback(record);
            });
            return m;
        }
        /**
         * Converts a server given Object to a Record of the specified type, if no type specified <c>DataRecord</c> will be used.
         **/
        static fromServerObject(obj, classType = null) {
            var dns = latte.DataRecord._defaultRecordsNamespace ? latte.DataRecord._defaultRecordsNamespace : (latte._isObject(window[DataRecord.recordsNamespaceName]) ? window[DataRecord.recordsNamespaceName] : null);
            var rt = obj.recordType;
            var type = latte._isFunction(classType) ? classType : (latte._isFunction(dns[rt]) ? dns[rt] : DataRecord);
            var record = new type();
            var i, j;
            if (!latte.DataRecord.isPackedRecord(obj)) {
                throw new latte.Ex();
            }
            for (i in obj.fields) {
                let nativeType = type['nativeTypes'] ? type['nativeTypes'][i] || 'varchar' : 'varchar';
                record[i] = DataRecord.unserializeNativeValue(obj.fields[i], nativeType);
            }
            record.recordType = obj.recordType;
            record.recordId = parseInt(obj.recordId);
            if (obj.metadata) {
                // Metadata, if any
                record.metadata = obj.metadata || {};
            }
            // If record contains properties
            if (!latte._undef(obj['properties'])) {
                for (i in obj.properties) {
                    // If property is an array
                    if (latte._isArray(obj.properties[i])) {
                        // Check if contains records
                        for (j = 0; j < obj.properties[i].length; j++) {
                            obj.properties[i][j] = latte.DataRecord.fromServerObject(obj.properties[i][j]);
                        }
                    }
                    // If property is a record
                    if (obj.properties[i] && obj.properties[i]['type'] == 'DataRecord') {
                        // Unpack
                        record[i] = latte.DataRecord.fromServerObject(obj.properties[i]);
                    }
                    else {
                        // Or, Assign as it is
                        record[i] = obj.properties[i];
                    }
                }
            }
            return record;
        }
        /**
         * Converts a server given array of Object to a Records array
         **/
        static fromServerObjects(array, classType = null) {
            if (!latte._isArray(array))
                throw new latte.InvalidArgumentEx('array', array);
            var a = [];
            for (var i = 0; i < array.length; i++) {
                a.push(latte.DataRecord.fromServerObject(array[i], classType));
            }
            return a;
        }
        /**
         * Returns a value indicating if the passed Object
         is a packed Object
         **/
        static isPackedRecord(object) {
            return latte._isObject(object)
                && object.type == 'DataRecord'
                && !latte._undef(object.recordType);
        }
        /**
         * Serializes the native value
         * @param value
         * @param nativeType
         * @returns {any}
         */
        static serializeNativeValue(value, nativeType) {
            let parts = nativeType.split('(');
            let name = parts[0].toLowerCase();
            let size = parts.length > 1 ? parseInt(parts[1].replace(')', '')) : -1;
            let dictionary = {
                'bit': 'int',
                'tinyint': 'int',
                'bool': 'int',
                'boolean': 'int',
                'smallint': 'int',
                'mediumint': 'int',
                'int': 'int',
                'integer': 'int',
                'bigint': 'int',
                'decimal': 'float',
                'dec': 'float',
                'double': 'float',
                'double precision': 'float',
                'float': 'float',
                'year': 'int',
                'date': 'DateTime',
                'datetime': 'DateTime',
                'timestamp': 'TimeSpan',
                'time': 'TimeSpan',
                'char': 'string',
                'varchar': 'string',
                'text': 'string',
                'mediumtext': 'string',
                'enum': 'string'
            };
            let t = dictionary[name] || 'string';
            if (name == 'int' && size == 1) {
                return value ? "1" : "0";
            }
            let v = value === null ? '' : String(value);
            return v;
        }
        /**
         * Unserializes the native value
         * @param value
         * @param nativeType
         */
        static unserializeNativeValue(value, nativeType) {
            if (value === null) {
                return null;
            }
            let parts = nativeType.split('(');
            let name = parts[0].toLowerCase();
            let size = parts.length > 1 ? parseInt(parts[1].replace(')', '')) : -1;
            let dictionary = {
                'bit': 'int',
                'tinyint': 'int',
                'bool': 'int',
                'boolean': 'int',
                'smallint': 'int',
                'mediumint': 'int',
                'int': 'int',
                'integer': 'int',
                'bigint': 'int',
                'decimal': 'float',
                'dec': 'float',
                'double': 'float',
                'double precision': 'float',
                'float': 'float',
                'year': 'int',
                'date': 'DateTime',
                'datetime': 'DateTime',
                'timestamp': 'TimeSpan',
                'time': 'TimeSpan',
                'char': 'string',
                'varchar': 'string',
                'text': 'string',
                'mediumtext': 'string',
                'enum': 'string'
            };
            let t = dictionary[name] || 'string';
            if (name == 'int' && size == 1) {
                t = 'boolean';
            }
            switch (t) {
                case 'boolean': return !!parseInt(value, 10);
                case 'int': return parseInt(value, 10);
                case 'float': return parseFloat(value);
                case 'DateTime': return latte.DateTime.fromString(value);
                case 'TimeSpan': return latte.TimeSpan.fromString(value);
                case 'string': return String(value);
            }
            return String(value);
        }
        //region Methods
        /**
         * Copies the data
         * @param r
         */
        copyFieldsDataFrom(r) {
            var fields = r.onGetFields();
            for (var i in fields) {
                this[i] = fields[i];
            }
        }
        /**
         * Gets the fields of the record, with values
         **/
        getFields() {
            var def = this.onGetFields();
            if (def) {
                return def;
            }
            else {
                var f = {};
                var metadata = this.getMetadata();
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        f[i] = this[i] || null;
                    }
                }
                return f;
            }
        }
        /**
         * Can be overriden to return dynamically generated metadata
         **/
        getMetadata() {
            return this.metadata;
        }
        /**
         * Gets the fields of the record, with values serialized.
         */
        getSerializedFields() {
            var def = this.onGetFields();
            var rt = latte[this._recordType];
            if (def) {
                for (var i in def) {
                    let nativeType = rt['nativeTypes'] ? rt['nativeTypes'][i] : 'varchar';
                    def[i] = DataRecord.serializeNativeValue(def[i], nativeType) || null;
                }
                return def;
            }
            else {
                var f = {};
                var metadata = this.getMetadata();
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        let nativeType = rt['nativeTypes'] ? rt['nativeTypes'][i] : 'varchar';
                        f[i] = DataRecord.serializeNativeValue(this[i], nativeType) || null;
                    }
                }
                return f;
            }
        }
        /**
         * Sends an insert message to the server
         **/
        insert(callback) {
            return this.insertCall().send(() => {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        }
        /**
         * Gets the remote call for insertion
         *
         * @returns {latte.RemoteCall}
         */
        insertCall() {
            var values = this.getSerializedFields();
            // Change null values to empty values
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordInsert', { name: this.recordType, fields: values });
            // Catch auto-id
            call.success.add((data) => {
                this.recordId = parseInt(data, 10);
                this[this.onGetRecordIdName()] = this.recordId;
            });
            return call;
        }
        /**
         * Returns a value indicating if the record is inserted, based on the existence of id
         **/
        inserted() {
            return this.recordId > 0;
        }
        /**
         * Gets the fields of the record with its data.
         */
        onGetFields() {
            return null;
        }
        /**
         * Gets the name of the id field
         * @returns {undefined}
         */
        onGetRecordIdName() {
            return undefined;
        }
        /**
         * Sends a DELETE request to the server
         **/
        remove(callback) {
            return this.removeCall().send(() => {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        }
        /**
         * Gets the call for removing this record
         * @returns {latte.RemoteCall}
         */
        removeCall() {
            return new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordDelete', { name: this.recordType, id: this.recordId });
        }
        /**
         * Inserts or updates the record
         **/
        save(callback = null) {
            return this.saveCall().send(() => {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        }
        /**
         * Gets the insert or update call for record
         */
        saveCall() {
            if (this.recordId) {
                return this.updateCall();
            }
            else {
                return this.insertCall();
            }
        }
        /**
         * Represents the person as a string
         * @returns {string}
         */
        toString() {
            return latte.sprintf("[%s: %s]", this.recordType, this.recordId);
        }
        /**
         * Sends an update message to the record
         **/
        update(callback) {
            return this.updateCall().send(() => {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        }
        /**
         * Gets the call for updating the record
         *
         * @returns {latte.RemoteCall<string>}
         */
        updateCall() {
            var values = this.getSerializedFields();
            // Change null values to empty values
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordUpdate', { name: this.recordType, id: this.recordId, fields: values });
            return call;
        }
        /**
         * Gets an event raised when the value of a field is changed
         *
         * @returns {LatteEvent}
         */
        get fieldValueChanged() {
            if (!this._fieldValueChanged) {
                this._fieldValueChanged = new latte.LatteEvent(this);
            }
            return this._fieldValueChanged;
        }
        /**
         * Raises the <c>fieldValueChanged</c> event
         */
        onFieldValueChanged(field, value) {
            if (this._fieldValueChanged) {
                this._fieldValueChanged.raise(field, value);
            }
        }
        /**
         * Gets or sets the name of the module where record is contained
         *
         * @returns {string}
         */
        get moduleName() {
            return this._moduleName;
        }
        /**
         * Gets or sets the name of the module where record is contained
         *
         * @param {string} value
         */
        set moduleName(value) {
            this._moduleName = value;
        }
        /**
         * Gets or sets the record id
         **/
        get recordId() {
            return this._recordId;
        }
        /**
         * Gets or sets the record id
         **/
        set recordId(value) {
            this._recordId = value;
        }
        /**
         * Gets or sets the record type
         **/
        get recordType() {
            return this._recordType;
        }
        /**
         * Gets or sets the record type
         **/
        set recordType(value) {
            this._recordType = value;
        }
        /**
         * Gets or sets an arbitrary value for the record
         **/
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets an arbitrary value for the record
         **/
        set tag(value) {
            this._tag = value;
        }
    }
    /**
     * Name of object where records are stored
     */
    DataRecord.recordsNamespaceName = 'latte';
    latte.DataRecord = DataRecord;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a set of structured data
     **/
    class DataSet {
        /**
         * Creates the dataset
         **/
        constructor() {
            this.columns = new latte.Collection();
            this.rows = new latte.Collection();
        }
        /**
         * Creates a <c>DataSet</c> from the dataset specified as a JSON object
         **/
        static fromServerObject(dataset) {
            var d = new DataSet();
            var i;
            for (i in dataset.fields) {
                d.columns.add(new latte.DataSetColumn(dataset.fields[i].name, DataSet.fromServerType(dataset.fields[i].type), dataset.fields[i].length));
            }
            // Add rows
            if (latte._isArray(dataset.rows)) {
                for (i = 0; i < dataset.rows.length; i++) {
                    var arr = dataset.rows[i];
                    var ds = new latte.DataSetRow(arr);
                    d.rows.add(ds);
                }
            }
            return d;
        }
        /**
         * Converts the type sent by server to a type compatible with <c>InputItem</c>
         **/
        static fromServerType(type) {
            switch (type) {
                case 'int':
                    type = 'integer';
                    break;
                case 'blob':
                    type = 'string';
                    break;
            }
            return type;
        }
        /**
         * Gets the index of the column by passing the name of the column
         **/
        getColumnIndex(columnName) {
            var col = null;
            var i = 0;
            while ((col = this.columns.next())) {
                if (col.name.toLowerCase() == columnName.toLowerCase()) {
                    this.columns.resetPointer();
                    return i;
                }
                i++;
            }
            return null;
        }
        /**
         * Gets the data as an array of arrays
         **/
        getDataArray() {
            var a = [];
            for (var i = 0; i < this.rows.count; i++)
                a.push(this.rows.item(i).getDataArray(this.columns.count));
            return a;
        }
        /**
         * Gets the value of the specified column at the specified row index
         **/
        getValue(columnName, rowIndex) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.getValueAt(columnIndex, rowIndex);
            }
            else {
                throw new latte.InvalidArgumentEx(columnName);
            }
        }
        /**
         * Gets the value at the specified position
         **/
        getValueAt(columnIndex, rowIndex) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else
                return null;
        }
        /**
         * Sets the value at the specified position
         **/
        setValue(columnName, rowIndex, value) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.setValueAt(columnIndex, rowIndex, value);
            }
            return this;
        }
        /**
         * Sets the value at the specified position
         **/
        setValueAt(columnIndex, rowIndex, value) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            else if (this.rows.count <= rowIndex)
                throw new latte.InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new latte.InvalidArgumentEx('columnIndex', columnIndex);
            return this;
        }
    }
    latte.DataSet = DataSet;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a collection of records
     */
    class DataRecordCollection extends latte.Collection {
        /**
         * Creates the collection of the specified type.
         * Optionally specifies handlers for adding and removing items, and a
         * context to call as closure of events.
         *
         * @param addCallback
         * @param removeCallback
         * @param context
         */
        constructor(addCallback = null, removeCallback = null, context = null) {
            super(addCallback, removeCallback, context);
        }
        /**
         * Finds the record of the specified <c>id</c>
         *
         * @param id
         * @returns {null}
         */
        byId(id) {
            return null;
        }
    }
    latte.DataRecordCollection = DataRecordCollection;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a column of data for <c>DataSet</c>
     **/
    class DataSetColumn {
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        constructor(name = '', type = '', length = 0) {
            this.optionsChanged = new latte.LatteEvent(this);
            this.name = name;
            this.type = type;
            this.length = length;
        }
        /**
         * Gets or sets the length of the column values.
         **/
        get length() {
            return this._length;
        }
        /**
         * Gets or sets the length of the column values.
         **/
        set length(value) {
            this._length = value;
        }
        /**
         * Gets or sets the name of the column.
         **/
        get name() {
            return this._name;
        }
        /**
         * Gets or sets the name of the column.
         **/
        set name(value) {
            this._name = value;
        }
        /**
         * Raises the <c>optionsChanged</c> event.
         **/
        onOptionsChanged() {
            this.optionsChanged.raise();
        }
        /**
         * Gets or sets the options of the column.
         **/
        get options() {
            return this._options;
        }
        /**
         * Gets or sets the options of the column.
         **/
        set options(value /*(any|Array)*/) {
            this._options = value;
            this.onOptionsChanged();
        }
        /**
         * Gets or sets a generic tag value for the object
         **/
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets a generic tag value for the object
         **/
        set tag(value) {
            this._tag = value;
        }
        /**
         * Gets or sets the type of the column values.
         **/
        get type() {
            return this._type;
        }
        /**
         * Gets or sets the type of the column values.
         **/
        set type(value) {
            this._type = value;
        }
    }
    latte.DataSetColumn = DataSetColumn;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a row of data for <c>DataSet</c>
     **/
    class DataSetRow {
        /**
         * Creates the row of data. Optionally sets the array of data
         **/
        constructor(data = []) {
            this.data = data;
            if (data)
                this.data = data;
            else
                this.data = [];
        }
        /**
         * Gets the data as an array of specified positions. Undefined positions will be set to null
         **/
        getDataArray(columns) {
            var a = [];
            for (var i = 0; i < columns; i++)
                if (latte._undef(this.data[i]))
                    a[i] = null;
                else
                    a[i] = this.data[i];
            return a;
        }
        /**
         * Gets a value indicating if there is a value at the specified index
         **/
        hasValueAt(index) {
            return !latte._undef(this.data[index]);
        }
        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        set readOnly(value) {
            this._readOnly = value;
        }
        /**
         * Gets or sets the value at the specified position
         **/
        get tag() {
            return this._tag;
        }
        /**
         * Gets or sets the value at the specified position
         **/
        set tag(value) {
            this._tag = value;
        }
        /**
         * Gets or sets the value at the specified position
         **/
        getValueAt(index) {
            return this.data[index];
        }
        /**
         * Gets or sets the value at the specified position
         **/
        setValueAt(index, value) {
            this.data[index] = value;
        }
    }
    latte.DataSetRow = DataSetRow;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Sends messages to objects on server.
     * <example>
     * // ( 1 )
     * // Execute method Person::computeAge() on person with id 1
     * var m1 = new Message('Person', 'computeAge', {}, 1);
     *
     * m1.send(function(){
     *   // Log result of computeAge()
     *   log(this.data);
     * });
     *
     * // ( 2 )
     * // Execute *static* method Person::count()
     * var m2 = new Message('Person', 'count');
     *
     * m2.send(function(){
     *   // Log result of count()
     *   log(this.data);
     * });
     *
     * </example>
     *
     * @class
     */
    class Message {
        //endregion
        /**
         * Creates the message with the specified call
         **/
        constructor(moduleName = null, className = null, method = null, methodArgs = null, id = 0) {
            /**
             *
             */
            this._calls = [];
            // Add first standard call
            if (className !== null) {
                this.calls.push(new latte.RemoteCall(moduleName, className, method, methodArgs, id));
            }
        }
        /**
         * Path where requests are made
         */
        static get pathToRequest() {
            return latte._latteUrl() + "/request.php";
        }
        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        static sendCalls(calls) {
            var m = new Message();
            m.addCalls(calls);
            m.send();
            return m;
        }
        /**
         * Gets or sets a value indicating if the Network is currently available
         *
         * @returns {boolean}
         */
        static get networkAvailable() {
            return Message._networkAvailable;
        }
        /**
         * Gets or sets a value indicating if the Network is currently available
         *
         * @param {boolean} value
         */
        static set networkAvailable(value) {
            // Check if value changed
            var changed = value !== Message._networkAvailable;
            // Set value
            Message._networkAvailable = value;
            // Trigger changed event
            if (changed) {
                Message.onNetworkAvailableChanged();
            }
        }
        /**
         * Gets an event raised when the value of the networkAvailable property changes
         *
         * @returns {LatteEvent}
         */
        static get networkAvailableChanged() {
            if (!Message._networkAvailableChanged) {
                Message._networkAvailableChanged = new latte.LatteEvent(Message);
            }
            return Message._networkAvailableChanged;
        }
        /**
         * Raises the <c>networkAvailable</c> event
         */
        static onNetworkAvailableChanged() {
            if (Message._networkAvailableChanged) {
                Message._networkAvailableChanged.raise();
            }
        }
        //region Methods
        /**
         * Adds calls to the calls array
         * @param calls
         */
        addCalls(calls) {
            var filtered = [];
            for (var i = 0; i < calls.length; i++) {
                if (calls[i]) {
                    filtered.push(calls[i]);
                }
            }
            this._calls = this._calls.concat(filtered);
        }
        /**
         * Reacts to data arrived
         **/
        dataArrived(data) {
            var parsed = false;
            var result = null;
            this._working = false;
            /// Assign response
            this.response = data;
            /// Network is available
            Message.networkAvailable = true;
            /// Raise received handler
            this.onResponseArrived();
            // Check if data arrived
            if (data.length == 0) {
                this.onFailed("Empty response from server");
            }
            // Try to parse JSON
            try {
                // log(data)
                result = JSON.parse(data);
                parsed = true;
            }
            catch (ex) { }
            if (parsed && latte._isArray(result)) {
                if (result.length !== this.calls.length) {
                    this.onFailed("Different amount of response than calls");
                }
                // Report response for each sent call
                for (var i = 0; i < this.calls.length; i++) {
                    this.calls[i].respond(result[i]);
                }
            }
            else {
                /// Raise failed event
                this.onFailed("Can't parse or response is not an array.");
            }
        }
        /**
         * Raises the failed event
         **/
        onFailed(errorDescription) {
            // Dump error
            latte.log(errorDescription);
            latte.log("On call(s):");
            for (var i = 0; i < this.calls.length; i++) {
                var call = this.calls[i];
                if (call) {
                    latte.log(call.toString());
                }
            }
            latte.log(this.response);
            if (this._failed instanceof latte.LatteEvent) {
                this.failed.raise();
            }
            if (latte._isFunction(Message.globalFailed)) {
                Message.globalFailed.call(this, errorDescription);
            }
        }
        /**
         * Raises the networkFailed event
         **/
        onNetworkFailed() {
            /// Networks appears to be unavailable
            Message.networkAvailable = false;
            /// Raise event
            if (this._networkFailed) {
                this._networkFailed.raise();
            }
            // If no retryLeader
            if (Message._retryLeader === null) {
                // I am the retry leader
                Message._retryLeader = this;
            }
            else if (Message._retryLeader !== this) {
                // This used to Add me to pendent messages and good bye.
                return;
            }
            //            this.onNetworkFailed();
            /// Ensure loader is there
            latte.LoadInfo.instance.start(strings.reconnecting);
            /// If message was critical
            if (this.critical) {
            }
            /// If first try
            if (Message._retryTime == 0) {
                // Initialize retry time to 5 seconds
                Message._retryTime = 5;
            }
            else {
                // Duplicate last retry time, topped to 5 minutes
                Message._retryTime = Math.min(latte.TimeSpan.fromMinutes(5).totalSeconds, Message._retryTime * 2);
            }
            // Initialize countdown
            Message._retryCountdown = Message._retryTime;
            // Announce countdown
            latte.LoadInfo.instance.loadingText = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
            if (Message._retryTimer)
                Message._retryTimer.pause();
            /// Set timer to countdown
            Message._retryTimer = new latte.Timer(function () {
                Message._retryCountdown--;
                // Retry now?
                if (Message._retryCountdown == 0) {
                    latte.LoadInfo.instance.loadingText = strings.reconnecting;
                    Message.networkAvailable = true;
                    this.send();
                }
                else if (Message._retryCountdown < 0) {
                    Message._retryTimer.pause();
                    latte.LoadInfo.instance.end();
                }
                else {
                    /// Retry time text
                    latte.LoadInfo.instance.loadingText = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
                }
            }, 1000, this);
            Message._retryTimer.start();
        }
        /**
         * Raises the responseArrived event
         **/
        onResponseArrived() {
            if (this._responseArrived) {
                this.responseArrived.raise();
            }
        }
        /**
         * Raises the <c>sent</c> event
         **/
        onSent() {
            if (this._sent) {
                this.sent.raise();
            }
            Message.log.push(this);
            if (Message.log.length > 50) {
                Message.log.shift();
            }
        }
        /**
         * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
         **/
        send(success = null, failure = null) {
            if (success || failure) {
                if (this.calls.length !== 1) {
                    throw new latte.Ex("Can't assign handlers when more than one call in message");
                }
                else {
                    if (success) {
                        this.calls[0].success.add(success);
                    }
                    if (failure) {
                        this.calls[0].failure.add(failure);
                    }
                }
            }
            this._working = true;
            // Gather calls
            var calls = [];
            for (var i = 0; i < this.calls.length; i++) {
                var call = this.calls[i];
                if (call) {
                    calls.push(call.marshall());
                }
            }
            //log(sprintf("Call: %s, %s", DateTime.now.toString(), JSON.stringify(calls)));
            latte.Ajax.post(Message.pathToRequest, {
                action: 'ajax-rpc',
                calls: JSON.stringify(calls)
            }, (data) => {
                /*
                 * FOR SOME ULTRA WEIRD REASON
                 * DATA IS ARRIVING WITH AN "undefined" prefix
                 * */
                if (data.indexOf('undefined') === 0) {
                    data = data.substr(9);
                }
                this.dataArrived(data);
            }, (error) => {
                this._working = false;
                //log("Message.send() [Error]: " + error);
                this.onNetworkFailed();
            });
            //$.ajax({
            //
            //    /// Use URL for DataLatte requests
            //    url: Message.pathToRequest,
            //
            //    /// Use the message as context
            //    context: this,
            //
            //    /// Mix data with headers
            //    data: {
            //        action:     'ajax-rpc',
            //        calls:  JSON.stringify(calls)
            //    },
            //
            //    /// Interpret as text to make it JSON by ourselves
            //    dataType: 'text',
            //
            //    /// Send request as POST
            //    type: 'POST',
            //
            //    /// Handle success
            //    success: function(data){
            //        this.dataArrived(data);
            //    },
            //
            //    /// Handle ajax error
            //    error: function(jqXHR, textStatus, errorThrown){
            //        this._working = false;
            //
            //        this.errorDescription = "Network error: " + textStatus;
            //        this.errorCode = 1;
            //
            //        this.onNetworkFailed();
            //    }
            //});
            this.onSent();
            return this;
        }
        /**
         * Gets a value indcating if the message is in progress
         **/
        working() {
            return this._working;
        }
        //endregion
        //region Properties
        /**
         * Gets the calls this message will make
         *
         * @returns {Array<RemoteCall>}
         */
        get calls() {
            return this._calls;
        }
        /**
         * Gets an event raised when the message fails by network issues or server issues
         * @returns {LatteEvent}
         */
        get failed() {
            if (!this._failed) {
                this._failed = new latte.LatteEvent(this);
            }
            return this._failed;
        }
        /**
         * Gets an event raised when the network fails
         * @returns {LatteEvent}
         */
        get networkFailed() {
            if (!this._networkFailed) {
                this._networkFailed = new latte.LatteEvent(this);
            }
            return this._networkFailed;
        }
        /**
         * Gets an event raised when the response arrives
         * @returns {LatteEvent}
         */
        get responseArrived() {
            if (!this._responseArrived) {
                this._responseArrived = new latte.LatteEvent(this);
            }
            return this._responseArrived;
        }
        /**
         * Gets an event raised when the message is sent
         * @returns {LatteEvent}
         */
        get sent() {
            if (!this._sent) {
                this._sent = new latte.LatteEvent(this);
            }
            return this._sent;
        }
    }
    //region Static
    Message.log = [];
    //region Network Availability
    /**
     * Property field
     */
    Message._networkAvailable = true;
    latte.Message = Message;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a call to a remote procedure
     */
    class RemoteCall {
        //endregion
        /**
         * Creates the procedure with optional parameters
         * @param moduleName
         * @param className
         * @param method
         * @param params
         * @param id
         * @param returns
         */
        constructor(moduleName = null, className = null, method = null, params = null, id = 0, returns = null) {
            //region Fields
            this._className = null;
            this._method = null;
            this._id = 0;
            this._params = null;
            this._returns = null;
            this._success = null;
            this._failure = null;
            /**
             * Property field
             */
            this._something = null;
            /**
             * Property field
             */
            this._moduleName = null;
            if (moduleName)
                this.moduleName = moduleName;
            if (className)
                this.className = className;
            if (method)
                this.method = method;
            if (params)
                this.params = params;
            if (id)
                this.id = id;
            if (returns)
                this.returns = returns;
        }
        //region Methods
        /**
         * Gets the marshalled call
         */
        marshall() {
            return {
                moduleName: this.moduleName,
                className: this.className,
                method: this.method,
                id: this.id,
                params: this.params
            };
        }
        /**
         * Raises the <c>failure</c> event
         */
        onFailure(errorDescription, errorCode) {
            if (this._failure instanceof latte.LatteEvent) {
                this._failure.raise(errorDescription, errorCode);
            }
        }
        /**
         * Raises the <c>success</c> event
         * @param data
         */
        onSuccess(data) {
            if (this._success instanceof latte.LatteEvent) {
                this._success.raise(data);
            }
        }
        /**
         * Reports a response from server to the call
         *
         * @param responseData
         */
        respond(responseData) {
            var response = new latte.RemoteResponse(this, responseData);
            this.response = response;
        }
        /**
         * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
         */
        send(success = null, failure = null) {
            this.withHandlers(success, failure);
            // Create message
            var m = new latte.Message();
            // Add this call to message
            m.calls.push(this);
            // Send the message
            m.send();
            return m;
        }
        /**
         * Creates a Message object and sends the call, showing a loader with the specified text
         * @param loaderText
         * @param success
         * @param failure
         */
        sendWithLoader(loaderText, success = null, failure = null) {
            var m = this.send(success, failure);
            latte.LoadInfo.instance.start(loaderText);
            m.responseArrived.add(() => {
                latte.LoadInfo.instance.end();
            });
            return m;
        }
        /**
         * Gets a string representation of the call
         * @returns {*|string}
         */
        toString() {
            var idpart = this.id > 0 ? latte.sprintf("<%s>", this.id) : '';
            var paramspart = [];
            for (var i in this.params) {
                var a = this.params[i];
                paramspart.push(i + ' = ' + (latte._isArray(a) || latte._isObject(a) ? JSON.stringify(a) : String(a)));
            }
            return latte.sprintf("%s%s.%s(%s)", this.className, idpart, this.method, paramspart.join(', '));
        }
        /**
         * Adds handlers for success and/or failure and returns the call object
         * @param success
         * @param failure
         * @returns {latte.RemoteCall}
         */
        withHandlers(success = null, failure = null) {
            // Add success handler
            if (success) {
                this.success.add(success);
            }
            // Add failed handler
            if (failure) {
                this.failure.add(failure);
            }
            return this;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the name of the class where the procedure is located
         * @returns {string}
         */
        get className() {
            return this._className;
        }
        /**
         * Gets or sets the name of the class where the procedure is located
         * @param value
         */
        set className(value) {
            this._className = value;
        }
        /**
         * Gets or sets the name of the remote procedure to be called
         * @returns {string}
         */
        get method() {
            return this._method;
        }
        /**
         * Gets an event raised when the call fails
         * @returns {LatteEvent}
         */
        get failure() {
            if (!(this._failure instanceof latte.LatteEvent)) {
                this._failure = new latte.LatteEvent(this);
            }
            return this._failure;
        }
        /**
         * Gets or sets the name of the remote procedure to be called
         * @param value
         */
        set method(value) {
            this._method = value;
        }
        /**
         * Gets or sets something
         *
         * @returns {string}
         */
        get something() {
            return this._something;
        }
        /**
         * Gets or sets something
         *
         * @param {string} value
         */
        set something(value) {
            this._something = value;
        }
        /**
         * Gets or sets the module name
         *
         * @returns {string}
         */
        get moduleName() {
            return this._moduleName;
        }
        /**
         * Gets or sets the module name
         *
         * @param {string} value
         */
        set moduleName(value) {
            this._moduleName = value;
        }
        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @returns {number}
         */
        get id() {
            return this._id;
        }
        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @param value
         */
        set id(value) {
            this._id = value;
        }
        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @returns {*}
         */
        get params() {
            return this._params;
        }
        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @param value
         */
        set params(value) {
            this._params = value;
        }
        /**
         * Gets or sets the response of the message
         *
         * @returns {RemoteResponse}
         */
        get response() {
            return this._response;
        }
        /**
         * Gets or sets the response of the message
         *
         * @param value
         */
        set response(value) {
            this._response = value;
            if (value.logs.length > 0) {
                latte.log(latte.sprintf("Log: " + this.toString()));
                for (var i = 0; i < value.logs.length; i++) {
                    latte.log('    ' + value.logs[i]);
                }
            }
            if (value.warnings.length > 0) {
                latte.log("Warnings: " + latte.sprintf(this.toString()));
                for (var i = 0; i < value.warnings.length; i++) {
                    if (console && console.warn) {
                        console.warn('    ' + value.warnings[i]);
                    }
                    else {
                        latte.log('    ' + value.warnings[i]);
                    }
                }
            }
            if (value.success) {
                this.onSuccess(value.data);
            }
        }
        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        get returns() {
            return this._returns;
        }
        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        set returns(value) {
            this._returns = value;
        }
        /**
         * Gets an event raised when message arrives successfully
         */
        get success() {
            if (!(this._success instanceof latte.LatteEvent)) {
                this._success = new latte.LatteEvent(this);
            }
            return this._success;
        }
    }
    latte.RemoteCall = RemoteCall;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    class RemoteResponse {
        //endregion
        /**
         * Creates the response
         * @param call
         * @param responseText
         */
        constructor(call, response) {
            //region Fields
            this._call = null;
            this._errorCode = -1;
            this._errorDescription = null;
            this._success = false;
            /**
             * Property field
             */
            this._logs = [];
            /**
             * Property field
             */
            this._warnings = [];
            this._call = call;
            this._response = response;
            this.unmarshall();
        }
        //region Private Methods
        /**
         * Unpacks the response text to indicate attributes
         */
        unmarshall() {
            for (var i in this.response) {
                this['_' + i] = this.response[i];
            }
            // log("Response: ")
            // log(this.response)
            if (this.success === true) {
                this._data = latte.DataRecord.scanAndConvert(this.data);
            }
            else {
                latte.log("Error on call: " + this.call.toString());
                latte.log(latte.sprintf("(%s) - %s", this.errorCode, this.errorDescription));
                this.call.onFailure(this.errorDescription, String(this.errorCode));
            }
        }
        //endregion
        //region Properties
        /**
         * Gets the call who originated this response
         * @returns {RemoteCall}
         */
        get call() {
            return this._call;
        }
        /**
         * Gets the error code returned (if any)
         * @returns {number}
         */
        get errorCode() {
            return this._errorCode;
        }
        /**
         * Gets the error description returned (if any)
         * @returns {string}
         */
        get errorDescription() {
            return this._errorDescription;
        }
        /**
         * Gets or sets the logs array in response
         *
         * @returns {Array<string>}
         */
        get logs() {
            return this._logs;
        }
        /**
         * Gets or sets the logs array in response
         *
         * @param {Array<string>} value
         */
        set logs(value) {
            this._logs = value;
        }
        /**
         * Gets the literal response from server
         * @returns {string}
         */
        get response() {
            return this._response;
        }
        /**
         * Gets
         * @returns {T}
         */
        get data() {
            return this._data;
        }
        /**
         * Gets a value indicating if the call was a success
         * @returns {boolean}
         */
        get success() {
            return this._success;
        }
        /**
         * Gets or sets
         *
         * @returns {Array<string>}
         */
        get warnings() {
            return this._warnings;
        }
        /**
         * Gets or sets
         *
         * @param {Array<string>} value
         */
        set warnings(value) {
            this._warnings = value;
        }
    }
    latte.RemoteResponse = RemoteResponse;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/IRecordMeta.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/DataRecord.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/DataSet.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/DataRecordCollection.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/DataSetColumn.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/DataSetRow.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/Message.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/RemoteCall.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data/ts/latte.data/RemoteResponse.ts" /> 
