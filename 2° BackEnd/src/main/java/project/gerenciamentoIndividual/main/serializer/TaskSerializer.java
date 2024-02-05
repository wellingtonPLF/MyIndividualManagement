package project.gerenciamentoIndividual.main.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.text.SimpleDateFormat;

import project.gerenciamentoIndividual.main.model.Task;

public class TaskSerializer extends JsonSerializer<Task> {
	
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public void serialize(Task task, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        
        jsonGenerator.writeNumberField("idtask", task.getIdtask());
        jsonGenerator.writeStringField("nome", task.getNome());
        jsonGenerator.writeNumberField("ordem", task.getOrdem());
        jsonGenerator.writeStringField("dificuldade", task.getDificuldade());
        
        jsonGenerator.writeStringField("data", dateFormat.format(task.getData()));
        
        jsonGenerator.writeStringField("tempo", task.getTempo());
        jsonGenerator.writeStringField("etiqueta", task.getEtiqueta());        
        jsonGenerator.writeStringField("objectType", task.getObjectType());
        
        jsonGenerator.writeFieldName("encadeamento");
        new TaskSerializer().serialize(task.getEncadeamento(), jsonGenerator, serializerProvider);

        jsonGenerator.writeEndObject();
    }
}