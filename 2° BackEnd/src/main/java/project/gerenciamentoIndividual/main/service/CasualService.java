package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Casual;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.repositories.CasualRepository;

@Service
public class CasualService {
	
	@Autowired
	private CasualRepository casualRepository;

	public List<Casual> getCasuais() {
		return this.casualRepository.findAll();
	}
	
	public Casual getCasualPorId(Long id) {
		return this.casualRepository.findById(id).orElse(null);
	}
	
	public List<Long> getIfDiarias(){
		return this.casualRepository.getIfDiarias();
	}
	
	public List<Casual> getIfDiariasPendente(){
		return this.casualRepository.getIfDiariasPendente();
	}
	
	public List<Casual> getRequestCasualTask(Long iduser){
		return this.casualRepository.requestCasualTask(iduser);
	}
   
	public List<Casual> getRequestLate(Long iduser){
		return this.casualRepository.requestLate(iduser);
	}
   
	public List<Casual> getRequestUndefined(Long iduser){
		return this.casualRepository.requestUndefined(iduser);
	}
	
	public Classe getClasseByIdTask(Long id) {
		return this.casualRepository.getClasseByIdTask(id);
	}
	  
	@Transactional
	public Casual inserirOuAtualizar(Casual casual) {
		return this.casualRepository.save(casual);
	}
	   
	public void apagar(Long idcasual) {
		this.casualRepository.deleteById(idcasual);
	} 
}
