<?php

class Facture extends Dmc {
	
	var $has_one=array("pl");
	//var $has_many=array("famille");

	var $description = array(
		'No_de_facture' => 	array(
				'label' 	=> array('Nom',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',				
				'formfield' => array('text', 15)
		),
		'Tarif' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Puisance_souscrite' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Coefficient_PA' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Conso_PA' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Ancien_Index_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Nouvel_Index_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Conso_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Montant_HT_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Contribution_Speciale_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Montant_Net_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Ancien_Index_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Nouvel_Index_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Conso_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Montant_HT_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Contribution_Speciale_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),
		'Montant_Net_Hors_Pointe' => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Ancien_Index_Reactif` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Nouvel_Index_Reactif` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Conso_Energie_Reactive` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_prime_HT` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_Prime_TTC` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Ancien_Index_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Nouvel_Index_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Conso_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Contribution_Speciale_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_HT_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_Net_Pertes_Cuivre` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Ancien_Index_Pertes_fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Nouvel_Index_Pertes_Fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Conso_Pertes_Fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_HT_Pertes_Fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Contribution_Speciale_Pertes_Fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_Net_Pertes_Fer` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Conso_Depassement_PS` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_HT_Penalite_Depassement PS` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_Net_Penalite_Depassement_PS` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Cosinus_phi` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_HT_Cosinus_PHI` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_Net_Cosinus_PHI` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`MT_REDEVANCE_HT` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Montant_net` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Date_index` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		),`Nb_jours` => 	array(
				'label' 	=> array('email',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' => array('text', 15)
		)
	/*var $templates = array('template1','template2_mainview_adulte','template2_mainview_enfant');
	
	var $modes = array(
		'display' => array(),
		'form' => array()	
		);*/

	function Facture()
	{
		parent::Dmc();
	}

}
