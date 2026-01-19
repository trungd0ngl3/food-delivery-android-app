package com.foodapp.food_delivery.controller;

import com.foodapp.food_delivery.dto.request.MenuRequest;
import com.foodapp.food_delivery.dto.response.ApiResponse;
import com.foodapp.food_delivery.dto.response.MenuResponse;
import com.foodapp.food_delivery.service.MenuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MenuController {
    MenuService menuService;

    @GetMapping("/restaurant/{restaurantId}")
    public ApiResponse<List<MenuResponse>> getMenusByRestaurant(@PathVariable Integer restaurantId) {
        return ApiResponse.<List<MenuResponse>>builder()
                .data(menuService.getMenusByRestaurant(restaurantId))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<MenuResponse> getMenuById(@PathVariable Integer id) {
        return ApiResponse.<MenuResponse>builder()
                .data(menuService.getMenuById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<MenuResponse> createMenu(@RequestBody MenuRequest request) {
        return ApiResponse.<MenuResponse>builder()
                .data(menuService.createMenu(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<MenuResponse> updateMenu(
            @PathVariable Integer id,
            @RequestBody MenuRequest request) {
        return ApiResponse.<MenuResponse>builder()
                .data(menuService.updateMenu(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return ApiResponse.<Void>builder()
                .build();
    }
}
