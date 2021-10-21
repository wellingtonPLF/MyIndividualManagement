package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Ocupacao;

public interface OcupacaoRepository extends JpaRepository<Ocupacao, Long> {

	public List<Ocupacao> findByNome(String nome);
}
