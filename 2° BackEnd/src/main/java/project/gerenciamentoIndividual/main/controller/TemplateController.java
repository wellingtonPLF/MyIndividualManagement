package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.format.StatusResult;
import project.gerenciamentoIndividual.main.model.Template;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.TemplateService;

@RestController
@RequestMapping("/")
public class TemplateController {
	   
   @Autowired
   private TemplateService templateService;

   @PreAuthorize("permitAll()")
   @GetMapping("/template")
   public List<Template> getTemplates() {
       return this.templateService.getTemplates();
   }
   
   @PreAuthorize("permitAll()")
   @GetMapping("/template/{id}")
   public Template getTemplatePorId(@PathVariable("id") Long id) {
	   return this.templateService.getTemplatePorId(id);
   }

   @PreAuthorize("permitAll()")
   @PostMapping("/template")
   public Template inserirTemplate(@RequestBody Template template){
       return this.templateService.inserirOuAtualizar(template);
   }
   
   @PreAuthorize("permitAll()")
   @PutMapping("/template/{idtemplate}")
   public Template atualizarTemplate(@RequestBody Template template){
       return this.templateService.inserirOuAtualizar(template);
   }

   @PreAuthorize("permitAll()")
   @DeleteMapping("/template/{idtemplate}")
   public void apagarTemplate(@PathVariable("idtemplate") Long idtemplate) {
       this.templateService.apagar(idtemplate);
   }
}
