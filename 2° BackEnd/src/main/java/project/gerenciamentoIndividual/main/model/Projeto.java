package project.gerenciamentoIndividual.main.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.ProjetoSerializer;

@Entity
@Table(name = "projeto")
@JsonSerialize(using = ProjetoSerializer.class)
public class Projeto extends Task{
	
	@Column(columnDefinition="TEXT")
	private String planning;
	
	@Column(columnDefinition="TEXT")
	private String fazer;
	
	@Column(columnDefinition="TEXT")
	private String pendencia;
	
	@Column(columnDefinition="TEXT")
	private String analise;
	
	@Column(columnDefinition="TEXT")
	private String bugs;
	
	@Column(columnDefinition="TEXT")
	private String melhorias;
	
	@Column(columnDefinition="TEXT")
	private String impedimentos;
	
	@Column(columnDefinition="TEXT")
	private String information;
	
	@ManyToOne
	@JoinColumn(name="idclasse")
	@JsonBackReference(value="classe_Projeto")
	private Classe classe;
	
	public Projeto() {}

	public String getPlanning() {
		return planning;
	}

	public String getBugs() {
		return bugs;
	}

	public void setBugs(String bugs) {
		this.bugs = bugs;
	}

	public String getMelhorias() {
		return melhorias;
	}

	public void setMelhorias(String melhorias) {
		this.melhorias = melhorias;
	}

	public String getImpedimentos() {
		return impedimentos;
	}

	public void setImpedimentos(String impedimentos) {
		this.impedimentos = impedimentos;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}

	public void setPlanning(String planning) {
		this.planning = planning;
	}

	public String getFazer() {
		return fazer;
	}

	public void setFazer(String fazer) {
		this.fazer = fazer;
	}

	public String getPendencia() {
		return pendencia;
	}

	public void setPendencia(String pendencia) {
		this.pendencia = pendencia;
	}

	public String getAnalise() {
		return analise;
	}

	public void setAnalise(String analise) {
		this.analise = analise;
	}
	
	public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
		this.classe = classe;
	}
}
