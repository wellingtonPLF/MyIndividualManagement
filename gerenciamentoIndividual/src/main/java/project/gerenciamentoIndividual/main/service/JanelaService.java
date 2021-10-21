package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Janela;
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

   @Transactional
   public Janela inserirJanela(Janela janela) {
       Janela janelaInserido = this.janelaRepository.save(janela);
       return janelaInserido;
   }
}
