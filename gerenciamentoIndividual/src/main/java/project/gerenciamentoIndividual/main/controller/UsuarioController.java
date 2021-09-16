package project.gerenciamentoIndividual.main.controller;

import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

   @GetMapping("/usuarios")
   public List<Usuario> getUsuarios() {
       return this.usuarioService.getUsuarios();
   }
   
   @GetMapping("/usuarios/{id}")
   public Usuario getUsuarioPorId(@PathVariable("id") Long id) {
       return this.usuarioService.getUsuariosPorId(id);
   }

   @PostMapping("/usuarios")
   public Usuario inserirUsuario(@RequestBody Usuario usuario){
       return this.usuarioService.inserirUser(usuario);
   }
}

