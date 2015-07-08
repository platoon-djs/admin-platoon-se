<?php

use Facade\Entity as EntityManager;
use Service\Auth\PasswordValidator;

class AuthController extends BaseController {

	function submit() {
		$data = $this->getAllParams();

		$name = $data['name'];
		$password = $data['password'];

		$valid = false;

		if (!empty($name) && !empty($password)) {
			$user = EntityManager::getUsers()->findOneBy(['username' => $name]);
			if (!empty($user) && PasswordValidator::validate($password, $user->getPasswordHash())) {
				$valid = true;
			}
		}

		echo json_encode(compact('valid'));
	}

}