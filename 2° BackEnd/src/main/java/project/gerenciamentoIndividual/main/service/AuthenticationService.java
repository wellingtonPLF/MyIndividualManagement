package project.gerenciamentoIndividual.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import project.gerenciamentoIndividual.main.dtoModel.AuthDTO;
import project.gerenciamentoIndividual.main.enumState.JwtType;
import project.gerenciamentoIndividual.main.enumState.TokenType;
import project.gerenciamentoIndividual.main.exception.AuthenticationExceptionResponse;
import project.gerenciamentoIndividual.main.exception.InternalExceptionResult;
import project.gerenciamentoIndividual.main.exception.NotFoundExceptionResult;
import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.model.Auth;
import project.gerenciamentoIndividual.main.model.Token;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.repositories.AuthRepository;
import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import project.gerenciamentoIndividual.main.util.CookieUtil;
import project.gerenciamentoIndividual.main.util.JwtUtil;

@Service
public class AuthenticationService implements UserDetailsService{
	
	@Value("${security.jwt.tokenName}")
	private String accessTokenName;
	@Value("${security.jwt.refreshName}")
	private String refreshTokenName;
	@Autowired
	private JwtUtil jwtService;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthRepository authRepository;
	@Autowired
	private UsuarioRepository userRepository;
	@Autowired
	private TokenService tokenService;

	public StatusResult<?> authenticate(AuthDTO auth) {
		Auth authDB = null;
		try {
			if (auth.getEmail() != null) {
				Usuario userDB = this.userRepository.findBy_email(auth.getEmail()).orElseThrow(
						() -> new UsernameNotFoundException("User not Found, Incorrect email!")
				);
				authDB = this.authRepository.findByUserID(userDB.getIdusuario()).orElseThrow(
						() -> new UsernameNotFoundException("Auth not Found, Incorrect email!")
				);
			}
			else if (auth.getEmail() == null) {
				authDB = this.authRepository.findBy_username(auth.getUsername()).orElseThrow(
						() -> new UsernameNotFoundException("User not Found, Incorrect username!")
				);
			}
			if (authDB == null) {
				throw new UsernameNotFoundException("User not Found");
			}
			Boolean valid = this.passwordEncoder.matches(auth.getPassword(), authDB.getPassword());
			if(!valid) {
				throw new UsernameNotFoundException("Incorrect Password, try again.");
			}
			String jwtToken = jwtService.generateToken(authDB, TokenType.ACCESS_TOKEN);
			String refreshToken = jwtService.generateToken(authDB, TokenType.REFRESH_TOKEN);
			response.setContentType(null);
			Token jwt = new Token(jwtToken, authDB);
			this.tokenService.insertUpdate(jwt);
			CookieUtil.create(response, this.accessTokenName, jwtToken, request);
			CookieUtil.create(response, this.refreshTokenName, refreshToken, request);			
			return new StatusResult<String>(HttpStatus.OK.value(), "Success!");
		}
		catch (Exception e) {
			throw new UsernameNotFoundException(e.getLocalizedMessage());
		}
	}
	
	// ------------------------------------------------------------------------------------------

	public List<Auth> findAll(){
		return this.authRepository.findAll();
	}
	
	public Boolean isLogged(){
		String jwt = CookieUtil.getCookieValue(this.request, this.accessTokenName);
		Token jwtDB;
		try {
			jwtDB = this.tokenService.findByToken(jwt);
		}
		catch(Exception e) {
			return false;
		}
		jwtService.extractSubject(jwtDB.getToken()).orElseThrow(
			() -> new AuthenticationExceptionResponse(JwtType.EXPIRED_AT.toString()) 
		);
		return true;
	}
	
	
	public Auth findById(String authID) {
		return this.authRepository.findById(Long.parseLong(authID)).orElseThrow(
			() -> new NotFoundExceptionResult("The requested Id was not found.")
		);
	}
	
	public Auth findByUsername(String username) {
		Optional<Auth> findAuth = this.authRepository.findBy_username(username);
    	if (findAuth.isPresent()) {
    		return findAuth.get();
        }
    	return null;
	}
	
	public Auth findByUserID(Long id) {
		Auth authDB = this.authRepository.findByUserID(id).orElseThrow(
			() -> new NotFoundExceptionResult("The requested Id was not found.")
		);
		return authDB; 
	}
	
	public void deleteById(Long id) {
		this.authRepository.deleteById(id);
	}
	
	@Override
	public Auth loadUserByUsername(String username) {
		Auth user = this.authRepository.findBy_username(username).orElseThrow(
			() -> new UsernameNotFoundException("User not Found: " + username)
		);
		return user;
	}
	
