<?php

class Menumensuel extends Dmc {
	
	var $has_one=array("facturebt", "facturemt");
	//var $has_many=array("famille");

	var $description = array(
		'periode' => 	array(
				'label' 	=> array('Nom',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',				
				'formfield' 	=> array('text', 15)
		),
		'tension' => 	array(
				'label' 	=> array('Nom',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',				
				'formfield' 	=> array('text', 15)
		)
	);
	/*var $templates = array('template1','template2_mainview_adulte','template2_mainview_enfant');
	
	var $modes = array(
		'display' => array(),
		'form' => array()	
		);*/

	function Menumensuel()
	{
		parent::Dmc();
	}

}
