package com.exp.ui.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record Expense(Integer id , String category , BigDecimal amount , String date) {

}
