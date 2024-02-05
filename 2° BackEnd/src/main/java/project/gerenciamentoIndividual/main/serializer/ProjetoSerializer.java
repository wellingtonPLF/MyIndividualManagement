package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import project.gerenciamentoIndividual.main.model.Projeto;

public class ProjetoSerializer extends JsonSerializer<Projeto> {
	
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public void serialize(Projeto projeto, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeStringField("planning", projeto.getPlanning());
        jsonGenerator.writeStringField("fazer", projeto.getFazer());
        jsonGenerator.writeStringField("pendencia", projeto.getPendencia());
        jsonGenerator.writeStringField("analise", projeto.getAnalise());
        jsonGenerator.writeStringField("bugs", projeto.getBugs());
        jsonGenerator.writeStringField("melhorias", projeto.getMelhorias());
        jsonGenerator.writeStringField("impedimentos", projeto.getImpedimentos());
        jsonGenerator.writeStringField("information", projeto.getInformation());
        
        jsonGenerator.writeNumberField("idtask", projeto.getIdtask());
        jsonGenerator.writeStringField("nome", projeto.getNome());
        jsonGenerator.writeNumberField("ordem", projeto.getOrdem());
        jsonGenerator.writeStringField("dificuldade", projeto.getDificuldade());
        
        jsonGenerator.writeStringField("data", dateFormat.format(projeto.getData()));
        
        jsonGenerator.writeStringField("tempo", projeto.getTempo());
        jsonGenerator.writeStringField("etiqueta", projeto.getEtiqueta());        
        jsonGenerator.writeStringField("objectType", projeto.getObjectType());
        
        if (projeto.getEncadeamento() != null) {
        	jsonGenerator.writeFieldName("encadeamento");
            new TaskSerializer().serialize(projeto.getEncadeamento(), jsonGenerator, serializerProvider);
        }
        else {
        	jsonGenerator.writeNullField("encadeamento");
        }

        jsonGenerator.writeEndObject();
    }
}