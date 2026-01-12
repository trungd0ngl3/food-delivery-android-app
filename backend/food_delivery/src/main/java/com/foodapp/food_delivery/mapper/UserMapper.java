package com.foodapp.food_delivery.mapper;

import com.foodapp.food_delivery.dto.request.UserUpdateRequest;
import com.foodapp.food_delivery.dto.response.UserUpdateResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.UserCreationResponse;
import com.foodapp.food_delivery.model.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(target = "id", ignore = true)
    User toUser(UserCreationRequest request);
    
    UserCreationResponse toUserResponse(User user);

    UserUpdateResponse toUserUpdateResponse(User user);


    @Mapping(target = "id", ignore = true)
    void updateUser(UserUpdateRequest request, @MappingTarget User user);
}
