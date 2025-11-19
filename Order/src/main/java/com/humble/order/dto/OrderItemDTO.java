package com.humble.order.dto;

import lombok.Data;

@Data
public class OrderItemDTO {

    private Long id;
    private int quantity;
    private float price;
    private Long productId;
}

