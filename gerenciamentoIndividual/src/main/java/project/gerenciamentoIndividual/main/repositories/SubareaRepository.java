package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Subarea;

public interface SubareaRepository extends JpaRepository<Subarea, Long> {

	public List<Subarea> findByNome(String nome);
}
