Ext.define('MainApp.view.panel.HistoriqueUploadPanel', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.historiqueupload',
	frame: true,
	title: 'Historique',
	store: 'HistoriqueUploadStore',
	width: 310,
	//height: 100,
	x:0,
	initComponent: function() {
		this.columns = [
		    {header: 'Nom du Fichier',  dataIndex: 'nom_fichier', flex:2},
		    {header: 'Date d\'importation', dataIndex: 'date_creation', xtype:'datecolumn', format:'d-m-Y', flex:1}
		];
		var me = this;
		me.callParent(arguments);
	}
});


