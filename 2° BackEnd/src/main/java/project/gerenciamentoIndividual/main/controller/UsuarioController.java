package project.gerenciamentoIndividual.main.controller;

import project.gerenciamentoIndividual.main.dtoModel.AuthenticationDTO;
import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@PreAuthorize("permitAll()")
	@GetMapping("/usuarios")
	public List<Usuario> getUsuarios() {
		return this.usuarioService.getUsuarios(); 
	}

	@PreAuthorize("permitAll()")
	@GetMapping("/usuarios/{idusuario}")
	public Usuario getUsuarioPorId(@PathVariable("idusuario") Long idusuario) {
		return this.usuarioService.getUsuariosPorId(idusuario);
	}

	@PreAuthorize("permitAll()")
	@GetMapping("/usuarios/checkLimit")
	public Boolean checkLimit() {
		return this.usuarioService.checkLimit();
	}

	@PreAuthorize("permitAll()")
	@GetMapping("/usuarios/getUser")
	public StatusResult<?> getAuthenticatedUser() {
		try {
			return this.usuarioService.getAuthenticatedUser();
		} catch(Exception e) {
			return new StatusResult<String>(HttpStatus.UNAUTHORIZED.value(), "Error");
		}
	}

	@PreAuthorize("permitAll()")
	@GetMapping("/usuarios/myuser/{nome}")
	public Usuario getUsuarioByNomeAndSenha(@PathVariable("nome") String nome) {
		return usuarioService.getUsuarioByNome(nome);
	}

	@PreAuthorize("permitAll()")
	@PostMapping("/usuarios")
	public StatusResult<?> inserirUsuario(@RequestBody AuthenticationDTO usuario) {
		return this.usuarioService.inserir(usuario);
	}

	@PreAuthorize("permitAll()")
	@PutMapping("/usuarios/{idusuario}")
	public Usuario atualizarUsuario(@RequestBody Usuario usuario) {
		return this.usuarioService.atualizar(usuario);
	}

	@PreAuthorize("permitAll()")
	@DeleteMapping("/usuarios/{idusuario}")
	public void apagarUsuario(@PathVariable("idusuario") Long idusuario) {
		this.usuarioService.apagar(idusuario);
	}

}
