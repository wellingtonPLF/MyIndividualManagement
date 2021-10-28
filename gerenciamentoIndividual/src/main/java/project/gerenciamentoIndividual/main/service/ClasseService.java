package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.repositories.ClasseRepository;

@Service
public class ClasseService {

   @Autowired
   private ClasseRepository classeRepository;

   public List<Classe> getClasses() {
       return this.classeRepository.findAll();
   }
   
   public Classe getClassePorId(Long id) {
       return this.classeRepository.findById(id).orElse(null);
   }

   @Transactional
   public Classe inserirOuAtualizar(Classe classe) {
       Classe classeInserido = this.classeRepository.save(classe);
       return classeInserido;
   }
   
   public void apagar(Long idclasse) {
	   this.classeRepository.deleteById(idclasse);
   }
}
