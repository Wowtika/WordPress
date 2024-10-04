<?php
class WpApiCatalog {
	static public function action_years() {
		static::checkNonce();

		$data = ApiCatalog::getYears( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}

	}

	static public function action_makes() {
		static::checkNonce();

		$data = ApiCatalog::getMakes( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}
	}

	static public function action_models() {
		static::checkNonce();

		$data = ApiCatalog::getModels( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}
	}

	static public function action_checkModel() {
		static::checkNonce();
		$data = ApiCatalog::checkModel( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}
	}

	static public function action_partsSearch() {
		static::checkNonce();
		$data = ApiCatalog::partsSearch( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}
	}

	static public function action_partAttributes() {
		static::checkNonce();
		$data = ApiCatalog::partAttributes( $_REQUEST );
		if( $data !== false ) {
			static::success( $data );
		} else {
			static::error( ApiCatalog::getError() );
		}
	}

	static protected function success( $data ) {
		static::response(200, $data);
	}
	static protected function error($msg, $code = 400) {
		static::response($code, null, $msg);
	}
	static protected function response($code = 200, $data = null, $msg = null) {
		$response = [
			'success' => $code === 200,
			'data' => $data,
			'msg' => $msg,
		];

		wp_send_json($response, $code, 448);
	}
	static protected function checkNonce() {
		$result = false;
		if( check_ajax_referer('apicatalog-nonce', 'nonce', false) ) {
			if( wp_verify_nonce($_REQUEST['nonce'], 'apicatalog-nonce' ) ) {
				$result = true;
			}
		}

		if( !$result ) {
			static::error('Nonce code is wrong');
		}
	}
}