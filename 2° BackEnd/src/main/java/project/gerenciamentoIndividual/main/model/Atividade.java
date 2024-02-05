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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.AtividadeSerializer;

@Entity
@Table(name = "atividade")
@JsonSerialize(using = AtividadeSerializer.class)
public class Atividade{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
