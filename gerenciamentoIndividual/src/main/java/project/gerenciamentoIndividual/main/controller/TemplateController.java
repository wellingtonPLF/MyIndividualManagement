package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.model.Template;
import project.gerenciamentoIndividual.main.service.TemplateService;

@RestController
@RequestMapping("/")
public class TemplateController {
	   
   @Autowired
   private TemplateService templateService;

   @GetMapping("/template")
   public List<Template> getTemplates() {
       return this.templateService.getTemplates();
   }
   
   @GetMapping("/template/{id}")
   public Template getTemplatePorId(@PathVariable("id") Long id) {
       return this.templateService.getTemplatePorId(id);
   }

   @PostMapping("/template")
   public Template inserirTemplate(@RequestBody Template template){
       return this.templateService.inserirTemplate(template);
   }
}
