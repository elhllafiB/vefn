package com.humble.product.controller;

import com.humble.product.dto.ProductDTO;
import com.humble.product.entity.Product;
import com.humble.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService service;

    // Create a product
    @PostMapping
    public ProductDTO addProduct(@RequestBody Product product) {
        return service.createProduct(product);
    }

    // Update a product
    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return service.updateProduct(id, product);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ProductDTO getById(@PathVariable Long id) {
        return service.getProduct(id);
    }

    // Get all products
    @GetMapping
    public List<ProductDTO> getAll() {
        return service.getAll();
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProduct(id);
    }

    @GetMapping("P/{id}")
    public Product getProductbyID(@PathVariable Long id) {

        return service.getProduit(id);
    }


}

