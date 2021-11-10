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
	
	@Temporal(TemporalType.DATE) 
	@DateTimeFormat(pattern = "dd/MM/yyyy") 
	private Date data;
	
	@Temporal(TemporalType.DATE) 
	private Date tempo;
	private String descricao;
	private String comentario;
	private String etiqueta;
	
	@ManyToOne
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

	public Date getTempo() {
		return tempo;
	}

	public void setTempo(Date tempo) {
		this.tempo = tempo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
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
}
