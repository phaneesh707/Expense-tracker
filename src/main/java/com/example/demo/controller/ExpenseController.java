package com.example.demo.controller;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Expense;
import com.example.demo.models.User;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.UserRepository;

@RestController
public class ExpenseController {
	
	@Autowired
	private ExpenseRepository expenseRepository;

	@Autowired
	private UserRepository userRepository;
		
	//get all expenses
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/expenses")
	@ResponseBody
	public List<Expense> getExpenses() {	
		return (List<Expense>) expenseRepository.findAllByOrderByDateDesc();
	}


	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/expense/{id}")
	@ResponseBody
	public List<Expense> getExpensesUser(@PathVariable Long id) {	
		return (List<Expense>) expenseRepository.findAllByOrderByDateDesc();
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/balance")
	@ResponseBody
	public String getBalance() {
		double balance = 0;
		
		List<Expense> expenses = expenseRepository.findAll();
		
		for(int i = 0; i < expenses.size(); i++) {
			balance += expenses.get(i).getCost();
		}
		System.out.println(balance);
		DecimalFormat df = new DecimalFormat("#.##");
		String formattedBalance = df.format(balance);
		
		return formattedBalance;
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@PostMapping("/add")
	public void addExpense(@RequestBody Expense expense) {
		expenseRepository.save(expense);
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/recent")
	@ResponseBody
	public List<Expense> getRecentExpenses() {	
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, -7);
		String formattedDate = dateFormat.format(cal.getTime());
		return expenseRepository.findAllByDateGreaterThanOrderByDateAsc(formattedDate);
	}



	//create expense
	@CrossOrigin(origins="http://localhost:3000")
	@PostMapping("addExp/{userId}")
	@ResponseBody
    public ResponseEntity<?> createExpense(@PathVariable Long userId, @RequestBody Expense expense){
        User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("User does not exist");
        }
        expense.setUser(user);
        expenseRepository.save(expense);
        return ResponseEntity.ok(expense);
    }
    

	// get expense by id
	@CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/userexp/{userId}")
	@ResponseBody
    public ResponseEntity<?> getAllExpenseUser(@PathVariable Long userId){
        User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            return ResponseEntity.badRequest().body("User does not exist");
        }
        List<Expense> expenses = expenseRepository.findByUser(user);
        return ResponseEntity.ok(expenses);
    }


	//delete expense
	@CrossOrigin(origins="http://localhost:3000")
	@DeleteMapping("/delexp/{expenseId}")
	@ResponseBody
    public ResponseEntity<?> deleteExpense(@PathVariable("expenseId") Long expenseId) {
        try {
            Expense expense = expenseRepository.findById(expenseId).orElseThrow(() -> new ResourceNotFoundException("Expense not found with id " + expenseId));
            expenseRepository.delete(expense);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


	//update the epxense 
	@CrossOrigin(origins="http://localhost:3000")
	@PutMapping("update/{id}")
	@ResponseBody
    public ResponseEntity<Expense> updateExpenseById(@PathVariable(value = "id") Long expenseId,@Valid @RequestBody Expense expenseDetails) {
        Expense expense = expenseRepository
			.findById(expenseId)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));
        
        expense.setDate(expenseDetails.getDate());
        expense.setTitle(expenseDetails.getTitle());
        expense.setCost(expenseDetails.getCost());
        expense.setCategory(expenseDetails.getCategory());
        expense.setDescription(expenseDetails.getDescription());
        
        Expense updatedExpense = expenseRepository.save(expense);
        return ResponseEntity.ok(updatedExpense);
    }
}
