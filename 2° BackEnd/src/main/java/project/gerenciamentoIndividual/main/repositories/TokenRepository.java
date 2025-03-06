package project.gerenciamentoIndividual.main.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.jpaModel.TokenJPA;

public interface TokenRepository extends JpaRepository<TokenJPA, Long>{
		
	@Query("select t from TokenJPA t where t._auth._id = ?1")
	Optional<TokenJPA> findByAuthID(Long authID);
	
	Optional<TokenJPA> findBy_token(String token);
}