	// ------------------------------------------------------------------------------------------
	
	public StatusResult<?> authInsert(Auth auth) {
        try {
        	auth.setPassword(this.passwordEncoder.encode(auth.getPassword()));
        	if (auth.getPassword() == null || auth.getPassword() == "") {
                throw new Error("Senha inválida!");
            }        	
            this.authRepository.save(auth);
            return new StatusResult<Auth>(HttpStatus.OK.value(), auth);
        }   
        catch(Exception e) {
        	throw new InternalExceptionResult(e.getMessage());
        } 
    }
	
	public StatusResult<?> authUpdate(Auth auth){
		final String accessToken = CookieUtil.getCookieValue(this.request, this.accessTokenName);
		final Token jwtDB = this.tokenService.findByToken(accessToken);
		final String authID = jwtService.extractSubject(jwtDB.getToken()).orElseThrow(
			() -> new AuthenticationExceptionResponse(JwtType.EXPIRED_AT.toString())
		);
		Auth authDB = this.authRepository.findById(Long.parseLong(authID)).orElseThrow(
				() -> new UsernameNotFoundException("User not Found: " + auth.getUsername())
		);
		authDB.setPassword(this.passwordEncoder.encode(auth.getPassword()));
		if (auth.getUsername() != null) {
			authDB.setUsername(auth.getUsername());
		}
		this.authRepository.save(authDB);
		return new StatusResult<String>(HttpStatus.OK.value(), "Successfully!");
	}
	
	public StatusResult<?> acceptAuth(Auth auth){
		Auth authDB = this.authRepository.findBy_username(auth.getUsername()).orElseThrow(
				() -> new UsernameNotFoundException("User not Found: " + auth.getUsername())
		);
		if(this.tokenService.getTokenValidation(authDB.getId()) == false) {
			throw new AuthenticationExceptionResponse(JwtType.INVALID_USER.toString());
		}
		Boolean valid = this.passwordEncoder.matches(auth.getPassword(), authDB.getPassword());
		if(!valid) {
			throw new UsernameNotFoundException("Incorrect Email or Password , try again.");
		}
		response.setContentType(null);
		return new StatusResult<String>(HttpStatus.OK.value(), "Successfully!");
	}
	
	public StatusResult<?> refresh() {
		final String accessToken = CookieUtil.getCookieValue(this.request, this.accessTokenName);
		final Token jwt = this.tokenService.findByToken(accessToken);
		final String expiredAcessToken = jwtService.extractSubject(jwt.getToken()).orElse(null);
		if (expiredAcessToken == null) {
			final String refreshToken = CookieUtil.getCookieValue(this.request, this.refreshTokenName);
			if (refreshToken == null) {
				throw new AuthenticationExceptionResponse(JwtType.INVALID_RT.toString());
			}
			final String authID = jwtService.extractSubject(refreshToken).orElseThrow(
				() -> new AuthenticationExceptionResponse(JwtType.EXPIRED_RT.toString())
			);
			Auth authDB = this.authRepository.findById(Long.parseLong(authID)).orElseThrow(
					() -> new AuthenticationExceptionResponse(JwtType.INVALID_USER.toString())
			);
			String jwtToken = jwtService.generateToken(authDB, TokenType.ACCESS_TOKEN);
			String jwtRefresh = jwtService.generateToken(authDB, TokenType.REFRESH_TOKEN);
			jwt.setToken(jwtToken);
			this.tokenService.insertUpdate(jwt);
			CookieUtil.create(response, this.accessTokenName, jwtToken, request);
			CookieUtil.create(response, this.refreshTokenName, jwtRefresh , request);
			return new StatusResult<String>(HttpStatus.OK.value(), "Refresh Succefully Done");
		}
		else {
			throw new AuthenticationExceptionResponse("Access Token not expired, also can't be refreshed");
		}
	}
	
	public StatusResult<?> logout() {
		try {
			final String jwt = CookieUtil.getCookieValue(this.request, this.accessTokenName);
			Token jwtDB = tokenService.findByToken(jwt);
			CookieUtil.clear(response, this.accessTokenName, request);
		    CookieUtil.clear(response, this.refreshTokenName, request);
		    SecurityContextHolder.clearContext();
		    tokenService.remove(jwtDB.getId());
		    return new StatusResult<String>(HttpStatus.OK.value(), "LogOut Succefully Done");
		}
		catch(Exception e) {
			throw new AuthenticationExceptionResponse("LogOut not accepted");
		}
	}
}