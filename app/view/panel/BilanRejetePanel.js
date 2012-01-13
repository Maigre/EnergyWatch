Ext.define('MainApp.view.panel.BilanRejetePanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.bilanrejetepanel',
	id           	 : 'bilanrejetepanel',
	frame 		 : true,
	iconCls		 : 'no',
	height		 : 100,
	width 		 : 150,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/bilan/save',
	frame 		 : true,
	title 		 : 'REJETE',
	bodyPadding  	 : 10,
	//margin       : 50,
	
	//bodyStyle:'margin:5px auto 0 auto',
	/*layout	:{
		type :'vbox',
		align : 'center'//,
	    	//pack  : 'center'
	},*/
	method       : 'post',
	trackResetOnLoad : 'true',
	fieldDefaults: {
		msgTarget : 'side',
		//labelWidth: 200,
		allowBlank:false
	},
	defaultType  : 'displayfield',
	defaults     : {
		anchor: '100%'
	},
	items 		 : [{
		fieldLabel: 'Pl Rejetes',
		hideLabel : true,
		name      : 'NbPlRejete',
		//flex:1
		//,value     : ''
	}],
	initComponent: function() {
		this.callParent(arguments);
	}
});

