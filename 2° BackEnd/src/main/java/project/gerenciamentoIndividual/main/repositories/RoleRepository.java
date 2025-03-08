package project.gerenciamentoIndividual.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

}