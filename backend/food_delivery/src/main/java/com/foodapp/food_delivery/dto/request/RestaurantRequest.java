package com.foodapp.food_delivery.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RestaurantRequest {
    String name;
    String address;
    String phone;
    String image;
    String description;
    String deliveryTime;
    BigDecimal deliveryFee;
    List<Integer> categoryIds;
}
