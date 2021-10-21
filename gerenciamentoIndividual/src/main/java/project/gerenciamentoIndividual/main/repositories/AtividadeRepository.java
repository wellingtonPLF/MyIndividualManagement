package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Atividade;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
	
	public List<Atividade> findByNome(String nome);
}