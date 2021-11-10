package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.repositories.SubareaRepository;

@Service
public class SubareaService {

   @Autowired
   private SubareaRepository subareaRepository;

   public List<Subarea> getSubareas() {
       return this.subareaRepository.findAll();
   }
   
   public Subarea getSubareaPorId(Long id) {
       return this.subareaRepository.findById(id).orElse(null);
   }
   
   public Janela getJanelaByIdSubarea(Long id) {
       return this.subareaRepository.getJanelaByIdSubarea(id);
   }

   @Transactional
   public Subarea inserirOuAtualizar(Subarea subarea) {
	   return this.subareaRepository.save(subarea);
   }
   
   public void apagar(Long idsubarea) {
	   this.subareaRepository.deleteById(idsubarea);
   }
}
