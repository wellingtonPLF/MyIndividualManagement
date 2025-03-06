package project.gerenciamentoIndividual.main.repositories;

import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   
   @Query("SELECT u FROM Usuario u WHERE u._email= ?1 AND u._nome = ?2")
   List<Usuario> findByEmailAndNome(String email, String nome);
   

   public Usuario findBy_nome(String nome);
   
   public Optional<Usuario> findBy_email(String email);
   
   //@Query("SELECT coalesce(max(u.idusuario), 0) FROM Usuario u")
	//Long findMaxId();
}