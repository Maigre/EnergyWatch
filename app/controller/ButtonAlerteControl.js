Ext.define('MainApp.controller.ButtonAlerteControl', {
	extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonAlerteView'],

	init: function() {
		this.control({
			'buttonalerte': {
				click: this.openalerte
			}
		});
	},
	
	openalerte: function() {
		var alerteallstore = this.getStore('AlerteAllStore');
		
		alerteallstore.proxy.url= BASE_URL+'data/alertecontrol/loadall/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE; 
		
		//alerteallstore.sort('Valeur', 'ASC');
		alerteallstore.group('Type', 'ASC');
		
		/*alerteallstore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
		}});*/
		
		alerteallstore.on('groupchange', function(){
			alerteallstore.sort('Type', 'ASC');
		})
		
		var alerteallpanel = Ext.getCmp('alerteallpanel');
		if (!alerteallpanel){
			var alerteallpanel = Ext.widget('alerteallpanel');
		}
		//Ext.getCmp('bilanmainpanelup').removeAll(false);
		//Ext.getCmp('bilanmainpaneldown').removeAll(false);
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		
		Ext.getCmp('centerregion').add(alerteallpanel);
	}   
});
