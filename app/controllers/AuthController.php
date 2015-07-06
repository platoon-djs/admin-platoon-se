<?php

use Facade\Entity as EntityManager;

class AuthController extends BaseController {

	function submit() {
		$data = $this->getAllParams();

		$name = $data['name'];
		$password = $data['password'];

		$valid = false;

		if (!empty($name) && !empty($password)) {
			$user = EntityManager::getUsers()->findOneBy(['username' => $name]);
			if (!empty($user) && Service\Auth::validatePassword($password, $user->getPasswordHash())) {
				$valid = true;
			}
		}

		echo json_encode(compact('valid'));
	}

}