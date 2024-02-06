package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import project.gerenciamentoIndividual.main.model.Janela;
import project.gerenciamentoIndividual.main.model.Subarea;
import project.gerenciamentoIndividual.main.model.Template;

public class TemplateSerializer extends JsonSerializer<Template> {

    @Override
    public void serialize(Template template, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idtemplate", template.getIdtemplate());
        jsonGenerator.writeStringField("nome", template.getNome());
        jsonGenerator.writeStringField("objectType", template.getObjectType());
        
        jsonGenerator.writeFieldName("janela_c");
        new JanelaSerializer().serialize(template.getJanela_c(), jsonGenerator, serializerProvider);
                       
        // Serialize the list of Subarea
        jsonGenerator.writeFieldName("janelas");
        jsonGenerator.writeStartArray();
        for (Janela janela : template.getJanelas()) {
            new JanelaSerializer().serialize(janela, jsonGenerator, serializerProvider);
        }
        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}