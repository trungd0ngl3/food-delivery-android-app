package com.foodapp.food_delivery.service;

import com.foodapp.food_delivery.dto.request.MenuRequest;
import com.foodapp.food_delivery.dto.response.MenuResponse;
import com.foodapp.food_delivery.exception.AppException;
import com.foodapp.food_delivery.mapper.MenuMapper;
import com.foodapp.food_delivery.model.Menu;
import com.foodapp.food_delivery.model.Restaurant;
import com.foodapp.food_delivery.repository.MenuRepository;
import com.foodapp.food_delivery.repository.RestaurantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MenuService {
    MenuRepository menuRepository;
    RestaurantRepository restaurantRepository;
    MenuMapper menuMapper;

    /**
     * Get all menu items for a restaurant
     */
    public List<MenuResponse> getMenuByRestaurant(Integer restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new AppException("Restaurant not found"));
        
        List<Menu> menus = menuRepository.findByRestaurantRestaurantId(restaurantId);
        return menus.stream()
                .map(menuMapper::toMenuResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get menu items filtered by category
     */
    public List<MenuResponse> getMenuByRestaurantAndCategory(Integer restaurantId, String category) {
        return menuRepository.findByRestaurantRestaurantId(restaurantId).stream()
                .filter(m -> m.getCategory().equalsIgnoreCase(category))
                .map(menuMapper::toMenuResponse)
                .collect(Collectors.toList());
    }

    /**
     * Create a new menu item
     */
    public MenuResponse createMenu(MenuRequest request) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new AppException("Restaurant not found"));

        Menu menu = Menu.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .image(request.getImage())
                .category(request.getCategory())
                .availableForPickup(request.getAvailableForPickup() != null ? request.getAvailableForPickup() : true)
                .availableForDelivery(request.getAvailableForDelivery() != null ? request.getAvailableForDelivery() : true)
                .rating(java.math.BigDecimal.ZERO)
                .reviewCount(0)
                .restaurant(restaurant)
                .build();

        return menuMapper.toMenuResponse(menuRepository.save(menu));
    }

    /**
     * Update menu item
     */
    public MenuResponse updateMenu(Integer menuId, MenuRequest request) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new AppException("Menu item not found"));

        if (request.getName() != null) menu.setName(request.getName());
        if (request.getPrice() != null) menu.setPrice(request.getPrice());
        if (request.getDescription() != null) menu.setDescription(request.getDescription());
        if (request.getImage() != null) menu.setImage(request.getImage());
        if (request.getCategory() != null) menu.setCategory(request.getCategory());
        if (request.getAvailableForPickup() != null) menu.setAvailableForPickup(request.getAvailableForPickup());
        if (request.getAvailableForDelivery() != null) menu.setAvailableForDelivery(request.getAvailableForDelivery());

        return menuMapper.toMenuResponse(menuRepository.save(menu));
    }

    /**
     * Delete menu item
     */
    public void deleteMenu(Integer menuId) {
        if (!menuRepository.existsById(menuId)) {
            throw new AppException("Menu item not found");
        }
        menuRepository.deleteById(menuId);
    }

    /**
     * Get single menu item
     */
    public MenuResponse getMenuById(Integer menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new AppException("Menu item not found"));
        return menuMapper.toMenuResponse(menu);
    }
}
