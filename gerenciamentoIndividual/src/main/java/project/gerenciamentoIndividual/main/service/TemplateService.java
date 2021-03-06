package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Template;
import project.gerenciamentoIndividual.main.repositories.TemplateRepository;

@Service
public class TemplateService {
	   
   @Autowired
   private TemplateRepository templateRepository;

   public List<Template> getTemplates() {
       return this.templateRepository.findAll();
   }
   
   public Template getTemplatePorId(Long id) {
       return this.templateRepository.findById(id).orElse(null);
   }

   @Transactional
   public Template inserirOuAtualizar(Template template) {
	   return this.templateRepository.save(template);
   }
   
   public void apagar(Long idtemplate) {
	   this.templateRepository.deleteById(idtemplate);
   }
}
