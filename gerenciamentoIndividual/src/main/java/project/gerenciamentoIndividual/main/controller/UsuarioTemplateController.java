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

import project.gerenciamentoIndividual.main.model.UsuarioTemplate;
import project.gerenciamentoIndividual.main.service.UsuarioTemplateService;

@RestController
@RequestMapping("/")
public class UsuarioTemplateController {
	
   @Autowired
   private UsuarioTemplateService usuarioTemplateService;

   @GetMapping("/usuarioTemplate")
   public List<UsuarioTemplate> getUsuarioTemplates() {
       return this.usuarioTemplateService.getUsuarioTemplates();
   }
   
   @GetMapping("/usuarioTemplate/{id}")
   public UsuarioTemplate getUsuarioTemplatePorId(@PathVariable("id") Long id) {
       return this.usuarioTemplateService.getUsuarioTemplatePorId(id);
   }

   @PostMapping("/usuarioTemplate")
   public UsuarioTemplate inserirUsuarioTemplate(@RequestBody UsuarioTemplate usuarioTemplate){
       return this.usuarioTemplateService.inserirOuAtualizar(usuarioTemplate);
   }
   
   @PutMapping("/usuarioTemplate/{idusuarioTemplate}")
   public UsuarioTemplate atualizarUsuarioTemplate(@RequestBody UsuarioTemplate usuarioTemplate){
       return this.usuarioTemplateService.inserirOuAtualizar(usuarioTemplate);
   }

   @DeleteMapping("/usuarioTemplate/{idusuarioTemplate}")
   public void apagarUsuarioTemplate(@PathVariable("idusuarioTemplate") Long idusuarioTemplate) {
       this.usuarioTemplateService.apagar(idusuarioTemplate);
   }
}
