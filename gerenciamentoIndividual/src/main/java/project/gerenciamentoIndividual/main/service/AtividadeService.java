package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.repositories.AtividadeRepository;

@Service
public class AtividadeService {

   @Autowired
   private AtividadeRepository atividadeRepository;

   public List<Atividade> getAtividades() {
       return this.atividadeRepository.findAll();
   }
   
   public Atividade getAtividadePorId(Long id) {
       return this.atividadeRepository.findById(id).orElse(null);
   }
   
   public Usuario getUsuarioByIdAtividade(Long id) {
       return this.atividadeRepository.getUsuarioByIdAtividade(id);
   }
   
   @Transactional
   public Atividade inserirOuAtualizar(Atividade atividade) {
	   return this.atividadeRepository.save(atividade);
   }
   
   public void apagar(Long idatividade) {
	   this.atividadeRepository.deleteById(idatividade);
   }
}
