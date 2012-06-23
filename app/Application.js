Ext.ns('Main');

Main.Launch = {
	
	init : function() {
		
		Ext.Loader.setConfig({enabled:true});

		Ext.create ('Ext.app.Application',{
			name: 'MainApp',    
			//autoCreateViewport: true,
			controllers: ['ViewportControl','SearchControl','GridFactureControl','GridFactureMTControl','ButtonUploadControl','ButtonHomeControl','ButtonAlerteControl','ButtonAnomalieControl','ButtonValidationControl','ButtonWaterControl','ButtonMTControl','ButtonBTControl','UploadControl','GridFactureControl', 'GridAlerteAllControl', 'GridAnomalieAllControl', 'AlerteGridControl', 'GridPlControl','PlPanelControl'],
			models: ['Crud','SearchModel', 'PlModel', 'FactureBTModel', 'FactureMTModel', 'DonneesConsoModel', 'DonneesConsoMTModel','AlerteModel','TriPlModel', 'MenuMensuelModel', 'BilanPeriodeModel'],    
		    	stores: ['SearchStore','FactureStore', 'FactureMTStore', 'PlStore', 'PlAllStore', 'HistoriqueUploadStore', 'DonneesConsoStore', 'DonneesConsoMTStore', 'AlerteStore', 'AlerteAllStore', 'AnomalieStore', 'AnomalieAllStore', 'TriPlNonValideAgainStore','TriPlNonValideStore','TriPlNouveauStore','TriPlValideStore','YearStore','MonthStore','BilanStore', 'MenuMensuelStore', 'BilanPeriodeStore'],
			launch: function() {
				//load viewport
				//MainApp.ViewPort.init();
				
				Ext.QuickTips.init();


				//lancer login.js ici
			}
		});
		
		if(typeof Ext != 'undefined'){
			Ext.core.Element.prototype.unselectable = function(){return this;};
			Ext.view.TableChunker.metaRowTpl = [
				'<tr class="' + Ext.baseCSSPrefix + 'grid-row {addlSelector} {[this.embedRowCls()]}" {[this.embedRowAttr()]}>',
				'<tpl for="columns">',
				'<td class="{cls} ' + Ext.baseCSSPrefix + 'grid-cell ' + Ext.baseCSSPrefix + 'grid-cell-{columnId} {{id}-modified} {{id}-tdCls} {[this.firstOrLastCls(xindex, xcount)]}" {{id}-tdAttr}><div class="' + Ext.baseCSSPrefix + 'grid-cell-inner ' + Ext.baseCSSPrefix + 'unselectable" style="{{id}-style}; text-align: {align};">{{id}}</div></td>',
				'</tpl>',
				'</tr>'
			];
		 }

	}
};

	


