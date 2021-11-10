package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.ClasseService;

@RestController
@RequestMapping("/")
public class ClasseController {

   @Autowired
   private ClasseService classeService;

   @GetMapping("/classe")
   public List<Classe> getClasses() {
       return this.classeService.getClasses();
   }
   
   @GetMapping("/classe/{id}")
   public Classe getClassePorId(@PathVariable("id") Long id) {
       return this.classeService.getClassePorId(id);
   }
   
   @GetMapping("/classe/myClasse/{id}")
   public Ocupacao getOcupacaoByIdclasse(@PathVariable("id") Long id) {
       return this.classeService.getOcupacaoByIdclasse(id);
   }

   @PostMapping("/classe")
   public Classe inserirClasse(@RequestBody Classe classe){
       return this.classeService.inserirOuAtualizar(classe);
   }
   
   @PutMapping("/classe/{idclasse}")
   public Classe atualizarClasse(@RequestBody Classe classe){
       return this.classeService.inserirOuAtualizar(classe);
   }

   @DeleteMapping("/classe/{idclasse}")
   public void apagarClasse(@PathVariable("idclasse") Long idclasse) {
       this.classeService.apagar(idclasse);
   }
}
