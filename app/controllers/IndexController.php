<?php

class IndexController extends BaseController {

	public function index() {
		include TEMPLATE_PATH . 'auth/login.html';
	}
}