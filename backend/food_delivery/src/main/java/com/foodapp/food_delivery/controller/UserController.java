package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.UserUpdateRequest;
import com.foodapp.food_delivery.dto.response.UserUpdateResponse;
import com.foodapp.food_delivery.model.User;
import org.springframework.web.bind.annotation.RestController;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.UserCreationResponse;
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
    public ApiResponse<List<UserCreationResponse>> getUsers() {
        return ApiResponse.<List<UserCreationResponse>>builder()
                .code(200)
                .data(userService.getAllUsers())
                .build();
    }
    
    @PostMapping("createUser")
    public ApiResponse<UserCreationResponse> createUser(@RequestBody UserCreationRequest request) {
        System.out.println("createUser");
        return ApiResponse.<UserCreationResponse>builder()
                .code(201)
                .message("User created successfully")
                .data(userService.createUser(request))
                .build();
    }
    
    @DeleteMapping("delete/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("User deleted successfully")
                .build();
    }

    @PutMapping("update/{id}")
    public ApiResponse<UserUpdateResponse> updateUser(@PathVariable Integer id, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserUpdateResponse>builder()
                .code(200)
                .message("User updated successfully")
                .data(userService.updateUser(id, request)) 
                .build();
    }

    @PostMapping("get/{id}")
    public ApiResponse<User> getUser(@PathVariable Integer id) {
        return ApiResponse.<User>builder()
                .code(200)
                .message("User detail :")
                .data(userService.getUser(id))
                .build();
    }
    
}
