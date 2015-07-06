<?php

namespace Service;


class Registry {

	private $_registry = [];

	// Singleton pattern
	private static $_instance;

	public static function getInstance()
	{
		if (empty(self::$_instance)) {
			self::$_instance = new Registry();
		}

		return self::$_instance;
	}


	public static function get($key)
	{
		return self::getInstance()->_get($key);
	}

	public static function set($key, $value)
	{
		return self::getInstance()->_set($key, $value);
	}

	private function _get($key)
	{
		if (!isset($this->_registry[$key])) {
			throw new \Exception('No key found: '.$key);
		}
		return $this->_registry[$key];
	}

	private function _set($key, $value)
	{
		if (isset($this->_registry[$key])) {
			throw new \Exception('Already registred: '.$key);
		}
		$this->_registry[$key] = $value;
		return $value;
	}

}