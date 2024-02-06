package project.gerenciamentoIndividual.main.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(RuntimeException.class)
	public final ResponseEntity<?> handleAllExceptions(RuntimeException message) {
		return new ResponseEntity<String>(message.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}