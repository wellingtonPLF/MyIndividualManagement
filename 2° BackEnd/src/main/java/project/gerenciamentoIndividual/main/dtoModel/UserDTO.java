package project.gerenciamentoIndividual.main.dtoModel;
import java.util.Date;
import java.util.List;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Auth;
import project.gerenciamentoIndividual.main.model.Usuario;

public class UserDTO  {

	private Long _idusuario;
	private String _nome;
	private String _email;
	private Date _bornDate;
    private String _img;
	private String _objectType;
	
	private List<Atividade> _atividades;
	
	public UserDTO() {} 
	
	public UserDTO(Long id, String nome, String nickName, String email, Date bornDate, String objectType, String img) {
		this._idusuario = id;
		this._nome = nome;
		this._email = email;
		this._bornDate = bornDate;
        this._objectType = objectType;
        this._img = img;
	}
	
	public UserDTO(Usuario user) {
		this._idusuario = user.getIdusuario();
		this._nome = user.getNome();
		this._email = user.getEmail();
		this._bornDate = user.getBornDate();
        this._objectType = user.getObjectType();
        this._img = user.getImg();
        this._atividades = user.getAtividades();
	}
	
	public Long getIdusuario() {
		return this._idusuario;
	}
	public void setIdusuario(Long id) {
		this._idusuario = id;
	}
    public String getNome() {
		return this._nome;
	}
	public void setNome(String name) {
		this._nome = name;
	}
	public Date getBornDate() {
		return this._bornDate;
	}
	public void setBornDate(Date bornDate) {
		this._bornDate = bornDate;
	}
	public String getEmail() {
		return this._email;
	}
	public void setEmail(String email) {
		this._email = email;
	}
	public String getObjectType() {
		return this._objectType;
	}
	public void setObjectType(String objectType) {
		this._objectType = objectType;
	}
	public String getImg() {
		return this._img;
	}
	public void setImg(String img) {
		this._img = img;
	}
	public List<Atividade> getAtividades() {
		return this._atividades;
	}
	public void setAtividades(List<Atividade> atividades) {
		this._atividades = atividades;
	}

	@Override
	public String toString() {
		return String.format("Id:%d\n"
				+ "Name:%s\n"
				+ "Email:%s\n"
				+ "BornDate:%s\n", this._idusuario, this._nome, this._email, this._bornDate);
	}
}