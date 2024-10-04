<?php
class ApiCatalog {
	const URL = 'https://catalog.loopautomotive.com/catalog';

	static protected $error;

	static public function getYears($params = []) {
		$params = tArr::only($params, [
			'region_id',
			'make',
			'model',
		]);

		$response = static::send('years', $params);

		return $response;
	}

	static public function getMakes($params = []) {
		$params = tArr::only($params, [
			'region_id',
			'year',
			'model',
		]);

		$response = static::send('makes', $params);

		if( $response ) {
			return $response;
		} else {
			return false;
		}
	}

	static public function getModels($params = []) {
		$params = tArr::only($params, [
			'region_id',
			'year',
			'make',
		]);

		$response = static::send('models', $params);

		if( $response ) {
			return $response;
		} else {
			return false;
		}
	}

	static public function checkModel($params = []) {
		$params = tArr::only($params, [
			'region_id',
			'year',
			'make',
			'model',
		]);

		$response = static::send('search', $params);

		if( $response ) {
			return $response;
		} else {
			return false;
		}
	}

	static public function partsSearch($params = []) {
		$params = tArr::only($params, [
			'region_id',
			'year',
			'make',
			'model',
			'engine',
			'submodel',
		]);

		$response = static::send('search', $params);

		if( $response ) {
			return $response;
		} else {
			return false;
		}
	}

	static public function partAttributes($params = []) {
		$params = tArr::only($params, [
			'part_id',
		]);

		$response = static::send('part-attributes', $params);

		if( $response ) {
			return $response;
		} else {
			return false;
		}
	}

	static public function send($action, $params = []) {
		$url = sprintf('%s/%s/', static::URL, $action);

		$req = (new tCurl)->to( $url )
		->withData( $params )
		->returnResponseObject();

		$req->asJsonResponse( true );

		$result = $req->get();
		
		if( $result->status === 200 ) {
			return $result->content;
		} elseif( $error = tArr::d_get($result, 'content.error') ) {
			static::$error = $error;
		} else {
			static::$error = 'Unknown error';
		}

		return false;
	}

	static public function getError() {
		return static::$error;
	}
}