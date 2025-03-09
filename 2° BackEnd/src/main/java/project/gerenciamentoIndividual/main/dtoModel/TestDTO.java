package project.gerenciamentoIndividual.main.dtoModel;

import project.gerenciamentoIndividual.main.model.Atividade;

public class TestDTO {
	
	private Atividade auth;
	private Integer user;
	
	public TestDTO() {}
	
	public Atividade getAuth() {
		return this.auth;
	}
	public void setAuth(Atividade auth) {
		this.auth = auth;
	}
	public Integer getUser() {
		return this.user;
	}
	public void setUser(Integer user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return String.format("Atividade:%d\n"
				+ "UserID:%s\n",
				this.auth,
				this.user);
	}
}
