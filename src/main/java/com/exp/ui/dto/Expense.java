package com.exp.ui.dto;

import java.math.BigDecimal;

public record Expense(Integer id , String category , BigDecimal amount , String date) {

}
