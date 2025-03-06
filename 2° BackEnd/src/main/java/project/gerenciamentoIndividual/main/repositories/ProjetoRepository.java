package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Projeto;
import project.gerenciamentoIndividual.main.model.Task;

public interface ProjetoRepository extends JpaRepository<Projeto, Long>{
	
	public List<Projeto> findByNome(String nome);
	
	public String queryBased = "SELECT t FROM Projeto t "
	        + "WHERE t.classe.idclasse IN (SELECT c.idclasse FROM Classe c "
	        + "WHERE c.ocupacao.idocupacao IN (SELECT o.idocupacao FROM Ocupacao o "
	        + "WHERE o.subarea.idsubarea IN (SELECT s.idsubarea FROM Subarea s "
	        + "WHERE s.janela.idjanela IN (SELECT j.idjanela FROM Janela j "
	        + "WHERE j.atividade.idatividade IN (SELECT a.idatividade FROM Atividade a "
	        + "WHERE a.usuario.idusuario = ?1)))))";

	@Query("SELECT p.classe FROM Projeto p WHERE p.idtask = ?1")
	Classe getClasseByIdTask(Long id);
	
	@Query("SELECT t FROM Projeto t "
		       + "WHERE t.classe.idclasse IN (SELECT c.idclasse FROM Classe c "
		       + "WHERE c.ocupacao.idocupacao IN (SELECT o.idocupacao FROM Ocupacao o "
		       + "WHERE o.subarea.idsubarea IN (SELECT s.idsubarea FROM Subarea s "
		       + "WHERE s.tipo = 'projeto' AND "
		       + "s.janela.idjanela IN (SELECT j.idjanela FROM Janela j "
		       + "WHERE j.atividade.idatividade IN (SELECT a.idatividade FROM Atividade a "
		       + "WHERE a.usuario.idusuario = ?1))))) "
		       + "AND (t.data - current_date) < 14 "
		       + "AND (t.data - current_date) > -1 "
		       + "AND t.etiqueta IN ('undone', 'problem') "
		       + "ORDER BY t.data, t.tempo")
	List<Task> requestProjectTask(Long iduser);
	
	@Query (queryBased + "and (t.data - current_date) < 0 "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by data, tempo")
	List<Task> requestLate(Long iduser);
	
	@Query (queryBased	+ "and t.data is Null "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by tempo")
	List<Task> requestUndefined(Long iduser);
}
