package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.service.SubareaService;

@RestController
@RequestMapping("/")
public class SubareaController {

   @Autowired
   private SubareaService subareaService;

   @GetMapping("/subarea")
   public List<Subarea> getSubareas() {
       return this.subareaService.getSubareas();
   }
   
   @GetMapping("/subarea/{id}")
   public Subarea getSubareaPorId(@PathVariable("id") Long id) {
       return this.subareaService.getSubareaPorId(id);
   }

   @PostMapping("/subarea")
   public Subarea inserirSubarea(@RequestBody Subarea subarea){
       return this.subareaService.inserirSubarea(subarea);
   }
}
