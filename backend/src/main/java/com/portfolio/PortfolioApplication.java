package com.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication é uma anotação "mágica" que configura tudo automaticamente.
// Ela une três anotações: @Configuration, @EnableAutoConfiguration e @ComponentScan.
@SpringBootApplication
public class PortfolioApplication {

    // Todo programa Java começa pelo método main.
    // O Spring Boot pega daqui e sobe um servidor web na porta 8080.
    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }
}
