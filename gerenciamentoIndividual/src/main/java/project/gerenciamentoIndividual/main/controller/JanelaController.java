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

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.JanelaService;

@RestController
@RequestMapping("/")
public class JanelaController {

   @Autowired
   private JanelaService janelaService;

   @GetMapping("/janela")
   public List<Janela> getJanelas() {
       return this.janelaService.getJanelas();
   }
   
   @GetMapping("/janela/{id}")
   public Janela getJanelaPorId(@PathVariable("id") Long id) {
       return this.janelaService.getJanelaPorId(id);
   }

   @PostMapping("/janela")
   public Janela inserirJanela(@RequestBody Janela janela){
       return this.janelaService.inserirOuAtualizar(janela);
   }
   
   @PutMapping("/janela/{idjanela}")
   public Janela atualizarJanela(@RequestBody Janela janela){
       return this.janelaService.inserirOuAtualizar(janela);
   }

   @DeleteMapping("/janela/{idjanela}")
   public void apagarJanela(@PathVariable("idjanela") Long idjanela) {
       this.janelaService.apagar(idjanela);
   }
}
