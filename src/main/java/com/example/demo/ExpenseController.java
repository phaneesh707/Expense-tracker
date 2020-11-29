package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExpenseController {
	
	@Autowired
	private ExpenseRepository expenseRepository;
		
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/expenses")
	@ResponseBody
	public List<Expense> getExpenses() {	
		return (List<Expense>) expenseRepository.findAll();
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/balance")
	@ResponseBody
	public double getBalance() {
		double balance = 0;
		
		List<Expense> expenses = expenseRepository.findAll();
		
		for(int i = 0; i < expenses.size(); i++) {
			balance += expenses.get(i).getCost();
		}
		
		return balance;
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@PostMapping("/add")
	public void addExpense(@RequestBody Expense expense) {
		System.out.println("Added Expenses");
		expenseRepository.save(expense);
	}
}
