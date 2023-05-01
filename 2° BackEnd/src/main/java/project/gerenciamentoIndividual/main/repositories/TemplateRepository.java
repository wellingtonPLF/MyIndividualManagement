package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Template;

public interface TemplateRepository extends JpaRepository<Template, Long> {

	public List<Template> findByNome(String nome);
	
	//@Query("SELECT coalesce(max(t.idtemplate), 0) FROM Template t")
	//Long findMaxId();
}
