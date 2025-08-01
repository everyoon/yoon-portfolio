<?php
/**
 * Configs class.
 *
 * @since 3.8.5
 * @package Smush\Core
 */

namespace Smush\Core;

use Exception;
use Smush\Core\CDN\CDN_Controller;
use WP_Error;
use WP_REST_Request;
use WP_Smush;
use Smush\Core\Next_Gen\Next_Gen_Manager;

/**
 * Class Configs
 *
 * @since 3.8.5
 */
class Configs {

	/**
	 * List of pro features.
	 *
	 * @since 3.8.5
	 *
	 * @var array
	 */
	private $pro_features = array( 'png_to_jpg', 's3', 'nextgen', 'cdn', 'webp', 'webp_mod', 'avif_mod', 'preload_images' );

	/**
	 * @var Settings
	 */
	private $settings;

	public function __construct() {
		$this->settings = Settings::get_instance();
	}

	/**
	 * Gets the local list of configs via Smush endpoint.
	 *
	 * @since 3.8.6
	 *
	 * @return bool
	 */
	public function get_callback() {
		$stored_configs = get_site_option( 'wp-smush-preset_configs', false );

		if ( false === $stored_configs ) {
			$stored_configs = array( $this->get_basic_config() );
			update_site_option( 'wp-smush-preset_configs', $stored_configs );
		}
		return $stored_configs;
	}

	/**
	 * Updates the local list of configs via Smush endpoint.
	 *
	 * @since 3.8.6
	 *
	 * @param WP_REST_Request $request Class containing the request data.
	 *
	 * @return array|WP_Error
	 */
	public function post_callback( $request ) {
		$data = json_decode( $request->get_body(), true );
		if ( ! is_array( $data ) ) {
			return new WP_Error( '400', esc_html__( 'Missing configs data', 'wp-smushit' ), array( 'status' => 400 ) );
		}

		$sanitized_data = $this->sanitize_configs_list( $data );
		update_site_option( 'wp-smush-preset_configs', $sanitized_data );

		return $sanitized_data;
	}

	/**
	 * Checks whether the current user can perform requests to Smush's endpoint.
	 *
	 * @since 3.8.6
	 *
	 * @return bool
	 */
	public function permission_callback() {
		$capability = is_multisite() ? 'manage_network' : 'manage_options';
		return current_user_can( $capability );
	}

	/**
	 * Adds the default configuration to the local configs.
	 *
	 * @since 3.8.6
	 */
	private function get_basic_config() {
		$basic_config = array(
			'id'          => 1,
			'name'        => __( 'Default config', 'wp-smushit' ),
			'description' => __( 'Recommended performance config for every site.', 'wp-smushit' ),
			'default'     => true,
			'config'      => array(
				'configs' => array(
					'settings' => array(
						'auto'              => true,
						'lossy'             => Settings::LEVEL_SUPER_LOSSY,
						'strip_exif'        => true,
						'resize'            => false,
						'detection'         => false,
						'original'          => true,
						'backup'            => true,
						'png_to_jpg'        => true,
						'background_email'  => false,
						'nextgen'           => false,
						's3'                => false,
						'gutenberg'         => false,
						'js_builder'        => false,
						'cdn'               => false,
						'auto_resize'       => false,
						'webp'              => true,
						'usage'             => false,
						'accessible_colors' => false,
						'keep_data'         => true,
						'lazy_load'         => false,
						'background_images' => true,
						'rest_api_support'  => false,
						'webp_mod'          => false,
						'avif_mod'          => false,
						'preload_images'    => false,
					),
				),
			),
		);

		$basic_config['config']['strings'] = $this->format_config_to_display( $basic_config['config']['configs'] );

		return $basic_config;
	}

