package project.gerenciamentoIndividual.main.model;

import java.io.Serializable;
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

//import project.gerenciamentoIndividual.main.model.Usuario;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "atividade")
public class Atividade{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idatividade;
	private int ordem;
	private String nome;
	
	@ManyToOne
	@JsonBackReference(value="usuario_Atv")
	private Usuario usuario;
	
	@OneToMany(mappedBy="atividade", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.LAZY)
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
}
