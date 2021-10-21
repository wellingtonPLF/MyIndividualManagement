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

@Entity
@Table(name = "template")
public class Template {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;
	
	@OneToMany(mappedBy="template", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<Janela> janelas = new ArrayList<Janela>();
	
	@OneToMany(mappedBy="template", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<Subarea> subareas = new ArrayList<Subarea>();
	
	public Template() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<Subarea> getSubareas() {
		return subareas;
	}

	public void setSubareas(List<Subarea> subareas) {
		this.subareas = subareas;
	}
}
