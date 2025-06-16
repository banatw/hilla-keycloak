package com.example.application.services;

import java.util.Optional;

import com.example.application.data.Employee;
import com.example.application.data.EmployeeRepository;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;

import jakarta.annotation.security.RolesAllowed;

@BrowserCallable
@RolesAllowed(value = {"ROLE_ADMIN"})
public class EmployeeService extends ListRepositoryService<Employee,Integer,EmployeeRepository> {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository repository) {
        this.employeeRepository = repository;
    }

    public String simpan(Employee employee) {
        Optional<Employee> result = Optional.of(employeeRepository.save(employee));
        if(result.isEmpty()) {
            return "Gagal";
        }
        return "Data Tersimpan";
    }

     public String delete(Integer id) {
        employeeRepository.deleteById(id);
        return "Data Terhapus";
    }

    
}
