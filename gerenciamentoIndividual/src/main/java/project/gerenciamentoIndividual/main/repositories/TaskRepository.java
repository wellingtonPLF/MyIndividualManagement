package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

	public List<Task> findByNome(String nome);
	
	@Query("SELECT t.classe FROM Task t WHERE t.idtask = ?1")
	Classe getClasseByIdTask(Long id);
	
	//@Query("SELECT coalesce(max(tsk.idtask), 0) FROM Task tsk")
	//Long findMaxId();
	
	@Query ("SELECT t "
			+ "from Task t "
			+ "where age(t.data, current_date) < '7 days' and age(t.data, current_date) > '-1 days' "
			+ "order by data, tempo")
	List<Task> requestAll();
	
	@Query ("SELECT t "
			+ "from Task t "
			+ "where age(t.data, current_date) < '0 days' "
			+ "order by data, tempo")
	List<Task> requestLate();
	
	@Query ("SELECT t "
			+ "from Task t "
			+ "where t.data is Null "
			+ "order by tempo")
	List<Task> requestUndefined();
}
