Ext.define('MainApp.view.panel.HomePanel', {
	extend: 'Ext.panel.Panel',
	requires: [
        'MainApp.view.panel.UploadPanel',
        'MainApp.view.panel.HomeButtonPanel'
        ],
        layout:{
		type:'hbox',
		align: 'middle'
	},
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
        //width: 300,
        //split: true,
        opacity:0,
        //height: 300,
        border:0,
	alias : 'widget.homepanel',
	id    : 'homepanel',
	items : [{
		xtype: 'homebuttons'
	}],
	
	
	initComponent: function() {
		var me = this;
		//var HomeButtons=Ext.widget('homebuttons');
		//me.add(HomeButtons);
		
		
		homepanelcontextMenu = new Ext.menu.Menu({
			  width: 160,
			  items: [{
					text: 'Changer le fond d\'&eacutecran',
					iconCls: 'edit',
					width : 160,
					
					handler: function(){
						BCKGRND_IMAGE=BCKGRND_IMAGE+1;
						//Changer ici pour proposer plus de fonds d'écran
						if (BCKGRND_IMAGE>11){
							BCKGRND_IMAGE=2;
						}
						
						
						//Reload the home panel
						Ext.getCmp('buttonuploadheader').hide();
						Ext.getCmp('buttonwaterheader').hide();
						Ext.getCmp('buttonbtheader').hide();
						Ext.getCmp('buttonmtheader').hide();
		
						var homepanel= Ext.widget('homepanel');
						homepanel.bodyStyle="background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;";
						homepanel.removeAll(false);
		
						homebuttons=Ext.getCmp('homebuttons');
						homepanel.add(homebuttons);
		
						Ext.getCmp('centerregion').removeAll(); //clean the center region
						Ext.getCmp('westregion').removeAll();
						westregion_desappear();
						Ext.getCmp('centerregion').add(homepanel);
		
						homepanel.animate({
						   	duration: 1000,
						   	easing: 'backIn',
							from: {
								opacity: 0
							},
							to: {
								opacity: 1
							}
						});
					}
			  }]
		});
		this.on('render',function() {
			Ext.getCmp('homepanel').getEl().on('contextmenu', function(e) {
				 e.preventDefault();
				 homepanelcontextMenu.showAt(e.getXY());
			});
		});
		
		me.callParent(arguments);
	}
});
