package com.exp.ui.controller;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.exp.ui.dto.Expense;

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

	@GetMapping("/api/expenses")
	@ResponseBody
	public ResponseEntity<List<Expense>> expenseDetails() {

		DateTimeFormatter formatter = DateTimeFormatter
                .ofPattern("dd-MM-yyyy HH:mm:ss")
                .withZone(ZoneId.systemDefault());

        String formatted = formatter.format(Instant.now());

		List<Expense> expense = List.of(
				new Expense(ThreadLocalRandom.current().nextInt(1000, 10000), "Veg", new BigDecimal(1200),
						formatted),
				new Expense(ThreadLocalRandom.current().nextInt(1000, 10000), "Fruits", new BigDecimal(234),
						formatted),
				new Expense(ThreadLocalRandom.current().nextInt(1000, 10000), "Hotel", new BigDecimal(12345),
						formatted),
				new Expense(ThreadLocalRandom.current().nextInt(1000, 10000), "Trip", new BigDecimal(6000),
						formatted));

		return new ResponseEntity<List<Expense>>(expense, HttpStatus.OK);

	}

}