package project.gerenciamentoIndividual.main.service;

import project.gerenciamentoIndividual.main.repositories.UsuarioRepository;
import project.gerenciamentoIndividual.main.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Service
public class UsuarioService {

   @Autowired
   private UsuarioRepository usuarioRepository;

   public List<Usuario> getUsuarios() {
       return this.usuarioRepository.findAll();
   }
   
   public Usuario getUsuariosPorId(Long idusuario) {	   
       return this.usuarioRepository.findById(idusuario).orElse(null);
   }
   
   public Usuario getUsuarioByNome(String nome) {
	   return this.usuarioRepository.findUsuarioByNome(nome);
   }
   
   public Boolean checkLimit() {
	   int qnt = this.usuarioRepository.findAll().size();
	   if (qnt >= 3) {
		   throw new RuntimeException();
	   }
	   return false;
   }
   
   public Usuario inserir(Usuario usuario) {
	   int qnt = this.usuarioRepository.findAll().size();
	   if (qnt >= 2) {
		   throw new RuntimeException();
	   }
	   return this.usuarioRepository.save(usuario);
   }
   
   @Transactional
   public Usuario atualizar(Usuario usuario) {
	   String[] imageType = usuario.getImg().split("[.;]");
	   
	   String[] parts = usuario.getImg().split(String.format(";data:image/%s;base64,", imageType[1]));
	   String imageName = parts[0];
	   String base64Image = parts[1];
	   
	   byte[] decodedBytes = Base64.getDecoder().decode(base64Image);
	   
       try {
    	   Path path = Paths.get("src/main/resources", "/assets/imgs/" + imageName);
           Files.write(path, decodedBytes);
       } catch (IOException e) {
           System.err.println("Error saving image: " + e.getMessage());
       }
       
       usuario.setImg(imageName);
       return this.usuarioRepository.save(usuario);
   } 
   
   public void apagar(Long idusuario) {
	   this.usuarioRepository.deleteById(idusuario);
   }
}