package project.gerenciamentoIndividual.main.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import project.gerenciamentoIndividual.main.enumState.JwtType;
import project.gerenciamentoIndividual.main.exception.FilterExceptionResult;
import project.gerenciamentoIndividual.main.model.Auth;
import project.gerenciamentoIndividual.main.model.Token;
import project.gerenciamentoIndividual.main.repositories.AuthRepository;
import project.gerenciamentoIndividual.main.repositories.TokenRepository;
import project.gerenciamentoIndividual.main.util.CookieUtil;
import project.gerenciamentoIndividual.main.util.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;
	@Autowired
	private JwtUtil jwtService;
	@Autowired
	private AuthRepository authRepository;
	@Autowired
	private TokenRepository tokenRepository;
	@Value("${security.jwt.tokenName}")
	private String accessToken;
	
	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) 
					throws ServletException, IOException {
		final String authID;
		final String jwt = CookieUtil.getCookieValue(request, this.accessToken);
		try {
			Token tokenDB = this.tokenRepository.findBy_token(jwt).orElse(null);
			if (tokenDB != null) {
				// (Expired == true) ? Exception : "userID"
				authID = jwtService.extractSubject(jwt).orElseThrow(
					() -> new FilterExceptionResult(JwtType.EXPIRED_AT)
				);
				// NotFoundExceptionResult
				Auth authDetails = this.authRepository.findById(Long.parseLong(authID)).orElseThrow(
					() -> new FilterExceptionResult(JwtType.INVALID_USER)
				);
				//BasicAuth
				var authToken = new UsernamePasswordAuthenticationToken(authDetails, null, authDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			else {
				throw new FilterExceptionResult(JwtType.INVALID_AT);
			}
			filterChain.doFilter(request, response);
		}
		catch(FilterExceptionResult e) {
			response.setContentType(e.getErrorCode().toString());
			resolver.resolveException(request, response, null, e);
			filterChain.doFilter(request, response);
			return;
		}
	}
}