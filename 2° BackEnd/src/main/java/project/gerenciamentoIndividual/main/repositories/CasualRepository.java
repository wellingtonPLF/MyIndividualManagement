package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Casual;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Task;

public interface CasualRepository extends JpaRepository<Casual, Long> {
	
	public List<Casual> findByNome(String nome);
	
	public String queryBased = "SELECT t FROM Casual t "
	        + "WHERE t.classe.idclasse IN (SELECT c.idclasse FROM Classe c "
	        + "WHERE c.ocupacao.idocupacao IN (SELECT o.idocupacao FROM Ocupacao o "
	        + "WHERE o.subarea.idsubarea IN (SELECT s.idsubarea FROM Subarea s "
	        + "WHERE s.janela.idjanela IN (SELECT j.idjanela FROM Janela j "
	        + "WHERE j.atividade.idatividade IN (SELECT a.idatividade FROM Atividade a "
	        + "WHERE a.usuario.idusuario = ?1)))))";
	
	@Query("SELECT c.classe FROM Casual c WHERE c.idtask = ?1")
	Classe getClasseByIdTask(Long id);

	@Query ("select t.idtask from Casual as t "
			+ "where t.classe.idclasse in (select c.idclasse from Classe c " 
			+ "where c.ocupacao.idocupacao in (select o.idocupacao from Ocupacao o " 
			+ "where o.subarea.idsubarea in (select s.idsubarea from Subarea s where s.nome = 'Diarias')))")
	List<Long> getIfDiarias();

	@Query ("select t from Casual as t "
			+ "where t.data < current_date and t.classe.idclasse in (select c.idclasse from Classe c " 
			+ "where c.ocupacao.idocupacao in (select o.idocupacao from Ocupacao o " 
			+ "where o.subarea.idsubarea in (select s.idsubarea from Subarea s where s.nome = 'Diarias')))")
	List<Casual> getIfDiariasPendente();

	@Query ("select t from Casual t "
			+ "where t.classe.idclasse in (select c.idclasse from Classe c " 
			+ "where c.ocupacao.idocupacao in (select o.idocupacao from Ocupacao o " 
			+ "where o.subarea.idsubarea in (select s.idsubarea from Subarea s "
			+ "where s.tipo = 'casual' and s.janela.idjanela in (select j.idjanela FROM Janela j "
			+ "where j.atividade.idatividade in (select a.idatividade FROM Atividade a where a.usuario.idusuario = ?1)))))")
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
