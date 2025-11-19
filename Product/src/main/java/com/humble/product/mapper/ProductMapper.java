package com.humble.product.mapper;

import com.humble.product.dto.ProductDTO;
import com.humble.product.dto.ProductImageDTO;
import com.humble.product.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();

        // Ne pas inclure l'id dans la réponse
        dto.setName(product.getName());
        dto.setBrand(product.getBrand());
        dto.setPrice(product.getPrice());
        dto.setInventory(product.getInventory());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());

        // Mapper les images vers des objets avec seulement downloadUrl
        if (product.getImages() != null) {
            dto.setImages(
                product.getImages().stream()
                    .map(img -> {
                        ProductImageDTO imageDTO = new ProductImageDTO();
                        // Utiliser le downloadUrl de l'image (format: "/images/download/xxx.jpeg")
                        imageDTO.setDownloadUrl(img.getDownloadUrl());
                        return imageDTO;
                    })
                    .toList()
            );
        }

        return dto;
    }
}

