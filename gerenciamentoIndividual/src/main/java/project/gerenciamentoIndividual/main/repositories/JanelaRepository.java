package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Janela;


public interface JanelaRepository extends JpaRepository<Janela, Long> {

	public List<Janela> findByNome(String nome);
}
