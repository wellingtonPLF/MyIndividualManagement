package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Subarea;

public class JanelaSerializer extends JsonSerializer<Janela> {

    @Override
    public void serialize(Janela janela, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idjanela", janela.getIdjanela());
        jsonGenerator.writeStringField("nome", janela.getNome());
        
        if (janela.getOrdem() == null) {
        	jsonGenerator.writeNumberField("ordem", 0);
        }
        else {
        	jsonGenerator.writeNumberField("ordem", janela.getOrdem());
        }

        jsonGenerator.writeStringField("objectType", janela.getObjectType());
        jsonGenerator.writeStringField("info", janela.getInfo());
        
        // Serialize the list of Subarea
        jsonGenerator.writeFieldName("subareas");
        jsonGenerator.writeStartArray();
        for (Subarea subarea : janela.getSubareas()) {
            new SubareaSerializer().serialize(subarea, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}