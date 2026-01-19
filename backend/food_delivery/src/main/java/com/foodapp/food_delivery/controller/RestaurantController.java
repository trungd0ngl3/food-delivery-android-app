package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.RestaurantRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.RestaurantResponse;
import com.foodapp.food_delivery.service.RestaurantService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RestaurantController {
    RestaurantService restaurantService;

    @GetMapping
    public ApiResponse<List<RestaurantResponse>> getAllRestaurants(@RequestParam(required = false) Integer categoryId) {
        return ApiResponse.<List<RestaurantResponse>>builder()
                .data(restaurantService.getAllRestaurants(categoryId))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<List<RestaurantResponse>> searchRestaurants(@RequestParam String name) {
        return ApiResponse.<List<RestaurantResponse>>builder()
                .data(restaurantService.searchRestaurants(name))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RestaurantResponse> getRestaurantById(@PathVariable Integer id) {
        return ApiResponse.<RestaurantResponse>builder()
                .data(restaurantService.getRestaurantById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<RestaurantResponse> createRestaurant(@RequestBody RestaurantRequest request) {
        return ApiResponse.<RestaurantResponse>builder()
                .data(restaurantService.createRestaurant(request))
                .build();
    }
}
