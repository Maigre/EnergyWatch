<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MenuMensuelControl extends CI_Controller {

	public function index()
	{

	}
	
	public function loadall($BT_MT_EAU)
	{
		$m = new MenuMensuel();
		$m->where('Tension',$BT_MT_EAU)->get();
		
		foreach($m->all as $menumensuel){
			setlocale (LC_TIME, 'fr_FR.utf8','fra');
			$answ['id'] = $menumensuel->id;
			$date = strftime( "%B %Y" , strtotime( $menumensuel->periode ) );
			$answ['periode'] = $date;
			$answer['data'][] = $answ; 
		}
		
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














