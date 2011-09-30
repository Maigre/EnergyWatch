Ext.define('MainApp.controller.ButtonValidationControl', {
    extend: 'Ext.app.Controller',
	views: ['MainApp.view.tools.ButtonValidationView'],

    init: function() {
        this.control({
            'buttonvalidation': {
                click: this.openvalidation
            }
        });
    },
    openvalidation: function() {
		var nonvalideagainstore = this.getStore('TriPlNonValideAgainStore');
		var nonvalidestore = this.getStore('TriPlNonValideStore');
		var nouveaustore = this.getStore('TriPlNouveauStore');
		var validestore = this.getStore('TriPlValideStore');
		nonvalideagainstore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
			}}
		);
		nonvalidestore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
			}}
		);
		nouveaustore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
			}}
		);
		validestore.load({
			params: {
				BT_MT_EAU: BT_MT_EAU,
				PERIODE_MENSUELLE: PERIODE_MENSUELLE
			}}
		);
		
		var view1 = Ext.getCmp('validationpanel');
		if (!view1){
			var view1 = Ext.widget('validationpanel');
		}
		Ext.getCmp('centerregion').removeAll(false); //clean the center region
		Ext.getCmp('centerregion').add(view1);
	}   
});
