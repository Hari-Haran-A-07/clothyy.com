package com.clothyyy.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClothyyyInventoryApplication {

    public static void main(String[] args) {
        System.out.println("[CLOTHYYY Java Inventory Core] Initializing Spring Boot 3 Engine on port 8085...");
        SpringApplication.run(ClothyyyInventoryApplication.class, args);
    }
}
