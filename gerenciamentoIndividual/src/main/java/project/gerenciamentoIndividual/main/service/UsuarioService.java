package project.gerenciamentoIndividual.main.service;

import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

   @Autowired
   private UsuarioRepository usuarioRepository;

   public List<Usuario> getUsuarios() {
       return this.usuarioRepository.findAll();
   }
   
   public Usuario getUsuariosPorId(Long idusuario) {
       return this.usuarioRepository.findById(idusuario).orElse(null);
   }

   @Transactional
   public Usuario inserirOuAtualizar(Usuario usuario) {
       Usuario usuarioInserido = this.usuarioRepository.save(usuario);
       return usuarioInserido;
   }
   
   public void apagar(Long idusuario) {
	   this.usuarioRepository.deleteById(idusuario);
   }
}