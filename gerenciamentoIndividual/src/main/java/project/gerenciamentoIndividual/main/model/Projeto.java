package project.gerenciamentoIndividual.main.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "projeto")
public class Projeto extends Task{
	
	private String planning;
	private String fazer;
	private String pendencia;
	private String analise;
	private String conclusao;
	
	public Projeto() {}

	public String getPlanning() {
		return planning;
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

	public String getConclusao() {
		return conclusao;
	}

	public void setConclusao(String conclusao) {
		this.conclusao = conclusao;
	}
}
