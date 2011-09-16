<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {

	
	var $field1='Nom_prenom';
	var $field2='Point_de_livraison';
	var $modelsearched='pl';
	var $modellinked=''; //exemple: 'famille'
	var $fieldlinked='id';  //json answer renvoie le champ 'todisplay' et '$modellinked.$fieldlinked'
	
	public function index()
	{

	}

	public function sc()
	{
		//Constantes
		$m=$this->modelsearched;
		$f1=$this->field1;
		$f2=$this->field2;
		//DATAMAPPER CONSTRUCTING
		
		$this->load->model($m,'mod');
			
		
		function strongMe($matches) {return '<strong>'.$matches[0].'</strong>';}

		function sign($sign)
		{
			if (in_array($sign,array('<','<=','=','>=','>','<>','!='))) return $sign;
			else return '=';
		}
		
		//initialize answer array TODO(should be an array design to be JSON encoded)
		$answer = array(
					'size' 	=> 0,
					'msg'	=> ''
				); 

		//initialize recieved vars from POST
		$vars = array(
			'text_search' 	=> 	''
		
		);
		
		//retrieve search argument from POST and sanitize (may be use CI methods to santize ?)
		foreach($vars as $k=>$v) if ($this->input->post($k)) $vars[$k] = utf8_encode(trim(mysql_real_escape_string($this->input->post($k))));


		//SELECT		
		$this->mod->select('id, Tension,'.$f1.', '.$f2);

		//mysql_query('set names utf8'); 
		

		//strart 1st WHERE
		$where = "("; 	
		
		//SPLIT SPACE NAME SEARCH :
		if ($vars['text_search'] == '') $src = array(0 => '.'); 
		else $src = explode(' ',$vars['text_search']);

		foreach($src as $i=>$sr)
		{
			if ($i >0) $where  .= " AND";
			$sr = str_replace("\'","[\'’]",$sr);
			$sr = str_replace("’","[\'’]",$sr);
			$where.=" (".$f1." REGEXP '".$sr."') ";
			if ($f2!=''){
				$where.= "OR (".$f2." REGEXP '".$sr."') ";
			}
		}
		///////////////////////////
		
		//MERGED SPACE NAME SEARCH
		$src2 = str_replace(' ','',$vars['text_search']);
		$src2 = str_replace("\'","[\'’]",$src2);
		$src2 = str_replace("’","[\'’]",$src2);
		if ($src2 != '') $where.=" OR (".$f1." REGEXP '".$src2."' ) ";
		if ($f2 != '') $where.="OR (".$f2." REGEXP '".$src2."') ";
		///////////////////////////
		
		$where .= " )";	//end 1st WHERE

		/*
		//EXEMPLE USING AND & REGEXP
		if ($vars['CP'] != '') 
		{
			if (strlen($vars['CP']) == 1) $req .= " AND Adresse4_CP REGEXP '^(0?)".$vars['CP']."'";
			else $req .= " AND Adresse4_CP REGEXP '^".$vars['CP']."'";
		}

		//EXEMPLE USING AND & =
		if (isset($vars['idOrigineContact']))
			$req .= " AND (Contact.idOrigineContact = '".$vars['idOrigineContact']."')";
	
		//EXEMPLE USING SIGN
		if ((isset($vars['ListDebutAbo']))&&(isset($vars['ListDebutAboSign'])))
			$req .= " AND (Abonnement.NoDebut ".sign($vars['ListDebutAboSign'])." '".$vars['ListDebutAbo']."')";
		*/
		
		//APPLY WHERE
		$this->mod->where($where);
		
		//PRE ORDER
		$this->mod->order_by($f1,'asc');

		//LOAD !
		$this->mod->get();

		//ORDER RESULTS
		$ansT = null;
		foreach($this->mod->all as $p)
		{
			//BUILD RANK BASED ON nom/prenom OR prenom/nom
			if ($vars['text_search'] != '')
			{
				$src = str_replace(' ','',$vars['text_search']);
				$p1 = min(stripos(str_replace(' ','',$p->$f1.$p->$f2),$src),stripos(str_replace(' ','',$p->$f1.$p->$f2),$src)); 
				if ($p1 === false) $p1 = 100;
			}
			else $p1 = 0;
			
			//STORE INTO sorted array
			$ansT[$p1][$p->$f1.$p->$f2.$p->id] = $p;
			
		}
		
		//PROCESS SORTED ARRAY
		if (is_array($ansT)) 
		{
			ksort($ansT); //sort by Rank			
			foreach($ansT as $rank=>$list) //foreach rank value
			{
				ksort($list); //sort by nom.prenom.id
				$lastpl='';
				foreach($list as $p) 
				{
					
					
					$answ = null;
					
					$answ[$f1] = $p->$f1;
					$answ[$f2] = $p->$f2;
					$answ['id'] = $p->id;
					$answ['tension'] = $p->Tension;
					
					
					if ($this->modellinked!=''){
						$link=$this->modellinked; 
						$flink=$this->fieldlinked;
						$p->$link->get();
						$answ['id'.$link] = $p->$link->$fieldlinked;
					}

					
					//strong up identified piece of string
					if ($vars['text_search'] != '')
					{
						
						
						//////////////////////////////////Template to display
						
						
						$answ['todisplay']= $answ[$f1];
						if ($f2!=''){
							$answ['todisplay'].='  '.$answ[$f2];
						}
						
						///////////////////////////////////
						//$answ['todisplay'] = preg_replace_callback("/".$vars['text_search']."/i",'strongMe',$answ[$f1]);
						//$answ['todisplay'] .= ' '.preg_replace_callback("/".$vars['text_search']."/i",'strongMe',$answ[$f2]);
					}
					
					//return ARRAY without duplicates
					if ($lastpl!=$answ[$f1]){
						$answer['data'][] = $answ;
					}
					$lastpl= $p->$f1;
					
				}
			}
			$answer['size'] = count($answer['data']);
		}
		else 
		{
			//JSON ERROR
			$answer['size'] = 0;
			$answer['msg'] = 'aucun resultat...';
		}
		//RETURN JSON !
		/*$this->output
				->set_content_type('application/json')
				->set_output(json_encode($answer));*/
		echo json_encode($answer);
	}
}
