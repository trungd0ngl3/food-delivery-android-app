package com.foodapp.food_delivery.service;

import com.foodapp.food_delivery.dto.request.MenuRequest;
import com.foodapp.food_delivery.dto.response.MenuResponse;
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

    public List<MenuResponse> getMenusByRestaurant(Integer restaurantId) {
        return menuRepository.findByRestaurantRestaurantId(restaurantId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public MenuResponse getMenuById(Integer id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        return toResponse(menu);
    }

    public MenuResponse createMenu(MenuRequest request) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        Menu menu = Menu.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .image(request.getImage())
                .category(request.getCategory())
                .restaurant(restaurant)
                .build();

        Menu savedMenu = menuRepository.save(menu);
        return toResponse(savedMenu);
    }

    public MenuResponse updateMenu(Integer id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        menu.setName(request.getName());
        menu.setPrice(request.getPrice());
        menu.setDescription(request.getDescription());
        menu.setImage(request.getImage());
        menu.setCategory(request.getCategory());

        Menu updatedMenu = menuRepository.save(menu);
        return toResponse(updatedMenu);
    }

    public void deleteMenu(Integer id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        menuRepository.delete(menu);
    }

    private MenuResponse toResponse(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getMenuId())
                .name(menu.getName())
                .price(menu.getPrice())
                .description(menu.getDescription())
                .image(menu.getImage())
                .category(menu.getCategory())
                .build();
    }
}
