package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Casual;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Task;

public interface CasualRepository extends JpaRepository<Casual, Long> {
	
	public List<Casual> findByNome(String nome);
	
	public String queryBased = "Select t from Casual t "
			+ "where idclasse in (select idclasse from Classe "
			+ "where idocupacao in (select idocupacao from Ocupacao "
			+ "where idsubarea in (select idsubarea from Subarea where idjanela in (select idjanela from Janela "
			+ "where idatividade in (select idatividade from Atividade where idusuario = ?1))))) ";
	
	@Query("SELECT c.classe FROM Casual c WHERE c.idtask = ?1")
	Classe getClasseByIdTask(Long id);
	
	@Query ("select idtask from Casual as c "
			+ "where idclasse in (select idclasse from Classe " 
			+ "where idocupacao in (select idocupacao from Ocupacao " 
			+ "where idsubarea in (select idsubarea from Subarea where nome = 'Diarias')))")
	List<Long> getIfDiarias();
	
	@Query ("select c from Casual as c "
			+ "where c.data < current_date and idclasse in (select idclasse from Classe " 
			+ "where idocupacao in (select idocupacao from Ocupacao " 
			+ "where idsubarea in (select idsubarea from Subarea where nome = 'Diarias')))")
	List<Casual> getIfDiariasPendente();
	
	@Query ("select t from Casual t "
			+ "where idclasse in (select idclasse from Classe "
			+ "where idocupacao in (select idocupacao from Ocupacao "
			+ "where idsubarea in (select idsubarea from Subarea s "
			+ "where s.tipo = 'casual' and "
			+ "idjanela in (select idjanela from Janela "
			+ "where idatividade in (select idatividade from Atividade where idusuario = ?1))))) "
			+ "and (t.data - current_date) < 7 and (t.data - current_date) > -1 "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by data, tempo")
	List<Casual> requestCasualTask(Long iduser);
	
	@Query (queryBased + "and t.data < current_date "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by data, tempo")
	List<Casual> requestLate(Long iduser);
	
	@Query (queryBased	+ "and t.data is Null "
			+ "and etiqueta in ('undone', 'problem') "
			+ "order by tempo")
	List<Casual> requestUndefined(Long iduser);
}
