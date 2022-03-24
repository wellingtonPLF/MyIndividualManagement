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

import project.gerenciamentoIndividual.main.model.Casual;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Task;
import project.gerenciamentoIndividual.main.service.CasualService;

@RestController
@RequestMapping("/")
public class CasualController {
	
   @Autowired
   private CasualService casualService;

   @GetMapping("/casual")
   public List<Casual> getCasuais() {
       return this.casualService.getCasuais();
   }
   
   @GetMapping("/casual/{id}")
   public Casual getCasualPorId(@PathVariable("id") Long id) {
       return this.casualService.getCasualPorId(id);
   }
   
   @GetMapping("/casual/myTask/classe/{id}")
   public Classe getClasseByIdTask(@PathVariable("id") Long id) {
       return this.casualService.getClasseByIdTask(id);
   }
   
   @GetMapping("/casual/requestCasualTask/{iduser}")
   public List<Casual> getRequestCasualTask(@PathVariable("iduser") Long iduser) {
       return this.casualService.getRequestCasualTask(iduser);
   }
   
   @GetMapping("/casual/requestLate/{iduser}")
   public List<Casual> getRequestLate(@PathVariable("iduser") Long iduser) {
       return this.casualService.getRequestLate(iduser);
   }
   
   @GetMapping("/casual/requestUndefined/{iduser}")
   public List<Casual> getRequestUndefined(@PathVariable("iduser") Long iduser) {
       return this.casualService.getRequestUndefined(iduser);
   }
   
   @GetMapping("/casual/getIfDiarias")
   public List<Long> getIfDiarias() {
       return this.casualService.getIfDiarias();
   }
   
   @GetMapping("/casual/getIfDiariasPendente")
   public List<Casual> getIfDiariasPendente() {
       return this.casualService.getIfDiariasPendente();
   }
   
   @PostMapping("/casual")
   public Casual inserirCasual(@RequestBody Casual casual){
       return this.casualService.inserirOuAtualizar(casual);
   }
   
   @PutMapping("/casual/{idcasual}")
   public Casual atualizarCasual(@RequestBody Casual casual){
       return this.casualService.inserirOuAtualizar(casual);
   }

   @DeleteMapping("/casual/{idcasual}")
   public void apagarCasual(@PathVariable("idcasual") Long idcasual) {
       this.casualService.apagar(idcasual);
   }
}




