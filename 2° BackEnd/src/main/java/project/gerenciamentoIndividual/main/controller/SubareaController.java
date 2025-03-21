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

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.SubareaService;

@RestController
@RequestMapping("/")
public class SubareaController {

   @Autowired
   private SubareaService subareaService;

   @PreAuthorize("permitAll()")
   @GetMapping("/subarea")
   public List<Subarea> getSubareas() {
       return this.subareaService.getSubareas();
   }
   
   @PreAuthorize("permitAll()")   
   @GetMapping("/subarea/{id}")
   public Subarea getSubareaPorId(@PathVariable("id") Long id) {
       return this.subareaService.getSubareaPorId(id);
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/subarea/mySubarea/janela/{id}")
   public Janela getJanelaByIdSubarea(@PathVariable("id") Long id) {
       return this.subareaService.getJanelaByIdSubarea(id);
   }

   @PreAuthorize("permitAll()")
   @PostMapping("/subarea")
   public Subarea inserirSubarea(@RequestBody Subarea subarea){
       return this.subareaService.inserirOuAtualizar(subarea);
   }
   
   @PreAuthorize("permitAll()")
   @PutMapping("/subarea/{idsubarea}")
   public Subarea atualizarSubarea(@RequestBody Subarea subarea){
       return this.subareaService.inserirOuAtualizar(subarea);
   }

   @PreAuthorize("permitAll()")
   @DeleteMapping("/subarea/{idsubarea}")
   public void apagarSubarea(@PathVariable("idsubarea") Long idsubarea) {
       this.subareaService.apagar(idsubarea);
   }
}
