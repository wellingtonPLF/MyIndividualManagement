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

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Task;
import project.gerenciamentoIndividual.main.model.Usuario;
import project.gerenciamentoIndividual.main.service.TaskService;

@RestController
@RequestMapping("/")
public class TaskController {
   
   @Autowired
   private TaskService taskService;

   @GetMapping("/task")
   public List<Task> getTasks() {
       return this.taskService.getTasks();
   }
   
   @GetMapping("/task/{id}")
   public Task getTaskPorId(@PathVariable("id") Long id) {
       return this.taskService.getTaskPorId(id);
   }
   
   @GetMapping("/task/myTask/classe/{id}")
   public Classe getClasseByIdTask(@PathVariable("id") Long id) {
       return this.taskService.getClasseByIdTask(id);
   }

   @PostMapping("/task")
   public Task inserirTask(@RequestBody Task task){
       return this.taskService.inserirOuAtualizar(task);
   }
   
   @PutMapping("/task/{idtask}")
   public Task atualizarTask(@RequestBody Task task){
       return this.taskService.inserirOuAtualizar(task);
   }

   @DeleteMapping("/task/{idtask}")
   public void apagarTask(@PathVariable("idtask") Long idtask) {
       this.taskService.apagar(idtask);
   }
}
