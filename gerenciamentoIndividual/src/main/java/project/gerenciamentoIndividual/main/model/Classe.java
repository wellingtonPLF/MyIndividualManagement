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

@Entity
@Table(name = "classe")
public class Classe {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;
	private String objetivo;
	private String porque;
	private String oque;
	private String como;
	
	@ManyToOne
	private Ocupacao ocupacao = new Ocupacao();
	
	@OneToMany(mappedBy="classe", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER)
	private List<Task> tasks = new ArrayList<Task>();
	
	public Classe() {}

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
}