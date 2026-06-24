<?php

define( 'DB_NAME', 'mobidev' );
define( 'DB_USER', 'mobidev_user' );
define( 'DB_PASSWORD', 'secret' );
define( 'DB_HOST', 'db' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY',         '-*L]+Ly0G%hshA2oKAOn#+R6iq6]xg](}>& lUw2YHXm6Pog.ubtrP7=l~z$#C,+' );
define( 'SECURE_AUTH_KEY',  'vYR[%UC>$FEr~U^6hyiq)st}tx_ltJdbQTAE!i}zr[Zi7`)k0{-e@y-9. {rkg8P' );
define( 'LOGGED_IN_KEY',    '-sU5VUa[o9r!l(*uUm--t23SRjWrewU@C()`fVdO<a;q?KY-*SMgNkht-9`~$@C]' );
define( 'NONCE_KEY',        'fDHw%gqWiX~>]#f.QH#|WB)k0eWFM>^u,xOnj|5XUP=YRo)^Mv`Y_s@>I3Wc**Ug' );
define( 'AUTH_SALT',        'nKBq]o+2{<:QkSNC?0m}0nphF;#)hJJ}sQsiKFN|Xdll.+]eLs!gU:nz=hATBo[z' );
define( 'SECURE_AUTH_SALT', 'G+AX&1.{:RR&|hC-fa211f~>(R%_6S[ed#p|_C=BtG)6-DUS1h_DqMs5miu};?e8' );
define( 'LOGGED_IN_SALT',   '*60qoe<j`*DGF>8k<.q1r$X|_, a/hC7zO&@Oh%oTR$^=(V;!oJ/D&k{Yab*`H{^' );
define( 'NONCE_SALT',       'RJj|!]#y5f3C+CzsosOjT?[A W,L_{60X6dsCQxQWh}%GAUwh:xZGx)xA.dA|d#q' );

$table_prefix = 'ddbbn_';

define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', true );
define( 'WP_CACHE', true );

$_SERVER['HTTPS']          = 'on';
$_SERVER['REQUEST_SCHEME'] = 'https';

@ini_set( 'upload_max_filesize' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

if ( !defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

if ( !defined( 'RECAPTCHA_MIN_SCORE' ) ) {
	define('RECAPTCHA_MIN_SCORE', 0.7);
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
