movebutton = function(){
	
	
	//if(buttonmt.up('container').id=='homepanel'){
		if(Ext.getCmp('buttonmtheader').hidden==true){
			Ext.getCmp('buttonwaterheader').opacity=0;
			Ext.getCmp('buttonbtheader').opacity=0;
			Ext.getCmp('buttonmtheader').opacity=0;
			Ext.getCmp('buttonuploadheader').opacity=0;
			
			Ext.getCmp('buttonmt').animate({
				duration: 1000,
				to: {
					x: 250,
					y: 14
				}
			});
			Ext.getCmp('buttonbt').animate({
				duration: 1000,
				to: {
					x: 190,
					y: 14
				}
			});
			Ext.getCmp('buttonwater').animate({
				duration: 1000,
				to: {
					x: 130,
					y: 14
				}
			});
			Ext.getCmp('buttonupload').animate({
				duration: 1000,
				to: {
					x: 70,
					y: 14
				}
			});
			
			
		
			Ext.getCmp('buttonwaterheader').show();
			Ext.getCmp('buttonwaterheader').animate({
				duration: 1000,  //one second total
				keyframes: {
					25: {     //from 0 to 250ms (25%)
						opacity: 0
					},
					80: {  //from 500ms to 750ms (75%)
						opacity: 0
					},
					100: {  //from 750ms to 1sec
						opacity: 1
					}
				}
			});
			Ext.getCmp('buttonbtheader').show();
			Ext.getCmp('buttonbtheader').animate({
				duration: 1000,  //one second total
				keyframes: {
					25: {     //from 0 to 250ms (25%)
						opacity: 0
					},
					80: {  //from 500ms to 750ms (75%)
						opacity: 0
					},
					100: {  //from 750ms to 1sec
						opacity: 1
					}
				}
			});
			Ext.getCmp('buttonmtheader').show();
			Ext.getCmp('buttonmtheader').animate({
				duration: 1000,  //one second total
				keyframes: {
					25: {     //from 0 to 250ms (25%)
						opacity: 0
					},
					80: {  //from 500ms to 750ms (75%)
						opacity: 0
					},
					100: {  //from 750ms to 1sec
						opacity: 1
					}
				}
			});
			Ext.getCmp('buttonuploadheader').show();
			Ext.getCmp('buttonuploadheader').animate({
				duration: 1000,  //one second total
				keyframes: {
					25: {     //from 0 to 250ms (25%)
						opacity: 0
					},
					80: {  //from 500ms to 750ms (75%)
						opacity: 0
					},
					100: {  //from 750ms to 1sec
						opacity: 1
					}
				}
			});
		}	
		return true;
	//};
};

switch_button_to_header = function (){
	Ext.getCmp('buttonwaterheader').show();
	Ext.getCmp('buttonmtheader').show();
	Ext.getCmp('buttonbtheader').show();
	Ext.getCmp('buttonuploadheader').show();
	return true;
}

westregion_appear = function(){
	
	Ext.getCmp('westregion').show();
	Ext.getCmp('westregion').animate({
		duration: 1000,
		to: {
			width: 150
		}
	});
	return true;
};

westregion_desappear= function(){
	Ext.getCmp('westregion').animate({
		duration: 1000,
		to: {
			width: 0
		}
	});
	Ext.getCmp('westregion').hide();
	return true;
};

one_button_pressed= function(tension){
	all_button=['buttonupload','buttonuploadheader','buttonmt','buttonmtheader','buttonbt','buttonbtheader','buttonwater','buttonwaterheader'];
	Ext.each(all_button,function(button){
		if (Ext.getCmp(button)){
			Ext.getCmp(button).toggle(false);
		}
		
	})
	if (Ext.getCmp('button'+tension)){
		Ext.getCmp('button'+tension).toggle(true);
	}
	Ext.getCmp('button'+tension+'header').toggle(true);
}

//add menu to header split button
add_menu_splitbutton = function(){
	//Request the menu_mensuel periods
	Ext.Ajax.request({
		url: BASE_URL+'data/process/menumensuel',
		method : 'POST',
		params: {
			BT_MT_EAU: BT_MT_EAU
		},
		success: function(response){
			var periodes = Ext.decode(response.responseText).data;
			console.info(periodes);
			Ext.each(periodes, function(periode) {
				menu_item = {text: 'Anomalies '+ periode, handler: function(){
					PERIODE_MENSUELLE = periode;
					
					Ext.getCmp('westregion').removeAll();
					var menumensuelpanel= new Ext.widget('menumensuelpanel');
					Ext.getCmp('westregion').add(menumensuelpanel);
					
					//display les anomalies de la periode clickée
					openanomalie();
					//Affiche la période dans le titre du grid
					Ext.getCmp('gridanomalieall').setTitle('Anomalies de ' + periode);
				}};
				
				if(BT_MT_EAU == 'MT'){
					Ext.getCmp('buttonmtheader').menu.add(menu_item);
				}
				else if(BT_MT_EAU =='BT'){
					Ext.getCmp('buttonbtheader').menu.add(menu_item);
				}
				else{
					Ext.getCmp('buttonwaterheader').menu.add(menu_item);
				}
				
			});
		}
	});
}

Ext.define('MainApp.controller.ButtonMTControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
		'buttonmt': {
			click: this.tensionmt
		}
        });
        this.control({
        	'buttonmtheader': {
			click: this.tensionmt
		}
        })
    },
    tensionmt: function() {
		
		//buttonmt=Ext.getCmp('buttonmt');
				
		if (movebutton()==true){
			westregion_appear();
			add_menu_splitbutton();
		}
		one_button_pressed('mt');
		
		
		BT_MT_EAU='MT';
		Ext.getCmp('westregion').removeAll();
		
		var homepanel = Ext.getCmp('homepanel');		
		homepanel.removeAll(false);
		
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
