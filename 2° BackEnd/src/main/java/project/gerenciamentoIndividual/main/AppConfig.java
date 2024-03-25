package project.gerenciamentoIndividual.main;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration 
public class AppConfig {
	
   @Value("${config.cors.url}")
   private String url;
   
   @Bean
   public WebMvcConfigurer corsConfigurer() {
       return new WebMvcConfigurer() {
           @Override public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/**")
               .allowedOrigins("https://myindividualmanagement.netlify.app", "http://localhost:4200")
               .allowCredentials(true)
               .allowedHeaders("X-CSRF-Token", "Content-Type", "Access-Control-Allow-Origin")
               .allowedMethods("GET", "POST", "PUT", "DELETE");
           }
       };
   }
}