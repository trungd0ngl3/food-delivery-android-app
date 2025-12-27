package com.foodapp.food_delivery.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterResponse {
    Integer id;
    String name;
    String email;
    String role;
}
