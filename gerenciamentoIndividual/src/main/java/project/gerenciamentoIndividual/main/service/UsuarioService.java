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
   
   public Usuario getUsuariosPorId(Long id) {
       return this.usuarioRepository.findById(id).orElse(null);
   }

   @Transactional
   public Usuario inserirUser(Usuario usuario) {
       Usuario usuarioInserido = this.usuarioRepository.save(usuario);
       return usuarioInserido;
   }
}