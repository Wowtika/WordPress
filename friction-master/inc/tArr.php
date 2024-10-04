<?php
if( !class_exists('tArr') ) {
	class tArr {
		public static function accessible($value) {
			return is_array($value);
		}

		public static function add($array, $key, $value) {
			if( is_null(static::get($array, $key)) ) {
				static::set($array, $key, $value);
			}

			return $array;
		}

		public static function collapse($array) {
			$results = [];

			foreach($array as $values) {
				if( ! is_array($values) ) {
					continue;
				}

				$results = array_merge($results, $values);
			}

			return $results;
		}

		public static function crossJoin(...$arrays) {
			$results = [[]];

			foreach($arrays as $index => $array) {
				$append = [];

				foreach($results as $product) {
					foreach($array as $item) {
						$product[$index] = $item;

						$append[] = $product;
					}
				}

				$results = $append;
			}

			return $results;
		}

		public static function divide($array) {
			return [array_keys($array), array_values($array)];
		}

		public static function dot($array, $prepend = '') {
			$results = [];

			foreach($array as $key => $value) {
				if( is_array($value) && ! empty($value) ) {
					$results = array_merge($results, static::dot($value, $prepend.$key.'.'));
				} else {
					$results[$prepend.$key] = $value;
				}
			}

			return $results;
		}

		public static function except($array, $keys) {
			static::forget($array, $keys);

			return $array;
		}

		public static function exists($array, $key) {
			if( is_array($array) ) {
				return array_key_exists($key, $array);
			}

			return false;
		}

		public static function first($array, callable $callback = null, $default = null) {
			if( is_null($callback) ) {
				if( empty($array) ) {
					return $default;
				}

				foreach($array as $item) {
					return $item;
				}
			}

			foreach($array as $key => $value) {
				if( call_user_func($callback, $value, $key) ) {
					return $value;
				}
			}

			return $default;
		}

		public static function last($array, callable $callback = null, $default = null) {
			if( is_null($callback) ) {
				return empty($array) ? $default : end($array);
			}

			return static::first(array_reverse($array, true), $callback, $default);
		}

		public static function flatten($array, $depth = INF) {
			$result = [];

			foreach($array as $item) {
				if(! is_array($item)) {
					$result[] = $item;
				} elseif( $depth === 1 ) {
					$result = array_merge($result, array_values($item));
				} else {
					$result = array_merge($result, static::flatten($item, $depth - 1));
				}
			}

			return $result;
		}

		public static function forget(&$array, $keys) {
			$original = &$array;

			$keys = (array) $keys;

			if( count($keys) === 0 ) {
				return;
			}

			foreach($keys as $key) {
				if( static::exists($array, $key) ) {
					unset($array[$key]);

					continue;
				}

				$parts = explode('.', $key);

				$array = &$original;

				while( count($parts) > 1 ) {
					$part = array_shift($parts);

					if( isset($array[$part]) && is_array($array[$part]) ) {
						$array = &$array[$part];
					} else {
						continue 2;
					}
				}

				unset($array[array_shift($parts)]);
			}
		}

		public static function get($array, $key, $default = null) {
			if( ! static::accessible($array) ) {
				return $default;
			}

			if( is_null($key) ) {
				return $array;
			}

			if( static::exists($array, $key) ) {
				return $array[$key];
			}

			if( strpos($key, '.') === false ) {
				return isset($array[$key]) ? $array[$key] : $default;
			}

			foreach(explode('.', $key) as $segment) {
				if( static::accessible($array) && static::exists($array, $segment) ) {
					$array = $array[$segment];
				} else {
					return $default;
				}
			}

			return $array;
		}

		public static function has($array, $keys) {
			if( is_null($keys) ) {
				return false;
			}

			$keys = (array) $keys;

			if( !$array ) {
				return false;
			}

			if( $keys === [] ) {
				return false;
			}

			foreach($keys as $key) {
				$subKeyArray = $array;

				if( static::exists($array, $key) ) {
					continue;
				}

				foreach(explode('.', $key) as $segment) {
					if( static::accessible($subKeyArray) && static::exists($subKeyArray, $segment) ) {
						$subKeyArray = $subKeyArray[$segment];
					} else {
						return false;
					}
				}
			}

			return true;
		}

		public static function isAssoc(array $array) {
			$keys = array_keys($array);

			return array_keys($keys) !== $keys;
		}

		public static function only($array, $keys) {
			return array_intersect_key($array, array_flip((array) $keys));
		}

		public static function pluck($array, $value, $key = null) {
			$results = [];

			list($value, $key) = static::explodePluckParameters($value, $key);

			foreach($array as $item) {
				$itemValue = static::d_get($item, $value);

				if( is_null($key) ) {
					$results[] = $itemValue;
				} else {
					$itemKey = data_get($item, $key);

					if( is_object($itemKey) && method_exists($itemKey, '__toString') ) {
						$itemKey = (string) $itemKey;
					}

					$results[$itemKey] = $itemValue;
				}
			}

			return $results;
		}

		protected static function explodePluckParameters($value, $key) {
			$value = is_string($value) ? explode('.', $value) : $value;

			$key = is_null($key) || is_array($key) ? $key : explode('.', $key);

			return [$value, $key];
		}

		public static function prepend($array, $value, $key = null) {
			if( is_null($key) ) {
				array_unshift($array, $value);
			} else {
				$array = [$key => $value] + $array;
			}

			return $array;
		}

		public static function pull(&$array, $key, $default = null) {
			$value = static::get($array, $key, $default);

			static::forget($array, $key);

			return $value;
		}

		public static function random($array, $number = null) {
			$requested = is_null($number) ? 1 : $number;

			$count = count($array);

			if( is_null($number) ) {
				return $array[array_rand($array)];
			}

			if( (int) $number === 0 ) {
				return [];
			}

			$number = min($number, $count);

			$keys = array_rand($array, $number);

			$results = [];

			foreach((array) $keys as $key) {
				$results[] = $array[$key];
			}

			return $results;
		}

		public static function set(&$array, $key, $value) {
			if( is_null($key) ) {
				return $array = $value;
			}

			$keys = explode('.', $key);

			while (count($keys) > 1) {
				$key = array_shift($keys);

				if( ! isset($array[$key]) || ! is_array($array[$key]) ) {
					$array[$key] = [];
				}

				$array = &$array[$key];
			}

			$array[array_shift($keys)] = $value;

			return $array;
		}

		public static function shuffle($array) {
			shuffle($array);

			return $array;
		}

		public static function sortRecursive($array) {
			foreach($array as &$value) {
				if( is_array($value) ) {
					$value = static::sortRecursive($value);
				}
			}

			if( static::isAssoc($array) ) {
				ksort($array);
			} else {
				sort($array);
			}

			return $array;
		}

		public static function where($array, callable $callback) {
			return array_filter($array, $callback, ARRAY_FILTER_USE_BOTH);
		}

		public static function wrap($value) {
			return ! is_array($value) ? [$value] : $value;
		}

		public static function d_get($target, $key = null, $default = null) {
			if( is_null($key) ) {
				return $target;
			}

			$key = is_array($key) ? $key : explode('.', $key);

			while( !is_null($segment = array_shift($key)) ) {
				if ($segment === '*') {
					if( !is_array($target) ) {
						return $default;
					}

					$result = static::pluck($target, $key);

					return in_array('*', $key) ? static::collapse($result) : $result;
				}

				if( static::accessible($target) && static::exists($target, $segment) ) {
					$target = $target[$segment];
				} elseif( is_object($target) && isset($target->{$segment}) ) {
					$target = $target->{$segment};
				} else {
					return $default;
				}
			}

			return $target;
		}

		public static function d_set(&$target, $key, $value, $overwrite = true) {
			$segments = is_array($key) ? $key : explode('.', $key);

			if( ($segment = array_shift($segments)) === '*' ) {
				if( !static::accessible($target) ) {
					$target = [];
				}

				if( $segments ) {
					foreach($target as &$inner) {
						static::d_set($inner, $segments, $value, $overwrite);
					}
				} elseif( $overwrite ) {
					foreach($target as &$inner) {
						$inner = $value;
					}
				}
			} elseif( static::accessible($target) ) {
				if( $segments ) {
					if( !static::exists($target, $segment) ) {
						$target[$segment] = [];
					}

					static::d_set($target[$segment], $segments, $value, $overwrite);
				} elseif( $overwrite || !static::exists($target, $segment) ) {
					$target[$segment] = $value;
				}
			} elseif( is_object($target) ) {
				if( $segments ) {
					if( !isset($target->{$segment}) ) {
						$target->{$segment} = [];
					}

					static::d_set($target->{$segment}, $segments, $value, $overwrite);
				} elseif( $overwrite || ! isset($target->{$segment}) ) {
					$target->{$segment} = $value;
				}
			} else {
				$target = [];

				if( $segments ) {
					static::d_set($target[$segment], $segments, $value, $overwrite);
				} elseif( $overwrite ) {
					$target[$segment] = $value;
				}
			}

			return $target;
		}

		public static function toJson($array, $pretty = false) {
			$params = 0;
			if( defined('JSON_UNESCAPED_UNICODE') ) {
				$params |= JSON_UNESCAPED_UNICODE;
			}
			if( defined('JSON_PRETTY_PRINT') && $pretty ) {
				$params |= JSON_PRETTY_PRINT;
			}
			if( defined('JSON_UNESCAPED_SLASHES') ) {
				$params |= JSON_UNESCAPED_SLASHES;
			}
			if( defined('JSON_PRETTY_PRINT') && $pretty ) {
				$params |= JSON_PRETTY_PRINT;
			}

			$json = @json_encode($array, $params );

			return $json;
		}
		
		public static function fromJson($json) {
			$array = array();
			if( is_string($json) ) {
				$array = @json_decode($json, true);
			}

			return $array;
		}

		public static function search($items, $key, $value = null) {
			$items = array_filter($items, function($item) use ($key, $value){
				if( is_array($key) ) {
					$add = true;
					foreach($key as $data) {
						$a = $data[0];
						$b = $data[1];
						$a_val = tArr::d_get($item, $a);

						if( count($data) == 2 ) {
							if( $a_val != $b ) {
								$add = false;
							}
						} elseif( count($data) == 3 ) {
							$c = $data[2];
							if( $c == '!=' ) {
								if( $a_val == $b ) {
									$add = false;
								}
							} elseif( $c == 'in' ) {
								if( !is_array($b) ) {
									$b = array($b);
								}

								$in_add = false;
								foreach($b as $_b) {
									if( $a_val == $_b ) {
										$in_add = true;
									}
								}
								
								$add = $in_add;
							}
						}
					}

					return $add;
				} else {
					return tArr::d_get($item, $key) == $value;
				}
			});

			return $items;
		}

		static public function groupBy($data, $groupBy, $preserveKeys = false) {
			if( is_array($groupBy) ) {
				$nextGroups = $groupBy;

				$groupBy = array_shift($nextGroups);
			}

			$groupBy = self::valueRetriever( $groupBy );

			$results = array();

			foreach($data as $key=>$value) {
				$groupKeys = $groupBy($value, $key);

				if( !is_array($groupKeys) ) {
					$groupKeys = array($groupKeys);
				}

				foreach($groupKeys as $groupKey) {
					$groupKey = is_bool($groupKey) ? (int) $groupKey : $groupKey;

					if( !array_key_exists($groupKey, $results) ) {
						$results[$groupKey] = array();
					}

					self::offsetSet($results[$groupKey], $preserveKeys ? $key : null, $value);
				}
			}

			$result = $results;

			if( !empty($nextGroups) ) {
				return array_map(function($item) use ($nextGroups, $preserveKeys) {
					return self::groupBy($item, $nextGroups, $preserveKeys);
				}, $result);
			}

			return $result;
		}

		static protected function valueRetriever($value) {
			if( self::useAsCallable($value) ) {
				return $value;
			}

			return function($item) use ($value) {
				return self::d_get($item, $value);
			};
		}

		static protected function useAsCallable($value) {
			return !is_string($value) && is_callable($value);
		}

		static public function offsetSet(&$data, $key, $value) {
			if( is_null($key) ) {
				$data[] = $value;
			} else {
				$data[$key] = $value;
			}

			return $data;
		}
	}
}
?>