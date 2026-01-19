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
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardController {
    MenuService menuService;

    @GetMapping("/restaurant/{restaurantId}/menus")
    public ApiResponse<List<MenuResponse>> getRestaurantMenus(@PathVariable Integer restaurantId) {
        return ApiResponse.<List<MenuResponse>>builder()
                .code(200)
                .message("Menu items retrieved successfully")
                .data(menuService.getMenuByRestaurant(restaurantId))
                .build();
    }


    @GetMapping("/restaurant/{restaurantId}/menus/category/{category}")
    public ApiResponse<List<MenuResponse>> getRestaurantMenusByCategory(
            @PathVariable Integer restaurantId,
            @PathVariable String category) {
        return ApiResponse.<List<MenuResponse>>builder()
                .code(200)
                .message("Menu items retrieved successfully")
                .data(menuService.getMenuByRestaurantAndCategory(restaurantId, category))
                .build();
    }


    @PostMapping("/restaurant/{restaurantId}/menus")
    public ApiResponse<MenuResponse> createMenu(
            @PathVariable Integer restaurantId,
            @RequestBody MenuRequest request) {
        request.setRestaurantId(restaurantId);
        return ApiResponse.<MenuResponse>builder()
                .code(201)
                .message("Menu item created successfully")
                .data(menuService.createMenu(request))
                .build();
    }

    @PutMapping("/menus/{menuId}")
    public ApiResponse<MenuResponse> updateMenu(
            @PathVariable Integer menuId,
            @RequestBody MenuRequest request) {
        return ApiResponse.<MenuResponse>builder()
                .code(200)
                .message("Menu item updated successfully")
                .data(menuService.updateMenu(menuId, request))
                .build();
    }

    @DeleteMapping("/menus/{menuId}")
    public ApiResponse<Void> deleteMenu(@PathVariable Integer menuId) {
        menuService.deleteMenu(menuId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Menu item deleted successfully")
                .build();
    }

    @GetMapping("/menus/{menuId}")
    public ApiResponse<MenuResponse> getMenu(@PathVariable Integer menuId) {
        return ApiResponse.<MenuResponse>builder()
                .code(200)
                .message("Menu item retrieved successfully")
                .data(menuService.getMenuById(menuId))
                .build();
    }
}
