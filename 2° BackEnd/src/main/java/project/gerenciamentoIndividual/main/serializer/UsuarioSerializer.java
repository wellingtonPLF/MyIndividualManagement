package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Usuario;

public class UsuarioSerializer extends JsonSerializer<Usuario> {

    @Override
    public void serialize(Usuario user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idusuario", user.getIdusuario());
        jsonGenerator.writeStringField("nome", user.getNome());
        jsonGenerator.writeStringField("email", user.getEmail());
        
        // Encode image to Base64
        String base64Image = encodeImageToBase64(user.getImg());
        jsonGenerator.writeStringField("img", base64Image);
        jsonGenerator.writeStringField("objectType", user.getObjectType());
        
        // Serialize the list of Atividades
        jsonGenerator.writeFieldName("atividades");
        jsonGenerator.writeStartArray();
        for (Atividade atividade : user.getAtividades()) {
            new AtividadeSerializer().serialize(atividade, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }

    private String encodeImageToBase64(String imagePath) throws IOException {
    	
    	if (imagePath != null) {
    		byte[] imageBytes = Files.readAllBytes(Paths.get("src/main/resources/assets/imgs", imagePath));
    		String[] imageType = imagePath.split("[.;]");
            String base64Encoded = Base64.getEncoder().encodeToString(imageBytes);
            String mimeType = "image/" + imageType[1]; 
            String dataUri = "data:" + mimeType + ";base64," + base64Encoded;
        	
            return dataUri;
    	}
    	else {
    		return null;
    	}
    }
}