/**
 * Copy platoon DJs 2014 - 2015
 */
(function(window, angular) {
"use strict";
angular.module("platoon.tpls", []).run(["$templateCache", function($templateCache) {$templateCache.put("tpl/cms/index.html","<div class=\"container\">\n	<div class=\"row\">\n		<div class=\"col-md-12\">\n			<div class=\"page-header\">\n				<h3>CMS</h3>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("tpl/dashboard/index.html","<h1>Dashboard</h1>");
$templateCache.put("tpl/config/index.html","<h1>Config</h1>");
$templateCache.put("tpl/event/index.html","\n<div class=\"container\">\n	<div class=\"row\">\n		<div class=\"col-md-12\">\n			<div class=\"page-header\"><h3>Calender Test</h3></div>\n		</div>\n	</div>\n\n	<div class=\"row\">\n		<div class=\"col-md-12\">\n			<div ui-calendar ng-model=\"eventSources\"></div>\n		<br>\n		<br>\n		<br>\n		<br>\n		</div>\n	</div>\n</div>");}]);
})(window, window.angular);