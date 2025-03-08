
package project.gerenciamentoIndividual.main.dtoModel;

import project.gerenciamentoIndividual.main.model.Usuario;

public class AuthenticationDTO {
	
	private AuthDTO auth;
	private Usuario user;
	
	public AuthenticationDTO() {}
	
	public AuthDTO getAuth() {
		return this.auth;
	}
	public void setAuth(AuthDTO auth) {
		this.auth = auth;
	}
	public Usuario getUser() {
		return this.user;
	}
	public void setUser(Usuario user) {
		this.user = user;
	}
}