<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Plcontrol extends CI_Controller {

	
	
	public function index()
	{

	}

	public function load()
	{
		//DATAMAPPER CONSTRUCTING
		$idPl = $this->input->post('idPl');
		$this->load->model('Pl','run_pl');
		$p = $this->run_pl;
		$p->where('id', $idPl);
		$p->get();
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0//,
					//'msg'	=> ''
				); 
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'Tension', 'No_client', 'No_personne', 'Nature', 'Categorie_client', 'No_compteur', 'No_police', 'Point_de_livraison', 'Nom_prenom', 'Adresse', 'Localisation', 'Code_Activite', 'Date_abonnement', 'Commentaire');
		
		//foreach($p->all as $pl){
		foreach($fieldArray as $field){
			$answer['data'][$field]=$p->$field;
		}
		//$answer['data'][] = $answ;
		//}
		$answer['size'] = count($answer['data']);
		
		/*if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		else{
			$answer['success'] = true;
		}*/
		$answer['success'] = true;
		//RETURN JSON !
		echo json_encode($answer);
	}
	
	public function save($PL){
		//recupération de l'objet PL
		$this->load->model('Pl','run_pl');
		$p = $this->run_pl;
		$p->where('Point_de_livraison', $PL);
		$p->get();
		//recuperation des donnees du formulaire
		foreach ($this->input->post() as $key=>$value){
			$p->$key=$value;
		}
		$date_array = explode("/",$p->Date_abonnement); 
		$p->Date_abonnement=date('Y-m-d',strtotime($date_array[2].'-'.$date_array[1].'-'.$date_array[0]));
		
		$p->save();
	}
	
	public function loadall()
	{
		$linked_field=array();
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
		$this->load->model('Pl','run_pl');
		$p = $this->run_pl;
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
		);
		//Populate the data
		$answ = null;
		$fieldArray=array('id','Tension', 'No_client', 'No_personne', 'Nature', 'Categorie_client', 'No_compteur', 'No_police', 'Point_de_livraison', 'Nom_prenom', 'Adresse', 'Localisation', 'Code_Activite', 'Date_abonnement');
		
		//trie sur champ non lié. utilise tri sql (order_by)
		if (!(in_array($sort,$linked_field))){
			if ($sort!='lastpost') $p->order_by($sort, $dir); 
			$p->get();
			if (count($p->all)<($start+$limit)) $start=count($p->all)-$limit;
			if ($start<0){
				$start=0;
				$limit=count($p->all);
			}
			for($i = $start; $i < ($start+$limit); $i++){
		
				$pl=$p->all{$i};
		
				if (isset($pl)){
			
			
					foreach($fieldArray as $field){
						if (is_numeric($pl->$field)){
							$answ[$field]= (int) $pl->$field; 
						}
						else{
							$answ[$field]=$pl->$field;
						}
					}
					$s= new Stat();
					$s->where_related_pl('Point_de_livraison',$pl->Point_de_livraison)->get();
					if (isset($s->conso_moy)){
						$answ['conso_moy']=(int) $s->conso_moy;
					}
					else $answ['conso_moy']=0;
		
					$a= new Alerte();
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
					}
				}
		
				$answer['data'][] = $answ;
			}
		}
		//Tri sur champ lié, tri sql impossible, tri php necessite recuperation de tous les pls puis tri
		else{
			
			$p->get();
			if (count($p->all)<($start+$limit)) $start=count($p->all)-$limit;
			if ($start<0){
				$start=0;
				$limit=count($p->all);
			}
			//for($i = $start; $i < ($start+$limit); $i++){
			foreach($p->all as $pl){
				
				foreach($fieldArray as $field){
					if (is_numeric($pl->$field)){
						$answ[$field]= (int) $pl->$field; 
					}
					else{
						$answ[$field]=$pl->$field;
					}
				}
				$s= new Stat();
				$s->where_related_pl('Point_de_livraison',$pl->Point_de_livraison)->get();
				if (isset($s->conso_moy)){
					$answ['conso_moy']=(int) $s->conso_moy;
				}
				else $answ['conso_moy']=0;
	
				$a= new Alerte();
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
				}
				$answer['data'][] = $answ;
			}
			//tri avec arraymultisort necessite transposer tableau (lignes->colonnes)
			foreach ($answer['data'] as $key => $row) {
				$Tension[$key]  = $row['Tension'];
				$No_client[$key]  = $row['No_client'];
				$No_personne[$key]  = $row['No_personne'];
				$Nature[$key]  = $row['Nature'];
				$Categorie_client[$key]  = $row['Categorie_client'];
				$No_compteur[$key]  = $row['No_compteur'];
				$No_police[$key]  = $row['No_police'];
				$Point_de_livraison[$key]  = $row['Point_de_livraison'];
				$Nom_prenom[$key]  = $row['Nom_prenom'];
				$Adresse[$key]  = $row['Adresse'];
				$Localisation[$key]  = $row['Localisation'];
				$Code_Activite[$key]  = $row['Code_Activite'];
				$Date_abonnement[$key]  = $row['Date_abonnement'];
				$conso_moy[$key]  = $row['conso_moy'];
				$alerte_max[$key]  = $row['alerte_max'];
				$alerte_commentaire[$key]  = $row['alerte_commentaire'];
			}
			if (($sort=='conso_moy') and ($dir=='asc')) array_multisort($conso_moy, SORT_ASC, $answer['data']);
			elseif (($sort=='conso_moy') and ($dir=='desc')) array_multisort($conso_moy, SORT_DESC, $answer['data']);
			elseif (($sort=='alerte_max') and ($dir=='asc')) array_multisort($alerte_max, SORT_ASC, $answer['data']);
			elseif (($sort=='alerte_max') and ($dir=='desc')) array_multisort($alerte_max, SORT_DESC, $answer['data']);
			elseif (($sort=='alerte_commentaire') and ($dir=='asc')) array_multisort($alerte_max, SORT_ASC, $answer['data']);
			elseif (($sort=='alerte_commentaire') and ($dir=='desc')) array_multisort($alerte_commentaire, SORT_DESC, $answer['data']);
			
		}
		
		$answer['size'] = count($p->all);
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		else{
			$answer['success'] = true;
		}
		//RETURN JSON !
		echo json_encode($answer);
	}
}
