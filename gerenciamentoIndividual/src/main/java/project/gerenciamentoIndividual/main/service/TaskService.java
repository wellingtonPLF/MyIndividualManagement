package project.gerenciamentoIndividual.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.gerenciamentoIndividual.main.model.Task;
import project.gerenciamentoIndividual.main.repositories.TaskRepository;

@Service
public class TaskService {
   
   @Autowired
   private TaskRepository taskRepository;

   public List<Task> getTasks() {
       return this.taskRepository.findAll();
   }
   
   public Task getTaskPorId(Long id) {
       return this.taskRepository.findById(id).orElse(null);
   }

   @Transactional
   public Task inserirOuAtualizar(Task task) {
	   Task taskInserido = this.taskRepository.save(task);
       return taskInserido;
   }
   
   public void apagar(Long idtask) {
	   this.taskRepository.deleteById(idtask);
   }
}
