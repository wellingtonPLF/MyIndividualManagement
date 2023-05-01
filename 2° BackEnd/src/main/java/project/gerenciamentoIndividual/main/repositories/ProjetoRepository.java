package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Projeto;
import project.gerenciamentoIndividual.main.model.Task;

public interface ProjetoRepository extends JpaRepository<Projeto, Long>{
	
	public List<Projeto> findByNome(String nome);
	
	public String queryBased = "Select t from Projeto t "
			+ "where idclasse in (select idclasse from Classe "
			+ "where idocupacao in (select idocupacao from Ocupacao "
			+ "where idsubarea in (select idsubarea from Subarea where idjanela in (select idjanela from Janela "
			+ "where idatividade in (select idatividade from Atividade where idusuario = ?1))))) ";
	
	@Query("SELECT p.classe FROM Projeto p WHERE p.idtask = ?1")
	Classe getClasseByIdTask(Long id);
	
	@Query ("Select t from Projeto t "
			+ "where idclasse in (select idclasse from Classe "
			+ "where idocupacao in (select idocupacao from Ocupacao "
			+ "where idsubarea in (select idsubarea from Subarea s "
			+ "where s.tipo = 'projeto' and "
			+ "idjanela in (select idjanela from Janela "
			+ "where idatividade in (select idatividade from Atividade where idusuario = ?1))))) "
			+ "and age(t.data, current_date) < '14 days' and age(t.data, current_date) > '-1 days' "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by data, tempo")
	List<Task> requestProjectTask(Long iduser);
	
	@Query (queryBased + "and age(t.data, current_date) < '0 days' "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by data, tempo")
	List<Task> requestLate(Long iduser);
	
	@Query (queryBased	+ "and t.data is Null "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by tempo")
	List<Task> requestUndefined(Long iduser);
}
