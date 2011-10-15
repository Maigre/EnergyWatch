movebutton = function(){
	
	
	//if(buttonmt.up('container').id=='homepanel'){
	console.info(Ext.getCmp('buttonmtheader').hidden);
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

westregion_appear= function(){
	Ext.getCmp('westregion').animate({
		duration: 1000,
		to: {
			width: 140
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
	return true;
};

one_button_pressed= function(tension){
	all_button=['buttonmt','buttonmtheader','buttonbt','buttonbtheader','buttonwater','buttonwaterheader'];
	Ext.each(all_button,function(button){
		button.toggle(false);
	})
	Ext.getCmp('button'+tension).toggle(true);
	Ext.getCmp('button'+tension+'header').toggle(true);
}

Ext.define('MainApp.controller.ButtonMTControl', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'buttonmt': {
                click: this.tensionmt
            }
        });
    },
    tensionmt: function() {
		
		//buttonmt=Ext.getCmp('buttonmt');
				
		if (movebutton()==true){
			westregion_appear();
		}
		one_button_pressed('mt');
		
		
		//if(this.up(''))
		BT_MT_EAU='MT';
		Ext.getCmp('westregion').removeAll();
		
		var homepanel= Ext.getCmp('homepanel');
		
		Ext.getCmp('centerregion').removeAll(false);
		var menumensuelpanel= new Ext.widget('menumensuelpanel');
		
		Ext.getCmp('westregion').add(menumensuelpanel);
		Ext.getCmp('centerregion').add(homepanel);
	}   
});
