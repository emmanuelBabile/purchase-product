package org.sid.msachat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class MsAchatApplication {

    @Bean
    WebClient webClient(){
        return WebClient.builder().build();
    }

    public static void main(String[] args) {
        SpringApplication.run(MsAchatApplication.class, args);
    }

}