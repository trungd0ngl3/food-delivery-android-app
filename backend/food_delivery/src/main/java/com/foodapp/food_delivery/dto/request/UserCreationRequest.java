package com.foodapp.food_delivery.dto.request;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserCreationRequest {
    String name;
    Date dob;
    String email;
    String password;
}
