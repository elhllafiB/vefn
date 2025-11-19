package com.humble.order.dto;

import lombok.Data;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String brand;
    private String description;
    private float price;
}

