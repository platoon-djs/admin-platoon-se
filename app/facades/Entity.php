<?php

namespace Facade;


use Service\Registry;

class Entity {

	// Singleton pattern
	private static $_em;

	public static function getDoctrine()
	{
		if(empty(self::$_em)) {
			self::$_em = Registry::get('em');
		}

		return self::$_em;
	}


	// Define repositories below
	public static function getUsers()
	{
		return self::getDoctrine()->getRepository('Entities\TestUser');
	}


	// Helpfull methods
	public static function insert($entity)
	{
		$doctrine = self::getDoctrine();
		$doctrine->persist($entity);

		return $doctrine;
	}

	public static function update($entity)
	{
		$doctrine = self::getDoctrine();
		$doctrine->merge($entity);

		return $doctrine;
	}

	public static function delete($entity)
	{
		$doctrine = self::getDoctrine();
		$doctrine->remove($entity);

		return $doctrine;
	}

	public static function flush($entity = null)
	{
		$doctrine = self::getDoctrine();
		$doctrine->flush($entity);

		return $doctrine;
	}
}