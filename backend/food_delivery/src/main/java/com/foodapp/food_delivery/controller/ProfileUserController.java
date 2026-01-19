package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.UserUpdateRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.UserUpdateResponse;
import com.foodapp.food_delivery.model.User;
import com.foodapp.food_delivery.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/useprofile")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ProfileUserController {
    UserService userService;
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
