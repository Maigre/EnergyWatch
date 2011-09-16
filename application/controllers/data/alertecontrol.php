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
		$fieldArray=array('id','idAlerteParent','Date','Etat','Alerte','Commentaire','Flux');
		
		//foreach($p->all as $pl){
		foreach($fieldArray as $field){
			$answ[$field]=$a->$field;
		}
		$answer['data'][] = $answ;
		//}
		$answer['size'] = count($answer['data']);
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
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
