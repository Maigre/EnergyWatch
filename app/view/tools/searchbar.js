Ext.define('EnergyWatch.view.tools.Searchbar', {
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.searchbar',
	border: 0,
	width: 185,
	//store: 'MyJsonStore',

	initComponent: function() {
	var me = this;
	me.callParent(arguments);
  }
});
