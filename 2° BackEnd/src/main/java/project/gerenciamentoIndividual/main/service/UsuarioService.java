package project.gerenciamentoIndividual.main.service;

import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import project.gerenciamentoIndividual.main.util.CookieUtil;
import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.model.Auth;
import project.gerenciamentoIndividual.main.model.Token;
import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;
import project.gerenciamentoIndividual.main.dtoModel.AuthDTO;
import project.gerenciamentoIndividual.main.dtoModel.AuthenticationDTO;
import project.gerenciamentoIndividual.main.dtoModel.UserDTO;
import project.gerenciamentoIndividual.main.enumState.JwtType;
import project.gerenciamentoIndividual.main.exception.AuthenticationExceptionResponse;
import project.gerenciamentoIndividual.main.exception.BadRequestExceptionResult;
import project.gerenciamentoIndividual.main.exception.InternalExceptionResult;
import project.gerenciamentoIndividual.main.util.JwtUtil;

@Service
public class UsuarioService {

	private Integer userLimit = 10;

	@Value("${security.jwt.tokenName}")
	private String accessTokenName;
	@Value("${security.jwt.refreshName}")
	private String refreshTokenName;
	@Autowired
	private UsuarioRepository userRepository;
	@Autowired
	private AuthenticationService authService;
	@Autowired
	private TokenService tokenService;
	@Autowired
	private JwtUtil jwtService;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private UsuarioRepository usuarioRepository;

	public List<Usuario> getUsuarios() {
		return this.usuarioRepository.findAll();
	}

	public Usuario getUsuariosPorId(Long idusuario) {
		return this.usuarioRepository.findById(idusuario).orElse(null);
	}

	public Usuario getUsuarioByNome(String nome) {
		return this.usuarioRepository.findBy_nome(nome); 
	}

	public StatusResult<?> getAuthenticatedUser() {
		final String accessToken = CookieUtil.getCookieValue(this.request, this.accessTokenName);
		final Token jwt = this.tokenService.findByToken(accessToken);
		final String authID = jwtService.extractSubject(jwt.getToken())
				.orElseThrow(() -> new AuthenticationExceptionResponse(JwtType.EXPIRED_AT.toString()));
		Auth authDB = this.authService.findById(authID);
		Usuario userDB = this.userRepository.findById(authDB.getUser().getIdusuario()).orElseThrow();
		return new StatusResult<Usuario>(HttpStatus.OK.value(), userDB);
	}

	public Boolean checkLimit() {
		int qnt = this.usuarioRepository.findAll().size();
		if (qnt >= this.userLimit) {
			return false;
		}
		return true;
	}

	public StatusResult<?> inserir(AuthenticationDTO authentication) {
		int qnt = this.usuarioRepository.findAll().size();
		Usuario usuario = authentication.getUser();
		AuthDTO newAuth = authentication.getAuth();
		
		if (qnt >= this.userLimit) {
			throw new InternalExceptionResult("limit user achieved!");
		}		
		if (usuario.getEmail() == null || usuario.getEmail() == "") {
            throw new Error("Email inválido!");
        }
		Optional<Usuario> findUser = this.userRepository.findBy_email(usuario.getEmail());
    	if (findUser.isPresent()) {
    		throw new BadRequestExceptionResult("user email already in use!");
        }
    	
    	Auth auth = this.authService.findByUsername(newAuth.getUsername());    	
    	if (auth != null) {
    		throw new InternalExceptionResult("user username already in use!");
        }
    	
    	Auth authDB = new Auth(newAuth);    	
		Usuario userDB = this.usuarioRepository.save(usuario);		
		authDB.setUser(userDB);
		this.authService.authInsert(authDB);
		return new StatusResult<Usuario>(HttpStatus.OK.value(), usuario);
	}

	@Transactional
	public Usuario atualizar(Usuario usuario) {
		String[] imageType = usuario.getImg().split("[.;]");

		String[] parts = usuario.getImg().split(String.format(";data:image/%s;base64,", imageType[1]));
		String imageName = parts[0];
		String base64Image = parts[1];

		byte[] decodedBytes = Base64.getDecoder().decode(base64Image);

		try {
			Path path = Paths.get("src/main/resources", "/assets/imgs/" + imageName);
			Files.write(path, decodedBytes);
		} catch (IOException e) {
			System.err.println("Error saving image: " + e.getMessage());
		}
		
		Usuario userDB = this.usuarioRepository.findById(usuario.getIdusuario()).orElse(null);
		userDB.setImg(imageName);
		return this.usuarioRepository.save(userDB);
	}

	public void apagar(Long idusuario) {
		this.usuarioRepository.deleteById(idusuario);
	}
}