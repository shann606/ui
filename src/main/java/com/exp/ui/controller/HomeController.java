package com.exp.ui.controller;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
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
		return "login1";
	}

	@GetMapping("/users/edit")
	public String editUser(@RequestHeader(name = "X-Username") String username, @RequestHeader("X-Roles") String roles,
			@RequestParam String id, Model model) {

		System.out.println("id::: " + id);

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());
		return "edituser1";
	}

	@GetMapping("/users")
	public String userManagement(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id, Model model) {
		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());
		return "usermanagement1";
	}

	@GetMapping("/dashboard")
	public String dashBoard(@RequestHeader(name = "X-Username") String username, @RequestHeader("X-Roles") String roles,
			@RequestHeader("X-Id") String id, Model model) {
		System.out.println("Getting id of the user " + id);

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "dashboard1";

	}

	@GetMapping("/editprofile")
	public String editProfile(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id, Model model) {

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "edituser1";

	}

	@GetMapping("/categories/add")
	public String categories(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id, Model model) {

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "categories1";

	}

	@GetMapping("/categories/search")
	public String categorieSearch(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id, Model model) {

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "categorysearch1";

	}

	@GetMapping("/categories/subcategories")
	public String subCategories(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id, Model model) {

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "subcategories";

	}

	@GetMapping("/categories/subcategories/add")
	public String addSubCategories(@RequestHeader(name = "X-Username") String username,
			@RequestHeader("X-Roles") String roles, @RequestHeader("X-Id") String id,
			Model model) {

		model.addAttribute("id", id);
		model.addAttribute("username", username);
		model.addAttribute("roles", Arrays.stream(roles.split(",")).toList());

		System.out.println("Are we getting the data ===" + username + "----" + roles);

		return "addSubcategories";

	}

	@GetMapping("/register")
	public String registerPage() {
		return "register1";
	}

}