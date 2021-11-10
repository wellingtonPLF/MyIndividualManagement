package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.model.Subarea;

public interface OcupacaoRepository extends JpaRepository<Ocupacao, Long> {

	public List<Ocupacao> findByNome(String nome);
	
	@Query("SELECT o.subarea FROM Ocupacao o WHERE o.idocupacao = ?1")
	Subarea getSubareaByIdOcupacao(Long id);
	
	//@Query("SELECT coalesce(max(o.idocupacao), 0) FROM Ocupacao o")
	//Long findMaxId();
}
