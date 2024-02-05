package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Casual;
import project.gerenciamentoIndividual.main.model.Classe;
import project.gerenciamentoIndividual.main.model.Projeto;

public class ClasseSerializer extends JsonSerializer<Classe> {

    @Override
    public void serialize(Classe classe, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idclasse", classe.getIdclasse());
        jsonGenerator.writeStringField("nome", classe.getNome());
        jsonGenerator.writeNumberField("ordem", classe.getOrdem());
        jsonGenerator.writeStringField("padrao", classe.getPadrao());
        
        jsonGenerator.writeStringField("quando", classe.getQuando());
        jsonGenerator.writeStringField("info", classe.getInfo());
        jsonGenerator.writeStringField("porque", classe.getPorque());
        jsonGenerator.writeStringField("oque", classe.getOque());
        jsonGenerator.writeStringField("como", classe.getComo());
        
        jsonGenerator.writeStringField("objectType", classe.getObjectType());
        
        // Serialize the list of Casual
        jsonGenerator.writeFieldName("casual");
        jsonGenerator.writeStartArray();
        for (Casual casual : classe.getCasual()) {
            new CasualSerializer().serialize(casual, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();
        
        //Serialize the list of Projeto
        jsonGenerator.writeFieldName("projeto");
        jsonGenerator.writeStartArray();
        for (Projeto projeto : classe.getProjeto()) {
            new ProjetoSerializer().serialize(projeto , jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}