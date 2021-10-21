package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Atividade;
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

   @Transactional
   public Atividade inserirAtividade(Atividade atividade) {
       Atividade atividadeInserido = this.atividadeRepository.save(atividade);
       return atividadeInserido;
   }
}
