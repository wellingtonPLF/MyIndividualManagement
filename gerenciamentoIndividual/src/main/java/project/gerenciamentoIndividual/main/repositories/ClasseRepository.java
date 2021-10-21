package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Classe;

public interface ClasseRepository extends JpaRepository<Classe, Long> {

	public List<Classe> findByNome(String nome);
}
