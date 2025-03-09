package project.gerenciamentoIndividual.main.dtoModel;

import project.gerenciamentoIndividual.main.model.Usuario;

public class AuthDTO  {

	private Long _idauth;
	private String _password;
	private String _email;
    private String _username;
    private Usuario _user;
	
	public AuthDTO() {}
	
	public AuthDTO(Long id, String username, String password, Usuario user) {
		this._idauth = id;
		this._username = username;
		this._password = password;
		this._user = user;
	}
	
	public AuthDTO(Long id, String username, String email, String password, Usuario user) {
		this._idauth = id;
		this._username = username;
		this._email = email;
		this._password = password;
		this._user = user;
	}
	
	public Long getId() {
		return this._idauth;
	}
	public void setId(Long id) {
		this._idauth = id;
	}
	public String getUsername() {
		return this._username;
	}
	public void setUsername(String username) {
		this._username = username;
	}
	public String getEmail() {
		return this._email;
	}
	public void setEmail(String email) {
		this._email = email;
	}
	public String getPassword() {
		return this._password;
	}
	public void setPassword(String password) {
		this._password = password;
	}
	public Usuario getUser() {
		return this._user;
	}
	public void setUser(Usuario user) {
		this._user = user;
	}

	@Override
	public String toString() {
		return String.format("Id:%d\n"
				+ "UserName:%s\n"
				+ "Email:%s\n"
				+ "Password:%s\n"
				+ "User:%s\n", this._idauth, this._username, this._email, this._password, this._user);
	}
}