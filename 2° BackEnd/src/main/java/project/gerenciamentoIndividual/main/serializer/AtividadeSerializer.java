package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Atividade;
import project.gerenciamentoIndividual.main.model.Janela;

public class AtividadeSerializer extends JsonSerializer<Atividade> {

    @Override
    public void serialize(Atividade atividade, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idatividade", atividade.getIdatividade());
        jsonGenerator.writeNumberField("ordem", atividade.getOrdem());
        jsonGenerator.writeStringField("nome", atividade.getNome());
        jsonGenerator.writeStringField("objectType", atividade.getObjectType());
                
        // Serialize the list of Janelas
        jsonGenerator.writeFieldName("janelas");
        jsonGenerator.writeStartArray();
        for (Janela janela: atividade.getJanelas()) {
            new JanelaSerializer().serialize(janela, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}