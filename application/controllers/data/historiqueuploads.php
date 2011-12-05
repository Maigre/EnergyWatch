<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Historiqueuploads extends CI_Controller {

	
	/*var $field1='id';
	var $field2='Point_de_livraison';
	var $modelsearched='plmt';
	var $modellinked=''; //exemple: 'famille'
	var $fieldlinked='id';  //json answer renvoie le champ 'todisplay' et '$modellinked.$fieldlinked'
	*/
	public function index()
	{

	}

	public function load()
	{

		//DATAMAPPER CONSTRUCTING
		$this->load->model('historiqueupload','histo');
		$h = $this->histo;
		$h->get();
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
				); 
					
		//Populate the data
		$answ = null;
		$fieldArray=array('id', 'nom_fichier','date_creation');
		
		foreach($h->all as $upl){
			foreach($fieldArray as $field){
				$answ[$field]=$upl->$field;
			}
			$answer['data'][] = $answ;
		}
		if (isset($answer['data'])){
			$answer['size'] = count($answer['data']);
		}
		
		
		if ($answer['size'] == 0){
			$answer['msg'] = 'aucun resultat...';
		}
		//RETURN JSON !
		echo json_encode($answer);
	}
}
