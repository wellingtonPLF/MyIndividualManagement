package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Projeto;
import project.gerenciamentoIndividual.main.model.Task;
import project.gerenciamentoIndividual.main.repositories.ProjetoRepository;
import project.gerenciamentoIndividual.main.repositories.TaskRepository;

@Service
public class ProjetoService {
	
	@Autowired
	private ProjetoRepository projetoRepository;

	public List<Projeto> getProjetos() {
		return this.projetoRepository.findAll();
	}
	   
	public Projeto getProjetoPorId(Long id) {
		return this.projetoRepository.findById(id).orElse(null);
	}
		
	public List<Task> getRequestProjectTask(Long iduser){
		return this.projetoRepository.requestProjectTask(iduser);
	}
   
	public List<Task> getRequestLate(Long iduser){
		return this.projetoRepository.requestLate(iduser);
	}
	
	public List<Task> getRequestUndefined(Long iduser){
		return this.projetoRepository.requestUndefined(iduser);
	}
	
	public Classe getClasseByIdTask(Long id) {
		return this.projetoRepository.getClasseByIdTask(id);
	}
	    
	@Transactional
	public Projeto inserirOuAtualizar(Projeto projeto) {
		return this.projetoRepository.save(projeto);
	}
	   
	public void apagar(Long idprojeto) {
		this.projetoRepository.deleteById(idprojeto);
	}   
}
