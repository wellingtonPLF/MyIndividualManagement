package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "subarea")
public class Subarea {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="subarea_sequence")
	@SequenceGenerator(name="subarea_sequence", sequenceName="subarea_seq",  allocationSize = 1, initialValue = 8)
	private Long idsubarea;
	private String nome;
	private String tipo; //CASUAL OU PROJETO
	private Integer estilo; //1, 2 OU 3
	private Integer ordem;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idjanela")
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

	public List<Ocupacao> getOcupacoes() {
		return ocupacoes;
	}

	public void setOcupacoes(List<Ocupacao> ocupacoes) {
		this.ocupacoes = ocupacoes;
	}

	public Integer getOrdem() {
		return ordem;
	}

	public void setOrdem(Integer ordem) {
		this.ordem = ordem;
	}

	public Janela getJanela() {
		return janela;
	}

	public void setJanela(Janela janela) {
		this.janela = janela;
	}
	
	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public Integer getEstilo() {
		return estilo;
	}

	public void setEstilo(Integer estilo) {
		this.estilo = estilo;
	}
}
