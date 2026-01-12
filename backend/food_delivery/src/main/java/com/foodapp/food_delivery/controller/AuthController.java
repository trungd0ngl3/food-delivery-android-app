package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.*;
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

    @PostMapping("/register/request-otp")
    public ApiResponse<String> requestRegisterOtp(@RequestBody RegisterRequest req) {
        return ApiResponse.<String>builder()
                .code(200)
                .message("Request Register success")
                .data(authService.requestRegisterOtp(req))
                .build();
    }

    @PostMapping("/register/confirm")
    public ApiResponse<RegisterResponse> confirmRegister(@RequestBody ConfirmRegisterRequest req) {
        return ApiResponse.<RegisterResponse>builder()
                .code(200)
                .message("Register success")
                .data(authService.confirmRegister(req))
                .build();
    }

    @PostMapping("/forgot-password/request-otp")
    public ApiResponse<String> requestForgotPasswordOtp(@RequestBody ForgotPasswordRequestOtp req) {
        return ApiResponse.<String>builder()
                .code(200)
                .message("Request password reset success")
                .data(authService.requestForgotPasswordOtp(req))
                .build();
    }

    @PostMapping("/forgot-password/confirm")
    public ApiResponse<String> confirmForgotPassword(@RequestBody ForgotPasswordConfirmRequest req) {
        return ApiResponse.<String>builder()
                .code(200)
                .message("Reset Password success")
                .data(authService.confirmForgotPassword(req))
                .build();
    }

}
