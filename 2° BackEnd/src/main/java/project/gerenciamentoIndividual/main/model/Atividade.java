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

import project.gerenciamentoIndividual.main.serializer.AtividadeSerializer;

@Entity
@Table(name = "atividade")
@JsonSerialize(using = AtividadeSerializer.class)
public class Atividade{
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="atividade_sequence")
	@SequenceGenerator(name="atividade_sequence", sequenceName="atividade_seq",  allocationSize = 1, initialValue = 2)
	private Long idatividade;
	private int ordem;
	private String nome;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idusuario")
	@JsonBackReference(value="usuario_Atv")
	private Usuario usuario;
	
	@OneToMany(mappedBy="atividade", cascade= {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.REFRESH}, 
			orphanRemoval=true, fetch=FetchType.LAZY)
	@JsonManagedReference(value="atv_Janela")
	private List<Janela> janelas = new ArrayList<Janela>(); 
	
	public Atividade() {}

	public Long getIdatividade() {
		return idatividade;
	}

	public void setIdatividade(Long idatividade) {
		this.idatividade = idatividade;
	}
	
	public int getOrdem() {
		return ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public List<Janela> getJanelas() {
		return janelas;
	}

	public void setJanelas(List<Janela> janelas) {
		this.janelas = janelas;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
	
	@Override
	public String toString() {
		return String.format("Id:%d\n"
				+ "Name:%s\n"
				+ "Ordem:%s\n", this.idatividade, this.nome,this.ordem);
	}
}
