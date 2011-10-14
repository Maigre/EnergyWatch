Ext.define('MainApp.controller.ViewportControl', {
    extend: 'Ext.app.Controller',
	//views: ['MainApp.view.Viewport'],

    init: function() {
        this.control({
            'viewport': {
                render: this.getrunningupload
            }
        });
    },
    getrunningupload: function() {
		Ext.Ajax.request({
			url: BASE_URL+'data/uploadxls/is_upload_running',
			method : 'POST',
			success: function(response){
				var obj = Ext.decode(response.responseText);
				if(obj.success==true){
					Ext.MessageBox.confirm(
						'Infos Importation', 
						'L\'importation d\'un fichier de factures a &eacute;t&eacute; interrompue. Souhaitez-vous la poursuivre?',
						function(btn) {
							console.info(btn);
							if(btn == 'yes'){
								var progressbar = Ext.getCmp('progressbar');
								if (!progressbar){
									var progressbar = Ext.create('Ext.ProgressBar', {
									   //renderTo: Ext.getBody(),
									   id: 'progressbar',
									   width: 800
									});
								}
								progressbar.updateProgress(0);
								Ext.getCmp('southregion').removeAll(false),
								Ext.getCmp('southregion').add(progressbar);
			
			
								function upload_go_on(){
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
												upload_go_on();
											}
											else{
												progressbar.updateProgress(obj.progress);
												progress=obj.progress*100;
												progressbar.updateText('Traitement des factures termin&eacute');
												//form.owner.ownerCt.items.items[1].store.load();
												//form.owner.ownerCt.items.items[1].doLayout();
												Ext.Msg.alert('Success', 'Le fichier a &eacute;t&eacute; import&eacute; avec succ&egrave;s. '+ obj.lignes+' requ&ecirc;tes ont &eacute;t&eacute; effectu&eacute;es.');					
												Ext.getCmp('southregion').removeAll(false);
											}
										}
									});
								}
			
								upload_go_on();
							}				
						}
					)
				}
			}
		});
	}   
});