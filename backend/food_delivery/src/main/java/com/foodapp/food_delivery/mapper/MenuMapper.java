package com.foodapp.food_delivery.mapper;

import com.foodapp.food_delivery.dto.response.MenuResponse;
import com.foodapp.food_delivery.model.Menu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface MenuMapper {
    @Mapping(source = "menuId", target = "id")
    MenuResponse toMenuResponse(Menu menu);
}
