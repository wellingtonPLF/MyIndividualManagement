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

import project.gerenciamentoIndividual.main.serializer.OcupacaoSerializer;

@Entity
@Table(name = "ocupacao")
@JsonSerialize(using = OcupacaoSerializer.class)
public class Ocupacao {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ocupacao_sequence")
	@SequenceGenerator(name="ocupacao_sequence", sequenceName="ocupacao_seq",  allocationSize = 1, initialValue = 9)
	private Long idocupacao;
	private String nome;
	private int ordem;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idsubarea")
	@JsonBackReference(value="subarea_Ocupacao")
	private Subarea subarea;
	
	@OneToMany(mappedBy="ocupacao", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER) //HERE
	@JsonManagedReference(value="ocupacao_Classe")
	private List<Classe> classes = new ArrayList<Classe>();
	
	public Ocupacao() {}

	public Long getIdocupacao() {
		return idocupacao;
	}

	public void setIdocupacao(Long idocupacao) {
		this.idocupacao = idocupacao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Subarea getSubarea() {
		return subarea;
	}

	public void setSubarea(Subarea subarea) {
		this.subarea = subarea;
	}

	public List<Classe> getClasses() {
		return classes;
	}

	public void setClasses(List<Classe> classes) {
		this.classes = classes;
	}

	public int getOrdem() {
		return ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
}
