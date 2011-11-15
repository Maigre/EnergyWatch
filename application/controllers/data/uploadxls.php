<?php

//require_once ("progressbar.php");

class Uploadxls extends CI_Controller {

var $fields='';
var $file_name;
var $destination='./uploads/';  //repertoire de sauvegarde des fichiers importer
var $nombres_lignes;
var $nombres_colonnes;	
var $nombres_requetes;
var $msg_error;
var $periode_pour_menu;
var $decoupage=20;  //lors de l'import le fichier est decoupe en plusieurs parties de '$decoupage' lignes
	
	
	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
	}
/*
	function index()
	{
		$this->viewlib->view('upload_form', array('error' => ' ' ));
	}
*/
	function do_upload($table,$periode)
	{
		$this->periode_pour_menu=$periode."-01";
		
		if ($table=='conso_mts'){
			$this->fields='(id, No_de_facture, Tarif, Puisance_souscrite, Coefficient_PA, Conso_PA, Ancien_Index_Pointe, Nouvel_Index_Pointe, Conso_Pointe, Montant_HT_Pointe, Contribution_Speciale_Pointe, Montant_Net_Pointe, Ancien_Index_Hors_Pointe, Nouvel_Index_Hors_Pointe, Conso_Hors_Pointe, Montant_HT_Hors_Pointe, Contribution_Speciale_Hors_Pointe, Montant_Net_Hors_Pointe, Ancien_Index_Reactif, Nouvel_Index_Reactif, Conso_Energie_Reactive, Montant_prime_HT, Montant_Prime_TTC, Ancien_Index_Pertes_Cuivre, Nouvel_Index_Pertes_Cuivre, Conso_Pertes_Cuivre, Contribution_Speciale_Pertes_Cuivre, Montant_HT_Pertes_Cuivre, Montant_Net_Pertes_Cuivre, Ancien_Index_Pertes_fer, Nouvel_Index_Pertes_Fer, Conso_Pertes_Fer, Montant_HT_Pertes_Fer, Contribution_Speciale_Pertes_Fer, Montant_Net_Pertes_Fer, Conso_Depassement_PS, Montant_HT_Penalite_Depassement_PS, Montant_Net_Penalite_Depassement_PS, Cosinus_phi, Montant_HT_Cosinus_PHI, Montant_Net_Cosinus_PHI, MT_REDEVANCE_HT, Montant_net, Date_index, Nb_jours)';
		}
		else $this->fields='(id,No_client,No_personne,No_de_facture,Nature,Categorie_client,Code_tarif,No_compteur,No_police,Point_de_livraison,Puisance_souscrite,Nom_prenom,Adresse,Localisation,Code_Activite,Ancien_index,Nouvel_index,Consommation_mensuelle,Redevance,Contribution_Speciale,Montant_PF,Montant_HT,Montant_tva,Montant_net,Date_index,Date_abonnement,Nb_jours)';
		
		$config['upload_path'] = './uploads/'; //repertoire enregistrement du fichier
		$config['allowed_types'] = 'xls';      //format fichier 
		$config['max_size']	= '10000';
		$this->load->library('upload', $config);
		
		//print_r($_FILES);
		$this->file_name='';
		if ( ! $this->upload->do_upload('file'))
		{
			$answer['error'] = $this->upload->display_errors();
			$answer['success'] = false;
			
			echo json_encode ($answer);
		}
		else
		{
			//enleve les white spaces du nom
			$this->file_name = preg_replace("/\s+/", "_", $_FILES['file']['name']);
			//parse le fichier excel
			$this->parseExcel('./uploads/'.$this->file_name, $table);
			/*
			if($this->xls_to_db($this->file_name, $table)){
				//enregistrement dans l'historique des uploads
				$this->historique_upload($this->file_name);
				$answer['success'] = true;
			}*/
		}
		/*$answer['file']=utf8_encode($this->file_name);
		$answer['queries']=$this->nombres_requetes;
		if ($this->msg_error!='') $answer['error']=utf8_encode($this->msg_error);
		echo json_encode($answer); */	
	}
	
	function xls_to_db()//$table,$periode)
	{
	 	
	 	
	 	
	 	//$this->nombres_requetes=0;
	 	$u= new Uploadprocess();
	 	$u->get();
	 	
	 	$table=$u->table_mt_bt_eau;
	 	$periode=$u->periode;
	 	$this->periode_pour_menu=$periode;
	 	
	 	$prod=unserialize($u->factures); 
	 	//ici on prend la premiere ligne de la table upload process qui contient plusieurs factures (en fonction de $decoupage, initialement fixée à 50 factures). 
	 	//Elle sera effacée à la fin. on prendra ensuite la suivante, etc..
	 	
	 	
	 	if (is_array($prod)){
	 		

	//******Sauvegarde sql des objets facture et pl
			$requete_sql='';
			for ($i = 1; $i < (count($prod)); $i++) {
			
							
	//Creation de l'objet pl : $p
		 		$p= new Pl();
		 		$PL=substr($prod[$i][8], 1, -1);
		 		$p->where('Point_de_livraison',$PL);
		 		$p->get();
		 		if (empty($p->id)){
		 			//Nouveau PL détecté 
		 			$p->etat=1;
		 		}
		 		//Remplissage des champs du Pl
		 		$p->No_client=substr($prod[$i][0], 1, -1);
		 		$p->No_personne=substr($prod[$i][1], 1, -1);
		 		$p->Nature=substr($prod[$i][3], 1, -1);
		 		$p->Categorie_client=substr($prod[$i][4], 1, -1);
		 		$p->No_compteur=substr($prod[$i][6], 1, -1);
		 		$p->No_police=substr($prod[$i][7], 1, -1);
		 		$p->Point_de_livraison=substr($prod[$i][8], 1, -1);
		 		$p->Nom_prenom=substr($prod[$i][10], 1, -1);
		 		$p->Adresse=substr($prod[$i][11], 1, -1);
		 		$p->Localisation=substr($prod[$i][12], 1, -1);
		 		$p->Code_Activite=substr($prod[$i][13], 1, -1);
		 		if ($table=='conso_bts'){
		 			$p->Tension='BT';
			 		$p->Date_abonnement=substr($prod[$i][24], 1, -1);
		 		}
		 		else {
		 			$p->Tension='MT';
			 		$p->Date_abonnement=substr($prod[$i][53], 1, -1);
		 		}
		 		$p->save();
	
	//Creation de l'objet facture : $f	 		
		 		if ($table=='conso_mts'){
		//MT
		 			$f= new Facturemt();
			 		$nofacture=substr($prod[$i][2], 1, -1);
			 		$f->where('No_de_facture',$nofacture);
			 		$f->where_related_pl('Point_de_livraison',$PL);
			 		$f->get();
			 		
		 			//Remplissage des champs de la facture
		 			$f->No_de_facture=substr($prod[$i][2], 1, -1);
			 		$f->Tarif=substr($prod[$i][5], 1, -1);
			 		$f->Puisance_souscrite=substr($prod[$i][9], 1, -1);
			 		$f->Coefficient_PA=substr($prod[$i][14], 1, -1);
			 		$f->Conso_PA=substr($prod[$i][15], 1, -1);
			 		$f->Ancien_Index_Pointe=substr($prod[$i][16], 1, -1);
			 		$f->Nouvel_Index_Pointe=substr($prod[$i][17], 1, -1);
			 		$f->Conso_Pointe=substr($prod[$i][18], 1, -1);
			 		$f->Montant_HT_Pointe=substr($prod[$i][19], 1, -1);
			 		$f->Contribution_Speciale_Pointe=substr($prod[$i][20], 1, -1);
			 		$f->Montant_Net_Pointe=substr($prod[$i][21], 1, -1);
			 		$f->Ancien_Index_Hors_Pointe=substr($prod[$i][22], 1, -1);
			 		$f->Nouvel_Index_Hors_Pointe=substr($prod[$i][23], 1, -1);
			 		$f->Conso_Hors_Pointe=substr($prod[$i][24], 1, -1);
			 		$f->Montant_HT_Hors_Pointe=substr($prod[$i][25], 1, -1);
			 		$f->Contribution_Speciale_Hors_Pointe=substr($prod[$i][26], 1, -1);
			 		$f->Montant_Net_Hors_Pointe=substr($prod[$i][27], 1, -1);
			 		$f->Ancien_Index_Reactif=substr($prod[$i][28], 1, -1);
			 		$f->Nouvel_Index_Reactif=substr($prod[$i][29], 1, -1);
			 		$f->Conso_Energie_Reactive=substr($prod[$i][30], 1, -1);
			 		$f->Montant_prime_HT=substr($prod[$i][31], 1, -1);
			 		$f->Montant_Prime_TTC=substr($prod[$i][32], 1, -1);
			 		$f->Ancien_Index_Pertes_Cuivre=substr($prod[$i][33], 1, -1);
			 		$f->Nouvel_Index_Pertes_Cuivre=substr($prod[$i][34], 1, -1);
			 		$f->Conso_Pertes_Cuivre=substr($prod[$i][35], 1, -1);
			 		$f->Contribution_Speciale_Pertes_Cuivre=substr($prod[$i][36], 1, -1);
			 		$f->Montant_HT_Pertes_Cuivre=substr($prod[$i][37], 1, -1);
			 		$f->Montant_Net_Pertes_Cuivre=substr($prod[$i][38], 1, -1);
			 		$f->Ancien_Index_Pertes_fer=substr($prod[$i][39], 1, -1);
			 		$f->Nouvel_Index_Pertes_Fer=substr($prod[$i][40], 1, -1);
			 		$f->Conso_Pertes_Fer=substr($prod[$i][41], 1, -1);
			 		$f->Montant_HT_Pertes_Fer=substr($prod[$i][42], 1, -1);
			 		$f->Contribution_Speciale_Pertes_Fer=substr($prod[$i][43], 1, -1);
			 		$f->Montant_Net_Pertes_Fer=substr($prod[$i][44], 1, -1);
			 		$f->Conso_Depassement_PS=substr($prod[$i][45], 1, -1);
			 		$f->Montant_HT_Penalite_Depassement_PS=substr($prod[$i][46], 1, -1);
			 		$f->Montant_Net_Penalite_Depassement_PS=substr($prod[$i][47], 1, -1);
			 		$f->Cosinus_phi=substr($prod[$i][48], 1, -1);
			 		$f->Montant_HT_Cosinus_PHI=substr($prod[$i][49], 1, -1);
			 		$f->Montant_Net_Cosinus_PHI=substr($prod[$i][50], 1, -1);
			 		$f->MT_REDEVANCE_HT=substr($prod[$i][51], 1, -1);
			 		$f->Montant_net=substr($prod[$i][52], 1, -1);
			 		$f->Date_index=substr($prod[$i][53], 1, -1);
			 		$f->Nb_jours=substr($prod[$i][55], 1, -1);
		 		}
		 		else{
		 			if (substr($p->No_compteur,0,1)=='E'){
		 	//BT
		 				$tension='BT';
		 				$f= new Facturebt();
		 			}
		 			else{
		 	//EAU
		 				$tension='EAU';
		 				$f= new Factureeau();
		 			}
		 			
			 		$nofacture=substr($prod[$i][2], 1, -1);
			 		$f->where('No_de_facture',$nofacture);
			 		$f->where_related_pl('Point_de_livraison',$PL);
			 		$f->get();
			 		
		 			//Remplissage des champs de la facture
		 			$f->No_de_facture=substr($prod[$i][2], 1, -1);
			 		$f->Code_tarif=substr($prod[$i][5], 1, -1);
			 		$f->Puisance_souscrite=substr($prod[$i][9], 1, -1);
			 		$f->Ancien_index=substr($prod[$i][14], 1, -1);
			 		$f->Nouvel_index=substr($prod[$i][15], 1, -1);
			 		$f->Consommation_mensuelle=substr($prod[$i][16], 1, -1);
			 		$f->Redevance=substr($prod[$i][17], 1, -1);
			 		$f->Contribution_Speciale=substr($prod[$i][18], 1, -1);
			 		$f->Montant_PF=substr($prod[$i][19], 1, -1);
			 		$f->Montant_HT=substr($prod[$i][20], 1, -1);
			 		$f->Montant_tva=substr($prod[$i][21], 1, -1);
			 		$f->Montant_net=substr($prod[$i][22], 1, -1);
			 		$f->Date_index=substr($prod[$i][23], 1, -1);
			 		$f->Nb_jours=substr($prod[$i][25], 1, -1);
		 		}
		 		
		 		if (empty($f->etat)){
		 			//ETAT de la facture nouveau, valide, non valide, non valide mais refacturé
		 			if($p->etat==3){
		 			//Pl non valide mais refacturé. Facture en attente de confirmation 
		 			$f->etat=4;
			 		}
			 		else{
			 			$f->etat=$p->etat;
			 		}
		 		}
		 	
		 	//creation de l'objet menumensuel
			 	$m= new Menumensuel();
			 	$m->where('periode',$this->periode_pour_menu);
			 	
			 	if ($table=='conso_bts'){
			 		if ($tension=='BT'){
	 					$m->where('Tension','BT')->get();
	 				}
	 				else{
	 					$m->where('Tension','EAU')->get();
	 				}
		 		}
		 		else {
		 			$m->where('Tension','MT')->get();
		 		}
			 	
			 	$m->periode=$this->periode_pour_menu;
			 	if ($table=='conso_bts'){
		 			if ($tension=='BT'){
	 					$m->Tension='BT';
	 				}
	 				else{
	 					$m->Tension='EAU';
	 				}
		 		}
		 		else {
		 			$m->Tension='MT';
		 		}
			 	$m->save();
			 	
		 		//Link Facture to Menumensuel & Pl
		 		$f->save(array($p,$m));
				
				$this->nombres_requetes++;
				//echo 'temps d execution sauvegarde'.$temp_sauvegarde;	
		
	//Creation des donnees pour les graphes	 		
		//Creation des donnes utilisables pour l'affichage des graphs de consommation mensuelle
		//Eclatement des factures par mois. Si une facture est à cheval sur deux mois, elle est 
		//découpée en deux.
		 		/*
		 		//Récuperer mois début et mois fin.
		 		$date_fin = date('Y-m-d',strtotime($f->Date_index));
		 		$date_debut= date('Y-m-d',strtotime("-".$f->Nb_jours."days", strtotime($date_fin)));
		 		
		 		$date_array_debut = explode("-",$date_debut); // split the array
				$month_debut = $date_array_debut[1];
				$annee_debut = $date_array_debut[0];
				
				$date_array_fin = explode("-",$date_fin); // split the array
				$month_fin = $date_array_fin[1];
				$annee_fin = $date_array_fin[0];
				//Tableaux des champs
				if ($table=='conso_bts'){
					$all_fields=array('id', 'No_de_facture', 'Code_tarif', 'Puisance_souscrite', 'Ancien_index', 'Nouvel_index', 'Consommation_mensuelle', 'Redevance', 'Contribution_Speciale', 'Montant_PF', 'Montant_HT', 'Montant_tva', 'Montant_net', 'Date_index', 'Nb_jours');
					$extensive_field=array('Consommation_mensuelle','Redevance','Contribution_Speciale','Montant_PF','Montant_HT','Montant_tva','Montant_net');
					$intensive_field=array('No_de_facture', 'Code_tarif', 'Puisance_souscrite');
				}
				elseif ($table=='conso_mts'){
					$all_fields=array('id', 'No_de_facture', 'Tarif', 'Puisance_souscrite', 'Coefficient_PA', 'Conso_PA', 'Ancien_Index_Pointe', 'Nouvel_Index_Pointe', 'Conso_Pointe', 'Montant_HT_Pointe', 'Contribution_Speciale_Pointe', 'Montant_Net_Pointe', 'Ancien_Index_Hors_Pointe', 'Nouvel_Index_Hors_Pointe', 'Conso_Hors_Pointe', 'Montant_HT_Hors_Pointe', 'Contribution_Speciale_Hors_Pointe', 'Montant_Net_Hors_Pointe', 'Ancien_Index_Reactif', 'Nouvel_Index_Reactif', 'Conso_Energie_Reactive', 'Montant_prime_HT', 'Montant_Prime_TTC', 'Ancien_Index_Pertes_Cuivre', 'Nouvel_Index_Pertes_Cuivre', 'Conso_Pertes_Cuivre', 'Contribution_Speciale_Pertes_Cuivre', 'Montant_HT_Pertes_Cuivre', 'Montant_Net_Pertes_Cuivre', 'Ancien_Index_Pertes_fer', 'Nouvel_Index_Pertes_Fer', 'Conso_Pertes_Fer', 'Montant_HT_Pertes_Fer', 'Contribution_Speciale_Pertes_Fer', 'Montant_Net_Pertes_Fer', 'Conso_Depassement_PS', 'Montant_HT_Penalite_Depassement_PS', 'Montant_Net_Penalite_Depassement_PS', 'Cosinus_phi', 'Montant_HT_Cosinus_PHI', 'Montant_Net_Cosinus_PHI', 'MT_REDEVANCE_HT', 'Montant_net', 'Date_index', 'Nb_jours');
					$extensive_field=array('Coefficient_PA', 'Conso_PA', 'Conso_Pointe', 'Montant_HT_Pointe', 'Contribution_Speciale_Pointe', 'Montant_Net_Pointe', 'Ancien_Index_Hors_Pointe', 'Nouvel_Index_Hors_Pointe', 'Conso_Hors_Pointe', 'Montant_HT_Hors_Pointe', 'Contribution_Speciale_Hors_Pointe', 'Montant_Net_Hors_Pointe', 'Ancien_Index_Reactif', 'Nouvel_Index_Reactif', 'Conso_Energie_Reactive', 'Montant_prime_HT', 'Montant_Prime_TTC', 'Ancien_Index_Pertes_Cuivre', 'Nouvel_Index_Pertes_Cuivre', 'Conso_Pertes_Cuivre', 'Contribution_Speciale_Pertes_Cuivre', 'Montant_HT_Pertes_Cuivre', 'Montant_Net_Pertes_Cuivre', 'Ancien_Index_Pertes_fer', 'Nouvel_Index_Pertes_Fer', 'Conso_Pertes_Fer', 'Montant_HT_Pertes_Fer', 'Contribution_Speciale_Pertes_Fer', 'Montant_Net_Pertes_Fer', 'Conso_Depassement_PS', 'Montant_HT_Penalite_Depassement_PS', 'Montant_Net_Penalite_Depassement_PS', 'Cosinus_phi', 'Montant_HT_Cosinus_PHI', 'Montant_Net_Cosinus_PHI', 'MT_REDEVANCE_HT', 'Montant_net');
					$intensive_field=array('No_de_facture', 'Tarif', 'Puisance_souscrite');
				}
				
				//$intensive_field = array_diff($extensive_field, $all_fields); 
				//print_r($intensive_field); die;
				//Enleve date_index de la liste car ne sera pas recopié à l'identique
				//$to_remove=array('Date_index');
				//$intensive_field = array_diff($intensive_field, $to_remove); 
	
		 		//Tester facture à cheval sur plusieurs mois.
		 		if ($annee_debut!=$annee_fin){
		 			$month_debut=$month_debut-($annee_fin-$annee_debut)*12;
		 		}

		 		while (($month_fin-$month_debut)>0){
					

		 			if ($table=='conso_bts'){
		 				if ($tension=='BT'){
		 					$d= new Donnees_conso_bt();
		 				}
		 				else{
		 					$d= new Donnees_conso_eau();
		 				}
		 			}
		 			else{
		 				$d= new Donnees_conso_mt();			
		 			}
		 			$wherearray=array('No_de_facture'=>$f->No_de_facture, 'Date_index'=>$date_debut);
			 		$d->where($wherearray);
			 		$d->where_related_pl('Point_de_livraison',$PL);
			 		$d->get();
			 		
			 		
		 			//$date_debut = date('Y-m-d',strtotime($date_debut));
		 			$d->Date_index=$date_debut;
		 			
		 			//Calcul nombre jour jusqu'à fin du mois
		 			$month_debut=$date_array_debut[1]+1;
		 			$annee_debut=$date_array_debut[0];
		 			if ($month_debut==13){
		 				$month_debut=1;
		 				$annee_debut=$date_array_debut[0]+1;
		 			} 
		 			$date_premier_du_mois_suivant=$annee_debut."-".$month_debut."-01";
		 			
		 			
		 			$d->Nb_jours=(strtotime($date_premier_du_mois_suivant)-strtotime($date_debut))/3600/24;
		 			//Calcul des valeurs extensives proportionnellement au nombre de jours.
		 			foreach ($extensive_field as $field){
		 				$d->$field=round(($f->$field)*($d->Nb_jours/$f->Nb_jours)*10000)/10000;
		 			}
		 			
		 			//Valeurs intensives identiques excepté Date_index
		 			
		 			foreach ($intensive_field as $field){
		 				$d->$field=$f->$field;
		 			}
		 			
		 			//Sauvegarde les donnees conso et les relie au PL
		 			//$d->save();
		 			$d->save($p);
		 			
		 			$date_debut=$date_premier_du_mois_suivant;
		 			$date_array_debut = explode("-",$date_debut); // split the array
		 		
		 		}
		 
		 		//Derniere partie de la facture, ou toute la facture si elle ne chevauchait pas deux mois.
		 		if ($month_fin==$month_debut){ 
		 			if ($table=='conso_bts'){
		 				if ($tension=='BT'){
		 					$d= new Donnees_conso_bt();
		 				}
		 				else{
		 					$d= new Donnees_conso_eau();
		 				}
		 			}
		 			else{
		 				$d= new Donnees_conso_mt();			
		 			}
		 			$wherearray=array('No_de_facture'=>$f->No_de_facture, 'Date_index'=>$date_debut);
			 		$d->where($wherearray);
			 		$d->where_related_pl('Point_de_livraison',$PL);
			 		$d->get();
			 		
		 			$date_debut = date('Y-m-d',strtotime($date_debut));
		 			$d->Date_index=$date_debut;

		 			//Calcul nombre jour jusqu'à la fin de la facture
		 			$d->Nb_jours=(strtotime($date_fin)-strtotime($date_debut))/3600/24;
		 			//Calcul des valeurs extensives proportionnellement au nombre de jours.
		 			foreach ($extensive_field as $field){
		 				if ($f->Nb_jours!=0){
			 				$d->$field=round(($f->$field)*($d->Nb_jours/$f->Nb_jours)*10000)/10000;	
		 				}
		 			}
		 			//Valeurs intensives identiques excepté Date_index
		 			
		 			foreach ($intensive_field as $field){
		 				$d->$field=$f->$field;
		 			}
		 			//Sauvegarde les donnees conso et les relie au PL
		 			//$d->save();
		 			$d->save($p);
		 		} 
		 		
		 		*/
		 		//$start_alerte=microtime(true);
				
	//******Creation des alertes
				
				if ($table=='conso_bts'){
	 				if ($tension=='BT'){
	 					$f_pl_all= new Facturebt();
	 				}
	 				else{
	 					$f_pl_all= new Factureeau();
	 				}
		 		}
		 		else{
	 				$f_pl_all= new Facturemt();			
		 		}
	 			$f_pl_all->where_related_pl('Point_de_livraison',$PL);
		 		$f_pl_all->get();
		 		//date en cours de la facture traitée
		 		
		 		$date_encours = strtotime($f->Date_index);
		 		//$date_encours = strtotime(date("Y-m-d", strtotime($date_encours)));
				
		 		/*foreach($f->all as $facture){
		 			$date_fin_facture=strtotime($facture->Date_index);
		 			if ($date_encours<$date_fin_facture) $date_encours=$date_fin_facture;
		 		}*/
		 		
		 		//$date_fin=date('Y-m-d',$date_encours);
		 		//$date_fin_array = explode("-",$date_fin); // split the array
				//$month_encours = $date_fin_array[1]; //month segment
				//$year_encours = $date_fin_array[0]; //year segment
				/*if ($month_encours=='02'){
					$date_encours=strtotime($year_encours.'-'.$month_encours.'-28');				
				}
				else{
					$date_encours=strtotime($year_encours.'-'.$month_encours.'-30');
				}*/
		 		
		 		$en_cours=array();
		 		$mois_precedent=array();
		 		$moyenne_annuelle=array();
		 		$mois_annee_precedente=array();
		 		
		 		
			//******Calcul des donnees necessaires pour generer les alertes
				//Parcours de toutes les factures du Pl pour chercher le mois precedent et faire la moyenne annuelle
				foreach($f_pl_all->all as $facture){
					$date_facture=strtotime($facture->Date_index);
					//$date_facture2=date('Y-n-d',$date_facture2);
			 		//$date_facture_array = explode("-",$date_facture2); // split the array
					//$year_facture = $date_facture_array[0]; //year segment
					//$month_facture = $date_facture_array[1]; //month segment
					if ($table=='conso_mts'){
						$facture->Consommation_mensuelle=$facture->Conso_Hors_Pointe+$facture->Conso_Pointe;
					}
					
					//mois en_cours
					if ($date_encours==$date_facture){ //facture en cours de traitement
						/*if (isset($en_cours['Nb_jours'])){
							$en_cours['Nb_jours']+=$c->Nb_jours;
						}
						else{
							$en_cours['Nb_jours']=$c->Nb_jours;
						}
						if (isset($en_cours['Consommation_mensuelle'])){
							$en_cours['Consommation_mensuelle']+=$c->Consommation_mensuelle;
						}
						else{
							$en_cours['Consommation_mensuelle']=$c->Consommation_mensuelle;
						}
						if (isset($en_cours['Montant_net'])){
							$en_cours['Montant_net']+=$c->Montant_net;
						}
						else{
							$en_cours['Montant_net']=$c->Montant_net;
						}*/
						$en_cours['Nb_jours']=$facture->Nb_jours;
						$en_cours['Consommation_mensuelle']=$facture->Consommation_mensuelle;
						//$en_cours['idFacture']=$facture->id;
						$en_cours['Puisance_souscrite']=$facture->Puisance_souscrite;

						if ($table=='conso_mts'){
							$en_cours['Conso_PA']=$facture->Conso_PA;
							$en_cours['Conso_Energie_Reactive']=$facture->Conso_Energie_Reactive;
							$en_cours['Ancien_Index_Pointe']=$facture->Ancien_Index_Pointe;
							$en_cours['Ancien_Index_Hors_Pointe']=$facture->Ancien_Index_Hors_Pointe;
						}
						else{
							$en_cours['Ancien_index']=$facture->Ancien_index;						
						}
					}
					//mois précédent
					elseif ((($date_encours-$date_facture)<45*24*3600) and (($date_encours-$date_facture)>15*24*3600)){
						/*if (isset($mois_precedent['Nb_jours'])){
							$mois_precedent['Nb_jours']+=$c->Nb_jours;
						}
						else{
							$mois_precedent['Nb_jours']=$c->Nb_jours;
						}
						if (isset($mois_precedent['Consommation_mensuelle'])){
							$mois_precedent['Consommation_mensuelle']+=$c->Consommation_mensuelle;
						}
						else{
							$mois_precedent['Consommation_mensuelle']=$c->Consommation_mensuelle;
						}
						if (isset($mois_precedent['Montant_net'])){
							$mois_precedent['Montant_net']+=$c->Montant_net;
						}
						else{
							$mois_precedent['Montant_net']=$c->Montant_net;
						}*/
						$mois_precedent['Nb_jours']=$facture->Nb_jours;
						$mois_precedent['Consommation_mensuelle']=$facture->Consommation_mensuelle;
						$mois_precedent['Puisance_souscrite']=$facture->Puisance_souscrite;
						if ($table=='conso_mts'){
							$mois_precedent['Conso_PA']=$facture->Conso_PA;
							$mois_precedent['Nouvel_Index_Hors_Pointe']=$facture->Nouvel_Index_Hors_Pointe;
							$mois_precedent['Nouvel_Index_Pointe']=$facture->Nouvel_Index_Pointe;
						}
						else{
							$mois_precedent['Nouvel_index']=$facture->Nouvel_index;
						}				
					}
					//même mois année précédente
					/*elseif ((($date_encours-$date_facture)>365*24*3600) and (($date_encours-$date_facture)<395*24*3600)){
						if (isset($moyenne_annuelle['Nb_jours'])){
							$mois_annee_precedente['Nb_jours']+=$c->Nb_jours;
						}
						else{
							$mois_annee_precedente['Nb_jours']=$c->Nb_jours;
						}
						if (isset($mois_annee_precedente['Consommation_mensuelle'])){
							$mois_annee_precedente['Consommation_mensuelle']+=$c->Consommation_mensuelle;
						}
						else{
							$mois_annee_precedente['Consommation_mensuelle']=$c->Consommation_mensuelle;
						}
						if (isset($mois_annee_precedente['Montant_net'])){
							$mois_annee_precedente['Montant_net']+=$c->Montant_net;
						}
						else{
							$mois_annee_precedente['Montant_net']=$c->Montant_net;
						}
					}*/
					//moyenne annuelle
					if (($date_encours-$date_facture)>365*24*3600){
						if (isset($moyenne_annuelle['Nb_jours'])){
							$moyenne_annuelle['Nb_jours']+=$facture->Nb_jours;
						}
						else{
							$moyenne_annuelle['Nb_jours']=$facture->Nb_jours;
						}
						if (isset($moyenne_annuelle['Consommation_mensuelle'])){
							$moyenne_annuelle['Consommation_mensuelle']+=$facture->Consommation_mensuelle;
						}
						else{
							$moyenne_annuelle['Consommation_mensuelle']=$facture->Consommation_mensuelle;
						}
						if (isset($moyenne_annuelle['Montant_net'])){
							$moyenne_annuelle['Montant_net']+=$facture->Montant_net;
						}
						else{
							$moyenne_annuelle['Montant_net']=$facture->Montant_net;
						}
					}
				}
				
			//extrapole les resultats pour avoir 30 jours/mois et 365/an
				//creation des donnees cout kWh
				if ((isset($en_cours['Nb_jours'])) and ($en_cours['Nb_jours']!=0)){
					if (isset($en_cours['Consommation_mensuelle']))$en_cours['Consommation_mensuelle']=$en_cours['Consommation_mensuelle']*30/$en_cours['Nb_jours'];
					
					//if (isset($en_cours['Montant_net']))$en_cours['Montant_net']=$en_cours['Montant_net']*30/$en_cours['Nb_jours'];
					//if ($en_cours['Consommation_mensuelle']!=0)$en_cours['Cout_kwh']=$en_cours['Montant_net']/$en_cours['Consommation_mensuelle'];
				}
				if ((isset($mois_precedent['Nb_jours'])) and ($mois_precedent['Nb_jours']!=0)){
					if (isset($mois_precedent['Consommation_mensuelle']))$mois_precedent['Consommation_mensuelle']=$mois_precedent['Consommation_mensuelle']*30/$mois_precedent['Nb_jours'];
					
					//if (isset($mois_precedent['Montant_net']))$mois_precedent['Montant_net']=$mois_precedent['Montant_net']*30/$mois_precedent['Nb_jours'];
					//if ($mois_precedent['Consommation_mensuelle']!=0)$mois_precedent['Cout_kwh']=$mois_precedent['Montant_net']/$mois_precedent['Consommation_mensuelle'];
				}
				/*
				if ((isset($mois_annee_precedente['Nb_jours'])) and ($mois_annee_precedente['Nb_jours']!=0)){
					if (isset($mois_annee_precedente['Consommation_mensuelle']))$mois_annee_precedente['Consommation_mensuelle']=$mois_annee_precedente['Consommation_mensuelle']*30/$mois_annee_precedente['Nb_jours'];
					if (isset($mois_annee_precedente['Montant_net']))$mois_annee_precedente['Montant_net']=$mois_annee_precedente['Montant_net']*30/$mois_annee_precedente['Nb_jours'];
					if ($mois_annee_precedente['Consommation_mensuelle']!=0)$mois_annee_precedente['Cout_kwh']=$mois_annee_precedente['Montant_net']/$mois_annee_precedente['Consommation_mensuelle'];
				}
				
				if ((isset($moyenne_annuelle['Montant_net'])) and (isset($moyenne_annuelle['Nb_jours'])) and ($moyenne_annuelle['Nb_jours']!=0)){
					$moyenne_annuelle['Consommation_mensuelle']=$moyenne_annuelle['Consommation_mensuelle']*365/$moyenne_annuelle['Nb_jours'];
				 	$moyenne_annuelle['Montant_net']=$moyenne_annuelle['Montant_net']*365/$moyenne_annuelle['Nb_jours'];
					if ($moyenne_annuelle['Consommation_mensuelle']!=0)$moyenne_annuelle['Cout_kwh']=$moyenne_annuelle['Montant_net']/$moyenne_annuelle['Consommation_mensuelle'];				 	
				} 
				*/
				
				
				$alerte_temp= null;
				$tableaumois = array("","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre");
				$mois = $tableaumois[date("n",$date_encours)].' '.date("Y",$date_encours);
				//Génère les alertes dans un tableau
				
				//type 1 : augmentation des consommations mensuelles (extrapolées à 30 jours)
				if ((isset($en_cours['Consommation_mensuelle'])) and (isset($mois_precedent['Consommation_mensuelle'])) and ($mois_precedent['Consommation_mensuelle']!=0)){
					if ($en_cours['Consommation_mensuelle']>(1.5*$mois_precedent['Consommation_mensuelle']))
					{
						$idFacture=$f->id;
						$valeur=round((($en_cours['Consommation_mensuelle']/$mois_precedent['Consommation_mensuelle'])-1)*100);
						//$Alerte='Au mois de '.$mois.' les consommations ont augmenté de '.$hausse.'% par rapport au mois précédent.';
						$Duree_validite = 1;
						$type_alerte=1;
						$flux='elec';
						$date=date('Y-m-d',$date_encours);
						
						$alerte=array(
							'idFacture'=>$idFacture,
							'Valeur'=>$valeur,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux,
							'Date'=>$date,
						);
						$alerte_temp[]=$alerte;
					}
				}
			/*
				if ((isset($en_cours['Consommation_mensuelle'])) and (isset($mois_annee_precedente['Consommation_mensuelle']))){
					if ($en_cours['Consommation_mensuelle']>(1.1*$mois_annee_precedente['Consommation_mensuelle']))
					{
						$hausse=round((($en_cours['Consommation_mensuelle']/$mois_annee_precedente['Consommation_mensuelle'])-1)*100);
						$Alerte='Au mois de '.$mois.' les consommations ont augmenté de '.$hausse.'% par rapport au même mois de l\'année précédente';
						$Duree_validite = 1;
						$type_alerte=1;
						$flux='elec';
						$alerte=array(
							'Alerte'=>$Alerte,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux
						);
						$alerte_temp[]=$alerte;
					}
				}
				if ((isset($en_cours['Consommation_mensuelle'])) and (isset($moyenne_annuelle['Consommation_mensuelle'])) and ($moyenne_annuelle['Consommation_mensuelle']!=0)){
					if ($en_cours['Consommation_mensuelle']>(1.1*$moyenne_annuelle['Consommation_mensuelle']))
					{
						$hausse=round((($en_cours['Consommation_mensuelle']/$moyenne_annuelle['Consommation_mensuelle'])-1)*100);
						$Alerte='Au mois de '.$mois.' les consommations ont augmenté de '.$hausse.'% par rapport à la moyenne annuelle';
						$Duree_validite = 1;
						$type_alerte=1;
						$flux='elec';
						$alerte=array(
							'Alerte'=>$Alerte,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux
						);
						$alerte_temp[]=$alerte;
					}
				}
				//type 2 : augmentation du cout du kWh
				if ((isset($en_cours['Cout_kwh'])) and (isset($mois_precedent['Cout_kwh'])) and ($mois_precedent['Cout_kwh']!=0)){
					if ($en_cours['Cout_kwh']>(1.1*$mois_precedent['Cout_kwh']))
					{
						$hausse=round((($en_cours['Cout_kwh']/$mois_precedent['Cout_kwh'])-1)*100);
						$Alerte='Au mois de '.$mois.' le coût du kWh a augmenté de '.$hausse.'% par rapport au mois précédent';
						$Duree_validite = 1;
						$type_alerte=2;
						$flux='elec';
						$alerte=array(
							'Alerte'=>$Alerte,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux
						);
						$alerte_temp[]=$alerte;
					}
				}
				if ((isset($en_cours['Cout_kwh'])) and (isset($mois_annee_precedente['Cout_kwh'])) and ($mois_annee_precedente['Cout_kwh']!=0)){
					if ($en_cours['Cout_kwh']>(1.1*$mois_annee_precedente['Cout_kwh']))
					{
						$hausse=round((($en_cours['Cout_kwh']/$mois_annee_precedente['Cout_kwh'])-1)*100);
						$Alerte='Au mois de '.$mois.' le coût du kWh a augmenté de '.$hausse.'% par rapport au même mois de l\'année précédente';
						$Duree_validite = 1;
						$type_alerte=2;
						$flux='elec';
						$alerte=array(
							'Alerte'=>$Alerte,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux
						);
						$alerte_temp[]=$alerte;
					}
				}
				if ((isset($en_cours['Cout_kwh'])) and (isset($moyenne_annuelle['Cout_kwh'])) and ($moyenne_annuelle['Cout_kwh']!=0)){
					if ($en_cours['Cout_kwh']>(1.1*$moyenne_annuelle['Cout_kwh']))
					{
						$hausse=round((($en_cours['Cout_kwh']/$moyenne_annuelle['Cout_kwh'])-1)*100);
						$Alerte='Au mois de '.$mois.' le coût du kWh a augmenté de '.$hausse.'% par rapport à la moyenne annuelle';
						$Duree_validite = 1;
						$type_alerte=2;
						$flux='elec';
						$alerte=array(
							'Alerte'=>$Alerte,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux
						);
						$alerte_temp[]=$alerte;
					}
				}
				
		*/		
				//type 4 : Modification de la puissance souscrite
				if ((isset($en_cours['Puisance_souscrite'])) and (isset($mois_precedent['Puisance_souscrite']))){
					if ($en_cours['Puisance_souscrite']!=$mois_precedent['Puisance_souscrite']){
						$idFacture=$f->id; 
						$valeur = round($en_cours['Puisance_souscrite']-$mois_precedent['Puisance_souscrite']);
						//$Alerte='Au mois de '.$mois.' la puissance souscrite a augmenté de '.$hausse.'kWh';
						$Duree_validite = 1;
						$type_alerte=4;
						$flux='elec';
						$date=date('Y-m-d',$date_encours);
						$alerte=array(
							'idFacture'=>$idFacture,
							'Valeur'=>$valeur,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux,
							'Date'=>$date,
						);
						$alerte_temp[]=$alerte;
					}
				}
				//type 6 : Dépassement de la puissance souscrite
				if ((isset($en_cours['Conso_PA']))){
					if (($en_cours['Conso_PA']> 1*$en_cours['Puisance_souscrite'])or($en_cours['Conso_PA']<0.90*$en_cours['Puisance_souscrite'])){
						$idFacture=$f->id;
						$valeur = round(100*($en_cours['Conso_PA']-$en_cours['Puisance_souscrite'])/$en_cours['Puisance_souscrite']);
						//$Alerte='Au mois de '.$mois.' la puissance appelée a dépassé de '.$hausse.'% la puissance souscrite.';
						$Duree_validite = 1;
						$type_alerte=6;
						$flux='elec';
						//$date= $mois;
						$date=date('Y-m-d',$date_encours);
						$alerte=array(
							'idFacture'=>$idFacture,
							'Valeur'=>$valeur,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux,
							'Date'=>$date,
						);
						$alerte_temp[]=$alerte;
					}
				}
				
				//type 7 : Double facturation pour un même PL
					$id_menumensuel_en_cours = $f->menumensuel->id;
			 		//recupere toutes les factures du PL
			 		$array_periode=null;
			 		$doublons=0;
			 		foreach($f_pl_all->all as $facture){
			 			$facture->menumensuel->get();
			 			$id_menumensuel=$facture->menumensuel->id;
			 			if ($id_menumensuel==$id_menumensuel_en_cours){
				 			$doublons++;
				 		}
			 		}
			 		if ($doublons>1){
			 			$idFacture=$f->id;
						//$Alerte='Au mois de '.$mois.' la puissance appelée a dépassé de '.$hausse.'% la puissance souscrite.';
						$valeur = $doublons;
						$Duree_validite = 1;
						$type_alerte=7;
						$flux='elec';
						//$date= $mois;
						$date=date('Y-m-d',$date_encours);
						$alerte=array(
							'Valeur'=>$valeur,
							'idFacture'=>$idFacture,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux,
							'Date'=>$date,
						);
						$alerte_temp[]=$alerte;
			 		}
				
				
				//type 8 : Facturation d'Energie reactive
				if (isset($en_cours['Conso_Energie_Reactive'])){
					if ($en_cours['Conso_Energie_Reactive']> 0){
						$idFacture=$f->id;
						$valeur = $en_cours['Conso_Energie_Reactive'];
						//$Alerte='Au mois de '.$mois.' la puissance appelée a dépassé de '.$hausse.'% la puissance souscrite.';
						$Duree_validite = 1;
						$type_alerte=8;
						$flux='elec';
						//$date= $mois;
						$date=date('Y-m-d',$date_encours);
						$alerte=array(
							'idFacture'=>$idFacture,
							'Valeur'=>$valeur,
							'Duree_validite'=>$Duree_validite,
							'type_alerte'=>$type_alerte,
							'flux'=>$flux,
							'Date'=>$date,
						);
						$alerte_temp[]=$alerte;
					}
				}
				
				//type 9 : Incohérence d'index
				if ($table=='conso_mts'){
					if ((isset($mois_precedent['Nouvel_Index_Pointe'])) and (isset($mois_precedent['Nouvel_Index_Hors_Pointe']))){
						if (($en_cours['Ancien_Index_Pointe']!=$mois_precedent['Nouvel_Index_Pointe']) or ($en_cours['Ancien_Index_Hors_Pointe']!=$mois_precedent['Nouvel_Index_Hors_Pointe'])){
							//echo 'AIP'.$en_cours['Ancien_Index_Pointe'].'NIP'.$mois_precedent['Nouvel_Index_Pointe'].'AIHP'.$en_cours['Ancien_Index_Hors_Pointe'].'NIHP'.$mois_precedent['Nouvel_Index_Hors_Pointe'];
							$alerte=array(
								'idFacture'=>$f->id,
								'Valeur'=> '',
								'Duree_validite'=>1,
								'type_alerte'=>9,
								'flux'=>'elec',
								'Date'=>date('Y-m-d',$date_encours)								
							);
							$alerte_temp[]=$alerte;
						}
					}
						
				}
				else{
					if (isset($mois_precedent['Nouvel_Index'])){
						if ($en_cours['Ancien_Index']!=$mois_precedent['Nouvel_Index']){
							$alerte=array(
								'idFacture'=>$f->id,
								'Valeur'=> '',
								'Duree_validite'=>1,
								'type_alerte'=>9,
								'flux'=>'elec',
								'Date'=>date('Y-m-d',$date_encours)
							);
							$alerte_temp[]=$alerte;
						}
					}
					
				}
				
				//type 10 : Consommations nulles
				if (isset($en_cours['Consommation_mensuelle'])){
					if ($en_cours['Consommation_mensuelle']==0)
					{
						$alerte=array(
							'idFacture'=>$f->id,
							'Valeur'=>'',
							'Duree_validite'=>1,
							'type_alerte'=>10,
							'flux'=>'elec',
							'Date'=>date('Y-m-d',$date_encours),
						);
						$alerte_temp[]=$alerte;
					}
				}
				
				//Vérifie que l'alerte n'est pas déjà présente et valide avant de sauvegarder
				if (is_array($alerte_temp)){
					
					foreach($alerte_temp as $AT){
						$a=new Alerte();
						if ($table=='conso_bts'){
			 				if ($tension=='BT'){
			 					$a->where_related_facturebt('id',$AT['idFacture']);
			 				}
			 				else{
			 					$a->where_related_factureeau('id',$AT['idFacture']);
			 				}
				 		}
				 		else{
			 				$a->where_related_facturemt('id',$AT['idFacture']);			
				 		}
						
						$a->where('Type',$AT['type_alerte']);
						$a->where('Flux',$AT['flux']);
						$a->where('Date',$AT['Date']);
						//$a->order_by("Valeur", "asc"); 
						$a->get();
						/*$Alerte_already_done=false;
						foreach($a->all as $same_alerte){
							if (now() < (strtotime('+'.$AT['Duree_validite'].' month',(strtotime($same_alerte->Date))))) $Alerte_already_done=true;
						}*/
						//Cas des doubles facturations, pour toutes les factures du PL de cette periode
						//supprimer les alertes de ce type, avant d'en ajouter une
						if ($AT['type_alerte']==7){
													 		
					 		//Get all facture pour ce PL et la periode en cours d'importation
		 					if ($table=='conso_bts'){
				 				if ($tension=='BT'){
				 					$fact= new Facturebt();
				 				}
				 				else{
				 					$fact= new Factureeau();
				 				}
					 		}
					 		else{
				 				$fact= new Facturemt();
					 		}
		 					$fact->where_related_pl('id',$p->id);
		 					$fact->where_related_menumensuel('id',$m->id)->get();
		 					//Get all alerte de type 7 (double facturation);
		 					foreach($fact->all as $factu){
		 						$ale=new Alerte();
		 						if ($table=='conso_bts'){
					 				if ($tension=='BT'){
					 					$ale->where_related_facturebt('id',$factu->id);
					 				}
					 				else{
					 					$ale->where_related_factureeau('id',$factu->id);
					 				}
						 		}
						 		else{
					 				$ale->where_related_facturemt('id',$factu->id);		
						 		}
		 						$ale->where('Type',7)->get();
		 						//Supression des alertes précédentes
		 						//Ainsi au lieu d'avoir une alerte à chaque doublon :
		 						// 2 alertes pour ce mois; 3 alertes pour ce mois; 4 alertes pour ce mois
		 						//On aura une seule alerte : 4 alertes pour ce mois.
		 						$ale->delete_all();
		 					}			 					
						}
						//Sauvegarde l'alerte dans la DB
						if (empty($a->id)) {						
							$a=new Alerte();
							$a->Valeur= $AT['Valeur'];    
							$a->Flux  = $AT['flux']; 
							$a->Date  = $AT['Date']; 
							$a->Etat  = 3;
							$a->Type  = $AT['type_alerte'];
						}
						
						/*if ($table=='conso_bts'){
			 				if ($tension=='BT'){
			 					$f= new Facturebt();
			 				}
			 				else{
			 					$f= new Factureeau();
			 				}
				 		}
				 		else{
			 				$f= new Facturemt();			
				 		}
				 		$f->where('id',$AT['idFacture'])->get();*/
			 			
						$a->save(array($p,$f,$m));						
					}
				}
				
				
				
				//Creation des donnees statistiques pour chaque pl
				//$s= new Stat();
				//$s->where_related_pl('Point_de_livraison',$PL)->get();
				//calcul de la consommation mensuelle moyenne
				$conso_totale=0;
				$nombrejour_total=0;
				
				foreach($f->all as $facture){
					if ($table=='conso_mts'){
						$facture->Consommation_mensuelle=$facture->Conso_Hors_Pointe+$facture->Conso_Pointe;
					}
					$conso_totale+=$facture->Consommation_mensuelle;
					$nombrejour_total+=$facture->Nb_jours;
				}
				if ($nombrejour_total!=0){
					$p->conso_moy=round($conso_totale/$nombrejour_total*30);
				}
				//recherche alerte_max
				$p->alerte_max=0;
				$a= new Alerte();
				$a->select_max('Etat');
				$a->where_related_pl('Point_de_livraison',$p->Point_de_livraison)->get();
				$p->alerte_max=$a->Etat;
				$p->save();	
				
				/*$end=microtime(true);
				$temp=$end-$start;
				echo 'temps d execution'.$temp;
				die();*/			
				
			} 
			
			if(($u->count())>1){
				$answer['info'] = 'continue';
				$progress=round((1-($this->decoupage*$u->count())/$u->nombre_lignes)*100)/100;
				$answer['progress']=$progress;
				//supprime les infos traitées
				$u->delete();
			}
			else{
				$answer['info'] = 'end';
				$answer['lignes'] = $u->nombre_lignes;
				$answer['progress']=1;
				$u->delete();
			}
			$answer['success'] = true;
			echo json_encode($answer);
			
			return TRUE;
			
			
	 	}
	 	else return FALSE;
	 	
	}
	
	function parseExcel($excel_file_name_with_path, $table)
	{
		
		$data = new spreadsheetexcelreader();
		// Set output Encoding.
		$data->setOutputEncoding('CP1251');

		$data->read($excel_file_name_with_path);
		//efface le fichier après lecture
		unlink($excel_file_name_with_path);
		
		
		$this->nombres_colonnes=$data->sheets[0]['numCols'];
		
		if ($table=='conso_mts') $this->nombres_colonnes=56;
		elseif ($table=='conso_bts') $this->nombres_colonnes=26;
		//Si la différence entre le nombre de colonne effectif et attendu est supérieur à 10, erreur
		if (abs($this->nombres_colonnes-$data->sheets[0]['numCols'])>10){
			$this->msg_error='Le nombre de colonnes du fichier est incoh&eacute;rent. Etes-vous s&ucirc;r d\'avoir s&eacute;lectionn&eacute; le bon type (BT/MT)?';
			$answer['error'] = $this->msg_error;
			echo json_encode($answer);
			die();
		}
		$this->nombres_lignes=$data->sheets[0]['numRows'];
		
		
		for ($i = 1; $i <= $this->nombres_lignes-2; $i++) {
			for ($j = 1; $j <= $this->nombres_colonnes; $j++) {                   
				//formatage des dates de dd/mm/yyyy to yyyy-mm-dd
				if (isset($data->sheets[0]['cells'][$i][$j])){
					if (preg_match('#^([0-9]|[0,1,2][0-9]|3[0,1])/([\d]|[0,1][0-9])/\d{4}$#', $data->sheets[0]['cells'][$i][$j]))
					{
						$date=$data->sheets[0]['cells'][$i][$j];
						$date_array = explode("/",$date); // split the array
						$var_day = $date_array[0]; //day seqment
						$var_month = $date_array[1]; //month segment
						$var_year = $date_array[2]; //year segment
						$date = "$date_array[2]-$date_array[1]-$date_array[0]";
						$data->sheets[0]['cells'][$i][$j]=$date;
					}
					//enleve les " à l'interieur des champs
					$search = array ("/\"/");
					$replace = array ('');
					$data->sheets[0]['cells'][$i][$j] = preg_replace($search, $replace, $data->sheets[0]['cells'][$i][$j]);
					//entoure les champs de ""
					$data->sheets[0]['cells'][$i][$j]="\"".$data->sheets[0]['cells'][$i][$j]."\"";
					$product[$i-1][$j-1]=$data->sheets[0]['cells'][$i][$j];
				}
				else $product[$i-1][$j-1]='""';
			}
		}
		//Decoupe et Enregistre le tableau de facture dans la base de donnees
		$i=1;
		$u=new Uploadprocess();
		$u->get();
		$u->delete_all();
		//$decoupage=50;
		while ($i<count($product)){
			$array_to_save=null;
			$array_to_save[]=''; //start at 1
			for ($j = $i; $j <= ($i+$this->decoupage); $j++) {
				if($j<count($product)){
					$array_to_save[]=$product[$j];
				}
			}
			$u=new Uploadprocess();
			$u->table_mt_bt_eau=$table;
			$u->periode=$this->periode_pour_menu;
			$u->factures=serialize($array_to_save);
			$u->nombre_lignes=count($product);
			$u->save();
			$i=$i+$this->decoupage;
		}
		$this->historique_upload($this->file_name);
		$answer['file'] = utf8_encode($this->file_name);
		$answer['info'] = 'parseok';
		$answer['success'] = true;
		echo json_encode($answer);
		die();
		//return $product;
	}
	
	function historique_upload($file_name){
		$requete_sql="INSERT INTO `uploads` (`id`,`nom_fichier`,`date_creation`) VALUES (NULL,\"".$file_name."\", CURDATE());";
		$this->db->query($requete_sql);		
	}
	
	function error_display(){
		$attributes = array('id' => 'errform');
		/*echo form_open('import/index/-1',$attributes);
		echo form_hidden('error',$this->upload->display_errors());
		echo form_close();
		echo '<script>document.getElementById("errform").submit();</script>';*/
	}
	
	function is_upload_running(){
		$u= new Uploadprocess();
	 	$u->get(1,1);//just get one entry. If there is one at least, it means there is an upload not ended.
		if ($u->count()>0){
			$answer['success'] = true;
		}
		else{
			$answer['msg'] = 'aucun resultat...';
		}
		echo json_encode($answer);
	}
	
	function build_alert(){
	
	}

	
}
?>
