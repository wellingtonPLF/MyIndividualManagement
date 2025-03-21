package project.gerenciamentoIndividual.main;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration 
public class AppConfig {
	
   @Value("${config.cors.url}")
   private String url;
   
   @Bean
   public WebMvcConfigurer corsConfigurer() {
	   List<String> origins = Arrays.asList(url.split(","));
       return new WebMvcConfigurer() {
           @Override public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/**")
               .allowedOrigins(origins.toArray(new String[0]))
               .allowCredentials(true)
               .allowedHeaders("X-CSRF-Token", "Content-Type", "Access-Control-Allow-Origin", "ngrok-skip-browser-warning")
               .allowedMethods("GET", "POST", "PUT", "DELETE");
           }
       };
   }
   
   @Bean
   public PasswordEncoder passwordEncoder() {
		Map<String, PasswordEncoder> encoders = new HashMap<>();
		encoders.put("bcrypt", new BCryptPasswordEncoder());
		encoders.put("pbkdf2@SpringSecurity_v5_8", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8());
		encoders.put("scrypt@SpringSecurity_v5_8", SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8());
		encoders.put("argon2@SpringSecurity_v5_8", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
		PasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
		return passwordEncoder;
   }
}