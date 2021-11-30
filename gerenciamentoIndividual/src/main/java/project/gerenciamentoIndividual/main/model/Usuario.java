package project.gerenciamentoIndividual.main.model;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "usuario")
public class Usuario{

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long idusuario;
   private String nome;
   private String email;
   private String img;
   private String senha;
   private String token;
   private String objectType;
   
   @OneToMany(mappedBy="usuario", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
   @JsonManagedReference(value="usuario_UsuarioTemplates")
   private List<UsuarioTemplate> usuarioTemplates = new ArrayList<UsuarioTemplate>();
   
   @OneToMany(mappedBy="usuario", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
   @JsonManagedReference(value="usuario_Atv")
   private List<Atividade> atividades = new ArrayList<Atividade>();
   
   public Usuario() { 	
	   
   }
   
	public Long getIdusuario() {
		return idusuario;
	}
	
	public void setIdusuario(Long idusuario) {
		this.idusuario = idusuario;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getSenha() {
		return senha;
	}
	
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public String getImg() {
		return img;
	}
	
	public void setImg(String img) {
		this.img = img;
	}
	
	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public List<Atividade> getAtividades() {
		return atividades;
	}
	
	public void setAtividades(List<Atividade> atividades) {
		this.atividades = atividades;
	}

	public List<UsuarioTemplate> getUsuarioTemplates() {
		return usuarioTemplates;
	}

	public void setUsuarioTemplates(List<UsuarioTemplate> usuarioTemplates) {
		this.usuarioTemplates = usuarioTemplates;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
}
