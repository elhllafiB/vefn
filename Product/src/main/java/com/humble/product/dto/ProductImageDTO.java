package com.humble.product.dto;

public class ProductImageDTO {

    private String downloadUrl;

    // ======== Constructeur vide ========
    public ProductImageDTO() {}

    // ======== Getter & Setter ========

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
