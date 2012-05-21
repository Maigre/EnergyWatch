<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Synchro extends CI_Controller {


	public function synch(){
		$DB1 = $this->load->database('default', TRUE);
		$DB_tomerge = $this->load->database('tomerge', TRUE);
		
		$where= "etat > 1";
		
		$query = $DB_tomerge->where($where)->get('pls');
		
		$to_merge=array();
		foreach ($query->result() as $row){
			$to_merge[]=array(
		    		'Point_de_livraison' => $row->Point_de_livraison,
		    		'Tension'	=> $row->Tension,
		    		'etat'		=> $row->etat
		    	);
		} 
		
		foreach ($to_merge as $pl_tomerge){
			//Mise à jour de l'état du pl
			$DB1 = $this->load->database('default', TRUE);

			$where= "Point_de_livraison = '".$pl_tomerge['Point_de_livraison']."'";
			
			
			$DB1->where($where)->update('pls', $pl_tomerge);	
			
			$query=$DB1->where($where)->get('pls');
			
			foreach ($query->result() as $pl){
				$etat=array('etat'=> $pl_tomerge['etat']);
				//Mise à jour de l'état de la facture
				//Récupère l'id des factures associées au pl
				if($pl->Tension=='MT'){
					$query2=$DB1->where('pl_id',$pl->id)->get('facturemts_pls');
				}
				else{
					$query2=$DB1->where('pl_id',$pl->id)->get('facturebts_pls');
				}
				foreach ($query2->result() as $facture){
					//print_r($facture);
					if($pl->Tension=='MT'){
						$DB1 = $this->load->database('default', TRUE);
						$this->db->where('id',$facture->facturemt_id);
						$this->db->update('facturemts',$etat);
						echo 'ok ';
					}
					else{
						$DB1 = $this->load->database('default', TRUE);
						$DB1->where('id',$facture->facturebt_id)->update('facturebts',$etat);
					}
				}
			}			
		}
		echo ('Synchronisation effectu&eacutee');
	}
}
