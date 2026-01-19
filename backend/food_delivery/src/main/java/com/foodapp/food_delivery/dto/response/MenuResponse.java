package com.foodapp.food_delivery.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuResponse {
    Integer id;
    String name;
    BigDecimal price;
    String description;
    String image;
    String category;
}
