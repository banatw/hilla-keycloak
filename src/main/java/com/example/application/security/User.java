package com.example.application.security;

import java.util.Collection;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import jakarta.annotation.Nonnull;

public class User {
    
    @Nonnull
    private String username;

    @Nonnull
    private String firstname;

    @Nonnull
    private String lastname;

    @Nonnull
    private String email;

    @Nonnull
    private Collection<String> roles;

    public User(OidcUser oidcUser, Collection<String> roles) {
        this.username = oidcUser.getPreferredUsername();
        this.firstname =oidcUser.getGivenName();
        this.lastname = oidcUser.getFamilyName();
        this.email = oidcUser.getEmail();
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    
}
