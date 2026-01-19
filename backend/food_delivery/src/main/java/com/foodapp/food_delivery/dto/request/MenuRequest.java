package com.foodapp.food_delivery.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuRequest {
    String name;
    BigDecimal price;
    String description;
    String image;
    String category;
    Integer restaurantId;
    Boolean availableForPickup;
    Boolean availableForDelivery;
}