	/**
	 * Sanitizes the full list of configs.
	 *
	 * @since 3.8.6
	 *
	 * @param array $configs_list Configs list to sanitize.
	 * @return array
	 */
	private function sanitize_configs_list( $configs_list ) {
		$sanitized_list = array();

		foreach ( $configs_list as $config_data ) {
			if ( isset( $config_data['name'] ) ) {
				$name = sanitize_text_field( $config_data['name'] );
			}

			if ( isset( $config_data['description'] ) ) {
				$description = sanitize_text_field( $config_data['description'] );
			}

			$configs        = isset( $config_data['config']['configs'] ) ? $config_data['config']['configs'] : array();
			$sanitized_data = array(
				'id'          => filter_var( $config_data['id'], FILTER_VALIDATE_INT ),
				'name'        => empty( $name ) ? __( 'Undefined', 'wp-smushit' ) : $name,
				'description' => empty( $description ) ? '' : $description,
				'config'      => $this->sanitize_and_format_configs( $configs ),
			);

			if ( ! empty( $config_data['hub_id'] ) ) {
				$sanitized_data['hub_id'] = filter_var( $config_data['hub_id'], FILTER_VALIDATE_INT );
			}
			if ( isset( $config_data['default'] ) ) {
				$sanitized_data['default'] = filter_var( $config_data['default'], FILTER_VALIDATE_BOOLEAN );
			}

			$sanitized_list[] = $sanitized_data;
		}

		return $sanitized_list;
	}

	/**
	 * Tries to save the uploaded config.
	 *
	 * @since 3.8.5
	 *
	 * @param array $file The uploaded file.
	 *
	 * @return array|WP_Error
	 */
	public function save_uploaded_config( $file ) {
		try {
			return $this->decode_and_validate_config_file( $file );
		} catch ( Exception $e ) {
			return new WP_Error( 'error_saving', $e->getMessage() );
		}
	}

