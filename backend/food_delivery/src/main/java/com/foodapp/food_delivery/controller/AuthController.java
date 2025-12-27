package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.LoginRequest;
import com.foodapp.food_delivery.dto.request.RegisterRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.LoginResponse;
import com.foodapp.food_delivery.dto.response.RegisterResponse;
import com.foodapp.food_delivery.security.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {

    AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .message("Login success")
                .data(authService.login(request))
                .build();
    }
    @PostMapping(
            value = "/register",
            consumes = "application/json",
            produces = "application/json"
    )
    public ApiResponse<RegisterResponse> register(@RequestBody RegisterRequest request) {
        return ApiResponse.<RegisterResponse>builder()
                .code(201)
                .message("Register success")
                .data(authService.register(request))
                .build();
    }

}
