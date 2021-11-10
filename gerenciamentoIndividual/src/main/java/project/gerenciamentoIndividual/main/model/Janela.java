package project.gerenciamentoIndividual.main.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "janela")
public class Janela{

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="janela_sequence")
	@SequenceGenerator(name="janela_sequence", sequenceName="janela_seq",  allocationSize = 1, initialValue = 4)
	private Long idjanela;
	private String nome;
	private int ordem;
	
	@ManyToOne
	@JsonBackReference(value="atv_Janela")
	private Atividade atividade;
	
	@ManyToOne
	@JsonBackReference(value="template_Janela")
	private Template template;
	
	@OneToOne(mappedBy="janela_c", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JsonBackReference(value="template_Janela_Compoe")
	private Template compoeTemplate;
	
	@OneToMany(mappedBy="janela", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
	@JsonManagedReference(value="janela_Subarea")
	private List<Subarea> subareas = new ArrayList<Subarea>();
	
	public Janela() {}

	public Long getIdjanela() {
		return idjanela;
	}

	public void setIdjanela(Long idjanela) {
		this.idjanela = idjanela;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getOrdem() {
		return ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public Template getTemplate() {
		return template;
	}

	public void setTemplate(Template template) {
		this.template = template;
	}

	public Template getCompoeTemplate() {
		return compoeTemplate;
	}

	public void setCompoeTemplate(Template compoeTemplate) {
		this.compoeTemplate = compoeTemplate;
	}

	public List<Subarea> getSubareas() {
		return subareas;
	}

	public void setSubareas(List<Subarea> subareas) {
		this.subareas = subareas;
	}	
}
