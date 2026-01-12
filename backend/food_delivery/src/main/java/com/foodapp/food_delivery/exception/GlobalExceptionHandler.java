package com.foodapp.food_delivery.exception;

import com.foodapp.food_delivery.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleApp(AppException ex) {
        return ResponseEntity
            .badRequest()
            .body(ApiResponse.builder()
                .code(400)
                .message(ex.getMessage())
                .build());
    }
}
