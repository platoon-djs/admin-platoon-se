<?php


class AuthController extends BaseController {


	function submit() {
		$valid = false;
		$data = $this->getAllParams();
		echo json_encode(compact('valid', 'data'));
	}

}