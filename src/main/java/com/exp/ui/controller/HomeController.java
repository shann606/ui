package com.exp.ui.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class HomeController {

	@GetMapping("favicon.ico")
	@ResponseStatus(code = HttpStatus.OK)
	public void returnNoFavicon() {
		// Returns an empty body to keep browsers and Spring logs happy
	}

	@GetMapping("/")
	public String home() {
		return "home";
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}
	

	@GetMapping("/dashboard")
	public String dashboard() {
		return "dashboard";
	}


}