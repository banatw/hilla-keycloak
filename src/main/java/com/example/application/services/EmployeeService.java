package com.example.application.services;

import com.example.application.data.Employee;
import com.example.application.data.EmployeeRepository;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;

import jakarta.annotation.security.RolesAllowed;

@BrowserCallable
@RolesAllowed(value = {"ROLE_ADMIN"})
public class EmployeeService extends ListRepositoryService<Employee,Integer,EmployeeRepository> {
    
}
