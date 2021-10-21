package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

	public List<Task> findByNome(String nome);
}
