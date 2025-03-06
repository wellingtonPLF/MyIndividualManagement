package project.gerenciamentoIndividual.main.service;

import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import project.gerenciamentoIndividual.main.util.CookieUtil;
import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.jpaModel.TokenJPA;
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
import project.gerenciamentoIndividual.main.exception.InternalExceptionResult;
import project.gerenciamentoIndividual.main.jpaModel.AuthJPA;
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
		final TokenJPA jwt = this.tokenService.findByToken(accessToken);
		final String authID = jwtService.extractSubject(jwt.getToken())
				.orElseThrow(() -> new AuthenticationExceptionResponse(JwtType.EXPIRED_AT.toString()));
		AuthJPA authDB = this.authService.findById(authID);
		Usuario userDB = this.userRepository.findById(authDB.getUser().getIdusuario()).orElseThrow();
		UserDTO user = new UserDTO(userDB);
		return new StatusResult<UserDTO>(HttpStatus.OK.value(), user);
	}

	public Boolean checkLimit() {
		int qnt = this.usuarioRepository.findAll().size();
		if (qnt >= this.userLimit) {
			return false;
		}
		return true;
	}

	public StatusResult<?> inserir(AuthenticationDTO usuario) {
		int qnt = this.usuarioRepository.findAll().size();
		if (qnt >= this.userLimit) {
			throw new InternalExceptionResult("limit user achieved!");
		}		
		if (usuario.getEmail() == null || usuario.getEmail() == "") {
            throw new Error("Email inválido!");
        }
		Optional<Usuario> findUser = this.userRepository.findBy_email(usuario.getEmail());
    	if (findUser.isPresent()) {
    		throw new InternalExceptionResult("user already exist!");
        }
    	
    	AuthJPA auth = this.authService.findByUsername(usuario.getNome());    	
    	if (auth != null) {
    		throw new InternalExceptionResult("user already exist!");
        }
    	
    	Usuario user = new Usuario(usuario);
    	System.out.println(user.getAtividades());
		Usuario userDB = this.usuarioRepository.save(user);
		System.out.println(userDB);
		AuthJPA authDB = new AuthJPA(usuario);
		authDB.setUser(userDB);
		this.authService.authInsert(authDB);
		return new StatusResult<Usuario>(HttpStatus.OK.value(), userDB);
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

		usuario.setImg(imageName);
		return this.usuarioRepository.save(usuario);
	}

	public void apagar(Long idusuario) {
		this.usuarioRepository.deleteById(idusuario);
	}
}