	/**
	 * Tries to decode and validate the uploaded config file.
	 *
	 * @since 3.8.5
	 *
	 * @param array $file The uploaded file.
	 *
	 * @return array
	 *
	 * @throws Exception When there's an error with the uploaded file.
	 */
	private function decode_and_validate_config_file( $file ) {
		if ( ! $file ) {
			throw new Exception( __( 'The configs file is required', 'wp-smushit' ) );
		} elseif ( ! empty( $file['error'] ) ) {
			/* translators: error message */
			throw new Exception( sprintf( __( 'Error: %s.', 'wp-smushit' ), $file['error'] ) );
		} elseif ( 'application/json' !== $file['type'] ) {
			throw new Exception( __( 'The file must be a JSON.', 'wp-smushit' ) );
		}

		$json_file = file_get_contents( $file['tmp_name'] ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		if ( ! $json_file ) {
			throw new Exception( __( 'There was an error getting the contents of the file.', 'wp-smushit' ) );
		}

		$configs = json_decode( $json_file, true );
		if ( empty( $configs ) || ! is_array( $configs ) ) {
			throw new Exception( __( 'There was an error decoding the file.', 'wp-smushit' ) );
		}

		// Make sure the config has a name and configs.
		if ( empty( $configs['name'] ) || empty( $configs['config'] ) ) {
			throw new Exception( __( 'The uploaded config must have a name and a set of settings. Please make sure the uploaded file is the correct one.', 'wp-smushit' ) );
		}

		// Sanitize.
		$plugin  = isset( $configs['plugin'] ) ? $configs['plugin'] : 0;
		$configs = $this->sanitize_configs_list( array( $configs ) );
		$configs = $configs[0];

		// Restore back plugin ID.
		$configs['plugin'] = $plugin;

		// Let's re-create this to avoid differences between imported settings coming from other versions.
		$configs['config']['strings'] = $this->format_config_to_display( $configs['config']['configs'] );

		if ( empty( $configs['config']['configs'] ) ) {
			throw new Exception( __( 'The provided configs list isn’t correct. Please make sure the uploaded file is the correct one.', 'wp-smushit' ) );
		}

		// Don't keep these if they exist.
		if ( isset( $configs['hub_id'] ) ) {
			unset( $configs['hub_id'] );
		}
		if ( isset( $configs['default'] ) ) {
			unset( $configs['default'] );
		}

		return $configs;
	}

	/**
	 * Applies a config given its ID.
	 *
	 * @since 3.8.6
	 *
	 * @param string $id The ID of the config to apply.
	 *
	 * @return void|WP_Error
	 */
	public function apply_config_by_id( $id ) {
		$stored_configs = get_site_option( 'wp-smush-preset_configs' );

		$config = false;
		foreach ( $stored_configs as $config_data ) {
			if ( (int) $config_data['id'] === (int) $id ) {
				$config = $config_data;
				break;
			}
		}

		// The config with the given ID doesn't exist.
		if ( ! $config ) {
			return new WP_Error( '404', __( 'The given config ID does not exist', 'wp-smushit' ) );
		}

		$this->apply_config( $config['config']['configs'], $config['name'] );
	}

	/**
	 * Applies the given config.
	 *
	 * @since 3.8.6
	 *
	 * @param array $config The config to apply.
	 */
	public function apply_config( $config, $config_name = '' ) {
		$sanitized_config = $this->sanitize_config( $config );

		// Update 'networkwide' options in multisites.
		if ( is_multisite() && isset( $sanitized_config['networkwide'] ) ) {
			update_site_option( 'wp-smush-networkwide', $sanitized_config['networkwide'] );
		}

		$settings_handler = Settings::get_instance();

		// Update image sizes.
		if ( isset( $sanitized_config['resize_sizes'] ) ) {
			$settings_handler->set_setting( 'wp-smush-resize_sizes', $sanitized_config['resize_sizes'] );
		}

		// Update settings. We could reuse the `save` method from settings to handle this instead.
		if ( ! empty( $sanitized_config['settings'] ) ) {
			$stored_settings = $settings_handler->get_setting( 'wp-smush-settings' );

			// Keep the keys that are in use in this version.
			$new_settings = array_intersect_key( $sanitized_config['settings'], $stored_settings );

			if ( $new_settings ) {
				if ( ! WP_Smush::is_pro() ) {
					// Disable the pro features before applying them.
					foreach ( $this->pro_features as $name ) {
						$new_settings[ $name ] = false;
					}
				}

				if ( isset( $new_settings['webp_mod'] ) || isset( $new_settings['avif_mod'] ) ) {
					$direct_conversion_enabled = ! empty( $new_settings['webp_direct_conversion'] );
					$settings_handler->set( 'webp_direct_conversion', $direct_conversion_enabled );

					$webp_activated   = ! empty( $new_settings['webp_mod'] );
					$avif_activated   = ! empty( $new_settings['avif_mod'] );
					$next_gen_manager = Next_Gen_Manager::get_instance();

					if ( $webp_activated || $avif_activated ) {
						$activated_format = $webp_activated ? 'webp' : 'avif';
						$next_gen_manager->activate_format( $activated_format );
					} else {
						$next_gen_manager->deactivate();
					}
				}

				// Update the CDN status for CDN changes.
				if ( isset( $new_settings['cdn'] ) && $new_settings['cdn'] !== $stored_settings['cdn'] ) {
					CDN_Controller::get_instance()->toggle_cdn( $new_settings['cdn'] );
				}

				// Keep the stored settings that aren't present in the incoming one.
				$new_settings = array_merge( $stored_settings, $new_settings );
				$settings_handler->set_setting( 'wp-smush-settings', $new_settings );
			}
		}

		// Update lazy load.
		if ( ! empty( $sanitized_config['lazy_load'] ) ) {
			$stored_lazy_load = $settings_handler->get_setting( 'wp-smush-lazy_load' );

			// Save the defaults before applying the config if the current settings aren't set.
			if ( empty( $stored_lazy_load ) ) {
				$settings_handler->init_lazy_load_defaults();
				$stored_lazy_load = $settings_handler->get_setting( 'wp-smush-lazy_load' );
			}

			// Keep the settings that are in use in this version.
			foreach ( $sanitized_config['lazy_load'] as $key => $value ) {
				if ( is_array( $value ) && is_array( $stored_lazy_load[ $key ] ) ) {
					$sanitized_config['lazy_load'][ $key ] = array_intersect_key( $value, $stored_lazy_load[ $key ] );
				}
			}

			// Keep the stored settings that aren't present in the incoming one.
			$new_lazy_load = array_replace_recursive( $stored_lazy_load, $sanitized_config['lazy_load'] );
			$settings_handler->set_setting( 'wp-smush-lazy_load', $new_lazy_load );
		}

		do_action( 'wp_smush_config_applied', $config_name );

		// Skip onboarding if applying a config.
		update_option( 'skip-smush-setup', true );
	}

	/**
	 * Gets a new config array based on the current settings.
	 *
	 * @since 3.8.5
	 *
	 * @return array
	 */
	public function get_config_from_current() {
		$settings = Settings::get_instance();

		$stored_settings = $settings->get_setting( 'wp-smush-settings' );

		$configs = array( 'settings' => $stored_settings );

		if ( $stored_settings['resize'] ) {
			$configs['resize_sizes'] = $settings->get_setting( 'wp-smush-resize_sizes' );
		}

		// Let's store this only for multisites.
		if ( is_multisite() ) {
			$configs['networkwide'] = get_site_option( 'wp-smush-networkwide' );
		}

		// There's a site_option that handles this.
		unset( $configs['settings']['networkwide'] );

		// Looks like unused.
		unset( $configs['settings']['api_auth'] );

		// These are unique per site. They shouldn't be used.
		unset( $configs['settings']['bulk'] );

		// Include the lazy load settings only when lazy load is enabled.
		if ( ! empty( $configs['settings']['lazy_load'] ) ) {
			$lazy_load_settings = $settings->get_setting( 'wp-smush-lazy_load' );

			if ( ! empty( $lazy_load_settings ) ) {
				// Exclude unique settings.
				unset( $lazy_load_settings['animation']['placeholder'] );
				unset( $lazy_load_settings['animation']['spinner'] );
				unset( $lazy_load_settings['exclude-pages'] );
				unset( $lazy_load_settings['exclude-classes'] );

				if ( 'fadein' !== $lazy_load_settings['animation']['selected'] ) {
					unset( $lazy_load_settings['animation']['fadein'] );
				}

				$configs['lazy_load'] = $lazy_load_settings;
			}
		}

		// Exclude CDN fields if CDN is disabled.
		if ( empty( $configs['settings']['cdn'] ) ) {
			foreach ( $settings->get_cdn_fields() as $field ) {
				if ( 'cdn' !== $field ) {
					unset( $configs['settings'][ $field ] );
				}
			}
		}

		return array(
			'config' => array(
				'configs' => $configs,
				'strings' => $this->format_config_to_display( $configs ),
			),
		);
	}

	/**
	 * Sanitizes the given config.
	 *
	 * @since 3.8.5
	 *
	 * @param array $config Config array to sanitize.
	 *
	 * @return array
	 */
	private function sanitize_config( $config ) {
		$sanitized = array();

		if ( isset( $config['networkwide'] ) ) {
			if ( ! is_array( $config['networkwide'] ) ) {
				$sanitized['networkwide'] = sanitize_text_field( $config['networkwide'] );
			} else {
				$sanitized['networkwide'] = filter_var(
					$config['networkwide'],
					FILTER_CALLBACK,
					array(
						'options' => 'sanitize_text_field',
					)
				);
			}
		}

		if ( ! empty( $config['settings'] ) ) {
			$sanitized['settings'] = filter_var( $config['settings'], FILTER_VALIDATE_BOOLEAN, FILTER_REQUIRE_ARRAY );
			if ( isset( $config['settings']['lossy'] ) ) {
				$sanitized['settings']['lossy'] = $this->settings->sanitize_lossy_level( $config['settings']['lossy'] );
			}

			if ( isset( $config['settings'][ Settings::NEXT_GEN_CDN_KEY ] ) ) {
				$sanitized['settings'][ Settings::NEXT_GEN_CDN_KEY ] = $this->settings->sanitize_cdn_next_gen_conversion_mode( $config['settings'][ Settings::NEXT_GEN_CDN_KEY ] );
			}
		}

		if ( isset( $config['resize_sizes'] ) ) {
			if ( is_bool( $config['resize_sizes'] ) ) {
				$sanitized['resize_sizes'] = $config['resize_sizes'];
			} else {
				$sanitized['resize_sizes'] = array(
					'width'  => (int) $config['resize_sizes']['width'],
					'height' => (int) $config['resize_sizes']['height'],
				);
			}
		}

		if ( ! empty( $config['lazy_load'] ) ) {
			$args = array(
				'format'            => array(
					'filter' => FILTER_VALIDATE_BOOLEAN,
					'flags'  => FILTER_REQUIRE_ARRAY + FILTER_NULL_ON_FAILURE,
				),
				'output'            => array(
					'filter' => FILTER_VALIDATE_BOOLEAN,
					'flags'  => FILTER_REQUIRE_ARRAY,
				),
				'animation'         => array(
					'filter'  => FILTER_CALLBACK,
					'options' => 'sanitize_text_field',
					'flags'   => FILTER_REQUIRE_ARRAY,
				),
				'include'           => array(
					'filter' => FILTER_VALIDATE_BOOLEAN,
					'flags'  => FILTER_REQUIRE_ARRAY,
				),
				'exclude-pages'     => array(
					'filter' => FILTER_SANITIZE_URL,
					'flags'  => FILTER_REQUIRE_ARRAY,
				),
				'exclude-classes'   => array(
					'filter'  => FILTER_CALLBACK,
					'options' => 'sanitize_text_field',
					'flags'   => FILTER_REQUIRE_ARRAY,
				),
				'footer'            => FILTER_VALIDATE_BOOLEAN,
				'native'            => FILTER_VALIDATE_BOOLEAN,
				'noscript_fallback' => FILTER_VALIDATE_BOOLEAN,
			);

			$sanitized['lazy_load'] = filter_var_array( $config['lazy_load'], $args, false );
		}

		return $sanitized;
	}

	/**
	 * Formatting methods.
	 */

	/**
	 * Formats the given config to be displayed.
	 * Used when displaying the list of configs and when sending a config to the Hub.
	 *
	 * @since 3.8.5
	 *
	 * @param array $config The config to format.
	 *
	 * @return array Contains an array for each setting. Each with a 'label' and 'value' keys.
	 */
	private function format_config_to_display( $config ) {
		$lazy_load_fields    = Settings::get_instance()->get_lazy_load_fields();
		$preload_fields      = Settings::get_instance()->get_preload_fields();
		$lazy_preload_fields = array_merge( $lazy_load_fields, $preload_fields );
		$lazy_preload_module = Settings::LAZY_PRELOAD_MODULE_NAME;
		$settings_data       = array(
			'bulk_smush'         => Settings::get_instance()->get_bulk_fields(),
			$lazy_preload_module => $lazy_preload_fields,
			'cdn'                => Settings::get_instance()->get_cdn_fields(),
			'next_gen'           => Settings::get_instance()->get_next_gen_fields(),
			'integrations'       => Settings::get_instance()->get_integrations_fields(),
			'settings'           => Settings::get_instance()->get_settings_fields(),
		);

		$display_array = array();

		if ( ! empty( $config['settings'] ) ) {
			foreach ( $settings_data as $name => $fields ) {
				if ( 'next_gen' === $name ) {
					$display_array['next_gen'] = $this->get_next_gen_settings_display_value( $config );
					continue;
				}

				if ( $lazy_preload_module === $name ) {
					$display_array[ $lazy_preload_module ] = $this->get_lazy_preload_settings_to_display( $config );
					continue;
				}

				// Display the setting inactive when the module is off.
				if (
					'cdn' === $name
					&& ( empty( $config['settings'][ $name ] ) || ! WP_Smush::is_pro() )
				) {
					$display_array[ $name ] = $this->format_boolean_setting_value( $name, $config['settings'][ $name ] );
					continue;
				}

				$display_array[ $name ] = $this->get_settings_display_value( $config, $fields );
			}

			// Append the resize_sizes to the Bulk Smush display settings.
			if ( ! empty( $config['settings']['resize'] ) && ! empty( $config['resize_sizes'] ) ) {
				$display_array['bulk_smush'][] = sprintf(
					/* translators: 1. Resize-size max width, 2. Resize-size max height */
					__( 'Full images max-sizes to resize - Max-width: %1$s. Max height: %2$s', 'wp-smushit' ),
					$config['resize_sizes']['width'],
					$config['resize_sizes']['height']
				);
			}
		}

		// Display only for multisites, if the setting exists.
		if ( is_multisite() && isset( $config['networkwide'] ) ) {
			$display_array['networkwide'] = $this->get_networkwide_settings_to_display( $config );
		}

		// Format the values to what's expected in front. A string within an array.
		array_walk(
			$display_array,
			function ( &$value ) {
				if ( ! is_string( $value ) ) {
					$value = implode( PHP_EOL, $value );
				}
				$value = array( $value );
			}
		);
		return $display_array;
	}

	private function get_next_gen_settings_display_value( $config ) {
		$is_pro       = WP_Smush::is_pro();
		$webp_enabled = $is_pro && ! empty( $config['settings']['webp_mod'] );
		$avif_enabled = $is_pro && ! empty( $config['settings']['avif_mod'] );

		if ( ! $webp_enabled && ! $avif_enabled ) {
			return __( 'Inactive', 'wp-smushit' );
		}

		$next_gen_format           = $avif_enabled ? __( 'AVIF', 'wp-smushit' ) : __( 'WebP', 'wp-smushit' );
		$direct_conversion_enabled = $avif_enabled || ! empty( $config['settings']['webp_direct_conversion'] );
		$transform_mode            = $direct_conversion_enabled ? __( 'Direct Conversion', 'wp-smushit' ) : __( 'Server Configuration', 'wp-smushit' );

		$formatted_rows = array(
			$this->format_config_description( __( 'Next-Gen Formats', 'wp-smushit' ), $next_gen_format ),
			$this->format_config_description( __( 'Transform Mode', 'wp-smushit' ), $transform_mode ),
		);

		if ( $direct_conversion_enabled ) {
			$legacy_browser_support = $avif_enabled && ! empty( $config['settings']['avif_fallback'] )
									|| ( $webp_enabled && ! empty( $config['settings']['webp_fallback'] ) );
			$formatted_rows[]       = $this->format_config_description(
				__( 'Legacy Browser Support', 'wp-smushit' ),
				$legacy_browser_support ? __( 'Active', 'wp-smushit' ) : __( 'Inactive', 'wp-smushit' )
			);
		}

		return $formatted_rows;
	}

	private function format_config_description( $field_name, $field_description ) {
		return "{$field_name} - {$field_description}";
	}

	/**
	 * Formats the given fields that belong to the "settings" option.
	 *
	 * @since 3.8.5
	 *
	 * @param array $config The config to format.
	 * @param array $fields The fields to look for.
	 *
	 * @return array
	 */
	private function get_settings_display_value( $config, $fields ) {
		$formatted_rows = array();

		$extra_labels = array(
			's3'        => __( 'Amazon S3', 'wp-smushit' ),
			'nextgen'   => __( 'NextGen Gallery', 'wp-smushit' ),
			'cdn'       => __( 'CDN', 'wp-smushit' ),
			'keep_data' => __( 'Keep Data On Uninstall', 'wp-smushit' ),
		);

		foreach ( $fields as $name ) {
			if ( isset( $config['settings'][ $name ] ) ) {
				$label = Settings::get_instance()->get_setting_data( $name, 'short-label' );

				if ( empty( $label ) ) {
					$label = ! empty( $extra_labels[ $name ] ) ? $extra_labels[ $name ] : $name;
				}

				if ( 'lossy' === $name ) {
					$formatted_rows[] = $label . ' - ' . $this->settings->get_lossy_level_label( $config['settings'][ $name ] );
					continue;
				}

				if ( Settings::NEXT_GEN_CDN_KEY === $name ) {
					$formatted_rows[] = $label . ' - ' . $this->settings->get_cdn_next_gen_conversion_label( $config['settings'][ $name ] );
					continue;
				}

				$formatted_rows[] = $label . ' - ' . $this->format_boolean_setting_value( $name, $config['settings'][ $name ] );
			}
		}
		return $formatted_rows;
	}

	/**
	 * Formats the boolean settings that are either 'active' or 'inactive'.
	 * If the setting belongs to a pro feature and
	 * this isn't a pro install, we display it as 'inactive'.
	 *
	 * @since 3.8.5
	 *
	 * @param string  $name The setting's name.
	 * @param boolean $value The setting's value.
	 * @return string
	 */
	private function format_boolean_setting_value( $name, $value ) {
		// Display the pro features as 'inactive' for free installs.
		if ( ! WP_Smush::is_pro() && in_array( $name, $this->pro_features, true ) ) {
			$value = false;
		}
		return $value ? __( 'Active', 'wp-smushit' ) : __( 'Inactive', 'wp-smushit' );
	}

	private function get_lazy_preload_settings_to_display( $config ) {
		$is_preload_images_active = WP_Smush::is_pro() && ! empty( $config['settings']['preload_images'] );
		$is_lazy_load_active      = ! empty( $config['settings']['lazy_load'] );

		if ( ! $is_preload_images_active && ! $is_lazy_load_active ) {
			return __( 'Inactive', 'wp-smushit' );
		}

		$formatted_rows = array();

		$formatted_rows[] = __( 'Lazy Load', 'wp-smushit' ) . ' - ' . $this->format_boolean_setting_value( 'lazy_load', $is_lazy_load_active );
		if ( $is_lazy_load_active ) {
			$formatted_rows = array_merge( $formatted_rows, $this->get_lazy_load_settings_to_display( $config ) );
		}

		$formatted_rows[] = __( 'Preload Critical Images', 'wp-smushit' ) . ' - ' . $this->format_boolean_setting_value( 'preload_images', $is_preload_images_active );

		return $formatted_rows;
	}

	/**
	 * Formats the given lazy_load settings to be displayed.
	 *
	 * @since 3.8.5
	 *
	 * @param array $config The config to format.
	 *
	 * @return array
	 */
	private function get_lazy_load_settings_to_display( $config ) {
		$formatted_rows = array();

		// List of the available lazy load settings for this version and their labels.
		$settings_labels = array(
			'format'            => __( 'Media Types', 'wp-smushit' ),
			'output'            => __( 'Output Locations', 'wp-smushit' ),
			'include'           => __( 'Included Post Types', 'wp-smushit' ),
			'animation'         => __( 'Display And Animation', 'wp-smushit' ),
			'footer'            => __( 'Load Scripts In Footer', 'wp-smushit' ),
			'native'            => __( 'Native Lazy Load Enabled', 'wp-smushit' ),
			'noscript_fallback' => __( 'Noscript Tag', 'wp-smushit' ),
		);

		foreach ( $config['lazy_load'] as $key => $value ) {
			// Skip if the setting doesn't exist.
			if ( ! isset( $settings_labels[ $key ] ) ) {
				continue;
			}

			if ( 'format' === $key ) {
				$enabled_media_types = array_keys( array_filter( $value ) );
				$formatted_rows[]    = $this->get_lazy_load_media_types_to_display( $enabled_media_types );
				$formatted_rows[]    = $this->get_lazy_load_embedded_content_to_display( $enabled_media_types );
				continue;
			}

			$formatted_value = $settings_labels[ $key ] . ' - ';

			if ( 'animation' === $key ) {
				// The special kid.
				$formatted_value .= __( 'Selected: ', 'wp-smushit' ) . $value['selected'];
				if ( ! empty( $value['fadein'] ) ) {
					$formatted_value .= __( '. Fade in duration: ', 'wp-smushit' ) . $value['fadein']['duration'];
					$formatted_value .= __( '. Fade in delay: ', 'wp-smushit' ) . $value['fadein']['delay'];
				}
			} elseif ( in_array( $key, array( 'footer', 'native', 'noscript_fallback' ), true ) ) {
				// Enabled/disabled settings.
				$formatted_value .= ! empty( $value ) ? __( 'Yes', 'wp-smushit' ) : __( 'No', 'wp-smushit' );

			} else {
				// Arrays.
				if ( in_array( $key, array( 'output', 'include' ), true ) ) {
					$value = array_keys( array_filter( $value ) );
				}

				if ( ! empty( $value ) ) {
					$formatted_value .= implode( ', ', $value );
				} else {
					$formatted_value .= __( 'none', 'wp-smushit' );
				}
			}

			$formatted_rows[] = $formatted_value;
		}

		return $formatted_rows;
	}

	private function get_lazy_load_media_types_to_display( $enabled_media_types ) {
		$formatted_value       = __( 'Media Types', 'wp-smushit' ) . ' - ';
		$embed_content_formats = array( 'iframe', 'embed_video' );
		$enabled_media_types   = array_diff( $enabled_media_types, $embed_content_formats );

		if ( empty( $enabled_media_types ) ) {
			$formatted_value .= __( 'none', 'wp-smushit' );
		} else {
			$formatted_value .= implode( ', ', $enabled_media_types );
		}

		return $formatted_value;
	}

	private function get_lazy_load_embedded_content_to_display( $enabled_media_types ) {
		$formatted_value = __( 'Embedded Content', 'wp-smushit' ) . ' - ';
		if ( ! in_array( 'iframe', $enabled_media_types, true ) ) {
			return $formatted_value . __( 'No', 'wp-smushit' );
		}

		if ( ! in_array( 'embed_video', $enabled_media_types, true ) ) {
			return $formatted_value .= __( 'Yes', 'wp-smushit' );
		}

		return $formatted_value . __( 'Replace Video Embed with preview images', 'wp-smushit' );
	}

	/**
	 * Formats the 'networkwide' setting to display.
	 *
	 * @since 3.8.5
	 *
	 * @param array $config The config to format.
	 *
	 * @return string
	 */
	private function get_networkwide_settings_to_display( $config ) {
		if ( is_array( $config['networkwide'] ) ) {
			return implode( ', ', $config['networkwide'] );
		}
		return '1' === (string) $config['networkwide'] ? __( 'All', 'wp-smushit' ) : __( 'None', 'wp-smushit' );
	}


	public function sanitize_and_format_configs( $configs ) {
		return array(
			'configs' => $this->sanitize_config( $configs ),
			'strings' => $this->format_config_to_display( $configs ),
		);
	}
}
