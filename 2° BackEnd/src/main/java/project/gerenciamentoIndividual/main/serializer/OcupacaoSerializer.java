package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Ocupacao;

public class OcupacaoSerializer extends JsonSerializer<Ocupacao> {

    @Override
    public void serialize(Ocupacao ocupacao, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idocupacao", ocupacao.getIdocupacao());
        jsonGenerator.writeStringField("nome", ocupacao.getNome());
        jsonGenerator.writeNumberField("ordem", ocupacao.getOrdem());
        jsonGenerator.writeStringField("objectType", ocupacao.getObjectType());
                
        // Serialize the list of Classe
        jsonGenerator.writeFieldName("classes");
        jsonGenerator.writeStartArray();
        for (Classe classe : ocupacao.getClasses()) {
            new ClasseSerializer().serialize(classe, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}