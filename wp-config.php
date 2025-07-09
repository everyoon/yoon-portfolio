<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', getenv('DB_NAME') ?: 'portfolio' );

/** Database username */
define( 'DB_USER', getenv('DB_USER') ?: 'root' );

/** Database password */
define( 'DB_PASSWORD', getenv('DB_PASSWORD') ?: 'defaultpassword' );

/** Database hostname */
define( 'DB_HOST', getenv('DB_HOST') ?: 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '4>j~kwJcnqW{7xj@lbt4 /!x_HM*[d3!m&PTG6,(h/1NbpJiM_9?I[ 6jbb=dYNl' );
define( 'SECURE_AUTH_KEY',  '}urqs?QZN#=2coq`_}2d$9%=7BBJrk}[H%%Ggk _F&}@|+G4f%4].r%3QV!+qy]E' );
define( 'LOGGED_IN_KEY',    'SEnxVw2Cp<sp)4Nb#XM-M~p[mF(OD`G_XhU.9/]3^!oH-FO0L]`h2![/b%hF}tb ' );
define( 'NONCE_KEY',        'H0MEh7C;pcrZ*LoXAa;N6;oxsBH_9`#!PbdNTez]-}GnstLPbqtl1)c+/F:rHTgE' );
define( 'AUTH_SALT',        '?Wz#ESeieC{cS.I6K;4d9GrU0.8^B,kVph@svS@[u}1>R~^>.EZKE|zx8r Kd3KV' );
define( 'SECURE_AUTH_SALT', '3cKsOk-J+-W6LRLv(S7 (/rLYU1Y>T]Ns@T?%%s ql`7$mU+m~,wno/[Q=M)xbHF' );
define( 'LOGGED_IN_SALT',   'C)5/Z<P.Si$H)0}Z0kE<}-)U,hFKs.$8{4(,Vh`03T+k7X@=Y`ciPy.c;l)!?:_]' );
define( 'NONCE_SALT',       'Qlwx1.6bEUlJ;ucj>zaMC>QWOjFBnsr{tD^%aC2*wBa/}+^G7]=3GYI% mkS>m;:' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';