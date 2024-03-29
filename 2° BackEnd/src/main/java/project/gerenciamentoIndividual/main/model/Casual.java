package project.gerenciamentoIndividual.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.CasualSerializer;

@Entity
@Table(name = "casual")
@JsonSerialize(using = CasualSerializer.class)
public class Casual extends Task{
	
	@Column(columnDefinition="TEXT")
	private String descricao;
	
	@ManyToOne
	@JoinColumn(name="idclasse")
	@JsonBackReference(value="classe_Casual")
	private Classe classe;
	
	public Casual() {}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
		this.classe = classe;
	}
}
