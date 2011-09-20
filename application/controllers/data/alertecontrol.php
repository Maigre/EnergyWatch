<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Alertecontrol extends CI_Controller {

	public function index()
	{

	}

	public function load()
	{

		
		//DATAMAPPER CONSTRUCTING
		$idPl = $this->input->post('idPl');
		$this->load->model('Alerte','run_alerte');
		$a = $this->run_alerte;
		$a->where_related_pl('id', $idPl);
		$a->get();
		
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
				); 
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'idAlerteParent', 'Date', 'Etat', 'Type', 'Valeur', 'Commentaire','Flux');
		
		foreach($a->all as $alerte){
			foreach($fieldArray as $field){
				$answ[$field]=$alerte->$field;
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
					//foreach($al->pl>get()->all as $pl){
						$answ['idPl']=$p->id;
						$answ['Nom_prenom']=$p->Nom_prenom;
						$answ['Point_de_livraison']=$p->Point_de_livraison;
					//}
					
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
	}
	
	public function update(){
		//get the data into post
		$data = json_decode($this->input->post('data'), true);
		//get the entry to update
		$this->load->model('Alerte','run_alerte');
		$a = $this->run_alerte;
		$a->where('id', $data['id']);
		$a->get();

		//update values
		foreach ($data as $field=>$value){
			$a->$field=$value;
		}

		//save updated entry into database
		$a->save();
		
		//RETURN JSON !
		$answer['success'] = true;
		echo json_encode($answer);
	}
}
