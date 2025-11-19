package org.example.userr.feign;


import org.example.userr.dto.CartRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "CART")
public interface CartClient {



    @PostMapping("/cart/create")
    String createCartForUser(@RequestParam("userId") int userId);
}
