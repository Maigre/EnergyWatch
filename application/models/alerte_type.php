<?php

class Alerte_type extends Dmc {
	
	var $has_many=array("alerte");

	var $description = array(
		'Nom' => 	array(
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

	function Facturebt()
	{
		parent::Dmc();
	}

}
