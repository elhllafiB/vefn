package com.humble.product.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * Feign Client to communicate with User service
 * Use this to fetch user details when needed
 */
@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/user/{id}")
    Map<String, Object> getUserById(@PathVariable Integer id);
}

