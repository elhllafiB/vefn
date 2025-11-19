package com.humble.order.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {

    private Long orderId;
    private Date orderDate;
    private Float totalAmount;
    private String orderStatus;

    private List<OrderItemDTO> items;
}

