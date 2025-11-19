package com.humble.product.controller;

import com.humble.product.dto.ImageDTO;
import com.humble.product.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // Upload multiple images for a product
    @PostMapping("/upload")
    public List<ImageDTO> upload(
            @RequestParam Long productId,
            @RequestParam List<MultipartFile> files) throws IOException {
        return imageService.uploadImages(productId, files);
    }

    // Create a single image
    @PostMapping
    public ImageDTO createImage(
            @RequestParam Long productId,
            @RequestParam MultipartFile file) throws IOException {
        return imageService.createImage(productId, file);
    }

    // Get all images
    @GetMapping
    public List<ImageDTO> getAllImages() {
        return imageService.getAllImages();
    }

    // Get image by ID (returns DTO with path info)
    @GetMapping("/{id}")
    public ImageDTO getImageById(@PathVariable Long id) {
        return imageService.getImageById(id);
    }

    // Get images by product ID
    @GetMapping("/product/{productId}")
    public List<ImageDTO> getImagesByProductId(@PathVariable Long productId) {
        return imageService.getImagesByProductId(productId);
    }

    // Update an image
    @PutMapping("/{id}")
    public ImageDTO updateImage(
            @PathVariable Long id,
            @RequestParam MultipartFile file) throws IOException {
        return imageService.updateImage(id, file);
    }

    // Delete an image
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    // Download image file by filename with extension (from downloadUrl like /images/download/xxx.jpeg)
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<byte[]> downloadByFileName(@PathVariable String fileName) throws IOException {
        byte[] fileData = imageService.getImageFileByFileName(fileName);
        ImageDTO img = imageService.getAllImages().stream()
                .filter(i -> i.getDownloadUrl() != null && i.getDownloadUrl().contains(fileName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Image not found"));

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(img.getFileType()))
                .header("Content-Disposition", "attachment; filename=\"" + img.getFileName() + "\"")
                .body(fileData);
    }

    // Download image file by ID (alternative endpoint)
    @GetMapping("/download/id/{id}")
    public ResponseEntity<byte[]> downloadById(@PathVariable Long id) throws IOException {
        ImageDTO img = imageService.getImageById(id);
        byte[] fileData = imageService.getImageFile(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(img.getFileType()))
                .header("Content-Disposition", "attachment; filename=\"" + img.getFileName() + "\"")
                .body(fileData);
    }
}

