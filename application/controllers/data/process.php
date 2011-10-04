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
	
}
