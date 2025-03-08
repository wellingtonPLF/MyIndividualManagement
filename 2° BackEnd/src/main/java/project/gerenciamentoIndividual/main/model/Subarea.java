package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.SubareaSerializer;

@Entity
@Table(name = "subarea")
@JsonSerialize(using = SubareaSerializer.class)
public class Subarea {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="subarea_sequence")
	@SequenceGenerator(name="subarea_sequence", sequenceName="subarea_seq",  allocationSize = 1, initialValue = 10)
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
	
	@OneToMany(mappedBy="subarea", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY) //HERE
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
