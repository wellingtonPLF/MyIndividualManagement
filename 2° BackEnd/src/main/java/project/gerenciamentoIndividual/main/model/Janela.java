package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.JanelaSerializer;

@Entity
@Table(name = "janela")
@JsonSerialize(using = JanelaSerializer.class)
public class Janela{

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="janela_sequence")
	@SequenceGenerator(name="janela_sequence", sequenceName="janela_seq",  allocationSize = 1, initialValue = 4)
	private Long idjanela;
	private String nome;
	private Integer ordem;
	private String objectType;
	
	@Column(columnDefinition="TEXT")
	private String info;
	
	@ManyToOne
	@JoinColumn(name="idatividade")
	@JsonBackReference(value="atv_Janela")
	private Atividade atividade;
	
	@ManyToOne
	@JoinColumn(name="idtemplate")
	@JsonBackReference(value="template_Janela")
	private Template template;
	
	@OneToOne(mappedBy="janela_c", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	@JsonBackReference(value="template_Janela_Compoe")
	private Template compoeTemplate;
	
	@OneToMany(mappedBy="janela", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER) //HERE
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

	public Integer getOrdem() {
		return ordem;
	}

	public void setOrdem(Integer ordem) {
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

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
}
