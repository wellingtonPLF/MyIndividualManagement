package project.gerenciamentoIndividual.main.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "task")
public class Task{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idtask;
	private String nome;
	private int ordem;
	private String dificuldade;
	
	@Temporal(TemporalType.DATE) 
	@DateTimeFormat(pattern = "dd/MM/yyyy") 
	private Date data;

	private String tempo;

	@Column(columnDefinition="TEXT")
	private String descricao;
	
	private String etiqueta;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idencadeamento")
	private Task encadeamento;
	
	@ManyToOne
	@JsonBackReference(value="classe_Task")
	private Classe classe;
	
	public Task() {}

	public Long getIdtask() {
		return idtask;
	}

	public void setIdtask(Long idtask) {
		this.idtask = idtask;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}
	
	public String getTempo() {
		return tempo;
	}

	public void setTempo(String tempo) {
		this.tempo = tempo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getEtiqueta() {
		return etiqueta;
	}

	public void setEtiqueta(String etiqueta) {
		this.etiqueta = etiqueta;
	}

	public Task getEncadeamento() {
		return encadeamento;
	}

	public void setEncadeamento(Task encadeamento) {
		this.encadeamento = encadeamento;
	}

	public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
		this.classe = classe;
	}

	public int getOrdem() {
		return ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public String getDificuldade() {
		return dificuldade;
	}

	public void setDificuldade(String dificuldade) {
		this.dificuldade = dificuldade;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
}
