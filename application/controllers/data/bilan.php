<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bilan extends CI_Controller {


	public function load(){
		$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		
		$array_periode=explode(' ',$this->input->post('periode_mensuelle'));
		
		$tableau_mois=array('Janvier'=>'01','Février'=>'02','Mars'=>'03','Avril'=>'04','Mai'=>'05','Juin'=>'06','Juillet'=>'07','Aout'=>'08','Septembre'=>'09','Octobre'=>'10','Novembre'=>'11','Décembre'=>'12');
		$mois= $tableau_mois[$array_periode[0]];
		$periode_mensuelle=$array_periode[1].'-'.$mois.'-01';
		
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
		
		$f->where_related_menumensuel('Tension',$BT_MT_EAU);
		$f->where_related_menumensuel('periode',$periode_mensuelle);
		
		$f->get();
		$ConsoAPayer=0;
		$NbAPayer=0;
		$ConsoAttente=0;
		$NbAttente=0;
		$ConsoRejete=0;
		$NbRejete=0;
		$NbAlerteActive=0;
		foreach($f->all as $facture){
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
		//Comptage des alertes actives
		$a=new Alerte();
		$a->where('etat',3);
		$a->where_related_menumensuel('Tension',$BT_MT_EAU);
		$a->where_related_menumensuel('periode',$periode_mensuelle);
		$a->get();
		$NbAlerteActive=count($a->all);
		
		$answ['ConsoAPayer'] = $ConsoAPayer.' CFA';
		$answ['NbAPayer'] = $NbAPayer.' Factures';
		$answ['ConsoAttente'] = $ConsoAttente.' CFA';
		$answ['NbAttente'] = $NbAttente.' Factures';
		$answ['ConsoRejete'] = $ConsoRejete.' CFA';
		$answ['NbRejete'] = $NbRejete.' Factures';
		$answ['NbAlerteActive'] = $NbAlerteActive.' Factures';
		
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
