package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.TemplateSerializer;

@Entity
@Table(name = "template")
@JsonSerialize(using = TemplateSerializer.class)
public class Template{
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="template_sequence")
	@SequenceGenerator(name="template_sequence", sequenceName="template_seq",  allocationSize = 1, initialValue = 4)
	private Long idtemplate;
	private String nome;
	private String objectType;
	
	/*@OneToMany(mappedBy="template", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
	@JsonManagedReference(value="template_UsuarioTemplates")
	private List<UsuarioTemplate> usuarioTemplates = new ArrayList<UsuarioTemplate>();
	*/
	
	@OneToOne
	@JoinColumn(name="janela_c")
	@JsonManagedReference(value="template_Janela_Compoe")
	private Janela janela_c;
	
	@OneToMany(mappedBy="template", cascade= {CascadeType.PERSIST})
	@JsonManagedReference(value="template_Janela")
	private List<Janela> janelas = new ArrayList<Janela>();
	
	public Template() {}

	public Long getIdtemplate() {
		return idtemplate;
	}

	public void setIdtemplate(Long idtemplate) {
		this.idtemplate = idtemplate;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Janela> getJanelas() {
		return janelas;
	}

	public void setJanelas(List<Janela> janelas) {
		this.janelas = janelas;
	}

	public Janela getJanela_c() {
		return janela_c;
	}

	public void setJanela_c(Janela janela_c) {
		this.janela_c = janela_c;
	}

	/*public List<UsuarioTemplate> getUsuarioTemplates() {
		return usuarioTemplates;
	}

	public void setUsuarioTemplates(List<UsuarioTemplate> usuarioTemplates) {
		this.usuarioTemplates = usuarioTemplates;
	}*/

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
}
