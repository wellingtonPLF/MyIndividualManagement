package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Subarea;

public interface SubareaRepository extends JpaRepository<Subarea, Long> {

	public List<Subarea> findByNome(String nome);
	
	@Query("SELECT s.janela FROM Subarea s WHERE s.idsubarea = ?1")
	Janela getJanelaByIdSubarea(Long id);
	
	//@Query("SELECT coalesce(max(s.idsubarea), 0) FROM Subarea s")
	//Long findMaxId();
}
