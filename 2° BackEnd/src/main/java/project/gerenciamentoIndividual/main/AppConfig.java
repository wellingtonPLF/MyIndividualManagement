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
               .allowedOrigins("https://myindividualmanagement.netlify.app/")
               .allowCredentials(true)
               .allowedHeaders("*")
               .allowedMethods("GET", "POST", "PUT", "DELETE");
           }
       };
   }
}