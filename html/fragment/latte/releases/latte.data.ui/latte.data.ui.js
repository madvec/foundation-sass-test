var latte;
(function (latte) {
    /**
     * Renders a grid that allows data manipulation
     **/
    class GridView extends latte.View {
        /**
         * Creates the GridView
         **/
        constructor() {
            super();
            /**
             *
             **/
            this._allowChangeRows = true;
            /**
             *
             **/
            this._allowDeleteRows = true;
            /**
             *
             **/
            this._allowNewRows = true;
            var gv = this;
            window['g'] = gv;
            this.element.addClass('grid');
            // Initialize Events
            this.committed = new latte.LatteEvent(this);
            this.valueChanged = new latte.LatteEvent(this);
            this.rowsAdded = new latte.LatteEvent(this);
            this.rowsChanged = new latte.LatteEvent(this);
            this.rowsRemoved = new latte.LatteEvent(this);
            // Initialize Collections
            this.columns = new latte.Collection(this._onAddColumn, this._onRemoveColumn, this);
            this.rows = new latte.Collection(this._onAddRow, this._onRemoveRow, this);
            // Create table
            this.table = $('<table>', { border: 1 }).appendTo(this.container).hide();
            // Create headers row
            this._trColumns = $('<tr>').addClass('headers').appendTo(this.table);
            // Create the Select all cell
            this._tdAll = $('<th>').appendTo(this._trColumns);
            // On table mouseout un select headers
            this.table.mouseleave(() => {
                this._selectColumnHeader();
            });
            this.table.click(() => {
                this.endCellEdit();
            });
            // Initialize properties
            this.allowNewRows = this.allowNewRows;
            // Initialize actions
            this._actionCommit = new latte.Action();
            this._actionCommit.text = strings.apply;
            this._actionCommit.icon = latte.IconItem.standard(1, 6);
            this._actionCommit.enabled = false;
            this._actionCommit.execute.add(() => { this.commit(); });
            this._actionRollback = new latte.Action();
            this._actionRollback.text = strings.revert;
            this._actionRollback.icon = latte.IconItem.standard(2, 6);
            this._actionRollback.enabled = false;
            this._actionRollback.execute.add(() => { this.rollback(); });
            this._actionRemoveRow = new latte.Action();
            this._actionRemoveRow.text = strings.deleteRow;
            this._actionRemoveRow.icon = latte.IconItem.standard(11, 5);
            this._actionRemoveRow.execute.add(() => {
                this.deleteRowAt(this.selectedCell.data('rowIndex'));
            });
            this._actionCopyCellValue = new latte.Action();
            this._actionCopyCellValue.text = strings.copy;
            this._actionCopyCellValue.icon = latte.IconItem.standard(14, 5);
            this._actionCopyCellValue.execute.add(() => {
                this.copySelectedCellValue();
            });
            this._actionPasteCellValue = new latte.Action();
            this._actionPasteCellValue.text = strings.paste;
            this._actionPasteCellValue.icon = latte.IconItem.standard(15, 4);
            this._actionPasteCellValue.execute.add(() => {
            });
            this._actionSetCellNull = new latte.Action();
            this._actionSetCellNull.text = strings.setAsNull;
            this._actionSetCellNull.icon = latte.IconItem.empty(32);
            this._actionSetCellNull.execute.add(() => {
                this.setValueAt(this.selectedCell.data('columnIndex'), this.selectedCell.data('rowIndex'), null, true);
            });
        }
        /**
         *
         **/
        _addInsertRow() {
            var row = this._createRow();
            var rowIndex = this.rows.count;
            row
                .removeClass('row')
                .addClass('insert-row')
                .appendTo(this.table)
                .find('th').text("*");
            // Fix row number
            row.find('td').data('rowIndex', rowIndex);
        }
        /**
         *
         **/
        _createCell(columnIndex, rowIndex) {
            var gv = this;
            var cell = $('<td>')
                .addClass('cell')
                .data('rowIndex', rowIndex)
                .data('columnIndex', columnIndex)
                .click(function () {
                gv.selectCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
            })
                .dblclick(function () {
                if (!$(this).hasClass('editing'))
                    gv.editCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
            })
                .mouseenter(function () {
                gv._selectColumnHeader($(this).data('columnIndex'));
                gv._selectRowHeader($(this).data('rowIndex'));
                $(this).addClass('hover');
            })
                .mouseleave(function () {
                $(this).removeClass('hover');
            });
            latte.UiElement.disableTextSelection(cell);
            return cell;
        }
        /**
         *
         **/
        _createRow() {
            var rowIndex = this.rows.count - 1; //this.table.find('tr.row').length;
            var tr = $('<tr>').addClass('row').appendTo(this.table);
            tr.data('rowIndex', rowIndex);
            // Create number th
            $('<th>')
                .text(rowIndex + 1 + '')
                .appendTo(tr);
            // Create cells
            for (var i = 0; i < this.columns.count; i++) {
                this._createCell(i, rowIndex).appendTo(tr);
            }
            return tr;
        }
        /**
         *
         **/
        _makeInsertRowCandidate() {
            var row = new latte.GridViewRow();
            this.rows.add(row, false);
            var count = this.rows.count;
            this.table.find('tr.insert-row').data('rowIndex', count - 1);
            this.table.find('tr.insert-row th').text(count + '*');
            row.element = this.table.find('tr.insert-row')
                .removeClass('insert-row')
                .addClass('insertable-row');
            // Activate insert button
            this._transactionStart();
        }
        /**
         *
         **/
        _onAddColumn(column) {
            var th = $('<th>').appendTo(this._trColumns);
            var index = this.columns.count - 1;
            column.header = th;
            column.optionsChanged.add(() => {
                // Update values
                for (var i = 0; i < this.rows.count; i++) {
                    this.setValueAt(index, i, this.getValueAt(index, i), false);
                }
            });
            th.text(column.name);
            this.table.show();
        }
        /**
         *
         **/
        _onAddRow(row) {
            var rowIndex = this.rows.count - 1;
            // Remove the Insert Row
            if (this._allowNewRows)
                this._removeInsertRow();
            // Create table row
            this._createRow().appendTo(this.table);
            // Fill values
            for (var i = 0; i < this.columns.count; i++) {
                // Set the cell value
                if (this.hasValueAt(i, rowIndex)) {
                    var v = this.getValueAt(i, rowIndex);
                    this.setValueAt(i, rowIndex, v);
                }
            }
            // Point row
            row.element = this.getRowElementAt(rowIndex);
            // Add the Insert Row
            if (this._allowNewRows)
                this._addInsertRow();
        }
        /**
         *
         **/
        _onRemoveColumn(column) {
            column.header.remove();
            this.allowNewRows = this.allowNewRows;
        }
        /**
         *
         **/
        _onRemoveRow(row, index) {
            row.element.remove();
            this._updateRowIndexes();
        }
        /**
         *
         **/
        _removeInsertRow() {
            this.table.find('tr.insert-row').remove();
        }
        /**
         *
         **/
        _selectColumnHeader(index = -1) {
            this.table.find('th').removeClass('selected');
            if (index < 0)
                this.columns.item(index).header.addClass('selected');
        }
        /**
         *
         **/
        _selectRowHeader(index) {
            this.table.find('tr:eq(' + (index + 1) + ') > th').addClass('selected');
        }
        /**
         *
         **/
        _transactionEnd() {
            this.container.find('.insert-button').remove();
            this._actionCommit.enabled = false;
            this._actionRollback.enabled = false;
        }
        /**
         *
         **/
        _transactionStart() {
            if (this.container.find('.insert-button').length)
                return;
            var bg = new latte.ButtonGroupItem();
            bg.buttons.add(this._actionCommit.getButton());
            bg.buttons.add(this._actionRollback.getButton());
            bg.element
                .addClass('insert-button')
                .css({
                position: 'absolute',
                right: 5,
                top: 5,
                borderRadius: 4,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
            }).appendTo(this.container);
            this._actionCommit.enabled = true;
            this._actionRollback.enabled = true;
        }
        /**
         *
         **/
        _updateRowIndexes() {
            var i = 0;
            this.table.find('tr:not(.headers)').each(function () {
                var tr = $(this);
                tr.data('rowIndex', i);
                tr.children().data('rowIndex', i);
                i++;
            });
        }
        /**
         * Gets a value indicating if the cell at the specified position can be edited.
         **/
        canEditCellAt(columnIndex, rowIndex) {
            var row = this.getRowElementAt(rowIndex);
            var cell = this.hasCellAt(columnIndex, rowIndex) ?
                this.getCellElementAt(columnIndex, rowIndex) : null;
            var canEdit = cell instanceof jQuery
                && !this.readOnly
                && !this.columns.item(columnIndex).readOnly
                && !row.hasClass('pendent')
                && !row.hasClass('deletable-row')
                && this.allowChangeRows;
            if (this.rows.item(rowIndex))
                canEdit = canEdit && !this.rows.item(rowIndex).readOnly;
            return canEdit;
        }
        /**
         * Clears selection of cells.
         **/
        clearSelection() {
            this.table.find('td.selected').removeClass('selected');
        }
        /**
         * Commits the current transaction of rows added, changed and deleted.
         Events <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised accordingly.
         **/
        commit() {
            this.commitAddedRows();
            this.commitChangedRows();
            this.commitDeletedRows();
            this._transactionEnd();
            this.onCommitted();
        }
        /**
         * Commits the current transaction of rows added.
         LatteEvent <c>rowsAdded</c> is raised.
         **/
        commitAddedRows() {
            var d = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            // Add dataset columns
            //d.columns.addCollection(this.columns);
            for (var i = 0; i < this.columns.count; i++) {
                d.columns.add(this.columns.item(i));
            }
            // Collect new row indexes
            this.table.find('tr.insertable-row').each(function () {
                var tr = $(this);
                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('insertable-row').addClass('pendent pendent-insert');
            });
            for (var i = 0; i < indexes.length; i++) {
                d.rows.add(this.rows.item(indexes[i]));
            }
            // Notify added rows
            this.onRowsAdded(d);
        }
        /**
         * Commits the current transaction of rows changed.
         LatteEvent <c>rowsChanged</c> is raised.
         **/
        commitChangedRows() {
            var d = new latte.DataSet();
            var old = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            // Add dataset columns
            d.columns.addCollection(this.columns);
            old.columns.addCollection(this.columns);
            // Collect new row indexes
            this.table.find('tr.changeable-row').each(function () {
                var tr = $(this);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('changeable-row').addClass('pendent pendent-update');
            });
            for (var i = 0; i < indexes.length; i++) {
                var rowIndex = indexes[i];
                d.rows.add(this.rows.item(rowIndex));
                // Form old row
                var row = new latte.DataSetRow();
                old.rows.add(row);
                for (var j = 0; j < old.columns.count; j++) {
                    var columnIndex = j;
                    var value = this.originalValue(columnIndex, rowIndex);
                    if (latte._undef(value))
                        if (this.hasValueAt(columnIndex, rowIndex))
                            value = this.getValueAt(columnIndex, rowIndex);
                        else
                            null;
                    row.setValueAt(columnIndex, value);
                }
            }
            // Notify added rows
            this.onRowsChanged(d, old);
        }
        /**
         * Commits the current transaction of rows deleted.
         LatteEvent <c>rowsDeleted</c> is raised.
         **/
        commitDeletedRows() {
            var d = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            // Add dataset columns
            d.columns.addCollection(this.columns);
            // Collect new row indexes
            this.table.find('tr.deletable-row').each(function () {
                var tr = $(this);
                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('deletable-row').addClass('pendent pendent-delete');
            });
            for (var i = 0; i < indexes.length; i++) {
                d.rows.add(this.rows.item(indexes[i]));
            }
            // Notify removed rows
            this.onRowsRemoved(d);
        }
        /**
         * Confirms the commit of added rows
         **/
        confirmRowsAdded() {
            this.table.find('tr.pendent-insert').removeClass('pendent pendent-insert');
        }
        /**
         * Confirms the commit of changed rows
         **/
        confirmRowsChanged() {
            this.table.find('tr.pendent-update').removeClass('pendent pendent-update');
        }
        /**
         * Confirms the commit of delete rows
         **/
        confirmRowsRemoved() {
            // Remove rows on data
            var indexes = [];
            // Collect indexes
            this.table.find('tr.pendent-delete').each(function () {
                indexes.push($(this).data('rowIndex'));
            });
            // Remove from the last to the first
            for (var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);
        }
        /**
         * Enables the user a mechanism for copying the value of the cell to clipboard
         **/
        copySelectedCellValue() {
            var txtView = new latte.TextView();
            txtView.text = this.selectedCell.text();
            var btnOk = new latte.ButtonItem();
            btnOk.text = strings.ok;
            var d = new latte.DialogView(txtView, [btnOk]);
            d.show();
            txtView.textElement.focus();
            txtView.textElement.select();
        }
        /**
         * Marks the row at the specified position for deletion
         **/
        deleteRowAt(rowIndex) {
            this.getRowElementAt(rowIndex).addClass('deletable-row');
            this._transactionStart();
        }
        /**
         * Starts the edition mode of the cell at the specified row and column.
         **/
        editCellAt(columnIndex, rowIndex) {
            if (!this.canEditCellAt(columnIndex, rowIndex))
                return;
            var gv = this;
            var td = this.getCellElementAt(columnIndex, rowIndex);
            var val = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : '';
            var col = this.columns.item(columnIndex);
            this.clearSelection();
            // Mark as editing
            td.addClass('editing');
            var input = new latte.InputItem();
            input.type = col.type;
            input.options = col.options;
            input.value = val;
            input.textVisible = false;
            input.element.find('input[type=text], input[type=password], textarea')
                .width(td.width());
            // Add input to Td
            td.empty()
                .append(input.element)
                .data('input', input);
            // Focus input
            var elem = input.element.find('input, select, textarea');
            elem
                .keydown(function (evt) {
                if (evt.keyCode == latte.Key.ESCAPE)
                    gv.endCellEdit(true);
                else if (evt.keyCode == latte.Key.TAB)
                    if (evt.shiftKey)
                        gv.editPreviousCell();
                    else
                        gv.editNextCell();
                else if (evt.keyCode == latte.Key.ENTER)
                    gv.endCellEdit(false);
            })
                .click(function (ev) {
                ev.stopPropagation();
            });
            setTimeout(function () { elem.first().focus().select(); }, 100);
            this.endCellEdit();
            this._editingTd = td;
        }
        /**
         * Starts the edition mode of the next cell on the grid, if already in edition mode.
         **/
        editNextCell() {
            if (!this.editing)
                return;
            var rowCount = this.table.find('tr.row').length - 1;
            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            if (col == colCount - 1 && row == rowCount - 1)
                return;
            if (col == colCount - 1) {
                col = 0;
                row++;
            }
            else {
                col++;
            }
            this.editCellAt(col, row);
        }
        /**
         * Starts the edition mode of the previous cell on the grid, if already in edition mode.
         **/
        editPreviousCell() {
            if (!this.editing)
                return;
            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            if (row == 0 && col == 0)
                return;
            if (col == 0) {
                col = colCount - 1;
                row--;
            }
            else {
                col--;
            }
            this.editCellAt(col, row);
        }
        /**
         * Ends the edition mode of the current editing cell. Optionally cancells edition by returning value to its original state.
         **/
        endCellEdit(cancelled = false) {
            if (!this._editingTd || this._editingTd.length == 0)
                return;
            var input = this._editingTd.data('input');
            var value = input.value;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            //log("endCell col: %s; row: %s; value: %s", col, row, value)
            // Check if new row
            if (this._editingTd.parent().hasClass('insert-row')) {
                // If not cancelled, add another row
                if (cancelled !== true) {
                    this._makeInsertRowCandidate();
                    this._addInsertRow();
                }
                // Clears the value
                this.setValueAt(col, row, value);
            }
            else if (this._editingTd.parent().hasClass('insertable-row')) {
                this.setValueAt(col, row, value);
            }
            else {
                if (cancelled !== true) {
                    this.setValueAt(col, row, value, true);
                }
                else {
                    if (this.hasValueAt(col, row))
                        this.setValueAt(col, row, this.getValueAt(col, row));
                }
            }
            if (!cancelled)
                this._editingTd.addClass('changeable-row');
            this._editingTd.data('input', null);
            this._editingTd.removeClass('editing');
            this._editingTd = null;
        }
        /**
         * Gets the actual element of the cell at specified column and row.
         **/
        getCellElementAt(columnIndex, rowIndex) {
            return this.table.find(latte.sprintf("tr:eq(%s) td:eq(%s)", rowIndex + 1, columnIndex));
            //return this.table.find('td.row-' + rowIndex + '.col-' + columnIndex);
        }
        /**
         *
         **/
        getData() {
            var d = new latte.DataSet();
            d.columns.addCollection(this.columns);
            d.rows.addCollection(this.rows);
            return d;
        }
        /**
         * Gets the actual element of the row at specified column and row.
         **/
        getRowElementAt(rowIndex) {
            return this.table.find(latte.sprintf("tr:eq(%s)", rowIndex + 1));
        }
        /**
         * Gets the data value at the specified position.
         **/
        getValueAt(columnIndex, rowIndex) {
            if (this.hasValueAt(columnIndex, rowIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else if (this.rows.count <= rowIndex)
                throw new latte.InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new latte.InvalidArgumentEx('columnIndex', columnIndex);
        }
        /**
         * Gets a value indicating if the there is a cell for the specified position
         **/
        hasCellAt(columnIndex, rowIndex) {
            return this.getCellElementAt(columnIndex, rowIndex).length > 0;
        }
        /**
         * Gets a value indicating if there is a value at the specified position.
         **/
        hasValueAt(columnIndex, rowIndex) {
            return this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex);
        }
        /**
         * Raises the <c>committed</c> event
         **/
        onCommitted() {
            this.committed.raise();
        }
        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        onContextItemsShow() {
            super.onContextItemsShow();
            // Get cell on mouse
            var hover = this.table.find('td.cell.hover');
            var columnIndex = hover.data('columnIndex');
            var rowIndex = hover.data('rowIndex');
            // Clear actions
            this.contextItems.clear();
            // If no cell on mouse, no menus
            if (hover.length == 0)
                return;
            // Select hover cell
            this.selectCellAt(columnIndex, rowIndex);
            // Disable delete row if in new row
            this._actionRemoveRow.enabled = !hover.parent().hasClass('insert-row') && this.allowDeleteRows;
            // Disable set null
            this._actionSetCellNull.enabled = this.canEditCellAt(columnIndex, rowIndex);
            // Copy & paste
            this.contextItems.add(this._actionCopyCellValue.getButton());
            this.contextItems.add(this._actionPasteCellValue.getButton());
            this.contextItems.add(new latte.SeparatorItem());
            // Set NULL value
            this.contextItems.add(this._actionSetCellNull.getButton());
            // Delete row
            this.contextItems.add(this._actionRemoveRow.getButton());
        }
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        onRowsAdded(dataset) {
            this.rowsAdded.raise(dataset);
        }
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        onRowsChanged(dataset, oldDataset = null) {
            this.rowsChanged.raise(dataset, oldDataset);
        }
        /**
         * Raises the <c>rowsDeleted</c> event.
         **/
        onRowsRemoved(dataset) {
            this.rowsRemoved.raise(dataset);
        }
        /**
         * Raises the <c>valueChanged</c> event.
         **/
        onValueChanged(columnIndex, rowIndex, value, oldValue) {
            // Ensure transaction is on the go
            this._transactionStart();
            // Mark as changeable
            this.getRowElementAt(rowIndex).addClass('changeable-row');
            // Set original value
            if (latte._undef(this.originalValue(columnIndex, rowIndex)))
                this.originalValue(columnIndex, rowIndex, oldValue);
            // Raise event
            this.valueChanged.raise({ row: rowIndex, column: columnIndex, value: value, oldValue: oldValue });
        }
        /**
         * Gets or sets the original value of the specified position.
         If no changes have occoured, it will return <c>undefined</c>
         **/
        originalValue(columnIndex, rowIndex, value = null) {
            var cell = this.getCellElementAt(columnIndex, rowIndex);
            if (latte._undef(value))
                return cell.data('original-value');
            cell.data('original-value', value);
            return this;
        }
        /**
         * Restores the original value at the specified position if possible.
         **/
        restoreValueAt(columnIndex, rowIndex) {
            if (!this.hasCellAt(columnIndex, rowIndex))
                return;
            var cell = this.getCellElementAt(columnIndex, rowIndex);
            if (!latte._undef(cell.data('original-value'))) {
                this.setValueAt(columnIndex, rowIndex, cell.data('original-value'));
                cell.removeData('original-value');
            }
        }
        /**
         * Cancels the current transaction of rows added, changed and deleted.
         **/
        rollback() {
            var gv = this;
            // End any active edit
            this.endCellEdit();
            // Remove rows on data
            var indexes = [];
            // Collect indexes
            this.table.find('tr.insertable-row').each(function () {
                indexes.push($(this).data('rowIndex'));
            });
            // Remove from the last to the first
            for (var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);
            // Remove insert row
            this._removeInsertRow();
            // Add if insertable
            if (this.allowNewRows)
                this.allowNewRows = this.allowNewRows;
            // Remove deletable-row marks
            this.table.find('tr.deletable-row').removeClass('deletable-row');
            // Remove changeable-row marks
            this.table.find('tr.changeable-row')
                .each(function () {
                var rowIndex = $(this).data('rowIndex');
                for (var columnIndex = 0; columnIndex < gv.columns.count; columnIndex++)
                    gv.restoreValueAt(columnIndex, rowIndex);
            })
                .removeClass('changeable-row');
            // Remove the commit button
            this._transactionEnd();
        }
        /**
         * Selects the cell at the specified position.
         **/
        selectCellAt(columnIndex, rowIndex) {
            this.clearSelection();
            this.getCellElementAt(columnIndex, rowIndex).addClass('selected');
        }
        /**
         *
         **/
        setData(value) {
            this.columns.clear();
            this.rows.clear();
            var row, col, buff = this.allowNewRows;
            while ((col = value.columns.next()))
                this.columns.add(new latte.GridViewColumn(col.name, col.type, col.length));
            // Deactivate allow new rows
            this.allowNewRows = false;
            while ((row = value.rows.next()))
                this.rows.add(new latte.GridViewRow(row.data));
            // Deactivate allow new rows
            this.allowNewRows = buff;
        }
        /**
         * Sets the data value at the specified position.
         Optionally specifies if the <c>valueChanged</c> should be raised
         **/
        setValueAt(columnIndex, rowIndex, value, raiseEvent = false) {
            var td = this.getCellElementAt(columnIndex, rowIndex);
            var oldValue = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : null;
            // Set row value
            if (this.rows.count > rowIndex)
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            if (value === null) {
                td.empty().append($('<div>').addClass('null').text("NULL"));
            }
            else if (this.columns.item(columnIndex).type == 'password' || this.columns.item(columnIndex).type == 'md5-password') {
                // Place a "(Sectet)" string
                td.empty().html(latte.sprintf("(%s)", strings.secret));
            }
            else {
                // Empty td and set value
                td.empty().html(latte.InputItem.format(value, this.columns.item(columnIndex).type, this.columns.item(columnIndex).options));
            }
            if (raiseEvent === true) {
                this.onValueChanged(columnIndex, rowIndex, value, oldValue);
            }
        }
        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        get allowChangeRows() {
            return this._allowChangeRows;
        }
        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        set allowChangeRows(value) {
            this._allowChangeRows = value;
        }
        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        get allowDeleteRows() {
            return this._allowDeleteRows;
        }
        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        set allowDeleteRows(value) {
            this.allowDeleteRows = value;
        }
        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        get allowNewRows() {
            return this._allowNewRows;
        }
        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        set allowNewRows(value) {
            this._allowNewRows = value;
            if (value) {
                this._removeInsertRow();
                if (!this.readOnly)
                    this._addInsertRow();
            }
            else {
                this._removeInsertRow();
            }
        }
        /**
         * Gets or sets the data on grid as a DataSet
         **/
        get data() {
            return this.getData();
        }
        /**
         * Gets or sets the data on grid as a DataSet
         **/
        set data(value) {
            this.setData(value);
        }
        /**
         * Gets a value indicating if some cell of the grid is currently on edit mode
         **/
        get editing() {
            return this._editingTd ? true : false;
        }
        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        set readOnly(value) {
            this._readOnly = value;
            if (value) {
                this._removeInsertRow();
            }
            else {
                this.allowNewRows = this.allowNewRows;
            }
        }
        /**
         * Gets or sets the selected cell of grid
         **/
        get selectedCell() {
            return this.table.find('td.cell.selected');
        }
        /**
         * Gets or sets the selected cell of grid
         **/
        set selectedCell(value) {
            if (!(value instanceof jQuery))
                throw new latte.InvalidArgumentEx('value');
            this.selectCellAt(value.data('columnIndex'), value.data('rowIndex'));
        }
    }
    latte.GridView = GridView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/8/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ExplorerItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the explorer item
         */
        constructor() {
            /**
             * Property field
             */
            this._childrenLoaded = false;
            /**
             * Property field
             */
            this._childrenPage = 1;
            /**
             * Property field
             */
            this._childrenPages = 0;
            /**
             * Property field
             */
            this._explorer = null;
            /**
             * Property field
             */
            this._loadsChildren = true;
            /**
             * Property field
             */
            this._loadsChildrenFolders = true;
            /**
             * Property field
             */
            this._parent = null;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Creates a tree item for the record
         */
        createTreeItem() {
            var item = new latte.TreeItem();
            item.tag = this;
            this._treeItem = item;
            this.syncUI();
            return item;
        }
        /**
         * Creates a list view item for the record
         */
        createListViewItem() {
            var item = new latte.ListViewItem(this.explorer.listView);
            var columns = this.getColumns();
            item.tag = this;
            this._listViewItem = item;
            // Name column
            item.addColumn(150);
            this.syncUI();
            return item;
        }
        /**
         * Gets a value indicating if the item may be deleted
         *
         * @returns {boolean}
         */
        getCanBeDeleted() {
            return true;
        }
        /**
         * Gets the column headers of the item
         * @returns {Array}
         */
        getColumnHeaders() {
            return [];
        }
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns() {
            return [];
        }
        /**
         * Loads the children of the item
         */
        getChildrenLoader() {
            return null;
        }
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView() {
            return null;
        }
        /**
         * Gets the actions of the button
         *
         * @returns {Array}
         */
        getItems() {
            return [];
        }
        /**
         * Gets the actions that apply for child items
         *
         * @returns {Array}
         */
        getChildrenItems() {
            return [];
        }
        /**
         * Gets the icon of 16 pixels
         *
         * @returns {IconItem}
         */
        getIcon() {
            return latte.IconItem.standard(2, 1);
        }
        /**
         * Gets the icon of 32 pixels
         *
         * @returns {IconItem}
         */
        getIcon32() {
            return latte.IconItem.standard(2, 1, 32);
        }
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName() {
            return this.toString();
        }
        /**
         * Loads children if necessary.
         * Checks <c>loadsChildren</c> and <c>childrenLoaded</c> flags to avoid re-loading.
         */
        loadChildren(callback = null) {
            if (!callback) {
                callback = () => { }; // Does nothing;
            }
            if (!this.loadsChildren || this.childrenLoaded) {
                callback();
                return;
            }
            else {
                // Raise load start
                this.onChildrenLoadStarted();
                // Retrieve loader
                var call = this.getChildrenLoader();
                if (call) {
                    this.children.clear();
                    this._childrenLoading = true;
                    call.send(() => {
                        // Check flag
                        this.childrenLoaded = true;
                        // Report end of load
                        this._childrenLoading = false;
                        // Raise load end
                        this.onChildrenLoadEnd();
                        // Callback
                        callback();
                    });
                }
                else {
                    // Check flag
                    this.childrenLoaded = true;
                    // Raise load end
                    this.onChildrenLoadEnd();
                    callback();
                }
            }
        }
        /**
         * Raises the <c>childAdded</c> event
         */
        onChildAdded(item) {
            if (this._childAdded) {
                this._childAdded.raise(item);
            }
            item.explorer = this.explorer;
            item._parent = this;
        }
        /**
         * Raises the <c>childrenPages</c> event
         */
        onChildrenPagesChanged() {
            if (this._childrenPagesChanged) {
                this._childrenPagesChanged.raise();
            }
            this.explorer.paginator.visible = this.explorer && this.childrenPages > 1;
            //log("Paginator visible: " + (this.explorer && this.childrenPages > 1))
        }
        /**
         * Raises the <c>childRemoved</c> event
         */
        onChildRemoved(item) {
            if (this._childRemoved) {
                this._childRemoved.raise(item);
            }
            item._parent = null;
        }
        /**
         * Raises the <c>childrenChanged</c> event
         */
        onChildrenChanged() {
            this.childrenLoaded = false;
            if (this._childrenChanged) {
                this._childrenChanged.raise();
            }
        }
        /**
         * Raises the <c>childrenLoadStarted</c> event
         */
        onChildrenLoadStarted() {
            if (this._childrenLoadStarted) {
                this._childrenLoadStarted.raise();
            }
        }
        /**
         * Raises the <c>childrenLoadEnd</c> event
         */
        onChildrenLoadEnd() {
            if (this._childrenLoadEnd) {
                this._childrenLoadEnd.raise();
            }
        }
        /**
         * Synchronizes UI Items to reflect possible changes
         */
        syncUI() {
            if (this.treeItem) {
                this.treeItem.text = this.getName();
                this.treeItem.icon = this.getIcon();
            }
            if (this.listViewItem) {
                this.listViewItem.icon = this.getIcon();
                this.listViewItem.setItem(0, new latte.LabelItem(this.getName()));
            }
        }
        /**
         * Gets an event raised when a child is added
         *
         * @returns {LatteEvent}
         */
        get childAdded() {
            if (!this._childAdded) {
                this._childAdded = new latte.LatteEvent(this);
            }
            return this._childAdded;
        }
        /**
         * Gets an event raised when a child is removed
         *
         * @returns {LatteEvent}
         */
        get childRemoved() {
            if (!this._childRemoved) {
                this._childRemoved = new latte.LatteEvent(this);
            }
            return this._childRemoved;
        }
        /**
         * Gets an event raised when the children of the item changed
         *
         * @returns {LatteEvent}
         */
        get childrenChanged() {
            if (!this._childrenChanged) {
                this._childrenChanged = new latte.LatteEvent(this);
            }
            return this._childrenChanged;
        }
        /**
         * Gets an event raised when the load of children starts
         *
         * @returns {LatteEvent}
         */
        get childrenLoadStarted() {
            if (!this._childrenLoadStarted) {
                this._childrenLoadStarted = new latte.LatteEvent(this);
            }
            return this._childrenLoadStarted;
        }
        /**
         * Gets an event raised when the load of children ends
         *
         * @returns {LatteEvent}
         */
        get childrenLoadEnd() {
            if (!this._childrenLoadEnd) {
                this._childrenLoadEnd = new latte.LatteEvent(this);
            }
            return this._childrenLoadEnd;
        }
        /**
         * Gets the collection of child items of this item
         *
         * @returns {Collection<ExplorerItem>}
         */
        get children() {
            if (!this._children) {
                this._children = new latte.Collection((item) => { this.onChildAdded(item); }, (item) => { this.onChildRemoved(item); });
            }
            return this._children;
        }
        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @returns {boolean}
         */
        get childrenLoaded() {
            return this._childrenLoaded;
        }
        /**
         * Gets or sets a value indicating if the children is loaded
         *
         * @param {boolean} value
         */
        set childrenLoaded(value) {
            this._childrenLoaded = value;
        }
        /**
         * Gets a value indicating if the node needs to load children, by analyzing its state
         *
         * @returns {boolean}
         */
        get childrenLoadNeeded() {
            return this.loadsChildren && !this.childrenLoaded && !this.childrenLoaded;
        }
        /**
         * Gets or sets the current page of children
         *
         * @returns {number}
         */
        get childrenPage() {
            return this._childrenPage;
        }
        /**
         * Gets or sets the current page of children
         *
         * @param {number} value
         */
        set childrenPage(value) {
            this._childrenPage = value;
        }
        /**
         * Gets or sets the total pages of children items
         *
         * @returns {number}
         */
        get childrenPages() {
            return this._childrenPages;
        }
        /**
         * Gets or sets the total pages of children items
         *
         * @param {number} value
         */
        set childrenPages(value) {
            // Check if value changed
            var changed = value !== this._childrenPages;
            // Set value
            this._childrenPages = value;
            // Trigger changed event
            if (changed) {
                this.onChildrenPagesChanged();
            }
        }
        /**
         * Gets an event raised when the value of the childrenPages property changes
         *
         * @returns {LatteEvent}
         */
        get childrenPagesChanged() {
            if (!this._childrenPagesChanged) {
                this._childrenPagesChanged = new latte.LatteEvent(this);
            }
            return this._childrenPagesChanged;
        }
        /**
         * Gets or sets the explorer view where the item lives
         *
         * @returns {ExplorerView}
         */
        get explorer() {
            return this._explorer;
        }
        /**
         * Gets or sets the explorer view where the item lives
         *
         * @param {ExplorerView} value
         */
        set explorer(value) {
            this._explorer = value;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].explorer = value;
            }
        }
        /**
         * Gets a value indicating if children are being loaded
         *
         * @returns {boolean}
         */
        get childrenLoading() {
            return this._childrenLoading;
        }
        /**
         * Gets the last created listview item
         *
         * @returns {ListViewItem}
         */
        get listViewItem() {
            return this._listViewItem;
        }
        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @returns {boolean}
         */
        get loadsChildren() {
            return this._loadsChildren;
        }
        /**
         * Gets or sets a flag indicating if the item may load children for sub-items
         *
         * @param {boolean} value
         */
        set loadsChildren(value) {
            this._loadsChildren = value;
        }
        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @returns {boolean}
         */
        get loadsChildrenFolders() {
            return this._loadsChildrenFolders;
        }
        /**
         * Gets or sets a value indicating if the item will load items with sub-items.
         *
         * @param {boolean} value
         */
        set loadsChildrenFolders(value) {
            this._loadsChildrenFolders = value;
        }
        /**
         * Gets the parent item of this item
         *
         * @returns {ExplorerItem}
         */
        get parent() {
            return this._parent;
        }
        /**
         * Gets the last created tree item
         *
         * @returns {TreeItem}
         */
        get treeItem() {
            return this._treeItem;
        }
    }
    latte.ExplorerItem = ExplorerItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/25/14.
 */
var latte;
(function (latte) {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    class DataRecordChildrenView extends latte.ToolbarView {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the widget
         */
        constructor(loadChildren = null, childAdd = null, childEdit = null, childRemove = null) {
            super();
            /**
             * Property field
             */
            this._record = null;
            this.toolbar.sideItems.addArray([
                this.btnRemove,
                this.btnEdit,
                this.btnAdd,
                new latte.SeparatorItem(),
                this.btnRefresh,
            ]);
            this.view = this.listView;
            if (loadChildren) {
                this.loadChildren.add(loadChildren);
            }
            if (childAdd) {
                this.childAdd.add(childAdd);
            }
            if (childEdit) {
                this.childEdit.add(childEdit);
            }
            if (childRemove) {
                this.childRemove.add(childRemove);
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>childAdd</c> event
         */
        onChildrenAdd() {
            if (this._childAdd) {
                this._childAdd.raise();
            }
        }
        /**
         * Raises the <c>childEdit</c> event
         */
        onChildEdit() {
            if (this._childEdit) {
                this._childEdit.raise();
            }
        }
        /**
         * Raises the <c>childRemove</c> event
         */
        onChildRemove() {
            if (this._childRemove) {
                this._childRemove.raise();
            }
        }
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren() {
            this.btnRemove.enabled = this.btnEdit.enabled = false;
            this.children.clear();
            if (this._loadChildren) {
                this._loadChildren.raise();
            }
        }
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged() {
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
            this.onLoadChildren();
        }
        /**
         * Reloads children of the view
         */
        reloadChildren() {
            this.onLoadChildren();
        }
        /**
         * Gets an event raised when the user asks to add a new children
         *
         * @returns {LatteEvent}
         */
        get childAdd() {
            if (!this._childAdd) {
                this._childAdd = new latte.LatteEvent(this);
                this._childAdd.handlerAdded.add(() => { this.btnAdd.visible = true; });
            }
            return this._childAdd;
        }
        /**
         * Gets an event raised when the user requests to edit the children
         *
         * @returns {LatteEvent}
         */
        get childEdit() {
            if (!this._childEdit) {
                this._childEdit = new latte.LatteEvent(this);
                this._childEdit.handlerAdded.add(() => { this.btnEdit.visible = true; });
            }
            return this._childEdit;
        }
        /**
         * Gets an event raised when the user requests to delete the children
         *
         * @returns {LatteEvent}
         */
        get childRemove() {
            if (!this._childRemove) {
                this._childRemove = new latte.LatteEvent(this);
                this._childRemove.handlerAdded.add(() => { this.btnRemove.visible = true; });
            }
            return this._childRemove;
        }
        /**
         * Gets an event raised when the children must be loaded
         *
         * @returns {LatteEvent}
         */
        get loadChildren() {
            if (!this._loadChildren) {
                this._loadChildren = new latte.LatteEvent(this);
            }
            return this._loadChildren;
        }
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        get recordChanged() {
            if (!this._recordChanged) {
                this._recordChanged = new latte.LatteEvent(this);
            }
            return this._recordChanged;
        }
        /**
         * Gets the add button
         *
         * @returns {ButtonItem}
         */
        get btnAdd() {
            if (!this._btnAdd) {
                this._btnAdd = new latte.ButtonItem(null, latte.IconItem.standard(3, 3), () => { this.onChildrenAdd(); });
                this._btnAdd.tooltip = strings.add;
                this._btnAdd.visible = false;
            }
            return this._btnAdd;
        }
        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        get btnEdit() {
            if (!this._btnEdit) {
                this._btnEdit = new latte.ButtonItem(null, latte.IconItem.standard(14, 8), () => { this.onChildEdit(); });
                this._btnEdit.tooltip = strings.edit;
                this._btnEdit.visible = false;
                this._btnEdit.enabled = false;
            }
            return this._btnEdit;
        }
        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        get btnRefresh() {
            if (!this._btnRefresh) {
                this._btnRefresh = new latte.ButtonItem(null, latte.IconItem.standard(1, 4), () => { this.onLoadChildren(); });
            }
            return this._btnRefresh;
        }
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        get btnRemove() {
            if (!this._btnRemove) {
                this._btnRemove = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), () => {
                    var name = this.selectedChild.tag ? this.selectedChild.tag.toString() : this.selectedChild.toString();
                    latte.DialogView.confirmDelete(name, () => {
                        this.onChildRemove();
                    });
                });
                //this._btnRemove.tooltip = strings.remove;
                this._btnRemove.visible = false;
                this._btnRemove.enabled = false;
            }
            return this._btnRemove;
        }
        /**
         * Gets the list view of the view
         *
         * @returns {ListView}
         */
        get listView() {
            if (!this._listView) {
                this._listView = new latte.ListView();
                this._listView.selectedItemChanged.add(() => {
                    this.btnEdit.enabled = this.btnRemove.enabled = this.listView.selectedItem != null;
                });
            }
            return this._listView;
        }
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        get pagination() {
            if (!this._pagination) {
                this._pagination = new latte.PaginationItem();
            }
            return this._pagination;
        }
        //endregion
        //region Properties
        /**
         * Gets the collection of children of the widget
         *
         * @returns {Collection<SelectableItem>}
         */
        get children() {
            return this.listView.items;
        }
        /**
         * Gets or sets the record parent of the children
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record parent of the children
         *
         * @param {DataRecord} value
         */
        set record(value) {
            // Check if value changed
            var changed = value !== this._record;
            // Set value
            this._record = value;
            // Trigger changed event
            if (changed) {
                this.onRecordChanged();
            }
        }
        /**
         * Gets the selected child of the widget
         *
         * @returns {SelectableItem}
         */
        get selectedChild() {
            return this.listView.selectedItem;
        }
    }
    latte.DataRecordChildrenView = DataRecordChildrenView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/25/14.
 */
var latte;
(function (latte) {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    class DataRecordChildrenWidget extends latte.WidgetItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the widget
         */
        constructor(loadChildren = null, childAdd = null, childEdit = null, childRemove = null) {
            super();
            /**
             * Property field
             */
            this._record = null;
            this.allowClose = this.allowMaximize = false;
            this.topToolbar.sideItems.addArray([
                this.btnRemove,
                this.btnEdit,
                this.btnAdd,
                new latte.SeparatorItem(),
                this.btnRefresh,
            ]);
            this.items.add(this.stackChildren);
            this.optionsButton.visible = false;
            if (loadChildren) {
                this.loadChildren.add(loadChildren);
            }
            if (childAdd) {
                this.childAdd.add(childAdd);
            }
            if (childEdit) {
                this.childEdit.add(childEdit);
            }
            if (childRemove) {
                this.childRemove.add(childRemove);
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>childAdd</c> event
         */
        onChildrenAdd() {
            if (this._childAdd) {
                this._childAdd.raise();
            }
        }
        /**
         * Raises the <c>childEdit</c> event
         */
        onChildEdit() {
            if (this._childEdit) {
                this._childEdit.raise();
            }
        }
        /**
         * Raises the <c>childRemove</c> event
         */
        onChildRemove() {
            if (this._childRemove) {
                this._childRemove.raise();
            }
        }
        /**
         * Raises the <c>loadChildren</c> event
         */
        onLoadChildren() {
            this.btnRemove.enabled = this.btnEdit.enabled = false;
            this.children.clear();
            if (this._loadChildren) {
                this._loadChildren.raise();
            }
        }
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged() {
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
            this.onLoadChildren();
        }
        /**
         * Reloads children
         */
        reloadChildren() {
            this.onLoadChildren();
        }
        /**
         * Gets an event raised when the user asks to add a new children
         *
         * @returns {LatteEvent}
         */
        get childAdd() {
            if (!this._childAdd) {
                this._childAdd = new latte.LatteEvent(this);
                this._childAdd.handlerAdded.add(() => { this.btnAdd.visible = true; });
            }
            return this._childAdd;
        }
        /**
         * Gets an event raised when the user requests to edit the children
         *
         * @returns {LatteEvent}
         */
        get childEdit() {
            if (!this._childEdit) {
                this._childEdit = new latte.LatteEvent(this);
                this._childEdit.handlerAdded.add(() => { this.btnEdit.visible = true; });
            }
            return this._childEdit;
        }
        /**
         * Gets an event raised when the user requests to delete the children
         *
         * @returns {LatteEvent}
         */
        get childRemove() {
            if (!this._childRemove) {
                this._childRemove = new latte.LatteEvent(this);
                this._childRemove.handlerAdded.add(() => { this.btnRemove.visible = true; });
            }
            return this._childRemove;
        }
        /**
         * Gets an event raised when the children must be loaded
         *
         * @returns {LatteEvent}
         */
        get loadChildren() {
            if (!this._loadChildren) {
                this._loadChildren = new latte.LatteEvent(this);
            }
            return this._loadChildren;
        }
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        get recordChanged() {
            if (!this._recordChanged) {
                this._recordChanged = new latte.LatteEvent(this);
            }
            return this._recordChanged;
        }
        /**
         * Gets the add button
         *
         * @returns {ButtonItem}
         */
        get btnAdd() {
            if (!this._btnAdd) {
                this._btnAdd = new latte.ButtonItem(null, latte.IconItem.standard(3, 3), () => { this.onChildrenAdd(); });
                this._btnAdd.tooltip = strings.add;
                this._btnAdd.visible = false;
            }
            return this._btnAdd;
        }
        /**
         * Gets the edit button
         *
         * @returns {ButtonItem}
         */
        get btnEdit() {
            if (!this._btnEdit) {
                this._btnEdit = new latte.ButtonItem(null, latte.IconItem.standard(14, 8), () => { this.onChildEdit(); });
                this._btnEdit.tooltip = strings.edit;
                this._btnEdit.visible = false;
                this._btnEdit.enabled = false;
            }
            return this._btnEdit;
        }
        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        get btnRefresh() {
            if (!this._btnRefresh) {
                this._btnRefresh = new latte.ButtonItem(null, latte.IconItem.standard(1, 4), () => { this.onLoadChildren(); });
            }
            return this._btnRefresh;
        }
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        get btnRemove() {
            if (!this._btnRemove) {
                this._btnRemove = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), () => {
                    var name = this.selectedChild.tag ? this.selectedChild.tag.toString() : this.selectedChild.toString();
                    latte.DialogView.confirmDelete(name, () => {
                        this.onChildRemove();
                    });
                });
                //this._btnRemove.tooltip = strings.remove;
                this._btnRemove.visible = false;
                this._btnRemove.enabled = false;
            }
            return this._btnRemove;
        }
        /**
         * Gets the stack where children are placed
         *
         * @returns {SelectableStack}
         */
        get stackChildren() {
            if (!this._stackChildren) {
                this._stackChildren = new latte.SelectableStack();
                this._stackChildren.padding = 0;
                this._stackChildren.selectedItemChanged.add(() => {
                    this.btnEdit.enabled = this.btnRemove.enabled = this.stackChildren.selectedItem != null;
                });
            }
            return this._stackChildren;
        }
        //endregion
        //region Properties
        /**
         * Gets the collection of children of the widget
         *
         * @returns {Collection<SelectableItem>}
         */
        get children() {
            return this.stackChildren.items;
        }
        /**
         * Gets or sets the record parent of the children
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record parent of the children
         *
         * @param {DataRecord} value
         */
        set record(value) {
            // Check if value changed
            var changed = value !== this._record;
            // Set value
            this._record = value;
            // Trigger changed event
            if (changed) {
                this.onRecordChanged();
            }
        }
        /**
         * Gets the selected child of the widget
         *
         * @returns {SelectableItem}
         */
        get selectedChild() {
            return this.stackChildren.selectedItem;
        }
    }
    latte.DataRecordChildrenWidget = DataRecordChildrenWidget;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    class DataRecordFormItem extends latte.FormItem {
        /**
         * Creates the form of the specified record
         **/
        constructor(record = null) {
            super();
            /**
             * Property field
             */
            this._category = null;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
            if (record)
                this.record = record;
        }
        //region Methods
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
         **/
        applyValues(record = null) {
            var input;
            var r = record || this.record;
            while ((input = this.inputs.next())) {
                if (input.readOnly === true)
                    continue;
                r[input.tag] = input.value;
            }
        }
        /**
         * Gets or sets the category of fields to show
         *
         * @returns {string}
         */
        get category() {
            return this._category;
        }
        /**
         * Gets or sets the category of fields to show
         *
         * @param {string} value
         */
        set category(value) {
            // Check if value changed
            let changed = value !== this._category;
            // Set value
            this._category = value;
            // Trigger changed event
            if (changed) {
                this.onCategoryChanged();
            }
        }
        /**
         * Override.
         */
        getSaveCalls() {
            if (this.record) {
                this.applyValues(this.record);
            }
            return [this.record.saveCall().withHandlers(() => this.unsavedChanges = false)];
        }
        /**
         * Raises the <c>category</c> event
         */
        onCategoryChanged() {
            if (this._categoryChanged) {
                this._categoryChanged.raise();
            }
            if (this.record) {
                this.onRecordChanged();
            }
        }
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged() {
            var record = this.record;
            // Calls to get foreign key records
            var calls = [];
            // Clear inputs
            this.inputs.clear();
            if (record) {
                // Call form creating
                //TODO: onFormCreating should com from an interface or something
                if (record['onFormCreating']) {
                    record['onFormCreating'](this);
                }
                // Extract metadata
                var metadata = record.getMetadata();
                // Scan metadata
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        var field = metadata.fields[i];
                        if (latte._isString(this.category) && this.category.length == 0 && !field['category']) {
                        }
                        else if (latte._isString(this.category) && (field['category'] != this.category)) {
                            // debugger;
                            continue;
                        }
                        var input = latte.InputItem.fromIInput(field, i);
                        var value = latte._undef(record[i]) ? null : record[i];
                        // input.text = field.text ? field.text : i;
                        // input.type = field.type ? field.type : 'string';
                        // input.name = i;
                        // input.readOnly = field['readonly'] === true || field['readOnly'] === true;
                        // input.options = field['options'];
                        input.tag = i;
                        input.visible = field['visible'] !== false;
                        input.separator = field['separator'] === true;
                        if (latte._isString(field['visible'])) {
                            if (field['visible'] === 'if-inserted') {
                                input.visible = record.inserted();
                            }
                            else if (field['visible'] === 'if-not-inserted') {
                                input.visible = !record.inserted();
                            }
                        }
                        // Check for fieldString declaration when read-only
                        if (input.readOnly && record[i + 'String']) {
                            input.value = record[i + 'String'];
                        }
                        else {
                            input.value = value; //value !== null ? value : field['defaultValue'];
                        }
                        if (field.type == 'record') {
                            // Get record value item
                            var d = input.valueItem;
                            // Assign loader function
                            d.loaderFunction = field.loaderFunction;
                            // If not record as value, load it in call
                            if (value && field['recordType'] && !(value instanceof latte.DataRecord)) {
                                ((d, input) => {
                                    var params = {
                                        name: field['recordType'],
                                        id: value
                                    };
                                    var dummy = new latte[params.name]();
                                    if (latte._isString(dummy['_moduleName'])) {
                                        params['module'] = dummy['_moduleName'];
                                    }
                                    calls.push(new latte.RemoteCall('latte.data', 'DataLatteUa', 'recordSelect', params).withHandlers((r) => {
                                        //log("Arrived foreign key record:")
                                        //log(r)
                                        if (r && r.recordId) {
                                            d.setRecordSilent(r);
                                            input.value = input.value;
                                        }
                                    }));
                                })(d, input);
                            }
                        }
                        this.inputs.add(input);
                    }
                }
                //TODO: onFormCreated should come from an interface or something
                if (record['onFormCreated']) {
                    record['onFormCreated'](this);
                }
                /**
                 * Send calls if any
                 */
                if (calls.length > 0) {
                    latte.Message.sendCalls(calls);
                }
            }
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
        }
        /**
         * Gets an event raised when the value of the category property changes
         *
         * @returns {LatteEvent}
         */
        get categoryChanged() {
            if (!this._categoryChanged) {
                this._categoryChanged = new latte.LatteEvent(this);
            }
            return this._categoryChanged;
        }
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        get recordChanged() {
            if (!this._recordChanged) {
                this._recordChanged = new latte.LatteEvent(this);
            }
            return this._recordChanged;
        }
        /**
         * Gets or sets the record of the form
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record of the form
         *
         * @param {DataRecord} value
         */
        set record(value) {
            // Check if value changed
            var changed = value !== this._record;
            // Set value
            this._record = value;
            // Trigger changed event
            if (changed) {
                this.onRecordChanged();
            }
        }
    }
    latte.DataRecordFormItem = DataRecordFormItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a dialog to edit the specified <c>DataRecord</c>
     **/
    class DataRecordDialogView extends latte.DialogView {
        /**
         *
         **/
        constructor(record = null) {
            super();
            var dialog = this;
            this.saving = new latte.LatteEvent(this);
            this.saved = new latte.LatteEvent(this);
            this.formView = new latte.DataRecordFormView(record);
            this.saveButton = new latte.ButtonItem();
            this.saveButton.text = strings.save;
            this.saveButton.click.add(() => { dialog.formView.saveChanges(); this.onSaved(); });
            this.cancelButton = new latte.ButtonItem();
            this.cancelButton.text = strings.cancel;
            this.view = this.formView;
            this.items.add(this.saveButton);
            this.items.add(this.cancelButton);
        }
        //region Static
        /**
         * Shows a dialog to edit the specified record
         * @param r
         * @param onSaved
         * @param title
         */
        static editRecord(r, onSaved = null, title = '') {
            var d = new DataRecordDialogView(r);
            d.title = title;
            d.saved.add(onSaved);
            d.show();
            return d;
        }
        /**
         * Raises the <c>saved</c> event
         **/
        onSaved() {
            this.saved.raise();
        }
        /**
         * Raises the <c>saving</c> event
         **/
        onSaving() {
            var ptr = this;
            this.formView.applyValues();
            this.record.save(function () {
                ptr.onSaved();
            });
            this.saving.raise();
        }
        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        get readOnly() {
            return this._readOnly;
        }
        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        set readOnly(value) {
            this._readOnly = value;
            for (var i = 0; i < this.formView.inputs.count; i++)
                this.formView.inputs.item(i).readOnly = value;
            if (value) {
                this.saveButton.visible = false;
                this.cancelButton.text = strings.close;
            }
            else {
                this.saveButton.visible = true;
                this.cancelButton.text = strings.cancel;
            }
        }
        /**
         * Gets the record of the view
         *
         * @returns {DataRecord}
         */
        get record() {
            return this.formView.record;
        }
    }
    latte.DataRecordDialogView = DataRecordDialogView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 1/13/14.
 */
var latte;
(function (latte) {
    /**
     * Value item for representing data records as value item.
     */
    class DataRecordValueItem extends latte.ValueItem {
        /**
         * Creates the value item
         * @param loader
         * @param textboxCreated
         */
        constructor(loader = null, textboxCreated = null, placeholder = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._loaderFunction = null;
            /**
             * Property field
             */
            this._placeholder = null;
            /**
             * Property field
             */
            this._record = null;
            this.addClass('data-record');
            if (textboxCreated) {
                this.textboxCreated.add(textboxCreated);
            }
            this.updateItem();
            if (loader) {
                this.loaderFunction = loader;
            }
            if (placeholder) {
                this.placeholder = placeholder;
                if (this.textbox) {
                    this.textbox.placeholder = placeholder;
                }
            }
        }
        //region Methods
        /**
         * Override.
         * @returns {number}
         */
        getValue() {
            if (this.record) {
                return this.record.recordId;
            }
            else {
                return 0;
            }
        }
        /**
         * Override
         * @returns {string}
         */
        getValueString() {
            if (this.record) {
                return this.record.toString();
            }
            else {
                return '';
            }
        }
        /**
         * Override
         * @param value
         */
        setValue(value) {
            if (value instanceof latte.DataRecord) {
                this.record = value;
            }
        }
        /**
         * Sets the record without raising the valueChanged event
         */
        setRecordSilent(r) {
            this._record = r;
            this.updateItem();
        }
        /**
         * Updates the item inside to show
         */
        updateItem() {
            this.element.empty();
            if (this.record) {
                this._textbox = null;
                var icon = latte._isFunction(this.record['icon16']) ? this.record['icon16']() : null;
                var bg = new latte.ButtonGroupItem([
                    new latte.ButtonItem(this.record.toString(), icon),
                    new latte.ButtonItem(null, latte.Glyph.dismiss, () => {
                        var txt = this.text;
                        this.record = null;
                        //                        this.textbox.value = txt;
                        this.textbox.input.select();
                        this.textbox.input.focus();
                    })
                ]);
                bg.appendTo(this);
            }
            else {
                this._textbox = new latte.TextboxItem();
                this.textbox.appendTo(this);
                this.textbox.filterSuggestions.add(() => {
                    if (this.loaderFunction) {
                        this.loaderFunction(this, (items) => {
                            this.textbox.suggestions.clear();
                            this.textbox.suggestions.addArray(items);
                        });
                    }
                });
                this.onTextboxCreated();
            }
            this.element.clear();
        }
        /**
         * Gets an event raised when the textbox has been created
         *
         * @returns {LatteEvent}
         */
        get textboxCreated() {
            if (!this._textboxCreated) {
                this._textboxCreated = new latte.LatteEvent(this);
            }
            return this._textboxCreated;
        }
        /**
         * Raises the <c>textboxCreated</c> event
         */
        onTextboxCreated() {
            if (this._textboxCreated) {
                this._textboxCreated.raise(this.textbox);
            }
            if (latte._isString(this.placeholder) && this.placeholder.length > 0) {
                this.textbox.placeholder = this.placeholder;
            }
        }
        /**
         * Gets or sets the loader function
         *
         * @returns {(text:string, callback:(items:Array<Item>) => any) => Message}
         */
        get loaderFunction() {
            return this._loaderFunction;
        }
        /**
         * Gets or sets the loader function
         *
         * @param {(text:string, callback:(items:Array<Item>) => any) => Message} value
         */
        set loaderFunction(value) {
            this._loaderFunction = value;
        }
        /**
         * Gets or sets the placeholder
         *
         * @returns {string}
         */
        get placeholder() {
            return this._placeholder;
        }
        /**
         * Gets or sets the placeholder
         *
         * @param {string} value
         */
        set placeholder(value) {
            this._placeholder = value;
        }
        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record of the item
         *
         * @param {DataRecord} value
         */
        set record(value) {
            var changed = value !== this._record;
            this._record = value;
            this.updateItem();
            if (changed) {
                this.onValueChanged();
            }
        }
        /**
         * Gets the textbox used to search
         *
         * @returns {TextboxItem}
         */
        get textbox() {
            return this._textbox;
        }
        /**
         * Gets the text of the textbox (if any)
         *
         * @returns {string}
         */
        get text() {
            if (this._textbox) {
                return this._textbox.value;
            }
            else if (this.record) {
                return this.record.toString();
            }
            return null;
        }
    }
    latte.DataRecordValueItem = DataRecordValueItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    class DataRecordFormView extends latte.FormView {
        /**
         * Creates the form of the specified record
         **/
        constructor(record = null) {
            super();
            //this.form = new DataRecordFormItem();
            //this.items.clear();
            //this.items.add(this.form);
            if (record)
                this.record = record;
        }
        //region Methods
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        applyValues(record = null) {
            this.form.applyValues(record);
        }
        getSaveCalls() {
            //HACK: I don't think the call to applyValues should be here.
            this.applyValues(this.record);
            // Return save call
            return [this.record.saveCall().withHandlers(() => {
                    this.unsavedChanges = false;
                })];
        }
        printSaveStack(view) {
            latte.log(latte.sprintf("Unsaved changes = %s of view:", view.unsavedChanges));
            latte.log(view);
            if (view.parentView)
                this.printSaveStack(view.parentView);
        }
        /**
         * Gets the data record form view
         *
         * @returns {DataRecordFormItem}
         */
        get form() {
            if (!this._dataform) {
                this._dataform = new latte.DataRecordFormItem();
                this._dataform.valueChanged.add(this.onValueChanged, this);
            }
            return this._dataform;
        }
        //endregion
        //region Properties
        /**
         * Gets or sets the record of the form
         **/
        get record() {
            return this.form.record;
        }
        /**
         * Gets or sets the record of the form
         **/
        set record(record) {
            this.form.record = record;
        }
    }
    latte.DataRecordFormView = DataRecordFormView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Hanldles insertions, updates and deletion of <c>DataRecords</c>
     **/
    class DataRecordGridView extends latte.GridView {
        /**
         *
         **/
        constructor() {
            super();
            this.records = new latte.Collection(this._onAddRecord, this._onRemoveRecord, this);
        }
        /**
         *
         **/
        _onAddRecord(record) {
            // Add row
            var row = new latte.GridViewRow();
            var colIndex = 0;
            var col = null;
            if (this.records.count === 1) {
                // Clear columns
                this.columns.clear();
                // Add columns
                var metadata = record.getMetadata();
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        var f = metadata.fields[i];
                        var c = new latte.GridViewColumn();
                        c.name = f.text || i;
                        c.type = f.type || 'string';
                        this.columns.add(c);
                    }
                    this.recordType = record.recordType;
                    this._metadata = metadata;
                    this.allowNewRows = metadata['can-insert'] === true;
                }
            }
            while ((col = this.columns.next())) {
                row.setValueAt(colIndex, record[col.tag]);
                colIndex++;
            }
            row.tag = record;
            row.readOnly = this._metadata['can-update'] !== true;
            // Point to row
            record.tags._recordDataGridViewRow = row;
            this.rows.add(row);
        }
        /**
         *
         **/
        _onRemoveRecord(record) {
            if (!(record.tags._recordDataGridViewRow instanceof latte.DataSetRow))
                throw new latte.Ex();
            this.rows.remove(record.tags._recordDataGridViewRow);
        }
        /**
         * Applies the values on row to the speified record
         **/
        applyValues(row, record) {
            for (var i = 0; i < this.columns.count; i++) {
                var column = this.columns.item(i);
                var name = column.tag;
                record[name] = row.hasValueAt(i) ? row.getValueAt(i) : null;
            }
        }
        /**
         * Prepares items for context item showing
         **/
        onContextItemsShow() {
            super.onContextItemsShow();
            var cell = this.selectedCell;
            var row = this.rows.item(cell.data('rowIndex'));
            var record = row ? row.tag : null;
            var meta = record ? record.getMetadata() : null;
            this._actionRemoveRow.enabled = meta && meta['can-delete'] === true;
        }
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        onRowsAdded(dataset) {
            super.onRowsAdded(dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = new latte.DataRecord();
                record.recordType = this.recordType;
                record.metadata = this._metadata;
                this.applyValues(row, record);
                row.tag = record;
                record.insert(function () { latte.sprintf("Inserted: " + record.recordId); });
            }
            this.confirmRowsAdded();
        }
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        onRowsChanged(dataset) {
            super.onRowsChanged(dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = row.tag;
                this.applyValues(row, record);
                record.update(function () { latte.sprintf("Updated: " + record.recordId); });
            }
            this.confirmRowsChanged();
        }
        /**
         * Raises the <c>rowsRemoved</c> event.
         **/
        onRowsRemoved(dataset) {
            super.onRowsRemoved(dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = row.tag;
                record.remove(function () { latte.sprintf("Removed: " + record.recordId); });
            }
            this.confirmRowsRemoved();
        }
        /**
         * Gets or sets the recordType of the grid
         **/
        get recordType() {
            return this._recordType;
        }
        /**
         * Gets or sets the recordType of the grid
         **/
        set recordType(value) {
            this._recordType = value;
        }
    }
    latte.DataRecordGridView = DataRecordGridView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/24/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class DataRecordWidget extends latte.WidgetItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor(record = null) {
            super();
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
            this.allowMaximize = this.allowClose = false;
            this.topToolbar.sideItems.add(this.btnSave);
            this.items.add(this.form);
            this.optionsButton.visible = false;
            if (record) {
                this.record = record;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged() {
            this.form.record = this.record;
            this.btnSave.enabled = false;
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
        }
        /**
         * Raises the <c>saving</c> event
         */
        onSaving() {
            if (this._saving) {
                this._saving.raise();
            }
        }
        /**
         * Raises the <c>saved</c> event
         */
        onSaved() {
            if (this._saved) {
                this._saved.raise();
            }
        }
        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        get recordChanged() {
            if (!this._recordChanged) {
                this._recordChanged = new latte.LatteEvent(this);
            }
            return this._recordChanged;
        }
        /**
         * Gets an event raised when the record is being saved
         *
         * @returns {LatteEvent}
         */
        get saving() {
            if (!this._saving) {
                this._saving = new latte.LatteEvent(this);
            }
            return this._saving;
        }
        /**
         * Gets an event raised when the record is saved
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
         * Gets the form of the record
         *
         * @returns {DataRecordFormItem}
         */
        get form() {
            if (!this._form) {
                this._form = new latte.DataRecordFormItem();
                this._form.faceVisible = false;
                this._form.valueChanged.add(() => {
                    this.btnSave.enabled = true;
                });
            }
            return this._form;
        }
        /**
         * Gets the save button
         *
         * @returns {ButtonItem}
         */
        get btnSave() {
            if (!this._btnSave) {
                this._btnSave = new latte.ButtonItem(null, latte.IconItem.standard(4, 2), () => {
                    this.form.applyValues(this.record);
                    this.onSaving();
                    this.record.save(() => {
                        this.btnSave.enabled = false;
                        this.onSaved();
                    });
                });
                this._btnSave.tooltip = strings.save;
                this._btnSave.enabled = false;
            }
            return this._btnSave;
        }
        /**
         * Gets or sets the record of the widget
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record of the widget
         *
         * @param {DataRecord} value
         */
        set record(value) {
            // Check if value changed
            var changed = value !== this._record;
            // Set value
            this._record = value;
            // Trigger changed event
            if (changed) {
                this.onRecordChanged();
            }
        }
    }
    latte.DataRecordWidget = DataRecordWidget;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a column of data in the GridView
     **/
    class GridViewColumn extends latte.DataSetColumn {
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        constructor(name = '', type = '', length = 0) {
            super();
            if (name)
                this.name = name;
            if (type)
                this.type = type;
            if (length)
                this.length = length;
        }
        /**
         * Gets or sets the GridView header element this column represents
         **/
        get header() {
            return this._header;
        }
        /**
         * Gets or sets the GridView header element this column represents
         **/
        set header(value) {
            this._header = value;
        }
        /**
         * Gets or sets a value indicating if the column is read only
         **/
        get readOnly() {
            return this._readonly;
        }
        /**
         * Gets or sets a value indicating if the column is read only
         **/
        set readOnly(value) {
            this._readonly = value;
        }
    }
    latte.GridViewColumn = GridViewColumn;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a row of data on the <c>GridView</c>
     **/
    class GridViewRow extends latte.DataSetRow {
        /**
         * Creates the row
         **/
        constructor(data = []) {
            super(data);
        }
    }
    latte.GridViewRow = GridViewRow;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/11/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ExplorerItemDataRecord extends latte.ExplorerItem {
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
            this._record = null;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Creates a list view item for the record
         */
        createListViewItem() {
            var item = super.createListViewItem();
            // // var item = new ListViewItem();
            // var columns: string[] = this.getColumns();
            //
            // item.icon = this.getIcon();
            //
            // for (var i = 0; i < columns.length; i++) {
            //     var s:string = columns[i];
            //
            //     item.addColumn(this.getColumnWithFor(s));
            //     item.setItem(i, this.getItemForColumn(s));
            // }
            return item;
        }
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName() {
            return this.record ? this.record.toString() : this.toString();
        }
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns() {
            if (!this.record) {
                return [];
            }
            var result = [];
            var metadata = this.record.getMetadata();
            if (metadata.fields) {
                for (var i in metadata.fields) {
                    result.push(i);
                }
            }
            return result;
        }
        /**
         * Gets the width of the specified column
         *
         * @param name
         */
        getColumnWithFor(name) {
            return 200;
        }
        /**
         * Gets an item for the column
         *
         * @param name
         */
        getItemForColumn(name) {
            var value = this.record[name];
            if (this.record[name + 'String']) {
                value = this.record[name + 'String'];
            }
            return new latte.LabelItem(value);
        }
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView() {
            var d = new latte.DataRecordFormView(this.record);
            return d;
        }
        /**
         * Synchronizes UI Items to reflect possible changes
         */
        syncUI() {
            super.syncUI();
            if (this.listViewItem) {
                var item = this.listViewItem;
                var columns = this.getColumns();
                for (var i = 0; i < columns.length; i++) {
                    var s = columns[i];
                    if (!item.columns[i]) {
                        item.addColumn(this.getColumnWithFor(s));
                    }
                    item.setItem(i, this.getItemForColumn(s));
                }
            }
        }
        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record of the item
         *
         * @param {DataRecord} value
         */
        set record(value) {
            this._record = value;
        }
    }
    latte.ExplorerItemDataRecord = ExplorerItemDataRecord;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/8/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ExplorerTreeItem extends latte.TreeItem {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        constructor() {
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
            this._record = null;
        }
        /**
         * Gets or sets the record of the tree item
         *
         * @returns {DataRecord}
         */
        get record() {
            return this._record;
        }
        /**
         * Gets or sets the record of the tree item
         *
         * @param {DataRecord} value
         */
        set record(value) {
            this._record = value;
        }
    }
    latte.ExplorerTreeItem = ExplorerTreeItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/6/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    class ExplorerView extends latte.SplitView {
        //endregion
        /**
         *
         */
        constructor(rootItem = null) {
            super();
            //region Static
            //endregion
            //region Fields
            this.ignorePageChange = false;
            this.detailViewItem = null;
            /**
             * Saves the milliseconds that the last 100 times lasted
             * @type {Array}
             */
            this.loadTimes = [];
            /**
             * Stores the prediction (in milliseconds) of next load
             * @type {number}
             */
            this.nextLoadTimePrediction = 800;
            /**
             * Property field
             */
            this._listSelectedItem = null;
            this.addClass('explorer');
            //region Structure
            this.sideSize = 300;
            // Tree View Side
            var treeSide = new latte.ToolbarView();
            this._treeViewToolbar = treeSide.toolbar;
            treeSide.view = this.treeView;
            // Detail View Side
            this.detailViewToolbarView.view = this.detailView;
            this.detailViewToolbar.items.add(this.btnSaveDetail);
            this.detailViewToolbar.sideItems.add(this.btnRemoveDetail);
            // ListView Side
            var listSide = new latte.ToolbarView();
            this._listViewToolbar = listSide.toolbar;
            listSide.view = this.listView;
            this.listView.element.append(this.loadBar);
            this.listViewToolbar.sideItems.add(this.paginator);
            this.listViewToolbar.sideItems.add(this.btnRefresh);
            // Hide paginator by default
            this.paginator.visible = false;
            // Second split view
            this.detailSplitView.sideView = this.detailViewToolbarView;
            this.detailSplitView.view = listSide;
            // Set tree view side
            this.sideView = treeSide;
            this.view = this.detailSplitView;
            //endregion
            // TODO: Use it for something
            this.treeViewToolbar.visible = false;
            if (rootItem) {
                this.addRootItem(rootItem);
            }
        }
        //region Private Methods
        /**
         * Adds a loading time for criteria enrichment
         * @param time
         */
        addLoadingTime(time) {
            this.loadTimes.push(time.totalMilliseconds);
            if (this.loadTimes.length > 100) {
                this.loadTimes.pop();
            }
            let sum = 0;
            this.loadTimes.forEach((t) => sum += t);
            this.nextLoadTimePrediction = Math.round(sum / this.loadTimes.length);
            // log(sprintf("New Time: %s \t Next Prediction: %s", time.totalMilliseconds, this.nextLoadTimePrediction));
        }
        /**
         * Adds handlers to the item
         */
        addTreeItemHandlers(treeItem) {
            var item = treeItem.tag;
            // Tree items load request
            if (item.loadsChildrenFolders) {
                treeItem.loadItems.add(() => {
                    this.loadChildrenOf(item, () => {
                        this.treeViewChildrenOf(item, treeItem);
                        if (treeItem.selected) {
                            this.listViewChildrenOf(item);
                        }
                        treeItem.reportItemsLoaded();
                    });
                });
            }
            // Tree item selection change
            treeItem.selectedChanged.add(() => {
                if (treeItem.selected) {
                    this._treeSelectedItem = item;
                    this.detailViewOf(item);
                    if (item.childrenLoaded) {
                        this.paginator.visible = item.childrenPages > 1;
                        this.listViewChildrenOf(item);
                    }
                    else if (!item.loadsChildrenFolders) {
                        this.loadChildrenOf(item, () => {
                            if (treeItem.selected) {
                                this.paginator.visible = item.childrenPages > 1;
                                this.listViewChildrenOf(item);
                            }
                        });
                    }
                }
            });
            // Children change reaction
            //item.childrenChanged.handlers = [];
            item.childrenChanged.add(() => {
                this.loadChildrenOf(item, () => {
                    this.treeViewChildrenOf(item, treeItem);
                    if (treeItem.selected) {
                        this.listViewChildrenOf(item);
                    }
                    treeItem.reportItemsLoaded();
                });
            });
            item.childrenPagesChanged.add(() => {
                this.paginator.pages = item.childrenPages;
            });
        }
        /**
         * Loads the children of specified item into the listview
         * @param treeItem
         */
        listViewChildrenOf(item) {
            // Column headers
            this.listView.columnHeaders.clear();
            this.listView.columnHeaders.addArray(item.getColumnHeaders());
            this.ignorePageChange = true;
            this.paginator.page = item.childrenPage;
            this.paginator.pages = item.childrenPages;
            this.ignorePageChange = false;
            this.listView.items.clear();
            // Load items into listview
            for (var i = 0; i < item.children.length; i++) {
                var gitem = item.children[i];
                // Create listview item
                var litem = gitem.createListViewItem();
                litem.listView = this.listView;
                litem.tag = gitem;
                // Add handlers to the item
                this.addListViewItemHandlers(litem);
                // Add to the listview
                this.listView.items.add(litem);
            }
            // Load items into the toolbar
            this.listViewToolbar.items.clear();
            this.listViewToolbar.items.addArray(item.getItems());
        }
        /**
         * Loads the children of the specified item, and passes the callback when done
         * This method does not place the children into the list.
         * @param item
         * @param callback
         */
        loadChildrenOf(item, callback) {
            let loaded = false;
            let preventiveAnimationFinished = false;
            let barFinihsed = false;
            let finishBar = () => {
                bar.animate({
                    width: '100%'
                }, 50, null, () => {
                    barFinihsed = true;
                    bar.fadeOut();
                });
            };
            // Clear items off list
            this.listView.items.clear();
            // Show load bar
            let bar = $(this.loadBar);
            let started = latte.DateTime.now;
            bar.addClass('visible');
            bar.show();
            bar.css('width', '1px');
            bar.animate({
                width: '90%'
            }, this.nextLoadTimePrediction, null, () => {
                preventiveAnimationFinished = true;
                if (loaded) {
                    finishBar();
                }
            });
            item.loadChildren(() => {
                // Data has been loaded
                loaded = true;
                // Register the loading time
                this.addLoadingTime(latte.DateTime.now.subtractDate(started));
                // If preventive animation finished
                if (preventiveAnimationFinished) {
                    finishBar();
                }
                callback();
            });
        }
        /**
         * Loads the children of specified item into its node
         * @param item
         */
        treeViewChildrenOf(item, treeItem) {
            treeItem.items.clear();
            // Convert children into nodes
            for (var i = 0; i < item.children.length; i++) {
                var gitem = item.children[i];
                if (gitem.loadsChildren) {
                    var gitemTree = gitem.createTreeItem();
                    this.addTreeItemHandlers(gitemTree);
                    treeItem.items.add(gitemTree);
                }
            }
        }
        /**
         * Assigns handlers to list view items
         * @param listItem
         */
        addListViewItemHandlers(listItem) {
            var item = listItem.tag;
            listItem.selectedChanged.add(() => {
                if (listItem.selected) {
                    this._listSelectedItem = item;
                    this.detailViewOf(item);
                }
            });
        }
        /**
         * Sets the detail view of the specified item, if any
         *
         * @param item
         */
        detailViewOf(item) {
            var view = item ? item.getDetailView() : null;
            //region Get rid of old view
            if (this.detailView.view) {
                var old = this.detailView.view;
                this.detailView.view = null;
                old.element.remove();
            }
            //endregion
            if (view) {
                this.detailView.view = view;
                this.btnSaveDetail.enabled = false;
                view.unsavedChangesChanged.add(() => {
                    //log("Unsaved changes changed")
                    //log("Unsaved changes " + view.unsavedChanges)
                    this.btnSaveDetail.enabled = view.unsavedChanges;
                    if (!view.unsavedChanges) {
                        item.syncUI();
                    }
                });
            }
            if (item) {
                // TODO: Temproarily removed delete button
                this.btnRemoveDetail.visible = false;
            }
            this.detailViewItem = item;
            // this._listSelectedItem = item;
        }
        //endregion
        //region Methods
        /**
         * Adds a root item
         *
         * @param item
         */
        addRootItem(item) {
            item.explorer = this;
            var node = item.createTreeItem();
            this.addTreeItemHandlers(node);
            this.treeView.items.add(node);
            if (this.treeView.items.length == 1) {
                node.selected = true;
            }
        }
        /**
         * Refreshes the children of the list
         */
        refreshList() {
            var treeItem = this.treeView.selectedItem;
            var item = treeItem.tag;
            item.childrenPage = this.paginator.page;
            item.onChildrenChanged();
            //this.listSelectedItem.loadChildren(() => {
            //
            //    this.treeViewChildrenOf(item, treeItem);
            //
            //    if(treeItem.selected) {
            //        this.listViewChildrenOf(item);
            //    }
            //
            //    treeItem.reportItemsLoaded();
            //});
        }
        /**
         * Gets the "save" button
         *
         * @returns {boolean}
         */
        get btnSaveDetail() {
            if (!this._btnSaveDetail) {
                this._btnSaveDetail = new latte.ButtonItem(strings.save, latte.IconItem.standard(4, 2), () => {
                    if (this.detailView.view) {
                        this.detailView.view.saveChanges();
                    }
                });
                this._btnSaveDetail.enabled = false;
            }
            return this._btnSaveDetail;
        }
        /**
         * Gets the refresh button
         *
         * @returns {ButtonItem}
         */
        get btnRefresh() {
            if (!this._btnRefresh) {
                this._btnRefresh = new latte.ButtonItem(null, latte.IconItem.refreshIcon(), () => {
                    this.refreshList();
                });
            }
            return this._btnRefresh;
        }
        /**
         * Gets the remove button
         *
         * @returns {ButtonItem}
         */
        get btnRemoveDetail() {
            if (!this._btnRemoveDetail) {
                this._btnRemoveDetail = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), () => {
                    latte.DialogView.alert(latte.sprintf(strings.confirmDeleteS, this.listSelectedItem.getName()), strings.cantBeUndone, [
                        new latte.ButtonItem(strings.cancel),
                        new latte.ButtonItem(latte.sprintf(strings.yesDeleteS, this.listSelectedItem.getName()), null, () => {
                            // Delete now
                            if (this.listSelectedItem instanceof latte.ExplorerItemDataRecord) {
                                var r = this.listSelectedItem.record;
                                r.remove(() => {
                                    this.detailViewOf(null);
                                    if (this.treeSelectedItem) {
                                        this.treeSelectedItem.onChildrenChanged();
                                    }
                                });
                            }
                        })
                    ]);
                });
            }
            return this._btnRemoveDetail;
        }
        /**
         * Gets the details split view
         *
         * @returns {SplitView}
         */
        get detailSplitView() {
            if (!this._detailSplitView) {
                this._detailSplitView = new latte.SplitView();
                this._detailSplitView.side = latte.Side.RIGHT;
                this._detailSplitView.sideSize = 400;
            }
            return this._detailSplitView;
        }
        /**
         * Gets the detail view toolbar view
         *
         * @returns {ToolbarView}
         */
        get detailViewToolbarView() {
            if (!this._detailViewToolbarView) {
                this._detailViewToolbarView = new latte.ToolbarView();
            }
            return this._detailViewToolbarView;
        }
        /**
         * Gets the toolbar of the detail zone
         *
         * @returns {Toolbar}
         */
        get detailViewToolbar() {
            return this.detailViewToolbarView.toolbar;
        }
        /**
         * Gets the toolbar of the tree view
         *
         * @returns {Toolbar}
         */
        get treeViewToolbar() {
            return this._treeViewToolbar;
        }
        /**
         * Gets the selected item on the list
         *
         * @returns {ExplorerItem}
         */
        get listSelectedItem() {
            return this._listSelectedItem;
        }
        /**
         * Gets the toolbar of the list view
         *
         * @returns {Toolbar}
         */
        get listViewToolbar() {
            return this._listViewToolbar;
        }
        /**
         * Gets the load bar
         *
         * @returns {HTMLDivElement}
         */
        get loadBar() {
            if (!this._loadBar) {
                this._loadBar = document.createElement('div');
                this._loadBar.className = 'load-bar';
            }
            return this._loadBar;
        }
        /**
         * Gets the detail View
         *
         * @returns {View}
         */
        get detailView() {
            if (!this._detailView) {
                this._detailView = new latte.View();
                this._detailView.addClass('explorer-detail-view');
            }
            return this._detailView;
        }
        /**
         * Gets the list view
         *
         * @returns {ListView}
         */
        get listView() {
            if (!this._listView) {
                this._listView = new latte.ListView();
                this._listView.columnHeaders.add(new latte.ColumnHeader(''));
                this._listView.focusable = true;
                this._listView.focused.add(() => {
                    if (this._listSelectedItem && this._listSelectedItem != this.detailViewItem) {
                        this.detailViewOf(this._listSelectedItem);
                    }
                });
            }
            return this._listView;
        }
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        get paginator() {
            if (!this._paginator) {
                this._paginator = new latte.PaginationItem();
                this._paginator.pageChanged.add(() => {
                    if (!this.ignorePageChange) {
                        this.refreshList();
                    }
                });
            }
            return this._paginator;
        }
        /**
         * Gets the selected item on the tree side
         *
         * @returns {ExplorerItem}
         */
        get treeSelectedItem() {
            return this._treeSelectedItem;
        }
        /**
         * Gets the tree view
         *
         * @returns {TreeView}
         */
        get treeView() {
            if (!this._treeView) {
                this._treeView = new latte.TreeView();
                this._treeView.focusable = true;
                this._treeView.focused.add(() => {
                    if (this._treeSelectedItem && this._treeSelectedItem != this.detailViewItem) {
                        this.detailViewOf(this._treeSelectedItem);
                    }
                });
            }
            return this._treeView;
        }
    }
    latte.ExplorerView = ExplorerView;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/jquery.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.ui.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/support/ts-include/latte.ui.strings.d.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/IDataRecordCustomView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/IDataRecordCustomForm.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/GridView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/explorer/ExplorerItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordChildrenView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordChildrenWidget.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordFormItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordDialogView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordValueItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordFormView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordGridView.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/DataRecordWidget.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/GridViewColumn.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/GridViewRow.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/explorer/ExplorerItemDataRecord.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/explorer/ExplorerTreeItem.ts" />
/// <reference path="/Users/josemanuel/Desktop/Fragment/Fragment-master/latte/latte.data.ui/ts/explorer/ExplorerView.ts" /> 
