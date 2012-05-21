<?php

if ($_GET['pass'] != 'k86jnbHGDhcSgdkjbKJHS89398') die;

define('APP_NAME','EnergyWatch');

define('CLIENT_NAME','EngesGabon'); //TODO find a way to choose client !


if (is_file('../'.APP_NAME.'_'.CLIENT_NAME.'_seed.php'))
{
	define('APP_TYPE','local');
	require_once('../'.APP_NAME.'_'.CLIENT_NAME.'_seed.php');
}
elseif (is_file('../'.APP_NAME.'_'.CLIENT_NAME.'.php'))
{
	define('APP_TYPE','server');
	require_once('../'.APP_NAME.'_'.CLIENT_NAME.'.php');
}
else exit('i need a brain !');

echo MYSQL_BASE.'/'.MYSQL_USER.'/'.MYSQL_HOST.'/'.MYSQL_PASS;

?>
