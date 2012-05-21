Ext.define('MainApp.controller.ButtonAnomalieControl', {
    	extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonAnomalieView'],
	
	init: function() {
		this.control({
			'buttonanomalie': {
				click: this.openanomalie
			}
		});
	},
	
	openanomalie: function() {
		var anomalieallstore = this.getStore('AnomalieAllStore');
		
		anomalieallstore.proxy.url= BASE_URL+'data/anomaliecontrol/loadall/'+BT_MT_EAU+'/'+PERIODE_MENSUELLE; 
		
		//alerteallstore.sort('Valeur', 'ASC');
		anomalieallstore.group('Type', 'ASC');
		
		/*alerteallstore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
		}});*/
		
		anomalieallstore.on('groupchange', function(){
			anomalieallstore.sort('Type', 'ASC');
		})
		
		var anomalieallpanel = Ext.getCmp('anomalieallpanel');
		if (!anomalieallpanel){
			var anomalieallpanel = Ext.widget('anomalieallpanel');
		}
		//Ext.getCmp('bilanmainpanelup').removeAll(false);
		//Ext.getCmp('bilanmainpaneldown').removeAll(false);
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		
		Ext.getCmp('centerregion').add(anomalieallpanel);
	}   
});
