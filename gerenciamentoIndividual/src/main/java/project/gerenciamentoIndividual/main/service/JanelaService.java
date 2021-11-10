package project.gerenciamentoIndividual.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Template;
import project.gerenciamentoIndividual.main.repositories.JanelaRepository;

@Service
public class JanelaService {

   @Autowired
   private JanelaRepository janelaRepository;

   public List<Janela> getJanelas() {
       return this.janelaRepository.findAll();
   }
   
   public Janela getJanelaPorId(Long id) {
       return this.janelaRepository.findById(id).orElse(null);
   }
   
   public Template getTemplateByIdjanela(Long id) {
	   return this.janelaRepository.getTemplateByIdjanela(id);
   }
   
   public Atividade getAtividadeByIdjanela(Long id) {
	   return this.janelaRepository.getAtividadeByIdjanela(id);
   }
  
   @Transactional
   public Janela inserirOuAtualizar(Janela janela) {
	   return this.janelaRepository.save(janela);
   }
   
   public void apagar(Long idjanela) {
	   this.janelaRepository.deleteById(idjanela);
   }
}
