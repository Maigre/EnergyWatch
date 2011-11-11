<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Alertecontrol extends CI_Controller {

	public function index()
	{

	}

	public function load()
	{
		//DATAMAPPER CONSTRUCTING
		$idPl = $this->input->post('idPl');
		$this->load->model('Pl','run_pl');
		$p = $this->run_pl;
		$p->where('id', $idPl)->get();
		if($p->Tension=='BT'){
			if (substr($p->No_compteur,0,1)=='E'){
 				//BT
				$f=new Facturebt();
			}
			else{
				//EAU
				$f=new Factureeau();
			}
		}
		else{
			$f=new Facturemt();
		}
		$f->where_related_pl('id',$p->id)->get();
		
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
		);
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'idAlerteParent', 'Date', 'Etat', 'Type', 'Valeur', 'Commentaire','Flux');
		
		foreach($f->all as $facture){
			$a=new Alerte();
			if($p->Tension=='BT'){
				if (substr($p->No_compteur,0,1)=='E'){
	 				//BT
					$a->where_related_facturebt('id',$facture->id)->get();
				}
				else{
					//EAU
					$a->where_related_factureeau('id',$facture->id)->get();
				}
				
			}
			else{
				$a->where_related_facturemt('id',$facture->id)->get();
			}
			foreach($a->all as $alerte){
				foreach($fieldArray as $field){
					$answ[$field]=$alerte->$field;
				}
				//get related facture
				//BT
				if($p->Tension=='BT'){
					if (substr($p->No_compteur,0,1)=='E'){
	 					//BT
						$this->load->model('Facturebt','run_f');
					}
					else{
						//EAU
						$this->load->model('Factureeau','run_f');
					}
					$f = $this->run_f;
					$f->where_related_alerte('id', $alerte->id)->get();
				}
				else{
					//MT
					$this->load->model('Facturemt','run_f');
					$f = $this->run_f;
					$f->where_related_alerte('id', $alerte->id)->get();
				}
				$answ['No_de_facture']=$f->No_de_facture;
			
				$answer['data'][] = $answ;
			}	
		}
		if (isset($answer['data']))	$answer['size'] = count($answer['data']);
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		//RETURN JSON !
		echo json_encode($answer);
	}
	
	public function loadall($BT_MT_EAU,$PERIODE_MENSUELLE)
	{
		//$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		//formatte la date
		if (!is_null($this->input->post('PERIODE_MENSUELLE'))){
			$array_periode=explode('%20',$PERIODE_MENSUELLE);	
			$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Aout'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
			$array_periode[0]=urldecode($array_periode[0]);
			$mois= $tableau_mois[$array_periode[0]];
			$PERIODE_MENSUELLE=$array_periode[1].'-'.$mois.'-01';		
		}


		
		if ($BT_MT_EAU=='MT'){
			$f=new Facturemt();
		}
		elseif($BT_MT_EAU=='BT'){
			$f=new Facturebt();
		}
		else{
			$f=new Factureeau();
		}
		$f->where_related_menumensuel('Tension',$BT_MT_EAU);
		$f->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
		
		$linked_field=array('Nom_prenom', 'Point_de_livraison','No_de_facture');
		//get parameters for infinite scrolling grid
		$start = $this->input->post('start');
		$limit = $this->input->post('limit');
		$sort = json_decode($this->input->post('sort'));
		//print_r($sort);
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
					'msg'	=> '',
					'data'  => array()
		);
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'idAlerteParent', 'Date', 'Etat', 'Type', 'Valeur', 'Commentaire','Flux');
		
		//trie sur champ non lié. utilise tri sql (order_by)
		if (!in_array($sort,$linked_field)){
			
			if (is_array($sort)){
				foreach ($sort as $s){
					if ($s->property!='lastpost')	$a->order_by($s->property,$s->direction);
				}
			}
			//if ($sort!='lastpost' and isset($dir)) $a->order_by($sort, $dir);
			//$a->limit($limit,$start);
			$a->where_related_menumensuel('Tension',$BT_MT_EAU);
			$a->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
			$a->get();
			//Remplace le type numérique par le texte correspondant
			$tableau_type=array (
				1 => 'Hausse des Consommations',
				4 => 'Changement de Puissance souscrite',
				7 => 'Plusieurs factures en un mois pour ce P.L',
				8 => 'Consommation Energie R&eacute;active',
				9 => 'Incoh&eacute;rence index'				
			);
			foreach ($a->all as $alerte){
				if($alerte->Type!=6){
					$alerte->Type=$tableau_type[$alerte->Type];
				}
				elseif($alerte->Valeur<0){
					$alerte->Type='D&eacute;ficit de puissance';
				}
				else{
					$alerte->Type='D&eacute;passement de puissance';
				}				
			}
			
			
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
					
					if ($BT_MT_EAU=='MT'){
						//MT
						$this->load->model('Facturemt','run_f');
					}
					elseif($BT_MT_EAU=='BT'){
						//BT
						$this->load->model('Facturebt','run_f');
					}
					else{
						//EAU
						$this->load->model('Factureeau','run_f');
					}
					$f = $this->run_f;
					$f->where_related_alerte('id', $al->id)->get();

					$answ['No_de_facture']=$f->No_de_facture;
					
					
					
					/*$s= new Stat();
					$s->where_related_pl('Point_de_livraison',$pl->Point_de_livraison)->get();
					if (isset($s->conso_moy)){
						$answ['conso_moy']=(int) $s->conso_moy;
					}
					else $answ['conso_moy']=0;
					*/
					
					/*$a= new Alerte();
					$a->select_max('Etat');
					$a->where_related_pl('Point_de_livraison',$pl->Point_de_livraison)->get();
					$answ['alerte_max']=$a->Etat;
		
					$b= new Alerte();
					$b->select('Alerte');
					$b->where_related_pl('Point_de_livraison',$pl->Point_de_livraison)->get();
					$answ['alerte_commentaire']='';
					foreach($b->all as $al){
						if ($answ['alerte_commentaire']!='') $answ['alerte_commentaire'].='<br />'.$al->Alerte;
						else $answ['alerte_commentaire']=$al->Alerte;
					}*/
				}
		
				$answer['data'][] = $answ;
			}
		}
		//Tri sur champ lié, tri sql impossible, tri php necessite recuperation de toutes les alertes puis tri
		else{
			$a->where_related_menumensuel('Tension',$BT_MT_EAU);
			$a->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
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
				
				if ($BT_MT_EAU=='MT'){
					//MT
					$f= new Facturemt();
				}
				elseif($BT_MT_EAU=='BT'){
					//BT
					$f= new Facturebt();
				}
				else{
					//EAU
					$f= new Factureeau();
				}
				$f->where_related_alerte('id',$al->id)->get();
				$answ['No_de_facture']=$f->No_de_facture;
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
				$No_de_facture[$key] = $row['No_de_facture'];
			}
			if (($sort=='Point_de_livraison') and ($dir=='asc')) array_multisort($Point_de_livraison, SORT_ASC, $answer['data']);
			elseif (($sort=='Point_de_livraison') and ($dir=='desc')) array_multisort($Point_de_livraison, SORT_DESC, $answer['data']);
			elseif (($sort=='Nom_prenom') and ($dir=='asc')) array_multisort($Nom_prenom, SORT_ASC, $answer['data']);
			elseif (($sort=='Nom_prenom') and ($dir=='desc')) array_multisort($Nom_prenom, SORT_DESC, $answer['data']);
			elseif (($sort=='No_de_facture') and ($dir=='asc')) array_multisort($Nom_prenom, SORT_ASC, $answer['data']);
			elseif (($sort=='No_de_facture') and ($dir=='desc')) array_multisort($Nom_prenom, SORT_DESC, $answer['data']);
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
	}
	
	public function update(){
		//get the data into post
		$data = json_decode($this->input->post('data'), true);
		//get the entry to update
		$this->load->model('Alerte','run_alerte');
		if (isset($data[0])){
			foreach ($data as $al){
				$a = $this->run_alerte;
				$a->where('id', $al['id']);
				$a->get();

				//update values
				//print_r($al);
				foreach ($al as $field=>$value){
					$a->$field=$value;
				}
				//save updated entry into database
				$a->save();
			}
		}
		else{
			$a = $this->run_alerte;
			$a->where('id', $data['id']);
			$a->get();

			//update values
			//print_r($al);
			foreach ($data as $field=>$value){
				$a->$field=$value;
			}
			//save updated entry into database
			$a->save();
		}
		
		
			
		
		//RETURN JSON !
		$answer['success'] = true;
		echo json_encode($answer);
	}
}
