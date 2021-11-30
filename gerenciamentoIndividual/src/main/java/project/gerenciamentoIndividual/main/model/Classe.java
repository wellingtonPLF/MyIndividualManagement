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
@Table(name = "classe")
public class Classe {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="classe_sequence")
	@SequenceGenerator(name="classe_sequence", sequenceName="classe_seq",  allocationSize = 1, initialValue = 8)
	private Long idclasse;
	private String nome;
	private int ordem;
	private String objetivo;
	private String porque;
	private String oque;
	private String como;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idocupacao")
	@JsonBackReference(value="ocupacao_Classe")
	private Ocupacao ocupacao;
	
	@OneToMany(mappedBy="classe", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
	@JsonManagedReference(value="classe_Task")
	private List<Task> tasks = new ArrayList<Task>();
	
	public Classe() {}

	public Long getIdclasse() {
		return idclasse;
	}

	public void setIdclasse(Long idclasse) {
		this.idclasse = idclasse;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getObjetivo() {
		return objetivo;
	}

	public void setObjetivo(String objetivo) {
		this.objetivo = objetivo;
	}

	public String getPorque() {
		return porque;
	}

	public void setPorque(String porque) {
		this.porque = porque;
	}

	public String getOque() {
		return oque;
	}

	public void setOque(String oque) {
		this.oque = oque;
	}

	public String getComo() {
		return como;
	}

	public void setComo(String como) {
		this.como = como;
	}

	public Ocupacao getOcupacao() {
		return ocupacao;
	}

	public void setOcupacao(Ocupacao ocupacao) {
		this.ocupacao = ocupacao;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
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
