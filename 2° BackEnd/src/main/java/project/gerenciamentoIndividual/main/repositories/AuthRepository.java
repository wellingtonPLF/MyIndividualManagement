package project.gerenciamentoIndividual.main.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Auth;

public interface AuthRepository extends JpaRepository<Auth, Long>{
	
	@Query("select a from Auth a where a._user.idusuario = ?1")
	Optional<Auth> findByUserID(Long userID);
	
	public Optional<Auth> findBy_username(String email);
}