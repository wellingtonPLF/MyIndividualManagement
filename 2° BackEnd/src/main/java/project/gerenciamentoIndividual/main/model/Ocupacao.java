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
@Table(name = "ocupacao")
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
	
	@OneToMany(mappedBy="ocupacao", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
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
