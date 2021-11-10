package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.UsuarioTemplate;
import project.gerenciamentoIndividual.main.repositories.UsuarioTemplateRepository;

@Service
public class UsuarioTemplateService {
   
   @Autowired
   private UsuarioTemplateRepository usuarioTemplateRepository;

   public List<UsuarioTemplate> getUsuarioTemplates() {
       return this.usuarioTemplateRepository.findAll();
   }
   
   public UsuarioTemplate getUsuarioTemplatePorId(Long id) {
       return this.usuarioTemplateRepository.findById(id).orElse(null);
   }

   @Transactional
   public UsuarioTemplate inserirOuAtualizar(UsuarioTemplate usuarioTemplate) {
	   return this.usuarioTemplateRepository.save(usuarioTemplate);
   }
   
   public void apagar(Long idusuarioTemplate) {
	   this.usuarioTemplateRepository.deleteById(idusuarioTemplate);
   }
}
