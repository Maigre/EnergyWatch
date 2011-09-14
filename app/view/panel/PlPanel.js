Ext.define('MainApp.view.panel.PlPanel', {
	extend		 : 'Ext.form.Panel',
	alias 		 : 'widget.plpanel',
	frame 		 : true,
	//height		 : 680,
	//width 		 : 240,
	x     		 : 0,
	y     		 : 0,
	url   		 : BASE_URL+'data/plcontrol/save',
	frame 		 : true,
	title 		 : 'Point de Livraison',
	bodyStyle:'padding:5px 5px 0',
	method       : 'post',
	trackResetOnLoad : 'true',
	fieldDefaults: {
		msgTarget: 'side',
		labelWidth: 75,
		allowBlank:false
	},
	defaultType  : 'textfield',
	defaults     : {
		anchor: '100%'
	},
	items 		 : [{
		fieldLabel: 'Nom Prenom',
		name      : 'Nom_prenom',
		value     : 'SANTE PUBLIQUE'
		},{
		fieldLabel: 'Tension',
		name      : 'Tension',
		value     : 'BT'
		},{
		fieldLabel: 'N&deg; client', 
		name      : 'No_client',
		value     : '101211'
		},{
		fieldLabel: 'N&deg; personne', 
		name      : 'No_personne',
		value     : '101211'
		},{
		fieldLabel: 'Nature', 
		name      : 'Nature',
		value     : 'C'
		},{
		fieldLabel: 'Cat&eacute;gorie client', 
		name      : 'Categorie_client',
		value     : 'YY'
		},{
		fieldLabel: 'N&deg; compteur', 
		name      : 'No_compteur',
		value     : '26343138'
		},{
		fieldLabel: 'N&deg; police', 
		name      : 'No_police',
		value     : '310295652'
		},{
		fieldLabel: 'Point de livraison', 
		name      : 'Point_de_livraison',
		value     : '3100851204A0251'
		},{
		fieldLabel: 'Adresse', 
		name      : 'Adresse',
		value     : '911-111'
		},{
		fieldLabel: 'Localisation', 
		name      : 'Localisation',
		value     : '172\/DGCF\/28\/5\/08 PMI-BEAU SEJR'
		},{
		fieldLabel: 'Code Activit&eacute;', 
		name      : 'Code_Activite',
		value     : 'O'
		},{
		fieldLabel: 'Date abonnement',
		name      : 'Date_abonnement',
		xtype     : 'datefield',
		value     : '2008-11-19'
		},{
        xtype     : 'htmleditor',
        enableFont: false,
        enableAlignements: false,
        enableLinks: false,
        enableSourceEdit: false,
        name      : 'Commentaire',
        fieldLabel: '',
        labelWidth: 0,
        height    : 140,
        anchor    : '100%',
        value     : 'Audit le 15 Octobre'
        }
	],
	buttons		 : [{
		text: 'Save'
		},{
		text: 'Cancel'
	}],
	initComponent: function() {
		this.callParent(arguments);
	}
});

