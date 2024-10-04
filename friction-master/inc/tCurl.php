<?php
class tCurl {
	protected $curlObject = null;

	protected $curlOptions = array(
		'RETURNTRANSFER'        => true,
		'FAILONERROR'           => false,
		'FOLLOWLOCATION'        => false,
		'CONNECTTIMEOUT'        => '',
		'TIMEOUT'               => 30,
		'USERAGENT'             => '',
		'URL'                   => '',
		'POST'                  => false,
		'HTTPHEADER'            => array(),
		'SSL_VERIFYPEER'        => false,
		'HEADER'                => false,
	);

	protected $packageOptions = array(
		'data'                  => array(),
		'files'                 => array(),
		'asJsonRequest'         => false,
		'asJsonResponse'        => false,
		'returnAsArray'         => false,
		'responseObject'        => false,
		'responseArray'         => false,
		'enableDebug'           => false,
		'xDebugSessionName'     => '',
		'containsFile'          => false,
		'debugFile'             => '',
		'saveFile'              => '',
	);


	public function to($url) {
		return $this->withCurlOption( 'URL', $url );
	}

	public function withTimeout($timeout = 30.0) {
		return $this->withCurlOption( 'TIMEOUT_MS', ($timeout * 1000) );
	}

	public function withData($data = array()) {
		return $this->withPackageOption( 'data', $data );
	}

	public function withFile($key, $path, $mimeType = '', $postFileName = '') {
		$fileData = array(
			'fileName'     => $path,
			'mimeType'     => $mimeType,
			'postFileName' => $postFileName,
		);

		$this->packageOptions[ 'files' ][ $key ] = $fileData;

		return $this->containsFile();
	}

	public function allowRedirect() {
		return $this->withCurlOption( 'FOLLOWLOCATION', true );
	}

	public function asJson($asArray = false) {
		return $this->asJsonRequest()
		->asJsonResponse( $asArray );
	}

	public function asJsonRequest() {
		return $this->withPackageOption( 'asJsonRequest', true );
	}

	public function asJsonResponse($asArray = false) {
		return $this->withPackageOption( 'asJsonResponse', true )
		->withPackageOption( 'returnAsArray', $asArray );
	}

	// public function secure() {
	// 	return $this;
	// }

	public function withOption($key, $value) {
		return $this->withCurlOption( $key, $value );
	}

	public function setCookieFile($cookieFile) {
		return $this->withOption( 'COOKIEFILE', $cookieFile );
	}

	public function setCookieJar($cookieJar) {
		return $this->withOption( 'COOKIEJAR', $cookieJar );
	}
	
	public function withCurlOption($key, $value) {
		$this->curlOptions[ $key ] = $value;

		return $this;
	}

	protected function withPackageOption($key, $value) {
		$this->packageOptions[ $key ] = $value;

		return $this;
	}

	public function withHeader($header) {
		$this->curlOptions[ 'HTTPHEADER' ][] = $header;

		return $this;
	}

	public function withHeaders(array $headers) {
		$this->curlOptions[ 'HTTPHEADER' ] = array_merge(
			$this->curlOptions[ 'HTTPHEADER' ], $headers
		);

		return $this;
	}

	public function withContentType($contentType) {
		return $this->withHeader( 'Content-Type: '. $contentType )
		->withHeader( 'Connection: Keep-Alive' );
	}

	public function withResponseHeaders() {
		return $this->withCurlOption( 'HEADER', TRUE );
	}

	public function returnResponseObject() {
		return $this->withPackageOption( 'responseObject', true );
	}

	public function returnResponseArray() {
		return $this->withPackageOption( 'responseArray', true );
	}

	public function enableDebug($logFile) {
		return $this->withPackageOption( 'enableDebug', true )
		->withPackageOption( 'debugFile', $logFile )
		->withOption( 'VERBOSE', true );
	}

	public function withProxy($proxy, $port = '', $type = '', $username = '', $password = '') {
		$this->withOption( 'PROXY', $proxy );

		if( !empty($port) ) {
			$this->withOption( 'PROXYPORT', $port );
		}

		if( !empty($type) ) {
			$this->withOption( 'PROXYTYPE', $type );
		}

		if( !empty($username) && !empty($password) ) {
			$this->withOption( 'PROXYUSERPWD', $username .':'. $password );
		}

		return $this;
	}

	public function containsFile() {
		return $this->withPackageOption( 'containsFile', true );
	}

	public function enableXDebug($sessionName = 'session_1'){
		$this->packageOptions[ 'xDebugSessionName' ] = $sessionName;

		return $this;
	}

	public function get() {
		$this->appendDataToURL();

		return $this->send();
	}

	public function post() {
		$this->setPostParameters();

		return $this->send();
	}

	public function download($fileName) {
		$this->packageOptions[ 'saveFile' ] = $fileName;

		return $this->send();
	}

	protected function setPostParameters() {
		$this->curlOptions[ 'POST' ] = true;

		$parameters = $this->packageOptions[ 'data' ];
		if( !empty($this->packageOptions[ 'files' ]) ) {
			foreach( $this->packageOptions[ 'files' ] as $key => $file ) {
				$parameters[ $key ] = $this->getCurlFileValue( $file[ 'fileName' ], $file[ 'mimeType' ], $file[ 'postFileName'] );
			}
		}

		if( $this->packageOptions[ 'asJsonRequest' ] ) {
			$parameters = json_encode($parameters);
		}

		$this->curlOptions[ 'POSTFIELDS' ] = $parameters;
	}

