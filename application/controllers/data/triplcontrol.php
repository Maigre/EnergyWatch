<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Triplcontrol extends CI_Controller {
	
	var $fieldPlArray=array('Nom_prenom','Point_de_livraison', 'date_validation');
	var	$fieldFactureArray=array('id','No_de_facture','Montant_net');
	
	public function index()
	{

	}

	public function load($etat)
	{

		if ($etat=='nouveau'){
			$etat=1;
		}
		elseif ($etat=='valide'){
			$etat=2;
		}
		elseif ($etat=='nonvalide'){
			$etat=3;
		}
		elseif ($etat=='nonvalideagain'){
			$etat=4;
		}
		$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		
		//formatte la date
		$array_periode=explode(' ',$this->input->post('PERIODE_MENSUELLE'));		
		$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Aout'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
		$mois= $tableau_mois[$array_periode[0]];
		$PERIODE_MENSUELLE=$array_periode[1].'-'.$mois.'-01';
		
		
		//DATAMAPPER CONSTRUCTING
		if ($BT_MT_EAU=='MT'){
			$this->load->model('Facturemt','run_facture');
		}
		elseif ($BT_MT_EAU=='BT'){
			$this->load->model('Facturebt','run_facture');
		}
		else{
			$this->load->model('Factureeau','run_facture');
		}		
		$f = $this->run_facture;
		$f->where('etat', $etat);
		$f->where_related_menumensuel('Tension',$BT_MT_EAU);
		$f->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
		$f->get();
		
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> '',
					'success'=>true
				); 
		//Populate the data
		$answ = null;
		
		
		foreach($f->all as $facture){
			$this->load->model('Pl','run_pl');
			$p = $this->run_pl;
			if ($BT_MT_EAU=='MT'){
				$p->where_related_facturemt('id', $facture->id);
			}
			elseif ($BT_MT_EAU=='BT'){
				$p->where_related_facturebt('id', $facture->id);
			}
			else{
				$p->where_related_factureeau('id', $facture->id);
			}		 
			$p->get();
			foreach($this->fieldPlArray as $field){
				$answ[$field]=$p->$field;
			}
			foreach($this->fieldFactureArray as $field){
				$answ[$field]=$facture->$field;
			}
			$answer['data'][] = $answ;
		}
		if (isset($answer['data']))	$answer['size'] = count($answer['data']);
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		//RETURN JSON !
		echo json_encode($answer);
	}
	
	public function save($etat){
		//Translate $etat
		if ($etat=='nouveau'){
			$etat=1;
		}
		elseif ($etat=='valide'){
			$etat=2;
		}
		elseif ($etat=='nonvalide'){
			$etat=3;
			$date_validation=$this->input->post('date_validation');
		}
		elseif ($etat=='nonvalideagain'){
			$etat=4;
		}
		
		//get the data into post
		$idfacture = $this->input->post('idfacture');
		$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		
		//modify facture's etat
		if ($BT_MT_EAU=='MT'){
			$this->load->model('Facturemt','run_facture');
		}
		elseif ($BT_MT_EAU=='BT'){
			$this->load->model('Facturebt','run_facture');
		}
		else{
			$this->load->model('Factureeau','run_facture');
		}
		$f = $this->run_facture;
		$f->where('id', $idfacture);
		//$f->where_related_pl('Point_de_livraison', $data['Point_de_livraison']);
		$f->get();		
		$f->etat=$etat;
		
		
		//modify pl's etat
		$this->load->model('Pl','run_pl');
		$p = $this->run_pl;
		if ($BT_MT_EAU=='MT'){
			$p->where_related_facturemt('id', $idfacture);
		}
		elseif ($BT_MT_EAU=='BT'){
			$p->where_related_facturebt('id', $idfacture);
		}
		else{
			$p->where_related_factureeau('id', $idfacture);
		}
		
		$p->get();
		$p->etat=$etat;
		if($etat==3){
			$p->date_validation=$date_validation;
		} 
		if ($etat==4) $p->etat=3;
		
		//save updated entry into database
		$f->save();
		$p->save();
		
		//RETURN JSON !
		$answer['success'] = true;
		echo json_encode($answer);
	}
	
	public function destroy(){
		//no destroy just etat change
		//RETURN JSON !
		$answer['success'] = true;
		echo json_encode($answer);
	}
	
	
	/*
	public function loadall()
	{
		$linked_field=array('Nom_prenom', 'Point_de_livraison');
		//get parameters for infinite scrolling grid
		$start = $this->input->post('start');
		$limit = $this->input->post('limit');
		$sort = $this->input->post('sort');
		if ($this->input->post('dir')=='ASC'){
			$dir='asc';
		}
		elseif($this->input->post('dir')=='DESC'){
			$dir='desc';
		}
		
		//DATAMAPPER CONSTRUCTING
		$this->load->model('Alerte','run_al');
		$a = $this->run_al;
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
		);
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'idAlerteParent', 'Date', 'Etat', 'Type', 'Valeur', 'Commentaire','Flux');
		
		//trie sur champ non lié. utilise tri sql (order_by)
		if (!in_array($sort,$linked_field)){
			
			if ($sort!='lastpost') $a->order_by($sort, $dir);
			$a->limit($limit,$start);
			$a->get();
			if (count($a->all)<($start+$limit)) $start=count($a->all)-$limit;
			if ($start<0){
				$start=0;
				$limit=count($a->all);
			}
			foreach($a->all as $al){
				if (isset($al)){
					foreach($fieldArray as $field){
						if (is_numeric($al->$field)){
							$answ[$field]= (int) $al->$field; 
						}
						else{
							$answ[$field]=$al->$field;
						}
					}
					//get related pl
					$this->load->model('Pl','run_pl');
					$p = $this->run_pl;
					$p->where_related_alerte('id', $al->id)->get();
					$answ['idPl']=$p->id;
					$answ['Nom_prenom']=$p->Nom_prenom;
					$answ['Point_de_livraison']=$p->Point_de_livraison;
					
					//get related facture
					//MT
					$this->load->model('Facturemt','run_f');
					$f = $this->run_f;
					$f->where_related_alerte('id', $al->id)->get();
					if (is_null($f->No_de_facture)){
						//BT
						$this->load->model('Facturebt','run_f');
						$f = $this->run_f;
						$f->where_related_alerte('id', $al->id)->get();
					}
					$answ['No_de_facture']=$f->No_de_facture;
				}
		
				$answer['data'][] = $answ;
			}
		}
		//Tri sur champ lié, tri sql impossible, tri php necessite recuperation de tous les pls puis tri
		else{
			
			$a->get();
			if (count($a->all)<($start+$limit)) $start=count($a->all)-$limit;
			if ($start<0){
				$start=0;
				$limit=count($a->all);
			}
			//for($i = $start; $i < ($start+$limit); $i++){
			foreach($a->all as $al){
				
				foreach($fieldArray as $field){
					if (is_numeric($al->$field)){
						$answ[$field]= (int) $al->$field; 
					}
					else{
						$answ[$field]=$al->$field;
					}
				}
				
	
				$p= new Pl();
				//$p->select('id','Nom_prenom','Point_de_livraison');
				$p->where_related_alerte('id',$al->id)->get();
				$answ['idPl']=$p->id;
				$answ['Nom_prenom']=$p->Nom_prenom;
				$answ['Point_de_livraison']=$p->Point_de_livraison;
				
				//echo 'ok'.$p->Nom_prenom.$answ['Point_de_livraison']; die;
				$answer['data'][] = $answ;
			}
			//tri avec arraymultisort necessite transposer tableau (lignes->colonnes)
			foreach ($answer['data'] as $key => $row) {
				$id[$key]  = $row['id'];
				$idAlerteParent[$key]  = $row['idAlerteParent'];
				$Date[$key]  = $row['Date'];
				$Etat[$key]  = $row['Etat'];
				$Type[$key]  = $row['Type'];
				$Valeur[$key]  = $row['Valeur'];
				$Commentaire[$key]  = $row['Commentaire'];
				$Flux[$key]  = $row['Flux'];
				$idPl[$key] = $row['idPl'];
				$Point_de_livraison[$key]  = $row['Point_de_livraison'];
				$Nom_prenom[$key]  = $row['Nom_prenom'];
			}
			if (($sort=='Point_de_livraison') and ($dir=='asc')) array_multisort($Point_de_livraison, SORT_ASC, $answer['data']);
			elseif (($sort=='Point_de_livraison') and ($dir=='desc')) array_multisort($Point_de_livraison, SORT_DESC, $answer['data']);
			elseif (($sort=='Nom_prenom') and ($dir=='asc')) array_multisort($Nom_prenom, SORT_ASC, $answer['data']);
			elseif (($sort=='Nom_prenom') and ($dir=='desc')) array_multisort($Nom_prenom, SORT_DESC, $answer['data']);
		}
		
		$answer['size'] = count($a->all);
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		else{
			$answer['success'] = true;
		}
		//RETURN JSON !
		echo json_encode($answer);
	}*/
	
	
}
