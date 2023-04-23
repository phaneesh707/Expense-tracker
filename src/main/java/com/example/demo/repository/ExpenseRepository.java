package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.models.Expense;
import com.example.demo.models.User;

@RepositoryRestResource
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findAllByOrderByDateDesc();
	
	List<Expense> findAllByDateGreaterThanOrderByDateAsc(String date);

	List<Expense> findAllByDateLessThanOrderByDateAsc(String date);

	List<Expense> findByUser(User user);

	
}
