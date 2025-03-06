package project.gerenciamentoIndividual.main.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.TaskSerializer;

@Entity
@Table(name = "task")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonSerialize(using = TaskSerializer.class)
public class Task{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idtask;
	private String nome;
	private Integer ordem;
	private String dificuldade;
	
	@Temporal(TemporalType.DATE) 
	@DateTimeFormat(pattern = "dd/MM/yyyy") 
	private Date data;

	private String tempo;	
	private String etiqueta;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idencadeamento")
	private Task encadeamento;
	
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

	/*public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
		this.classe = classe;
	}*/

	public Integer getOrdem() {
		return ordem;
	}

	public void setOrdem(Integer ordem) {
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
