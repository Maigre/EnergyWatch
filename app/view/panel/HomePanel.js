///SEARCHBAR PANEL///
///fichiers à joindre: 
//->app/view/UploadPanel.js & HistoriqueUploadPanel.js
//->app/model/


Ext.define('MainApp.view.panel.HomePanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.UploadPanel'
    ],
    layout:{
		type:'hbox',
		align: 'middle',
		//pack: 'center'
	},
	bodyStyle: "background-image:url(app/images/2.jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
    //width: 300,
    //split: true,
    opacity:0,
    //height: 300,
    border:0,
	alias : 'widget.homepanel',
	id    : 'homepanel',
	
	
	initComponent: function() {
		var me = this;
		var HomeButtons = Ext.create('Ext.panel.Panel', {
			id : 'homebuttons',
			flex:1,
			bodyStyle: "background-color: transparent;",
			border: 0,
			layout:{
				type:'hbox',
				//align: 'middle',
				pack: 'center'
			},
			defaults : {
				margins : 70
			},
			items: [{
				flex:1,
				xtype: 'buttonupload',
				//margins : 20
			},{
				flex:1,
				xtype: 'buttonwater',
				margins: '70 30 70 100'
			},{
				flex:1,
				xtype: 'buttonbt'
			},{
				flex:1,
				xtype: 'buttonmt'
			}]			
		});
		me.items=[HomeButtons];
		
		me.callParent(arguments);
		console.info(me.items);
	}
});
