package project.gerenciamentoIndividual.main.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "casual")
public class Casual extends Task{

	private String descricao;
	
	public Casual() {}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}	
}
