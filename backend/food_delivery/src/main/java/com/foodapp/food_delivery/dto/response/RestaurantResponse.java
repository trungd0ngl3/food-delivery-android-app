package com.foodapp.food_delivery.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RestaurantResponse {
    Integer id;
    String name;
    String image;
    BigDecimal rating;
    String deliveryTime;
    BigDecimal deliveryFee;
    String description;
    List<String> tags; // Categories names
    List<MenuResponse> menu;
}
