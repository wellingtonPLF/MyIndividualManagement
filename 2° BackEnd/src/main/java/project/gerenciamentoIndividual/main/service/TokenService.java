package project.gerenciamentoIndividual.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.WebUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import project.gerenciamentoIndividual.main.enumState.JwtType;
import project.gerenciamentoIndividual.main.exception.AuthenticationExceptionResponse;
import project.gerenciamentoIndividual.main.exception.BadRequestExceptionResult;
import project.gerenciamentoIndividual.main.exception.NotFoundExceptionResult;
import project.gerenciamentoIndividual.main.model.Auth;
import project.gerenciamentoIndividual.main.model.Role;
import project.gerenciamentoIndividual.main.model.Token;
import project.gerenciamentoIndividual.main.repositories.AuthRepository;
import project.gerenciamentoIndividual.main.repositories.TokenRepository;
import project.gerenciamentoIndividual.main.util.JwtUtil;

@Service
public class TokenService {
	
	@Value("${security.jwt.tokenName}")
	private String accessToken;
	@Autowired
	private TokenRepository tokenRepository;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthRepository authRepository;
		
	public Token findById(Long id) {
		Token token = this.tokenRepository.findById(id).orElseThrow(
			() -> new NotFoundExceptionResult("The requested TokenId was not found."));
		return token;
	}
	
	public Token findByToken(String token) {
		Token jwtDB = this.tokenRepository.findBy_token(token).orElseThrow(
			() -> new AuthenticationExceptionResponse(JwtType.INVALID_AT.toString())
		);
		return jwtDB;
	}
	
	@Transactional
	public void insertUpdate(Token token) {
		try {
			Token tokenDB = this.tokenRepository.findByAuthID(token.getAuth().getId()).orElse(null);
			if (tokenDB != null) {
				tokenDB.setToken(token.getToken());
				this.tokenRepository.save(tokenDB);
			}
			else {
				this.tokenRepository.save(token);
			}			
		}
		catch(Exception e) {
			throw new BadRequestExceptionResult("TokenId is Null");
		}
	}
	
	public void removeByAuthID(Long id) {
		try {
			Token token = this.tokenRepository.findByAuthID(id).orElse(null);
			if (token != null) {
				this.tokenRepository.deleteById(token.getId());
			}					
		}
		catch(Exception e) {
			throw new BadRequestExceptionResult("TokenId is Null");
		}
	}
	
	public void remove(Long id) {
		try {
			this.tokenRepository.deleteById(id);
		}
		catch(Exception e) {
			throw new NotFoundExceptionResult("The requested TokenId was not found.");
		}
	}
	
	public Boolean getTokenValidation(Long id) {
		final long admin = 1;
		final Cookie cookieAccess = WebUtils.getCookie(request, this.accessToken);
		final String accessToken = (cookieAccess != null) ? cookieAccess.getValue() : null;
		final Token jwt = this.tokenRepository.findBy_token(accessToken).orElseThrow();
		final String authID = jwtUtil.extractSubject(jwt.getToken()).orElseThrow();
		final Auth auth = this.authRepository.findById(Long.parseLong(authID)).orElseThrow();
		final Long result = auth.getRoles().stream().map(Role::getId).filter(x -> x == admin).findFirst().orElse(null);
		if (Long.parseLong(authID) == id) {
			return true;
		}
		else if (result != null) {
			return true;
		}
		return false;
	}
}