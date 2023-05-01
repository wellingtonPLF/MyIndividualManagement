package project.gerenciamentoIndividual.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Template;


public interface JanelaRepository extends JpaRepository<Janela, Long> {

	public List<Janela> findByNome(String nome);
	
	@Query("SELECT coalesce(max(j.idjanela), 0) FROM Janela j")
	Long findMaxId();
	
	@Query("SELECT j.template FROM Janela j WHERE j.idjanela = ?1")
	Template getTemplateByIdjanela(Long idjanela);
	
	@Query("SELECT j.atividade FROM Janela j WHERE j.idjanela = ?1")
	Atividade getAtividadeByIdjanela(Long idjanela);
	
	/*@Modifying //nativeQuery = true
	@Query("ALTER SEQUENCE tb_pessoa_id_seq RESTART WITH 501")
	void addDeletedColumn();*/
}
