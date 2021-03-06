<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facture extends CI_Controller {

	
	var $field1='id';
	var $field2='Point_de_livraison';
	var $modelsearched='plmt';
	var $modellinked=''; //exemple: 'famille'
	var $fieldlinked='id';  //json answer renvoie le champ 'todisplay' et '$modellinked.$fieldlinked'
	
	public function index()
	{

	}
	
	public function loadnonvalide($BT_MT_EAU,$PERIODE_MENSUELLE){
		
		$BT_MT_EAU== $this->input->post('BT_MT_EAU');
		$PERIODE_MENSUELLE== $this->input->post('PERIODE_MENSUELLE');
		
		if ($PERIODE_MENSUELLE!='Bilan'){
			//echo $this->input->post('PERIODE_MENSUELLE');die();
			$array_periode=explode(' ',$PERIODE_MENSUELLE);	
			$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Août'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
			$array_periode[0]=urldecode($array_periode[0]);
			$mois= $tableau_mois[$array_periode[0]];
			$PERIODE_MENSUELLE=$array_periode[1].'-'.$mois.'-01';		
		}
		
		
		if ($BT_MT_EAU=='MT'){
			$f= new Facturemt();
		}
		elseif($BT_MT_EAU=='BT'){
			$f= new Facturebt();
		}
		else{
			$f= new Factureeau();
		}
		$f->where('etat',3);
		
		if ($PERIODE_MENSUELLE!='Bilan'){
			$f->where_related_menumensuel('periode',$PERIODE_MENSUELLE);
		}
		foreach($f->get()->all as $facture){  //->order_by("Date_index", "asc")

			$p=new Pl();
			if ($BT_MT_EAU=='MT'){
				$p->where_related_facturemt('id',$facture->id)->get();
			}
			elseif($BT_MT_EAU=='BT'){
				$p->where_related_facturebt('id',$facture->id)->get();
			}
			else{
				$p->where_related_factureeau('id',$facture->id)->get();
			}
			$fieldFactureArray=array('id', 'No_de_facture', 'No_compteur', 'Code_tarif', 'Puisance_souscrite', 'Ancien_index', 'Nouvel_index', 'Consommation_mensuelle', 'Redevance', 'Contribution_Speciale', 'Montant_PF', 'Montant_HT', 'Montant_tva', 'Montant_net', 'Date_index', 'Nb_jours', 'etat'); 
			foreach($fieldFactureArray as $field){
				if (is_numeric($facture->$field)){
					$facture->$field= (int) $facture->$field; 
				}
				$answ[$field]=$facture->$field;
			}
			$fieldPlArray=array('Point_de_livraison','Nom_prenom'); 
			foreach($fieldPlArray as $field){
				if (is_numeric($pl->$field)){
					$pl->$field= (int) $pl->$field; 
				}
				$answ[$field]=$pl->$field;
			}
			$answer['data'][] = $answ;
		}
		echo json_encode($answer);
		die();		
	}
	
	public function load()
	{

		//DATAMAPPER CONSTRUCTING
		$PL = $this->input->post('idPl');
		$p = new Pl();
		
		$p->where('id', $PL)->get();
		//Initialize answer array
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
				); 
		$answ = null;
		
		if ($p->Tension=='BT'){
			if (substr($p->No_compteur,0,1)=='E'){
 				//BT
 				$fieldArray=array('id', 'No_de_facture', 'No_compteur', 'Code_tarif', 'Puisance_souscrite', 'Ancien_index', 'Nouvel_index', 'Consommation_mensuelle', 'Redevance', 'Contribution_Speciale', 'Montant_PF', 'Montant_HT', 'Montant_tva', 'Montant_net', 'Date_index', 'Nb_jours', 'etat');
				foreach($p->facturebt->get()->all as $facture){  //->order_by("Date_index", "asc")
					//Formattage des dates
			 		
				 		/*$date_array = explode("-",$facture->Date_index); // split the array
						$var_year = $date_array[0]; //day seqment
						$var_month = $date_array[1]; //month segment
						$var_day = $date_array[2]; //year segment
						$date = $var_day.'-'.$var_month.'-'.$var_year;
						$facture->Date_index=$date;*/
				
					foreach($fieldArray as $field){
						if (is_numeric($facture->$field)){
							$facture->$field= (int) $facture->$field; 
						}
						$answ[$field]=$facture->$field;
					}
					$answer['data'][] = $answ;
				}
				$answer['size'] = count($answer['data']);
 			}
 			else{
 				//EAU
 				$fieldArray=array('id', 'No_de_facture', 'No_compteur', 'Code_tarif', 'Puisance_souscrite', 'Ancien_index', 'Nouvel_index', 'Consommation_mensuelle', 'Redevance', 'Contribution_Speciale', 'Montant_PF', 'Montant_HT', 'Montant_tva', 'Montant_net', 'Date_index', 'Nb_jours', 'etat');
				foreach($p->factureeau->get()->all as $facture){  //->order_by("Date_index", "asc")
					//Formattage des dates 
				 		/*$date_array = explode("-",$facture->Date_index); // split the array
						$var_year = $date_array[0]; //day seqment
						$var_month = $date_array[1]; //month segment
						$var_day = $date_array[2]; //year segment
						$date = $var_day.'-'.$var_month.'-'.$var_year;
						$facture->Date_index=$date;*/
				
					foreach($fieldArray as $field){
						if (is_numeric($facture->$field)){
							$facture->$field= (int) $facture->$field; 
						}
						$answ[$field]=$facture->$field;
					}
					$answer['data'][] = $answ;
				}
				$answer['size'] = count($answer['data']);
 			}
			
		}
		//MT
		elseif($p->Tension=='MT'){
			$fieldArray=array('id', 'No_de_facture', 'No_compteur', 'Tarif', 'Puisance_souscrite', 'Coefficient_PA', 'Conso_PA', 'Ancien_Index_Pointe', 'Nouvel_Index_Pointe', 'Conso_Pointe', 'Montant_HT_Pointe', 'Contribution_Speciale_Pointe', 'Montant_Net_Pointe', 'Ancien_Index_Hors_Pointe', 'Nouvel_Index_Hors_Pointe', 'Conso_Hors_Pointe', 'Montant_HT_Hors_Pointe', 'Contribution_Speciale_Hors_Pointe', 'Montant_Net_Hors_Pointe', 'Ancien_Index_Reactif', 'Nouvel_Index_Reactif', 'Conso_Energie_Reactive', 'Montant_prime_HT', 'Montant_Prime_TTC', 'Ancien_Index_Pertes_Cuivre', 'Nouvel_Index_Pertes_Cuivre', 'Conso_Pertes_Cuivre', 'Contribution_Speciale_Pertes_Cuivre', 'Montant_HT_Pertes_Cuivre', 'Montant_Net_Pertes_Cuivre', 'Ancien_Index_Pertes_fer', 'Nouvel_Index_Pertes_Fer', 'Conso_Pertes_Fer', 'Montant_HT_Pertes_Fer', 'Contribution_Speciale_Pertes_Fer', 'Montant_Net_Pertes_Fer', 'Conso_Depassement_PS', 'Montant_HT_Penalite_Depassement_PS', 'Montant_Net_Penalite_Depassement_PS', 'Cosinus_phi', 'Montant_HT_Cosinus_PHI', 'Montant_Net_Cosinus_PHI', 'MT_REDEVANCE_HT', 'Montant_net', 'Date_index', 'Nb_jours', 'etat');
			foreach($p->facturemt->get()->all as $facture){
				//Formattage des dates
				/*$date_array = explode("-",$facture->Date_index); // split the array
				$var_year = $date_array[0]; //day seqment
				$var_month = $date_array[1]; //month segment
				$var_day = $date_array[2]; //year segment
				$date = $var_day.'-'.$var_month.'-'.$var_year;
				$facture->Date_index=$date;*/
				foreach($fieldArray as $field){
					if (is_numeric($facture->$field)){
						$facture->$field= (int) $facture->$field; 
					}
					$answ[$field]=$facture->$field;
				}
				//Somme Hors Pointe et Pointe
				$answ['Conso_Active']=$facture->Conso_Hors_Pointe + $facture->Conso_Pointe;
				$answer['data'][] = $answ;
			}
			$answer['size'] = count($answer['data']);
		}
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		else{
			$answer['success'] = true;
		}
		//RETURN JSON !
		echo json_encode($answer);
	}
	
	/*public function loaddonneesconso()
	{

		//DATAMAPPER CONSTRUCTING
		$idPl = $this->input->post('idPl');
		$p = new Pl();
		$p->where('id', $idPl);
		$p->get();
		//Initialize answer array

		$answer = array(
					'size' 	=> 0,
					'msg'	=> '',
					'data'  => array()
				); 
		$answ = null;
		//BT
		if ($p->Tension=='BT'){
			if (substr($p->No_compteur,0,1)=='E'){
	 		//BT
				$fieldArray=array('Consommation_mensuelle','Redevance','Contribution_Speciale','Montant_PF','Montant_HT','Montant_tva','Montant_net','Nb_jours');
				//creation du tableau answer avec une seule ligne par mois
				foreach($p->donnees_conso_bt->get()->all as $facture){
				
					//Formatte les dates
		 			$date_array = explode("-",$facture->Date_index); // split the array
					$var_year = $date_array[0]; //day seqment
					$var_month = $date_array[1]; //month segment
					$var_day = $date_array[2]; //year segment
					$date = $var_day.'-'.$var_month.'-'.$var_year;
					$facture->Date_index=$date;
				
				
					//Remplit $answ
					$answ['Date_index']=$facture->Date_index;
				
					foreach($fieldArray as $field){
					
						if (is_numeric($facture->$field) and ($field!='Consommation_mensuelle')){
							$facture->$field= (int) $facture->$field; 
						}
						$answ[$field]=$facture->$field;
					}
				
				
				
					//regroupe les donnees de conso par mois
					$same_month=false;
					if (isset($answer['data'])){
						foreach ($answer['data'] as $key=>$donneesconso){
							$date_array2 = explode("-",$donneesconso['Date_index']);
							if ($date_array[1].$date_array[0]==$date_array2[1].$date_array2[2]){ //test même mois même année. attention les deux dates ne sont pas au même format
								$same_month=true;
								$key_same_month=$key;
							}
						}
					}
					if ($same_month){
						foreach ($fieldArray as $field){
							$answer['data'][$key_same_month][$field]=$answer['data'][$key_same_month][$field]+$answ[$field];
						}
					}
					else{
						$answer['data'][] = $answ;
					}
								
					//Trie le tableau par date croissante
					foreach ($answer['data'] as $key => $row) {
						$Date_index[$key]  = strtotime($row['Date_index']);
					}			
					array_multisort($Date_index, SORT_ASC, $answer['data']);
				}
			}
			else{
			//EAU
				$fieldArray=array('Consommation_mensuelle','Redevance','Contribution_Speciale','Montant_PF','Montant_HT','Montant_tva','Montant_net','Nb_jours');
				//creation du tableau answer avec une seule ligne par mois
				foreach($p->donnees_conso_eau->get()->all as $facture){
				
					//Formatte les dates
		 			$date_array = explode("-",$facture->Date_index); // split the array
					$var_year = $date_array[0]; //day seqment
					$var_month = $date_array[1]; //month segment
					$var_day = $date_array[2]; //year segment
					$date = $var_day.'-'.$var_month.'-'.$var_year;
					$facture->Date_index=$date;
				
				
					//Remplit $answ
					$answ['Date_index']=$facture->Date_index;
				
					foreach($fieldArray as $field){
					
						if (is_numeric($facture->$field) and ($field!='Consommation_mensuelle')){
							$facture->$field= (int) $facture->$field; 
						}
						$answ[$field]=$facture->$field;
					}
				
					//regroupe les donnees de conso par mois
					$same_month=false;
					if (isset($answer['data'])){
						foreach ($answer['data'] as $key=>$donneesconso){
							$date_array2 = explode("-",$donneesconso['Date_index']);
							if ($date_array[1].$date_array[0]==$date_array2[1].$date_array2[2]){ //test même mois même année. attention les deux dates ne sont pas au même format
								$same_month=true;
								$key_same_month=$key;
							}
						}
					}
					if ($same_month){
						foreach ($fieldArray as $field){
							$answer['data'][$key_same_month][$field]=$answer['data'][$key_same_month][$field]+$answ[$field];
						}
					}
					else{
						$answer['data'][] = $answ;
					}
								
					//Trie le tableau par date croissante
					foreach ($answer['data'] as $key => $row) {
						$Date_index[$key]  = strtotime($row['Date_index']);
					}			
					array_multisort($Date_index, SORT_ASC, $answer['data']);
				}
			}
			
				//Recalcule chaque mois pour avoir 30 jours par mois
				foreach ($answer['data'] as $key=>$row) {
				
					if ($row['Nb_jours']!=30){
						foreach ($fieldArray as $field){
						
							if($row['Nb_jours']!=0){
								$answer['data'][$key][$field]=round($row[$field]*30/$row['Nb_jours']*100)/100;
							}
							else{
								$answer['data'][$key][$field]=0;
							}
						}
						$answer['data'][$key]['Nb_jours']=30;
					}
					$Date_index[$key] = strtotime($row['Date_index']);
				}
			
			
				//Ajoute entrée vide pour mois vide
				$mois_avant='';
				foreach ($answer['data'] as $dataconso){
					$date_array = explode("-",$dataconso['Date_index']);
					$mois_now = $date_array[1];
					if (($mois_avant!='') and ( (($mois_now-$mois_avant)>1) or ((($mois_now-$mois_avant)>-11) and (($mois_now-$mois_avant)<0)) ) ){
						//Nombre de mois manquant:
						if (($mois_now-$mois_avant)>1){
							$nb_mois_manquant= $mois_now-$mois_avant-1;
						}
						else $nb_mois_manquant= $mois_now-$mois_avant+11;
						for ($i = 1; $i <= $nb_mois_manquant; $i++) {
							$answ['Date_index']=date('d-m-Y', strtotime('-'.$i.' month', strtotime($dataconso['Date_index'])));
							foreach($fieldArray as $field){
								$answ[$field]=0;
							}
							$answer['data'][] = $answ;
						}
					}
					$mois_avant=$mois_now;
				}
			
				//Retrie le tableau
				foreach ($answer['data'] as $key => $row) {
					$Date_index[$key]  = strtotime($row['Date_index']);
				}	
				if (!empty($answer['data'])){
					array_multisort($Date_index, SORT_ASC, $answer['data']);
				}		
				
				$answer['size'] = count($answer['data']);
						
		}
		//MT
		elseif($p->Tension=='MT'){
			$fieldArray=array('Conso_PA','Conso_Pointe', 'Montant_HT_Pointe', 'Contribution_Speciale_Pointe', 'Montant_Net_Pointe', 'Conso_Hors_Pointe', 'Montant_HT_Hors_Pointe', 'Contribution_Speciale_Hors_Pointe', 'Montant_Net_Hors_Pointe', 'Conso_Energie_Reactive', 'Montant_prime_HT', 'Montant_Prime_TTC', 'Conso_Pertes_Cuivre', 'Contribution_Speciale_Pertes_Cuivre', 'Montant_HT_Pertes_Cuivre', 'Montant_Net_Pertes_Cuivre', 'Conso_Pertes_Fer', 'Montant_HT_Pertes_Fer', 'Contribution_Speciale_Pertes_Fer', 'Montant_Net_Pertes_Fer', 'Conso_Depassement_PS', 'Montant_HT_Penalite_Depassement_PS', 'Montant_Net_Penalite_Depassement_PS', 'Cosinus_phi', 'Montant_HT_Cosinus_PHI', 'Montant_Net_Cosinus_PHI', 'MT_REDEVANCE_HT', 'Montant_net', 'Nb_jours');

			//creation du tableau answer avec une seule ligne par mois
			foreach($p->donnees_conso_mt->get()->all as $facture){
				
				//Formatte les dates
	 			$date_array = explode("-",$facture->Date_index); // split the array
				$var_year = $date_array[0]; //day seqment
				$var_month = $date_array[1]; //month segment
				$var_day = $date_array[2]; //year segment
				$date = $var_day.'-'.$var_month.'-'.$var_year;
				$facture->Date_index=$date;
				
				
				//Remplit $answ
				$answ['Date_index']=$facture->Date_index;
				
				foreach($fieldArray as $field){
					
					if (is_numeric($facture->$field) and ($field!='Consommation_mensuelle')){
						$facture->$field= (int) $facture->$field; 
					}
					$answ[$field]=$facture->$field;
				}
				
				
				
				//regroupe les donnees de conso par mois
				$same_month=false;
				if (isset($answer['data'])){
					foreach ($answer['data'] as $key=>$donneesconso){
						$date_array2 = explode("-",$donneesconso['Date_index']);
						if ($date_array[1].$date_array[0]==$date_array2[1].$date_array2[2]){ //test même mois même année. attention les deux dates ne sont pas au même format
							$same_month=true;
							$key_same_month=$key;
						}
					}
				}
				if ($same_month){
					foreach ($fieldArray as $field){
						$answer['data'][$key_same_month][$field]=$answer['data'][$key_same_month][$field]+$answ[$field];
					}
				}
				else{
					$answer['data'][] = $answ;
				}
								
				//Trie le tableau par date croissante
				foreach ($answer['data'] as $key => $row) {
					$Date_index[$key]  = strtotime($row['Date_index']);
				}			
				array_multisort($Date_index, SORT_ASC, $answer['data']);
			}
			
			//Recalcule chaque mois pour avoir 30 jours par mois
			foreach ($answer['data'] as $key=>$row) {

				if ($row['Nb_jours']!=30){
					foreach ($fieldArray as $field){
						
						if($row['Nb_jours']!=0){
							$answer['data'][$key][$field]=round($row[$field]*30/$row['Nb_jours']*100)/100;
						}
						else{
							$answer['data'][$key][$field]=0;
						}
					}
					$answer['data'][$key]['Nb_jours']=30;
				}
				$Date_index[$key] = strtotime($row['Date_index']);
			}
			
			
			//Ajoute entrée vide pour mois vide
			$mois_avant='';
			foreach ($answer['data'] as $dataconso){

				$date_array = explode("-",$dataconso['Date_index']);
				$mois_now = $date_array[1];
				if (($mois_avant!='') and ( (($mois_now-$mois_avant)>1) or ((($mois_now-$mois_avant)>-11) and (($mois_now-$mois_avant)<0)) ) ){
					//Nombre de mois manquant:
					if (($mois_now-$mois_avant)>1){
						$nb_mois_manquant= $mois_now-$mois_avant-1;
					}
					else $nb_mois_manquant= $mois_now-$mois_avant+11;
					for ($i = 1; $i <= $nb_mois_manquant; $i++) {
						$answ['Date_index']=date('d-m-Y', strtotime('-'.$i.' month', strtotime($dataconso['Date_index'])));
						foreach($fieldArray as $field){
							$answ[$field]=0;
						}
						$answer['data'][] = $answ;
					}
				}
				$mois_avant=$mois_now;
			}
			
			//Retrie le tableau
			foreach ($answer['data'] as $key => $row) {
				$Date_index[$key]  = strtotime($row['Date_index']);
			}			
			array_multisort($Date_index, SORT_ASC, $answer['data']);
			
			
			$answer['size'] = count($answer['data']);
		}
		
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		else{
			$answer['success'] = true;
		}
		//RETURN JSON !
		echo json_encode($answer);
	}*/
	
	function trie_tableau($array, $key)
	{
		for ($i = 0; $i < sizeof($array); $i++) {
			$sort_values[$i] = $array[$i][$key];
		}
		asort ($sort_values);
		reset ($sort_values);
		while (list ($arr_key, $arr_val) = each ($sort_values)) {
			$sorted_arr[] = $array[$arr_key];
		}
		return $sorted_arr;
	}
	
}
