package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.gerenciamentoIndividual.main.model.Template;

public interface TemplateRepository extends JpaRepository<Template, Long> {

	public List<Template> findByNome(String nome);
}
