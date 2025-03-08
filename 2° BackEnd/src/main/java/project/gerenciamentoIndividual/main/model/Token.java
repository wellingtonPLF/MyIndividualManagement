package project.gerenciamentoIndividual.main.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "token")
public class Token {
	@Id
	@GeneratedValue
	@Column(name="token_id")
	private Long _id;

	@OneToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "auth_id", unique = true)
	private Auth _auth;
	
	@Column(name = "key", unique = true)
	private String _token;

	public Token() {}
	
	public Token(String token, Auth auth) {
		this._token = token;
		this._auth = auth;
	}
	
	public Long getId() {
		return this._id;
	}

	public void setId(Long id) {
		this._id = id;
	}

	public String getToken() {
		return this._token;
	}

	public void setToken(String token) {
		this._token = token;
	}

	public Auth getAuth() {
		return this._auth;
	}

	public void setAuth(Auth auth) {
		this._auth = auth;
	}
	
	@Override
	public String toString() {
		return String.format("Id:%d\n"
				+ "Token:%s\n"
				+ "Auth:%s\n", this._id, this._token, this._auth);
	}
}