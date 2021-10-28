package project.gerenciamentoIndividual.main.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "casual")
public class Casual extends Task{

	private String texto;
	
	public Casual() {}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}	
}
