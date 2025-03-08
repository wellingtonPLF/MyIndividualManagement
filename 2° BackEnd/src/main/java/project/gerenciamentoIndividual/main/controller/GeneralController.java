package project.gerenciamentoIndividual.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.format.StatusResult;


@RestController
public class GeneralController {
	
	@PreAuthorize("permitAll()")
	@GetMapping("/")
	public StatusResult<?> serverStatus() {
		return new StatusResult<String>(HttpStatus.OK.value(), "Success!");
	}
}