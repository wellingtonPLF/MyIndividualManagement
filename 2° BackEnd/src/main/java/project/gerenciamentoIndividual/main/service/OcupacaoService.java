package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.repositories.OcupacaoRepository;

@Service
public class OcupacaoService {

   @Autowired
   private OcupacaoRepository ocupacaoRepository;

   public List<Ocupacao> getOcupacoes() {
       return this.ocupacaoRepository.findAll();
   }
   
   public Ocupacao getOcupacaoPorId(Long id) {
       return this.ocupacaoRepository.findById(id).orElse(null);
   }
   
   public Subarea getSubareaByIdOcupacao(Long id) {
	   return this.ocupacaoRepository.getSubareaByIdOcupacao(id);
   }

   @Transactional
   public Ocupacao inserirOuAtualizar(Ocupacao ocupacao) {
       return this.ocupacaoRepository.save(ocupacao);
   }
   
   public void apagar(Long idocupacao) {
	   this.ocupacaoRepository.deleteById(idocupacao);
   }
}
