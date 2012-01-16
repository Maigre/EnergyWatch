<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bilan extends CI_Controller {


	public function load(){
		$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		
		if ($this->input->post('periode_mensuelle')!='bilan'){
			$array_periode=explode(' ',$this->input->post('periode_mensuelle'));
			$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Aout'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
			$mois= $tableau_mois[$array_periode[0]];
			$periode_mensuelle=$array_periode[1].'-'.$mois.'-01';
		}
		else{
			$periode_mensuelle='bilan';
		}
		//Initialize answer array
		$answer = array(
			'size' 	=> 0,
			'msg'	=> ''
		); 
		if ($BT_MT_EAU=='MT'){
			$f=new Facturemt();
		}		
		elseif($BT_MT_EAU=='BT'){
			$f=new Facturebt();
		}		
		else{
			$f=new Factureeau();
		}
		
		if ($periode_mensuelle!='bilan'){
			$f->where_related_menumensuel('Tension',$BT_MT_EAU);
			$f->where_related_menumensuel('periode',$periode_mensuelle);
		}
		
		
		$f->get();
		
		//Initialise à zéro les données
		
		$NbPlNouveau=0;
		$NbPlValide=0;
		$NbPlRejete=0;
		$NbPlNonValideAgain=0;
		
		$ConsoAPayer=0;
		$NbAPayer=0;
		$ConsoAttente=0;
		$NbAttente=0;
		$ConsoRejete=0;
		$NbRejete=0;
		
		$NbAnomalieActive=0;
		$NbAlerteActive=0;
		$NbAlerteAttente=0;
		
		foreach($f->all as $facture){
			//Get the related PL
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
			//Get the Pl etat
			if ($p->etat==1){
				$NbPlNouveau++;
			}
			elseif($p->etat==2){
				$NbPlValide++;
			}
			elseif($p->etat==3){
				$NbPlRejete++;
			}
			elseif($p->etat==4){
				$NbPlRejete++;
			}
			
			
			if ($facture->etat==1){
				$NbAttente++;
				$ConsoAttente=$ConsoAttente+$facture->Montant_net;
			}
			elseif($facture->etat==2){
				$ConsoAPayer=$ConsoAPayer+$facture->Montant_net;
				$NbAPayer++;
			}
			elseif($facture->etat==3){
				$ConsoRejete=$ConsoRejete+$facture->Montant_net;
				$NbRejete++;
			}
			elseif($facture->etat==4){
				$NbAttente++;
				$ConsoAttente=$ConsoAttente+$facture->Montant_net;
			}
			
			/*
			if ($BT_MT_EAU=='MT'){
				$a->where_related_facturemt('id',$facture->id)->get();
			}		
			elseif ($BT_MT_EAU=='BT'){
				$a->where_related_facturebt('id',$facture->id)->get();
			}
			else{
				$a->where_related_factureeau('id',$facture->id)->get();
			}*/
			
		}
		
		$ConsoAPayer = number_format ($ConsoAPayer,0 ,'.' ,' ');
		$ConsoAttente = number_format ($ConsoAttente,0 ,'.' ,' ');
		$ConsoRejete = number_format ($ConsoRejete,0 ,'.' ,' ');
		
		//Comptage des alertes actives
		$a=new Alerte();
		$a->where('etat',3);
		$a->where('Anomalie',false);
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		if ($periode_mensuelle!='bilan'){
			$a->where_related_menumensuel('periode',$periode_mensuelle);
		}
		$a->get();

		foreach($a->all as $alerte){
			$NbAlerteActive++;			
		}
		
		//Comptage des alertes en attente
		$a=new Alerte();
		$a->where('etat',2);
		$a->where('Anomalie',false);
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		if ($periode_mensuelle!='bilan'){
			$a->where_related_menumensuel('periode',$periode_mensuelle);
		}
		
		$a->get();

		foreach($a->all as $alerte){
			$NbAlerteAttente++;			
		}
		
		//Comptage des anomalies en attente
		$a=new Alerte();
		$a->where('etat',2);
		$a->where('Anomalie',true);
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		if ($periode_mensuelle!='bilan'){
			$a->where_related_menumensuel('periode',$periode_mensuelle);
		}
		
		$a->get();

		foreach($a->all as $alerte){
			$NbAnomalieActive++;			
		}
		
		$answ['NbPlNouveau'] = $NbPlNouveau.' PL';
		$answ['NbPlValide'] = $NbPlValide.' PL';
		$answ['NbPlRejete'] = $NbPlRejete.' PL';
		
		$answ['ConsoAPayer'] = $ConsoAPayer.' CFA';
		$answ['NbAPayer'] = $NbAPayer.' Factures';
		$answ['ConsoAttente'] = $ConsoAttente.' CFA';
		$answ['NbAttente'] = $NbAttente.' Factures';
		$answ['ConsoRejete'] = $ConsoRejete.' CFA';
		$answ['NbRejete'] = $NbRejete.' Factures';
		
		$answ['NbAlerteActive'] = $NbAlerteActive.' Alertes Actives';
		$answ['NbAlerteAttente'] = $NbAlerteAttente.' Alertes En Attente';
		$answ['NbAnomalieActive'] = $NbAnomalieActive.' Anomalies En Attente';
		
		$answer['data'][]=$answ;
		
		$answer['size'] = count($answer['data']);
		
		
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
