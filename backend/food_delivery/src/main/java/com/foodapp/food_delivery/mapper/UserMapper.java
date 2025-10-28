package com.foodapp.food_delivery.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.UserResponse;
import com.foodapp.food_delivery.model.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(target = "id", ignore = true)
    User toUser(UserCreationRequest request);
    
    UserResponse toUserResponse(User user);

    @Mapping(target = "id", ignore = true)
    void updateUser(UserCreationRequest request, @MappingTarget User user);
}
