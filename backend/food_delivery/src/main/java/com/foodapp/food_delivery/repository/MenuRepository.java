package com.foodapp.food_delivery.repository;

import com.foodapp.food_delivery.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findByRestaurantRestaurantId(Integer restaurantId);
    List<Menu> findByRestaurantRestaurantIdAndCategory(Integer restaurantId, String category);
}
