package project.gerenciamentoIndividual.main.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import project.gerenciamentoIndividual.main.serializer.UsuarioSerializer;

@Entity
@Table(name = "usuario")
@JsonSerialize(using = UsuarioSerializer.class)
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_sequence")
	@SequenceGenerator(name = "user_sequence", sequenceName = "user_seq", allocationSize = 1, initialValue = 4)
	@Column(name = "user_id")
	private Long idusuario;
	
	@Email(message="Email: Please provide a valid address", regexp="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
	@Column(name="email", unique=true)
	private String _email;
	
	// --------------------------------------------------------------------------------
	// @NotBlank(message="Name: Campo obrigatório")
	@Column(name = "nome")
	private String _nome;

	@Past(message = "Birthdate should be in the past")
//	@NotNull(message = "Date: Campo obrigatório")
	@Temporal(TemporalType.DATE)
	@Column(name = "borndate")
	private Date _bornDate;
	
	@OneToOne(mappedBy = "_user", cascade=CascadeType.ALL, orphanRemoval=true)
	private Auth _auth;
	//--------------------------------------------------------------------------------
	@Column(columnDefinition = "TEXT")
	private String img;
	private String objectType;

	/*
	 * @OneToMany(mappedBy="usuario", cascade=CascadeType.ALL, orphanRemoval=true,
	 * fetch=FetchType.LAZY)
	 * 
	 * @JsonManagedReference(value="usuario_UsuarioTemplates") private
	 * List<UsuarioTemplate> usuarioTemplates = new ArrayList<UsuarioTemplate>();
	 */

	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) //HERE
	@JsonManagedReference(value = "usuario_Atv")
	private List<Atividade> atividades = new ArrayList<Atividade>();

	public Usuario() {

	}
	
	public Long getIdusuario() {
		return idusuario;
	}

	public void setIdusuario(Long idusuario) {
		this.idusuario = idusuario;
	}
	public Date getBornDate() {
		return this._bornDate;
	}
	public void setBornDate(Date bornDate) {
		this._bornDate = bornDate;
	}
	public Auth getAuth() {
		return this._auth;
	}
	public void setAuth(Auth auth) {
		this._auth = auth;
	}

	public String getNome() {
		return this._nome;
	}

	public void setNome(String nome) {
		this._nome = nome;
	}

	public String getEmail() {
		return _email;
	}

	public void setEmail(String email) {
		this._email = email;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public List<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<Atividade> atividades) {
		this.atividades = atividades;
	}

	/*
	 * public List<UsuarioTemplate> getUsuarioTemplates() { return usuarioTemplates;
	 * }
	 * 
	 * public void setUsuarioTemplates(List<UsuarioTemplate> usuarioTemplates) {
	 * this.usuarioTemplates = usuarioTemplates; }
	 */

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
	
	@Override
	public String toString() {
		return String.format("Id:%d\n"
				+ "Name:%s\n"
				+ "BornDate:%s\n"
				+ "Email:%s\n"
				+ "Img:%s\n"
				+ "Type:%s\n"
				+ "Atividades:%s\n",
				this.idusuario,
				this._nome,
				this._bornDate,
				this._email,
				this.img,
				this.objectType,
				this.atividades);
	}
}
