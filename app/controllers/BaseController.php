<?php


/**
 * BaseController
 */
class BaseController
{
	protected $app;
	protected $data;

	public function __construct()
	{
		$this->app = \Slim\Slim::getInstance();
		$this->data = [];
		$this->data['title'] = '';
	}

	/**
	 * Heleper render function
	 */
	protected function render($view, $data = null)
	{
		$this->app->render($view, array_merge($this->data, !empty($data) ? $data : []));
	}

	protected function getParam($name, $default = null)
	{
		$data = $this->getAllParams();
		return isset($data[$name]) ? $data[$name] : $default;
	}

	protected function getAllParams()
	{
		$body = $this->app->request->getBody();
		try {
			$params = json_decode($body, true);
		} catch(Exception $e) {
			$params = [];
		}
		return $params;
	}
}