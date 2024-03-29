package project.gerenciamentoIndividual.main.repositories;
import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

   public List<Usuario> findByEmailAndNome(String email, String nome);
   
   @Query("SELECT u FROM Usuario u WHERE u.nome = ?1")
   Usuario findUsuarioByNome(String nome);
   
   //@Query("SELECT coalesce(max(u.idusuario), 0) FROM Usuario u")
	//Long findMaxId();
}