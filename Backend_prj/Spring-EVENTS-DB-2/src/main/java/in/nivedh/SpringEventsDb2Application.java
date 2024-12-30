package in.nivedh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="in.nivedh")
public class SpringEventsDb2Application {

	public static void main(String[] args) {
		SpringApplication.run(SpringEventsDb2Application.class, args);
	}

}
