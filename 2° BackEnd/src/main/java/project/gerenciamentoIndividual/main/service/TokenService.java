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
import project.gerenciamentoIndividual.main.jpaModel.AuthJPA;
import project.gerenciamentoIndividual.main.jpaModel.RoleJPA;
import project.gerenciamentoIndividual.main.jpaModel.TokenJPA;
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
		
	public TokenJPA findById(Long id) {
		TokenJPA token = this.tokenRepository.findById(id).orElseThrow(
			() -> new NotFoundExceptionResult("The requested TokenId was not found."));
		return token;
	}
	
	public TokenJPA findByToken(String token) {
		TokenJPA jwtDB = this.tokenRepository.findBy_token(token).orElseThrow(
			() -> new AuthenticationExceptionResponse(JwtType.INVALID_AT.toString())
		);
		return jwtDB;
	}
	
	@Transactional
	public void insertUpdate(TokenJPA token) {
		try {
			this.tokenRepository.save(token);
		}
		catch(Exception e) {
			throw new BadRequestExceptionResult("TokenId is Null");
		}
	}
	
	public void removeByAuthID(Long id) {
		try {
			TokenJPA tokenID = this.tokenRepository.findByAuthID(id).orElse(null);
			if (tokenID != null) {
				this.tokenRepository.deleteById(tokenID.getId());
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
		final TokenJPA jwt = this.tokenRepository.findBy_token(accessToken).orElseThrow();
		final String authID = jwtUtil.extractSubject(jwt.getToken()).orElseThrow();
		final AuthJPA auth = this.authRepository.findById(Long.parseLong(authID)).orElseThrow();
		final Long result = auth.getRoles().stream().map(RoleJPA::getId).filter(x -> x == admin).findFirst().orElse(null);
		if (Long.parseLong(authID) == id) {
			return true;
		}
		else if (result != null) {
			return true;
		}
		return false;
	}
}