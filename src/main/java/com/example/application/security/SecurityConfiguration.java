package com.example.application.security;

import com.vaadin.flow.spring.security.VaadinWebSecurity;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends VaadinWebSecurity {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(
                authorize -> authorize.requestMatchers(new AntPathRequestMatcher("/images/*.png")).permitAll());

        // Icons from the line-awesome addon
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(new AntPathRequestMatcher("/line-awesome/**/*.svg")).permitAll());

        super.configure(http);
        setOAuth2LoginPage(http, "/oauth2/authorization/keycloak");
        // http.logout(logout -> logout.logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))));
    }

    

    @Override
    protected void configure(WebSecurity web) throws Exception {
        // TODO Auto-generated method stub
        web.ignoring().requestMatchers("/h2-console/**");
    }

    @Bean
    GrantedAuthoritiesMapper userAuthoritiesMapper() {
		return (authorities) -> {
			Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

			authorities.forEach(authority -> {
				if (OidcUserAuthority.class.isInstance(authority)) {
					OidcUserAuthority oidcUserAuthority = (OidcUserAuthority)authority;

					// OidcIdToken idToken = oidcUserAuthority.getIdToken();
					OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();
                    List<String> roles = userInfo.getClaim("roles");
					// Map the claims found in idToken and/or userInfo
					// to one or more GrantedAuthority's and add it to mappedAuthorities
                    roles.stream().forEach(r -> {
                        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(r);
                        mappedAuthorities.add(simpleGrantedAuthority);
                    });

				} else if (OAuth2UserAuthority.class.isInstance(authority)) {
					OAuth2UserAuthority oauth2UserAuthority = (OAuth2UserAuthority)authority;

					Map<String, Object> userAttributes = oauth2UserAuthority.getAttributes();

					// Map the attributes found in userAttributes
					// to one or more GrantedAuthority's and add it to mappedAuthorities

				}
			});

			return mappedAuthorities;
		};
	}

    @Override
    public String toString() {
        return "SecurityConfiguration []";
    }

}
