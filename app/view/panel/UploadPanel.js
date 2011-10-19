Ext.define('MainApp.view.panel.UploadPanel', {
	extend: 'Ext.form.Panel',
	alias : 'widget.uploadpanel',
	width : 400,
	bodyPadding: 1,
	margin: 50,
	url:'',
    frame : true,
    fileUpload: true,
    method: 'post',
    headers: {'Content-type':'multipart/form-data'},
    enctype:'multipart/form-data',
	title : 'Importation d\'une nouvelle facture ',

	items : [{
        xtype      : 'fieldcontainer',
        fieldLabel : '',
        defaultType: 'radiofield',
        defaults   : {
            flex: 1
        },
        layout     : 'hbox',
        items      : [
            {
                boxLabel  : 'Basse Tension',
                hideLabel : true,
                name      : 'tension',
                inputValue: 'bt',
                id        : 'radiobassetensionupload'
            },{
                boxLabel  : 'Moyenne Tension',
                hideLabel : true,
                name      : 'tension',
                inputValue: 'mt',
                id        : 'radiomoyennetensionupload'
            }
        ]},
        {
	        xtype: 'container',
	        anchor: '100%',
	        layout: 'column',
			items:[{
			    xtype: 'container',
			    columnWidth:0.8,
			    layout: 'anchor',		
				items : 
				[{
					xtype: 'combobox',
					id :'comboboxmoisfacture',
					fieldLabel: 'P&eacute;riode',
					//name: 'id',
					store: 'MonthStore',
					displayField: 'mois',
					valueField: 'value'
				}]
			},{
				xtype: 'container',
				columnWidth:0.2,
				layout: 'anchor',		
				items : 
				[{
					xtype: 'combobox',
					id :'comboboxanneefacture',
					fieldLabel: '',
					hideLabel: true,
					name: 'mois',
					store: 'YearStore',
					displayField: 'annee',
					valueField: 'annee',
					width: 70
				}]
			}]
		},{
			xtype     : 'filefield',
			name      : 'file',
			fieldLabel: '',
			hideLabel : true,
			labelWidth: 50,
			msgTarget : 'side',
			allowBlank: false,
			anchor    : '100%',
			buttonText: 'Recherche fichier...'
		}
	],
    listeners:{
		'click': function(){
			//Ext.getCmp('viewport').items.items[0].removeAll();
		}
	},
    buttons: [{
        text: 'Importer',
        handler: function() {
            
            if (Ext.getCmp('radiobassetensionupload').value){
				var table='conso_bts';
			}
			else{
				var table='conso_mts';
			}
			console.info(Ext.getCmp('comboboxmoisfacture'));
			var nomperiodefacture= Ext.getCmp('comboboxanneefacture').value+'-'+Ext.getCmp('comboboxmoisfacture').value;
			
			var form = this.up('form').getForm();
			form.url=BASE_URL+'data/uploadxls/do_upload/'+table+'/'+nomperiodefacture;
            
            if(form.isValid()){
                form.submit({
                    url: form.url,
                    actionMethods : {read: 'POST'},
                    //method : 'POST', 
                    waitMsg: 'Importation en cours...',
                    success: function(fp, o) {
                    	if(o.result.info=='parseok'){
	                		
	                		Ext.Msg.alert('Success', 'Le fichier '+o.result.file+' a &eacute;t&eacute; t&eacute;l&eacute;charg&eacute; avec succ&egrave;s. Traitement des factures en cours...');					
							
							var progressbar = Ext.getCmp('progressbar');
							if (!progressbar){
								var progressbar = Ext.create('Ext.ProgressBar', {
								   //renderTo: Ext.getBody(),
								   id: 'progressbar',
								   width: 800
								});
							}
							progressbar.updateProgress(0);
							Ext.getCmp('southregion').removeAll();
							Ext.getCmp('southregion').height = 100;
							Ext.getCmp('southregion').add(progressbar);
							
	                		function request_until_end(){
								Ext.Ajax.request({
									url: BASE_URL+'data/uploadxls/xls_to_db',//'+table+'/'+nomperiodefacture,
									method : 'POST',
									params : {
										BT_MT_EAU: BT_MT_EAU
									},
									success: function(response){
										var obj = Ext.decode(response.responseText);
										
										if(obj.info=='continue'){
											progressbar.updateProgress(obj.progress);
											progress=obj.progress*100;
											progressbar.updateText('Traitement des factures en cours: '+progress+'% effectu&eacute;s');
											request_until_end();
										}
										else{
											progressbar.updateProgress(obj.progress);
											progress=obj.progress*100;
											progressbar.updateText('Traitement des factures termin&eacute');
											form.owner.ownerCt.items.items[1].store.load();
											form.owner.ownerCt.items.items[1].doLayout();
											Ext.getCmp('southregion').removeAll();
											Ext.getCmp('southregion').height = 30;
											Ext.Msg.alert('Success', 'Le fichier a &eacute;t&eacute; import&eacute; avec succ&egrave;s. '+ obj.lignes+' requ&ecirc;tes ont &eacute;t&eacute; effectu&eacute;es.');																
										}
									}
								});
							}
	                		request_until_end();
                		}
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Success', 'Echec d\'importation du fichier.'+o.result.error);
                    }
                });
            }
        }
    }],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}, 
	
});
