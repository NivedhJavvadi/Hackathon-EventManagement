package in.nivedh.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Allow all endpoints
                .allowedOrigins("http://localhost:3001")  // React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")  // Allow all headers
        .allowCredentials(true);  // Allow cookies/credentials if needed
    }

}