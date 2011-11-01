Ext.define('MainApp.view.panel.BilanMainPanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.BilanValidePanel',
        'MainApp.view.panel.BilanRejetePanel',
        'MainApp.view.panel.BilanAttentePanel',
        'MainApp.view.panel.BilanAlertePanel'
    ],
    layout:{
		type:'vbox',
		//flex: 0.5,
		align:'stretch'
		//pack: 'center'
	},
    //width: 300,
    //padding: 5,
    opacity:0,
    bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
    //height: 300,
    border:0,
	alias : 'widget.bilanmainpanel',
	id    : 'bilanmainpanel',
	items :  [{
		id		: 'bilanmainpanelup',
		opacity:0,
		flex:1,
		xtype	: 'container',
		layout	:{
			type:'hbox',
			align:'middle',
			pack: 'center'
		},
		items:[{
			xtype: 'bilanvalidepanel'
		},{
			xtype: 'bilanrejetepanel'
		}]
	},{
		id		: 'bilanmainpaneldown',
		flex:1,
		xtype	: 'container',
		layout	:{
			type:'hbox',
			align:'middle',
			pack: 'center'
		},
		items:[{
			xtype: 'bilanattentepanel'
		},{
			xtype: 'bilanalertepanel'
		}]
	}],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});
