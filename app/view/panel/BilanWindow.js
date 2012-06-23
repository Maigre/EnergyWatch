var fcfa_tpl = new Ext.XTemplate(
	'<tpl >',
		'{montant} FCFA',
	'</tpl>'
);


Ext.define('MainApp.view.panel.BilanWindow', {
	extend	: 'Ext.panel.Panel',
	alias 	: 'widget.bilanwindow',
	id 	: 'bilanwindow',
	//width 	: 700,
	//height 	: 500,
	border:0,
	opacity:0,
	bodyStyle: "background-image:url(app/images/"+BCKGRND_IMAGE+".jpg); background-repeat:no-repeat; background-position:center center;-moz-background-size: cover; -webkit-background-size: cover;-o-background-size: cover;background-size: cover;",
	//bodyPadding: 1,
	//margin: 50,
	//url:'',
	//frame : true,
	//fileUpload: true,
	method: 'post',
	//headers: {'Content-type':'multipart/form-data'},
	//enctype:'multipart/form-data',
	//title : 'Bilan - S&eacute;lection des mois',
	layout:{
		type	: 'hbox',
		align	: 'middle'
	},
	//margins : '10 5 3 10',
	items : [{
		margins : 50,
		frame	: true,
		title	: "S&eacute;lection des mois",
		flex	: 1,
		xtype	: 'grid',
		id	: 'gridmenumensuel',
		multiSelect : true,
		height 	: 438,
		store	: 'MenuMensuelStore',
		hideHeaders: true,
		columns : [
			{header: 'P&eacute;riode', hideHeaders: true, dataIndex: 'periode', flex:1}
		]
	},{
		margins : '50 25 50 25',
		scale	: 'small',
		xtype	: 'button',
		iconCls : 'calculatrice',
		text	: 'Calculer',
		id 	: 'buttonbilanok',
		handler	: function() {
    			selectedperiode = Ext.getCmp('gridmenumensuel').getSelectionModel().getSelection();
    			console.info(selectedperiode);
    			var periode_list = '';
    			Ext.each(selectedperiode, function(periode){
    				if(periode_list==''){
    					periode_list = periode_list + periode.internalId;
    				}
    				else{
    					periode_list = periode_list + '_' + periode.internalId;
    				}
    			});
    			console.info('periode_list '+periode_list);
    			bilanperiodestore = Ext.getStore('BilanPeriodeStore');
    			bilanperiodestore.proxy.api.read = BASE_URL+'data/bilan/bilan_periode/'+periode_list+'/'+BT_MT_EAU;
    			bilanperiodestore.load();
    		}
    	},{
		margins : 50,
		frame	: true,
		title	: 'Bilan',
		flex	: 3,
		xtype   : 'grid',
		id	: 'gridbilan',
		multiSelect : true,
		height 	: 438,
		store	: 'BilanPeriodeStore',
		columns : [
			{header: 'Intitule', dataIndex: 'intitule', flex:1},
			{header: 'Montant', dataIndex: 'montant', xtype: 'templatecolumn', tpl: fcfa_tpl, flex:1},
		],
		dockedItems : [{
			xtype: 'toolbar',
			items: [{
				xtype: 'exporterbutton',
				//store: 'FactureMTStore',
				swfPath: 'app/ext4/Exporter/downloadify.swf',
				downloadImage: 'app/ext4/Exporter/download.png',
				width: 62, // mantain the width and height
				height: 22,
				downloadName: "download", // this is the name of the file
				formatter: "csv" // Or "csv"
			}]
		}]
	}],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}, 
	
});
