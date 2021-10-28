package project.gerenciamentoIndividual.main.model;

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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "subarea")
public class Subarea {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idsubarea;
	private String nome;
	
	@ManyToOne
	@JsonBackReference(value="janela_Subarea")
	private Janela janela;
	
	@OneToMany(mappedBy="subarea", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
	@JsonManagedReference(value="subarea_Ocupacao")
	private List<Ocupacao> ocupacoes = new ArrayList<Ocupacao>();
	
	public Subarea() {}

	public Long getIdsubarea() {
		return idsubarea;
	}

	public void setIdsubarea(Long idsubarea) {
		this.idsubarea = idsubarea;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Ocupacao> getOcupacao() {
		return ocupacoes;
	}

	public void setOcupacao(List<Ocupacao> ocupacao) {
		this.ocupacoes = ocupacao;
	}
}
