package com.humble.product.service;

import com.humble.product.dto.ProductDTO;
import com.humble.product.entity.Product;
import com.humble.product.mapper.ProductMapper;
import com.humble.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ProductMapper mapper;

    public ProductDTO createProduct(Product p) {
        return mapper.toDTO(productRepo.save(p));
    }

    public ProductDTO updateProduct(Long id, Product product) {
        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Mettre à jour les champs
        if (product.getName() != null) {
            existingProduct.setName(product.getName());
        }
        if (product.getBrand() != null) {
            existingProduct.setBrand(product.getBrand());
        }
        if (product.getPrice() != null) {
            existingProduct.setPrice(product.getPrice());
        }
        // Toujours mettre à jour l'inventory (0 est une valeur valide)
        existingProduct.setInventory(product.getInventory());
        if (product.getDescription() != null) {
            existingProduct.setDescription(product.getDescription());
        }
        if (product.getCategory() != null) {
            existingProduct.setCategory(product.getCategory());
        }

        return mapper.toDTO(productRepo.save(existingProduct));
    }

    public ProductDTO getProduct(Long id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return mapper.toDTO(p);
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public List<ProductDTO> getAll() {
        return productRepo.findAll()
                .stream().map(mapper::toDTO).toList();
    }

    public Product getProduit(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable avec ID : " + id));
    }



}

