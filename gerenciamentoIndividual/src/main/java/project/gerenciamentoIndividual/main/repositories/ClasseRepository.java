package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Ocupacao;

public interface ClasseRepository extends JpaRepository<Classe, Long> {

	public List<Classe> findByNome(String nome);
	
	@Query("SELECT c.ocupacao FROM Classe c WHERE c.idclasse = ?1")
	Ocupacao getOcupacaoByIdclasse(Long idclasse);
	
	@Query("Select s.tipo from Subarea as s "
			+ "where idsubarea = (select o.subarea.idsubarea from Ocupacao o "
			+ "where idocupacao = (select c.ocupacao.idocupacao from Classe c "
			+ "where idclasse = ?1))")
	String getSubareaTipoByIdclasse(Long id);
	
	//@Query("SELECT coalesce(max(c.idclasse), 0) FROM Classe c")
	//Long findMaxId();
}
