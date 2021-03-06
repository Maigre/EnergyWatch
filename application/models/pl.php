<?php

class Pl extends Dmc {
	
	//var $has_one=array("stat");
	var $has_many=array("facturebt","facturemt","factureeau","donnees_conso_bt","donnees_conso_mt","donnees_conso_eau","alerte");
	
	var $description = array(
		'No_client' => 	array(
				'label' 	=> array('Nom',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',				
				'formfield' 	=> array('text', 15)
		),
		'No_personne' => 	array(
				'label' 	=> array('N° personne',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Nature' => 	array(
				'label' 	=> array('Nature',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Categorie_client' => 	array(
				'label' 	=> array('Catégorie client',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'No_compteur' => 	array(
				'label' 	=> array('N° compteur',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'No_police' => 	array(
				'label' 	=> array('N° police',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Point_de_livraison' => 	array(
				'label' 	=> array('Point de livraison',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Nom_prenom' => 	array(
				'label' 	=> array('Nom prénom',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Adresse' => 	array(
				'label' 	=> array('Adresse',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Localisation' => 	array(
				'label' 	=> array('Localisation',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Code_Activite' => 	array(
				'label' 	=> array('Code Activité',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Date_abonnement' => 	array(
				'label' 	=> array('Date Abonnement',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'Commentaire' => 	array(
				'label' 	=> array('Commentaire',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'alerte_max' => 	array(
				'label' 	=> array('alerte_max',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'conso_moy' => 	array(
				'label' 	=> array('conso_moy',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'etat' => array(
				'label' 	=> array('etat',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		),
		'date_validation' => array(
				'label' 	=> array('date_validation',false),
				'rules' 	=> array('required', 'xss_clean'),
				'defval'	=> '',
				'type'		=> 'normal',
				'formfield' 	=> array('text', 15)
		)
	);
	
	function Pl()
	{
		parent::Dmc();
	}
	
}
