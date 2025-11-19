package com.humble.order.controller;

import com.humble.order.dto.OrderDTO;
import com.humble.order.dto.OrderItemDTO;
import com.humble.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public OrderDTO create(@RequestBody List<OrderItemDTO> items) {
        return service.createOrder(items);
    }

    @GetMapping("/{id}")
    public OrderDTO getById(@PathVariable Long id) {
        return service.getOrder(id);
    }
}

