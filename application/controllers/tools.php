<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tools extends CI_Controller {

	private $sql_backup_params;
	
	function __construct()
	{
		parent::__construct();
		
		$this->sql_backup_params = array(
                'tables'      => array(),  														// Array of tables to backup.
                'ignore'      => array('historique','historique_tickets','system_sessions'),    // List of tables to omit from the backup
                'format'      => 'gzip',             											// gzip, zip, txt
				'filename'    => 'ewatch_'.date("y-m-d").'.sql.gz',    											// File name - NEEDED ONLY WITH ZIP FILES
                'add_drop'    => FALSE,              											// Whether to add DROP TABLE statements to backup file
                'add_insert'  => TRUE,              											// Whether to add INSERT data to backup file
                'newline'     => "\n"               											// Newline character used in backup file
              );
	}
	
	public function index()
	{
		$this->load->view('toolsview');
	}
	
	public function dump()
	{
		$this->backupDB(true);
	}
	
	public function upgrade()
	{
		//upgradable ?
		if (!APP_UPGRADABLE) {echo 'UPGRADE DISABLED ON THIS SERVER !'; exit;}
			
		//check if valid update submited
		ini_set("memory_limit","1200M");
		
		if (isset($_FILES["upgrade_file"]) and ($_FILES["upgrade_file"]['error'] === UPLOAD_ERR_OK) and (isset($_FILES["upgrade_file"]['name']))) {	
			$filename = $_FILES["upgrade_file"]["name"];
			$source = $_FILES["upgrade_file"]["tmp_name"];
			$target_path = "./upgrade/".$filename;  // change this to the correct site path
			
			$name = explode(".", $filename);
			if (strtolower($name[1]) != 'a37') {
				echo 'ERROR : Not a valid upgrade file'; exit;}
			
			if(move_uploaded_file($source, $target_path)) {
				$zip = new ZipArchive();
				$x = $zip->open($target_path);
				if ($x === true) {
					//perform a db backup before !
					$this->backupDB();
					
					//extract upgrade
					$zip->extractTo("..");
					$zip->close();
					
					$message = "SUCCESS : Your upgrade was uploaded and installed successfully.";	
				}
				else $message = "ERROR : Impossible to run upgrade..";
			} 
			else $message = "ERROR : upload failed, check permission and try again..";
		}
		else $message = "ERROR : no file recieved, try again..";
		
		echo $message;
		exit;
	}
	
	private function backupDB($download=false,$filename=false)
	{
		if (!$filename) $filename = APP.'_'.date("y-m-d").'.sql.gz';
		
		// Load the DB utility class
		$this->load->dbutil();

		// Backup your entire database and assign it to a variable
		$backup =& $this->dbutil->backup($this->sql_backup_params); 

		// Load the file helper and write the file to your server
		$this->load->helper('file');
		write_file('./backup/'.$filename, $backup); 

		// Load the download helper and send the file to your desktop
		if ($download)
		{
			$this->load->helper('download');
			force_download($filename, $backup);
			redirect('tools');
		}
	}
}
