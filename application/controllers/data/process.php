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
		$m->where('Tension',$BT_MT_EAU)->get();
		
		foreach($m->all as $itemmenu){
			$answer['data'][] = $itemmenu->periode;
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
