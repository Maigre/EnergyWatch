<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tools extends CI_Controller {

	public function index()
	{
		$this->load->view('toolsview');
	}
	
	public function dump()
	{
		$this->load->dbutil();
		
		$prefs = array(
                'tables'      => array(),  														// Array of tables to backup.
                'ignore'      => array('historique','historique_tickets','system_sessions'),    // List of tables to omit from the backup
                'format'      => 'gzip',             											// gzip, zip, txt
				'filename'    => 'ewatch_'.date("y-m-d").'.sql.gz',    											// File name - NEEDED ONLY WITH ZIP FILES
                'add_drop'    => FALSE,              											// Whether to add DROP TABLE statements to backup file
                'add_insert'  => TRUE,              											// Whether to add INSERT data to backup file
                'newline'     => "\n"               											// Newline character used in backup file
              );
		
		$backup = $this->dbutil->backup($prefs);
		
		$this->load->helper('download');
		force_download('ewatch_'.date("y-m-d").'.sql.gz', $backup);
		
		redirect('tools');
	}
}
