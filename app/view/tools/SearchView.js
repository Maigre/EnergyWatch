Ext.define('MainApp.view.tools.SearchView', {
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.searchbar',
	store: 'SearchStore',
	displayField: 'todisplay',
	valueField: 'id',
	enableKeyEvents: true,
	//loadingText: 'Recherche...',
	//typeAhead: true,
	minChars: 1,
    //renderTo: Ext.getBody(),
    border: 0,
	width: 100,
	height: 30,
	queryParam: 'text_search',
	typeAheadDelay : 250,
	hideTrigger: true,
	
	initComponent: function() {
		/*var changingImage = Ext.create('Ext.Img', {
			src: 'app/images/airgestion-tr.png',
			renderTo: Ext.getBody()
		});*/
		var me = this;
		me.callParent(arguments);
	}
});


