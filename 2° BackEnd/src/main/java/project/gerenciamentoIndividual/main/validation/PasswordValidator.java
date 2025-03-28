package project.gerenciamentoIndividual.main.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import project.gerenciamentoIndividual.main.interfaces.PasswordValidationConstraint;

public class PasswordValidator implements ConstraintValidator<PasswordValidationConstraint, String> {

    @Override
    public void initialize(PasswordValidationConstraint userValidation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext cxt) {
    	Boolean result = password != null && (password.length() > 7) && (password.length() < 80); 
        return result;
    }

}