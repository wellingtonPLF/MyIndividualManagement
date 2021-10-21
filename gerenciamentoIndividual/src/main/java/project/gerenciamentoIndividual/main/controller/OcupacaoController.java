package project.gerenciamentoIndividual.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.service.OcupacaoService;

@RestController
@RequestMapping("/")
public class OcupacaoController {

   @Autowired
   private OcupacaoService ocupacaoService;

   @GetMapping("/ocupacao")
   public List<Ocupacao> getOcupacoes() {
       return this.ocupacaoService.getOcupacoes();
   }
   
   @GetMapping("/ocupacao/{id}")
   public Ocupacao getOcupacaoPorId(@PathVariable("id") Long id) {
       return this.ocupacaoService.getOcupacaoPorId(id);
   }

   @PostMapping("/ocupacao")
   public Ocupacao inserirOcupacao(@RequestBody Ocupacao ocupacao){
       return this.ocupacaoService.inserirOcupacao(ocupacao);
   }
}
