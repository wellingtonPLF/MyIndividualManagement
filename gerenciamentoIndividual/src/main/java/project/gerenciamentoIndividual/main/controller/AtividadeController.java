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

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Usuario;
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
   
   @GetMapping("/atividade/{idatividade}")
   public Atividade getAtividadePorId(@PathVariable("idatividade") Long idatividade) {
       return this.atividadeService.getAtividadePorId(idatividade);
   }

   @PostMapping("/atividade")
   public Atividade inserirAtividade(@RequestBody Atividade atividade){
       return this.atividadeService.inserirOuAtualizar(atividade);
   }
   
   @PutMapping("/atividade/{idatividade}")
   public Atividade atualizarAtividade(@RequestBody Atividade atividade){
       return this.atividadeService.inserirOuAtualizar(atividade);
   }

   @DeleteMapping("/atividade/{idatividade}")
   public void apagarUsuario(@PathVariable("idatividade") Long idatividade) {
       this.atividadeService.apagar(idatividade);
   }
}
