package com.foodapp.food_delivery.repository;

import com.foodapp.food_delivery.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findAllByCategories_CategoryId(Integer categoryId);

    List<Restaurant> findByNameContainingIgnoreCase(String name);

    List<Restaurant> findDistinctByNameContainingIgnoreCaseOrCategories_NameContainingIgnoreCase(String name, String categoryName);

}
