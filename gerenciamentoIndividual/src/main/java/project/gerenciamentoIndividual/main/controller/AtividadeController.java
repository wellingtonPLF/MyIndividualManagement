package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.service.AtividadeService;

@RestController
@RequestMapping("/")
public class AtividadeController {
	
   @Autowired
   private AtividadeService atividadeService;

   @GetMapping("/atividade")
   public List<Atividade> getAtividades() {
       return this.atividadeService.getAtividades();
   }
   
   @GetMapping("/atividade/{id}")
   public Atividade getAtividadePorId(@PathVariable("id") Long id) {
       return this.atividadeService.getAtividadePorId(id);
   }

   @PostMapping("/atividade")
   public Atividade inserirAtividade(@RequestBody Atividade atividade){
       return this.atividadeService.inserirAtividade(atividade);
   }
}
