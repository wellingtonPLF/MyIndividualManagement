package project.gerenciamentoIndividual.main.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Token;

public interface TokenRepository extends JpaRepository<Token, Long>{
		
	@Query("select t from Token t where t._auth._id = ?1")
	Optional<Token> findByAuthID(Long authID);
	Optional<Token> findBy_token(String token);
}