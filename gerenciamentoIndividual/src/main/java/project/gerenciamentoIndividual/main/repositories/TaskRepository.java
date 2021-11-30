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
}
