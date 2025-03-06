package project.gerenciamentoIndividual.main.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.jpaModel.AuthJPA;

public interface AuthRepository extends JpaRepository<AuthJPA, Long>{
	
	@Query("select a from AuthJPA a where a._user.idusuario = ?1")
	Optional<AuthJPA> findByUserID(Long userID);
	
	public Optional<AuthJPA> findBy_username(String email);
}