package project.gerenciamentoIndividual.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.gerenciamentoIndividual.main.dtoModel.AuthDTO;
import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.jpaModel.AuthJPA;
import project.gerenciamentoIndividual.main.service.AuthenticationService;

@RestController
@RequestMapping("/")
public class AuthController {
	
	@Autowired
	private AuthenticationService authService;
	
	@PreAuthorize("permitAll()")
	@PostMapping("/credentials/authentication")
	public StatusResult<?> authentication(@Valid @RequestBody AuthDTO auth) {
		return this.authService.authenticate(auth); 
	}
	
	@PreAuthorize("permitAll()")
	@GetMapping("/credentials/isLoggedIn")
	public Boolean isLogged() {
		return this.authService.isLogged();
	}
		
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	@PostMapping("/credentials/acceptAuth")
	public StatusResult<?> acceptAuth(@Valid @RequestBody AuthJPA auth) {
		return this.authService.acceptAuth(auth);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	@PostMapping("/credentials/authUpdate")
	public StatusResult<?> authUpdate(@Valid @RequestBody AuthJPA auth) {
		return this.authService.authUpdate(auth);
	}
	
	@PreAuthorize("permitAll()")
	@GetMapping("/credentials/refresh")
	public StatusResult<?> refresh() {
		return this.authService.refresh();
	}
		
	@PreAuthorize("permitAll()")
	@GetMapping("/credentials/logout")
	public StatusResult<?> logout() {
		return this.authService.logout();
	}
}