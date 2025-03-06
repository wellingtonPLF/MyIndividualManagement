package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

   @PreAuthorize("permitAll()")
   @GetMapping("/projeto")
   public List<Projeto> getProjetos() {
       return this.projetoService.getProjetos();
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/projeto/{id}")
   public Projeto getProjetoPorId(@PathVariable("id") Long id) {
       return this.projetoService.getProjetoPorId(id);
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/projeto/myTask/classe/{id}")
   public Classe getClasseByIdTask(@PathVariable("id") Long id) {
       return this.projetoService.getClasseByIdTask(id);
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/projeto/requestProjectTask/{iduser}")
   public List<Task> getRequestProjectTask(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestProjectTask(iduser);
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/projeto/requestLate/{iduser}")
   public List<Task> getRequestLate(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestLate(iduser);
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/projeto/requestUndefined/{iduser}")
   public List<Task> getRequestUndefined(@PathVariable("iduser") Long iduser) {
       return this.projetoService.getRequestUndefined(iduser);
   }
   
   @PreAuthorize("permitAll()")
   @PostMapping("/projeto")
   public Projeto inserirProjeto(@RequestBody Projeto projeto){
       return this.projetoService.inserirOuAtualizar(projeto);
   }
   
   @PreAuthorize("permitAll()")
   @PutMapping("/projeto/{idprojeto}")
   public Projeto atualizarProjeto(@RequestBody Projeto projeto){
       return this.projetoService.inserirOuAtualizar(projeto);
   }

   @PreAuthorize("permitAll()")
   @DeleteMapping("/projeto/{idprojeto}")
   public void apagarProjeto(@PathVariable("idprojeto") Long idprojeto) {
       this.projetoService.apagar(idprojeto);
   }
}
