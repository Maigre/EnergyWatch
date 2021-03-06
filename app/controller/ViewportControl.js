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
								UPLOAD_RUNNING=true;
								var progressbar = Ext.getCmp('progressbar');
								if (!progressbar){
									var progressbar = Ext.create('Ext.ProgressBar', {
									   //renderTo: Ext.getBody(),
									   id: 'progressbar',
									   width: 800
									});
								}
								progressbar.updateProgress(0);
								Ext.getCmp('southregion').removeAll(false);
								Ext.getCmp('southregion').height = 100;
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
												Ext.getCmp('southregion').removeAll();
												Ext.getCmp('southregion').height = 30;
												Ext.getCmp('historiqueupload').store.load();
												Ext.getCmp('historiqueupload').doLayout();
												Ext.Msg.alert('Success', 'Le fichier a &eacute;t&eacute; import&eacute; avec succ&egrave;s. '+ obj.lignes+' requ&ecirc;tes ont &eacute;t&eacute; effectu&eacute;es.');						
												UPLOAD_RUNNING= false;
												Ext.getCmp('buttonimporter').enable();
												
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
