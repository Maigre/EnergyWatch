<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Process extends CI_Controller {


	public function menumensuel(){
		$BT_MT_EAU=$this->input->post('BT_MT_EAU');
		//Initialize answer array
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
				); 
				
		
		$m=new Menumensuel();
		$m->where('Tension',$BT_MT_EAU)->order_by('periode')->get();
		$mois = array('01'=>'Janvier', '02'=>'Février', '03'=>'Mars', '04'=>'Avril', '05'=>'Mai', '06'=>'Juin', '07'=>'Juillet', '08'=>'Août', '09'=>'Septembre', 10=>'Octobre', 11=>'Novembre', 12=>'Décembre');
		foreach($m->all as $itemmenu){
			$arrayperiode=explode('-',$itemmenu->periode);
			//$strtotimeperiode=strtotime($itemmenu->periode);
			$answer['data'][] = $mois[$arrayperiode[1]].' '.$arrayperiode[0];
		}
		if (isset($answer['data'])){
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
	
	public function count_todelete($periode,$tension){
		//Periode stockée par SQL sous format date Y-m-d 
		$periode=urldecode($periode);
		$mois = array('Janvier'=>'01', 'Février'=>'02', 'Mars'=>'03', 'Avril'=>'04', 'Mai'=>'05', 'Juin'=>'06', 'Juillet'=>'07', 'Août'=>'08', 'Septembre'=>'09', 'Octobre'=>10, 'Novembre'=>11, 'Décembre'=>12);
		$arrayperiode=explode(' ',$periode); 
		$periode=$arrayperiode[1].'-'.$mois[$arrayperiode[0]].'-01';
		
		//Supression dans l'ordre : alerte , facture , menumensuel
		$m = new Menumensuel();
		$m->where('Tension',$tension)->where('Periode',$periode)->get();
		
		if ($tension=='MT'){
			$f = new Facturemt();
			
		}
		elseif($tension=='BT'){
			$f = new Facturebt();

		}
		else{
			$f = new Factureeau();

		}
		
		$answer['count']=$f->where_related_menumensuel('id',$m->id)->count();
		$answer['success']=true;
		echo json_encode($answer);
		die;
	
	}
	
	public function deleteperiode($periode,$tension){
		$decoupage=30;
		//Periode stockée par SQL sous format date Y-m-d 
		$periode=urldecode($periode);
		$mois = array('Janvier'=>'01', 'Février'=>'02', 'Mars'=>'03', 'Avril'=>'04', 'Mai'=>'05', 'Juin'=>'06', 'Juillet'=>'07', 'Août'=>'08', 'Septembre'=>'09', 'Octobre'=>10, 'Novembre'=>11, 'Décembre'=>12);
		$arrayperiode=explode(' ',$periode); 
		$periode=$arrayperiode[1].'-'.$mois[$arrayperiode[0]].'-01';
		
		//Supression dans l'ordre : alerte , facture , menumensuel
		$m = new Menumensuel();
		$m->where('Tension',$tension)->where('Periode',$periode)->get();
		
		if ($tension=='MT'){
			$f_count = new Facturemt();
			$totalcount=$f_count->where_related_menumensuel('id',$m->id)->count();
			$f = new Facturemt();
			$f->where_related_menumensuel('id',$m->id)->get(10,0);
			foreach($f->all as $facture){
				$al=new Alerte();
				$al->where_related_facturemt('id',$facture->id)->get();
				$al->delete_all();
			}
		}
		elseif($tension=='BT'){
			$f_count = new Facturebt();
			$totalcount=$f_count->where_related_menumensuel('id',$m->id)->count();
			$f = new Facturebt();
			$f->where_related_menumensuel('id',$m->id)->get(10,0);
			foreach($f->all as $facture){
				$al=new Alerte();
				$al->where_related_facturebt('id',$facture->id)->get();
				$al->delete_all();
			}
		}
		else{
			$f_count = new Factureeau();
			$totalcount=$f_count->where_related_menumensuel('id',$m->id)->count();
			$f = new Factureeau();
			$f->where_related_menumensuel('id',$m->id)->get(10,0);
			foreach($f->all as $facture){
				$al=new Alerte();
				$al->where_related_factureeau('id',$facture->id)->get();
				$al->delete_all();
			}
		}
		$f->delete_all();
		if ($totalcount>$decoupage){
			$answer['info']='continue';
		}
		else{
			$m->delete();
		}
		$answer['totalrestant']=$totalcount;
		$answer['success']=true;
		echo json_encode($answer);
		die();
		
	}	
}
