Ext.define('MainApp.view.panel.ValidationPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.validationpanel',
	id    : 'validationpanel',
  	requires:['MainApp.view.tools.GridPlView'],
	bodyPadding: 5,
	layout: {
        type: 'table',
        columns: 2,
        //align: 'stretch',
        //padding: 5
    },
    //defaults     : { flex : 1 },
	
	initComponent: function() {
		var me = this;
		/*var myData = [
		    { name : "Rec 0", column1 : "0", column2 : "0" },
		    { name : "Rec 1", column1 : "1", column2 : "1" },
		    { name : "Rec 2", column1 : "2", column2 : "2" },
		    { name : "Rec 3", column1 : "3", column2 : "3" },
		    { name : "Rec 4", column1 : "4", column2 : "4" },
		    { name : "Rec 5", column1 : "5", column2 : "5" },
		    { name : "Rec 6", column1 : "6", column2 : "6" },
		    { name : "Rec 7", column1 : "7", column2 : "7" },
		    { name : "Rec 8", column1 : "8", column2 : "8" },
		    { name : "Rec 9", column1 : "9", column2 : "9" }
		];
		
		var myData2 = [
		    { name : "Rec 10", column1 : "10", column2 : "10" },
		    { name : "Rec 11", column1 : "11", column2 : "11" },
		    { name : "Rec 12", column1 : "12", column2 : "12" }
		];*/


		
		

		// Column Model shortcut array
		var columns = [
		    {text: "Point de Livraison", flex: 1, sortable: true, dataIndex: 'Nom_prenom',
		    	renderer: function(value, metaData, record, rowIndex) {
					if (value == ''){
						metaData.tdCls = 'emptyText';
					} 
					return value;
					
				}
			},
		    {text: "Num&eacute;ro P.L", width: 70, sortable: true, dataIndex: 'Point_de_livraison'},
		    {text: "Num&eacute;ro Facture", width: 70, sortable: true, dataIndex: 'No_de_facture'},
		    {text: "Montant net", width: 70, sortable: true, dataIndex: 'Montant_net'}
		];

		// declare the source Grid
		var NouveauPlGrid = Ext.create('Ext.grid.Panel', {
			height: 300,
			width:500,
			padding: 5,
			iconCls: 'arrow_divide',
		    alias: 'widget.nouveauPlGrid',
		    multiSelect: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'firstGridDDGroup',
		            dropGroup: 'secondGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                var idfacture=data.records[0].get('id');
		                Ext.Ajax.request({
							url: BASE_URL+'data/triplcontrol/save/nouveau',
							method : 'POST',
							params : {
								idfacture: idfacture
							}/*,
							success: function(response){
									Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
							}*/
						});
		            }		            
		        }
		    },
		    store            : 'TriPlNouveauStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'Nouveaux P.L d&eacute;tect&eacute;s - A Valider ou Rejeter',
		    margins          : '0 2 0 0'
		});

		

		// create the destination Grid
		var PlNonValideAgainGrid = Ext.create('Ext.grid.Panel', {
			height: 300,
			width:500,
			padding: 5,
			alias: 'widget.plNonValideAgainGrid',
			//cls: 'my-grid',
			iconCls: 'yes',
			multiSelect: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'firstGridDDGroup',
		            dropGroup: 'secondGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                var idfacture=data.records[0].get('id');
		                Ext.Ajax.request({
							url: BASE_URL+'data/triplcontrol/save/nonvalideagain',
							method : 'POST',
							params : {
								idfacture: idfacture
							}/*,
							success: function(response){
									Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
							}*/
						});
		            }		            
		        }
		    },
		    store            : 'TriPlNonValideAgainStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L rejet&eacute;s &agrave; nouveau factur&eacute;s - A Valider ou Rejeter',
		    margins          : '0 0 0 3'
		});
		

		// create the destination Grid
		var PlValideGrid = Ext.create('Ext.grid.Panel', {
			height: 300,
			width:500,
			padding: 5,
			alias: 'widget.plValideGrid',
			iconCls: 'arrow_divide',
			multiSelect: true,
		    viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'secondGridDDGroup',
		            dropGroup: 'firstGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                var idfacture=data.records[0].get('id');
		                Ext.Ajax.request({
							url: BASE_URL+'data/triplcontrol/save/valide',
							method : 'POST',
							params : {
								idfacture: idfacture
							}/*,
							success: function(response){
									Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
							}*/
						});
		            }		            
		        },
		        deferEmptyText : false,
				emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures valides ici.<br>&nbsp&nbspLaisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
		    },
		    store            : 'TriPlValideStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L valid&eacute;s',
		    margins          : '0 0 0 3'
		});

		// create the destination Grid
		var PlNonValideGrid = Ext.create('Ext.grid.Panel', {
			height: 300,
			width:500,
			padding: 5,
			alias: 'widget.plNonValideGrid',
			iconCls: 'no',
			multiSelect: true,
			//cls: 'my-grid',
			viewConfig: {
		        plugins: {
		            ptype: 'gridviewdragdrop',
		            dragGroup: 'secondGridDDGroup',
		            dropGroup: 'firstGridDDGroup'
		        },
		        listeners: {
		            drop: function(node, data, dropRec, dropPosition) {
		                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
		                var idfacture=data.records[0].get('id');
		                Ext.Ajax.request({
							url: BASE_URL+'data/triplcontrol/save/nonvalide',
							method : 'POST',
							params : {
								idfacture: idfacture
							}/*,
							success: function(response){
									Ext.get('working-area').insertHtml('beforeBegin',response.responseText,true);
							}*/
						});
		            }		            
		        },
		        deferEmptyText : false,
		        emptyText: '<br><br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Glisser-D&eacute;poser les factures non-valides ici.<br>&nbsp;&nbsp;Laisser la touche Ctrl enfonc&eacute;e pour d&eacute;placer plusieurs lignes.'				
		    },
		    store            : 'TriPlNonValideStore',
		    columns          : columns,
		    stripeRows       : true,
		    title            : 'P.L rejet&eacute;s',
		    margins          : '0 0 0 3'
		});

		
		me.items = [
				NouveauPlGrid,
				PlValideGrid,
				PlNonValideAgainGrid,
				PlNonValideGrid
		];
		
		me.callParent(arguments);
  	}
});
