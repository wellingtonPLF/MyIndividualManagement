package project.gerenciamentoIndividual.main.controller;

import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.UsuarioService;
import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

   @GetMapping("/usuario")
   public List<Usuario> getUsuarios() {
       return this.usuarioService.getUsuarios();
   }
   
   @GetMapping("/usuario/{idusuario}")
   public Usuario getUsuarioPorId(@PathVariable("idusuario") Long idusuario) {
       return this.usuarioService.getUsuariosPorId(idusuario);
   }
   
   @GetMapping("/usuario/checkLimit")
   public Boolean checkLimit() {
       return this.usuarioService.checkLimit();
   }
   
   @GetMapping("/usuario/myuser/{nome}")
   public Usuario getUsuarioByNomeAndSenha(@PathVariable("nome") String nome) {
       return usuarioService.getUsuarioByNome(nome);
   }

   @PostMapping("/usuario")
   public Usuario inserirUsuario(@RequestBody Usuario usuario){
       return this.usuarioService.inserir(usuario);
   }
   
   @PutMapping("/usuario/{idusuario}")
   public Usuario atualizarUsuario(@RequestBody Usuario usuario){
       return this.usuarioService.atualizar(usuario);
   }

   @DeleteMapping("/usuario/{idusuario}")
   public void apagarUsuario(@PathVariable("idusuario") Long idusuario) {
       this.usuarioService.apagar(idusuario);
   }

}

