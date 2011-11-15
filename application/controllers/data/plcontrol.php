<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Plcontrol extends CI_Controller {

	
	
	public function index()
	{

	}

	public function loadfromalertegroupping($BT_MT_EAU,$PERIODE_MENSUELLE)
	{
		
		//Fix le bug du gridgrouping.
		//BUG : Après grouping lors du click sur une ligne, l'objet renvoyé n'est pas celui qui a été cliqué.
		// L'objet renvoyé correspond à l'objet qui aurait été à cette ligne si le tri(grouping) n'avait pas eu lieu.
		
		//FIX
		//-- 1 -- Recuperer le numéro de la ligne cliquée : requete pour avoir le tableau initial (non trié) des alertes et recuperer l'indice du pl renvoyé (avec idpl)
		//-- 2 -- Recuperer le pl correspondant dans le tableau trié : requete pour avoir alertes triées par type. Puis rechercher le pl correspondant à la ligne cliquée
		
		//-- 1 --
		
		//if (!is_null($this->input->post('PERIODE_MENSUELLE'))){
			$array_periode=explode('%20',$PERIODE_MENSUELLE);	
			$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Aout'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
			$array_periode[0]=urldecode($array_periode[0]);
			$mois= $tableau_mois[$array_periode[0]];
			$PERIODE_MENSUELLE=$array_periode[1].'-'.$mois.'-01';		
		//}
		$idpl = $this->input->post('idPl');
		$a = new Alerte();
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		$a->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
		$a->get();
		//REcupere l'indice du pl avec son id
		$indice=0;
		foreach($a->all as $alerte){
			$alerte->pl->get();
			if ($alerte->pl->id == $idpl){
				break;
			}
			$indice=$indice+1;
		}
		//-- 2 --
		$a = new Alerte();
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		$a->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
		//$a->order_by('Type');
		$a->order_by("Type", "asc"); 
		$a->get();
		$indice2=0;
		foreach($a->all as $alerte){
			//echo '  indice1:'.$indice;
			//echo 'indice2:'.$indice2;
			if($indice2==$indice){
				//echo 'ok';
				
				$alerte_cliquee=$alerte;
				break;
			}
			$indice2++;
		}
		
		$p=new Pl();
		$p->where_related_alerte('id',$alerte_cliquee->id);
		$p->get();
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0//,
					//'msg'	=> ''
				); 
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'Tension', 'No_client', 'No_personne', 'Nature', 'Categorie_client', 'No_compteur', 'No_police', 'Point_de_livraison', 'Nom_prenom', 'Adresse', 'Localisation', 'Code_Activite', 'Date_abonnement', 'Commentaire');
		
		foreach($fieldArray as $field){
			$answer['data'][$field]=$p->$field;
		}

		$answer['size'] = count($answer['data']);
		
		
		$answer['success'] = true;
		//RETURN JSON !
		echo json_encode($answer);
	}
	
	public function load()
	{
		
		//DATAMAPPER CONSTRUCTING
		if ($this->input->post('idFacture')!=''){
			//RECHERCHE DU PL PAR IDFACTURE
			$idFacture=$this->input->post('idFacture');
			$this->load->model('Pl','run_pl');
			$p = $this->run_pl;
			$BT_MT_EAU=$this->input->post('BT_MT_EAU');
			if($BT_MT_EAU=='MT'){
				$p->where_related_facturemt('id', $idFacture);
			}
			elseif($BT_MT_EAU=='BT'){
				$p->where_related_facturebt('id', $idFacture);
			}
			else{
				$p->where_related_factureeau('id', $idFacture);
			}			
			$p->get();
		}
		else{
			$idPl = $this->input->post('idPl');
			$this->load->model('Pl','run_pl');
			$p = $this->run_pl;
			$p->where('id', $idPl);
			$p->get();
		}
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
		$fieldArray=array('id','Tension', 'No_client', 'No_personne', 'Nature', 'Categorie_client', 'No_compteur', 'No_police', 'Point_de_livraison', 'Nom_prenom', 'Adresse', 'Localisation', 'Code_Activite', 'Date_abonnement', 'alerte_max', 'conso_moy');
		
		//trie sur champ non lié. utilise tri sql (order_by)
		//if (!in_array($sort,$linked_field)){
			
			if ($sort!='lastpost') $p->order_by($sort, $dir); 
			$p->limit($limit,$start);
			$p->get();
			if (count($p->all)<($start+$limit)) $start=count($p->all)-$limit;
			if ($start<0){
				$start=0;
				$limit=count($p->all);
			}
			foreach($p->all as $pl){
		
				if (isset($pl)){
			
			
					foreach($fieldArray as $field){
						if (is_numeric($pl->$field)){
							$answ[$field]= (int) $pl->$field; 
						}
						else{
							$answ[$field]=$pl->$field;
						}
					}
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
		//}
		//Tri sur champ lié, tri sql impossible, tri php necessite recuperation de tous les pls puis tri
		/*else{
			
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
			
		}*/
		
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
