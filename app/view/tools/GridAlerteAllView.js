Ext.define('MainApp.view.tools.GridAlerteAllView', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.gridalerteall',
	title: 'Alertes',
	store: 'AlerteStore',
	//height: 200,
	//forceFit: true,
	//width: 1100,
	frame: true,
	margin: 5,
	/*dockedItems:[{
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->', {
                    icon: 'app/images/icons/disk.png',
                    //text: '',
                    scope: this,
                    handler: this.onSync
        }]
    }],*/
		
	initComponent: function() {
		flagtpl= new Ext.XTemplate(
			'<tpl if="Etat == 3;">',
			'<img src="app/images/icons/cross.png">',
			'</tpl>',
			'<tpl if="Etat == 2;">',
			'<img src="app/images/icons/exclamation_octagon_fram.png">',
			'</tpl>',
			'<tpl if="Etat == 1;">',
			'<img src="app/images/icons/accept.png">',
			'</tpl>'
		);
		
		change_etat= new Ext.XTemplate(
			'<input type="button" name="addButton" value="Modifier" style="width:90px"/></div>'
		);
		
		flagcomboboxstore = new Ext.data.Store({
			fields: [{name: 'Etat'},{name: 'nom_etat'}],
			data : [
				{"Etat":"3", "nom_etat":"Alerte"},
				{"Etat":"2", "nom_etat":"En cours"},
				{"Etat":"1", "nom_etat":"Resolu"}
			]
		});
		
		Ext.define('MainApp.view.tools.flagcombobox', {
			extend: 'Ext.form.ComboBox',
			alias: 'widget.flagcombobox',
			//fieldLabel: 'nometat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'nom_etat',
			valueField: 'Etat'
			//,tpl: flagtpl
		});
		/*flagcombobox= new Ext.form.ComboBox({
			alias: 'widget.flagcombobox',
			fieldLabel: 'Etat',
			store: flagcomboboxstore,          //[['1'],['2'],['3']],
			queryMode: 'local',
			displayField: 'Etat',
			valueField: 'Etat'
		});*/
		
		this.columns = [
			{header: 'Date', dataIndex: 'Date', xtype:'datecolumn', format:'d-m-Y', width:80}, 
			{header: 'Etat', dataIndex: 'Etat', xtype: 'templatecolumn', tpl: flagtpl , align:'center', width:40,
				editor: {
		            xtype: 'flagcombobox',
		            //triggerAction: 'all',
		            selectOnTab: true//,
		            //lazyRender: true,
		            //listClass: 'x-combo-list-small'
            	}
            }, 
            {header: 'Alerte', dataIndex: 'Alerte', flex:1},
			{header: 'Commentaire', dataIndex: 'Commentaire', flex:1,
				editor: {
		            xtype: 'textfield',
		            allowBlank: false,
		            //triggerAction: 'all',
		            selectOnTab: true//,
		            //lazyRender: true,
		            //listClass: 'x-combo-list-small'
            	}
			}
		];
		this.plugins = [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit: 1
		    })
		],
		this.callParent(arguments);
	},
	
	/*onSync: function(){
        this.store.sync();
    },*/
});
