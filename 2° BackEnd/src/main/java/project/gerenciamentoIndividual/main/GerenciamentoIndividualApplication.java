package project.gerenciamentoIndividual.main;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class GerenciamentoIndividualApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciamentoIndividualApplication.class, args);
		
	}
	
	@EventListener(ApplicationReadyEvent.class)
	public static synchronized void playSound() {
	  new Thread(new Runnable() {
	    public void run() {
	      try {	    	
	        Clip clip = AudioSystem.getClip();
	        String music = "..\\..\\..\\beeps\\HoraDoShowPorra.wav";
	        AudioInputStream inputStream = AudioSystem.getAudioInputStream(getClass().getResource(music));
	        clip.open(inputStream);
	        clip.start(); 
	      } catch (Exception e) {
	        System.err.println(e.getMessage());
	      }
	    }
	  }).start();
	}

}






















