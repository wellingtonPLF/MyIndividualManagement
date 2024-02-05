package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Ocupacao;
import project.gerenciamentoIndividual.main.model.Subarea;

public class SubareaSerializer extends JsonSerializer<Subarea> {

    @Override
    public void serialize(Subarea subarea, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idsubarea", subarea.getIdsubarea());
        jsonGenerator.writeStringField("nome", subarea.getNome());
        jsonGenerator.writeStringField("tipo", subarea.getTipo());
        jsonGenerator.writeNumberField("estilo", subarea.getEstilo());
        jsonGenerator.writeNumberField("ordem", subarea.getOrdem());
        jsonGenerator.writeStringField("objectType", subarea.getObjectType());
        
        // Serialize the list of Ocupacao
        jsonGenerator.writeFieldName("ocupacoes");
        jsonGenerator.writeStartArray();
        for (Ocupacao ocupacao : subarea.getOcupacoes()) {
            new OcupacaoSerializer().serialize(ocupacao, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}