package project.gerenciamentoIndividual.main.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "usuarioTemplate")
public class UsuarioTemplate {
	 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idusuarioTemplate;
	
	@ManyToOne
	@JsonBackReference(value="usuario_UsuarioTemplates")
	private Usuario usuario;
	
	@ManyToOne
	@JsonBackReference(value="template_UsuarioTemplates")
	private Template template;
	
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Template getTemplate() {
		return template;
	}
	public void setTemplate(Template template) {
		this.template = template;
	}
	public Long getIdusuarioTemplate() {
		return idusuarioTemplate;
	}
	public void setIdusuarioTemplate(Long idusuarioTemplate) {
		this.idusuarioTemplate = idusuarioTemplate;
	}
}
