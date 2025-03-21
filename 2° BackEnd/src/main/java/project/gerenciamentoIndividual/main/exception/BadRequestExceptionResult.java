package project.gerenciamentoIndividual.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestExceptionResult extends RuntimeException{
	private final static long serialVersionUID = 1L;
	
	public BadRequestExceptionResult(String exception) {
		super(exception);
	}
}