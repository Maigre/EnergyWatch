Ext.define('MainApp.view.tools.GridPlView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridpl',
	title: 'Points de Livraison',
	store: 'PlAllStore',
	height: 570,
	//forceFit: true,
	verticalScrollerType: 'paginggridscroller',
    loadMask: true,
    disableSelection: true,
    invalidateScrollerOnRefresh: false,
    viewConfig: {
        trackOver: false
    },
	//width: 1020,
	frame: true,
		
	initComponent: function() {
		
		flagtpl= new Ext.XTemplate(
			'<tpl if="alerte_max == 3;">',
			'<img src="app/images/icons/cross.png">',
			'</tpl>',
			'<tpl if="alerte_max == 2;">',
			'<img src="app/images/icons/help.png">',
			'</tpl>',
			'<tpl if="alerte_max == 1;">',
			'<img src="app/images/icons/accept.png">',
			'</tpl>'
		);
		conso_moy_tpl= new Ext.XTemplate(
			'{conso_moy} kWh/mois'
		);
		
		this.columns = [
			{header: 'Nom pr&eacute;nom', dataIndex: 'Nom_prenom', flex:25},
			{header: 'Tension', dataIndex: 'Tension', flex:7},
			{header: 'Conso moy.', dataIndex: 'conso_moy', xtype: 'templatecolumn', tpl: conso_moy_tpl, flex:11},
			{header: 'N&deg; client', dataIndex: 'No_client', flex:8}, 
			{header: 'N&deg; pers.', dataIndex: 'No_personne', flex:7}, 
			{header: 'Nature', dataIndex: 'Nature', flex: 6}, 
			{header: 'Cat. client', dataIndex: 'Categorie_client', flex:8}, 
			{header: 'N&deg; compteur', dataIndex: 'No_compteur', flex:10}, 
			{header: 'N&deg; police', dataIndex: 'No_police', flex:8},
			{header: 'Point de livraison', dataIndex: 'Point_de_livraison', flex:15},
			{header: 'Adresse', dataIndex: 'Adresse', flex:8},
			{header: 'Localisation', dataIndex: 'Localisation', flex:13},
			{header: 'Code Acti.', dataIndex: 'Code_Activite', align:'center',flex:8},
			{header: 'Alerte', dataIndex: 'alerte_max', xtype: 'templatecolumn', tpl: flagtpl, align:'center', flex:6},
		];
		this.callParent(arguments);
	}
});
