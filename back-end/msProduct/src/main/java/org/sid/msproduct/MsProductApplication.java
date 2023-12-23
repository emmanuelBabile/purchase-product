package org.sid.msproduct;

import org.sid.msproduct.entities.Product;
import org.sid.msproduct.repositories.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@SpringBootApplication
public class MsProductApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsProductApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(ProductRepo productRepo){
        return args -> {
            ArrayList<String> cat = new ArrayList<>(Arrays.asList("IT","Food","Health"));
            for(int i=1;i<=10; i++){
                Random random = new Random();
                int indcat = random.nextInt(0,3);
                double prx = random.nextDouble(100,500);
                Product product = Product.builder()
                        .category(cat.get(indcat))
                        .price(prx)
                        .name("prod"+i)
                        .build();
                productRepo.save(product);
            }

        };
    }
}
