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
import project.gerenciamentoIndividual.main.model.Projeto;
import project.gerenciamentoIndividual.main.model.Task;
import project.gerenciamentoIndividual.main.service.ProjetoService;

@RestController
@RequestMapping("/")
public class ProjetoController {
	
   @Autowired
   private ProjetoService projetoService;

   @GetMapping("/projeto")
   public List<Projeto> getProjetos() {
       return this.projetoService.getProjetos();
   }
   
   @GetMapping("/projeto/{id}")
   public Projeto getProjetoPorId(@PathVariable("id") Long id) {
       return this.projetoService.getProjetoPorId(id);
   }
   
   @GetMapping("/projeto/myTask/classe/{id}")
   public Classe getClasseByIdTask(@PathVariable("id") Long id) {
       return this.projetoService.getClasseByIdTask(id);
   }
   
   @GetMapping("/projeto/requestProjectTask/{iduser}")
   public List<Task> getRequestProjectTask(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestProjectTask(iduser);
   }
   
   @GetMapping("/projeto/requestLate/{iduser}")
   public List<Task> getRequestLate(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestLate(iduser);
   }
   
   @GetMapping("/projeto/requestUndefined/{iduser}")
   public List<Task> getRequestUndefined(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestUndefined(iduser);
   }
   
   @PostMapping("/projeto")
   public Projeto inserirProjeto(@RequestBody Projeto projeto){
       return this.projetoService.inserirOuAtualizar(projeto);
   }
   
   @PutMapping("/projeto/{idprojeto}")
   public Projeto atualizarProjeto(@RequestBody Projeto projeto){
       return this.projetoService.inserirOuAtualizar(projeto);
   }

   @DeleteMapping("/projeto/{idprojeto}")
   public void apagarProjeto(@PathVariable("idprojeto") Long idprojeto) {
       this.projetoService.apagar(idprojeto);
   }
}
