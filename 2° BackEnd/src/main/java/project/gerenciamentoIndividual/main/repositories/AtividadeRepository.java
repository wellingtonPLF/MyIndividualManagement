package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.model.Usuario;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
	
	public List<Atividade> findByNome(String nome);
	
	@Query("SELECT a.usuario FROM Atividade a WHERE a.idatividade = ?1")
	Usuario getUsuarioByIdAtividade(Long idatividade);
	
	//@Query("SELECT coalesce(max(a.idatividade), 0) FROM Atividade a")
	//Long findMaxId();
}