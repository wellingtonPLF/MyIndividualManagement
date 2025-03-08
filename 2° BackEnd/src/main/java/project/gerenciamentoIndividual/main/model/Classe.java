package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import project.gerenciamentoIndividual.main.serializer.ClasseSerializer;

@Entity
@Table(name = "classe")
@JsonSerialize(using = ClasseSerializer.class)
public class Classe {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="classe_sequence")
	@SequenceGenerator(name="classe_sequence", sequenceName="classe_seq",  allocationSize = 1, initialValue = 10)
	private Long idclasse;
	private String nome;
	private Integer ordem;
	private String padrao;
	
	@Column(columnDefinition="TEXT")
	private String quando;
	
	@Column(columnDefinition="TEXT")
	private String info;
	
	@Column(columnDefinition="TEXT")
	private String porque;
	
	@Column(columnDefinition="TEXT")
	private String oque;
	
	@Column(columnDefinition="TEXT")
	private String como;
	private String objectType;
	
	@ManyToOne
	@JoinColumn(name="idocupacao")
	@JsonBackReference(value="ocupacao_Classe")
	private Ocupacao ocupacao;
	
	@OneToMany(mappedBy="classe", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER) //HERE
	@JsonManagedReference(value="classe_Casual")
	private List<Casual> casual = new ArrayList<Casual>();
	
	@OneToMany(mappedBy="classe", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER) //HERE
	@JsonManagedReference(value="classe_Projeto")
	private List<Projeto> projeto = new ArrayList<Projeto>();
	
	
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

	public String getQuando() {
		return quando;
	}

	public void setQuando(String quando) {
		this.quando = quando;
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

	public Integer getOrdem() {
		return ordem;
	}

	public void setOrdem(Integer ordem) {
		this.ordem = ordem;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getPadrao() {
		return padrao;
	}

	public void setPadrao(String padrao) {
		this.padrao = padrao;
	}

	public List<Casual> getCasual() {
		return casual;
	}

	public void setCasual(List<Casual> casual) {
		this.casual = casual;
	}

	public List<Projeto> getProjeto() {
		return projeto;
	}

	public void setProjeto(List<Projeto> projeto) {
		this.projeto = projeto;
	}
}
