package project.gerenciamentoIndividual.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundExceptionResult extends RuntimeException {
	
	private final static long serialVersionUID = 1L;
	
	public NotFoundExceptionResult(String exception) {
		super(exception);
	}
}