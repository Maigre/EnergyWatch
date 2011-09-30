Ext.define('MainApp.view.panel.UploadPanel', {
	extend: 'Ext.form.Panel',
	alias : 'widget.uploadpanel',
	width : 400,
	bodyPadding: 10,
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
					name: 'mois',
					store: 'MonthStore',
					displayField: 'mois',
					valueField: 'mois'
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
			var nomperiodefacture= Ext.getCmp('comboboxmoisfacture').value+'_'+Ext.getCmp('comboboxanneefacture').value;
			
			var form = this.up('form').getForm();
			form.url=BASE_URL+'data/uploadxls/do_upload/'+table+'/'+nomperiodefacture;
            
            if(form.isValid()){
                form.submit({
                    url: form.url,
                    actionMethods : {read: 'POST'},
                    //method : 'POST', 
                    waitMsg: 'Importation en cours...',
                    success: function(fp, o) {
                        form.owner.ownerCt.items.items[1].store.load();
                        form.owner.ownerCt.items.items[1].doLayout();
                        Ext.Msg.alert('Success', 'Le fichier "' + o.result.file + '" a &eacute;t&eacute; import&eacute; avec succ&egrave;s. '+ o.result.queries+' requ&ecirc;tes ont &eacute;t&eacute; effectu&eacute;es.');
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
	}
});
