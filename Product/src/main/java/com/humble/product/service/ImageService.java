package com.humble.product.service;

import com.humble.product.dto.ImageDTO;
import com.humble.product.entity.Image;
import com.humble.product.entity.Product;
import com.humble.product.repository.ImageRepository;
import com.humble.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ImageRepository imageRepo;

    @Value("${image.upload-dir:./uploads/images}")
    private String uploadDir;

    public List<ImageDTO> uploadImages(Long productId, List<MultipartFile> files) throws IOException {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Créer le répertoire s'il n'existe pas
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        List<Image> images = new ArrayList<>();

        for (MultipartFile file : files) {
            // Générer un nom de fichier unique
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                : "";
            String uniqueFileName = UUID.randomUUID().toString() + extension;
            
            // Sauvegarder le fichier localement
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Créer l'entité Image
            Image img = new Image();
            img.setFileName(originalFilename);
            img.setFileType(file.getContentType());
            img.setFilePath(filePath.toString());
            img.setDownloadUrl("/images/download/" + uniqueFileName);
            img.setProduct(product);
            images.add(img);
        }

        imageRepo.saveAll(images);

        return images.stream().map(this::toDTO).toList();
    }

    public ImageDTO createImage(Long productId, MultipartFile file) throws IOException {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".") 
            ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
            : "";
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Image img = new Image();
        img.setFileName(originalFilename);
        img.setFileType(file.getContentType());
        img.setFilePath(filePath.toString());
        img.setDownloadUrl("/images/download/" + uniqueFileName);
        img.setProduct(product);

        return toDTO(imageRepo.save(img));
    }

    public ImageDTO updateImage(Long id, MultipartFile file) throws IOException {
        Image image = imageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Supprimer l'ancien fichier
        if (image.getFilePath() != null) {
            try {
                Files.deleteIfExists(Paths.get(image.getFilePath()));
            } catch (IOException e) {
                // Log l'erreur mais continue
            }
        }

        // Sauvegarder le nouveau fichier
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".") 
            ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
            : "";
        String uniqueFileName = UUID.randomUUID().toString() + extension;
        
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        image.setFileName(originalFilename);
        image.setFileType(file.getContentType());
        image.setFilePath(filePath.toString());
        image.setDownloadUrl("/images/download/" + uniqueFileName);

        return toDTO(imageRepo.save(image));
    }

    public void deleteImage(Long id) {
        Image image = imageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Supprimer le fichier physique
        if (image.getFilePath() != null) {
            try {
                Files.deleteIfExists(Paths.get(image.getFilePath()));
            } catch (IOException e) {
                // Log l'erreur mais continue
            }
        }

        imageRepo.delete(image);
    }

    public ImageDTO getImageById(Long id) {
        Image image = imageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return toDTO(image);
    }

    public List<ImageDTO> getAllImages() {
        return imageRepo.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public List<ImageDTO> getImagesByProductId(Long productId) {
        return imageRepo.findByProductId(productId).stream()
                .map(this::toDTO)
                .toList();
    }

    public byte[] getImageFile(Long id) throws IOException {
        Image image = imageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        
        if (image.getFilePath() == null) {
            throw new RuntimeException("Image file path not found");
        }

        Path filePath = Paths.get(image.getFilePath());
        if (!Files.exists(filePath)) {
            throw new RuntimeException("Image file not found on disk");
        }

        return Files.readAllBytes(filePath);
    }

    public byte[] getImageFileByFileName(String fileName) throws IOException {
        // Chercher l'image par le nom de fichier unique dans le downloadUrl
        // Le fileName peut être "244b1bd8-9007-449c-a725-c1067a6963d8.jpeg" ou juste l'UUID
        List<Image> images = imageRepo.findAll();
        Image image = images.stream()
                .filter(img -> {
                    if (img.getDownloadUrl() == null) return false;
                    // Extraire le nom du fichier du downloadUrl (après le dernier /)
                    String urlFileName = img.getDownloadUrl().substring(img.getDownloadUrl().lastIndexOf("/") + 1);
                    // Comparer avec le fileName fourni (peut être avec ou sans extension)
                    return urlFileName.equals(fileName) || 
                           urlFileName.startsWith(fileName) || 
                           fileName.equals(urlFileName.substring(0, urlFileName.lastIndexOf(".")));
                })
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Image not found with fileName: " + fileName));

        if (image.getFilePath() == null) {
            throw new RuntimeException("Image file path not found");
        }

        Path filePath = Paths.get(image.getFilePath());
        if (!Files.exists(filePath)) {
            throw new RuntimeException("Image file not found on disk: " + filePath);
        }

        return Files.readAllBytes(filePath);
    }

    private ImageDTO toDTO(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setFileName(image.getFileName());
        dto.setFileType(image.getFileType());
        dto.setFilePath(image.getFilePath());
        dto.setDownloadUrl(image.getDownloadUrl());
        return dto;
    }
}

