package project.gerenciamentoIndividual.main.repositories;
import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

   public List<Usuario> findByEmailAndNome(String email, String nome);  
}