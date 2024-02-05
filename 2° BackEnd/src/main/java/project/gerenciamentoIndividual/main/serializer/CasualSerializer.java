package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Casual;

public class CasualSerializer extends JsonSerializer<Casual> {
	
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public void serialize(Casual casual, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idtask", casual.getIdtask());
        jsonGenerator.writeStringField("nome", casual.getNome());
        jsonGenerator.writeNumberField("ordem", casual.getOrdem());
        jsonGenerator.writeStringField("dificuldade", casual.getDificuldade());
        
        jsonGenerator.writeStringField("data", dateFormat.format(casual.getData()));
        
        jsonGenerator.writeStringField("tempo", casual.getTempo());
        jsonGenerator.writeStringField("etiqueta", casual.getEtiqueta());        
        jsonGenerator.writeStringField("objectType", casual.getObjectType());
        
        if (casual.getEncadeamento() != null) {
        	jsonGenerator.writeFieldName("encadeamento");
            new TaskSerializer().serialize(casual.getEncadeamento(), jsonGenerator, serializerProvider);
        }
        else {
        	jsonGenerator.writeNullField("encadeamento");
        }
        
        
        jsonGenerator.writeStringField("descricao", casual.getDescricao());
               
        jsonGenerator.writeEndObject();
    }
}