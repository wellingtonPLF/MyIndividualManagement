package project.gerenciamentoIndividual.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.jpaModel.RoleJPA;

public interface RoleRepository extends JpaRepository<RoleJPA, Long>{

}