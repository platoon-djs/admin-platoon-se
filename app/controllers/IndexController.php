<?php

use Service\Auth\Authenticator;

class IndexController extends BaseController {

	public function index() {

		if (Authenticator::isAuthenticated()) {
			include TEMPLATE_PATH . 'index.html';
		} else {
			include TEMPLATE_PATH . 'auth/login.html';
		}
	}
}