	protected function getCurlFileValue($filename, $mimeType, $postFileName) {
		// PHP 5 >= 5.5.0, PHP 7
		if( function_exists('curl_file_create') ) {
			return curl_file_create($filename, $mimeType, $postFileName);
		}

		// Use the old style if using an older version of PHP
		$value = "@{$filename};filename=" . $postFileName;
		if( $mimeType ) {
			$value .= ';type=' . $mimeType;
		}

		return $value;
	}

	public function put() {
		$this->setPostParameters();

		return $this->withOption('CUSTOMREQUEST', 'PUT')
		->send();
	}

	public function patch() {
		$this->setPostParameters();

		return $this->withOption('CUSTOMREQUEST', 'PATCH')
		->send();
	}

	public function delete() {
		$this->appendDataToURL();

		return $this->withOption('CUSTOMREQUEST', 'DELETE')
		->send();
	}

	protected function send() {
		// Add JSON header if necessary
		if( $this->packageOptions[ 'asJsonRequest' ] ) {
			$this->withHeader( 'Content-Type: application/json' );
		}

		if( $this->packageOptions[ 'enableDebug' ] ) {
			$debugFile = fopen( $this->packageOptions[ 'debugFile' ], 'w');
			$this->withOption('STDERR', $debugFile);
		}

		// Create the request with all specified options
		$this->curlObject = curl_init();
		$options = $this->forgeOptions();
		curl_setopt_array( $this->curlObject, $options );

		// Send the request
		$response = curl_exec( $this->curlObject );

		$responseHeader = null;
		if( $this->curlOptions[ 'HEADER' ] ) {
			$headerSize = curl_getinfo( $this->curlObject, CURLINFO_HEADER_SIZE );
			$responseHeader = substr( $response, 0, $headerSize );
			$response = substr( $response, $headerSize );
		}

		// Capture additional request information if needed
		$responseData = array();
		if( $this->packageOptions[ 'responseObject' ] || $this->packageOptions[ 'responseArray' ] ) {
			$responseData = curl_getinfo( $this->curlObject );

			if( curl_errno($this->curlObject) ) {
				$responseData[ 'errorMessage' ] = curl_error($this->curlObject);
			}
		}

		curl_close( $this->curlObject );

		if( $this->packageOptions[ 'saveFile' ] ) {
			// Save to file if a filename was specified
			$file = fopen($this->packageOptions[ 'saveFile' ], 'w');
			fwrite($file, $response);
			fclose($file);
		} else if( $this->packageOptions[ 'asJsonResponse' ] ) {
			// Decode the request if necessary
			$response = json_decode($response, $this->packageOptions[ 'returnAsArray' ]);
		}

		if( $this->packageOptions[ 'enableDebug' ] ) {
			fclose( $debugFile );
		}

		// Return the result
		return $this->returnResponse( $response, $responseData, $responseHeader );
	}

	protected function parseHeaders($headerString) {
		$headers = array_filter(array_map(function ($x) {
			$arr = array_map('trim', explode(':', $x, 2));
			if( count($arr) == 2 ) {
				return [ $arr[ 0 ] => $arr[ 1 ] ];
			}
		}, array_filter(array_map('trim', explode("\r\n", $headerString)))));

		return $this->arrayCollapse($headers);
	}

	protected function returnResponse($content, array $responseData = array(), $header = null) {
		if( !$this->packageOptions[ 'responseObject' ] && !$this->packageOptions[ 'responseArray' ] ) {
			return $content;
		}

		$object = new \stdClass();
		$object->content = $content;
		$object->status = $responseData[ 'http_code' ];
		$object->contentType = $responseData[ 'content_type' ];
		if( array_key_exists('errorMessage', $responseData) ) {
			$object->error = $responseData[ 'errorMessage' ];
		}

		if( $this->curlOptions[ 'HEADER' ] ) {
			$object->headers = $this->parseHeaders( $header );
		}

		$object->info = $responseData;

		if( $this->packageOptions[ 'responseObject' ] ) {
			return $object;
		}

		if( $this->packageOptions[ 'responseArray' ] ) {
			return (array) $object;
		}

		return $content;
	}

	protected function forgeOptions() {
		$results = array();
		foreach( $this->curlOptions as $key => $value ) {
			$arrayKey = constant( 'CURLOPT_' . $key );

			if( !$this->packageOptions[ 'containsFile' ] && $key == 'POSTFIELDS' && is_array( $value ) ) {
				$results[ $arrayKey ] = http_build_query( $value, null, '&' );
			} else {
				$results[ $arrayKey ] = $value;
			}
		}

		if( !empty($this->packageOptions[ 'xDebugSessionName' ]) ) {
			$char = strpos($this->curlOptions[ 'URL' ], '?') ? '&' : '?';
			$this->curlOptions[ 'URL' ] .= $char . 'XDEBUG_SESSION_START='. $this->packageOptions[ 'xDebugSessionName' ];
		}

		return $results;
	}

	protected function appendDataToURL() {
		$parameterString = '';
		if( is_array($this->packageOptions[ 'data' ]) && count($this->packageOptions[ 'data' ]) != 0 ) {
			$parameterString = '?'. http_build_query( $this->packageOptions[ 'data' ], null, '&' );
		}

		return $this->curlOptions[ 'URL' ] .= $parameterString;
	}

	protected function arrayCollapse($array) {
		$results = [];

		foreach($array as $values) {
			if( !is_array($values) ) {
				continue;
			}

			$results[] = $values;
		}

		return array_merge([], ...$results);
	}
}