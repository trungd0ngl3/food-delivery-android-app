package com.foodapp.food_delivery.controller;

import org.springframework.web.bind.annotation.RestController;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.UserResponse;
import com.foodapp.food_delivery.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping()
    public ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .code(200)
                .data(userService.getAllUsers())
                .build();
    }
    
    @PostMapping()
    public ApiResponse<UserResponse> postMethodName(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(201)
                .message("User created successfully")
                .data(userService.createUser(request))
                .build();
    }
    
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("User deleted successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String id, @RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(200)
                .message("User updated successfully")
                .data(userService.updateUser(id, request)) 
                .build();
    }
    
}
