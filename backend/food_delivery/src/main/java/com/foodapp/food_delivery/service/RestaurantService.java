package com.foodapp.food_delivery.service;

import com.foodapp.food_delivery.dto.request.RestaurantRequest;
import com.foodapp.food_delivery.dto.response.RestaurantResponse;
import com.foodapp.food_delivery.exception.AppException;
import com.foodapp.food_delivery.mapper.RestaurantMapper;
import com.foodapp.food_delivery.model.Category;
import com.foodapp.food_delivery.model.Restaurant;
import com.foodapp.food_delivery.repository.CategoryRepository;
import com.foodapp.food_delivery.repository.RestaurantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RestaurantService {
    RestaurantRepository restaurantRepository;
    RestaurantMapper restaurantMapper;
    CategoryRepository categoryRepository;
    com.foodapp.food_delivery.repository.UserRepository userRepository;


    public List<RestaurantResponse> getAllRestaurants(Integer categoryId) {
        List<Restaurant> restaurants;
        if (categoryId != null) {
            restaurants = restaurantRepository.findAllByCategories_CategoryId(categoryId);
        } else {
            restaurants = restaurantRepository.findAll();
        }
        
        return restaurants.stream()
                .map(restaurantMapper::toRestaurantResponse)
                .collect(Collectors.toList());
    }

    public RestaurantResponse getRestaurantById(Integer id) {
        return restaurantRepository.findById(id)
                .map(restaurantMapper::toRestaurantResponse)
                .orElseThrow(() -> new AppException("Restaurant not found"));
    }

    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = restaurantMapper.toRestaurant(request);

        // Handle categories
        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
            restaurant.setCategories(new HashSet<>(categories));
        }

        // Create: Set Owner (Temporary: use first user found)
        restaurant.setOwner(userRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new AppException("No user found to set as owner")));

        return restaurantMapper.toRestaurantResponse(restaurantRepository.save(restaurant));
    }

    public List<RestaurantResponse> searchRestaurants(String keyword) {
        return restaurantRepository.findDistinctByNameContainingIgnoreCaseOrCategories_NameContainingIgnoreCase(keyword, keyword).stream()
                .map(restaurantMapper::toRestaurantResponse)
                .collect(Collectors.toList());
    }

}

